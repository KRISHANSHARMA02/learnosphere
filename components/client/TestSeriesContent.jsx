"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaClock, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { useSearchParams } from 'next/navigation';

export default function LiveExamPage() {
  // 🚀 1. ID ko EKDUM TOP par nikal, taaki poore page ko dikhe!
  const searchParams = useSearchParams();
  const examId = searchParams.get("id");

  const [examData, setExamData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); 
  const [timeLeft, setTimeLeft] = useState(180 * 60); 
  const [loading, setLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [testResult, setTestResult] = useState(null);

  // 🚀 2. API se Paper Fetch Karna
  useEffect(() => {
    // Yahan se window.location wali line hata di, kyunki examId upar se mil jayega
    if (!examId) {
      console.error("Exam ID not found in URL!");
      setLoading(false);
      return;
    }

    axios.get(`${WEB_BACKEND_URL}/api/route/exam/${examId}`)
      .then((res) => {
        const data = res.data;
        setExamData(data.examDetails);

        let flatQuestions = [];
        const paper = data.paper;

        if (paper) {
          // 🧠 UPDATED UNIVERSAL PARSER
          // FORMAT 1: Jo tere NAYE SCREENSHOT mein hai (paper.subjects array)
          if (paper.subjects && Array.isArray(paper.subjects)) {
            paper.subjects.forEach((subObj) => {
              if (subObj.sections) {
                subObj.sections.forEach((sec) => {
                  if (sec.questions) {
                    sec.questions.forEach((q) => {
                      let marks = "N/A";
                      if (sec.marking_scheme) {
                        marks = `+${sec.marking_scheme.correct}/${sec.marking_scheme.incorrect}`;
                      }
                      flatQuestions.push({
                        ...q,
                        qno: q.qno || q.q_no || flatQuestions.length + 1,
                        subject: subObj.subject || "General",
                        sectionName: sec.section || "Section I",
                        marking: marks
                      });
                    });
                  }
                });
              }
            });
          }
          // FORMAT 2: Array of subjects directly
          else if (Array.isArray(paper)) {
            paper.forEach((subObj) => {
              if (subObj.sections) {
                subObj.sections.forEach((sec) => {
                  if (sec.questions) {
                    sec.questions.forEach((q) => {
                      let marks = "N/A";
                      if (sec.marking_scheme) {
                        marks = `+${sec.marking_scheme.correct}/${sec.marking_scheme.incorrect}`;
                      }
                      flatQuestions.push({
                        ...q,
                        qno: q.qno || q.q_no || flatQuestions.length + 1,
                        subject: subObj.subject || "General",
                        sectionName: sec.section || "Section I",
                        marking: marks
                      });
                    });
                  }
                });
              }
            });
          } 
          // FORMAT 3: Narayana format (Direct mcq_questions array)
          else if (paper.mcq_questions) {
            paper.mcq_questions.forEach((q) => {
              flatQuestions.push({
                ...q,
                qno: q.q_no || q.qno || flatQuestions.length + 1,
                subject: q.subject || "General",
                sectionName: "MCQ Section",
                marking: "+3/-1"
              });
            });
          } 
          // FORMAT 4: Oldest Format (Object keys like 'mathematics')
          else {
            const subjects = Object.keys(paper);
            subjects.forEach((sub) => {
              if (paper[sub] && paper[sub].sections) {
                paper[sub].sections.forEach((sec) => {
                  if (sec.questions) {
                    sec.questions.forEach((q) => {
                      flatQuestions.push({
                        ...q,
                        qno: q.qno || q.q_no || flatQuestions.length + 1,
                        subject: sub.toUpperCase(),
                        sectionName: sec.section,
                        marking: sec.marking || "+4/-1"
                      });
                    });
                  }
                });
              }
            });
          }
        }

        setQuestions(flatQuestions);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching paper:", err);
        setLoading(false);
      });
  }, [examId]); // <-- Yahan examId ko dependency array mein daal diya

  // 🚀 3. Ulta Timer (Countdown) Logic
  useEffect(() => {
    if (loading || isSubmitted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [loading, isSubmitted]);

  // Format Time (HH:MM:SS)
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // 🚀 4. Answer Select Handle Karna
  const handleOptionSelect = (qno, optionKey) => {
    setAnswers({ ...answers, [qno]: optionKey });
  };

  const handleInputAnswer = (qno, value) => {
    setAnswers({ ...answers, [qno]: value });
  };

  // 🚀 5. Final Submit API Call
  const submitTestFinal = async () => {
    if (!window.confirm("Are you sure you want to submit the test? You cannot change your answers later.")) return;

    try {
      setLoading(true);
      // Ab yahan examId aaram se mil jayega bina kisi error ke! 😎
      const res = await axios.post(`${WEB_BACKEND_URL}/api/route/submit`, {
        examId: examId, 
        studentAnswers: answers
      });
      
      setTestResult(res.data.result);
      setIsSubmitted(true);
      setLoading(false);
    } catch (error) {
      console.error("Submission failed", error);
      setLoading(false);
      alert("Error submitting test! Check console.");
    }
  };

  if (loading && !isSubmitted) {
    return <div className="min-h-screen flex items-center justify-center text-xl font-bold text-orange-600">Loading Exam... Best of Luck! 🚀</div>;
  }

  // ================= RESULT SCREEN =================
  if (isSubmitted && testResult) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 font-sans">
        <div className="bg-white p-10 rounded-2xl shadow-xl max-w-lg w-full text-center border border-gray-100">
          <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-5xl">
            🏆
          </div>
          <h1 className="text-3xl font-black text-gray-800 mb-2">Test Submitted!</h1>
          <p className="text-gray-500 font-medium mb-8">Here is your performance summary</p>
          
          <div className="bg-orange-50 rounded-xl p-6 mb-8 border border-orange-100">
            <p className="text-sm text-orange-600 font-bold uppercase tracking-widest mb-1">Total Score</p>
            <p className="text-5xl font-black text-gray-900">
              {testResult.score} <span className="text-2xl text-gray-400">/ {testResult.maxMarks}</span>
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-green-50 p-4 rounded-xl border border-green-100">
              <p className="text-xl font-bold text-green-600">{testResult.correct}</p>
              <p className="text-xs text-gray-500 font-bold uppercase mt-1">Correct</p>
            </div>
            <div className="bg-red-50 p-4 rounded-xl border border-red-100">
              <p className="text-xl font-bold text-red-600">{testResult.wrong}</p>
              <p className="text-xs text-gray-500 font-bold uppercase mt-1">Wrong</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-xl border border-gray-200">
              <p className="text-xl font-bold text-gray-600">{testResult.unattempted}</p>
              <p className="text-xs text-gray-500 font-bold uppercase mt-1">Skipped</p>
            </div>
          </div>

          <button onClick={() => window.location.href = '/test-series'} className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-4 rounded-xl transition-all">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">Error: Paper load nahi ho paya! Format check karein.</div>;
  }

  const currentQ = questions[currentIndex];

  // ================= MAIN EXAM UI =================
  return (
    <div className="bg-gray-100 min-h-screen font-sans flex flex-col selection:bg-orange-200">
      {/* TOP HEADER (Timer & Info) */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-3 flex justify-between items-center sticky top-0 z-50">
        <div>
          <h1 className="text-xl font-black text-gray-800">{examData?.examName || "Live Exam"}</h1>
          <p className="text-xs text-gray-500 font-bold uppercase">{currentQ.subject} • {currentQ.sectionName}</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg border border-red-100 font-mono text-xl font-bold tracking-widest shadow-inner">
            <FaClock className="text-red-500" /> {formatTime(timeLeft)}
          </div>
          <button 
            onClick={submitTestFinal}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-colors"
          >
            Submit Test
          </button>
        </div>
      </div>

      {/* MAIN EXAM AREA */}
      <div className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-70px)]">
        
        {/* LEFT PANEL: Question Area */}
        <div className="flex-grow bg-white m-4 rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-y-auto">
          {/* Question Header */}
          <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 flex justify-between items-center">
            <span className="font-bold text-lg text-gray-800">Question {currentQ.qno}</span>
            <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full border border-blue-100">
              Marking: {currentQ.marking}
            </span>
          </div>

          {/* Question Content */}
          <div className="p-6 md:p-8 flex-grow">
            {currentQ.stem && (
              <div className="mb-6 p-4 bg-orange-50 border-l-4 border-orange-400 text-gray-800 rounded-r-lg font-medium">
                <span className="font-bold text-orange-600 block mb-1">Paragraph:</span>
                {currentQ.stem}
              </div>
            )}
            
            <p className="text-lg text-gray-800 mb-8 font-medium leading-relaxed whitespace-pre-wrap">
              {currentQ.question}
            </p>

            {/* Options Rendering */}
            {currentQ.options && Object.keys(currentQ.options).length > 0 ? (
              <div className="space-y-3">
                {Object.entries(currentQ.options).map(([key, value]) => (
                  <div 
                    key={key}
                    onClick={() => handleOptionSelect(currentQ.qno, key)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all flex items-start gap-3 ${
                      answers[currentQ.qno] === key 
                        ? "border-orange-500 bg-orange-50 shadow-sm" 
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <div className={`w-6 h-6 shrink-0 rounded-full border-2 flex items-center justify-center font-bold text-xs ${
                      answers[currentQ.qno] === key ? "border-orange-500 bg-orange-500 text-white" : "border-gray-300 text-gray-500"
                    }`}>
                      {key}
                    </div>
                    <span className="text-gray-700">{value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-4">
                <label className="block text-sm font-bold text-gray-700 mb-2">Enter your answer:</label>
                <input 
                  type="text" 
                  value={answers[currentQ.qno] || ""}
                  onChange={(e) => handleInputAnswer(currentQ.qno, e.target.value)}
                  placeholder="Type answer here..."
                  className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                />
              </div>
            )}
          </div>

          {/* Bottom Navigation */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between mt-auto">
            <button 
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-100 disabled:opacity-50"
            >
              Previous
            </button>
            <button 
              onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
              disabled={currentIndex === questions.length - 1}
              className="px-8 py-2 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 shadow-sm disabled:opacity-50"
            >
              Save & Next
            </button>
          </div>
        </div>

        {/* RIGHT PANEL: Question Palette */}
        <div className="w-full md:w-80 bg-white m-4 ml-0 rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden shrink-0">
          <div className="bg-gray-800 text-white px-4 py-3 font-bold text-center">
            Question Palette
          </div>
          <div className="p-4 grid grid-cols-5 gap-2 overflow-y-auto">
            {questions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-10 h-10 rounded-full font-bold text-sm flex items-center justify-center transition-all ${
                  currentIndex === idx 
                    ? "ring-4 ring-orange-200 border-2 border-orange-500 text-orange-600" 
                    : answers[q.qno] 
                      ? "bg-green-500 text-white shadow-sm" 
                      : "bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200" 
                }`}
              >
                {q.qno}
              </button>
            ))}
          </div>
          
          {/* Legend */}
          <div className="p-4 border-t border-gray-200 bg-gray-50 space-y-2 text-sm mt-auto">
             <div className="flex items-center gap-2 text-gray-600 font-medium">
               <div className="w-4 h-4 rounded-full bg-green-500"></div> Answered
             </div>
             <div className="flex items-center gap-2 text-gray-600 font-medium">
               <div className="w-4 h-4 rounded-full border-2 border-orange-500"></div> Current
             </div>
             <div className="flex items-center gap-2 text-gray-600 font-medium">
               <div className="w-4 h-4 rounded-full bg-gray-100 border border-gray-300"></div> Not Answered
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}