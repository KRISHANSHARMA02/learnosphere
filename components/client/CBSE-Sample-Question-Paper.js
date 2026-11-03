"use client";
import Footer from "@/components/Footer";
import Footer1 from "@/components/Footer1";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GrNotes } from "react-icons/gr";
import { HiArrowRightCircle } from "react-icons/hi2";
import { CgNotes } from "react-icons/cg";
import { IoNewspaperSharp } from "react-icons/io5";
import { FaNoteSticky } from "react-icons/fa6";
import Image from "next/image";
import ChartImage from "@/public/Monochrome Long Distance Birthday Facebook Cover.png";
import axios from "axios";
import Swal from "sweetalert2";
import { FaTimes, FaWhatsapp } from "react-icons/fa";
import Sociallinks2 from "@/components/Sociallinks2";
import AOS from "aos";
import "aos/dist/aos.css";
import FormSection from '@/components/FormGeneral';

const SampleQuestionPapers = () => {

   const [searchQuery, setSearchQuery] = useState("");
    const [showButton, setShowButton] = useState(false);
    useEffect(() => {
        const interval = setInterval(() => {
            setShowButton((prev) => !prev);
        }, 10000); // Toggle every 10 seconds
        return () => clearInterval(interval);
    }, []);
    useEffect(() => {
        AOS.init({ duration: 800, easing: "ease-in-out" }); // Initialize AOS with smooth settings
    }, []);
    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };
    const handleKeyDown = (e) => {
        // Trigger the redirect when the Enter key is pressed
        if (e.key === "Enter" && searchQuery) {
            // Redirect to ContentFound with the search query as a URL parameter
            window.location.href = `/SearchResult?query=${searchQuery}`;
        }
    };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row gap-4 mt-24 px-4 md:px-8 xl:px-20">
        <div className=" font-Poppins w-full md:w-[75%]">
          <div className="fixed right-8 top-[650px] md:top-[550px] flex flex-col items-center space-y-4"></div>
          <div>
            <h1 className="text-[1.2em] md:text-[1.6em] font-bold ">
              Master Your Exams with CBSE Sample Question Papers for Class 8 to
              12
            </h1>
          </div>
          <div className="flex flex-col gap-4 text-gray-950 mt-4 ">
            <p>
              CBSE Sample Question Papers for Class 8 to 12 are essential tools
              for students aiming to excel in their academics. These papers are
              thoughtfully designed to align with the latest CBSE curriculum,
              covering all important topics and question types. By practicing
              these papers, students gain a clear understanding of the exam
              pattern, question weightage, and marking scheme, which helps them
              strategize their preparation effectively. For students in Class 8
              and 9, these sample papers focus on building foundational
              knowledge in subjects like mathematics, science, and social
              studies, ensuring a strong academic base. For Classes 10 to 12,
              the papers become more advanced, emphasizing critical thinking and
              problem-solving skills necessary for board exams and competitive
              tests.
            </p>
            <p>
              LearnOsphere takes this preparation to the next level by providing
              expertly curated CBSE Sample Question Papers for Class 8 to 12,
              accompanied by detailed solutions and explanatory notes. These
              resources enable students to analyze their strengths and
              weaknesses, improve time management, and boost their confidence
              before the exams. With a wide variety of questions across all core
              subjects, LearnOsphere ensures that students are well-prepared to
              tackle any challenge. Whether it’s building a strong foundation or
              preparing for high-stakes board exams, these sample papers serve
              as a complete guide for academic success.
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-[1.1em] md:text-[1.4em] mt-5">
              Advantages of Practicing CBSE Sample Papers
            </h2>
          </div>
          <div className="mt-2">
            <ol className="text-orange-600 flex flex-col gap-2 list-decimal px-8">
              <li>Gain clarity on question patterns and marking schemes.</li>
              <li>
                Practice helps in completing exams within the given time frame.
              </li>
              <li>Identifies topics that need more attention and practice.</li>
              <li>
                Regular practice reduces anxiety and builds self-assurance for
                exams.
              </li>
              <li>
                Familiarity with questions ensures precise and well-structured
                answers.
              </li>
              <li>
                Mimics real exam scenarios, equipping students to perform under
                pressure.
              </li>
            </ol>
          </div>
          <div className="bg-gray-50 p-2">
            <div className="mt-4 text-gray-900">
              <h3 className="text-[1.1em] md:text-[1.4em] font-semibold">
                CBSE Class 8 Sample Question Paper Set Wise
              </h3>
              <p className="mt-2">
                CBSE Class 8 Sample Question Paper Set Wise offers a structured
                approach to exam preparation. These sets cover all subjects and
                provide varied question types, helping students understand the
                exam pattern and improve time management. Regular practice with
                these sets boosts confidence and ensures comprehensive
                preparation for the exams.
              </p>
            </div>
            <div>
              <ol className="px-1 md:px-4 mt-4 list-disc">
                <Link
                  href="/CBSE-Sample-Question-Paper/Cbse-Sample-Paper-Class-8-Maths-Set-1"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  {" "}
                  CBSE Class 8 Maths Sample Papers Set 1
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE-Sample-Question-Paper/Cbse-Sample-Paper-For-Class-8-Maths-Set-2"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  {" "}
                  CBSE Class 8 Maths Sample Papers Set 2
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE-Sample-Question-Paper/Cbse-Sample-Paper-For-Class-8-Maths-Set-3"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  {" "}
                  CBSE Class 8 Maths Sample Papers Set 3
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE-Sample-Question-Paper/Cbse-Sample-Paper-For-Class-8-Maths-Set-4"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  {" "}
                  CBSE Class 8 Maths Sample Papers Set 4
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE-Sample-Question-Paper/Cbse-Sample-Paper-For-Class-8-Maths-Set-5"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  {" "}
                  CBSE Class 8 Maths Sample Papers Set 5
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE-Sample-Question-Paper/Cbse-Class-8-Maths-Sa-1-Sample-Paper"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  {" "}
                  CBSE Class 8 Sample Papers SA 1 Maths
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE-Sample-Question-Paper/Cbse-Class-8-Maths-Sa-2-Sample-Paper"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  {" "}
                  CBSE Class 8 Sample Papers SA 2 Maths
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
              </ol>
            </div>
          </div>
          <div className="bg-gray-50 p-2">
            <div className="mt-4 text-gray-900">
              <h3 className="text-[1.1em] md:text-[1.4em] font-semibold">
                CBSE Class 9 Sample Question Paper Set Wise
              </h3>
              <p className="mt-2">
                CBSE Class 9 Sample Question Paper Set Wise offers a structured
                approach to exam preparation. These sets cover all subjects and
                provide varied question types, helping students understand the
                exam pattern and improve time management. Regular practice with
                these sets boosts confidence and ensures comprehensive
                preparation for the exams.
              </p>
            </div>
            <div>
              <ol className="px-1 md:px-4 mt-4 list-disc">
                <Link
                  href="/CBSE-Sample-Question-Paper/Cbse-Sample-Paper-For-Class-9-Maths-Set-1"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  CBSE Sample Paper for Class 9 Maths Set 1
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE-Sample-Question-Paper/Cbse-Sample-Paper-For-Class-9-Maths-Set-2"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  CBSE Sample Paper for Class 9 Maths Set 2
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE-Sample-Question-Paper/Cbse-Sample-Paper-For-Class-9-Maths-Set-3"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  CBSE Sample Paper for Class 9 Maths Set 3
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE-Sample-Question-Paper/Cbse-Sample-Paper-For-Class-9-Maths-Set-4"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  CBSE Sample Paper for Class 9 Maths Set 4
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE-Sample-Question-Paper/Cbse-Sample-Paper-For-Class-9-Maths-Set-5"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  CBSE Sample Paper for Class 9 Maths Set 5
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE-Sample-Question-Paper/Cbse-Sample-Paper-For-Class-9-Maths-Set-6"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  CBSE Sample Paper for Class 9 Maths Set 6
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE-Sample-Question-Paper/Cbse-Sample-Paper-For-Class-9-Maths-Set-7"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  CBSE Sample Paper for Class 9 Maths Set 7
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE-Sample-Question-Paper/Cbse-Sample-Paper-For-Class-9-Maths-Set-8"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  CBSE Sample Paper for Class 9 Maths Set 8
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE-Sample-Question-Paper/Cbse-Sample-Paper-For-Class-9-Maths-Set-9"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  CBSE Sample Paper for Class 9 Maths Set 9
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE-Sample-Question-Paper/Cbse-Sample-Paper-For-Class-9-Maths-Set-10"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  CBSE Sample Paper for Class 9 Maths Set 10
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE-Sample-Question-Paper/Cbse-Sample-Paper-For-Class-9-Maths-Set-11"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  CBSE Sample Paper for Class 9 Maths Set 11
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE-Sample-Question-Paper/Cbse-Sample-Paper-For-Class-9-Maths-Set-12"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  CBSE Sample Paper for Class 9 Maths Set 12
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE-Sample-Question-Paper/Cbse-Sample-Paper-For-Class-9-Maths-Set-13"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  CBSE Sample Paper for Class 9 Maths Set 13
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE-Sample-Question-Paper/Cbse-Class-9-Maths-Sample-Papers-Sa1"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  {" "}
                  CBSE Class 9 Sample Papers SA 1 Maths
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE-Sample-Question-Paper/Cbse-Class-9-Maths-Sample-Papers-Sa2"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  {" "}
                  CBSE Class 9 Sample Papers SA 2 Maths
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
              </ol>
            </div>
          </div>
          <div>
            <h3 className="text-[1.4em] font-semibold mt-4 p-2">
              CBSE & ICSE Sample Papers and Previous Year Question Papers
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-[.7em] md:text-[1em] mt-4">
            <Link
              href="/CBSE-Sample-Papers"
              className="flex flex-col justify-between items-center bg-gradient-to-r from-purple-400 to-red-400 text-white p-4 gap-4 font-bold rounded-lg text-center"
            >
              <GrNotes size={25} />
              CBSE Sample Papers
            </Link>
            <Link
              href="/icse-sample-papers"
              className="flex flex-col justify-between items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 gap-4 font-bold rounded-lg text-center"
            >
              <CgNotes size={25} />
              ICSE Sample Papers
            </Link>
            <Link
              href="/Cbse-Previosyear-Questions"
              className="flex flex-col justify-between items-center bg-gradient-to-r from-blue-500 to-red-400 text-white p-4 gap-4 font-bold rounded-lg text-center"
            >
              <IoNewspaperSharp size={25} />
              CBSE Previous Year Question
            </Link>
            <Link
              href="/ICSE-Previousyear-Questions"
              className="flex flex-col justify-between items-center bg-gradient-to-r from-cyan-500 to-purple-400 text-white p-4 gap-4 font-bold rounded-lg text-center"
            >
              <FaNoteSticky size={25} />
              ICSE Previous Year Question
            </Link>
          </div>

          <div className="bg-gray-50 p-2">
            <div className="mt-4 text-gray-900">
              <h3 className="text-[1.1em] md:text-[1.4em] font-semibold">
                CBSE Class 10 Sample Question Paper Set Wise
              </h3>
              <p className="mt-2">
                CBSE Class 10 Sample Question Paper Set Wise is designed to
                provide students with an organized and effective approach to
                exam preparation. These sets offer a wide range of questions,
                reflecting the exam’s format and difficulty level, and cover all
                core subjects. Practicing with these sets helps students
                familiarize themselves with different question types, refine
                their problem-solving skills, and manage time efficiently during
                the exam. By solving these papers, students gain confidence and
                strengthen their understanding, ensuring they are thoroughly
                prepared for their board exams.
              </p>
            </div>
            <div>
              <ol className="px-1 md:px-4 mt-4 list-disc">
                <Link
                  href="/CBSE-Sample-Question-Paper/Cbse-Class-10-Maths-Sample-Papers-Set-1"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  CBSE Sample Paper for Class 10 Maths Set 1
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE-Sample-Question-Paper/Cbse-Class-10-Maths-Sample-Papers-Set-2"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  CBSE Sample Paper for Class 10 Maths Set 2
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE-Sample-Question-Paper/Cbse-Class-10-Maths-Sample-Papers-Set-3"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  CBSE Sample Paper for Class 10 Maths Set 3
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE-Sample-Question-Paper/Cbse-Class-10-Maths-Sample-Papers-Set-4"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  CBSE Sample Paper for Class 10 Maths Set 4
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE-Sample-Question-Paper/Cbse-Class-10-Maths-Sample-Papers-Set-5"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  CBSE Sample Paper for Class 10 Maths Set 5
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE-Sample-Question-Paper/Cbse-Class-10-Maths-Sample-Papers-Set-6"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  CBSE Sample Paper for Class 10 Maths Set 6
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
              </ol>
            </div>
          </div>

          <div className="bg-gray-50 p-2">
            <div className="mt-4 text-gray-900">
              <h3 className="text-[1.1em] md:text-[1.4em] font-semibold">
                CBSE Class 11 Sample Question Paper Set Wise
              </h3>
              <p className="mt-2">
                CBSE Class 11 Sample Question Paper Set Wise is designed to help
                students prepare effectively for their exams. These sets cover
                all major subjects and include a variety of question types,
                helping students understand the exam pattern and improve time
                management. Regular practice with these sets enhances
                problem-solving skills, builds confidence, and ensures thorough
                preparation. With consistent practice, students can strengthen
                their grasp of complex concepts and feel fully equipped for
                their Class 11 exams.
              </p>
            </div>
            <div>
              <ol className="px-1 md:px-4 mt-4 list-disc">
                <Link
                  href="/CBSE-Sample-Question-Paper/Cbse-Class-11-Maths-Sample-Paper-Set-1"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  CBSE Sample Paper for Class 11 Maths Set 1
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE-Sample-Question-Paper/Cbse-Class-11-Maths-Sample-Paper-Set-2"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  CBSE Sample Paper for Class 11 Maths Set 2
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE-Sample-Question-Paper/Cbse-Class-11-Maths-Sample-Paper-Set-3"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  CBSE Sample Paper for Class 11 Maths Set 3
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE-Sample-Question-Paper/Cbse-Class-11-Maths-Sample-Paper-Set-4"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  CBSE Sample Paper for Class 11 Maths Set 4
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE-Sample-Question-Paper/Cbse-Class-11-Maths-Sample-Paper-Set-5"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  CBSE Sample Paper for Class 11 Maths Set 5
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE-Sample-Question-Paper/Cbse-Class-11-Maths-Sample-Paper-Set-6"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  CBSE Sample Paper for Class 11 Maths Set 6
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE-Sample-Question-Paper/Cbse-Class-11-Maths-Sample-Paper-Set-7"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  CBSE Sample Paper for Class 11 Maths Set 7
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE-Sample-Question-Paper/Cbse-Class-11-Maths-Sample-Paper-Set-8"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  CBSE Sample Paper for Class 11 Maths Set 8
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE-Sample-Question-Paper/Cbse-Class-11-Maths-Sample-Paper-Set-9"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  CBSE Sample Paper for Class 11 Maths Set 9
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE-Sample-Question-Paper/Cbse-Class-11-Maths-Sample-Paper-Set-10"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  CBSE Sample Paper for Class 11 Maths Set 10
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
              </ol>
            </div>
          </div>
          <div className="bg-gray-50 p-2">
            <div className="mt-4 text-gray-900">
              <h3 className="text-[1.1em] md:text-[1.4em] font-semibold">
                CBSE Class 12 Sample Question Paper Set Wise
              </h3>
              <p className="mt-2">
                CBSE Class 12 Sample Question Paper Set Wise provides a detailed
                and organized method for students to prepare for their board
                exams. These sets cover all subjects and incorporate a variety
                of question types that reflect the actual exam pattern.
                Practicing these sets allows students to gain a deeper
                understanding of key topics, enhance their time management
                skills, and improve their accuracy in answering. Consistent
                practice with these papers boosts students' confidence and
                ensures they are fully prepared to excel in their Class 12
                exams.
              </p>
            </div>
            <div>
              <ol className="px-1 md:px-4 mt-4 list-disc">
                <a
                  href="https://learnosphere.s3.ap-south-1.amazonaws.com/sample-papers/1784788166904_Applied-Maths-SQP.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  CBSE Sample Paper for Class 12 Maths Set 1
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </a>
                <Link
                  href="/CBSE-Sample-Question-Paper/Cbse-Class-12-Maths-Sample-Paper-Set-2"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  CBSE Sample Paper for Class 12 Maths Set 2
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE-Sample-Question-Paper/Cbse-Class-12-Maths-Sample-Paper-Set-3"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  CBSE Sample Paper for Class 12 Maths Set 3
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE-Sample-Question-Paper/Cbse-Class-12-Maths-Sample-Paper-Set-4"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  CBSE Sample Paper for Class 12 Maths Set 4
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE-Sample-Question-Paper/Cbse-Class-12-Maths-Sample-Paper-Set-5"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  CBSE Sample Paper for Class 12 Maths Set 5
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE-Sample-Question-Paper/Cbse-Class-12-Maths-Sample-Paper-Set-6"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  CBSE Sample Paper for Class 12 Maths Set 6
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE-Sample-Question-Paper/Cbse-Class-12-Maths-Sample-Paper-Set-7"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  CBSE Sample Paper for Class 12 Maths Set 7
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE-Sample-Question-Paper/Cbse-Class-12-Maths-Sample-Paper-Set-8"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  CBSE Sample Paper for Class 12 Maths Set 8
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE-Sample-Question-Paper/Cbse-Class-12-Maths-Sample-Paper-Set-9"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  CBSE Sample Paper for Class 12 Maths Set 9
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE-Sample-Question-Paper/Cbse-Class-12-Maths-Sample-Paper-Set-10"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  CBSE Sample Paper for Class 12 Maths Set 10
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
              </ol>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-4">
            <p>
              Join LearnOsphere for a comprehensive and engaging learning
              experience designed to help you excel academically. With expertly
              curated resources, including math formulas, CBSE & ICSE sample
              papers, previous year question papers, and interactive study
              tools, we provide everything you need to succeed. Our platform
              simplifies complex concepts, strengthens problem-solving skills,
              and boosts confidence, ensuring you are well-prepared for exams.
              Whether you’re preparing for school exams or competitive tests,
              LearnOsphere is your trusted partner in achieving academic
              excellence.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-5 w-full md:w-[25%] font-Poppins">
          <div className="w-full bg-white p-8 ">
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Type To Search"
              value={searchQuery}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="placeholder:text-gray-500 p-3 w-full  rounded-md border border-gray-400"
            />
          </div>
          <div className=" bg-white p-5  rounded-lg">
             <FormSection />
          </div>
        </div>
      </div>
      <Sociallinks2 />
      <Footer1 />
      <Footer />
    </div>
  );
};

export default SampleQuestionPapers;
