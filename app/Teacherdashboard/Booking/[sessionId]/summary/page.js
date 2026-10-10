"use client";
import React, { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaUser } from 'react-icons/fa';
import { IoCheckmarkCircle } from "react-icons/io5";
import { Loader2 } from 'lucide-react';
import Head from 'next/head';
import axios from 'axios';

const BookingSummary = ({ params }) => {
  const router = useRouter();
  const resolvedParams = use(params);
  const sessionId = resolvedParams.sessionId;

  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper to format dates for the timeline
  const formatDateTime = (dateString) => {
    if (!dateString) return "Not Scheduled";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  // 🚀 Dynamic Fetch from API
  useEffect(() => {
    const fetchSummaryDetails = async () => {
      try {
        const response = await axios.get(
          `https://mobileapp.backend.learnosphere.in/api/session/v1/get_session_details_for_teacher_app/${sessionId}`
        );
        
        if (response.data.success) {
          const booking = response.data.booking;
          
          // Map API response to your UI state
          setSummaryData({
            studentName: booking.student?.name || "Unknown Student",
            totalSessions: booking.totalSessions,
            completedSessions: booking.completedSessions,
            remainingSessions: booking.remainingSessions,
            packageType: booking.packageName,
            amount: booking.amount,
            paymentStatus: booking.paymentStatus || "Success",
            sessions: booking.sessions.map(s => ({
              id: s.sessionId,
              name: `Session ${s.sessionNumber}`,
              date: formatDateTime(s.scheduledTime),
              status: s.displayStatus // init, scheduled, completed
            }))
          });
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSummaryDetails();
  }, [sessionId]);

  if (loading || !summaryData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8 lg:p-12 font-Poppins antialiased">
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="max-w-6xl mx-auto w-full">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="text-gray-600 bg-white border border-gray-200 shadow-sm p-2.5 rounded-full hover:bg-gray-100 transition-all"
          >
            <FaArrowLeft size={14} />
          </button>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">Booking Summary</h1>
        </div>

        {/* TOP ROW: Student Card + Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-[#FFF8F0] rounded-[32px] p-6 lg:p-8 flex items-center gap-5 border border-orange-50 shadow-sm">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
              <FaUser className="text-orange-500 text-2xl" />
            </div>
            <div>
                <span className="text-xs font-bold text-orange-400 uppercase tracking-widest block mb-1">Student</span>
                <h2 className="text-2xl font-bold text-gray-900 leading-none">{summaryData.studentName}</h2>
            </div>
          </div>

          <div className="lg:col-span-2 grid grid-cols-3 gap-4 lg:gap-6 bg-white rounded-[32px] p-6 shadow-sm border border-gray-100">
            <div className="bg-[#F0F7FF] rounded-3xl p-4 flex flex-col items-center justify-center border border-blue-50">
              <span className="text-3xl font-bold text-[#3B82F6]">{summaryData.totalSessions}</span>
              <span className="text-xs font-bold text-[#3B82F6] mt-1 uppercase tracking-wider">Total</span>
            </div>
            <div className="bg-[#F0FDF4] rounded-3xl p-4 flex flex-col items-center justify-center border border-green-50">
              <span className="text-3xl font-bold text-[#22C55E]">{summaryData.completedSessions}</span>
              <span className="text-xs font-bold text-[#22C55E] mt-1 uppercase tracking-wider">Completed</span>
            </div>
            <div className="bg-[#FFF1F2] rounded-3xl p-4 flex flex-col items-center justify-center border border-red-50">
              <span className="text-3xl font-bold text-[#F43F5E]">{summaryData.remainingSessions}</span>
              <span className="text-xs font-bold text-[#F43F5E] mt-1 uppercase tracking-wider">Remaining</span>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: Details + Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm h-fit">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-1.5 h-5 bg-orange-500 rounded-full inline-block"></span>
                Payment Details
            </h3>
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center py-4 border-b border-gray-50">
                    <span className="text-gray-500 font-medium text-sm">Package</span>
                    <span className="font-bold text-gray-900 text-sm">{summaryData.packageType}</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-gray-50">
                    <span className="text-gray-500 font-medium text-sm">Amount</span>
                    <span className="font-bold text-gray-900 text-sm">₹{summaryData.amount}</span>
                </div>
                <div className="flex justify-between items-center py-4">
                    <span className="text-gray-500 font-medium text-sm">Payment Status</span>
                    <span className="font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs uppercase tracking-wider">
                        {summaryData.paymentStatus}
                    </span>
                </div>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-8 flex items-center gap-2">
                <span className="w-1.5 h-5 bg-orange-500 rounded-full inline-block"></span>
                Session Timeline
            </h3>
            <div className="space-y-8 relative ml-2">
              <div className="absolute left-[11px] top-6 bottom-6 w-[2px] bg-gray-100 -z-10"></div>
              
              {summaryData.sessions.map((session) => (
                <div key={session.id} className="flex gap-6 items-start">
                  <div className="bg-white shrink-0 mt-0.5">
                    {session.status === 'completed' ? (
                      <IoCheckmarkCircle className="text-[#22C55E] text-2xl" />
                    ) : (
                      <div className="w-6 h-6 rounded-full border-[3px] border-gray-200 bg-white"></div>
                    )}
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-4 flex-1 border border-gray-100/50">
                    <div className="flex justify-between items-start">
                        <div>
                            <h4 className="text-[15px] font-bold text-gray-900">{session.name}</h4>
                            <p className="text-[13px] text-gray-500 mt-1 font-medium">{session.date}</p>
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${
                            session.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'
                        }`}>
                            {session.status === 'init' ? 'Pending' : session.status}
                        </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BookingSummary;