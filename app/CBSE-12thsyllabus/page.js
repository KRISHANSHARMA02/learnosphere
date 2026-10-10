import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Footer1 from "@/components/Footer1";

export const generateMetadata = () => {
  return {
    title: "CBSE Class 12 Syllabus - Learnosphere",
    description:
      "Get the latest CBSE Class 12 syllabus for Maths, Physics, Chemistry, Biology, and more for the 2024-25 academic year. Prepare effectively for your board exams with our detailed syllabus and study resources.",
    keywords:
      "CBSE, Class 12, Syllabus, 2024-25, Maths, Physics, Chemistry, Biology, English, Hindi, Accountancy, Business Studies, Economics, Political Science, Jaipur, Home Tuition, Offline Tuitions",
  };
};

const Syllabussc = () => {
  return (
    <div>
      <Navbar />
      <head>
        <link
          rel="canonical"
          href="https://learnosphere.in/CBSE-12thsyllabus"
        />
      </head>

      <div className="p-12 flex flex-col font-Poppins justify-center mt-12">
        <div>
          <h1 className="p-4 text-4xl font-extrabold bg-black text-orange-500  w-full md:w-1/5 m-auto text-center  rounded-lg shadow-2xl shadow-orange-900">
            Class 12th
          </h1>
        </div>
        <div className="pt-6">
          <p className="text-start w-[90%] ">
            For all students, the syllabus for Class 12 will serve as a guide to
            help them determine what to learn and which topics are relevant.
            Using the term-wise CBSE Class 12 Syllabus, students will prepare
            and analyze what topics have been covered. All students in Class 12
            need to study according to the 2024-25 term-wise syllabus to pass
            the final exam. We at Vedantu have provided the CBSE Class 12
            term-wise syllabus for all subjects to guide you for studying. To
            download the syllabus as a PDF, simply download it free of charge.{" "}
            <br />
            The Central Board of Secondary Education (CBSE) for the academic
            year 2024-25 has released the revised syllabus for Class 12 across
            all subjects. CBSE, an autonomous and self-governing body
            established under the Department of Education (D.O.Ed), provides
            this updated syllabus to guide students in their preparation. The
            CBSE Revised Syllabus 2024-25 for Class 12 encompasses all core
            subjects, including Physics, Chemistry, Mathematics, Biology,
            English, Hindi, Economics, Business Studies, Political Science, and
            Accountancy, ensuring comprehensive coverage for the board exams.
          </p>
        </div>
        <div className="pt-6   ml-0 md:ml-12">
          <table className="table-auto w-full text-center ">
            <tbody>
              <tr>
                <td className="border p-4 border-gray-500 hover:bg-orange-600 transition-all ease-in duration-300 hover:scale-105 hover:text-white hover:border-none ">
                  <Link
                    className="flex justify-between w-full font-semibold"
                    href="/CBSE/Class-12-Math"
                  >
                    <p>1</p>
                    CBSE Term Wise Syllabus for Class 12 Maths
                    <p>1</p>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="border p-4 border-gray-500 hover:bg-orange-600 transition-all ease-in duration-300 hover:scale-105 hover:text-white hover:border-none ">
                  <Link
                    className="flex justify-between w-full font-semibold"
                    href="/CBSE/Class-12-Physics"
                  >
                    <p>2</p>
                    CBSE Term Wise Syllabus for Class 12 Physics
                    <p>2</p>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="border p-4 border-gray-500 hover:bg-orange-600 transition-all ease-in duration-300 hover:scale-105 hover:text-white hover:border-none ">
                  <Link
                    className="flex justify-between w-full font-semibold"
                    href="/CBSE/Class-12-Chemistry"
                  >
                    <p>3</p>CBSE Term Wise Syllabus for Class 12 Chemistry
                    <p>3</p>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="border p-4 border-gray-500 hover:bg-orange-600 transition-all ease-in duration-300 hover:scale-105 hover:text-white hover:border-none ">
                  <Link
                    className="flex justify-between w-full font-semibold"
                    href="/CBSE/Class-12-Biology"
                  >
                    <p>4</p>
                    CBSE Term Wise Syllabus for Class 12 Biology
                    <p>4</p>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="border p-4 border-gray-500 hover:bg-orange-600 transition-all ease-in duration-300 hover:scale-105 hover:text-white  hover:border-none ">
                  <Link
                    className="flex justify-between w-full font-semibold"
                    href="/CBSE/Class-12-English"
                  >
                    <p>5</p>CBSE Term Wise Syllabus for Class 12 English<p>5</p>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="border p-4 border-gray-500 hover:bg-orange-600 transition-all ease-in duration-300 hover:scale-105 hover:text-white hover:border-none ">
                  <Link
                    className="flex justify-between w-full font-semibold"
                    href="/CBSE/Class-12-Hindi"
                  >
                    <p>6</p>CBSE Term Wise Syllabus for Class 12 Hindi<p>6</p>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="border p-4 border-gray-500 hover:bg-orange-600 transition-all ease-in duration-300 hover:scale-105 hover:text-white hover:border-none ">
                  <Link
                    className="flex justify-between w-full font-semibold"
                    href="/CBSE/Class-12-Accountancy"
                  >
                    <p>7</p>CBSE Term Wise Syllabus for Class 12 Accountancy
                    <p>7</p>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="border p-4 border-gray-500 hover:bg-orange-600 transition-all ease-in duration-300 hover:scale-105 hover:text-white hover:border-none ">
                  <Link
                    className="flex justify-between w-full font-semibold"
                    href="/CBSE/Class-12-BussinessStudies"
                  >
                    <p>8</p>CBSE Term Wise Syllabus for Class 12 Business
                    Studies<p>8</p>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="border p-4 border-gray-500 hover:bg-orange-600 transition-all ease-in duration-300 hover:scale-105 hover:text-white hover:border-none ">
                  <Link
                    className="flex justify-between w-full font-semibold"
                    href="/CBSE/Class-12-Economics"
                  >
                    <p>9</p>CBSE Term Wise Syllabus for Class 12 Economics
                    <p>9</p>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="border p-4 border-gray-500 hover:bg-orange-600 transition-all ease-in duration-300 hover:scale-105 hover:text-white hover:border-none ">
                  <Link
                    className="flex justify-between w-full font-semibold"
                    href="/CBSE/Class-12-PoliticalScience"
                  >
                    <p>10</p>CBSE Term Wise Syllabus for Class 12 Political
                    Science<p>10</p>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Footer1 />
      <Footer />
    </div>
  );
};

export default Syllabussc;
