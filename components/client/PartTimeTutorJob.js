"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import Footer from "@/components/Footer";
import Footer1 from "@/components/Footer1";
import Navbar from "@/components/Navbar";
import React, { useState, useEffect } from "react";
import { AiOutlineFileDone } from "react-icons/ai";
import { FaHandHoldingUsd } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
import { GiPathDistance } from "react-icons/gi";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { SiSimplelogin } from "react-icons/si";
import { VscGitStashApply } from "react-icons/vsc";
import axios from "axios";
import { trackEvent } from "@/src/lib/eventTracker";
import Swal from "sweetalert2";
import Education from "@/public/education.jpg";
import Image from "next/image";

const quickJourney = [
  { step: "1", label: "Download App", href: "#step-1" },
  { step: "2", label: "Register Account", href: "#step-2" },
  { step: "3", label: "Teaching Profile", href: "#step-3" },
  { step: "4", label: "Teaching Modes", href: "#step-4" },
  { step: "5", label: "Set Base Rate", href: "#step-5" },
];

const teachingCategories = [
  {
    title: "Academics",
    description: "School-level academic subjects and education.",
  },
  {
    title: "Colleges",
    description: "College-level subjects and education.",
  },
  {
    title: "Competitive",
    description: "Competitive exam preparation.",
  },
  {
    title: "Non-Academics",
    description:
      "Skills and learning activities outside regular academic subjects.",
  },
];

const teachingProfileFields = [
  {
    title: "Educational Level",
    description:
      "Select the classes or educational levels you can teach, such as Class 1, Class 2, Class 3 and other available levels.",
  },
  {
    title: "Subjects and Skills",
    description: "Add the subjects or skills you specialise in.",
  },
  {
    title: "Teaching Language",
    description:
      "Select the language or languages in which you can teach.",
  },
  {
    title: "Target Audience",
    description: "Specify the type of learners you want to teach.",
  },
];

const teachingModes = [
  {
    title: "Online",
    description: "Teach students through online classes.",
    badge: "Remote",
  },
  {
    title: "Offline",
    description: "Provide face-to-face teaching.",
    badge: "In-Person",
  },
  {
    title: "Part-Time",
    description: "Indicate your preference for part-time teaching.",
    badge: "Flexible",
  },
];

