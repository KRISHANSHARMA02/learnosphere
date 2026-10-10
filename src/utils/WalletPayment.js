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

export const processWalletTopUp = async ({
  totalPayable,
  currencyCode = "INR",
  topUpAmount,
  currencySymbol,
  gstAmount,
  userId,
  offerId,
  userEmail,
  onSuccess,
  onFailure,
}) => {

  const isLoaded = await loadRazorpayScript();
  if (!isLoaded) {
    onFailure("Failed to load Razorpay SDK.");
    return;
  }

  try {

    // STEP 1: CREATE ORDER
    const orderRes = await axios.post(
      "https://mobileapp.backend.learnosphere.in/api/route/createOrder",
      {
        amount: totalPayable,
        currencyCode: currencyCode
      }
    );

    const orderData = orderRes.data;

    if (!orderData.success) {
      onFailure("Failed to create order.");
      return;
    }

    const options = {
      key: "rzp_live_RqzfXxBoqkJF1D",
      amount: orderData.order.amount,
      currency: orderData.order.currency,
      name: "Learnosphere Wallet",
      description: "Wallet Top-up",
      image: "https://learnosphere.in/profileImage/app_logo.png",
      order_id: orderData.order.id,

      handler: async function (response) {

        const payload = {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          paid_amount: totalPayable,
          base_amount: topUpAmount,
          currencySymbol: currencySymbol,
          gst_amount: gstAmount,
          student_id: userId,
          offer_id: offerId || null
        };

        try {

          // STEP 2: VERIFY PAYMENT
          const verifyRes = await axios.post(
            "https://mobileapp.backend.learnosphere.in/api/route/verify_and_save_wallet_balance",
            payload
          );

          if (verifyRes.data.success) {
            onSuccess(verifyRes.data);
          } else {
            onFailure(verifyRes.data.message || "Payment verification failed.");
          }

        } catch (err) {
          console.error("Verification error:", err);
          onFailure(err.response?.data?.message || "Server verification error.");
        }
      },

      prefill: {
        email: userEmail || ""
      },

      theme: {
        color: "#ea580c"
      },

      modal: {
        ondismiss: function () {
          onFailure("Payment cancelled by user.");
        }
      }
    };

    const paymentObject = new window.Razorpay(options);

    paymentObject.on("payment.failed", function (response) {
      console.error("Payment Failed:", response);
      onFailure("Payment failed.");
    });

    paymentObject.open();

  } catch (error) {
    console.error("Payment initialization error:", error);
    onFailure("Unable to start payment.");
  }
};