"use client";
import { useSession } from "next-auth/react";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState, Suspense, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import picture from "@/public/image for website.png";
import Modal from "./Modal";
import Head from "next/head";
import Summary from "@/components/Summary";
import DownloadAppModal from "@/components/StudentAppModalForQuizes";

const Loading = () => (
  <div className="flex justify-center items-center h-screen">
    <h2 className="text-lg font-semibold">Loading questions...</h2>
  </div>
);

const QuestionComponent = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const classLevel = searchParams.get("classLevel");

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(300);
  const [showSummary, setShowSummary] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [timeTakenForQuestions, setTimeTakenForQuestions] = useState([]);
  const [startTime, setStartTime] = useState(Date.now());
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [timerActive, setTimerActive] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDownloadAppOpen, setIsDownloadAppOpen] = useState(false);

  const handleModalSubmitSuccess = (name, email) => {
    setUserName(name);
    setEmail(email);
    setIsModalOpen(false);
    setTimerActive(true); // Resume the timer
    setStartTime(Date.now()); // Update the start time
  };

  // Function to fetch questions based on class level
  const fetchQuestions = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://learnospherebackend.learnosphere.in/api/route/basicquestions?classLevel=${classLevel}`
      );
      if (!response.data) {
        throw new Error("Failed to fetch questions");
      }
      const limitedQuestions = response.data.slice(0, 10); // Assuming only 10 questions are needed
      setQuestions(limitedQuestions);
      setSelectedOptions(new Array(limitedQuestions.length).fill(undefined));
      setTimeTakenForQuestions(new Array(limitedQuestions.length).fill(0));
    } catch (error) {
      console.error("Error fetching questions:", error.message || error);
    }
  }, [classLevel]);

  // Fetch questions on mount
  useEffect(() => {
    if (classLevel) {
      fetchQuestions();
    }
  }, [classLevel, fetchQuestions]);

  // Utility function to trim option prefix like "A: ", "B: "
  const trimOption = (option) => {
    if (!option) return option;
    return option.replace(/^[A-Z]:\s*/, "").trim();
  };

  // Submit quiz results

  const handleSubmit = useCallback(async () => {
    // Prevent multiple clicks
    if (isSubmitting) return;

    setIsSubmitting(true);

    const questionNumbers = questions.map((_, index) => `${index + 1}`);
    const selectedCount = selectedOptions.filter(
      (option) => option !== undefined
    ).length;

    if (selectedCount < 6) {
      alert("Please select at least 6 questions before submitting.");
      return;
    }

    const resultsSummary = questions.map((question, index) => {
      const trimmedSelected = trimOption(selectedOptions[index]);
      const trimmedAnswer = trimOption(question.answer);

      const isCorrect = trimmedSelected === trimmedAnswer;

      return {
        question: question.question,
        selectedOption: trimmedSelected,
        correctAnswer: trimmedAnswer,
        isCorrect,
      };
    });

    const correctAnswersCount = resultsSummary.filter(
      (result) => result.isCorrect
    ).length;

    const quizData = {
      questionNo: questionNumbers,
      selectedOptions: selectedOptions.map(trimOption),
      timeTaken: 300 - timeLeft,
      timeTakenForQuestions, // Pass time taken for each question
      classLevel: classLevel,
      results: resultsSummary,
      email: email,
      name: userName,
    };

    try {
      const response = await axios.post(
        "https://learnospherebackend.learnosphere.in/api/route/submitbasicquestions", //https://learnospherebackend.learnosphere.in
        quizData
      );

      if (!response.data) {
        throw new Error("Failed to submit results");
      }

      setResults(resultsSummary);
      setIsSubmitted(true);
      setIncorrectAnswers(resultsSummary.filter((result) => !result.isCorrect));
      setTimerActive(false);

      if (correctAnswersCount >= 0) {
        setIsModalOpen(false);
        setIsDownloadAppOpen(true); // open app download modal instead of certificate
      } else {
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error submitting results:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [
    questions,
    selectedOptions,
    timeLeft,
    timeTakenForQuestions,
    classLevel,
    email,
    userName,
    isSubmitting,
  ]);

  // Timer countdown logic
  useEffect(() => {
    if (timeLeft > 0 && timerActive) {
      const timer = setTimeout(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1;
          localStorage.setItem(`quiz-time-${classLevel}`, newTime);
          return newTime;
        });

        // Track time spent on each question
        const timeSpent = Math.floor((Date.now() - startTime) / 1000);
        setTimeTakenForQuestions((prevTimes) => {
          const updatedTimes = [...prevTimes];
          updatedTimes[currentQuestion] = timeSpent;
          return updatedTimes;
        });
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timerActive && timeLeft <= 0) {
      handleSubmit();
    }
  }, [
    timeLeft,
    timerActive,
    handleSubmit,
    classLevel,
    currentQuestion,
    startTime,
  ]);
  const openModal = () => {
    setIsModalOpen(true);
    setTimerActive(false); // Pause the timer
  };

  // Handle option selection
  const handleOptionClick = (option) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[currentQuestion] = option;
    setSelectedOptions(updatedSelectedOptions);
  };

  // Navigation between questions
  const handleNextClick = () => {
    if (currentQuestion === 0 && !userName) {
      openModal(); // Open modal for name input on the first question
      return;
    }

    if (selectedOptions[currentQuestion]) {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setStartTime(Date.now()); // Update start time for the next question
      } else {
        const selectedCount = selectedOptions.filter(
          (option) => option !== undefined
        ).length;
        if (selectedCount < 6) {
          alert("Please select at least 6 questions before submitting.");
        } else {
          handleSubmit();
        }
      }
    }
  };

  const handlePreviousClick = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setStartTime(Date.now());
    }
  };

  useEffect(() => {
    setTimerActive(true);
    setStartTime(Date.now());
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      remainingSeconds < 10 ? "0" : ""
    }${remainingSeconds}`;
  };

  if (questions.length === 0) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>Learnosphere Quiz - Basic Questions</title>
        <meta
          name="description"
          content="Take a quiz to test your knowledge in various subjects at Learnosphere."
        />
        <meta
          name="keywords"
          content="free online quiz,online quiz,practice quiz,iq test free,quiz maker"
        />
      </Head>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmitSuccess={handleModalSubmitSuccess} // Pass the function
      />

      <div className="flex justify-center items-center h-screen p-8">
        <div className="w-full overflow-scroll md:overflow-hidden bg-white rounded-md">
          <h2 className="text-xl font-bold mb-4">
            Learn<b className="font-bold text-orange-600">O</b>sphere Quiz
          </h2>

          <div className="mb-4 flex flex-col h-screen scrollbar-hide md:flex-row gap-2 md:gap-20">
            <div className=" absolute top-6 bg-gray-50 text-gray-500 border border-gray-300 p-2 rounded-md">
              {userName && (
                <h2 className="font-bold text-[1.1em]">Name:{userName}</h2>
              )}
              {/* Rest of the quiz logic */}
            </div>
            <div className="w-full md:w-[50%] mt-14 md:mt-0 flex items-center">
              <h3 className="text-lg font-semibold mb-2">
                Question {currentQuestion + 1}:{" "}
                {questions[currentQuestion].question}
                <Image
                  className=" hidden md:flex h-60 w-60"
                  src={picture}
                  alt=""
                />
              </h3>
            </div>
            <div className="w-full md:w-[50%] flex flex-col bg-gray-100 rounded-lg p-2 md:p-6">
              <div className="text-xl font-semibold">
                {formatTime(timeLeft)}
              </div>
              {questions[currentQuestion].options.map((option, index) => (
                <div key={index} className="mb-2 mt-1 md:mt-4">
                  <button
                    className={`w-full rounded-xl text-left border p-7 ${
                      selectedOptions[currentQuestion] === option
                        ? "bg-green-500 text-white"
                        : "bg-white"
                    }`}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </button>
                </div>
              ))}
              <div className="flex justify-between mt-4">
                <button
                  className={`p-2 mb-4 rounded-lg text-white ${
                    currentQuestion === 0 ? "bg-gray-400" : "bg-orange-600"
                  }`}
                  onClick={handlePreviousClick}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </button>
                <button
                  className={`p-2 rounded-lg text-white bg-orange-600 mb-4 ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={handleNextClick}
                  disabled={isSubmitting}
                >
                  {currentQuestion < questions.length - 1
                    ? "Next"
                    : isSubmitting
                    ? "Submitting..."
                    : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed bg-white shadow-2xl flex items-center justify-center">
          {isSubmitted &&
            (isDownloadAppOpen ? (
              <DownloadAppModal
                isOpen={isDownloadAppOpen}
                onClose={() => setIsDownloadAppOpen(false)}
              />
            ) : (
              <Summary
                results={results}
                onClose={() => setIsModalOpen(false)}
              />
            ))}
        </div>
      </div>
    </>
  );
};

const Main = () => (
  <Suspense fallback={<Loading />}>
    <QuestionComponent />
  </Suspense>
);

export default Main;