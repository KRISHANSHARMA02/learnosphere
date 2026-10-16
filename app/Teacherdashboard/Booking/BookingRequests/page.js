"use client";
import React, { useState, useEffect } from "react";
import { FiCalendar } from "react-icons/fi";
import { MdLibraryBooks } from "react-icons/md";
import Head from "next/head";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import TeacherAppBanner from "@/components/TeacherAppBanner";

const BookingRequest = () => {
  const router = useRouter();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);

  // Helper to determine the badge styling based on status
  const getBadgeStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
      case "completed":
        return "bg-green-50 text-green-600 border-green-200";
      case "rejected":
      case "cancelled":
        return "bg-gray-100 text-gray-500 border-gray-200";
      case "pending":
      default:
        return "bg-orange-50 text-orange-500 border-orange-200";
    }
  };

  // Helper to format dates cleanly (e.g., "Mar 10, 2026")
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const { data: session, status } = useSession();

  // Fetch Dynamic Teacher ID, then Fetch Bookings
  useEffect(() => {
    const fetchData = async () => {
      if (status === "loading") return;
      if (!session?.user?.email) {
        setLoading(false);
        return;
      }

      try {
        const profileResponse = await axios.post(
          "https://learnospherebackend.learnosphere.in/api/route/getTeacherByEmail",
          { gmail: session.user.email }
        );

        const dynamicTeacherId = profileResponse.data?.data?.RegistrationNumber;

        if (!dynamicTeacherId) {
          console.error("Teacher Registration Number not found.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `https://mobileapp.backend.learnosphere.in/api/session/v1/get_teacher_bookings?teacherId=${dynamicTeacherId}`
        );

        if (response.data.success) {
          setBookings(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session, status]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9FBFC]">
        <Loader2 className="w-10 h-10 animate-spin text-orange-500 mb-4" />
        <p className="text-slate-500 font-medium">Loading your bookings...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FBFC] p-4 md:p-8 lg:p-12 font-sans antialiased">
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <h2 className="text-2xl font-semibold text-center mb-10 text-slate-800 tracking-tight">
        Booking Requests
      </h2>

      {bookings.length === 0 ? (
        <div className="max-w-[1050px] mx-auto">
          <TeacherAppBanner
            title="Get 10x More Student Bookings with the Learnosphere Tutor App!"
            subtitle="Web inquiries are synced with our mobile educator network. Over 85% of bookings are confirmed instantly by tutors on the mobile app with real-time push alerts. Switch now to start receiving student requests!"
            badge="💰 BOOST YOUR BOOKINGS"
          />
        </div>
      ) : (
        <div className="max-w-[1050px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.slice(0, visibleCount).map((booking) => {
            const statusLower = booking.status?.toLowerCase() || "pending";
            const isActive = !["rejected", "cancelled"].includes(statusLower);

            return (
              <div
                key={booking.bookingId}
                onClick={() => isActive && router.push(`/Teacherdashboard/Booking/${booking.bookingId}`)}
                className={`group relative overflow-hidden border-2 rounded-[2rem] p-6 flex flex-col justify-between transition-all duration-200 ${
                  isActive
                    ? "bg-white border-slate-200/60 shadow-sm hover:shadow-md hover:border-orange-300 cursor-pointer"
                    : "bg-red-50/10 border-red-500 cursor-not-allowed"
                }`}
                style={{ height: "240px" }}
              >
                {/* WATERMARK STAMP FOR REJECTED/CANCELLED */}
                {!isActive && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 overflow-hidden">
                    <div
                      className={`transform -rotate-[15deg] border-[3px] px-4 py-1.5 rounded-xl font-black text-lg md:text-xl uppercase tracking-[0.2em] select-none opacity-20 ${
                        statusLower === "rejected" || statusLower === "cancelled"
                          ? "text-red-600 border-red-600"
                          : "text-slate-600 border-slate-600"
                      }`}
                    >
                      {booking.status}
                    </div>
                  </div>
                )}

                {/* Header */}
                <div className={`space-y-1.5 relative z-10 ${!isActive && "opacity-60"}`}>
                  <h3 className="text-xl font-semibold tracking-tight text-slate-900">
                    {booking.studentName}
                  </h3>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-widest px-3 py-0.5 rounded-lg border inline-block ${getBadgeStyle(
                      booking.status
                    )}`}
                  >
                    {statusLower === "pending" ? "Pending Request" : booking.status}
                  </span>
                </div>

                {/* Info Row */}
                <div className={`flex justify-between items-center py-4 border-y border-slate-100 my-1 relative z-10 ${!isActive && "opacity-60"}`}>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-0.5">
                      <MdLibraryBooks className="text-slate-400 text-lg" />
                      <span className="font-semibold text-base tracking-tight text-slate-700">
                        {booking.subject || "General"}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 uppercase font-medium tracking-wider ml-7">
                      Subject
                    </span>
                  </div>

                  <div className="text-right">
                    <div className="text-xl font-bold leading-none text-slate-900">
                      <span className="text-sm font-medium text-slate-400 mr-0.5">₹</span>
                      {booking.amount}
                    </div>
                    <span className="text-[10px] text-slate-400 uppercase font-medium tracking-wider block mt-1">
                      Per Package
                    </span>
                  </div>
                </div>

                {/* Footer */}
                <div className={`flex items-center gap-3 relative z-10 ${!isActive && "opacity-60"}`}>
                  <div className="bg-slate-100 p-2 rounded-xl">
                    <FiCalendar className="text-slate-500" size={16} />
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider block mb-0.5">
                      Booking Date
                    </span>
                    <span className="text-sm font-medium text-slate-600">
                      {formatDate(booking.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Show More Button */}
      {bookings.length > visibleCount && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setVisibleCount(visibleCount + 3)}
            className="px-8 py-2.5 bg-white border border-slate-200 text-slate-600 font-semibold rounded-full text-xs hover:bg-slate-50 hover:border-orange-300 hover:text-orange-500 transition-all uppercase tracking-widest shadow-sm"
          >
            View More Requests
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingRequest;