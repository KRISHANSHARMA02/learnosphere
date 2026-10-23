"use client";
import { APP_BACKEND_URL } from "@/src/helper/appbackend_api";
import React, { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaChevronRight } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { IoHourglassOutline } from "react-icons/io5";
import { Loader2 } from "lucide-react";
import axios from "axios";

const TeacherBookingDetails = ({ params }) => {
  const router = useRouter();
  const resolvedParams = use(params);
  const sessionId = resolvedParams.sessionId;

  const [activeTab, setActiveTab] = useState("overview");
  const [showPendingModal, setShowPendingModal] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Modal States
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isAcceptLoading, setIsAcceptLoading] = useState(false);
  
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isRejectLoading, setIsRejectLoading] = useState(false);

  // 🚀 Fetch Real Booking Details from Local Backend
  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(
          `${APP_BACKEND_URL}/api/session/v1/get_session_details_for_teacher_app/${sessionId}`
        );
        if (response.data.success) {
          setBookingData(response.data.booking);
        } else {
          console.error("Failed to fetch booking:", response.data.message);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookingDetails();
  }, [sessionId]);

  // 🚀 Accept API Call
  const handleAcceptBooking = async () => {
    setIsAcceptLoading(true);
    try {
      const response = await axios.post(`${APP_BACKEND_URL}/api/session/v1/accept_booking_teacher`, {
        bookingId: sessionId
      });
      if (response.data.success) {
        setBookingData((prev) => ({ ...prev, status: "confirmed" }));
        setIsAcceptModalOpen(false);
      }
    } catch (error) {
      console.error("Accept error:", error);
      alert("Failed to accept booking.");
    } finally {
      setIsAcceptLoading(false);
    }
  };

  // 🚀 Reject API Call
  const handleRejectBooking = async () => {
    setIsRejectLoading(true);
    try {
      const response = await axios.post(`${APP_BACKEND_URL}/api/session/v1/reject_booking_by_teacher`, {
        bookingId: sessionId
      });
      if (response.data.success) {
        setIsRejectModalOpen(false);
        // After successfully rejecting, send the teacher back to the requests list
        router.push("/Teacherdashboard/Booking/BookingRequests"); 
      }
    } catch (error) {
      console.error("Reject error:", error);
      alert("Failed to reject booking.");
    } finally {
      setIsRejectLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-[#FF5A22] mb-4" />
        <p className="text-gray-500 font-medium">Loading details...</p>
      </div>
    );
  }

  if (!bookingData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <p className="text-gray-500 font-medium">Booking not found.</p>
        <button onClick={() => router.back()} className="mt-4 text-[#FF5A22] font-bold hover:underline">Go Back</button>
      </div>
    );
  }

  const currentStatus = bookingData.status.toUpperCase();
  const isPending = currentStatus === "PENDING";
  const canAccessSessions = currentStatus === "CONFIRMED" || currentStatus === "COMPLETED";

  const progressPercent = bookingData.totalSessions > 0 
    ? Math.round((bookingData.completedSessions / bookingData.totalSessions) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8 lg:p-12 font-Poppins antialiased relative">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="text-gray-600 bg-white border border-gray-200 shadow-sm p-2.5 rounded-full hover:bg-gray-100 transition-all"
          >
            <FaArrowLeft size={14} />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Booking Details</h1>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-6 md:p-8 lg:p-10 min-h-[60vh]">
          {/* Tabs Navigation */}
          <div className="flex border-b border-gray-100 mb-8 gap-8">
            {["overview", "sessions"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-2 text-sm font-bold transition-all relative capitalize ${activeTab === tab ? "text-[#FF5A22]" : "text-gray-400 hover:text-gray-600"}`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#FF5A22] rounded-t-md"></span>
                )}
              </button>
            ))}
          </div>

          {/* Banner Section - 🚀 NOW FULLY CLICKABLE! */}
          <div 
            onClick={() => router.push(`/Teacherdashboard/Booking/${sessionId}/summary`)}
            className="bg-gradient-to-r from-[#FF5A22] to-orange-400 rounded-[24px] p-6 md:p-8 text-white mb-8 relative overflow-hidden cursor-pointer hover:shadow-lg hover:scale-[1.01] transition-all duration-300"
          >
            <div className="flex justify-between items-center relative z-10">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center shrink-0 bg-white/20">
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
                    <span className="text-xs font-black text-[#FF5A22]">{progressPercent}%</span>
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{bookingData.student?.name || "Student"}</h2>
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 px-3 py-0.5 rounded-full inline-block mt-1">
                    {bookingData.subject || "General"}
                  </span>
                </div>
              </div>
              {/* 🚀 ADDED THE ARROW ICON BACK */}
              <FaChevronRight className="opacity-80 text-2xl" />
            </div>
          </div>

          {activeTab === "overview" && (
            <div className="animate-in fade-in duration-300">
              {isPending && (
                <div className="bg-[#FFF8F0] border border-orange-100 rounded-2xl p-6 mb-8 flex gap-4">
                  <div className="text-[#FF5A22] mt-1">
                    <IoHourglassOutline size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">This booking is awaiting your confirmation.</h4>
                    <p className="text-sm text-gray-500 mt-0.5 font-medium">
                      Please accept or reject this request to unlock session management.
                    </p>
                  </div>
                </div>
              )}

              {/* Info Grid */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Booking Information</h3>
                {[
                  { label: "Package", value: bookingData.packageName },
                  { label: "Mode", value: bookingData.mode },
                  { label: "Status", value: currentStatus, highlight: true },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-4 border-b border-gray-50 last:border-0">
                    <span className="text-gray-500 font-medium text-sm">{item.label}</span>
                    <span className={`font-bold text-sm ${
                      item.highlight && isPending ? "text-[#FF5A22]" : 
                      item.highlight && canAccessSessions ? "text-[#4ADE80]" : 
                      "text-gray-900"
                    }`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Payment Section */}
              <div className="mt-8 space-y-4">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Payment Information</h3>
                <div className="flex justify-between items-center py-4">
                  <span className="text-gray-500 font-medium text-sm">Total Amount</span>
                  <span className="font-bold text-sm text-gray-900">{bookingData.currencySymbol || "₹"}{bookingData.amount}</span>
                </div>
              </div>

              {/* Action Bar - ONLY show if Pending */}
              {isPending && (
                <div className="mt-12 flex items-center justify-between pt-8 border-t border-gray-100">
                  <button 
                    onClick={() => setIsRejectModalOpen(true)} // OPENS REJECT MODAL
                    className="text-gray-400 font-bold text-sm hover:text-red-500 hover:underline transition-colors"
                  >
                    Reject Booking
                  </button>
                  <button 
                    onClick={() => setIsAcceptModalOpen(true)} // OPENS ACCEPT MODAL
                    className="bg-[#FF5A22] text-white px-8 py-3.5 rounded-2xl font-bold text-sm shadow-md shadow-orange-200 hover:bg-[#E04B1A] active:scale-95 transition-all"
                  >
                    Accept & Continue
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === "sessions" && (
            <div className="animate-in fade-in duration-300">
              {(!bookingData.sessions || bookingData.sessions.length === 0) ? (
                <p className="text-center text-gray-500 py-10">No sessions found.</p>
              ) : (
                bookingData.sessions.map((session) => (
                  <div
                    key={session.sessionId}
                    onClick={() => {
                      if (!canAccessSessions) return setShowPendingModal(true); 
                      // Routes using real session IDs
                      router.push(`/Teacherdashboard/Booking/subsessionid?sessionId=${sessionId}&subsessionId=${session.sessionId}`);
                    }}
                    className={`flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl mb-4 transition-all group ${!canAccessSessions ? "opacity-60 grayscale cursor-not-allowed" : "hover:shadow-md cursor-pointer hover:border-orange-100"}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 font-bold rounded-xl flex items-center justify-center text-sm ${
                        session.displayStatus === "completed" ? "bg-green-50 text-green-500" : 
                        session.displayStatus === "scheduled" || session.displayStatus === "ongoing" ? "bg-orange-50 text-[#FF5A22]" : 
                        "bg-gray-100 text-gray-400"
                      }`}>
                        {session.displayStatus === "completed" ? "✓" : session.sessionNumber}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">Session {session.sessionNumber}</h4>
                        <p className="text-xs font-medium text-gray-400 mt-0.5">
                          {session.scheduledTime ? new Date(session.scheduledTime).toLocaleDateString() : "Time not set yet"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase ${
                        session.displayStatus === "completed" ? "bg-green-50 text-green-600" : 
                        session.displayStatus === "scheduled" || session.displayStatus === "ongoing" ? "bg-orange-50 text-[#FF5A22] border border-orange-100" : 
                        "bg-slate-50 text-slate-400"
                      }`}>
                        {session.displayStatus}
                      </span>
                      <FaChevronRight className="text-gray-300 group-hover:text-[#FF5A22]" size={12} />
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* ACCESS RESTRICTED MODAL (For clicking sessions while pending) */}
      {showPendingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm" onClick={() => setShowPendingModal(false)}>
          <div className="bg-white rounded-[24px] p-8 max-w-sm w-full shadow-2xl animate-in zoom-in-95" onClick={(e) => e.stopPropagation()}>
            <div className="w-14 h-14 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiClock size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 text-center mb-2">Access Restricted</h3>
            <p className="text-gray-400 text-center mb-6 text-sm leading-relaxed">
              Please accept or reject this booking before accessing session controls.
            </p>
            <button onClick={() => setShowPendingModal(false)} className="w-full text-[#FF5A22] font-bold py-2 text-sm text-center">
              Understood
            </button>
          </div>
        </div>
      )}

      {/* 🚀 ACCEPT BOOKING CONFIRMATION POP-UP */}
      {isAcceptModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-[2px]"
          onClick={() => !isAcceptLoading && setIsAcceptModalOpen(false)}
        >
          <div 
            className="bg-white rounded-t-[32px] sm:rounded-[32px] p-6 md:p-8 w-full max-w-sm shadow-2xl animate-in slide-in-from-bottom sm:zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6 sm:hidden"></div>
            <h3 className="text-[19px] font-bold text-gray-900 text-center mb-2 uppercase tracking-wide">
              Accept Booking
            </h3>
            <p className="text-gray-500 text-sm text-center mb-8 leading-relaxed px-2">
              Are you sure you want to accept this booking? This action cannot be undone.
            </p>
            <div className="flex items-center gap-4">
              <button 
                disabled={isAcceptLoading}
                onClick={() => setIsAcceptModalOpen(false)} 
                className="flex-1 py-3.5 rounded-[18px] border border-[#FF5A22] text-[#FF5A22] font-bold text-[15px] bg-white hover:bg-orange-50 disabled:opacity-50 transition-all"
              >
                Cancel
              </button>
              <button 
                disabled={isAcceptLoading}
                onClick={handleAcceptBooking} 
                className="flex-1 py-3.5 rounded-[18px] bg-[#FF5A22] text-white font-bold text-[15px] hover:bg-[#E04B1A] shadow-md shadow-orange-200 flex justify-center disabled:opacity-50 transition-all"
              >
                {isAcceptLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🚀 REJECT BOOKING CONFIRMATION POP-UP */}
      {isRejectModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-[2px]"
          onClick={() => !isRejectLoading && setIsRejectModalOpen(false)}
        >
          <div 
            className="bg-white rounded-t-[32px] sm:rounded-[32px] p-6 md:p-8 w-full max-w-sm shadow-2xl animate-in slide-in-from-bottom sm:zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6 sm:hidden"></div>
            <h3 className="text-[19px] font-bold text-red-600 text-center mb-2 uppercase tracking-wide">
              Reject Booking
            </h3>
            <p className="text-gray-500 text-sm text-center mb-8 leading-relaxed px-2">
              This will decline the request, notify the student, and remove it from your list. Continue?
            </p>
            <div className="flex items-center gap-4">
              <button 
                disabled={isRejectLoading}
                onClick={() => setIsRejectModalOpen(false)} 
                className="flex-1 py-3.5 rounded-[18px] border border-gray-300 text-gray-600 font-bold text-[15px] hover:bg-gray-50 disabled:opacity-50 transition-all"
              >
                Cancel
              </button>
              <button 
                disabled={isRejectLoading}
                onClick={handleRejectBooking} 
                className="flex-1 py-3.5 rounded-[18px] bg-red-600 text-white font-bold text-[15px] hover:bg-red-700 shadow-md shadow-red-200 flex justify-center disabled:opacity-50 transition-all"
              >
                {isRejectLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Reject"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherBookingDetails;