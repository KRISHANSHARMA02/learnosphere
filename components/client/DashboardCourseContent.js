"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  FaArrowLeft,
  FaPlay,
  FaFilePdf,
  FaCheckCircle,
  FaMobileAlt,
  FaGooglePlay,
  FaAppStore,
  FaPlayCircle,
  FaFileAlt,
  FaClipboardList,
  FaLayerGroup,
} from "react-icons/fa";

export default function SubjectContent({ contentData, subject }) {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("videos");
  const [content, setContent] = useState({ videos: [], notes: [], tests: [] });
  const [loading, setLoading] = useState(true);

  // Media Viewer State
  const [viewMode, setViewMode] = useState("list"); // 'list', 'player', 'pdf'
  const [activeMedia, setActiveMedia] = useState(null);

  // ✅ When serverData becomes available, set loading false
  useEffect(() => {
    if (contentData) {
      setContent(contentData);
      setLoading(false);
    }
  }, [contentData]);

  // --- HANDLERS ---
  const handleBack = () => {
    if (viewMode !== "list") {
      setViewMode("list");
      setActiveMedia(null);
    } else {
      router.back();
    }
  };

  // --- RENDERERS ---

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center">
        Loading Content...
      </div>
    );

  // 1. VIDEO PLAYER VIEW
  if (viewMode === "player" && activeMedia) {
    return (
      <div className="flex flex-col h-screen bg-black text-white">
        <div className="p-4 flex items-center gap-4 bg-slate-900 border-b border-slate-800">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-slate-800 rounded-full"
          >
            <FaArrowLeft size={20} />
          </button>
          <div>
            <h2 className="font-bold text-lg line-clamp-1">
              {activeMedia.title}
            </h2>
            <p className="text-xs text-slate-400">Video Player</p>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center bg-black">
          <div className="w-full max-w-5xl aspect-video bg-slate-900 rounded-lg overflow-hidden relative">
            <video
              src={activeMedia.url}
              controls
              className="w-full h-full"
              controlsList="nodownload"
              autoPlay
            />
          </div>
        </div>
      </div>
    );
  }

  // 2. PDF VIEWER VIEW
  if (viewMode === "pdf" && activeMedia) {
    return (
      <div className="flex flex-col h-screen bg-slate-100">
        <div className="p-4 flex items-center gap-4 bg-white border-b border-slate-200 shadow-sm">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-700"
          >
            <FaArrowLeft size={20} />
          </button>
          <div>
            <h2 className="font-bold text-lg text-slate-800 line-clamp-1">
              {activeMedia.title}
            </h2>
            <p className="text-xs text-slate-500">PDF Viewer</p>
          </div>
        </div>
        <div className="flex-1 p-6 flex justify-center overflow-y-auto">
          <iframe
            src={`${activeMedia.url}#toolbar=0`}
            className="w-full max-w-5xl h-full bg-white shadow-lg rounded-lg border border-slate-200"
            title="PDF"
          />
        </div>
      </div>
    );
  }

  // 3. MAIN LIST VIEW
  return (
    <div className="flex flex-col h-full bg-slate-50 font-sans text-slate-800">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex-shrink-0 z-20">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
          >
            <FaArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-900">{subject}</h1>
            <p className="text-xs text-slate-500">Course Content</p>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white px-6 border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="flex gap-8">
          <button
            onClick={() => setActiveTab("videos")}
            className={`flex items-center gap-2 py-4 text-sm font-bold border-b-2 transition-colors ${
              activeTab === "videos"
                ? "border-orange-600 text-orange-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <FaPlayCircle size={18} /> Videos{" "}
            <span className="bg-slate-100 text-slate-600 px-2 rounded-full text-xs py-0.5">
              {content.videos.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("notes")}
            className={`flex items-center gap-2 py-4 text-sm font-bold border-b-2 transition-colors ${
              activeTab === "notes"
                ? "border-orange-600 text-orange-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <FaFileAlt size={18} /> Notes{" "}
            <span className="bg-slate-100 text-slate-600 px-2 rounded-full text-xs py-0.5">
              {content.notes.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("tests")}
            className={`flex items-center gap-2 py-4 text-sm font-bold border-b-2 transition-colors ${
              activeTab === "tests"
                ? "border-orange-600 text-orange-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <FaClipboardList size={18} /> Tests
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        <div className="max-w-4xl mx-auto">
          {/* VIDEOS TAB */}
          {activeTab === "videos" && (
            <div className="space-y-4">
              {content.videos.length > 0 ? (
                content.videos.map((video) => (
                  <div
                    key={video.id}
                    onClick={() => {
                      setActiveMedia(video);
                      setViewMode("player");
                    }}
                    className="flex items-center p-4 bg-white rounded-xl border border-slate-200 
                     hover:border-orange-600 hover:shadow-lg cursor-pointer transition-all group"
                  >
                    {/* ✅ Realistic LearnOsphere Thumbnail */}
                    <div
                      className="relative w-32 h-20 rounded-xl overflow-hidden 
                       bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 
                       flex items-center justify-center text-white shrink-0 
                       shadow-md group-hover:shadow-xl group-hover:scale-[1.03] 
                       transition-all duration-300"
                    >
                      {/* Optional texture overlay */}
                      <div className="absolute inset-0 opacity-10 mix-blend-overlay"></div>

                      {/* Play Icon */}
                      <div
                        className="relative bg-white/80 backdrop-blur-md w-10 h-10 rounded-full 
                            flex items-center justify-center shadow-lg"
                      >
                        <FaPlay size={16} className="text-orange-600" />
                      </div>

                      {/* Branding */}
                      <div className="absolute bottom-1 left-2 text-[9px] font-bold tracking-wide opacity-95">
                        Learn<span className="text-black">O</span>sphere
                      </div>
                    </div>

                    {/* Title + Details */}
                    <div className="ml-4 flex-1">
                      <h3 className="font-semibold text-slate-900 group-hover:text-orange-600 transition-colors">
                        {video.title}
                      </h3>

                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                        <p>Video Content</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-slate-500">
                  No videos available.
                </div>
              )}
            </div>
          )}
          {/* NOTES TAB */}
          {activeTab === "notes" && (
            <div className="space-y-3">
              {content.notes.length > 0 ? (
                content.notes.map((note) => (
                  <div
                    key={note.id}
                    onClick={() => {
                      setActiveMedia(note);
                      setViewMode("pdf");
                    }}
                    className="flex items-center p-4 bg-white rounded-xl border border-slate-200 hover:border-red-300 hover:shadow-md cursor-pointer transition-all group"
                  >
                    <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0 group-hover:bg-red-500 group-hover:text-white transition-colors">
                      <FaFilePdf size={18} />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="font-semibold text-slate-900 group-hover:text-red-700">
                        {note.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        PDF Document
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-slate-500">
                  No notes available.
                </div>
              )}
            </div>
          )}

          {/* TESTS TAB (Mobile App Promotion - No Locks) */}
          {activeTab === "tests" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div
                className="w-full relative overflow-hidden rounded-2xl bg-gradient-to-br 
                    from-slate-900 via-slate-800 to-slate-900 text-white shadow-xl 
                    p-8 md:p-12 flex flex-col md:flex-row items-center gap-10"
              >
                {/* Glow Background Shapes */}
                <div
                  className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full 
                      blur-[80px] opacity-20 -mr-20 -mt-20 pointer-events-none"
                ></div>
                <div
                  className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500 rounded-full 
                      blur-[60px] opacity-10 -ml-10 -mb-10 pointer-events-none"
                ></div>

                {/* Left Side Content */}
                <div className="flex-1 text-center md:text-left z-10">
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full 
                        bg-orange-500/10 border border-orange-500/20 text-orange-400 
                        text-xs font-bold uppercase tracking-wider mb-4"
                  >
                    <FaMobileAlt /> Learnosphere App
                  </div>

                  <h2 className="text-3xl font-bold mb-3">
                    Unlock Tests & Quizzes on Mobile
                  </h2>

                  <p className="text-slate-400 mb-6 text-sm leading-relaxed">
                    Download our app to access chapter-wise tests, daily
                    quizzes, performance analytics, and leaderboard rankings.
                    Track your growth and compete with other learners.
                  </p>

                  {/* Download Buttons */}
                  <div className="flex gap-3 justify-center md:justify-start">
                    {/* Google Play */}
                    <a
                      href="https://play.google.com/store/apps/details?id=com.karotaraj.learnosphere_main"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-white text-slate-900 px-4 py-2 
                       rounded-lg hover:bg-orange-50 transition-colors"
                    >
                      <FaGooglePlay size={18} className="text-green-600" />
                      <div className="text-left leading-none">
                        <div className="text-[9px] font-bold text-slate-500 uppercase">
                          Get it on
                        </div>
                        <div className="text-xs font-bold">Google Play</div>
                      </div>
                    </a>

                    {/* App Store */}
                    <a
                      href="https://apps.apple.com/in/app/learnosphere-learning-app/id6748979882"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-white/10 text-white px-4 py-2 
                       border border-white/10 rounded-lg hover:bg-white/20 transition-colors"
                    >
                      <FaAppStore size={20} />
                      <div className="text-left leading-none">
                        <div className="text-[9px] font-bold text-slate-300 uppercase">
                          Download on
                        </div>
                        <div className="text-xs font-bold">App Store</div>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Right Side — Features Instead of Locked Items */}
                <div
                  className="flex-1 z-10 bg-white/5 border border-white/10 p-6 rounded-xl 
                      backdrop-blur-sm max-w-sm w-full"
                >
                  <h4
                    className="text-sm font-bold mb-4 flex items-center gap-2 
                       text-white border-b border-white/10 pb-3"
                  >
                    <FaLayerGroup className="text-orange-400" /> What you'll get
                  </h4>

                  <ul className="space-y-3 text-sm text-slate-300">
                    <li className="flex items-start gap-3">
                      <FaCheckCircle className="text-green-400 mt-0.5" />
                      <span>Chapter-wise Tests and Mock Exams</span>
                    </li>

                    <li className="flex items-start gap-3">
                      <FaCheckCircle className="text-green-400 mt-0.5" />
                      <span>Live Leaderboard Ranking System</span>
                    </li>

                    <li className="flex items-start gap-3">
                      <FaCheckCircle className="text-green-400 mt-0.5" />
                      <span>Detailed Performance Analysis</span>
                    </li>

                    <li className="flex items-start gap-3">
                      <FaCheckCircle className="text-green-400 mt-0.5" />
                      <span>Daily Quizzes & Current Affairs Tests</span>
                    </li>

                    <li className="flex items-start gap-3">
                      <FaCheckCircle className="text-green-400 mt-0.5" />
                      <span>Instant Results & Solutions</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
