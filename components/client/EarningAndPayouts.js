"use client";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState, useRef } from "react";
import { trackEvent } from "@/src/lib/eventTracker";
import EarnMoney from "@/public/Earning.png";
import Image from "next/image";
import Link from "next/link";
import { CiFaceSmile, CiTimer } from "react-icons/ci";
import { GiArchiveRegister } from "react-icons/gi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { HiOutlineBanknotes } from "react-icons/hi2";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlinePriceCheck,
  MdPublishedWithChanges,
} from "react-icons/md";
import { VscReferences } from "react-icons/vsc";
import { BsUpload } from "react-icons/bs";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { IoRemoveOutline } from "react-icons/io5";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import Footer1 from "@/components/Footer1";
import Footer from "@/components/Footer";
import axios from "axios";
import Swal from "sweetalert2";
import Education from "@/public/education.jpg";
const cards = [
  {
    icon: <GiArchiveRegister className="text-orange-600" size={30} />,
    title: " Apply & Get Approved ",
    description:
      "Join LearnOsphere by completing a simple application process and get approved quickly. Submit your details, showcase your expertise, and clear the assessment to start your teaching journey. Our team reviews applications promptly to ensure a smooth onboarding experience. Once approved, you can begin teaching and earning right away!",
  },
  {
    icon: <FaChalkboardTeacher className="text-orange-600" size={30} />,
    title: "Start Teaching & Upload Content",
    description:
      "Begin your teaching journey by conducting live interactive classes or tutoring students one-on-one. If you prefer flexibility, you can also upload recorded lessons that learners can access anytime. Engage with students, provide valuable insights, and enhance their learning experience. The more quality content you share, the better your reach and earnings.",
  },
  {
    icon: <HiOutlineBanknotes className="text-orange-600" size={30} />,
    title: "Earn for Your Work",
    description:
      "Every session you conduct and every piece of content you upload contributes to your earnings. Teach subjects you love, help students grow, and get rewarded for your expertise. Your income increases as you attract more learners and build a strong teaching profile. The more effort you put in, the greater your financial returns.",
  },
  {
    icon: <MdPublishedWithChanges className="text-orange-600" size={30} />,
    title: "Withdraw Easily",
    description:
      "Accessing your hard-earned money is simple and hassle-free through the teacher dashboard. Track your earnings in real-time, manage your withdrawals, and receive payments without delays. Enjoy complete transparency in your payouts and withdraw funds anytime with just a few clicks. ",
  },
];

