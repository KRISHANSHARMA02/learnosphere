"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import Pdfdata from "./pdfdata/page";
import Head from "next/head";
import { trackEvent } from "@/src/lib/eventTracker";
import {
  AiOutlineFilePdf,
  AiOutlineCloudUpload,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import { FaBook, FaFileAlt, FaLayerGroup } from "react-icons/fa";
import { MdOutlineDescription, MdTitle } from "react-icons/md";
import { Loader2 } from "lucide-react";

const Pdf = () => {
  const [showField, setShowField] = useState("topic"); // Default to topic-wise
  const [fileName, setFileName] = useState("");
  const [errors, setErrors] = useState({});
  const [selectedClass, setSelectedClass] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [title, setTitle] = useState("");
  const [term, setTerm] = useState("");
  const [samplepapers, setSamplePapers] = useState("");
  const [year, setYear] = useState("");
  const [chapter, setChapter] = useState("");
  const [level, setLevel] = useState("");
  const [topic, setTopic] = useState("");
  const [success, setSuccess] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("English");

  const { data: session, status } = useSession();
  const [profileData, setProfileData] = useState({});
  const fileInputRef = useRef(null);

  const handleButtonClick = (field) => {
    setShowField(field);
    setErrors({});
    setSuccess("");
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const response = await axios.post(
            "https://learnospherebackend.learnosphere.in/api/route/getTeacherByEmail",
            { gmail: session.user.email }
          );
          setProfileData(response.data);
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      }
    };

    fetchProfileData();
  }, [session, status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");

    if (!fileInputRef.current?.files?.[0]) {
      setErrors({ file: "Please select a PDF file to upload." });
      return;
    }

    if (!title.trim()) {
      setErrors({ title: "Title is required." });
      return;
    }

    if (!selectedClass) {
      setErrors({ selectedClass: "Please select a target class." });
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("topic", topic);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("samplepapers", samplepapers);
    formData.append("term", term);
    formData.append("year", year);
    formData.append("chapter", chapter);
    formData.append("level", level);
    formData.append("selectedClass", selectedClass);
    formData.append("selectedSubject", selectedSubject);
    formData.append("pdf", fileInputRef.current.files[0]);
    formData.append("gmail", profileData?.gmail || session?.user?.email || "");

    try {
      const response = await axios.post(
        "https://learnospherebackend.learnosphere.in/api/route/teacheruploadcontroller",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        trackEvent("TEACHER_PDF_UPLOAD_SUBMITTED", {
          topic,
          title,
          description,
          category,
          samplepapers,
          term,
          year,
          chapter,
          class: selectedClass,
          level,
          pdf_file_name: fileName || fileInputRef.current?.files[0]?.name || "",
        });

        setSuccess("PDF file uploaded successfully! It is now submitted for verification.");
        setTitle("");
        setTerm("");
        setTopic("");
        setDescription("");
        setSamplePapers("");
        setYear("");
        setChapter("");
        setLevel("");
        setSelectedClass("");
        setSelectedSubject("");
        setFileName("");
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        setErrors({ general: "Failed to submit PDF. Please try again." });
      }
    } catch (error) {
      console.error("Error submitting PDF:", error);
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: "An error occurred while uploading. Please check file format and size." });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClassChange = (e) => {
    const classValue = e.target.value;
    setSelectedClass(classValue);
    setSelectedSubject("");

    const classSubjects = {
      "Class-1": ["Math", "EVS", "English"],
      "Class-2": ["Math", "EVS", "English"],
      "Class-3": ["Math", "EVS", "English"],
      "Class-4": ["Math", "EVS", "English"],
      "Class-5": ["Math", "EVS", "English"],
      "Class-6": ["Math", "Science", "English", "Social Science", "Hindi"],
      "Class-7": ["Math", "Science", "English", "Social Science", "Hindi"],
      "Class-8": ["Math", "Science", "English", "Social Science", "Hindi"],
      "Class-9": ["Math", "Science", "English", "Social Science", "Hindi"],
      "Class-10": ["Math", "Science", "English", "Social Science", "Hindi"],
      "Class-11": [
        "Math",
        "Physics",
        "Chemistry",
        "Biology",
        "English",
        "Hindi",
        "Accountancy",
        "Bussiness Studies",
        "Economics",
        "Political Science",
      ],
      "Class-12": [
        "Math",
        "Physics",
        "Chemistry",
        "Biology",
        "English",
        "Hindi",
        "Accountancy",
        "Bussiness Studies",
        "Economics",
        "Political Science",
      ],
    };
    setSubjects(classSubjects[classValue] || []);
  };

  const handleClickPicker = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 25 * 1024 * 1024) {
        setErrors({ file: "File size exceeds 25 MB. Please select a smaller PDF." });
        setFileName("");
        return;
      }
      setFileName(file.name);
      setErrors((prev) => ({ ...prev, file: null }));
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 md:px-8 py-4 sm:py-6 space-y-6 sm:space-y-8 font-sans antialiased">
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
        <div className="space-y-2 text-center md:text-left w-full md:w-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-black/20 text-white">
            <AiOutlineFilePdf size={16} /> PDF Study Notes Manager
          </span>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight">
            Upload & Publish Study Materials
          </h1>
          <p className="text-white/90 text-xs sm:text-sm max-w-xl">
            Upload handwritten notes, solved sample question papers, and chapter-wise question banks for students.
          </p>
        </div>
      </div>

      {/* Mode Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 bg-slate-100 rounded-2xl w-full max-w-2xl">
        <button
          type="button"
          className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            showField === "topic"
              ? "bg-white text-orange-600 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
          onClick={() => handleButtonClick("topic")}
        >
          <FaBook size={14} /> Topic-Wise Notes
        </button>
        <button
          type="button"
          className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            showField === "samplepapersAndtermAndyear"
              ? "bg-white text-orange-600 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
          onClick={() => handleButtonClick("samplepapersAndtermAndyear")}
        >
          <FaFileAlt size={14} /> Sample Question Papers
        </button>
        <button
          type="button"
          className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            showField === "topicAndchapterAndlevel"
              ? "bg-white text-orange-600 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
          onClick={() => handleButtonClick("topicAndchapterAndlevel")}
        >
          <FaLayerGroup size={14} /> Chapter & Difficulty
        </button>
      </div>

      {/* Upload Form Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 border border-slate-200/80 shadow-sm space-y-5 sm:space-y-6"
      >
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-lg font-bold text-slate-800">
            {showField === "topic"
              ? "Upload Topic-Wise Study Material"
              : showField === "samplepapersAndtermAndyear"
              ? "Upload Sample Papers & Term Exams"
              : "Upload Chapter-Wise Question Bank"}
          </h2>
          <p className="text-xs text-slate-500">
            Fill in the details below and select your PDF file (max 25MB).
          </p>
        </div>

        {/* Dynamic Mode-Specific Fields */}
        {showField === "topic" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="topic" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Topic Name
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                id="topic"
                name="topic"
                placeholder="e.g. Thermodynamics, Coordinate Geometry"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all placeholder:text-slate-400"
              />
            </div>
            <div>
              <label htmlFor="title" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Note Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                id="title"
                name="title"
                placeholder="e.g. Complete Revision Notes with Solved Examples"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all placeholder:text-slate-400"
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
            </div>
          </div>
        )}

        {showField === "samplepapersAndtermAndyear" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div>
              <label htmlFor="title" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Paper Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                id="title"
                placeholder="e.g. CBSE 2025 Model Question Paper"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all"
              />
            </div>
            <div>
              <label htmlFor="samplepapers" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Paper Type
              </label>
              <select
                id="samplepapers"
                value={samplepapers}
                onChange={(e) => setSamplePapers(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all"
              >
                <option value="">Select Paper Type</option>
                <option value="Sample Question Papers">Sample Question Papers</option>
                <option value="Previous Year Paper">Previous Year Paper</option>
                <option value="Mock Test Paper">Mock Test Paper</option>
              </select>
            </div>
            <div>
              <label htmlFor="term" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Term / Semester
              </label>
              <select
                id="term"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all"
              >
                <option value="">Select Term</option>
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={`Term-${i + 1}`}>
                    Term-{i + 1}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="year" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Academic Year
              </label>
              <select
                id="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all"
              >
                <option value="">Select Year</option>
                {["2026", "2025", "2024", "2023", "2022"].map((yr) => (
                  <option key={yr} value={yr}>
                    {yr}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {showField === "topicAndchapterAndlevel" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div>
              <label htmlFor="title" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                id="title"
                placeholder="e.g. Chapter 1 Important Formulas"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all"
              />
            </div>
            <div>
              <label htmlFor="topic" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Topic
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                id="topic"
                placeholder="Topic Name"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all"
              />
            </div>
            <div>
              <label htmlFor="chapter" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Chapter
              </label>
              <select
                id="chapter"
                value={chapter}
                onChange={(e) => setChapter(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all"
              >
                <option value="">Select Chapter</option>
                {[...Array(20)].map((_, i) => (
                  <option key={i} value={`Chapter-${i + 1}`}>
                    Chapter {i + 1}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="level" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Difficulty Level
              </label>
              <select
                id="level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all"
              >
                <option value="">Select Level</option>
                <option value="easy">Easy (Fundamentals)</option>
                <option value="medium">Medium (Board Exam Level)</option>
                <option value="hard">Hard (Advanced / Competitive)</option>
              </select>
            </div>
          </div>
        )}

        {/* Common Fields: Class, Subject, Medium */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-2">
          <div>
            <label htmlFor="class" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Target Class <span className="text-red-500">*</span>
            </label>
            <select
              id="class"
              value={selectedClass}
              onChange={handleClassChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all"
            >
              <option value="">Select Class</option>
              {[...Array(12)].map((_, i) => (
                <option key={i} value={`Class-${i + 1}`}>
                  Class {i + 1}
                </option>
              ))}
            </select>
            {errors.selectedClass && <p className="text-red-500 text-xs mt-1">{errors.selectedClass}</p>}
          </div>

          <div>
            <label htmlFor="subject" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Subject
            </label>
            <select
              id="subject"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              disabled={!selectedClass}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all disabled:bg-slate-50 disabled:text-slate-400"
            >
              <option value="">{selectedClass ? "Select Subject" : "Select Class First"}</option>
              {subjects.map((subj, idx) => (
                <option key={idx} value={subj}>
                  {subj}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="category" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Medium / Language
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all"
            >
              <option value="English">English Medium</option>
              <option value="Hindi">Hindi Medium</option>
              <option value="Bilingual">Bilingual (English + Hindi)</option>
            </select>
          </div>
        </div>

        {/* Description Field */}
        <div>
          <label htmlFor="description" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Brief Overview & Notes Description
          </label>
          <textarea
            id="description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe key topics, chapter coverage, and why students will benefit from this note..."
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all placeholder:text-slate-400"
          />
        </div>

        {/* File Dropzone */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Select PDF Document <span className="text-red-500">*</span>
          </label>

          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />

          <div
            onClick={handleClickPicker}
            className="border-2 border-dashed border-slate-300 hover:border-orange-500 bg-slate-50/60 hover:bg-orange-50/30 rounded-2xl p-5 sm:p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center group"
          >
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <AiOutlineCloudUpload size={28} />
            </div>
            {fileName ? (
              <div className="flex items-center gap-2 text-green-700 bg-green-50 px-3.5 sm:px-4 py-2 rounded-xl border border-green-200 max-w-full">
                <AiOutlineCheckCircle size={18} className="shrink-0" />
                <span className="font-bold text-xs truncate max-w-[200px] sm:max-w-md">{fileName}</span>
              </div>
            ) : (
              <div>
                <p className="text-xs sm:text-sm font-bold text-slate-800">
                  Click to browse and choose your PDF file
                </p>
                <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                  Supported format: .pdf only (Maximum size: 25 MB)
                </p>
              </div>
            )}
          </div>
          {errors.file && <p className="text-red-500 text-xs mt-1">{errors.file}</p>}
        </div>

        {/* Feedback / Alert */}
        {success && (
          <div className="p-4 bg-green-50 text-green-700 rounded-2xl border border-green-200 text-xs font-bold flex items-center gap-2">
            <AiOutlineCheckCircle size={18} /> {success}
          </div>
        )}
        {errors.general && (
          <div className="p-4 bg-red-50 text-red-700 rounded-2xl border border-red-200 text-xs font-bold">
            {errors.general}
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-orange-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-4 h-4" />
                Uploading Document...
              </>
            ) : (
              <>
                <AiOutlineCloudUpload size={18} />
                Publish Study Note
              </>
            )}
          </button>
        </div>
      </form>

      {/* Render Table of Previously Uploaded PDFs */}
      <Pdfdata />
    </div>
  );
};

export default Pdf;
