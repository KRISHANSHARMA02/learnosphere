// pages/syllabus.js
"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import React from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Footer1 from "@/components/Footer1";
import DownloadFormPage from "@/components/downloadForm";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import FloatingMenu from "@/components/StickySyllabusButton";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaCheckCircle, FaBookOpen } from "react-icons/fa";
import Head from "next/head";
import { FiPlus, FiMinus } from "react-icons/fi";
import { trackEvent, EVENT_NAMES } from "../../src/lib/eventTracker";

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-3 bg-white rounded-lg shadow-md hover:shadow-lg focus:outline-none"
      >
        <span className="text-[.9em] md:text-lg font-semibold font-Poppins">
          {question}
        </span>
        {isOpen ? (
          <FiMinus className="text-gray-600 text-xl" />
        ) : (
          <FiPlus className="text-gray-600 text-xl" />
        )}
      </button>
      {isOpen && (
        <p className="mt-2 px-4 py-3 text-gray-900 bg-gray-100 rounded-lg font-Poppins shadow-md">
          {answer}
        </p>
      )}
    </div>
  );
};

const cou = [
  {
    title: "Class 12 PCM Mastery",
    desc: "Master Physics, Chemistry & Math with AI-driven adaptive learning.",
    color: "bg-yellow-50",
    link: "https://learnosphere.in/Courses/class-12-pcm-6874f1d6a4298b45d8043a62",
  },
  {
    title: "Class 9 All-in-One",
    desc: "Cover all subjects with interactive sessions and flexible scheduling.",
    color: "bg-green-50",
    link: "https://learnosphere.in/Courses/class-9-maths,science,social-science-68789610798291bd763ec46a",
  },
  {
    title: "Class 10 Complete",
    desc: "Gamified lessons, micro-learning, and AI integrated tutoring.",
    color: "bg-pink-50",
    link: "https://learnosphere.in/Courses/class-10-maths,science,social-science-68778960fbc9eb6a9b938bfc",
  },
  {
    title: "Class 11 Commerce",
    desc: "Master Physics, Chemistry & Math with AI-driven adaptive learning.",
    color: "bg-red-50",
    link: "https://learnosphere.in/Courses/class-11-business-studies-accountancy-economics-6889d8cdc7f80001f3aa5654",
  },
  {
    title: "Class 8 All-in-One",
    desc: "Cover all subjects with interactive sessions and flexible scheduling.",
    color: "bg-purple-50",
    link: "https://learnosphere.in/Courses/children/class-8-maths,science,social-science-6878b4e982ff71d850fc4219",
  },
];

