"use client";
import Footer from "@/components/Footer";
import Footer1 from "@/components/Footer1";
import Navbar from "@/components/Navbar";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CgNotes } from "react-icons/cg";
import { FaNoteSticky } from "react-icons/fa6";
import { GrNotes } from "react-icons/gr";
import { HiArrowRightCircle } from "react-icons/hi2";
import { IoNewspaperSharp } from "react-icons/io5";
import Sociallinks2 from "@/components/Sociallinks2";
import AOS from "aos";
import "aos/dist/aos.css";
import FormSection from "@/components/FormGeneral";


const CBSE = () => {

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
        <div className=" w-[70%]">
          <div className="fixed right-8 top-[650px] md:top-[550px] flex flex-col items-center space-y-4">
        
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-[1.6em] font-bold">
              Master Your CBSE Journey with Learnosphere
            </h1>
            <p>
              At Learnosphere, we aim to provide comprehensive support for CBSE
              students by offering essential resources for exam preparation. Our
              platform features a wide range of study materials designed to
              guide students through every stage of their academic journey.
            </p>
            <p>
              We offer the latest CBSE syllabus, ensuring that students have
              access to the most up-to-date curriculum details for each subject.
              This allows learners to stay aligned with the educational
              standards and focus on key areas of learning. Additionally, we
              provide sample papers, which help students get acquainted with the
              exam format and practice solving questions under timed conditions.
            </p>
            <p>
              In addition to sample papers, Learnosphere also offers previous
              year’s question papers to give students a deeper insight into
              recurring topics and exam patterns. This helps in building
              confidence and enhancing problem-solving skills. Along with this,
              we provide crucial formulas for subjects like Mathematics,
              Physics, and Chemistry, making it easier for students to review
              important concepts.
            </p>
            <p>
              To further aid in preparation, Learnosphere offers quizzes
              designed to test knowledge and reinforce learning. These quizzes
              are interactive, helping students assess their strengths and
              identify areas that need improvement. Whether you're preparing for
              the board exams or looking to revise key concepts, Learnosphere is
              your one-stop resource.
            </p>
          </div>
          <div className="mt-4">
            <h2 className="text-[1.4em] font-semibold">
              Why Choose LearnOsphere for Your CBSE Studies?
            </h2>
            <ol className="text-orange-600 px-8 flex flex-col gap-2 list-decimal mt-2">
              <li>
                {" "}
                Access the latest syllabus, sample papers, and previous year
                questions in one place.
              </li>
              <li>
                Test your knowledge with engaging quizzes to reinforce your
                learning.
              </li>
              <li>
                Stay aligned with the latest CBSE guidelines for accurate
                preparation.
              </li>
              <li>
                Study at your own pace, focusing on areas that need improvement.
              </li>
              <li>
                Learn from carefully curated materials created by subject
                experts.
              </li>
              <li>
                Study anytime, anywhere with our fully accessible online
                platform.
              </li>
            </ol>
          </div>

          <div className="bg-gray-50 p-2">
            <div className="mt-4 flex flex-col gap-3">
              <h3 className="text-[1.4em] font-semibold">
                CBSE Syllabus for Classes 1 to 12 at Learnosphere
              </h3>
              <p>
                At Learnosphere, we provide the complete CBSE syllabus for all
                grades from Class 1 to Class 12, ensuring that students have
                access to the latest curriculum updates. Our platform offers a
                structured and detailed approach, making it easier for students
                to understand and follow the topics and subjects covered
                throughout their academic year.
              </p>
              <p>
                By offering a comprehensive range of syllabus, Learnosphere
                helps students stay on track with their studies and focus on the
                right topics at the right time. With clear and organized
                content, students can plan their learning effectively and be
                well-prepared for exams, boosting their academic performance and
                confidence.
              </p>
            </div>
            <div>
              <ol className="px-1 md:px-4 mt-4 list-disc">
                <Link
                  href="/CBSE/Class-1"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  {" "}
                  CBSE Class 1st Syllabus
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE/Class-2"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  {" "}
                  CBSE Class 2nd Syllabus
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE/Class-3"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  {" "}
                  CBSE Class 3rd Syllabus
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE/Class-4"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  {" "}
                  CBSE Class 4th Syllabus
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE/Class-5"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  {" "}
                  CBSE Class 5th Syllabus
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE/Class-6"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  {" "}
                  CBSE Class 6th Syllabus
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE/Class-7"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  {" "}
                  CBSE Class 7th Syllabus
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE/Class-8"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  {" "}
                  CBSE Class 8th Syllabus
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE/Class-9"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  {" "}
                  CBSE Class 9th Syllabus
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE-10thsyllabus"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  {" "}
                  CBSE Class 10th Syllabus
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE-11thsyllabus"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  {" "}
                  CBSE Class 11th Syllabus
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/CBSE-12thsyllabus"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  {" "}
                  CBSE Class 12th Syllabus
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
              </ol>
            </div>
            <div className="mt-2">
              <p>
                Our CBSE syllabus coverage at Learnosphere is designed to cater
                to the needs of every student, from the basics of early grades
                to the complexities of senior classes. Each syllabus is divided
                into easy-to-understand modules, helping students grasp key
                concepts and progress at their own pace. Whether you're in Class
                1 or preparing for the Class 12 board exams, Learnosphere
                ensures that you have a solid foundation and the resources to
                excel.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-2">
            <div className="mt-4 flex flex-col gap-3">
              <h3 className="text-[1.4em] font-semibold">
                CBSE Online Quiz for Class 1 to 12 at Learnosphere
              </h3>
              <p>
                Learnosphere offers a wide range of online quizzes for students
                from Class 1 to Class 12, designed to enhance learning and exam
                preparation. These quizzes are tailored to match the CBSE
                syllabus, covering all subjects and topics in an engaging and
                interactive format. Students can test their knowledge, track
                their progress, and identify areas that need further focus,
                ensuring a comprehensive understanding of each subject.
              </p>
              <p>
                Our quizzes are not just limited to theoretical knowledge; they
                also encourage practical application of concepts, making them
                ideal for reinforcing what students have learned in class. With
                instant feedback and detailed explanations, Learnosphere’s
                online quizzes provide a fun, effective, and efficient way to
                prepare for exams and boost academic performance.
              </p>
            </div>
            <div>
              <ol className="px-1 md:px-4 mt-4 list-disc">
                <Link
                  href="/Online-Quiz/Certification-Quiz-For-Class-1"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  {" "}
                  CBSE Class 1 Quiz
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/Online-Quiz/Certification-Quiz-For-Class-2"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  {" "}
                  CBSE Class 2 Quiz
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/Online-Quiz/Certification-Quiz-For-Class-3"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  {" "}
                  CBSE Class 3 Quiz
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/Online-Quiz/Certification-Quiz-For-Class-4"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  {" "}
                  CBSE Class 4 Quiz
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/Online-Quiz/Certification-Quiz-For-Class-5"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  {" "}
                  CBSE Class 5 Quiz
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/Online-Quiz/Certification-Quiz-For-Class-6"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  {" "}
                  CBSE Class 6 Quiz
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/Online-Quiz/Certification-Quiz-For-Class-7"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  {" "}
                  CBSE Class 7 Quiz
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/Online-Quiz/Certification-Quiz-For-Class-8"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  {" "}
                  CBSE Class 8 Quiz
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/Online-Quiz/Certification-Quiz-For-Class-9"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  {" "}
                  CBSE Class 9 Quiz
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/Online-Quiz/Certification-Quiz-For-Class-10"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  {" "}
                  CBSE Class 10 Quiz
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/Online-Quiz/Certification-Quiz-For-Class-11"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  {" "}
                  CBSE Class 11 Quiz
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/Online-Quiz/Certification-Quiz-For-Class-12"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  {" "}
                  CBSE Class 12 Quiz
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
              </ol>
            </div>
            <div className="mt-2">
              <p>
                After completing the online quizzes on Learnosphere, students
                receive instant feedback, allowing them to review their
                performance and identify strengths and weaknesses. This quick
                analysis helps students make improvements and reinforces their
                understanding of key concepts. Moreover, the platform offers
                detailed explanations for each question, ensuring that students
                not only know the correct answers but also understand the
                reasoning behind them, making it easier to retain and apply the
                knowledge in exams. With this approach, Learnosphere transforms
                learning into a more personalized and effective experience.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-2">
            <div className="mt-4 flex flex-col gap-3">
              <h3 className="text-[1.4em] font-semibold">
                Comprehensive CBSE Resources: Formulas, Sample Papers, and
                Previous Year Question Papers at Learnosphere
              </h3>
              <p>
                Learnosphere offers a one-stop solution for CBSE students by
                providing essential resources such as formulas, sample papers,
                and previous year question papers. These materials are curated
                to help students understand important concepts, practice real
                exam questions, and get familiar with the exam pattern. By
                practicing with sample papers and solving previous year’s
                questions, students can build confidence, enhance time
                management skills, and improve their performance. Whether it's
                mastering formulas or revising past papers, Learnosphere ensures
                that every student is fully prepared to excel in their exams.
              </p>
              <p>
                In addition to providing formulas and practice papers,
                Learnosphere also offers detailed solutions and explanations to
                every sample paper and previous year question. This ensures that
                students not only practice but also learn from their mistakes.
                The platform's structured approach allows students to track
                their progress and focus on areas where they need the most
                improvement. By incorporating these resources into their study
                routine, students can approach their CBSE exams with confidence,
                knowing they have thoroughly prepared and understood all key
                concepts and exam strategies.
              </p>
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
              <Link
                href="/MathsFormula"
                className="flex flex-col justify-between items-center bg-gradient-to-r from-purple-400 to-red-400 text-white p-4 gap-4 font-bold rounded-lg text-center"
              >
                <GrNotes size={25} />
                Maths Formulas
              </Link>
              <Link
                href="/CBSE-Sample-Question-Paper"
                className="flex flex-col justify-between items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 gap-4 font-bold rounded-lg text-center"
              >
                <CgNotes size={25} />
                CBSE Sample Question Paper
              </Link>
              <Link
                href="/CBSE-Previousyear-Question-Papers-"
                className="flex flex-col justify-between items-center bg-gradient-to-r from-blue-500 to-red-400 text-white p-4 gap-4 font-bold rounded-lg text-center"
              >
                <IoNewspaperSharp size={25} />
                CBSE Previous Year Question Papers
              </Link>
              <Link
                href="/ICSE-Previous-Question-Paper"
                className="flex flex-col justify-between items-center bg-gradient-to-r from-cyan-500 to-purple-400 text-white p-4 gap-4 font-bold rounded-lg text-center"
              >
                <FaNoteSticky size={25} />
                ICSE Previous Year Question Papers
              </Link>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-4">
            <p>
              CBSE, the Central Board of Secondary Education, plays a crucial
              role in shaping the academic future of students in India. Its
              structured curriculum, designed to offer a holistic learning
              experience, is aimed at developing critical thinking,
              problem-solving, and application-based skills. At Learnosphere, we
              understand the importance of the CBSE board exams and are
              committed to providing comprehensive resources to support students
              from Class 1 to Class 12.
            </p>
            <p>
              Learnosphere offers a wide array of tools to ensure that students
              are well-prepared for their CBSE exams. We provide the latest CBSE
              syllabus for all subjects and grades, ensuring that students stay
              updated with the current curriculum. Along with that, we offer
              sample papers, previous year question papers, and formulas for
              quick revision, helping students get accustomed to the exam format
              and effectively manage their time. Our interactive quizzes,
              designed to test and reinforce learning, are a great way for
              students to assess their understanding and improve. Detailed
              explanations and instant feedback after quizzes further enhance
              the learning experience, ensuring that students not only practice
              but also grasp key concepts. With these resources, Learnosphere is
              your ultimate companion for CBSE exam success.
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
          <div className=" ">
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

export default CBSE;