const EarningPayouts = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };
  const [windowWidth, setWindowWidth] = useState(0);
  const dropdownRef = useRef(null);
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
        trackEvent("TEACHER_EARNINGS_INQUIRY_FORM_SUBMITTED", {
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
    }
  }, []);

  const cardWidth = windowWidth < 640 ? 100 : 50;
  const transformStyle = `translateX(-${currentIndex * cardWidth}%)`;
  return (
    <div className="font-Poppins">
      <Navbar />
      <div className=" flex flex-col-reverse sm:flex-row gap-20 mt-20 bg-gradient-to-r from-blue-200 to-purple-200 rounded-2xl w-[98vw] m-auto p-8">
        <div className="p-1 lg:p-5 flex flex-col gap-4">
          <h1 className="font-bold text-[1.1em] lg:text-[1.5em] mt-2 lg:mt-4 ">
            Maximize Your Earnings on Learn
            <span className=" text-orange-600">O</span>sphere
          </h1>
          <p className="font-semibold text-[.8em] lg:text-[1em] mt-1 lg:mt-2">
            Teach live classes, upload recorded lessons, or offer one-on-one
            tutoring to earn flexibly. Set your own rates and increase your
            income based on experience and subject demand
          </p>
          <p className="font-semibold text-[.8em] lg:text-[1em] mt-1 lg:mt-2">
            Boost your earnings with the Refer & Earn program by inviting other
            educators. Enjoy a hassle-free payment process with timely payouts
            and transparent earnings.
          </p>
          <Link href="/Signin">
            <button className="bg-blue-600 text-white font-bold p-3 w-60 mt-5 rounded-full">
              Earn Money
            </button>
          </Link>
        </div>
        <div>
          <Image
            className=" w-full md:w-[40vw] 2xl:w-[25vw] sm:mt-16 md:mt-7 rounded-2xl object-contain"
            src={EarnMoney}
            alt=""
          />
        </div>
      </div>
      <div className="mt-8 flex flex-col w-[95vw] m-auto p-8 justify-center items-center">
        <h2 className="font-bold text-[1.2em] md:text-[1.5em] text-center ">
          How Teachers Get Paid on Learn
          <span className="font-bold text-orange-600">O</span>sphere ?
        </h2>
        <IoRemoveOutline size={50} className="mt-2" />
        <p className="font-semibold text-center  text-[.9em] md:text-[1em] mt-4">
          Teachers on LearnOsphere get paid through a simple and transparent
          process. After teaching students and uploading content, they can track
          their earnings in the teacher dashboard and withdraw funds securely.
          With multiple earning opportunities, LearnOsphere ensures timely and
          fair payments for educators.
        </p>
        <div className="flex flex-col items-center justify-center w-full mx-auto">
          <div className="relative w-full  overflow-hidden">
            <div className="relative w-full overflow-hidden">
              <div>
                <div
                  className="flex gap-2 sm:gap-6 transition-transform duration-300 mt-8 ease-in-out"
                  style={{ transform: transformStyle }}
                >
                  {cards.map((card, index) => (
                    <div
                      key={index}
                      className="w-full sm:w-[48%] flex-shrink-0 flex flex-col bg-white border border-gray-200 p-6 rounded-xl shadow-md"
                    >
                      {card.icon}
                      <h3 className="text-lg font-semibold mt-3">
                        {card.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-2">
                        {card.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-6">
            <button
              onClick={() =>
                setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0))
              }
              className=" transform -translate-y-1/2 px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
            >
              <MdOutlineKeyboardDoubleArrowLeft />
            </button>

            {/* Next Button */}
            <button
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev < cards.length - 1 ? prev + 1 : cards.length - 1
                )
              }
              className=" transform -translate-y-1/2 px-4 py-2 bg-orange-600 text-white rounded-full hover:bg-gray-800 transition"
            >
              <MdOutlineKeyboardDoubleArrowRight />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col w-[95vw] m-auto p-8 justify-center items-center">
        <h2 className="font-bold text-[1.2em] md:text-[1.5em] text-center ">
          Earning Opportunities & Payment Process
        </h2>
        <IoRemoveOutline size={50} className="mt-2" />
        <p className="font-semibold text-center  text-[.9em] md:text-[1em] mt-4">
          LearnOsphere offers multiple earning opportunities for teachers, from
          conducting live classes and tutoring students to uploading recorded
          lessons and selling premium courses. Teachers can also earn through
          referral programs and performance-based bonuses. With flexible pricing
          options, educators have full control over their income. Payments are
          processed securely, ensuring timely withdrawals through the teacher
          dashboard, making the entire process smooth and hassle-free.
        </p>
        <div className="grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 mt-8 gap-4 rounded-2xl   p-2 m-auto">
          <div className="bg-white flex flex-col border border-gray-200  gap-3  p-4 rounded-xl">
            <VscReferences className=" text-yellow-500 " size={30} />
            <h3 className="text-[.9em] md:text-[1.1em] lg:text-[1.3em]  font-semibold">
              Referral Program
            </h3>
            <p className="text-[.7em] md:text-[.7em] lg:text-[.9em] text-gray-600  mt-1">
              The LearnOsphere Referral Program allows teachers to earn extra by
              inviting others to join the platform. Simply share your unique
              referral link, and when a new teacher signs up and starts
              teaching, you earn rewards. The more you refer, the more you earn!
              It’s an easy way to boost your income while helping others
              discover exciting teaching opportunities.
            </p>
          </div>
          <div className="bg-white flex flex-col border border-gray-200  gap-3  p-4 rounded-xl">
            <BsUpload className=" text-blue-600 " size={30} />
            <h3 className="text-[.9em] md:text-[1.1em] lg:text-[1.3em]  font-semibold">
              Course Content Upload
            </h3>
            <p className="text-[.7em] md:text-[.7em] lg:text-[.9em] text-gray-600  mt-1">
              Course Content Upload allows educators to share their knowledge by
              uploading high-quality lessons, tutorials, and study materials.
              This feature enables teachers to create engaging content that
              students can access anytime, enhancing their learning experience.
              By consistently uploading valuable content, educators can reach a
              wider audience and establish themselves as subject matter experts.
            </p>
          </div>
          <div className="bg-white flex flex-col border border-gray-200  gap-3  p-4 rounded-xl">
            <FaMoneyBillTrendUp className=" text-green-600 " size={30} />
            <h3 className="text-[.9em] md:text-[1.1em] lg:text-[1.3em]  font-semibold">
              Bonuses & Incentives
            </h3>
            <p className="text-[.7em] md:text-[.7em] lg:text-[.9em] text-gray-600  mt-1">
              Bonuses & Incentives reward educators for their dedication and
              performance, offering additional earnings beyond regular teaching.
              Teachers can unlock bonuses through milestones like student
              engagement, positive feedback, and content quality. Special
              incentives also encourage continuous improvement, making teaching
              more fulfilling and financially rewarding.
            </p>
          </div>
          <div className="bg-white flex flex-col border border-gray-200  gap-3  p-4 rounded-xl">
            <MdOutlinePriceCheck className=" text-purple-600 " size={30} />
            <h3 className="text-[.9em] md:text-[1.1em] lg:text-[1.3em]  font-semibold">
              Custom Pricing
            </h3>
            <p className="text-[.7em] md:text-[.7em] lg:text-[.9em] text-gray-600  mt-1">
              Custom Pricing allows teachers to set their own rates based on
              their expertise, course content, and teaching style. This
              flexibility ensures that educators are fairly compensated for
              their efforts while giving students access to quality learning at
              competitive prices. It empowers teachers to maximize their
              earnings and grow their reach.
            </p>
          </div>
          <div className="bg-white flex flex-col border border-gray-200  gap-3  p-4 rounded-xl">
            <CiTimer className=" text-red-600 " size={30} />
            <h3 className="text-[.9em] md:text-[1.1em] lg:text-[1.3em]  font-semibold">
              Secure & Timely Payments
            </h3>
            <p className="text-[.7em] md:text-[.7em] lg:text-[.9em] text-gray-600  mt-1">
              Secure & Timely Payments ensure that teachers receive their
              earnings without any delays or complications. With a reliable
              payment system, withdrawals are processed smoothly through
              multiple secure methods. Teachers can focus on delivering quality
              education while enjoying hassle-free and on-time payouts.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center w-[95vw] m-auto items-center mt-10">
        <h2 className="font-bold text-[1.1em] md:text-[1.3em] lg:text-[1.6em] text-center">
          Your Guide to Payments & Payouts
        </h2>
        <IoRemoveOutline size={50} className="mt-2" />
        <p className="w-[90vw] font-semibold m-auto text-center mt-6 text-[.7em] md:text-[.8em] lg:text-[1em]">
          Earn rewards effortlessly by referring your friends to our platform.
          Simply share your unique referral link, and when your friends sign up
          and complete the required action, you’ll receive exciting rewards. The
          more you refer, the more you earn—start sharing today!"
        </p>
        <div className=" p-2 w-full bg-gradient-to-r from-blue-200 to-rose-200 rounded-xl   flex flex-col-reverse md:flex-row  gap-2 justify-between  mt-6">
          <div className="w-full md:w-[98%]  sm:p-6 ">
            <ol className=" flex flex-col text-gray-700 gap-5 mt-4 ">
              <li className="font-semibold text-[.7em] sm:text-[.8em] lg:text-[.9em] text-gray-800 flex items-start gap-2">
                <IoMdCheckmarkCircleOutline
                  className="text-green-600"
                  size={25}
                />
                <div className="flex flex-col sm:flex-row">
                  <span className="text-black block">Earnings Overview -</span>
                  <span>
                    LearnOsphere provides secure, timely payouts with easy
                    withdrawal options and earning transparency.
                  </span>
                </div>
              </li>
              <li className="font-semibold text-[.7em] sm:text-[.8em] lg:text-[.9em] text-gray-800 flex items-start gap-2">
                <IoMdCheckmarkCircleOutline
                  className="text-green-600"
                  size={25}
                />
                <div className="flex flex-col sm:flex-row">
                  <span className="text-black block">Payment Schedule -</span>
                  <span>
                    Payments are processed on a fixed schedule, ensuring you
                    receive your earnings on time without any hassle.
                  </span>
                </div>
              </li>
              <li className="font-semibold text-[.7em] sm:text-[.8em] lg:text-[.9em] text-gray-800 flex items-start gap-2">
                <IoMdCheckmarkCircleOutline
                  className="text-green-600"
                  size={25}
                />
                <div className="flex flex-col sm:flex-row">
                  <span className="text-black block">Withdrawal Options -</span>
                  <span>
                    Choose from multiple withdrawal options, including bank
                    transfer and digital wallets, for a seamless payout
                    experience
                  </span>
                </div>
              </li>
              <li className="font-semibold text-[.7em] sm:text-[.8em] lg:text-[.9em] text-gray-800 flex items-start gap-2">
                <IoMdCheckmarkCircleOutline
                  className="text-green-600"
                  size={25}
                />
                <div className="flex flex-col sm:flex-row">
                  <span className="text-black block">
                    Minimum Payout Limit -
                  </span>
                  <span>
                    Ensure you meet the minimum withdrawal amount before
                    requesting a payout.
                  </span>
                </div>
              </li>
              <li className="font-semibold text-[.7em] sm:text-[.8em] lg:text-[.9em] text-gray-800 flex items-start gap-2">
                <IoMdCheckmarkCircleOutline
                  className="text-green-600"
                  size={25}
                />
                <div className="flex flex-col sm:flex-row">
                  <span className="text-black block">
                    Transaction Security -
                  </span>
                  <span>
                    Enjoy secure and verified payments with encryption and fraud
                    protection.
                  </span>
                </div>
              </li>
              <li className="font-semibold text-[.7em] sm:text-[.8em] lg:text-[.9em] text-gray-800 flex items-start gap-2">
                <IoMdCheckmarkCircleOutline
                  className="text-green-600"
                  size={25}
                />
                <div className="flex flex-col sm:flex-row">
                  <span className="text-black block">
                    Bonuses & Incentives -
                  </span>
                  <span>
                    Earn extra rewards for high engagement, referrals, and top
                    performance.
                  </span>
                </div>
              </li>
              <li className="font-semibold text-[.7em] sm:text-[.8em] lg:text-[.9em] text-gray-800 flex items-start gap-2">
                <IoMdCheckmarkCircleOutline
                  className="text-green-600"
                  size={25}
                />
                <div className="flex flex-col sm:flex-row">
                  <span className="text-black block">Payment Support -</span>
                  <span>
                    Get dedicated payment support to resolve any queries
                    quickly, ensuring a smooth and hassle-free payout
                    experience.
                  </span>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
      <div className=" flex flex-col sm:flex-row  mx-6 rounded-xl  p-3 md:p-8 bg-gradient-to-r from-yellow-200 to-orange-300 mt-6 ">
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
                   <div ref={dropdownRef} className="relative bg-yellow-200 rounded-md " >
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
              </span>{" "}
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

export default EarningPayouts;
