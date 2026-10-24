"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import { useState, useEffect, useRef } from "react";
import {
  FaTimes,
  FaGoogle,
  FaFacebookF,
  FaEnvelope,
  FaUserGraduate,
  FaChartLine,
} from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { FaEye, FaEyeSlash, FaRegClock } from "react-icons/fa";

const LoginSignupModal = ({ isOpen, onClose, onSuccess }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("+91");
  const [selected, setSelected] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  // OTP & email verification related state

  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [otpTimer, setOtpTimer] = useState(60);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);

      // Email regex (same quality as your working form)
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!value) {
        setEmailError("Email is required");
      } else if (!emailRegex.test(value)) {
        setEmailError("Please enter a valid email address");
      } else {
        setEmailError("");
      }
    }
  };
  
const handleContinue = async (e) => {
  e.preventDefault();
  
  if (!isEmailVerified) {
    Swal.fire("Email Verification Required", "Please verify your email before continuing.", "warning");
    return;
  }
  
  const payload = {
    name,
    email,
    mobilenumber: contact,
    countrycode: selectedCountry || "+91",
    role,
    gender,
    address,
  };

  try {
    setLoading(true);
    const res = await axios.post("api/referral/submitAndgenerate_referral", payload);
    
    // ✅ EXTRACT THE DATA FROM RESPONSE
    const token = res.data?.token;
    const referral_code = res.data?.data?.referralCode;  // ⚠️ FIXED: it's in data.referralCode
    const upi_id = ""; // Your backend doesn't return UPI ID
    
    // ✅ PASS ALL DATA TO PARENT
    onSuccess(token, email, referral_code, upi_id);
    
    Swal.fire("Success", "Form submitted successfully", "success");
    onClose();
    
  } catch (error) {
    console.error(error);
    Swal.fire("Error", error?.response?.data?.message || "Something went wrong", "error");
  } finally {
    setLoading(false);
  }
};
  const handleVerifyEmail = async () => {
    // Prevent duplicate requests
    if (isSendingOtp) return;

    // Validate email before sending OTP
    if (!email || emailError) {
      setEmailError("Please enter a valid email before verification");
      return;
    }

    setIsSendingOtp(true);

    try {
      const res = await axios.post(
        `${WEB_BACKEND_URL}/api/route/sendOtpTeacher`,
        { email },
      );

      // Treat successful HTTP status as success
      if (res.status == 200) {
        setOtpTimer(60); // Start resend timer
        setIsOtpModalOpen(true); // Open OTP modal

        toast.success("An OTP has been sent successfully!", {
          position: "top-center",
          autoClose: 6000,
        });
      } else {
        toast.error("Failed to send OTP.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setIsSendingOtp(false);
    }
  };
  // When a country is selected
  const handleSelect = (code) => {
    setSelected(code);
    setSelectedCountry(code);
    setShowDropdown(false);
  };

  // ✅ Restrict contact input to digits only
  const handleContact = (e) => {
    const { value } = e.target;
    if (/^\d{0,10}$/.test(value)) {
      setContact(value);
    }
  };

  // ✅ Fetch countries from backend
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get(
          `${WEB_BACKEND_URL}/api/route/getAllCountries`,
        );
        setCountries(res.data);
      } catch (err) {
        console.error("Error fetching countries:", err);
      }
    };
    fetchCountries();
  }, []);

  function OtpPopup({ isOpen, onClose, setIsEmailVerified }) {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [otpError, setOtpError] = useState("");
    const [timer, setTimer] = useState(60);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [errors, setErrors] = useState("");
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const [isResending, setIsResending] = useState(false);

    // Countdown timer effect
    useEffect(() => {
      if (timer > 0) {
        const interval = setInterval(() => {
          setTimer((prev) => prev - 1);
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
            document.getElementById(`otp-input-${index - 1}`)?.focus();
          }
        } else {
          // Clear the current input value
          newOtp[index] = "";
          setOtp(newOtp);
        }
      }
    };
    useEffect(() => {
      setIsSubmitDisabled(otp.some((digit) => digit === ""));
    }, [otp]);
    const handleVerifyOtp = async () => {
      // 🔒 Frontend validation
      if (!email || otp.join("").length !== 6) {
        setOtpError("OTP must be 6 digits");
        return;
      }

      try {
        setIsSendingOtp(true);
        setOtpError("");

        const res = await axios.post(
          `${WEB_BACKEND_URL}/api/route/verifyOtpTeacher`,
          {
            email,
            otp: otp.join(""),
          },
        );

        const message = res?.data?.message || "Email verified successfully";

        // ✅ SUCCESS (200)
        if (res.status === 200) {
          setIsEmailVerified(true);

          toast.success(message, {
            position: "top-center",
            autoClose: 5000,
          });

          onClose(); // ✅ CLOSE OTP POPUP
          return;
        }
      } catch (err) {
        

        const status = err?.response?.status;
        const message = err?.response?.data?.message;

        

        // 🔴 EMAIL NOT FOUND
        if (status === 400 && message === "Email not found") {
          toast.error("Email not found. Please request OTP again.", {
            position: "top-center",
            autoClose: 4000,
          });

          onClose(); // 🔁 Go back to email screen
          return;
        }

        // 🔴 OTP EXPIRED
        if (status === 400 && message === "OTP expired") {
          setOtpError("OTP expired. Please resend OTP.");
          setCanResendOtp(true); // 🔓 Enable resend button

          toast.error("OTP expired. Please resend OTP.", {
            position: "top-center",
            autoClose: 4000,
          });
          return;
        }

        // 🔴 INVALID OTP
        if (status === 400 && message === "Invalid OTP") {
          setOtpError("Invalid OTP");
          return; // ❌ Allow retry, do not clear email
        }

        // 🔴 EMAIL ALREADY VERIFIED
        if (status === 400 && message === "Email already verified") {
          setIsEmailVerified(true);

          toast.info("Email already verified. Please continue.", {
            position: "top-center",
            autoClose: 4000,
          });

          onClose(); // ✅ Close OTP popup
          return;
        }

        // 🔴 SERVER ERROR (500 or unknown)
        toast.error("Something went wrong. Please try again.", {
          position: "top-center",
          autoClose: 4000,
        });

        console.error("Verify OTP error:", err);
      } finally {
        setIsSendingOtp(false);
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
            body: JSON.stringify({ email: email }),
          },
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

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg w-full max-w-sm">
          <h3 className="text-lg font-bold text-center mb-3">
            Verify Your Email✉️
          </h3>

          <p className="text-sm text-center mb-4">
            OTP sent to <strong>{email}</strong>
          </p>
          <p className="text-sm text-center text-gray-500 mb-4">
            Don’t leave this page or refresh until the process is complete!
          </p>
          <div className="flex justify-center gap-2 mb-3">
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
            disabled={isSubmitDisabled}
            onClick={handleVerifyOtp}
            className="w-full bg-orange-600 text-white py-2 rounded-md disabled:bg-gray-300"
          >
            Verify & Continue
          </button>
        </div>
      </div>
    );
  }
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 text-gray-700 ">
      <div className="relative h-[90vh] w-[92%] max-w-md bg-white rounded-2xl shadow-xl overflow-auto scrollbar-hide scroll-smooth bg-gradient-to-br from-blue-100 to-orange-50">
        {/* Background Design */}
        <div className="absolute -top-16 -left-16 w-40 h-40 bg-orange-300 rounded-full opacity-30"></div>
        <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-blue-300 rounded-full opacity-30"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black z-10"
        >
          <FaTimes size={18} />
        </button>

        {/* Content */}
        <div className="relative p-6 sm:p-8">
          {/* Heading */}
          <h2 className="text-2xl font-extrabold text-center mb-2">
            Welcome to <span className="text-orange-600">Learnosphere</span>
          </h2>

          <p className="text-center text-sm text-gray-600 mb-6">
            Sign up or login to continue learning and earning
          </p>

          {/* Highlights */}
          <div className="flex justify-center gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <FaUserGraduate className="text-orange-600" />
              1L+ Learners
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold">
              <FaChartLine className="text-blue-600" />
              Top Educators
            </div>
          </div>
          <form onSubmit={handleContinue}>
            <span>
              {/* Name */}
              <label className="text-sm font-semibold mb-1 block">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full mb-3 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mb-4">{errors.name}</p>
              )}
            </span>

            {/* Email */}

            <label className="text-sm font-semibold mb-1 block">
              Email Address
            </label>
            <div className="flex items-end ">
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full mb-3 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none"
              />
              {isEmailVerified ? (
                <span className="mb-4 ml-2 text-sm font-semibold text-green-600">
                  ✔ Email Verified
                </span>
              ) : (
                email &&
                !emailError && (
                  <button
                    type="button"
                    onClick={handleVerifyEmail}
                    disabled={isSendingOtp}
                    className="mb-4 px-4 py-2 ml-1 text-sm font-semibold whitespace-nowrap text-white bg-orange-600 rounded-md disabled:opacity-50"
                  >
                    {isSendingOtp ? "Sending OTP..." : "Verify Email"}
                  </button>
                )
              )}
            </div>
            {emailError && (
              <p className="text-red-500 text-sm mb-2">{emailError}</p>
            )}

            {/* Mobile Number */}
            <label className="text-sm  focus:outline-none font-semibold mb-1 block">
              Mobile Number
            </label>
            <div className="flex  mt-1 focus:outline-none focus:border-orange-600   w-full border rounded-md  text-[.9em] border-gray-800 bg-white">
              <div
                ref={dropdownRef}
                className="relative bg-gray-200 rounded-md "
              >
                <div
                  className="bg-white border p-2 rounded-md cursor-pointer  whitespace-nowrap text-sm shadow-sm flex justify-between items-center"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <span>{selected || "+91"}</span>
                  <span>▼</span>
                </div>

                {/* Dropdown list */}
                {showDropdown && (
                  <div className="absolute top-full mt-1 w-[260px] max-h-80 overflow-y-auto bg-white shadow-lg rounded-md z-50 text-sm">
                    {countries.map((c) => (
                      <div
                        key={c._id}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer border-gray-800 flex justify-between"
                        onClick={() => handleSelect(`+${c.countryCode}`)}
                      >
                        <span className="text-base">{c.countryName}</span>
                        <span className="text-sm">(+{c.countryCode})</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <input
                name="contact"
                value={contact}
                onChange={handleContact}
                id="contact"
                type="text"
                placeholder="Enter your Mobile Number"
                className="  focus:outline-none  w-full p-2 text-[.9em] rounded-md  bg-white placeholder:text-slate-800"
              />
            </div>

            {/* Gender */}
            <label className="text-sm font-semibold mb-1 block">Gender</label>
            <select
              value={gender}
              required
              onChange={(e) => setGender(e.target.value)}
              className="w-full mb-3 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <label className="text-sm font-semibold mb-1 block">
              You are a
            </label>

            <div className="flex gap-4 mb-3">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  required
                  onChange={(e) => setRole(e.target.value)}
                />
                Student
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="teacher"
                  onChange={(e) => setRole(e.target.value)}
                />
                Teacher
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="other"
                  onChange={(e) => setRole(e.target.value)}
                />
                Other
              </label>
            </div>
            {/* Address */}
            <label className="text-sm font-semibold mb-1 block">Address</label>
            <textarea
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              rows={3}
              className="w-full mb-3 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none resize-none"
            />

            {/* Continue Button */}
            <button
              type="submit"
              disabled={loading || !isEmailVerified}
              className={`mt-6 w-full py-3 rounded-lg font-semibold transition 
                            ${
                              !isEmailVerified
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-orange-600 hover:bg-orange-700 text-white"
                            }`}
            >
              {loading ? "PLEASE WAIT..." : "CONTINUE →"}
            </button>
          </form>
          <ToastContainer />
          {isOtpModalOpen && (
            <OtpPopup
              email={email}
              onClose={() => setIsOtpModalOpen(false)}
              setIsEmailVerified={setIsEmailVerified}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignupModal;
//referpopup component
