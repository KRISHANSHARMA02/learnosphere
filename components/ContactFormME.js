"use client";

import { useState, useEffect, useRef } from "react";
import { trackEvent } from "@/src/lib/eventTracker";

// ================= SUCCESS POPUP COMPONENT =================
const SuccessPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl transform transition-all scale-100 animate-fadeIn border border-orange-100">
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 ring-8 ring-green-50/50">
            <svg
              className="w-10 h-10 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Request Sent!
          </h3>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Thank you for contacting Learnosphere. Our Middle East expert will
            reach out to you within 24 hours.
          </p>

          <button
            onClick={onClose}
            className="w-full py-3.5 bg-gray-900 text-white font-bold rounded-xl shadow-lg hover:bg-gray-800 transition-transform active:scale-95"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// ================= MAIN CONTACT FORM =================
const ContactForm = ({ countryName }) => {
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const COUNTRY_MAP = {
    "saudi-arabia": "SA",
    qatar: "QA",
    kuwait: "KW",
    "united-arab-emirates": "AE",
    uae: "AE",
    oman: "OM",
    bahrain: "BH",
  };

  // Form State
  const initialFormState = {
    student_name: "",
    mobile_number: "",
    country_code: "+971",
    email: "",
    grade_class: "",
    message: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  // Validation & Error State
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  // Dropdown Logic
  const [showCountryList, setShowCountryList] = useState(false);
  const [searchCountry, setSearchCountry] = useState("");
  const countryDropdownRef = useRef(null);

  // 1. Fetch Country Codes
  useEffect(() => {
    fetch(`https://learnospherebackend.learnosphere.in/api/route/get_all_countries_data`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setCodes(data.data);

          // Auto detect ISO based on page route
          const isoFromPage =
            COUNTRY_MAP[countryName.toLowerCase().replace(/\s+/g, "-")];

          if (isoFromPage) {
            const matched = data.data.find(
              (c) => c.isoCode.toLowerCase() === isoFromPage.toLowerCase()
            );

            if (matched) {
              const codeStr = matched.phonecode.startsWith("+")
                ? matched.phonecode
                : `+${matched.phonecode}`;

              setFormData((prev) => ({
                ...prev,
                country_code: codeStr,
              }));
            }
          }
        }
      })
      .catch((err) => console.error("Failed to load country codes", err));
  }, [countryName]);

  // 2. Handle Outside Click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target)
      ) {
        setShowCountryList(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 3. Validation Logic
  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    if (!formData.student_name.trim()) {
      newErrors.student_name = "Student name is required";
      isValid = false;
    }

    if (!formData.mobile_number.trim()) {
      newErrors.mobile_number = "Mobile number is required";
      isValid = false;
    } else if (!/^\d{7,15}$/.test(formData.mobile_number)) {
      newErrors.mobile_number = "Enter a valid phone number";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
      isValid = false;
    }

    if (!formData.grade_class) {
      newErrors.grade_class = "Please select a grade/class";
      isValid = false;
    }

    if (!formData.message) {
      newErrors.message = "Please fill the required message field";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for this field as user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(""); // Clear previous server errors

    if (!validateForm()) {
      return; // Stop if validation fails
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://learnospherebackend.learnosphere.in/api/route/content/v1/submit_middle_east_inquiry`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            target_country: countryName,
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        trackEvent("MIDDLE_EAST_INQUIRY_FORM_SUBMITTED", {
          ...formData,
          name: formData.name,
          email: formData.email,
          mobile_number: formData.phone ? `${formData.country_code || ""}${formData.phone}` : "",
          phone: formData.phone,
          country_code: formData.country_code,
          target_country: countryName,
        });

        setShowPopup(true);
        // Reset Form
        setFormData({
          ...initialFormState,
          country_code: formData.country_code, // Keep the user's selected country code
        });
      } else {
        setServerError(
          result.message || "Submission failed. Please try again."
        );
      }
    } catch (error) {
      console.error(error);
      setServerError("Network error. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  // Helper variables
  const getFlagEmoji = (iso) => {
    if (!iso) return "🌍";
    return iso
      .toUpperCase()
      .replace(/./g, (char) =>
        String.fromCodePoint(127397 + char.charCodeAt())
      );
  };

  const filteredCountries = codes.filter(
    (c) =>
      c.name.toLowerCase().includes(searchCountry.toLowerCase()) ||
      c.phonecode.includes(searchCountry)
  );

  const selectedCountryObj = codes.find((c) => {
    const cleanCode = formData.country_code.replace("+", "");
    const cleanObjCode = c.phonecode.toString().replace("+", "");
    return cleanCode === cleanObjCode;
  });

  return (
    <>
      <div className="bg-white rounded-[2rem] shadow-xl shadow-orange-100/50 border border-orange-100 overflow-hidden relative mt-16 z-10">
        <div className="h-1.5 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600"></div>

        <div className="p-6 md:p-10">
          <div className="mb-8 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              Get Expert Guidance in {countryName}
            </h3>
            <p className="text-gray-500 mt-2 text-sm md:text-base">
              Fill in the details below. Our academic counselors will contact
              you shortly.
            </p>
          </div>

          {/* Server Error Alert */}
          {serverError && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3">
              <svg
                className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-red-600 text-sm font-medium">{serverError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Student Name */}
            <div className="relative group">
              <input
                type="text"
                name="student_name"
                value={formData.student_name}
                onChange={handleChange}
                placeholder="Student Name"
                className={`w-full bg-gray-50 border rounded-xl px-5 py-4 outline-none transition-all font-medium text-gray-700 placeholder:text-gray-400
                  ${
                    errors.student_name
                      ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                      : "border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                  }`}
              />
              {errors.student_name && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.student_name}
                </p>
              )}
            </div>

            {/* Mobile Number Group */}
            <div>
              <div className="flex gap-3">
                {/* Country Code */}
                <div
                  ref={countryDropdownRef}
                  className="relative w-[35%] md:w-[28%]"
                >
                  <button
                    type="button"
                    onClick={() => setShowCountryList(!showCountryList)}
                    className="w-full h-full flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-2 md:px-3 py-4 outline-none focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-1.5 overflow-hidden">
                      <span className="text-xl flex-shrink-0">
                        {getFlagEmoji(selectedCountryObj?.isoCode || "AE")}
                      </span>
                      <span className="text-gray-700 font-medium text-sm md:text-base truncate">
                        {formData.country_code.startsWith("+")
                          ? formData.country_code
                          : `+${formData.country_code}`}
                      </span>
                    </div>
                    <svg
                      className={`w-4 h-4 text-gray-400 transition-transform ${
                        showCountryList ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Dropdown List */}
                  {showCountryList && (
                    <div className="absolute top-full left-0 mt-2 bg-white shadow-2xl border border-gray-100 rounded-xl max-h-64 w-[280px] md:w-[320px] overflow-hidden z-50 animate-fadeIn origin-top-left">
                      <div className="p-3 bg-gray-50 border-b border-gray-100 sticky top-0 z-10">
                        <div className="relative">
                          <svg
                            className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                          <input
                            type="text"
                            autoFocus
                            placeholder="Search..."
                            value={searchCountry}
                            onChange={(e) => setSearchCountry(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-orange-500 transition-colors"
                          />
                        </div>
                      </div>
                      <div className="overflow-y-auto max-h-52">
                        {filteredCountries.map((c) => {
                          const codeStr = c.phonecode.toString().startsWith("+")
                            ? c.phonecode
                            : `+${c.phonecode}`;
                          const isSelected =
                            formData.country_code === codeStr ||
                            formData.country_code === c.phonecode;
                          return (
                            <div
                              key={c.id || c.isoCode}
                              onClick={() => {
                                setFormData((prev) => ({
                                  ...prev,
                                  country_code: codeStr,
                                }));
                                setShowCountryList(false);
                                setSearchCountry("");
                              }}
                              className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-colors ${
                                isSelected ? "bg-orange-50" : "hover:bg-gray-50"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-xl">
                                  {getFlagEmoji(c.isoCode)}
                                </span>
                                <div>
                                  <p
                                    className={`text-sm ${
                                      isSelected
                                        ? "font-bold text-gray-900"
                                        : "font-medium text-gray-700"
                                    }`}
                                  >
                                    {c.name}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {codeStr}
                                  </p>
                                </div>
                              </div>
                              {isSelected && (
                                <span className="text-orange-500 font-bold">
                                  ✓
                                </span>
                              )}
                            </div>
                          );
                        })}
                        {filteredCountries.length === 0 && (
                          <div className="p-4 text-center text-gray-500 text-sm">
                            No countries found
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Mobile Input */}
                <div className="relative w-[65%] md:w-[72%]">
                  <input
                    type="tel"
                    name="mobile_number"
                    value={formData.mobile_number}
                    onChange={handleChange}
                    placeholder="Mobile Number"
                    className={`w-full bg-gray-50 border rounded-xl px-5 py-4 outline-none transition-all font-medium text-gray-700 placeholder:text-gray-400
                      ${
                        errors.mobile_number
                          ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                          : "border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                      }`}
                  />
                </div>
              </div>
              {errors.mobile_number && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.mobile_number}
                </p>
              )}
            </div>

            {/* Email & Class */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="relative group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className={`w-full bg-gray-50 border rounded-xl px-5 py-4 outline-none transition-all font-medium text-gray-700 placeholder:text-gray-400
                    ${
                      errors.email
                        ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                        : "border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                    }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1 ml-1">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="relative group">
                <div className="relative h-full">
                  <select
                    name="grade_class"
                    value={formData.grade_class}
                    onChange={handleChange}
                    className={`w-full h-full bg-gray-50 border rounded-xl px-5 py-4 outline-none transition-all font-medium text-gray-700 appearance-none cursor-pointer bg-transparent z-10 relative
                      ${
                        errors.grade_class
                          ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                          : "border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10"
                      }`}
                  >
                    <option value="" disabled>
                      Select Grade/Class
                    </option>
                    <option value="6">Class 1</option>
                    <option value="6">Class 2</option>
                    <option value="6">Class 3</option>
                    <option value="6">Class 4</option>
                    <option value="6">Class 5</option>
                    <option value="6">Class 6</option>
                    <option value="7">Class 7</option>
                    <option value="8">Class 8</option>
                    <option value="9">Class 9</option>
                    <option value="10">Class 10</option>
                    <option value="11">Class 11</option>
                    <option value="12">Class 12 </option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 z-0">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
                {errors.grade_class && (
                  <p className="text-red-500 text-xs mt-1 ml-1">
                    {errors.grade_class}
                  </p>
                )}
              </div>
            </div>

            {/* Message */}
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Tell us about your learning goals..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 outline-none focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all font-medium text-gray-700 placeholder:text-gray-400 resize-none"
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-200 transform transition hover:-translate-y-0.5 active:translate-y-0 text-lg tracking-wide disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                "Book Free Consultation"
              )}
            </button>

            <p className="text-center text-xs text-gray-400 mt-4">
              We respect your privacy. No spam guaranteed.
            </p>
          </form>
        </div>
      </div>

      <SuccessPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />
    </>
  );
};

export default ContactForm;
