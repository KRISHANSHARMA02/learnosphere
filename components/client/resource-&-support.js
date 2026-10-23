"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import Footer from "@/components/Footer";
import Footer1 from "@/components/Footer1";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { trackEvent } from "@/src/lib/eventTracker";
import Resource from "@/public/Resource-removebg-preview.png";
import { GiArchiveRegister } from "react-icons/gi";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
  MdPayments,
} from "react-icons/md";
import { FcBiotech } from "react-icons/fc";
import { FaUsers } from "react-icons/fa";
import { FaRegShareFromSquare } from "react-icons/fa6";
import { IoRemoveOutline } from "react-icons/io5";
import axios from "axios";
import Swal from "sweetalert2";
import Education from "@/public/education.jpg";

const cards = [
  {
    icon: <GiArchiveRegister className="text-orange-600" size={30} />,
    title: "Teaching Resources",
    description:
      "Teaching Resources on our platform provide teachers with a variety of tools to enhance their teaching experience. From lesson plans and educational materials to interactive content, these resources help instructors create engaging and effective lessons, ensuring students receive the best learning experience possible.",
  },
  {
    icon: <FcBiotech className="text-orange-600" size={30} />,
    title: "Technical Support",
    description:
      "Technical Support is available to ensure teachers have a smooth and hassle-free experience on the platform. Whether it's troubleshooting issues, assisting with account management, or helping with the integration of teaching tools, our dedicated team is always ready to offer prompt and effective assistance.",
  },
  {
    icon: <FaUsers className="text-yellow-500" size={30} />,
    title: "Community & Forums ",
    description:
      "Community & Forums provide a platform for teachers to connect, collaborate, and share experiences. Engage with fellow educators, discuss teaching strategies, resolve challenges, and gain valuable insights to enhance your teaching journey and grow your network within the LearnOsphere community.",
  },
  {
    icon: <MdPayments className="text-green-600" size={30} />,
    title: "Payment & Earnings Help",
    description:
      "Payment & Earnings Help offers guidance on how teachers can manage their payments, track earnings, and resolve any issues related to payouts. Find support for understanding the payment schedule, withdrawal options, and resolving any payment-related concerns to ensure a seamless experience with LearnOsphere.",
  },
  {
    icon: <FaRegShareFromSquare className="text-purple-600" size={30} />,
    title: "Knowledge Sharing Programs",
    description:
      "Knowledge Sharing Programs offer a platform for teachers and professionals to exchange valuable insights, teaching methods, and industry updates. These programs foster continuous learning, helping educators stay up-to-date with the latest trends and improve their teaching strategies for enhanced student outcomes.",
  },
];

const ResourceandSupport = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
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
  const [selectedCountry, setSelectedCountry] = useState("+91");
  const [countries, setCountries] = useState([]);
  const [selected, setSelected] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
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
          `${WEB_BACKEND_URL}/api/route/getAllCountries`,
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
        },
      );

      // Correct the response status check
      if (response.status === 200) {
        trackEvent("TUTOR_SUPPORT_INQUIRY_FORM_SUBMITTED", {
          name,
          email,
          mobile_number: selectedCountry
            ? `${selectedCountry}${contact}`
            : contact,
          contact,
          message,
          country_code: selectedCountry,
        });

        setSuccess("Form Submitted Successfully");
        setName("");
        setEmail("");
        setContact("");
        setMessage("");

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

  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
    }
  }, []);

  const cardWidth = windowWidth < 640 ? 100 : 50;
  const transformStyle = `translateX(-${currentIndex * cardWidth}%)`;

  const faqs = [
    {
      question: "1. What types of resources are available for teachers?",
      answer:
        "We provide a variety of resources to help teachers enhance their teaching experience. These include detailed lesson plans, curriculum guides tailored to specific subjects, interactive teaching aids, multimedia resources (videos, audio clips), worksheets, quizzes, and educational articles. These materials are designed to cater to different learning styles and can be customized to fit the needs of diverse student groups.",
    },
    {
      question: "2. How can I get help with technical issues?",
      answer:
        "If you encounter any technical issues, we offer a range of support options. First, check the Help section on the platform for troubleshooting guides, where you'll find solutions to common problems. If you still need assistance, you can directly contact our technical support team through the support ticket system. Our team is available to resolve issues quickly and ensure that you can continue teaching without interruption.",
    },
    {
      question: "3. How do I access teaching materials and resources?",
      answer:
        "All teaching materials are conveniently available in the Resources tab of your dashboard. You can browse through a wide selection of resources, including lesson plans, presentation templates, and multimedia content. These materials can be downloaded or accessed directly from the platform, allowing you to seamlessly incorporate them into your lessons, whether in live classes or self-paced learning modules.",
    },
    {
      question: "4. Can I get one-on-one technical support?",
      answer:
        "Yes, one-on-one technical support is available if you require more personalized assistance. To initiate this, simply submit a support request via our platform, and our technical team will get in touch with you. They will guide you through any challenges you're facing, whether it’s platform navigation, content uploading issues, or troubleshooting device-related problems.",
    },
    {
      question: "5. What if I don’t find the resources I need?",
      answer:
        "If the specific teaching materials you're looking for are not available in our current resource library, you can always reach out to our support team. They are more than happy to assist with finding relevant content or even guide you in creating custom resources that meet your particular needs. Your feedback helps us continuously improve our collection of educational materials.",
    },
    {
      question: "6. How do I engage with other educators in the community?",
      answer:
        "Our platform offers several ways for teachers to engage with other educators. You can join discussion forums, participate in group chats, or attend online webinars and workshops. These spaces allow you to exchange ideas, share experiences, and get feedback on your teaching methods. It’s a great opportunity to network and collaborate with educators from around the world.",
    },
    {
      question: "7. Are there any workshops or training programs available?",
      answer:
        "Yes, we provide various workshops and professional development programs designed to help you enhance your teaching skills. These training sessions cover a range of topics, from mastering online teaching tools to new pedagogical approaches. You can sign up for these workshops directly through the platform, and they are offered regularly to ensure that teachers stay up to date with the latest trends in education.",
    },
    {
      question: "8. How do I access user guides for the platform?",
      answer:
        "To access user guides, simply visit the Support section on the platform. Here, you’ll find detailed instructions and how-to guides that cover every feature of the platform. Whether you're new to the platform or need to learn how to use a specific tool, these guides provide step-by-step instructions to ensure that you can navigate and use the platform with ease.",
    },
    {
      question:
        "9. What is the process for submitting feedback or suggestions?",
      answer:
        "We value your feedback and suggestions as they help us improve the platform. You can submit your feedback by visiting the Feedback section, where you’ll be able to share your thoughts on the platform's features, resources, and overall user experience. We encourage you to be as detailed as possible so we can understand your needs and work on enhancing your teaching experience.",
    },
    {
      question: "10. Can I request customized support for my teaching needs?",
      answer:
        "Absolutely! If you have specific teaching needs or require custom support, you can contact our support team directly. Whether you need help with curriculum planning, creating custom teaching materials, or finding the right tools for your classes, our team is here to provide tailored solutions. We are committed to helping you succeed and will work with you to ensure that your teaching experience is smooth and effective.",
    },
  ];

  return (
    <div>
      <Navbar />
      <div className=" flex flex-col-reverse sm:flex-row gap-20 mt-20 bg-gradient-to-r from-green-200 to-cyan-200 rounded-2xl w-[98vw] m-auto p-8">
        <div className="p-1 lg:p-5 flex flex-col gap-4 mt-0 md:mt-4">
          <h1 className="font-bold text-[1.1em] lg:text-[1.5em] mt-2 lg:mt-4 ">
            Resource & Support at Learn
            <span className=" text-orange-600">O</span>sphere
          </h1>
          <p className="font-semibold text-[.8em] lg:text-[1em] mt-1 lg:mt-2">
            Resource & Support offers essential tools and guidance for teachers.
            Get access to teaching materials and technical help when needed.
          </p>
          <p className="font-semibold text-[.8em] lg:text-[1em] mt-1 lg:mt-2">
            Need assistance? Find solutions for payments, content uploads, and
            troubleshooting, ensuring a smooth teaching experience.
          </p>
          <Link href="/Signin">
            <button className="bg-cyan-600 text-white font-bold p-3 w-60 mt-5 rounded-full">
              Join Us
            </button>
          </Link>
        </div>
        <div>
          <Image
            className=" w-full md:w-[40vw] 2xl:w-[25vw] sm:mt-16 md:mt-7 rounded-2xl object-contain"
            src={Resource}
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
              className=" transform -translate-y-1/2 px-4 py-2 bg-orange-600 text-white rounded-full hover:bg-gray-800 transition"
            >
              <MdOutlineKeyboardDoubleArrowLeft />
            </button>

            {/* Next Button */}
            <button
              onClick={() =>
                setCurrentIndex((prev) =>
                  prev < cards.length - 1 ? prev + 1 : cards.length - 1,
                )
              }
              className=" transform -translate-y-1/2 px-4 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-600 transition"
            >
              <MdOutlineKeyboardDoubleArrowRight />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col justify-center items-center">
        <h2 className="font-bold text-[1.5em] text-center ">
          Benefits of the Resource & Support{" "}
        </h2>
        <IoRemoveOutline size={50} className="mt-2" />

        <div className="grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 mt-6 gap-4 rounded-2xl   p-8 m-auto">
          <div className="bg-blue-200 flex flex-col border justify-between  gap-3  p-6 rounded-xl">
            <span className="flex flex-col gap-3">
              <h3 className="text-[.9em] md:text-[1.1em] lg:text-[1.2em]  font-semibold">
                Access to Teaching Materials:
              </h3>
              <p className="text-[.8em] md:text-[.9em] lg:text-[1em]  mt-1">
                Teachers can access a wide range of ready-to-use teaching
                materials, including lesson plans, worksheets, and multimedia
                content. These resources help save time and support educators in
                delivering engaging, well-structured lessons that cater to
                diverse learning needs and standards.
              </p>
            </span>
          </div>
          <div className="bg-green-200 flex flex-col border justify-between  gap-3  p-6 rounded-xl">
            <span className="flex flex-col gap-3">
              <h3 className="text-[.9em] md:text-[1.1em] lg:text-[1.2em]  font-semibold">
                Instant Technical Assistance
              </h3>
              <p className="text-[.8em] md:text-[.9em] lg:text-[1em]  mt-1">
                Teachers can receive immediate support for any technical issues
                they may encounter. Whether it's a platform error or
                troubleshooting a feature, our dedicated support team ensures
                minimal disruption, allowing teachers to focus on their students
                without any technical concerns.
              </p>
            </span>
          </div>
          <div className="bg-lime-200 flex flex-col border justify-between  gap-3  p-6 rounded-xl">
            <span className="flex flex-col gap-3">
              <h3 className="text-[.9em] md:text-[1.1em] lg:text-[1.2em]  font-semibold">
                Community Engagement
              </h3>
              <p className="text-[.8em] md:text-[.9em] lg:text-[1em]  mt-1">
                Teachers can connect with a vibrant community of educators,
                share insights, and collaborate on best practices. By engaging
                in forums and discussions, they can expand their professional
                network, gain new perspectives, and enhance their teaching
                methods through collective knowledge and support.
              </p>
            </span>
          </div>
          <div className="bg-purple-200 flex flex-col border justify-between  gap-3  p-6 rounded-xl">
            <span className="flex flex-col gap-3">
              <h3 className="text-[.9em] md:text-[1.1em] lg:text-[1.2em]  font-semibold">
                Comprehensive Guides
              </h3>
              <p className="text-[.8em] md:text-[.9em] lg:text-[1em]  mt-1">
                Access detailed guides and resources to help you navigate the
                platform and improve your teaching. These step-by-step tutorials
                provide valuable information on various tools and features,
                ensuring you have the knowledge and support needed to succeed in
                your teaching journey.
              </p>
            </span>
          </div>
          <div className="bg-yellow-200 flex flex-col border justify-between  gap-3  p-6 rounded-xl">
            <span className="flex flex-col gap-3">
              <h3 className="text-[.9em] md:text-[1.1em] lg:text-[1.2em]  font-semibold">
                Enhanced Learning Environment
              </h3>
              <p className="text-[.8em] md:text-[.9em] lg:text-[1em]  mt-1">
                Create a dynamic and engaging learning space with access to
                various resources, tools, and a supportive community. By
                offering personalized support, interactive features, and
                continuous updates, this environment fosters both teacher and
                student growth, making the teaching experience more impactful
                and rewarding.
              </p>
            </span>
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

export default ResourceandSupport;
