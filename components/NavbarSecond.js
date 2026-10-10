"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { useSession, signOut } from "next-auth/react";

const NavbarSecond = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [submenuVisible, setSubmenuVisible] = useState(false);
  const [classmenuVisible, setclassmenuVisible] = useState(false);
  const [lkgmenuVisible, setlkgmenuVisible] = useState(false);
  const [syllabusMenuVisible, setsyllabusMenuVisible] = useState(false);
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownRef1 = useRef(null);
  const mobileRef = useRef(null);
  const toggleButtonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); //expand search icon
 
  const [recentSearches, setRecentSearches] = useState([]);
  const searchWrapperRef = useRef(null);
  const handleOpenLoginPopup = () => setIsLoginPopupOpen(true);
  const handleCloseLoginPopup = () => setIsLoginPopupOpen(false);
  const RECENT_KEY = "learnosphere_recent_searches";
  

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropDown(false); // ✅ Close dropdown if clicked outside
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
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside); // For mobile devices

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);
  // Handle outside click to close on mobile
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
    <div className="relative w-full ">
      <nav className="   top-20 z-50  ">
        <div className=" flex  flex-wrap items-center justify-between mx-auto p-5">
          <div
            ref={mobileRef}
            className={`items-center justify-between w-full sm:flex sm:w-auto sm:order-1 dropdown-down ${isMobileMenuOpen ? "block" : "hidden"
              }`}
            id="navbar-cta"
          >
            <ul className="font-Poppins flex flex-col text-orange-700 font-bold p-4 sm:p-0 mt-4 border border-gray-100 rounded-lg sm:space-x-8 rtl:space-x-reverse sm:flex-row sm:mt-0 sm:border-0 bg-[#fff] sm:bg-[#fff] ">
              
              <li>
                <Link
                  href="/"
                  className="block py-2 px-3 lg:p-0 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-orange-600 lg:dark:hover:text-orange-500 dark:text-black dark:hover:bg-gray-700 dark:hover:text-gray-800 lg:dark:hover:bg-transparent dark:border-gray-700"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/About"
                  className="block py-2 px-3 lg:p-0 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-orange-600 lg:dark:hover:text-orange-500 dark:text-black dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  About
                </Link>
              </li>
              <li >
                <Link
                  className="block py-2 px-3 lg:p-0 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-orange-600 lg:dark:hover:text-orange-500 dark:text-black dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                  href="/Courses"
                >
                  Courses
                </Link>
              </li>

              <li className="flex justify-start lg:justify-center items-center gap-2 relative group">
                <div
                  className="flex items-center gap-2 cursor-pointer  "
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      setIsOpen(!isOpen);
                      setActiveDropdown(
                        activeDropdown === "services" ? null : "services"
                      );
                    }
                  }}
                >
                  <Link
                    href="/"
                    className="block py-2 px-3 lg:p-0 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-orange-600 lg:dark:hover:text-orange-500 dark:text-black dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 "
                  >
                    Services
                  </Link>
                  <IoIosArrowDown
                    size={20}
                    className={`transform  text-black transition-transform duration-300 ease-in-out 
                  ${isOpen ? "rotate-180" : ""
                      } lg:group-hover:rotate-180 cursor-pointer`}
                  // Mobile Click Toggle
                  />
                </div>
                <div
                  className={`absolute bg-white py-2 w-96 transition-all duration-150 rounded-xl group-hover:mt-[245px]
                ${isOpen
                      ? "block mt-[230px] translate-x-2 dropdown-up z-30"
                      : "dropdown-up hidden"
                    } 
                lg:group-hover:block md:mt-[235px]`}
                >
                  <h3 className="block px-4 py-2  text-base md:text-xl text-black font-Poppins font-semibold rounded-xl hover:bg-gray-200">
                    Prepare for your exam with us
                  </h3>
                  <div className="px-4 py-2 ">
                    <div className="group relative ">
                      <Link
                        className="block px-2 py-2 text-black font-semibold font-Poppins hover:bg-gray-200  rounded-xl "
                        href=""
                        onMouseEnter={() => setsyllabusMenuVisible(true)}
                        onMouseLeave={() => setsyllabusMenuVisible(false)}
                      >
                        CBSE Syllabus (1st to 12th)
                      </Link>
                      <div
                        id="cbse-submenu"
                        className={`absolute rounded-xl ${syllabusMenuVisible
                            ? "block dropdown-up"
                            : "hidden dropdown-up"
                          } w-64 bg-white shadow-lg z-50 top-full lg:left-full lg:top-0 mt-0`}
                        onMouseEnter={() => setsyllabusMenuVisible(true)}
                        onMouseLeave={() => setsyllabusMenuVisible(false)}
                      >
                        <Link
                          className="block py-2 px-4 text-black font-Poppins font-semibold hover:bg-gray-200 rounded-xl "
                          href="/CBSE/lkg"
                        >
                          Class 1st (2025-26)
                        </Link>
                        <Link
                          className="block py-2 px-4 text-black font-Poppins font-semibold hover:bg-gray-200 rounded-xl"
                          href="/CBSE/ukg"
                        >
                          Class 2st (2025-26)
                        </Link>
                        <Link
                          className="block py-2 px-4 text-black font-Poppins font-semibold hover:bg-gray-200 rounded-xl"
                          href="/CBSE/Class-1"
                        >
                          Class 3st (2025-26)
                        </Link>
                        <Link
                          className="block py-2 px-4 text-black font-Poppins font-semibold hover:bg-gray-200 rounded-xl"
                          href="/CBSE/Class-2"
                        >
                          Class 4st (2025-26)
                        </Link>
                        <Link
                          className="block py-2 px-4 text-black font-Poppins font-semibold hover:bg-gray-200 rounded-xl"
                          href="/CBSE/Class-3"
                        >
                          Class 5th (2025-26)
                        </Link>
                        <Link
                          className="block py-2 px-4 text-black font-Poppins font-semibold hover:bg-gray-200 rounded-xl"
                          href="/CBSE/Class-4"
                        >
                          Class 6th (2025-26)
                        </Link>
                        <Link
                          className="block py-2 px-4 text-black font-Poppins font-semibold hover:bg-gray-200 rounded-xl"
                          href="/CBSE/Class-5"
                        >
                          Class 7th (2025-26)
                        </Link>
                        <Link
                          className="block py-2 px-4 text-black font-Poppins font-semibold hover:bg-gray-200 rounded-xl "
                          href="/CBSE/lkg"
                        >
                          Class 8th (2025-26)
                        </Link>
                        <Link
                          className="block py-2 px-4 text-black font-Poppins font-semibold hover:bg-gray-200 rounded-xl "
                          href="/CBSE/lkg"
                        >
                          Class 9th (2025-26)
                        </Link>
                        <Link
                          className="block py-2 px-4 text-black font-Poppins font-semibold hover:bg-gray-200 rounded-xl "
                          href="/CBSE/lkg"
                        >
                          Class 10th (2025-26)
                        </Link>
                        <Link
                          className="block py-2 px-4 text-black font-Poppins font-semibold hover:bg-gray-200 rounded-xl "
                          href="/CBSE/lkg"
                        >
                          Class 11th (2025-26)
                        </Link>
                        <Link
                          className="block py-2 px-4 text-black font-Poppins font-semibold hover:bg-gray-200 rounded-xl "
                          href="/CBSE/lkg"
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
                        Cbse Board Exams(LKG & 5th)
                      </Link>
                      <div
                        id="cbse-submenu"
                        className={`absolute rounded-xl ${lkgmenuVisible
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
                        className={`absolute rounded-xl ${classmenuVisible
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
                        className={`absolute rounded-xl ${submenuVisible
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
                  className="block py-2 px-3 lg:p-0 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-orange-600 lg:dark:hover:text-orange-500 dark:text-black dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contact
                </Link>
              </li>

              <li className="flex justify-start lg:justify-center items-center gap-2 relative group">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      setActiveDropdown(
                        activeDropdown === "more" ? null : "more"
                      );
                    }
                  }}
                >
                  <Link
                    href="/"
                    className="block py-2 px-3 lg:p-0 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-orange-600 lg:dark:hover:text-orange-500 dark:text-black dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    More
                  </Link>
                  <IoIosArrowDown
                    size={20}
                    className={`transform   text-black font-bold transition-transform duration-300 ease-in-out
                      ${activeDropdown === "more" ? "rotate-180" : "rotate-0"
                      } lg:group-hover:rotate-180 cursor-pointer`}
                  />
                </div>
                <div
                  className={`absolute rounded-xl lg:group-hover:block bg-[#fff] py-2 group-hover:mt-[245px] mt-[245px] transition-all group-hover:translate-x-2  duration-150 dropdown-up
                   w-96 dropdown-up ${activeDropdown === "more" ? "block mt-[220px]" : "hidden"
                    }
                  lg:group-hover:mt-[245px] group-hover:translate-x-2`}
                >
                  <div className="px-4 py-2 re">
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
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavbarSecond;
