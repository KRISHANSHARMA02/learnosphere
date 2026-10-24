"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import React, { useEffect, useState, useRef } from "react";
import Videodata from "./videodata/page";
import Loader from "@/components/Loader";
import Overlay from "@/components/Overlay";
import Swal from "sweetalert2";
import axios from "axios";
import { useSession } from "next-auth/react";
import VideoInstructions from "@/components/VideoInstructions";
import Head from "next/head";
import { trackEvent } from "@/src/lib/eventTracker";
import {
  BsPersonVideo3,
  BsCameraVideoFill,
  BsTrash,
  BsPlayCircle,
} from "react-icons/bs";
import {
  AiOutlineCloudUpload,
  AiOutlineCheckCircle,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { Loader2 } from "lucide-react";

const Video = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Default to false so it doesn't block users!
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const videoInputRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const { data: session, status } = useSession();
  const [teacherData, setTeacherData] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "English",
    selectedClass: "",
    subject: "",
  });

  useEffect(() => {
    const fetchTeacherData = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const response = await axios.post(
            `${WEB_BACKEND_URL}/api/route/getTeacherByEmail`,
            { gmail: session.user.email }
          );
          setTeacherData(response.data?.data || null);
        } catch (error) {
          console.error("Error fetching teacher profile data:", error);
        }
      }
    };

    fetchTeacherData();
  }, [session, status]);

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("video/")) {
      const customFileName = `video_${Date.now()}.mp4`;
      const customFile = new File([file], customFileName, { type: file.type });

      setVideoFile(customFile);
      setVideoPreview(URL.createObjectURL(customFile));
      setFormErrors((prev) => ({ ...prev, video: null }));
    } else {
      Swal.fire({
        icon: "warning",
        title: "Invalid File",
        text: "Please select a valid video file (MP4, WebM).",
      });
    }
  };

  const handleVideoUnload = () => {
    setVideoFile(null);
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }
    setVideoPreview(null);
    if (videoInputRef.current) {
      videoInputRef.current.value = "";
    }
  };

  const handleClassChange = (e) => {
    const classValue = e.target.value;
    setSelectedClass(classValue);
    setSelectedSubject("");

    setFormData((prev) => ({
      ...prev,
      selectedClass: classValue,
      subject: "",
    }));

    const classSubjects = {
      "Class-1": ["Maths", "English", "Science", "EVS", "Hindi"],
      "Class-2": ["Maths", "English", "Science", "EVS", "Hindi"],
      "Class-3": ["Maths", "English", "Science", "EVS", "Hindi"],
      "Class-4": ["Maths", "English", "Science", "EVS", "Hindi"],
      "Class-5": ["Maths", "English", "Science", "EVS", "Hindi"],
      "Class-6": ["Maths", "Science", "English", "Social Science", "Hindi"],
      "Class-7": ["Maths", "Science", "English", "Social Science", "Hindi"],
      "Class-8": ["Maths", "Science", "English", "Social Science", "Hindi"],
      "Class-9": ["Maths", "Science", "English", "Social Science", "Hindi"],
      "Class-10": ["Maths", "Science", "English", "Social Science", "Hindi"],
      "Class-11": [
        "Maths",
        "Physics",
        "Chemistry",
        "Biology",
        "English",
        "Hindi",
        "Accountancy",
        "Business Studies",
        "Economics",
        "Political Science",
      ],
      "Class-12": [
        "Maths",
        "Physics",
        "Chemistry",
        "Biology",
        "English",
        "Hindi",
        "Accountancy",
        "Business Studies",
        "Economics",
        "Political Science",
      ],
    };

    setSubjects(classSubjects[classValue] || []);
  };

  const handleSubjectChange = (e) => {
    const subjectValue = e.target.value;
    setSelectedSubject(subjectValue);
    setFormData((prev) => ({
      ...prev,
      subject: subjectValue,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});
    setErrorMessage("");

    if (!videoFile) {
      setFormErrors({ video: "Please select a video to upload." });
      return;
    }

    if (!formData.title.trim()) {
      setFormErrors({ title: "Video title is required." });
      return;
    }

    if (!formData.selectedClass) {
      setFormErrors({ selectedClass: "Target class is required." });
      return;
    }

    if (!teacherData) {
      Swal.fire({
        icon: "error",
        title: "Session Error",
        text: "Teacher profile not loaded. Please re-login.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("category", formData.category);
      form.append("selectedClass", formData.selectedClass);
      form.append("subject", formData.subject);
      form.append("video", videoFile);
      form.append("teacherEmail", teacherData.email || session?.user?.email);
      form.append("Mobilenumber", teacherData.mobilenumber || "");
      form.append("teacherName", teacherData.name || session?.user?.name || "Teacher");

      const response = await axios.post(
        `${WEB_BACKEND_URL}/api/route/teachervideoupload`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        trackEvent("TEACHER_VIDEO_UPLOAD_SUBMITTED", {
          title: formData.title,
          description: formData.description,
          category: formData.category,
          class: formData.selectedClass,
          subject: formData.subject,
          video_file_name: videoFile?.name || "",
        });

        Swal.fire({
          title: "Video Uploaded Successfully!",
          text: "Your concept video is submitted for verification and will appear in student feeds once approved.",
          icon: "success",
          confirmButtonColor: "#ea580c",
        }).then(() => {
          setFormData({
            title: "",
            description: "",
            category: "English",
            selectedClass: "",
            subject: "",
          });
          handleVideoUnload();
          setSelectedClass("");
          setSelectedSubject("");
          setSubjects([]);
        });
      } else {
        setErrorMessage("Something went wrong with the upload. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting video: ", error);
      if (error.response?.data?.errors) {
        setFormErrors(error.response.data.errors);
      } else {
        setErrorMessage("An error occurred during upload. Please check video size and format.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-8 py-4 sm:py-6 space-y-6 sm:space-y-8 font-sans antialiased w-full">
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      {isLoading && <Overlay />}
      {isLoading && <Loader />}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-2 text-center md:text-left w-full md:w-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-black/20 text-white">
            <BsCameraVideoFill size={14} /> Video Creator Studio
          </span>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight">
            Upload Educational Concept Videos
          </h1>
          <p className="text-white/90 text-xs sm:text-sm max-w-xl">
            Publish micro-lectures, topic walkthroughs, and solutions to earn royalties and reach thousands of learners.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 border border-white/20 shrink-0"
        >
          <AiOutlineInfoCircle size={16} /> View Video Guidelines
        </button>
      </div>

      {/* Form Container */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 border border-slate-200/80 shadow-sm space-y-6"
      >
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-base sm:text-lg font-bold text-slate-800">
            Video Metadata & Details
          </h2>
          <p className="text-xs text-slate-500">
            Provide descriptive titles and select target curriculum categories
          </p>
        </div>

        {/* Title and Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label htmlFor="title" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Video Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Newton's 3 Laws of Motion with Real-Life Examples"
              className="w-full px-3.5 sm:px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all placeholder:text-slate-400"
            />
            {formErrors.title && <p className="text-red-500 text-xs mt-1">{formErrors.title}</p>}
          </div>

          <div>
            <label htmlFor="category" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Medium / Language <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3.5 sm:px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all"
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Hinglish">Hinglish (Hindi + English)</option>
            </select>
          </div>
        </div>

        {/* Class and Subject */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label htmlFor="selectedClass" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Target Class <span className="text-red-500">*</span>
            </label>
            <select
              id="selectedClass"
              value={selectedClass}
              onChange={handleClassChange}
              className="w-full px-3.5 sm:px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all"
            >
              <option value="">Select Target Class</option>
              {[...Array(12)].map((_, i) => (
                <option key={i} value={`Class-${i + 1}`}>
                  Class {i + 1}
                </option>
              ))}
            </select>
            {formErrors.selectedClass && (
              <p className="text-red-500 text-xs mt-1">{formErrors.selectedClass}</p>
            )}
          </div>

          <div>
            <label htmlFor="subject" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Subject <span className="text-red-500">*</span>
            </label>
            <select
              id="subject"
              value={selectedSubject}
              onChange={handleSubjectChange}
              disabled={!selectedClass}
              className="w-full px-3.5 sm:px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all disabled:bg-slate-50 disabled:text-slate-400"
            >
              <option value="">{selectedClass ? "Select Subject" : "Select Class First"}</option>
              {subjects.map((sub, i) => (
                <option key={i} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Lesson Description & Key Concepts Covered
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            placeholder="Briefly summarize what students will learn from this lecture..."
            className="w-full px-3.5 sm:px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10 transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Video Upload Dropzone & Preview */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Lesson Video File (MP4, WebM) <span className="text-red-500">*</span>
          </label>

          <input
            type="file"
            accept="video/*"
            ref={videoInputRef}
            onChange={handleVideoUpload}
            className="hidden"
          />

          {!videoPreview ? (
            <div
              onClick={() => videoInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 hover:border-orange-500 bg-slate-50/60 hover:bg-orange-50/30 rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center group"
            >
              <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <AiOutlineCloudUpload size={32} />
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-800">
                Click to browse or drop your video file
              </p>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-1">
                Supports MP4, WebM formats (Recommended: 720p or 1080p, Max 100MB)
              </p>
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-900 p-3 sm:p-4 w-full max-w-xl">
              <div className="aspect-video w-full rounded-xl overflow-hidden bg-black mb-3">
                <video src={videoPreview} controls className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-white">
                <span className="text-xs font-semibold truncate max-w-full sm:max-w-xs text-slate-300">
                  {videoFile?.name}
                </span>
                <button
                  type="button"
                  onClick={handleVideoUnload}
                  className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-bold px-3 py-1.5 rounded-xl bg-red-500/20 transition-colors shrink-0"
                >
                  <BsTrash size={14} /> Remove Video
                </button>
              </div>
            </div>
          )}
          {formErrors.video && <p className="text-red-500 text-xs mt-1">{formErrors.video}</p>}
        </div>

        {/* Feedback message */}
        {errorMessage && (
          <div className="p-4 bg-red-50 text-red-700 rounded-2xl border border-red-200 text-xs font-bold">
            {errorMessage}
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-md shadow-orange-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin w-4 h-4" />
                Uploading Lesson Video...
              </>
            ) : (
              <>
                <BsPlayCircle size={18} />
                Publish Concept Video
              </>
            )}
          </button>
        </div>
      </form>

      {/* Render Previously Uploaded Videos */}
      <Videodata />

      {/* Guidelines Modal (only when triggered) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
            >
              ✕
            </button>
            <VideoInstructions />
          </div>
        </div>
      )}
    </div>
  );
};

export default Video;