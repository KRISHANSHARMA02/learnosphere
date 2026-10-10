"use client";
import React, { useEffect, useState } from "react";
import Picture1 from "@/public/BHIM_SVG_Logo.svg.svg";
import Picture2 from "@/public/upi-ar21.svg";
import Image from "next/image";
import QRCode from "@/public/QrImg.png";
import Gpay from "@/public/google-pay-primary-logo-logo-svgrepo-com.svg";
import Paytm from "@/public/paytm.svg";
import phonepe from "@/public/icons8-phone-pe.svg";
import WhatsApp from "@/public/whatsapp.svg";
import Amazon from "@/public/amazon-pay-svgrepo-com.svg";

import axios from "axios";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { trackEvent } from "@/src/lib/eventTracker";

const QR = () => {
  const [amount, setAmount] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const { data: session, status } = useSession();
  const [profileData, setProfileData] = useState(null);
  const [paymentMessage, setPaymentMessage] = useState("");

  useEffect(() => {
    const fetchProfileData = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const response = await axios.post(
            "https://learnospherebackend.learnosphere.in/api/route/getStudentByEmail",
            { gmail: session.user.email }
          );
          setProfileData(response.data);

          // Fetch payment status message
          const paymentStatusResponse = await axios.post(
            "https://learnospherebackend.learnosphere.in/api/route/getPaymentStatusMessage",
            { gmail: session.user.email }
          );
          setPaymentMessage(paymentStatusResponse.data.message);
        } catch (error) {
        
        }
      }
    };

    fetchProfileData();
  }, [session, status]);

  // Handler for amount validation
  const handleAmountChange = (e) => {
    const value = e.target.value;

    // Only allow digits, max 4 digits, and max amount of 1000
    if (/^\d{0,4}$/.test(value) && (value === "" || parseInt(value) <= 1000)) {
      setAmount(value);
      setErrors((prev) => ({ ...prev, amount: null })); // Clear error on valid input
    } else {
      setErrors((prev) => ({ ...prev, amount: "Amount must be a number." }));
    }
  };

  // Handler for mobile number validation
  const handleMobileChange = (e) => {
    const value = e.target.value;

    // Only allow digits and ensure it is exactly 10 digits
    if (/^\d{0,10}$/.test(value)) {
      setMobileNumber(value);
      setErrors((prev) => ({ ...prev, mobile_number: null })); // Clear error on valid input
    } else {
      setErrors((prev) => ({
        ...prev,
        mobile_number: "Mobile number must be exactly 10 digits.",
      }));
    }
  };

  // Handler for reference number validation
  const handleReferenceNumberChange = (e) => {
    const value = e.target.value;

    // Only allow digits and ensure it is a maximum of 12 digits
    if (/^\d{0,12}$/.test(value)) {
      setReferenceNumber(value);
      setErrors((prev) => ({ ...prev, reference_number: null })); // Clear error on valid input
    } else {
      setErrors((prev) => ({
        ...prev,
        reference_number: "Reference number must be 12 digits.",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for errors before submission
    const newErrors = {};
    if (!amount) newErrors.amount = "Amount is required.";
    if (!referenceNumber) {
      newErrors.reference_number = "Reference number is required.";
    } else if (referenceNumber.length !== 12) {
      newErrors.reference_number = "Reference number must be 12 digits.";
    }
    if (!mobileNumber) newErrors.mobile_number = "Mobile number is required.";
    if (mobileNumber.length !== 10)
      newErrors.mobile_number = "Mobile number must be 10 digits.";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return; // Stop submission if there are errors
    }

    // Extract student details from profileData
    const studentEmail = profileData?.gmail; // Assuming profileData contains gmail
    const studentRegNumber = profileData?.registrationNumber; // Assuming registration number field is present
    const studentMobileNumber = profileData?.mobileNumber; // Assuming mobile number field is present

    try {
      const response = await axios.post(
        "https://learnospherebackend.learnosphere.in/api/route/submitPaymentfromStudent",
        {
          amount,
          reference_number: referenceNumber,
          mobile_number: mobileNumber,
          student_email: studentEmail, // Send student email
          registration_number: studentRegNumber, // Send registration number
          student_mobile_number: studentMobileNumber, // Send student mobile number
        }
      );

      trackEvent("QR_PAYMENT_PROOF_SUBMITTED", {
        amount,
        reference_number: referenceNumber,
        mobile_number: mobileNumber,
        email: studentEmail,
        registration_number: studentRegNumber,
        student_mobile_number: studentMobileNumber,
      });

      // If the submission is successful, show success message using SweetAlert
      await Swal.fire({
        title: "Success!",
        text: "Payment details submitted successfully",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Clear form and messages
      setAmount("");
      setReferenceNumber("");
      setMobileNumber("");
      setErrors({});
      setMessage("");
      // Refresh the page after successful submission
    window.location.reload();
    
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Show validation errors for each field
        setErrors(error.response.data.errors || {});
        setMessage(
          error.response.data.message || "Validation errors occurred."
        );
      } else {
        // Show general error message for network or server issues
        setMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="md:w-[80vw] shadow-2xl flex justify-center items-center">
      <div className="relative w-full p-6 mt-1 mb-4 rounded-lg m-auto perspective-1000">
        {/* Front Side */}
        <div className="flex flex-col gap-4 w-full items-center bg-white p-2 rounded-lg">
          <h2 className="font-bold text-3xl text-center text-orange-600">
            Scan QR Code
          </h2>

          {/* Key Benefits Section */}
          <h3 className="font-bold text-lg text-gray-800 mt-4">
            Key Benefits of Using the QR Code System:
          </h3>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            <li>
              🌟 <strong>Quick Access:</strong> Instantly access your dashboard
              without the need for manual logins.
            </li>
            <li>
              🔒 <strong>Enhanced Security:</strong> Our QR code system reduces
              the risk of unauthorized access to your account.
            </li>
            <li>
              📱 <strong>User-Friendly:</strong> Simply scan the code with your
              mobile payment app for a hassle-free experience.
            </li>
            <li>
              💬 <strong>Support at Hand:</strong> Our support team is ready to
              assist you with any queries or issues related to the QR code.
            </li>
          </ul>

          {/* Payment Alert */}
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-4 text-gray-800">
            <p className="font-bold text-lg">🚨 Payment Alert 🚨</p>
            <p className="text-sm">
              Please make a payment of ₹11 to complete the transaction. Scan the
              QR code below to proceed with your payment.
            </p>
          </div>
          {/* Display Payment Status Message */}
          {paymentMessage && (
            <div className="bg-red-100 border-l-4 border-yellow-500 p-4 mb-4 text-gray-800 rounded-lg shadow-sm flex items-start flex-wrap">
              <svg
                className="w-6 h-6 text-yellow-600 mr-2 sm:w-6 sm:h-6 md:w-6 md:h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12A9 9 0 1112 3a9 9 0 019 9z"
                />
              </svg>
              <div>
                <p className="text-sm sm:text-sm md:text-lg">
                  {paymentMessage}
                </p>
              </div>
            </div>
          )}

          <Image
            className="h-60 w-60 my-4"
            height={500}
            width={500}
            src={QRCode}
            alt="QR Code"
          />

          <div className="flex flex-wrap justify-center gap-4 items-center">
            <Image
              className="h-8 w-24"
              height={200}
              width={200}
              src={Gpay}
              alt="Gpay"
            />
            <Image
              className="h-8 w-24"
              height={200}
              width={200}
              src={Paytm}
              alt="Paytm"
            />
            <Image
              className="h-8 w-24"
              height={200}
              width={200}
              src={phonepe}
              alt="PhonePe"
            />
            <Image
              className="h-8 w-24"
              height={200}
              width={200}
              src={WhatsApp}
              alt="WhatsApp Pay"
            />
            <Image
              className="h-15 w-24"
              height={200}
              width={200}
              src={Amazon}
              alt="Amazon Pay"
            />
          </div>

          <div className="flex gap-3 items-center">
            <Image
              className="h-8 w-24"
              height={200}
              width={200}
              src={Picture1}
              alt="UPI"
            />
            <p className="text-gray-400 text-3xl">|</p>
            <Image
              className="h-8 w-24"
              height={200}
              width={200}
              src={Picture2}
              alt="Bhim UPI"
            />
          </div>

          <p className="text-xs text-center text-gray-600">
            * We accept payments through UPI, Google Pay, Paytm, PhonePe,
            WhatsApp Pay, and Amazon Pay.
          </p>

          {/* Payment Process Section */}
          <h3 className="font-bold text-lg text-gray-800">
            How to Complete Your Payment:
          </h3>
          <ol className="list-decimal list-inside text-gray-600 mb-4">
            <li>
              Open your payment app and select the QR code scanning option.
            </li>
            <li>Scan the QR code displayed on your screen.</li>
            <li>
              Review the payment details and confirm the transaction for ₹11.
            </li>
            <li>
              After completing the payment, fill out the required payment
              details on our platform.
            </li>
            <li>
              Enter the amount ₹11, ensuring it matches the transaction amount.
            </li>
            <li>
              Provide a 12-digit reference number for your payment (usually sent
              by your payment app).
            </li>
            <li>
              Input the mobile number currently used for payment for
              verification.
            </li>
          </ol>

          <p className="text-gray-600 text-center">
            By using this QR code verification system, you're contributing to a
            more secure and efficient payment process at LearnOsphere.
          </p>
        </div>

        {/* Back Side */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 items-center w-full mt-8" // Added mt-8 for spacing between front and back
        >
          <div className="flex flex-col gap-4 items-center w-full">
            <h2 className="font-bold text-2xl text-center">
              Enter Payment Details
            </h2>

            {/* Amount Input with Validation */}
            <div className="w-[50vw]">
              <label htmlFor="amount" className="block text-gray-700 mb-1">
                Amount <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="amount"
                placeholder="Enter Amount"
                value={amount}
                onChange={handleAmountChange}
                className="border p-2 rounded-md w-full text-center shadow-md focus:outline-none focus:ring focus:ring-orange-600"
              />
              {errors.amount && (
                <p className="text-red-500 text-sm">{errors.amount}</p>
              )}
            </div>

            {/* Reference Number Input */}
            <div className="w-[50vw]">
              <label
                htmlFor="referenceNumber"
                className="block text-gray-700 mb-1"
              >
                Reference Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="referenceNumber"
                placeholder="Enter Reference Number (12 - digits)"
                value={referenceNumber}
                onChange={handleReferenceNumberChange}
                className="border p-2 rounded-md w-full text-center shadow-md focus:outline-none focus:ring focus:ring-orange-600"
              />
              {errors.reference_number && (
                <p className="text-red-500 text-sm">
                  {errors.reference_number}
                </p>
              )}
            </div>

            {/* Mobile Number Input */} 
            <div className="w-[50vw]">
              <label
                htmlFor="mobileNumber"
                className="block text-gray-700 mb-1"
              >
                Mobile Number (used for Payment){" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="mobileNumber"
                placeholder="Enter mobile number which is currently used for payment"
                value={mobileNumber}
                onChange={handleMobileChange}
                className="border p-2 rounded-md w-full text-center shadow-md focus:outline-none focus:ring focus:ring-orange-600"
              />
              {errors.mobile_number && (
                <p className="text-red-500 text-sm">{errors.mobile_number}</p>
              )}
            </div>

            <button
              type="submit"
              className="bg-orange-600 text-white font-bold p-2 rounded-md hover:bg-orange-500 transition duration-200"
            >
              Submit Now
            </button>

            {message && (
              <p className="text-center text-red-500 mt-4">{message}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default QR;
