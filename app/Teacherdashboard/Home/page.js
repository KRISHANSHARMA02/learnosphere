"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import gif from "@/public/Teacher_gif_dashboard2.gif";
import {
  MdCurrencyRupee,
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineNotificationsActive,
  MdVideoCall,
  MdCloudUpload,
} from "react-icons/md";
import Aos from "aos";
import "aos/dist/aos.css";
import {
  FaAngleLeft,
  FaAngleRight,
  FaCheckCircle,
  FaTasks,
  FaCalendarAlt,
  FaGraduationCap,
  FaApple,
} from "react-icons/fa";
import { BsStopwatch } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import TeacherAppBanner from "@/components/TeacherAppBanner";
import playstore from "@/public/playstore.svg";

const Home = () => {
  const { data: session, status } = useSession();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [active7, setActive7] = useState("Upcoming Class");
  const [upcomingClasses, setUpcomingClasses] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const router = useRouter();

  const calculateTimeRemaining = (bookingDate) => {
    const classDate = new Date(bookingDate);
    const now = new Date();
    const timeDiff = classDate - now;

    if (timeDiff > 0) {
      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      return `${hours}h ${minutes}m left`;
    } else {
      return "Class time reached";
    }
  };

  useEffect(() => {
    Aos.init({ duration: 600 });
  }, []);

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < tasks.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handleViewMore = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Fetch teacher profile
  useEffect(() => {
    const fetchTeacherData = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const response = await axios.post(
            `${WEB_BACKEND_URL}/api/route/getTeacherByEmail`,
            {
              gmail: session.user.email,
            }
          );
          setProfileData(response.data?.data || null);
        } catch (error) {
          console.error("Error fetching teacher profile data:", error);
        }
      }
    };

    fetchTeacherData();
  }, [session, status]);

  // Fetch booking requests
  useEffect(() => {
    const fetchBookings = async () => {
      if (profileData) {
        try {
          const response = await axios.post(
            `${WEB_BACKEND_URL}/api/route/getAllRequests`,
            {
              teacherId: profileData.RegistrationNumber,
              teacherEmail: profileData.email,
              teacherSubject: profileData.subject,
            }
          );
          if (Array.isArray(response.data)) {
            setBookings(response.data);
          } else {
            setBookings([]);
          }
        } catch (err) {
          setBookings([]);
        }
      }
    };

    fetchBookings();
  }, [profileData]);

  // Handle accept booking
  const handleAcceptRequest = async (bookingId) => {
    if (!profileData) {
      setError("Teacher profile data is not available.");
      return;
    }

    setActionLoadingId(bookingId);
    try {
      await axios.post(
        `${WEB_BACKEND_URL}/api/route/acceptBooking`,
        {
          bookingId,
          teacherEmail: profileData.email,
          teacherDetails: {
            teacher_id: profileData.RegistrationNumber,
            name: profileData.name,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Booking Accepted",
        text: "The booking request has been accepted successfully! You can join the session from your schedule.",
        confirmButtonColor: "#ea580c",
      });

      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking.id !== bookingId)
      );
    } catch (error) {
      console.error("Error accepting booking request:", error);
      Swal.fire({
        icon: "error",
        title: "Could not accept",
        text: "Could not accept the booking. Please try again or use the mobile app for instant sync.",
        confirmButtonColor: "#ea580c",
      });
    } finally {
      setActionLoadingId(null);
    }
  };

  // Handle reject booking
  const handleRejectRequest = async (bookingId) => {
    if (!profileData) {
      setError("Teacher profile data is not available.");
      return;
    }

    setActionLoadingId(bookingId);
    try {
      await axios.post(
        `${WEB_BACKEND_URL}/api/route/rejectBooking`,
        {
          bookingId,
          teacherId: profileData.RegistrationNumber,
        }
      );

      Swal.fire({
        icon: "info",
        title: "Booking Declined",
        text: "The booking request was declined.",
        confirmButtonColor: "#ea580c",
      });

      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking.id !== bookingId)
      );
    } catch (error) {
      console.error("Error rejecting booking request:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Could not reject the booking. Please try again.",
        confirmButtonColor: "#ea580c",
      });
    } finally {
      setActionLoadingId(null);
    }
  };

  // Fetch tasks
  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      const fetchTasks = async () => {
        try {
          const teacherEmail = session.user.email;
          const response = await axios.get(
            `${WEB_BACKEND_URL}/api/route/gettaskforteacher/${teacherEmail}`
          );
          if (Array.isArray(response.data)) {
            setTasks(response.data);
          } else {
            setTasks([]);
          }
        } catch (err) {
          setTasks([]);
        } finally {
          setLoading(false);
        }
      };

      fetchTasks();
    }
  }, [status, session]);

  // Update task status
  const handleUpdateStatus = async (taskId) => {
    const currentTask = tasks.find((task) => task.id === taskId);
    if (!currentTask) return;
    const newStatus =
      currentTask.task_status === "pending" ? "completed" : "pending";

    try {
      const response = await axios.put(
        `${WEB_BACKEND_URL}/api/route/updateTaskStatus/${taskId}`,
        {
          task_status: newStatus,
        }
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, task_status: newStatus } : task
        )
      );
      Swal.fire({
        icon: "success",
        title: "Task Updated",
        text: response.data.message || `Task marked as ${newStatus}!`,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error updating task status:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Failed to update task status. Please retry.",
      });
    }
  };

  // Fetch upcoming classes
  useEffect(() => {
    const fetchClasses = async () => {
      if (status === "authenticated" && session?.user?.email) {
        const endpoint =
          `${WEB_BACKEND_URL}/api/route/getbookingsforteacher`;

        const params = new URLSearchParams();
        params.append("status", "upcoming");
        params.append("teacherEmail", session.user.email);

        try {
          const response = await axios.get(endpoint, { params });
          if (response.status === 200 && Array.isArray(response.data)) {
            setUpcomingClasses(response.data);
          } else {
            setUpcomingClasses([]);
          }
        } catch (error) {
          setUpcomingClasses([]);
        }
      }
    };

    fetchClasses();
  }, [session, status]);

  const handleViewBookingRequest = () => {
    router.push("/Teacherdashboard/Booking/BookingRequests");
  };

  const handleViewAllUpcomingClass = () => {
    router.push("/Teacherdashboard/Booking");
  };

  const handleSeeAllTasks = () => {
    router.push("/Teacherdashboard/Booking/TodaysTask");
  };

  return (
    <div className="space-y-8 px-4 md:px-8 pb-12 font-sans antialiased max-w-7xl mx-auto">
      {/* 🌟 HERO GREETING BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 p-6 md:p-10 text-white shadow-xl">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5 text-center md:text-left flex-col md:flex-row">
            <div className="relative shrink-0">
              <Image
                className="rounded-2xl shadow-lg border-2 border-white/20 bg-white/10"
                src={gif}
                height={120}
                width={120}
                alt="Teacher Welcome"
              />
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow">
                Active Tutor
              </span>
            </div>
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 bg-black/20 text-white text-xs px-3 py-1 rounded-full font-semibold">
                <FaGraduationCap /> Learnosphere Educator Studio
              </div>
              <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
                Welcome back, {session?.user?.name || "Educator"}! 👋
              </h1>
              <p className="text-white/90 text-sm md:text-base max-w-xl">
                Ready to mentor your students today? Accept live class bookings, share study notes, and track your daily payouts.
              </p>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="flex flex-wrap md:flex-col gap-2.5 shrink-0 w-full md:w-auto">
            <Link
              href="/Teacherdashboard/UploadContent"
              className="flex-1 md:flex-initial flex items-center justify-center gap-2 bg-white text-orange-600 hover:bg-orange-50 px-4 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all"
            >
              <MdCloudUpload size={18} /> Upload Material
            </Link>
            <Link
              href="/Teacherdashboard/Progress"
              className="flex-1 md:flex-initial flex items-center justify-center gap-2 bg-black/30 hover:bg-black/40 text-white border border-white/20 px-4 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all"
            >
              <MdCurrencyRupee size={18} /> View Earnings
            </Link>
          </div>
        </div>
      </div>

      {/* 📋 TODAY'S TASKS SECTION */}
      <section className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-orange-100 text-orange-600 rounded-xl">
              <FaTasks size={20} />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-slate-800">
                Today's Teaching Tasks
              </h2>
              <p className="text-xs text-slate-500">
                Review assigned milestones, course uploads, and daily targets
              </p>
            </div>
          </div>
          <button
            onClick={handleSeeAllTasks}
            className="text-xs font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 px-4 py-2 rounded-xl transition-colors"
          >
            View All Tasks →
          </button>
        </div>

        {loading ? (
          <div className="py-12 text-center text-slate-400">Loading your tasks...</div>
        ) : tasks.length > 0 ? (
          <div className="relative">
            {/* Task Card Slider */}
            <div className="flex justify-center items-center">
              <div
                key={tasks[currentIndex].id}
                className="w-full max-w-2xl bg-gradient-to-br from-slate-50 to-orange-50/40 rounded-2xl p-6 border border-orange-100 shadow-md relative"
                data-aos="fade-up"
              >
                <div className="flex justify-between items-start gap-4 mb-4">
                  <span
                    className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                      tasks[currentIndex].task_status === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    Status: {tasks[currentIndex].task_status}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    Task {currentIndex + 1} of {tasks.length}
                  </span>
                </div>

                <p className="text-slate-700 font-medium text-base mb-4 leading-relaxed line-clamp-3">
                  {tasks[currentIndex].task_description}
                </p>

                {tasks[currentIndex].task_description.length > 120 && (
                  <button
                    onClick={handleViewMore}
                    className="text-xs font-bold text-orange-600 underline hover:text-orange-700 mb-4 block"
                  >
                    Read full task description
                  </button>
                )}

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 border-t border-orange-100/60">
                  <button
                    onClick={() => handleUpdateStatus(tasks[currentIndex].id)}
                    className={`w-full sm:flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-white transition-all shadow-sm ${
                      tasks[currentIndex].task_status === "pending"
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-slate-600 hover:bg-slate-700"
                    }`}
                  >
                    {tasks[currentIndex].task_status === "pending"
                      ? "✓ Mark as Completed"
                      : "↺ Reopen Task"}
                  </button>

                  {tasks[currentIndex].task_status === "pending" && (
                    <Link
                      href="/Teacherdashboard/UploadContent"
                      className="w-full sm:flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-center bg-orange-600 hover:bg-orange-700 text-white shadow-sm transition-all"
                    >
                      Upload Submission →
                    </Link>
                  )}
                </div>

                <p className="text-[10px] text-slate-400 text-right mt-3">
                  Assigned on:{" "}
                  {new Date(tasks[currentIndex].created_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Slider Arrows */}
            {tasks.length > 1 && (
              <div className="flex justify-between items-center max-w-2xl mx-auto mt-4 px-2">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="p-2 rounded-full bg-slate-100 hover:bg-orange-100 text-slate-700 disabled:opacity-30 transition-colors"
                >
                  <FaAngleLeft size={18} />
                </button>
                <div className="flex gap-1.5">
                  {tasks.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all ${
                        i === currentIndex ? "w-6 bg-orange-500" : "w-1.5 bg-slate-200"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={handleNext}
                  disabled={currentIndex === tasks.length - 1}
                  className="p-2 rounded-full bg-slate-100 hover:bg-orange-100 text-slate-700 disabled:opacity-30 transition-colors"
                >
                  <FaAngleRight size={18} />
                </button>
              </div>
            )}
          </div>
        ) : (
          /* ✨ LOW DATA STATE: Prompt Tutor to use Mobile App for Daily Missions */
          <TeacherAppBanner
            variant="compact"
            badge="⚡ DAILY TEACHER MISSIONS"
            title="Unlock Daily Rewards & Student Queries on the Tutor App!"
            subtitle="Web tasks are currently all clear! Daily student questions, doubt bounties, and bonus earnings tasks are waiting for you in the Learnosphere Tutor Mobile App."
            isVerified={profileData?.is_approved === true || profileData?.is_approved === 1}
          />
        )}
      </section>

      {/* 🔔 PENDING BOOKING REQUESTS */}
      <section className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-100 text-amber-600 rounded-xl">
              <MdOutlineNotificationsActive size={20} />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-slate-800">
                Pending Student Bookings
              </h2>
              <p className="text-xs text-slate-500">
                Accept 1-on-1 sessions within time to secure student bookings
              </p>
            </div>
          </div>
          <button
            onClick={handleViewBookingRequest}
            className="text-xs font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 px-4 py-2 rounded-xl transition-colors"
          >
            All Bookings ({bookings.length}) →
          </button>
        </div>

        {bookings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings
              .sort((a, b) => new Date(b.issuedDate || b.created_at) - new Date(a.issuedDate || a.created_at))
              .slice(0, 3)
              .map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white border-2 border-slate-100 hover:border-orange-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-3">
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg">
                          {booking.name || "Student"}
                        </h3>
                        <p className="text-xs text-slate-400 font-medium">
                          {booking.grade ? `${booking.grade} Grade` : "Student Inquiry"}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                        <BsStopwatch size={12} /> {calculateTimeRemaining(booking.date)}
                      </span>
                    </div>

                    <div className="space-y-1.5 py-3 border-y border-slate-100 text-xs text-slate-600 my-3">
                      <p className="flex justify-between">
                        <span className="text-slate-400">Subject:</span>
                        <span className="font-semibold text-slate-800">{booking.subject}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-slate-400">Class Date:</span>
                        <span className="font-semibold text-slate-800">{booking.date}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-slate-400">Time:</span>
                        <span className="font-semibold text-slate-800">
                          {booking.time} {booking.timePeriod || ""}
                        </span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Class Fee
                      </span>
                      <span className="text-xl font-black text-slate-900 flex items-center">
                        <MdCurrencyRupee size={18} className="text-orange-500" />
                        {booking.fees}
                        <span className="text-xs text-slate-400 font-normal ml-0.5">/hr</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2.5 mt-4 pt-3 border-t border-slate-100">
                    <button
                      disabled={actionLoadingId === booking.id}
                      onClick={() => handleAcceptRequest(booking.id)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-sm transition-all disabled:opacity-50"
                    >
                      {actionLoadingId === booking.id ? "Processing..." : "✓ Accept"}
                    </button>
                    <button
                      disabled={actionLoadingId === booking.id}
                      onClick={() => handleRejectRequest(booking.id)}
                      className="flex-1 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 font-bold py-2.5 rounded-xl text-xs transition-all disabled:opacity-50"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          /* ✨ LOW DATA / ZERO BOOKING: Prompt Tutor to use Mobile App */
          <TeacherAppBanner
            title="Get 10x More Student Bookings with the Learnosphere Tutor App!"
            subtitle="Thousands of students across India are searching for home tutors & live online classes right now. Switch to the mobile app for instant push notifications, 1-click booking confirmation, and direct student chats."
            badge="💰 BOOST YOUR MONTHLY REVENUE"
            isVerified={profileData?.is_approved === true || profileData?.is_approved === 1}
          />
        )}
      </section>

      {/* 📅 UPCOMING CLASSES */}
      <section className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
              <FaCalendarAlt size={18} />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-slate-800">
                Scheduled Upcoming Classes
              </h2>
              <p className="text-xs text-slate-500">
                Confirmed 1-on-1 live classes ready to launch
              </p>
            </div>
          </div>
          <button
            onClick={handleViewAllUpcomingClass}
            className="text-xs font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 px-4 py-2 rounded-xl transition-colors"
          >
            Schedule Overview →
          </button>
        </div>

        {upcomingClasses.length > 0 ? (
          <div className="overflow-x-auto rounded-2xl border border-slate-100">
            <table className="min-w-full divide-y divide-slate-100">
              <thead className="bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-wider text-left">
                <tr>
                  <th className="px-6 py-4">Student & Class</th>
                  <th className="px-6 py-4">Scheduled Date & Time</th>
                  <th className="px-6 py-4">Subject</th>
                  <th className="px-6 py-4">Rate / Fee</th>
                  <th className="px-6 py-4 text-right">Live Class</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {upcomingClasses.slice(0, 3).map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-900">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {item.date} at {item.time}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-orange-50 text-orange-600 font-semibold text-xs rounded-lg border border-orange-100">
                        {item.subject}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900">
                      ₹{item.fees} /hr
                    </td>
                    <td className="px-6 py-4 text-right">
                      <a
                        href="https://play.google.com/store/apps/details?id=com.karotaraj.learnosphere_app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs font-bold shadow-sm"
                      >
                        <MdVideoCall size={18} /> Launch on App
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* ✨ LOW DATA: App suggestion */
          <div className="bg-gradient-to-br from-slate-50 to-orange-50/30 rounded-2xl p-6 md:p-8 text-center border border-slate-200/80 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mb-3">
              <MdVideoCall size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">
              No Upcoming Classes Scheduled
            </h3>
            <p className="text-slate-500 text-xs md:text-sm max-w-md mb-6">
              Go live or accept on-demand bookings directly on the <strong>Learnosphere Tutor Mobile App</strong>. Tutors with active app presence receive 3x more class requests!
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="https://play.google.com/store/apps/details?id=com.karotaraj.learnosphere_app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-slate-900 hover:bg-black text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow"
              >
                <Image src={playstore} alt="Google Play" width={16} height={16} />
                Open Tutor App
              </a>
              <Link
                href="/Teacherdashboard/UploadContent"
                className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow"
              >
                Upload Study Material Instead →
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* 🔍 FULL TASK DESCRIPTION MODAL */}
      {isModalOpen && tasks[currentIndex] && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm p-4 flex justify-center items-center z-50">
          <div className="bg-white rounded-3xl p-6 md:p-8 relative shadow-2xl w-full max-w-xl">
            <button
              onClick={closeModal}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 absolute top-4 right-4 transition-colors"
            >
              <RxCross1 size={18} />
            </button>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 mb-2 block">
              Task Details
            </span>
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              Assignment Information
            </h3>
            <p className="text-slate-700 text-sm leading-relaxed mb-6 whitespace-pre-wrap">
              {tasks[currentIndex].task_description}
            </p>
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={closeModal}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleUpdateStatus(tasks[currentIndex].id);
                  closeModal();
                }}
                className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-colors"
              >
                Mark Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
