import axios from "axios";

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


  try {


    // STEP 1: Create Razorpay Order from backend
    const orderRes = await axios.post(
      "https://mobileapp.backend.learnosphere.in/api/route/createOrder",
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
          // You can also fetch course price dynamically here if not present
          const transactionId = response.razorpay_payment_id;
          const courseId = course.id || course._id;
          const userId = user.userId; // coming from getStudentDetailsById response

          const amountPaid = finalAmount; // assuming price is available in course object

          const verifyRes = await axios.post(
            "https://mobileapp.backend.learnosphere.in/api/route/enrollStudentInCourse",
            {
              userId,
              courseId,
              amountPaid,
              transactionId,
              paymentGateway: "razorpay",
              status: "success", // since it reached here, treat as success
            }
          );

          if (verifyRes.status === 201 && verifyRes.data.enrollment) {
            onSuccess({
              invoiceUrl: verifyRes.data.invoiceUrl,
              enrollment: verifyRes.data.enrollment,
            });

        trackEvent("PAYMENT_SUCCESS", { amount: amountPaid, course_id: course?._id || course?.id });
          } else {
             trackEvent("PAYMENT_FAILED", { reason: verifyRes.data.message || "Payment verification failed", amount: amountPaid,  course_id: course?._id || course?.id });
            onFailure("Enrollment failed after payment.");
          }
        } catch (err) {
          console.error("Verification error:", err);
           trackEvent("PAYMENT_FAILED", { reason: err.response?.data?.message || "Server verification error", amount: amountPaid, course_id: course?._id || course?.id });
          onFailure("Payment verification failed. Please contact support.");
        }
      }, 
      prefill: {
        name: `${user.studentName} ${user.lastName}`,
        email: user.gmail,
        contact: user.mobileNumber,
      },
      theme: { color: "#ea580c" },
      // ✅ Add this block
      modal: {
        ondismiss: function () {
          console.warn("User closed Razorpay popup.");
           trackEvent("PAYMENT_FAILED", { reason: "Payment cancelled by user", amount: amountPaid, course_id: course?._id || course?.id });
          onFailure("Payment was cancelled by the user.");
        },
      },
    };

    const paymentObject = new window.Razorpay(options);

    // Handle payment failure
    paymentObject.on("payment.failed", function (response) {
      console.error("Razorpay Payment Failed:", response);
        trackEvent("PAYMENT_FAILED", { reason: "Razorpay payment.failed event", error: response.error, amount: amountPaid, course_id: course?._id || course?.id });
      onFailure("Payment failed. Please try again.");
    });

    // Handle modal close (cancelled payment)
    paymentObject.on("modal.closed", function () {
      console.warn("Payment popup closed by user.");
        trackEvent("PAYMENT_DISMISSED", { reason: "Razorpay modal closed by user", error: response.error, amount: amountPaid, course_id: course?._id || course?.id });
      onFailure("Payment was cancelled by the user.");
    });

    paymentObject.open();
  } catch (error) {
    console.error("Order creation error:", error);
          console.error("Razorpay Payment Failed:", response);
        trackEvent("PAYMENT_FAILED", { reason: "Razorpay payment.failed event", error: response.error, amount: amountPaid, course_id: course?._id || course?.id });
    onFailure("Failed to initiate payment");
  }
};