const faqs = [
  {
    question: "How can I register as a part-time tutor on Learnosphere?",
    answer:
      "Download the Learnosphere app, register your account, complete your teaching profile, select your teaching modes and set your base rate.",
  },
  {
    question: "Can I choose the subjects and classes I want to teach?",
    answer:
      "Yes. In the Teaching Profile Format section, you can select your teaching categories, educational levels, subjects and skills according to your expertise.",
  },
  {
    question: "Can I choose online or offline teaching?",
    answer:
      "You can select your preferred teaching modes from the available options in the Teaching Modes section of your profile.",
  },
  {
    question: "Who decides the tutoring fees on Learnosphere?",
    answer:
      "Teachers set their own base rates. Depending on the available options, they can choose an hourly or monthly rate.",
  },
  {
    question: "What happens after I complete my registration?",
    answer:
      "After completing your teacher profile, you can receive notifications about students interested in your teaching services and looking to hire a tutor.",
  },
  {
    question: "Does creating a teacher profile guarantee tutoring assignments?",
    answer:
      "Creating a profile allows you to present your teaching services to potential students. However, receiving student interest or tutoring assignments is not guaranteed.",
  },
];

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
    <div className="min-h-screen overflow-x-clip bg-slate-50 text-slate-900">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative border-b border-orange-100 bg-gradient-to-b from-orange-50 via-amber-50/40 to-white">
          <div className="mx-auto max-w-7xl px-4 pb-12 pt-24 sm:px-6 sm:pb-16 sm:pt-32 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-orange-700 shadow-sm sm:text-sm">
                <span className="h-2 w-2 rounded-full bg-orange-500" />
                Part-Time Tutoring Guide
              </span>

              <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Join Learnosphere as a{" "}
                <span className="text-orange-600">Part-Time Tutor</span>
              </h1>

              <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg sm:leading-8">
                Looking for part-time tutoring opportunities? Learnosphere allows
                teachers and tutors to create their teaching profiles, select
                the subjects and educational levels they can teach, choose their
                preferred teaching modes, and set their own base rates.
              </p>

              <p className="mx-auto mt-3 max-w-2xl text-sm font-medium leading-7 text-slate-700 sm:text-base">
                To get started, download the Learnosphere app and complete your
                teacher registration by following these simple steps.
              </p>

              {/* Primary Actions */}
              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <a
                  href="https://educator.learnosphere.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-orange-600 px-7 py-3.5 text-sm font-bold text-white shadow-md shadow-orange-600/20 transition hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 sm:w-auto sm:text-base"
                >
                  Download the Learnosphere App
                </a>
                <a
                  href="#how-to-register"
                  className="inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-orange-300 hover:bg-orange-50/70 hover:text-orange-700 sm:w-auto sm:text-base"
                >
                  Read the 5 Simple Steps
                </a>
              </div>

              {/* Quick 5-Step Overview Bar (Helps tutors understand the flow in 5 seconds) */}
              <div className="mt-10 rounded-2xl border border-orange-100 bg-white p-4 shadow-sm sm:p-5">
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Your 5-Step Journey at a Glance
                </p>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
                  {quickJourney.map((item) => (
                    <a
                      key={item.step}
                      href={item.href}
                      className="group flex items-center gap-2.5 rounded-xl border border-slate-200/80 bg-slate-50/70 px-3 py-2.5 text-left transition hover:border-orange-300 hover:bg-orange-50/70"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-600 text-xs font-bold text-white transition group-hover:scale-105">
                        {item.step}
                      </span>
                      <span className="text-xs font-semibold text-slate-800 group-hover:text-orange-700 sm:text-sm">
                        {item.label}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Guided Vertical Step-by-Step Timeline */}
        <section
          id="how-to-register"
          className="scroll-mt-24 mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
        >
          <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
            <span className="inline-block rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-orange-700">
              Simple Step-by-Step Guide
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              How to Register as a Part-Time Tutor on Learnosphere
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
              Follow these five steps to create your teacher profile on
              Learnosphere.
            </p>
          </div>

          {/* Vertical Timeline Container */}
          <div className="relative space-y-6 sm:space-y-8 md:before:absolute md:before:bottom-8 md:before:left-7 md:before:top-8 md:before:w-0.5 md:before:bg-gradient-to-b md:before:from-orange-300 md:before:via-blue-300 md:before:to-emerald-300">
            {/* Step 1 */}
            <article
              id="step-1"
              className="scroll-mt-28 relative flex flex-col gap-4 md:flex-row md:gap-6"
            >
              <div className="hidden md:flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-4 border-slate-50 bg-orange-600 text-white shadow-md z-10">
                <VscGitStashApply size={26} />
              </div>

              <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-orange-200 hover:shadow-md sm:p-7">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-orange-700">
                    Step 1 of 5
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-600 text-white md:hidden">
                    <VscGitStashApply size={22} />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">
                  Step 1: Download the Learnosphere App
                </h3>
                <p className="mt-2.5 text-sm leading-7 text-slate-600 sm:text-base">
                  Start by downloading the{" "}
                  <a
                    href="https://educator.learnosphere.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-orange-600 underline decoration-orange-300 underline-offset-4 transition hover:text-orange-700"
                  >
                    Learnosphere app
                  </a>{" "}
                  on your device. You will use the app to register as a teacher
                  and create your teaching profile.
                </p>

                <div className="mt-4">
                  <a
                    href="https://educator.learnosphere.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-orange-50 px-4 py-2.5 text-sm font-semibold text-orange-700 transition hover:bg-orange-100"
                  >
                    Open Teacher App →
                  </a>
                </div>
              </div>
            </article>

            {/* Step 2 */}
            <article
              id="step-2"
              className="scroll-mt-28 relative flex flex-col gap-4 md:flex-row md:gap-6"
            >
              <div className="hidden md:flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-4 border-slate-50 bg-purple-600 text-white shadow-md z-10">
                <SiSimplelogin size={24} />
              </div>

              <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-purple-200 hover:shadow-md sm:p-7">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-purple-700">
                    Step 2 of 5
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600 text-white md:hidden">
                    <SiSimplelogin size={20} />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">
                  Step 2: Register Your Account
                </h3>
                <p className="mt-2.5 text-sm leading-7 text-slate-600 sm:text-base">
                  Open the app and complete the teacher registration process by
                  providing your basic details, such as:
                </p>

                <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {[
                    "Name",
                    "Age and date of birth",
                    "Country",
                    "Other required personal details",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 rounded-xl border border-slate-200/80 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-slate-700"
                    >
                      <FaRegCircleCheck className="shrink-0 text-purple-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-4 rounded-xl border border-purple-100 bg-purple-50/50 px-4 py-3 text-sm leading-6 text-slate-700">
                  You can also add your professional information, expertise
                  level and social profile links.{" "}
                  <strong className="font-semibold text-purple-800">
                    Adding social profile links is optional.
                  </strong>
                </p>
              </div>
            </article>

            {/* Step 3 */}
            <article
              id="step-3"
              className="scroll-mt-28 relative flex flex-col gap-4 md:flex-row md:gap-6"
            >
              <div className="hidden md:flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-4 border-slate-50 bg-blue-600 text-white shadow-md z-10">
                <AiOutlineFileDone size={26} />
              </div>

              <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md sm:p-7">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-700">
                    Step 3 of 5
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white md:hidden">
                    <AiOutlineFileDone size={22} />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">
                  Step 3: Complete Your Teaching Profile
                </h3>
                <p className="mt-2.5 text-sm leading-7 text-slate-600 sm:text-base">
                  After registration, go to the{" "}
                  <strong className="font-semibold text-slate-900">
                    Teaching Profile Format
                  </strong>{" "}
                  section and complete your teaching details.
                </p>

                {/* Sub-part A: Teaching Categories */}
                <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-orange-600 text-xs font-bold text-white">
                      A
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 sm:text-base">
                      First, select the teaching categories that match what you
                      offer:
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {teachingCategories.map((cat) => (
                      <div
                        key={cat.title}
                        className="rounded-xl border border-slate-200/90 bg-white p-3.5 shadow-sm"
                      >
                        <p className="font-bold text-orange-600">{cat.title}</p>
                        <p className="mt-1 text-sm leading-6 text-slate-600">
                          {cat.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sub-part B: Profile Fields */}
                <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-blue-600 text-xs font-bold text-white">
                      B
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 sm:text-base">
                      Next, fill in the relevant teaching profile fields:
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {teachingProfileFields.map((field) => (
                      <div
                        key={field.title}
                        className="rounded-xl border border-slate-200/90 bg-white p-3.5 shadow-sm"
                      >
                        <p className="font-bold text-blue-700">{field.title}</p>
                        <p className="mt-1 text-sm leading-6 text-slate-600">
                          {field.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="mt-4 rounded-xl border-l-4 border-blue-600 bg-blue-50/70 px-4 py-3 text-sm leading-6 text-slate-700">
                  Make sure your teaching information accurately represents your
                  expertise and the students you want to teach.
                </p>
              </div>
            </article>

            {/* Step 4 */}
            <article
              id="step-4"
              className="scroll-mt-28 relative flex flex-col gap-4 md:flex-row md:gap-6"
            >
              <div className="hidden md:flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-4 border-slate-50 bg-amber-500 text-white shadow-md z-10">
                <GiPathDistance size={26} />
              </div>

              <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-amber-200 hover:shadow-md sm:p-7">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-800">
                    Step 4 of 5
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white md:hidden">
                    <GiPathDistance size={22} />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">
                  Step 4: Select Your Teaching Modes
                </h3>
                <p className="mt-2.5 text-sm leading-7 text-slate-600 sm:text-base">
                  Choose how you prefer to provide your teaching services.
                  Depending on the available options, you can select:
                </p>

                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {teachingModes.map((mode) => (
                    <div
                      key={mode.title}
                      className="rounded-xl border border-amber-200/70 bg-amber-50/40 p-4"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-bold text-slate-900">{mode.title}</p>
                        <span className="rounded-full bg-white px-2.5 py-0.5 text-[11px] font-semibold text-amber-700 shadow-sm">
                          {mode.badge}
                        </span>
                      </div>
                      <p className="mt-1.5 text-sm leading-6 text-slate-600">
                        {mode.description}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base">
                  Select the teaching modes that match your availability and
                  preferences.
                </p>
              </div>
            </article>

            {/* Step 5 */}
            <article
              id="step-5"
              className="scroll-mt-28 relative flex flex-col gap-4 md:flex-row md:gap-6"
            >
              <div className="hidden md:flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-4 border-slate-50 bg-emerald-600 text-white shadow-md z-10">
                <FaHandHoldingUsd size={26} />
              </div>

              <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-200 hover:shadow-md sm:p-7">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-800">
                    Step 5 of 5
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white md:hidden">
                    <FaHandHoldingUsd size={22} />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">
                  Step 5: Set Your Base Rate
                </h3>

                <div className="mt-2.5 space-y-3 text-sm leading-7 text-slate-600 sm:text-base">
                  <p>The final step is to enter your Base Rate.</p>
                  <p>
                    You decide how much you charge for your teaching services.
                    You can set your rate based on your expertise, subject,
                    teaching experience and preferred charging method.
                  </p>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-emerald-200/80 bg-emerald-50/50 p-3.5">
                    <p className="text-sm font-bold text-emerald-900">
                      Flexible Charging Options
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-700">
                      Depending on the available options, you can set your base
                      rate on an hourly or monthly basis.
                    </p>
                  </div>
                  <div className="rounded-xl border border-emerald-200/80 bg-emerald-50/50 p-3.5">
                    <p className="text-sm font-bold text-emerald-900">
                      Final Review
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-700">
                      Review your details and complete your teaching profile.
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* What Happens After Completion */}
        <section className="border-y border-slate-200 bg-white py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                <RiVerifiedBadgeFill size={26} />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                What Happens After You Complete Your Teacher Profile?
              </h2>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 transition hover:border-orange-200 hover:bg-orange-50/30">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-orange-600 text-sm font-bold text-white">
                  1
                </span>
                <p className="mt-3 text-base leading-7 text-slate-700">
                  Once you have successfully completed your registration and
                  teaching profile, you can receive notifications about students
                  who are interested in learning from you and may want to hire
                  you.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 transition hover:border-orange-200 hover:bg-orange-50/30">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-orange-600 text-sm font-bold text-white">
                  2
                </span>
                <p className="mt-3 text-base leading-7 text-slate-700">
                  Your teaching categories, subjects, educational levels,
                  teaching modes and base rate help students understand the
                  teaching services you offer.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 transition hover:border-orange-200 hover:bg-orange-50/30">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-orange-600 text-sm font-bold text-white">
                  3
                </span>
                <p className="mt-3 text-base leading-7 text-slate-700">
                  Keep your profile information accurate and updated so students
                  can better understand your teaching expertise and preferences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
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

        {/* Bottom CTA + Untouched Contact Form Section */}
        <section className="mx-auto mb-10 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center rounded-2xl p-4 md:p-8 bg-gradient-to-r from-blue-200 to-purple-300 shadow-sm">
            <div className="p-3 w-full sm:w-[60%] 2xl:w-[75%]">
              <h2 className="font-bold text-xl sm:text-2xl lg:text-3xl text-slate-900">
                Start Your Part-Time Tutoring Journey with Learn
                <span className="font-bold text-orange-600">O</span>sphere
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-7 text-gray-800">
                Create your teacher profile, showcase your teaching expertise
                and connect with students looking for learning support.
              </p>
              <p className="mt-3 text-sm sm:text-base leading-7 text-gray-800">
                If you want to explore the overall tutor registration process,
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
                You can also learn more about the different opportunities and
                ways to participate as an educator through our{" "}
                <a
                  href="https://learnosphere.in/join-as-teacher"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-orange-700 underline underline-offset-4 hover:text-orange-800"
                >
                  Join as a Teacher page
                </a>
                .
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="https://learnosphere.in/become-a-tutor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Become a Tutor
                </a>
                <a
                  href="https://learnosphere.in/join-as-teacher"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-white/90 px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-white"
                >
                  Join as a Teacher
                </a>
              </div>
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
      </main>

      <Footer1 />
      <Footer />
    </div>
  );
};

export default PartTime;