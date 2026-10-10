"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { trackEvent } from "@/src/lib/eventTracker";
import Head from 'next/head';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Footer1 from '@/components/Footer1';
import { RxCrossCircled } from "react-icons/rx";
import { LiaCheckDoubleSolid } from "react-icons/lia";

const Contact = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("+91");
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    contact: '',
    message: '',
    countryCode: selectedCountry,
  });

  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  // ✅ Fetch countries from backend
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get("https://learnospherebackend.learnosphere.in/api/route/getAllCountries");
        setCountries(res.data);
      } catch (err) {
        console.error("Error fetching countries:", err);
      }
    };
    fetchCountries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://learnospherebackend.learnosphere.in/contact",
        formData
      );
       
      trackEvent("CONTACT_US_FORM_SUBMITTED", {
        name: formData.fullname,
        email: formData.email,
        contact: formData.contact,
        message: formData.message,
        country_code: formData.countryCode,
      });

      setFormData({
        fullname: '',
        email: '',
        contact: '',
        message: '',
        countryCode: selectedCountry,
      });
      setErrors([]);
      setSuccessMessage('Form submitted successfully...');
    } catch (error) {
      console.error('Form submission error:', error);
      if (error.response && error.response.data && error.response.data.msg) {
        setErrors(error.response.data.msg);
        setSuccessMessage('');
      } else {
        setErrors(['An unexpected error occurred.']);
        setSuccessMessage('');
      }
    }
  };
  const handleContact = (e) => {
    const { value } = e.target;

    // Allow only numeric input and restrict to 10 digits
    if (/^\d{0,10}$/.test(value)) {
      setFormData((prev) => ({
        ...prev,
        contact: value,
      }));
    }
  };


  return (
    <>
      <Head>
        <title>Contact Us | Learnosphere - Personalized Tutoring Solutions</title>
        <meta name="description" content="Get in touch with Learnosphere to find the best personalized tutoring solutions. Fill out our contact form or call our friendly education experts today!" />
        <meta name="keywords" content="Learnosphere, contact, tutoring, personalized learning, education experts, find a tutor, tutoring solutions" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Contact Us | Learnosphere" />
        <meta property="og:description" content="Reach out to Learnosphere for personalized tutoring solutions. Our education experts are here to help you find the perfect tutor." />
        <meta property="og:image" content="/images/contact-og-image.jpg" />
        <meta property="og:url" content="https://learnosphere.in/contact" />
        <meta name="twitter:title" content="Contact Us | Learnosphere" />
        <meta name="twitter:description" content="Get in touch with Learnosphere for the best tutoring solutions tailored to your needs." />
        <meta name="twitter:image" content="/images/contact-twitter-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Navbar />
      <div className="min-h-screen my-12 bg-[#fff] flex items-center justify-center px-4 md:px-8">
        <div className="flex flex-col md:flex-row gap-16 md:gap-32 items-center max-w-screen-xl w-full">
          <div className="text-center md:text-left md:w-1/2">
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mt-12 md:mt-0">
              Get in touch with us
            </h1>
            <p className="text-base md:text-lg mt-6 md:mt-8">
              Please get in touch today by filling out the online contact form or calling our
              friendly education experts. Need a tutor? Download the Learnosphere app to find
              face-to-face tutors. We look forward to hearing from you and welcoming you to our
              Learnosphere community.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="fullname" className="block text-sm md:text-lg font-semibold text-gray-700">
                  Name:
                </label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm md:text-lg font-semibold text-gray-700">
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
                <label htmlFor="email" className="block text-sm md:text-lg font-semibold text-gray-700">
                  Contact:
                </label>
                <div className="flex border border-gray-300 mt-1  p-1   w-full  rounded-md  text-[.9em]  bg-white">
                  <div className="flex flex-col">
                    <input
                      list="countryCodes"
                      value={selectedCountry}
                      onChange={(e) => {
                        const value = e.target.value;
                        // Allow only numbers, one "+", and hyphens between digits
                        if (/^\+?\d{0,4}(-\d{0,4})*$/.test(value)) {
                          setSelectedCountry(value);
                        }
                      }}
                      placeholder="Code"
                      className=" bg-white pt-2 ml-1text-[.9em] w-[60px] rounded-md pl-2 focus:outline-none "
                      inputMode="numeric"
                      pattern="[\d+-]*"
                    />

                    <datalist id="countryCodes">
                      {countries.map((c) => (
                        <option
                          key={c._id}
                          value={`+${c.countryCode}`}
                        >
                          {c.countryName} ({c.iso2})
                        </option>
                      ))}
                    </datalist>

                    {errors.selectedCountry && (
                      <p className="text-red-500 text-sm mb-2">{errors.selectedCountry}</p>
                    )}
                  </div>
                  <input
                    type="text"
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleContact}
                    className=" focus:outline-none rounded-md px-4 py-2 w-full"
                    placeholder="Enter your Phone Number"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm md:text-lg font-semibold text-gray-700">
                  Message:
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-4 py-2 w-full h-32 resize-none"
                  placeholder="Ex. I am interested in your stream?"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-orange-500 text-white px-4 py-2 rounded-md w-full hover:bg-orange-600"
              >
                Submit
              </button>
              {errors.length > 0 && (
                <div className="mt-4 space-y-1">
                  {errors.map((error, index) => (
                    <p key={index} className="text-red-700 flex items-center gap-1 text-sm md:text-base">
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
      <Footer1 />
      <Footer />
    </>
  );
};

export default Contact;
