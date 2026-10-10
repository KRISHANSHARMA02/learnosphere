import React from 'react'
import Footer1 from '@/components/Footer1'
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";




export default function Upsc() {
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
                    <h1 className='p-4 text-4xl font-extrabold bg-orange-500'>UPSC Exam Preparation </h1>
                </div>

      <section className="mb-8 mt-4">
        <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
        <p>
          The Union Public Service Commission (UPSC) conducts various exams for recruitment into the civil services of India, including the prestigious Indian Administrative Service (IAS), Indian Police Service (IPS), and Indian Foreign Service (IFS). This section provides resources and guidance for your UPSC exam preparation.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Exam Pattern</h2>
        <ul className="list-disc ml-6">
          <li className="mb-2">
            <strong>Preliminary Exam:</strong> The preliminary exam consists of two papers - General Studies and Civil Services Aptitude Test (CSAT). Both papers are objective type.
          </li>
          <li className="mb-2">
            <strong>Main Exam:</strong> The main exam consists of nine papers, including four General Studies papers, two optional subject papers, and papers on essay, English, and Indian languages.
          </li>
          <li className="mb-2">
            <strong>Personality Test:</strong> Candidates who qualify in the main exam are called for a personal interview.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Syllabus</h2>
        <p>
          The UPSC syllabus covers a wide range of topics, including history, geography, polity, economy, environment, and current affairs. Detailed syllabus can be found on the official UPSC website.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Study Materials</h2>
        <p>
          Here are some recommended books and resources for UPSC preparation:
        </p>
        <ul className="list-disc ml-6">
          <li className="mb-2">NCERT Books (Class 6-12)</li>
          <li className="mb-2">Indian Polity </li>
          <li className="mb-2">History of Modern India </li>
          <li className="mb-2">Economic Survey</li>
          <li className="mb-2">India Year Book</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Preparation Tips</h2>
        <p>
          Effective preparation for the UPSC exam requires a strategic approach. Here are some tips to help you get started:
        </p>
        <ul className="list-disc ml-6">
          <li className="mb-2">Understand the exam pattern and syllabus thoroughly.</li>
          <li className="mb-2">Create a study schedule and stick to it.</li>
          <li className="mb-2">Read newspapers daily to stay updated with current affairs.</li>
          <li className="mb-2">Practice writing answers to improve your writing skills.</li>
          <li className="mb-2">Take mock tests regularly to assess your preparation.</li>
        </ul>
      </section>
{/* 
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Online Resources</h2>
        <p>
          Utilize online resources such as websites, blogs, and YouTube channels dedicated to UPSC preparation. Some popular ones include:
        </p>
        <ul className="list-disc ml-6">
          <li className="mb-2"><a href="https://www.insightsonindia.com" className="text-blue-600 underline">InsightsonIndia</a></li>
          <li className="mb-2"><a href="https://www.clearias.com" className="text-blue-600 underline">ClearIAS</a></li>
          <li className="mb-2"><a href="https://www.mrunal.org" className="text-blue-600 underline">Mrunal</a></li>
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
        title: 'UPSC Exam Preparation - Learnosphere',
        description: 'Prepare for the UPSC exam with our resources and guidance. Get tips, study materials, and online resources for your UPSC exam preparation.',

        keywords: 'UPSC, IAS, IPS, IFS, civil services, exam preparation, study materials, online resources, tips, syllabus, exam pattern',
        
    }
}