export default function Syllabus() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
     trackEvent(EVENT_NAMES.SYLLABUS_PAGE_VISIT, { page: 'CBSE_Syllabus_Slug', slug: window?.location?.pathname });
  }, []);

  const { slug } = useParams();
  const containerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [syllabus, setSyllabus] = useState(null); // Store data from backend
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [papers, setPapers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [samplePapers, setSamplePapers] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const faqSchema = {
      "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map((faq) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
  };
  const toggleDropdown = (dropdownName) => {
    setActiveDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  const classMatch = slug?.match(/class(\d+)/i);
  const className = classMatch ? classMatch[1] : null; // extract class number from slug

  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [dropdownStates, setDropdownStates] = useState({
    papers: false,
    courses: false,
    samples: false,
    quiz: false,
  });

  const checkArrows = () => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;

    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
  };
  // Run on mount and on window resize
  useEffect(() => {
    checkArrows();

    window.addEventListener("resize", checkArrows);
    return () => window.removeEventListener("resize", checkArrows);
  }, []);
  const [showStickyNav, setShowStickyNav] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const heading = document.getElementById("main-heading");
      if (heading) {
        const rect = heading.getBoundingClientRect();
        // When the heading goes above the viewport, show sticky nav
        setShowStickyNav(rect.bottom <= 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch syllabus from backend
  useEffect(() => {
    const fetchSyllabus = async () => {
      if (!className) {
        setError("Invalid class slug in URL.");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(
          "https://mobileapp.backend.learnosphere.in/api/route/getSyllabusByClass",
          { params: { className } }
        );
        if (response.data && response.data.length > 0) {
          const syllabusData = response.data[0];
          setSyllabus(syllabusData);

          // <-- add this to capture papers for dropdown
          if (syllabusData.papers) {
            setPapers(syllabusData.papers);
          }
          if (syllabusData.courses) {
            setCourses(syllabusData.courses);
          }
          if (syllabusData.samplePpr) {
            setSamplePapers(syllabusData.samplePpr);
          }
          if (syllabusData.faqs) setFaqs(syllabusData.faqs); // ✅ Add this to store FAQs dynamically
        } else {
          setError("No syllabus found for this class.");
        }
      } catch (err) {
        console.error("Error fetching syllabus:", err);
        setError("Failed to load syllabus.");
      } finally {
        setLoading(false);
      }
    };
    fetchSyllabus();
  }, [className]);

  // Show loading or error states
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
  if (error)
    return <div className="text-red-600 text-center mt-20">{error}</div>;
  if (!syllabus)
    return (
      <div className="text-red-600 text-center mt-20">Syllabus not found</div>
    );

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      </Head>
      <Navbar />
      <div className=" mt-20 bg-gray-100 min-h-screen ">
        <div className="w-full bg-white relative ">
          <h1 className="text-2xl md:text-4xl font-bold text-center text-orange-900 py-2  md:py-6 mt-2 ">
            {syllabus.heading}
          </h1>
        </div>
        <FloatingMenu />
        {/* Sticky Secondary Navigation */}
        <div className="sticky top-20 left-0 w-full bg-white text-gray-700 py-2 shadow-md  rounded-b-xl z-20 ">
          <div className="max-w-6xl mx-auto flex items-center px-1 lg:px-6 mt-2 relative">
            <ul className="font-Poppins flex flex-row text-black space-x-1 sm:space-x-2 md:space-x-8 space-y-0 sm:mt-0 mt-2">
              <li className="relative group">
                <div ref={dropdownRef}>
                  <button
                    onClick={() => {
                      if (window.innerWidth < 1024) {
                        toggleDropdown("papers");
                      }
                    }}
                    className="flex items-center gap-2 whitespace-nowrap cursor-pointer  border rounded-lg px-2 md:px-4 lg:px-6 py-2 text-center hover:text-red-500 hover:bg-red-50"
                  >
                    Previous Year Papers{" "}
                    <IoIosArrowDown
                      size={20}
                      className={`transform text-black transition-transform duration-300 ease-in-out 
    ${
      activeDropdown === "papers" ? "rotate-180" : ""
    } lg:group-hover:rotate-180`}
                    />
                  </button>
                  <div
                    className={`absolute left-0 top-full bg-white shadow-lg rounded-lg w-80 transition-all duration-200 
                                     ${
                                       activeDropdown === "papers"
                                         ? "block"
                                         : "hidden"
                                     } group-hover:block`}
                  >
                    {papers.map((paper, idx) => (
                      <Link
                        key={idx}
                        href={paper.slug}
                        className="block px-4 py-2 hover:bg-red-50 hover:rounded-lg"
                      >
                        {paper.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </li>

              {/* Courses */}
              <li className="relative group">
                <div ref={dropdownRef}>
                  <button
                    onClick={() => {
                      if (window.innerWidth < 1024) {
                        toggleDropdown("courses");
                      }
                    }}
                    className="flex items-center gap-2 whitespace-nowrap cursor-pointer border rounded-lg px-2 md:px-4 lg:px-6 py-2 text-center hover:text-red-500 hover:bg-red-50"
                  >
                    Courses{" "}
                    <IoIosArrowDown
                      size={20}
                      className={`transform text-black transition-transform duration-300 ease-in-out 
    ${
      activeDropdown === "courses" ? "rotate-180" : ""
    } lg:group-hover:rotate-180`}
                    />
                  </button>
                  <div
                    className={`absolute right-0 sm:left-0 top-full  bg-white shadow-lg rounded-lg w-56 transition-all duration-200 
              ${
                activeDropdown === "courses" ? "block" : "hidden"
              } group-hover:block`}
                  >
                    {courses.map((course, idx) => (
                      <Link
                        key={idx}
                        href={course.slug}
                        className="block px-4 py-2 hover:bg-red-50 hover:rounded-lg"
                      >
                        {course.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </li>

              {/* Sample Papers */}
              <li className="relative group hidden sm:block">
                <div ref={dropdownRef}>
                  <button
                    onClick={() => {
                      if (window.innerWidth < 1024) {
                        toggleDropdown("samples");
                      }
                    }}
                    className="flex items-center gap-2 whitespace-nowrap cursor-pointer border rounded-lg px-2 md:px-4 lg:px-6 py-2 text-center hover:text-red-500 hover:bg-red-50"
                  >
                    Sample Papers{" "}
                    <IoIosArrowDown
                      size={20}
                      className={`transform text-black transition-transform duration-300 ease-in-out 
    ${
      activeDropdown === "samples" ? "rotate-180" : ""
    } lg:group-hover:rotate-180`}
                    />
                  </button>
                  <div
                    className={`absolute right-0 top-full  bg-white shadow-lg rounded-lg w-80 transition-all duration-200 
              ${
                activeDropdown === "samples" ? "block" : "hidden"
              } group-hover:block`}
                  >
                    {samplePapers.map((sample, idx) => (
                      <Link
                        key={idx}
                        href={sample.slug}
                        className="block px-4 py-3 hover:bg-red-50 hover:rounded-lg"
                      >
                        {sample.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </li>

              {/* Quiz */}
              <li className="relative group hidden sm:block">
                <div ref={dropdownRef}>
                  <button
                    onClick={() => {
                      if (window.innerWidth < 1024) {
                        toggleDropdown("quiz");
                      }
                    }}
                    className="flex items-center gap-2 whitespace-nowrap cursor-pointer border rounded-lg px-2 md:px-4 lg:px-6 py-2 text-center hover:text-red-500 hover:bg-red-50"
                  >
                    Quiz{" "}
                    <IoIosArrowDown
                      size={20}
                      className={`transform text-black transition-transform duration-300 ease-in-out 
    ${activeDropdown === "quiz" ? "rotate-180" : ""} lg:group-hover:rotate-180`}
                    />
                  </button>
                  <div
                    className={`absolute right-0 top-full  bg-white shadow-lg rounded-lg w-56 transition-all duration-200 
              ${
                activeDropdown === "quiz" ? "block" : "hidden"
              } group-hover:block`}
                  >
                    <Link
                      href="/Online-Quiz/Certification-Quiz-For-Class-1"
                      className="block px-4 py-2 hover:bg-red-50 hover:rounded-lg"
                    >
                      Class 1 Quiz
                    </Link>
                    <Link
                      href="/Online-Quiz/Certification-Quiz-For-Class-2"
                      className="block px-4 py-2 hover:bg-red-50 hover:rounded-lg"
                    >
                      Class 2 Quiz
                    </Link>
                    <Link
                      href="/Online-Quiz/Certification-Quiz-For-Class-3"
                      className="block px-4 py-2 hover:bg-red-50 hover:rounded-lg"
                    >
                      Class 3 Quiz
                    </Link>
                    <Link
                      href="/Online-Quiz/Certification-Quiz-For-Class-4"
                      className="block px-4 py-2 hover:bg-red-50 hover:rounded-lg"
                    >
                      Class 4 Quiz
                    </Link>
                    <Link
                      href="/Online-Quiz/Certification-Quiz-For-Class-5"
                      className="block px-4 py-2 hover:bg-red-50 hover:rounded-lg"
                    >
                      Class 5 Quiz
                    </Link>
                    <Link
                      href="/Online-Quiz/Certification-Quiz-For-Class-6"
                      className="block px-4 py-2 hover:bg-red-50 hover:rounded-lg"
                    >
                      Class 6 Quiz
                    </Link>
                    <Link
                      href="/Online-Quiz/Certification-Quiz-For-Class-7"
                      className="block px-4 py-2 hover:bg-red-50 hover:rounded-lg"
                    >
                      Class 7 Quiz
                    </Link>
                    <Link
                      href="/Online-Quiz/Certification-Quiz-For-Class-8"
                      className="block px-4 py-2 hover:bg-red-50 hover:rounded-lg"
                    >
                      Class 8 Quiz
                    </Link>
                    <Link
                      href="/Online-Quiz/Certification-Quiz-For-Class-9"
                      className="block px-4 py-2 hover:bg-red-50 hover:rounded-lg"
                    >
                      Class 9 Quiz
                    </Link>
                    <Link
                      href="/Online-Quiz/Certification-Quiz-For-Class-10"
                      className="block px-4 py-2 hover:bg-red-50 hover:rounded-lg"
                    >
                      Class 10 Quiz
                    </Link>
                    <Link
                      href="/Online-Quiz/Certification-Quiz-For-Class-11"
                      className="block px-4 py-2 hover:bg-red-50 hover:rounded-lg"
                    >
                      Class 11 Quiz
                    </Link>
                    <Link
                      href="/Online-Quiz/Certification-Quiz-For-Class-12"
                      className="block px-4 py-2 hover:bg-red-50 hover:rounded-lg"
                    >
                      Class 12 Quiz
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
       <div className="flex flex-col lg:flex-row max-w-6xl  mx-auto py-4 mb-6  gap-4 p-2 md:p-4 ">
          <div className="flex-1 max-w-4xl  mx-auto  rounded-lg shadow-lg p-3 md:p-6 mb-6 md:mb-0 bg-white sm:text-lg">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-xl shadow-md text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold">
                {syllabus.heading1}
              </h2>
            </div>
            <p className="mt-2">{syllabus.description}</p>
            {syllabus.description1 && (
              <p className="text-left mt-2 mx-auto ">{syllabus.description1}</p>
            )}
            {syllabus.description2 && (
              <p className="text-left  mx-auto  mt-2">
                {syllabus.description2}
              </p>
            )}
            <div className=" md:px-2 py-1 md:py-4  text-base  ">
              <ul className="gap-4">
                {syllabus.points.map((point, index) => (
                  <li
                    key={index}
                    className="bg-gradient-to-r from-orange-50 to-red-50 p-4 mb-4 rounded-xl shadow-sm hover:shadow-md transition"
                  >
                    <FaCheckCircle className="inline text-orange-500 mr-2" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            {syllabus.heading2 && (
              <h3 className="text-xl font-semibold text-center text-gray-800 py-4">
                {syllabus.heading2}
              </h3>
            )}
            {syllabus.points2 && syllabus.points2.length > 0 && (
              <ol className="max-w-3xl mx-auto list-decimal list-inside bg-red-50  p-2 md:p-6 text-gray-700 md:px-6 rounded-xl">
                {syllabus.points2.map((item, idx) => (
                  <li
                    key={idx}
                    className="hover:rounded-xl hover:bg-white p-2 "
                  >
                    <Link
                      href={`/CBSE_Syllabus/class-${className}/${item.slug}`}
                      className="text-orange-600 hover:underline "
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ol>
            )}
            {syllabus.description3 && (
              <p className=" text-gray-600 max-w-3xl mx-auto  mt-6 px-4">
                {syllabus.description3}
              </p>
            )}
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-left mt-4 md:py-2 ">
                Download Previous Year Question Papers PDF for All Classes &
                Subjects
              </h3>
              <div className="mt-6 grid md:grid-cols-2 gap-4">
                {papers.map((paper, idx) => (
                  <Link
                    key={idx}
                    href={paper.slug}
                    className="block px-4 py-2 border rounded-xl hover:bg-red-50 hover:rounded-lg  hover:text-black  hover:underline text-orange-600"
                  >
                    {paper.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className=" lg:w-80 flex flex-col sm:flex-row lg:flex-col gap-6 space-y-6 mx-auto ">
            <div className="bg-white rounded-xl p-2 shadow-xl ">
              <h3 className="text-xl md:text-2xl font-bold text-center md:mt-4 md:py-2 ">
                Sample Papers
              </h3>
              {samplePapers.map((sample, idx) => (
                <Link
                  key={idx}
                  href={sample.slug}
                  className="block px-4 py-3 hover:bg-red-50 text-orange-600 hover:rounded-lg lg:text-sm hover:underline"
                >
                  {sample.name}
                </Link>
              ))}
            </div>
            <div className="mt-4 md:mt-10  lg:mx-auto rounded-lg shadow-lg  h-fit  hidden md:block">
              <DownloadFormPage />
            </div>
          </div>
        </div>
        <div className=" text-center py-10 max-w-4xl mx-auto ">
          <motion.div className=" px-6  rounded-xl " data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-black font-Poppins">
              Our Featured Courses
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {cou.map((course, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  className={`p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all ${course.color} flex flex-col justify-between`}
                >
                  <div>
                    <h3 className="text-xl font-bold mb-4">{course.title}</h3>
                  </div>
                  <Link
                    href={course.link}
                    className="mt-6 inline-block px-4 py-2 bg-orange-600 text-white rounded-full font-semibold shadow-md hover:bg-orange-700 transition"
                  >
                    Explore Course
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      {/* FAQ Section */}
      {faqs.length > 0 && (
        <div className="max-w-4xl mx-auto mt-16 px-4 md:px-0">
          <h2 className="mb-8 text-2xl md:text-3xl font-semibold font-Poppins text-center text-gray-800">
            Frequently Asked Questions (FAQs)
          </h2>

          {faqs.map((faq, index) => (
            <FaqItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      )}

      <Footer1 />
      <Footer />
    </>
  );
}
