import React from "react";
import Footer1 from "@/components/Footer1";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Navodiya() {
  return (
    <div>
      <Navbar />

      <div className="container mx-auto p-12  flex flex-col justify-center mt-12 font-Poppins">
        <div className="flex items-center justify-center">
          <p className="text-2xl font-Poppins uppercase pl-4 text-orange-600 md:pl-0 md:text-4xl font-bold ">
            This Service Coming Soon at Learnosphere
            <span className="animate-ping">......</span>
          </p>
        </div>
        <div className="mt-4">
          <h1 className="p-4 text-4xl font-extrabold bg-orange-500">
            Sainik School Entrance Exam Preparation
          </h1>
        </div>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p>
            The Sainik School Entrance Exam, also known as the All India Sainik
            Schools Entrance Examination (AISSEE), is conducted for admission to
            Sainik Schools across India. These schools prepare students for
            entry into the National Defence Academy (NDA). This section provides
            resources and guidance for preparing for the Sainik School Entrance
            Exam.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Exam Pattern</h2>
          <p>
            The Sainik School Entrance Exam is conducted for admission to
            classes VI and IX. The exam pattern is as follows:
          </p>
          <h3 className="text-xl font-semibold mt-4">Class VI Exam Pattern</h3>
          <ul className="list-disc ml-6">
            <li className="mb-2">Mathematics: 50 questions, 150 marks</li>
            <li className="mb-2">
              General Knowledge (Science & Social Studies): 25 questions, 50
              marks
            </li>
            <li className="mb-2">Language: 25 questions, 50 marks</li>
            <li className="mb-2">Intelligence: 25 questions, 50 marks</li>
          </ul>
          <h3 className="text-xl font-semibold mt-4">Class IX Exam Pattern</h3>
          <ul className="list-disc ml-6">
            <li className="mb-2">Mathematics: 50 questions, 200 marks</li>
            <li className="mb-2">English: 25 questions, 50 marks</li>
            <li className="mb-2">General Science: 25 questions, 50 marks</li>
            <li className="mb-2">Social Studies: 25 questions, 50 marks</li>
            <li className="mb-2">Intelligence: 25 questions, 50 marks</li>
          </ul>
          <p>
            The total duration for the exam is 2.5 hours for both classes VI and
            IX.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Exam Syllabus</h2>
          <h3 className="text-xl font-semibold mt-4">Class VI Syllabus</h3>
          <ul className="list-disc ml-6">
            <li className="mb-2">
              Mathematics: Number System, HCF & LCM, Approximation, Roman
              Numerals, and others
            </li>
            <li className="mb-2">
              General Knowledge: Science (Basic concepts from Class V syllabus),
              Social Studies (General knowledge from Class V syllabus)
            </li>
            <li className="mb-2">
              Language: Basic Grammar, Reading Comprehension, and Vocabulary
            </li>
            <li className="mb-2">
              Intelligence: Analytical and Logical Reasoning
            </li>
          </ul>
          <h3 className="text-xl font-semibold mt-4">Class IX Syllabus</h3>
          <ul className="list-disc ml-6">
            <li className="mb-2">
              Mathematics: Algebra, Geometry, Mensuration, Number System, and
              others
            </li>
            <li className="mb-2">
              English: Grammar, Composition, and Reading Comprehension
            </li>
            <li className="mb-2">
              General Science: Physics, Chemistry, Biology (From Class VIII
              syllabus)
            </li>
            <li className="mb-2">
              Social Studies: History, Geography, Civics (From Class VIII
              syllabus)
            </li>
            <li className="mb-2">
              Intelligence: Analytical and Logical Reasoning
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Preparation Tips</h2>
          <p>
            Effective preparation for the Sainik School Entrance Exam requires a
            strategic approach. Here are some tips to help you get started:
          </p>
          <ul className="list-disc ml-6">
            <li className="mb-2">
              Understand the exam pattern and syllabus thoroughly.
            </li>
            <li className="mb-2">Create a study schedule and stick to it.</li>
            <li className="mb-2">
              Practice previous years' question papers and mock tests.
            </li>
            <li className="mb-2">Focus on time management and accuracy.</li>
            <li className="mb-2">
              Strengthen your conceptual understanding of core subjects.
            </li>
            <li className="mb-2">
              Regularly revise the topics you have studied.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Explore More on Learnosphere
          </h2>

          <ul className="list-disc ml-6">
            <li className="mb-2">
              <Link
                href="/CBSE_Syllabus"
                className="text-orange-500 hover:text-orange-700 hover:underline"
              >
                CBSE syllabus information
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="/Courses"
                className="text-orange-500 hover:text-orange-700 hover:underline"
              >
                Online courses for Classes 1–12
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="/CBSE-Sample-Papers"
                className="text-orange-500 hover:text-orange-700 hover:underline"
              >
                Sample papers & study resources
              </Link>
            </li>
    
          </ul>
        </section>
      </div>
      <Footer1 />
      <Footer />
    </div>
  );
}

export const generateMetadata = () => {
  return {
    title: "Sainik School Entrance Exam Preparation - Learnosphere",
    description:
      "Prepare for the Sainik School Entrance Exam with resources and guidance on Learnosphere.",
    keywords:
      "sainik school entrance exam, sainik school entrance exam preparation, sainik school entrance exam syllabus, sainik school entrance exam pattern, sainik school entrance exam resources, sainik school entrance exam tips,",
  };
};
