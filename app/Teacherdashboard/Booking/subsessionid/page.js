"use client";
import React, { useEffect, useState, Suspense, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaArrowLeft, FaUser, FaVideo } from "react-icons/fa";
import { IoCheckmark, IoTimeOutline, IoCalendarOutline, IoInformationCircleOutline, IoChatbubblesOutline } from "react-icons/io5";
import { MdOutlineTimer } from "react-icons/md";
import { TbFileDescription, TbCalendarX, TbAsterisk, TbRouter } from "react-icons/tb";
import { FiUploadCloud, FiFileText, FiX, FiAlertCircle, FiDownload } from "react-icons/fi";
import { Loader2 } from "lucide-react";
import Head from "next/head";
import axios from "axios";
import { toast } from "react-toastify";

const SubSessionContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId"); 
  const subsessionId = searchParams.get("subsessionId");

  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  // Drag & Drop Modal States
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const [errorMessage, setErrorMessage] = useState("");

  const rescheduleOptions = [
    { id: "emergency", label: "Emergency / Personal Reason", icon: TbAsterisk },
    { id: "technical", label: "Technical Issues", icon: TbRouter },
    { id: "overlap", label: "Schedule Overlap", icon: TbCalendarX },
  ];

  const extractDate = (dateString) => {
    if (!dateString) return "Not Scheduled";
    return new Date(dateString).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
  };

  const extractTime = (dateString) => {
    if (!dateString) return "Not Set";
    return new Date(dateString).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://mobileapp.backend.learnosphere.in/api/session/v1/get_session_details_for_teacher_app/${sessionId}`
        );

        if (response.data.success) {
          const booking = response.data.booking;
          const foundSession = booking.sessions?.find(s => s.sessionId === subsessionId);

          if (foundSession) {
            setSessionData({
              studentName: booking.student?.name || "Unknown Student",
              subject: booking.subject || "General",
              sessionNumber: foundSession.sessionNumber,
              status: foundSession.displayStatus,
              date: extractDate(foundSession.scheduledTime),
              time: extractTime(foundSession.scheduledTime),
              duration: foundSession.durationMinutes ? `${foundSession.durationMinutes} Minutes` : "60 Minutes",
              zoomJoinUrl: foundSession.zoomJoinUrl,
              notesFile: foundSession.sessionNotesFile || null,
              bookingId: booking.bookingId || sessionId,
              teacherId: booking.teacher?.registrationNumber || "Not Found",
              // 🚀 NEW: Teacher Name extracted from API
              teacherName: booking.teacher?.name || "Unknown Teacher" 
            });
          }
        }
      } catch (error) {
        console.error("Error fetching session:", error);
      } finally {
        setLoading(false);
      }
    };

    if (sessionId && subsessionId) {
      fetchData();
    }
  }, [sessionId, subsessionId]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file) => {
    setErrorMessage(""); 
    
    if (file.type !== "application/pdf") {
      setErrorMessage("Invalid format. Please select a valid PDF file.");
      return;
    }
    if (file.size > 100 * 1024 * 1024) {
      setErrorMessage("File is too large. The maximum allowed size is 100MB.");
      return;
    }
    
    setSelectedFile(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const confirmUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("notesFile", selectedFile);
    formData.append("sessionId", subsessionId); 

    setIsUploading(true);
    try {
      const response = await axios.post("https://mobileapp.backend.learnosphere.in/api/session/v1/upload_session_notes_to_aws", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        setSessionData(prev => ({ ...prev, notesFile: response.data.fileUrl }));
        setIsUploadModalOpen(false);
        setSelectedFile(null); 
      }
    } catch (error) {
      console.error("Upload error:", error);
      setErrorMessage(error.response?.data?.message || "Failed to upload notes to the server.");
    } finally {
      setIsUploading(false);
    }
  };

  // 🚀 UPDATED: WhatsApp Redirect Function with Teacher Name
  const handleWhatsAppRedirect = () => {
    let finalReason = "";

    if (customReason.trim() !== "") {
      finalReason = customReason;
    } else if (selectedReason !== "") {
      const option = rescheduleOptions.find(opt => opt.id === selectedReason);
      finalReason = option ? option.label : "";
    }

    if (!finalReason) {
      toast.error("Please select or enter a reason for rescheduling.");
      return;
    }

    // Now includes Teacher Name along with ID and Booking ID
    const message = `Hello Support, I would like to request a reschedule.\n\n` +
      `*Teacher Name:* ${sessionData.teacherName}\n` +
      `*Teacher ID:* ${sessionData.teacherId}\n` +
      `*Booking ID:* ${sessionData.bookingId}\n` +
      `*Subject:* ${sessionData.subject}\n` +
      `*Reason:* ${finalReason}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/8769600449?text=${encodedMessage}`;
    
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setIsRescheduleOpen(false); 
  };

  if (loading || !sessionData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-[#FF5A22]" />
      </div>
    );
  }

  const isCompleted = sessionData.status === "completed";
  const isScheduled = sessionData.status === "scheduled" || sessionData.status === "ongoing";
  const isNotScheduled = sessionData.status === "init" || sessionData.status === "pending";

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8 lg:p-12 font-Poppins antialiased relative">
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => router.back()} 
            className="text-gray-600 bg-white border border-gray-200 shadow-sm p-2.5 rounded-full hover:bg-gray-100 transition-all"
          >
            <FaArrowLeft size={14} />
          </button>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Session {sessionData.sessionNumber}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          
          <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm p-8 flex flex-col items-center justify-center text-center h-fit">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 ${isCompleted ? 'bg-green-50' : 'bg-[#FFF8F0]'}`}>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-md ${
                isCompleted ? 'bg-[#4ADE80] shadow-green-200' : 
                isScheduled ? 'bg-[#FF5A22] shadow-orange-200' : 
                'bg-white text-[#FF5A22] border border-orange-50 shadow-sm'
              }`}>
                {isCompleted ? <IoCheckmark size={40} /> : 
                 isScheduled ? <IoCalendarOutline size={36} /> : 
                 <TbCalendarX size={36} />}
              </div>
            </div>
            <h2 className={`text-2xl font-bold mb-2 ${isCompleted ? 'text-[#4ADE80]' : 'text-[#FF5A22]'}`}>
              {isCompleted ? 'Session Completed' : 
               isScheduled ? 'Session Scheduled' : 
               'Not Scheduled Yet'}
            </h2>
            <span className="text-xs font-bold uppercase tracking-widest bg-slate-50 text-slate-500 px-4 py-1.5 rounded-full border border-slate-100">
              {sessionData.subject}
            </span>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-3">
                  Session Details
              </h3>
              
              <div className="space-y-1">
                <div className="flex justify-between items-center py-4 border-b border-gray-50">
                  <div className="flex items-center gap-3 text-gray-400">
                    <MdOutlineTimer size={20} />
                    <span className="font-medium text-sm">Duration</span>
                  </div>
                  <span className="font-bold text-gray-900 text-sm md:text-base">{sessionData.duration}</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-gray-50">
                  <div className="flex items-center gap-3 text-gray-400">
                    <IoCalendarOutline size={20} />
                    <span className="font-medium text-sm">Date</span>
                  </div>
                  <span className="font-bold text-gray-900 text-sm md:text-base">{sessionData.date}</span>
                </div>
                <div className="flex justify-between items-center py-4">
                  <div className="flex items-center gap-3 text-gray-400">
                    <IoTimeOutline size={20} />
                    <span className="font-medium text-sm">Time</span>
                  </div>
                  <span className="font-bold text-gray-900 text-sm md:text-base">{sessionData.time}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#FFF8F0] rounded-[24px] p-6 flex items-center gap-5 border border-orange-50/80 shadow-sm h-fit">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                  <FaUser className="text-[#FF5A22] text-xl" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest block mb-0.5">Student</span>
                  <h3 className="text-lg font-bold text-gray-900 leading-tight">{sessionData.studentName}</h3>
                </div>
              </div>

              {isCompleted ? (
                <>
                  {sessionData.notesFile ? (
                    <div className="flex gap-4 h-full w-full">
                      <button 
                        onClick={() => window.open(sessionData.notesFile, "_blank")}
                        className="flex-1 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200 active:scale-[0.98] transition-all font-bold py-6 rounded-[24px] flex flex-col items-center justify-center gap-2 shadow-sm"
                      >
                        <FiFileText size={28} />
                        <span className="text-[15px] tracking-wide">View PDF</span>
                      </button>
                      
                      <a 
                        href={sessionData.notesFile}
                        download={`Session_${sessionData.sessionNumber}_Notes.pdf`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white active:scale-[0.98] transition-all font-bold py-6 rounded-[24px] flex flex-col items-center justify-center gap-2 shadow-sm shadow-emerald-200"
                      >
                        <FiDownload size={28} />
                        <span className="text-[15px] tracking-wide">Download</span>
                      </a>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setIsUploadModalOpen(true)}
                      className="h-full w-full bg-[#3B82F6] hover:bg-blue-600 active:scale-[0.98] transition-all text-white font-bold py-6 rounded-[24px] flex flex-col items-center justify-center gap-2 shadow-sm shadow-blue-200"
                    >
                      <TbFileDescription size={28} />
                      <span className="text-[15px] tracking-wide">Add Session Notes</span>
                    </button>
                  )}
                </>
              ) : isScheduled ? (
                <div className="flex flex-col gap-3 h-full">
                  <button 
                    onClick={() => {
                      if (sessionData.zoomJoinUrl) {
                        window.open(sessionData.zoomJoinUrl, "_blank");
                      }
                    }}
                    disabled={!sessionData.zoomJoinUrl}
                    className={`w-full font-bold py-3.5 rounded-[20px] flex items-center justify-center gap-2 transition-all ${
                      sessionData.zoomJoinUrl 
                        ? "bg-blue-500 hover:bg-blue-600 text-white shadow-md" 
                        : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    <FaVideo size={16} />
                    Start / Join Session
                  </button>

                  <div className="w-full bg-[#FFF8F0] border border-orange-100 text-[#FF5A22] text-[13px] font-semibold py-3 px-2 rounded-xl flex items-center justify-center gap-1.5 text-center">
                    <IoTimeOutline size={18} className="shrink-0" />
                    Link active 10 mins before class
                  </div>
                  
                  <button 
                    onClick={() => setIsRescheduleOpen(true)}
                    className="w-full bg-[#FF5A22] hover:bg-[#E04B1A] active:scale-[0.98] transition-all text-white font-bold py-4 rounded-[20px] flex items-center justify-center gap-2 shadow-sm shadow-orange-200"
                  >
                    <IoCalendarOutline size={20} />
                    Request Reschedule
                  </button>
                </div>
              ) : isNotScheduled ? (
                <div className="h-full w-full bg-[#FFF8F0] border border-orange-100 rounded-[24px] p-6 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-2">
                    <IoInformationCircleOutline className="text-[#FF5A22] shrink-0" size={22} />
                    <h4 className="font-bold text-gray-900 text-[15px]">Session Scheduling</h4>
                  </div>
                  <p className="text-gray-500 text-[13.5px] leading-relaxed">
                    This session has not yet been scheduled by the student.
                  </p>
                </div>
              ) : null}

            </div>
          </div>
        </div>
      </div>

      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => !isUploading && setIsUploadModalOpen(false)}>
          <div className="bg-white rounded-[32px] p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Upload Session Notes</h3>
              <button disabled={isUploading} onClick={() => setIsUploadModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <FiX size={24} />
              </button>
            </div>

            <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 mb-6 flex gap-3 items-start">
              <IoInformationCircleOutline className="text-[#FF5A22] shrink-0 mt-0.5" size={20} />
              <p className="text-[13px] text-gray-700 leading-relaxed">
                You can only upload <strong>1 PDF file</strong> per session. Please ensure your file contains all necessary notes before uploading.
              </p>
            </div>

            {!selectedFile ? (
              <div 
                className={`relative border-2 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                  dragActive ? "border-[#FF5A22] bg-orange-50/50" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input 
                  type="file" 
                  accept="application/pdf" 
                  className="hidden" 
                  ref={fileInputRef} 
                  onChange={handleChange} 
                />
                <div className="w-16 h-16 bg-orange-100 text-[#FF5A22] rounded-full flex items-center justify-center mb-4">
                  <FiUploadCloud size={32} />
                </div>
                <h4 className="font-bold text-gray-900 text-[15px] mb-1">Click or drag file to this area</h4>
                <p className="text-gray-400 text-xs">Only PDF files up to 100MB are supported.</p>
              </div>
            ) : (
              <div className="border border-gray-100 bg-gray-50 rounded-2xl p-4 flex items-center justify-between mb-2">
                <div className="flex items-center gap-4 overflow-hidden">
                  <div className="w-12 h-12 bg-red-100 text-red-500 rounded-xl flex items-center justify-center shrink-0">
                    <FiFileText size={24} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-bold text-gray-900 text-sm truncate">{selectedFile.name}</p>
                    <p className="text-gray-500 text-xs">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                </div>
                <button disabled={isUploading} onClick={removeFile} className="text-gray-400 hover:text-red-500 p-2 transition-colors shrink-0">
                  <FiX size={20} />
                </button>
              </div>
            )}

            <div className="flex gap-4 mt-8">
              <button 
                disabled={isUploading} 
                onClick={() => { setIsUploadModalOpen(false); removeFile(); }} 
                className="flex-1 py-3.5 rounded-2xl border border-gray-200 text-gray-600 font-bold text-[15px] hover:bg-gray-50 transition-all disabled:opacity-50"
              >
                Cancel
              </button>
              <button 
                disabled={!selectedFile || isUploading} 
                onClick={confirmUpload} 
                className="flex-1 py-3.5 rounded-2xl bg-[#FF5A22] text-white font-bold text-[15px] hover:bg-[#E04B1A] flex justify-center items-center shadow-md shadow-orange-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Upload File"}
              </button>
            </div>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setErrorMessage("")}>
          <div className="bg-white rounded-[24px] p-6 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="w-14 h-14 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiAlertCircle size={28} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Upload Issue</h3>
            <p className="text-gray-500 text-center mb-6 text-[14px] leading-relaxed">
              {errorMessage}
            </p>
            <button 
              onClick={() => setErrorMessage("")} 
              className="w-full bg-red-500 hover:bg-red-600 active:scale-[0.98] transition-all text-white font-bold py-3.5 rounded-xl shadow-sm shadow-red-200"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {isRescheduleOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-[2px]" onClick={() => setIsRescheduleOpen(false)}>
          <div className="bg-white rounded-t-[32px] sm:rounded-[32px] p-6 md:p-8 w-full max-w-md shadow-2xl animate-in slide-in-from-bottom sm:zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6 sm:hidden"></div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Reschedule Request</h3>
            <p className="text-gray-400 text-[13px] mb-6 leading-relaxed font-medium">
              Select the reason for rescheduling. This will notify the student immediately.
            </p>

            <div className="space-y-3 mb-6">
              {rescheduleOptions.map((option) => (
                <div key={option.id} onClick={() => setSelectedReason(option.id)}
                  className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${selectedReason === option.id ? "border-orange-500 bg-orange-50/50" : "border-gray-100 hover:border-orange-200"}`}
                >
                  <option.icon className={`text-xl ${selectedReason === option.id ? "text-orange-500" : "text-gray-400"}`} />
                  <span className={`font-semibold text-sm ${selectedReason === option.id ? "text-orange-700" : "text-gray-700"}`}>
                    {option.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mb-8">
              <span className="text-[13px] font-bold text-gray-900 block mb-2">Or provide a custom reason</span>
              <textarea rows="3" placeholder="Enter custom reason (if applicable)" 
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                className="w-full border border-gray-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none transition-all placeholder:text-gray-400"
              ></textarea>
            </div>

            <button 
              onClick={handleWhatsAppRedirect} 
              className="w-full bg-[#FF5A22] hover:bg-[#E04B1A] active:scale-[0.98] transition-all text-white font-bold py-4 rounded-[20px] flex items-center justify-center gap-2 shadow-sm shadow-orange-200"
            >
              <IoChatbubblesOutline size={20} />
              Chat with Support
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default function SubSessionPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-[#FF5A22]" />
      </div>
    }>
      <SubSessionContent />
    </Suspense>
  );
}