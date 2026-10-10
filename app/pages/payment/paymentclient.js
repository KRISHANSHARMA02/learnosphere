"use client";
import React, { useState, useEffect } from "react";
import {
  FaGooglePay,
  FaCreditCard,
  FaUniversity,
  FaWallet,
  FaLock,
  FaMoneyCheckAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";
import { RiSecurePaymentLine } from "react-icons/ri";
import { SiLetsencrypt, SiTrustpilot } from "react-icons/si";
import { openRazorpay } from "@/src/utils/razorpay";
import { startTrialFlow } from "@/src/utils/trial_razorpay";
import { trackEvent, EVENT_NAMES } from "@/src/lib/eventTracker";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";

const PaymentPage = () => {
  const [referralCode, setReferralCode] = useState("");
  const [referralStatus, setReferralStatus] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState("upi");
  const [course, setCourse] = useState(null);
  const [user, setUser] = useState(null);
  const [type, setType] = useState(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const subtotal = course?.price || 0;
  const finalAmount = Math.max(subtotal - discountAmount, 0);
  const [referralStatusType, setReferralStatusType] = useState(null); // "success" | "error"
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [loadingCoupons, setLoadingCoupons] = useState(false);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        setLoadingCoupons(true);
        const res = await axios.get(
          "https://mobileapp.backend.learnosphere.in/api/route/fetchAvailableCoupons"
        );
        setAvailableCoupons(res.data || []);
      } catch (error) {
        console.error("Failed to fetch coupons", error);
      } finally {
        setLoadingCoupons(false);
      }
    };

    fetchCoupons();
  }, []);




  // 🚨 Protect Page From Direct Access
  useEffect(() => {
    const courseParam = searchParams.get("course");
    const userId = searchParams.get("userId");

    if (!courseParam || !userId) {
      router.replace("/Courses"); // redirect to safe page
      return;
    }
  }, [router, searchParams]);


  useEffect(() => {
    const courseParam = searchParams.get("course");
    const userId = searchParams.get("userId");
    const typeParam = searchParams.get("type");
    if (typeParam) setType(typeParam);

    if (courseParam) {
      try {
        const parsedCourse = JSON.parse(decodeURIComponent(courseParam));
        setCourse(parsedCourse);
      } catch (err) {
        console.error("Failed to parse course data", err);
      }
    }

    // Fetch user details
    if (userId) {
      axios
        .post("https://mobileapp.backend.learnosphere.in/api/route/getStudentDetailsById", {
          userId,
        })
        .then((res) => {
          setUser(res.data);
               trackEvent("PAYMENT_PAGE_VISITED", { 
            course_id: parsedCourse?.id || parsedCourse?._id, 
            course_title: parsedCourse?.name, 
            type: typeParam 
          });
        })
        .catch((err) => {
          console.error("Failed to fetch user:", err);
        });
    }
  }, [searchParams]);

 const applyReferralCode = async (codeFromList) => {
    const codeToApply = codeFromList ?? referralCode;
    if (!codeToApply.trim()) {
      setReferralStatus("Please enter a referral code");
      setReferralStatusType("error");
      return;
    }

    try {
      const res = await axios.post(
        "https://mobileapp.backend.learnosphere.in/api/route/verifyCouponCode",
        {
          code: codeToApply,
          //courseId: course._id,
          userId: user.userId,
          amount: course.price,
        }
      );

      if (res.status === 200 && res.data.success) {
        setDiscountAmount(res.data.discountAmount || 0);
        setReferralStatus(res.data.message || "Coupon applied successfully");
        setReferralStatusType("success");
        setReferralCode(codeToApply); // sync input
      }
    } catch (err) {
      /**
       * Backend-controlled failures:
       * 400 → minimumOrderValueNotMet
       * 403 → selfReferralAttempt
       * 404 → invalidCouponOrReferralCode
       * 409 → already used / expired / no active offer
       * 500 → unexpectedServerError
       */

      const backendMessage =
        err.response?.data?.message ||
        "Something went wrong while applying the coupon";

      setReferralStatus(backendMessage);
      setReferralStatusType("error");
      setDiscountAmount(0);
    }
  };

  const applyCouponFromList = (code) => {
    setReferralCode(code);
    applyReferralCode();
  };

  if (!course || !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handlePayment = () => {

    const studentId = user?.userId || user?.id || user?._id;
    const commonEventData = {
      course_id: course?.id || course?._id,
      course_title: course?.name,
      amount: finalAmount,
      subtotal: subtotal,
      discount_amount: discountAmount,
      referral_code: referralCode || null,
      payment_method: selectedMethod,
      type: type || "normal",
      user_id: studentId,
      email: user?.gmail || user?.email,
    };

    if (type === "trial") {
      // Run trial payment flow
      startTrialFlow({
        course,
        user,
        onSuccess: (data) => {
          trackEvent(
            EVENT_NAMES.PAYMENT_SUCCESS,
            {
              ...commonEventData,
              amount: 11,
              plan: "trial",
              invoice_url: data?.invoiceUrl || null,
            },
            studentId
          );
          Swal.fire({
            icon: "success",
            title: "Trial Activated!",
            text: "Enjoy your 7-day trial. Subscription will start after trial period.",
          }).then(() => {
            openStoreLinks();
          });
        },
        onFailure: (msg) => {
           trackEvent(
            EVENT_NAMES.PAYMENT_FAILED,
            {
              ...commonEventData,
              amount: 11,
              plan: "trial",
              reason: typeof msg === "string" ? msg : (msg?.message || msg?.reason || "Trial failed"),
              error: typeof msg === "object" ? msg : null,
            },
            studentId
          );
          Swal.fire({
            icon: "error",
            title: "Trial Failed",
            text: msg,
            confirmButtonText: "Retry",
          })
        }
      });
    } else {
      // Normal payment flow
      openRazorpay({
        finalAmount,
        course,
        user,
        onSuccess: (data) => {
          trackEvent(
            EVENT_NAMES.PAYMENT_SUCCESS,
            {
              ...commonEventData,
              invoice_url: data?.invoiceUrl || null,
            },
            studentId
          );
          Swal.fire({
            icon: "success",
            title: "Payment Successful!",
            text: "You are now enrolled in the course.",
          }).then(() => {
            openStoreLinks();
          });
        },
        onFailure: (msg) => {
           trackEvent(
            EVENT_NAMES.PAYMENT_FAILED,
            {
              ...commonEventData,
              reason: typeof msg === "string" ? msg : (msg?.message || msg?.reason || "Payment failed"),
              error: typeof msg === "object" ? msg : null,
            },
            studentId
          );
          Swal.fire({
            icon: "error",
            title: "Payment Failed",
            text: msg,
            confirmButtonText: "Try Again",
          })
        }
      });
    }
  };

  const openStoreLinks = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent)) {
      // Android → Play Store
      window.open(
        "https://play.google.com/store/apps/details?id=com.karotaraj.learnosphere_main",
        "_blank"
      );
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      // iOS → App Store
      window.open(
        "https://apps.apple.com/in/app/learnosphere-learning-app/id6748979882",
        "_blank"
      );
    } else {
      // Windows, macOS, Linux → Website
      window.location.href = "/Userdashboard/Home";
    }
  };



  return (
 <div className="min-h-screen bg-white flex flex-col justify-between">
      <main className={`w-full mx-auto px-4 py-6 mb-32 ${type === "trial" ? "sm:max-w-2xl" : "sm:max-w-5xl"}`}>

        <div className="flex items-center justify-between mb-6">
          {/* <button
            onClick={() => router.back()}
            className="flex items-center text-orange-600 hover:text-orange-700 text-sm font-medium"
           >
            <FiArrowLeft className="mr-2 text-lg" />
            Back
           </button> */}
          <h1 className="text-xl md:text-2xl font-bold text-orange-600 flex-1 text-center -ml-1 md:-ml-8">
            Order Summary
          </h1>
          <div className="w-[60px]" />{" "}
          {/* Spacer to balance back button width */}
        </div>
        <div className={`grid gap-6 ${type === "trial"
          ? "grid-cols-1 md:grid-cols-1"
          : "grid-cols-1 md:grid-cols-3"
          }`}>
          <div className="md:col-span-2 space-y-6">
            {/* Course Info */}
            <div className="bg-white shadow rounded-xl p-5 space-y-4 border">
              <div>
                <p className="text-sm text-gray-500">Course</p>
                <p className="text-xl font-semibold text-gray-800">{course.name}</p>
              </div>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <FaCalendarAlt className="text-orange-500" />
                  <span>{course.duration || "7 days"}</span>
                </div>
              </div>

              <div className="mt-3">
                <p className="text-sm text-gray-500">Initial Payment</p>
                <p className="text-2xl font-bold text-green-600">₹{Math.max(course.price - discountAmount, 0)}</p>
                {course.renewPrice && (
                  <p className="text-sm text-gray-500 mt-1">
                    Then ₹{course.renewPrice}/month after {course.duration}
                  </p>
                )}
                {!course.renewPrice && (
                  <p className="text-sm text-gray-500 mt-1">One-time payment</p>
                )}
              </div>
            </div>

            {/* Payment Method */}
            <div className="shadow rounded-xl p-5 mt-6 space-y-4 border">
              <p className="text-md font-semibold text-gray-800">
                Choose Payment Method
              </p>
              <div className="grid grid-cols-1 gap-4">
                <PaymentTile
                  method="upi"
                  selectedMethod={selectedMethod}
                  setSelectedMethod={setSelectedMethod}
                  Icon={FaGooglePay}
                  label="UPI"
                />
                <PaymentTile
                  method="card"
                  selectedMethod={selectedMethod}
                  setSelectedMethod={setSelectedMethod}
                  Icon={FaCreditCard}
                  label="Credit / Debit Card"
                />
                <PaymentTile
                  method="netbanking"
                  selectedMethod={selectedMethod}
                  setSelectedMethod={setSelectedMethod}
                  Icon={FaUniversity}
                  label="Net Banking"
                />
                <PaymentTile
                  method="wallet"
                  selectedMethod={selectedMethod}
                  setSelectedMethod={setSelectedMethod}
                  Icon={FaWallet}
                  label="Wallet"
                />
                <PaymentTile
                  method="emi"
                  selectedMethod={selectedMethod}
                  setSelectedMethod={setSelectedMethod}
                  Icon={FaMoneyCheckAlt}
                  label="EMI Options"
                />
                <PaymentTile
                  method="paylater"
                  selectedMethod={selectedMethod}
                  setSelectedMethod={setSelectedMethod}
                  Icon={FaMoneyCheckAlt}
                  label="Pay Later"
                />
              </div>
            </div>


            {/* Security Section */}
            <div className="text-center text-sm text-gray-500 mt-6">
              <div className="flex justify-center gap-3 items-center">
                <FaLock className="text-green-600 text-lg" />
                <span>100% Secure Payment</span>
              </div>
              <div className="flex justify-center gap-6 mt-3 opacity-70 text-2xl text-orange-600">
                <RiSecurePaymentLine title="Secure Payment" />
                <SiLetsencrypt title="SSL Secured" />
                <SiTrustpilot title="PCI DSS Compliant" />
              </div>
            </div>
          </div>
          {/* Referral Code Section */}
          {type !== "trial" && (
            <div className="md:col-span-1 space-y-6 sticky top-6">

              {/* Coupons Card */}
              <div className="border rounded-xl p-5 shadow bg-white">
                <h3 className="text-lg font-semibold text-gray-800 my-3">
                  Apply Referral Code
                </h3>

               {/* 👉 SHOW INPUT ONLY IF NO COUPON APPLIED */}
                {discountAmount === 0 ? (
                  <>
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="Enter Coupon Code"
                        value={referralCode}
                        onChange={(e) =>
                          setReferralCode(e.target.value.toUpperCase())
                        }
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-20 text-sm uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-orange-400"
                      />
                    </div>

                    <button
                      onClick={() => applyReferralCode()}
                      className="text-white bg-orange-600 hover:bg-orange-700 font-semibold p-2 text-center rounded-xl w-full my-2 text-sm"
                    >
                      APPLY
                    </button>


                  </>
                ) : (
                  /* 👉 SHOW SAVINGS CARD AFTER APPLY */
                  <div className="mt-4 bg-gray-50 rounded-lg p-4 flex justify-between items-start">
                    <div>
                      <p className="text-sm text-green-800">🎉 You saved</p>
                      <p className="text-sm font-semibold text-gray-800">
                        ₹ {discountAmount} saved with {referralCode}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setDiscountAmount(0);
                        setReferralCode("");
                        setReferralStatus(null);
                        setReferralStatusType(null);
                      }}
                      className="text-red-500 text-xs font-semibold"
                    >
                      REMOVE
                    </button>
                  </div>
                )}


            
                {referralStatus && (
                  <div
                    className={`mt-3 flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${referralStatusType === "success"
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-600"
                      }`}
                  >
                    {referralStatusType === "success" ? (
                      <FaMoneyCheckAlt />
                    ) : (
                      <FaLock />
                    )}
                    <span>{referralStatus}</span>
                  </div>
                )}

                {/* Available Coupons */}
                <div className="mt-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    Available Coupons
                  </p>

                  {loadingCoupons && (
                    <p className="text-xs text-gray-500">Loading coupons...</p>
                  )}

                  {!loadingCoupons && availableCoupons.length === 0 && (
                    <p className="text-xs text-gray-400">
                      No coupons available at the moment
                    </p>
                  )}

                  <div className="space-y-3">
                    {availableCoupons.map((coupon) => (
                      <div
                        key={coupon.code}
                        className="flex justify-between items-center p-4 rounded-xl border bg-gradient-to-r from-green-50 to-emerald-50 hover:shadow-md transition"
                      >
                        <div>
                          <p className="text-sm font-bold text-green-700">
                            {coupon.code}
                          </p>
                          <p className="text-xs text-gray-600">
                            {coupon.description}
                          </p>
                        </div>

                        {discountAmount > 0 && referralCode === coupon.code ? (
                          <span className="text-xs font-semibold text-green-600">
                            APPLIED
                          </span>
                        ) : (
                          <button
                             onClick={() => applyReferralCode(coupon.code)}
                            className="text-xs font-semibold text-orange-600 hover:underline"
                          >
                            APPLY
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price Details Card */}
              <div className="border rounded-xl p-5 shadow bg-white">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Price Details
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>₹ {subtotal}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹ {discountAmount}</span>
                    </div>
                  )}

                  <div className="border-t pt-3 flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-800">Amount Payable</p>
                      <p className="text-xs text-gray-500">(Valid for 12 Month)</p>
                    </div>
                    <p className="text-xl font-bold">
                      ₹ {finalAmount}
                    </p>
                  </div>
                </div>
              </div>
            </div>)}
        </div >
      </main>

      {/* Fixed Bottom Payment Bar */}
      <div className={`fixed z-50 bottom-0 w-full bg-white shadow-md mt-2 py-3 px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4 mx-auto left-1/2 transform -translate-x-1/2 border-t border-orange-300 ${type === "trial" ? "sm:max-w-2xl" : "sm:max-w-5xl"}`}>
        {/* Price Details */}
        <div className="text-center sm:text-left">
          <div className="flex items-center justify-center gap-3">

            <p className="text-gray-600 text-sm">Initial Amount :</p>
            <p className="text-lg sm:text-xl font-bold text-green-700">
              ₹{Math.max(course.price - discountAmount, 0)}
            </p>
          </div>

          {course.renewPrice && (
            <p className="text-xs text-gray-500 mt-1">
              Then ₹{course.renewPrice}/month starting after {course.duration}
            </p>
          )}
        </div>

        {/* Button */}
        <button
          onClick={handlePayment}
          className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 transition text-white px-6 py-3 rounded-xl font-semibold"
        >
          Pay Now
        </button>
      </div>
    </div>

  );
};

const PaymentTile = ({
  method,
  selectedMethod,
  setSelectedMethod,
  Icon,
  label,
}) => (
  <div
    onClick={() => setSelectedMethod(method)}
    className={`cursor-pointer flex items-center gap-3 p-4 rounded-xl border transition w-full ${selectedMethod === method
      ? "border-orange-500 bg-orange-50"
      : "border-gray-300"
      }`}
  >
    <Icon className="text-2xl text-orange-600" />
    <span className="text-md font-medium">{label}</span>
  </div>
);

export default PaymentPage;
