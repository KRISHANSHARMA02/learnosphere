"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Uparrow2 from "@/components/Uparrow";
import SEO from "@/components/Seo";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { Sociallogin, doCredentialLogin } from "../actions";

import Footer1 from "@/components/Footer1";
import axios from "axios";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash, FaRegClock } from "react-icons/fa";
import { trackEvent } from "@/src/lib/eventTracker";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import { set } from "date-fns";


const RegistrationForm = () => {

  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const [otpTimer, setOtpTimer] = useState(60); // Timer for OTP countdown
  const [emailValid, setEmailValid] = useState(false); // Track email validity
  const [otpVerified, setOtpVerified] = useState(false);
  const [emailVerifiedError, setEmailVerifiedError] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isLogingIn, setIsLogingIn] = useState(false);
    const [showModal, setShowModal] = useState(false);


  


  const [userdata, setuserdata] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserdata({
      ...userdata,
      [name]: value,
    });
    if (name === "email") {
      // Simple email validation using regex
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      setEmailValid(emailRegex.test(value)); // Update email validation state
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginSubmit = async (e) => {
    if (isLogingIn) return; // Prevent multiple requests

    setIsLogingIn(true); // Set loading state

    e.preventDefault();

    try {
      // Gather input from the form
      const { identifier, password } = userdata; // Assuming 'userdata' has 'identifier' instead of 'email'

      // Call the backend login function with the identifier
      const response = await doCredentialLogin({
        identifier,
        password,
        role: "teacher",
      });

      // Handle login errors
      if (response.error) {
        setSuccessMessage("");

        setErrors([
          {
            message:
              "*Login failed. Please enter valid email, mobile number, or registration number.",
          },
        ]);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Login failed. Please enter valid email, mobile number, or registration number.",
        });
        
      } else {
        setErrors([]);
        
        setSuccessMessage("You have successfully logged in.");
        Swal.fire({
          title: "Logged in successfully!",
          text: "You have successfully logged in.",
          icon: "success",
        });

        // Check if the teacher has completed the form
        const teacherResponse = await fetch(
          `${WEB_BACKEND_URL}/api/route/checkTeacher`, // Updated route for checking form status
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${response.token}`, // Use the token from the login response
            },
            body: JSON.stringify({ identifier }), // Send the identifier in the request body
          }
        );

        const teacherData = await teacherResponse.json();

        trackEvent("TEACHER_LOGIN", {
          identifier,
          role: "teacher",
          source: "website",
        }, teacherData?.id || teacherData?.teacher?.id);

        // Check form completion status and redirect accordingly
        if (teacherData.formCompleted) {
          router.push("/Teacherdashboard"); // Redirect to Teacher Dashboard if form is completed
        } else {
         const  searchParams = new URLSearchParams(window.location.search)
         const refCode = searchParams.get("ref")
         if(refCode){
          router.push(`/Signin/Teacherform?ref=${refCode}`)
         }
         else{
          router.push(`/Signin/Teacherform`)
         }
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors([
        {
          message:
            "Login failed. Please enter valid email, mobile number, or registration number.",
        },
      ]);
    } finally {
      setIsLogingIn(false); // Reset loading state
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    // Check if the email is provided
    if (!userdata.email) {
      setErrors([{ msg: "Email is required." }]);
      return; // Prevent further execution if email is not entered
    }

    try {
      // First, check if the email is verified
      const emailVerificationResponse = await axios.post(
        `${WEB_BACKEND_URL}/api/route/checkTeacherEmailVerification`,
        { email: userdata.email }
      );

      if (!emailVerificationResponse.data?.is_verified) {
        // If email is not verified

        setOtpVerified(false); // Set OTP verification status to false
        Swal.fire({
          title: "Email Not Verified",
          text: "Please verify your email before signing up.",
          icon: "error",
        });

        return;
      } else {
        setEmailVerifiedError(false); // Reset email verification error status
        setOtpVerified(true); // Set OTP verification status to true
      }

      // If email is verified, proceed with signup
      const response = await axios.post(
        `${WEB_BACKEND_URL}/api/route/signup`,
        userdata
      );

      trackEvent("TEACHER_REGISTERED", {
        name: userdata.name,
        email: userdata.email,
        role: "teacher",
        source: "website",
      });

      // Extract email and password from userdata
      const { email, password } = userdata;

      // Clear the form
      setuserdata({
        name: "",
        email: "",
        password: "",
      });

      setErrors([]);
      setSuccessMessage("You have successfully registered. Logging you in...");
      Swal.fire({
        title: "Registration successful!",
        text: "You have successfully registered and logged in.",
        icon: "success",
      });

      // Automatically log the user in and create a session
      const loginResponse = await doCredentialLogin({
        redirect: false,
        identifier: email, // Use email as the identifier for login
        password, // Pass the same password used for signup
        role: "teacher",
      });

      if (loginResponse?.error) {
        // Handle login error
        Swal.fire({
          title: "Registration successful, but login failed!",
          text: loginResponse.error,
          icon: "error",
        });
        return;
      }

      const searchParams = new URLSearchParams(window.location.search);
      const refCode = searchParams.get("ref");
  
      // Redirect to Teacher form and append the referral code if present
      const redirectUrl = refCode ? `/Signin/Teacherform?ref=${refCode}` : "/Signin/Teacherform";
      router.push(redirectUrl);
    } catch (error) {
      // Handle errors
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
        setSuccessMessage("");
      } else {
        setErrors([{ msg: "Something went wrong. Please try again." }]);
      }
    }
  };

  const handleVerifyEmail = async () => {
    if (isVerifying) return; // Prevent multiple requests

    setIsVerifying(true); // Set loading state
    try {
      // API call to send OTP to the backend
      const response = await fetch(
        `${WEB_BACKEND_URL}/api/route/sendOtpTeacher`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: userdata.email }),
        }
      );

      if (response.ok) {
        setOtpTimer(60); // Reset the timer to 1 minute
        setIsOtpModalOpen(true); // Open the modal for OTP input

        // Show success message with React Toastify
        toast.success("An OTP has been sent successfully!", {
          position: "top-center", // Position of the toast
          autoClose: 6000, // Time in milliseconds for the toast to auto-close
        });
      } else {
        // Handle error from backend
        const errorData = await response.json();

        toast.error(errorData.message || "Failed to send OTP.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);

      // Show error alert for unexpected errors
      toast.error("Failed to send OTP. Please try again later.");
    } finally {
      setIsVerifying(false); // Reset loading state
    }
  };

  function OtpPopup({ isOpen, onClose }) {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [timer, setTimer] = useState(60);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [errors, setErrors] = useState("");
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const [isResending, setIsResending] = useState(false);

    // Countdown timer effect
    useEffect(() => {
      if (timer > 0) {
        const interval = setInterval(() => {
          setTimer((prevTimer) => prevTimer - 1);
        }, 1000);
        return () => clearInterval(interval);
      } else {
        setIsResendDisabled(false); // Enable "Resend OTP" button when timer reaches 0
      }
    }, [timer]);

    const handleOtpChange = (e, index) => {
      const value = e.target.value;
      if (value.match(/[0-9]/) && value.length <= 1) {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Move focus to the next input
        if (index < otp.length - 1 && value !== "") {
          document.getElementById(`otp-input-${index + 1}`).focus();
        }
      }
    };

    const handleOtpKeyDown = (e, index) => {
      if (e.key === "Backspace") {
        const newOtp = [...otp];
        if (otp[index] === "") {
          // Move focus to the previous input if current input is empty
          if (index > 0) {
            document.getElementById(`otp-input-${index - 1}`).focus();
          }
        } else {
          // Clear the current input value
          newOtp[index] = "";
          setOtp(newOtp);
        }
      }
    };

    const handleVerifyOtp = async () => {
      try {
        const response = await fetch(
          `${WEB_BACKEND_URL}/api/route/verifyOtpTeacher`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: userdata.email, otp: otp.join("") }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          setOtpVerified(true);
          setErrors([]);
            toast.success("OTP Verified!", {
            position: "top-center",
            autoClose: 6000,
            });
            onClose(); // Close the modal after successful verification
        } else {
          setErrors(data.message || "Something went wrong");
            toast.error(data.message || "Something went wrong. Please try again.", {
            position: "top-center",
            autoClose: 6000,
            });
        }
      } catch (error) {
        console.error("Error verifying OTP:", error);
        setErrors("Failed to verify OTP. Please try again.");
        toast.error("Failed to verify OTP. Please try again.", {
          position: "top-center",
          autoClose: 6000,
        });
      }
    };

    const handleResendOtp = async () => {
      setIsResending(true);
      setIsResendDisabled(true); // Disable "Resend OTP" button

      try {
        const response = await fetch(
          `${WEB_BACKEND_URL}/api/route/sendOtpTeacher`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: userdata.email }),
          }
        );

        if (response.ok) {
          setTimer(60); // Restart timer
          setIsResendDisabled(true); // Disable "Resend OTP" button
          setErrors("");
          toast.success("OTP has been resent successfully!", {
            position: "top-center",
            autoClose: 6000,
          });
        } else {
          const errorData = await response.json();
          setErrors(errorData.message || "Failed to resend OTP");
          toast.error(errorData.message || "Failed to resend OTP.", {
            position: "top-center",
            autoClose: 6000,
          });
        }
      } catch (error) {
        console.error("Error resending OTP:", error);
        setErrors("Failed to resend OTP");
        toast.error("Failed to resend OTP. Please try again.", {
          position: "top-center",
          autoClose: 6000,
        });
      } finally {
        setIsResending(false);
      }
    };

    // Check if OTP is fully entered
    useEffect(() => {
      setIsSubmitDisabled(otp.some((digit) => digit === ""));
    }, [otp]);

    return isOpen ? (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-80 md:w-auto">
          <h2 className="text-xl font-bold text-center mb-4 text-gray-800">
            Verify Your Email ✉️
          </h2>

          {/* Modern Information Message */}
          <p className="text-sm text-center text-gray-700 mb-4">
            We've sent a{" "}
            <span className="font-bold text-blue-600">
              unique verification code
            </span>{" "}
            to
            <span className="font-bold text-black"> {userdata.email} </span>.
            <br></br>
            Please enter the code below to verify your email address.
          </p>
          <p className="text-sm text-center text-gray-500 mb-4">
            Don’t leave this page or refresh until the process is complete!
          </p>

          <div className="flex justify-center gap-2 mb-4 p-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                id={`otp-input-${index}`}
                value={digit}
                onChange={(e) => handleOtpChange(e, index)}
                onKeyDown={(e) => handleOtpKeyDown(e, index)}
                maxLength={1}
                className="w-10 md:w-12 h-10 md:h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            ))}
          </div>

          {errors && (
            <p className="text-red-500 text-sm text-center mb-2">{errors}</p>
          )}

          <div className="flex items-center justify-between text-gray-600 mb-4">
            <div className="flex items-center gap-1">
              <FaRegClock />
              <span>{timer}s</span>
              {/* Resend Link */}
              {timer === 0 && (
                <button
                  onClick={handleResendOtp}
                  className={`${
                    isResendDisabled
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-blue-500"
                  } font-medium text-sm ml-2 underline`}
                  disabled={isResendDisabled} // Disable button
                >
                  {isResending ? "Sending OTP..." : "Resend Code"}
                </button>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-blue-500 font-medium text-sm"
            >
              Close
            </button>
          </div>

          <button
            onClick={handleVerifyOtp}
            disabled={isSubmitDisabled}
            className={`w-full py-2 px-4 bg-orange-600 text-white font-semibold rounded-md ${
              isSubmitDisabled
                ? "bg-gray-300 cursor-not-allowed"
                : "hover:bg-orange-500"
            }`}
          >
            Verify & Continue
          </button>
        </div>
      </div>
    ) : null;
  }

  return (
    <>
      <Navbar />
      <SEO />
      <div className="bg-[#fff]">
        <div className="flex w-auto md:w-full  justify-center items-center mx-auto mt-[80px] relative">
          <div className="flex flex-col md:flex-row rounded-lg md:rounded-3xl bg-white shadow-xl m-4 md:m-10 w-[90vw] overflow-hidden">
            <div className="bg-gradient-to-r from-purple-300 to-pink-300 hidden rounded-3xl md:block shadow-lg md:w-1/2 p-6 relative">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 space-y-6">
                <h2 className="text-4xl font-bold font-Poppins mb-4 text-slate-900">
                  Join Learn<b className="text-orange-600">O</b>sphere
                </h2>
                <p className="text-lg text-start font-Poppins text-gray-800">
                  Empower students with your expertise.
                </p>
                <ul className="space-y-4 text-start font-Poppins text-gray-800">
                  <li className="flex items-center justify-start">
                    <AiOutlineCheckCircle size={25} className="mr-2" />
                    Sign up with your email or Google account.
                  </li>
                  <li className="flex items-center justify-start">
                    <AiOutlineCheckCircle size={25} className="mr-2" />
                    Complete your profile with necessary details.
                  </li>
                  <li className="flex items-center justify-start">
                    <AiOutlineCheckCircle size={25} className="mr-2" />
                    Verify your email and start tutoring!
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-6 sm:p-10 lg:p-12 w-full md:w-1/2 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-center mb-10">
                {isLogin ? "Log in as an Educator" : "Sign up as an Educator"}
              </h2>

              <form
                action={Sociallogin}
                className="flex items-center justify-center mb-6"
              >
                <button
                  type="submit"
                  name="action"
                  value="google"
                  className="w-full flex items-center justify-center px-4 py-3 bg-slate-900 text-white font-semibold rounded-full transition-colors  duration-200 hover:outline-none hover:ring-2 hover:ring-blue-500 "
                >
                  <div className="flex items-center gap-4">
                    <FcGoogle size={25} />

                    <span>Continue with Google</span>
                  </div>
                </button>
              </form>

              <div className="flex items-center justify-center mb-7">
                <span className="text-black font-bold font-Poppins">or</span>
              </div>

              {isLogin ? (
                <form onSubmit={handleLoginSubmit}>
                  <div className="relative mb-4 font-Poppins">
                    <input
                      type="text"
                      name="identifier"
                      placeholder="Your email, registration number, or mobile number"
                      value={userdata.identifier}
                      onChange={handleChange}
                      style={{
                        outline: "none",
                        borderBottomWidth: "2px",
                        borderBottomColor: "#3182ce",
                      }}
                      className="block w-full border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-blue-500 peer bg-transparent py-2.5"
                    />
                    <label className="absolute text-black font-bold duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:top-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-black peer-focus:top-3 peer-focus:scale-75 peer-focus:text-blue-500">
                      Username<span className="text-red-500">*</span>
                    </label>
                  </div>

                  <div className="relative mb-4 font-Poppins">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Your password"
                      value={userdata.password}
                      onChange={handleChange}
                      style={{
                        outline: "none",
                        borderBottomWidth: "2px",
                        borderBottomColor: "#3182ce",
                      }}
                      className="block w-full border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-blue-500 peer bg-transparent py-2.5"
                    />
                    <label className="absolute text-black font-bold duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:top-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-black peer-focus:top-3 peer-focus:scale-75 peer-focus:text-blue-500">
                      Password<span className="text-red-500">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      {showPassword ? (
                        <FaEyeSlash className="text-gray-500" />
                      ) : (
                        <FaEye className="text-gray-500" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center mb-4">
                    <input type="checkbox" id="remember-me" className="mr-2" />
                    <label
                      htmlFor="remember-me"
                      className="text-gray-700 font-Poppins"
                    >
                      Remember me
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isLogingIn}
                    className={`w-full py-2 px-4 bg-orange-600 hover:bg-orange-500 font-Poppins text-white rounded-lg shadow-md ${isLogingIn ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-600"}`}
                  >
                    {isLogingIn ? "Logging in..." : "Log in"}
                  </button>

                  <p className="mt-4 text-center text-gray-500 text-xs font-Poppins">
                    By clicking Continue or Sign up, you agree to Learnosphere
                    <a href="#" className="text-blue-500 font-Poppins">
                      {" "}
                      Terms of Use
                    </a>
                    , including
                    <a href="#" className="text-blue-500 font-Poppins">
                      {" "}
                      Subscription Terms
                    </a>{" "}
                    and
                    <a href="#" className="text-blue-500 font-Poppins">
                      {" "}
                      Privacy Policy
                    </a>
                    .
                  </p>
                  {Array.isArray(errors) && errors.length > 0 && (
                    <div className="mt-4">
                      {errors.map((error, index) => (
                        <p key={index} className="text-red-500 text-sm">
                          {error.message}
                        </p>
                      ))}
                    </div>
                  )}
                  <div className="text-center mt-4">
                    <Link
                      href="/Forgot-password-teachers"
                      className="text-blue-500 hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleSignupSubmit}>
                  <div className="relative mb-4 font-Poppins">
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your fullname"
                      value={userdata.name}
                      onChange={handleChange}
                      style={{
                        outline: "none",
                        borderBottomWidth: "2px",
                        borderBottomColor: "#3182ce",
                      }}
                      className="block w-full border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-blue-500 peer bg-transparent py-2.5"
                    />
                    <label className="absolute text-black font-bold duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:top-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-black peer-focus:top-3 peer-focus:scale-75 peer-focus:text-blue-500">
                      Name<span className="text-red-500">*</span>
                    </label>
                  </div>

                  <div className="relative mb-4 font-Poppins">
                    <div className="flex items-end flex-col lg:flex-row">
                      <input
                        type="email"
                        name="email"
                        placeholder="Your email"
                        value={userdata.email}
                        onChange={handleChange}
                        style={{
                          outline: "none",
                          borderBottomWidth: "2px",
                          borderBottomColor: emailValid ? "#38a169" : "#3182ce",
                        }}
                        className="block w-full border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-blue-500 peer bg-transparent py-2.5"
                      />
                      {emailValid && otpVerified == 0 && (
                        <button
                          type="button"
                          onClick={handleVerifyEmail}
                          disabled={isVerifying} // Disable while OTP is being sent
                          className={`ml-1 mt-1 bg-orange-500 text-white text-sm border rounded-lg py-2 lg:py-1 px-2 ${
                            isVerifying
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:bg-orange-600"
                          }`}
                        >
                          {isVerifying ? "Sending..." : "Verify Email"}
                        </button>
                      )}
                    </div>
                    <label className="absolute text-black font-bold duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:top-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-black peer-focus:top-3 peer-focus:scale-75 peer-focus:text-blue-500">
                      Email<span className="text-red-500">*</span>
                    </label>
                    {userdata.email && !emailValid && (
                      <p className="text-red-500 text-xs mt-1">
                        Please enter a valid email address.
                      </p>
                    )}
                    {/* Verify Email Error */}
                    {emailVerifiedError && !otpVerified && (
                      <p className="text-red-500 text-xs mt-1">
                        Please verify your email first.
                      </p>
                    )}
                  </div>

                  <div className="relative mb-4 font-Poppins">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Your password"
                      value={userdata.password}
                      onChange={handleChange}
                      style={{
                        outline: "none",
                        borderBottomWidth: "2px",
                        borderBottomColor: "#3182ce",
                      }}
                      className="block w-full border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-blue-500 peer bg-transparent py-2.5 pr-10"
                    />
                    <label className="absolute text-black font-bold duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:top-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-black peer-focus:top-3 peer-focus:scale-75 peer-focus:text-blue-500">
                      Create Password<span className="text-red-500">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      {showPassword ? (
                        <FaEyeSlash className="text-gray-500" />
                      ) : (
                        <FaEye className="text-gray-500" />
                      )}
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-orange-600 hover:bg-orange-500 font-Poppins text-white rounded-lg shadow-md"
                  >
                    Sign up
                  </button>

                  <p className="mt-4 text-center text-gray-500 text-xs font-Poppins">
                    By clicking Continue or Sign up, you agree to Learnosphere
                    <a href="#" className="text-blue-500 font-Poppins">
                      {" "}
                      Terms of Use
                    </a>
                    , including
                    <a href="#" className="text-blue-500 font-Poppins">
                      {" "}
                      Subscription Terms
                    </a>{" "}
                    and
                    <a href="#" className="text-blue-500 font-Poppins">
                      {" "}
                      Privacy Policy
                    </a>
                    .
                  </p>

                  {Array.isArray(errors) && errors.length > 0 && (
                    <div className="mt-4">
                      {errors.map((error, index) => (
                        <p key={index} className="text-red-500 text-sm">
                          {error.msg}
                        </p>
                      ))}
                    </div>
                  )}
                </form>
              )}

              {successMessage && (
                <div className="mt-4 text-green-500">
                  <p>{successMessage}</p>
                </div>
              )}

              <div className="mt-4 flex justify-center items-center">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-500 font-Poppins"
                >
                  {isLogin
                    ? "Don't have an account? Sign up"
                    : "Already have an account? Log in"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <OtpPopup
        isOpen={isOtpModalOpen}
        onClose={() => setIsOtpModalOpen(false)}
      />
      {/* <Intro /> */}
      <Uparrow2 />
      <Footer1 />
      <Footer />
    </>
  );
};

export default RegistrationForm;
