"use client";
import { trackEvent } from "@/src/lib/eventTracker";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { redirect, usePathname, useRouter } from "next/navigation";
import TeacherAgreement from "@/components/TeacherAgreement";
import axios from "axios";
import playstore from "@/public/playstore.svg";

// Import icons
import { BiSolidVideos, BiSolidCloudUpload } from "react-icons/bi";
import { FcStatistics } from "react-icons/fc";
import { GiSkills, GiProgression } from "react-icons/gi";
import {
  FaFileUpload,
  FaHandHoldingUsd,
  FaTasks,
  FaApple,
} from "react-icons/fa";
import { HiHome, HiMenu } from "react-icons/hi";
import {
  TbBrandBooking,
  TbMessageCircleQuestion,
  TbWallet,
} from "react-icons/tb";
import { SiGoogleclassroom } from "react-icons/si";
import { IoIosNotifications } from "react-icons/io";
import { MdVerified, MdHistory } from "react-icons/md";
import { AiOutlineClockCircle } from "react-icons/ai";
import DashboardFooter from "@/components/DashboardFooter";
import Feedbackform from "./teacherfeedbackform/page";
import { VscReferences } from "react-icons/vsc";
import Chatbot from "@/components/Chatbot";
import KycRequiredPopup from "@/components/widgets/TutorKycAlert";

