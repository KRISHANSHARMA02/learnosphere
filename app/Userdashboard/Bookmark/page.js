"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useSession } from "next-auth/react";
import {
  Bookmark,
  BookmarkCheck,
  BookOpen,
  Video,
  FileText,
  ExternalLink,
  Trash2,
  Sparkles,
  HelpCircle,
  Play,
  ArrowRight,
  Smartphone,
  Download,
  Flame,
  CheckCircle2,
} from "lucide-react";
import { SiGoogleplay, SiApple } from "react-icons/si";
import StudentAppImg from "@/public/studentApp.png";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.karotaraj.learnosphere_main";
const APP_STORE_URL =
  "https://apps.apple.com/in/app/learnosphere-learning-app/id6748979882";

export default function BookmarkPage() {
  const { data: session, status } = useSession();
  const [grade, setGrade] = useState(null);
  const [registrationNumber, setRegistrationNumber] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookMarks, setBookMarks] = useState([]);
  const [videoBookmarks, setVideoBookmarks] = useState([]);
  const [activeTab, setActiveTab] = useState("all"); // 'all', 'notes', 'videos'
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showAllNotes, setShowAllNotes] = useState(false);
  const [showAllVideos, setShowAllVideos] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const response = await axios.post(
            "https://learnospherebackend.learnosphere.in/api/route/getStudentByEmail",
            { gmail: session.user.email }
          );
          setGrade(response.data.grade);
          setRegistrationNumber(response.data.registrationNumber);
        } catch (error) {
          console.error("Error Fetching Student Profile:", error);
        }
      }
    };
    fetchUserData();
  }, [session, status]);

  useEffect(() => {
    const fetchAllBookmarks = async () => {
      if (!registrationNumber || !grade) return;
      setLoading(true);

      try {
        const [notesRes, videoRes] = await Promise.allSettled([
          axios.post(
            "https://learnospherebackend.learnosphere.in/api/route/getBookmark",
            {
              userId: registrationNumber,
              grade: grade,
            }
          ),
          axios.post(
            "https://learnospherebackend.learnosphere.in/api/route/getVideoBookmark",
            {
              userId: registrationNumber,
              grade: grade,
            }
          ),
        ]);

        if (notesRes.status === "fulfilled" && Array.isArray(notesRes.value?.data?.message)) {
          setBookMarks(notesRes.value.data.message);
        } else {
          setBookMarks([]);
        }

        if (videoRes.status === "fulfilled" && Array.isArray(videoRes.value?.data?.message)) {
          setVideoBookmarks(videoRes.value.data.message);
        } else {
          setVideoBookmarks([]);
        }
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllBookmarks();
  }, [registrationNumber, grade]);

  const handleRemoveBookmark = async (fileId) => {
    if (!registrationNumber) return;
    try {
      await axios.post(
        "https://learnospherebackend.learnosphere.in/api/route/removeBookmark",
        {
          userId: registrationNumber,
          fileId,
        }
      );
      setBookMarks((prev) => prev.filter((file) => file.fileId !== fileId));
    } catch (error) {
      console.error("Error Removing Bookmark", error);
    }
  };

  const handleRemoveVideoBookmark = async (videoId) => {
    if (!registrationNumber) return;
    try {
      await axios.post(
        "https://learnospherebackend.learnosphere.in/api/route/removevideoBookmark",
        {
          userId: registrationNumber,
          videoId,
        }
      );
      setVideoBookmarks((prev) => prev.filter((video) => video.videoId !== videoId));
    } catch (error) {
      console.error("Error Removing Video Bookmark", error);
    }
  };

  const handleViewPdf = (pdfUrl) => {
    if (!pdfUrl) return;
    window.open(pdfUrl, "_blank", "noopener,noreferrer");
  };

  const activeNotes = bookMarks.filter((b) => b.isBookmarked === 1 || b.isBookmarked === undefined);
  const activeVideos = videoBookmarks.filter((v) => v.isBookmarked === 1 || v.isBookmarked === undefined);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/40 via-white to-gray-50/50 p-4 sm:p-6 lg:p-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 p-6 sm:p-8 text-white shadow-lg mb-8">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3.5 py-1 text-xs font-semibold backdrop-blur-md mb-3">
            <BookmarkCheck className="h-4 w-4" />
            Saved Revision Vault
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            My Bookmarks & Study Library
          </h1>
          <p className="mt-2 text-sm sm:text-base text-orange-100 font-medium">
            Quickly revise your saved formulas, chapter notes, and video lectures in one place. All bookmarks sync in real-time with the Learnosphere Mobile App.
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute right-12 bottom-0 w-36 h-36 bg-amber-400/20 rounded-full blur-xl pointer-events-none" />
      </div>

      {/* Filter Tabs & Stats Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-white border border-gray-100 rounded-2xl p-3 shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === "all"
                ? "bg-orange-500 text-white shadow-sm shadow-orange-200"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            All Saved ({activeNotes.length + activeVideos.length})
          </button>
          <button
            onClick={() => setActiveTab("notes")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "notes"
                ? "bg-orange-500 text-white shadow-sm shadow-orange-200"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Notes & PDFs ({activeNotes.length})
          </button>
          <button
            onClick={() => setActiveTab("videos")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "videos"
                ? "bg-orange-500 text-white shadow-sm shadow-orange-200"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            Concept Videos ({activeVideos.length})
          </button>
        </div>

        <div className="text-xs text-gray-500 font-medium px-2">
          Class: <span className="font-bold text-gray-800">{grade || "Standard"}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Section: Bookmarks Content */}
        <div className="lg:col-span-8 space-y-8">
          {/* Notes & PDF Section */}
          {(activeTab === "all" || activeTab === "notes") && (
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Bookmarked Notes & Documents</h2>
                    <p className="text-xs text-gray-500">PDFs, topic summaries & high-yield formula sheets</p>
                  </div>
                </div>

                {activeNotes.length > 3 && (
                  <button
                    onClick={() => setShowAllNotes(!showAllNotes)}
                    className="text-xs font-bold text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-full transition-colors"
                  >
                    {showAllNotes ? "Show Less" : `View All (${activeNotes.length})`}
                  </button>
                )}
              </div>

              {activeNotes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(showAllNotes ? activeNotes : activeNotes.slice(0, 4)).map((bookmark, idx) => (
                    <div
                      key={bookmark.fileId || idx}
                      className="group relative flex flex-col justify-between rounded-2xl border border-gray-100 bg-gradient-to-b from-gray-50/50 to-white p-5 hover:border-orange-200 hover:shadow-md transition-all"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[11px] font-bold text-orange-700 bg-orange-100/70 px-2.5 py-0.5 rounded-md">
                            {bookmark.selectedSubject || "General"}
                          </span>
                          <button
                            onClick={() => handleRemoveBookmark(bookmark.fileId)}
                            title="Remove bookmark"
                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <h3 className="font-bold text-gray-900 text-sm line-clamp-1 group-hover:text-orange-600 transition-colors">
                          {bookmark.title || "Study Material Note"}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {bookmark.topic || "Detailed chapter summary and practice hints."}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-[10px] text-gray-400 font-medium">Ready to revise</span>
                        <button
                          onClick={() => handleViewPdf(bookmark.pdfUrl)}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 group-hover:translate-x-0.5 transition-transform"
                        >
                          Open Document
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 px-4 rounded-2xl border-2 border-dashed border-gray-200 bg-orange-50/20">
                  <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                    <BookOpen className="w-7 h-7" />
                  </div>
                  <h3 className="text-base font-bold text-gray-800">No Bookmarked Notes Yet</h3>
                  <p className="text-xs text-gray-500 max-w-md mx-auto mt-1 mb-4">
                    Explore high-yield question sets and formulas. Tap the bookmark icon while reading to save them here and sync them with your mobile device.
                  </p>
                  <Link
                    href="/Userdashboard/Practicequestion"
                    className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm shadow-orange-200"
                  >
                    Browse Practice Material
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Videos Section */}
          {(activeTab === "all" || activeTab === "videos") && (
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 font-bold">
                    <Video className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Bookmarked Concept Videos</h2>
                    <p className="text-xs text-gray-500">Video lectures, animations & 3D visualizations</p>
                  </div>
                </div>

                {activeVideos.length > 3 && (
                  <button
                    onClick={() => setShowAllVideos(!showAllVideos)}
                    className="text-xs font-bold text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-full transition-colors"
                  >
                    {showAllVideos ? "Show Less" : `View All (${activeVideos.length})`}
                  </button>
                )}
              </div>

              {activeVideos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {(showAllVideos ? activeVideos : activeVideos.slice(0, 4)).map((video, idx) => (
                    <div
                      key={video.videoId || idx}
                      className="group relative rounded-2xl border border-gray-100 overflow-hidden bg-white hover:border-orange-200 hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div className="relative aspect-video bg-gray-900 overflow-hidden">
                        {activeVideoId === video.videoId ? (
                          <video
                            src={video.video_url}
                            className="w-full h-full object-cover"
                            controls
                            autoPlay
                          />
                        ) : (
                          <div
                            onClick={() => {
                              setActiveVideoId(video.videoId);
                              setSelectedVideo(video.video_url);
                            }}
                            className="w-full h-full flex items-center justify-center cursor-pointer group/video bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                          >
                            <div className="w-12 h-12 rounded-full bg-white/90 text-orange-600 flex items-center justify-center shadow-lg group-hover/video:scale-110 transition-transform">
                              <Play className="w-5 h-5 fill-current ml-0.5" />
                            </div>
                          </div>
                        )}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveVideoBookmark(video.videoId);
                          }}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:text-red-400 hover:bg-black/80 backdrop-blur-sm transition-all"
                          title="Remove bookmark"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[10px] font-semibold text-white">
                          {video.selectedSubject || "Science"}
                        </div>
                      </div>

                      <div className="p-4">
                        <h4 className="font-bold text-gray-900 text-sm line-clamp-1 group-hover:text-orange-600 transition-colors">
                          {video.title || "Concept Lecture"}
                        </h4>
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                          {video.topic || "Core concept explanation"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 px-4 rounded-2xl border-2 border-dashed border-gray-200 bg-amber-50/20">
                  <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                    <Video className="w-7 h-7" />
                  </div>
                  <h3 className="text-base font-bold text-gray-800">No Saved Videos Yet</h3>
                  <p className="text-xs text-gray-500 max-w-md mx-auto mt-1 mb-4">
                    Watch short 3D concept explainers and bookmark tricky concepts to review anytime before exams.
                  </p>
                  <Link
                    href="/Userdashboard/Conceptvideo"
                    className="inline-flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm shadow-amber-200"
                  >
                    Watch Free Concept Videos
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Section: Mobile App Vault Promo & Quick Tools */}
        <div className="lg:col-span-4 space-y-6">
          {/* Mobile App Bookmark Sync Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-orange-950 to-slate-900 p-6 text-white shadow-xl border border-orange-500/20">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/20 border border-orange-500/30 px-3 py-1 text-[11px] font-bold text-orange-400 mb-3">
              <Smartphone className="w-3.5 h-3.5" />
              Learnosphere Mobile
            </div>

            <h3 className="text-lg font-extrabold text-white">
              Sync & Revise Offline on App
            </h3>
            <p className="mt-1 text-xs text-gray-300 leading-relaxed">
              Never lose your notes! Download your bookmarks directly to your phone for uninterrupted revision without Internet.
            </p>

            <div className="my-5 flex items-center justify-center">
              <div className="relative w-44 h-60 drop-shadow-2xl">
                <Image
                  src={StudentAppImg}
                  alt="Learnosphere Mobile App Bookmark"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            <ul className="space-y-2 mb-5 text-xs text-gray-200">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Offline bookmark reading with zero lag</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                <span>One-tap flashcard generation from bookmarks</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Instant doubt-solve directly from saved PDFs</span>
              </li>
            </ul>

            <div className="flex flex-col gap-2.5">
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all shadow-md active:scale-95"
              >
                <SiGoogleplay className="w-4 h-4" />
                <span>Get it on Google Play</span>
              </a>
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all border border-white/10 active:scale-95"
              >
                <SiApple className="w-4 h-4" />
                <span>Download on App Store</span>
              </a>
            </div>
          </div>

          {/* Quick Study Hub Shortcuts */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-3">
            <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-500" />
              Quick Study Tools
            </h4>

            <Link
              href="/Userdashboard/Askquestion"
              className="flex items-center justify-between p-3.5 rounded-2xl bg-orange-50/70 hover:bg-orange-100/70 transition-all group border border-orange-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-orange-500 text-white flex items-center justify-center">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                    Ask an AI Doubt
                  </h5>
                  <p className="text-[11px] text-gray-500">24/7 instant step-by-step guidance</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-orange-600 group-hover:translate-x-0.5 transition-all" />
            </Link>

            <Link
              href="/Userdashboard/Practicequestion"
              className="flex items-center justify-between p-3.5 rounded-2xl bg-blue-50/70 hover:bg-blue-100/70 transition-all group border border-blue-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500 text-white flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    Take Practice Tests
                  </h5>
                  <p className="text-[11px] text-gray-500">Subject-wise tests & score cards</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
            </Link>

            <Link
              href="/Userdashboard/Conceptvideo"
              className="flex items-center justify-between p-3.5 rounded-2xl bg-amber-50/70 hover:bg-amber-100/70 transition-all group border border-amber-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center">
                  <Play className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                    Watch Concept Videos
                  </h5>
                  <p className="text-[11px] text-gray-500">Visual explanation of tough chapters</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
