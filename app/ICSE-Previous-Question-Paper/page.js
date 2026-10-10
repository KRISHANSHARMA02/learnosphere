"use client"
import Footer from '@/components/Footer'
import Footer1 from '@/components/Footer1'
import Navbar from '@/components/Navbar'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { GrNotes } from 'react-icons/gr';
import { HiArrowRightCircle } from "react-icons/hi2";
import { CgNotes } from "react-icons/cg";
import { IoNewspaperSharp } from 'react-icons/io5';
import { FaNoteSticky } from 'react-icons/fa6';

import Sociallinks2 from "@/components/Sociallinks2";
import AOS from "aos";
import "aos/dist/aos.css";
import FormSection from '@/components/FormGeneral';

const ICSEPreviousQuestionPapers = () => {
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

  const [uploadedUrls, setUploadedUrls] = useState({});

  const normalizeTitle = (title) => {
    if (!title) return '';
    const yearMatch = title.match(/\b(20\d{2})\b/);
    const year = yearMatch ? yearMatch[1] : '';
    const classMatch = title.match(/\b(?:class\s*|-)?(10|12)\b/i);
    const classNum = classMatch ? classMatch[1] : '';
    
    // Extract semester if present
    const semMatch = title.match(/\bsem(?:ester)?\s*(\d+)\b/i);
    const semNum = semMatch ? semMatch[1] : '';
    
    if (year && classNum) {
      return `class_${classNum}_${year}` + (semNum ? `_sem_${semNum}` : '');
    }
    return title.replace(/\s+/g, '').toLowerCase();
  };

  useEffect(() => {
    axios.get("https://learnospherebackend.learnosphere.in/api/ics-papers")
      .then(res => {
        let urlMap = {};
        if (res.data && res.data.data) {
          res.data.data.forEach(paper => {
            if (paper.title) urlMap[normalizeTitle(paper.title)] = paper.s3_url;
          });
        }
        
        axios.get("https://learnospherebackend.learnosphere.in/api/icse-papers")
          .then(res2 => {
            if (res2.data && res2.data.data) {
              res2.data.data.forEach(paper => {
                if (paper.title) urlMap[normalizeTitle(paper.title)] = paper.s3_url;
              });
            }
            setUploadedUrls(urlMap);
          })
          .catch(err => {
            console.error("Error fetching ICSE Class 8, 9, 11 papers:", err);
            setUploadedUrls(urlMap);
          });
      })
      .catch(err => console.error("Error fetching ICS papers:", err));
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
            <h1 className='text-[1.2em] md:text-[1.6em] font-bold '>ICSE Maths Previous Year Question Paper For Class 10th and 12th </h1>
          </div>
          <div className='flex flex-col gap-4 text-gray-950 mt-4 '>
            <p>ICSE Maths Previous Year Question Papers for Class 10th and 12th serve as a valuable resource for students preparing for their board exams. These papers help students get acquainted with the exam format, question types, and the level of difficulty they can expect. By solving these papers, students can track their progress, identify weak areas, and focus on improving them. With a thorough understanding of recurring topics, students can efficiently prepare for the exam. LearnOsphere provides access to these past papers with solutions, allowing students to practice and analyze their performance to boost their confidence and maximize their exam readiness.</p>
          </div>
          <div>
            <h3 className='text-[1.4em] font-semibold mt-4 p-2'>CBSE & ICSE Sample Papers and Previous Year Question Papers</h3>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-[.7em] md:text-[1em] mt-4'>
            <Link href="/CBSE-Sample-Papers" className='flex flex-col justify-between items-center bg-gradient-to-r from-purple-400 to-red-400 text-white p-4 gap-4 font-bold rounded-lg text-center'><GrNotes size={25} />CBSE Sample Papers</Link>
            <Link href="/icse-sample-papers" className='flex flex-col justify-between items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 gap-4 font-bold rounded-lg text-center'><CgNotes size={25} />ICSE Sample Papers</Link>
            <Link href="/Cbse-Previosyear-Questions" className='flex flex-col justify-between items-center bg-gradient-to-r from-blue-500 to-red-400 text-white p-4 gap-4 font-bold rounded-lg text-center'><IoNewspaperSharp size={25} />CBSE Previous Year Question</Link>
            <Link href="/ICSE-Previousyear-Questions" className='flex flex-col justify-between items-center bg-gradient-to-r from-cyan-500 to-purple-400 text-white p-4 gap-4 font-bold rounded-lg text-center'><FaNoteSticky size={25} />ICSE Previous Year Question</Link>
          </div>
          <div className='mt-4'>
            <p>CBSE & ICSE Sample Papers and Previous Year Question Papers are crucial tools for effective exam preparation. These papers provide students with a clear understanding of the exam pattern, types of questions, and important topics that are often tested. Practicing these papers allows students to familiarize themselves with the format, manage time efficiently, and boost their problem-solving skills. With LearnOsphere's collection of sample papers and past year questions, students can access solutions and in-depth explanations to enhance their learning. This structured approach ensures students are well-prepared and confident on exam day, increasing their chances of success.</p>
          </div>
          <div>
            <h2 className='font-semibold text-[1.1em] md:text-[1.4em] mt-5'>Advantages of CBSE & ICSE Sample Papers and Previous Year Question Papers</h2>
          </div>
          <div className='mt-2'>
            <ol className='text-orange-600 flex flex-col gap-2 list-decimal px-8'>
              <li>Helps students understand the structure and format of the exam.</li>
              <li>Enhances the ability to complete the exam within the allotted time.</li>
              <li>Highlights recurring topics that are crucial for exams.</li>
              <li>Strengthens problem-solving skills through varied questions.</li>
              <li>Regular practice reduces exam anxiety and builds confidence.</li>
              <li>Enables students to work more efficiently, improving accuracy in answers.</li>

            </ol>
          </div>
          <div className='bg-gray-50 p-2'>
            <div className='mt-4 text-gray-900'>
              <h3 className='text-[1.1em] md:text-[1.4em] font-semibold'>ICSE Maths Previous Question Papers For Class 10th Year Wise</h3>
              <p className='mt-4'>ICSE Maths Previous Question Papers for Class 10th, year-wise, provide students with an invaluable resource to understand the evolving trends and patterns in the exam. By solving papers from different years, students can identify the key areas and topics that frequently appear in the exams. These papers help students get accustomed to the variety of questions, whether they are application-based or conceptual. Year-wise practice allows for better time management, aids in boosting accuracy, and increases overall confidence. LearnOsphere offers a structured collection of these papers, allowing students to practice with ease and track their progress effectively for optimal exam preparation.</p>
            </div>
            <div>
              <ol className='px-1 md:px-4 mt-4 list-disc'>
                {[
                  "ICSE Previous Year Question Paper for Class 10 Maths 2023",
                  "ICSE Previous Year Question Paper for Class 10 Maths 2022",
                  "ICSE Previous Year Question Paper for Class 10 Maths 2020",
                  "ICSE Previous Year Question Paper for Class 10 Maths 2019",
                  "ICSE Previous Year Question Paper for Class 10 Maths 2018",
                  "ICSE Previous Year Question Paper for Class 10 Maths 2017",
                  "ICSE Previous Year Question Paper for Class 10 Maths 2016",
                  "ICSE Previous Year Question Paper for Class 10 Maths 2015"
                ].map((title, i) => (
                  <li key={i} className="list-none">
                    {uploadedUrls[normalizeTitle(title)] ? (
                      <a 
                        href={uploadedUrls[normalizeTitle(title)]}
                        download
                        className='text-blue-600 border-b border-gray-300 p-4 font-semibold flex justify-between items-center hover:bg-gray-50'
                      >
                        {title}
                        <HiArrowRightCircle size={27} className='text-orange-600' />
                      </a>
                    ) : (
                      <button 
                        onClick={() => alert("PDF not uploaded yet for this paper.")}
                        className='w-full text-left text-gray-800 border-b border-gray-300 p-4 font-semibold flex justify-between items-center hover:bg-gray-50 cursor-pointer'
                      >
                        {title}
                        <HiArrowRightCircle size={27} className='text-gray-400' />
                      </button>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className='bg-gray-50 p-2'>
            <div className='mt-4 text-gray-900'>
              <h3 className='text-[1.1em] md:text-[1.4em] font-semibold'>ICSE Maths Previous Question Papers For Class 12th Year Wise</h3>
              <p className='mt-4'>ICSE Maths Previous Question Papers for Class 12th, year-wise, serve as an essential resource for students aiming to excel in their exams. By reviewing and solving papers from previous years, students can gain insight into the exam’s difficulty level, recurring question types, and important topics. These year-wise papers help students practice effective time management, refine their problem-solving techniques, and identify areas for improvement. LearnOsphere provides access to these papers along with solutions, enabling students to analyze their mistakes and enhance their preparation strategy, ultimately boosting their confidence for the upcoming board exams.</p>
            </div>
            <div>
              <ol className='px-1 md:px-4 mt-4 list-disc'>
                {[
                  "ISC Previous Year Question Paper for Class 12 Maths 2023",
                  "ISC Previous Year Question Paper for Class 12 Maths 2019",
                  "ISC Previous Year Question Paper for Class 12 Maths 2018",
                  "ISC Previous Year Question Paper for Class 12 Maths 2017",
                  "ISC Previous Year Question Paper for Class 12 Maths 2016",
                  "ISC Previous Year Question Paper for Class 12 Maths 2015"
                ].map((title, i) => (
                  <li key={i} className="list-none">
                    {uploadedUrls[normalizeTitle(title)] ? (
                      <a 
                        href={uploadedUrls[normalizeTitle(title)]}
                        download
                        className='text-blue-600 border-b border-gray-300 p-4 font-semibold flex justify-between items-center hover:bg-gray-50'
                      >
                        {title}
                        <HiArrowRightCircle size={27} className='text-orange-600' />
                      </a>
                    ) : (
                      <button 
                        onClick={() => alert("PDF not uploaded yet for this paper.")}
                        className='w-full text-left text-gray-800 border-b border-gray-300 p-4 font-semibold flex justify-between items-center hover:bg-gray-50 cursor-pointer'
                      >
                        {title}
                        <HiArrowRightCircle size={27} className='text-gray-400' />
                      </button>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className='mt-4 flex flex-col gap-4'>
            <p>Joining LearnOsphere offers a transformative learning experience that goes beyond just exam preparation. The platform provides access to a vast range of resources, including sample papers, previous year question papers, and comprehensive study materials, all curated to help students master their subjects. With interactive learning tools, step-by-step explanations, and expert guidance, LearnOsphere ensures that every student can grasp even the most challenging concepts. Whether you’re aiming for higher grades or a deep understanding of the subject, LearnOsphere equips you with the skills and confidence to succeed academically. Join now and take the first step towards achieving your educational goals!</p>
          </div>
        </div>
        <div className='flex flex-col gap-5 w-full md:w-[25%] font-Poppins'>
          <div className='w-full bg-white p-8 '>
            <input type='text' id='search' name='search' placeholder='Type To Search' value={searchQuery} onChange={handleInputChange} onKeyDown={handleKeyDown} className='placeholder:text-gray-500 p-3 w-full  rounded-md border border-gray-400' />
          </div>
          <div className=' bg-white p-5  rounded-lg'>
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

export default ICSEPreviousQuestionPapers
