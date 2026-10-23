"use client";
import { APP_BACKEND_URL } from "@/src/helper/appbackend_api";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import Footer1 from "@/components/Footer1";
import Navbar from "@/components/Navbar";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { CgNotes } from "react-icons/cg";
import { FaNoteSticky } from "react-icons/fa6";
import { GrNotes } from "react-icons/gr";
import { HiArrowRightCircle } from "react-icons/hi2";
import { IoNewspaperSharp } from "react-icons/io5";
import Swal from "sweetalert2";
import { FaTimes, FaWhatsapp } from "react-icons/fa";
import Sociallinks2 from "@/components/Sociallinks2";
import AOS from "aos";
import "aos/dist/aos.css";
import FloatingMenu from "@/components/StickySyllabusButton";
import { trackEvent, EVENT_NAMES } from "../../src/lib/eventTracker";

const CbseSyllabus2025 = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    AOS.init({ duration: 1000 });
        trackEvent(EVENT_NAMES.SYLLABUS_PAGE_VISIT, { page: 'CBSE_Syllabus' });
  }, []);
  useEffect(() => {
    axios
      .get(`${APP_BACKEND_URL}/api/route/getCbseSyllabus`)
      .then((res) => {
        setContent(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching CBSE content:", err);
        setError("Failed to load content.");
        setLoading(false);
      });
  }, []);

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
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
  return (
    <div>
      <Navbar />
      <div className="mt-20">
        <Sociallinks2 />
        <FloatingMenu />
        <div className="sticky top-20 left-0 w-full bg-white text-gray-700 py-2 shadow-md  rounded-b-xl font-semibold z-20 ">
          <div className="max-w-6xl mx-auto flex items-center px-1 lg:px-6 mt-2 relative">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 leading-tight text-center mx-auto ">
              CBSE Class-Wise Syllabus 2025–26 (Classes 1 to 12)
            </h1>
          </div>
        </div>
        <div className="w-full max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8 py-2 md:py-10 space-y-12 text-gray-700">
          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            <div className="md:w-1/3">
              {/* Header Section */}
              <div className=" md:mt-20 sticky top-60 flex items-center justify-center text-center my-auto md:m-10 xl:m-20">
                {/* Background kite */}
                <div
                  className="absolute -z-10 w-96 h-96 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] 
  bg-orange-200 opacity-20
  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
  [clip-path:polygon(50%_0%,100%_50%,50%_100%,0%_50%)] hidden md:block
  animate-[rotate-slow_20s_linear_infinite]"
                  style={{
                    clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                  }}
                ></div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
                  Master Your CBSE Journey with Learn
                  <b className="text-orange-600">O</b>sphere
                </h2>
                {/* {content.header.paragraphs.map((p, i) => (
                                    <p key={i} className="text-base md:text-lg text-black mt-4 leading-relaxed">
                                        {p}
                                    </p>
                                ))} */}
              </div>
            </div>
            <div className="md:w-2/3 space-y-6 md:space-y-12">
              {/* Syllabus Section */}
              <section className="bg-white py-8">
                <h3 className="text-2xl font-semibold text-gray-800 border-l-4 border-blue-500 pl-4 mb-4">
                  CBSE Syllabus for Classes 1 to 12 at Learn
                  <b className="text-orange-600">O</b>sphere
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {[...Array(12)].map((_, i) => (
                    <a
                      key={i}
                      href={`/CBSE_Syllabus/class${
                        i + 1
                      }-cbse-syllabus-2025-26`}
                      className="block bg-gray-100 p-4 rounded-lg border hover:bg-orange-50 hover:scale-105 hover:shadow transition-transform"
                    >
                      <div className="flex justify-between items-center font-semibold text-orange-700">
                        CBSE Class {i + 1} Syllabus
                        <span className="text-orange-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </section>

              {/* Quiz Section */}
              <section className="bg-blue-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-2xl font-semibold text-gray-800 border-l-4 border-blue-500 pl-4 mb-4">
                  CBSE Online Quiz for Class 1 to 12 at Learn
                  <b className="text-orange-600">O</b>sphere
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[...Array(12)].map((_, i) => (
                    <a
                      key={i}
                      href={`/Online-Quiz/Certification-Quiz-For-Class-${
                        i + 1
                      }`}
                      className="block bg-white p-4 rounded-lg border hover:bg-blue-100 hover:shadow hover:scale-105 transition-transform"
                    >
                      <div className="flex justify-between items-center font-semibold text-orange-600">
                        CBSE Class {i + 1} Quiz
                        <span className="text-orange-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </section>

              {/* Resources Section */}
              <div className="bg-gray-50 p-2">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="mt-4 flex flex-col gap-3">
                    <motion.div
                      className="bg-gray px-6  rounded-xl "
                      data-aos="fade-up"
                    >
                      <h3 className="text-[1.4em] font-semibold">
                        {content.resources.title3}
                      </h3>
                      {content.resources.paragraphs.map((p, i) => (
                        <p key={i} className="mt-4">
                          {p}
                        </p>
                      ))}
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 text-[.7em] md:text-[1em] mt-4">
                    <Link
                      href="/CBSE-Sample-Papers"
                      className="flex flex-col justify-between items-center bg-gradient-to-r from-purple-400 to-red-400 text-white p-4 gap-4 font-bold rounded-lg text-center hover:scale-105 transition-transform"
                    >
                      <GrNotes size={25} />
                      CBSE Sample Papers
                    </Link>
                    <Link
                      href="/icse-sample-papers"
                      className="flex flex-col justify-between items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 gap-4 font-bold rounded-lg text-center  hover:scale-105 transition-transform"
                    >
                      <CgNotes size={25} />
                      ICSE Sample Papers
                    </Link>
                    <Link
                      href="/Cbse-Previosyear-Questions"
                      className="flex flex-col justify-between items-center bg-gradient-to-r from-blue-500 to-red-400 text-white p-4 gap-4 font-bold rounded-lg text-center  hover:scale-105 transition-transform"
                    >
                      <IoNewspaperSharp size={25} />
                      CBSE Previous Year Question
                    </Link>
                    <Link
                      href="/ICSE-Previousyear-Questions"
                      className="flex flex-col justify-between items-center bg-gradient-to-r from-cyan-500 to-purple-400 text-white p-4 gap-4 font-bold rounded-lg text-center  hover:scale-105 transition-transform"
                    >
                      <FaNoteSticky size={25} />
                      ICSE Previous Year Question
                    </Link>
                    <Link
                      href="/MathsFormula"
                      className="flex flex-col justify-between items-center bg-gradient-to-r from-purple-400 to-red-400 text-white p-4 gap-4 font-bold rounded-lg text-center  hover:scale-105 transition-transform"
                    >
                      <GrNotes size={25} />
                      Maths Formulas
                    </Link>
                    <Link
                      href="/CBSE-Sample-Question-Paper"
                      className="flex flex-col justify-between items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 gap-4 font-bold rounded-lg text-center  hover:scale-105 transition-transform"
                    >
                      <CgNotes size={25} />
                      CBSE Sample Question Paper
                    </Link>
                    <Link
                      href="/CBSE-Previousyear-Question-Papers-"
                      className="flex flex-col justify-between items-center bg-gradient-to-r from-blue-500 to-red-400 text-white p-4 gap-4 font-bold rounded-lg text-center  hover:scale-105 transition-transform"
                    >
                      <IoNewspaperSharp size={25} />
                      CBSE Previous Year Question Papers
                    </Link>
                    <Link
                      href="/ICSE-Previous-Question-Paper"
                      className="flex flex-col justify-between items-center bg-gradient-to-r from-cyan-500 to-purple-400 text-white p-4 gap-4 font-bold rounded-lg text-center  hover:scale-105 transition-transform"
                    >
                      <FaNoteSticky size={25} />
                      ICSE Previous Year Question Papers
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
          {/* Why Choose Section */}
          <section className="bg-gray-50 md:p-6 rounded-lg shadow-sm">
            <motion.div
              className="bg-gray md:px-6  rounded-xl "
              data-aos="fade-up"
            >
              <h2 className="text-2xl font-semibold text-gray-800 border-l-4 border-orange-500 pl-4 mb-4">
                {content.whyChoose.title2}
              </h2>
            </motion.div>
            <ol className="list-decimal space-y-2 text-gray-700 ml-6 text-base">
              <motion.div
                className="bg-gray px-6  rounded-xl "
                data-aos="fade-up"
              >
                {content.whyChoose.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </motion.div>
            </ol>
          </section>

          {/* Final CTA / Summary */}
          <section className="text-center mt-10">
            <h4 className="text-2xl font-semibold text-gray-800 mb-4">
              Ready to Master CBSE?
            </h4>
            <p className="text-gray-600 mb-6">
              Join thousands of students who trust Learnosphere for their exam
              preparation journey. Access all resources, practice quizzes, and
              study smarter.
            </p>
            <a
              href="/Student"
              className="inline-block bg-orange-500 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-orange-600 transition"
            >
              Get Started Now
            </a>
          </section>
        </div>
      </div>
      <Footer1 />
      <Footer />
    </div>
  );
};

export default CbseSyllabus2025;
