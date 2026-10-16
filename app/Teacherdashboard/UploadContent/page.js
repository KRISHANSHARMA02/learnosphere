"use client";
import React, { useState } from "react";
import UploadNotes from "../UploadContent/pdf/page";
import UploadVideos from "../UploadContent/ConceptVideos/page";
import { BsPersonVideo3, BsCameraVideoFill } from "react-icons/bs";
import { AiOutlineFilePdf, AiOutlineCloudUpload } from "react-icons/ai";
import { FaCheckCircle, FaLightbulb, FaShieldAlt, FaMobileAlt, FaArrowLeft } from "react-icons/fa";
import { MdCurrencyRupee, MdOutlineAutoGraph } from "react-icons/md";
import TeacherAppBanner from "@/components/TeacherAppBanner";

const UploadContent = () => {
  const [uploadNotes, setUploadNotes] = useState(false);
  const [uploadVideos, setUploadVideos] = useState(false);

  if (uploadNotes) {
    return (
      <div className="w-full space-y-4">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 md:px-8 pt-3">
          <button
            onClick={() => setUploadNotes(false)}
            className="inline-flex items-center gap-2 text-xs font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 border border-orange-200 px-4 py-2 rounded-xl transition-all shadow-sm"
          >
            <FaArrowLeft /> Back to Creator Studio
          </button>
        </div>
        <UploadNotes />
      </div>
    );
  }

  if (uploadVideos) {
    return (
      <div className="w-full space-y-4">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 md:px-8 pt-3">
          <button
            onClick={() => setUploadVideos(false)}
            className="inline-flex items-center gap-2 text-xs font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 border border-orange-200 px-4 py-2 rounded-xl transition-all shadow-sm"
          >
            <FaArrowLeft /> Back to Creator Studio
          </button>
        </div>
        <UploadVideos />
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 md:px-8 py-4 sm:py-6 space-y-6 sm:space-y-8 font-sans antialiased">
      {/* 🚀 Header */}
      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-black/20 text-white">
            <MdOutlineAutoGraph /> Educator Creator Studio
          </span>
          <h1 className="text-xl sm:text-2xl md:text-4xl font-extrabold tracking-tight">
            Monetize Your Teaching Content
          </h1>
          <p className="text-white/90 text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed">
            Upload study notes, chapter summaries, and concept videos. Earn cash rewards, royalties, and build your educator brand with thousands of students.
          </p>
        </div>
      </div>

      {/* 📥 Upload Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Card 1: Upload Notes */}
        <div className="bg-white border-2 border-slate-100 hover:border-orange-300 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <AiOutlineFilePdf size={28} />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                PDF & Docs
              </span>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                Upload Study Notes & Solutions
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Share handwritten notes, formula sheets, sample papers, or textbook solutions.
              </p>
            </div>

            <ul className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-4">
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500 shrink-0" />
                <span>Earn per verified download by students</span>
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500 shrink-0" />
                <span>PDF format supported (clean scan or digital)</span>
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500 shrink-0" />
                <span>Fast 24-hour verification & reward approval</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => setUploadNotes(true)}
            className="mt-6 w-full py-3 sm:py-3.5 px-4 sm:px-6 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-orange-600/20 transition-all flex items-center justify-center gap-2"
          >
            <AiOutlineCloudUpload size={20} />
            Proceed to Upload Notes
          </button>
        </div>

        {/* Card 2: Upload Videos */}
        <div className="bg-white border-2 border-slate-100 hover:border-orange-300 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <BsPersonVideo3 size={28} />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                MP4 Video
              </span>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                Upload Concept & Solution Videos
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Explain difficult concepts, solve past exam questions, and conduct micro-lessons.
              </p>
            </div>

            <ul className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-4">
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500 shrink-0" />
                <span>High student engagement & monthly royalties</span>
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500 shrink-0" />
                <span>Supports 720p/1080p recorded lessons</span>
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500 shrink-0" />
                <span>Boosts your tutor profile ranking 5x</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => setUploadVideos(true)}
            className="mt-6 w-full py-3 sm:py-3.5 px-4 sm:px-6 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-orange-600/20 transition-all flex items-center justify-center gap-2"
          >
            <BsCameraVideoFill size={18} />
            Proceed to Upload Videos
          </button>
        </div>
      </div>

      {/* 💡 Guidelines Grid */}
      <div className="bg-slate-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-slate-200/80 space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-sm sm:text-base">
          <FaLightbulb className="text-amber-500" /> Content Quality Guidelines
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 text-xs text-slate-600">
          <div className="p-3.5 sm:p-4 bg-white rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm">
            <span className="font-bold text-slate-800 block mb-1">Clear Explanations</span>
            Use a blackboard, whiteboard, or clean digital tablet to make complex steps easy to follow.
          </div>
          <div className="p-3.5 sm:p-4 bg-white rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm">
            <span className="font-bold text-slate-800 block mb-1">High Audio Quality</span>
            Ensure clean voice narration with minimal background noise so students can hear you crisp and clear.
          </div>
          <div className="p-3.5 sm:p-4 bg-white rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm">
            <span className="font-bold text-slate-800 block mb-1">Original Material</span>
            Upload self-authored notes or verified solutions to qualify for maximum verified payouts.
          </div>
        </div>
      </div>

      {/* 📱 Mobile App Studio Prompt */}
      <TeacherAppBanner
        title="Upload & Stream Videos Instantly from the Tutor Mobile App!"
        subtitle="Did you know? You can record lessons, trim clips, and upload directly from your smartphone using the Learnosphere Tutor App. Plus, monitor video views and student comments in real time."
        badge="📱 MOBILE CREATOR STUDIO"
      />
    </div>
  );
};

export default UploadContent;
