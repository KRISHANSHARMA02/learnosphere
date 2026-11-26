"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { trackEvent } from "@/src/lib/eventTracker";
import tutor from "@/public/teacher-collection-concept_52683-37592.jpg";
import Navbar from "@/components/Navbar";
import { SlLocationPin } from "react-icons/sl";
import { FaSackDollar } from "react-icons/fa6";
import { PiUsersThree } from "react-icons/pi";
import { TbDeviceMobileMessage } from "react-icons/tb";
import Link from "next/link";
import { MdContentPasteSearch, MdOutlineArrowRightAlt } from "react-icons/md";
import { FaChalkboardTeacher, FaSwatchbook } from "react-icons/fa";
import { VscSymbolConstant } from "react-icons/vsc";
import { GiGrowth } from "react-icons/gi";
import Footer1 from "@/components/Footer1";
import Footer from "@/components/Footer";
import axios from "axios";
import Swal from "sweetalert2";
import Education from "@/public/education.jpg";

const opportunities = [
  {
    title: "Online Teaching",
    description:
      "Share your knowledge with students through online teaching. Choose the subjects, skills and educational levels that match your expertise.",
    icon: FaChalkboardTeacher,
    iconBg: "bg-orange-100 text-orange-600",
    span: "md:col-span-1 lg:col-span-2",
  },
  {
    title: "Home Tutoring",
    description:
      "Offer face-to-face teaching and connect with students who need individual learning support at home.",
    icon: SlLocationPin,
    iconBg: "bg-emerald-100 text-emerald-600",
    span: "md:col-span-1 lg:col-span-2",
  },
  {
    title: "Part-Time Tutoring",
    description:
      "If you have other commitments or prefer teaching for limited hours, you can select part-time tutoring as one of your teaching preferences.",
    icon: VscSymbolConstant,
    iconBg: "bg-blue-100 text-blue-600",
    span: "md:col-span-1 lg:col-span-2",
  },
  {
    title: "Share Educational Content",
    description:
      "Share useful educational videos and learning materials to make your knowledge accessible to students.",
    icon: MdContentPasteSearch,
    iconBg: "bg-purple-100 text-purple-600",
    span: "md:col-span-1 lg:col-span-3",
  },
  {
    title: "Refer and Earn",
    description:
      "Explore the Refer & Earn option to invite others to Learnosphere and participate in its referral programme, subject to the programme's applicable terms.",
    icon: FaSackDollar,
    iconBg: "bg-amber-100 text-amber-600",
    span: "md:col-span-2 lg:col-span-3",
  },
];

const registrationSteps = [
  {
    step: "1",
    title: "Step 1: Download the Learnosphere App",
    icon: TbDeviceMobileMessage,
    badgeClass: "bg-orange-100 text-orange-700",
    iconClass: "bg-orange-600 text-white",
    content: (
      <>
        Download the{" "}
        <a
          href="https://educator.learnosphere.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-orange-600 underline decoration-orange-300 underline-offset-4 transition hover:text-orange-700"
        >
          Learnosphere app
        </a>{" "}
        on your device to begin your teacher registration.
      </>
    ),
  },
  {
    step: "2",
    title: "Step 2: Create Your Account",
    icon: PiUsersThree,
    badgeClass: "bg-purple-100 text-purple-700",
    iconClass: "bg-purple-600 text-white",
    content:
      "Register by providing your basic personal details and the required professional information.",
  },
  {
    step: "3",
    title: "Step 3: Complete Your Educator Profile",
    icon: FaSwatchbook,
    badgeClass: "bg-blue-100 text-blue-700",
    iconClass: "bg-blue-600 text-white",
    content:
      "Add your educational background, expertise, subjects, skills and other relevant teaching information so students can understand what you offer.",
  },
  {
    step: "4",
    title: "Step 4: Choose Your Preferred Teaching Options",
    icon: GiGrowth,
    badgeClass: "bg-amber-100 text-amber-800",
    iconClass: "bg-amber-500 text-white",
    content:
      "Select the teaching categories and modes that match your interests and preferences, such as online teaching, offline tutoring or part-time teaching.",
  },
  {
    step: "5",
    title: "Step 5: Set Your Base Rate and Complete Registration",
    icon: FaSackDollar,
    badgeClass: "bg-emerald-100 text-emerald-800",
    iconClass: "bg-emerald-600 text-white",
    content:
      "Choose your preferred hourly or monthly base rate, review your profile details and complete the registration process.",
  },
];

