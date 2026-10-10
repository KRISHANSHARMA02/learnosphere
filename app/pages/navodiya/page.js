import Footer1 from '@/components/Footer1';
import React from 'react'
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";



export default function Navodiya() {
    return (
        <div>
            <Navbar />
            
    <div className="container mx-auto p-12  flex flex-col justify-center mt-12 font-Poppins">
      <div className="flex items-center justify-center">
            <h1 className="text-2xl font-Poppins uppercase pl-4 text-orange-600 md:pl-0 md:text-4xl font-bold ">
              This Service Coming Soon at Learnosphere<span className="animate-ping">......</span>
            </h1>
          </div>
      <div className="mt-4">
                    <h1 className='p-4 text-4xl font-extrabold bg-orange-500'>Navodaya Vidyalaya Entrance Exam Preparation</h1>
                </div>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
        <p>
          The Navodaya Vidyalaya Entrance Exam, also known as the Jawahar Navodaya Vidyalaya Selection Test (JNVST), is conducted to identify talented students from rural areas and provide them with high-quality education. This section provides resources and guidance for preparing for the Navodaya Vidyalaya Entrance Exam.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Exam Pattern</h2>
        <p>
          The Navodaya Vidyalaya Entrance Exam consists of objective-type questions and is divided into three sections:
        </p>
        <ul className="list-disc ml-6">
          <li className="mb-2">Mental Ability Test (MAT): 50 questions, 50 marks</li>
          <li className="mb-2">Arithmetic Test: 25 questions, 25 marks</li>
          <li className="mb-2">Language Test: 25 questions, 25 marks</li>
        </ul>
        <p>
          The total duration of the exam is 2 hours, and it is conducted in various regional languages.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Syllabus</h2>
        <p>
          The syllabus for the Navodaya Vidyalaya Entrance Exam includes the following topics:
        </p>
        <h3 className="text-xl font-semibold mt-4">Mental Ability Test (MAT)</h3>
        <ul className="list-disc ml-6">
          <li className="mb-2">Figure Matching</li>
          <li className="mb-2">Figure Series Completion</li>
          <li className="mb-2">Pattern Completion</li>
          <li className="mb-2">Analogies</li>
          <li className="mb-2">Geometrical Figures</li>
          <li className="mb-2">Mirror Imaging</li>
          <li className="mb-2">Punched Hole Pattern</li>
          <li className="mb-2">Space Visualization</li>
          <li className="mb-2">Embedded Figures</li>
        </ul>
        <h3 className="text-xl font-semibold mt-4">Arithmetic Test</h3>
        <ul className="list-disc ml-6">
          <li className="mb-2">Number System</li>
          <li className="mb-2">Four Fundamental Operations on Whole Numbers</li>
          <li className="mb-2">Fractional Numbers and Decimals</li>
          <li className="mb-2">Factors and Multiples</li>
          <li className="mb-2">L.C.M. and H.C.F.</li>
          <li className="mb-2">Percentage and Its Applications</li>
          <li className="mb-2">Profit and Loss</li>
          <li className="mb-2">Simple Interest</li>
          <li className="mb-2">Distance, Time, and Speed</li>
          <li className="mb-2">Area and Volume</li>
        </ul>
        <h3 className="text-xl font-semibold mt-4">Language Test</h3>
        <p>
          The language test evaluates reading comprehension and basic grammar knowledge. The test is designed to assess the student's understanding of the language, ability to interpret and analyze passages, and proficiency in grammar.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Preparation Tips</h2>
        <p>
          Effective preparation for the Navodaya Vidyalaya Entrance Exam requires a strategic approach. Here are some tips to help you get started:
        </p>
        <ul className="list-disc ml-6">
          <li className="mb-2">Understand the exam pattern and syllabus thoroughly.</li>
          <li className="mb-2">Create a study schedule and stick to it.</li>
          <li className="mb-2">Practice previous years' question papers and mock tests.</li>
          <li className="mb-2">Focus on time management and accuracy.</li>
          <li className="mb-2">Strengthen your conceptual understanding of core subjects.</li>
          <li className="mb-2">Regularly revise the topics you have studied.</li>
        </ul>
      </section>

      {/* <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Resources</h2>
        <p>
          Utilize the following resources to aid in your preparation:
        </p>
        <ul className="list-disc ml-6">
          <li className="mb-2"><a href="https://navodaya.gov.in" className="text-blue-600 underline">Official Navodaya Vidyalaya Website</a></li>
          <li className="mb-2"><a href="https://www.examrace.com" className="text-blue-600 underline">Examrace</a></li>
          <li className="mb-2"><a href="https://www.mypat.in" className="text-blue-600 underline">MyPAT</a></li>
          <li className="mb-2"><a href="https://www.studyadda.com" className="text-blue-600 underline">StudyAdda</a></li>
          <li className="mb-2"><a href="https://www.aglasem.com" className="text-blue-600 underline">Aglasem</a></li>
        </ul>
      </section> */}
    </div>
    <Footer1 />
        <Footer />
        </div >
    )
}

export const generateMetadata = () => {
    return {
        title: 'Navodaya Vidyalaya Entrance Exam Preparation - Learnosphere',
        description: 'Prepare effectively for the Navodaya Vidyalaya Entrance Exam with our comprehensive study resources and guidance. Get tips, exam pattern, syllabus, and more to ace the JNVST.',
        keywords: 'Navodaya Vidyalaya Entrance Exam, JNVST, Navodaya Vidyalaya Selection Test, JNVST preparation, Navodaya Vidyalaya Entrance Exam syllabus, Navodaya Vidyalaya Entrance Exam pattern, Navodaya Vidyalaya Entrance Exam tips, Navodaya Vidyalaya Entrance Exam resources, JNVST syllabus, JNVST pattern, JNVST tips, JNVST resources, JNVST preparation tips, JNVST study materials, JNVST practice papers',
    };
}
