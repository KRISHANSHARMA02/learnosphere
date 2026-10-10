"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaArrowLeft, FaArrowRight, FaExclamationCircle, FaBook, FaSpinner } from "react-icons/fa";
import axios from "axios";
import { useSession } from "next-auth/react";
import { IoRemoveOutline } from "react-icons/io5"; 

const SubjectwiseDPQs = () => {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Loading state
  const [error, setError] = useState(null); // ✅ Error state
  const router = useRouter();
  const { data: session, status } = useSession();
  const [grade, setGrade] = useState(null);
  const [stream, setStream] = useState(null);

  const searchParams = useSearchParams();
  const selectedSubject = searchParams.get("selectedSubject") || "Default Subject";

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
    const fetchChapters = async () => {
      setLoading(true);
      setError(null);
      if (!grade || !selectedSubject) return; // Ensure all dependencies are available
      try {
        const response = await axios.get(
          `https://learnospherebackend.learnosphere.in/api/route/getChapterName&QuestionsCount?subject=${selectedSubject}&grade=${grade}&stream=${stream}`
        );
        if (response.data.length === 0) {
          setError("No chapters found for this subject. We are updating the content soon! 🚀");
        } else {
          setChapters(response.data);
        }
      } catch (error) {
        setError("Failed to load chapters. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (selectedSubject && grade && stream) {
      fetchChapters();
    }
  }, [selectedSubject, grade, stream]);

  const handleChapterClick = (chapterName) => {
    router.push(
      `/Userdashboard/chaptertest/Subjectwise_MCQs_ChapterNames/MCQs_Content?selectedSubject=${selectedSubject}&chapterName=${chapterName}`
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

      <div className="flex flex-col items-center mb-4">
        <h2 className="text-3xl font-semibold text-gray-800">Chapters Title</h2>
        <IoRemoveOutline size={70} />
      </div>

      <div className="w-full flex flex-col gap-6">
        {loading ? (
          <div className="flex flex-col items-center text-gray-500">
            <FaSpinner className="animate-spin text-4xl mb-2" />
            <p>Loading chapters...</p>
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
              onClick={() => handleChapterClick(chapter.chapter_name)}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl border transition-all transform hover:scale-105 cursor-pointer flex justify-between items-center w-full"
            >
              <div className="flex flex-col w-full">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                  <FaBook className="mr-2 text-blue-500" />
                  {chapter.chapter_number}. {chapter.chapter_name}
                </h3>
                <div className="flex items-center text-gray-600">
                  <p className="font-medium">
                    Total Questions: <span className="font-bold">{chapter.question_count}</span>
                  </p>
                </div>
              </div>
              <FaArrowRight className="text-gray-600 text-2xl" />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SubjectwiseDPQs;
