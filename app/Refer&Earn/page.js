"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { trackEvent } from "@/src/lib/eventTracker";
import ReferPicture from "@/public/Refer&earn.png";
import Navbar from "@/components/Navbar";
import Footer1 from "@/components/Footer1";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  FaChalkboardTeacher,
  FaRegHandPointRight,
  FaUserCircle,
  FaUserPlus,
  FaShareAlt,
  FaWallet,
  FaGift,
} from "react-icons/fa";
//import ReferPicture1 from "@/public/Refer1__2_-removebg-preview.png"
//import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { PiChalkboardTeacherThin } from "react-icons/pi";
import { IoCheckmarkDone, IoRemoveOutline } from "react-icons/io5";
import {
  MdOutlineScreenShare,
  MdOutlineConfirmationNumber,
} from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";
import Education from "@/public/education.jpg";
import { useSession } from "next-auth/react";
import { HiLightningBolt } from "react-icons/hi";
import LoginSignupModal from "@/components/ReferPopup";
import { FiPlus, FiMinus } from "react-icons/fi";
import { PencilIcon, CheckIcon } from "@heroicons/react/24/outline";
import app from "@/public/app.png";
import playstore from "@/public/playstore.svg";
import Apple_Store_logo from "@/public/Apple_Store_logo.png";
import AppPic from "@/public/AppPic.jpg";
import appbrand from "@/public/appbrand.png";
import { useUser } from "@/src/context/userContext";

const steps = [
  {
    id: 1,
    title: "Share your code with friends",
    icon: <FaShareAlt />,
    bg: "bg-blue-50",
    iconBg: "bg-blue-100",
    text: "text-blue-600",
  },
  {
    id: 2,
    title: "They purchase using your referral code",
    icon: <MdOutlineConfirmationNumber />,
    bg: "bg-yellow-50",
    iconBg: "bg-yellow-100",
    text: "text-yellow-600",
  },
  {
    id: 3,
    title: "You win your reward",
    icon: <FaGift />,
    bg: "bg-pink-50",
    iconBg: "bg-pink-100",
    text: "text-pink-600",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Learnosphere Refer & Earn program?",
      acceptedAnswer: {
        "@type": "Answer",
        text: " Learnosphere Refer & Earn lets students, tutors, and users earn commission by referring tutors or CBSE online courses to others through a simple referral process.",
      },
    },
    {
      "@type": "Question",
      name: " How does tutor referral work on Learnosphere?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If you refer a qualified tutor to Learnosphere and they join the platform, you earn a commission once the tutor becomes active and starts teaching.",
      },
    },
    {
      "@type": "Question",
      name: "Can I earn by referring CBSE online courses?",
      acceptedAnswer: {
        "@type": "Answer",
        text: " Yes, you earn commission when someone enrolls in Learnosphere’s CBSE online courses using your referral link, after a successful course purchase.",
      },
    },
    {
      "@type": "Question",
      name: "Who can participate in Learnosphere Refer & Earn?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Anyone can join, including students, tutors, parents, and professionals. No prior teaching experience is required to start earning through referrals.",
      },
    },
    {
      "@type": "Question",
      name: " How much commission can I earn from referrals?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Commission depends on the referral type—tutor onboarding or course enrollment. Learnosphere offers competitive payouts for every successful referral.",
      },
    },
    {
      "@type": "Question",
      name: "Is Refer & Earn available for online tutoring and home tutoring?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Learnosphere rewards referrals for online tutoring, home tutoring services, and CBSE courses, making it a flexible earning opportunity.",
      },
    },
    {
      "@type": "Question",
      name: "How do I track my referral earnings?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can track your referrals and commissions through Learnosphere’s referral system, ensuring transparency and timely payout updates. And Through Learnosphere Educator App.",
      },
    },
    {
      "@type": "Question",
      name: " Why choose Learnosphere Refer & Earn over others?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Learnosphere offers trusted CBSE courses, verified tutors, recurring referral income, and a growing education platform, making referrals easier and more rewarding.",
      },
    },
  ],
};

export const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6">
      <button
        className="flex items-center justify-between w-full px-4 py-3 bg-white rounded-lg shadow-md hover:shadow-lg focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-[.8em] md:text-lg font-semibold font-Poppins">
          {question}
        </span>
        <span>
          {isOpen ? (
            <FiMinus className="text-gray-600 text-2xl" />
          ) : (
            <FiPlus className="text-gray-600 text-2xl" />
          )}
        </span>
      </button>
      {isOpen && (
        <p className="mt-2 px-4 py-3 text-gray-900 bg-gray-100 rounded-lg font-Poppins shadow-md">
          {answer}
        </p>
      )}
    </div>
  );
};

