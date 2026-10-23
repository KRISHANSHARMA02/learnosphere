import React from "react";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Footer1 from "@/components/Footer1";
import Image from "next/image";
import SyllabusVisitTracker from "@/components/SyllabusVisitTracker";
import FAQAccordion from "@/components/FAQAccordion";

const cbse10thFaqs = [
  {
    question: "What is the latest CBSE Class 10 syllabus?",
    answer:
      "The latest CBSE Class 10 syllabus covers the prescribed subjects, chapters and topics students need to prepare for the current board examination.",
  },
  {
    question: "Which chapters are included in CBSE Class 10?",
    answer:
      "The CBSE Class 10 syllabus includes subject-wise chapters and topics for Mathematics, Science, Social Science, languages and other subjects.",
  },
  {
    question: "Does the CBSE Class 10 syllabus change every year?",
    answer:
      "The CBSE Class 10 syllabus can be revised for different academic sessions. Students should always follow the latest prescribed syllabus.",
  },
  {
    question: "Is NCERT enough for CBSE Class 10?",
    answer:
      "NCERT books cover the core CBSE Class 10 syllabus. Students should also practise sample papers and previous-year questions for better preparation.",
  },
  {
    question: "How should I complete the CBSE Class 10 syllabus?",
    answer:
      "Divide the CBSE Class 10 syllabus subject-wise, complete chapters systematically, revise regularly and solve practice papers to assess your preparation.",
  },
];

