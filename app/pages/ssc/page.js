import React from "react";
import Footer1 from "@/components/Footer1";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


export default function Ssc() {
  return (
    <div>
      <Navbar />

      <div className="container mx-auto p-12  flex flex-col justify-center mt-12 font-Poppins">
        <div className="flex items-center justify-center">
          <h1 className="text-2xl font-Poppins uppercase pl-4 text-orange-600 md:pl-0 md:text-4xl font-bold ">
            This Service Coming Soon at Learnosphere
            <span className="animate-ping">......</span>
          </h1>
        </div>
        <div className="mt-4">
          <h1 className="p-4 text-4xl font-extrabold bg-orange-500">
            SSC Exam Preparation{" "}
          </h1>
        </div>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p>
            The Staff Selection Commission (SSC) conducts various exams for
            recruitment to different posts in the Government of India's
            departments, ministries, and organizations. This section provides
            resources and guidance for your SSC exam preparation.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Exam Pattern</h2>
          <ul className="list-disc ml-6">
            <li className="mb-2">
              <strong>Tier I:</strong> Preliminary exam consisting of four
              sections - General Intelligence & Reasoning, General Awareness,
              Quantitative Aptitude, and English Comprehension.
            </li>
            <li className="mb-2">
              <strong>Tier II:</strong> Main exam consisting of four papers -
              Quantitative Abilities, English Language & Comprehension,
              Statistics, and General Studies (Finance & Economics).
            </li>
            <li className="mb-2">
              <strong>Tier III:</strong> Descriptive paper in English or Hindi.
            </li>
            <li className="mb-2">
              <strong>Tier IV:</strong> Data Entry Skill Test (DEST) / Computer
              Proficiency Test (CPT).
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Syllabus</h2>
          <p>
            The SSC syllabus includes topics from General Intelligence &
            Reasoning, General Awareness, Quantitative Aptitude, English
            Comprehension, Statistics, and General Studies (Finance &
            Economics). Detailed syllabus can be found on the official SSC
            website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Study Materials</h2>
          <p>Here are some Subjects:</p>
          <ul className="list-disc ml-6">
            <li className="mb-2">Quantitative Aptitude </li>
            <li className="mb-2">Objective General English </li>
            <li className="mb-2">Lucent's General Knowledge</li>
            <li className="mb-2">Analytical Reasoning </li>
            {/* <li className="mb-2"></li> */}
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Preparation Tips</h2>
          <p>
            Effective preparation for the SSC exam requires a strategic
            approach. Here are some tips to help you get started:
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
              Read newspapers daily to stay updated with current affairs.
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
    title: "SSC Exam Preparation - Learnosphere",
    description:
      "Prepare for the Staff Selection Commission (SSC) exams with resources, guidance, and study materials.",

     keywords: 'SSC, Staff Selection Commission, SSC exam, SSC preparation, SSC syllabus, SSC study materials, SSC tips, SSC exam pattern, SSC subjects, SSC books, SSC resources, SSC guidance, SSC exam date, SSC notification, SSC admit card, SSC result, SSC cut off, SSC previous year papers, SSC mock tests, SSC online coaching, SSC online classes, SSC online course, SSC online test series, SSC online study material, SSC online preparation, SSC online exam, SSC online practice test, SSC online mock test, SSC online coaching classes, SSC online video lectures, SSC online live classes, SSC online study plan, SSC online guidance, SSC online resources, SSC online support, SSC online community, SSC online discussion, SSC online doubt clearing, SSC online preparation tips, SSC online strategy, SSC online timetable, SSC online schedule, SSC online syllabus, SSC online subjects, SSC online books, SSC online notes, SSC online quizzes, SSC online tests, SSC online quizzes, SSC online questions, SSC online answers, SSC online solutions, SSC online tips, SSC online tricks, SSC online shortcuts, SSC online techniques, SSC online hacks, SSC online best practices, SSC online advice, SSC online mentorship, SSC online coaching, SSC online guidance, SSC online support, SSC online community, SSC online discussion, SSC online doubt clearing, SSC online preparation tips, SSC online strategy, SSC online timetable, SSC online schedule, SSC online syllabus, SSC online subjects, SSC online books, SSC online notes, SSC online quizzes, SSC online tests, SSC online quizzes, SSC online questions, SSC online answers, SSC online solutions, SSC online tips, SSC online tricks, SSC online shortcuts, SSC online techniques, SSC online hacks, SSC online best practices, SSC online advice, SSC online mentorship, SSC online coaching, SSC online guidance, SSC online support, SSC online community, SSC online discussion, SSC online doubt clearing, SSC online preparation tips, SSC online strategy, SSC online timetable, SSC online schedule, SSC online syllabus, SSC online subjects, SSC online books, SSC online notes, SSC online quizzes, SSC online tests, SSC online quizzes, SSC online questions, SSC online answers, SSC online solutions, SSC online tips, SSC online tricks, SSC online shortcuts, SSC online techniques, SSC online hacks, SSC online best practices, SSC online advice, SSC online mentorship, SSC online coaching, SSC online guidance, SSC online support, SSC online community, SSC online discussion, SSC online doubt clearing, SSC online preparation tips, SSC online strategy, SSC online timetable, SSC online schedule, SSC ', 
  };
};
