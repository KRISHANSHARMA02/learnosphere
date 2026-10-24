"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import background from "@/public/stbg.png"; // Ensure this path is correct in your project
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { trackEvent } from "@/src/lib/eventTracker";

// Helper to get Flag Emoji
const getFlagEmoji = (isoCode) => {
  if (!isoCode) return "";
  return isoCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397));
};

export default function StudentForm() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // API Base URL (Using the production URL based on your code)
  const BASE_URL = WEB_BACKEND_URL; //${WEB_BACKEND_URL}

  const [formData, setFormData] = useState({
    studentName: "",
    gmail: "",
    countryIso: "", // New field
    countryCode: "", // New field
    countryName: "", // New field
    mobileNumber: "",
    gender: "",
    dob: "",
    subject: "",
    city: "",
    pincode: "",
    grade: "",
    tutorCharacteristics: "",
    language: "",
    address: "",
    stream: "",
    state: "",
    schooltype: "",
    schoolName: "",
    educationBoard: "",
  });

  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");

  // Location & Country State
  const [countries, setCountries] = useState([]);
  const [showCountryList, setShowCountryList] = useState(false);
  const [searchCountry, setSearchCountry] = useState("");
  const countryDropdownRef = useRef(null);

  const [availableStates, setAvailableStates] = useState([]);
  const [availableCities, setAvailableCities] = useState([]); // For current selected state
  const [locationMap, setLocationMap] = useState({}); // Stores { State: [Cities] }

  // 1. Fetch Countries on Mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/route/get_all_countries_data`
        );
        const data = response.data.data || [];
        setCountries(data);

        // Set Default to India if not set
        if (!formData.countryIso) {
          const india = data.find((c) => c.isoCode === "IN");
          if (india) {
            const code = india.phonecode.startsWith("+")
              ? india.phonecode
              : `+${india.phonecode}`;

            setFormData((prev) => ({
              ...prev,
              countryIso: "IN",
              countryCode: code,
              countryName: india.name,
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
        // Fallback
        setFormData((prev) => ({
          ...prev,
          countryIso: "IN",
          countryCode: "+91",
          countryName: "India",
        }));
      }
    };
    fetchCountries();
  }, []);

  // 2. Fetch States/Cities when Country Changes
  useEffect(() => {
    if (!formData.countryIso) return;

    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/route/get_state_city_by_country_code/${formData.countryIso}`
        );
        const rawData = response.data.data || [];

        // Process flat data into a Map: { StateName: [City1, City2, ...] }
        const map = {};
        rawData.forEach((item) => {
          if (!map[item.state]) {
            map[item.state] = [];
          }
          if (item.city) {
            map[item.state].push(item.city);
          }
        });

        setLocationMap(map);
        setAvailableStates(Object.keys(map).sort());
        setAvailableCities([]); // Reset cities when country changes
      } catch (error) {
        console.error("Error fetching locations:", error);
        setAvailableStates([]);
        setLocationMap({});
        setAvailableCities([]);
      }
    };

    fetchLocations();
  }, [formData.countryIso]);

  // 3. Handle Click Outside Country Dropdown
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Session Data
  useEffect(() => {
    if (status === "authenticated") {
      setFormData((prevData) => ({
        ...prevData,
        studentName: session.user.name || "",
        gmail: session.user.email || "",
      }));
    }
  }, [session, status]);

  // General Input Handler
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Pincode Validation (Digits only)
    if (name === "pincode") {
      if (!/^\d{0,6}$/.test(value)) return;
    }

    // Mobile Validation (Digits only)
    if (name === "mobileNumber") {
      if (!/^\d*$/.test(value)) return;
    }

    setFormData({ ...formData, [name]: value });

    // Real-time Pincode Validation
    if (name === "pincode") {
      if (!/^\d{6}$/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          [name]: "Pincode must be exactly 6 digits.",
        }));
      } else {
        setErrors((prev) => {
          const newErr = { ...prev };
          delete newErr[name];
          return newErr;
        });
      }
    }
  };

  // State Change Handler
  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    const citiesForState = locationMap[selectedState] || [];

    setFormData({
      ...formData,
      state: selectedState,
      city: "", // Reset city
    });
    setAvailableCities(citiesForState.sort());
  };

  // Country Selection Handler
  const handleCountrySelect = (country) => {
    const code = country.phonecode.startsWith("+")
      ? country.phonecode
      : `+${country.phonecode}`;

    setFormData({
      ...formData,
      countryIso: country.isoCode,
      countryCode: code,
      countryName: country.name,
      state: "", // Reset location
      city: "",
      pincode: "",
    });
    setShowCountryList(false);
    setSearchCountry("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${BASE_URL}/api/route/studentForm`,
        formData
      );

      if (response.status === 200) {
        trackEvent("STUDENT_PROFILE_FORM_SUBMITTED", {
          ...formData,
          name: formData.studentName,
          email: formData.gmail,
          mobile_number: formData.countryCode ? `${formData.countryCode}${formData.mobileNumber}` : formData.mobileNumber,
        });

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Form submitted successfully. Thank you for connecting with us!",
        });

        // Reset Form
        setFormData({
          studentName: "",
          gmail: "",
          countryIso: "IN",
          countryCode: "+91",
          countryName: "India",
          mobileNumber: "",
          gender: "",
          dob: "",
          subject: "",
          city: "",
          pincode: "",
          grade: "",
          tutorCharacteristics: "",
          language: "",
          address: "",
          stream: "",
          state: "",
          schooltype: "",
          schoolName: "",
          educationBoard: "",
        });
        setErrors({});
        setGeneralError("");
        router.push("/Userdashboard");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const { errors, general } = error.response.data;
        if (errors) setErrors(errors);
        if (general) {
          setGeneralError(general);
          Swal.fire({ icon: "error", title: "Oops...", text: general });
        }
      } else {
        setGeneralError("An unexpected error occurred.");
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "An unexpected error occurred.",
        });
      }
    }
  };

  // Filter countries for search
  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(searchCountry.toLowerCase())
  );

  const educationBoards = [
    "CBSE (Central Board of Secondary Education)",
    "ICSE (Indian Certificate of Secondary Education)",
    "NIOS (National Institute of Open Schooling)",
    "RBSE (Rajasthan Board of Secondary Education)",
    "UPMSP (Uttar Pradesh Madhyamik Shiksha Parishad)",
    "MSBSHSE (Maharashtra State Board of Secondary & Higher Secondary Education)",
    "KSEEB (Karnataka Secondary Education Examination Board)",
    "TNBSE (Tamil Nadu Board of Secondary Education)",
    "WBBSE (West Bengal Board of Secondary Education)",
    "BSEB (Bihar School Examination Board)",
    "PSEB (Punjab School Education Board)",
    "HBSE (Haryana Board of School Education)",
    "GSEB (Gujarat Secondary and Higher Secondary Education Board)",
    "BSE Odisha (Board of Secondary Education, Odisha)",
    "CGBSE (Chhattisgarh Board of Secondary Education)",
    "MPBSE (Madhya Pradesh Board of Secondary Education)",
    "TBSE (Tripura Board of Secondary Education)",
    "SEBA (Board of Secondary Education, Assam)",
    "MBOSE (Meghalaya Board of School Education)",
    "NBSE (Nagaland Board of School Education)",
    "JAC (Jharkhand Academic Council)",
    "HPBOSE (Himachal Pradesh Board of School Education)",
    "Mizoram Board of School Education",
    "BOSEM (Board of Secondary Education, Manipur)",
    "BOSE (Jammu and Kashmir State Board of School Education)",
    "Goa Board of Secondary & Higher Secondary Education",
    "UBSE (Uttarakhand Board of School Education)",
    "Sikkim Board of Secondary Education",
    "APBSE (Andhra Pradesh Board of Secondary Education)",
    "TSSSC (Telangana State Secondary School Certificate Board)",
    "Arunachal Pradesh Board of Secondary Education",
    "Lakshadweep Board of Secondary Education",
    "Dadra and Nagar Haveli Board of Secondary Education",
  ];

  return (
    <>
      <div
        className="w-full"
        style={{
          backgroundImage: `url(${background.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-4xl font-bold font-Poppins text-white text-center mb-6 pt-6">
          Unlock Your Learning Potential with Learnosphere
        </h1>
        <p className="text-white font-Poppins text-center mb-8">
          At Learnosphere, we are dedicated to helping you find the perfect
          tutor who meets your academic needs and preferences.
        </p>

        <div className="w-[90vw] md:w-3/5 lg:w-2/4 mx-auto py-8">
          <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 shadow-orange-300">
            <form className="space-y-6 font-Poppins">
              <h2 className="text-lg font-semibold text-gray-700 text-start mb-6">
                Share Your Details to Unlock Your Dashboard
              </h2>

              {/* Name & Email (Read Only) */}
              <div className="relative mb-4">
                <label className="block text-sm font-medium text-black">
                  Student Name*
                </label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  readOnly
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 sm:text-sm focus:outline-none"
                />
              </div>

              <div className="relative mb-4">
                <label className="block text-sm font-medium text-black">
                  Gmail*
                </label>
                <input
                  type="email"
                  name="gmail"
                  value={formData.gmail}
                  readOnly
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 sm:text-sm focus:outline-none"
                />
              </div>

              {/* --- UPDATED MOBILE NUMBER WITH COUNTRY SELECTOR --- */}
              <div className="relative mb-4 z-20">
                <label className="block text-sm font-medium text-black">
                  Mobile Number*
                </label>
                <div className="flex items-center mt-1">
                  {/* Country Dropdown */}
                  <div className="relative" ref={countryDropdownRef}>
                    <button
                      type="button"
                      onClick={() => setShowCountryList(!showCountryList)}
                      className="flex items-center gap-2 px-3 py-2 border border-r-0 border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100 transition-colors h-[42px]"
                    >
                      <span className="text-xl">
                        {getFlagEmoji(formData.countryIso)}
                      </span>
                      <span className="text-gray-700 font-medium text-sm">
                        {formData.countryCode}
                      </span>
                      <svg
                        className="w-3 h-3 text-gray-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    </button>

                    {/* Dropdown List */}
                    {showCountryList && (
                      <div className="absolute top-full mt-1 left-0 bg-white shadow-xl border rounded-lg max-h-60 overflow-y-auto w-64 z-50">
                        <div className="p-2 sticky top-0 bg-white border-b">
                          <input
                            type="text"
                            placeholder="Search country..."
                            value={searchCountry}
                            onChange={(e) => setSearchCountry(e.target.value)}
                            className="w-full p-2 border rounded text-sm focus:outline-none focus:border-orange-500"
                          />
                        </div>
                        {filteredCountries.length > 0 ? (
                          filteredCountries.map((c) => (
                            <div
                              key={c.isoCode}
                              onClick={() => handleCountrySelect(c)}
                              className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-orange-50 transition-colors"
                            >
                              <span className="text-xl">
                                {getFlagEmoji(c.isoCode)}
                              </span>
                              <div className="flex flex-col">
                                <span className="text-gray-900 font-medium text-sm">
                                  {c.name}
                                </span>
                                <span className="text-gray-500 text-xs">
                                  {c.phonecode.startsWith("+")
                                    ? c.phonecode
                                    : `+${c.phonecode}`}
                                </span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-3 text-center text-gray-500 text-sm">
                            No results found
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Phone Input */}
                  <input
                    type="text"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    className="flex-1 block w-full px-4 py-2 border border-gray-300 rounded-r-md shadow-sm transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm h-[42px]"
                    placeholder="Enter mobile number"
                  />
                </div>
                {errors.mobileNumber && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.mobileNumber}
                  </p>
                )}
              </div>
              {/* --- END MOBILE NUMBER --- */}

              <div className="relative mb-4">
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-black"
                >
                  Gender*
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && (
                  <p className="text-red-600 text-sm mt-1">{errors.gender}</p>
                )}
              </div>

              <div className="relative mb-4">
                <label
                  htmlFor="dob"
                  className="block text-sm font-medium text-black"
                >
                  Date of Birth*
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  max={new Date().toISOString().split("T")[0]} // ⬅️ prevents future
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
                />
                {errors.dob && (
                  <p className="text-red-600 text-sm mt-1">{errors.dob}</p>
                )}
              </div>

              <div className="relative mb-6">
                <label
                  htmlFor="grade"
                  className="block text-sm font-medium text-black mb-2"
                >
                  Grade*
                </label>
                <select
                  id="grade"
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
                >
                  <option value="">Select Grade</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i} value={`Grade ${i + 1}`}>
                      Grade {i + 1}
                    </option>
                  ))}
                </select>
                {errors.grade && (
                  <p className="text-red-600 text-sm mt-1">{errors.grade}</p>
                )}
              </div>

              {(formData.grade === "Grade 11" ||
                formData.grade === "Grade 12") && (
                <div>
                  <label
                    htmlFor="stream"
                    className="block text-sm font-medium text-black"
                  >
                    Stream*
                  </label>
                  <select
                    id="stream"
                    name="stream"
                    value={formData.stream}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
                  >
                    <option value="" disabled>
                      Select Your Stream
                    </option>
                    <option value="PCM">Science(PCM)</option>
                    <option value="PCB">Science(PCB)</option>
                    <option value="Arts">Arts</option>
                    <option value="Commerce">Commerce</option>
                  </select>
                </div>
              )}

              <div className="relative mb-4">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-black"
                >
                  Subject*
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
                >
                  <option value="" disabled>
                    Select a subject
                  </option>
                  {/* Logic for subjects kept same as original code */}
                  {formData.grade &&
                    !["Grade 11", "Grade 12"].includes(formData.grade) && (
                      <>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Science">Science</option>
                        <option value="English">English</option>
                        <option value="Social Science">Social Science</option>
                        <option value="Computer Science">
                          Computer Science
                        </option>
                        <option value="Evs">EVS</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Sanskrit">Sanskrit</option>
                      </>
                    )}
                  {/* Grade 11/12 Specific */}
                  {["Grade 11", "Grade 12"].includes(formData.grade) && (
                    <>
                      {formData.stream === "PCM" && (
                        <>
                          <option value="Mathematics">Mathematics</option>
                          <option value="Physics">Physics</option>
                          <option value="Chemistry">Chemistry</option>
                        </>
                      )}
                      {formData.stream === "PCB" && (
                        <>
                          <option value="Biology">Biology</option>
                          <option value="Physics">Physics</option>
                          <option value="Chemistry">Chemistry</option>
                        </>
                      )}
                      {formData.stream === "Arts" && (
                        <>
                          <option value="History">History</option>
                          <option value="Geography">Geography</option>
                          <option value="Political Science">
                            Political Science
                          </option>
                          <option value="Sociology">Sociology</option>
                          <option value="Psychology">Psychology</option>
                        </>
                      )}
                      {formData.stream === "Commerce" && (
                        <>
                          <option value="Accountancy">Accountancy</option>
                          <option value="Economics">Economics</option>
                          <option value="Business Studies">
                            Business Studies
                          </option>
                        </>
                      )}
                    </>
                  )}
                </select>
                {errors.subject && (
                  <p className="text-red-600 text-sm mt-1">{errors.subject}</p>
                )}
              </div>

              {/* State Dropdown (Dynamic based on Country) */}
              <div>
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-black"
                >
                  State*
                </label>
                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleStateChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
                >
                  <option value="">Select State</option>
                  {availableStates.map((state, index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <p className="text-red-600 text-sm mt-1">{errors.state}</p>
                )}
              </div>

              {/* City Dropdown (Dynamic based on State) */}
              {formData.state && (
                <div className="relative mb-4">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-black"
                  >
                    City*
                  </label>
                  <select
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
                  >
                    <option value="">Select City</option>
                    {availableCities.map((city, index) => (
                      <option key={index} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  {errors.city && (
                    <p className="text-red-600 text-sm mt-1">{errors.city}</p>
                  )}
                </div>
              )}

              {/* Pincode (Only for India) */}
              {formData.countryIso === "IN" && (
                <div className="relative mb-4">
                  <label
                    htmlFor="pincode"
                    className="block text-sm font-medium text-black"
                  >
                    Pincode*
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    maxLength="6"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
                    placeholder="Enter 6-digit pincode"
                  />
                  {errors.pincode && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.pincode}
                    </p>
                  )}
                </div>
              )}

              <div className="relative mb-4">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-black"
                >
                  Full Address
                  {formData.countryIso === "IN" ? "*" : " (Optional)"}
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md resize-none shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
                  placeholder="Enter your full address"
                  rows="2"
                />
                {errors.address && (
                  <p className="text-red-600 text-sm mt-1">{errors.address}</p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="tutorCharacteristics"
                  className="block text-black font-semibold"
                >
                  Preferred Tutor Characteristics (If any)
                </label>
                <textarea
                  id="tutorCharacteristics"
                  value={formData.tutorCharacteristics}
                  name="tutorCharacteristics"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                  placeholder="Describe the type of tutor you're looking for"
                />
              </div>

              <div className="relative mb-6">
                <label
                  htmlFor="language"
                  className="block text-sm font-medium text-black"
                >
                  Language*
                </label>
                <select
                  id="language"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
                >
                  <option value="">Select Language</option>
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                </select>
                {errors.language && (
                  <p className="text-red-600 text-sm mt-1">{errors.language}</p>
                )}
              </div>

              <div className="relative mb-6">
                <label
                  htmlFor="schooltype"
                  className="block text-sm font-medium text-black"
                >
                  School Type{" "}
                  {formData.countryIso === "IN" ? "*" : " (Optional)"}
                </label>
                <select
                  id="schooltype"
                  name="schooltype"
                  value={formData.schooltype}
                  onChange={handleChange}
                  className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
                >
                  <option value="">Select School Type</option>
                  <option value="Private">Private School </option>
                  <option value="Government">Government School</option>
                </select>
                {errors.schooltype && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.schooltype}
                  </p>
                )}
              </div>

              <div className="relative mb-4">
                <label
                  htmlFor="schoolName"
                  className="block text-sm font-medium text-black"
                >
                  School Name{" "}
                  {formData.countryIso === "IN" ? "*" : " (Optional)"}
                </label>
                <input
                  type="text"
                  id="schoolName"
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
                  placeholder="Enter your school name"
                />
                {errors.schoolName && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.schoolName}
                  </p>
                )}
              </div>

              <div className="relative mb-6">
                <label
                  htmlFor="educationBoard"
                  className="block text-sm font-medium text-black"
                >
                  Education Board
                  {formData.countryIso === "IN" ? "*" : " (Optional)"}
                </label>
                <select
                  id="educationBoard"
                  name="educationBoard"
                  value={formData.educationBoard}
                  onChange={handleChange}
                  className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
                >
                  <option value="">Select Education Board</option>
                  {educationBoards.map((board, index) => (
                    <option key={index} value={board}>
                      {board}
                    </option>
                  ))}
                </select>
                {errors.educationBoard && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.educationBoard}
                  </p>
                )}
              </div>

              <div>
                <p className="text-sm text-slate-600">* Required fields</p>
              </div>

              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full py-3 px-6 bg-orange-600 text-white font-semibold rounded-md shadow-md hover:bg-orange-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Submit
              </button>
            </form>

            {generalError && (
              <div className="mb-2 mt-4 p-4 bg-red-100 text-red-800 border border-red-300 rounded-md">
                {generalError}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
