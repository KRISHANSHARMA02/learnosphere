"use client";
import { APP_BACKEND_URL } from "@/src/helper/appbackend_api";
import { useParams, useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Footer1 from "@/components/Footer1";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
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
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import IngoudeCompany from "@/public/IngoudeCompany.png";
import UpgradeSkills from "@/public/UpgradeSkills.jpg";
import { trackEvent, EVENT_NAMES } from "@/src/lib/eventTracker";

const CoursePage = ({ course }) => {
  const searchParams = useSearchParams();
  //const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  //const courseId = searchParams.get("id");
  const [error, setError] = useState("");
  const [openFaq, setOpenFaq] = useState(null);
  const { data: session, status } = useSession(); // ✅ NextAuth session
  const [userId, setUserId] = useState(null); // ✅ Store backend userId
  const router = useRouter();
  
  // New State for Syllabus Section
  const [activeSubjectIndex, setActiveSubjectIndex] = useState(0);
  const [openSectionIndex, setOpenSectionIndex] = useState(0);

    const pathname = usePathname();

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
  
  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  
  const toggleSyllabusSection = (index) => {
    setOpenSectionIndex(openSectionIndex === index ? null : index);
  };

  // Reset open section when changing tabs
  useEffect(() => {
    setOpenSectionIndex(0);
  }, [activeSubjectIndex]);

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
        `${APP_BACKEND_URL}/api/route/getStudentUserIdByEmail`,
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

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-br from-gray-100 to-white py-4 px-2 md:py-12 sm:px-6 md:px-16 mt-20 min-h-screen">
        {loading ? (
          <div className="flex justify-center items-center h-[calc(100vh-200px)]">
            <div className="flex items-center justify-center space-x-2 text-3xl">
              Learn{" "}
            </div>
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
            <div className="flex items-center justify-center space-x-2 text-3xl">
              sphere{" "}
            </div>
          </div>
        ) : error ? (
          <p className="text-center text-red-500 text-lg font-semibold">
            {error}
          </p>
        ) : course ? (
          <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 md:mb-4  leading-tight">
              {course.title}
            </h1>
            <div className="flex items-center space-x-4 text-gray-700 md:mb-6">
              <div className="text-2xl flex items-center space-x-1">
                <FaStar className="text-yellow-400" />
                <span className="text-sm">
                  {course.rating?.toFixed(1) || 0} ({course.reviewCount || 0} reviews)
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

            {/* Main Course Header */}
            <div className=" rounded-xl  overflow-hidden lg:flex">
              {/* Course Image Section */}
              <div className="lg:w-1/2 p-2 md:p-6 flex items-center justify-center ">
                <div className="w-full h-60 md:h-80 relative rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    fill
                    className="transition-transform duration-500 hover:scale-105 object-cover"
                  />
                </div>
              </div>

              {/* Course Details Section */}
              <div className="lg:w-1/2 p-4 md:p-8 flex flex-col justify-between">
                {/* Highlights and Features */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    What you'll get:
                  </h3>
                  <ul className="grid grid-cols-1 space-y-4 gap-y-2 text-gray-700">
                    {course.highlights?.map((highlight, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <FaCheckCircle className="text-green-500 flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing and Action Button */}
                <div className="mt-8">
                  <div className="flex items-baseline gap-4 mb-12">
                    {course.discountPrice &&
                    course.discountPrice < course.price ? (
                      <>
                        <p className="text-3xl md:text-4xl font-bold text-orange-600">
                          ₹{course.discountPrice}
                        </p>
                        <p className="text-base md:text-xl line-through text-gray-400">
                          ₹{course.price}
                        </p>
                        <span className="bg-green-100 text-green-700 font-semibold px-2 py-1 rounded-full text-sm">
                          {calculateProfitPercentage(
                            course.price,
                            course.discountPrice
                          )}
                          % OFF
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
                    className=" shimmer-button w-full bg-orange-600 text-white font-bold py-4 rounded-lg text-lg hover:bg-orange-700 transition duration-300 transform hover:scale-105 shadow-md"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>

            {/* Course Description Section */}
            <div className=" md:flex rounded-xl text-left mx-auto max-w-6xl gap-8 lg:gap-16">
              {/* Left Section - Sticky */}
              <div className="hidden md:flex md:w-1/3 lg:w-1/4 p-4">
                <div className="sticky top-20 rounded-xl lg:p-8 h-fit z-20 w-full">
                  {/* Trial + Monthly Subscription */}
                   <div className="border-2 border-blue-500 rounded-xl p-6 shadow-lg bg-blue-50 relative gap-4 mb-6">
                     <span className="absolute text-center top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 w-max bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Beginner Friendly
                    </span>
                    <h3 className="text-lg font-semibold text-gray-700 mt-4">
                      🧪 Trial + Monthly Subscription
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 mb-4">
                      Kickstart your journey for just ₹11
                    </p>
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      ₹11
                    </div>
                    <p className="text-xs text-gray-500 mb-4">
                      Enjoy 7 days of full access. After that, it continues at
                      ₹499/month. Cancel anytime.
                    </p>
                    <button
                      onClick={() =>
                        handleBuyClick(
                          {
                            id: course._id,
                            name: course.title,
                            price: 11,
                            duration: "7 days",
                            renewPrice: 499,
                            renewDuration: "30 days",
                          },
                          userId,
                          "trial"
                        )
                      }
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
                    >
                      Start 7-Day Trial @₹11
                    </button>
                  </div>

                  {/* Full Access Plan */}
                  <div className="border rounded-xl my-6 p-6 shadow hover:shadow-lg transition-all w-full">
                    <h3 className="text-lg font-semibold text-orange-700">
                      🏆 Annual Full Access
                    </h3>
                    <p className="text-sm text-orange-500 mt-1 mb-4">
                      Pay once and unlock 1 year of unlimited access
                    </p>
                   <div className="flex items-center gap-4 text-orange-600 font-semibold text-2xl mb-2 flex-wrap">
                      {course.discountPrice &&
                      course.discountPrice < course.price ? (
                        <>
                           <div className="flex flex-col pr-2">
                            <span>₹{course.discountPrice}</span>
                            <span className="text-gray-500 line-through text-base font-normal">
                              ₹{course.price}
                            </span>
                          </div>
                          <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-md">
                            {calculateProfitPercentage(
                              course.price,
                              course.discountPrice
                            )}
                            %OFF
                          </span>
                        </>
                      ) : (
                        <>₹{course.price}</>
                      )}
                    </div>
                    <p className="text-xs text-orange-500 mb-4">
                      Get 12 months of uninterrupted learning with all features
                      included.
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
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg"
                    >
                      Get Full Year Access
                    </button>
                  </div>
                </div>
              </div>
              {/* right section */}
               <div className="  md:p-4 md:px-8 lg:p-6 lg:px-12 md:w-2/3 lg:w-3/4">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 md:mb-4  leading-tight">
                  {" "}
                  Course Details
                </h2>
                <div className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed">
                  {course.description?.split("\n").map((line, index) => (
                    <p key={index} className="mb-2">
                      {line}
                    </p>
                  ))}
                </div>
                {/* Tags Section */}
                {course.tags?.length > 0 && (
                  <div className=" rounded-xl ">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-4">
                      Features
                    </h2>
                    <div className="flex flex-wrap gap-2 md:mb-4 md:p-2">
                      {course.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-orange-100 text-gray-800 md:text-lg font-medium px-3 py-1 rounded-full m-1 md:m-2 lg:m-4"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {/* Highlights */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-800 my-3">
                    Advantages of this course:
                  </h3>
                  <ul className="grid grid-cols-1 space-y-4 gap-y-2 text-gray-700">
                    <li className="flex items-center space-x-2">
                      <FaCheckCircle className="text-green-500 flex-shrink-0" />
                      <span>Foundation & Board Exam Preparation</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <FaCheckCircle className="text-green-500 flex-shrink-0" />
                      <span>Concept-Based Learning </span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <FaCheckCircle className="text-green-500 flex-shrink-0" />
                      <span>Affordable Plans</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <FaCheckCircle className="text-green-500 flex-shrink-0" />
                      <span>Topic-Wise Video Lectures by Experts</span>
                    </li>
                  </ul>
                </div>

                
                {/* =========================================
                    NEW COURSE CURRICULUM SECTION
                ========================================= */}
                {course.syllabus && course.syllabus.length > 0 && (
                  <div className="mt-12 rounded-xl mb-10">
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


              </div>
            </div>

            <div className="max-w-5xl text-center mx-auto">
              <div className="w-full ">
                <Image
                  src={IngoudeCompany}
                  alt=" "
                  width={1024}
                  height={400}
                  className="object-cover object-bottom w-full md:h-80 rounded-xl"
                />
              </div>

              <div className=" mx-auto max-w-6xl  rounded-3xl p-2 md:p-8 flex flex-col sm:flex-row items-center gap-10 text-center md:text-left">
                {/* Text Section */}
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-gray-900">
                    Ready to Take the Next Step in Your Career?
                  </h2>
                  <p className="text-lg text-gray-800 mb-6">
                    Learn online in competitive world.
                  </p>
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
                    className="shimmer-button px-6 py-3  text-white font-medium rounded-md bg-orange-600 transition duration-200"
                  >
                    Start Learning Now
                  </button>
                </div>

                {/* Image Section */}
                <div className="flex-1">
                  <Image
                    src={UpgradeSkills}
                    alt="Professional growth through learning"
                    className="w-full h-auto object-cover object-bottom rounded-xl"
                  />
                </div>
              </div>
            </div>

            {/* Course Plans Section */}
            <div className="">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Choose Your Plan
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Trial + Auto-Subscription Plan */}
                <div className="border-2 border-blue-500 rounded-xl p-6 shadow-lg bg-blue-50 relative">
                  <span className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                    Best for Starters
                  </span>
                  <h3 className="text-lg font-semibold text-gray-700 mt-4">
                    🧪 Trial + Monthly Plan
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 mb-4">
                    Start learning for just ₹11
                  </p>
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    ₹11
                  </div>
                  <p className="text-xs text-gray-500 mb-4">
                    7-day trial, then auto-renews at ₹499/month. Cancel anytime.
                  </p>
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
                    className="shimmer-button w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
                  >
                    Start Trial @ ₹11
                  </button>
                </div>

                {/* Full Access Plan */}
                <div className="border rounded-xl p-6 shadow hover:shadow-lg transition-all">
                  <h3 className="text-lg font-semibold text-gray-700">
                    🏆 Full Access Plan
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 mb-4">
                    One-time payment for 12 months access
                  </p>
                  {/* Price Section with Discount Tag */}
                   <div className="flex items-center gap-3 text-orange-600 font-semibold text-2xl mb-2 flex-wrap">
                    {course.discountPrice &&
                    course.discountPrice < course.price ? (
                      <>
                        <span>₹{course.discountPrice}</span>
                        <span className="text-gray-500 line-through text-base font-normal">
                          ₹{course.price}
                        </span>

                        {/* Discount Tag */}
                        <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-md">
                          {calculateProfitPercentage(
                            course.price,
                            course.discountPrice
                          )}
                          % OFF
                        </span>
                      </>
                    ) : (
                      <>₹{course.price}</>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mb-4">
                    12 months unlimited access to all content
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
                    className="shimmer-button w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg"
                  >
                    Buy Full Access
                  </button>
                </div>
              </div>
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

            <div className="mt-10 mb-10 h-20 md:h-2"></div>
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
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-3 py-2 rounded-lg text-sm sm:text-base"
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
                   className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-3 py-2 rounded-lg text-sm sm:text-base"
                  >
                    Buy Full Course
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg">No course found.</p>
        )}
      </div>
      <ToastContainer />
      <div className="hidden md:block">
        <Footer1 />
        <Footer />
      </div>
    </>
  );
};

export default CoursePage;
