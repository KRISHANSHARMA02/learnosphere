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
import { FaNoteSticky, FaSquareWhatsapp } from "react-icons/fa6";
import Image from "next/image";
import ChartImage from "@/public/Monochrome Long Distance Birthday Facebook Cover.png";

import Sociallinks2 from "@/components/Sociallinks2";
import AOS from "aos";
import "aos/dist/aos.css";
import FormSection from "@/components/FormGeneral";

const MathFormula = () => {

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
              Math Formulas for Class 6 to 12 CBSE Board
            </h1>
          </div>
          <div className="flex flex-col gap-4 text-gray-950 mt-4 ">
            <p>
              Mathematics is a core subject for students from Class 6 to 12 in
              the CBSE curriculum, requiring clarity and precision. LearnOsphere
              presents a comprehensive guide to Math Formula and essential
              concepts, ensuring that students are equipped with the tools they
              need to excel. Covering a range of topics from basic arithmetic to
              advanced calculus, these important math formula serve as the
              foundation for academic success and their practical application in
              real-world scenarios.
            </p>
            <p>
              For Class 6 to 8, the focus is on basic arithmetic, algebra, and
              geometry. Math formula for Class 6 includes concepts like the area
              and perimeter of squares, rectangles, and circles, which lay the
              groundwork for further learning. Math formula for Class 7 builds
              on this foundation with simple equations and the properties of
              triangles. Math formula for Class 8 introduces advanced topics
              such as linear equations and volume calculations. LearnOsphere
              emphasizes simplifying these concepts through examples and visual
              aids, ensuring students gain confidence in their calculations and
              problem-solving abilities.
            </p>
            <p>
              In Class 9 and 10, algebra, geometry, and trigonometry take center
              stage. Math formula for Class 9 introduces concepts like quadratic
              equations, coordinate geometry, and the distance formula. Math
              formula for Class 10 focuses on trigonometric ratios, Heron’s
              formula, and more advanced geometric formulas. LearnOsphere
              provides structured modules on these topics, highlighting
              essential formulas and their applications. These concepts help
              build critical thinking and analytical skills, preparing students
              for higher-level mathematics and their board exams.
            </p>
            <p>
              For Class 11, the syllabus expands into advanced topics such as
              calculus, sets, and probability. Math formulas for Class 11
              include differentiation and integration, covering crucial formulas
              like derivatives of functions, indefinite integrals, and laws of
              probability. LearnOsphere offers in-depth explanations of these
              topics, simplifying complex concepts through interactive tools and
              exercises. This ensures students understand and apply math
              formulas with ease, strengthening their foundation for more
              advanced studies in mathematics.
            </p>
            <p>
              Class 12 delves deeper into calculus, vector algebra, and 3D
              geometry. Math formulas for Class 12 include key formulas such as
              the equation of planes, the gradient of curves, and definite
              integrals, all of which are vital for competitive exams like JEE
              and NEET. LearnOsphere ensures students are well-equipped for
              these challenges with practical examples, mock tests, and
              step-by-step breakdowns of each formula. The comprehensive
              coverage of the curriculum helps students excel academically,
              providing them with a solid foundation for higher education while
              nurturing a love for mathematics.
            </p>
            <p>
              With LearnOsphere, mastering all math formulas from Class 6 to 12
              becomes an engaging and enriching experience. The platform bridges
              the gap between theoretical understanding and practical
              application, ensuring students achieve their academic goals
              effortlessly. By providing access to all math formulas across
              various topics, from basic arithmetic to advanced calculus,
              LearnOsphere ensures that students have a comprehensive toolkit to
              succeed in both their school exams and competitive exams.
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-[1.1em] md:text-[1.4em] mt-5">
              Key Reasons Why Math is Essential for Students
            </h2>
          </div>
          <div className="mt-2">
            <ol className="text-orange-600 flex flex-col gap-2 list-decimal px-8">
              <li>Math enhances reasoning and decision-making skills</li>
              <li> It teaches budgeting, time management, and measurements.</li>
              <li>
                A strong math foundation is vital for technology and engineering
                fields.
              </li>
              <li>
                {" "}
                Math builds resilience by simplifying complex challenges.
              </li>
              <li>Excelling in math boosts confidence in other subjects.</li>
              <li>
                Math connects theory to practical applications in daily life.
              </li>
            </ol>
          </div>
          <div className="bg-gray-50 p-2">
            <div className="mt-4 text-gray-900">
              <h3 className="text-[1.1em] md:text-[1.4em] font-semibold">
                Class 6 to 12 Maths Formula CBSE Board
              </h3>
            </div>
            <div>
              <ol className="px-1 md:px-4 mt-4 list-disc">
                <Link
                  href="/MathsFormula/Maths-Formulas-For-Class-6"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  Maths Formula For Class 6
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/MathsFormula/Maths-Formulas-For-Class-7"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  Maths Formula For Class 7
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/MathsFormula/Maths-Formulas-For-Class-8"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  Maths Formula For Class 8
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/MathsFormula/Maths-Formulas-For-Class-9"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  Maths Formula For Class 9
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/MathsFormula/Maths-Formulas-For-Class-10"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  Maths Formula For Class 10
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/MathsFormula/Maths-Formulas-For-Class-11"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  Maths Formula For Class 11
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/MathsFormula/Maths-Formulas-For-Class-12"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  Maths Formula For Class 12
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
              </ol>
            </div>
          </div>
          <div>
            <h3 className="text-[1.1em] md:text-[1.4em] font-semibold mt-4 p-2">
              Maths Formula Chart
            </h3>
          </div>
          <div className=" w-full">
            <Image
              src={ChartImage}
              alt=" Math Formula Chart Image"
              className="px-2 shadow-MD rounded-lg"
              width={1200}
              height={300}
            />
          </div>
          <div>
            <p>
              A Basic Math Formula Chart is an essential tool for students to
              quickly reference important mathematical formulas across various
              topics. This chart typically includes formulas for arithmetic
              operations, algebraic expressions, geometry, and basic
              trigonometry. For example, it covers formulas for the area and
              perimeter of common shapes like squares, rectangles, and circles,
              as well as volume formulas for solids like cubes and spheres.
              Additionally, algebraic formulas such as the quadratic formula,
              exponent laws, and simple equations are also included. The Basic
              Math Formula Chart serves as a handy guide for students,
              simplifying complex calculations and providing a structured
              approach to problem-solving, ensuring a smoother learning
              experience.
            </p>
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

export default MathFormula;