export default function Layout({ children }) {
  // State management
  const [availablePage, setAvailablePage] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
  const [showAgreement, setShowAgreement] = useState(false);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);
  const [profileData, setProfileData] = useState(null);
  const [kycRequired, setKycRequired] = useState(false);
  const [kycLoading, setKycLoading] = useState(true);
  const [dropdowns, setDropdowns] = useState({
    booking: false,
    uploadContent: false,
    statistics: false,
  });
  const [activeItem, setActiveItem] = useState(null); // Track active main item
  const [openDropdown, setOpenDropdown] = useState(null); // Track open dropdown

  const handleMainClick = (itemName, route, hasDropdown) => {
    setActiveItem(itemName.toLowerCase());
    router.push(route); // Navigate to the route

    if (hasDropdown) {
      setOpenDropdown((prev) =>
        prev === itemName.toLowerCase() ? null : itemName.toLowerCase(),
      );
    } else {
      setOpenDropdown(null); // Close dropdown when clicking a non-dropdown item
    }
  };
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

  const router = useRouter();

  // Navigation items
  const navItems = [
    {
      name: "Home",
      icon: HiHome,
      route: "/Teacherdashboard/Home",
    },
    {
      // UPDATED: Now points directly to requests and has no dropdown
      name: "Booking",
      icon: TbBrandBooking,
      route: "/Teacherdashboard/Booking/BookingRequests",
    },
    {
      name: "Upload Content",
      icon: BiSolidCloudUpload,
      route: "/Teacherdashboard/UploadContent",
      dropdown: [
        {
          name: "Upload Videos",
          icon: BiSolidVideos,
          route: "/Teacherdashboard/UploadContent/ConceptVideos",
        },
        {
          name: "Upload Notes",
          icon: FaFileUpload,
          route: "/Teacherdashboard/UploadContent/pdf",
        },
      ],
    },
    {
      name: "Skill Enhancement",
      icon: GiSkills,
      route: "/Teacherdashboard/Skillenhancement",
      // UPDATED: Added "Your Task" dropdown here
      dropdown: [
        {
          name: "Your Task",
          icon: FaTasks,
          route: "/Teacherdashboard/Booking/TodaysTask",
        },
      ],
    },
    {
      name: "Refer And Earn",
      icon: FaHandHoldingUsd,
      route: "/Teacherdashboard/Refer",
    },
    {
      name: "Statistics Overview",
      icon: FcStatistics,
      route: "/Teacherdashboard/Statisticsoverview",
      dropdown: [
        {
          name: "Progress",
          icon: GiProgression,
          route: "/Teacherdashboard/Progress",
        },
        {
          name: "Wallet",
          icon: TbWallet,
          route: "/Teacherdashboard/wallet",
        },
      ],
    },
    {
      name: "Booking History",
      icon: MdHistory,
      route: "/Teacherdashboard/Studentpanel",
    },
  ];

  // Event handlers
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const ProfileClick = () => setAvailablePage("profile");
  const AccountClick = () => setAvailablePage("account");
  const notificationClick = () => setAvailablePage("notification");
  const toggleFeedback = () => {
    setIsFeedbackOpen((prev) => !prev);
  };

  const openFeedback = () => setIsFeedbackOpen(true);
  const closeFeedback = () => setIsFeedbackOpen(false);

  const handleLogout = () => signOut({ callbackUrl: "/Signin" });

  const toggleDropdownAndNavigate = (key, route) => {
    if (route) {
      router.push(route);
    }
    setDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Authentication check
  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/Signin");
    }
  }, [session, status, router]);

  // Fetch teacher data
  useEffect(() => {
    const fetchTeacherData = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const response = await axios.post(
            "https://learnospherebackend.learnosphere.in/api/route/getTeacherByEmail",
            { gmail: session.user.email },
          );
          if (response.data.data) {
            setProfileData(response.data.data);

            if (response.data.data.isDeleted) {
              alert("Your account has been deleted. Please contact support.");
              signOut({ callbackUrl: "/Signin" });
              return; // Stop further execution
            }

            // Check if teacher has agreed to the terms
            if (response.data.data.hasAgreedToTerms === 0) {
              setShowAgreement(true); // Show agreement form if not agreed
            } else {
              setShowAgreement(false); // Hide agreement form if already agreed
            }
          }
        } catch (error) {
          console.error("Error fetching teacher profile data:", error);
          const searchParams = new URLSearchParams(window.location.search);
          const refCode = searchParams.get("ref");
          const redirectUrl = refCode
            ? `/Signin/Teacherform?ref=${refCode}`
            : "/Signin/Teacherform";
          router.push(redirectUrl);
        }
      }
    };
    fetchTeacherData();
  }, [session, status, router]);

  useEffect(() => {
    const checkKycStatus = async () => {
      if (status !== "authenticated" || !profileData) return;

      // If already verified in main database, allow access
      if (profileData.is_approved === true || profileData.is_approved === 1) {
        setKycRequired(false);
        setKycLoading(false);
        return;
      }

      // If unverified and no registration number yet, require KYC
      if (!profileData.RegistrationNumber) {
        setKycRequired(true);
        setKycLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          "https://mobileapp.backend.learnosphere.in/api/v1/kyc/check_tutor_kyc_status",
          {
            params: {
              tutorId: profileData.RegistrationNumber,
            },
          },
        );

        const { kycRequired, kycStatus } = res.data;

        const shouldBlockByStatus =
          kycStatus === "pending" ||
          kycStatus === "rejected" ||
          kycStatus === "not_started";

        setKycRequired(kycRequired || shouldBlockByStatus);
      } catch (error) {
        console.error("KYC check failed:", error);
        if (profileData?.is_approved === true || profileData?.is_approved === 1) {
          setKycRequired(false);
        } else {
          setKycRequired(true); // 🔒 fail-safe
        }
      } finally {
        setKycLoading(false);
      }
    };

    checkKycStatus();
  }, [status, profileData]);

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const teacherEmail = session?.user?.email;
        if (!teacherEmail) return;

        const response = await axios.get(
          "https://learnospherebackend.learnosphere.in/api/route/getUnreadTeacherNotifications",
          { params: { teacherEmail } },
        );

        setHasUnreadNotifications(response.data.unreadCount > 0);
        setUnreadNotificationCount(response.data.unreadCount);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, [session?.user?.email]);

  const pathname = usePathname(); // Get current route

  // Exclude layout for the 'About' page
  if (pathname === "/Teacherdashboard/Skilltestquestion") {
    return children; // Render only the children without the layout
  }

  return (
    <>
      {/* 🔒 BLURRED & BLOCKED DASHBOARD */}
      <div className={`${kycRequired ? "pointer-events-none blur-sm" : ""}`}>
        <div className="flex min-h-screen bg-slate-50/60">
          {/* Sidebar */}
          <div
            className={`fixed bg-white border-r-2 border-gray-300 p-4 w-3/4 md:w-64 z-40 h-screen transform transition-transform ${
              isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0 flex flex-col`}
          >
            {/* Logo */}
            <div className="flex justify-between items-center mb-8 shrink-0">
              <Link href="/" className="text-2xl font-bold">
                Learn<b className="text-orange-600">O</b>sphere.in
              </Link>
              <button
                className="md:hidden p-2 text-xl"
                onClick={toggleMobileMenu}
              >
                &times;
              </button>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden pb-4 custom-scrollbar">
              {navItems.map((item, index) => (
                <div key={index} className="mb-4">
                  {item.dropdown ? (
                    <>
                      <div
                        className={`flex items-center p-2 rounded-md cursor-pointer ${
                          activeItem === item.name.toLowerCase()
                            ? "bg-orange-500 text-white"
                            : "hover:bg-orange-500 hover:text-white"
                        }`}
                        onClick={() =>
                          handleMainClick(item.name, item.route, true)
                        }
                      >
                        <item.icon size={20} />
                        <span className="pl-2 font-semibold">{item.name}</span>
                      </div>
                      {openDropdown === item.name.toLowerCase() && (
                        <div className="ml-8 mt-2">
                          {item.dropdown.map((subItem, subIndex) => (
                            <Link key={subIndex} href={subItem.route}>
                              <div
                                className={`flex items-center p-1 my-1 rounded-md cursor-pointer ${
                                  activeItem === subItem.name.toLowerCase()
                                    ? "bg-orange-500 text-white"
                                    : "hover:bg-orange-500 hover:text-white"
                                }`}
                                onClick={() =>
                                  setActiveItem(subItem.name.toLowerCase())
                                }
                              >
                                <subItem.icon size={20} />
                                <span className="pl-2 font-semibold">
                                  {subItem.name}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link href={item.route}>
                      <div
                        className={`flex items-center p-2 rounded-md cursor-pointer ${
                          activeItem === item.name.toLowerCase()
                            ? "bg-orange-500 text-white"
                            : "hover:bg-orange-500 hover:text-white"
                        }`}
                        onClick={() =>
                          handleMainClick(item.name, item.route, false)
                        }
                      >
                        <item.icon size={20} />
                        <span className="pl-2 font-semibold">{item.name}</span>
                      </div>
                    </Link>
                  )}
                </div>
              ))}
              {/* 🚀 MOVED HERE: JUST BELOW BOOKING HISTORY */}
              <div className="pt-4 border-t border-gray-100 mt-2 mb-16 md:mb-4">
                <p className="text-[10px] text-gray-400 font-semibold mb-2 uppercase tracking-wider px-1">
                  Download Tutors App
                </p>
                <div className="flex gap-2 items-center w-full">
                  {/* Google Play Button */}
                  <a
                    href="https://play.google.com/store/apps/details?id=com.karotaraj.learnosphere_app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <div className="flex items-center justify-center gap-1.5 cursor-pointer bg-black py-2 px-1 rounded-lg text-white hover:bg-gray-800 transition-colors h-10">
                      <Image
                        src={playstore}
                        height={16}
                        width={16}
                        alt="playstore"
                        className="w-4 h-4 object-contain"
                      />
                      <div className="flex flex-col items-start leading-none">
                        <span className="text-[8px] text-gray-300">
                          GET IT ON
                        </span>
                        <span className="text-[10px] font-semibold whitespace-nowrap">
                          Google Play
                        </span>
                      </div>
                    </div>
                  </a>

                  {/* Apple App Store Button */}
                  <a
                    href="https://apps.apple.com/in/app/learnosphere/id6744967495"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <div className="flex items-center justify-center gap-1.5 cursor-pointer bg-black py-2 px-1 rounded-lg text-white hover:bg-gray-800 transition-colors h-10">
                      <FaApple size={20} className="mb-0.5" />
                      <div className="flex flex-col items-start leading-none">
                        <span className="text-[8px] text-gray-300">
                          Download on the
                        </span>
                        <span className="text-[10px] font-semibold whitespace-nowrap">
                          App Store
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile overlay */}
          {isMobileMenuOpen && (
            <div
              className="fixed inset-0 bg-black opacity-50 z-30"
              onClick={toggleMobileMenu}
            />
          )}

          {/* Main content area */}
          <div className="w-full min-w-0 md:pl-64 flex flex-col min-h-screen">
            {/* Top Navigation */}
            <nav className="bg-white sticky top-0 z-30 w-full px-3 sm:px-6 py-2.5 sm:py-3 border-b border-gray-200 flex justify-between items-center shadow-sm">
              {/* Mobile Hamburger Button */}
              <button
                className="md:hidden p-2 -ml-1 text-gray-700 hover:text-orange-600 focus:outline-none rounded-lg"
                onClick={toggleMobileMenu}
                aria-label="Open Menu"
              >
                <HiMenu size={24} />
              </button>

              {/* Right Side: Notifications & Profile */}
              <div className="flex items-center gap-3 sm:gap-4 ml-auto">
                <div className="relative">
                  <Link href="/Teacherdashboard/Notificationfile">
                    <IoIosNotifications
                      onClick={notificationClick}
                      className="text-gray-600 cursor-pointer hover:text-orange-600 transition-colors"
                      size={28}
                    />
                  </Link>
                  {hasUnreadNotifications && (
                    <div className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center shadow-lg">
                      {unreadNotificationCount > 99
                        ? "99+"
                        : unreadNotificationCount}
                    </div>
                  )}
                </div>

                <div
                  onClick={toggleMenu}
                  className="flex cursor-pointer items-center relative gap-2 sm:gap-3"
                >
                  <div className="relative w-9 h-9 sm:w-10 sm:h-10 shrink-0">
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 ${
                        profileData?.is_approved
                          ? "border-green-500"
                          : "border-amber-500"
                      } overflow-hidden`}
                    >
                      <Image
                        width={100}
                        height={100}
                        src={session?.user?.image || "/profile.png"}
                        alt={session?.user?.name || "Profile"}
                        className="w-full h-full object-cover cursor-pointer"
                      />
                    </div>
                    {profileData?.is_approved ? (
                      <MdVerified
                        size={16}
                        className="absolute -bottom-1 -right-1 bg-white text-green-500 rounded-full shadow"
                        title="Verified Educator"
                      />
                    ) : (
                      <AiOutlineClockCircle
                        size={15}
                        className="absolute -bottom-1 -right-1 bg-white text-amber-500 rounded-full shadow"
                        title="KYC Pending"
                      />
                    )}
                  </div>

                  {isMenuOpen && (
                    <div className="absolute top-12 sm:top-14 right-0 bg-white shadow-xl rounded-2xl border border-gray-100 z-50 w-52 py-2">
                      <Link href="/Teacherdashboard/Profileteacher">
                        <button
                          onClick={ProfileClick}
                          className="w-full px-4 py-2.5 text-left hover:bg-orange-50 text-gray-800 text-xs font-semibold flex items-center gap-2"
                        >
                          <span>👤</span> View Profile
                        </button>
                      </Link>
                      <Link href="/Teacherdashboard/AccountSetting">
                        <button
                          onClick={AccountClick}
                          className="w-full px-4 py-2.5 text-left hover:bg-gray-50 text-gray-800 text-xs font-semibold flex items-center gap-2"
                        >
                          <span>⚙️</span> Account Settings
                        </button>
                      </Link>
                      <div className="border-t border-gray-100 my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2.5 text-left hover:bg-red-50 text-red-600 text-xs font-semibold flex items-center gap-2"
                      >
                        <span>🚪</span> Logout
                      </button>
                    </div>
                  )}

                  <div className="hidden sm:flex flex-col items-start max-w-[130px] md:max-w-[160px] truncate">
                    <span className="text-black cursor-pointer font-bold text-xs truncate w-full">
                      {session?.user?.name || "Teacher"}
                    </span>
                    <span className="text-gray-500 cursor-pointer text-[10px] truncate w-full">
                      {session?.user?.email}
                    </span>
                  </div>
                </div>
              </div>
            </nav>
            {/* Floating Feedback Trigger */}
            <div
              className={`fixed bottom-28 right-5 z-40 p-4 bg-white border border-orange-200 text-orange-600 rounded-full cursor-pointer shadow-lg hover:shadow-xl hover:bg-orange-50 flex items-center justify-center transition-all duration-300 ease-in-out ${
                isFeedbackOpen ? "scale-90" : "scale-100"
              }`}
              onClick={toggleFeedback}
              title="Teacher Feedback"
            >
              <TbMessageCircleQuestion size={22} />
            </div>

            {/* AI Assistant Chatbot */}
            <Chatbot />

            {/* Main content */}
            <main className="p-2 sm:p-4 md:p-6 w-full flex-1 min-w-0 overflow-x-hidden">
              {showAgreement && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                  <div className="rounded-lg w-auto h-auto relative">
                    <TeacherAgreement setShowAgreement={setShowAgreement} />
                  </div>
                </div>
              )}

              {children}

              {/* NEW CODE: Footer only shows on the Home page */}
              {pathname === "/Teacherdashboard/Home" && (
                <DashboardFooter setShowAgreement={setShowAgreement} />
              )}
            </main>
            {/* Feedback Form */}
            {isFeedbackOpen && (
              <div className="fixed inset-0 flex items-end justify-end p-2 z-50 transition-opacity duration-300">
                <div
              className="bg-white p-4 sm:p-6 rounded-2xl w-full max-w-md shadow-md relative mx-2 mb-16 max-h-[85vh] overflow-y-auto border-2 scale-100 sm:scale-95"
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
                  <Feedbackform onClose={closeFeedback} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* 🚨 KYC POPUP (ALWAYS ON TOP) */}
      {kycRequired && <KycRequiredPopup onLogout={handleLogout} />}
    </>
  );
}