const faqs = [
  {
    question: "How can I join Learnosphere as a teacher?",
    answer:
      "Download the Learnosphere app, register your account, complete your educator profile, select your preferred teaching options and set your base rate.",
  },
  {
    question: "What teaching options can I choose on Learnosphere?",
    answer:
      "You can select the teaching modes available in the app, including online, offline and part-time teaching.",
  },
  {
    question: "Can I teach subjects and skills according to my expertise?",
    answer:
      "Yes. Your teaching profile allows you to specify your educational levels, subjects, skills, teaching languages and target audience.",
  },
  {
    question: "Can I join Learnosphere if I do not want to teach full-time?",
    answer:
      "Yes. You can select part-time teaching as a preference if it suits your availability.",
  },
  {
    question: "How do I decide my teaching fees?",
    answer:
      "You can set your own base rate using the available hourly or monthly rate options.",
  },
  {
    question: "What happens after I complete my educator registration?",
    answer:
      "After successfully completing your profile, you can receive notifications about students who are interested in your teaching services.",
  },
];

const JoinAsTeacher = () => {
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

  const handleContact = (e) => {
    const { value } = e.target;
    if (/^\d{0,10}$/.test(value)) {
      setContact(value);
    }
  };

  // Click outside event
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
        trackEvent("JOIN_AS_TEACHER_FORM_SUBMITTED", {
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
    <div className="min-h-screen overflow-x-clip bg-slate-50 font-poppins text-slate-900">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="border-b border-orange-100 bg-gradient-to-b from-orange-50 via-amber-50/40 to-white">
          <div className="mx-auto max-w-7xl px-4 pb-12 pt-24 sm:px-6 sm:pb-16 sm:pt-32 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="text-center lg:col-span-7 lg:text-left">
                <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-orange-700 shadow-sm sm:text-sm">
                  <span className="h-2 w-2 rounded-full bg-orange-500" />
                  Educators & Tutors
                </span>

                <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                  Join Learn<span className="text-orange-600">O</span>sphere as
                  an Educator
                </h1>

                <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg sm:leading-8">
                  Learnosphere provides educators with a platform to share their
                  knowledge, offer teaching services and connect with students.
                  Whether you prefer online teaching, home tutoring, part-time
                  tutoring or sharing educational content, you can create your
                  educator profile and choose the options that suit your
                  interests and availability.
                </p>

                <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
                  <a
                    href="https://educator.learnosphere.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-600 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-orange-600/20 transition hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 sm:w-auto sm:text-base"
                  >
                    <span>Download the Learnosphere App</span>
                    <MdOutlineArrowRightAlt size={22} />
                  </a>
                  <a
                    href="#how-to-join"
                    className="inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-orange-300 hover:bg-orange-50/70 hover:text-orange-700 sm:w-auto sm:text-base"
                  >
                    See 5 Simple Steps
                  </a>
                </div>
              </div>

              <div className="mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
                <div className="overflow-hidden rounded-3xl border border-orange-100 bg-white p-3 shadow-lg">
                  <Image
                    className="h-auto w-full rounded-2xl object-cover"
                    src={tutor}
                    alt="Join Learnosphere as an Educator"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Opportunities Section */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-orange-700">
              Ways to Participate
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Explore Teaching and Earning Opportunities on Learn
              <span className="text-orange-600">O</span>sphere
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
              As an educator, you can explore different ways to participate on
              Learnosphere.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-6">
            {opportunities.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className={`flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md ${item.span}`}
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.iconBg}`}
                  >
                    <Icon size={24} />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-slate-900 sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        {/* 5-Step Registration Timeline */}
        <section
          id="how-to-join"
          className="scroll-mt-24 border-y border-slate-200 bg-white py-12 sm:py-16"
        >
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
              <span className="inline-block rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-orange-700">
                Simple 5-Step Process
              </span>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                How to Join Learn<span className="text-orange-600">O</span>
                sphere as a Teacher
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                Getting started is simple. Follow these five steps to create
                your educator profile.
              </p>
            </div>

            <div className="relative space-y-6 md:before:absolute md:before:bottom-8 md:before:left-7 md:before:top-8 md:before:w-0.5 md:before:bg-gradient-to-b md:before:from-orange-300 md:before:via-blue-300 md:before:to-emerald-300">
              {registrationSteps.map((item) => {
                const StepIcon = item.icon;
                return (
                  <article
                    key={item.step}
                    className="relative flex flex-col gap-4 md:flex-row md:gap-6"
                  >
                    <div
                      className={`hidden md:flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-4 border-white shadow-md z-10 ${item.iconClass}`}
                    >
                      <StepIcon size={24} />
                    </div>

                    <div className="flex-1 rounded-2xl border border-slate-200 bg-slate-50/50 p-5 shadow-sm transition hover:border-orange-200 hover:bg-white hover:shadow-md sm:p-6">
                      <div className="mb-2.5 flex items-center justify-between gap-3">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${item.badgeClass}`}
                        >
                          Step {item.step} of 5
                        </span>
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-xl md:hidden ${item.iconClass}`}
                        >
                          <StepIcon size={18} />
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 sm:text-xl">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">
                        {item.content}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 text-center sm:p-6">
              <p className="text-sm font-medium leading-7 text-emerald-950 sm:text-base">
                Once your profile is successfully completed, you can receive
                notifications about students interested in your teaching
                services.
              </p>
            </div>
          </div>
        </section>

        {/* Choose How You Want to Teach + Untouched Contact Form */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center rounded-2xl p-4 md:p-8 bg-gradient-to-r from-blue-200 to-purple-300 shadow-sm">
            <div className="p-3 w-full sm:w-[60%] 2xl:w-[75%]">
              <h2 className="font-bold text-xl sm:text-2xl lg:text-3xl text-slate-900">
                Choose How You Want to Teach with Learn
                <span className="font-bold text-orange-600">O</span>sphere
              </h2>

              <p className="mt-4 text-sm sm:text-base leading-7 text-gray-800">
                Your teaching profile helps you present your expertise and
                preferred ways of working to potential students. Select the
                options that accurately represent your skills, availability and
                teaching preferences.
              </p>

              <p className="mt-3 text-sm sm:text-base leading-7 text-gray-800">
                To understand the specific process for choosing part-time
                tutoring and completing your teaching profile, visit our{" "}
                <strong className="font-semibold text-slate-900">
                  part-time tutoring registration guide
                </strong>
                .
              </p>

              <p className="mt-3 text-sm sm:text-base leading-7 text-gray-800">
                If you want to explore tutoring opportunities in more detail,
                visit our{" "}
                <a
                  href="https://learnosphere.in/become-a-tutor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-orange-700 underline underline-offset-4 hover:text-orange-800"
                >
                  Become a Tutor page
                </a>
                .
              </p>

              <p className="mt-3 text-sm sm:text-base leading-7 text-gray-800">
                Discover more about our learning and teaching platform at{" "}
                <a
                  href="https://learnosphere.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-orange-700 underline underline-offset-4 hover:text-orange-800"
                >
                  Learnosphere
                </a>
                .
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="https://learnosphere.in/become-a-tutor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  <span>Become a Tutor</span>
                  <MdOutlineArrowRightAlt size={20} />
                </a>
                <a
                  href="https://learnosphere.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-white/90 px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-white"
                >
                  <span>Visit Learnosphere</span>
                </a>
              </div>
            </div>

            <div className="w-full relative sm:w-[40%]  2xl:w-[25%] mt-4 md:mt-0 p-4 rounded-xl">
              {/* Background Image */}
              <Image
                className="absolute top-0 left-0 rounded-xl object-cover h-full w-full opacity-50"
                src={Education}
                alt="Form Background"
              />
              {/* Content Wrapper */}
              <div className="relative z-10  p-4 rounded-xl">
                <h3 className="font-bold text-[1.2em] text-orange-600 text-center mt-4">
                  Teacher Query Form
                </h3>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-2 mt-4"
                >
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
                      <p className="text-red-500 text-sm mb-4">
                        {errors.email}
                      </p>
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
                    <p className="text-red-500 text-sm mb-4">
                      {errors.contact}
                    </p>
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
                      <p className="text-red-500 text-sm mb-4">
                        {errors.message}
                      </p>
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
        </section>

        {/* Frequently Asked Questions */}
        <section className="mx-auto max-w-4xl px-4 pb-16 pt-2 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <span className="inline-block rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-orange-700">
              Quick Answers
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-orange-200 open:border-orange-300"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-slate-900 sm:text-lg">
                  <span>{faq.question}</span>
                  <span
                    aria-hidden="true"
                    className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-100 text-lg font-bold text-orange-600 transition group-open:rotate-45 group-open:bg-orange-600 group-open:text-white"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 border-t border-slate-100 pt-3 text-sm leading-7 text-slate-600 sm:text-base">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <Footer1 />
      <Footer />
    </div>
  );
};

export default JoinAsTeacher;