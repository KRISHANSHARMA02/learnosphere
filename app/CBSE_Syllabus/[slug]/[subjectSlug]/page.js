"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
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
import { useSession, signOut } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify"; // <-- Add this if not already
import "react-toastify/dist/ReactToastify.css"; // Also add this if not already

export default function SubjectPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";
  const { slug, subjectSlug } = useParams();
  const [subjectData, setSubjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const handleDownloadClick = async () => {
    if (!session) {
      toast.info("Please log in as a student to continue", {
        position: "top-center",
        autoClose: 2000,
      });

      setTimeout(() => {
        router.push("/Student");
      }, 2000);

      return;
    }

    // If logged in → allow download
    window.open(subjectData.pdfUrl, "_blank");
  };

  useEffect(() => {
    if (slug && subjectSlug) {
      // 🔹 Normalize "class-12" → "12"
      const normalizedClass = slug.replace("class-", "");
      axios
        .get("https://mobileapp.backend.learnosphere.in/api/route/getSubjectByClass", {
          params: { className: normalizedClass, subject: subjectSlug },
        })
        .then((res) => setSubjectData(res.data))
        .catch((err) => console.error("Error fetching subject:", err))
        .finally(() => setLoading(false));
    }
  }, [slug, subjectSlug]);

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
  if (!subjectData) return <p>No data found for {subjectSlug}</p>;

  return (
    <>
      <Navbar />

      <div className="mt-20 bg-gray-50 min-h-screen">
        <FloatingMenu />
        <div className="w-full bg-white relative ">
          {/* Subject Heading */}
          <motion.h1
            className="text-3xl md:text-4xl font-bold text-center py-6 px-2 text-orange-900 "
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {subjectData.title} – Class {slug.replace("class-", "")} CBSE
            Syllabus 2025-26
          </motion.h1>
        </div>

      <div className="flex flex-col lg:flex-row max-w-6xl  mx-auto py-4 mb-6 gap-4 p-2 md:p-4 ">
          <div className="flex-1 max-w-4xl">
            {/* Subject Description */}

            {/* Topics List */}
            <motion.div
              className="bg-white shadow-lg rounded-2xl p-4 md:p-8 mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-xl shadow-md text-center ">
                <h1 className="text-2xl md:text-3xl font-bold">
                  {" "}
                  {subjectData.heading}{" "}
                </h1>
              </div>
              <p className="mt-2 py-2 text-base md:text-lg">
                {subjectData.description}
              </p>
              <p className="mt-2 py-2 text-base md:text-lg">
                {subjectData.description1}
              </p>
              <p className="my-4  text-base md:text-lg">
                Learnosphere ensures that all resources are accurate and easy to
                access. With these papers, you can analyze your weak areas,
                improve speed, and approach the exams with full confidence.
              </p>
              {/* PDF Section */}
              <ToastContainer />
              {subjectData.pdfUrl && (
                <div className="mb-8 text-center">
                  <h2 className="text-2xl font-semibold text-orange-700 mb-4">
                    Download Full Syllabus (PDF)
                  </h2>
                  {isLoggedIn ? (
                    <button
                      onClick={handleDownloadClick}
                      className="inline-block px-6 py-3 bg-orange-600 text-white font-semibold rounded-full shadow-md hover:bg-orange-700 transition"
                    >
                      📄 View / Download PDF
                    </button>
                  ) : (
                    <button
                      onClick={handleDownloadClick}
                      className="inline-block px-6 py-3 bg-orange-600 text-white font-semibold rounded-full shadow-md hover:bg-orange-700 transition"
                    >
                      📄 View / Download PDF
                    </button>
                  )}
                  {/* Inline PDF Preview */}
                  <div className="relative w-full h-[600px] border rounded-xl my-4 shadow-md">
                    <iframe
                      src={
                        isLoggedIn
                          ? `${subjectData.pdfUrl}#toolbar=0`
                          : `${subjectData.pdfUrl}#page=1&toolbar=0&navpanes=0&scrollbar=0`
                      }
                      className="w-full h-full rounded-xl"
                      title="Syllabus PDF"
                    />

                    {!isLoggedIn && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90 rounded-xl pointer-events-auto p-4">
                        <p className="text-lg font-semibold text-gray-800 mb-2">
                          🔒 Please log in to view the full syllabus PDF
                        </p>
                        <p className="text-gray-600 mb-4 text-center">
                          Log in to access the full syllabus.
                        </p>
                        <button
                          onClick={() => router.push("/Student")}
                          className="px-4 py-2 bg-orange-600 text-white font-semibold rounded-full shadow-md hover:bg-orange-700 transition"
                        >
                          Log In
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
              <p className="mt-2 py-2 text-base md:text-lg">
                {subjectData.description2}{" "}
              </p>

              <h2 className="text-2xl font-semibold text-orange-700 mb-4">
                Syllabus Details
              </h2>
              {/* Units + Chapters */}
              {subjectData.units?.map((unit, i) => (
                <div
                  key={i}
                  className="bg-orange-100 p-4 rounded-lg mt-2 shadow-sm space-y-3"
                >
                  <h3 className="text-xl font-semibold text-orange-700">
                    {unit.unitName}
                  </h3>
                  <ul className="space-y-2 mt-2">
                    {unit.chapters?.map((chapter, j) => {
                      // Case 1: chapter is string
                      if (typeof chapter === "string") {
                        return (
                          <li
                            key={j}
                              className="bg-white p-3 rounded-lg shadow hover:bg-orange-50 transition"
                          >
                            {chapter}
                          </li>
                        );
                      }

                      // Case 2: chapter is array
                      if (Array.isArray(chapter)) {
                        return (
                           <li key={j} className="bg-white p-3 rounded-lg shadow  space-y-1">
                            {chapter.map((subItem, k) => (
                              <div
                                key={k}
                                className="pl-4 py-1 border-l-2 border-orange-300"
                              >
                                {subItem}
                              </div>
                            ))}
                          </li>
                        );
                      }

                      // Case 3: chapter is object with array inside
                      if (typeof chapter === "object" && chapter !== null) {
                        return (
                       <li key={j} className="bg-white p-3 rounded-lg shadow space-y-1">
                            {Object.entries(chapter).map(([key, value], k) => {
                              if (Array.isArray(value)) {
                                return (
                                  <div
                                    key={k}
                                    className="pl-4 py-1 border-l-2 border-orange-300"
                                  >
                                    <strong>{key}:</strong>
                                    <ul className="pl-2 list-disc">
                                      {value.map((v, idx) => (
                                        <li key={idx}>{v}</li>
                                      ))}
                                    </ul>
                                  </div>
                                );
                              }
                              return (
                                <div
                                  key={k}
                                  className="pl-4 py-1 border-l-2 border-orange-300"
                                >
                                  {key}: {value}
                                </div>
                              );
                            })}
                          </li>
                        );
                      }

                      return null;
                    })}
                  </ul>
                </div>
              ))}

              <p className="mt-2">{subjectData.description3} </p>
              <h2 className="text-2xl font-semibold text-orange-700 mb-4">
                Key Topics
              </h2>

              <ul className=" grid md:grid-cols-2 gap-4">
                {subjectData.topics?.map((topic, i) => (
                  <li
                    key={i}
                    className="bg-orange-50 p-3  rounded-lg shadow-sm hover:bg-orange-100 transition cursor-pointer"
                  >
                    {topic}
                  </li>
                ))}
              </ul>
              <p className="mt-2 py-4 text-base md:text-lg">
                {subjectData.description4}{" "}
              </p>
            </motion.div>
          </div>
          <div className="mt-4 md:mt-0  lg:mx-auto rounded-lg shadow-lg  h-fit  ">
            <DownloadFormPage />
          </div>
        </div>
        <div className=" text-center py-10 max-w-4xl mx-auto ">
          {/* Featured Courses Section */}
          <motion.div
            className="text-center py-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-black">
              Recommended Courses
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {[
                {
                  title: "12th Physics Chemistry and Maths Complete Course",
                  desc: "Complete Physics preparation for Class 12.",
                  color: "bg-white",
                  link: "/Courses/class-12-pcm-6874f1d6a4298b45d8043a62",
                },
                {
                  title: "10th Complete Crash Course",
                  desc: "Sharpen your problem-solving skills.",
                  color: "bg-white",
                  link: "/Courses/class-10-maths,science,social-science-68778960fbc9eb6a9b938bfc",
                },
                {
                  title: "8th Complete Crash Course",
                  desc: "Revise Chemistry with AI-powered notes.",
                  color: "bg-white",
                  link: "Courses/children/class-8-maths,science,social-science-6878b4e982ff71d850fc4219",
                },
              ].map((course, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  className={`p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all ${course.color}`}
                >
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  <p className="text-gray-700 mb-4">{course.desc}</p>
                  <Link
                    href={course.link}
                    className="inline-block px-4 py-2 bg-orange-600 text-white rounded-full font-semibold shadow-md hover:bg-orange-700 transition"
                  >
                    Explore Course
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <Footer1 />
      <Footer />
    </>
  );
}
