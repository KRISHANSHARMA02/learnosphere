"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  FaQuestionCircle,
  FaBook,
  FaClipboardList,
  FaTasks,
  FaFilePdf,
} from "react-icons/fa";


const ContentPage = () => {
  const [cards, setCards] = useState([]);
  const router = useRouter();
  const searchParams = new URLSearchParams(window.location.search);
  const selectedSubject = searchParams.get("selectedSubject");
  const [grade, setGrade] = useState(null);
  const [stream, setStream] = useState(null);
  const { data: session, status } = useSession();

  // ✅ Grade Fetching from API
  useEffect(() => {
    const fetchGrade = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const response = await axios.post(
            "https://learnospherebackend.learnosphere.in/api/route/getStudentByEmail",
            { gmail: session.user.email }
          );
          setGrade(response.data.grade);
          setStream(response.data.stream);
        } catch (error) {
          console.error("Error fetching grade:", error);
        }
      }
    };
    fetchGrade();
  }, [session, status]);

  // Fetch Available Cards from Backend
  useEffect(() => {
    const fetchCards = async () => {
      // ✅ Prevent API call if required data is missing
      if (!selectedSubject || !grade) return;
  
      try {
        const response = await axios.post("https://learnospherebackend.learnosphere.in/api/route/getStudentContentCardsData", {
          subject: selectedSubject,
          grade: grade,
          stream: stream,
        });
  
        const backendCards = response.data || [];
        if (!backendCards.some((card) => card.title === "Notes")) {
          backendCards.push({
            title: "Notes",
            count: null,
          });
        }
        setCards(backendCards);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };
  
    fetchCards();
  }, [selectedSubject, grade, stream]);


  // Separate Functions for Card Navigation
  const navigateToImportantQuestions = () => {
    router.push(`/Userdashboard/chaptertest/Subjectwise_ImportantQ_Chapternames?selectedSubject=${selectedSubject}`);
  };

  const navigateToDailyPractice = () => {
        router.push(`/Userdashboard/DDP?selectedSubject=${selectedSubject}`);
  };

  const navigateToQnA = () => {
    fetchBooksAndNavigate(); // Call the function to fetch books and navigate
  };

  const navigateToMCQ = () => {
    router.push(`/Userdashboard/chaptertest/Subjectwise_MCQs_ChapterNames?selectedSubject=${selectedSubject}`);
  };

  const navigateToNotes = () => {
    router.push(`/Userdashboard/chaptertest/Notes?selectedSubject=${selectedSubject}`);
  };

  const navigateToExamPrep = () => {
    router.push(`/Userdashboard/chaptertest/exam-prep`);
  };


    // ✅ Books Fetching on Button Click
    const fetchBooksAndNavigate = async () => {
      if (grade && selectedSubject) {
        try {
          // ✅ API Call to fetch books
          const response = await axios.get(
            "https://learnospherebackend.learnosphere.in/api/route/getBooks",
            {
              params: { grade, selectedSubject },
            }
          );
  
          const books = response.data.books; // Extracting books array
  
          // ✅ Check if books exist and are not null or empty
          if (
            books.length > 0 &&
            books.some((book) => book.books && book.books.trim() !== "")
          ) {
        
            router.push(
              `/Userdashboard/chaptertest/Book?selectedSubject=${selectedSubject}`
            );
          } else {
          
            router.push(
              `/Userdashboard/chaptertest/ChapterWiseQ&A?selectedSubject=${selectedSubject}`
            );
          }
        } catch (error) {
          router.push(
            `/Userdashboard/chaptertest/Book?selectedSubject=${selectedSubject}`
          );
        }
      }
    };
  
  // Card Color Configuration
  const cardStyles = {
    "Important Questions": "from-blue-500 to-purple-600",
    "Daily Practice Questions": "from-green-500 to-cyan-600",
    "Q&A": "from-amber-500 to-orange-600",
    "MCQ" : "from-red-500 to-pink-600",
    "Exam Preparation Kit": "from-indigo-500 to-violet-600",
    "Notes": "from-teal-500 to-emerald-600",
  };

  // Logic for Icons based on the card title
  const getIcon = (title) => {
    switch (title) {
      case "Important Questions":
        return <FaBook />;
      case "Daily Practice Questions":
        return <FaClipboardList />;
      case "Q&A":
        return <FaFilePdf />;
      case "MCQ":
        return <FaTasks />;
        case "Notes":
        return <FaBook />;
      default:
        return <FaQuestionCircle />;
    }
  };

  const getShortTitle = (title) => {
    switch (title) {
      case "Important Questions":
        return "Imp Qs";
      case "Daily Practice Questions":
        return "Daily Qs";
      case "Q&A":
        return "Q&A";
      case "MCQ":
        return "MCQ";
      default:
        return title;
    }
  }

  return (
    <div className="min-h-screen bg-white font-Poppins p-6 flex flex-col items-center">
      <div className="max-w-max  flex justify-center gap-1 md:gap-20 items-center border-b-2 mb-5 py-4">
        <button
          onClick={() => router.back()}
          className="p-1 px-3 mr-5 rounded-xl bg-gray-800 text-white shadow-lg hover:bg-gray-700 transition-all duration-300"
        >
          <span className="text-xl">←</span>{" "}
          {/* Optional: Add an arrow symbol */}
        </button>
        <div className="flex flex-col md:flex-row gap-1 md:gap-20 items-center mb-2">
        <h2 className="text-sm md:text-3xl font-bold text-gray-800">
          Learning Resources 
        </h2>
      <p className="font-Poppins text-sm md:text-xl text-gray-800 font-bold">Subject Choosen: <span className="text-orange-500">{selectedSubject}</span> </p>
        </div>

      </div>
   

      {cards.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mt-10">
          {cards.map((item, index) => (
            <div
              key={index}
              onClick={
                item.title === "Important Questions"
                  ? navigateToImportantQuestions
                  : item.title === "Daily Practice Questions"
                  ? navigateToDailyPractice
                  : item.title === "Q&A"
                  ? navigateToQnA
                  : item.title === "MCQ"
                  ? navigateToMCQ
                  : item.title === "Notes"
                  ? navigateToNotes
                  : navigateToExamPrep
              }
              className={`relative p-8 rounded-xl shadow-lg cursor-pointer 
                  transform transition-all duration-300 hover:scale-105 
                  bg-gradient-to-br ${cardStyles[item.title]} 
                  hover:shadow-2xl text-white`}
            >
              <div className="absolute top-4 right-4 bg-white/20 rounded-full px-3 py-1 text-sm">
                {item.count !== null && item.count !== undefined ? `${item.count} ` : ""}{getShortTitle(item.title)}
              </div>

              <div className="flex flex-col items-center">
                <div className="text-5xl mb-4">{getIcon(item.title)}</div>
                <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                <p className="text-sm opacity-90 text-center">
                  {item.title === "Q&A" && "Download PDF resources"}
                  {item.title === "MCQ" && "Interactive quizzes"}
                  {item.title === "Important Questions" &&
                    "Curated question bank"}
                  {item.title === "Daily Practice Questions" &&
                    "Daily exercises"}
                     {item.title === "Notes" && "Revision & study notes"}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-gray-500 text-lg">Loading resources...</p>
          <div className="mt-4 w-12 h-12 border-4 border-gray-300 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default ContentPage;
