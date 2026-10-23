"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Image from "next/image";
import GifImage from "@/public/home_image_gif (3).gif";
import { FiArrowRightCircle, FiArrowLeftCircle } from "react-icons/fi";
import {
  FaCalculator,
  FaAtom,
  FaBookOpen,
  FaDatabase,
  FaUserGraduate,
  FaLanguage,
  FaGlobe,
  FaLeaf,
  FaCogs,
  FaChartBar,
  FaBrain,
  FaUsers,
} from "react-icons/fa";
import { PiTimerBold } from "react-icons/pi";
import { IoMdPeople } from "react-icons/io"; // For social studies or related subjects
import {
  GiChemicalDrop,
  GiMusicalNotes,
  GiAstronautHelmet,
  GiEarthAfricaEurope,
} from "react-icons/gi"; // For Chemistry and other subjects
import { MdOutlineLanguage } from "react-icons/md"; // For Hindi and languages
import { BiBook } from "react-icons/bi"; // For Literature
import { SlChemistry } from "react-icons/sl";
import ArrowGif from "@/public/Animation - 1732703530190.gif";
import Link from "next/link";

import Head from "next/head";

import { set } from "date-fns";
import { useRouter } from "next/navigation";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import StudentAppImg from "@/public/studentApp.png";
import { FaGooglePlay, FaAppStore, FaMobileAlt, FaFire, FaCheckCircle, FaStar, FaDownload, FaRocket } from "react-icons/fa";

