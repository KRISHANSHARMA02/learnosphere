"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import picture from '@/public/image for website.png';
import Head from 'next/head';
import { set } from 'date-fns';
import { RxCross1 } from 'react-icons/rx';
import Link from 'next/link';

const Question = () => {
  const { data: session, status } = useSession();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(300);
  const [showSummary, setShowSummary] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const [grade, setGrade] = useState(null);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuizComponent
        session={session}
        status={status}
        profileData={profileData}
        setProfileData={setProfileData}
        currentQuestion={currentQuestion}
        setCurrentQuestion={setCurrentQuestion}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        showSummary={showSummary}
        setShowSummary={setShowSummary}
        questions={questions}
        setQuestions={setQuestions}
        timeLeft={timeLeft}
        setTimeLeft={setTimeLeft}
        grade={grade}
        setGrade={setGrade}
      />
    </Suspense>
  );
};

const QuizComponent = ({
  session,
  status,
  profileData,
  setProfileData,
  currentQuestion,
  setCurrentQuestion,
  selectedOptions,
  setSelectedOptions,
  showSummary,
  setShowSummary,
  questions,
  setQuestions,
  timeLeft,
  setTimeLeft,
  grade,
  setGrade
}) => {
  const searchParams = useSearchParams();
  const queryDifficulty = searchParams.get('difficulty');
  const subject = searchParams.get('subject');
  const router = useRouter();

  useEffect(() => {
    const fetchProfileData = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const response = await axios.post(
            `${WEB_BACKEND_URL}/api/route/getStudentByEmail`,
            { gmail: session.user.email }
          );
          const profile = response.data;
          setProfileData(profile);
          setGrade(profile?.grade); // Store the grade
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      }
    };

    fetchProfileData();
  }, [session, status, setProfileData, setGrade]);

  // Fetch questions based on grade, difficulty, and subject
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        if (!grade || !subject) return;

        // Convert 'Grade 11' format to '11' if needed (assuming it's passed as 'Grade 11')
        const numericGrade = grade.replace('Grade ', '');

        const previousQuestions = localStorage.getItem('previousQuestions');
        const previousQuestionsIds = previousQuestions ? JSON.parse(previousQuestions) : []

        const response = await fetch(
          `${WEB_BACKEND_URL}/api/route/questions/${numericGrade}/${queryDifficulty || 'easy'}/${subject}`
        );

        if (!response.ok) throw new Error('Failed to fetch questions');

        const data = await response.json();

        const newQuestions = data.filter((question) => !previousQuestionsIds.includes(question.id))

        // Limit the number of questions to 10
        const limitedQuestions =  newQuestions.slice(0, 10);
        const currentQuestionIds = limitedQuestions.map((question) => question.id)
        localStorage.setItem('previousQuestions',JSON.stringify([...previousQuestionsIds, ...currentQuestionIds]))
        setQuestions(limitedQuestions)
        setSelectedOptions(new Array(limitedQuestions.length).fill(undefined)); // Initialize selectedOptions array
        
  setCorrectAnswers(data.map((q) => q.answer));
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [grade, queryDifficulty, subject , setQuestions, setSelectedOptions]);
  

  const [answerSummary, setAnswerSummary] = useState([]);
const [totalScore, setTotalScore] = useState(0);

