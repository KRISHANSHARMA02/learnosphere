"use client";
import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Footer1 from '@/components/Footer1';
import SyllabusVisitTracker from '@/components/SyllabusVisitTracker';
import FAQAccordion from '@/components/FAQAccordion';
import { HiArrowRightCircle } from 'react-icons/hi2';

const Syllabussc = () => {
  const faqs = [
    {
      question: "Where can I find the CBSE Class 11 syllabus?",
      answer: "You can explore the subject-wise resources on Learnosphere or download the official curriculum from the CBSE Academic website."
    },
    {
      question: "Which subjects are available in CBSE Class 11?",
      answer: "CBSE offers languages, academic electives and skill-based subject options. Common choices include Mathematics, Physics, Chemistry, Biology, Accountancy, Business Studies, Economics, English and Political Science. The subjects available to each student depend on school offerings and permitted combinations."
    },
    {
      question: "How many subjects can students choose in Class 11?",
      answer: "The CBSE senior-secondary scheme provides a subject combination structure that includes languages and academic or skill electives, with an additional subject option. Students should consult the current official scheme of studies and their school before finalising their combination."
    },
    {
      question: "Is Mathematics compulsory in CBSE Class 11?",
      answer: "Mathematics is not compulsory for every CBSE Class 11 student. Whether you need it depends on your selected subjects, school requirements and future academic plans."
    },
    {
      question: "What is the difference between PCM and PCB?",
      answer: "PCM commonly refers to a combination of Physics, Chemistry and Mathematics. PCB commonly refers to Physics, Chemistry and Biology. These are commonly used descriptions of subject combinations, not fixed CBSE stream categories."
    },
    {
      question: "Are Class 11 and Class 12 CBSE syllabuses connected?",
      answer: "Yes. Class 11 and Class 12 form part of the senior-secondary stage. Students should check the CBSE scheme of studies and the subject requirements for both classes when choosing their subjects."
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <SyllabusVisitTracker page="CBSE_11th_Syllabus" classNum="11" />
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-Poppins mt-16 md:mt-20">
        
        {/* Badge & H1 */}
        <div className="text-center mb-6">
          <span className="inline-block px-6 py-2 text-xl md:text-2xl font-extrabold bg-black text-orange-500 rounded-lg shadow-xl shadow-orange-950/20 mb-4">
            Class 11th
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            CBSE Class 11 Syllabus: Subjects and Curriculum
          </h1>
        </div>

        {/* Intro Paragraphs */}
        <div className="flex flex-col gap-4 text-gray-800 leading-relaxed text-base md:text-lg mb-10">
          <p>
            The CBSE Class 11 syllabus introduces students to subject-specific concepts and provides the academic foundation for Class 12 and further studies. Students can choose from different languages, academic electives and skill-based subjects according to their interests, future goals and school availability.
          </p>
          <p>
            Learnosphere provides subject-wise study resources for CBSE Class 11, including Mathematics, Physics, Chemistry, Biology, English, Hindi, Accountancy, Business Studies, Economics and Political Science.
          </p>
          <p className="font-medium text-orange-600">
            Explore the subject list below to find the relevant Class 11 syllabus and study material.
          </p>
        </div>

        {/* Quick Table of Subjects */}
        <div className="mb-12">
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
            CBSE Term Wise Syllabus for Class 11 All Subjects
          </h3>
          <table className="table-auto w-full text-center border-collapse">
            <tbody>
              <tr>
                <td className="border p-4 border-gray-400 hover:bg-orange-600 transition-all ease-in duration-300 hover:scale-[1.01] hover:text-white hover:border-transparent cursor-pointer rounded-sm">
                  <Link className="flex justify-between items-center w-full font-semibold" href="/CBSE/Class-11-Math">
                    <span>1</span>
                    <span>CBSE Term Wise Syllabus for Class 11 Maths</span>
                    <span>1</span>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="border p-4 border-gray-400 hover:bg-orange-600 transition-all ease-in duration-300 hover:scale-[1.01] hover:text-white hover:border-transparent cursor-pointer rounded-sm">
                  <Link className="flex justify-between items-center w-full font-semibold" href="/CBSE/Class-11-Physics">
                    <span>2</span>
                    <span>CBSE Term Wise Syllabus for Class 11 Physics</span>
                    <span>2</span>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="border p-4 border-gray-400 hover:bg-orange-600 transition-all ease-in duration-300 hover:scale-[1.01] hover:text-white hover:border-transparent cursor-pointer rounded-sm">
                  <Link className="flex justify-between items-center w-full font-semibold" href="/CBSE/Class-11-Chemistry">
                    <span>3</span>
                    <span>CBSE Term Wise Syllabus for Class 11 Chemistry</span>
                    <span>3</span>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="border p-4 border-gray-400 hover:bg-orange-600 transition-all ease-in duration-300 hover:scale-[1.01] hover:text-white hover:border-transparent cursor-pointer rounded-sm">
                  <Link className="flex justify-between items-center w-full font-semibold" href="/CBSE/Class-11-Biology">
                    <span>4</span>
                    <span>CBSE Term Wise Syllabus for Class 11 Biology</span>
                    <span>4</span>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="border p-4 border-gray-400 hover:bg-orange-600 transition-all ease-in duration-300 hover:scale-[1.01] hover:text-white hover:border-transparent cursor-pointer rounded-sm">
                  <Link className="flex justify-between items-center w-full font-semibold" href="/CBSE/Class-11-English">
                    <span>5</span>
                    <span>CBSE Term Wise Syllabus for Class 11 English</span>
                    <span>5</span>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="border p-4 border-gray-400 hover:bg-orange-600 transition-all ease-in duration-300 hover:scale-[1.01] hover:text-white hover:border-transparent cursor-pointer rounded-sm">
                  <Link className="flex justify-between items-center w-full font-semibold" href="/CBSE/Class-11-Hindi">
                    <span>6</span>
                    <span>CBSE Term Wise Syllabus for Class 11 Hindi</span>
                    <span>6</span>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="border p-4 border-gray-400 hover:bg-orange-600 transition-all ease-in duration-300 hover:scale-[1.01] hover:text-white hover:border-transparent cursor-pointer rounded-sm">
                  <Link className="flex justify-between items-center w-full font-semibold" href="/CBSE/Class-11-Accountancy">
                    <span>7</span>
                    <span>CBSE Term Wise Syllabus for Class 11 Accountancy</span>
                    <span>7</span>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="border p-4 border-gray-400 hover:bg-orange-600 transition-all ease-in duration-300 hover:scale-[1.01] hover:text-white hover:border-transparent cursor-pointer rounded-sm">
                  <Link className="flex justify-between items-center w-full font-semibold" href="/CBSE/Class-11-BussinessStudies">
                    <span>8</span>
                    <span>CBSE Term Wise Syllabus for Class 11 Business Studies</span>
                    <span>8</span>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="border p-4 border-gray-400 hover:bg-orange-600 transition-all ease-in duration-300 hover:scale-[1.01] hover:text-white hover:border-transparent cursor-pointer rounded-sm">
                  <Link className="flex justify-between items-center w-full font-semibold" href="/CBSE/Class-11-Economics">
                    <span>9</span>
                    <span>CBSE Term Wise Syllabus for Class 11 Economics</span>
                    <span>9</span>
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="border p-4 border-gray-400 hover:bg-orange-600 transition-all ease-in duration-300 hover:scale-[1.01] hover:text-white hover:border-transparent cursor-pointer rounded-sm">
                  <Link className="flex justify-between items-center w-full font-semibold" href="/CBSE/Class-11-PoliticalScience">
                    <span>10</span>
                    <span>CBSE Term Wise Syllabus for Class 11 Political Science</span>
                    <span>10</span>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* CBSE Class 11 Curriculum Overview */}
        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
            CBSE Class 11 Curriculum Overview
          </h2>
          <div className="flex flex-col gap-4 text-gray-800 leading-relaxed">
            <p>
              The CBSE Class 11 curriculum is organised around languages, academic electives and other permitted subject options. Students generally select a combination of subjects based on their academic interests and the options offered by their school.
            </p>
            <p>
              The curriculum helps students develop subject knowledge, analytical thinking, problem-solving abilities and practical understanding. Depending on the subject, learning and assessment may include written examinations, practical work, projects or internal assessment.
            </p>
          </div>
        </div>

        {/* CBSE Class 11 Subjects */}
        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
            CBSE Class 11 Subjects
          </h2>
          <div className="flex flex-col gap-4 text-gray-800 leading-relaxed mb-6">
            <p>
              Students can choose from different subject combinations at the senior secondary level. The subjects available to an individual student depend on CBSE&apos;s subject-selection rules and the options offered by their school.
            </p>
            <p className="font-semibold text-gray-900">
              Some commonly studied Class 11 subjects include:
            </p>
          </div>

          {/* Science-related subjects */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
              Science-related subjects
            </h3>
            <p className="text-gray-800 mb-3 leading-relaxed">
              Students interested in science and technology may study subjects such as:
            </p>
            <ul className="list-disc px-6 text-gray-800 space-y-1 mb-4 leading-relaxed">
              <li>Physics</li>
              <li>Chemistry</li>
              <li>Mathematics</li>
              <li>Biology</li>
              <li>Computer Science</li>
              <li>Informatics Practices</li>
            </ul>
            <p className="text-gray-700 text-sm italic">
              Mathematics and Biology are different subject choices. Students should check which combinations their school offers before selecting their subjects.
            </p>
          </div>

          {/* Commerce-related subjects */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
              Commerce-related subjects
            </h3>
            <p className="text-gray-800 mb-3 leading-relaxed">
              Students interested in business, finance and economics commonly consider:
            </p>
            <ul className="list-disc px-6 text-gray-800 space-y-1 mb-4 leading-relaxed">
              <li>Accountancy</li>
              <li>Business Studies</li>
              <li>Economics</li>
              <li>Mathematics or Applied Mathematics</li>
              <li>English or another permitted language</li>
            </ul>
            <p className="text-gray-700 text-sm italic">
              The exact combination depends on the school&apos;s subject options and applicable CBSE rules.
            </p>
          </div>

          {/* Humanities and social science subjects */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
              Humanities and social science subjects
            </h3>
            <p className="text-gray-800 mb-3 leading-relaxed">
              Students interested in society, governance, history and human behaviour may consider subjects such as:
            </p>
            <ul className="list-disc px-6 text-gray-800 space-y-1 mb-4 leading-relaxed">
              <li>Political Science</li>
              <li>History</li>
              <li>Geography</li>
              <li>Economics</li>
              <li>Psychology</li>
              <li>Sociology</li>
            </ul>
            <p className="text-gray-700 text-sm italic">
              These subjects are part of the wider senior-secondary academic elective options. Students should confirm availability with their school.
            </p>
          </div>

          <div className="p-4 bg-orange-50 border-l-4 border-orange-500 rounded text-gray-800 text-sm leading-relaxed">
            <span className="font-semibold text-orange-950">Note: </span>
            Science, Commerce and Humanities are commonly used labels for subject combinations. They should not be treated as fixed CBSE-prescribed streams. CBSE provides subject choices under its senior-secondary scheme, subject to permitted combinations and school availability.
          </div>
        </div>

        {/* CBSE Class 11 Subject-wise Syllabus */}
        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
            CBSE Class 11 Subject-wise Syllabus
          </h2>
          <p className="text-gray-800 leading-relaxed mb-6">
            Explore the available Learnosphere subject pages to find subject-specific syllabus information and study resources.
          </p>

          {/* Mathematics and Science */}
          <div className="mb-8">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              Mathematics and Science
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-bold text-gray-900 mb-2">Mathematics</h4>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    Study sets, relations and functions, trigonometric functions, algebra, coordinate geometry, calculus, statistics and probability through the Class 11 Mathematics curriculum.
                  </p>
                </div>
                <Link
                  href="/CBSE/Class-11-Math"
                  className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors"
                >
                  <span>Explore: CBSE Class 11 Mathematics Syllabus</span>
                  <HiArrowRightCircle size={18} className="text-orange-600" />
                </Link>
              </div>

              <div className="p-5 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-bold text-gray-900 mb-2">Physics</h4>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    Explore fundamental concepts related to measurements, motion, laws of motion, work and energy, gravitation, properties of matter, thermodynamics, oscillations and waves.
                  </p>
                </div>
                <Link
                  href="/CBSE/Class-11-Physics"
                  className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors"
                >
                  <span>Explore: CBSE Class 11 Physics Syllabus</span>
                  <HiArrowRightCircle size={18} className="text-orange-600" />
                </Link>
              </div>

              <div className="p-5 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-bold text-gray-900 mb-2">Chemistry</h4>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    Study the concepts covered in the Class 11 Chemistry curriculum, including physical, inorganic and organic chemistry topics.
                  </p>
                </div>
                <Link
                  href="/CBSE/Class-11-Chemistry"
                  className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors"
                >
                  <span>Explore: CBSE Class 11 Chemistry Syllabus</span>
                  <HiArrowRightCircle size={18} className="text-orange-600" />
                </Link>
              </div>

              <div className="p-5 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-bold text-gray-900 mb-2">Biology</h4>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    Explore the Class 11 Biology curriculum and study material covering the major areas of biological science.
                  </p>
                </div>
                <Link
                  href="/CBSE/Class-11-Biology"
                  className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors"
                >
                  <span>Explore: CBSE Class 11 Biology Syllabus</span>
                  <HiArrowRightCircle size={18} className="text-orange-600" />
                </Link>
              </div>
            </div>
          </div>

          {/* Languages */}
          <div className="mb-8">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              Languages
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-bold text-gray-900 mb-2">English</h4>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    Explore the prescribed English course, literature, reading comprehension, writing skills and language-related study resources.
                  </p>
                </div>
                <Link
                  href="/CBSE/Class-11-English"
                  className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors"
                >
                  <span>Explore: CBSE Class 11 English Syllabus</span>
                  <HiArrowRightCircle size={18} className="text-orange-600" />
                </Link>
              </div>

              <div className="p-5 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-bold text-gray-900 mb-2">Hindi</h4>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    Find Class 11 Hindi syllabus information and resources for the relevant Hindi course. Check whether your school offers Hindi Core or Hindi Elective before selecting the corresponding curriculum.
                  </p>
                </div>
                <Link
                  href="/CBSE/Class-11-Hindi"
                  className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors"
                >
                  <span>Explore: CBSE Class 11 Hindi Syllabus</span>
                  <HiArrowRightCircle size={18} className="text-orange-600" />
                </Link>
              </div>
            </div>
          </div>

          {/* Commerce and Social Science */}
          <div className="mb-8">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              Commerce and Social Science
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-bold text-gray-900 mb-2">Accountancy</h4>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    Learn about the Class 11 Accountancy curriculum, including accounting concepts, principles and financial recording.
                  </p>
                </div>
                <Link
                  href="/CBSE/Class-11-Accountancy"
                  className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors"
                >
                  <span>Explore: CBSE Class 11 Accountancy Syllabus</span>
                  <HiArrowRightCircle size={18} className="text-orange-600" />
                </Link>
              </div>

              <div className="p-5 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-bold text-gray-900 mb-2">Business Studies</h4>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    Explore topics related to business organisation, management, business activities and the business environment.
                  </p>
                </div>
                <Link
                  href="/CBSE/Class-11-BussinessStudies"
                  className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors"
                >
                  <span>Explore: CBSE Class 11 Business Studies Syllabus</span>
                  <HiArrowRightCircle size={18} className="text-orange-600" />
                </Link>
              </div>

              <div className="p-5 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-bold text-gray-900 mb-2">Economics</h4>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    Study the economic concepts and subject areas included in the Class 11 Economics curriculum.
                  </p>
                </div>
                <Link
                  href="/CBSE/Class-11-Economics"
                  className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors"
                >
                  <span>Explore: CBSE Class 11 Economics Syllabus</span>
                  <HiArrowRightCircle size={18} className="text-orange-600" />
                </Link>
              </div>

              <div className="p-5 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-bold text-gray-900 mb-2">Political Science</h4>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    Explore the Class 11 Political Science curriculum and study resources related to political theory and political institutions.
                  </p>
                </div>
                <Link
                  href="/CBSE/Class-11-PoliticalScience"
                  className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors"
                >
                  <span>Explore: CBSE Class 11 Political Science Syllabus</span>
                  <HiArrowRightCircle size={18} className="text-orange-600" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* CBSE Class 11 Assessment and Examination Pattern */}
        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
            CBSE Class 11 Assessment and Examination Pattern
          </h2>
          <div className="flex flex-col gap-4 text-gray-800 leading-relaxed mb-6">
            <p>
              The assessment structure in Class 11 depends on the subject and its prescribed curriculum. Some subjects include practical examinations, while others may have project work or internal assessment components.
            </p>
            <p>
              Students should check the assessment details for each subject rather than assuming that every subject follows the same examination pattern.
            </p>
            <p className="font-semibold text-gray-900">
              Before preparing for examinations, review:
            </p>
            <ul className="list-disc px-6 text-gray-800 space-y-1">
              <li>The prescribed subject syllabus</li>
              <li>Theory examination requirements</li>
              <li>Practical examination requirements, where applicable</li>
              <li>Project work and internal assessment requirements, where applicable</li>
              <li>Subject-specific marks distribution and examination duration</li>
            </ul>
            <p className="text-gray-700 text-sm italic mt-2">
              For accurate and current assessment information, refer to the relevant subject document on the official CBSE Academic website.
            </p>
          </div>
        </div>

        {/* How to Download the CBSE Class 11 Syllabus */}
        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
            How to Download the CBSE Class 11 Syllabus
          </h2>
          <p className="text-gray-800 leading-relaxed mb-4">
            Students can access the official CBSE curriculum by following these steps:
          </p>
          <ol className="list-decimal px-6 text-gray-800 space-y-2 leading-relaxed mb-6">
            <li>Visit the CBSE Academic website OR Learnosphere</li>
            <li>Open the curriculum section for Classes XI and XII.</li>
            <li>Find the subject you are studying.</li>
            <li>Open the corresponding curriculum document.</li>
            <li>Review the subject code, syllabus, assessment structure and prescribed course details.</li>
            <li>Download the document for reference.</li>
          </ol>
          <div className="p-4 bg-orange-50 border-l-4 border-orange-500 rounded text-gray-800 text-sm leading-relaxed">
            <span className="font-semibold text-orange-950">Tip: </span>
            Always check the academic session mentioned in the official document before using it for examination preparation.
          </div>
        </div>

        {/* How to Prepare for Class 11 Examinations */}
        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
            How to Prepare for Class 11 Examinations
          </h2>
          <p className="text-gray-800 leading-relaxed mb-4">
            Class 11 introduces more detailed concepts and subject-specific learning. A structured study routine can help students manage the syllabus effectively.
          </p>
          <ol className="list-decimal px-6 text-gray-800 space-y-3 leading-relaxed">
            <li>
              <span className="font-semibold text-gray-900">Understand your subjects:</span> Start by reviewing the syllabus for every subject you have selected.
            </li>
            <li>
              <span className="font-semibold text-gray-900">Follow a study timetable:</span> Divide your available study time between subjects according to their requirements.
            </li>
            <li>
              <span className="font-semibold text-gray-900">Understand concepts first:</span> Focus on learning the concepts instead of memorising information without understanding it.
            </li>
            <li>
              <span className="font-semibold text-gray-900">Practise questions:</span> Solve textbook exercises, numerical problems and other relevant questions regularly.
            </li>
            <li>
              <span className="font-semibold text-gray-900">Complete practical and project work:</span> Give sufficient time to laboratory work, assignments and projects where required.
            </li>
            <li>
              <span className="font-semibold text-gray-900">Revise regularly:</span> Review completed topics to strengthen your understanding.
            </li>
            <li>
              <span className="font-semibold text-gray-900">Check your progress:</span> Use tests and practice questions to identify topics that need more attention.
            </li>
          </ol>
        </div>

        {/* FAQs */}
        <div className="mb-12">
          <FAQAccordion faqs={faqs} title="Frequently Asked Questions About CBSE Class 11 Syllabus" />
        </div>

      </div>

      <Footer1 />
      <Footer />
    </div>
  );
};

export default Syllabussc;
