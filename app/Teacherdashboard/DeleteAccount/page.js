"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import axios from "axios";
import { useSession, signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";

const DeleteAccount = () => {
  const [confirmText, setConfirmText] = useState("");
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState("");
  
  const { data: session, status } = useSession();

  const sendOtp = async () => {
    try {
      const response = await axios.post(`${WEB_BACKEND_URL}/api/route/deleteTeacher/` + session.user.email);
      alert(response.data.message);
      setIsOtpSent(true);
      setShowOtpPopup(true);
    } catch (error) {
      console.error("Error sending OTP:", error);
      setError("Failed to send OTP. Please try again.");
    }
  };

  const verifyOtpAndDelete = async () => {
    try {
      const response = await axios.post(`${WEB_BACKEND_URL}/api/route/verifyDeleteTeacher`, {
        email: session.user.email,
        otp,
      });
      alert(response.data.message);
      signOut({ callbackUrl: "/Signin" });
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError("Invalid or expired OTP. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg font-Poppins min-h-screen">
      <h2 className="text-xl font-bold mb-2">Before you go, would you mind letting us know why?</h2>
      <p className="text-gray-600 mb-4">Your feedback will help us improve our services for others.</p>

      <div className="bg-red-100 p-3 rounded-md mb-4 text-red-700">
        <strong>This action is permanent and irreversible</strong>
        <p className="text-sm">Confirm your account deletion by typing 'DELETE' in the box below.</p>
      </div>

      <input
        type="text"
        className="w-full border p-2 rounded-md mb-4"
        placeholder="Type 'DELETE' to confirm"
        value={confirmText}
        onChange={(e) => setConfirmText(e.target.value)}
      />

      <button
        className={`w-full p-3 text-white rounded-md ${
          confirmText === "DELETE" ? "bg-red-600 hover:bg-red-700" : "bg-gray-400 cursor-not-allowed"
        }`}
        disabled={confirmText !== "DELETE"}
        onClick={sendOtp}
      >
        Delete my account
      </button>

      {/* OTP Verification Popup */}
      {showOtpPopup && (
        <div className="fixed inset-0 flex items-center z-50 justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Enter OTP</h2>
            <p className="text-gray-700 mb-4">An OTP has been sent to your registered email. Please enter it below:</p>
            <input
              type="text"
              className="w-full border p-2 rounded-md mb-4"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                onClick={() => setShowOtpPopup(false)}
              >
                Cancel
              </button>
              <button
                onClick={verifyOtpAndDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Verify & Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteAccount;
