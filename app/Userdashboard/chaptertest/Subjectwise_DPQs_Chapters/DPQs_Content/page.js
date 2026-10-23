"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

const DPQs = () => {
  const router = useRouter();
  const [importantQuestions, setImportantQuestions] = useState([]);
  const [grade, setGrade] = useState(null);
  const [questionsPerPage, setQuestionsPerPage] = useState(6); // Default to 2 questions per page

  const searchParams = useSearchParams(); // ✅ Correct way to access query params in Next.js
  const { data: session, status } = useSession();

  // ✅ Fetch selected subject from query parameters
  const selectedSubject =
    searchParams.get("selectedSubject") || "Default Subject";

    const selectedChapterName =
    decodeURIComponent(searchParams.get("chapterName") || "Default Chapter");
    

  const [shownAnswers, setShownAnswers] = useState(new Set());

  const toggleAnswer = (questionId) => {
    setShownAnswers((prev) => {
      const next = new Set(prev);
      next.has(questionId) ? next.delete(questionId) : next.add(questionId);
      return next;
    });
  };

  // ✅ Fetch Grade and Stream from API
  useEffect(() => {
    const fetchGrade = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const response = await axios.post(
            `${WEB_BACKEND_URL}/api/route/getStudentByEmail`,
            { gmail: session.user.email }
          );
          setGrade(response.data.grade);
        } catch (error) {
          console.error("Error fetching grade:", error);
        }
      }
    };
    fetchGrade();
  }, [session, status]);

// ✅ Fetch MCQs from API
useEffect(() => {
    const fetchData = async () => {
      if (!grade || !selectedSubject || !selectedChapterName) return;
  
      try {
        const response = await fetch(
          `${WEB_BACKEND_URL}/api/route/getDPQsChapterwiseContent`, // ✅ No query params in URL
          {
            method: "POST", // ✅ Changed to POST
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              grade,
              subject: selectedSubject,
              chapter: selectedChapterName,
            }), // ✅ Send params in request body
          }
        );
  
        const data = await response.json();
        setImportantQuestions(data);
      } catch (error) {
        console.error("Error fetching MCQs:", error);
      }
    };
  
    fetchData();
  }, [grade, selectedSubject, selectedChapterName]); // ✅ Dependencies

  useEffect(() => {
    const updateQuestionsPerPage = () => {
      setQuestionsPerPage(window.innerWidth < 640 ? 7 : 6);
    };

    updateQuestionsPerPage();
    window.addEventListener("resize", updateQuestionsPerPage);
    return () => window.removeEventListener("resize", updateQuestionsPerPage);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center z-50 bg-white px-3 py-1 mb-1 md:mb-0 sm:px-4 sm:py-2 rounded-md sm:rounded-lg shadow-md hover:shadow-lg transition-shadow text-sm sm:text-base"
      >
        <FaArrowLeft className="mr-1 sm:mr-2 text-blue-600 text-sm sm:text-base" />
        <span className="text-gray-700">Back</span>
      </button>

      {/* PDF-style Pages Container */}
      <div className="max-w-4xl mx-auto px-2 sm:px-4">
        {importantQuestions.reduce((acc, question, index) => {
          if (index % questionsPerPage === 0) {
            acc.push(
              <div
                key={`page-${index / questionsPerPage}`}
                className="bg-white shadow-lg mb-4 sm:mb-6 p-4 sm:p-8 min-h-[297mm] relative print:shadow-none print:mb-0 print:page-break"
                style={{ pageBreakInside: "avoid" }}
              >
                {/* Responsive Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 sm:opacity-30 z-0">
                  <div className="text-4xl md:text-6xl lg:text-7xl font-bold -rotate-45 transform origin-center tracking-tight sm:tracking-widest">
                    <span className="text-gray-400">LEARN</span>
                    <span className="text-orange-500">O</span>
                    <span className="text-gray-400">SPHERE</span>
                  </div>
                </div>

                {/* Responsive Header */}
                <div className="border-b-2 border-gray-200 pb-2 sm:pb-4 mb-4 sm:mb-8">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
                    {selectedChapterName}
                  </h1>
                  <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 mt-1 sm:mt-2 text-sm sm:text-base text-gray-600">
                    <p>Class: {grade}</p>
                    <p>Subject: {selectedSubject}</p>
                  </div>
                </div>

                {/* Questions Container */}
                <div className="relative z-10 space-y-6 sm:space-y-12">
                  {importantQuestions
                    .slice(index, index + questionsPerPage)
                    .map((question, qIndex) => (
                      <div key={question.id} className="break-inside-avoid">
                        <div className="mb-4 sm:mb-8">
                          <h3 className="font-semibold text-base sm:text-lg md:text-xl text-gray-800 mb-2 sm:mb-4">
                            Q{index + qIndex + 1}. {question.questions}
                          </h3>

                          {/* Answer */}
                          <button
                            onClick={() => toggleAnswer(question.id)}
                            className="mt-2 sm:mt-4 p-1 sm:p-2 bg-transparent border-l-2 sm:border-l-4 border-green-500 text-sm sm:text-base w-full text-left cursor-pointer transition-colors"
                          >
                            <span className="font-semibold text-green-700">
                              Answer:
                            </span>
                            {shownAnswers.has(question.id) ? (
                              <span className="ml-1 sm:ml-2 text-green-700">
                                {question.answer}
                              </span>
                            ) : (
                              <span className="ml-1 sm:ml-2 text-blue-700 italic">
                                (Click for show answer)
                              </span>
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Responsive Footer */}
                <div className="absolute bottom-4 sm:bottom-8 left-0 right-0 text-center text-xs sm:text-sm text-gray-500">
                  Page {Math.floor(index / questionsPerPage) + 1} of{" "}
                  {Math.ceil(importantQuestions.length / questionsPerPage)} •
                  Learnosphere
                </div>
              </div>
            );
          }
          return acc;
        }, [])}
      </div>
    </div>
  );
};

export default DPQs;
