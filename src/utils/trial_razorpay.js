import { APP_BACKEND_URL } from "@/src/helper/appbackend_api";
import axios from "axios";
import Swal from "sweetalert2";
import { trackEvent } from "../lib/eventTracker";

export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
      return resolve(true); // already loaded
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// export const startTrialFlow = async ({ course, user, onSuccess, onFailure }) => {
//   try {
//     const isLoaded = await loadRazorpayScript();
//     if (!isLoaded) {
//       Swal.fire("Error", "Failed to load Razorpay. Please try again.", "error");
//       return;
//     }

//     // STEP A: Create order for ₹11
//     const orderRes = await axios.post(`${APP_BACKEND_URL}/api/route/createOrder`, {
//       amount: course.price,
//       userId: user.userId,
//       courseId: course.id,
//     });
//     const { orderId } = orderRes.data;

//     // First payment checkout (₹11)
//     const orderOptions = {
//       key: "rzp_live_LTJBh16AHylHcS",
//       amount: course.price * 100,
//       currency: "INR",
//       name: `${course.name}`,
//       description: `${course.name} - Trial fee`,
//       order_id: orderId,
//       handler: async function () {
//         // ✅ Close payment popup instantly
//         Swal.fire({
//           title: "Creating your trial...",
//           text: "Please wait while we set up your subscription.",
//           allowOutsideClick: false,
//           allowEscapeKey: false,
//           didOpen: () => {
//             Swal.showLoading();
//           },
//         });

//         try {
//           // STEP B: Create subscription on server
//           const subRes = await axios.post(`${APP_BACKEND_URL}/api/route/createTrialSubscription`, {
//             userId: user.userId,
//             courseId: course.id,
//           });

//           const subscriptionId = subRes.data.subscriptionId;

//           Swal.close(); // Close loader before opening subscription

//           // STEP C: Open subscription checkout
//           const subOptions = {
//             key: "rzp_live_LTJBh16AHylHcS",
//             subscription_id: subscriptionId,
//             name: "Learnosphere",
//             description: `${course.name} - Auto-renew authorization`,
//             handler: async function (subResp) {
//               // Confirm trial
//               Swal.fire({
//                 title: "Finalizing your trial...",
//                 text: "Almost there...",
//                 allowOutsideClick: false,
//                 allowEscapeKey: false,
//                 didOpen: () => {
//                   Swal.showLoading();
//                 },
//               });

//               const confirmRes = await axios.post(`${APP_BACKEND_URL}/api/route/confirmTrial`, {
//                 razorpay_subscription_id: subResp.razorpay_subscription_id,
//                 razorpay_payment_id: subResp.razorpay_payment_id,
//                 userId: user.userId,
//                 courseId: course.id,
//               });

//               Swal.close();

//               if (confirmRes.status === 201) {
//                 Swal.fire("Trial Activated 🎉", "Enjoy your course!", "success");
//                 onSuccess(confirmRes.data);
//               } else {
//                 Swal.fire("Error", "Trial confirmation failed", "error");
//                 onFailure("Trial confirmation failed");
//               }
//             },
//             modal: {
//               ondismiss() {
//                 onFailure("Subscription authorization was cancelled.");
//                 Swal.fire("Cancelled", "Trial not activated.", "warning");
//               },
//             },
//             prefill: {
//               name: user.name,
//               email: user.email,
//               contact: user.phone,
//             },
//           };

//           setTimeout(() => {
//             const rzpSub = new window.Razorpay(subOptions);
//             rzpSub.open();
//           }, 800); // small delay for smoothness
//         } catch (err) {
//           console.error("create subscription error", err);
//           Swal.close();
//           Swal.fire("Error", "Failed to create subscription", "error");
//           onFailure("Failed to create subscription");
//         }
//       },
//       modal: {
//         ondismiss: () => {
//           onFailure("Trial payment was cancelled by user.");
//           Swal.fire("Cancelled", "Trial payment was cancelled.", "warning");
//         },
//       },
//       prefill: {
//         name: user.name,
//         email: user.email,
//         contact: user.phone,
//       },
//     };

//     const rzpOrder = new window.Razorpay(orderOptions);
//     rzpOrder.open();
//   } catch (err) {
//     console.error("startTrialFlow error", err);
//     Swal.fire("Error", "Could not start trial flow", "error");
//     onFailure("Could not start trial flow");
//   }
// };




export const startTrialFlow = async ({ course, user, onSuccess, onFailure }) => {
  try {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      Swal.fire("Error", "Failed to load Razorpay. Please try again.", "error");
      return;
    }

    // Step A: Create ₹11 order + subscription server-side
    const subRes = await axios.post(
      `${APP_BACKEND_URL}/api/route/create_trial_subscription`,
      {
        userId: user.userId,
        courseId: course.id,
      }
    );

    const {  subscriptionId } = subRes.data;

    // Step B: Open Razorpay Checkout with subscription
    const options = {
      key: "rzp_live_RqzfXxBoqkJF1D", // use LIVE key in production
      subscription_id: subscriptionId,
      name: "Learnosphere",
      description: `${course.name} - Trial + Subscription`,
      handler: async function (response) {
        try {
          Swal.fire({
            title: "Finalizing...",
            text: "Verifying payment & activating trial",
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading(),
          });

          const confirmRes = await axios.post(
            `${APP_BACKEND_URL}/api/route/confirm_trial_payment`,
            {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_subscription_id: response.razorpay_subscription_id,
              razorpay_signature: response.razorpay_signature,
              userId: user.userId,
              courseId: course.id,
            }
          );

          Swal.close();

          if (confirmRes.status === 201) {
             trackEvent("PAYMENT_SUCCESS", { amount: 11, course_id: course.id, plan: "trial" });
            Swal.fire("Trial Activated 🎉", "Enjoy your course!", "success");
            onSuccess(confirmRes.data);
          } else {
            trackEvent("PAYMENT_FAILED", { reason: "Trial confirmation failed status", amount: 11, course_id: course.id, plan: "trial" });
            Swal.fire("Error", "Trial confirmation failed", "error");
            onFailure("Trial confirmation failed");
          }
        } catch (err) {
           trackEvent("PAYMENT_FAILED", { reason: "Trial confirmation failed exception", amount: 11, course_id: course.id, plan: "trial" });
          Swal.fire("Error", "Trial confirmation failed", "error");
          onFailure("Trial confirmation failed");
        }
      },
      modal: {
        ondismiss() {
            trackEvent("PAYMENT_FAILED", { reason: "Payment cancelled by user", amount: 11, course_id: course.id, plan: "trial" });
          onFailure("Payment cancelled by user.");
          Swal.fire("Cancelled", "Trial not activated.", "warning");
        },
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.phone,
      },
      theme: { color: "#ff6b00" }, // Learnosphere orange
    };

    const rzp = new window.Razorpay(options);
       
    rzp.on("payment.failed", function (response) {
      trackEvent("PAYMENT_FAILED", { reason: "Razorpay payment.failed event", error: response.error, amount: 11, course_id: course.id, plan: "trial" });
    });
    
    rzp.open();
  } catch (err) {
    console.error("startTrialFlow error", err);
      trackEvent("PAYMENT_FAILED", { reason: "Could not start trial flow", course_id: course.id, plan: "trial" });
    Swal.fire("Error", "Could not start trial flow", "error");
    onFailure("Could not start trial flow");
  }
};
