"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { trackEvent } from "@/src/lib/eventTracker";
import tutor from "@/public/teacher-collection-concept_52683-37592.jpg";
import Navbar from "@/components/Navbar";
import { CiFaceSmile } from "react-icons/ci";
import { SlLocationPin } from "react-icons/sl";
import { FaIndianRupeeSign, FaSackDollar } from "react-icons/fa6";
import { PiGreaterThan, PiUsersThree } from "react-icons/pi";
import { TbDeviceMobileMessage } from "react-icons/tb";
import Link from "next/link";
import { MdContentPasteSearch, MdOutlineArrowRightAlt } from "react-icons/md";
import { FaChalkboardTeacher, FaSwatchbook } from "react-icons/fa";
import { VscSymbolConstant } from "react-icons/vsc";
import { GiGrowth } from "react-icons/gi";
import Footer1 from "@/components/Footer1";
import Footer from "@/components/Footer";
import { IoRemoveOutline } from "react-icons/io5";
import axios from "axios";
import Swal from "sweetalert2";
import Education from "@/public/education.jpg";

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
          "https://learnospherebackend.learnosphere.in/api/route/getAllCountries"
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
        "https://learnospherebackend.learnosphere.in/api/route/teachercontact",
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

  const faqs = [
    {
      question:
        "How much time does it take to become a listed tutor on LearnOsphere?",
      answer:
        "Getting listed on LearnOsphere is a quick and straightforward process. Simply complete the required assessments and provide a teaching demo for our experts. On average, the entire process takes about a week to ensure quality and suitability.",
    },
    {
      question: "What Subjects Can You Teach at LearnOsphere?",
      answer:
        "LearnOsphere allows teachers to offer a variety of subjects, including Mathematics, Science, English, Social Studies, and more. Tutors can also teach specialized courses like coding, competitive exams, and skill-based learning",
    },
    {
      question: "What is the earning potential for teachers on LearnOsphere?",
      answer:
        "On LearnOsphere, teachers can earn a minimum of ₹500 per hour and up to ₹4000 per hour depending on their expertise and subject demand. In addition to live teaching, tutors can also earn by uploading content and through the Refer & Earn program, providing multiple income opportunities.",
    },
  ];

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

  return (
    <div className="font-poppins">
     
      <Navbar />
      <div className=" flex flex-col-reverse sm:flex-row gap-20 mt-20 bg-orange-100 rounded-2xl w-[98vw] m-auto p-8">
        <div className="p-1 lg:p-5 flex flex-col gap-4">
          <h1 className="font-bold text-[1.1em] lg:text-[1.5em] mt-2 lg:mt-4 ">
            Why Be a Tutor at Learn<span className=" text-orange-600">O</span>
            sphere
          </h1>
          <p className="font-semibold text-[.8em] lg:text-[1em] mt-1 lg:mt-2">
            Join LearnOsphere as a tutor to inspire learners, share knowledge,
            and grow your teaching career.
          </p>
          <p className="font-semibold text-[.8em] lg:text-[1em] mt-1 lg:mt-2">
            Teach at LearnOsphere to impact lives, gain recognition, and enjoy
            flexible earning opportunities.
          </p>
          <Link href="/jobs-for-home-tutors">
            <button className="bg-orange-500 text-white font-bold p-3 w-60 mt-5 rounded-full">
              Join as a Tutor
            </button>
          </Link>
        </div>
        <div>
          <Image
            className=" w-full md:w-[40vw] 2xl:w-[25vw] sm:mt-16 md:mt-7 rounded-2xl object-contain"
            src={tutor}
            alt="Tutor at Learnosphere"
          />
        </div>
      </div>
      <div className="mt-8 flex flex-col w-[95vw] m-auto p-8 justify-center items-center">
        <h2 className="font-bold text-[1.2em] md:text-[1.5em] text-center ">
          Why Teach With Learn
          <span className="font-bold text-orange-600">O</span>sphere ?
        </h2>
        <IoRemoveOutline size={50} className="mt-2" />
        <p className="font-semibold text-center  text-[.9em] md:text-[1em]mt-4">
          Teaching with LearnOsphere offers a dynamic and rewarding experience
          where educators can share their expertise, connect with motivated
          learners, and grow professionally. With flexible teaching options,
          innovative tools, and a supportive community, it empowers tutors to
          make a meaningful impact while earning competitively.
        </p>
        <div className="grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 mt-8 gap-4 rounded-2xl   p-2 m-auto">
          <div className="bg-white flex flex-col border border-gray-200  gap-3  p-4 rounded-xl">
            <CiFaceSmile className=" text-orange-600 " size={30} />
            <h3 className="text-[.9em] md:text-[1.1em] lg:text-[1.3em]  font-semibold">
              Pursue Your Passion
            </h3>
            <p className="text-[.8em] md:text-[.9em] lg:text-[1em]  mt-1">
              Pursue your passion with confidence, embrace new opportunities,
              and transform your skills into a fulfilling journey of growth and
              success.
            </p>
          </div>
          <div className="bg-white flex flex-col border border-gray-200  gap-3  p-4 rounded-xl">
            <SlLocationPin className=" text-green-500 " size={30} />
            <h3 className="text-[.9em] md:text-[1.1em] lg:text-[1.3em]  font-semibold">
              Anytime Anywhere
            </h3>
            <p className="text-[.8em] md:text-[.9em] lg:text-[1em]  mt-1">
              Anytime, anywhere—learn, grow, and connect without limits,
              embracing flexibility and endless possibilities on your own terms.
            </p>
          </div>
          <div className="bg-white flex flex-col border border-gray-200  gap-3  p-4 rounded-xl">
            <FaSackDollar className=" text-yellow-500 " size={30} />
            <h3 className="text-[.9em] md:text-[1.1em] lg:text-[1.3em]  font-semibold">
              Achieve More
            </h3>
            <p className="text-[.8em] md:text-[.9em] lg:text-[1em]  mt-1">
              Achieve more by maximizing your potential, seizing new
              opportunities, and building a successful future with financial
              growth and stability
            </p>
          </div>
          <div className="bg-white flex flex-col border border-gray-200  gap-3  p-4 rounded-xl">
            <PiUsersThree className=" text-blue-600 " size={30} />
            <h3 className="text-[.9em] md:text-[1.1em] lg:text-[1.3em]  font-semibold">
              Vibrant Community
            </h3>
            <p className="text-[.8em] md:text-[.9em] lg:text-[1em]  mt-1">
              Be part of a vibrant community where like-minded individuals
              connect, collaborate, and grow together in a supportive and
              inspiring environment.
            </p>
          </div>
          <div className="bg-white flex flex-col border border-gray-200  gap-3  p-4 rounded-xl">
            <TbDeviceMobileMessage className=" text-red-600 " size={30} />
            <h3 className="text-[.9em] md:text-[1.1em] lg:text-[1.3em]  font-semibold">
              Meaningful Bonds, Inspiring Journeys
            </h3>
            <p className="text-[.8em] md:text-[.9em] lg:text-[1em]  mt-1">
              Build meaningful bonds and create inspiring journeys through
              connections that enrich your life, spark new opportunities, and
              leave lasting memories.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-10 flex flex-col justify-center items-center">
        <h2 className="font-bold text-[1.5em] text-center ">
          How to Earn at Learn
          <span className="font-bold text-orange-600">O</span>sphere ?
        </h2>
        <IoRemoveOutline size={50} className="mt-2" />

        <div className="grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 mt-6 gap-4 rounded-2xl   p-6 m-auto">
          <div className="bg-orange-200 flex flex-col border justify-between  gap-3  p-6 rounded-xl">
            <span className="flex flex-col gap-3">
              <h3 className="text-[.9em] md:text-[1.1em] lg:text-[1.2em]  font-semibold">
                Convenient Home Tutoring at Your Doopstep
              </h3>
              <p className="text-[.8em] md:text-[.9em] lg:text-[1em]  mt-1">
                Experience Convenient Home Tutoring at Your Doorstep, where
                expert teachers come to you for personalized learning. Get
                quality education in the comfort of your home with flexible
                scheduling. Make learning easier, more effective, and
                stress-free!
              </p>
            </span>
            <span>
              <Link
                className=" flex w-40 bg-orange-100  items-center text-orange-500 rounded-full p-3 hover:bg-orange-500 hover:text-white hover:scale-105 transition-all ease-in-out   justify-between"
                href="/become-a-tutor"
              >
                Explore More
                <MdOutlineArrowRightAlt size={25} />
              </Link>
            </span>
          </div>
          <div className="bg-red-200 flex flex-col border justify-between  gap-3  p-6 rounded-xl">
            <span className="flex flex-col gap-3">
              <h3 className="text-[.9em] md:text-[1.1em] lg:text-[1.2em]  font-semibold">
                By Uploading Videos and Content
              </h3>
              <p className="text-[.8em] md:text-[.9em] lg:text-[1em]  mt-1">
                By uploading videos and content, you can share your knowledge
                with a wider audience and make learning more engaging. Create
                valuable educational resources that help students understand
                concepts easily. Teach at your own pace and inspire learners
                anytime, anywhere!
              </p>
            </span>
            <span>
              <Link
                className=" flex w-40 bg-red-100  items-center text-red-500 rounded-full p-3 hover:bg-red-500 hover:text-white hover:scale-105 transition-all ease-in-out     justify-between"
                href="/jobs-for-home-tutors"
              >
                Explore More
                <MdOutlineArrowRightAlt size={25} />
              </Link>
            </span>
          </div>
          <div className="bg-yellow-300 flex flex-col border justify-between  gap-3  p-6 rounded-xl">
            <span className="flex flex-col gap-3">
              <h3 className="text-[.9em] md:text-[1.1em] lg:text-[1.2em]  font-semibold">
                Refer & Earn
              </h3>
              <p className="text-[.8em] md:text-[.9em] lg:text-[1em]  mt-1">
                Refer & Earn by inviting friends to join and learn with us.
                Share your unique referral link, and for every successful
                signup, enjoy exciting rewards. The more you refer, the more you
                earn—it's that simple
              </p>
            </span>
            <span>
              <Link
                className=" flex w-40 bg-yellow-100  items-center text-yellow-500 rounded-full p-3 hover:bg-yellow-500 hover:text-white hover:scale-105 transition-all ease-in-out     justify-between"
                href="/Refer&Earn"
              >
                Explore More
                <MdOutlineArrowRightAlt size={25} />
              </Link>
            </span>
          </div>
        </div>
      </div>
      <div className="mt-8 flex flex-col justify-center items-center w-[95vw] m-auto">
        <h2 className="font-bold text-[1.5em] text-center ">
          Teacher Responsibilities at Learn
          <span className="font-bold text-orange-600">O</span>sphere ?
        </h2>
        <IoRemoveOutline size={50} className="mt-2" />
        <p className="font-semibold text-center mt-4">
          At LearnOsphere, teachers play a vital role in shaping students'
          learning experiences. They are expected to deliver engaging lessons,
          provide clear explanations, and support students in their academic
          growth. By maintaining professionalism, adapting to different learning
          styles, and fostering a positive environment, teachers help create a
          meaningful and effective educational journey for every learner.
        </p>
        <div className="grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 mt-8 gap-4 rounded-2xl   p-2 m-auto">
          <div className="bg-white flex flex-col border border-gray-200  gap-3  p-4 rounded-xl">
            <FaSwatchbook className=" text-orange-600 " size={30} />
            <h3 className="text-[.9em] md:text-[1.1em] lg:text-[1.3em]  font-semibold">
              Committed and Enthusiastic
            </h3>
            <p className="text-[.8em] md:text-[.9em] lg:text-[1em]  mt-1">
              Committed and enthusiastic educators bring energy and dedication
              to every lesson, making learning engaging and effective. Their
              passion for teaching inspires students to grow and achieve their
              goals.
            </p>
          </div>
          <div className="bg-white flex flex-col border border-gray-200  gap-3  p-4 rounded-xl">
            <VscSymbolConstant className=" text-green-500 " size={30} />
            <h3 className="text-[.9em] md:text-[1.1em] lg:text-[1.3em]  font-semibold">
              Consistently Available
            </h3>
            <p className="text-[.8em] md:text-[.9em] lg:text-[1em]  mt-1">
              Being Consistently Available ensures that students receive
              continuous support and guidance whenever they need it. A reliable
              presence helps build trust, keeps learning on track, and fosters a
              productive educational experience.
            </p>
          </div>
          <div className="bg-white flex flex-col border border-gray-200  gap-3  p-4 rounded-xl">
            <MdContentPasteSearch className=" text-yellow-500 " size={30} />
            <h3 className="text-[.9em] md:text-[1.1em] lg:text-[1.3em]  font-semibold">
              Engaging Content
            </h3>
            <p className="text-[.8em] md:text-[.9em] lg:text-[1em]  mt-1">
              Engaging Content makes learning more interactive, enjoyable, and
              effective. Well-crafted lessons, visuals, and activities capture
              students' interest, helping them understand concepts better and
              stay motivated throughout their learning journey.
            </p>
          </div>
          <div className="bg-white flex flex-col border border-gray-200  gap-3  p-4 rounded-xl">
            <FaChalkboardTeacher className=" text-blue-600 " size={30} />
            <h3 className="text-[.9em] md:text-[1.1em] lg:text-[1.3em]  font-semibold">
              Passionate About Processes
            </h3>
            <p className="text-[.8em] md:text-[.9em] lg:text-[1em]  mt-1">
              At LearnOsphere, our educators value clear, organized processes.
              They believe that a structured approach makes learning both
              efficient and enjoyable. This commitment ensures every student
              gets a consistent, high-quality experience.
            </p>
          </div>
          <div className="bg-white flex flex-col border border-gray-200  gap-3  p-4 rounded-xl">
            <GiGrowth className=" text-red-600 " size={30} />
            <h3 className="text-[.9em] md:text-[1.1em] lg:text-[1.3em]  font-semibold">
              Eager to Learn and Grow
            </h3>
            <p className="text-[.8em] md:text-[.9em] lg:text-[1em]  mt-1">
              At LearnOsphere, educators are always eager to learn and grow,
              adapting to new teaching techniques and staying current with
              educational trends. This commitment to ongoing development
              enriches their teaching methods, ensuring high-quality lessons.
            </p>
          </div>
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
            alt="Form Background"
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
      <div className="mt-6 flex flex-col justify-center items-center gap-4 p-4">
        <h2 className="font-bold text-[1em] md:text-[1.3em] lg:text-[1.5em] ">
          Frequently Asked Questions
        </h2>
        <IoRemoveOutline size={50} className="mt-2" />
        <div className="w-full md:w-[60vw] m-auto mt-6">
          {faqs.map((faq, index) => (
            <div
              className="flex flex-col gap-2 border-b border-gray-300 p-2 md:p-6"
              key={index}
            >
              <h3 className="font-semibold text-[1em] md:text-[1.1em] lg:text-[1.3em] mt-3">
                {faq.question}
              </h3>
              <p className="text-gray-800 text-[.8em] md:text-[1em] lg:text-[1.1em] ">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Footer1 />
      <Footer />
    </div>
  );
};

export default JoinAsTeacher;
