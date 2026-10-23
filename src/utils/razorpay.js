import { APP_BACKEND_URL } from "@/src/helper/appbackend_api";
import axios from "axios";
import { trackEvent } from "../lib/eventTracker";

export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const openRazorpay = async ({ finalAmount, course, user, onSuccess, onFailure }) => {
  const isLoaded = await loadRazorpayScript();
  if (!isLoaded) {
    alert("Failed to load Razorpay. Please try again.");
    return;
  }

  const amountPaid = finalAmount;
  const courseId = course?.id || course?._id;
  const studentId = user?.userId || user?.id || user?._id;

  try {
    // STEP 1: Create Razorpay Order from backend
    const orderRes = await axios.post(
      `${APP_BACKEND_URL}/api/route/createOrder`,
      {
        amount: finalAmount,
        userId: user.userId,
        courseId: course.id,
      }
    );

    const { orderId } = orderRes.data;

    const options = {
      key: "rzp_live_RqzfXxBoqkJF1D", //key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      amount: finalAmount * 100,
      currency: "INR",
      name: course.name,
      description: course.name,
      image: "https://learnosphere.in/profileImage/app_logo.png",
      order_id: orderId,
      handler: async function (response) {
        try {
          const transactionId = response.razorpay_payment_id;
          const userId = user.userId;

          const verifyRes = await axios.post(
            `${APP_BACKEND_URL}/api/route/enrollStudentInCourse`,
            {
              userId,
              courseId,
              amountPaid,
              transactionId,
              paymentGateway: "razorpay",
              status: "success",
            }
          );

          if (verifyRes.status === 201 && verifyRes.data.enrollment) {
            onSuccess({
              invoiceUrl: verifyRes.data.invoiceUrl,
              enrollment: verifyRes.data.enrollment,
            });

            trackEvent("PAYMENT_SUCCESS", {
              amount: amountPaid,
              course_id: courseId,
              course_title: course?.name,
              transaction_id: transactionId,
            }, studentId);
          } else {
            trackEvent("PAYMENT_FAILED", {
              reason: verifyRes.data?.message || "Payment verification failed",
              amount: amountPaid,
              course_id: courseId,
              course_title: course?.name,
              transaction_id: transactionId,
            }, studentId);
            onFailure("Enrollment failed after payment.");
          }
        } catch (err) {
          console.error("Verification error:", err);
          trackEvent("PAYMENT_FAILED", {
            reason: err.response?.data?.message || "Server verification error",
            amount: amountPaid,
            course_id: courseId,
            course_title: course?.name,
          }, studentId);
          onFailure("Payment verification failed. Please contact support.");
        }
      }, 
      prefill: {
        name: `${user.studentName || ""} ${user.lastName || ""}`.trim(),
        email: user.gmail || user.email,
        contact: user.mobileNumber || user.phone,
      },
      theme: { color: "#ea580c" },
      modal: {
        ondismiss: function () {
          console.warn("User closed Razorpay popup.");
          trackEvent("PAYMENT_FAILED", {
            reason: "Payment cancelled by user",
            amount: amountPaid,
            course_id: courseId,
            course_title: course?.name,
          }, studentId);
          onFailure("Payment was cancelled by the user.");
        },
      },
    };

    const paymentObject = new window.Razorpay(options);

    // Handle payment failure (e.g. bank decline, wrong OTP)
    paymentObject.on("payment.failed", function (response) {
      console.error("Razorpay Payment Failed:", response);
      trackEvent("PAYMENT_FAILED", {
        reason: response?.error?.description || "Razorpay payment.failed event",
        error: response?.error || null,
        amount: amountPaid,
        course_id: courseId,
        course_title: course?.name,
      }, studentId);
      onFailure("Payment failed. Please try again.");
    });

    // Handle modal close
    paymentObject.on("modal.closed", function () {
      console.warn("Payment popup closed by user.");
      trackEvent("PAYMENT_DISMISSED", {
        reason: "Razorpay modal closed by user",
        amount: amountPaid,
        course_id: courseId,
        course_title: course?.name,
      }, studentId);
      onFailure("Payment was cancelled by the user.");
    });

    paymentObject.open();
  } catch (error) {
    console.error("Order creation error:", error);
    trackEvent("PAYMENT_FAILED", {
      reason: error?.response?.data?.message || error?.message || "Order creation error",
      amount: amountPaid,
      course_id: courseId,
      course_title: course?.name,
    }, studentId);
    onFailure("Failed to initiate payment");
  }
};
