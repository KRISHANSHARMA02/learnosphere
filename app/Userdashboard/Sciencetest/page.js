'use client';
import Link from "next/link";
import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import picture from "@/public/image for website (1).png";
import Image from "next/image";
import Head from "next/head";
import Picture from "@/public/rewind-svgrepo-com (1).svg";

const SciencetestContent = () => {
  const searchParams = useSearchParams();
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");
  const subject = searchParams.get("subject"); // Get the subject from search params
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex items-center justify-center">
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="max-w-4xl w-full bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6 md:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="inline-block bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
              Practice Assessment
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold capitalize">
              {subject || "Subject"} Quiz Test
            </h1>
            <p className="text-white/90 text-sm mt-1">
              Test your concept clarity and accuracy within the allotted time limit.
            </p>
          </div>
          <button
            onClick={handleGoBack}
            className="self-start md:self-center bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors"
          >
            ← Back to Subjects
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-10 space-y-6">
          <h2 className="text-lg font-bold text-gray-800 border-b pb-3">Test Instructions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 font-bold flex items-center justify-center shrink-0 text-xs">1</span>
              <span>Each question has 4 options. Select the single best answer.</span>
            </div>
            <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 font-bold flex items-center justify-center shrink-0 text-xs">2</span>
              <span>Keep an eye on the timer. The quiz auto-submits when time runs out.</span>
            </div>
            <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 font-bold flex items-center justify-center shrink-0 text-xs">3</span>
              <span>No negative marking. Feel free to attempt every question.</span>
            </div>
            <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 font-bold flex items-center justify-center shrink-0 text-xs">4</span>
              <span>Avoid refreshing the window while the test is in progress.</span>
            </div>
          </div>

          {/* Difficulty & Start */}
          <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-full sm:w-auto">
              <label htmlFor="difficulty" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                Difficulty Level
              </label>
              <select
                id="difficulty"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="bg-gray-50 border border-gray-200 text-gray-800 px-4 py-2.5 rounded-xl font-medium text-sm focus:outline-none focus:border-orange-500"
              >
                <option value="easy">Easy (Foundational)</option>
                <option value="medium">Medium (Standard)</option>
                <option value="hard">Hard (Advanced)</option>
              </select>
            </div>

            <Link
              href={`/Userdashboard/Sciencetest/Sciencequiz?subject=${encodeURIComponent(subject || "")}&difficulty=${selectedDifficulty}`}
              className="w-full sm:w-auto"
            >
              <button className="w-full sm:w-auto px-8 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-lg shadow-orange-500/20 transition-all text-sm">
                Start Test Now →
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const Sciencetest = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <SciencetestContent />
  </Suspense>
);

export default Sciencetest;
