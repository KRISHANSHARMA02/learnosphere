"use client";
import React from "react";
import Head from "next/head";
import Image from "next/image";
import StudentAppImg from "@/public/studentApp.png";
import { FaGooglePlay, FaAppStore, FaRobot, FaUsers, FaCheckCircle, FaBolt, FaGraduationCap } from "react-icons/fa";

export default function AskQuestionPage() {
  return (
    <>
      <Head>
        <title>Ask a Question | Learnosphere</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen p-4 md:p-8 bg-slate-50">
        {/* Header */}
        <div className="max-w-5xl mx-auto mb-8 text-center md:text-left">
          <span className="text-orange-500 font-bold uppercase tracking-wider text-xs block mb-1">
            24/7 Academic Support
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Instant Doubt Solving & Teacher Community
          </h1>
          <p className="text-gray-500 text-sm md:text-base mt-2 max-w-2xl">
            Never get stuck while self-studying. Solve your questions instantly with our AI doubt assistant or consult our expert educator community on mobile.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: AI Doubt Solver */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-orange-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 text-orange-500 flex items-center justify-center">
                <FaRobot size={28} />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider">
                <FaBolt size={12} className="text-orange-600" /> Free AI Doubt Assistant
              </div>

              <h2 className="text-2xl font-bold text-gray-900">
                Instant AI Step-by-Step Solutions
              </h2>

              <p className="text-gray-600 text-sm leading-relaxed">
                Type or paste any query from Maths, Science, Social Studies, or Languages into our AI chatbot for immediate step-by-step answers and concept breakdowns.
              </p>

              <div className="space-y-2 pt-2">
                {[
                  "24/7 instant answers with zero wait time",
                  "Step-by-step formula and concept explanations",
                  "Available right on this dashboard (look at bottom right!)",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs md:text-sm text-gray-700">
                    <FaCheckCircle className="text-green-500 shrink-0" size={14} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-100">
              <div className="bg-orange-50 rounded-2xl p-4 text-center">
                <p className="text-xs font-semibold text-orange-700">
                  👉 Click the orange <strong>AI Robot button</strong> at the bottom right corner of your screen to ask your doubt now!
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Teacher Community on App */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-700 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 text-orange-400 flex items-center justify-center">
                <FaUsers size={28} />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-bold uppercase tracking-wider">
                <FaGraduationCap size={14} /> Educator Community Support
              </div>

              <h2 className="text-2xl font-bold text-white">
                Expert Teacher Doubt Forum
              </h2>

              <p className="text-slate-300 text-sm leading-relaxed">
                Need personalized help from real subject teachers? Post your questions on the Learnosphere Mobile App community and receive handwritten explanations and audio guidance.
              </p>

              <div className="space-y-2 pt-2">
                {[
                  "Verified teachers review and clarify doubts",
                  "Voice notes and handwritten step solutions",
                  "Student discussion groups for CBSE & ICSE",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs md:text-sm text-slate-200">
                    <FaCheckCircle className="text-green-400 shrink-0" size={14} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-700/60">
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://play.google.com/store/apps/details?id=com.karotaraj.learnosphere_main"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-white text-gray-900 px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-orange-50 transition-all shadow"
                >
                  <FaGooglePlay className="text-green-600" size={16} /> Google Play
                </a>
                <a
                  href="https://apps.apple.com/in/app/learnosphere-learning-app/id6748979882"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-white/20 transition-all shadow"
                >
                  <FaAppStore size={18} /> App Store
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom App Showcase Banner */}
        <div className="max-w-5xl mx-auto mt-8 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 rounded-3xl p-6 md:p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left flex-1">
            <h3 className="text-2xl font-extrabold text-white">
              Get 100% Free Instant Doubt Clearing on Mobile
            </h3>
            <p className="text-white/90 text-sm max-w-xl">
              Snap a picture of your textbook question and get instant step-by-step solutions verified by top educators. Download the Learnosphere Mobile App today!
            </p>
          </div>
          <div className="w-40 md:w-48 shrink-0 flex justify-center">
            <Image
              src={StudentAppImg}
              alt="Ask Question on App"
              width={180}
              height={180}
              className="object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </>
  );
}
