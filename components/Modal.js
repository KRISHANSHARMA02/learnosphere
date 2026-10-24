"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense, useRef } from "react";
import { HiShieldCheck } from "react-icons/hi2";
import Swal from "sweetalert2";
import { trackEvent } from "@/src/lib/eventTracker";

const ModalContent = ({ isOpen, onClose, onSubmitSuccess }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phone, setPhone] = useState("");
  const [Class, setClass] = useState("");
  const [pincode, setPinCode] = useState("");
  const [address, setAddress] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // State to hold OTP
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false); // Flag to check if OTP has been sent
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [timer, setTimer] = useState(60);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("+91");
  const [showDropdown, setShowDropdown] = useState(false);
  const searchParams = useSearchParams();
  const classFromURL = searchParams.get("classLevel");
  const [selected, setSelected] = useState("");
  const dropdownRef = useRef(null);

  // When a country is selected
  const handleSelect = (code) => {
    setSelected(code);
    setShowDropdown(false);
  };

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

  //1. Auto detect country by IP
  useEffect(() => {
    const detectUserCountry = async () => {
      try {
        const res = await fetch("https://ifconfig.me/all.json", {
          headers: {
            "User-Agent": "Mozilla/5.0", // REQUIRED
            Accept: "application/json",
          },
        });
        const data = await res.json();

        if (!data.country_code) {
          console.warn("No country_code returned from API");
          return;
        }

        const userISO = data.country_code.toUpperCase();

        // match with backend countries list
        const match = countries.find((c) => c.iso2.toUpperCase() === userISO);

        if (match) {
          setSelected(`+${match.countryCode}`);
        } else {
          console.warn("Country not found in DB for ISO:", userISO);
        }
      } catch (e) {
        console.error("Failed to fetch IP location:", e);
      }
    };
    if (countries.length > 0) detectUserCountry();
  }, [countries]);

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

  useEffect(() => {
    if (classFromURL) {
      setClass(`Class${classFromURL}`);
    }
  }, [classFromURL]);

  useEffect(() => {
    let timerInterval;
    if (isOtpSent && timer > 0) {
      timerInterval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(timerInterval);
    }

    return () => clearInterval(timerInterval);
  }, [isOtpSent, timer]);

  if (!isOpen) return null;
  const handleChange = (e, index) => {
    const value = e.target.value;

    // Allow only digits (check for numbers)
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value.slice(0, 1); // Ensure only 1 digit is entered
      setOtp(newOtp);

      // Move to next input if a value is entered
      if (value && index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      // If backspace is pressed on the last input and it's not empty, clear it first
      if (index === otp.length - 1 && otp[index] !== "") {
        const newOtp = [...otp];
        newOtp[index] = ""; // Clear the current input
        setOtp(newOtp);
      } else if (index > 0 && otp[index] === "") {
        // If backspace is pressed and current input is empty, focus the previous one
        document.getElementById(`otp-input-${index - 1}`).focus();
      } else {
        // Handle backspace for other fields
        const newOtp = [...otp];
        newOtp[index] = ""; // Clear the current input
        setOtp(newOtp);

        // Move focus to previous input if needed
        if (index > 0) {
          document.getElementById(`otp-input-${index - 1}`).focus();
        }
      }
    }
  };

  const handleContact = (e) => {
    const { value } = e.target;

    // Check if the input is only digits and exactly 10 characters long
    if (/^\d*$/.test(value) && value.length <= 10) {
      setPhone(value);
    }

    // Prevent updating the state if it's less than or greater than 10
    if (value.length === 10 && /^\d{10}$/.test(value)) {
      setPhone(value);
    }
  };
  const handlePinCode = (e) => {
    const { value } = e.target;

    // Check if the input is only digits and exactly 10 characters long
    if (/^\d*$/.test(value) && value.length <= 6) {
      setPinCode(value);
    }

    // Prevent updating the state if it's less than or greater than 10
    if (value.length === 6 && /^\d{6}$/.test(value)) {
      setPinCode(value);
    }
  };

  // Track button state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");
    setIsSubmitting(true); // Disable button after click

    const formData = {
      name: userName,
      email,
      phone,
      Class,
      pincode,
      address,
      countryCode: selectedCountry,
    };

    try {
      const response = await axios.post(
        `${WEB_BACKEND_URL}/api/route/modal`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 200) {
        trackEvent("MODAL_INQUIRY_FORM_SUBMITTED", {
          name: userName,
          email,
          mobile_number: selectedCountry ? `${selectedCountry}${phone}` : phone,
          phone,
          class: Class,
          pincode,
          address,
          country_code: selectedCountry,
        });

        setSuccess(`Form submitted successfully! Welcome, ${userName}!`);

        setIsOtpSent(true);
        setSubmittedEmail(email);

        Swal.fire({
          title: "Thank You for Reaching Out!",
          text: "OTP Sent Successfully",
          icon: "success",
        });

        // **Form fields reset karna**
        setUserName("");
        setPhone("");
        setClass("");
        setPinCode("");
        setAddress("");
        setSelectedCountry("+91");
      } else {
        setErrors({ general: "Failed to submit the form. Please try again." });
      }
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({
          general: "An unexpected error occurred. Please try again later.",
        });
      }
    } finally {
      setIsSubmitting(false); // Re-enable button after response
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess(null);

    if (!otp) {
      setErrors({ otp: "OTP is required" });
      return;
    }

    const otpData = {
      otp: otp.join(""),
      email: submittedEmail, // Use the submittedEmail state here
    };

    try {
      const response = await axios.post(
        `${WEB_BACKEND_URL}/api/route/verifyOtp`,
        otpData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 200) {
        const { userName } = response.data;
        trackEvent("MODAL_OTP_VERIFIED", {
          name: userName,
          email: submittedEmail,
        });
        setSuccess("OTP verified successfully!");
        onSubmitSuccess(userName, submittedEmail); // Notify success to parent
        onClose(); // Close the modal
        Swal.fire({
          title: "Thank You for Reaching Out!",
          text: "OTP Verified Successfully",
          icon: "success",
        });
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const backendErrors = error.response.data.errors;
        setErrors(backendErrors); // Display backend errors on the frontend
      } else {
        setErrors({
          server: "An unexpected error occurred. Please try again later.",
        });
      }
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-md p-4  relative">
        {/* Conditional Rendering for OTP Form */}
        {!isOtpSent ? (
          <form
            className="flex flex-col md:flex-row justify-between w-full gap-4"
            onSubmit={handleSubmit}
          >
            <div className="border-r border-gray-300 bg-gradient-to-r p-5 rounded-lg from-blue-500 via-indigo-500 text-white to-purple-500">
              <h1 className="text-[1.2em] md:text-[1.5em] font-bold">
                Fill The Form To Get More Questions
              </h1>
              <ol className="text-gray-200 list-disc flex flex-col gap-2 mt-2 ">
                <li className="ml-4 text-[.6em] md:text-[1em] font-semibold pt-2">
                  {" "}
                  Participate in an exciting quiz provided by Learnosphere to
                  test your knowledge.
                </li>
                <li className="ml-4 text-[.6em] md:text-[1em] font-semibold pt-2">
                  {" "}
                  Achieve more than 7 marks in the quiz to qualify for a
                  certificate.
                </li>
                <li className="ml-4 text-[.6em] md:text-[1em] font-semibold pt-2">
                  Earn a prestigious certificate after successfully completing
                  the quiz with a high score.
                </li>
                <li className="ml-4 text-[.6em] md:text-[1em] font-semibold pt-2">
                  For more knowledge, log in to our dashboard and explore more
                  opportunities.
                </li>
              </ol>
            </div>

            <div className="w-full md:w-[55%]">
              <div className="mb-4">
                <label className="block mb-1">Your Name:</label>
                <input
                  type="text"
                  className="border w-full p-2"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
                {errors.name && <p className="text-red-500">{errors.name}</p>}
              </div>
              <div className="mb-4">
                <label className="block mb-1">Class:</label>
                <select
                  name="Class"
                  value={Class}
                  disabled // Ye select box ko disable karega taki change na ho
                  id="Class"
                  className="mt-1 focus:outline-none border w-full p-2 text-[.9em] rounded-md border-gray-800 bg-gray-200 text-gray-700 cursor-not-allowed"
                >
                  <option value={Class}>{Class}</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-1">Your Email:</label>
                <input
                  type="email"
                  className="border w-full p-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
              </div>
              <div className="mb-4">
                <label className="block mb-1">Your Phone Number:</label>
                <div className="border flex">
                  <div
                    ref={dropdownRef}
                    className="relative bg-gray-200 rounded-md "
                  >
                    <div
                      className="bg-white border p-2 cursor-pointer  whitespace-nowrap text-sm shadow-sm flex justify-between items-center"
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
                    type="tel"
                    className=" w-full p-2"
                    value={phone}
                    onChange={handleContact}
                    required
                  />
                  {errors.phone && (
                    <p className="text-red-500">{errors.phone}</p>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-1">Pin Code:</label>
                <input
                  type="text"
                  className="border w-full p-2"
                  value={pincode}
                  onChange={handlePinCode}
                  required
                />
                {errors.pincode && (
                  <p className="text-red-500">{errors.pincode}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block mb-1">Your Address:</label>
                <input
                  type="text"
                  className="border w-full p-2"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
                {errors.address && (
                  <p className="text-red-500">{errors.address}</p>
                )}
              </div>

              {errors.general && (
                <p className="text-red-500">{errors.general}</p>
              )}
              {success && <p className="text-green-500">{success}</p>}

              <button
                type="submit"
                className="w-full p-2 bg-gradient-to-r rounded-lg from-blue-500 via-indigo-500 text-white to-purple-500 mt-4 disabled:opacity-50"
                disabled={isSubmitting} // Disable button while submitting
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="w-full xl:w-[30vw] p-4">
            <div className="flex flex-col justify-center gap-2 items-center ">
              <HiShieldCheck size={60} className="text-blue-600" />
              <h2 className="text-[1.5em] font-bold">OTP Verification</h2>
              <p className="text-[1.1em] font-semibold">OTP Has Sent to</p>
              <p className="mt-2 mb-2 font-semibold">{submittedEmail}</p>
              <p className="text-red-500 font-semibold">
                Time Remaining: {timer}s
              </p>
            </div>
            <div className="mb-4">
              <div className="flex justify-center items-center mt-2 space-x-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)} // Added onKeyDown for backspace handling
                    className="border border-gray-200 w-8 md:w-12 h-8 md:h-12 text-center text-xl font-bold"
                    required
                  />
                ))}
              </div>
            </div>

            {errors.otp && <p className="text-red-500">{errors.otp}</p>}
            {errors.server && (
              <p className="text-red-500 text-sm">{errors.server}</p>
            )}

            <button
              type="submit"
              className="w-full p-2 bg-gradient-to-r rounded-lg from-blue-500 via-indigo-500 text-white to-purple-500  mt-4"
            >
              Verify OTP
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

const Modal = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <ModalContent {...props} />
  </Suspense>
);

export default Modal;
