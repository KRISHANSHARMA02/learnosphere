"use client";
import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { FaBookOpen } from "react-icons/fa";
import Link from "next/link";
import { useSession } from "next-auth/react";
import axios from "axios";
import {
  FaCalculator,
  FaAtom,
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
import { IoMdPeople } from "react-icons/io"; // For social studies or related subjects

import {
  GiChemicalDrop,
  GiMusicalNotes,
  GiAstronautHelmet,
  GiEarthAfricaEurope,
} from "react-icons/gi"; // For Chemistry and other subjects
import { MdOutlineArrowCircleRight, MdOutlineLanguage } from "react-icons/md"; // For Hindi and languages
import { BiBook } from "react-icons/bi"; // For Literature
import { SlChemistry } from "react-icons/sl";
import { IoArrowForwardCircleOutline } from "react-icons/io5";

import { GrFormPreviousLink } from "react-icons/gr";
import { GrFormNextLink } from "react-icons/gr";

import Head from "next/head";

import { set } from "date-fns";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { useRouter } from "next/navigation";


const ChaptertestContent = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [grade, setGrade] = useState(null);
  const [stream, setStream] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState([]); // Default to an empty array
  const [selectedSubjects1, setSelectedSubjects1] = useState([]); // Default to an empty array
  const [selectedSubjectData, setSelectedSubjectData] = useState(null);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState(null);
  const [isPdfView, setIsPdfView] = useState(false); // Flag for displaying PDF in the page
  const [selectedCard, setSelectedCard] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const [selectedSubjectColor, setSelectedSubjectColor] = useState("#FFFFFF");
  const [selectedLevel, setSelectedLevel] = useState("easy");
  const [selectedSubjectFromQuery, setSelectedSubjectFromQuery] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0); // Track which card set is visible
  const [cardWidth] = useState(150); // Width of each card (can be adjusted as per your design)
  const [expandedTopic, setExpandedTopic] = useState(null);
  const [userId, setUserId] = useState(null);
  // Define total cards (including subjects, important questions, and sample papers)
  const totalCards = selectedSubjects.length + 10; // 2 extra for Important Questions and Sample Papers
  const cardsPerView = 5; // Number of cards to show at a time (adjust this value)
  const [selectedFile, setSelectedFile] = useState(null);
  const [bookmarkedFiles, setBookmarkedFiles] = useState({});
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [books, setBooks] = useState([]);
  


  const [isModalOpen1, setIsModalOpen1] = useState(false);

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject.selectedSubject);
    setIsModalOpen1(true);
  };


  const [isModalOpen, setIsModalOpen] = useState(false);
  // Handle Previous Button click
  // Handle previous button click
  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(prev - cardsPerView, 0));
  };

  // Handle next button click
  const handleNext = () => {
    setCurrentIndex((prev) =>
      Math.min(prev + cardsPerView, totalCards - cardsPerView)
    );
  };

  const handleCardClick = async (index, subjectName) => {
    if (selectedCard === index) {
      setActiveSection(null);
      setSelectedCard(null);
      setSelectedSubjectColor(null);
    } else {
      setSelectedSubjectFromQuery(subjectName);
      setActiveSection("selectedSubjectData");
      setSelectedCard(index);
    }
    const subjectColors = {
      Math: "#3B82F6",
      Physics: "#22C55E",
      Chemistry: "#EF4444",
      ComputerScience: "#EAB308",
      Biology: "#A855F7",
      English: "#F97316",
      Geography: "#14B8A6",
      History: "#4B5563",
      MathematicsAdvanced: "#1D4ED8",
      Science: "#EC4899",
      Astronomy: "#4F46E5",
      Music: "#FCD34D",
      Psychology: "#BFD64A",
      Sociology: "#6366F1",
      Economics: "#15803D",
      Engineering: "#1F2937",
      EnvironmentalScience: "#16A34A",

      // Adding more subjects
      Hindi: "#FCA5A5", // Hindi language icon
      "Political Science": "#2563EB", // Political Science icon
      "Social Science": "#6D28D9", // Social Science icon
      GeographyAdvanced: "#4A3822", // Advanced Geography icon
      Literature: "#EAB308", // Literature icon
      Civics: "#FB923C", // Civics icon (could be social studies)
      Chemistry: "#16A34A", // Basic Chemistry icon
      PhysicsAdvanced: "#14B8A6", // Advanced Physics icon
      HindiLiterature: "#EC4899", // Hindi Literature
      EnvironmentalStudies: "#14B8A6", // Environmental Studies icon
      Accountancy: "#14B8A6", // Environmental Studies icon
      AgricultureScience: "#22C55E", // Agriculture Science icon
      PsychologyAdvanced: "#3730A3", // Advanced Psychology
      "Bussiness Studies": "#EAB308",
    };
    setSelectedSubjectColor(
      subjectColors[selectedSubjects1[index].selectedSubject] || "#FFFFFF"
    );
  };

  const toggleSamplePapers = () => {
    // Toggle selectedCard and activeSection together
    if (activeSection === "samplePapers") {
      setActiveSection(null); // Deselect active section if it's already selected
      setSelectedCard(null); // Deselect the selected card if it's the same as the section
    } else {
      setActiveSection("samplePapers"); // Select the Sample Papers section
      setSelectedCard("samplePapers"); // Select the Sample Papers card
    }
  };

  const toggleImportantQuestion = () => {
    if (activeSection === "importantQuestion") {
      setActiveSection(null);
      setSelectedCard(null);
      localStorage.removeItem("selectedCard");
    } else {
      setActiveSection("importantQuestion");
      setSelectedCard("importantQuestion");
      localStorage.setItem("selectedCard", "importantQuestion");
    }
  };

  
  
  // Fetch grade based on session email
  useEffect(() => {
    const fetchGradeandStream = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const response = await axios.post(
            "https://learnospherebackend.learnosphere.in/api/route/getStudentByEmail",
            { gmail: session.user.email }
          );
          setGrade(response.data.grade);
          setUserId(response.data.registrationNumber);

          setStream(response.data.stream);

        } catch (error) {
          console.error("Error Fetching Grade:", error);
        }
      }
    };
    fetchGradeandStream();
  }, [session, status]);

  // Fetch subjects based on grade
  useEffect(() => {
    const fetchSubjects = async () => {
      if (grade) {
        setLoading(true);
        try {
          const params = { grade };
          if(stream){
            params.stream = stream;
          }
          const response = await axios.get(
            `https://learnospherebackend.learnosphere.in/api/route/getstudymaterialbysubjects`,
            { params }
          );
          setSelectedSubjects1(response.data.selectedSubjects1 || []); // Default to an empty array if undefined
        } catch (error) {
        } finally {
          setLoading(false);
        }
      }
    };
    fetchSubjects();
  }, [grade , stream]);

  
  

  
  useEffect(() => {
    if (selectedSubjectFromQuery && grade) {
      const fetchSubjectData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `https://learnospherebackend.learnosphere.in/api/route/getstudentdata?grade=${grade}&selectedSubject=${selectedSubjectFromQuery}`
          );
          setSelectedSubjectData(response.data); // Update the subject data immediately
        } catch (error) {
          setSelectedSubjectData([]);
        } finally {
          setLoading(false);
        }
      };
      fetchSubjectData();
    }
  }, [selectedSubjectFromQuery, grade]); // Re-run whenever selectedSubjectFromQuery changes

  useEffect(() => {
    const fetchImportantQuestionSubjects = async () => {
      if (grade) {
        setLoading(true);
        try {
          const params = { grade };
          if(stream){
            params.stream = stream;
          }
          const response = await axios.get(
            `https://learnospherebackend.learnosphere.in/api/route/getSeletedSubject`,
            { params }
          );
          setSelectedSubjects(response.data.selectedSubjects);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching subjects:", error);
          setLoading(false);
        }
      }
    };

    fetchImportantQuestionSubjects();
  }, [grade,stream]);

  

  const handleNavigation = async (subject) => {
    try {
      const response = await axios.get(`https://learnospherebackend.learnosphere.in/api/route/fetchBooks`, {
        params: { grade, selectedSubject: subject.selectedSubject },
      });
  
      const books = response.data?.books || []; // Ensure books is an array
  

      // Check if books array exists & if the first object has a valid book name
      if (books.length > 0 && books.some(book => book.books !== null && book.books.trim() !== "")) {
     
        router.push(
          `/Userdashboard/chaptertest/Books?selectedSubject=${subject.selectedSubject}&level=${selectedLevel}`
        );
      } else {

        router.push(
          `/Userdashboard/chaptertest/Chapterwise?selectedSubject=${subject.selectedSubject}&level=${selectedLevel}`
        );
      }
      
    } catch (error) {
      console.error("Error fetching books:", error);
  
      // Handle API errors like 404 (No books found)
      if (error.response?.status === 404) {
       
        router.push(
          `/Userdashboard/chaptertest/Chapterwise?selectedSubject=${subject.selectedSubject}&level=${selectedLevel}`
        );
      }
    }
  };
  

  const SubjectImages1 = {
    Math: (
      <Image
        className="w-full h-20"
        width={100}
        height={100}
        src="/25673048_vj2f_b439_220316.svg"
        alt="Math"
      />
    ),
    Science: (
      <Image
        className="w-full h-20"
        width={100}
        height={100}
        src="/7678843_3737837.jpg"
        alt="Science"
      />
    ),
    SocialScience: (
      <Image
        className="w-full h-20"
        width={100}
        height={100}
        src="/27953233_social_science16.svg"
        alt="Social Science"
      />
    ),
    English: (
      <Image
        className="w-full h-20"
        width={100}
        height={100}
        src="/28732095_7480521.svg"
        alt="English"
      />
    ),
    Hindi: (
      <Image
        className="w-full h-20"
        width={100}
        height={100}
        src="/hindi1.jpeg"
        alt="Hindi"
      />
    ),
    Chemistry: (
      <Image
        className="w-full h-20"
        width={100}
        height={100}
        src="/chemistry-svgrepo-com.svg"
        alt="Chemistry"
      />
    ),
    Biology: (
      <Image
        className="w-full h-20"
        width={100}
        height={100}
        src="/petri-dish-biology-svgrepo-com.svg"
        alt="Biology"
      />
    ),
    Physics: (
      <Image
        className="w-full h-20"
        width={100}
        height={100}
        src="/physics-nuclear-svgrepo-com.svg"
        alt="Physics"
      />
    ),
    Economics: (
      <Image
        className="w-full h-20"
        width={100}
        height={100}
        src="/Economics.png"
        alt="Physics"
      />
    ),
    PoliticalScience: (
      <Image
        className="w-full h-20"
        width={100}
        height={100}
        src="/PoliticalScience.jpeg"
        alt="Physics"
      />
    ),
    Accountancy: (
      <Image
        className="w-full h-20"
        width={100}
        height={100}
        src="/Accountancy.jpeg"
        alt="Physics"
      />
    ),
    BussinessStudies: (
      <Image
        className="w-full h-20"
        width={100}
        height={100}
        src="/BussinessStudies.jpeg"
        alt="Physics"
      />
    ),
  };

  const SubjectImages = {
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

  // Normalize subject keys to handle spaces or case mismatches
  const normalizeSubjectKey = (subject) => (typeof subject === "string" ? subject.replace(/\s+/g, "") : "");


  // Get subject image or default icon
  const getSubjectImages = (subject) => {
    const normalizedSubject = normalizeSubjectKey(subject);
    return (
      SubjectImages[normalizedSubject] || (
        <FaBookOpen size={30} className="text-gray-500" />
      )
    );
  };
  const getSubjectImages1 = (subject) => {
    const normalizedSubject = normalizeSubjectKey(subject);
    return (
      SubjectImages1[normalizedSubject] || (
        <FaBookOpen size={30} className="text-gray-500" />
      )
    );
  };

  const handleView = async (pdfUrl, resourceId) => {

   
    setSelectedFile(resourceId);
   
    const newWindow = window.open();
    newWindow.document.write(`
      <html>
        <head><title>PDF Viewer</title></head>
        <body style="margin:0;padding:0;overflow:hidden;">
          <iframe src="${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0" width="100%" height="100%" style="border:none;"></iframe>
        </body>
      </html>
    `);

    try {
      const response = await axios.post(
        "https://learnospherebackend.learnosphere.in/api/route/start-learning-activity",
        {
          userId,
          grade: grade,
          resourceId,
          activityType: "pdf",
        }
      );

      if (response.status === 201) {
        
      }
    } catch (error) {
  
    }
  };

  
  const closePdfView = () => {
    // Prepare data to send to the backend
    const dataToSend = {
      userId: userId, // Replace with actual user ID
      resourceId: selectedFile,
      grade: grade,
      pausedAt: new Date(), // Capture the pause time if the activity was paused
    };

    // Send data to update the learning activity
    axios
      .post(
        "https://learnospherebackend.learnosphere.in/api/route/update-learning-activity",
        dataToSend
      )
      .then((response) => {
   
        setIsPdfView(false);
        setSelectedPdfUrl(null);
        setSelectedFile(null);
      })
      .catch((error) => {
        setIsPdfView(false);
        setSelectedPdfUrl(null);
        setSelectedFile(null);
      });
  };


  useEffect(() => {
    const fetchBookmarkedFiles = async () => {
      try {
        const response = await axios.post("https://learnospherebackend.learnosphere.in/api/route/getBookmark", {
          userId,
          grade:grade
        });
  
        if (response.status === 200) {
          const bookmarks = response.data.message; // Array of bookmarked files
  
          const bookmarkedMap = {};
          bookmarks.forEach((file) => {
            bookmarkedMap[file.fileId] = true;
          });
  
          setBookmarkedFiles(bookmarkedMap); // Set bookmarks in state
        }
      } catch (error) {
        console.error("Error fetching bookmarked files:", error);
      }
    };
  
    fetchBookmarkedFiles();
  }, [userId,grade]);


  const handleBookmark = async (file) => {
    const isBookmarked = bookmarkedFiles[file.id];
  
    try {
      if (isBookmarked) {
        // If already bookmarked, send a request to remove it
        const response = await axios.post(
          "https://learnospherebackend.learnosphere.in/api/route/removeBookmark",
          {
            userId,
            fileId: file.id,
          }
        );
  
        if (response.status === 200) {
          setBookmarkedFiles((prev) => ({
            ...prev,
            [file.id]: false, // Mark as unbookmarked
          }));
          alert("Bookmark removed successfully! ✅");
        }
      } else {
        // If not bookmarked, send a request to add it
        const response = await axios.post(
          "https://learnospherebackend.learnosphere.in/api/route/bookmark",
          {
            grade,
            fileId: file.id,
            userId,
            title: file.title,
            topic: file.topic,
            selectedSubject: file.selectedSubject,
            pdf: file.pdf,
            pdfUrl: file.pdfUrl,
          }
        );
  
        if (response.status === 200) {
          setBookmarkedFiles((prev) => ({
            ...prev,
            [file.id]: true, // Mark as bookmarked
          }));
          alert("Bookmark added successfully! 🎉");
        }
      }
    } catch (error) {
      console.error("Error handling bookmark:", error);
      alert("Something went wrong! ❌");
    }
  };


  
  useEffect(() => {
    // Jab page reload ho to last selected card wapas le aaye
    const savedCard = localStorage.getItem("selectedCard");
    if (savedCard) {
      setSelectedCard(parseInt(savedCard, 10));

      // 2 second baad highlight remove ho jaye
      setTimeout(() => {
        setSelectedCard(null);
        localStorage.removeItem("selectedCard");
      }, 2000);
    }
  }, []);

  const handleClick = (index, subject) => {
    setSelectedCard(index); // Clicked card ko track karega
    localStorage.setItem("selectedCard", index); // Store in localStorage

    const normalizedSubject = encodeURIComponent(subject.selectedSubject); 
    router.push(`/Userdashboard/chaptertest/Instruction?selectedSubject=${normalizedSubject}`);
    
  };
  



  

  return (

    <>

    <Head>
    <meta name="robots" content="noindex, nofollow" />
  </Head>
    
   
    <div className="rounded-lg">

      <div className="flex flex-col gap-1 justify-start border-b  border-gray-300  mb-6 p-6">
        <h2 className="text-2xl font-bold text-gray-800">Start Teaching</h2>
        <p className="text-orange-600 font-semibold">
          Boost Your Lectures With Interactive Study Materials
        </p>
      </div>

      <div className="">
        {/* Navigation Buttons */}
        <div className="flex justify-between mb-4">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg disabled:opacity-50"
          >
            <GrFormPreviousLink />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex >= totalCards - cardsPerView}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg disabled:opacity-50"
          >
            <GrFormNextLink />
          </button>
        </div>

        {/* Cards Display */}
        <div className="overflow-x-auto bg-white border-b border-gray-300 scrollbar-hide">
          <div
            className="flex transition-transform duration-300"
            style={{
              transform: `translateX(-${currentIndex * cardWidth}px)`, // Move the cards horizontally
            }}
          >
            {/* Loop through all cards and render them */}
            {selectedSubjects1.map((subject, index) => (
              <div
                key={index}
                className={`bg-white min-w-[150px] ml-6 mb-10 border shadow-lg hover:shadow-xl cursor-pointer transition-all duration-300 ${
                  selectedCard === index ? "border-2 border-orange-500 " : ""
                }`}
                onClick={() => handleClick(index, subject)}
              >
                <div className="flex justify-center items-center bg-gray-50 p-4">
                  {getSubjectImages1(subject.selectedSubject)}
                </div>
                <div className="p-4 flex items-center justify-around">
                  <h3 className="text-sm font-bold text-gray-800">{subject.selectedSubject}</h3>
                </div>
              </div>
            ))}
            {/* Important Question Card */}
            <div
              onClick={toggleImportantQuestion}
              className={` flex flex-col justify-between shadow-lg border  p-2 min-w-[150px] h-[185px]  ml-6 cursor-pointer ${
                selectedCard === "importantQuestion"
                  ? "border-2 border-orange-500"
                  : ""
              }`}
            >
              <Image
                className="w-full h-20 "
                width={100}
                height={100}
                src="/kid-3326960_1280.png"
                alt="Hindi"
              />
              <p className="bg-gradient-to-r text-gray-800  bg-white font-bold text-center  p-2 text-sm">
                Important Question
              </p>
            </div>

            {/* Sample Papers Card */}
            <div
              onClick={toggleSamplePapers}
              className={`flex flex-col justify-between shadow-lg p-3 border min-w-[150px] h-[185px] ml-6  cursor-pointer ${
                selectedCard === "samplePapers"
                  ? "border-2 border-orange-500"
                  : ""
              }`}
            >
              <Image
                className="w-full h-20"
                width={100}
                height={100}
                src="/14662552_2011.i518.014_realistic test exam.jpg"
                alt="Hindi"
              />
              <p className="bg-gradient-to-r text-gray-800   bg-white  font-bold text-center p-2  text-sm">
                Sample Papers
              </p>
            </div>
          </div>
        </div>
      </div>

     

      {activeSection === "importantQuestion" && (
        <div className="mt-5 mb-5 border-t border-b border-gray-300 ">
          <div className="flex items-center flex-col md:flex-row md:justify-between mb-6 p-3">
            <h2 className="text-2xl font-bold text-gray-800">
              Important Questions 📚
            </h2>
            <div className="flex gap-3 mt-5 md:mt-0 ml-20 md:ml-0">
              {["easy", "medium", "hard"].map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                    selectedLevel === level
                      ? "bg-orange-600 text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6  mb-6 p-2 ">
          {selectedSubjects.length > 0 ? (
            selectedSubjects.map((subject, index) => (
              <div
                key={index}
                onClick={() => handleNavigation(subject)}
                className="cursor-pointer bg-white rounded-lg border shadow-lg hover:shadow-xl overflow-hidden transition-transform hover:scale-105"
              >
                <div className="flex justify-center items-center bg-gray-50 p-4">
                  {getSubjectImages(subject.selectedSubject)}
                </div>
                <div className="p-4 flex items-center justify-around">
                  <h3 className="text-sm font-bold text-gray-800">
                    {subject.selectedSubject}
                  </h3>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-lg text-gray-600">
              No subjects available for this grade.
            </div>
          )}
          </div>
        </div>
      )}

      {activeSection === "samplePapers" && (
        <div className="mt-4 p-4  border-b border-gray-300 border-t mb-6 ">
          <h3 className="text-lg font-bold mb-2">Sample Papers Material</h3>

          <div className="grid md:grid-cols-2  h-auto  w-full gap-2 md:gap-8">
            {[2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015].map(
              (year) => (
                <Link
                  key={year}
                  className="transition-all "
                  href={`/Userdashboard/chaptertest/samplepapers?samplepapers=Sample%20Question%20Papers&year=${year}-${
                    year + 1
                  }`}
                >
                  <span>
                    <p className="bg-gradient-to-r bg-gray-100 border border-gray-300  text-gray-800 font-bold text-center p-4 rounded-lg text-[0.6em] md:text-[.8em]">
                      Sample Question Paper Year {year}-{year + 1}
                    </p>
                  </span>
                </Link>
              )
            )}
          </div>
        </div>
      )}

      {/* PDF View */}
      {isPdfView && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full h-screen overflow-auto">
            <button
              onClick={closePdfView}
              className="absolute top-2 right-2 text-white bg-red-600 p-2 rounded-full"
            >
              X
            </button>
            <iframe
              src={selectedPdfUrl}
              title="PDF Viewer"
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      )}
    </div>

    </>
  );
};

const Chaptertest = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ChaptertestContent />
  </Suspense>
);

export default Chaptertest;
