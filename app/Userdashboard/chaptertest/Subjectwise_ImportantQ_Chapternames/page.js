"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FaQuestionCircle, FaBook } from "react-icons/fa"; // Add more icons for better visual appeal
import axios from "axios";
import { useSession } from "next-auth/react";
import { IoRemoveOutline } from "react-icons/io5"; // Importing IoRemoveOutline for the icon
import { FaExclamationCircle } from "react-icons/fa"; // Importing Exclamation Circle for error message
import { FaSpinner } from "react-icons/fa"; // Importing Spinner for loading state

const SubjectwiseImpQ = () => {
  const [chapters, setChapters] = useState([]);
  const router = useRouter();
  const { data: session, status } = useSession();
  const [grade, setGrade] = useState(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null); // ✅ Error state
  const [loading, setLoading] = useState(true); // ✅ Loading state

  const searchParams = useSearchParams(); // ✅ Correct way to access query params in Next.js

  // ✅ Fetch selected subject from query parameters
  const selectedSubject =
    searchParams.get("selectedSubject") || "Default Subject";

  useEffect(() => {
    const fetchGrade = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const response = await axios.post(
            "https://learnospherebackend.learnosphere.in/api/route/getStudentByEmail",
            { gmail: session.user.email }
          );
          setGrade(response.data.grade);
          setStream(response.data.stream);
        } catch (error) {
          console.error("Error fetching grade:", error);
        }
      }
    };
    fetchGrade();
  }, [session, status]);

  useEffect(() => {
    if (!grade || !selectedSubject) return; // Ensure all dependencies are available
    const fetchChapters = async () => {
      try {
        const response = await axios.get(
          `https://learnospherebackend.learnosphere.in/api/route/getImportantQuestionsChaptername?subject=${selectedSubject}&grade=${grade}&stream=${stream}`
        );
        // Replace with your actual API URL
        if (response.data.length === 0) {
          setError(
            "No chapters found for this subject. We are updating the content soon! 🚀"
          );
        } else {
          setChapters(response.data);
        }
      } catch (error) {
        console.error("Error fetching chapters:", error);
        setError("Failed to load chapters. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchChapters();
  }, [selectedSubject, grade, stream]); // ✅ Added stream to dependencies

  const handleChapterClick = (chapterName) => {
    const encodedChapterName = encodeURIComponent(chapterName);
    router.push(
      `/Userdashboard/chaptertest/Subjectwise_ImportantQ_Chapternames/ImportantQuestions_content?selectedSubject=${selectedSubject}&chapterName=${encodedChapterName}`
    );
  };

  return (
    <div className="min-h-screen bg-white font-Poppins p-6 flex flex-col items-center">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="self-start flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>
      <div className="flex flex-col items-center mb-2">
        <h2 className="text-3xl font-semibold text-gray-800">Chapters Title</h2>
        <IoRemoveOutline size={70} />
      </div>

      <div className="w-full flex flex-col gap-6">
        {loading ? (
          <div className="flex items-center justify-center h-16 text-gray-500">
            <p className="text-lg font-semibold">Loading chapters...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 text-red-600 p-4 rounded-lg flex items-center justify-center flex-col shadow-md">
            <FaExclamationCircle className="text-3xl mb-2" />
            <p className="text-lg font-semibold">{error}</p>
          </div>
        ) : (
          chapters.map((chapter) => (
            <div
              key={chapter.chapter_number}
              onClick={() => handleChapterClick(chapter.topic)}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl border transition-all transform hover:scale-105 cursor-pointer flex justify-between items-center w-full"
            >
              <div className="flex flex-col w-full">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                  <FaBook className="mr-2 text-blue-500" /> {/* Book Icon */}
                  {chapter.chapter_number}. {chapter.topic}
                </h3>
                <div className="flex items-center text-gray-600">
                  <FaQuestionCircle className="mr-2 text-yellow-500" />{" "}
                  {/* Question Icon */}
                  <p className="font-medium">
                    Total Questions:{" "}
                    <span className="font-bold">{chapter.question_count}</span>
                  </p>
                </div>
              </div>
              <FaArrowRight className="text-gray-600 text-2xl" />{" "}
              {/* Arrow at the end */}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SubjectwiseImpQ;
