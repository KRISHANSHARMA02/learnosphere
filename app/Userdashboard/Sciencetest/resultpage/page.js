"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Head from "next/head";

const ResultPage = () => {
  const router = useRouter();
  const [resultData, setResultData] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isCorrectArray, setIsCorrectArray] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  const [currentSummary, setCurrentSummary] = useState(null);

  const clearResults = () => {
    setResultData([]);
    setTotalScore(0);
    setQuestions([]);
    setSelectedOptions([]);
    setIsCorrectArray([]);
  };

  const fetchResults = async () => {
    clearResults();

    try {
      const response = await axios.get("https://learnospherebackend.learnosphere.in/api/route/fetchResult");

      if (response.data.success && Array.isArray(response.data.data)) {
        setResultData(response.data.data);
        
        const score = response.data.data.reduce((acc, result) => acc + result.score, 0);
        setTotalScore(score);

        const allQuestions = response.data.data.map(result => JSON.parse(result.questionNo)).flat();
        setQuestions(allQuestions);
        
        const allSelectedOptions = response.data.data.map(result => JSON.parse(result.selectedOptions)).flat();
        setSelectedOptions(allSelectedOptions);
        const allIsCorrectArray = response.data.data.map(result => JSON.parse(result.isCorrect)).flat();
        setIsCorrectArray(allIsCorrectArray);
      } else {
        console.error("Unexpected data format:", response.data);
        setResultData([]);
      }
    } catch (error) {
      console.error("Error fetching results:", error.message);
      setResultData([]);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [ ]);

  const handleViewAnswerKey = () => {
    // Prepare data for the summary
    const summaries = resultData.flatMap((result) => {
      const questionNumbers = JSON.parse(result.questionNo);
      const selectedOptions = JSON.parse(result.selectedOptions);
      const isCorrectArray = JSON.parse(result.isCorrect);
      const scoreArray = JSON.parse(result.scorePerQuestion);
      const correctAnswers = JSON.parse(result.correctAnswers); // Assuming you have this field from your API
  
      return questionNumbers.map((questionNo, qIndex) => {
        return {
          question: questionNo,
          selectedOption: selectedOptions[qIndex],
          correctAnswer: correctAnswers[qIndex], // Get correct answer from result
          correctness: isCorrectArray[qIndex] === '✔' ? "Correct" : "Incorrect", // Show correctness
          score: scoreArray[qIndex],
        };
      });
    });
  
    setCurrentSummary(summaries);
    setShowSummary(true); // Show the summary popup
  };
  
  

  const closeModal = () => {
    setShowSummary(false); // Close the summary popup
    setCurrentSummary(null); // Reset summary data
  };

  return (
    <div className="bg-gray-50 flex flex-col md:flex-row items-center justify-center w-full">
    <Head>
    <meta name="robots" content="noindex, nofollow" />
  </Head>
      <div className="bg-white rounded-lg p-8 flex justify-between w-full md:w-1/2">
        <div className="h-20 p-6 bg-orange-600 text-white font-extrabold rounded-2xl">
          <h3 className="text-lg font-bold ">Total Score: {totalScore}</h3>
        </div>
      </div>

      <div className="w-full md:w-1/2">
        <h3 className="text-lg font-bold mb-4">Your Result</h3>
        <div>
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2">Question No</th>
                <th className="px-4 py-2">Selected Option</th>
                <th className="px-4 py-2">Correctness</th>
                <th className="px-4 py-2">Score</th>
              </tr>
            </thead>
            <tbody>
              {resultData.map((result, index) => {
                const questionNumbers = JSON.parse(result.questionNo);
                const selectedOptions = JSON.parse(result.selectedOptions);
                const isCorrectArray = JSON.parse(result.isCorrect);
                const scoreArray = JSON.parse(result.scorePerQuestion);

                return questionNumbers.map((questionNo, qIndex) => (
                  <tr key={qIndex} className="border-b">
                    <td className="px-4 py-2">{questionNo}</td>
                    <td className="px-4 py-2">{selectedOptions[qIndex]}</td>
                    <td className="px-4 py-2">
                      {isCorrectArray[qIndex] === '✔' ? (
                        <span className="text-green-500">✔</span>
                      ) : (
                        <span className="text-red-500">✘</span>
                      )}
                    </td>
                    <td className="px-4 py-2">{scoreArray[qIndex]}</td>
                  </tr>
                ));
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-4">
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-green-500">✔</span> <span>Answered Correctly</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-red-500">✘</span> <span>Answered Incorrectly</span>
          </div>
        </div>

        <button onClick={handleViewAnswerKey} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
          View Answer Key
        </button>
      </div>

    
     {/* Summary Modal */}
{showSummary && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded-lg p-6 w-11/12 md:w-1/3">
      <h3 className="text-lg font-bold mb-4">Answer Key Summary</h3>
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2">Question</th>
            <th className="px-4 py-2">Selected Option</th>
            <th className="px-4 py-2">Correct Answer</th> {/* New column */}
            <th className="px-4 py-2">Correctness</th>
          </tr>
        </thead>
        <tbody>
          {currentSummary?.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-2">{item.question}</td>
              <td className="px-4 py-2">{item.selectedOption}</td>
              <td className="px-4 py-2">{item.correctAnswer}</td> {/* Display correct answer */}
              <td className="px-4 py-2">{item.correctness}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={closeModal} className="mt-4 bg-red-500 text-white py-2 px-4 rounded">
        Close
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default ResultPage;
