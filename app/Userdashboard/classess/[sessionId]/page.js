"use client";
import { APP_BACKEND_URL } from "@/src/helper/appbackend_api";
import React, { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaChevronRight, FaRedo, FaRocket, FaGooglePlay, FaAppStore } from "react-icons/fa";
import { FiClock, FiAlertCircle } from "react-icons/fi"; 
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import {
  IoInformationCircleOutline,
  IoHourglassOutline,
  IoCheckmarkCircle,
} from "react-icons/io5"; 
import { FaCircleUser } from "react-icons/fa6";
import { Loader2 } from "lucide-react";

// 🚀 IMPORT useSession hook from NextAuth
import { useSession } from "next-auth/react";

const SessionDetails = ({ params }) => {
  const router = useRouter();

  const resolvedParams = use(params);
  const sessionId = resolvedParams.sessionId;

  // 🚀 EXTRACT SESSION DATA
  const { data: session } = useSession();

  const [activeTab, setActiveTab] = useState("overview");
  const [showPendingModal, setShowPendingModal] = useState(false);
  const [showRebookModal, setShowRebookModal] = useState(false);

  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await fetch(
          `${APP_BACKEND_URL}/api/session/v1/get_booking_details_by_bookingId/${sessionId}`,
        );
        const data = await response.json();

        if (data.success) {
          setBookingData(data.booking);
        } else {
          console.error("Failed to fetch booking details:", data.message);
        }
      } catch (error) {
        console.error("Network error fetching booking:", error);
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) {
      fetchBookingDetails();
    }
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  if (!bookingData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Booking Not Found
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          We couldn't find the details for this session.
        </p>
        <button
          onClick={() => router.back()}
          className="text-orange-500 text-sm font-bold hover:underline"
        >
          Go Back
        </button>
      </div>
    );
  }

  const currentSession = bookingData.sessions?.[0] || {};
  const isScheduled = currentSession.scheduledTime !== null;
  const sessionStartTime = isScheduled
    ? new Date(currentSession.scheduledTime)
    : null;

  const joinActivationTime = isScheduled
    ? new Date(sessionStartTime.getTime() - 10 * 60000)
    : null;
  const isTimeForSession = isScheduled && currentTime >= joinActivationTime;
  const isCompleted = currentSession.status === "completed";

  const overallStatus = bookingData.status?.toLowerCase() || "";
  const isBookingActive =
    overallStatus === "confirmed" || overallStatus === "completed";

  const progressPercent =
    bookingData.totalSessions > 0
      ? Math.round(
          (bookingData.completedSessions / bookingData.totalSessions) * 100,
        )
      : 0;

  const totalHoursCalculated = bookingData.totalSessions * 1.0;

  const sessionData = {
    id: bookingData.bookingId,
    title: bookingData.packageName || "Single Session",
    subject: bookingData.subject || "General",
    mode: bookingData.mode || "Online",
    completedSessions: bookingData.completedSessions || 0,
    totalSessions: bookingData.totalSessions || 1,
    progress: progressPercent,
    totalHours: totalHoursCalculated,
    remainingSessions: bookingData.remainingSessions || 0,
    status: bookingData.status || "active",
    tutorName: bookingData.teacher?.name || "Tutor Not Assigned",
    tutorImage: bookingData.teacher?.profileImage || null,
    tutorTitle: "Expert Educator",
    packageDetails: {
      paidSessions: bookingData.paidSessions || 0,
      freeSessions: bookingData.freeSessions || 0,
      totalSessions: bookingData.totalSessions || 0,
      perSessionCost:
        bookingData.paidSessions > 0
          ? bookingData.amount / bookingData.paidSessions
          : 0,
      totalPaid: bookingData.amount || 0,
      currencySymbol: bookingData.currencySymbol || "₹",
    },
  };

  const sessionsList =
    bookingData.sessions?.map((s) => {
      let subtitleText = "Action Required: Schedule Now";
      let statusTheme = "action_required";

      if (s.displayStatus === "completed") {
        subtitleText = "Completed";
        statusTheme = "completed";
      } else if (
        (s.displayStatus === "confirmed" ||
          s.displayStatus === "pending" ||
          s.displayStatus === "scheduled") &&
        s.scheduledTime
      ) {
        const dateObj = new Date(s.scheduledTime);
        const dateStr = dateObj.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
        const timeStr = dateObj.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        });
        subtitleText = `${dateStr} • ${timeStr}`;
        statusTheme = "confirmed";
      }

      return {
        id: s.sessionId,
        sessionNumber: s.sessionNumber,
        title: `Session ${s.sessionNumber}`,
        subtitle: subtitleText,
        status: statusTheme,
      };
    }) || [];

  const getStatusAlert = (status, autoUpgrade) => {
    switch (status) {
      case "pending":
        return {
          title: "Awaiting Confirmation",
          message:
            "Your booking request is awaiting tutor confirmation. You will be notified once the tutor accepts.",
          bg: "bg-amber-50",
          border: "border-amber-200",
          text: "text-amber-800",
          iconColor: "text-amber-500",
          Icon: FiClock,
        };
      case "confirmed":
        return {
          title: "Booking Confirmed! 🎉",
          message:
            "Your tutor has accepted the request! Please check the 'Sessions' tab to schedule or join your classes.",
          bg: "bg-orange-50",
          border: "border-orange-200",
          text: "text-orange-800",
          iconColor: "text-orange-500",
          Icon: IoCheckmarkCircle,
        };
      case "rejected":
        if (autoUpgrade) {
          return {
            title: "Finding a New Tutor",
            message:
              "Your assigned tutor was unavailable. We are currently assigning a new tutor to ensure uninterrupted learning.",
            bg: "bg-indigo-50",
            border: "border-indigo-200",
            text: "text-indigo-800",
            iconColor: "text-indigo-500",
            Icon: IoInformationCircleOutline,
          };
        } else {
          return {
            title: "Booking Declined",
            message:
              "The tutor declined your booking. The full amount has been refunded to your wallet.",
            bg: "bg-red-50",
            border: "border-red-200",
            text: "text-red-800",
            iconColor: "text-red-500",
            Icon: FiAlertCircle,
          };
        }
      case "cancelled":
        return {
          title: "Booking Cancelled",
          message:
            "This booking has been cancelled. Please contact support if you need assistance.",
          bg: "bg-gray-100",
          border: "border-gray-300",
          text: "text-gray-800",
          iconColor: "text-gray-500",
          Icon: FiAlertCircle,
        };
      case "completed":
        return {
          title: "Congratulations! 🎉",
          message:
            "You have successfully completed this learning package. You can revisit your session history and recordings anytime.",
          bg: "bg-emerald-50",
          border: "border-emerald-200",
          text: "text-emerald-800",
          iconColor: "text-emerald-500",
          Icon: IoCheckmarkCircle,
        };
      default:
        return null;
    }
  };

  const statusAlert = getStatusAlert(overallStatus, bookingData.autoUpgrade);

 
  const handleWhatsAppRedirect = () => {
    // Data nikal rahe hain
    const studentName = session?.user?.name ? session.user.name : "a student";
    const tutorName = sessionData.tutorName !== "Tutor Not Assigned" ? sessionData.tutorName : "Tutor";
    const subject = sessionData.subject;


    const customMessage = encodeURIComponent(
      `Hello ! This is ${studentName}. I have booked your ${subject} classes on Learnosphere and wanted to connect regarding our upcoming sessions.`
    );
    
    // Open WhatsApp in a new tab
    window.open(`https://wa.me/918769600449?text=${customMessage}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8 lg:p-12 font-Poppins relative">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="text-gray-600 bg-white border border-gray-200 shadow-sm p-2.5 rounded-full hover:bg-gray-100 hover:text-gray-900 transition-all"
          >
            <FaArrowLeft size={16} />
          </button>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">
              Booking Details
            </h1>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-6 md:p-8 lg:p-10 min-h-[60vh]">
          {/* TABS NAVIGATION */}
          <div className="flex border-b border-gray-200 mb-8 gap-8">
            <button
              onClick={() => setActiveTab("overview")}
              className={`pb-3 px-2 text-sm md:text-base font-bold transition-all relative ${activeTab === "overview" ? "text-orange-500" : "text-gray-400 hover:text-gray-600"}`}
            >
              Overview
              {activeTab === "overview" && (
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-orange-500 rounded-t-md"></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("sessions")}
              className={`pb-3 px-2 text-sm md:text-base font-bold transition-all relative ${activeTab === "sessions" ? "text-orange-500" : "text-gray-400 hover:text-gray-600"}`}
            >
              Sessions
              {activeTab === "sessions" && (
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-orange-500 rounded-t-md"></span>
              )}
            </button>
          </div>

          {/* TAB CONTENT: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="animate-in fade-in duration-300">
              {/* Main Orange Banner */}
              <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-[24px] p-6 md:p-8 text-white mb-8 relative overflow-hidden shadow-sm">
                <div className="absolute top-6 right-8 text-orange-200 opacity-60 transform scale-150">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    height="2.5em"
                    width="2.5em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M19 9l1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25z"></path>
                  </svg>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                  {sessionData.title}
                </h2>
                <p className="text-sm md:text-base text-orange-100 mt-1.5 font-medium tracking-wide">
                  {sessionData.subject} <span className="mx-2">•</span>{" "}
                  {sessionData.mode}
                </p>

                <div className="mt-8 max-w-2xl">
                  <div className="h-2 w-full bg-orange-300/40 rounded-full mb-2.5 shadow-inner">
                    <div
                      className="h-full bg-white rounded-full shadow-sm"
                      style={{ width: `${sessionData.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs md:text-sm font-medium text-orange-50">
                    <span>
                      {sessionData.completedSessions} /{" "}
                      {sessionData.totalSessions} Sessions Completed
                    </span>
                    <span className="font-bold text-base">
                      {sessionData.progress}%
                    </span>
                  </div>
                </div>
              </div>

              {/* DYNAMIC STATUS MESSAGE BANNER */}
              {statusAlert && (
                <div
                  className={`${statusAlert.bg} border ${statusAlert.border} rounded-2xl p-5 mb-8 flex gap-4 items-start shadow-sm`}
                >
                  <div className={`mt-0.5 ${statusAlert.iconColor}`}>
                    <statusAlert.Icon size={26} />
                  </div>
                  <div>
                    <h4
                      className={`font-bold ${statusAlert.text} text-base mb-1.5`}
                    >
                      {statusAlert.title}
                    </h4>
                    <p
                      className={`${statusAlert.text} opacity-90 text-sm leading-relaxed whitespace-pre-wrap`}
                    >
                      {statusAlert.message}
                    </p>
                  </div>
                </div>
              )}

              {/* Info Cards Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-orange-50/50 hover:bg-orange-50 transition-colors rounded-[20px] p-5 flex flex-col gap-1.5 border border-orange-100/60">
                  <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm mb-1.5">
                    <FiClock className="text-orange-500" size={18} />
                  </div>
                  <span className="text-xs text-gray-500 font-medium">
                    Total Hours
                  </span>
                  <span className="text-xl font-bold text-gray-900">
                    {sessionData.totalHours.toFixed(1)}
                  </span>
                </div>
                <div className="bg-orange-50/50 hover:bg-orange-50 transition-colors rounded-[20px] p-5 flex flex-col gap-1.5 border border-orange-100/60">
                  <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm mb-1.5">
                    <IoHourglassOutline className="text-orange-500" size={18} />
                  </div>
                  <span className="text-xs text-gray-500 font-medium">
                    Remaining
                  </span>
                  <span className="text-xl font-bold text-gray-900">
                    {sessionData.remainingSessions}
                  </span>
                </div>
                <div className="bg-orange-50/50 hover:bg-orange-50 transition-colors rounded-[20px] p-5 flex flex-col gap-1.5 border border-orange-100/60">
                  <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm mb-1.5">
                    <HiOutlineComputerDesktop
                      className="text-orange-500"
                      size={18}
                    />
                  </div>
                  <span className="text-xs text-gray-500 font-medium">
                    Mode
                  </span>
                  <span className="text-xl font-bold text-gray-900">
                    {sessionData.mode}
                  </span>
                </div>
                <div className="bg-orange-50/50 hover:bg-orange-50 transition-colors rounded-[20px] p-5 flex flex-col gap-1.5 border border-orange-100/60">
                  <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm mb-1.5">
                    <IoInformationCircleOutline
                      className="text-orange-500"
                      size={20}
                    />
                  </div>
                  <span className="text-xs text-gray-500 font-medium">
                    Status
                  </span>
                  <span
                    className={`text-xl font-bold capitalize ${overallStatus === "pending" ? "text-amber-500" : overallStatus === "cancelled" || overallStatus === "rejected" ? "text-red-500" : "text-gray-900"}`}
                  >
                    {sessionData.status}
                  </span>
                </div>
              </div>

              {/* Bottom Section: Side-by-Side */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Package Details Section */}
                <div className="lg:col-span-3 border border-gray-100 rounded-[20px] p-6 shadow-sm bg-gray-50/30">
                  <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                    <span className="w-1.5 h-5 bg-orange-500 rounded-full inline-block"></span>
                    Package Details
                  </h3>
                  <div className="flex flex-col gap-4 text-sm font-medium text-gray-500">
                    <div className="flex justify-between items-center bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm">
                      <span>Paid Sessions</span>
                      <span className="font-bold text-gray-900 text-base">
                        {sessionData.packageDetails.paidSessions}
                      </span>
                    </div>
                    <div className="flex justify-between items-center bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm">
                      <span>Free Sessions</span>
                      <span className="font-bold text-gray-900 text-base">
                        {sessionData.packageDetails.freeSessions}
                      </span>
                    </div>
                    <div className="flex justify-between items-center bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm">
                      <span>Total Sessions</span>
                      <span className="font-bold text-gray-900 text-base">
                        {sessionData.packageDetails.totalSessions}
                      </span>
                    </div>
                    <div className="flex justify-between items-center bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm">
                      <span>Per Session Cost</span>
                      <span className="font-bold text-gray-900 text-base">
                        {sessionData.packageDetails.currencySymbol}
                        {sessionData.packageDetails.perSessionCost.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="my-5 border-t border-gray-200"></div>
                  <div className="flex justify-between items-center text-base bg-orange-50 p-4 rounded-xl border border-orange-100">
                    <span className="font-bold text-gray-800">Total Paid</span>
                    <span className="font-extrabold text-orange-600 text-xl">
                      {sessionData.packageDetails.currencySymbol}
                      {sessionData.packageDetails.totalPaid}
                    </span>
                  </div>
                </div>

                {/* Tutor Profile Card */}
                <div className="lg:col-span-2 h-fit border border-gray-100 rounded-[20px] p-6 shadow-sm bg-white">
                  <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                    <span className="w-1.5 h-5 bg-orange-500 rounded-full inline-block"></span>
                    Your Educator
                  </h3>
                  <div className="flex flex-col items-center justify-center text-center p-2">
                    {sessionData.tutorImage ? (
                      <div className="w-20 h-20 rounded-full overflow-hidden shadow-sm mb-3 border-2 border-orange-100">
                        <img
                          src={sessionData.tutorImage}
                          alt={sessionData.tutorName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="bg-orange-50 p-3 rounded-full text-orange-300 mb-3 shadow-sm">
                        <FaCircleUser size={48} />
                      </div>
                    )}

                    <h3 className="text-xl font-bold text-gray-900 leading-tight">
                      {sessionData.tutorName}
                    </h3>
                    <p className="text-sm text-gray-500 font-medium mt-1 mb-5">
                      {sessionData.tutorTitle}
                    </p>

                    <button 
                      onClick={() => setShowRebookModal(true)} 
                      className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-xl text-sm shadow-md transition-all active:scale-95"
                    >
                      <FaRedo size={14} />
                      Rebook Again (via App)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: SESSIONS LIST */}
          {activeTab === "sessions" && (
            <div className="animate-in fade-in duration-300">
              <div className="flex flex-col gap-3 max-w-3xl">
                {sessionsList.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-6">
                    No sessions have been generated for this booking yet.
                  </p>
                ) : (
                  sessionsList.map((session) => (
                    <div
                      key={session.id}
                      onClick={() => {
                        if (!isBookingActive) {
                          setShowPendingModal(true);
                          return;
                        }

                        router.push(
                          `/Userdashboard/classess/subsessionid?sessionId=${bookingData.bookingId}&subsessionId=${session.id}`,
                        );
                      }}
                      className={`flex items-center justify-between p-4 bg-white border border-gray-200 shadow-sm rounded-2xl transition-all group ${
                        !isBookingActive
                          ? "opacity-60 grayscale cursor-not-allowed hover:shadow-none hover:border-gray-200"
                          : "hover:shadow-md hover:border-orange-200 cursor-pointer"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 md:w-12 md:h-12 font-bold rounded-[12px] flex items-center justify-center text-base md:text-lg ${
                            session.status === "confirmed" ||
                            session.status === "completed"
                              ? "bg-orange-50 text-orange-500"
                              : "bg-gray-50 text-gray-400"
                          }`}
                        >
                          {session.sessionNumber}
                        </div>

                        <div>
                          <h4 className="font-bold text-gray-900 text-base md:text-lg">
                            {session.title}
                          </h4>
                          <p
                            className={`text-xs md:text-sm font-medium mt-0.5 ${
                              session.status === "action_required"
                                ? "text-orange-500"
                                : "text-gray-500"
                            }`}
                          >
                            {session.subtitle}
                          </p>
                        </div>
                      </div>

                      <FaChevronRight
                        className="text-gray-300 group-hover:text-orange-500 transition-colors mr-2"
                        size={16}
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODERN POPUP MODAL FOR PENDING STATUS */}
      {showPendingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[24px] p-6 md:p-8 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-100">
              <FiClock size={28} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
              Awaiting Confirmation
            </h3>
            <p className="text-gray-500 text-center mb-6 text-sm leading-relaxed">
              Please wait until the teacher confirms your booking before
              scheduling or accessing your session details.
            </p>
            <button
              onClick={() => setShowPendingModal(false)}
              className="w-full bg-orange-500 text-white font-bold py-3 rounded-xl shadow-md shadow-orange-100 hover:bg-orange-600 active:scale-95 transition-all text-sm"
            >
              Understood
            </button>
          </div>
        </div>
      )}

      {/* REBOOK MODAL REDIRECTING TO APP */}
      {showRebookModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[28px] p-6 md:p-8 max-w-md w-full shadow-2xl relative text-center">
            <button
              onClick={() => setShowRebookModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-light"
            >
              &times;
            </button>
            <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-orange-100">
              <FaRocket size={26} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Rebook Session via Mobile App
            </h3>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              Booking and slot scheduling for educators is managed exclusively on the <strong>Learnosphere Mobile App</strong> for real-time calendar syncing and instant educator confirmation.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="https://play.google.com/store/apps/details?id=com.karotaraj.learnosphere_main"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all shadow-md shadow-orange-500/20"
              >
                <FaGooglePlay size={18} /> Open on Google Play
              </a>
              <a
                href="https://apps.apple.com/in/app/learnosphere-learning-app/id6748979882"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 bg-gray-900 hover:bg-black text-white font-bold py-3 px-4 rounded-xl text-sm transition-all"
              >
                <FaAppStore size={18} /> Open on App Store
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionDetails;