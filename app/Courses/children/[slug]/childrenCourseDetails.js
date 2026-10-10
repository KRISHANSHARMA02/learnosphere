"use client";

import { useEffect, useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Footer1 from "@/components/Footer1";
import Footer from "@/components/Footer";
import Image from "next/image";
import child_7 from "@/public/child_7.svg";
import LearnNgrow from "@/public/LearnNgrow.jpg";
import Class6_8bubble from "@/public/Class6_8bubble.png";
import {
  FaBookOpen,
  FaTags,
  FaCertificate,
  FaStar,
  FaChevronDown,
  FaCheckCircle,
  FaClock,
  FaLanguage,
    FaLock,
  FaPlayCircle,
  FaFilePdf
} from "react-icons/fa";
import Affordable from "@/public/Affordable.svg";
import A11 from "@/public/A11.svg";
import A12 from "@/public/A12.svg";
import A13 from "@/public/A13.svg";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "react-scroll";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import { trackEvent } from "@/src/lib/eventTracker";

export default function ChildrenSlug({ course }) {
  const searchParams = useSearchParams();
  const courseId = searchParams.get("id"); // coming from query: { id: course._id }
  const { data: session, status } = useSession(); // ✅ NextAuth session
  const [userId, setUserId] = useState(null); // ✅ Store backend userId
  const router = useRouter();
  // const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  
  // ✅ New State for Syllabus Section
  const [activeSubjectIndex, setActiveSubjectIndex] = useState(0);
  const [openSectionIndex, setOpenSectionIndex] = useState(0);
  const pathname = usePathname();
  
  // ✅ Track Course Viewed
  useEffect(() => {
    if (course) {
      trackEvent("COURSE_VIEWED", { 
        course_id: course._id, 
        course_title: course.title,
        path: pathname,
        url: window.location.origin + pathname
      });
    }
  }, [course, pathname]);


  const toggleSyllabusSection = (index) => {
    setOpenSectionIndex(openSectionIndex === index ? null : index);
  };

  // Reset open section when changing tabs
  useEffect(() => {
    setOpenSectionIndex(0);
  }, [activeSubjectIndex]);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };
  function calculateProfitPercentage(originalPrice, discountPrice) {
    if (!originalPrice || originalPrice === 0 || !discountPrice) return 0;
    const profit = originalPrice - discountPrice;
    const percent = (profit / originalPrice) * 100;
    return Math.round(percent);
  }

    function getCurrentPath() {
    if (typeof window === "undefined") return "";
    return window.location.pathname + window.location.search;
  }


  if (loading)
    return (
      <div className="flex justify-center items-center h-[calc(100vh-200px)]">
        <div className="flex items-center justify-center space-x-2 text-3xl">
          Learn{" "}
        </div>
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
        <div className="flex items-center justify-center space-x-2 text-3xl">
          sphere{" "}
        </div>
      </div>
    );

  if (error || !course) {
    return (
      <div className="p-10 text-center text-red-500">
        {error || "Course not found."}
      </div>
    );
  }

  // ✅ Handle Buy Click
  const handleBuyClick = async (courseInfo, _userId, type) => {
    if (!session) {
      toast.info("Please log in as a student to continue", {
        position: "top-center",
        autoClose: 2000,
      });

       setTimeout(() => {
        const currentPath = getCurrentPath();

        router.push(`/Student?callbackUrl=${encodeURIComponent(currentPath)}`);
      }, 2000);
      return;
    }

    try {
      const res = await axios.post(
        "https://mobileapp.backend.learnosphere.in/api/route/getStudentUserIdByEmail",
        {
          email: session.user.email,
          courseId: courseInfo.id, // send courseId
          type, // send purchase type
        }
      );

      if (res.data?.userId) {
        const encodedCourse = encodeURIComponent(JSON.stringify(courseInfo));
        router.push(
          `/pages/payment?course=${encodedCourse}&userId=${res.data.userId}&type=${type}`
        );
      }
    } catch (err) {
      if (err.response?.status === 403) {
        Swal.fire({
          icon: "warning",
          title: "Access Denied",
          text: err.response.data.message,
          confirmButtonText: "OK",
          confirmButtonColor: "#ff9800",
        });
      } else if (err.response?.status === 404) {
        Swal.fire({
          icon: "error",
          title: "User Not Found",
          text: "No student record found for this email. Please register first.",
          confirmButtonText: "Register",
          confirmButtonColor: "#f44336",
        });
      } else if (err.response?.status === 409) {
        Swal.fire({
          icon: "info",
          title: "Trial Already Used ",
          text: err.response.data.message,
          confirmButtonText: "OK",
          confirmButtonColor: "#2196f3",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong. Please try again later.",
          confirmButtonText: "OK",
        });
      }
    }
  };

  // Helper: Extract the first number from a string like "Class 8"
  function extractNumber(str) {
    const match = str.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  }

  // Check if course belongs to children category (Class 6–8)
  function isChildrenCourse(courseClass) {
    const num = extractNumber(courseClass);
    return num >= 6 && num <= 8;
  }

  // Helper: Generate URL-safe slug from strings
  function toSlug(str) {
    return encodeURIComponent(
      str.toLowerCase().trim().replace(/\s+/g, "-")
    ).replace(/%2C/g, ","); // decode encoded commas back to commas
  }

  // ✅ Main: Generate full WhatsApp-shareable course link
  function generateCourseShareLink(course) {
    if (!course || !course.class || !course.subject || !course._id) {
      console.error("Missing course data");
      return null;
    }

    // Format subjects
    const subjects = Array.isArray(course.subject)
      ? course.subject.map(toSlug).join(",")
      : toSlug(course.subject);

    // Build slug
    const classSlug = toSlug(course.class);
    const fullSlug = `${classSlug}-${subjects}`;

    // Base path
    const basePath = isChildrenCourse(course.class)
      ? "/Courses/children"
      : "/Courses";

    // Full path
    return `https://learnosphere.in${basePath}/${fullSlug}?id=${course._id}`;
  }

  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-5xl ">
        <button
          onClick={() => {
            const courseLink = generateCourseShareLink(course); // Use helper
            if (!courseLink) return;

            const message = `Check out this course: ${course.title}\n\n${courseLink}`;
            const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
              message
            )}`;

            window.open(whatsappUrl, "_blank", "noopener,noreferrer");
          }}
          className="fixed top-60 right-5 md:right-20 z-50 flex items-center rounded-3xl bg-orange-500 shadow-lg animate-bounce"
        >
          <Image
            src={LearnNgrow}
            alt="Course Highlights"
            width={1024}
            height={400}
            className="w-16 h-16 object-cover rounded-3xl"
          />
        </button>

        {/* Course Image */}
        <div className="mx-auto max-w-5xl mt-20 p-4 md:p-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-left p-2 text-black mb-4">
            {course.title}
          </h1>
          <div className="flex items-center space-x-4 text-gray-700 md:mb-6">
            <div className="text-2xl flex items-center space-x-1">
              <FaStar className="text-yellow-400" />
              <span className="text-sm">
                {course.rating.toFixed(1)} ({course.reviewCount} reviews)
              </span>
            </div>
            {course.duration && (
              <div className="text-2xl flex items-center space-x-1">
                <FaClock className="text-orange-500" />
                <span className="text-sm">{course.duration}</span>
              </div>
            )}
            {course.language && (
              <div className="text-4xl flex items-center space-x-1">
                <FaLanguage className="text-orange-500" />
                <span className="text-sm">{course.language}</span>
              </div>
            )}
          </div>
          <div className="flex">
            <div className=" flex max-w-2xl mx-auto  md:mb-8">
              <Image
                src={course.thumbnail}
                alt={course.title}
                width={500}
                height={500}
                className="rounded-3xl shadow-lg border-4 border-orange-200 h-80 w-full"
              />
              <Image
                src={Class6_8bubble}
                alt="class 6 "
                width={1024}
                height={400}
                className="hidden md:block w-full h-80 object-cover rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Course Details */}
        <div className=" mx-2 md:mb-10 my-6 md:my-0 ">
          <div className="p-6 md:p-8 lg:p-10 bg-gradient-to-b from-orange-50 to-yellow-50 rounded-3xl shadow-xl  ">
            {/* Section Title */}
            <h2 className="text-3xl md:text-4xl font-extrabold text-orange-600 mb-2 md:mb-6 font-bubblegum tracking-tight">
              👩‍💻 Course Details
            </h2>

            {/* Course Description */}
            <div className="space-y-4 mb-8">
              {course.description.split("\n").map((line, index) => (
                <p
                  key={index}
                  className="text-base md:text-lg text-gray-700 leading-relaxed  p-4 "
                >
                  {line}
                </p>
              ))}
            </div>

            {/* Features / Tags Section */}
            {course.tags?.length > 0 && (
              <div className="my-6">
                <h2 className="text-2xl md:text-3xl font-bold text-orange-700 mb-4 font-bubblegum">
                  💭 Features You’ll Love
                </h2>

                <div className="flex flex-wrap gap-3">
                  {course.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-50 text-gray-800 text-sm md:text-base font-medium px-8 py-4 rounded-full shadow-md flex items-center gap-2 md:gap-4"
                    >
                      🌟 {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-8 md:flex justify-between items-center gap-6">
              <div className="flex items-baseline gap-4 mb-12">
                {course.discountPrice && course.discountPrice < course.price ? (
                  <>
                    <p className="text-3xl md:text-4xl font-bold text-orange-600">
                      ₹{course.discountPrice}
                    </p>
                    <p className="text-base md:text-xl line-through text-gray-400">
                      ₹{course.price}
                    </p>
                    <span className="bg-green-100 text-green-700 font-semibold px-2 py-1 rounded-full">
                      {calculateProfitPercentage(
                        course.price,
                        course.discountPrice
                      )}
                      %OFF
                    </span>
                  </>
                ) : (
                  <p className="text-3xl md:text-4xl font-bold text-orange-600">
                    ₹{course.price}
                  </p>
                )}
              </div>
              <button
                onClick={() =>
                  handleBuyClick(
                    {
                      id: course._id,
                      name: course.title,
                      price:
                        course.discountPrice &&
                        course.discountPrice < course.price
                          ? course.discountPrice
                          : course.price,
                      duration: course.duration,
                    },
                    userId,
                    "full"
                  )
                }
                className="shimmer-button w-auto px-6 py-2 bg-orange-600 text-white font-semibold rounded-md text-base hover:bg-orange-700 transition duration-300"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
        {/* Highlights */}
        <div className="bg-white md:flex rounded-3xl p-6 shadow-md max-w-5xl mx-2 sm:mx-auto mb-8">
          <div className="w-full md:w-1/2 ">
            <h2 className="text-xl md:text-2xl font-bold text-gray-700 mb-4">
              👨‍🏫 What’s Inside?
            </h2>
            <ul className="space-y-3  lg:text-lg text-gray-700">
              {course.highlights?.map((h, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-pink-500 text-xl">⭐</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-1/2 p-2  ">
            <Image
              src={child_7}
              alt="Course Highlights"
              width={1024}
              height={400}
              className="w-full h-80 object-cover rounded-xl"
            />
          </div>
        </div>

        <div className="mb-6 max-w-4xl mx-2 sm:mx-auto">
          <h3 className="text-xl font-bold text-gray-800 my-3">
            Advantages of this course:
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className=" items-center space-x-3 p-4 rounded-xl  bg-white border border-gray-200 shadow-lg transition">
              <Image
                src={A11}
                alt="Affordable"
                width={100}
                height={100}
                className="mx-auto"
              />
              <h4 className="mx-auto text-center py-4 font-semibold">
                {" "}
                Foundation & Board Exam Preparation
              </h4>
              <p className="mx-auto text-center py-4 ">
                {" "}
                Strong foundation & assured success in Board Exams{" "}
              </p>
            </div>
            <div className=" items-center space-x-3 p-4 rounded-xl bg-white border border-gray-200 shadow-lg transition">
              <Image
                src={A13}
                alt="Affordable"
                width={100}
                height={100}
                className="mx-auto"
              />
              <h4 className="mx-auto text-center py-4 font-semibold">
                {" "}
                Topic-Wise Video Lectures by Experts
              </h4>
              <p className="mx-auto text-center py-4 ">
                {" "}
                Learn every concept with expert guidance and explanations.{" "}
              </p>
            </div>
            <div className=" items-center space-x-3 p-4 rounded-xl  bg-white border border-gray-200 shadow-lg transition">
              <Image
                src={A12}
                alt="Affordable"
                width={100}
                height={100}
                className="mx-auto"
              />
              <h4 className="mx-auto text-center py-4 font-semibold">
                {" "}
                Affordable Plans
              </h4>
              <p className="mx-auto text-center py-4 ">
                {" "}
                Quality learning without financial burden.
              </p>
            </div>
            <div className=" items-center space-x-3 p-4 rounded-xl  bg-white border border-gray-200 shadow-lg transition">
              <Image
                src={Affordable}
                alt="Affordable"
                width={100}
                height={100}
                className="mx-auto"
              />
              <h4 className="mx-auto text-center py-4 font-semibold">
                {" "}
                Concept-Based Learning
              </h4>
              <p className="mx-auto text-center py-4 ">
                {" "}
                Concept-based learning builds deep understanding of core ideas.{" "}
              </p>
            </div>
          </div>
        </div>

        
        {/* =========================================
            NEW COURSE CURRICULUM SECTION
        ========================================= */}
        {course.syllabus && course.syllabus.length > 0 && (
          <div className="mt-12 rounded-xl mb-10 max-w-4xl mx-2 sm:mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Course Curriculum & Syllabus
              </h2>
            </div>

            <div className="flex flex-col md:flex-row border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm min-h-[400px]">
              {/* Left Sidebar (Tabs) */}
              <div className="md:w-1/3 border-b md:border-b-0 md:border-r border-gray-200 bg-gray-50 flex flex-col">
                {course.syllabus.map((subjectObj, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSubjectIndex(idx)}
                    className={`p-4 text-left font-semibold transition-all duration-200 border-b border-gray-200 last:border-b-0 ${
                      activeSubjectIndex === idx
                        ? "bg-orange-500 text-white shadow-inner"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {subjectObj.subject}
                  </button>
                ))}
              </div>

              {/* Right Content Area (Accordion) */}
              <div className="md:w-2/3 p-4 md:p-6 bg-gray-50/30 overflow-y-auto">
                {course.syllabus[activeSubjectIndex]?.sections.map(
                  (section, secIdx) => (
                    <div
                      key={secIdx}
                      className="mb-4 bg-white border border-gray-200 rounded-lg shadow-sm"
                    >
                      {/* Accordion Header */}
                      <button
                        className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50 transition-colors rounded-lg"
                        onClick={() => toggleSyllabusSection(secIdx)}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-gray-400 font-medium">
                            {secIdx + 1}
                          </span>
                          <span className="font-semibold text-gray-800">
                            {section.sectionTitle}
                          </span>
                        </div>
                        <FaChevronDown
                          className={`text-gray-400 transform transition-transform duration-300 ${
                            openSectionIndex === secIdx ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Accordion Content (Lectures list) */}
                      {openSectionIndex === secIdx && (
                        <div className="p-4 border-t border-gray-100 bg-gray-50 space-y-2">
                          {section.lectures.map((lecture, lIdx) => (
                            <button
                              key={lIdx}
                              onClick={() =>
                                handleBuyClick(
                                  {
                                    id: course._id,
                                    name: course.title,
                                    price:
                                      course.discountPrice &&
                                      course.discountPrice < course.price
                                        ? course.discountPrice
                                        : course.price,
                                    duration: course.duration,
                                  },
                                  userId,
                                  "full"
                                )
                              }
                              className="w-full flex justify-between items-center p-3 bg-white border border-gray-100 rounded-md hover:shadow-md transition-shadow text-left cursor-pointer group"
                            >
                              <div className="flex items-center gap-3">
                                <div className="bg-orange-100 text-orange-500 p-2 rounded-md group-hover:bg-orange-500 group-hover:text-white transition-colors">
                                  {lecture.type === "video" ? (
                                    <FaPlayCircle size={18} />
                                  ) : (
                                    <FaFilePdf size={18} />
                                  )}
                                </div>
                                <div>
                                  <p className="font-medium text-gray-800 text-sm md:text-base group-hover:text-orange-600 transition-colors">
                                    {lecture.title}
                                  </p>
                                  <p className="text-xs text-gray-500 capitalize">
                                    {lecture.type}
                                  </p>
                                </div>
                              </div>
                              <FaLock className="text-gray-400 flex-shrink-0 ml-2 group-hover:text-orange-500 transition-colors" />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )}
        {/* =========================================
            END OF NEW COURSE CURRICULUM SECTION
        ========================================= */}

        {/* Plans */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-2 sm:mx-auto">
          <div className="bg-blue-100 border-4 border-blue-400 rounded-3xl p-6 shadow-xl text-center">
            <h3 className="text-xl font-bold text-blue-700 mb-3">
              🧪 Trial Plan
            </h3>
            <p className="text-gray-600 mb-2">Try for just</p>
            <p className="text-3xl font-extrabold text-blue-600 mb-4">₹11</p>
            <button
              onClick={() =>
                handleBuyClick(
                  {
                    id: course._id,
                    name: course.title,
                    price: 11,
                    duration: "7 days",
                    renewPrice: 199,
                    renewDuration: "30 days",
                  },
                  userId,
                  "trial"
                )
              }
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-full shadow-md transition transform hover:scale-105"
            >
              🚀 Start Trial
            </button>
          </div>

          <div className="bg-pink-100 border-4 border-pink-400 rounded-3xl p-6 shadow-xl text-center">
            <h3 className="text-xl font-bold text-pink-700 mb-3">
              🏆 Full Access
            </h3>
            <p className="text-gray-600 mb-2">One-time payment for 1 year</p>
            <p className="text-3xl font-extrabold text-pink-600 mb-4">
              ₹{course.discountPrice ?? course.price}
            </p>
            <button
              onClick={() =>
                handleBuyClick(
                  {
                    id: course._id,
                    name: course.title,
                    price:
                      course.discountPrice &&
                      course.discountPrice < course.price
                        ? course.discountPrice
                        : course.price,
                    duration: course.duration,
                  },
                  userId,
                  "full"
                )
              }
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-6 py-3 rounded-full shadow-md transition transform hover:scale-105"
            >
              🎉 Get Full Access
            </button>
          </div>
        </div>

        <div className="text-center mt-12 text-lg text-orange-700 font-semibold">
          📚 Let’s learn, play, and grow together! 🌟
        </div>
        {/* FAQs Section */}
        {course.faqs?.length > 0 && (
          <div className="bg-white p-8 rounded-xl ">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {course.faqs.map((faq, index) => (
                <div key={index} className="border-b last:border-b-0">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex justify-between items-center w-full py-4 text-left text-base md:text-lg font-semibold text-gray-800"
                  >
                    <span>{faq.question}</span>
                    <FaChevronDown
                      className={`transform transition-transform duration-300 ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaq === index && (
                    <div className="pb-4 pr-6 text-gray-600 transition-all duration-300 ease-in-out">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* ✅ Fixed Buy Button */}
      {course && (
        <div className="fixed md:hidden bottom-0 left-0 right-0 bg-white border-t px-2 py-2 shadow-lg flex flex-col sm:flex-row gap-3 items-center z-50">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full justify-between mx-2">
            <button
              onClick={() =>
                handleBuyClick(
                  {
                    id: course._id,
                    name: course.title,
                    price: 11,
                    duration: "7 days",
                    renewPrice: 199,
                    renewDuration: "30 days",
                  },
                  userId,
                  "trial"
                )
              }
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-3 py-2 rounded-lg"
            >
              Start 7-Day Trial @ ₹11
            </button>

            <button
              onClick={() =>
                handleBuyClick(
                  {
                    id: course._id,
                    name: course.title,
                    price:
                      course.discountPrice &&
                      course.discountPrice < course.price
                        ? course.discountPrice
                        : course.price,
                    duration: course.duration,
                  },
                  userId,
                  "full"
                )
              }
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-3 py-2 rounded-lg"
            >
              Buy Full Course
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
      <Footer1 />
      <Footer />
    </div>
  );
}
