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

import Sociallinks2 from "@/components/Sociallinks2";
import AOS from "aos";
import "aos/dist/aos.css";
import FormSection from '@/components/FormGeneral';

const CBSEPreviousYearQuestion = () => {
  const [searchQuery, setSearchQuery] = useState(null)
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
    setSearchQuery(e.target.value)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchQuery) {
      window.location.href = `/SearchResult?query=${searchQuery}`;
    }
  }
    
  return (
    <div>
      <Navbar />
      <div className='flex flex-col lg:flex-row gap-4 mt-24 px-4 md:px-8 xl:px-20 w-full lg:w-[90%] mx-auto '>
        <div className=' font-Poppins w-full lg:w-[75%]'>
          <div className="fixed right-8 top-[650px] md:top-[550px] flex flex-col items-center space-y-4">

          </div>
          <div>
            <h1 className='text-2xl md:text-4xl font-bold text-gray-800 leading-snug mb-4'>CBSE Previous Year Question for Class 10th and 12th </h1>
          </div>
          <div className='flex flex-col gap-4 text-gray-950 mt-4 '>
            <p className='text-gray-700 text-base leading-relaxed'>CBSE Previous Year Question Papers for Class 10th and 12th Maths are invaluable resources for students preparing for board exams. These papers provide a clear understanding of the exam pattern, frequently asked questions, and key topics that are often tested. By solving these papers, students can familiarize themselves with the types of questions, the level of difficulty, and the marking scheme. Practicing with these papers helps students refine their problem-solving techniques and develop a strategic approach to exam preparation, ensuring they are fully equipped to tackle the real exam with confidence.</p>
            <p className='text-gray-700 text-base leading-relaxed'>LearnOsphere offers a comprehensive collection of CBSE Previous Year Question Papers for both Class 10th and 12th Maths, with detailed solutions and explanations to enhance understanding. By regularly practicing these papers, students can track their progress, improve their time management, and identify areas of improvement. This practice ensures students are well-prepared, boosting their chances of scoring higher marks in their board exams.</p>
          </div>
          <div>
            <h3 className='text-[1.4em] font-semibold mt-4 p-2'>Math Formula and CBSE & ICSE Sample Papers and ICSE Previous Year Question Papers</h3>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-[.7em] md:text-[1em] mt-4'>
            <Link href="/CBSE-Sample-Papers" className='flex flex-col justify-between items-center bg-gradient-to-r from-purple-400 to-red-400 text-white p-4 gap-4 font-bold rounded-lg text-center'><GrNotes size={25} />CBSE Sample Papers</Link>
            <Link href="/icse-sample-papers" className='flex flex-col justify-between items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 gap-4 font-bold rounded-lg text-center'><CgNotes size={25} />ICSE Sample Papers</Link>
            <Link href="/MathsFormula" className='flex flex-col justify-between items-center bg-gradient-to-r from-blue-500 to-red-400 text-white p-4 gap-4 font-bold rounded-lg text-center'><IoNewspaperSharp size={25} />Math Formula</Link>
            <Link href="/ICSE-Previousyear-Questions" className='flex flex-col justify-between items-center bg-gradient-to-r from-cyan-500 to-purple-400 text-white p-4 gap-4 font-bold rounded-lg text-center'><FaNoteSticky size={25} />ICSE Previous Year Question</Link>
          </div>
          <div className='mt-4'>
            <p className='text-gray-700 text-base leading-relaxed'>LearnOsphere provides a complete learning package with essential Math formulas, CBSE & ICSE sample papers, and ICSE previous year question papers. This comprehensive approach helps students grasp key mathematical concepts, practice with real exam-style questions, and familiarize themselves with the exam format. The platform's wide range of sample papers and previous year question papers ensures that students are well-prepared for their exams, boosting their problem-solving skills and time management. With detailed solutions and explanations, LearnOsphere empowers students to excel in both CBSE and ICSE board exams.</p>
          </div>
          <div>
            <h2 className='font-semibold text-[1.1em] md:text-[1.4em] mt-5'>Advantages of CBSE Previous Year Question Papers </h2>
          </div>
          <div className='mt-2'>
            <ol className='text-orange-600 flex flex-col gap-2 list-decimal px-8'>
              <li>Familiarizes students with the exam pattern and question types.</li>
              <li>Helps identify important topics frequently tested in exams.</li>
              <li>Enhances time management skills for completing the paper on time.</li>
              <li>Strengthens problem-solving abilities through consistent practice.</li>
              <li>Builds confidence and reduces exam-related anxiety.</li>
              <li>Prepares students for any unexpected questions in the exam.</li>

            </ol>
          </div>
          <div className='bg-gray-50 p-2'>
            <div className='mt-4 text-gray-900'>
              <h3 className='text-[1.1em] md:text-[1.4em] font-semibold'>CBSE Previous Question Papers Maths</h3>
            </div>
            <div>
              <ol className='px-1 md:px-4 mt-4 list-disc'>
                <Link href="/Cbse-Previosyear-Questions/CBSE-Class-10-Maths-Previous-Year-Papers" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Previous Year Question Papers Class 10 Maths<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/Cbse-Previosyear-Questions/CBSE-Previous-Year-Question-Paper-for-Class-12-Maths" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Previous Year Question Papers Class 12 Maths<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/Cbse-Previosyear-Questions/CBSE-Previous-Year-Question-Paper-for-Class-12-Physics" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Previous Year Question Papers Class 12 Physics<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/Cbse-Previosyear-Questions/CBSE-Previous-Year-Question-Paper-for-Class-12-Chemistry" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Previous Year Question Papers Class 12 Chemistry<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/Cbse-Previosyear-Questions/CBSE-Previous-Year-Question-Paper-for-Class-12-Biology" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Previous Year Question Papers Class 12 Biology<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/Cbse-Previosyear-Questions/CBSE-Previous-Year-Question-Paper-for-Class-12-English" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Previous Year Question Papers Class 12 English<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/Cbse-Previosyear-Questions/CBSE-Previous-Year-Question-Paper-for-Class-12-Accountancy" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Previous Year Question Papers Class 12 Accountancy<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/Cbse-Previosyear-Questions/CBSE-Previous-Year-Question-Paper-for-Class-12-BusinessStudy" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Previous Year Question Papers Class 12 Business Study<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/Cbse-Previosyear-Questions/CBSE-Previous-Year-Question-Paper-for-Class-12-Economics" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Previous Year Question Papers Class 12 Economics<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/Cbse-Previosyear-Questions/CBSE-Previous-Year-Question-Paper-for-Class-12-Hindi" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Previous Year Question Papers Class 12 Hindi<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/Cbse-Previosyear-Questions/CBSE-Previous-Year-Question-Paper-for-Class-12-PoliticalScience" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Previous Year Question Papers Class 12 Political Science<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/Cbse-Previosyear-Questions/CBSE-Previous-Year-Question-Paper-for-Class-12-PhysicalEducation" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Previous Year Question Papers Class 12 Physical Education<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
              </ol>
            </div>
          </div>

          <div className='mt-4 flex flex-col gap-4'>
            <p className='text-gray-700 text-base leading-relaxed'>Join LearnOsphere for a holistic and effective learning experience tailored to your academic needs. With expertly crafted resources like math formulas, sample papers, and previous year question papers for CBSE and ICSE, we ensure comprehensive preparation for exams. Our interactive tools, detailed explanations, and step-by-step guidance make complex concepts easy to understand. Whether you're aiming for school exams or competitive tests, LearnOsphere offers the support and resources needed to build confidence, improve skills, and achieve academic success.</p>
          </div>
        </div>
        <div className='flex flex-col gap-5 w-full lg:w-[25%] font-Poppins'>
          <div className='w-full bg-white p-8 '>
            <input type='text' id='search' name='search' placeholder='Type To Search' value={searchQuery} onChange={handleInputChange} onKeyDown={handleKeyDown} className='placeholder:text-gray-500 p-3 w-full  rounded-md border border-gray-400' />
          </div>
          <div>
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

export default CBSEPreviousYearQuestion
