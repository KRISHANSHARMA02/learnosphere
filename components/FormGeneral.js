"use client";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { trackEvent } from "@/src/lib/eventTracker";

export default function FormSection() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("+91");
  const [selected, setSelected] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [grade, setGrade] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [pageName, setPageName] = useState("");
  const dropdownRef = useRef(null);

  //Page url storing section
  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname; // e.g., /CBSEsyllabus
      const cleanPageName = path.replace("/", "") || "UnknownPage";
      setPageName(cleanPageName);
    }
  }, []);

  // When a country is selected
  const handleSelect = (code) => {
    setSelected(code);
    setSelectedCountry(code);
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

  //1. Auto detect  IP
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
        // Extract ISO2 from ANY available field
        const userISO =
          data.country_code_iso3166alpha2?.toUpperCase() ||
          data.country_code?.toUpperCase();

        if (!userISO) {
          console.warn("No valid ISO country code found from IP");
          return;
        }

        // Match with DB countries
        const match = countries.find((c) => c.iso2.toUpperCase() === userISO);

        if (match) {
          const code = `+${match.countryCode}`;
          setSelected(code); // UI display
          setSelectedCountry(code); // form submit value
        } else {
          console.warn("Country ISO not found in DB:", userISO);
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
          "https://learnospherebackend.learnosphere.in/api/route/getAllCountries"
        );
        setCountries(res.data);
      } catch (err) {
        console.error("Error fetching countries:", err);
      }
    };
    fetchCountries();
  }, []);

  // ✅ Restrict contact input to digits only
  const handleContact = (e) => {
    const { value } = e.target;
    if (/^\d{0,10}$/.test(value)) {
      setContact(value);
    }
  };

  // ✅ Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");

    const newErrors = {};

    if (!selectedCountry)
      newErrors.selectedCountry = "Please enter your country code.";
    if (!name) newErrors.name = "Name is required.";
    if (!email) newErrors.email = "Email is required.";
    if (!contact) newErrors.contact = "Mobile number is required.";
    if (!grade) newErrors.grade = "Grade is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const fullContact = selectedCountry
      ? `${selectedCountry}${contact}`
      : contact;

    const formData = {
      name,
      email,
      contact,
      grade,
      countryCode: selectedCountry,
      pageName,
    };

    try {
      const response = await axios.post(
        "https://learnospherebackend.learnosphere.in/api/route/formulaForm",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        trackEvent("LEARNING_PROGRAM_FORM_SUBMITTED", {
          name,
          email,
          mobile_number: fullContact,
          contact,
          country_code: selectedCountry,
          grade,
          page_name: pageName,
        });

        setSuccess("Form Submitted Successfully");
        setName("");
        setEmail("");
        setContact("");
        setGrade("");
        setSelectedCountry("+91");

        Swal.fire({
          title: "Thank You for Reaching Out!",
          text: "Your query has been received, and our team will contact you shortly. Meanwhile, explore Learnosphere to find top educators and resources tailored just for you!",
          icon: "success",
        });
      } else {
        setErrors({ general: "Failed to submit the form. Please try again." });
      }
    } catch (error) {
      // Handle error responses
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: "An error occurred while submitting the form." });
      }
    }
  };

  return (
    <div className="bg-white p-5 rounded-lg">
      <p className="font-bold text-[1.1em]">
        Join Learnosphere For Learning Program
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-1 mt-4">
        <span>
          <label htmlFor="name" className="block text-black text-[.9em]">
            Name
          </label>
          <input
            name="name"
            id="name"
            type="text"
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className=" mt-1 focus:outline-none focus:border-orange-600 border  w-full p-2 text-[.9em] rounded-md border-gray-800 bg-white placeholder:text-slate-800"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mb-4">{errors.name}</p>
          )}
        </span>
        <span>
          <label htmlFor="email" className="block text-black text-[.9em]">
            Email
          </label>
          <input
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Enter your Email"
            className=" mt-1 focus:outline-none focus:border-orange-600 border  w-full p-2 text-[.9em] rounded-md border-gray-800 bg-white placeholder:text-slate-800"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mb-4">{errors.email}</p>
          )}
        </span>
        <span>
          <label htmlFor="contact" className="block text-black text-[.9em]">
            Mobile Number
          </label>
          <div className="flex  mt-1 focus:outline-none focus:border-orange-600   w-full border rounded-md  text-[.9em] border-gray-800 bg-white">
            <div ref={dropdownRef} className="relative bg-gray-200 rounded-md ">
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
          {errors.contact && (
            <p className="text-red-500 text-sm mb-4">{errors.contact}</p>
          )}
        </span>
        <span>
          <label htmlFor="grade" className="block text-black text-[.9em]">
            Grade
          </label>
          <select
            name="grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            id="grade"
            className="mt-1 focus:outline-none focus:border-orange-600 border w-full p-2 text-[.9em] rounded-md border-gray-800 bg-white placeholder:text-slate-800"
          >
            <option value="" disabled>
              Select Grade
            </option>
            <option value="Grade 1">Grade 1</option>
            <option value="Grade 2">Grade 2</option>
            <option value="Grade 3">Grade 3</option>
            <option value="Grade 4">Grade 4</option>
            <option value="Grade 5">Grade 5</option>
            <option value="Grade 6">Grade 6</option>
            <option value="Grade 7">Grade 7</option>
            <option value="Grade 8">Grade 8</option>
            <option value="Grade 9">Grade 9</option>
            <option value="Grade 10">Grade 10</option>
            <option value="Grade 11">Grade 11</option>
            <option value="Grade 12">Grade 12</option>
            {/* Add more grades as needed */}
          </select>
          {errors.grade && (
            <p className="text-red-500 text-sm mb-4">{errors.grade}</p>
          )}
        </span>
        <div>
          <button
            type="submit"
            className="bg-orange-600 p-2 text-white font-bold mt-2 rounded-lg"
          >
            Submit
          </button>
        </div>

        {errors.general && (
          <p className="text-red-500 text-sm mb-4">{errors.general}</p>
        )}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
      </form>
    </div>
  );
}
