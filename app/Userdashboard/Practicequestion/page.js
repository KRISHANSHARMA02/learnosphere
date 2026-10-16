"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react"; // Added missing import for useSession
import axios from "axios"; // Added axios import
import Science from "@/public/Science.png";
import Math from "@/public/math.jpg";
import Image from "next/image";
import Link from "next/link";
import Sciencetest from "../Sciencetest/page";
import mathtest from "../Mathtest/page";
import { FaRegCircleCheck } from "react-icons/fa6";
import { LiaRunningSolid } from "react-icons/lia";

import Head from "next/head";
import { FaBookOpen, FaGooglePlay, FaAppStore, FaArrowRight, FaRocket, FaFire, FaCheckCircle, FaStar } from "react-icons/fa";
import StudentAppImg from "@/public/studentApp.png";

const PracticeQuestion = () => {
  const { data: session, status } = useSession();
  const [grade, setGrade] = useState(null);
  const [stream, setStream] = useState(null);
  const [loading, setLoading] = useState(false);
   const [selectedCard, setSelectedCard] = useState(null);
  const [selectedSubjects2, setSelectedSubjects2] = useState([]);
  

   useEffect(() => {
     const fetchGradeandStream = async () => {
       if (status === "authenticated" && session?.user?.email) {
         try {
           const response = await axios.post(
             "https://learnospherebackend.learnosphere.in/api/route/getStudentByEmail",
             { gmail: session.user.email }
           );
           setGrade(response.data.grade);
           setStream(response.data.stream);
         } catch (error) {
           console.error("Error Fetching Grade:", error);
         }
       }
     };
     fetchGradeandStream();
   }, [session, status]);

   const handleCardClick = (index, selectedSubject) => {
    setSelectedCard(index);
    // You can also use the selectedSubject for any additional logic you want to perform
  };
 
   // Fetch subjects based on grade
   useEffect(() => {
    const fetchSubjects = async () => {
      if (grade) {
        setLoading(true);
        try {

         const params = {grade}
         if(stream){
           params.stream = stream;
         }
          const response = await axios.get(
            `https://learnospherebackend.learnosphere.in/api/route/getpracticeQuiz`,
            { params }
          );
          setSelectedSubjects2(response.data.selectedSubjects2 || []); // Default to an empty array if undefined
        } catch (error) {
        } finally {
          setLoading(false);
        }
      }
    };
    fetchSubjects();
  }, [grade,stream]);
   
     const SubjectImages1 = {
       Math: (
         <Image
           className="w-9 h-9 object-contain"
           width={48}
           height={48}
           src="/25673048_vj2f_b439_220316.svg"
           alt="Mathematics"
         />
       ),
       Science: (
         <Image
           className="w-9 h-9 object-contain"
           width={48}
           height={48}
           src="/7678843_3737837.jpg"
           alt="Science"
         />
       ),
       SocialScience: (
         <Image
           className="w-9 h-9 object-contain"
           width={48}
           height={48}
           src="/27953233_social_science16.svg"
           alt="Social Science"
         />
       ),
       English: (
         <Image
           className="w-9 h-9 object-contain"
           width={48}
           height={48}
           src="/28732095_7480521.svg"
           alt="English"
         />
       ),
       Hindi: (
         <Image
           className="w-9 h-9 object-contain"
           width={48}
           height={48}
           src="/hindi1.jpeg"
           alt="Hindi"
         />
       ),
       Chemistry: (
         <Image
           className="w-9 h-9 object-contain"
           width={48}
           height={48}
           src="/chemistry-svgrepo-com.svg"
           alt="Chemistry"
         />
       ),
       Biology: (
         <Image
           className="w-9 h-9 object-contain"
           width={48}
           height={48}
           src="/petri-dish-biology-svgrepo-com.svg"
           alt="Biology"
         />
       ),
       Physics: (
         <Image
           className="w-9 h-9 object-contain"
           width={48}
           height={48}
           src="/physics-nuclear-svgrepo-com.svg"
           alt="Physics"
         />
       ),
       Economics: (
         <Image
           className="w-9 h-9 object-contain"
           width={48}
           height={48}
           src="/Economics.png"
           alt="Economics"
         />
       ),
       PoliticalScience: (
         <Image
           className="w-9 h-9 object-contain"
           width={48}
           height={48}
           src="/PoliticalScience.jpeg"
           alt="Political Science"
         />
       ),
       Accountancy: (
         <Image
           className="w-9 h-9 object-contain"
           width={48}
           height={48}
           src="/Accountancy.jpeg"
           alt="Accountancy"
         />
       ),
       BusinessStudies: (
         <Image
           className="w-9 h-9 object-contain"
           width={48}
           height={48}
           src="/BussinessStudies.jpeg"
           alt="Business Studies"
         />
       ),
     };

       const normalizeSubjectKey = (subject) => subject.replace(/\s+/g, "");
     
       // Get subject image or default icon
       const getSubjectImages = (subject) => {
         const normalizedSubject = normalizeSubjectKey(subject);
         return (
           SubjectImages1[normalizedSubject] || (
             <FaBookOpen size={30} className="text-gray-500" />
           )
         );
       };
   


  return (
    <>

      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

    <div className="min-h-screen p-4 md:p-6 bg-slate-50">
      {/* Header */}
      <div className="mb-8">
        <span className="text-orange-500 font-bold uppercase tracking-wider text-xs block mb-1">
          Interactive Self-Assessment
        </span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
          Practice Questions & Chapter Tests
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Select a subject to take a quick diagnostic quiz or unlock 1,000+ chapter-wise tests on the mobile app.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Subject Test Cards */}
        <div className="lg:col-span-7">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-5 bg-orange-500 rounded-full inline-block"></span>
            Available Subject Quizzes
          </h2>

          {loading ? (
            <div className="p-12 text-center text-gray-500 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-2"></div>
              Loading subject tests...
            </div>
          ) : selectedSubjects2.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {selectedSubjects2.map((subject, index) => (
                <Link
                  key={index}
                  href={`/Userdashboard/Sciencetest?subject=${encodeURIComponent(subject.subject)}`}
                  className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-xl hover:border-orange-200 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center p-2 shrink-0 group-hover:scale-105 transition-transform">
                      {getSubjectImages(subject.subject)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-base group-hover:text-orange-600 transition-colors">
                        {subject.subject}
                      </h3>
                      <span className="text-xs text-gray-400 font-medium">
                        Chapter Practice Quiz
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full">
                      Free Quiz
                    </span>
                    <span className="text-xs font-bold text-gray-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Start Test <FaArrowRight size={10} className="text-orange-500" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500 bg-white rounded-2xl border border-gray-100 shadow-sm">
              No specific subjects found for this grade. Try our comprehensive app drills!
            </div>
          )}
        </div>

        {/* Right: Mobile App Promotion Showcase */}
        <div className="lg:col-span-5">
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-700 relative overflow-hidden flex flex-col justify-between h-full">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 border border-orange-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <FaRocket /> 1,000+ App Quizzes
              </div>

              <h3 className="text-2xl font-extrabold text-white leading-tight">
                Unlock 20+ Free Quizzes per Subject on the App!
              </h3>

              <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                Take timed mocks, compete on state leaderboards, and get instant AI solution breakdowns for every question.
              </p>

              <div className="space-y-2.5 pt-2">
                {[
                  "Adaptive difficulty (Easy, Medium, Hard)",
                  "Instant concept explanations & hints",
                  "Chapter-wise CBSE & ICSE test series",
                  "Detailed accuracy & speed analytics",
                ].map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-200">
                    <FaCheckCircle className="text-green-400 shrink-0" size={14} />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <a
                  href="https://play.google.com/store/apps/details?id=com.karotaraj.learnosphere_main"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-white text-gray-900 px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-orange-50 transition-all shadow"
                >
                  <FaGooglePlay className="text-green-600" size={16} /> Google Play
                </a>
                <a
                  href="https://apps.apple.com/in/app/learnosphere-learning-app/id6748979882"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-white/20 transition-all shadow"
                >
                  <FaAppStore size={18} /> App Store
                </a>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <Image
                src={StudentAppImg}
                alt="App Quiz Practice"
                width={190}
                height={190}
                className="object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default PracticeQuestion;
