"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import axios from "axios";
import { RiArrowDropRightLine } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import LoginPopup from "./LoginPopup";
import { Button } from "react-scroll";
import Fuse from "fuse.js";
import dummyData from "./autofillData";
import { useRouter } from "next/navigation";
import { MdOutlineYoutubeSearchedFor } from "react-icons/md";
import { useUser } from "@/src/context/userContext";
import { MdAttachMoney } from "react-icons/md";
import { HiOutlineCash } from "react-icons/hi";
import { trackEvent, EVENT_NAMES } from "../src/lib/eventTracker";

// Data for Mega Menu (Courses)
// Data for Mega Menu (Courses)
const courseMenuData = [
  {
    id: "school-boards",
    title: "School Boards",
    subtitle: "CBSE Arts, CBSE Science, State Boards",
   items: [
       { name: "CBSC courses", icon: "📓", link: "/Courses" },
      { name: "CBSE Class 10th", icon: "📚", link: "/CBSE_Syllabus/class10-cbse-syllabus-2025-26" },
      { name: "CBSE Class 12th", icon: "🎓", link: "/CBSE_Syllabus/class12-cbse-syllabus-2025-26" },
      { name: "State Board", icon: "🏫", link: "/State_Board" },
    ],
  },
  {
    id: "competitive-exams",
    title: "Competitive Exams",
    subtitle: "IIT JEE, NEET, Olympiad",
    link: "/competitive-exams",
    items: [
      { name: "IIT JEE", icon: "🔬", link: "/competitive-exams/iitjee" },
      // 👇 Naya Link Add Kiya
      {
        name: "IIT JEE Notes",
        icon: "📓",
        link: "/competitive-exams/iitjee/study-notes",
      },

      { name: "NEET", icon: "🩺", link: "/competitive-exams/neet" },
      // 👇 Naya Link Add Kiya
      {
        name: "NEET Notes",
        icon: "📓",
        link: "/competitive-exams/neet/study-notes",
      },

      { name: "Olympiad", icon: "🏆", link: "/competitive-exams/olympiad" },
      {
        name: "Test Series",
        icon: "📝", // Tu apna koi bhi mast sa icon daal sakta hai yahan
        link: "/test-series", // Apna test series ka sahi link yahan daal dena
      },
    ],
  },
  {
    id: "school-prep",
    title: "School Preparation",
    subtitle: "Foundation (Class 6-10)",
    items: [
      { name: "Class 6th", icon: "✏️", link: "/CBSE/Class-6" },
      { name: "Class 7th", icon: "📐", link: "/CBSE/Class-7" },
      { name: "Class 8th", icon: "📏", link: "/CBSE/Class-8" },
      { name: "Class 9th", icon: "📓", link: "/CBSE/Class-9" },
      { name: "Class 11th", icon: "📘", link: "/CBSE-11thsyllabus" },
    ],
  },
  // 👇 NAYA GOVERNMENT EXAMS KA SECTION YAHAN ADD KIYA HAI 👇
  {
    id: "government-exams",
    title: "Government Exams",
    subtitle: "UPSC, Railway, SSC, Banking",
    link: "/government-exams",
    items: [
      { name: "UPSC", icon: "🏛️", link: "/government-exams/upsc" },
      { name: "Railway Exams", icon: "🚆", link: "/government-exams/railway" },
      { name: "SSC Exams", icon: "🏢", link: "/government-exams/ssc" },
      {
        name: "Banking (IBPS/PO)",
        icon: "🏦",
        link: "/government-exams/banking",
      },
      {
        name: "Other Govt Exams",
        icon: "📝",
        link: "/government-exams/state-psc",
      },
    ],
  },
  // 👆 END OF NEW SECTION 👆
  {
    id: "special-programs",
    title: "Special Programs",
    subtitle: "Home Tuition, Live Classes, Quizzes",
    items: [
      { name: "Live One to One", icon: "💻", link: "/live-one-to-one" },
      { name: "Home Tuition", icon: "🏠", link: "/home-tuition" },
      { name: "Practice Quiz", icon: "✅", link: "/Online-Quiz" },
    ],
  },
  {
    id: "academics",
    title: "Academics",
    subtitle: "Computer Science & IT",
    link: "/academics",
    items: [
      {
        name: "Computer Science",
        icon: "💻",
        link: "/academics/computer-science",
      },

      {
        name: "CS Study Notes",
        icon: "📓",
        link: "/academics/computer-science/study-notes",
      },
    ],
  },
];

