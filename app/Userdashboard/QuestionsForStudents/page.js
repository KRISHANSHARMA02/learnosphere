"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FaBookOpen } from "react-icons/fa";
import Image from "next/image";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const [grade, setGrade] = useState(null);
  const [stream, setStream] = useState(null);
  const [selectedSubjects3, setSelectedSubjects3] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const handleCardClick = (index, subject) => {
    setSelectedCard(index); // Highlight selected card
    setSelectedSubject(subject); // Set the selected subject
  };

  useEffect(() => {
    const fetchGrade = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const response = await axios.post(
            `${WEB_BACKEND_URL}/api/route/getStudentByEmail`,
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
    const fetchSubjects = async () => {
      if (grade) {
        setLoading(true);
        try {
          const params = { grade };
          if (stream) {
            params.stream = stream;
          }
          const response = await axios.get(
            `${WEB_BACKEND_URL}/api/route/ImportantQuestion`,
            { params }
          );
          setSelectedSubjects3(response.data.selectedSubjects3 || []); // Default to an empty array if undefined
        } catch (error) {
        } finally {
          setLoading(false);
        }
      }
    };
    fetchSubjects();
  }, [grade, stream]);

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
               `${WEB_BACKEND_URL}/api/route/ImportantQuestion`,
               { params }
             );
             setSelectedSubjects3(response.data.selectedSubjects3 || []); // Default to an empty array if undefined
           } catch (error) {
           } finally {
             setLoading(false);
           }
         }
       };
       fetchSubjects();
     }, [grade,stream]);


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
      <div className="mt-4">
        <h1 className="font-bold text-[1.1em] sm:text-[1.3em] md:text-[1.5em] text-center">
          Learn<span className="text-orange-600">O</span>sphere Daily Practice
          Question
        </h1>
        <ul className="mt-6 list-decimal flex flex-col gap-4 px-4 md:px-10">
          <li className="font-semibold text-[.7em] md:text-[1em]">
            <span className="text-orange-600 font-semibold text-[.9em] md:text-[1.1em]">
              Concept-Based Learning:
            </span>
            Daily MCQs designed to strengthen subject understanding through
            practical application.
          </li>
          <li className="font-semibold text-[.7em] md:text-[1em]">
            <span className="text-orange-600 font-semibold text-[.9em] md:text-[1.1em]">
              Progress Tracking:
            </span>
            Helps students assess their performance and identify improvement
            areas.
          </li>
          <li className="font-semibold text-[.7em] md:text-[1em]">
            <span className="text-orange-600 font-semibold text-[.9em] md:text-[1.1em]">
              Exam Readiness:
            </span>{" "}
            Regular practice enhances problem-solving speed and accuracy for
            competitive exams.
          </li>
          <li className="font-semibold text-[.7em] md:text-[1em]">
            <span className="text-orange-600 font-semibold text-[.9em] md:text-[1.1em]">
              Varied Topics:
            </span>
            multiple subjects and difficulty levels to ensure holistic learning.
          </li>
        </ul>
      </div>
      <div className="grid grid-cols-1 mt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2">
        {/* Loop through all cards and render them */}
        {selectedSubjects3.map((subject, index) => (
          <Link
            key={index}
            href={`/Userdashboard/ImportantQuestionsForStudents?subject=${subject.subject}`} // Dynamic route for each subject
            onClick={() => handleCardClick(index, subject.subject)} // You can still handle card click without preventDefault
            className={`bg-white flex items-center flex-col min-w-[110px] sm:min-w-[150px] md:min-w-[150px] ml-2 md:ml-6 mb-10 border shadow-lg hover:shadow-xl ${
              selectedCard === index ? "border-2 border-orange-500" : ""
            }`}
          >
            <div className="flex justify-center  grid-cols-2 items-center bg-gray-50 p-4">
              {getSubjectImages(subject.subject)}{" "}
              {/* Replace with your image logic */}
            </div>
            <div className="p-4 flex items-center justify-around">
              <h3 className="text-sm font-bold text-gray-800">
                {subject.subject}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Questions;
