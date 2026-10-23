"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import React, { useState, useEffect, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { FaDownload, FaEye, FaBookOpen, FaSpinner, FaExclamationTriangle, FaArrowLeft, FaRegCalendarAlt, FaGraduationCap, FaFilePdf } from "react-icons/fa";

const DDPContent = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedSubject = searchParams.get("selectedSubject");

  const [grade, setGrade] = useState(null);
  const [ddps, setDdps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch student grade based on authenticated email
  useEffect(() => {
    const fetchStudentProfile = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const response = await axios.post(
            `${WEB_BACKEND_URL}/api/route/getStudentByEmail`,
            { gmail: session.user.email }
          );
          if (response.data && response.data.grade) {
            setGrade(response.data.grade);
          }
        } catch (err) {
          console.warn("Optional student profile grade fetch failed:", err);
        }
      } else if (status === "unauthenticated") {
        router.push("/Student");
      }
    };

    fetchStudentProfile();
  }, [session, status, router]);

  // Fetch DDP list from backend for the selected subject and grade rules
  const fetchDDPs = async (subject, studentGrade) => {
    setLoading(true);
    setError(null);

    // Extract numeric grade (e.g. "Grade 10" -> 10, "11" -> 11)
    const numericGrade = studentGrade ? parseInt(String(studentGrade).replace(/(Grade|Class)/i, "").trim(), 10) : null;

    // Allow showing all loaded materials from database without early return restrictions

    try {
      const params = {};
      if (subject) {
        params.subject = subject;
      }
      const response = await axios.get(
        `${WEB_BACKEND_URL}/api/ddp`,
        { params }
      );
      if (response.data && response.data.success) {
        setDdps(response.data.data || []);
      } else {
        setError("Failed to load daily practice papers.");
      }
    } catch (err) {
      console.error("Error fetching DDP data:", err);
      setError("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "loading") return;

    if (selectedSubject) {
      fetchDDPs(selectedSubject, grade);
    } else {
      setLoading(false);
      setError("No subject selected.");
    }
  }, [selectedSubject, grade, status]);

  // Handle PDF Preview in a new window/tab
  const handlePreviewPdf = (pdfUrl) => {
    if (!pdfUrl) return;
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head><title>DDP PDF Viewer</title></head>
          <body style="margin:0;padding:0;overflow:hidden;">
            <iframe src="${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0" width="100%" height="100%" style="border:none;"></iframe>
          </body>
        </html>
      `);
      newWindow.document.close();
    }
  };

  // Helper to get styling for subject tags
  const getSubjectTagStyles = (subject) => {
    const sub = String(subject).toLowerCase();
    if (sub.includes("math")) return "bg-blue-50 text-blue-600 border-blue-100";
    if (sub.includes("science")) return "bg-emerald-50 text-emerald-600 border-emerald-100";
    if (sub.includes("physics")) return "bg-teal-50 text-teal-600 border-teal-100";
    if (sub.includes("chemistry")) return "bg-amber-50 text-amber-600 border-amber-100";
    if (sub.includes("biology")) return "bg-purple-50 text-purple-600 border-purple-100";
    return "bg-slate-50 text-slate-600 border-slate-100";
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 md:p-8 font-Poppins">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 mb-6 px-4 py-2 bg-white hover:bg-gray-100 text-gray-700 text-sm font-semibold rounded-lg border border-gray-300 transition-colors shadow-sm"
      >
        <FaArrowLeft /> Back
      </button>

      {/* Header section */}
      <div className="flex flex-col gap-1 justify-start border-b border-gray-200 pb-6 mb-8">
        <h2 className="text-3xl font-bold text-gray-800 tracking-tight flex items-center gap-3">
          <FaBookOpen className="text-orange-600" /> Daily Practice Papers (DDP)
        </h2>
        <p className="text-orange-600 font-semibold text-sm sm:text-base">
          Solve daily practice sheets to reinforce learning for Class {grade || ""} {selectedSubject ? `- ${selectedSubject}` : ""}
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <FaSpinner className="animate-spin text-orange-600 text-4xl mb-4" />
          <p className="font-semibold text-lg">Fetching your DDP sheets...</p>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="max-w-xl mx-auto bg-red-50 border border-red-200 p-6 rounded-xl shadow-sm text-center">
          <FaExclamationTriangle className="text-red-500 text-4xl mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-800 mb-2">Something Went Wrong</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => fetchDDPs(selectedSubject, grade)}
            className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-black font-semibold rounded-lg transition-colors shadow-sm"
          >
            Retry Fetch
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && ddps.length === 0 && (
        <div className="max-w-xl mx-auto bg-white border border-gray-200 p-8 rounded-xl text-center shadow-sm">
          <FaBookOpen className="text-gray-400 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Papers Available</h3>
          <p className="text-gray-500 mb-6">
            There are no Daily Practice Papers uploaded for Class {grade || ""} {selectedSubject ? `in ${selectedSubject}` : ""} at the moment. We update learning materials regularly, so please check back soon!
          </p>
          <button
            onClick={() => router.back()}
            className="px-6 py-2 bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-lg transition-colors"
          >
            Go Back
          </button>
        </div>
      )}

      {/* Grid of DDP Cards */}
      {!loading && !error && ddps.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {ddps.map((ddp) => (
            <div
              key={ddp.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 overflow-hidden transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between group"
            >
              <div className="p-6">
                {/* Header Badge Section */}
                <div className="flex justify-between items-center mb-5">
                  <span
                    className={`px-3 py-1 text-xs font-bold rounded-full border tracking-wide uppercase ${getSubjectTagStyles(
                      ddp.subject
                    )}`}
                  >
                    {ddp.subject}
                  </span>
                  
                  {/* Class / Grade Badge */}
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-slate-50 border border-slate-200/60 px-2.5 py-1 rounded-md">
                    <FaGraduationCap className="text-orange-600 text-sm" />
                    <span>Class {ddp.grade || grade || "General"}</span>
                  </span>
                </div>

                {/* PDF Icon & Title */}
                <div className="flex gap-3 items-start mb-4">
                  <div className="p-2.5 bg-red-50 text-red-600 rounded-xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <FaFilePdf size={22} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-800 line-clamp-2 leading-snug tracking-tight group-hover:text-orange-600 transition-colors duration-300">
                      {ddp.title}
                    </h3>
                  </div>
                </div>

                {/* Meta details */}
                {ddp.created_at && (
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-3">
                    <FaRegCalendarAlt className="text-slate-400" />
                    <span>Published: {new Date(ddp.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="px-6 pb-6 pt-4 border-t border-slate-100 bg-slate-50/50 flex gap-3">
                <button
                  onClick={() => handlePreviewPdf(ddp.url)}
                  className="w-[42%] flex-shrink-0 flex items-center justify-center gap-1.5 py-2.5 px-2 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-xl transition-all shadow-sm active:scale-95 whitespace-nowrap"
                >
                  <FaEye className="text-slate-500" size={14} /> Preview
                </button>
                <a
                  href={ddp.url}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white text-sm font-bold rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95 text-center whitespace-nowrap"
                >
                  <FaDownload size={14} /> Download
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const DDPPage = () => (
  <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading...</div>}>
    <DDPContent />
  </Suspense>
);

export default DDPPage;
