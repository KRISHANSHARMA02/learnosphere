"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import {
  FaUserCircle,
  FaCheckCircle,
  FaGlobe,
  FaDesktop,
} from "react-icons/fa";
import AppLoader from "@/components/widgets/AppLoader";

function InstructionsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const examId = searchParams.get("id");

  const [isChecked, setIsChecked] = useState(false);
  const [examData, setExamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState("English"); // Default Language

  useEffect(() => {
    if (examId) {
      axios
        .get(
          `https://learnospherebackend.learnosphere.in/api/route/exam/${examId}`,
        )
        .then((res) => {
          setExamData(res.data.examDetails);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching instructions:", err);
          setLoading(false);
        });
    }
  }, [examId]);

  const handleProceed = () => {
    if (isChecked) {
      router.push(`/test-series/live?id=${examId}`);
    }
  };

  if (loading) {
    return (
      <>
        <AppLoader />
      </>
    );
  }

  if (!examData) {
    return (
      <div className="min-h-screen flex items-center justify-center font-bold text-red-500 text-xl">
        Error: Exam details not found!
      </div>
    );
  }

  return (
    <div className="bg-[#eef0f4] min-h-screen font-sans flex flex-col">
      {/* 🚀 MAIN CONTENT GRID */}
      <div className="flex-grow container mx-auto max-w-7xl p-4 md:p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* LEFT SIDE: Instructions (75% width) */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="bg-orange-50 px-6 py-4 border-b border-orange-100 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-black text-gray-900 uppercase">
                  {examData.examName}
                </h1>
                <p className="text-gray-600 font-medium text-sm mt-1">
                  Duration: {examData.timeDuration} &nbsp;|&nbsp; Max Marks:{" "}
                  {examData.maxMarks}
                </p>
              </div>
            </div>

            {/* Scrollable Instructions Area */}
            <div className="p-6 text-gray-700 space-y-6 text-sm md:text-base overflow-y-auto max-h-[50vh]">
              <div>
                <h2 className="font-bold text-lg text-gray-900 mb-4 bg-gray-100 p-2 rounded-md">
                  General Instructions:
                </h2>
                <ul className="list-decimal pl-6 space-y-3 font-medium text-gray-600">
                  {examData.instructions.map((rule, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <h2 className="font-bold text-lg text-gray-900 mb-4 bg-gray-100 p-2 rounded-md">
                  Question Palette Color Codes:
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                    <div className="w-6 h-6 rounded-full bg-gray-100 border border-gray-300 shrink-0"></div>
                    <span className="text-xs font-bold text-gray-600">
                      Not Visited
                    </span>
                  </div>
                  <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                    <div className="w-6 h-6 rounded-full bg-green-500 shrink-0"></div>
                    <span className="text-xs font-bold text-gray-600">
                      Answered
                    </span>
                  </div>
                  <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                    <div className="w-6 h-6 rounded-full border-2 border-orange-500 shrink-0"></div>
                    <span className="text-xs font-bold text-gray-600">
                      Current Question
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Declaration & Proceed Button */}
            <div className="mt-auto bg-gray-50 p-6 border-t border-gray-200">
              <label className="flex items-start gap-3 cursor-pointer group bg-white p-4 rounded-lg border border-gray-200 shadow-sm transition-all hover:border-orange-300">
                <input
                  type="checkbox"
                  className="mt-1 w-5 h-5 text-orange-500 rounded border-gray-300 focus:ring-orange-500 cursor-pointer"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
                <span className="text-xs md:text-sm font-medium text-gray-600 group-hover:text-gray-900">
                  I have read and understood the instructions. All computer
                  hardware allotted to me are in proper working condition. I
                  agree that in case of not adhering to the instructions, I
                  shall be debarred from the test.
                </span>
              </label>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleProceed}
                  disabled={!isChecked}
                  className={`font-black py-3 px-12 rounded-lg transition-all duration-300 shadow-sm text-lg tracking-wide uppercase ${
                    isChecked
                      ? "bg-orange-500 hover:bg-orange-600 text-white hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Proceed
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: User Profile & System Check (25% width) */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          {/* User Profile Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-lg border-2 border-gray-300 flex items-center justify-center mb-4 overflow-hidden">
              <FaUserCircle className="text-gray-300 text-7xl mt-2" />
            </div>
            <h3 className="font-black text-gray-900 text-lg uppercase">
              Nikunj Varshney
            </h3>
            <p className="text-gray-500 text-xs font-bold mt-1 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
              Roll No: {Math.floor(Math.random() * 900000) + 100000}
            </p>
          </div>

          {/* System Check Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="font-bold text-gray-800 border-b border-gray-100 pb-2 mb-4 text-sm uppercase flex items-center gap-2">
              <FaDesktop className="text-gray-500" /> System Status
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 font-medium">Browser</span>
                <span className="flex items-center gap-1 text-green-500 font-bold bg-green-50 px-2 py-0.5 rounded text-xs border border-green-100">
                  <FaCheckCircle /> Chrome
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 font-medium">Network</span>
                <span className="flex items-center gap-1 text-green-500 font-bold bg-green-50 px-2 py-0.5 rounded text-xs border border-green-100">
                  <FaCheckCircle /> Stable
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600 font-medium">Webcam</span>
                <span className="text-gray-400 font-bold bg-gray-50 px-2 py-0.5 rounded text-xs border border-gray-200">
                  Not Required
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InstructionsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f4f5f8] flex items-center justify-center font-bold text-orange-500 text-xl">
          Loading Portal...
        </div>
      }
    >
      <InstructionsContent />
    </Suspense>
  );
}
