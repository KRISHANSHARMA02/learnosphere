"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  FiUser,
  FiEdit3,
  FiChevronDown,
  FiMapPin,
  FiStar,
  FiClock,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import Head from "next/head";
import Image from "next/image";
import StudentAppImg from "@/public/studentApp.png";
import { FaGooglePlay, FaAppStore, FaRocket, FaFire, FaCheckCircle } from "react-icons/fa";
import VerifiedBadge from "./VerifiedBadge";
import { trackEvent } from "@/src/lib/eventTracker";
// Import the Bridge Action
import { getSecureTeacherList } from "@/src/lib/actions/AvailableTeacherAction";
import { getTutorImageSrc, handleTutorImageError } from "@/src/utils/tutorImageHelper";

const isSubjectMatch = (teacher, reqSub) => {
  if (!reqSub || reqSub === "All") return true;
  const r = reqSub.toLowerCase().trim();
  const subjectsToCheck = teacher.allSubjects || [teacher.subject];
  return subjectsToCheck.some((sub) => {
    if (!sub) return false;
    const t = sub.toLowerCase().trim();
    return t.includes(r) || r.includes(t);
  });
};

const AvailableTeacherClient = ({ initialTeachers }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  // --- STATES ---
  const [approvedTeachers, setApprovedTeachers] = useState(
    initialTeachers || [],
  );
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const [bookingModalTeacher, setBookingModalTeacher] = useState(null);

  // --- POPUP STATES (Only for "Request Tutor" Floating Button) ---
  const [isGeneralFormVisible, setIsGeneralFormVisible] = useState(false);

  // Form Fields (For General Request)
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [time, setTime] = useState("");
  const [fees, setFees] = useState("");
  const [date, setDate] = useState("");
  const [timePeriod, setTimePeriod] = useState("AM");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");

  // --- SLIDER STATES ---
  const sliderRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // --- HANDLER: GO TO PROFILE (Used for both Card & Book Now) ---
  const goToProfile = (teacher) => {
    const teacherId = teacher.id || teacher.RegistrationNumber;
    // ✅ USE teacher.subjects[0] - GET FIRST SUBJECT FROM ARRAY
    const teacherSubject =
      teacher.subjects?.[0] || teacher.subject || "tuition";
    router.push(
      `/Userdashboard/Availableteacher/${teacherId}?subject=${encodeURIComponent(teacherSubject)}`,
    );
  };

  // --- HANDLER: SUBMIT GENERAL POPUP FORM ---
  const handleGeneralSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: profileData?.name || session?.user?.name || name,
      subject,
      time,
      timePeriod,
      date,
      fees,
      contact,
      address,
      pincode,
      gmail: profileData?.gmail || session?.user?.email,
      grade: profileData?.grade || session?.user?.class,
    };

    try {
      const response = await axios.post(
        "https://learnospherebackend.learnosphere.in/api/route/bookclass",
        formData,
        { headers: { "Content-Type": "application/json" } },
      );
      if (response.status === 200) {
        trackEvent("BOOK_TUTOR_FORM_SUBMITTED", {
          ...formData,
          name: formData.name,
          email: formData.gmail,
          mobile_number: formData.contact,
        });

        Swal.fire({
          title: "Request Received",
          text: "Team will find tutor.",
          icon: "success",
          confirmButtonColor: "#f97316",
        });
        setIsGeneralFormVisible(false);
        clearForm();
      }
    } catch (error) {
      Swal.fire({ title: "Error", text: "Failed to submit.", icon: "error" });
    }
  };

  const clearForm = () => {
    setName("");
    setSubject("");
    setTime("");
    setDate("");
    setFees("");
    setContact("");
    setAddress("");
    setPincode("");
  };
  const handleTimeChange = (e) => {
    setTime(e.target.value);
    const [hours] = e.target.value.split(":");
    setTimePeriod(hours >= 12 ? "PM" : "AM");
  };
  const handleContactChange = (e) => {
    if (/^\d{0,10}$/.test(e.target.value)) setContact(e.target.value);
  };

  // --- EFFECTS & UTILS ---
  const handleSubjectChange = async (newSubject) => {
    setSelectedSubject(newSubject);
    setIsLoading(true);
    setVisibleCount(6);
    try {
      const teachers = await getSecureTeacherList(newSubject);
      const list = Array.isArray(teachers) ? teachers : [];
      const filtered = list.filter((t) => isSubjectMatch(t, newSubject));
      setApprovedTeachers(filtered);
    } catch (error) {
      setApprovedTeachers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const checkScrollButtons = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 600 });
    checkScrollButtons();
    window.addEventListener("resize", checkScrollButtons);
    return () => window.removeEventListener("resize", checkScrollButtons);
  }, []);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const response = await axios.post(
            "https://learnospherebackend.learnosphere.in/api/route/getStudentByEmail",
            { gmail: session.user.email },
          );
          setProfileData(response.data);
        } catch (error) {}
      }
    };
    fetchProfileData();
  }, [session, status]);

  const slideLeft = () => {
    if (sliderRef.current)
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };
  const slideRight = () => {
    if (sliderRef.current)
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };
  const handleShowMore = () => setVisibleCount((prev) => prev + 6);

  const subjects = [
    { name: "All" },
    { name: "Mathematics" },
    { name: "Science" },
    { name: "History" },
    { name: "English" },
    { name: "Physics" },
    { name: "Chemistry" },
    { name: "Hindi" },
    { name: "Biology" },
    { name: "Economics" },
    { name: "Computer Science" },
    { name: "Business Studies" },
    { name: "Accountancy" },
  ];

  return (
    <>
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="flex flex-col gap-6 p-4 min-h-screen relative bg-gradient-to-b from-orange-50/50 to-white">
        <Head>
          <meta name="robots" content="noindex, nofollow" />
        </Head>

        {/* HERO */}
        <div className="w-full pt-6">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-center mb-2 text-gray-900 tracking-tight">
            Find Your Perfect <span className="text-orange-600">Tutor</span>
          </h3>

          {/* SLIDER */}
          <div className="relative flex items-center justify-center max-w-6xl mx-auto mb-10 group">
            {showLeftArrow && (
              <button
                onClick={slideLeft}
                className="absolute left-0 z-10 bg-white text-orange-600 p-2 rounded-full shadow-lg border border-orange-100 hidden md:flex"
              >
                <FiChevronLeft size={24} />
              </button>
            )}
            <div
              ref={sliderRef}
              onScroll={checkScrollButtons}
              className="w-full overflow-x-scroll scroll-smooth scrollbar-hide whitespace-nowrap px-4 py-2 flex gap-4"
            >
              {subjects.map((sub) => (
                <button
                  key={sub.name}
                  onClick={() => handleSubjectChange(sub.name)}
                  className={`inline-block px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm flex-shrink-0 ${selectedSubject === sub.name ? "bg-orange-600 text-white shadow-md" : "bg-white text-gray-600 border border-gray-100 hover:text-orange-600"}`}
                >
                  {sub.name}
                </button>
              ))}
            </div>
            {showRightArrow && (
              <button
                onClick={slideRight}
                className="absolute right-0 z-10 bg-white text-orange-600 p-2 rounded-full shadow-lg border border-orange-100 hidden md:flex"
              >
                <FiChevronRight size={24} />
              </button>
            )}
          </div>

          {/* CARDS */}
          <div className="flex flex-col md:flex-row md:flex-wrap gap-6 justify-center pb-10">
            {isLoading ? (
              <div className="w-full text-center p-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
              </div>
            ) : approvedTeachers.length > 0 ? (
              <>
                {approvedTeachers.slice(0, visibleCount).map((teacher) => (
                  <div
                    key={teacher.id}
                    // ✅ CARD CLICK -> GOES TO PROFILE
                    onClick={() => goToProfile(teacher)}
                    className="group relative bg-white rounded-2xl p-5 md:p-6 w-full md:w-[48%] xl:w-[30%] shadow-sm hover:shadow-xl hover:shadow-orange-100 transition-all duration-300 border border-transparent hover:border-orange-100 transform hover:-translate-y-1 cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <img
                          src={getTutorImageSrc(teacher)}
                          alt={teacher.name}
                          className="h-20 w-20 rounded-2xl object-cover shadow-sm"
                          onError={(e) => handleTutorImageError(e, teacher)}
                        />
                        <div className="absolute -bottom-2 -right-2 bg-white px-2 py-0.5 rounded-full shadow-sm text-xs font-bold text-orange-600 flex items-center gap-1 border border-orange-50">
                          <FiStar className="fill-orange-500 text-orange-500" />{" "}
                          {teacher.rating}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-center gap-2 mt-2">
                          <h4 className="font-bold text-lg text-gray-900 leading-tight mb-1">
                            {teacher.name}
                          </h4>
                          <VerifiedBadge isApproved={teacher.isApproved} />
                        </div>
                        <span className="inline-block bg-orange-50 text-orange-700 text-xs px-2 py-1 rounded-md font-semibold mb-3">
                          {teacher.subject}
                        </span>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-1">
                          <span className="flex items-center gap-1">
                            <FiClock className="text-orange-400" />{" "}
                            {teacher.rawExperience} Yrs Exp
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <FiMapPin className="text-orange-400" />{" "}
                            {teacher.city || "Online"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                          Hourly Rate
                        </span>
                        <span className="text-lg font-bold text-gray-900">
                          {teacher.baseRate} {teacher.currencySymbol}
                        </span>
                      </div>

                      {/* ✅ BOOK NOW BUTTON CLICK -> OPENS APP BOOKING MODAL */}
                      <button
                        className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg shadow-orange-200 transition-all active:scale-95"
                        onClick={(e) => {
                          e.stopPropagation();
                          setBookingModalTeacher(teacher);
                        }}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="w-full text-center p-8">No Tutors Found</div>
            )}
          </div>

          {/* SHOW MORE */}
          {!isLoading && approvedTeachers.length > visibleCount && (
            <div className="flex justify-center pb-20">
              <button
                onClick={handleShowMore}
                className="px-8 py-3 bg-white border border-gray-200 rounded-full hover:border-orange-500 hover:text-orange-600 transition-all"
              >
                View More Tutors
              </button>
            </div>
          )}
        </div>

        {/* ✅ FLOATING BUTTON -> OPENS POPUP (Separated as requested) */}
        <button
          onClick={() => setIsGeneralFormVisible(true)}
          className="fixed bottom-36 right-8 bg-orange-600 text-white p-4 rounded-full shadow-2xl z-40 hover:-translate-y-1 group flex items-center gap-2"
        >
          <FiEdit3 size={18} />
          <span className="hidden group-hover:block font-bold">
            Request Tutor
          </span>
        </button>
      </div>

      {/* GENERAL REQUEST POPUP */}
      {isGeneralFormVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsGeneralFormVisible(false)}
          />
          <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
            <div className="bg-orange-500 px-6 py-5 border-b border-orange-600 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-white">Custom Request</h2>
                <p className="text-sm text-white/90">Book Your Teacher</p>
              </div>
              <button
                onClick={() => setIsGeneralFormVisible(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-white hover:text-orange-600 transition-all"
              >
                &times;
              </button>
            </div>
            <form
              onSubmit={handleGeneralSubmit}
              className="p-6 flex flex-col gap-4"
            >
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 tracking-wider">
                  Name
                </label>
                <input
                  value={session?.user?.name || name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-50 text-gray-900 px-4 py-3 rounded-xl border border-gray-100 focus:bg-white focus:border-orange-500 outline-none transition-all"
                  placeholder="Enter full name"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 tracking-wider">
                    Required subject
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-gray-50 text-gray-900 px-4 py-3 rounded-xl border border-gray-100 focus:bg-white focus:border-orange-500 outline-none appearance-none"
                    required
                  >
                    <option value="">Select...</option>
                    {subjects
                      .filter((s) => s.name !== "All")
                      .map((s) => (
                        <option key={s.name} value={s.name}>
                          {s.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 tracking-wider">
                    Budget/Fees expectation
                  </label>
                  <input
                    value={fees}
                    onChange={(e) => setFees(e.target.value)}
                    className="w-full bg-gray-50 text-gray-900 px-4 py-3 rounded-xl border border-gray-100 focus:bg-white focus:border-orange-500 outline-none"
                    placeholder="Ex: 500"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 tracking-wider">
                    Preferred date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-gray-50 text-gray-900 px-4 py-3 rounded-xl border border-gray-100 focus:bg-white focus:border-orange-500 outline-none"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 tracking-wider">
                    Preferred time
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="time"
                      value={time}
                      onChange={handleTimeChange}
                      className="w-full bg-gray-50 text-gray-900 px-2 py-3 rounded-xl border border-gray-100 focus:bg-white focus:border-orange-500 outline-none"
                      required
                    />
                    <select
                      value={timePeriod}
                      onChange={(e) => setTimePeriod(e.target.value)}
                      className="bg-gray-50 text-gray-900 px-2 rounded-xl border border-gray-100 focus:border-orange-500 outline-none"
                    >
                      <option>AM</option>
                      <option>PM</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-500 tracking-wider">
                  Contact information
                </label>
                <input
                  value={contact}
                  onChange={handleContactChange}
                  className="w-full bg-gray-50 text-gray-900 px-4 py-3 rounded-xl border border-gray-100 focus:bg-white focus:border-orange-500 outline-none mb-3"
                  placeholder="Contact information"
                  required
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div className="md:col-span-2 flex flex-col justify-between h-full">
                    <label className="text-xs font-semibold text-gray-500 tracking-wider mb-1">
                      Full address
                    </label>
                    <input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-gray-50 text-gray-900 px-4 py-3 rounded-xl border border-gray-100 focus:bg-white focus:border-orange-500 outline-none"
                      placeholder="Enter your full address"
                      required
                    />
                  </div>
                  <div className="flex flex-col justify-between h-full">
                    <label className="text-xs font-semibold text-gray-500 tracking-wider mb-1">
                      Pincode
                    </label>
                    <input
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full bg-gray-50 text-gray-900 px-4 py-3 rounded-xl border border-gray-100 focus:bg-white focus:border-orange-500 outline-none"
                      placeholder="Enter your pincode"
                      required
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="mt-2 w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-orange-200 transition-all active:scale-95"
              >
                Submit Request
              </button>
            </form>
            
          </div>
        </div>
      )};
      {/* COOL BOOKING APPLICATION MODAL */}
      {bookingModalTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl relative border border-gray-100 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setBookingModalTeacher(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-light"
            >
              &times;
            </button>

            <div className="text-center space-y-3">
              <span className="inline-block bg-orange-100 text-orange-600 font-bold text-xs uppercase tracking-wider px-3.5 py-1 rounded-full border border-orange-200">
                🎉 Hurry Up! First Trial Class is 100% FREE!
              </span>

              <h3 className="text-2xl font-extrabold text-gray-900 leading-tight">
                Book Live 1-on-1 Session with {bookingModalTeacher.name}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed max-w-md mx-auto">
                Booking an educator requires the <strong>Learnosphere Mobile App</strong>. Your first class is completely free — choose your subject, pick a slot on the tutor's live calendar, and begin learning.
              </p>

              <div className="bg-orange-50/60 p-4 rounded-2xl border border-orange-100 flex items-center justify-around my-4 text-xs font-semibold text-gray-700">
                <span>📚 {bookingModalTeacher.subject || "All Subjects"}</span>
                <span>⭐ {bookingModalTeacher.rating} Rating</span>
                <span>⏱️ {bookingModalTeacher.rawExperience} Yrs Exp</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href="https://play.google.com/store/apps/details?id=com.karotaraj.learnosphere_main"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 px-4 rounded-xl text-sm transition-all shadow-md shadow-orange-500/20"
                >
                  <FaGooglePlay size={18} /> Google Play
                </a>
                <a
                  href="https://apps.apple.com/in/app/learnosphere-learning-app/id6748979882"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-slate-900 hover:bg-black text-white font-bold py-3.5 px-4 rounded-xl text-sm transition-all"
                >
                  <FaAppStore size={18} /> App Store
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AvailableTeacherClient;