const Navbar = () => {
  const menuRef = useRef(null);

  const [showModal, setShowModal] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Existing Submenus
  const [submenuVisible, setSubmenuVisible] = useState(false);
  const [classmenuVisible, setclassmenuVisible] = useState(false);
  const [lkgmenuVisible, setlkgmenuVisible] = useState(false);
  const [syllabusMenuVisible, setsyllabusMenuVisible] = useState(false);

  // State for Courses Mega Menu
  const [isCourseMenuVisible, setIsCourseMenuVisible] = useState(false);
  const [activeCourseCategory, setActiveCourseCategory] = useState(
    courseMenuData[0].id,
  );

  const { data: session, status } = useSession();
  const { user, role, loading } = useUser();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownRef1 = useRef(null);
  const mobileRef = useRef(null);
  const toggleButtonRef = useRef(null);

  const courseMenuRef = useRef(null);

  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [showDropDown, setShowDropDown] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); //expand search icon
  const inputRef = useRef(null); // expand search icon
  const router = useRouter();
  const [recentSearches, setRecentSearches] = useState([]);
  const searchWrapperRef = useRef(null);

  const handleOpenLoginPopup = () => {
      trackEvent(EVENT_NAMES.LOGIN_CLICK);
    setIsLoginPopupOpen(true);
  };
  const handleCloseLoginPopup = () => setIsLoginPopupOpen(false);

  const [suggestions, setSuggestions] = useState([]);

  const fuse = new Fuse(dummyData, {
    includeScore: true,
    threshold: 0.4,
  });

  const toggleSearch = () => {
    setIsExpanded(!isExpanded);
    setSuggestions([]);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleSearch = (query) => {
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/SearchResult?query=${encodeURIComponent(trimmed)}`);
      setIsExpanded(false);
      setSuggestions([]);
      saveToRecent(trimmed);
    }
  };

  const RECENT_KEY = "learnosphere_recent_searches";
  const saveToRecent = (term) => {
    let updated = [term, ...recentSearches.filter((item) => item !== term)];
    if (updated.length > 5) updated = updated.slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    window.location.href = `/SearchResult?query=${encodeURIComponent(
      trimmedQuery,
    )}`;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      window.location.href = `/SearchResult?query=${searchQuery}`;
    }
  };

  const dropdownClick = () => {
    setShowDropDown(!showDropDown);
  };

  const clearInput = () => {
    setInput("");
    setShowDropDown(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const jsonData = [{ id: 1, name: "Class 1", path: "Online-Quiz" }];

  const fetchData = (value) => {
    const filterdResults = jsonData.filter((point) =>
      point.name.toLowerCase().includes(value.toLowerCase()),
    );
    setResults(filterdResults);
  };

  const handleChange = (value) => {
    setInput(value);
    if (value.trim() === "") {
      setResults([]);
    } else {
      fetchData(value);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleDropdown1 = () => {
    setIsDropdownOpen1(!isDropdownOpen1);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropDown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (
        dropdownRef1.current &&
        !dropdownRef1.current.contains(event.target)
      ) {
        setIsDropdownOpen1(false);
      }
      if (
        mobileRef.current &&
        toggleButtonRef.current &&
        !mobileRef.current.contains(event.target) &&
        !toggleButtonRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
      if (
        courseMenuRef.current &&
        !courseMenuRef.current.contains(event.target)
      ) {
        setIsCourseMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      if (role === "student" && session?.user?.email) {
        await axios.post("/api/logoutUser", {
          studentEmail: session.user.email,
        });
      }
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("referral_email");
      sessionStorage.removeItem("upi_id");
      sessionStorage.removeItem("referral_code");

      await signOut({
        redirect: false,
        callbackUrl: "/",
      });
      window.location.href = "/";
    } catch (error) {
      console.error("❌ Error during logout:", error.message);
      sessionStorage.clear();
      await signOut({ redirect: false });
      window.location.href = "/";
    }
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(e.target)
      ) {
        setIsExpanded(false);
      }
    }
    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isExpanded]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
    setRecentSearches(stored);
  }, []);

  return (
    <div className="relative w-full " style={{ zIndex: 9999 }}>
      <nav className="shadow-sm border w-screen  fixed top-0 z-50  bg-[#fff] font-Poppins">
        <div className=" flex  flex-wrap items-center justify-between mx-auto p-5">
          <div className="flex">
            <Link
              className="text-black text-[1rem] lg:text-2xl font-Poppins font-bold"
              href="/"
            >
              Learn<b className="text-orange-600 font-Poppins text-2xl">O</b>
              sphere.in
            </Link>
          </div>

          <div className="flex lg:order-2 ">
            <div className="relative flex items-center gap-2 xl:gap-7 h-10 z-10">
              <FaSearch
                size={21}
                className={`cursor-pointer text-gray-500 transition-opacity duration-300 ${
                  isExpanded ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
                onClick={toggleSearch}
              />
              <div
                ref={searchWrapperRef}
                className="relative md:right-5 flex items-center gap-7 h-10 z-10"
              >
                <div className="relative top-[-20px]">
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      const input = e.target.value;
                      setSearchQuery(input);
                      if (input.trim().length > 0) {
                        const results = fuse.search(input);
                        setSuggestions(results.map((result) => result.item));
                      } else {
                        setSuggestions([]);
                      }
                    }}
                    onKeyUp={(e) => {
                      if (e.key === "Enter") handleSearch(searchQuery);
                    }}
                    placeholder="Search..."
                    className={`absolute top-10 md:top-0 xl:top-0 2xl:top-0 right-0 bg-white px-4 py-2 border border-gray-300 rounded-lg shadow transition-all duration-300 ease-in-out z-10 ${
                      isExpanded ? "w-80 opacity-100" : "w-0 opacity-0"
                    }`}
                    style={{
                      height: "40px",
                      pointerEvents: isExpanded ? "auto" : "none",
                    }}
                  />
                </div>

                {isExpanded &&
                  searchQuery.trim().length > 0 &&
                  suggestions.length > 0 && (
                    <div className="absolute top-full mt-10 md:mt-2 right-0 bg-white rounded-lg p-1 w-80 shadow-md z-50">
                      <div className="max-h-60 overflow-y-auto rounded-lg p-4">
                        <ul className="list-none">
                          {suggestions.map((item, index) => (
                            <li
                              key={index}
                              className="hover:bg-gray-100 rounded-lg cursor-pointer p-1"
                              onClick={() => handleSearch(item)}
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                {isExpanded &&
                  searchQuery.trim().length === 0 &&
                  recentSearches.length > 0 && (
                    <div className="absolute top-full md:mt-2 mt-10 right-0 bg-white rounded-lg p-1 w-80 shadow-md  z-50">
                      <div className="max-h-60 overflow-y-auto rounded-lg p-1">
                        <ul className="list-none">
                          {recentSearches.map((item, index) => (
                            <li
                              key={index}
                              className="flex items-center gap-2 hover:bg-gray-100 rounded-lg cursor-pointer p-2  "
                              onClick={() => handleSearch(item)}
                            >
                              <MdOutlineYoutubeSearchedFor
                                style={{
                                  flexShrink: 0,
                                  fontSize: "17px",
                                }}
                              />{" "}
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
              </div>
            </div>
            {user ? (
              <li
                ref={dropdownRef}
                className="relative list-none hidden lg:block hover:scale-105 transition-all ease-in-out rounded-lg dropdown-up"
              >
                <div className="flex items-center gap-1">
                  <Link
                    href={
                      role === "teacher" || session?.user?.role === "teacher"
                        ? "/Teacherdashboard/Home"
                        : "/Userdashboard/Home"
                    }
                    className="flex items-center gap-2 cursor-pointer hover:opacity-90"
                    title="Open Dashboard"
                  >
                    {user.profileImage ? (
                      <Image
                        src={user.profileImage}
                        alt="Profile"
                        height={200}
                        width={200}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center bg-orange-600 text-white`}
                      >
                        <span className="text-white font-bold text-sm">
                          {session?.user?.name
                            ? session.user.name.charAt(0).toUpperCase()
                            : "U"}
                        </span>
                      </div>
                    )}
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-bold max-w-[120px] truncate">
                        {session?.user?.name || "User"}
                      </span>
                      <span className="text-gray-800 text-[10px] max-w-[120px] truncate">
                        {session?.user?.email || "user"}
                      </span>
                    </div>
                  </Link>

                  <button
                    onClick={toggleDropdown}
                    type="button"
                    aria-label="User menu"
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <RiArrowDropRightLine
                      size={25}
                      className={`text-gray-800 transition-transform ${
                        isDropdownOpen ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                </div>
                {isDropdownOpen && (
                  <ul className="absolute right-0 mt-2 w-52 bg-white shadow-xl rounded-xl border border-gray-100 z-50 dropdown-up py-2">
                    <li className="py-2 px-4 hover:bg-orange-50 font-semibold text-gray-800">
                      <Link
                        href={
                          role === "teacher" || session?.user?.role === "teacher"
                            ? "/Teacherdashboard/Home"
                            : "/Userdashboard/Home"
                        }
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2 text-orange-600"
                      >
                        <span>📊</span> Go to Dashboard
                      </Link>
                    </li>
                    <li className="py-2 px-4 hover:bg-gray-50 text-gray-700">
                      <Link
                        href={
                          role === "teacher" || session?.user?.role === "teacher"
                            ? "/Teacherdashboard/Profileteacher"
                            : "/Userdashboard/profileuser"
                        }
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2"
                      >
                        <span>👤</span> My Profile
                      </Link>
                    </li>
                    <li className="border-t border-gray-100 my-1"></li>
                    <li className="py-2 px-4 hover:bg-red-50 text-red-600">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center gap-2 font-medium"
                      >
                        <span>🚪</span> Logout
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            ) : (
              <div className="flex gap-4 ">
                <div className="hidden lg:flex flex-col lg:flex-row gap-2">
                  <Button
                    onClick={handleOpenLoginPopup}
                    className="bg-orange-600 text-white font-Poppins font-semibold px-4 py-2 rounded-md hover:bg-orange-500 text-center"
                  >
                    Login/Register
                  </Button>
                </div>
              </div>
            )}

            <button
              onClick={toggleMobileMenu}
              ref={toggleButtonRef}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 mr-2 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-cta"
              aria-expanded={isMobileMenuOpen ? "true" : "false"}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          <div
            ref={mobileRef}
            className={`items-center justify-between w-full lg:flex lg:w-auto lg:order-1 dropdown-down ${
              isMobileMenuOpen ? "block" : "hidden"
            }`}
            id="navbar-cta"
          >
            <ul className="font-Poppins flex flex-col text-orange-700 font-bold p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg lg:space-x-3 xl:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 bg-[#fff] lg:bg-[#fff]">
              {user ? (
                <li
                  ref={dropdownRef1}
                  className="relative shadow-md rounded-xl p-3 list-none lg:hidden text-black mb-3 bg-gray-50 border border-gray-200"
                >
                  <div className="flex items-center justify-between">
                    <Link
                      href={
                        role === "teacher" || session?.user?.role === "teacher"
                          ? "/Teacherdashboard/Home"
                          : "/Userdashboard/Home"
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 cursor-pointer flex-1"
                    >
                      {user.profileImage ? (
                        <Image
                          src={user.profileImage}
                          alt="Profile"
                          height={200}
                          width={200}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center bg-orange-600 text-white font-bold`}
                        >
                          {session?.user?.name
                            ? session.user.name.charAt(0).toUpperCase()
                            : "U"}
                        </div>
                      )}
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-bold text-gray-900">
                          {session?.user?.name || "User"}
                        </span>
                        <span className="text-gray-500 text-xs">
                          {session?.user?.email || "user"}
                        </span>
                        <span className="text-[11px] text-orange-600 font-semibold mt-0.5">
                          Tap to open Dashboard →
                        </span>
                      </div>
                    </Link>
                    <button
                      onClick={toggleDropdown1}
                      type="button"
                      aria-label="Toggle user options"
                      className="p-1 hover:bg-gray-200 rounded-lg text-gray-600"
                    >
                      <RiArrowDropRightLine
                        size={28}
                        className={`transition-transform ${
                          isDropdownOpen1 ? "rotate-90" : ""
                        }`}
                      />
                    </button>
                  </div>
                  {isDropdownOpen1 && (
                    <ul className="mt-3 bg-white border border-gray-100 shadow-md rounded-lg overflow-hidden py-1">
                      <li className="py-2.5 px-4 hover:bg-orange-50 font-semibold text-orange-600">
                        <Link
                          href={
                            role === "teacher" || session?.user?.role === "teacher"
                              ? "/Teacherdashboard/Home"
                              : "/Userdashboard/Home"
                          }
                          onClick={() => {
                            setIsDropdownOpen1(false);
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          📊 Go to Dashboard
                        </Link>
                      </li>
                      <li className="py-2.5 px-4 hover:bg-gray-50 text-gray-700">
                        <Link
                          href={
                            role === "teacher" || session?.user?.role === "teacher"
                              ? "/Teacherdashboard/Profileteacher"
                              : "/Userdashboard/profileuser"
                          }
                          onClick={() => {
                            setIsDropdownOpen1(false);
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          👤 My Profile
                        </Link>
                      </li>
                      <li className="border-t border-gray-100 py-2.5 px-4 hover:bg-red-50 text-red-600">
                        <button
                          onClick={handleLogout}
                          className="w-full text-left font-medium"
                        >
                          🚪 Logout
                        </button>
                      </li>
                    </ul>
                  )}
                </li>
              ) : (
                <li className="block lg:hidden mb-3">
                  <Button
                    onClick={handleOpenLoginPopup}
                    className="bg-orange-600 text-white font-Poppins font-semibold px-4 py-2 rounded-md hover:bg-orange-500 text-center"
                  >
                    Login/Register
                  </Button>
                </li>
              )}
              <li>
                <Link
                  href="/"
                  className="block py-2 px-3 my-2 lg:p-0 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-orange-600"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/About"
                  className="block py-2 px-3 my-2 lg:p-0 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-orange-600 "
                >
                  About
                </Link>
              </li>

              {/* =========================================
                  🚀 HOVER GAP FIXED: COURSES MEGA MENU
              ========================================= */}
              <li ref={courseMenuRef} className="relative group py-2">
                <div
                  className="flex items-center gap-1 cursor-pointer px-3 lg:p-0 h-full"
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      setIsCourseMenuVisible(!isCourseMenuVisible);
                    }
                  }}
                >
                  <Link
                    href="/Courses"
                    className="text-gray-900 rounded group-hover:text-orange-600 transition-colors flex items-center gap-1"
                  >
                    All Courses
                    <IoIosArrowDown
                      className={`transition-transform duration-300 group-hover:rotate-180 ${isCourseMenuVisible ? "rotate-180" : ""}`}
                    />
                  </Link>
                </div>

                {/* Wrapper Div - Creates the invisible hover bridge with lg:pt-3 */}
                <div
                  className={`
                    lg:absolute lg:-left-[100px] xl:-left-[150px] lg:top-full 
                    lg:pt-3 /* 🚀 INVISIBLE BRIDGE: This prevents the menu from closing when moving mouse down */
                    w-full lg:w-[700px] xl:w-[800px] z-[9999] 
                    transition-all duration-300 ease-in-out origin-top
                    ${isCourseMenuVisible ? "block" : "hidden"} 
                    lg:!block lg:opacity-0 lg:invisible lg:pointer-events-none lg:translate-y-2
                    lg:group-hover:opacity-100 lg:group-hover:visible lg:group-hover:pointer-events-auto lg:group-hover:translate-y-0
                  `}
                >
                  {/* Actual Visual Menu Box */}
                  <div className="bg-white lg:shadow-[0_10px_40px_rgba(0,0,0,0.1)] lg:rounded-2xl rounded-lg overflow-hidden border border-gray-100 flex flex-col lg:flex-row mt-2 lg:mt-0 w-full">
                    {/* Left Sidebar (Categories) */}
                    {/* Left Sidebar (Categories) */}
                    <div className="w-full lg:w-[40%] bg-gray-50 flex flex-col py-3 border-r border-gray-100">
                      {courseMenuData.map((category) => (
                        <div
                          key={category.id}
                          onMouseEnter={() => {
                            if (window.innerWidth >= 1024)
                              setActiveCourseCategory(category.id);
                          }}
                          // 🚀 CLICK FUNCTION (Page Change ke liye)
                          onClick={() => {
                            setActiveCourseCategory(category.id);
                            if (category.link) {
                              window.location.href = category.link;
                              setIsCourseMenuVisible(false);
                              setIsMobileMenuOpen(false);
                            }
                          }}
                          className={`px-5 py-3.5 cursor-pointer flex justify-between items-center transition-colors border-l-4 ${
                            activeCourseCategory === category.id
                              ? "bg-white shadow-sm border-orange-500"
                              : "hover:bg-gray-100 border-transparent"
                          }`}
                        >
                          {/* 🚀 YEH TEXT WAPAS AA GAYA */}
                          <div>
                            <span
                              className={`text-[15px] font-bold ${activeCourseCategory === category.id ? "text-orange-600" : "text-gray-800"}`}
                            >
                              {category.title}
                            </span>
                            <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-1 font-medium">
                              {category.subtitle}
                            </p>
                          </div>
                          <RiArrowDropRightLine
                            size={24}
                            className={
                              activeCourseCategory === category.id
                                ? "text-orange-500"
                                : "text-gray-400"
                            }
                          />
                        </div>
                      ))}
                    </div>

                    {/* Right Content Area (Sub-items) */}
                    <div className="w-full lg:w-[60%] p-6 bg-white min-h-[300px]">
                      {courseMenuData.map((category) => (
                        <div
                          key={`content-${category.id}`}
                          className={
                            activeCourseCategory === category.id
                              ? "block animate-in fade-in zoom-in-95 duration-200"
                              : "hidden"
                          }
                        >
                          <div className="text-lg font-bold text-gray-800 mb-6 border-b border-gray-100 pb-3 inline-block">
                            {category.title}
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {category.items.map((item, idx) => (
                              <Link
                                key={idx}
                                href={item.link}
                                onClick={() => {
                                  setIsMobileMenuOpen(false);
                                  setIsCourseMenuVisible(false);
                                }}
                                className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-orange-200 hover:shadow-md hover:bg-orange-50/50 transition-all group"
                              >
                                <div className="w-10 h-10 rounded-lg bg-orange-100/50 flex items-center justify-center text-xl shadow-sm group-hover:bg-orange-100 group-hover:scale-110 transition-transform">
                                  {item.icon}
                                </div>
                                <span className="font-semibold text-gray-700 text-sm group-hover:text-orange-600 transition-colors">
                                  {item.name}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
              {/* =========================================
                  END OF COURSES MEGA MENU SECTION
              ========================================= */}

              <li className="flex justify-start lg:justify-center items-center gap-2 relative group py-2 ">
                <div
                  className="flex items-center gap-1 cursor-pointer  "
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      setIsOpen(!isOpen);
                      setActiveDropdown(
                        activeDropdown === "services" ? null : "services",
                      );
                    }
                  }}
                >
                  <Link
                    href="/"
                    className="block py-2 px-3 lg:p-0 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-orange-600 "
                  >
                    Syllabus
                  </Link>
                  <IoIosArrowDown
                    size={20}
                    className={`transform  text-black transition-transform duration-300 ease-in-out 
                  ${
                    isOpen ? "rotate-180" : ""
                  } lg:group-hover:rotate-180 cursor-pointer`}
                  />
                </div>
                <div
                  className={`absolute bg-white py-2 w-96 transition-all duration-150 rounded-xl group-hover:mt-[255px]
                ${
                  isOpen
                    ? "block mt-[230px] translate-x-2 dropdown-up z-30"
                    : "dropdown-up hidden"
                } 
                lg:group-hover:block md:mt-[235px]`}
                >
                  <div className="block px-4 py-2  text-base md:text-xl text-black font-Poppins font-semibold rounded-xl hover:bg-gray-200">
                    Prepare for your exam with us
                  </div>
                  <div className="px-4 py-2 re  ">
                    <div className="group relative ">
                      <Link
                        className="block px-2 py-2 text-black font-semibold font-Poppins hover:bg-gray-200  rounded-xl "
                        href="/CBSE_Syllabus"
                        onMouseEnter={() => setsyllabusMenuVisible(true)}
                        onMouseLeave={() => setsyllabusMenuVisible(false)}
                      >
                        CBSE Syllabus (1st to 12th)
                      </Link>
                      <div
                        id="cbse-submenu"
                        className={`absolute rounded-xl ${
                          syllabusMenuVisible
                            ? "block dropdown-up"
                            : "hidden dropdown-up"
                        } w-64 bg-white shadow-lg z-50 top-full lg:left-full lg:top-0 mt-0
                          max-h-64 overflow-y-auto lg:max-h-none lg:overflow-visible`}
                        onMouseEnter={() => setsyllabusMenuVisible(true)}
                        onMouseLeave={() => setsyllabusMenuVisible(false)}
                      >
                        <Link
                          className="block py-2 px-4 text-black font-Poppins font-semibold hover:bg-gray-200 rounded-xl "
                          href="/CBSE_Syllabus/class1-cbse-syllabus-2025-26"
                        >
                          Class 1st (2025-26)
                        </Link>
                        <Link
                          className="block py-2 px-4 text-black font-Poppins font-semibold hover:bg-gray-200 rounded-xl"
                          href="/CBSE_Syllabus/class2-cbse-syllabus-2025-26"
                        >
                          Class 2st (2025-26)
                        </Link>
                        <Link
                          className="block py-2 px-4 text-black font-Poppins font-semibold hover:bg-gray-200 rounded-xl"
                          href="/CBSE_Syllabus/class3-cbse-syllabus-2025-26"
                        >
                          Class 3st (2025-26)
                        </Link>
                        <Link
                          className="block py-2 px-4 text-black font-Poppins font-semibold hover:bg-gray-200 rounded-xl"
                          href="/CBSE_Syllabus/class4-cbse-syllabus-2025-26"
                        >
                          Class 4st (2025-26)
                        </Link>
                        <Link
                          className="block py-2 px-4 text-black font-Poppins font-semibold hover:bg-gray-200 rounded-xl"
                          href="/CBSE_Syllabus/class5-cbse-syllabus-2025-26"
                        >
                          Class 5th (2025-26)
                        </Link>
                        <Link
                          className="block py-2 px-4 text-black font-Poppins font-semibold hover:bg-gray-200 rounded-xl"
                          href="/CBSE_Syllabus/class6-cbse-syllabus-2025-26"
                        >
                          Class 6th (2025-26)
                        </Link>
                        <Link
                          className="block py-2 px-4 text-black font-Poppins font-semibold hover:bg-gray-200 rounded-xl"
                          href="/CBSE_Syllabus/class7-cbse-syllabus-2025-26"
                        >
                          Class 7th (2025-26)
                        </Link>
                        <Link
                          className="block py-2 px-4 text-black font-Poppins font-semibold hover:bg-gray-200 rounded-xl "
                          href="/CBSE_Syllabus/class8-cbse-syllabus-2025-26"
                        >
                          Class 8th (2025-26)
                        </Link>
                        <Link
                          className="block py-2 px-4 text-black font-Poppins font-semibold hover:bg-gray-200 rounded-xl "
                          href="/CBSE_Syllabus/class9-cbse-syllabus-2025-26"
                        >
                          Class 9th (2025-26)
                        </Link>
                        <Link
                          className="block py-2 px-4 text-black font-Poppins font-semibold hover:bg-gray-200 rounded-xl "
                          href="/CBSE_Syllabus/class10-cbse-syllabus-2025-26"
                        >
                          Class 10th (2025-26)
                        </Link>
                        <Link
                          className="block py-2 px-4 text-black font-Poppins font-semibold hover:bg-gray-200 rounded-xl "
                          href="/CBSE_Syllabus/class11-cbse-syllabus-2025-26"
                        >
                          Class 11th (2025-26)
                        </Link>
                        <Link
                          className="block py-2 px-4 text-black font-Poppins font-semibold hover:bg-gray-200 rounded-xl "
                          href="/CBSE_Syllabus/class12-cbse-syllabus-2025-26"
                        >
                          Class 12th (2025-26)
                        </Link>
                      </div>
                    </div>
                    <div className="group relative ">
                      <Link
                        className="block px-2 py-2 text-black font-semibold font-Poppins hover:bg-gray-200  rounded-xl "
                        href=""
                        onMouseEnter={() => setlkgmenuVisible(true)}
                        onMouseLeave={() => setlkgmenuVisible(false)}
                      >
                        CBSE(LKG to 5th)
                      </Link>
                      <div
                        id="cbse-submenu"
                        className={`absolute rounded-xl ${
                          lkgmenuVisible
                            ? "block dropdown-up"
                            : "hidden dropdown-up"
                        } w-44 bg-white shadow-lg z-50 top-full lg:left-full lg:top-0 mt-0`}
                        onMouseEnter={() => setlkgmenuVisible(true)}
                        onMouseLeave={() => setlkgmenuVisible(false)}
                      >
                        <Link
                          className="block py-2 px-4 text-black font-Poppins font-semibold hover:bg-gray-200 rounded-xl "
                          href="/CBSE/lkg"
                        >
                          LKG
                        </Link>
                        <Link
                          className="block py-2 px-4 text-black font-Poppins font-semibold hover:bg-gray-200 rounded-xl"
                          href="/CBSE/ukg"
                        >
                          UKG
                        </Link>
                        <Link
                          className="block py-2 px-4 text-black font-Poppins font-semibold hover:bg-gray-200 rounded-xl"
                          href="/CBSE/Class-1"
                        >
                          Class 1st
                        </Link>
                        <Link
                          className="block py-2 px-4 text-black font-Poppins font-semibold hover:bg-gray-200 rounded-xl"
                          href="/CBSE/Class-2"
                        >
                          Class 2nd
                        </Link>
                        <Link
                          className="block py-2 px-4 text-black font-Poppins font-semibold hover:bg-gray-200 rounded-xl"
                          href="/CBSE/Class-3"
                        >
                          Class 3rd
                        </Link>
                        <Link
                          className="block py-2 px-4 text-black font-Poppins font-semibold hover:bg-gray-200 rounded-xl"
                          href="/CBSE/Class-4"
                        >
                          Class 4th
                        </Link>
                        <Link
                          className="block py-2 px-4 text-black font-Poppins font-semibold hover:bg-gray-200 rounded-xl"
                          href="/CBSE/Class-5"
                        >
                          Class 5th
                        </Link>
                      </div>
                    </div>

                    <div className="group relative">
                      <Link
                        className="block px-2 py-2 text-black font-Poppins  font-semibold hover:bg-gray-200 rounded-xl"
                        href=""
                        onMouseEnter={() => setclassmenuVisible(true)}
                        onMouseLeave={() => setclassmenuVisible(false)}
                      >
                        Class 6th to 9th and 11th
                      </Link>
                      <div
                        id="cbse-submenu"
                        className={`absolute rounded-xl ${
                          classmenuVisible
                            ? "block dropdown-up"
                            : "hidden dropdown-up"
                        } w-44 z-50  bg-white shadow-lg lg:left-full top-0 mt-10  md:mt-0 `}
                        onMouseEnter={() => setclassmenuVisible(true)}
                        onMouseLeave={() => setclassmenuVisible(false)}
                      >
                        <Link
                          className="block py-2 px-4 text-black font-Poppins font-semibold hover:bg-gray-200 rounded-xl"
                          href="/CBSE/Class-6"
                        >
                          Class 6th
                        </Link>
                        <Link
                          className="block py-2 px-4 text-black font-Poppins font-semibold hover:bg-gray-200 rounded-xl"
                          href="/CBSE/Class-7"
                        >
                          Class 7th
                        </Link>
                        <Link
                          className="block py-2 px-4 text-black font-Poppins font-semibold hover:bg-gray-200 rounded-xl"
                          href="/CBSE/Class-8"
                        >
                          Class 8th
                        </Link>
                        <Link
                          className="block py-2 px-4 text-black font-Poppins font-semibold hover:bg-gray-200 rounded-xl"
                          href="/CBSE/Class-9"
                        >
                          Class 9th
                        </Link>
                        <Link
                          className="block py-2 px-4 text-black font-Poppins font-semibold hover:bg-gray-200 rounded-xl"
                          href="/CBSE-11thsyllabus"
                        >
                          Class 11th
                        </Link>
                      </div>
                    </div>
                    <div className="group relative">
                      <Link
                        className="block px-2 py-2 text-black font-semibold font-Poppins hover:bg-gray-200 rounded-xl"
                        href=""
                        onMouseEnter={() => setSubmenuVisible(true)}
                        onMouseLeave={() => setSubmenuVisible(false)}
                      >
                        CBSE Board Exams(10th & 12th)
                      </Link>
                      <div
                        id="cbse-submenu"
                        className={`absolute rounded-xl ${
                          submenuVisible
                            ? "block dropdown-up"
                            : "hidden dropdown-up"
                        } w-44 z-50 bg-white shadow-lg lg:left-full top-0 mt-10  md:mt-0`}
                        onMouseEnter={() => setSubmenuVisible(true)}
                        onMouseLeave={() => setSubmenuVisible(false)}
                      >
                        <Link
                          className="block py-2 px-4 text-black font-Poppins font-semibold hover:bg-gray-200  rounded-xl"
                          href="/CBSE-10thsyllabus"
                        >
                          10th Board Exam
                        </Link>
                        <Link
                          className="block py-2 px-4 text-black font-Poppins font-semibold hover:bg-gray-200 rounded-xl"
                          href="/CBSE-12thsyllabus"
                        >
                          12th Board Exam
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="block py-2 px-3 my-2 lg:p-0 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-orange-600 "
                >
                  Contact
                </Link>
              </li>

              <li className="flex justify-start lg:justify-center items-center gap-2 relative group">
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      setActiveDropdown(
                        activeDropdown === "more" ? null : "more",
                      );
                    }
                  }}
                >
                  <Link
                    href="/"
                    className="block py-2 px-3 lg:p-0 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-orange-600 "
                  >
                    More
                  </Link>
                  <IoIosArrowDown
                    size={20}
                    className={`transform   text-black font-bold transition-transform duration-300 ease-in-out
                      ${
                        activeDropdown === "more" ? "rotate-180" : "rotate-0"
                      } lg:group-hover:rotate-180 cursor-pointer`}
                  />
                </div>
                <div
                  className={`absolute rounded-xl lg:group-hover:block bg-[#fff] py-2 group-hover:mt-[285px] mt-[245px] transition-all group-hover:translate-x-2  duration-150 dropdown-up
                   w-96 dropdown-up ${
                     activeDropdown === "more" ? "block mt-[220px]" : "hidden"
                   }
                  lg:group-hover:mt-[360px] group-hover:translate-x-2`}
                >
                  <div className="px-4 py-2 ">
                    <div className="group relative">
                      <Link
                        className="block py-2 px-4 text-black font-Poppins font-semibold hover:bg-gray-200 rounded-xl"
                        href="/Blogs"
                      >
                        Blogs
                      </Link>
                      <Link
                        className="block py-2 px-4 text-black font-Poppins font-semibold hover:bg-gray-200 rounded-xl"
                        href="/Careers"
                      >
                        Careers
                      </Link>

                      <Link
                        className="block py-2 px-4 text-black font-semibold font-Poppins hover:bg-gray-200 rounded-xl "
                        href="/Online-Quiz"
                        onMouseEnter={() => setSubmenuVisible(true)}
                        onMouseLeave={() => setSubmenuVisible(false)}
                      >
                        Practice Quiz
                      </Link>

                      <Link
                        className="block py-2 px-4 text-black font-Poppins font-semibold hover:bg-gray-200 rounded-xl"
                        href="/State_Board"
                        onMouseEnter={() => setSubmenuVisible(true)}
                        onMouseLeave={() => setSubmenuVisible(false)}
                      >
                        State Board
                      </Link>
                      <Link
                        className="block py-2 px-4 text-black font-Poppins font-semibold hover:bg-gray-200 rounded-xl"
                        href="/home-tuition"
                        onMouseEnter={() => setSubmenuVisible(true)}
                        onMouseLeave={() => setSubmenuVisible(false)}
                      >
                        Explore Home Tuition
                      </Link>
                      <Link
                        className="block py-2 px-4 text-black font-Poppins font-semibold hover:bg-gray-200 rounded-xl"
                        href="/live-one-to-one"
                        onMouseEnter={() => setSubmenuVisible(true)}
                        onMouseLeave={() => setSubmenuVisible(false)}
                      >
                        Live one to one Classes
                      </Link>
                    </div>
                    <Link
                      href="/Refer&Earn"
                      onMouseEnter={() => setSubmenuVisible(true)}
                      onMouseLeave={() => setSubmenuVisible(false)}
                      className="relative group inline-flex items-center gap-3 ml-2 px-7 py-2 rounded-full 
                                bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white font-Poppins font-semibold 
                                shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
                    >
                      {/* GLOW */}
                      <div
                        className="absolute -inset-1 rounded-full 
                  bg-orange-400 blur-md opacity-40 
                  group-hover:opacity-70 transition"
                      />

                      {/* SHIMMER */}
                      <span className="shimmer-effect" />

                      {/* ICON */}
                      <span
                        className="relative z-10 flex items-center justify-center 
                   w-9 h-9 rounded-full 
                   bg-white/20 backdrop-blur-md"
                      >
                        <MdAttachMoney className="text-2xl transition-transform group-hover:rotate-12" />
                      </span>

                      {/* TEXT */}
                      <span className="relative z-10 tracking-wide">
                        Refer & Earn
                      </span>
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <LoginPopup isOpen={isLoginPopupOpen} onClose={handleCloseLoginPopup} />
    </div>
  );
};

export default Navbar;
