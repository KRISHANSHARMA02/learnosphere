"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import Footer from "@/components/Footer";
import Footer1 from "@/components/Footer1";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { trackEvent } from "@/src/lib/eventTracker";
import { BiSupport } from "react-icons/bi";
import { FaMedal } from "react-icons/fa";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { GiArchiveResearch } from "react-icons/gi";
import { GrSchedule } from "react-icons/gr";
import { IoMdArrowDropright } from "react-icons/io";
import { IoRemoveOutline } from "react-icons/io5";
import {
  MdOutlineAccountCircle,
  MdOutlineAppRegistration,
  MdOutlineQuestionMark,
} from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";
import Image from "next/image";
import Education from "@/public/education.jpg";

const TutorJobs = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isContactFocused, setIsContactFocused] = useState(false);
  const [isMessageFocused, setIsMessageFocused] = useState(false);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("+91");
  const [selected, setSelected] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);
  // When a country is selected
  const handleSelect = (code) => {
    setSelected(code);
    setSelectedCountry(code);
    setShowDropdown(false);
  };
  //Click outside event
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
          `${WEB_BACKEND_URL}/api/route/getAllCountries`
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
    setErrors({});
    setSuccess("");

    const formData = {
      name,
      email,
      contact,
      message,
      countryCode: selectedCountry,
    };

    try {
      const response = await axios.post(
        `${WEB_BACKEND_URL}/api/route/teachercontact`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Correct the response status check
      if (response.status === 200) {
        trackEvent("BECOME_A_TUTOR_FORM_SUBMITTED", {
          name,
          email,
          mobile_number: selectedCountry ? `${selectedCountry}${contact}` : contact,
          contact,
          message,
          country_code: selectedCountry,
        });

        setSuccess("Form Submitted Successfully");
        setName("");
        setEmail("");
        setContact("");
        setMessage("");
        setSelectedCountry("+91");

        // SweetAlert for success message
        Swal.fire({
          title: "Thank You for Reaching Out!",
          text: "Your query has been received, and our team will contact you shortly.",
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
    <div className="bg-white">
      <Navbar />
      <div className=" flex flex-col gap-2 justify-center items-center bg-gradient-to-r  mt-20 from-orange-200 h-[40vh] md:h-[55vh] w-[95vw] m-auto rounded-br-2xl rounded-bl-2xl to-yellow-200">
        <h1 className=" font-extrabold text-[1em] md:text-[1.7em] lg:text-[2em] text-center">
          Turn Your Knowledge Into Earnings-
          <span className="text-orange-600 font-extrabold">Become a Tutor</span>
        </h1>
        <p className="mt-1 font-semibold text-[.7em] sm:text-[.9em] md:text-[1.1em] lg:text-[1.2em] w-full sm:w-[80vw] xl:w-[50vw] text-center">
          Unlock flexible and rewarding tutoring opportunities with us. Teach at
          your convenience, share your expertise, and earn effortlessly.
        </p>
        <div className="flex gap-2 mt-8">
          <p className="text-[.7em] sm:text-[.9em] lg:text-[1.1em] flex gap-1 font-semibold items-center">
            Explore
            <IoMdArrowDropright className="text-orange-600" size={25} />
          </p>
          <p className="text-[.7em] sm:text-[.9em] lg:text-[1.1em] flex gap-1 font-semibold items-center">
            Apply
            <IoMdArrowDropright className="text-orange-600" size={25} />
          </p>
          <p className="text-[.7em] sm:text-[.9em] lg:text-[1.1em] flex gap-1 font-semibold items-center">
            Grow
            <IoMdArrowDropright className="text-orange-600" size={25} />
          </p>
          <p className="text-[.7em] sm:text-[.9em] lg:text-[1.1em] flex gap-1 font-semibold items-center">
            Achieve
          </p>
        </div>
        <Link href="/Signin">
          <button className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-200 hover:scale-105 p-2 md:p-3 w-40 text-white font-bold mt-3 rounded-lg text-[.8em] md:text-[1em]">
            Join Us
          </button>
        </Link>
      </div>
      <div className="flex flex-col  gap-2 justify-center items-center mt-10">
        <h2 className=" flex gap-2 items-center font-bold text-[1em] md:text-[1.7em] lg:text-[2em] ">
          From Why Be a Tutor ? 'to' Be a Tutor
        </h2>
        <IoRemoveOutline size={50} className="mt-2" />
        <p className="w-[80vw] text-[.7em] sm:text-[.9em] md:text-[1.1em] lg:text-[1.2em] m-auto text-center font-semibold">
          We are here to provide an excellent opportunity for teachers to take
          up
          <a
            href="/jobs-for-home-tutors"
            className="text-orange-600 hover:underline"
          >
            {" "}
            tutoring jobs{" "}
          </a>
          in India, enabling them to teach from the comfort of their homes. With{" "}
          <a href="/" className="text-orange-600 hover:underline">
            {" "}
            Learnosphere
          </a>
          , you can connect with students, share your expertise, and earn a
          steady income while maintaining a flexible schedule.
        </p>

        <div className="grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 mt-8 gap-4 rounded-2xl bg-gradient-to-r from-orange-100 to-yellow-100 w-[95%] p-6 m-auto">
          <div className="bg-white flex flex-col justify-center gap-3 items-center p-8 rounded-lg">
            <GiArchiveResearch
              className="bg-orange-600 p-2 rounded-full text-white"
              size={75}
            />
            <h3 className="text-[.9em] md:text-[1.1em] lg:text-[1.3em] text-center font-bold">
              Increase Employment Opportunities
            </h3>
            <p className="text-center text-[.8em] md:text-[.9em] lg:text-[1em] font-semibold mt-3">
              Boost your career by increasing employment opportunities and
              securing better job prospects.
            </p>
          </div>
          <div className="bg-white flex flex-col justify-center gap-3 items-center p-6 rounded-lg">
            <FaHandHoldingDollar
              className="bg-yellow-500 p-2 rounded-full text-white"
              size={75}
            />
            <h3 className="text-[.9em] md:text-[1.1em] lg:text-[1.3em] text-center font-bold">
              Earn a Rewarding Payment
            </h3>
            <p className="text-center font-semibold mt-3 text-[.8em] md:text-[.9em] lg:text-[1em]">
              Earn a rewarding payment while making a positive impact on
              students' learning journey.
            </p>
          </div>
          <div className="bg-white flex flex-col justify-center gap-3 items-center p-6 rounded-lg">
            <MdOutlineAppRegistration
              className="bg-blue-600 p-2 rounded-full text-white"
              size={75}
            />
            <h3 className="text-[.9em] md:text-[1.1em] lg:text-[1.3em] text-center font-bold">
              Begin Your Journey the Right Way
            </h3>
            <p className="text-center font-semibold mt-3 text-[.8em] md:text-[.9em] lg:text-[1em]">
              Start your journey the right way and unlock endless opportunities.
            </p>
          </div>
          <div className="bg-white flex flex-col justify-center gap-3 items-center p-6 rounded-lg">
            <BiSupport
              className="bg-red-600 p-2 rounded-full text-white"
              size={75}
            />
            <h3 className="text-[.9em] md:text-[1.1em] lg:text-[1.3em] text-center font-bold">
              Empathetic Support
            </h3>
            <p className="text-center font-semibold mt-3 text-[.8em] md:text-[.9em] lg:text-[1em]">
              Receive empathetic support that understands and meets your needs.
            </p>
          </div>

          <div className="bg-white flex flex-col justify-center gap-3 items-center p-6 rounded-lg">
            <GrSchedule
              className="bg-purple-500 p-2 rounded-full text-white"
              size={75}
            />
            <h3 className="text-[.9em] md:text-[1.1em] lg:text-[1.3em] text-center font-bold">
              Flexible Timings for Your Convenience
            </h3>
            <p className="text-center font-semibold mt-3 text-[.8em] md:text-[.9em] lg:text-[1em]">
              Enjoy adjustable schedules that fit your lifestyle and
              commitments.
            </p>
          </div>
          <div className="bg-white flex flex-col justify-center gap-3 items-center p-6 rounded-lg">
            <FaMedal
              className="bg-green-500 p-2 rounded-full text-white"
              size={75}
            />
            <h3 className="text-[.9em] md:text-[1.1em] lg:text-[1.3em] text-center font-bold">
              Productive and Enriching Experience
            </h3>
            <p className="text-center font-semibold mt-3 text-[.8em] md:text-[.9em] lg:text-[1em]">
              It's a journey that is both productive and enriching, fostering
              growth at every step
            </p>
          </div>
        </div>
      </div>
      <div className="mt-16 flex flex-col gap-2 items-center justify-center">
        <h2 className="font-bold text-[1.1em] md:text-[1.3em] lg:text-[1.8em] text-center">
          Explore Exciting Online Tutor Jobs
        </h2>
        <p className="font-semibold w-[95%] text-gray-900 m-auto text-center text-[.7em] sm:text-[.9em] lg:text-[1.1em] mt-4">
          The world is going digital, and so is education. With online tutoring
          jobs, educators no longer need to rely on traditional teaching
          methods. Learnosphere provides a smart, hassle-free platform where you
          can teach students across India without leaving your home.
        </p>
        <p className="font-semibold w-[95%] text-gray-900 m-auto text-center text-[.7em] sm:text-[.9em] lg:text-[1.1em] mt-2">
          Whether you're a seasoned tutor or a fresh educator, Learnosphere
          gives you a stable earning option with complete flexibility. Join
          today and start teaching, start earning!
        </p>
      </div>
      <div className="w-[92%] mb-8 flex flex-col md:flex-row gap-2 m-auto mt-10">
        <div className="w-full md:w-[70%] border border-gray-300 p-6 rounded-2xl shadow-2xl">
          <h2 className="text-black text-[.9em] lg:text-[1.3em] text-center font-bold ">
            Unlock Your Potential with Teaching Opportunities
          </h2>
          <ol className="list-disc px-12 flex flex-col gap-4 mt-2 text-[1.1em]">
            <li className="font-semibold text-black text-[.7em]  lg:text-[1em] ">
              <span className="text-orange-600">Flexible Schedules – </span> Set
              your own hours and work at your convenience.
            </li>
            <li className="font-semibold text-black text-[.7em]  lg:text-[1em] ">
              <span className="text-orange-600">Personalized Learning –</span>
              Tailor lessons to meet individual student needs.
            </li>
            <li className="font-semibold text-black text-[.7em]  lg:text-[1em] ">
              <span className="text-orange-600">Work from Home –</span>Enjoy the
              comfort of teaching from your home.
            </li>
            <li className="font-semibold text-black text-[.7em]  lg:text-[1em]">
              <span className="text-orange-600">Competitive Pay – </span>Earn a
              rewarding income for your expertise.
            </li>
            <li className="font-semibold text-black text-[.7em]  lg:text-[1em]">
              <span className="text-orange-600">Career Growth – </span>Enhance
              your teaching skills and expand your opportunities.
            </li>
            <li className="font-semibold text-black text-[.7em]  lg:text-[1em]">
              <span className="text-orange-600">Make an Impact –</span>Help
              students achieve their academic goals and build confidence.
            </li>
          </ol>
        </div>
        <div className="w-full md:w-[30%] border p-6 flex flex-col shadow-2xl mt-6 md:mt-0     border-gray-300 rounded-2xl ">
          <h2 className="flex gap-2 text-[.9em] lg:text-[1.3em] font-bold">
            Create Your Free Job Account
          </h2>
          <ol className="flex flex-col gap-3 px-2 lg:px-10 mt-3 list-disc  ">
            <li className="font-semibold text-[.6em] lg:text-[.8em] text-gray-800 ">
              Quick and simple registration.
            </li>
            <li className="font-semibold text-[.6em] lg:text-[.8em] text-gray-800">
              Explore a wide range of roles.
            </li>
            <li className="font-semibold text-[.6em] lg:text-[.8em] text-gray-800">
              Begin your teaching journey now.
            </li>
            <li className="font-semibold text-[.6em] lg:text-[.8em] text-gray-800">
              Choose jobs that fit your schedule.
            </li>
            <li className="font-semibold text-[.6em] lg:text-[.8em] text-gray-800">
              Receive alerts for new job openings.
            </li>
          </ol>
          <Link
            href="/Tutor-Instructions"
            className="w-40   text-center bg-green-500 text-white mt-6 p-2 rounded-lg font-bold text-[.7em] md:text-[.9em]"
          >
            Join Now
          </Link>
        </div>
      </div>

      <div className=" flex flex-col sm:flex-row  mx-6 rounded-xl  p-3 md:p-8 bg-gradient-to-r from-blue-200 to-purple-300 mt-6 ">
        <div className="p-3 w-full sm:w-[60%] 2xl:w-[]">
          <h2 className="font-bold text-[1em] lg:text-[1.4em]">
            Why Should Tutors Join Learn
            <span className="font-bold text-orange-600">O</span>sphere?
          </h2>
          <ol className="flex flex-col gap-3 mt-6 list-decimal px-2 md:px-12">
            <li className="text-[.7em] lg:text-[1em] text-gray-800 ">
              Connect with a large pool of students actively looking for quality
              tutors.
            </li>
            <li className="text-[.7em] lg:text-[1em] text-gray-800 ">
              Choose your own schedule, subjects, and teaching mode
              (online/offline).
            </li>
            <li className="text-[.7em] lg:text-[1em]  text-gray-800 ">
              Get recognized as an expert in your field and expand your tutoring
              career.
            </li>
            <li className="text-[.7em] lg:text-[1em]  text-gray-800 ">
              Manage classes, track student progress, and communicate
              effortlessly through our platform.
            </li>
            <li className="text-[.7em] lg:text-[1em]  text-gray-800 ">
              {" "}
              Receive payments on time with a transparent and secure system.
            </li>
            <li className="text-[.7em] lg:text-[1em]  text-gray-800 ">
              Join a network of educators, share insights, and get support to
              enhance your teaching experience.
            </li>
            <li className="text-[.7em] lg:text-[1em]  text-gray-800 ">
              Access tools to track student performance, manage schedules, and
              optimize your teaching approach.
            </li>
            <li className="text-[.7em] lg:text-[1em]  text-gray-800 ">
              {" "}
              Gain access to resources, workshops, and training to enhance your
              teaching skills.
            </li>
          </ol>
        </div>
        <div className="w-full relative sm:w-[40%]  2xl:w-[25%] mt-4 md:mt-0 p-4 rounded-xl">
          {/* Background Image */}
          <Image
            className="absolute top-0 left-0 rounded-xl object-cover h-full w-full opacity-50"
            src={Education}
            alt=""
          />

          {/* Content Wrapper */}
          <div className="relative z-10  p-4 rounded-xl">
            <h3 className="font-bold text-[1.2em] text-orange-600 text-center mt-4">
              Teacher Query Form
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4">
              <span className="relative">
                <label
                  htmlFor="name"
                  className={`absolute left-2 transition-all ${
                    isFocused || name
                      ? "top-0 text-xs text-blue-600"
                      : "top-1/2 transform -translate-y-1/2 text-gray-500"
                  }`}
                >
                  Name
                </label>
                <input
                  name="name"
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(name !== "")}
                  className="w-full border-b border-gray-800 p-2 pt-5 bg-transparent focus:outline-none focus:border-blue-600 text-[.9em]"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mb-4">{errors.name}</p>
                )}
              </span>

              <span className="relative">
                <label
                  htmlFor="email"
                  className={`absolute left-2 transition-all ${
                    isEmailFocused || email
                      ? "top-0 text-xs text-blue-600"
                      : "top-1/2 transform -translate-y-1/2 text-gray-500"
                  }`}
                >
                  Email
                </label>
                <input
                  name="email"
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => setIsEmailFocused(email !== "")}
                  className="w-full border-b border-gray-800 p-2 pt-5 bg-transparent focus:outline-none focus:border-blue-600 text-[.9em]"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mb-4">{errors.email}</p>
                )}
              </span>

              <span className="relative">
                <label
                  htmlFor="contact"
                  className={`absolute left-2 transition-all ${
                    isContactFocused || contact
                      ? "top-0 text-xs text-blue-600"
                      : "top-1/4 transform -translate-y-1/2 text-gray-500"
                  }`}
                >
                  Mobile Number
                </label>
                <div className="flex  mt-1  p-1   w-full rounded-md  text-[.9em] ">
                  <div className="flex flex-col mt-4">
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
                    name="contact"
                    id="contact"
                    type="text"
                    value={contact}
                    onChange={handleContact}
                    onFocus={() => setIsContactFocused(true)}
                    onBlur={() => setIsContactFocused(contact !== "")}
                    className="w-full border-b border-gray-800 p-2 pt-5 bg-transparent focus:outline-none focus:border-blue-600 text-[.9em]"
                  />
                </div>
              </span>
              {errors.contact && (
                <p className="text-red-500 text-sm mb-4">{errors.contact}</p>
              )}

              <span className="relative">
                <label
                  htmlFor="message"
                  className={`absolute left-2 transition-all ${
                    isMessageFocused || message
                      ? "top-0 text-xs text-blue-600"
                      : " top-1/3 transform -translate-y-1/2 text-gray-500"
                  }`}
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onFocus={() => setIsMessageFocused(true)}
                  onBlur={() => setIsMessageFocused(message !== "")}
                  className="w-full border-b border-gray-800 p-2 pt-5 bg-transparent focus:outline-none focus:border-blue-600 text-[.9em] h-24 resize-none"
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mb-4">{errors.message}</p>
                )}
              </span>

              <div>
                <button
                  type="submit"
                  className="bg-orange-600 p-2 text-white font-bold mt-2 rounded-lg w-full"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer1 />
      <Footer />
    </div>
  );
};

export default TutorJobs;
