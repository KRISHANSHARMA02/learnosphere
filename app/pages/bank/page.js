import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Footer1 from "@/components/Footer1";

export default function Bank() {
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
            Banking Exam Preparation{" "}
          </h1>
        </div>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p>
            Banking exams in India are conducted for recruitment to various
            positions in public sector and private sector banks. Some of the
            prominent banking exams include IBPS PO, IBPS Clerk, SBI PO, SBI
            Clerk, and RBI Grade B. This section provides resources and guidance
            for your banking exam preparation.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Exam Pattern</h2>
          <ul className="list-disc ml-6">
            <li className="mb-2">
              <strong>Preliminary Exam:</strong> The preliminary exam generally
              consists of three sections - English Language, Quantitative
              Aptitude, and Reasoning Ability.
            </li>
            <li className="mb-2">
              <strong>Main Exam:</strong> The main exam typically includes
              sections like General/Financial Awareness, General English,
              Reasoning Ability & Computer Aptitude, and Quantitative Aptitude.
            </li>
            <li className="mb-2">
              <strong>Interview:</strong> Candidates who qualify in the main
              exam are called for a personal interview.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Syllabus</h2>
          <p>
            The banking exam syllabus covers a range of topics including English
            Language, Quantitative Aptitude, Reasoning Ability,
            General/Financial Awareness, and Computer Knowledge. Detailed
            syllabus can be found on the official exam websites.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Study Materials</h2>
          <p>
            Here are some recommended books and resources for banking exam
            preparation:
          </p>
          <ul className="list-disc ml-6">
            <li className="mb-2">
              Quantitative Aptitude for Competitive Examinations{" "}
            </li>
            <li className="mb-2">Objective General English </li>
            <li className="mb-2">
              A Modern Approach to Verbal & Non-Verbal Reasoning{" "}
            </li>
            <li className="mb-2">Banking Awareness by Arihant Publications</li>
            <li className="mb-2">Lucent's General Knowledge</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Preparation Tips</h2>
          <p>
            Effective preparation for banking exams requires a strategic
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
              Read newspapers daily to stay updated with current affairs and
              financial news.
            </li>
          </ul>
        </section>

        {/* <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Online Resources</h2>
        <p>
          Utilize online resources such as websites, blogs, and YouTube channels dedicated to banking exam preparation. Some popular ones include:
        </p>
        <ul className="list-disc ml-6">
          <li className="mb-2"><a href="https://www.bankersadda.com" className="text-blue-600 underline">BankersAdda</a></li>
          <li className="mb-2"><a href="https://www.gr8ambitionz.com" className="text-blue-600 underline">Gr8AmbitionZ</a></li>
          <li className="mb-2"><a href="https://www.oliveboard.in" className="text-blue-600 underline">Oliveboard</a></li>
          <li className="mb-2"><a href="https://www.careerpower.in" className="text-blue-600 underline">Career Power</a></li>
        </ul>
      </section> */}
      </div>

      <Footer1 />
      <Footer />
    </div>
  );
}

export const generateMetadata = () => {
  return {
    title: "Banking Exam Preparation - Learnosphere",
    description:
      "Prepare for banking exams like IBPS PO, SBI PO, and RBI Grade B with our resources and guidance. Get study materials, exam pattern, syllabus, and preparation tips for banking exams.",
    keywords:
      "Banking exams, IBPS PO, SBI PO, RBI Grade B, banking exam preparation, banking exam syllabus, banking exam pattern, banking exam study materials",
  };
};
