"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import { useState, useRef, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { Socialloginstudent, doCredentialLogin } from "@/app/actions";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash, FaCheckCircle, FaTimes } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";
import { UAParser } from "ua-parser-js";
import { trackEvent } from "../src/lib/eventTracker";

const SignupForm = () => {
  // Existing States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // New States for OTP
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [timer, setTimer] = useState(0); // countdown seconds
  const [canResend, setCanResend] = useState(false); // controls resend button

  const router = useRouter();
  const inputRefs = useRef([]); // Refs for OTP inputs

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // --- OTP Logic Start ---

  // Handle OTP Input Change (Auto focus next)
  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input
    if (element.value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle Backspace (Focus previous)
  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  useEffect(() => {
    let interval;

    if (showOtpModal) {
      setTimer(60); // set 1 minute timer
      setCanResend(false);

      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [showOtpModal]);

  // Send OTP to Email
  const handleSendOtp = async () => {
    // Basic email regex validation before sending
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setEmailError("Please enter a valid email address first.");
      return;
    }
    setEmailError("");
    setIsSendingOtp(true);

    try {
      const res = await axios.post(
        `${WEB_BACKEND_URL}/api/route/send_otp_email`,
        { email }
      );

      if (res.data.alreadyVerified) {
        setIsEmailVerified(true);
        setIsSendingOtp(false);
        return;
      }

      setShowOtpModal(true);
      setIsSendingOtp(false);

      Swal.fire({
        icon: "info",
        title: "OTP Sent",
        text: `We sent a 6-digit code to ${email}`,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      setIsSendingOtp(false);
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Failed to send OTP",
        icon: "error",
      });
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length < 6) {
      Swal.fire({
        icon: "warning",
        title: "Invalid OTP",
        text: "Please enter all 6 digits.",
      });
      return;
    }

    setIsVerifyingOtp(true);
    try {
      // API call to verify OTP
      // Replace with your actual backend endpoint
      await axios.post(`${WEB_BACKEND_URL}/api/route/verify_email_otp`, {
        email,
        otp: enteredOtp,
      });

      setIsVerifyingOtp(false);
      setShowOtpModal(false);
      setIsEmailVerified(true);

      Swal.fire({
        icon: "success",
        title: "Verified!",
        text: "Your email has been verified successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      setIsVerifyingOtp(false);
      Swal.fire({
        title: "Verification Failed",
        text: error.response?.data?.message || "Invalid OTP Code",
        icon: "error",
      });
      // Reset OTP inputs on failure
      setOtp(new Array(6).fill(""));
      inputRefs.current[0].focus();
    }
  };
  // --- OTP Logic End ---

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setNameError("");
    setEmailError("");
    setPasswordError("");
    // Check if email is verified
    if (!isEmailVerified) {
      setEmailError("Please verify your email address before signing up.");
      return;
    }

    try {
      // Make the API request to the backend
      const response = await axios.post(
        `${WEB_BACKEND_URL}/api/route/studentsignup`, //${WEB_BACKEND_URL}/api/route/studentsignup
        { name, email, password }
      );
      trackEvent("STUDENT_REGISTERED", { email: email, name: name });
      // Handle success
      Swal.fire({
        title: "Success!",
        text: "Signup successful!",
        icon: "success",
        confirmButtonText: "OK",
      });

      const tempPassword = password; // save before clearing

      // Clear input fields
      setName("");
      setEmail("");
      setPassword("");
      setOtp(new Array(6).fill(""));
      setIsEmailVerified(false);

      // Get device information using UAParser
      const parser = new UAParser();
      const result = parser.getResult(); // Extract details from userAgent string

      // Extract device details
      const deviceInfo = result.device; // This contains device type, model, etc.
      const osInfo = result.os; // This contains OS information like name and version
      const browserInfo = result.browser; // This contains browser name and version
      const userAgent = navigator.userAgent; // Raw user agent string

      // You can use these details as per your requirement
      const deviceType = deviceInfo.type || "Unknown Device"; // If no specific device type, default to Unknown
      const deviceModel = deviceInfo.model || "Unknown Model"; // If model is not available, default to Unknown
      const osName = osInfo.name || "Unknown OS"; // If OS name is not available, default to Unknown
      const osVersion = osInfo.version || "Unknown Version"; // If OS version is not available, default to Unknown
      const browserName = browserInfo.name || "Unknown Browser"; // If browser name is not available, default to Unknown
      const browserVersion = browserInfo.version || "Unknown Version"; // If browser version is not available, default to Unknown

      // Automatically log the user in and create a session
      const loginResponse = await doCredentialLogin({
        redirect: false,
        identifier: email, // Use email as the identifier for login
        password: tempPassword, // Pass the same password used for signup
        role: "student",
        deviceInfo: {
          osInfo,
          userAgent,
          deviceType,
          deviceModel,
          osName,
          osVersion,
          browserName,
          browserVersion,
        },
      });

      if (loginResponse?.error) {
        setIsEmailVerified(false);
        // Handle login error
        Swal.fire({
          title: "Registration successful, but login failed!",
          text: loginResponse.error,
          icon: "error",
        });

        return;
      }

      // Redirect to Student Form
      window.location.href = "/StudentForm";
    } catch (error) {
      if (error.response && Array.isArray(error.response.data.errors)) {
        const errors = error.response.data.errors;

        // Display each error individually using SweetAlert
        for (const error of errors) {
          const param = error.param
            ? `${error.param.charAt(0).toUpperCase() + error.param.slice(1)}`
            : "Field";
          await Swal.fire({
            title: "Validation Error!",
            text: `${param}: ${error.msg}`,
            icon: "error",
            confirmButtonText: "OK",
          });

          // Set field errors for inline display
          if (error.param === "name") {
            setNameError(error.msg);
          } else if (error.param === "email") {
            setEmailError(error.msg);
          } else if (error.param === "password") {
            setPasswordError(error.msg);
          }
        }
      } else {
        // Show generic error message
        await Swal.fire({
          title: "Error!",
          text: "Something went wrong. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  return (
    <div className="relative">
      {/* Social Login */}
      <form action={Socialloginstudent}>
        <button
          type="submit"
          name="action"
          value="google"
          className="w-full py-2 px-4 bg-gray-100 text-gray-800 font-semibold rounded-lg shadow-md flex items-center justify-center hover:bg-gray-200 transition"
        >
          <FcGoogle className="mr-2 text-2xl" />
          Continue with Google
        </button>
      </form>

      <div className="my-4 flex items-center">
        <hr className="flex-1 border-gray-300" />
        <span className="mx-4 text-gray-500">or</span>
        <hr className="flex-1 border-gray-300" />
      </div>

      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="relative mb-6 font-Poppins">
          <input
            type="text"
            id="name"
            className={`peer w-full bg-transparent outline-none px-4 py-2 border ${
              nameError ? "border-red-500" : "border-gray-300"
            } rounded-lg text-base focus:border-orange-500 focus:ring-0 transition-all duration-150`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label
            htmlFor="name"
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 px-2 bg-white text-gray-700 text-sm font-semibold transition-all duration-150 ${
              name ? "top-[-10px] left-2 text-sm text-orange-500" : ""
            } peer-focus:-top-2 peer-focus:left-2 peer-focus:text-sm peer-focus:text-orange -500`}
          >
            Name<span className="text-red-500">*</span>
          </label>
          {nameError && (
            <p className="text-red-500 text-sm mt-1">{nameError}</p>
          )}
        </div>

        {/* Email Field with Verify Button */}
        <div className="relative w-full mb-6 font-Poppins">
          <input
            type="email"
            id="email"
            className={`peer w-full bg-transparent outline-none px-4 py-2 pr-24 border ${
              emailError
                ? "border-red-500"
                : isEmailVerified
                ? "border-green-500"
                : "border-gray-300"
            } rounded-lg bg-white text-base focus:border-orange-500 focus:shadow-md transition-all duration-150`}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setIsEmailVerified(false); // Reset verification if email changes
            }}
            readOnly={isEmailVerified} // Prevent changing email after verification
          />
          <label
            htmlFor="email"
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 px-2 bg-white text-gray-700 text-sm font-semibold transition-all duration-150 ${
              email ? "top-[-10px] left-2 text-sm text-orange-500" : ""
            } peer-focus:-top-2 peer-focus:left-2 peer-focus:text-sm peer-focus:text-orange-500`}
          >
            Email Address<span className="text-red-500">*</span>
          </label>

          {/* Verification Status/Button */}
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            {isEmailVerified ? (
              <span className="flex items-center text-green-600 font-semibold text-sm">
                <FaCheckCircle className="mr-1" /> Verified
              </span>
            ) : (
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={isSendingOtp || !email}
                className="text-xs bg-orange-600 text-white px-3 py-1.5 rounded hover:bg-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSendingOtp ? "Sending..." : "Verify"}
              </button>
            )}
          </div>

          {emailError && (
            <p className="text-red-500 text-sm mt-1">{emailError}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="relative mb-6 font-Poppins">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className={`peer w-full bg-transparent outline-none px-4 py-2 pr-12 border ${
              passwordError ? "border-red-500" : "border-gray-300"
            } rounded-lg text-base focus:border-orange-500 focus:shadow-md transition-all duration-150`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label
            htmlFor="password"
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 px-2 bg-white text-gray-700 text-sm font-semibold transition-all duration-150 ${
              password ? "top-[-10px] left-2 text-sm text-orange-500" : ""
            } peer-focus:-top-2 peer-focus:left-2 peer-focus:text-sm peer-focus:text-orange-500`}
          >
            Create Password<span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center px-3"
          >
            {showPassword ? (
              <FaEyeSlash className="text-gray-500" />
            ) : (
              <FaEye className="text-gray-500" />
            )}
          </button>
          {passwordError && (
            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
          )}
        </div>

        {/* Signup Button */}
        <button
          type="submit"
          className={`w-full py-2 px-4 text-white font-semibold rounded-lg shadow-md transition ${
            isEmailVerified
              ? "bg-orange-500 hover:bg-orange-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!isEmailVerified}
        >
          {isEmailVerified ? "Sign Up" : "Verify Email to Sign Up"}
        </button>
      </form>

      {/* --- OTP MODAL POPUP --- */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md relative animate-fade-in-up">
            {/* Close Button */}
            <button
              onClick={() => {
                setShowOtpModal(false);
                setIsSendingOtp(false); // Reset "Sending..." back to "Verify"
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            >
              <FaTimes size={20} />
            </button>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Verify OTP
              </h2>
              <p className="text-gray-600 text-sm">
                Enter the 6-digit code sent to{" "}
                <span className="font-semibold text-orange-600">{email}</span>
              </p>
            </div>

            {/* 6 Digit Input Grid */}
            <div className="flex justify-center gap-2 mb-6">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  ref={(el) => (inputRefs.current[index] = el)}
                  value={data}
                  onChange={(e) => handleOtpChange(e.target, index)}
                  onKeyDown={(e) => handleOtpKeyDown(e, index)}
                  onFocus={(e) => e.target.select()}
                  className="w-12 h-12 border-2 border-gray-300 rounded-lg text-center text-xl font-bold focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all"
                />
              ))}
            </div>

            <button
              onClick={handleVerifyOtp}
              disabled={isVerifyingOtp}
              className="w-full py-3 bg-orange-600 text-white font-bold rounded-lg shadow-lg hover:bg-orange-700 transition transform hover:-translate-y-1"
            >
              {isVerifyingOtp ? "Verifying..." : "Verify Code"}
            </button>

            <div className="text-center mt-4">
              {canResend ? (
                <button
                  onClick={handleSendOtp}
                  className="text-orange-600 font-semibold hover:underline"
                >
                  Resend OTP
                </button>
              ) : (
                <p className="text-gray-500 text-sm">
                  Resend available in{" "}
                  <span className="font-bold text-orange-600">{timer}s</span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignupForm;