const Syllabus = () => {
  const metadata = generateMetadata();

  return (
    <>
      <SyllabusVisitTracker page="CBSE_10th_Syllabus" classNum="10" />
      <Navbar />
      <head>

  
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <link
          rel="canonical"
          href="https://learnosphere.in/CBSE-10thsyllabus"
        />
      </head>

      <div className="p-4 md:p-12 flex flex-col font-Poppins justify-center mt-20 ">
        <div>
          <h1 className="p-4 text-4xl font-extrabold bg-black text-orange-500  w-full md:w-1/5 m-auto text-center  rounded-lg shadow-2xl shadow-orange-900 ">
            CBSE Class 10 Syllabus 2024-25
          </h1>
        </div>
        <div className="pt-6">
          <p className="text-start w-[90%] m-auto">
            CBSE Syllabus for Class 10 for the 2023-24 academic year has been
            released by the board. The CBSE Class 10 Syllabus is a valuable
            resource for students preparing for board exams. It includes the
            course structure, distribution of unit marks, and number of periods
            allocated for each unit. Along with this, the CBSE Syllabus for
            Class 10 also provides information about reference books, projects,
            assignments, and practicals. A thorough understanding of the CBSE
            Syllabus for Class 10 will help students plan their studies better.
            Here, we have provided the links to all major subjects of the CBSE
            Class 10 Syllabus PDF. Covering the CBSE syllabus for students of
            Class 9 will help them enhance their academic knowledge for better
            learning outcomes.
          </p>
        </div>
        <div className="pt-6 items-center justify-center  ml-0 md:ml-12">
          <table className="table-auto w-full text-center  ">
            <tbody>
              <tr>
                <td className="border flex  justify-between p-4 border-gray-500 hover:bg-orange-600 transition-all ease-in duration-300 hover:scale-105 hover:text-white hover:border-none  ">
                  <Link
                    className="flex justify-between w-full font-semibold"
                    href="/CBSE/Class-10-Math"
                  >
                    <p>1</p>
                    CBSE Syllabus for class 10 Maths
                    <p>1</p>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-500 flex  justify-between p-4  hover:bg-orange-600 transition-all ease-in duration-300 hover:scale-105 hover:text-white hover:border-none">
                  <Link
                    className="flex justify-between w-full font-semibold"
                    href="/CBSE/Class-10-Science"
                  >
                    <p>2</p>
                    CBSE Syllabus for class 10 Science
                    <p>2</p>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-500 flex  justify-between p-4  hover:bg-orange-600 transition-all ease-in duration-300 hover:scale-105 hover:text-white hover:border-none">
                  <Link
                    className="flex justify-between w-full font-semibold"
                    href="/CBSE/Class-10-SocialScience"
                  >
                    <p>3</p>
                    CBSE Syllabus for class 10 Social Science
                    <p>3</p>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-500 flex  justify-between p-4  hover:bg-orange-600 transition-all ease-in duration-300 hover:scale-105 hover:text-white hover:border-none">
                  <Link
                    className="flex justify-between w-full font-semibold"
                    href="/CBSE/Class-10-English"
                  >
                    <p>4</p>
                    CBSE Syllabus for class 10 English
                    <p>4</p>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-500 flex  justify-between p-4  hover:bg-orange-600 transition-all ease-in duration-300 hover:scale-105 hover:text-white hover:border-none">
                  <Link
                    className="flex justify-between w-full font-semibold"
                    href="/CBSE/Class-10-Hindi"
                  >
                    <p>5</p>
                    CBSE Syllabus for class 10 Hindi
                    <p>5</p>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* === CBSE Class 10 Syllabus 2024–25 Section === */}
        <section className="bg-gradient-to-b from-white to-orange-50 py-16 px-6 md:px-12 lg:px-24 font-Poppins">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
              CBSE Class 10 Complete Syllabus
            </h1>
            <p className="text-center text-gray-700 max-w-3xl mx-auto leading-relaxed">
              At <b>Learnosphere</b>, we guide students to make the most of
              their study plan by understanding the syllabus first. Knowing the
              CBSE Class 10 syllabus is the first step toward effective
              preparation for school assessments and board exams.
            </p>

            {/* Cute Icons Section */}
            <div className="flex flex-wrap justify-center gap-8 mt-10">
              <Image
                src="https://learnosphere.s3.ap-south-1.amazonaws.com/public_images/10CBSEsyllabus2024.png"
                alt="study plan"
                height={500}
                width={500}
                className="w-28 h-28 object-contain"
              />
              <Image
                src="https://learnosphere.s3.ap-south-1.amazonaws.com/public_images/10CBSEsyllabus2024-1.png"
                alt="student learning"
                height={500}
                width={500}
                className="w-28 h-28 object-contain"
              />
            </div>

            {/* What the syllabus covers */}
            <div className="mt-16 bg-white shadow-md rounded-2xl p-8 border-r-4 border-orange-500">
              <h2 className="text-2xl font-semibold text-orange-700 mb-4">
                What the 2024-25 syllabus covers
              </h2>
              <p className="text-gray-700 mb-4">
                The CBSE Class 10 curriculum includes all major subjects —
                languages, mathematics, science, social science, and skill-based
                subjects.
              </p>
              <ul className="list-disc ml-6 text-gray-700 space-y-2 ">
                <li>
                  Clearly defined chapters and units for efficient study
                  planning.
                </li>
                <li>
                  Emphasis on conceptual clarity, application of knowledge, and
                  analytical thinking.
                </li>
                <li>
                  Structured for easy integration with class lessons, homework,
                  and revisions.
                </li>
              </ul>
            </div>

            {/* Importance */}
            <div className="mt-10 bg-orange-50 border-l-4 border-orange-500 rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-orange-700 mb-4">
                Why studying the syllabus is important
              </h2>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>
                  Know which topics to prioritize and plan your study schedule.
                </li>
                <li>
                  Align practice papers, solutions, and notes with the syllabus.
                </li>
                <li>
                  Build a structured learning sequence for strong conceptual
                  understanding.
                </li>
                <li>
                  Make your online maths tuition or school classes more
                  effective.
                </li>
              </ul>
            </div>

            {/* How Learnosphere helps */}
            <div className="mt-10 bg-white shadow-md rounded-2xl p-8 border-r-4 border-orange-500">
              <h2 className="text-2xl font-semibold text-orange-700 mb-4">
                How Learnosphere helps you follow the syllabus
              </h2>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>
                  Chapter-wise solutions mapped to each syllabus unit for
                  targeted practice.
                </li>
                <li>
                  Formula sheets, revision notes, and sample papers aligned with
                  the syllabus.
                </li>
                <li>
                  Online tuition sessions focused on syllabus-based clarity and
                  exam readiness.
                </li>
              </ul>
            </div>

            {/* Core structure */}
            <div className="mt-10 bg-orange-50 border-l-4 border-orange-500 rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-orange-700 mb-4">
                Core structure and continuity
              </h2>
              <p className="text-gray-700">
                While minor updates occur each year, the CBSE Class 10 syllabus
                structure remains consistent. It includes subject-wise modules,
                internal assessments, and board exams. Preparing thoroughly for
                2024-25 builds a strong foundation for future years. Students
                can also visit our <b>CBSE Class 10 Syllabus 2025-26</b> page
                for upcoming updates.
              </p>
            </div>

            {/* Study Planning Tips */}
            <div className="mt-10 bg-white shadow-md rounded-2xl p-8">
              <h2 className="text-2xl font-semibold text-orange-700 mb-4">
                How to use the syllabus for study planning
              </h2>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>
                  Break down the syllabus into chapters and units for each
                  subject.
                </li>
                <li>
                  Divide your academic year into blocks and assign topics per
                  period.
                </li>
                <li>
                  Use the syllabus as a checklist — mark completed chapters and
                  note weak areas.
                </li>
                <li>
                  Match practice papers with the corresponding syllabus units.
                </li>
                <li>
                  After mastering 2024-25, preview 2025-26 for early
                  preparation.
                </li>
              </ul>
            </div>

            {/* Summary */}
            <div className="mt-12 text-center bg-gradient-to-r from-orange-500 to-orange-600 text-white py-10 px-6 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold mb-2">In Summary</h3>
              <p className="max-w-3xl mx-auto leading-relaxed">
                Following the CBSE Class 10 Syllabus 2024-25 helps students stay
                organized and confident. With <b>Learnosphere’s</b> structured
                resources — from notes to online tuition — learners can
                strengthen concepts and prepare effectively for exams.
              </p>
            </div>
          </div>
        </section>
      </div>
        <FAQAccordion faqs={cbse10thFaqs} />
      <Footer1 />
      <Footer />
    </>
  );
};

export default Syllabus;

export const generateMetadata = () => {
  return {
    title: "Best 10th CBSE Tuition Classes in Jaipur | Learnosphere",
    description:
      "Join 10th CBSE tuition classes in Jaipur at Learnosphere for expert guidance and personalized coaching to excel in your exams. Enroll today and boost your results!",
    keywords:
      "CBSE Class 10 Syllabus, Class 10 Syllabus , Class 10 Syllabus 2024-25, Class 10 Syllabus 2024-25 CBSE, Class 10 Syllabus, Class 10 Syllabus 2024-25 CBSE, Class 10 Syllabus 2024-25 PDF, Class 10 Syllabus ",
  };
};
