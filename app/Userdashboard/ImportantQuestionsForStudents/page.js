"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

const TopicsList = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [subject, setSubject] = useState(null);
  const [grade, setGrade] = useState(null);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [showSummary, setShowSummary] = useState(false);


  const [result, setResult] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleNext1 = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious1 = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const q = questions[currentQuestionIndex]; // Current question


  const handleOptionSelect = (questionId, optionKey) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: optionKey,
    }));
  };

  const handleNext = () => {
    if (!selectedOptions[questions[currentIndex].id]) {
      alert("Please select an option before proceeding.");
      return;
    }
  
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  
  const handlePrevious = () => {
   
    if (currentIndex < questions.length + 1) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  

  const handleSkip = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const subjectFromURL = urlParams.get("subject");
      if (subjectFromURL) {
        setSubject(subjectFromURL);
      }
    }
  }, []);

  useEffect(() => {
    const fetchGrade = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const response = await axios.post(
            "https://learnospherebackend.learnosphere.in/api/route/getStudentByEmail",
            { gmail: session.user.email }
          );
          setGrade(response.data.grade);
        } catch (error) {
          console.error("Error Fetching Grade:", error);
        }
      }
    };

    fetchGrade();
  }, [session, status]);

  useEffect(() => {
    if (grade && subject) {
      const fetchTopics = async () => {
        try {
          const response = await axios.post(
            "https://learnospherebackend.learnosphere.in/api/route/getTopicsForStudents",
            { grade, subject }
          );
          setTopics(response.data.topics || []);
        } catch (error) {
          console.error("Error Fetching Topics:", error.response?.data || error.message);
          setTopics([]);
        } finally {
          setLoading(false);
        }
      };

      fetchTopics();
    }
  }, [grade, subject]);

  const fetchQuestions = async (topic) => {
    setSelectedTopic(topic);
    setQuestions([]);
    setLoading(true);

    try {
      // Get previously fetched questions from localStorage
      let previousQuestionsIds = JSON.parse(localStorage.getItem('previousQuestions')) || [];

      const response = await axios.post(
        "https://learnospherebackend.learnosphere.in/api/route/getImportantQuestion",
        { grade, subject, topic }
      );

      const allQuestions = response.data.questions || [];

      // Filter out already fetched questions
      const newQuestions = allQuestions.filter(q => !previousQuestionsIds.includes(q.id));

      if (newQuestions.length === 0) {
        console.warn("No new questions available! Fetching fresh set.");
        previousQuestionsIds = []; // Reset previous questions if all are used
      }

      // Limit to 10 new questions
      const limitedQuestions = newQuestions.slice(0, 10);
      const currentQuestionIds = limitedQuestions.map(q => q.id);

      // Store updated previous questions list in localStorage
      localStorage.setItem('previousQuestions', JSON.stringify([...previousQuestionsIds, ...currentQuestionIds]));

      setQuestions(limitedQuestions);
    } catch (error) {
      console.error("Error Fetching Questions:", error.response?.data || error.message);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
};

  const handleSubmit = async () => {
    try {
      const formattedSelectedOptions = Object.values(selectedOptions); // Convert object values to an array
      const questionNumbers = Object.keys(selectedOptions).map(Number); // Convert question IDs to numbers
      
  
      const payload = {
        selectedOptions: formattedSelectedOptions, // Send as an array
        questionNo: questionNumbers, // Send question IDs
        grade,
        subject,
        topic: selectedTopic,
        userId: session.user.email, // Send email as userId
      };

  
      const response = await axios.post("https://learnospherebackend.learnosphere.in/api/route/submitResult", payload);
      setResult(response.data);
      setShowSummary(true)
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
  };
  

  const handleRetakeQuiz = () => {
    setSelectedOptions({}); // Clear selected answers
    setCurrentIndex(0); // Restart from the first question
    setShowSummary(false); // Show questions again
  };

  const handleBack = () => {
    setSelectedTopic(null);
    setQuestions([]);
    setSelectedOptions({});
    setCurrentIndex(0);
    setShowSummary(false);
  };
  
  return (
   <div className="p-6">
  {!selectedTopic ? (
    <>
      <h1 className="text-xl font-bold mb-4">Topics for {subject}</h1>
      {loading ? (
        <p>Loading...</p>
      ) : topics.length > 0 ? (
        <ul className="grid grid-cols-2 sm:grid-cols-2 gap-3 px-3 sm:px-10 mt-6">
          {topics.map((topic, index) => (
            <li
              key={index}
              className="text-md cursor-pointer text-orange-600  bg-gray-50 hover:bg-orange-600 hover:text-white p-3 hover:underline border border-gray-200 rounded-xl"
              onClick={() => fetchQuestions(topic)}
            >
              {topic}
            </li>
          ))}
        </ul>
      ) : (
        <p>No topics found.</p>
      )}
    </>
  ) : (
<div className="mt-6">
    <button className="mb-4 px-4 py-2 bg-gray-300 rounded text-black" onClick={handleBack}>
      ← Back
    </button>

    {!showSummary ? (
      <>
        <h2 className="text-lg font-semibold">Questions for {selectedTopic}</h2>
        {loading ? (
          <p>Loading questions...</p>
        ) : questions.length > 0 ? (
          <div className="mt-3">
            <div className="border p-2 sm:p-6 rounded-lg">
            <div className="flex flex-col sm:flex-row justify-between  bg-orange-100   p-4 rounded-lg">
            <span className="pl-2 sm:pl-10">
            <p className="text-md sm:text-lg font-bold mt-2 sm:mt-10 ">Question {currentIndex + 1}:</p>
            <p className="font-medium p-4 text-md sm:text-lg ">{questions[currentIndex].question}</p>
            </span>
              {q.imageUrls && q.imageUrls.length > 0 && (
   <div className="mt-4">
      {q.imageUrls.map((url, index) => (
         <Image key={index} width={200} height={200} src={url} alt={`Question ${q.id}`} className="w-full max-h-60 object-contain rounded-lg" />
      ))}
   </div>
)}
   </div>

              <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 p-2">
                {Object.entries(questions[currentIndex].options).map(([key, value]) => (
                  <li
                    key={key}
                    className={`p-4   cursor-pointer rounded ${
                      selectedOptions?.[questions[currentIndex].id] === key
                        ? "bg-green-500 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                    onClick={() => handleOptionSelect(questions[currentIndex].id, key)}
                  >
                    <strong>{key}:</strong> {value}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 flex gap-3">
              <button
                className="px-4 py-2 text-[.8em] sm:text-[1em] bg-blue-500 text-white rounded disabled:bg-gray-300"
                onClick={handleSkip}
                disabled={currentIndex >= questions.length - 1}
              >
                Skip
              </button>
              <button
                className="px-4 py-2 bg-orange-500 text-[.8em] sm:text-[1em] text-white rounded disabled:bg-gray-300"
                onClick={handlePrevious}
                disabled={currentIndex >= questions.length + 1}
              >
                Previous
              </button>
              {currentIndex < questions.length - 1 ? (
                <button className="px-4 py-2 bg-orange-500 text-[.8em] sm:text-[1em] text-white rounded" onClick={handleNext}>
                  Next
                </button>
              ) : (
                <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={handleSubmit}>
                  Submit
                </button>
              )}
            </div>
          </div>
        ) : (
          <p>No questions found.</p>
        )}
      </>
    ) : (
      // Summary Section
   <div className="p-2 sm:p-4 flex flex-col sm:flex-row gap-1 sm:gap-4 justify-between items-center">
  {/* Score Display */}
  <div className="text-center w-full sm:w-[40%] lg:w-[25%] p-2 sm:p-8">
   <p className="mb-2 font-extrabold rounded-lg border border-orange-600 text-[1.5em] text-orange-600 p-4">
  Score: {questions.filter(q => q.options[selectedOptions[q.id]] === q.correctAnswer).length} / {questions.length}
</p>

  </div>

  {/* Quiz Summary */}
  <div className="w-full sm:w-[55%] lg:w-[70%]">
    <h3 className="text-lg font-bold mb-2 text-center">Quiz Summary</h3>

    <div key={q.id} className="border p-6 rounded-lg mb-4 w-full h-full bg-gray-100">
   <div className="flex flex-col sm:flex-row justify-between   p-4 rounded-lg">
    <span>
    <p className="text-md font-bold mt-2 sm:mt-10">Question {currentQuestionIndex + 1}:</p>
    <p className="font-medium p-4 ">{q.question}</p>
    </span>
    {q.imageUrls && q.imageUrls.length > 0 && (
      <div className="mt-4">
      {q.imageUrls.map((url, index) => (
        <Image key={index} width={200} height={200} src={url} alt={`Question ${q.id}`} className="w-full max-h-60 object-contain rounded-lg" />
        ))}
        </div>
        )}
        </div>
        

 <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-2">
  {Object.entries(q.options).map(([key, value]) => {
    let isSelected = selectedOptions[q.id] === key;
    let isCorrect = value.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase(); // Compare value with correctAnswer
    let bgColor = "bg-gray-100"; // Default color

    if (isSelected) {
      bgColor = isCorrect ? "bg-green-500 text-white" : "bg-red-500 text-white"; // Green if correct, Red if wrong
    } else if (isCorrect) {
      bgColor = "bg-green-300 text-black"; // Show correct answer in light green
    }

    return (
      <li key={key} className={`p-4 cursor-pointer rounded ${bgColor}`}>
        <strong>{key}:</strong> {value}
      </li>
    );
  })}
</ul>

      {/* Show Explanation if Answer is Incorrect */}
   {selectedOptions[q.id] && q.options[selectedOptions[q.id]] !== q.correctAnswer ? (
  // Show explanation if the answer is incorrect
  <div className="mt-4 p-4 bg-yellow-100 border-l-4 border-yellow-500">
    <p className="text-yellow-900 font-medium">Explanation: {q.explanation}</p>
  </div>
) : selectedOptions[q.id] ? (
  // Show congratulatory message if the answer is correct
  <div className="mt-4 p-4 bg-green-100 border-l-4 border-green-500">
    <p className="text-green-900 font-medium">Explanation: {q.correctExplanation}</p>
  </div>
) : null}


    </div>

    {/* Navigation Buttons */}
    <div className="flex justify-between mt-4">
      <button
        className={`px-4 py-2 text-[.8em] sm:text-[1em] rounded ${currentQuestionIndex === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
        onClick={handlePrevious1}
        disabled={currentQuestionIndex === 0}
      >
        Previous
      </button>

      <button
        className={`px-4 py-2 text-[.8em] sm:text-[1em] rounded ${currentQuestionIndex === questions.length - 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
        onClick={handleNext1}
        disabled={currentQuestionIndex === questions.length - 1}
      >
        Next
      </button>
    </div>

    {/* Retake Quiz Button */}
    {currentQuestionIndex === questions.length - 1 && (
      <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded w-full" onClick={handleRetakeQuiz}>
        Retake Quiz
      </button>
    )}
  </div>
</div>

    )}
  </div>

  )}
</div>

  );
};

export default TopicsList;
