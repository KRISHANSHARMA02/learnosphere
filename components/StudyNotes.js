
"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import React, { useState, useEffect } from "react";
import { FaFilePdf, FaTimes } from "react-icons/fa";
import { trackEvent } from "@/src/lib/eventTracker";

export default function StudyNotes({ slug, sessionId }) {
  const [materials, setMaterials] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);

  const backendUrl = WEB_BACKEND_URL;

  // 🚀 NAYA LOGIC 1: Dropdown ki state
  const [selectedCategory, setSelectedCategory] = useState("All");

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    if (sessionId) {
      fetch(`${backendUrl}/api/route/get-materials/${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setMaterials(data.materials);
          }
        })
        .catch((err) => console.error("Error fetching materials:", err));
    }
  }, [sessionId, backendUrl]);

  // 🚀 NAYA LOGIC 2: Unique Categories nikalna aur data filter karna
  const categories = ["All", ...new Set(materials.map((item) => item.category))];
  
  const filteredMaterials = selectedCategory === "All" 
    ? materials 
    : materials.filter((item) => item.category === selectedCategory);


  // Razorpay Payment Logic
  const handlePayment = async (e) => {
    e.preventDefault();
    if (!selectedPdf) return;

    setLoading(true);

    const formattedMobile = contact ? (contact.startsWith("+91") ? contact : `+91${contact}`) : "";
    let failureTracked = false;
    let activeOrderId = "";

    // Centralized single helper flow for tracking STUDY_NOTES_PURCHASE_FAILED (prevents duplicate triggers)
    const trackPaymentFailure = (details = {}) => {
      if (failureTracked) return;
      failureTracked = true;

      trackEvent("STUDY_NOTES_PURCHASE_FAILED", {
        name,
        email,
        mobile_number: formattedMobile,
        contact,
        pdf_id: selectedPdf?.id,
        subject_name: selectedPdf?.subject_name,
        category: selectedPdf?.category,
        amount: selectedPdf?.sell_price,
        razorpay_order_id: details.razorpay_order_id || activeOrderId || null,
        razorpay_payment_id: details.razorpay_payment_id || null,
        error_code: details.error_code || null,
        error_description: details.error_description || "Payment failed",
        error_source: details.error_source || null,
        error_step: details.error_step || null,
        error_reason: details.error_reason || null,
        failure_reason: details.failure_reason || details.error_description || "payment_failed",
      });
    };

    const resLoad = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js",
    );

    if (!resLoad) {
      trackPaymentFailure({
        error_code: "SDK_LOAD_FAILED",
        error_description: "Razorpay SDK failed to load. Please check your internet connection.",
        failure_reason: "sdk_load_failed",
      });
      alert(
        "Razorpay SDK failed to load. Please check your internet connection.",
      );
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `${backendUrl}/api/route/payment/create-order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          // body: JSON.stringify({ amount: 11, currencyCode: "INR" }),
          body: JSON.stringify({ pdfId: selectedPdf.id }),
        },
      );

      const data = await res.json();

      if (data.success && data.order) {
        activeOrderId = data.order.id;
        trackEvent("STUDY_NOTES_CHECKOUT_SUBMITTED", {
          name,
          email,
          mobile_number: formattedMobile,
          pdf_id: selectedPdf.id,
          subject_name: selectedPdf.subject_name,
          category: selectedPdf.category,
          amount: selectedPdf.sell_price,
          order_id: data.order.id,
        });

        const options = {
          key: "rzp_live_RqzfXxBoqkJF1D", 
          amount: data.order.amount,
          currency: data.order.currency,
          name: "Learnosphere",
          description: `Payment for ${selectedPdf.subject_name}`,
          order_id: data.order.id,
          prefill: {
            name: name,
            email: email,
            contact: contact,
          },
          handler: async function (response) {
            try {
              const verifyRes = await fetch(
                `${backendUrl}/api/route/payment/verify-and-send`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature,
                    name: name,
                    email: email,
                    sessionId: selectedPdf.id,
                  }),
                },
              );

              const verifyData = await verifyRes.json();
              if (verifyData.success) {
                trackEvent("STUDY_NOTES_PURCHASE_SUCCESS", {
                  name,
                  email,
                  mobile_number: formattedMobile,
                  contact,
                  pdf_id: selectedPdf.id,
                  subject_name: selectedPdf.subject_name,
                  category: selectedPdf.category,
                  amount: selectedPdf.sell_price,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                });
                alert(`Success! ${selectedPdf.subject_name} sent to ${email}`);
                setSelectedPdf(null);
                setName("");
                setEmail("");
                setContact("");
              } else {
                trackPaymentFailure({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  error_description: verifyData.message || "Payment verified but failed to send email.",
                  failure_reason: "verification_failed",
                });
                alert("Payment verified but failed to send email.");
              }
            } catch (verifyErr) {
              trackPaymentFailure({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                error_description: verifyErr?.message || "Verification request failed",
                failure_reason: "verification_network_error",
              });
              alert("Something went wrong during payment verification.");
            }
          },
          modal: {
            ondismiss: function () {
              trackPaymentFailure({
                razorpay_order_id: data.order.id,
                error_description: "Payment cancelled by user",
                failure_reason: "user_cancelled",
              });
            },
          },
          theme: { color: "#ea580c" },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.on("payment.failed", function (response) {
          trackPaymentFailure({
            razorpay_order_id: response?.error?.metadata?.order_id || data.order.id,
            razorpay_payment_id: response?.error?.metadata?.payment_id || null,
            error_code: response?.error?.code,
            error_description: response?.error?.description || "Payment failed at gateway",
            error_source: response?.error?.source,
            error_step: response?.error?.step,
            error_reason: response?.error?.reason,
            failure_reason: response?.error?.description || response?.error?.reason || "gateway_payment_failed",
          });
        });
        rzp1.open();
      } else {
        trackPaymentFailure({
          error_description: data?.message || "Order creation failed",
          failure_reason: "order_creation_failed",
        });
        alert(data?.message || "Unable to create payment order. Please try again.");
      }
    } catch (error) {
      console.error(error);
      trackPaymentFailure({
        error_description: error?.message || "Something went wrong during payment processing",
        failure_reason: "general_error",
      });
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* 🎯 HEADER */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black text-gray-900 mb-2">
          Premium PDF Notes
        </h2>
        <p className="text-gray-500">
          Buy only what you need. Select a chapter below.
        </p>
      </div>

      {/* 🚀 NAYA LOGIC 3: Category Dropdown Filter UI */}
      {materials.length > 0 && (
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-3 sm:mb-0">
            Filter Notes:
          </h3>
          
          <div className="relative w-full sm:w-72">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full appearance-none bg-orange-50 border border-orange-200 text-gray-700 py-3 px-4 pr-8 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all cursor-pointer"
            >
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat === "All" ? "📚 Show All Notes" : cat}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-orange-600">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* 📚 PDF CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 🚀 NAYA LOGIC 4: Yahan ab 'filteredMaterials' map hoga, 'materials' nahi */}
        {materials.length > 0 ? (
          filteredMaterials.map((pdf) => (
            <div
              key={pdf.id}
              className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="bg-orange-100 text-orange-600 p-3 rounded-xl shrink-0">
                  <FaFilePdf size={24} />
                </div>
                <span className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded-md uppercase tracking-wider text-right ml-2 line-clamp-2">
                  {pdf.category}
                </span>
              </div>
              <h3 className="font-bold text-gray-800 text-lg mb-2 flex-grow">
                {pdf.subject_name}
              </h3>
              <div className="mt-6 flex justify-between items-end border-t border-gray-50 pt-4">
                <div className="flex flex-col">
                  {pdf.original_price > pdf.sell_price && (
                    <span className="text-xs text-gray-400 line-through font-semibold mb-0.5">
                      ₹{pdf.original_price}
                    </span>
                  )}
                  <span className="text-2xl font-black text-gray-900 tracking-tight">
                    ₹{pdf.sell_price}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedPdf(pdf)}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-md active:scale-95"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500 py-10">
            Loading materials...
          </p>
        )}
      </div>

      {/* 💳 PAYMENT MODAL (Pop-up) */}
      {selectedPdf && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full relative shadow-2xl">
            <button
              onClick={() => setSelectedPdf(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-800"
            >
              <FaTimes size={20} />
            </button>

            <h3 className="text-2xl font-black text-gray-900 mb-2">Checkout</h3>
            <p className="text-sm text-gray-500 mb-6 border-b pb-4">
              You are buying:{" "}
              <strong className="text-orange-600">
                {selectedPdf.subject_name}
              </strong>
            </p>

            <form onSubmit={handlePayment} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="Where should we send the PDF?"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Mobile Number
                </label>
                <div className="flex gap-2">
                  <span className="border border-gray-200 p-3 rounded-xl bg-gray-50 text-gray-700 font-medium">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    value={contact}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (/^\d{0,10}$/.test(val)) setContact(val);
                    }}
                    className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                    placeholder="Enter 10-digit mobile number"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-600 text-white font-bold py-4 rounded-xl mt-4 hover:bg-orange-700 disabled:bg-gray-400 transition-all text-lg shadow-md"
              >
                {loading ? "Processing..." : `Pay ₹${selectedPdf.sell_price} Securely`}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}