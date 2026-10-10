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
import { FaBookOpen } from "react-icons/fa";

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
       BusinessStudies: (
         <Image
           className="w-full h-20"
           width={100}
           height={100}
           src="/BussinessStudies.jpeg"
           alt="Physics"
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

    <div >
        
      <div className="flex flex-col  sm:flex-col md:flex-col lg:flex-row gap-8">
     
      <div>
      <div className="ml-0 md:ml-8 p-0 md:p-2 font-bold text-gray-800 ">
      <h1 className="text-[1.4em]">Start A Quiz For Practice</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2">
        {/* Loop through all cards and render them */}
        {selectedSubjects2.map((subject, index) => (
          <Link
            key={index}
            href={`/Userdashboard/Sciencetest?subject=${subject.subject}`} // Dynamic route for each subject
            onClick={() => handleCardClick(index, subject.subject)} // You can still handle card click without preventDefault
            className={`bg-white flex items-center flex-col min-w-[110px] sm:min-w-[150px] md:min-w-[150px] ml-2 md:ml-6 mb-10 border shadow-lg hover:shadow-xl ${
              selectedCard === index ? "border-2 border-orange-500" : ""
            }`}
          >
            <div className="flex justify-center  grid-cols-2 items-center bg-gray-50 p-4">
              {getSubjectImages(subject.subject)} {/* Replace with your image logic */}
            </div>
            <div className="p-4 flex items-center justify-around">
              <h3 className="text-sm font-bold text-gray-800">
                {subject.subject}
              </h3>
            </div>
          </Link>
        ))}
        
        </div>

        </div>

        <div className="w-full lg:w-[55%] flex flex-col gap-2 rounded-lg p-6 border-gray-300 border">
          <p className="font-bold flex items-center gap-2 text-[1.1em]">
            <FaRegCircleCheck size={20} className="text-orange-600" />
            Obtain comprehensive evaluation results
          </p>
          <p className="text-gray-700 px-8 text-[0.9em]">
            Obtain a comprehensive evaluation report that provides detailed
            insights into your performance and progress
          </p>
          <p className="font-bold flex items-center gap-2 text-[1.1em]">
            <FaRegCircleCheck size={20} className="text-orange-600 " />
            Complete section-specific quizzes to enhance understanding of
            concepts
          </p>
          <p className="text-gray-700 px-8 text-[0.9em]">
            Complete section-specific quizzes to deepen your understanding and
            mastery of the concepts
          </p>
          <p className="font-bold flex items-center gap-2 text-[1.1em]">
            <FaRegCircleCheck size={20} className="text-orange-600 " />
            Engage in practice exercises to strengthen your problem-solving
            skills
          </p>
          <p className="text-gray-700 px-8 text-[0.9em]">
            Engage in practice exercises to build and refine your
            problem-solving skills effectively
          </p>
          <div className="border-b relative border-gray-300 flex gap-11 md:gap-20 lg:gap-16   2xl:gap-20 mt-60 mx-2 md:mx-5">
            <div className="relative ">
              <p className="absolute bottom-0 border-r-2 flex border-gray-300 mx-2 xl:mx-6 2xl:mx-10 w-4 h-12">
                <LiaRunningSolid className="text-orange-300 absolute bottom-9" size={40} />
              </p>
            </div>
            <div>
              <p className="absolute bottom-0 border-r-2 flex border-gray-300 w-4 h-20 mx-2 xl:mx-6 2xl:mx-10 ">
                <LiaRunningSolid className="text-orange-300 absolute bottom-16" size={40} />
              </p>
            </div>
            <div>
              <p className="absolute bottom-0 border-r-2 flex border-gray-300 w-4 h-28 mx-2 xl:mx-6 2xl:mx-10 ">
                <LiaRunningSolid className="text-orange-400 absolute bottom-24" size={40} />
              </p>
            </div>
            <div>
              <p className="absolute bottom-0 border-r-2 flex border-gray-300 w-4 h-36 mx-2 xl:mx-6 2xl:mx-10 ">
                <LiaRunningSolid className="text-orange-500 absolute bottom-32" size={40} />
              </p>
            </div>
            <div>
              <p className="absolute bottom-0 border-r-2 flex border-gray-300 w-4 h-44 mx-2 xl:mx-6 2xl:mx-10">
                <LiaRunningSolid className="text-orange-600 absolute bottom-40" size={40} />
              </p>
            </div>
            <div>
              <p className="absolute bottom-0 border-r-2 flex border-gray-300 w-4 h-52 mx-2 xl:mx-6 2xl:mx-10 ">
                <LiaRunningSolid className="text-orange-600 absolute bottom-48" size={40} />
              </p>
            </div>
          </div>
          <div className="flex">
            <p className="mx-2 md:mx-8 lg:mx-6  text-[.6em] md:text-[.7em] w-10 md:w-10 lg:w-16 2xl:w-20">Goal-setting</p>
            <p className="mx-1 md:mx-4 lg:mx-2 text-[.6em] md:text-[.7em] w-10 md:w-10 lg:w-12 2xl:w-16">Planning</p>
            <p className="mx-1 md:mx-4 lg:mx-2 text-[.6em] md:text-[.7em] w-10 md:w-10 lg:w-12 2xl:w-16">Research</p>
            <p className="mx-1 md:mx-4 lg:mx-2 text-[.6em] md:text-[.7em] w-10 md:w-10 lg:w-12 2xl:w-16">Strategy</p>
            <p className="mx-2 md:mx-4 lg:mx-2 text-[.6em] md:text-[.7em] w-10 md:w-10 lg:w-12 2xl:w-16">Feedback</p>
            <p className="mx-1 md:mx-4 lg:mx-2 text-[.6em] md:text-[.7em] w-10 md:w-10 lg:w-12 2xl:w-16">Reflect</p>
          </div>
        </div>
      </div>
    </div>
   
    </>
  );
};

export default PracticeQuestion;
