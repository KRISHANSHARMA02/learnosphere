"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import { trackEvent } from "@/src/lib/eventTracker";
import { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { SiGoogleclassroom } from "react-icons/si";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FiLock } from "react-icons/fi";
import { IoHomeOutline } from "react-icons/io5";
import Aos from "aos";
import "aos/dist/aos.css";
import Head from "next/head";
import axios from "axios";
import { HiMenu } from "react-icons/hi";
import { FaBookOpen, FaCrown, FaRegBookmark, FaSearch, FaWallet } from "react-icons/fa";
import { AiOutlineClockCircle } from "react-icons/ai";
import {
  MdFitScreen,
  MdOutlineWatchLater,
  MdQuiz,
  MdVerified,
} from "react-icons/md";
import Image from "next/image";
import profileimg from "@/public/profile.png";
import Feedback from "./Feedback-Form/page";
// import QR from "@/components/QR";
import { LuMessagesSquare } from "react-icons/lu";
import { TbMoodPuzzled, TbUserQuestion } from "react-icons/tb";
import { GiTeacher } from "react-icons/gi";
import { BiBook } from "react-icons/bi";
import Chatbot from "@/components/Chatbot";
// import { encryptData } from "@/src/utils/crypto";


export default function Layout({ children }) {
  const [activePage, setActivePage] = useState("home");
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [isHoveredLearnosphereClass, setIsHoveredLearnosphereClass] =
    useState(false);
  const [isHoveredStudyMaterial, setIsHoveredStudyMaterial] = useState(false);
  const [isHoveredProfile, setIsHoveredProfile] = useState(false);
  const { data: session, status } = useSession();

  // Add event tracking to every button
  useEffect(() => {
    const handleGlobalClick = (e) => {
      const target = e.target.closest("button, a, [role='button']");
      if (!target) return;

      const actionText = target.innerText?.trim() || target.getAttribute('aria-label') || target.title || target.id || target.tagName;
      
      const eventData = {
        action: `Dashboard Click: ${actionText}`,
        tag: target.tagName,
        url: window.location.href,
        path: window.location.pathname
      };

      if (session?.user?.email) {
        eventData.email = session.user.email;
        eventData.name = session.user.name || "";
      } else {
        eventData.email = "guest";
      }

      trackEvent(`DASHBOARD_CLICK`, eventData);
    };

    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, [session]);

  const [isLoading, setIsLoading] = useState(true);
  const askQuestionRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [loginRecorded, setLoginRecorded] = useState(false);
  const [checkingLoginStatus, setCheckingLoginStatus] = useState(false);
  const [isHoveredQuiz, setIsHoveredQuiz] = useState(false);
  const [isHoveredPracticeQuestion, setIsHoveredPracticeQuestion] =
    useState(false);
  const [isHoveredAskQuestion, setIsHoveredAskQuestion] = useState(false);
  const [isHoveredVideo, setIsHoveredVideo] = useState(false);
  const [isHoveredBookmark, setIsHoveredBookmark] = useState(false);
  const [isHoveredCourses, setIsHoveredCourses] = useState(false);
    const [isHoveredWallet, setIsHoveredWallet] = useState(false);
  

  const loginActivityClick = () => setActivePage("loginActivity");
  useEffect(() => {
    const recordLoginActivity = async () => {
      if (session?.user?.email && !loginRecorded) {
        try {
          const userEmail = session.user.email; // Extract email from session

          // Fetch IP address
          const ipResponse = await fetch("https://api.ipify.org?format=json");
          const { ip: ipAddress } = await ipResponse.json();

          // Get device information using UAParser
          const parser = new UAParser();
          const result = parser.getResult(); // Extract details from userAgent string

          // Extract device details
          const deviceInfo = result.device; // This contains device type, model, etc.
          const osInfo = result.os; // This contains OS information like name and version
          const browserInfo = result.browser; // This contains browser name and version
          const userAgent = navigator.userAgent; // Raw user agent string

          // You can use these details as per your requirement
          const deviceType = deviceInfo.type || "Unknown Device"; // If no specific device type, default to Unknown
          const deviceModel = deviceInfo.model || "Unknown Model"; // If model is not available, default to Unknown
          const osName = osInfo.name || "Unknown OS"; // If OS name is not available, default to Unknown
          const osVersion = osInfo.version || "Unknown Version"; // If OS version is not available, default to Unknown
          const browserName = browserInfo.name || "Unknown Browser"; // If browser name is not available, default to Unknown
          const browserVersion = browserInfo.version || "Unknown Version";

          // Step 1: Check if login activity is already recorded in the backend
          const activityCheckResponse = await fetch(
            `${WEB_BACKEND_URL}/api/route/check-login-activity-google`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userEmail, // Send the extracted email
                ipAddress,
              }),
            }
          );

          const checkData = await activityCheckResponse.json();

          // If login activity is already recorded, skip sending it again
          if (checkData.activityRecorded) {
            setLoginRecorded(true); // Mark login as recorded
            setCheckingLoginStatus(false);
            return;
          }

          // Step 2: If login activity is not recorded, send login details
          const backendResponse = await fetch(
            `${WEB_BACKEND_URL}/api/route/student-login-activity-google`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userEmail, // Send the extracted email
                ipAddress,
                deviceInfo: {
                  osInfo,
                  userAgent,
                  deviceType,
                  deviceModel,
                  osName,
                  osVersion,
                  browserName,
                  browserVersion,
                },
              }),
            }
          );

          const responseData = await backendResponse.json();

          if (!backendResponse.ok) {
            console.error(
              "Backend login activity failed:",
              responseData.message
            );
          } else {
            setLoginRecorded(true); // Mark login as recorded
            localStorage.setItem("loginRecorded", "true"); // Store in localStorage to prevent repeat sending
          }
        } catch (error) {}
      }
    };

    // Check if the login details have already been sent
    const isLoginRecorded = localStorage.getItem("loginRecorded");

    if (session?.user?.email && !isLoginRecorded && !checkingLoginStatus) {
      setCheckingLoginStatus(true); // Prevent multiple requests
      recordLoginActivity();
    } else if (!session?.user?.email) {
      // Reset when the user logs out
      setLoginRecorded(false);
      localStorage.removeItem("loginRecorded"); // Clear the recorded flag when logged out
    }
  }, [session, loginRecorded, checkingLoginStatus]);

  useEffect(() => {
    Aos.init({ duration: 600 });
  }, []);

  const toggleFeedback = () => {
    setIsFeedbackOpen((prev) => !prev);
  };

  const openFeedback = () => setIsFeedbackOpen(true);
  const closeFeedback = () => setIsFeedbackOpen(false);

  const handleLogout = async () => {
    try {
      const studentEmail = session?.user?.email;
      if (studentEmail) {
        try {
          await axios.post(
            `${WEB_BACKEND_URL}/api/route/record-logout-activity-student`,
            { studentEmail }
          );
        } catch (err) {
          console.warn("Logout recording warning:", err.message);
        }
      }
    } finally {
      await signOut({ redirect: false });
      window.location.href = "/Student";
    }
  };

    
 // 🚀 UPDATED: Delete Account Handler
  const handleDeleteAccount = () => {
    setShowDropdown(false); // Dropdown band karein
    router.push('/Userdashboard/profileuser/deleteuser'); // 👈 Exact URL jo aap chahte hain
  };

  const user = {
    name: profileData?.studentName || session?.user?.name || "Student",
    src: session?.user?.image || profileimg,
  };

  // By default every student must be approved
  const isApproved = profileData ? profileData.is_approved !== false : true;

  const question1Click = () => {
    handleNavigation("question1", "/Userdashboard/Askquestion");
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const response = await axios.post(
            `${WEB_BACKEND_URL}/api/route/getStudentByEmail`,
            { gmail: session.user.email }
          );
          setProfileData(response.data);
                  setIsLoading(false); // Stop loader after fetch finishes
        } catch (error) {
          console.error("Error fetching profile data:", error);
          setIsLoading(false);
          window.location.href = "/StudentForm";
        }
      }
    };

    fetchProfileData();
  }, [session, status, router]);

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleFocusAskQuestion = () => {
    if (askQuestionRef.current) {
      setTimeout(() => {
        askQuestionRef.current.focus();
      }, 100); // Delay to ensure the state update has occurred
    }
  };

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!session) {
      router.push("/Student");
    }
  }, [session, status, router]);


  const handleNavigation = (page, route) => {
    setActivePage(page);
    if (isApproved) {
      router.push(route);
    }
  };

  const pathname = usePathname(); // Get the current path
  const [subject, setSubject] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
 

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search); // Access query params directly in client-side code
    if (pathname === "/Userdashboard/Sciencetest") {
      setSubject(searchParams.get("subject"));
    }
    if (
      pathname === "/Userdashboard/Sciencetest/Sciencequiz" &&
      searchParams.has("subject") &&
      searchParams.has("difficulty")
    ) {
      setSubject(searchParams.get("subject"));
      setDifficulty(searchParams.get("difficulty"));
    }
  }, [pathname]);

  // Render children based on conditions
  if (pathname === "/Userdashboard/Sciencetest" && subject) {
    return children; // Render only the children without the layout
  }

  if (
    pathname === "/Userdashboard/Sciencetest/Sciencequiz" &&
    subject &&
    difficulty
  ) {
    return children; // Render only the children without the layout
  }

  if (pathname === "/Userdashboard/Quiz/questionpaper") {
    return children; // Render only the children without the layout
  }

  return (
    <>
  
      <div className=" flex w-full">
        <Head>
          <meta name="robots" content="noindex, nofollow" />
        </Head>

        {/* Sidebar */}
        <div
          className={` fixed top-0 bg-white z-50 w-3/4 pr-4 md:w-auto h-full md:h-screen border-r-2 border-r-gray-300 transition-transform transform md:translate-x-0 ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="ml-5 mt-5 flex justify-between items-center md:block">
            <Link href="/" className="text-2xl font-bold">
              Learn<b className="text-orange-600">O</b>sphere.in
            </Link>
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              &times;
            </button>
          </div>

          <div className="mt-5 ml-5 flex flex-col w-full h-full">
            {/* Home Button */}
            <div
              className={`mt-3 p-2 mr-4 flex items-center rounded-md cursor-pointer ${
                isApproved
                  ? activePage === "home"
                    ? "bg-orange-500 text-white"
                    : "hover:bg-orange-500 hover:text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handleNavigation("home", "/Userdashboard/Home")}
              onMouseEnter={() => setIsHoveredProfile(true)}
              onMouseLeave={() => setIsHoveredProfile(false)}
            >
              {isApproved ? (
                <IoHomeOutline size={20} />
              ) : (
                <FiLock size={20} className="text-red-500" />
              )}
              <button
                className={`flex pl-2 font-semibold ${
                  !isApproved ? "text-gray-500" : ""
                }`}
              >
                Home
              </button>

              {!isApproved && isHoveredProfile && (
                <div className="absolute mt-12 bg-gray-700 text-white text-xs rounded-md p-2 z-10 shadow-lg">
                  Pay now to unlock the home
                </div>
              )}
            </div>

             <div
              className={`mt-3 p-2 mr-4 flex items-center rounded-md cursor-pointer ${
                isApproved
                  ? activePage === "courses"
                    ? "bg-orange-500 text-white"
                    : "hover:bg-orange-500 hover:text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handleNavigation("courses", `/Userdashboard/MyCourses?token=${profileData?.registrationNumber}&grade=${profileData?.grade}&stream=${profileData?.stream || ""}`)}
              onMouseEnter={() => setIsHoveredCourses(true)}
              onMouseLeave={() => setIsHoveredCourses(false)}
            >
              {isApproved ? (
                <FaCrown size={20} />
              ) : (
                <FiLock size={20} className="text-red-500" />
              )}
              <button
                className={`flex pl-2 font-semibold ${
                  !isApproved ? "text-gray-500" : ""
                }`}
              >
                My Courses
              </button>

              {!isApproved && isHoveredProfile && (
                <div className="absolute mt-12 bg-gray-700 text-white text-xs rounded-md p-2 z-10 shadow-lg">
                  Pay now to unlock the courses
                </div>
              )}
            </div>

            {/* Your Bookings Button */}
            <div
              className={`mt-3 p-2 mr-4 flex items-center rounded-md cursor-pointer ${
                isApproved
                  ? activePage === "student"
                    ? "bg-orange-500 text-white"
                    : "hover:bg-orange-500 hover:text-white"
                  : "bg-gray-200"
              }`}
              onClick={() =>
                handleNavigation("student", "/Userdashboard/classess")
              }
              onMouseEnter={() => setIsHoveredLearnosphereClass(true)}
              onMouseLeave={() => setIsHoveredLearnosphereClass(false)}
            >
              {isApproved ? (
                <SiGoogleclassroom size={20} />
              ) : (
                <FiLock size={20} className="text-red-500" />
              )}
              <button
                className={`pl-2 font-semibold ${
                  !isApproved ? "text-gray-500" : ""
                }`}
              >
                My Bookings
              </button>

              {!isApproved && isHoveredLearnosphereClass && (
                <div className="absolute mt-12 bg-gray-700 text-white text-xs rounded-md p-2 z-10 shadow-lg">
                  Pay now to unlock the Bookings
                </div>
              )}
            </div>

            {/* Study Material */}
            <div
              className={`mt-3 p-2 mr-4 flex items-center rounded-md cursor-pointer ${
                isApproved
                  ? activePage === "studyMaterial"
                    ? "bg-orange-500 text-white"
                    : "hover:bg-orange-500 hover:text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => {
                if (isApproved) {
                  handleNavigation(
                    "studyMaterial",
                    "/Userdashboard/chaptertest"
                  );
                  setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown
                }
              }}
              onMouseEnter={() => setIsHoveredStudyMaterial(true)}
              onMouseLeave={() => setIsHoveredStudyMaterial(false)}
            >
              {isApproved ? (
                <FaBookOpen size={20} />
              ) : (
                <FiLock size={20} className="text-red-500" />
              )}
              <button
                className={`pl-2 font-semibold ${
                  !isApproved ? "text-gray-500" : ""
                }`}
              >
                Study Material
              </button>

              {/* Tooltip when locked */}
              {!isApproved && isHoveredStudyMaterial && (
                <div className="absolute mt-12 bg-gray-700 text-white text-xs rounded-md p-2 z-10 shadow-lg">
                  Pay now to unlock the Study Material
                </div>
              )}
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && isApproved && (
              <div className="flex flex-col gap-2 font-semibold ml-2 mt-2">
                <div
                  className={`text-[.9em] pl-4 mr-4 flex items-center rounded-md cursor-pointer ${
                    activePage === "question"
                      ? "bg-orange-500 text-white"
                      : "hover:bg-orange-500 hover:text-white"
                  }`}
                  onClick={() =>
                    handleNavigation(
                      "question",
                      "/Userdashboard/Practicequestion"
                    )
                  }
                >
                  <MdOutlineWatchLater size={20} />
                  <button className="pl-2 py-1 font-semibold">
                    Practice Questions
                  </button>
                </div>
                {/* <div
                  className={`text-[.9em] pl-4 mr-4 flex items-center rounded-md cursor-pointer ${
                    activePage === "DPQs"
                      ? "bg-orange-500 text-white"
                      : "hover:bg-orange-500 hover:text-white"
                  }`}
                  onClick={() =>
                    handleNavigation(
                      "DPQs",
                      "/Userdashboard/QuestionsForStudents"
                    )
                  }
                >
                  <TbMoodPuzzled size={20} />
                  <button className="pl-2 py-1 text-start font-semibold">
               DPQs
               
                  </button>
                </div> */}
                <div
                  className={`text-[.9em] pl-4 mr-4 flex items-center rounded-md cursor-pointer ${
                    activePage === "video"
                      ? "bg-orange-500 text-white"
                      : "hover:bg-orange-500 hover:text-white"
                  }`}
                  onClick={() =>
                    handleNavigation("video", "/Userdashboard/Conceptvideo")
                  }
                >
                  <MdFitScreen size={20} />
                  <button className="pl-2 py-1 font-semibold">
                    Concept Videos
                  </button>
                </div>
                <div
                  className={`text-[.9em] pl-4 mr-4 flex items-center rounded-md cursor-pointer ${
                    activePage === "question1"
                      ? "bg-orange-500 text-white"
                      : "hover:bg-orange-500 hover:text-white"
                  }`}
                  onClick={isApproved ? question1Click : null} // Disable click if not approved
                >
                  <TbUserQuestion size={20} />
                  <button className="pl-2 py-1 font-semibold">
                    Ask a Question
                  </button>
                </div>
              </div>
            )}

            <div
              className={`mt-3 p-2 mr-4 flex items-center rounded-md cursor-pointer ${
                isApproved
                  ? activePage === "teacher"
                    ? "bg-orange-500 text-white" // Keep orange background when active
                    : "hover:bg-orange-500 hover:text-white" // Only on hover if not active
                  : "bg-gray-200"
              }`} // Disable click if not approved
              onClick={() =>
                handleNavigation("teacher", "/Userdashboard/Availableteacher")
              }
              onMouseEnter={() => setIsHovered(true)} // Show message on hover
              onMouseLeave={() => setIsHovered(false)} // Hide message on hover out
            >
              {isApproved ? (
                <GiTeacher size={20} />
              ) : (
                <FiLock size={20} className="text-red-500" /> // Show lock icon if not approved
              )}
              <button
                className={`pl-2 font-semibold ${
                  !isApproved ? "text-gray-500" : ""
                }`}
              >
                {isApproved
                  ? "Available Teacher"
                  : "Available Teacher"}
              </button>

              {/* Tooltip message when locked and hovered */}
              {!isApproved && isHovered && (
                <div className="absolute mt-12 bg-gray-700 text-white text-xs rounded-md p-2 z-10 shadow-lg">
                  Pay now for unlock the teachers
                </div>
              )}
            </div>

            <div
              className={`mt-3 p-2 mr-4 flex items-center rounded-md cursor-pointer ${
                isApproved
                  ? activePage === "quiz"
                    ? "bg-orange-500 text-white" // Keep orange background when active
                    : "hover:bg-orange-500 hover:text-white" // Only on hover if not active
                  : "bg-gray-200"
              }`} // Disable click if not approved
              onClick={() => handleNavigation("quiz", "/Userdashboard/Quiz")}
              onMouseEnter={() => setIsHoveredQuiz(true)} // Show message on hover
              onMouseLeave={() => setIsHoveredQuiz(false)} // Hide message on hover out
            >
              {isApproved ? (
                <MdQuiz size={20} />
              ) : (
                <FiLock size={20} className="text-red-500" /> // Show lock icon if not approved
              )}
              <button
                className={`pl-2 font-semibold ${
                  !isApproved ? "text-gray-500" : ""
                }`}
              >
                {isApproved ? "Quizzes" : "Quizzes"}
              </button>

              {/* Tooltip message when locked and hovered */}
              {!isApproved && isHoveredQuiz && (
                <div className="absolute mt-12 bg-gray-700 text-white text-xs rounded-md p-2 z-10 shadow-lg">
                  Pay now to unlock the quizzes
                </div>
              )}
            </div>

            {/* 🚀 My Wallet Button (Moved up) */}
            <div
              className={`mt-3 p-2 mr-4 flex items-center rounded-md cursor-pointer ${
                isApproved
                  ? activePage === "wallet"
                    ? "bg-orange-500 text-white"
                    : "hover:bg-orange-500 hover:text-white"
                  : "bg-gray-200"
              }`}
              onClick={() =>
                handleNavigation("wallet", "/Userdashboard/Wallet")
              }
              onMouseEnter={() => setIsHoveredWallet(true)}
              onMouseLeave={() => setIsHoveredWallet(false)}
            >
              {isApproved ? (
                <FaWallet size={20} />
              ) : (
                <FiLock size={20} className="text-red-500" />
              )}
              <button
                className={`pl-2 font-semibold ${
                  !isApproved ? "text-gray-500" : ""
                }`}
              >
                My Wallet
              </button>

              {/* Tooltip message when locked */}
              {!isApproved && isHoveredWallet && (
                <div className="absolute mt-12 bg-gray-700 text-white text-xs rounded-md p-2 z-10 shadow-lg">
                  Pay now to unlock the Wallet
                </div>
              )}
            </div>

            {/* 🚀 Bookmarks Button (Moved down) */}
            <div
              className={`mt-3 p-2 mr-4 flex items-center rounded-md cursor-pointer ${
                isApproved
                  ? activePage === "bookmark"
                    ? "bg-orange-500 text-white" // Keep orange background when active
                    : "hover:bg-orange-500 hover:text-white" // Only on hover if not active
                  : "bg-gray-200"
              }`}
              onClick={() =>
                handleNavigation("bookmark", "/Userdashboard/Bookmark")
              }
              onMouseEnter={() => setIsHoveredBookmark(true)} // Show message on hover
              onMouseLeave={() => setIsHoveredBookmark(false)} // Hide message on hover out
            >
              {isApproved ? (
                <FaRegBookmark size={20} />
              ) : (
                <FiLock size={20} className="text-red-500" /> // Show lock icon if not approved
              )}
              <button
                className={`pl-2 font-semibold ${
                  !isApproved ? "text-gray-500" : ""
                }`}
              >
                {isApproved ? "Bookmarks" : "Bookmarks"}
              </button>

              {/* Tooltip message when locked and hovered */}
              {!isApproved && isHoveredBookmark && (
                <div className="absolute mt-12 bg-gray-700 text-white text-xs rounded-md p-2 z-10 shadow-lg">
                  Pay now to unlock the Bookmark feature
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Overlay */}
        {isMobileMenuOpen && (
          <div
            className=" inset-0 bg-black opacity-50 z-30"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
        <div className="w-full min-w-0 md:pl-64 flex flex-col min-h-screen">
          {/* Top Navbar */}
          <nav className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex justify-between items-center sticky top-0 z-30 shadow-sm">
            {/* Left: Mobile Menu Trigger & Dashboard Indicator */}
            <div className="flex items-center gap-3">
              <button
                className="md:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle navigation menu"
              >
                <HiMenu size={24} />
              </button>
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-[11px] font-bold text-orange-600 bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Student Dashboard
                </span>
              </div>
            </div>

            {/* Right: Full Student Name & Avatar Profile Menu */}
            {user && (
              <div className="flex items-center gap-3">
                {/* Student Full Name & Class/Stream */}
                <div className="text-right">
                  <p className="text-sm sm:text-base font-bold text-gray-900 capitalize leading-tight">
                    {user.name}
                  </p>
                  <p className="text-[11px] font-semibold text-gray-500">
                    {profileData?.grade ? `Class ${profileData.grade}` : "Learner"}
                    {profileData?.stream ? ` • ${profileData.stream}` : ""}
                  </p>
                </div>

                {/* Avatar with Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={handleDropdownClick}
                    className="relative block rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 transition-transform active:scale-95"
                    aria-expanded={showDropdown}
                    aria-label="User profile menu"
                  >
                    <div
                      className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 overflow-hidden flex items-center justify-center bg-orange-50 ${
                        isApproved
                          ? "border-emerald-500 shadow-sm"
                          : "border-orange-500 shadow-sm"
                      }`}
                    >
                      <Image
                        width={44}
                        height={44}
                        src={user.src}
                        alt={user.name || "Student Avatar"}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>

                    {/* Status Badge */}
                    {isApproved ? (
                      <div className="absolute -bottom-0.5 -right-0.5 bg-white text-emerald-500 rounded-full p-0.5 shadow-sm border border-gray-100">
                        <MdVerified size={14} />
                      </div>
                    ) : (
                      <div className="absolute -bottom-0.5 -right-0.5 bg-white text-orange-500 rounded-full p-0.5 shadow-sm border border-gray-100">
                        <AiOutlineClockCircle size={14} />
                      </div>
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {showDropdown && (
                    <div className="absolute right-0 top-full mt-2 w-52 bg-white shadow-xl rounded-2xl border border-gray-100 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-100 sm:hidden">
                        <p className="text-xs font-bold text-gray-900 truncate">{user.name}</p>
                        <p className="text-[10px] text-gray-500">{session?.user?.email}</p>
                      </div>
                      <ul>
                        <Link
                          href="/Userdashboard/profileuser"
                          onClick={() => setShowDropdown(false)}
                        >
                          <li className="px-4 py-2.5 text-xs sm:text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 cursor-pointer transition-colors">
                            View Profile
                          </li>
                        </Link>
                        <Link
                          href="/Userdashboard/LoginActivity"
                          onClick={() => {
                            setShowDropdown(false);
                            loginActivityClick();
                          }}
                        >
                          <li className="px-4 py-2.5 text-xs sm:text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 cursor-pointer transition-colors">
                            Login Activity
                          </li>
                        </Link>
                        <li
                          onClick={handleDeleteAccount}
                          className="px-4 py-2.5 text-xs sm:text-sm font-medium text-red-500 hover:bg-red-50 cursor-pointer transition-colors"
                        >
                          Delete Account
                        </li>
                        <li
                          onClick={handleLogout}
                          className="px-4 py-2.5 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-100 cursor-pointer border-t border-gray-100 transition-colors"
                        >
                          Log Out
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </nav>

          {/* Page Content & Loaders */}
          {isLoading ? (
            <div className="w-full h-[calc(100vh-65px)] flex items-center justify-center bg-gray-50">
              <div className="flex items-center justify-center border-4 border-slate-500 rounded-xl animate-pulse">
                <span className="text-xl font-bold text-gray-600 p-3">
                  Learn<span className="text-orange-600">O</span>sphere..
                </span>
              </div>
            </div>
          ) : (
            <>
              {/* Floating Feedback Trigger */}
              <div
                className={`fixed bottom-28 right-5 z-40 p-4 bg-white border border-orange-200 text-orange-600 rounded-full cursor-pointer shadow-lg hover:shadow-xl hover:bg-orange-50 flex items-center justify-center transition-all duration-300 ease-in-out ${
                  isFeedbackOpen ? "scale-90" : "scale-100"
                }`}
                onClick={toggleFeedback}
                title="Send Feedback"
              >
                <LuMessagesSquare size={20} />
              </div>

              {/* AI Doubt Chatbot (Item 11) */}
              <Chatbot />

              <main className="p-4 sm:p-6 w-full flex-1">
                <Suspense fallback={<div>Loading...</div>}>
                  {children}
                </Suspense>
              </main>
            </>
          )}
        </div>
        {isFeedbackOpen && (
          <div
            data-aos="fade-up"
            className="fixed inset-0 flex items-end justify-end p-2 z-50 transition-opacity duration-300"
          >
            <div
              className="bg-white p-6 sm:p-8 rounded-2xl w-[80vw] sm:w-[70vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw] shadow-md relative mx-2 mb-28 border-2 scale-100 sm:scale-95"
              style={{
                transform: isFeedbackOpen
                  ? "translateY(0)"
                  : "translateY(100vh)",
              }}
            >
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 ease-in-out"
                onClick={closeFeedback}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              {/* Feedback form component */}
              <Feedback />
            </div>
          </div>
        )}
      </div>
  
    </>
  );
}
