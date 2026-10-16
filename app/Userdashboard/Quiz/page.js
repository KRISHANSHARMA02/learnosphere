"use client";
import React from "react";
import { CiCircleQuestion } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
import { BsFileEarmarkSpreadsheet } from "react-icons/bs";
import { FaGooglePlay, FaAppStore, FaRocket, FaFire, FaCheckCircle, FaStar, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import StudentAppImg from "@/public/studentApp.png";

const SAMPLE_QUIZZES = [
  {
    id: "math",
    title: "Mathematics Mastery Quiz",
    category: "Maths",
    questions: "15 Qs",
    time: "15 Mins",
    marks: "15 Marks",
    badge: "Recommended",
    badgeColor: "bg-orange-100 text-orange-700",
  },
  {
    id: "science",
    title: "Science Concept Drill",
    category: "Science",
    questions: "20 Qs",
    time: "20 Mins",
    marks: "20 Marks",
    badge: "Trending",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    id: "social",
    title: "Social Studies Fact Check",
    category: "Social Science",
    questions: "15 Qs",
    time: "15 Mins",
    marks: "15 Marks",
    badge: "Standard",
    badgeColor: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "english",
    title: "Grammar & Reading Comprehension",
    category: "English",
    questions: "10 Qs",
    time: "10 Mins",
    marks: "10 Marks",
    badge: "Quick Drill",
    badgeColor: "bg-purple-100 text-purple-700",
  },
];

const Quiz = () => {
  return (
    <>
      <Head>
        <title>Interactive Quizzes | Learnosphere</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen p-4 md:p-6 bg-slate-50">
        {/* Header Section */}
        <div className="max-w-6xl mx-auto mb-8">
          <span className="text-orange-500 font-bold uppercase tracking-wider text-xs block mb-1">
            Real-time Knowledge Check
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
            Interactive Subject Quizzes
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Test your knowledge with quick web drills or unlock 20+ comprehensive quizzes per subject on mobile.
          </p>
        </div>

        {/* Big App Feature Showcase */}
        <div className="max-w-6xl mx-auto mb-10 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 rounded-3xl p-6 md:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 flex-1 text-center md:text-left">
            <span className="inline-block bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full">
              Mobile App Exclusive
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
              Unlock 20+ Free Chapter Quizzes Per Subject on Mobile!
            </h2>
            <p className="text-white/90 text-sm md:text-base max-w-xl leading-relaxed">
              Don't stop at single drills. Download the Learnosphere Mobile App to attempt unlimited practice tests, compete on daily leaderboards, and get instant explanations for every question.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
              <a
                href="https://play.google.com/store/apps/details?id=com.karotaraj.learnosphere_main"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 bg-white text-gray-900 px-5 py-3 rounded-2xl text-xs md:text-sm font-bold hover:bg-orange-50 transition-all shadow-md"
              >
                <FaGooglePlay className="text-green-600" size={18} /> Google Play
              </a>
              <a
                href="https://apps.apple.com/in/app/learnosphere-learning-app/id6748979882"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 bg-black/40 backdrop-blur-sm border border-white/30 text-white px-5 py-3 rounded-2xl text-xs md:text-sm font-bold hover:bg-black/60 transition-all shadow-md"
              >
                <FaAppStore size={20} /> App Store
              </a>
            </div>
          </div>
          <div className="w-48 md:w-56 shrink-0 flex justify-center">
            <Image
              src={StudentAppImg}
              alt="20+ Subject Quizzes on App"
              width={220}
              height={220}
              className="object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Quizzes List */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-5 bg-orange-500 rounded-full inline-block"></span>
            Featured Diagnostic Quizzes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SAMPLE_QUIZZES.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${quiz.badgeColor}`}>
                      {quiz.badge}
                    </span>
                    <span className="text-xs font-semibold text-gray-400">
                      {quiz.category}
                    </span>
                  </div>

                  <h3 className="font-bold text-gray-900 text-lg mb-2">
                    {quiz.title}
                  </h3>

                  <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 my-4">
                    <span className="flex items-center gap-1 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                      <CiCircleQuestion size={16} className="text-orange-500" /> {quiz.questions}
                    </span>
                    <span className="flex items-center gap-1 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                      <IoMdTime size={16} className="text-orange-500" /> {quiz.time}
                    </span>
                    <span className="flex items-center gap-1 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                      <BsFileEarmarkSpreadsheet size={14} className="text-orange-500" /> {quiz.marks}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Free Web Drill
                  </span>
                  <Link href="/Userdashboard/Quiz/quizdescription">
                    <button className="px-5 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-xs shadow-md shadow-orange-500/20 transition-all flex items-center gap-1.5">
                      Start Now <FaArrowRight size={10} />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Quiz;