const handleSubmit = async () => {
  try {
    // ✅ Pehle totalScore calculate karo
    let score = 0;
    const summary = questions.map((question, index) => {
      const isCorrect = selectedOptions[index] === question.answer;
      if (isCorrect) score += 1; // Correct answer == 1 point

      return {
        question: question.question,
        selectedOption: selectedOptions[index] || "Not Answered",
        answer: question.answer,
      };
    });

    // ✅ Fir backend ko request bhejo totalScore ke saath
    const response = await axios.post(`${WEB_BACKEND_URL}/api/route/submitAnswer`, {
      email: profileData?.gmail, 
      grade,
      subject,
      difficulty: queryDifficulty,
      answers: questions.map((question, index) => ({
        questionNo: index + 1,
        selectedOption: selectedOptions[index] || null,
      })),
      totalScore: score, // Ab correct totalScore jaayega
    });

    if (response.status === 200) {
      setAnswerSummary(summary);
      setTotalScore(score); // ✅ Total score frontend me bhi set karo
      setShowSummary(true);
    }
  } catch (error) {
    console.error("Error submitting quiz:", error);
    alert("Failed to submit quiz. Please try again.");
  }
};



  useEffect(() => {
    if (timeLeft > 0 && !showSummary) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (!showSummary) {
      handleSubmit();
    }
  }, [timeLeft, showSummary] );

  const handleOptionClick = (option) => {
    const updatedSelectedOptions = [...selectedOptions];
    updatedSelectedOptions[currentQuestion] = option; // Save the selected option for the current question
    setSelectedOptions(updatedSelectedOptions);
  };

  const handleNextClick = () => {
    if (selectedOptions[currentQuestion]) {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handlePreviousClick = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  return (
    <div className=' font-Poppins flex items-center '>
    <Head>
      <meta name="robots" content="noindex, nofollow" />
    </Head>
    
    <div className='w-full overflow-scroll md:overflow-hidden p-8 bg-white rounded-md'>
      
      <h2 className='text-xl font-bold mb-4'>
        Learn<b className='font-bold text-orange-600'>O</b>sphere Quiz
      </h2>
  
      {!showSummary ? (
        // Quiz Form
        <div className='mb-4 flex flex-col md:flex-row gap-2 md:gap-20'>
          <div className='w-full md:w-[50%] flex items-center'>
            <h3 className='text-lg font-semibold mb-2'>
              Question {currentQuestion + 1}: {questions[currentQuestion].question}
              {questions[currentQuestion].image_url && (
                <Image width={1000} height={1000} className='h-auto w-auto' 
                  src={questions[currentQuestion].image_url} 
                  alt={`Question ${currentQuestion + 1}`} />
              )}
            </h3>
          </div>
          <div className='w-full md:w-[50%]'>
            <div>
              <div className='mb-4'>
                <p className='text-red-600 font-semibold'>Time Left: {formatTime(timeLeft)}</p>
              </div>
              {questions[currentQuestion].options.map((option, index) => (
                <label key={index} className={`block w-full text-left px-4 py-6 mt-1 md:mt-4 mb-2 border rounded-md 
                  ${selectedOptions[currentQuestion] === option ? 'bg-green-500 text-white' : 'bg-white border-gray-300 text-black'}`}>
                  <input
                    type="radio"
                    name={`question-${currentQuestion}`}
                    value={option}
                    checked={selectedOptions[currentQuestion] === option}
                    onChange={() => handleOptionClick(option)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
            <div className='flex justify-between mt-6 md:mt-40'>
              <button
                onClick={handlePreviousClick}
                className={`bg-gray-500 text-white px-4 py-2 rounded-md ${currentQuestion === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-600'}`}
                disabled={currentQuestion === 0}
              >
                Previous
              </button>
              <button
                onClick={currentQuestion < questions.length - 1 ? handleNextClick : handleSubmit}
                className='bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600'
              >
                {currentQuestion < questions.length - 1 ? 'Next' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Summary Section (Only visible after submit)
        <div className="mt-8 flex justify-center h-auto items-center gap-6  p-4  rounded-md ">
      
      
      <div className='w-[40%]'>
      <p className="text-xl w-[50%] text-center m-auto rounded-xl  font-bold text-white bg-orange-600 p-6  mb-4">
      Total Score: {totalScore} / {questions.length}
      </p>
      </div>
      <div className='w-[60%]'>
      <Link className='flex justify-end mt-4 text-orange-600' href = "/Userdashboard/Practicequestion"><RxCross1 size={24} /></Link>
      
        <table className=" border-collapse overflow-scroll h-[80vh] w-full  border  border-gray-300">
          <thead>
            <tr className="bg-orange-600 text-white font-semibold">
              <th className="border border-gray-300 px-4 py-2">Q No.</th>
              <th className="border border-gray-300 px-4 py-2">Question</th>
              <th className="border border-gray-300 px-4 py-2">Your Answer</th>
              <th className="border border-gray-300 px-4 py-2">Correct Answer</th>
            </tr>
          </thead>
          <tbody>
            {answerSummary.map((item, index) => (
              <tr key={index} className="text-center text-[.9em]">
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{item.question}</td>
                <td className={`border border-gray-300 px-4 py-2 ${item.selectedOption === item.answer ? 'text-green-500' : 'text-red-500'}`}>
                  {item.selectedOption}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-green-500">{item.answer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
      
      
      )}
  
    </div>
  </div>
  
  );
};

export default Question;
