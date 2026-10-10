"use client";
import React, { use, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FaChevronLeft,
  FaCalendarAlt,
  FaRegClock,
  FaHourglassHalf,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { IoHourglassOutline } from "react-icons/io5";
import { Loader2, Calendar, CheckCircle, VideoOff, Download } from "lucide-react";
import SlotBookPopup from "@/components/SlotBookPopup";

const SubSessionPage = ({ params }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sessionId = searchParams.get("sessionId");
  const subsessionid = searchParams.get("subsessionId");

  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isSlotPopupOpen, setIsSlotPopupOpen] = useState(false);

  // Update real-time clock every minute to check for button activation
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(
          `https://mobileapp.backend.learnosphere.in/api/session/v1/get_booking_details_by_bookingId/${sessionId}`,
        );
        const data = await response.json();
        if (data.success) {
          setBookingData(data.booking);
        }
      } catch (error) {
        console.error("Error fetching sub-session:", error);
      } finally {
        setLoading(false);
      }
    };
    if (sessionId) fetchDetails();
  }, [sessionId]);

  const handleScheduleSubmit = async (selectedSlot) => {
    let newTime;
    try {
      if (typeof selectedSlot === "string" && selectedSlot.includes("•")) {
        const parts = selectedSlot.split("•");
        const datePart = parts[0].trim();
        const timePart = parts[1].trim();
        const currentYear = new Date().getFullYear();
        const validDateString = `${datePart} ${currentYear} ${timePart}`;
        const parsedDate = new Date(validDateString);

        if (parsedDate < new Date() && parsedDate.getMonth() < new Date().getMonth()) {
          parsedDate.setFullYear(currentYear + 1);
        }
        newTime = parsedDate.toISOString();
      } else {
        const tempTime = selectedSlot?.timeISO || selectedSlot?.id || selectedSlot;
        newTime = new Date(tempTime).toISOString();
      }
    } catch (err) {
      console.error("Format conversion failed:", err);
      alert("Error: Format galat hai.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `https://mobileapp.backend.learnosphere.in/api/session/v1/schedule_session_from_package`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bookingId: sessionId,
            sessionId: subsessionid,
            scheduledTime: newTime,
            isReschedule: true,
          }),
        },
      );
      const data = await response.json();
      if (data.success) {
        window.location.reload();
      } else {
        alert(data.message || "Failed to schedule the session.");
      }
    } catch (error) {
      console.error("Scheduling failed:", error);
    } finally {
      setLoading(false);
      setIsSlotPopupOpen(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );

  const currentSession = bookingData?.sessions?.find(
    (s) => s.sessionId === subsessionid,
  );
  if (!currentSession) return null;

  // --- LOGIC FOR 10 MINUTE ACTIVATION ---
  const isScheduled = currentSession.scheduledTime !== null;
  const sessionStartTime = isScheduled ? new Date(currentSession.scheduledTime) : null;
  
  // Create activation time (StartTime - 10 minutes)
  const joinActivationTime = sessionStartTime 
    ? new Date(sessionStartTime.getTime() - 10 * 60000) 
    : null;

  // Button becomes active if current time is >= activation time
  const isTimeForSession = isScheduled && currentTime >= joinActivationTime;
  const isCompleted = currentSession.displayStatus === "completed";
  
  // PDF URL 
  const pdfUrlToOpen = currentSession.sessionNotesFile ;

  const formatDate = (dateStr) => {
    if (!dateStr) return { date: "TBD", time: "Not set" };
    const d = new Date(dateStr);
    return {
      date: d.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      time: d.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };
  };

  const { date, time } = formatDate(currentSession.scheduledTime);

  return (
    <div className="max-w-6xl mx-auto bg-white min-h-screen font-sans pb-10 shadow-sm border-x border-gray-50 px-4 md:px-8">
      {/* Header */}
      <div className="flex items-center py-6 border-b border-gray-50 mb-6">
        <button
          onClick={() => router.back()}
          className="p-2.5 bg-gray-50 hover:bg-gray-100 rounded-full transition-all"
        >
          <FaChevronLeft className="w-4 h-4 text-gray-800" />
        </button>
        <h1 className="ml-4 text-xl font-bold text-gray-900">
          Session {currentSession.sessionNumber}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-2">
        <div className="lg:col-span-7">
          
          {/* PROGRESS BAR */}
          <div className="bg-slate-50/50 rounded-2xl p-6 pb-10 mb-12 mt-2">
            <div className="relative flex justify-between items-center w-full max-w-full mx-auto">
              <div className="absolute top-1/2 left-[12px] right-[12px] h-[2px] bg-gray-200 -translate-y-1/2 z-0"></div>
              
              {isScheduled && (
                <div
                  className="absolute top-1/2 left-[12px] h-[2px] bg-orange-500 -translate-y-1/2 z-0 transition-all duration-700"
                  style={{ width: isCompleted ? "calc(100% - 24px)" : "calc(33.33% - 8px)" }}
                ></div>
              )}

              {["Init", "Scheduled", "Live", "Done"].map((step, i) => {
                const isFinished = isCompleted || (isScheduled && i <= 1) || (!isScheduled && i === 0);
                return (
                  <div key={step} className="z-10 flex flex-col items-center justify-center relative">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 bg-white ${isFinished ? "border-orange-500" : "border-gray-200"}`}>
                      <div className={`w-2 h-2 rounded-full ${isFinished ? "bg-orange-500" : "bg-gray-200"}`}></div>
                    </div>
                    <span className={`absolute top-8 text-[10px] font-bold whitespace-nowrap ${isFinished ? "text-gray-800" : "text-gray-400"}`}>
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-10 bg-white border border-gray-100 rounded-[32px] shadow-sm">
            <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-6">
              <div className="p-4 bg-white shadow-lg rounded-2xl border border-orange-50">
                <Calendar className={`w-10 h-10 ${isScheduled ? "text-orange-500" : "text-orange-300"}`} />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              {isCompleted ? "Session Finished" : isScheduled ? "Session Scheduled" : "Not Scheduled Yet"}
            </h2>
            <p className="text-base text-orange-500 font-semibold">Subject: {bookingData.subject}</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#F9FAFB] border border-gray-50 rounded-[32px] p-8 space-y-6">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Session Details</h3>
            <div className="flex justify-between items-center">
              <div className="flex items-center text-gray-400 gap-3 font-medium"><IoHourglassOutline size={18} /> <span className="text-sm">Duration</span></div>
              <span className="text-sm font-bold text-gray-900">{currentSession.durationMinutes} Mins</span>
            </div>
            <div className="h-[1px] bg-gray-100 w-full"></div>
            <div className="flex justify-between items-center">
              <div className="flex items-center text-gray-400 gap-3 font-medium"><FaCalendarAlt size={16} /> <span className="text-sm">Date</span></div>
              <span className="text-sm font-bold text-gray-900">{date}</span>
            </div>
            <div className="h-[1px] bg-gray-100 w-full"></div>
            <div className="flex justify-between items-center">
              <div className="flex items-center text-gray-400 gap-3 font-medium"><FaRegClock size={16} /> <span className="text-sm">Time</span></div>
              <span className="text-sm font-bold text-gray-900">{time}</span>
            </div>
          </div>

          <div className="space-y-4">
            {/* 🚀 NEW STRICT PDF LOGIC HERE */}
            {isCompleted ? (
              <button
                onClick={() => pdfUrlToOpen ? window.open(pdfUrlToOpen, "_blank") : null}
                disabled={!pdfUrlToOpen}
                className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 text-sm transition-all group ${
                  pdfUrlToOpen
                    ? "bg-orange-50 border border-orange-200 text-orange-600 hover:bg-orange-100 hover:border-orange-300 active:scale-95 shadow-sm cursor-pointer"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                <Download className={`w-4 h-4 ${pdfUrlToOpen ? "group-hover:scale-110 transition-transform" : "text-gray-400"}`} /> 
                Download Session PDF
              </button>
            ) : isTimeForSession ? (
              <button
                onClick={() => window.open(currentSession.zoomJoinUrl || currentSession.meetingLink, "_blank")}
                className="w-full bg-orange-500 text-white py-4 rounded-2xl font-bold shadow-lg shadow-orange-100 hover:bg-orange-600 active:scale-95 transition-all flex items-center justify-center gap-2 text-sm"
              >
                <FaExternalLinkAlt className="w-3 h-3" /> Join Session Now
              </button>
            ) : isScheduled ? (
              <button disabled className="w-full bg-gray-100 text-gray-400 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 cursor-not-allowed text-sm">
                <VideoOff className="w-4 h-4 text-gray-300" /> Join Session
              </button>
            ) : (
              <button
                onClick={() => setIsSlotPopupOpen(true)}
                className="w-full bg-orange-500 text-white py-4 rounded-2xl font-bold shadow-lg shadow-orange-100 hover:bg-orange-600 active:scale-95 transition-all flex items-center justify-center gap-2 text-sm"
              >
                <FaCalendarAlt className="w-4 h-4" /> Schedule Session
              </button>
            )}

            {/* STRIPE DESIGN */}
            {isScheduled && !isTimeForSession && !isCompleted && (
              <div className="mt-4 flex justify-center">
                <div className="bg-red-50 border border-orange-100 px-5 py-2.5 rounded-xl flex items-center gap-2.5 shadow-sm">
                  <FaRegClock className="w-3.5 h-3.5 text-orange-500" /> 
                  <p className="text-[13px] md:text-sm text-gray-700 font-bold tracking-tight">
                    Join button will activate 10 minutes before the session starts
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Reschedule Section */}
          {currentSession.displayStatus === "confirmed" && !isCompleted && (
            <div className="bg-white border border-gray-100 rounded-[32px] p-6 shadow-sm">
              <button
                onClick={() => setIsSlotPopupOpen(true)}
                className="w-full border-2 border-orange-500 text-orange-500 font-bold py-3 rounded-2xl hover:bg-orange-50 transition-all text-sm flex items-center justify-center gap-2"
              >
                <FaCalendarAlt className="w-3 h-3" /> Reschedule Session
              </button>
            </div>
          )}
        </div>
      </div>

      {isSlotPopupOpen && (
        <SlotBookPopup
          onClose={() => setIsSlotPopupOpen(false)}
          onSelect={handleScheduleSubmit}
          tutorId={bookingData?.teacher?.registrationNumber}
        />
      )}
    </div>
  );
};

export default SubSessionPage;