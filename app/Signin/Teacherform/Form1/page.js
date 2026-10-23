"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import React, { useState, useContext, useEffect, useRef } from "react";
import { FormContext } from "@/src/context/FormContext";
import axios from "axios";
import { trackEvent } from "@/src/lib/eventTracker";

// Helper to convert ISO code to Emoji Flag
const getFlagEmoji = (iso) => {
  if (!iso || iso.length !== 2) return "🏳"; // fallback flag
  return iso
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397));
};

const Form1 = ({ onContinue }) => {
  const genderOptions = ["Male", "Female"];
  const languages = ["English", "Hindi", "Spanish", "French"];
  const subjects = [
    "Mathematics",
    "Science",
    "History",
    "Geography",
    "English",
    "Hindi",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer Science",
    "Physical Education",
    "Music",
    "Art",
    "Dance",
    "Drama",
    "Economics",
    "Business Studies",
    "Accounting",
    "Commerce",
    "Political Science",
    "Sociology",
    "Psychology",
    "Philosophy",
    "Environmental Science",
    "Agriculture",
    "Home Science",
  ];

  // State Management
  const [countries, setCountries] = useState([]);
  const [locationMap, setLocationMap] = useState({}); // { StateName: [City1, City2] }
  const [availableStates, setAvailableStates] = useState([]);
  const [availableCities, setAvailableCities] = useState([]);
  const [showCountryList, setShowCountryList] = useState(false);
  const [searchCountry, setSearchCountry] = useState("");
  const countryDropdownRef = useRef(null);

  // Context
  const { state: formData, dispatch } = useContext(FormContext);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  // --- Handlers ---

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Mobile Number Input
    if (name === "mobilenumber") {
      const numericValue = value.replace(/\D/g, "");
      // Allow up to 15 digits (max international standard)
      if (numericValue.length <= 15) {
        dispatch({
          type: "UPDATE_FORM_DATA",
          payload: { [name]: numericValue },
        });
      }
    }

    // Country Selection
    else if (name === "countryInfo") {
      const [iso, code] = value.split(",");
      const selectedCountry = countries.find((c) => c.isoCode === iso);

      dispatch({
        type: "UPDATE_FORM_DATA",
        payload: {
          countryIso: iso,
          countryCode: code,
          countryName: selectedCountry?.name || "", // ⭐ ADD THIS
          currencySymbol: selectedCountry?.currencySymbol || "",
          state: "",
          city: "",
          pincode: "",
        },
      });
    }
    // State Selection
    else if (name === "state") {
      dispatch({
        type: "UPDATE_FORM_DATA",
        payload: { [name]: value, city: "" }, // Reset city when state changes
      });
    }
    // Pincode Input
    else if (name === "pincode") {
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length <= 6) {
        dispatch({
          type: "UPDATE_FORM_DATA",
          payload: { [name]: numericValue },
        });
      }
    }
    // General Fields
    else {
      dispatch({
        type: "UPDATE_FORM_DATA",
        payload: { [name]: value },
      });
    }
  };

  // --- Validation Logic ---

  const validate = () => {
    let newErrors = {};

    if (!formData.name) newErrors.name = "*Name is required";

    // Mobile Validation based on Country
    if (!formData.mobilenumber) {
      newErrors.mobilenumber = "*Mobile number is required";
    } else if (!/^\d+$/.test(formData.mobilenumber)) {
      newErrors.mobilenumber = "*Only digits allowed";
    } else {
      if (formData.countryIso === "IN") {
        // Strict check for India
        if (formData.mobilenumber.length !== 10) {
          newErrors.mobilenumber = "*Mobile number must be 10 digits";
        }
      } else {
        // International standard (usually 7-15 digits)
        if (
          formData.mobilenumber.length < 7 ||
          formData.mobilenumber.length > 15
        ) {
          newErrors.mobilenumber = "*Invalid mobile number length";
        }
      }
    }

    if (!formData.gender) newErrors.gender = "*Gender is required";
    if (!formData.subject) newErrors.subject = "*Subject is required";
    if (!formData.language) newErrors.language = "*Language is required";
    if (!formData.state) newErrors.state = "*State is required";
    if (!formData.city) newErrors.city = "*City is required";

    // Validate Pincode ONLY if Country is India
    if (formData.countryIso === "IN") {
      if (!formData.pincode) {
        newErrors.pincode = "*Pincode is required";
      } else if (!/^\d{6}$/.test(formData.pincode)) {
        newErrors.pincode = "*Pincode must be exactly 6 digits";
      }
    }

    // Validate Date of Birth
    if (!formData.dob) {
      newErrors.dob = "*Date of Birth is required";
    } else if (new Date(formData.dob) >= new Date()) {
      newErrors.dob = "*Date of Birth must be in the past";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- API Effects ---

  // 1. Fetch Teacher Data (Edit Mode)
  useEffect(() => {
    if (!formData.email) return;

    const fetchInputValues = async () => {
      try {
        const response = await axios.get(
          `${WEB_BACKEND_URL}/api/route/getTeacherForm1Data?email=${formData.email}`
        );

        const data = response.data;

        // Normalize backend fields → frontend fields
        const normalizedData = {
          ...data,

          countryIso: data.country_iso || "",
          countryName: data.country_name || "",
          countryCode: data.country_code || "", // If backend sends code later
          currencySymbol: data.currency || "",
        };

        dispatch({
          type: "UPDATE_FORM_DATA",
          payload: normalizedData,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchInputValues();
  }, [formData.email, dispatch]);

  // 2. Fetch Countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          `${WEB_BACKEND_URL}/api/route/get_all_countries_data`
        );
        const data = response.data.data || [];
        setCountries(data);

        // Set Default to India
        if (!formData.countryIso) {
          const india = data.find((c) => c.isoCode === "IN");
          if (india) {
            const code = india.phonecode.startsWith("+")
              ? india.phonecode
              : `+${india.phonecode}`;

            dispatch({
              type: "UPDATE_FORM_DATA",
              payload: {
                countryIso: "IN",
                countryCode: code,
                countryName: india.name, // ⭐ ADD THIS
                currencySymbol: india.currencySymbol,
              },
            });
          }
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
        // Fallback
        setCountries([{ isoCode: "IN", phonecode: "91", name: "India" }]);
        if (!formData.countryIso) {
          dispatch({
            type: "UPDATE_FORM_DATA",
            payload: { countryIso: "IN", countryCode: "+91" },
          });
        }
      }
    };
    fetchCountries();
  }, [dispatch, formData.countryIso]);

  // 3. Fetch States/Cities based on Country
  useEffect(() => {
    if (!formData.countryIso) return;

    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          `${WEB_BACKEND_URL}/api/route/get_state_city_by_country_code/${formData.countryIso}`
        );
        const rawData = response.data.data || [];

        // Process flat data into a Map: { StateName: [City1, City2, ...] }
        const map = {};
        rawData.forEach((item) => {
          if (!map[item.state]) {
            map[item.state] = [];
          }
          map[item.state].push(item.city);
        });

        setLocationMap(map);
        setAvailableStates(Object.keys(map).sort());
      } catch (error) {
        console.error("Error fetching locations:", error);
        setAvailableStates([]);
        setLocationMap({});
      }
    };

    fetchLocations();
  }, [formData.countryIso]);

  // 4. Update Cities when State changes
  useEffect(() => {
    if (formData.state && locationMap[formData.state]) {
      setAvailableCities(locationMap[formData.state].sort());
    } else {
      setAvailableCities([]);
    }
  }, [formData.state, locationMap]);

  const handleContinue = async () => {
    if (validate()) {
      try {
        // Check duplicate
        const checkResponse = await axios.post(
          `${WEB_BACKEND_URL}/api/route/checkteachersdata`,
          {
            email: formData.email,
            mobilenumber: formData.mobilenumber,
            registrationNumber: formData.registrationNumber,
          }
        );

        if (checkResponse.status === 200) {
          // Insert Data
          try {
            const insertResponse = await axios.post(
              `${WEB_BACKEND_URL}/api/route/insertTeacherSignupData`,
              {
                name: formData.name,
                email: formData.email,
                gender: formData.gender,
                subject: formData.subject,
                language: formData.language,
                countryName: formData.countryName, // ⭐ ADD THIS
                countryIso: formData.countryIso, // ⭐ ADD THIS
                countryCode: formData.countryCode,
                currency: formData.currencySymbol,
                mobilenumber: formData.mobilenumber,
                dob: formData.dob,
                state: formData.state,
                city: formData.city,
                pincode: formData.countryIso === "IN" ? formData.pincode : "",
              }
            );

            if (insertResponse.status === 200) {
              trackEvent("TEACHER_SIGNUP_STEP1_SUBMITTED", {
                name: formData.name,
                email: formData.email,
                mobile_number: formData.countryCode ? `${formData.countryCode}${formData.mobilenumber}` : formData.mobilenumber,
                mobilenumber: formData.mobilenumber,
                country_name: formData.countryName,
                country_iso: formData.countryIso,
              });
              onContinue();
            }
          } catch (err) {
            console.error("Insert Error:", err);
            setApiError("Error saving data. Please try again.");
            onContinue();
          }
        }
      } catch (checkError) {
        if (checkError.response?.data?.message) {
          const msg = checkError.response.data.message;
          if (msg.includes("Email")) setApiError("Email already registered");
          else if (msg.includes("Mobile"))
            setApiError("Mobile number already registered");
          else setApiError(msg);
        } else {
          setApiError("Server error. Please try again.");
        }
      }
    }
  };

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

  const filteredCountries = countries.filter(
    (c) =>
      c.name.toLowerCase().includes(searchCountry.toLowerCase()) ||
      c.phonecode.includes(searchCountry)
  );

  // --- UI Components ---
  const inputClass =
    "block w-full border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-orange-500 peer bg-transparent py-2.5 transition-colors";
  const labelClass =
    "absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:top-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500 peer-focus:top-3 peer-focus:scale-75 peer-focus:text-orange-500";

  return (
    <div className="w-full bg-white max-w-md mx-auto p-8 shadow-2xl rounded-lg">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">About</h1>
      <p className="mb-8 text-gray-600 text-sm">
        Start creating your public tutor profile. Your progress is automatically
        saved.
      </p>

      <form autoComplete="off">
        {/* Name */}
        <div className="relative mb-6">
          <input
            type="text"
            name="name"
            disabled
            value={formData.name || ""}
            onChange={handleInputChange}
            className={inputClass}
            placeholder=" "
          />
          <label className={labelClass}>Full Name</label>
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="relative mb-6">
          <input
            type="email"
            name="email"
            disabled
            value={formData.email || ""}
            onChange={handleInputChange}
            className={inputClass}
            placeholder=" "
          />
          <label className={labelClass}>Email</label>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* Gender */}
        <div className="relative mb-6">
          <select
            name="gender"
            value={formData.gender || ""}
            onChange={handleInputChange}
            className={inputClass}
          >
            <option value="" disabled hidden></option>
            {genderOptions.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          <label className={labelClass}>Gender</label>
          {errors.gender && (
            <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
          )}
        </div>

        {/* DOB */}
        <div className="relative mb-6">
          <input
            type="date"
            name="dob"
            value={
              formData.dob
                ? new Date(formData.dob).toISOString().split("T")[0]
                : ""
            }
            onChange={handleInputChange}
            className={inputClass}
          />
          <label className={labelClass}>Date of Birth</label>
          {errors.dob && (
            <p className="text-red-500 text-xs mt-1">{errors.dob}</p>
          )}
        </div>

        {/* Subject */}
        <div className="relative mb-6">
          <select
            name="subject"
            value={formData.subject || ""}
            onChange={handleInputChange}
            className={inputClass}
          >
            <option value="" disabled hidden></option>
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <label className={labelClass}>Subject you teach</label>
          {errors.subject && (
            <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
          )}
        </div>

        {/* Language */}
        <div className="relative mb-6">
          <select
            name="language"
            value={formData.language || ""}
            onChange={handleInputChange}
            className={inputClass}
          >
            <option value="" disabled hidden></option>
            {languages.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
          <label className={labelClass}>Language you speak</label>
          {errors.language && (
            <p className="text-red-500 text-xs mt-1">{errors.language}</p>
          )}
        </div>

        {/* Country Code + Mobile Number Group */}
        <div className="relative mb-6">
          <div className="flex items-center border-b-2 border-gray-300 focus-within:border-orange-500 pb-1">
            {/* Custom Country Selector Box */}
            <div className="relative" ref={countryDropdownRef}>
              <button
                type="button"
                onClick={() => setShowCountryList(!showCountryList)}
                className="flex items-center gap-2 pr-4 py-2 cursor-pointer bg-transparent focus:outline-none"
              >
                <span className="text-xl">
                  {getFlagEmoji(formData.countryIso || "IN")}
                </span>
                <span className="text-gray-700 font-medium">
                  {formData.countryCode}
                </span>

                {/* Arrow Icon */}
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 12l-5-5h10l-5 5z" />
                </svg>
              </button>

              {/* Country Dropdown */}
              {showCountryList && (
                <div className="absolute mt-1 bg-white shadow-xl border rounded-lg max-h-72 overflow-y-auto z-50 w-56">
                  {/* Search Box */}
                  <div className="p-2 sticky top-0 bg-white border-b">
                    <input
                      type="text"
                      placeholder="Search country..."
                      value={searchCountry}
                      onChange={(e) => setSearchCountry(e.target.value)}
                      className="w-full p-2 border rounded text-sm focus:outline-none"
                    />
                  </div>

                  {/* Country List */}
                  {filteredCountries.map((c) => {
                    const code = c.phonecode.startsWith("+")
                      ? c.phonecode
                      : `+${c.phonecode}`;

                    return (
                      <div
                        key={c.isoCode}
                        onClick={() => {
                          dispatch({
                            type: "UPDATE_FORM_DATA",
                            payload: {
                              countryIso: c.isoCode,
                              countryCode: code,
                              countryName: c.name,
                              currencySymbol: c.currencySymbol,
                              state: "",
                              city: "",
                              pincode: "",
                            },
                          });
                          setShowCountryList(false);
                          setSearchCountry("");
                        }}
                        className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-100"
                      >
                        <span className="text-xl">
                          {getFlagEmoji(c.isoCode)}
                        </span>

                        <div className="flex flex-col">
                          <span className="text-gray-900 font-medium text-sm">
                            {c.name}
                          </span>
                          <span className="text-gray-500 text-xs">{code}</span>
                        </div>
                      </div>
                    );
                  })}

                  {filteredCountries.length === 0 && (
                    <p className="p-3 text-center text-gray-500 text-sm">
                      No results found
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Input */}
            <input
              type="tel"
              name="mobilenumber"
              value={formData.mobilenumber || ""}
              onChange={handleInputChange}
              className="flex-1 px-3 py-2 bg-transparent outline-none text-base"
              placeholder="Mobile Number"
            />
          </div>

          <label className="absolute text-gray-500 text-xs top-[-8px]">
            Mobile Number
          </label>

          {errors.mobilenumber && (
            <p className="text-red-500 text-xs mt-1">{errors.mobilenumber}</p>
          )}
        </div>

        {/* State */}
        <div className="relative mb-6">
          <select
            name="state"
            value={formData.state || ""}
            onChange={handleInputChange}
            className={inputClass}
          >
            <option value="" disabled hidden></option>
            {availableStates.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <label className={labelClass}>State</label>
          {errors.state && (
            <p className="text-red-500 text-xs mt-1">{errors.state}</p>
          )}
        </div>

        {/* City - Conditional Render */}
        {formData.state && (
          <div className="relative mb-6 animate-fade-in-down">
            <select
              name="city"
              value={formData.city || ""}
              onChange={handleInputChange}
              className={inputClass}
            >
              <option value="" disabled hidden></option>
              {availableCities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <label className={labelClass}>City</label>
            {errors.city && (
              <p className="text-red-500 text-xs mt-1">{errors.city}</p>
            )}
          </div>
        )}

        {/* Pincode - India Only */}
        {formData.countryIso === "IN" && (
          <div className="relative mb-6">
            <input
              type="text"
              name="pincode"
              value={formData.pincode || ""}
              onChange={handleInputChange}
              className={inputClass}
              placeholder=" "
              maxLength={6}
            />
            <label className={labelClass}>Pin Code</label>
            {errors.pincode && (
              <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>
            )}
          </div>
        )}

        {apiError && (
          <div className="p-3 mb-4 bg-red-50 text-red-600 rounded text-sm">
            {apiError}
          </div>
        )}

        <button
          type="button"
          onClick={handleContinue}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg shadow-md transition-all transform hover:scale-[1.01]"
        >
          Save and Continue
        </button>
      </form>
    </div>
  );
};

export default Form1;
