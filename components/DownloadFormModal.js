"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { trackEvent } from "@/src/lib/eventTracker";

const DownloadFormModal = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [role, setRole] = useState("");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [errors, setErrors] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("+91");
  const dropdownRef = useRef(null);
  const [selected, setSelected] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

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

  // When a country is selected
  const handleSelect = (code) => {
    setSelected(code);
    setSelectedCountry(code);
    setShowDropdown(false);
  };

  // ✅ Fetch countries from backend
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get(
          "https://learnospherebackend.learnosphere.in/api/route/getAllCountries",
        );
        setCountries(res.data);
      } catch (err) {
        console.error("Error fetching countries:", err);
      }
    };
    fetchCountries();
  }, []);

  const handleContact = (e) => {
    const { value } = e.target;
    if (/^\d{0,10}$/.test(value)) {
      setContact(value);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors and success messages
    setFormError("");
    setFormSuccess("");

    const formData = {
      name,
      email,
      contact,
      role,
      countryCode: selectedCountry,
    };

    try {
      // Submit form data — the API returns JSON {token, msg}, NOT a PDF blob.
      const response = await axios.post(
        "https://learnospherebackend.learnosphere.in/api/route/downloadform",
        formData,
      );

      trackEvent("RESOURCE_DOWNLOAD_FORM_SUBMITTED", {
        name,
        email,
        mobile_number: selectedCountry
          ? `${selectedCountry}${contact}`
          : contact,
        contact,
        role,
        country_code: selectedCountry,
      });

      // Reset form fields
      setName("");
      setEmail("");
      setContact("");
      setRole("");
      setSelectedCountry("+91");
      setFormSuccess("Form submitted successfully!");

      // Let the parent page open the actual PDF via its onSubmit callback
      onSubmit(response.data);
      onClose();
    } catch (error) {
      setFormError(
        "An error occurred while submitting the form. Please try again.",
      );
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-lg font-bold mb-4">Please Fill Out the Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border p-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              required
              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
              onInvalid={(e) =>
                e.target.setCustomValidity("Please enter a valid email address")
              }
              onInput={(e) => e.target.setCustomValidity("")}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Contact
            </label>
            <div className="flex mt-1">
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
                          onClick={() => handleSelect(`+${c.countryCode}`)}
                        >
                          <span className="text-base">{c.countryName}</span>
                          <span className="text-sm">(+{c.countryCode})</span>
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
                type="tel"
                value={contact}
                onChange={handleContact}
                className="w-full p-2 border border-gray-300 rounded-r-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 text-sm"
                required
                pattern="[0-9]{10}"
                maxLength={10}
                placeholder="Enter 10-digit mobile number"
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-[.8em] px-1 text-black"
            >
              Role
            </label>
            <select
              onChange={(e) => setRole(e.target.value)}
              id="role"
              name="role"
              value={role}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
            >
              <option value="">Select Role</option>
              <option value="Teacher">Teacher</option>
              <option value="Student">Student</option>
              <option value="Other">Other</option>
            </select>
          </div>
          {formError && (
            <p className="text-red-500 text-sm mb-4">{formError}</p>
          )}
          {formSuccess && (
            <p className="text-green-500 text-sm mb-4">{formSuccess}</p>
          )}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-orange-600 text-white font-bold rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={onClose}
            className="mt-4 w-full py-2 px-4 bg-gray-300 text-gray-800 font-bold rounded-md hover:bg-gray-400"
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default DownloadFormModal;