const HomePage = () => {
  const { data: session, status } = useSession();
  const [studentName, setStudentName] = useState("");
  const [grade, setGrade] = useState(null);
  const [stream, setStream] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 3;
  const totalPages = Math.ceil(videos.length / videosPerPage);
  const [paginatedSubjects, setPaginatedSubjects] = useState([]); // Current page subjects
  const [currentSubjectPage, setCurrentSubjectPage] = useState(1);
  const itemsPerPage = 3; // Number of items per page
  const totalSubjectItens = Math.ceil(paginatedSubjects.length / itemsPerPage);
  const [activity, setActivity] = useState({});
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const router = useRouter();
  const [bookmarkedVideos, setBookmarkedVideos] = useState(new Set());

  const handleVideoClick = (videoId) => {
    setActiveVideoId(videoId);
  };

  useEffect(() => {
    const fetchGradeandStream = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const response = await axios.post(
            `${WEB_BACKEND_URL}/api/route/getStudentByEmail`,
            { gmail: session.user.email }
          );
          setStudentName(response.data.studentName || response.data.name || "");
          setGrade(response.data.grade);
          setUserId(response.data.registrationNumber);

          setStream(response.data.stream);
        } catch (error) {
          console.error("Error fetching grade:", error);
        }
      }
    };

    fetchGradeandStream();
  }, [session, status]);

  useEffect(() => {
    const fetchVideos = async (gradeToFetch) => {
      setLoading(true);

      try {
        const response = await axios.get(
          `${WEB_BACKEND_URL}/api/route/getVideosForStudent`,
          { params: { grade: gradeToFetch } }
        );
        setVideos(response.data.videos || []);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }

      setLoading(false);
    };

    if (grade) fetchVideos(grade);
  }, [grade]);

  // Fetch subjects when grade is set
  useEffect(() => {
    const fetchSubjects = async () => {
      if (grade) {
        setLoading(true);
        try {
          const params = { grade };
          if (stream) {
            params.stream = stream;
          }
          const response = await axios.get(
            `${WEB_BACKEND_URL}/api/route/getSeletedSubject`,
            { params }
          );
          setPaginatedSubjects(response.data.selectedSubjects);
        } catch (error) {
          console.error("Error fetching subjects:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSubjects();
  }, [grade, stream]);

  const handleNavigation = async (subject) => {
    try {
      const response = await axios.get(
        `${WEB_BACKEND_URL}/api/route/fetchBooks`,
        { params: { grade, selectedSubject: subject.selectedSubject } }
      );
  
      const books = response.data?.books || [];
  
      // ✅ If books array is empty OR contains null values, navigate to Chapterwise
      if (!books.length || books.every((book) => !book.books || book.books.trim() === "")) {
        router.push(
          `/Userdashboard/chaptertest/Chapterwise?selectedSubject=${subject.selectedSubject}&level=easy`
        );
      } else {
        router.push(
          `/Userdashboard/chaptertest/Books?selectedSubject=${subject.selectedSubject}&level=easy`
        );
      }
    } catch (error) {
      console.error("Error fetching books:", error);
  
      // ✅ If API fails, navigate to Chapterwise as fallback
      router.push(
        `/Userdashboard/chaptertest/Chapterwise?selectedSubject=${subject.selectedSubject}&level=easy`
      );
    }
  };
  


  useEffect(() => {
    const fetchActivities = async () => {
      if (userId && grade) {
        setLoading(true);
        setError(null); // Clear any previous error messages
        try {
          const response = await axios.post(
            `${WEB_BACKEND_URL}/api/route/get-learning-activity-status-recent`,
            { userId, grade } // Sending data in the request body
          );

          const activities = response.data.pausedActivities;
          if (activities && activities.length > 0) {
            setActivity(activities); // Set activities if found
          } else {
            setActivity([]); // Clear the activity state
            setError("No activities found."); // Custom message for no activities
          }
        } catch (error) {
          if (error.response?.status === 404) {
            setActivity([]);
          } else {
            console.error("Error fetching activity data:", error);
          }
        } finally {
          setLoading(false);
        }
      }
    };

    fetchActivities();
  }, [userId, grade]);

  useEffect(() => {
    if (!userId || !grade) return;
    const fetchBookmarkedVideos = async () => {
      try {
        const response = await axios.post(
          `${WEB_BACKEND_URL}/api/route/getVideoBookmark`,
          {
            userId,
            grade: grade,
          }
        );

        if (response.status === 200) {
          const bookmarks = response.data.message; // Array of bookmarked files

          const bookmarkedMap = {};
          bookmarks.forEach((video) => {
            bookmarkedMap[video.videoId] = true;
          });

          setBookmarkedVideos(bookmarkedMap); // Set bookmarks in state
        }
      } catch (error) {
        if (error.response?.status === 404) {
          setBookmarkedVideos({});
        } else {
          console.error("Error fetching bookmarked files:", error);
        }
      }
    };

    fetchBookmarkedVideos();
  }, [userId, grade]);

  const handleBookmark = async (video) => {
    const isBookmarked = bookmarkedVideos[video.id];

    try {
      if (isBookmarked) {
        // If already bookmarked, send a request to remove it
        const response = await axios.post(
          `${WEB_BACKEND_URL}/api/route/removevideoBookmark`,
          {
            userId,
            videoId: video.id,
          }
        );

        if (response.status === 200) {
          setBookmarkedVideos((prev) => ({
            ...prev,
            [video.id]: false, // Mark as unbookmarked
          }));
          alert("Bookmark removed successfully!");
        }
      } else {
        // If not bookmarked, send a request to add it
        const response = await axios.post(
          `${WEB_BACKEND_URL}/api/route/videobookMark`,
          {
            grade,
            videoId: video.id,
            userId,
            title: video.title,
            topic: video.topic,
            selectedSubject: video.subject,
            video_url: video.video_url,
          }
        );

        if (response.status === 200) {
          setBookmarkedVideos((prev) => ({
            ...prev,
            [video.id]: true, // Mark as bookmarked
          }));
          alert("Bookmark added successfully! 🎉");
        }
      }
    } catch (error) {
      console.error("Error handling bookmark:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Mapping subject names to icons
  const subjectIcons = {
    Math: <FaCalculator size={30} className="text-blue-500" />,
    Physics: <FaAtom size={30} className="text-green-500" />,
    Chemistry: <FaBookOpen size={30} className="text-red-500" />,
    ComputerScience: <FaDatabase size={30} className="text-yellow-500" />,
    Biology: <FaUserGraduate size={30} className="text-purple-500" />,
    English: <FaLanguage size={30} className="text-orange-500" />,
    Geography: <FaGlobe size={30} className="text-teal-500" />,
    History: <IoMdPeople size={30} className="text-gray-600" />,
    MathematicsAdvanced: <FaCalculator size={30} className="text-blue-700" />,
    Science: <GiChemicalDrop size={30} className="text-pink-500" />,
    Astronomy: <GiAstronautHelmet size={30} className="text-indigo-600" />,
    Music: <GiMusicalNotes size={30} className="text-yellow-400" />,
    Psychology: <FaBrain size={30} className="text-lime-500" />,
    Sociology: <FaUsers size={30} className="text-indigo-500" />,
    Economics: <FaChartBar size={30} className="text-green-700" />,
    Engineering: <FaCogs size={30} className="text-gray-800" />,
    EnvironmentalScience: <FaLeaf size={30} className="text-green-600" />,

    // Adding more subjects
    Hindi: <MdOutlineLanguage size={30} className="text-red-400" />, // Hindi language icon
    PoliticalScience: <FaGlobe size={30} className="text-blue-600" />, // Political Science icon
    SocialScience: <FaUsers size={30} className="text-purple-400" />, // Social Science icon
    GeographyAdvanced: (
      <GiEarthAfricaEurope size={30} className="text-brown-600" />
    ), // Advanced Geography icon
    Literature: <BiBook size={30} className="text-yellow-600" />, // Literature icon
    Civics: <FaUsers size={30} className="text-orange-600" />, // Civics icon (could be social studies)
    Chemistry: <SlChemistry size={30} className="text-green-600" />, // Basic Chemistry icon
    PhysicsAdvanced: <FaAtom size={30} className="text-teal-500" />, // Advanced Physics icon
    HindiLiterature: <MdOutlineLanguage size={30} className="text-pink-500" />, // Hindi Literature
    EnvironmentalStudies: <FaLeaf size={30} className="text-teal-500" />, // Environmental Studies icon
    AgricultureScience: (
      <GiEarthAfricaEurope size={30} className="text-green-500" />
    ), // Agriculture Science icon
    PsychologyAdvanced: <FaBrain size={30} className="text-indigo-700" />, // Advanced Psychology
    BusinessStudies: <FaChartBar size={30} className="text-yellow-600" />, // Business Studies
  };
  // Function to normalize subject names (remove spaces)
  const normalizeSubjectKey = (subject) => {
    return subject.replace(/\s+/g, ""); // Remove spaces for matching
  };

  // Function to get the icon for a subject
  const getSubjectIcon = (subject) => {
    const normalizedSubject = normalizeSubjectKey(subject);
    return (
      subjectIcons[normalizedSubject] || (
        <FaBookOpen size={30} className="text-gray-500" /> // Default icon
      )
    );
  };

  const paginatedVideos = videos.slice(
    (currentPage - 1) * videosPerPage,
    currentPage * videosPerPage
  );

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handleViewMore = () => {
    router.push("/Userdashboard/Conceptvideo");
  };

  // Pagination for subjects
  const paginateSubjects = paginatedSubjects.slice(
    (currentSubjectPage - 1) * itemsPerPage,
    currentSubjectPage * itemsPerPage
  );

  const handlePrevSubjectPage = () => {
    if (currentSubjectPage > 1) setCurrentSubjectPage((prev) => prev - 1);
  };

  const handleNextSubjectPage = () => {
    if (currentSubjectPage < totalSubjectItens)
      setCurrentSubjectPage((prev) => prev + 1);
  };

  const handleViewAll = () => {
    router.push("/Userdashboard/chaptertest");
  };

  return (
    <div className="w-full h-screen">
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row items-center bg-white shadow-md rounded-md gap-3 md:gap-6 p-1">
        <Image
          src={GifImage}
          alt="Learning Animation"
          height={200}
          width={200}
          className="w-auto h-auto rounded-md"
        />
        <div className="flex-1 text-center md:text-start p-2">
          <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start">
            <h1 className="text-2xl md:text-4xl font-extrabold text-gray-800 tracking-tight capitalize">
              Welcome, {studentName || session?.user?.name || "Student"}! 🎉
            </h1>
            {grade && (
              <span className="text-xs font-bold text-orange-600 bg-orange-100 border border-orange-200 px-3 py-1 rounded-full uppercase tracking-wider">
                Class {grade} {stream ? `• ${stream}` : ""}
              </span>
            )}
          </div>
          <p className="text-base md:text-lg text-gray-600 mt-2">
            Ready to explore your personalized learning journey?
          </p>
        </div>
      </div>
      <div className="flex flex-col mt-4 gap-5 shadow-xl bg-slate-100 rounded-lg p-2">
        {/* Title Section */}
        <div className="flex justify-between items-center p-1">
          <h2 className="text-2xl font-bold text-gray-800">
            Recent Activities
          </h2>
        </div>

        {/* Activities Section */}
        <div className="flex items-center justify-center w-full p-4">
          {activity?.length > 0 ? (
            <div className="overflow-x-auto max-h-[400px] w-full p-2">
              {" "}
              {/* Enables horizontal scrolling */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-max">
                {" "}
                {/* Set width to max to allow overflow */}
                {activity.slice(0, 3).map((activity, index) => {
                  const progressPercentage =
                    activity.activity.progressPercentage;
                  const timeSpentMinutes = Math.floor(
                    activity.activity.timeSpent / 60
                  ); // Convert seconds to minutes

                  // Determine progress bar color based on percentage
                  const getProgressColor = (percentage) => {
                    if (percentage <= 25) {
                      return "rgb(239 68 68)"; // Red for 0-25%
                    } else if (percentage <= 50) {
                      return "rgb(245 158 11)"; // Yellow for 26-50%
                    } else if (percentage <= 75) {
                      return "rgb(22 163 74)"; // Green for 51-75%
                    } else {
                      return "rgb(22 163 74)"; // Bright Green for 76-100%
                    }
                  };

                  // Determine the subject icon
                  const subjectIcon =
                    subjectIcons[activity.resource.selectedSubject];

                  return (
                    <div
                      key={index}
                      className="relative bg-white rounded-lg shadow-lg p-6 text-black flex items-center gap-6"
                    >
                      {/* Progress Section */}
                      <div className="flex flex-col items-center">
                        {/* Circular Progress Indicator */}
                        <div className="relative w-20 h-20">
                          {/* Outer Circle */}
                          <div className="w-full h-full rounded-full border-8 border-gray-300"></div>
                          {/* Progress Circle */}
                          <div
                            className={`absolute top-0 left-0 w-full h-full rounded-full border-8 transition-all duration-500`}
                            style={{
                              clipPath: "inset(0 50% 0 0)", // First half
                              transform:
                                progressPercentage > 50
                                  ? `rotate(180deg)` // Complete the first 50%
                                  : `rotate(${progressPercentage * 3.6}deg)`,
                              transformOrigin: "center center",
                              borderColor: getProgressColor(progressPercentage), // Dynamic color
                            }}
                          ></div>
                          {progressPercentage > 50 && (
                            <div
                              className="absolute top-0 left-0 w-full h-full rounded-full border-8 transition-all duration-500"
                              style={{
                                clipPath: "inset(0 0 0 50%)", // Second half
                                transform: `rotate(${
                                  (progressPercentage - 50) * 3.6
                                }deg)`,
                                transformOrigin: "center center",
                                borderColor:
                                  getProgressColor(progressPercentage), // Dynamic color
                              }}
                            ></div>
                          )}
                          {/* Subject Icon */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-lg font-bold">
                              {subjectIcon}
                            </span>
                          </div>
                        </div>
                        {/* Progress Percentage */}
                        <span className="text-2xl font-bold text-orange-600 mt-5">
                          {progressPercentage}%
                        </span>
                      </div>

                      {/* Card Content */}
                      <div className="flex-1">
                        <p className="text-lg font-semibold">
                          Topic:{" "}
                          <span className="capitalize font-bold">
                            {activity.resource.topic}
                          </span>
                        </p>
                        <p className="text-sm font-bold text-gray-900">
                          Subject:{" "}
                          <span className="capitalize">
                            {activity.resource.selectedSubject}
                          </span>
                        </p>
                        <p className="text-sm font-bold text-gray-900 p-1">
                          Title: {activity.resource.title}
                        </p>
                        <p className="flex items-center gap-1 text-sm font-bold text-gray-700 p-1">
                          <PiTimerBold size={20} />:
                          <span className="font-semibold">
                            {timeSpentMinutes} minutes
                          </span>
                        </p>
                        <div className="flex items-center gap-4">
                          <button
                            className="mt-4 w-full font-semibold py-2 px-2 rounded-xl border text-sm border-orange-500 text-orange-600 transition-colors duration-300"
                            onClick={() =>
                              alert(
                                `Redirecting to document: ${activity.resource.title}`
                              )
                            }
                          >
                            Skip
                          </button>
                          <button
                            className="mt-4 w-full text-sm bg-orange-500 font-semibold py-2 px-2 rounded-xl text-white transition-colors duration-300"
                            onClick={() =>
                              alert(
                                `Redirecting to document: ${activity.resource.title}`
                              )
                            }
                          >
                            Continue
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="w-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
              <div className="flex-1 space-y-3 z-10 text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white">
                  <FaFire className="text-yellow-300 animate-pulse" /> Daily Learning Streaks
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold leading-tight text-white">
                  Track Your Progress & Study Daily on the App!
                </h3>
                <p className="text-white/90 text-sm max-w-xl leading-relaxed">
                  Join thousands of students building a daily study habit. Solve interactive quizzes, attend live sessions, and climb the leaderboard on the Learnosphere Mobile App.
                </p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                  <a
                    href="https://play.google.com/store/apps/details?id=com.karotaraj.learnosphere_main"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white text-gray-900 px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-orange-50 transition-all shadow"
                  >
                    <FaGooglePlay className="text-green-600" size={16} /> Google Play
                  </a>
                  <a
                    href="https://apps.apple.com/in/app/learnosphere-learning-app/id6748979882"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-white/30 text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-black/60 transition-all shadow"
                  >
                    <FaAppStore size={18} /> App Store
                  </a>
                </div>
              </div>
              <div className="w-44 md:w-52 shrink-0 relative flex justify-center z-10">
                <Image
                  src={StudentAppImg}
                  alt="Learnosphere Mobile App"
                  width={200}
                  height={200}
                  className="object-contain drop-shadow-2xl transform hover:scale-105 transition-transform"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Video Cards */}
      {loading ? (
        <div className="text-center text-lg text-gray-600">
          Loading videos...
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 mt-4 shadow-xl bg-slate-100 rounded-lg p-2">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">
              Recommended Videos 📺
            </h2>
            <div className="flex items-center gap-16 md:gap-4">
              <div className="flex items-center gap-2">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                  <FiArrowLeftCircle size={30} />
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  <FiArrowRightCircle size={30} />
                </button>
              </div>
              <button
                onClick={handleViewMore}
                className="px-5 py-3 text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-sm"
              >
                View All
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {paginatedVideos.length > 0 ? (
              paginatedVideos.map((video) => (
                <div
                  key={video.id}
                  className="bg-white rounded-lg border cursor-pointer overflow-hidden transition-transform hover:scale-105"
                  onClick={() => handleVideoClick(video.id)}
                >
                  {activeVideoId === video.id ? (
                    <video
                      src={video.video_url}
                      className="w-full h-40 object-cover"
                      controls
                      autoPlay
                    />
                  ) : (
                    <video
                      src={video.video_url}
                      className="w-full h-40 object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {video.subject}
                    </h3>
                  </div>
                  <button onClick={() => handleBookmark(video)}>
                    {bookmarkedVideos[video.id] ? (
                      <BsBookmarkFill size={22} className="text-blue-500" />
                    ) : (
                      <BsBookmark size={22} className="text-gray-500" />
                    )}
                  </button>
                </div>
              ))
            ) : (
              <div className="col-span-full bg-slate-900 text-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800 shadow-lg">
                <div className="flex-1 space-y-3 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 border border-orange-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    <FaRocket /> 500+ HD Concept Videos
                  </div>
                  <h3 className="text-2xl font-bold text-white">Watch Concept Videos Anywhere, Anytime!</h3>
                  <p className="text-slate-300 text-sm max-w-lg leading-relaxed">
                    Free animated concept lessons, step-by-step NCERT explanations, and offline video downloads are ready for your grade on the mobile app.
                  </p>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                    <a
                      href="https://play.google.com/store/apps/details?id=com.karotaraj.learnosphere_main"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md shadow-orange-600/30"
                    >
                      <FaDownload size={14} /> Download Free on Mobile
                    </a>
                  </div>
                </div>
                <div className="w-40 md:w-48 shrink-0 flex justify-center">
                  <Image
                    src={StudentAppImg}
                    alt="Learnosphere Video App"
                    width={180}
                    height={180}
                    className="object-contain drop-shadow-xl"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Subject Cards with Pagination and View All Button */}
      {loading ? (
        <div className="text-center text-lg text-gray-600">
          Loading subjects...
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 mt-4 shadow-xl bg-slate-100 rounded-lg p-2">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">
              Important Questions 📚
            </h2>
            <div className="flex items-center gap-16 md:gap-4">
              <div className="flex gap-2">
                <button
                  onClick={handlePrevSubjectPage}
                  disabled={currentSubjectPage === 1}
                >
                  <FiArrowLeftCircle size={30} />
                </button>
                <button
                  onClick={handleNextSubjectPage}
                  disabled={currentSubjectPage === totalSubjectItens}
                >
                  <FiArrowRightCircle size={30} />
                </button>
              </div>
              <button
                onClick={handleViewAll}
                className="px-5 py-3 text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-sm"
              >
                View All
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {paginatedSubjects?.slice(0, 3).map((subject, index) => (
            <div
              key={index}
              onClick={() => handleNavigation(subject)}
              className="cursor-pointer bg-white rounded-lg border shadow-lg hover:shadow-xl overflow-hidden transition-transform hover:scale-105"
            >
              <div className="flex justify-center items-center bg-gray-50 p-4">
                {getSubjectIcon(subject.selectedSubject)}
              </div>
              <div className="p-4 flex items-center justify-around">
                <h3 className="text-xl font-bold text-gray-800">{subject.selectedSubject}</h3>
                <Image
                  src={ArrowGif}
                  alt="Arrow Animation"
                  height={100}
                  width={100}
                  className="w-7 h-7 rounded-md"
                />
              </div>
            </div>
          ))}
          </div>

          {/* High UX App Question Bank Highlight Banner */}
          <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0 font-bold text-xs shadow-sm">
                10k+
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">Need 1,000+ Chapter-wise Solved Questions & CBSE Sample Papers?</p>
                <p className="text-gray-500 text-xs">Unlock detailed solutions, step-by-step marking schemes, and previous year papers on the mobile app.</p>
              </div>
            </div>
            <a
              href="https://play.google.com/store/apps/details?id=com.karotaraj.learnosphere_main"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl whitespace-nowrap shadow-md shadow-orange-500/20 transition-all shrink-0"
            >
              Explore Full Bank in App
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
