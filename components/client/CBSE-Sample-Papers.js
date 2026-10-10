"use client"
import Footer from '@/components/Footer'
import Footer1 from '@/components/Footer1'
import Navbar from '@/components/Navbar'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { GrNotes } from 'react-icons/gr';
import { HiArrowRightCircle } from "react-icons/hi2";
import { CgNotes } from "react-icons/cg";
import { IoNewspaperSharp } from 'react-icons/io5';
import { FaNoteSticky } from 'react-icons/fa6';
import Image from 'next/image';
import ChartImage from '@/public/Monochrome Long Distance Birthday Facebook Cover.png'
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaTimes, FaWhatsapp } from 'react-icons/fa';
import Sociallinks2 from "@/components/Sociallinks2";
import FormSection from '@/components/FormGeneral';

import AOS from "aos";
import "aos/dist/aos.css";

const SamplePapers = () => {


   const [searchQuery, setSearchQuery] = useState("");

     const [showButton, setShowButton] = useState(false);
   
       useEffect(() => {
         const interval = setInterval(() => {
           setShowButton((prev) => !prev);
         }, 10000); // Toggle every 10 seconds
     
         return () => clearInterval(interval);
       }, []);
   
       useEffect(() => {
           AOS.init({ duration: 800, easing: "ease-in-out" }); // Initialize AOS with smooth settings
         }, []);
  
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

  return (
 <div>
      <Navbar />
      <div className='flex flex-col md:flex-row gap-4 mt-24 px-4 md:px-8 xl:px-20'>
        <div className=' font-Poppins w-full md:w-[75%]'>
          <div className="fixed right-8 top-[650px] md:top-[550px] flex flex-col items-center space-y-4">

          </div>
          <div>
            <h1 className='text-2xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-snug mb-4'>CBSE Sample Papers for Class 10 & 12: Your Ultimate Guide</h1>
          </div>
          <div className='flex flex-col gap-4 text-gray-950 mt-4 '>
            <p>Preparing for the CBSE Class 10 and Class 12 board exams can be challenging, but practicing with CBSE sample papers is one of the most effective study strategies. These carefully designed papers simulate the format, difficulty, and question types of the actual board exams, giving students a realistic idea of what to expect. By solving CBSE sample papers (many available in PDF format), you can build confidence and focus your preparation on areas that matter most.</p>
            <p>Official CBSE Class 10 and Class 12 sample papers are available on the CBSE website and various educational platforms. Many of these include detailed solutions or marking schemes, helping you evaluate your answers and refine your exam strategy. Incorporating sample papers into your study plan ensures comprehensive coverage of core chapters from the CBSE syllabus while improving exam-solving skills. For the upcoming academic year, it is wise to combine sample papers with previous year question papers to stay updated with any pattern changes and syllabus modifications for 2025–26.</p>
            <p>With LearnOsphere providing these sample papers, students are offered a structured approach to practice. By regularly solving sample papers, students can track their performance, fine-tune their skills, and ensure they are exam-ready. The platform also offers additional resources like answer keys and explanations to further enhance the learning experience. Overall, CBSE Sample Papers for Class 8 to 12 are a critical tool for academic success, helping students excel in their board exams.            </p>
          </div>
          <div>
            <h2 className='font-semibold text-[1.1em] md:text-[1.4em] mt-5'>Benefits of CBSE Sample Papers</h2>
          </div>
          <div className='mt-2'>
            <ol className='text-orange-600 flex flex-col gap-2 list-decimal px-8'>
              <li>Helps students understand the structure and format of the actual exam.</li>
              <li>Enhances the ability to manage time during the exam.</li>
              <li>Helps students identify and work on weak areas.</li>
              <li>Reduces exam anxiety and increases confidence.</li>
              <li>Improves critical thinking and problem-solving ability.</li>
              <li>Increases chances of performing well in the actual exam.</li>
            </ol>
          </div>
          <div>
            <h2 className='text-[1.4em] font-semibold mt-4 p-2'>Math Formulas with CBSE & ICSE Previous Year Questions and ICSE Sample Papers</h2>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-[.7em] md:text-[1em] mt-4'>
            <Link href="/MathsFormula" className='flex flex-col justify-between items-center bg-gradient-to-r from-purple-400 to-red-400 text-white p-4 gap-4 font-bold rounded-lg text-center'><GrNotes size={25} />Math Formula</Link>
            <Link href="/icse-sample-papers" className='flex flex-col justify-between items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 gap-4 font-bold rounded-lg text-center'><CgNotes size={25} />ICSE Sample Papers</Link>
            <Link href="/Cbse-Previosyear-Questions" className='flex flex-col justify-between items-center bg-gradient-to-r from-blue-500 to-red-400 text-white p-4 gap-4 font-bold rounded-lg text-center'><IoNewspaperSharp size={25} />CBSE Previous Year Question</Link>
            <Link href="/ICSE-Previousyear-Questions" className='flex flex-col justify-between items-center bg-gradient-to-r from-cyan-500 to-purple-400 text-white p-4 gap-4 font-bold rounded-lg text-center'><FaNoteSticky size={25} />ICSE Previous Year Question</Link>
          </div>
          <div className='mt-4'>
            <p>LearnOsphere brings together a complete package of math formulas, CBSE previous year questions, and ICSE sample papers to help students achieve academic excellence. The curated math formulas cover essential topics across all grades, simplifying concepts from basic arithmetic to advanced calculus. Additionally, the CBSE and ICSE question papers provide valuable insights into exam patterns, marking schemes, and commonly tested topics. With LearnOsphere’s resources, students can practice effectively, build confidence, and enhance their problem-solving skills, ensuring they excel in both school exams and competitive challenges.</p>
          </div>
          <h2 className='font-semibold text-[1.1em] md:text-[1.4em] mt-5'>CBSE Sample Papers For Class 8 to 12</h2>
          <div className='bg-gray-100 p-2 rounded-xl shadow-sm my-2'>
            <div className='mt-4 text-gray-900'>
              <h3 className='text-[1.1em] md:text-[1.4em] font-semibold'>CBSE Sample Papers For Class 8 </h3>
            </div>
            <div>
              <ol className='px-1 md:px-4 mt-4 list-disc'>
                <Link href="/CBSE-Sample-Papers/CBSE-Sample-Papers-for-Class-8-Maths" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Sample Papers For Class 8 Mathematics<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                {/* <Link href="/CBSE-Sample-Papers/CBSE-Sample-Papers-for-Class-9-Maths" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Sample Papers For Class 9<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/CBSE-Sample-Papers/CBSE-Class-10-Maths-Sample-Paper-Basic-and-Standard" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Sample Papers For Class 10<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/CBSE-Sample-Papers/CBSE-Sample-Papers-for-Class-11-Maths" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Sample Papers For Class 11<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/CBSE-Sample-Papers/CBSE-Class-12-Maths-Sample-Papers" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Sample Papers For Class 12<HiArrowRightCircle size={27} className='text-orange-600' /></Link> */}
              </ol>
            </div>

          </div>
          <div className='bg-gray-100 p-2 rounded-xl shadow-sm my-2'>
            <div className='mt-4 text-gray-900'>
              <h3 className='text-[1.1em] md:text-[1.4em] font-semibold'>CBSE Sample Papers For Class 9</h3>
            </div>
            <div>
              <ol className='px-1 md:px-4 mt-4 list-disc'>
                {/* <Link href="/CBSE-Sample-Papers/CBSE-Sample-Papers-for-Class-8-Maths" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Sample Papers For Class 8<HiArrowRightCircle size={27} className='text-orange-600' /></Link> */}
                <Link href="/CBSE-Sample-Papers/CBSE-Sample-Papers-for-Class-9-Maths" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Sample Papers For Class 9 Mathematics<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                {/* <Link href="/CBSE-Sample-Papers/CBSE-Class-10-Maths-Sample-Paper-Basic-and-Standard" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Sample Papers For Class 10<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/CBSE-Sample-Papers/CBSE-Sample-Papers-for-Class-11-Maths" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Sample Papers For Class 11<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/CBSE-Sample-Papers/CBSE-Class-12-Maths-Sample-Papers" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Sample Papers For Class 12<HiArrowRightCircle size={27} className='text-orange-600' /></Link> */}
              </ol>
            </div>
          </div>
          <div className='bg-gray-100 p-2 rounded-xl shadow-sm my-2'>
            <div className='mt-4 text-gray-900'>
              <h3 className='text-[1.1em] md:text-[1.4em] font-semibold'>CBSE Sample Papers For Class 10</h3>
            </div>
            <div>
              <ol className='px-1 md:px-4 mt-4 list-disc'>
                {/* <Link href="/CBSE-Sample-Papers/CBSE-Sample-Papers-for-Class-8-Maths" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Sample Papers For Class 8<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/CBSE-Sample-Papers/CBSE-Sample-Papers-for-Class-9-Maths" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Sample Papers For Class 9<HiArrowRightCircle size={27} className='text-orange-600' /></Link> */}
                <Link href="/CBSE-Sample-Papers/CBSE-Class-10-Maths-Sample-Paper-Basic-and-Standard" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Sample Papers For Class 10<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                {/* <Link href="/CBSE-Sample-Papers/CBSE-Sample-Papers-for-Class-11-Maths" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Sample Papers For Class 11<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/CBSE-Sample-Papers/CBSE-Class-12-Maths-Sample-Papers" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Sample Papers For Class 12<HiArrowRightCircle size={27} className='text-orange-600' /></Link> */}
              </ol>
            </div>
          </div>
          <div className='bg-gray-100 p-2 rounded-xl shadow-sm my-2'>
            <div className='mt-4 text-gray-900'>
              <h3 className='text-[1.1em] md:text-[1.4em] font-semibold'>CBSE Sample Papers For Class 11</h3>
            </div>
            <div>
              <ol className='px-1 md:px-4 mt-4 list-disc'>
                {/* <Link href="/CBSE-Sample-Papers/CBSE-Sample-Papers-for-Class-8-Maths" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Sample Papers For Class 8<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/CBSE-Sample-Papers/CBSE-Sample-Papers-for-Class-9-Maths" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Sample Papers For Class 9<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/CBSE-Sample-Papers/CBSE-Class-10-Maths-Sample-Paper-Basic-and-Standard" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Sample Papers For Class 10<HiArrowRightCircle size={27} className='text-orange-600' /></Link> */}
                <Link href="/CBSE-Sample-Papers/CBSE-Sample-Papers-for-Class-11-Maths" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Sample Papers For Class 11 Maths<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                {/* <Link href="/CBSE-Sample-Papers/CBSE-Class-12-Maths-Sample-Papers" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Sample Papers For Class 12<HiArrowRightCircle size={27} className='text-orange-600' /></Link> */}
              </ol>
            </div>
          </div>
          <div className='bg-gray-100 p-2 rounded-xl shadow-sm my-2'>
            <div className='mt-4 text-gray-900'>
              <h3 className='text-[1.1em] md:text-[1.4em] font-semibold'>CBSE Sample Papers For Class 12</h3>
            </div>
            <div>
              <ol className='px-1 md:px-4 mt-4 list-disc'>
                <Link href="/CBSE-Sample-Papers/CBSE-Sample-Papers-for-Class-12-Accountancy" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Sample Papers For Class 12 Accountancy<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/CBSE-Sample-Papers/CBSE-Sample-Papers-for-Class-12-Biology" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Sample Papers For Class 12 Biology<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/CBSE-Sample-Papers/CBSE-Sample-Papers-for-Class-12-Business-Study" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Sample Papers For Class 12 Business Studies<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/CBSE-Sample-Papers/CBSE-Sample-Papers-for-Class-12-Chemistry" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Sample Papers For Class 12 Chemistry<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/CBSE-Sample-Papers/CBSE-Sample-Papers-for-Class-12-Economics" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Sample Papers For Class 12 Economics<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/CBSE-Sample-Papers/CBSE-Sample-Papers-for-Class-12-English" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Sample Papers For Class 12 English<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/CBSE-Sample-Papers/CBSE-Sample-Papers-for-Class-12-Hindi" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Sample Papers For Class 12 Hindi<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/CBSE-Sample-Papers/CBSE-Sample-Papers-for-Class-12-Maths" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Sample Papers For Class 12 Mathematics<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/CBSE-Sample-Papers/CBSE-Class-12-Maths-Sample-Papers" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Sample Papers For Class 12 Mathematics 2023-24<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/CBSE-Sample-Papers/CBSE-Sample-Papers-for-Class-12-Physics" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Sample Papers For Class 12 Physics<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/CBSE-Sample-Papers/CBSE-Sample-Papers-for-Class-12-Physical-Health-Education" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Sample Papers For Class 12 Physical Health Education<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/CBSE-Sample-Papers/CBSE-Sample-Papers-for-Class-12-Political-Science" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Sample Papers For Class 12 Political Science<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
              </ol>
            </div>
          </div>
          <div className='mt-4'>
            <p>LearnOsphere is your ultimate learning companion, offering a comprehensive range of resources tailored to student needs. From detailed math formulas to expertly crafted CBSE and ICSE sample papers and previous year question papers, the platform ensures a structured and efficient learning experience. With interactive tools, step-by-step explanations, and practical examples, LearnOsphere simplifies even the most complex concepts. Its focus on bridging theoretical knowledge with real-world applications helps students build confidence and achieve academic success. Join LearnOsphere to unlock your full potential and make learning a rewarding journey!</p>
          </div>
          <div className='mt-4 flex flex-col gap-4'>
            <p></p>
            <p></p>
          </div>

        </div>
        <div className='flex flex-col gap-5 w-full md:w-[25%] font-Poppins'>
          <div className='w-full bg-white p-8 '>
            <input type='text' id='search' name='search' placeholder='Type To Search' value={searchQuery} onChange={handleInputChange} onKeyDown={handleKeyDown} className='placeholder:text-gray-500 p-3 w-full  rounded-md border border-gray-400' />
          </div>
          <div className=' bg-white p-5  rounded-lg shadow-sm'>
             <FormSection />

          </div>

        </div>

      </div>
      <Sociallinks2 />
      <Footer1 />
      <Footer />
    </div>
  )
}

export default SamplePapers