const ReferAndEarn = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [upiId, setUpiId] = useState("");
  const [isEditingUpi, setIsEditingUpi] = useState(false);
  const [activeTab, setActiveTab] = useState("monthly");
  const [studentTab, setStudentTab] = useState("Student");
  const [leaderboard, setLeaderboard] = useState([]);
  const { data: session, status } = useSession();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isContactFocused, setIsContactFocused] = useState(false);
  const [isMessageFocused, setIsMessageFocused] = useState(false);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("+91");
  const [selected, setSelected] = useState("");
  const dropdownRef = useRef(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const sliderRef = useRef(null);
  const { user, role, loading } = useUser();
  const { change, setchange } = useSession();
  const CARD_WIDTH = 320; // must match card width
  const GAP = 24; // gap-6 = 24px
  const SCROLL_AMOUNT = CARD_WIDTH + GAP;
  const upiRegex = /^[a-zA-Z0-9.\-_]{2,}@[a-zA-Z]{2,}$/;

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({
      left: -SCROLL_AMOUNT,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({
      left: SCROLL_AMOUNT,
      behavior: "smooth",
    });
  };

  const referralEarnings = [
    {
      priceRange: "₹1199 - ₹1399",
      youEarn: "₹199",
      friendSaves: "₹100",
    },
  ];

  // Helper: extract number from any string
  function extractNumber(str) {
    const match = str.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  }

  // Check if course belongs to children category (Class 1–8)
  function isChildrenCourse(courseClass) {
    const num = extractNumber(courseClass);
    return num >= 1 && num <= 8;
  }

  // Build the course slug
  function getCourseLink(course) {
    const subjects = Array.isArray(course.subject)
      ? course.subject
          .map((s) => s.toLowerCase().replace(/\s+/g, "-"))
          .join(",")
      : course.subject.toLowerCase().replace(/\s+/g, "-");

    const slug = `${course.class.toLowerCase().replace(/\s+/g, "-")}-${subjects}`;

    if (isChildrenCourse(course.class)) {
      return `/Courses/children/${slug}-${course._id}`;
    }

    return `/Courses/${slug}-${course._id}`;
  }

  // ========== UPI FUNCTIONS ==========
  // ========== UPI FUNCTIONS ==========
  const fetchUpiFromBackend = async (email) => {
    if (!email) {
      return;
    }

    try {
      const res = await axios.get(
        `/api/referral/getUpiByEmail?email=${encodeURIComponent(email)}`,
      );

      // ⚠️ IMPORTANT: Check the actual structure of your response
      let upi = "";

      // Try different possible response structures
      if (res.data?.upi_id) {
        upi = res.data.upi_id;
      } else if (res.data?.data?.upi_id) {
        upi = res.data.data.upi_id;
      } else if (res.data?.data?.upiId) {
        upi = res.data.data.upiId;
      } else if (res.data?.upiId) {
        upi = res.data.upiId;
      } else {
        console.log("Response keys:", Object.keys(res.data));
        if (res.data?.data) {
          console.log("Data keys:", Object.keys(res.data.data));
        }
      }

      if (upi) {
        setUpiId(upi);
        setIsEditingUpi(false);
        // ✅ STORE IN SESSIONSTORAGE FOR PERSISTENCE
        sessionStorage.setItem("upi_id", upi);
      } else {
        setUpiId("");
        setIsEditingUpi(true);
        // DO NOT clear sessionStorage - keep the existing UPI

        // Check if we have UPI in sessionStorage already
        const storedUpi = sessionStorage.getItem("upi_id");
        if (storedUpi) {
          setUpiId(storedUpi);
          setIsEditingUpi(false);
        }
      }
    } catch (err) {
      console.error("❌ Fetch UPI error:", err);
      // On error, keep existing sessionStorage value
      const storedUpi = sessionStorage.getItem("upi_id");
    }
  };

  // ========== USEFFECTS ==========
  // 1. Initial load on mount - ONLY RUNS ONCE
  useEffect(() => {
    // Check ALL sessionStorage data at once
    const storedEmail = sessionStorage.getItem("referral_email");
    const storedUpiId = sessionStorage.getItem("upi_id");
    const storedReferralCode = sessionStorage.getItem("referral_code");
    const storedToken = sessionStorage.getItem("token");

    // If we have stored UPI ID, set it IMMEDIATELY
    if (storedUpiId) {
      setUpiId(storedUpiId);
      setIsEditingUpi(false);
    }
    if (storedEmail && !storedUpiId) {
      fetchUpiFromBackend(storedEmail);
    }
    // If we have stored referral code, set it IMMEDIATELY
    if (storedReferralCode) {
      setReferralCode(storedReferralCode);
    }

    // If we have email, set logged in state
    if (storedEmail || storedToken) {
      setIsLoggedIn(true);
    }
  }, []); // Empty dependency array - runs ONLY ONCE on mount

  // 2. Main data fetching - UPDATED WITH DEBOUNCE
  useEffect(() => {
    // Don't run if still loading
    if (loading || status === "loading") {
      return;
    }

    // Get the current email from state/sessionStorage
    let email = "";

    // Priority 1: Check if we already have email from sessionStorage
    email = sessionStorage.getItem("referral_email");

    // Priority 2: User context (most reliable)
    if (!email && user?.email) {
      email = user.email;

      sessionStorage.setItem("referral_email", email);
    }

    // Priority 3: NextAuth session
    if (!email && session?.user?.email) {
      email = session.user.email;

      sessionStorage.setItem("referral_email", email);
    }

    // If no email found at all
    if (!email) {
      // Check if we should show as logged out
      const token = sessionStorage.getItem("token");
      if (!token) {
        setIsLoggedIn(false);
        setUpiId("");
        setIsEditingUpi(true);
        setReferralCode("");
      }
      return;
    }

    setIsLoggedIn(true);

    // IMPORTANT: Only fetch if we don't already have the data
    const storedUpiId = sessionStorage.getItem("upi_id");
    const storedReferralCode = sessionStorage.getItem("referral_code");

    // Fetch UPI if we don't have it stored
    if (!storedUpiId) {
      fetchUpiFromBackend(email);
    } else {
      // Already set in the initial useEffect, but double-check
      if (upiId !== storedUpiId) {
        setUpiId(storedUpiId);
        setIsEditingUpi(false);
      }
    }

    // Fetch referral code if we don't have it stored
    if (!storedReferralCode) {
      fetchReferralFromBackend();
    } else {
      // Already set in the initial useEffect, but double-check
      if (referralCode !== storedReferralCode) {
        setReferralCode(storedReferralCode);
      }
    }

    // Also check user object for referral code (might be faster)
    if (user?.referral_code && !storedReferralCode) {
      setReferralCode(user.referral_code);
      sessionStorage.setItem("referral_code", user.referral_code);
    }
  }, [session, status, user, loading]); // Watch these dependencies

  // 3. Login status sync - SIMPLIFIED
  useEffect(() => {
    // If we have token or email in sessionStorage, user is logged in
    const token = sessionStorage.getItem("token");
    const email = sessionStorage.getItem("referral_email");

    if (token || email) {
      setIsLoggedIn(true);
    }

    // Also check auth state
    if (status === "authenticated" || user?.email) {
      setIsLoggedIn(true);
    }
  }, [session, status, user]);

  const clearSessionStorage = (keepUpi = false) => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("referral_email");
    sessionStorage.removeItem("referral_code");

    // Only clear UPI ID if not asked to keep it
    if (!keepUpi) {
      sessionStorage.removeItem("upi_id");
      setUpiId("");
      setIsEditingUpi(true);
    }

    setReferralCode("");
    setIsLoggedIn(false);
  };

  const handleLogout = () => {
    // Clear all refer & earn related data
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("referral_email");
    sessionStorage.removeItem("upi_id");
    sessionStorage.removeItem("referral_code");

    // Reset component state
    setIsLoggedIn(false);
    setUpiId("");
    setReferralCode("");
    setIsEditingUpi(true);
  };
  const handleSaveUpi = async () => {
    // Try multiple sources for email
    let email = "";
    email = sessionStorage.getItem("referral_email");

    if (!email && session?.user?.email) {
      email = session.user.email;

      sessionStorage.setItem("referral_email", email);
    }

    if (!email && user?.email) {
      email = user.email;

      sessionStorage.setItem("referral_email", email);
    }

    const trimmedUpi = upiId?.trim();

    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Email Not Found",
        text: "Please login again to continue",
        timer: 2000,
      });
      return;
    }

    if (!trimmedUpi) {
      Swal.fire({
        icon: "warning",
        title: "UPI ID Required",
        text: "Please enter your UPI ID (example: 9876543210@upi)",
        timer: 2000,
      });
      return;
    }

    if (!upiRegex.test(trimmedUpi)) {
      Swal.fire({
        icon: "error",
        title: "Invalid UPI ID",
        text: "Please enter a valid UPI ID\nExample: 9876543210@upi\nFormat: name@bank",
      });
      return;
    }

    try {
      const token = sessionStorage.getItem("token");

      Swal.fire({
        title: "Saving UPI ID...",
        text: "Please wait",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const res = await axios.post(
        "api/referral/updateReferralUpiId",
        { email, upiId: trimmedUpi },
        {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        },
      );

      sessionStorage.setItem("referral_email", email);

      // Update state AND store in sessionStorage
      setUpiId(trimmedUpi);
      setIsEditingUpi(false);
      sessionStorage.setItem("upi_id", trimmedUpi);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "UPI ID saved successfully",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error(
        "❌ UPI update failed:",
        error.response?.data || error.message,
      );
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response?.data?.message ||
          "Failed to save UPI ID. Please try again.",
      });
    }
  };

  // ========== REFERRAL FUNCTIONS ==========
  const fetchReferralFromBackend = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        return;
      }

      const res = await axios.get("api/referral/getReferralCodeByEmail", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success && res.data.referralCode) {
        setReferralCode(res.data.referralCode);
        setIsLoggedIn(true);
        // Store referral code in sessionStorage
        sessionStorage.setItem("referral_code", res.data.referralCode);
      }
    } catch (error) {
      console.error("❌ Fetch referral failed:", error);
      // Don't clear state on error - keep existing data
    }
  };
  // ========== OTHER FUNCTIONS ==========
  const handleSelect = (code) => {
    setSelected(code);
    setSelectedCountry(code);
    setShowDropdown(false);
  };

  const handleContact = (e) => {
    const { value } = e.target;
    if (/^\d{0,10}$/.test(value)) {
      setContact(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");

    const formData = {
      name,
      email,
      contact,
      message,
      countryCode: selectedCountry,
    };

    try {
      const response = await axios.post(
        "https://learnospherebackend.learnosphere.in/api/route/teachercontact",
        formData,
        { headers: { "Content-Type": "application/json" } },
      );

      if (response.status === 200) {
        trackEvent("REFER_AND_EARN_INQUIRY_FORM_SUBMITTED", {
          name,
          email,
          mobile_number: selectedCountry ? `${selectedCountry}${contact}` : contact,
          contact,
          message,
          country_code: selectedCountry,
        });

        sessionStorage.setItem("referral_email", email);
        setSuccess("Form Submitted Successfully");
        setName("");
        setContact("");
        setMessage("");
        setSelectedCountry("+91");

        Swal.fire({
          title: "Thank You for Reaching Out!",
          text: "Your query has been received, and our team will contact you shortly.",
          icon: "success",
        });
      } else {
        setErrors({ general: "Failed to submit the form. Please try again." });
      }
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: "An error occurred while submitting the form." });
      }
    }
  };

  // ========== USEFFECTS ==========
  // 1. Initial load on mount/refresh - CHECK SESSIONSTORAGE FIRST
  useEffect(() => {
    // Check sessionStorage for previously stored data
    const storedEmail = sessionStorage.getItem("referral_email");
    const storedUpiId = sessionStorage.getItem("upi_id");
    const storedReferralCode = sessionStorage.getItem("referral_code");

    if (storedEmail) {
      setIsLoggedIn(true);

      // Load UPI from sessionStorage if available
      if (storedUpiId) {
        setUpiId(storedUpiId);
        setIsEditingUpi(false);
      }

      // Load referral code from sessionStorage if available
      if (storedReferralCode) {
        setReferralCode(storedReferralCode);
      }
    }
  }, []); // Runs once on mount

  // 2. Main data fetching useEffect - UPDATED VERSION
  useEffect(() => {
    const fetchAllData = async () => {
      // Get email from multiple sources
      let email = sessionStorage.getItem("referral_email");

      if (!email && user?.email) {
        email = user.email;

        sessionStorage.setItem("referral_email", email);
      }

      if (!email && session?.user?.email) {
        email = session.user.email;

        sessionStorage.setItem("referral_email", email);
      }

      if (!email) {
        setIsLoggedIn(false);
        setUpiId("");
        setIsEditingUpi(true);
        return;
      }

      setIsLoggedIn(true);
      sessionStorage.setItem("referral_email", email);

      try {
        // Fetch UPI first

        await fetchUpiFromBackend(email);

        // Then fetch referral code

        await fetchReferralFromBackend();
      } catch (error) {
        console.error("❌ Error fetching data:", error);
      }
    };

    // Fetch data immediately if we have email in sessionStorage
    const sessionStorageEmail = sessionStorage.getItem("referral_email");
    if (sessionStorageEmail) {
      fetchAllData();
    } else if (status === "authenticated" || user?.email) {
      // Wait for auth to load if no sessionStorage

      fetchAllData();
    }
  }, [session, status, user]);

  // 3. Leaderboard useEffect
  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const res = await fetch(
          `https://learnospherebackend.learnosphere.in/api/route/getLeaderboardData?period=${activeTab}`,
        );
        const data = await res.json();

        if (Array.isArray(data)) {
          setLeaderboard(data);
        } else if (Array.isArray(data.data)) {
          setLeaderboard(data.data);
        } else if (Array.isArray(data.leaderboard)) {
          setLeaderboard(data.leaderboard);
        } else {
          setLeaderboard([]);
        }
      } catch (error) {
        console.error("Leaderboard fetch error:", error);
        setLeaderboard([]);
      }
    }
    fetchLeaderboard();
  }, [activeTab]);

  // 4. Countries dropdown useEffect
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get(
          "https://learnospherebackend.learnosphere.in/api/route/getAllCountries",
        );
        setCountries(res.data);
      } catch (err) {
        console.error("Error fetching countries:", err);
      }
    };
    fetchCountries();
  }, []);

  // 5. Courses useEffect
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.post(
          "https://mobileapp.backend.learnosphere.in/api/route/getAllcourses",
        );
        setCourses(response.data);
      } catch (err) {
        console.error(
          "Axios fetch failure",
          err.response?.status,
          err.response?.data,
        );
        setError("Failed to load courses.");
      }
    };
    fetchCourses();
  }, []);

  // 6. Login status useEffect - UPDATED WITH SESSIONSTORAGE
  useEffect(() => {
    if (loading || status === "loading") return;

    // 1️⃣ Dashboard user (preferred & fastest)
    if (user?.referral_code) {
      setIsLoggedIn(true);
      setReferralCode(user.referral_code);
      sessionStorage.setItem("referral_code", user.referral_code);
      return;
    }

    // 2️⃣ NextAuth session
    if (status === "authenticated" && session?.user?.referral_code) {
      setIsLoggedIn(true);
      setReferralCode(session.user.referral_code);
      sessionStorage.setItem("referral_code", session.user.referral_code);
      return;
    }

    // 3️⃣ Refer & Earn JWT user
    const token = sessionStorage.getItem("token");
    if (token) {
      fetchReferralFromBackend();
      return;
    }

    // 4️⃣ Check sessionStorage for persistence
    const storedReferralCode = sessionStorage.getItem("referral_code");
    const storedEmail = sessionStorage.getItem("referral_email");

    if (storedReferralCode && storedEmail) {
      setIsLoggedIn(true);
      setReferralCode(storedReferralCode);
      return;
    }

    // 5️⃣ Anonymous
    setIsLoggedIn(false);
    setReferralCode("");
  }, [user, loading, status, session]);

  // 8. Session cleanup detection - AUTO LOGOUT HANDLER
  useEffect(() => {
    // Check if user is logged out
    const isLoggedOut =
      (status === "unauthenticated" || status === "loading") &&
      !user &&
      !sessionStorage.getItem("token");

    if (isLoggedOut && referralCode) {
      handleLogout();
    }
  }, [status, user, referralCode]);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      const sessionStorageEmail = sessionStorage.getItem("referral_email");
      const authEmail = session.user.email;

      if (sessionStorageEmail && sessionStorageEmail !== authEmail) {
        fetchUpiFromBackend(authEmail).then(() => {
          const newUserUpi = sessionStorage.getItem("upi_id");

          clearSessionStorage(!!newUserUpi);

          sessionStorage.setItem("referral_email", authEmail);
          fetchReferralFromBackend();
        });
      }
    }
  }, [status, session, user]);
  // 9. Dropdown click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ========== RENDER ==========
  return (
    <div className="font-Poppins">
      <Navbar />
      {/* Decorative blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-orange-200 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-yellow-200 rounded-full blur-3xl opacity-40"></div>

      {/* ================= HERO SECTION ================= */}
      <section className="mt-24 w-full lg:w-[75vw] xl:w-[65vw] mx-auto bg-gradient-to-br from-[#FF8A3D] via-[#FFB26B] to-[#FF8A3D] rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center justify-between">
        <div className="max-w-xl text-white">
          <h1 className="font-extrabold leading-tight tracking-tight text-2xl md:text-4xl">
            Refer & Earn –<br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-blue-900 text-xl md:text-2xl">
              Invite Friends, Get Rewards!
            </span>
          </h1>

          <p className="mt-2 text-sm md:text-base">
            Refer your friends, and earn exciting rewards for every successful
            referral!
          </p>

          {/* ===== REFER CTA BOX ===== */}
          <div className="bg-white/30 rounded-xl max-w-md">
            <div className="mt-6 bg-white rounded-xl p-2 flex flex-row items-center gap-4 shadow-md max-w-md">
              {/* LEFT TEXT / CODE */}
              <div className="flex-1 text-sm">
                {!isLoggedIn ? (
                  <>
                    <p className="text-xs text-gray-600">
                      Login to view your code
                    </p>
                    <p className="font-mono font-bold text-lg tracking-widest text-gray-400">
                      XXXXXXX
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-gray-600">Your referral code</p>
                    <p className="font-mono font-bold text-lg tracking-widest text-blue-600">
                      {referralCode}
                    </p>
                  </>
                )}
              </div>

              {/* RIGHT BUTTON */}
              {!isLoggedIn ? (
                <div>
                  <button
                    onClick={() => setShowLogin(true)}
                    className="bg-orange-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-orange-700 transition whitespace-nowrap"
                  >
                    Signup →
                  </button>

                  <LoginSignupModal
                    isOpen={showLogin}
                    onClose={() => setShowLogin(false)}
                    onSuccess={(token, email, referral_code, upi_id) => {
                      // Check if this user already has UPI ID in database
                      fetchUpiFromBackend(email).then(() => {
                        const existingUpi = sessionStorage.getItem("upi_id");

                        // Only clear if it's a different user's UPI
                        const sessionStorageEmail =
                          sessionStorage.getItem("referral_email");
                        if (
                          sessionStorageEmail &&
                          sessionStorageEmail !== email
                        ) {
                          clearSessionStorage(false); // Clear everything including UPI
                        }

                        // Set new data
                        if (token) sessionStorage.setItem("token", token);
                        sessionStorage.setItem("referral_email", email);

                        if (referral_code) {
                          sessionStorage.setItem(
                            "referral_code",
                            referral_code,
                          );
                          setReferralCode(referral_code);
                        }

                        // If backend gave us UPI ID, use it; otherwise keep existing if same user
                        if (upi_id) {
                          sessionStorage.setItem("upi_id", upi_id);
                          setUpiId(upi_id);
                          setIsEditingUpi(false);
                        } else if (
                          existingUpi &&
                          sessionStorageEmail === email
                        ) {
                          // Same user, keep their existing UPI
                          setUpiId(existingUpi);
                          setIsEditingUpi(false);
                        }

                        setIsLoggedIn(true);
                        setShowLogin(false);
                      });
                    }}
                  />
                </div>
              ) : (
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(referralCode);
                    Swal.fire({
                      toast: true,
                      position: "center",
                      icon: "success",
                      title: "Referral code copied",
                      showConfirmButton: false,
                      timer: 1200,
                      timerProgressBar: true,
                    });
                  }}
                  className="bg-orange-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-orange-700 transition whitespace-nowrap"
                >
                  Copy Code
                </button>
              )}
            </div>

            {/* ===== UPI SECTION ===== */}
            <div className="mt-4 rounded-xl p-2 flex items-center gap-3 shadow-md max-w-md bg-white/5">
              <div className="flex-1">
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\s/g, "");

                    setUpiId(value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && isEditingUpi) {
                      handleSaveUpi();
                    }
                  }}
                  readOnly={!isEditingUpi}
                  placeholder={
                    isEditingUpi ? "Enter your UPI ID" : "No UPI ID set"
                  }
                  className={`w-full px-3 py-2 rounded-lg text-sm 
                  focus:outline-none focus:ring-2 focus:ring-orange-500
                  ${
                    isEditingUpi
                      ? "bg-white text-gray-800 border border-gray-300"
                      : "bg-transparent text-gray-700"
                  }`}
                />
                {isEditingUpi && (
                  <p className="text-xs text-gray-500 mt-1">
                    Example: 9876543210@upi
                  </p>
                )}
              </div>

              {isLoggedIn && (
                <button
                  onClick={() => {
                    if (isEditingUpi) {
                      if (!upiId.trim()) {
                        Swal.fire({
                          icon: "warning",
                          title: "UPI ID Required",
                          text: "Please enter your UPI ID before saving",
                          timer: 2000,
                        });
                        return;
                      }
                      handleSaveUpi();
                    } else {
                      setIsEditingUpi(true);
                      setTimeout(() => {
                        const input = document.querySelector(
                          'input[placeholder="Enter your UPI ID"]',
                        );
                        input?.focus();
                      }, 100);
                    }
                  }}
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg 
                  text-sm font-semibold transition whitespace-nowrap
                  ${
                    isEditingUpi
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-orange-600 text-white hover:bg-orange-700"
                  }`}
                >
                  {isEditingUpi ? (
                    <>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Save
                    </>
                  ) : (
                    <>
                      <PencilIcon className="w-4 h-4" />
                      Edit UPI ID
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* ===== SOCIAL PROOF + WITHDRAWAL ===== */}
          <div className="mt-4 flex flex-col gap-3">
            <div className="flex items-center gap-3 mt-5">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white border-2 border-white">
                  <FaUserCircle size={18} />
                </div>
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white border-2 border-white">
                  <FaUserCircle size={18} />
                </div>
                <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-white border-2 border-white">
                  <FaUserCircle size={18} />
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-xs font-semibold border-2 border-white">
                  +3K
                </div>
              </div>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">3K learners</span> have earned{" "}
                <span className="font-semibold">₹20K</span> worth of rewards
              </p>
            </div>

            <div className="inline-flex items-center gap-2 bg-black/80 text-white px-3 py-1 rounded-full text-xs w-fit">
              <HiLightningBolt className="text-yellow-400" />
              Instant Withdrawals, anytime, anywhere
            </div>
          </div>
        </div>

        <Image
          src={ReferPicture}
          alt="Refer and Earn"
          className="w-[360px] mr-5 rounded md:mt-0"
        />
      </section>
      {/* Add your remaining sections here - they should stay exactly the same */}
      <div className="flex flex-col gap-6 w-full md:w-[65vw] mx-auto mt-6 ">
        {/* ===== REFER TABLE CARD ===== */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="font-bold text-lg mb-4">Refer our courses & Earn</h2>
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-2">Final Course Price</th>
                <th className="text-left px-4 py-2">You Earn</th>
                <th className="text-left px-4 py-2">Extra Saving For Friend</th>
              </tr>
            </thead>
            <tbody>
              {referralEarnings.map((item, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-2">{item.priceRange}</td>
                  <td className="px-4 py-2 font-semibold text-green-600">
                    {item.youEarn}
                  </td>
                  <td className="px-4 py-2 text-blue-600">
                    {item.friendSaves}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <section className="w-full lg:w-[80vw] xl:w-[70vw] mx-auto mt-6 md:flex gap-6">
        {/* ================= LEFT COLUMN ================= */}
        <div className="bg-white rounded-xl shadow-sm p-4 lg:w-[55vw] xl:w-[45vw] items-center justify-center">
          {/* App preview placeholder */}
          <div className="flex justify-center item-center flex-col px-2 md:px-4 lg:px-0">
            <div className="flex bg-gray-100 w-fit rounded-full text-md">
              <button
                onClick={() => setStudentTab("Student")}
                className={`px-4 py-3 rounded-full font-semibold transition ${
                  studentTab === "Student"
                    ? "bg-orange-600 text-white"
                    : "text-gray-600 hover:text-orange-600"
                }`}
              >
                Student App
              </button>

              <button
                onClick={() => setStudentTab("Tutor")}
                className={`px-4 py-3 rounded-full font-semibold transition ${
                  studentTab === "Tutor"
                    ? "bg-orange-600 text-white"
                    : "text-gray-600 hover:text-orange-600"
                }`}
              >
                Tutor App
              </button>
            </div>
            <div className="flex flex-col gap-3 mt-4">
              {studentTab === "Student" && (
                <div className="flex flex-col md:flex-row items-center gap-10 my-5 relative">
                  {/* LEFT TEXT SECTION */}
                  <div className="flex-1 text-gray-800 animate-leftFloat">
                    <h3 className="text-xl md:text-3xl font-extrabold text-orange-600 leading-snug">
                      🏆 Want Better Marks This Year?
                    </h3>

                    <p className="mt-4 text-gray-700 leading-relaxed">
                      <b>
                        Learn<b className="text-orange-600">O</b>sphere Can Help
                      </b>
                    </p>

                    <p className="mt-3 md:text-lg">
                      Download the{" "}
                      <b className="text-orange-600">LearnOsphere App</b> now
                    </p>

                    {/* BUTTONS */}
                    <div className="flex justify-start flex-wrap gap-4 pt-8">
                      {/* Google Play */}
                      <a
                        href="https://play.google.com/store/apps/details?id=com.karotaraj.learnosphere_main"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-black hover:bg-[#1d1d1d] transition-all duration-200 rounded-xl px-5 py-2 text-white shadow-md"
                      >
                        <Image
                          src={playstore}
                          alt="Playstore"
                          width={26}
                          height={26}
                          className="rounded"
                        />
                        <div className="leading-tight">
                          <p className="text-[9px] font-medium">GET IT ON</p>
                          <p className="text-[12px] font-semibold">
                            Google Play
                          </p>
                        </div>
                      </a>

                      {/* App Store */}
                      <a
                        href="https://apps.apple.com/in/app/learnosphere-learning-app/id6748979882"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-black hover:bg-[#1d1d1d] transition-all duration-200 rounded-xl px-5 py-2 text-white shadow-md"
                      >
                        <Image
                          src="/Apple_Store_logo.png"
                          alt="App Store"
                          width={26}
                          height={26}
                        />
                        <div className="leading-tight">
                          <p className="text-[9px] font-medium">DOWNLOAD ON</p>
                          <p className="text-[12px] font-semibold whitespace-nowrap">
                            App Store
                          </p>
                        </div>
                      </a>
                    </div>
                  </div>

                  {/* RIGHT IMAGE SECTION */}
                  <div className="flex-1 md:flex w-full md:w-auto justify-center">
                    <div className="relative animate-imageTilt">
                      <Image
                        src={AppPic}
                        alt="Learnosphere App"
                        className="rounded-2xl w-full h-auto max-h-80 object-contain duration-500 md:-translate-x-3 md:rotate-12 md:hover:rotate-0"
                      />
                    </div>
                  </div>
                </div>
              )}

              {studentTab === "Tutor" && (
                <div className="flex flex-col md:flex-row items-center gap-10 relative my-8">
                  {/* LEFT TEXT SECTION */}
                  <div className="flex-1 text-orange-600 animate-leftFloat">
                    <h3 className="text-xl md:text-3xl font-extrabold text-gray-600 leading-snug">
                      Teach at your own Pace
                    </h3>

                    <p className="mt-4 text-gray-700 leading-relaxed">
                      <b>
                        Learn<b className="text-orange-600">O</b>sphere Can Help
                      </b>
                    </p>

                    <p className="mt-3 md:text-lg">
                      Download the{" "}
                      <b className="text-orange-600">LearnOsphere App</b> now
                    </p>

                    {/* BUTTONS */}
                    <div className="flex justify-start flex-wrap gap-4 pt-8">
                      {/* Google Play */}
                      <a
                        href="https://play.google.com/store/apps/details?id=com.karotaraj.learnosphere_app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-black hover:bg-[#1d1d1d] transition-all duration-200 rounded-xl px-5 py-2 text-white shadow-md"
                      >
                        <Image
                          src={playstore}
                          alt="Playstore"
                          width={26}
                          height={26}
                          className="rounded"
                        />
                        <div className="leading-tight">
                          <p className="text-[9px] font-medium">GET IT ON</p>
                          <p className="text-[12px] font-semibold">
                            Google Play
                          </p>
                        </div>
                      </a>

                      {/* App Store */}
                      <a
                        href="https://apps.apple.com/in/app/learnosphere/id6744967495"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-black hover:bg-[#1d1d1d] transition-all duration-200 rounded-xl px-5 py-2 text-white shadow-md"
                      >
                        <Image
                          src="/Apple_Store_logo.png"
                          alt="App Store"
                          width={26}
                          height={26}
                        />
                        <div className="leading-tight">
                          <p className="text-[9px] font-medium">DOWNLOAD ON</p>
                          <p className="text-[12px] font-semibold whitespace-nowrap">
                            App Store
                          </p>
                        </div>
                      </a>
                    </div>
                  </div>

                  {/* RIGHT IMAGE SECTION */}
                  <div className="flex-1 md:flex w-full md:w-auto justify-center">
                    <div className="relative animate-imageTilt">
                      <Image
                        src={appbrand}
                        alt="Learnosphere App"
                        className="rounded-2xl w-full h-auto max-h-80 object-contain duration-500 md:-translate-x-3 md:rotate-12 md:hover:rotate-0"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Course Cards */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
            {/* Card 1 */}
            <div className="rounded-xl p-4 bg-orange-50 md:py-8 border border-orange-100 shadow-sm hover:shadow-md transition h-[170px]">
              <h4 className="text-base font-semibold text-orange-700 mb-1">
                📘 Smart Exam Prep
              </h4>
              <p className="text-sm text-orange-600/80 mb-3">
                Learn concepts the easy & effective way
              </p>
              <Link
                href="/Courses"
                className="text-sm text-orange-700 font-medium hover:underline"
              >
                View course →
              </Link>
            </div>

            {/* Card 2 */}
            <div className="rounded-xl p-4 bg-blue-50 md:py-8 border border-blue-100 shadow-sm hover:shadow-md transition h-[170px]">
              <h4 className="text-base font-semibold text-blue-700 mb-1">
                🎯 Guided Learning
              </h4>
              <p className="text-sm text-blue-600/80 mb-3">
                Structured study plans with mentors
              </p>
              <Link
                href="/Courses"
                className="text-sm text-blue-700 font-medium hover:underline"
              >
                Explore →
              </Link>
            </div>

            {/* Card 3 */}
            <div className="rounded-xl p-4 bg-purple-50 md:py-8 border border-purple-100 shadow-sm hover:shadow-md transition h-[170px]">
              <h4 className="text-base font-semibold text-purple-700 mb-1">
                🌱 Learn at Your Pace
              </h4>
              <p className="text-sm text-purple-600/80 mb-3">
                Flexible lessons designed for you
              </p>
              <Link
                href="/Courses"
                className="text-sm text-purple-700 font-medium hover:underline"
              >
                Start learning →
              </Link>
            </div>

            {/* Card 4 */}
            <div className="rounded-xl p-4 bg-green-50 md:py-8 border border-green-100 shadow-sm hover:shadow-md transition h-[170px]">
              <h4 className="text-base font-semibold text-green-700 mb-1">
                💛 Student Friendly Pricing
              </h4>
              <p className="text-sm text-green-600/80 mb-3">
                Affordable courses made for students
              </p>
              <Link
                href="/Courses"
                className="text-sm text-green-700 font-medium hover:underline"
              >
                See plans →
              </Link>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <div className="sticky top-24 h-fit lg:w-[25vw]">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Leaderboard</h3>
              <div className="flex bg-gray-100 rounded-full text-xs">
                <button
                  onClick={() => setActiveTab("monthly")}
                  className={`px-3 py-1 rounded-full font-semibold transition ${
                    activeTab === "monthly"
                      ? "bg-orange-600 text-white"
                      : "text-gray-600 hover:text-orange-600"
                  }`}
                >
                  Monthly
                </button>

                <button
                  onClick={() => setActiveTab("annually")}
                  className={`px-3 py-1 rounded-full font-semibold transition ${
                    activeTab === "annually"
                      ? "bg-orange-600 text-white"
                      : "text-gray-600 hover:text-orange-600"
                  }`}
                >
                  Annually
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-3 mt-4">
              {Array.isArray(leaderboard) &&
                leaderboard.map((user, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg"
                  >
                    {/* LEFT */}
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-sm">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold leading-tight">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {user.referrals} Referrals
                        </p>
                      </div>
                    </div>
                    {/* RIGHT */}
                    <p className="text-sm font-semibold text-green-600">
                      {user.earnings}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= Course Share Section ================= */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">
              <span className="text-orange-500">Share </span>Our Popular Courses
            </h2>
            <p className="text-gray-500 mt-2">
              Learn smarter with expert-designed programs
            </p>
          </div>

          {/* Card Section */}
          <div className="relative">
            {/* Left Button */}
            <button
              onClick={scrollLeft}
              className="absolute -left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg hover:bg-orange-50 flex items-center justify-center"
            >
              ←
            </button>

            {/* Right Button */}
            <button
              onClick={scrollRight}
              className="absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg hover:bg-orange-50 flex items-center justify-center"
            >
              →
            </button>

            {/* Viewport – EXACTLY 3 cards visible */}
            <div
              ref={sliderRef}
              className="overflow-x-auto scroll-smooth scrollbar-hide mx-auto rounded-2xl w-full lg:w-auto"
              style={{
                maxWidth: `calc(${CARD_WIDTH}px * 3 + ${GAP}px * 2)`,
              }}
            >
              {/* Slider Track */}
              <div className="flex gap-6">
                {courses.map((course) => (
                  <Link
                    href={getCourseLink(course)}
                    key={course._id}
                    className="group w-[320px] flex-shrink-0 bg-white rounded-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                  >
                    {/* Image */}
                    <div className="relative h-52 w-full overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
                      <Image
                        src={course.thumbnail}
                        alt={course.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute bottom-4 left-4 right-4 z-20">
                        <h3 className="text-lg font-semibold text-white drop-shadow-md line-clamp-2">
                          {course.title}
                        </h3>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 relative flex flex-col flex-grow">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-orange-50 rounded-bl-full opacity-50 group-hover:scale-110 transition-transform" />
                      <p className="text-gray-600 text-sm line-clamp-3 relative z-10">
                        {course.description}
                      </p>

                      {/* Card Footer */}
                      <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                        {/* Share Button */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (navigator.share) {
                              navigator.share({
                                title: course.title,
                                text: "Check out this amazing course!",
                                url:
                                  window.location.origin +
                                  getCourseLink(course),
                              });
                            } else {
                              navigator.clipboard.writeText(
                                window.location.origin + getCourseLink(course),
                              );
                              alert("Course link copied to clipboard!");
                            }
                          }}
                          className="text-orange-600 font-semibold text-sm flex items-center gap-1 hover:text-orange-700 transition-colors"
                        >
                          🔗 Share
                        </button>

                        {/* View Course */}
                        <span className="flex items-center text-orange-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                          View Course
                          <svg
                            className="w-4 h-4 ml-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Explore More Button */}
          <div className="mt-14 text-center">
            <Link
              href="/Courses"
              className="inline-flex items-center px-8 py-3 rounded-full bg-orange-600 text-white font-semibold shadow-md hover:bg-orange-700 hover:shadow-lg transition-all"
            >
              Explore More Courses
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#F9FCFF] py-12 rounded-3xl">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="flex items-center gap-3 my-5">
            <h2 className="text-2xl font-bold text-gray-900">How it works?</h2>
            <span className="flex items-center gap-1 text-sm font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">
              ✨ Rewards
            </span>
          </div>

          <p className="text-gray-600 mb-10">
            Get rewarded each time your friend makes a purchase
          </p>

          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`relative p-6 rounded-2xl ${step.bg} shadow-sm hover:shadow-md transition`}
              >
                {/* Step Number */}
                <span className="absolute top-4 right-4 w-6 h-6 rounded-full border border-gray-300 text-xs flex items-center justify-center font-semibold text-gray-600">
                  {step.id}
                </span>

                {/* Icon */}
                <div
                  className={`w-14 h-14 ${step.iconBg} ${step.text} rounded-xl flex items-center justify-center text-2xl mb-4`}
                >
                  {step.icon}
                </div>

                {/* Text */}
                <p className="font-semibold text-gray-900 leading-snug">
                  {step.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-14 w-full lg:w-[65vw] mx-auto flex flex-col items-center border border-gray-200 rounded-2xl p-4 md:p-10 lg:p-16 shadow-xl bg-gradient-to-br from-blue-200 via-orange-200 to-green-100">
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl">
          <h3 className="font-bold text-[1.2em] md:text-[1.6em]">
            How to Earn Rewards After a Successful Referral?
          </h3>
          <p className="font-medium text-gray-600 text-[.85em] md:text-[1.05em] mt-3">
            To earn rewards, both the teacher and the referred teacher must
            follow these steps:
          </p>
        </div>

        {/* STEPS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 w-full">
          {/* CARD 1 */}
          <div className="bg-black/5 p-6 rounded-2xl flex flex-col gap-4 shadow-sm hover:shadow-md transition">
            <div className="w-14 h-14 flex items-center justify-center bg-white rounded-xl">
              <FaChalkboardTeacher className="text-red-500" size={28} />
            </div>
            <h3 className="font-bold text-lg">For Teachers</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              Upload 15 unique videos related to the subject they teach. These
              videos should be relevant to the topics on the website or the
              specific subject they represent. Once 15 videos are uploaded
              successfully, they will become eligible for rewards.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="bg-black/5 p-6 rounded-2xl flex flex-col gap-4 shadow-sm hover:shadow-md transition">
            <div className="w-14 h-14 flex items-center justify-center bg-white rounded-xl">
              <PiChalkboardTeacherThin className="text-blue-500" size={28} />
            </div>
            <h3 className="font-bold text-lg">For Referred Teachers</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              The referred teacher must also upload 15 distinct videos, but
              these videos should not be the same as the referring
              teacher&apos;s videos. They should still be related to the subject
              or website themes.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="bg-black/5 p-6 rounded-2xl flex flex-col gap-4 shadow-sm hover:shadow-md transition">
            <div className="w-14 h-14 flex items-center justify-center bg-white rounded-xl">
              <IoCheckmarkDone className="text-green-500" size={28} />
            </div>
            <h3 className="font-bold text-lg">Completion</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              After both teachers complete the video upload requirement, they
              will earn their respective rewards.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col m-auto mt-20 mb-7 md:mb-0 w-full md:w-[65vw]">
        <h3 className="font-bold text-center text-[1.2em] md:text-[1.5em]">
          Benefits of Referring and Earning Rewards
        </h3>
        <p className="font-semibold mt-4 text-[.8em] md:text-[1em] text-center">
          By referring others and uploading videos, you not only help expand the
          platform but also unlock valuable rewards. Both teachers and referred
          teachers can earn incentives for contributing content, creating a
          win-win situation. This system encourages collaboration and offers
          ongoing benefits for active participation, making it a great way to
          grow professionally while earning rewards!
        </p>
        <div className="mt-10 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="bg-orange-50 rounded-xl p-5 shadow-sm hover:shadow-md transition">
              <span className="text-orange-600 font-bold text-lg">01</span>
              <p className="mt-2 text-[.8em] md:text-[1em] text-gray-700 leading-relaxed">
                Teachers can upload videos at their own convenience, allowing
                them to work on their schedule without being restricted by fixed
                hours.
              </p>
            </div>

            <div className="bg-red-50 rounded-xl p-5 shadow-sm hover:shadow-md transition">
              <span className="text-orange-600 font-bold text-lg">02</span>
              <p className="mt-2 text-[.8em] md:text-[1em] text-gray-700 leading-relaxed">
                Every successful referral and video upload leads to rewards,
                providing an additional income source or incentives for
                contributing to the platform.
              </p>
            </div>

            <div className="bg-orange-50 rounded-xl p-5 shadow-sm hover:shadow-md transition">
              <span className="text-orange-600 font-bold text-lg">03</span>
              <p className="mt-2 text-[.8em] md:text-[1em] text-gray-700 leading-relaxed">
                Uploading educational content helps teachers grow their personal
                brand and reach a wider audience, enhancing their teaching
                portfolio.
              </p>
            </div>

            <div className="bg-red-50 rounded-xl p-5 shadow-sm hover:shadow-md transition">
              <span className="text-orange-600 font-bold text-lg">04</span>
              <p className="mt-2 text-[.8em] md:text-[1em] text-gray-700 leading-relaxed">
                By referring other teachers, you help expand the platform, which
                brings more opportunities for everyone involved, creating a
                larger network of educators.
              </p>
            </div>

            <div className="bg-orange-50 rounded-xl p-5 shadow-sm hover:shadow-md transition">
              <span className="text-orange-600 font-bold text-lg">05</span>
              <p className="mt-2 text-[.8em] md:text-[1em] text-gray-700 leading-relaxed">
                Each teacher can create unique content, meaning there is no
                duplication of videos. This keeps the content fresh and diverse,
                allowing for more creativity and learning.
              </p>
            </div>

            <div className="bg-red-50 rounded-xl p-5 shadow-sm hover:shadow-md transition">
              <span className="text-orange-600 font-bold text-lg">06</span>
              <p className="mt-2 text-[.8em] md:text-[1em] text-gray-700 leading-relaxed">
                Both the referring teacher and the referred teacher benefit from
                the system, creating a supportive and rewarding environment for
                growth.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row rounded-xl p-3 md:p-8 bg-gradient-to-r from-blue-200 to-purple-300 mt-6">
        <div className="p-3 w-full sm:w-[60%] 2xl:w-[]">
          <h2 className="font-bold text-[1em] lg:text-[1.4em]">
            Why Should Tutors Join Learn
            <span className="font-bold text-orange-600">O</span>sphere?
          </h2>
          <ol className="flex flex-col gap-3 mt-6 list-decimal px-2 md:px-12">
            <li className="text-[.7em] lg:text-[1em] text-gray-800">
              Connect with a large pool of students actively looking for quality
              tutors.
            </li>
            <li className="text-[.7em] lg:text-[1em] text-gray-800">
              Choose your own schedule, subjects, and teaching mode
              (online/offline).
            </li>
            <li className="text-[.7em] lg:text-[1em] text-gray-800">
              Get recognized as an expert in your field and expand your tutoring
              career.
            </li>
            <li className="text-[.7em] lg:text-[1em] text-gray-800">
              Manage classes, track student progress, and communicate
              effortlessly through our platform.
            </li>
            <li className="text-[.7em] lg:text-[1em] text-gray-800">
              Receive payments on time with a transparent and secure system.
            </li>
            <li className="text-[.7em] lg:text-[1em] text-gray-800">
              Join a network of educators, share insights, and get support to
              enhance your teaching experience.
            </li>
            <li className="text-[.7em] lg:text-[1em] text-gray-800">
              Access tools to track student performance, manage schedules, and
              optimize your teaching approach.
            </li>
            <li className="text-[.7em] lg:text-[1em] text-gray-800">
              Gain access to resources, workshops, and training to enhance your
              teaching skills.
            </li>
          </ol>
        </div>

        <div className="w-full relative sm:w-[40%] mt-4 md:mt-0 p-4 rounded-xl">
          {/* Background Image */}
          <Image
            className="absolute top-0 left-0 rounded-xl object-cover h-full w-full opacity-50"
            src={Education}
            alt=""
          />

          {/* Content Wrapper */}
          <div className="relative z-10 p-4 rounded-xl">
            <h3 className="font-bold text-[1.2em] text-orange-600 text-center mt-4">
              Teacher Query Form
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4">
              <span className="relative">
                <label
                  htmlFor="name"
                  className={`absolute left-2 transition-all ${isFocused || name ? "top-0 text-xs text-blue-600" : "top-1/2 transform -translate-y-1/2 text-gray-500"}`}
                >
                  Name
                </label>
                <input
                  name="name"
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(name !== "")}
                  className="w-full border-b border-gray-800 p-2 pt-5 bg-transparent focus:outline-none focus:border-blue-600 text-[.9em]"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mb-4">{errors.name}</p>
                )}
              </span>

              <span className="relative">
                <label
                  htmlFor="email"
                  className={`absolute left-2 transition-all ${isEmailFocused || email ? "top-0 text-xs text-blue-600" : "top-1/2 transform -translate-y-1/2 text-gray-500"}`}
                >
                  Email
                </label>
                <input
                  name="email"
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => setIsEmailFocused(email !== "")}
                  className="w-full border-b border-gray-800 p-2 pt-5 bg-transparent focus:outline-none focus:border-blue-600 text-[.9em]"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mb-4">{errors.email}</p>
                )}
              </span>

              <span className="relative">
                <label
                  htmlFor="contact"
                  className={`absolute left-2 transition-all ${isContactFocused || contact ? "top-0 text-xs text-blue-600" : "top-1/4 transform -translate-y-1/2 text-gray-500"}`}
                >
                  Mobile Number
                </label>
                <div className="flex mt-1 p-1 w-full rounded-md text-[.9em]">
                  <div className="flex flex-col mt-4">
                    <div
                      ref={dropdownRef}
                      className="relative bg-gray-200 rounded-md"
                    >
                      <div
                        className="border p-2 rounded-md cursor-pointer whitespace-nowrap text-sm shadow-sm flex justify-between items-center"
                        onClick={() => setShowDropdown(!showDropdown)}
                      >
                        <span>{selected || "+91"}</span>
                        <span>▼</span>
                      </div>
                      {/* Dropdown list */}
                      {showDropdown && (
                        <div className="absolute top-full mt-1 w-[260px] max-h-80 overflow-y-auto bg-white shadow-lg rounded-md z-50 text-sm">
                          {countries.map((c) => (
                            <div
                              key={c._id}
                              className="px-3 py-2 hover:bg-gray-100 cursor-pointer border-gray-800 flex justify-between"
                              onClick={() => handleSelect(`+${c.countryCode}`)}
                            >
                              <span className="text-base">{c.countryName}</span>
                              <span className="text-sm">
                                (+{c.countryCode})
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {errors.selectedCountry && (
                      <p className="text-red-500 text-sm mb-2">
                        {errors.selectedCountry}
                      </p>
                    )}
                  </div>
                  <input
                    name="contact"
                    id="contact"
                    type="text"
                    value={contact}
                    onChange={handleContact}
                    onFocus={() => setIsContactFocused(true)}
                    onBlur={() => setIsContactFocused(contact !== "")}
                    className="w-full border-b border-gray-800 p-2 pt-5 bg-transparent focus:outline-none focus:border-blue-600 text-[.9em]"
                  />
                </div>
              </span>
              {errors.contact && (
                <p className="text-red-500 text-sm mb-4">{errors.contact}</p>
              )}

              <span className="relative">
                <label
                  htmlFor="message"
                  className={`absolute left-2 transition-all ${isMessageFocused || message ? "top-0 text-xs text-blue-600" : "top-1/3 transform -translate-y-1/2 text-gray-500"}`}
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onFocus={() => setIsMessageFocused(true)}
                  onBlur={() => setIsMessageFocused(message !== "")}
                  className="w-full border-b border-gray-800 p-2 pt-5 bg-transparent focus:outline-none focus:border-blue-600 text-[.9em] h-24 resize-none"
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mb-4">{errors.message}</p>
                )}
              </span>

              <div>
                <button
                  type="submit"
                  className="bg-orange-600 p-2 text-white font-bold mt-2 rounded-lg w-full"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-14 px-4 md:px-0">
        <h2 className="mb-8 text-[1.2em] md:text-3xl font-semibold font-Poppins text-center text-gray-800">
          Frequently Asked Questions – Learnosphere Refer & Earn Program
        </h2>
        <div>
          {faqSchema.mainEntity.map((item, index) => (
            <FaqItem
              key={index}
              question={item.name}
              answer={item.acceptedAnswer.text}
            />
          ))}
        </div>
      </div>

      <Footer1 />
      <Footer />
    </div>
  );
};

export default ReferAndEarn; //refer and earn page