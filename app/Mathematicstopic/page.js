"use client";
import Footer from "@/components/Footer";
import Footer1 from "@/components/Footer1";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GrNotes } from "react-icons/gr";
import { CgNotes } from "react-icons/cg";
import { IoNewspaperSharp } from "react-icons/io5";
import { FaNoteSticky, FaSquareWhatsapp } from "react-icons/fa6";

import Sociallinks2 from "@/components/Sociallinks2";
import AOS from "aos";
import "aos/dist/aos.css";
import FormSection from "@/components/FormGeneral";

const MathematicsTopic = () => {
  const [searchQuery, setSearchQuery] = useState("");

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

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowButton((prev) => !prev);
    }, 10000000); // Toggle every 10 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out" }); // Initialize AOS with smooth settings
  }, []);
  return (
    <div>
      <Navbar />

      <div className="flex flex-col md:flex-row gap-4 mt-24 px-4 md:px-8 xl:px-20 relative">
        <div className=" font-Poppins w-full md:w-[75%]">
          <div className="fixed right-8 top-[650px] md:top-[550px] flex flex-col items-center space-y-4">

          </div>

          <div>
            <h1 className="text-[1.2em] md:text-[1.6em] font-bold ">
              Mathamatics Topic for Class 6 to 12 CBSE Board
            </h1>
          </div>
          <div className="flex flex-col gap-4 text-gray-950 mt-4 ">
            <p>
              The foundation of mathematics is laid during Classes 6 to 8, focusing on basic concepts and logical reasoning. Topics include Number Systems, Fractions, Decimals, Ratios, and Percentages, which develop numerical fluency. Geometry introduces lines, angles, symmetry, and shapes. Students also explore Algebra, Simple Equations, and Data Handling, emphasizing problem-solving and analytical skills.
            </p>
            <p>
              In Classes 9 and 10, students delve deeper into concepts like Polynomials, Quadratic Equations, and Coordinate Geometry. Real-life applications of Trigonometry and Statistics are introduced, fostering analytical and spatial reasoning. Geometry expands to cover constructions and circles, while Mensuration focuses on surface areas and volumes. These years aim to build a strong conceptual base for higher studies.
            </p>
            <p>
              The senior secondary curriculum focuses on advanced topics, emphasizing abstract thinking and analytical skills. Class 11 introduces Sets, Relations, and Functions, along with Calculus, which becomes central in Class 12. Vectors, Matrices, Probability, and Linear Programming are key additions, preparing students for competitive exams and higher education. The inclusion of Differential and Integral Calculus highlights the connection between mathematics and real-world problems.
            </p>
            <p>
              Mathematics from Classes 6 to 12 follows a progressive path, from fundamental concepts to advanced applications. The curriculum nurtures logical reasoning, problem-solving, and analytical thinking, ensuring students are well-prepared for academic challenges and future career opportunities in fields like engineering, data science, and research.
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-[1.1em] md:text-[1.4em] mt-5">
              Key Reasons for Mathematics Topics in CBSE Classes 6 to 12
            </h2>
          </div>
          <div className="mt-2">
            <ol className="text-orange-600 flex flex-col gap-2 list-decimal px-8">
              <li>Introduction to integers, fractions, decimals, and rational numbers for basic arithmetic operations.</li>
              <li>Understanding variables, equations, and expressions to solve real-life problems.</li>
              <li>
                Study of shapes, angles, lines, symmetry, and constructions for spatial reasoning.
              </li>
              <li>
                Exploring relationships between angles and sides of triangles with real-world applications.
              </li>
              <li>Concepts of differentiation and integration to analyze changes and areas under curves.</li>
              <li>
                Measuring uncertainty and analyzing data for informed decision-making.
              </li>
            </ol>
          </div>
          <div className="bg-gray-50 p-2">
            <div className="mt-4 text-gray-900">
              <h3 className="text-[1.1em] md:text-[1.4em] font-semibold">

              </h3>
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
          <div className="mt-4 flex flex-col gap-4">
            <p>
              LearnOsphere provides a valuable collection of CBSE sample papers
              and ICSE sample papers, along with previous year question papers
              for both boards. These resources are designed to help students
              familiarize themselves with the exam pattern and types of
              questions they can expect in their upcoming exams. The CBSE sample
              papers cover a wide range of subjects, offering practice on
              different question formats, while the ICSE sample papers focus on
              detailed subject matter and assessment criteria unique to the ICSE
              board. By accessing previous year question papers for both CBSE
              and ICSE, students can practice real exam questions, identify
              important topics, and improve their time management skills.
              LearnOsphere’s structured approach to these resources ensures
              thorough exam preparation, making it easier for students to build
              confidence and perform well in their exams.
            </p>
            <p>
              LearnOsphere offers a comprehensive and interactive approach to
              mastering mathematics from Class 6 to 12. With structured lessons,
              detailed explanations, and step-by-step breakdowns of key math
              formulas, the platform ensures students grasp even the most
              complex concepts with ease. By joining LearnOsphere, you gain
              access to a wealth of resources, including practice exercises,
              mock tests, and visual aids, designed to enhance your
              understanding and build confidence. Whether you're preparing for
              exams or looking to improve your math skills, LearnOsphere is your
              trusted partner in achieving academic success and nurturing a
              lifelong love for mathematics.
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

export default MathematicsTopic;


