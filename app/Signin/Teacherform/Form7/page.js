"use client";
import React, { useContext, useEffect, useState, Suspense } from "react";
import { FormContext } from "@/src/context/FormContext";
import messages from "@/src/utils/popupMessage";
import { useRouter, useSearchParams } from "next/navigation";
import { trackEvent } from "@/src/lib/eventTracker";

const Form7Content = ({ onBack }) => {
  const { state, dispatch } = useContext(FormContext);
  const [baseRate, setBaseRate] = useState(state.baseRate || "");
  const [referralCode, setReferralCode] = useState(state.referred_by || "");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [referralError, setReferralError] = useState(""); // Error message state

  useEffect(() => {
    const refCodeFromURL = searchParams.get("ref");
    if (refCodeFromURL) {
      setReferralCode(refCodeFromURL);
      dispatch({
        type: "UPDATE_FORM_DATA",
        payload: { referred_by: refCodeFromURL },
      });
    }
  }, [searchParams, dispatch]);

  const handleBaseRateChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,8}(\.\d{0,2})?$/.test(value)) {
      setBaseRate(value);
      dispatch({
        type: "UPDATE_FORM_DATA",
        payload: { baseRate: value },
      });
    }
  };

  const handleReferralCodeChange = (e) => {
    setReferralCode(e.target.value);
    dispatch({
      type: "UPDATE_FORM_DATA",
      payload: { referred_by: e.target.value },
    });
    setReferralError("");
  };

  const handleSubmit = async (e) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    e.preventDefault();

    if (
      !baseRate ||
      isNaN(baseRate) ||
      parseFloat(baseRate) <= 0 ||
      parseFloat(baseRate) > 4000
    ) {
      setError(`Base rate should be less than or equal to ${state.currencySymbol || "₹"}4000.`);
      setIsSubmitting(false);
      return;
    } else {
      setError("");
    }

    try {
      const response = await fetch(
        "https://learnospherebackend.learnosphere.in/api/route/submitTeachers",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...state, baseRate, referralCode }),
        }
      );
      const result = await response.json();
      if (response.ok) {
        trackEvent("TEACHER_APPLICATION_FORM_SUBMITTED", {
          ...state,
          name: state?.name,
          email: state?.email,
          mobilenumber: state?.mobilenumber,
        });

        setMessageType("success");
        setMessage(messages.success);
        router.push("/Teacherdashboard");
      } else {
        // ✅ Referral Code Error Check Karo
        if (result.message.includes("Invalid referral code")) {
          setError(
            "Invalid referral code. Please enter a valid referral code."
          );
        } else {
          throw new Error(result.message);
        }
      }
    } catch (error) {
      setMessageType("error");
      setMessage(messages.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-[#fff] p-2 md:p-8 shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Set your hourly base rate</h2>
      <p className="mb-4">
        To get more students to your profile, we recommend a base price of
        &nbsp; {state.currencySymbol || "₹"}500 per hour for new tutors.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="baseRate"
          >
            Price in {state.currencySymbol || "₹"} only
          </label>

          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-700 text-lg font-semibold">
              {state.currencySymbol || "₹"}
            </span>

            <input
              type="text"
              id="baseRate"
              name="baseRate"
              value={baseRate}
              onChange={handleBaseRateChange}
              placeholder="Enter your hourly base rate"
              className="shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-b-2 border-blue-500"
              style={{ outline: "none" }}
            />
          </div>

          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>

        <div className="mb-6 text-gray-600 text-sm">
          Change your base rate in settings after approval.
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="referralCode"
          >
            Referral Code (Optional)
          </label>
          <div className="relative">
            <input
              type="text"
              id="referred_by"
              name="referred_by"
              value={referralCode}
              onChange={handleReferralCodeChange}
              placeholder="Enter Referral Code"
              className="shadow appearance-none border border-gray-300 p-3 w-60 m-auto rounded-lg py-2 pl-8 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {error && <p className="text-red-500 ">{error}</p>}
          </div>
        </div>
        {message && (
          <div
            className={`p-4 mb-4 text-white ${
              messageType === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {message}
          </div>
        )}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onBack}
            className="bg-gray-500 hover:bg-gray-400 text-white py-2 px-4 rounded"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-orange-600 hover:bg-orange-500 text-white py-2 px-4 rounded ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Submitting..." : "Complete Registration"}
          </button>
        </div>
      </form>
    </div>
  );
};

const Form7 = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Form7Content {...props} />
  </Suspense>
);

export default Form7;
