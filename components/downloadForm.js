"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { RxCrossCircled } from "react-icons/rx";
import { LiaCheckDoubleSolid } from "react-icons/lia";
import { trackEvent } from "@/src/lib/eventTracker";

const DownloadFormPage = () => {
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("+91");
  const [selected, setSelected] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // When a country is selected
  const handleSelect = (code) => {
    setSelected(code);
    setSelectedCountry(code);
    setShowDropdown(false);
  };

  const handleContact = (e) => {
    const { value } = e.target;
    if (/^\d{0,10}$/.test(value)) {
      setFormData((prev) => ({
        ...prev,
        contact: value,
      }));
    }
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
  // ✅ Fetch countries from backend
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get(
          "https://learnospherebackend.learnosphere.in/api/route/getAllCountries"
        );
        setCountries(res.data);
      } catch (err) {
        console.error("Error fetching countries:", err);
      }
    };
    fetchCountries();
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    role: "",
    countryCode: selectedCountry,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors([]);
    setSuccessMessage("");

    try {
      const response = await axios.post(
        "https://learnospherebackend.learnosphere.in/api/route/downloadform",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 && response.data) {
        trackEvent("DOWNLOAD_FORM_SUBMITTED", {
          name: formData.name,
          email: formData.email,
          mobile_number: formData.countryCode ? `${formData.countryCode}${formData.contact}` : formData.contact,
          contact: formData.contact,
          role: formData.role,
          country_code: formData.countryCode,
        });

        setSuccessMessage("Form Submitted Successfully");
        // Reset form
        setFormData({
          name: "",
          email: "",
          contact: "",
          role: "",
          countryCode: selectedCountry,
        });

        // Optional: Handle file download if response returns a file URL
        // window.location.href = response.data.fileUrl; // if applicable
      } else {
        throw new Error("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      if (error.response?.data?.msg) {
        setErrors(
          Array.isArray(error.response.data.msg)
            ? error.response.data.msg
            : [error.response.data.msg]
        );
      } else {
        setErrors(["An unexpected error occurred. Please try again."]);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className=" bg-white flex items-center justify-center p-4 rounded-lg ">
        <div className="flex flex-col md:flex-row gap-16 md:gap-32 items-center max-w-screen-xl w-full">
          <div className="">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm  font-semibold text-gray-700"
                >
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm  font-semibold text-gray-700"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="contact"
                  className="block text-sm  font-semibold text-gray-700"
                >
                  Contact:
                </label>
                <div className="border border-gray-300  rounded-md">
                  <div className="flex  rounded-md">
                    <div className="flex flex-col">
                      <div
                        ref={dropdownRef}
                        className="relative bg-gray-200 rounded-md "
                      >
                        <div
                          className=" border p-2 rounded-md cursor-pointer  whitespace-nowrap text-sm shadow-sm flex justify-between items-center"
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
                                onClick={() =>
                                  handleSelect(`+${c.countryCode}`)
                                }
                              >
                                <span className="text-base">
                                  {c.countryName}
                                </span>
                                <span className="text-sm">
                                  (+{c.countryCode})
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      {errors.selectedCountry && (
                        <p className="text-red-500 text-sm mb-2">
                          {errors.selectedCountry}
                        </p>
                      )}
                    </div>
                    <input
                      type="text"
                      id="contact"
                      name="contact"
                      value={formData.contact}
                      onChange={handleContact}
                      className="w-full p-2  rounded-r-md focus:outline-none shadow-sm   text-sm"
                      //required pattern="[0-9]{10}"
                      placeholder="Enter 10-digit phone number"
                      maxLength={10}
                      required
                    />
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm  font-semibold text-gray-700"
                >
                  Role:
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Student">Student</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className={`w-full py-2 px-4 font-bold rounded-md transition ${
                  submitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-orange-600 text-white hover:bg-orange-700"
                }`}
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
              {errors.length > 0 && (
                <div className="mt-4 space-y-1">
                  {errors.map((error, index) => (
                    <p
                      key={index}
                      className="text-red-700 flex items-center gap-1 text-sm md:text-base"
                    >
                      <RxCrossCircled size={20} />
                      {error}
                    </p>
                  ))}
                </div>
              )}
              {successMessage && (
                <div className="mt-4">
                  <p className="text-green-700 flex items-center gap-2 text-sm md:text-base">
                    <LiaCheckDoubleSolid size={20} />
                    {successMessage}
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default DownloadFormPage;
