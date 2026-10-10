"use client";
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
            "https://learnospherebackend.learnosphere.in/api/route/check-login-activity-google",
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
            "https://learnospherebackend.learnosphere.in/api/route/student-login-activity-google",
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
      const studentEmail = session?.user?.email; // Extract email from session
      // Send the student ID to the backend API
      const response = await axios.post(
        "https://learnospherebackend.learnosphere.in/api/route/record-logout-activity-student",
        {
          studentEmail, // Send the extracted email
        }
      );

      if (response.status === 200) {
      } else {
          // Sign out from the user session
      await signOut({ redirect: false });

      // Redirect to the login page or home
      window.location.href = "/Student";   //router.push("/Student");
      }

      // Sign out from the user session
      await signOut({ redirect: false });

      // Redirect to the login page or home
       window.location.href = "/Student"; 
      
    } catch (error) {
      console.error(
        "Error during logout:",
        error.response?.data?.errors || error.message
      );
      alert("An error occurred while logging out. Please try again.");
    }
  };

    
 // 🚀 UPDATED: Delete Account Handler
  const handleDeleteAccount = () => {
    setShowDropdown(false); // Dropdown band karein
    router.push('/Userdashboard/profileuser/deleteuser'); // 👈 Exact URL jo aap chahte hain
  };

  const user = {
    name: session?.user?.name || "Student Name",
    src: profileimg,
  };

  const question1Click = () => {
    handleFocusAskQuestion(); // Focus on "Ask a Question" input field
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
            "https://learnospherebackend.learnosphere.in/api/route/getStudentByEmail",
            { gmail: session.user.email }
          );
          setProfileData(response.data);
                  setIsLoading(false); // Stop loader after fetch finishes
        } catch (error) {
          console.error("Error fetching profile data:", error);
          router.push("/StudentForm");
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
    if (profileData?.is_approved) {
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
                profileData?.is_approved
                  ? activePage === "home"
                    ? "bg-orange-500 text-white"
                    : "hover:bg-orange-500 hover:text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handleNavigation("home", "/Userdashboard/Home")}
              onMouseEnter={() => setIsHoveredProfile(true)}
              onMouseLeave={() => setIsHoveredProfile(false)}
            >
              {profileData?.is_approved ? (
                <IoHomeOutline size={20} />
              ) : (
                <FiLock size={20} className="text-red-500" />
              )}
              <button
                className={`flex pl-2 font-semibold ${
                  !profileData?.is_approved ? "text-gray-500" : ""
                }`}
              >
                Home
              </button>

              {!profileData?.is_approved && isHoveredProfile && (
                <div className="absolute mt-12 bg-gray-700 text-white text-xs rounded-md p-2 z-10 shadow-lg">
                  Pay now to unlock the home
                </div>
              )}
            </div>

             <div
              className={`mt-3 p-2 mr-4 flex items-center rounded-md cursor-pointer ${
                profileData?.is_approved
                  ? activePage === "courses"
                    ? "bg-orange-500 text-white"
                    : "hover:bg-orange-500 hover:text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handleNavigation("courses", `/Userdashboard/MyCourses?token=${profileData?.registrationNumber}&grade=${profileData?.grade}`)}
              onMouseEnter={() => setIsHoveredCourses(true)}
              onMouseLeave={() => setIsHoveredCourses(false)}
            >
              {profileData?.is_approved ? (
                <FaCrown size={20} />
              ) : (
                <FiLock size={20} className="text-red-500" />
              )}
              <button
                className={`flex pl-2 font-semibold ${
                  !profileData?.is_approved ? "text-gray-500" : ""
                }`}
              >
                My Courses
              </button>

              {!profileData?.is_approved && isHoveredProfile && (
                <div className="absolute mt-12 bg-gray-700 text-white text-xs rounded-md p-2 z-10 shadow-lg">
                  Pay now to unlock the courses
                </div>
              )}
            </div>

            {/* Your Bookings Button */}
            <div
              className={`mt-3 p-2 mr-4 flex items-center rounded-md cursor-pointer ${
                profileData?.is_approved
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
              {profileData?.is_approved ? (
                <SiGoogleclassroom size={20} />
              ) : (
                <FiLock size={20} className="text-red-500" />
              )}
              <button
                className={`pl-2 font-semibold ${
                  !profileData?.is_approved ? "text-gray-500" : ""
                }`}
              >
                My Bookings
              </button>

              {!profileData?.is_approved && isHoveredLearnosphereClass && (
                <div className="absolute mt-12 bg-gray-700 text-white text-xs rounded-md p-2 z-10 shadow-lg">
                  Pay now to unlock the Bookings
                </div>
              )}
            </div>

            {/* Study Material */}
            <div
              className={`mt-3 p-2 mr-4 flex items-center rounded-md cursor-pointer ${
                profileData?.is_approved
                  ? activePage === "studyMaterial"
                    ? "bg-orange-500 text-white"
                    : "hover:bg-orange-500 hover:text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => {
                if (profileData?.is_approved) {
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
              {profileData?.is_approved ? (
                <FaBookOpen size={20} />
              ) : (
                <FiLock size={20} className="text-red-500" />
              )}
              <button
                className={`pl-2 font-semibold ${
                  !profileData?.is_approved ? "text-gray-500" : ""
                }`}
              >
                Study Material
              </button>

              {/* Tooltip when locked */}
              {!profileData?.is_approved && isHoveredStudyMaterial && (
                <div className="absolute mt-12 bg-gray-700 text-white text-xs rounded-md p-2 z-10 shadow-lg">
                  Pay now to unlock the Study Material
                </div>
              )}
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && profileData?.is_approved && (
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
                  onClick={profileData?.is_approved ? question1Click : null} // Disable click if not approved
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
                profileData?.is_approved
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
              {profileData?.is_approved ? (
                <GiTeacher size={20} />
              ) : (
                <FiLock size={20} className="text-red-500" /> // Show lock icon if not approved
              )}
              <button
                className={`pl-2 font-semibold ${
                  !profileData?.is_approved ? "text-gray-500" : ""
                }`}
              >
                {profileData?.is_approved
                  ? "Available Teacher"
                  : "Available Teacher"}
              </button>

              {/* Tooltip message when locked and hovered */}
              {!profileData?.is_approved && isHovered && (
                <div className="absolute mt-12 bg-gray-700 text-white text-xs rounded-md p-2 z-10 shadow-lg">
                  Pay now for unlock the teachers
                </div>
              )}
            </div>

            <div
              className={`mt-3 p-2 mr-4 flex items-center rounded-md cursor-pointer ${
                profileData?.is_approved
                  ? activePage === "quiz"
                    ? "bg-orange-500 text-white" // Keep orange background when active
                    : "hover:bg-orange-500 hover:text-white" // Only on hover if not active
                  : "bg-gray-200"
              }`} // Disable click if not approved
              onClick={() => handleNavigation("quiz", "/Userdashboard/Quiz")}
              onMouseEnter={() => setIsHoveredQuiz(true)} // Show message on hover
              onMouseLeave={() => setIsHoveredQuiz(false)} // Hide message on hover out
            >
              {profileData?.is_approved ? (
                <MdQuiz size={20} />
              ) : (
                <FiLock size={20} className="text-red-500" /> // Show lock icon if not approved
              )}
              <button
                className={`pl-2 font-semibold ${
                  !profileData?.is_approved ? "text-gray-500" : ""
                }`}
              >
                {profileData?.is_approved ? "Quizzes" : "Quizzes"}
              </button>

              {/* Tooltip message when locked and hovered */}
              {!profileData?.is_approved && isHoveredQuiz && (
                <div className="absolute mt-12 bg-gray-700 text-white text-xs rounded-md p-2 z-10 shadow-lg">
                  Pay now to unlock the quizzes
                </div>
              )}
            </div>

            {/* 🚀 My Wallet Button (Moved up) */}
            <div
              className={`mt-3 p-2 mr-4 flex items-center rounded-md cursor-pointer ${
                profileData?.is_approved
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
              {profileData?.is_approved ? (
                <FaWallet size={20} />
              ) : (
                <FiLock size={20} className="text-red-500" />
              )}
              <button
                className={`pl-2 font-semibold ${
                  !profileData?.is_approved ? "text-gray-500" : ""
                }`}
              >
                My Wallet
              </button>

              {/* Tooltip message when locked */}
              {!profileData?.is_approved && isHoveredWallet && (
                <div className="absolute mt-12 bg-gray-700 text-white text-xs rounded-md p-2 z-10 shadow-lg">
                  Pay now to unlock the Wallet
                </div>
              )}
            </div>

            {/* 🚀 Bookmarks Button (Moved down) */}
            <div
              className={`mt-3 p-2 mr-4 flex items-center rounded-md cursor-pointer ${
                profileData?.is_approved
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
              {profileData?.is_approved ? (
                <FaRegBookmark size={20} />
              ) : (
                <FiLock size={20} className="text-red-500" /> // Show lock icon if not approved
              )}
              <button
                className={`pl-2 font-semibold ${
                  !profileData?.is_approved ? "text-gray-500" : ""
                }`}
              >
                {profileData?.is_approved ? "Bookmarks" : "Bookmarks"}
              </button>

              {/* Tooltip message when locked and hovered */}
              {!profileData?.is_approved && isHoveredBookmark && (
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
        <div className="w-full ">
          <nav className="bg-white border-b-2 w-full border-gray-200 p-4 flex justify-end items-center">
            <div className="flex items-center gap-5 w-full justify-start md:justify-end">
              <div className="flex items-center px-4">
                {/* Input field with ref */}
                <input
                  ref={askQuestionRef}
                  className={`text-gray-300 border border-gray-300 p-2 bg-white rounded-lg ${
                    isInputVisible ? "block" : "hidden"
                  } md:block`}
                  id="question"
                  name="question"
                  placeholder="Ask a Question"
                />
              </div>
              {user && !isInputVisible && (
                <div
                  onClick={handleDropdownClick}
                  className="flex items-center"
                >
                  <div className="flex items-center relative gap-4 cursor-pointer">
                    {/* Dynamic border based on approval status */}
                    <div
                      className={`rounded-full border-2 overflow-hidden cursor-pointer ${
                        profileData?.is_approved
                          ? "border-green-500"
                          : "border-red-600"
                      } mr-2`}
                    >
                      <Image
                        width={100}
                        height={100}
                        src={user.src}
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                      />
                      {/* Status Badge */}
                      {profileData?.is_approved ? (
                        <MdVerified
                          size={25}
                          className="absolute bottom-0 left-5 md:left-8 p-1 bg-white text-green-500 rounded-full"
                        />
                      ) : (
                        <div className="absolute bottom-0 left-5 md:left-8 p-1 bg-white text-red-500 rounded-full flex items-center">
                          <AiOutlineClockCircle
                            size={20}
                            className="text-red-500"
                          />
                        </div>
                      )}
                    </div>

                    {/* Dropdown Menu */}
                    {showDropdown && (
                      <div
                        ref={dropdownRef}
                        className="absolute z-50 left-2 md:right-0 mt-40 w-48 bg-white shadow-lg rounded-lg border"
                      >
                        <ul>
                          <Link href="/Userdashboard/profileuser">
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                              View Profile
                            </li>
                          </Link>
                          <Link href="/Userdashboard/LoginActivity">
                            <li
                              onClick={loginActivityClick}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                              Login Activity
                            </li>
                          </Link>
                              {/* 🚀 NEW: Delete Account Button */}
                          <li
                            onClick={handleDeleteAccount}
                            className="px-4 py-2 hover:bg-red-50 text-red-500 font-medium cursor-pointer transition-colors"
                          >
                            Delete Account
                          </li>
                          <li
                            onClick={handleLogout}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-t border-gray-100"
                          >
                            Log Out
                          </li>
                        </ul>
                      </div>
                    )}
                    {/* Student name */}
                    <span className="text-black text-sm md:text-lg font-semibold  mr-2">
                      {user.name}
                    </span>
                  </div>
                </div>
              )}

              {isInputVisible && (
                <button
                  className="md:hidden p-2 ml-4"
                  onClick={() => setIsInputVisible(false)}
                >
                  &times;
                </button>
              )}

              <FaSearch
                size={24}
                className={`md:hidden cursor-pointer ${
                  isInputVisible ? "hidden" : "block"
                }`}
                onClick={() => setIsInputVisible(true)}
              />
            </div>
            <button
              className={`md:hidden p-2 ml-4 ${
                isInputVisible ? "hidden" : "block"
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <HiMenu size={24} />
            </button>
          </nav>

           {/* 🚀 REMOVED QR CONDITION: Always show content once loaded */}
          {isLoading ? (
            <div className="w-full h-screen flex items-center justify-center bg-gray-100">
              {/* Square loader with the full name of Learnosphere */}
              <div className="flex items-center justify-center border-4 border-slate-500 rounded-xl animate-pulse">
                <span className="text-xl font-bold text-gray-600 p-3">
                  Learn<span className="text-orange-600">O</span>sphere..
                </span>
              </div>
            </div>
          ) : (
            <div>
              <div
                className={`fixed bottom-10 md:bottom-16 right-4 z-50 p-5 bg-orange-500 text-white rounded-full cursor-pointer shadow-lg flex items-center justify-center transition-all duration-300 ease-in-out ${
                  isFeedbackOpen ? "scale-90" : "scale-100"
                }`}
                onClick={toggleFeedback}
              >
                <LuMessagesSquare size={24} />
              </div>

              <main className="p-2 ml-0 md:ml-64">
                <Suspense fallback={<div>Loading...</div>}>
                  {children}
                </Suspense>
              </main>
            </div>
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
