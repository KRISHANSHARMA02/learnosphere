"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import Footer from "@/components/Footer";
import Footer1 from "@/components/Footer1";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { AiOutlineFileDone } from "react-icons/ai";
import { FaHandHoldingUsd } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
import { GiArchiveResearch, GiPathDistance } from "react-icons/gi";
import { IoRemoveOutline } from "react-icons/io5";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { SiSimplelogin } from "react-icons/si";
import { VscGitStashApply } from "react-icons/vsc";
import axios from "axios";
import { trackEvent } from "@/src/lib/eventTracker";
import Swal from "sweetalert2";
import Education from "@/public/education.jpg";
import Image from "next/image";

const PartTime = () => {
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
          `${WEB_BACKEND_URL}/api/route/getAllCountries`
        );
        setCountries(res.data);
      } catch (err) {
        console.error("Error fetching countries:", err);
      }
    };
    fetchCountries();
  }, []);
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
        trackEvent("PART_TIME_TUTOR_JOB_FORM_SUBMITTED", {
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
    <div>
      <Navbar />
      <div className=" flex flex-col gap-2 justify-center items-center bg-gradient-to-r  mt-20 from-red-200 h-[40vh] md:h-[55vh] w-[95vw] m-auto rounded-br-2xl rounded-bl-2xl to-yellow-200">
        <h1 className="font-bold text-[1em] sm:text-[1.3em] lg:text-[1.8em] text-center">
          Teach part-time, educate in hours! –{" "}
          <span className="text-orange-600">Earn While You Grow</span>
        </h1>
        <p className="mt-2 lg:mt-4 text-gray-900 font-semibold text-center text-[.6em] sm:text-[.8em] lg:text-[1em] w-[95vw] sm:w-[70vw]">
          flexible and rewarding{" "}
          <a href="/Signin" className="text-orange-600 hover:underline">
            part-time tutoring job?
          </a>{" "}
          Whether you’re a teacher, student, or professional,{" "}
          <a href="/" className="text-orange-600 hover:underline">
            Learnosphere
          </a>{" "}
          offers a seamless way to earn from home by teaching online.
        </p>
        <p className="mt-2 lg:mt-4 text-gray-900 font-semibold text-center text-[.6em] sm:text-[.8em] lg:text-[1em] w-[95vw] sm:w-[70vw]">
          With a rising demand for online education, tutoring has become a great
          opportunity for those who want to share their expertise while earning
          a stable income.
        </p>
      </div>
      <div className="w-[95vw] mt-8 flex flex-col justify-center items-center  m-auto">
        <h2 className="font-bold text-[1em] sm:text-[1.2em] lg:text-[1.4em]">
          Benefits of a Flexible Part-Time Job
        </h2>
        <IoRemoveOutline size={50} className="mt-2" />
        <ol className="list-decimal mt-2 p-4 flex flex-col gap-2">
          <li className="text-[.6em] sm:text-[.7em] lg:text-[.9em] mt-2  font-semibold">
            <span className="text-orange-600">Flexible Work Hours-</span>Set
            your own schedule and work at your convenience. This allows you to
            balance studies, personal tasks, or other jobs effortlessly.
          </li>
          <li className="text-[.6em] sm:text-[.7em] lg:text-[.9em] mt-2  font-semibold">
            <span className="text-orange-600">Earn While You Learn –</span>Make
            money while continuing your education or other commitments. This
            financial support helps you stay independent and secure.
          </li>
          <li className="text-[.6em] sm:text-[.7em] lg:text-[.9em] mt-2  font-semibold">
            <span className="text-orange-600">Skill Development –</span>Improve
            communication, time management, and problem-solving skills. These
            abilities enhance both your personal and professional growth.
          </li>
          <li className="text-[.6em] sm:text-[.7em] lg:text-[.9em] mt-2  font-semibold">
            <span className="text-orange-600">Work-Life Balance –</span>Easily
            manage your job without affecting other responsibilities. Enjoy a
            stress-free work routine that fits your lifestyle.
          </li>
          <li className="text-[.6em] sm:text-[.7em] lg:text-[.9em] mt-2  font-semibold">
            <span className="text-orange-600">Career Growth –</span> Gain
            hands-on experience that strengthens your resume. This exposure
            opens doors to better job opportunities in the future.
          </li>
          <li className="text-[.6em] sm:text-[.7em] lg:text-[.9em] mt-2  font-semibold">
            <span className="text-orange-600">No Fixed Location –</span>Work
            from home or any place that suits you. This eliminates travel time
            and makes your job more convenient.
          </li>
          <li className="text-[.6em] sm:text-[.7em] lg:text-[.9em] mt-2  font-semibold">
            <span className="text-orange-600">Build Your Network –</span>Connect
            with students, parents, and professionals in the education industry.
            These connections can lead to more career opportunities and personal
            growth.
          </li>
        </ol>
      </div>
      <div className="w-[95vw] m-auto  flex flex-col justify-center items-center mt-4">
        <h2 className="font-bold text-black text-[1.4em]">
          How to Join and Start Your Journey
        </h2>
        <IoRemoveOutline size={50} className="mt-2" />
        <div className="grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 mt-8 gap-4 rounded-2xl bg-gradient-to-r from-red-100 to-yellow-200 w-[95%] p-6 m-auto">
          <div className="bg-white flex flex-col justify-center gap-3 items-center p-8 rounded-lg">
            <SiSimplelogin
              className="bg-orange-600 p-2 rounded-2xl text-white"
              size={75}
            />
            <h3 className="text-[.9em] md:text-[1.1em] lg:text-[1.3em] text-center font-bold">
              Sign Up on Our Platform
            </h3>
            <p className="text-center text-[.8em] md:text-[.9em] lg:text-[1em] font-semibold mt-3">
              Visit our website and create an account by providing basic details
              like your name, contact information, and teaching preferences.
            </p>
          </div>
          <div className="bg-white flex flex-col justify-center gap-3 items-center p-8 rounded-lg">
            <AiOutlineFileDone
              className="bg-purple-600 p-2 rounded-2xl text-white"
              size={75}
            />
            <h3 className="text-[.9em] md:text-[1.1em] lg:text-[1.3em] text-center font-bold">
              Complete Your Profile
            </h3>
            <p className="text-center text-[.8em] md:text-[.9em] lg:text-[1em] font-semibold mt-3">
              Add your qualifications, skills, and experience. Highlight your
              expertise and preferred subjects to match with the right students.
            </p>
          </div>
          <div className="bg-white flex flex-col justify-center gap-3 items-center p-8 rounded-lg">
            <GiPathDistance
              className="bg-yellow-500 p-2 rounded-2xl text-white"
              size={75}
            />
            <h3 className="text-[.9em] md:text-[1.1em] lg:text-[1.3em] text-center font-bold">
              Browse Available Opportunities
            </h3>
            <p className="text-center text-[.8em] md:text-[.9em] lg:text-[1em] font-semibold mt-3">
              Explore a variety of teaching jobs, including online tutoring or
              home tutoring roles, based on your preferences.
            </p>
          </div>
          <div className="bg-white flex flex-col justify-center gap-3 items-center p-8 rounded-lg">
            <VscGitStashApply
              className="bg-blue-600 p-2 rounded-2xl text-white"
              size={75}
            />
            <h3 className="text-[.9em] md:text-[1.1em] lg:text-[1.3em] text-center font-bold">
              Apply for Jobs
            </h3>
            <p className="text-center text-[.8em] md:text-[.9em] lg:text-[1em] font-semibold mt-3">
              Select the jobs that fit your skills and schedule, then submit
              your application for review.
            </p>
          </div>
          <div className="bg-white flex flex-col justify-center gap-3 items-center p-8 rounded-lg">
            <RiVerifiedBadgeFill
              className="bg-rose-600 p-2 rounded-2xl text-white"
              size={75}
            />
            <h3 className="text-[.9em] md:text-[1.1em] lg:text-[1.3em] text-center font-bold">
              Get Verified and Start Teaching
            </h3>
            <p className="text-center text-[.8em] md:text-[.9em] lg:text-[1em] font-semibold mt-3">
              Once your application is accepted, complete any necessary
              verification, and start teaching your first students!
            </p>
          </div>
          <div className="bg-white flex flex-col justify-center gap-3 items-center p-8 rounded-lg">
            <FaHandHoldingUsd
              className="bg-green-600 p-2 rounded-2xl text-white"
              size={75}
            />
            <h3 className="text-[.9em] md:text-[1.1em] lg:text-[1.3em] text-center font-bold">
              Earn and Grow
            </h3>
            <p className="text-center text-[.8em] md:text-[.9em] lg:text-[1em] font-semibold mt-3">
              Once you begin tutoring, earn money and develop your teaching
              skills while enjoying the flexibility of your job.
            </p>
          </div>
        </div>
        <Link href="/Signin">
          <button className="bg-green-500 animate-bounce p-3 w-40 text-white font-bold rounded-xl mt-4">
            Join us
          </button>
        </Link>
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
                      className=" mt-5 py-1  ml-1text-[.9em] w-[60px] rounded-md pl-2 focus:outline-none "
                      inputMode="numeric"
                      pattern="[\d+-]*"
                    />

                    <datalist id="countryCodes">
                      {countries.map((c) => (
                        <option key={c._id} value={`+${c.countryCode}`}>
                          {c.countryName} ({c.iso2})
                        </option>
                      ))}
                    </datalist>

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
                  {errors.contact && (
                    <p className="text-red-500 text-sm mb-4">
                      {errors.contact}
                    </p>
                  )}
                </div>
              </span>

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

export default PartTime;
