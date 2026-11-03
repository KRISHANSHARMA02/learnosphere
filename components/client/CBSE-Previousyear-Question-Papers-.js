"use client"
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
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
import WhatsappModal from "@/components/whatsappModal";
import AOS from "aos";
import "aos/dist/aos.css";


const CBSEPreviousYearQuestionPapers = () => {

  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [email, setEmail] = useState('')
  const [grade, setGrade] = useState('')
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState('')
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
  const handleContact = (e) => {
    const { value } = e.target;
    if (/^\d{0,10}$/.test(value)) {
      setContact(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess('');

    const formData = {
      name, email, contact, grade
    };

    try {
      const response = await axios.post(`${WEB_BACKEND_URL}/api/route/formulaForm`, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Correct the response status check
      if (response.status === 200) {
        setSuccess('Form Submitted Successfully');
        setName('');
        setEmail('');
        setContact('');
        setGrade('');

        // SweetAlert for success message
        Swal.fire({
          title: "Thank You for Reaching Out!",
          text: "Your query has been received, and our team will contact you shortly.Meanwhile, explore Learnosphere to find top educators and resources tailored just for you. Sign up today and start your learning journey with us!",
          icon: "success"
        });
      } else {
        setErrors({ general: 'Failed to submit the form. Please try again.' });
      }
    } catch (error) {
      // Handle error responses
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: 'An error occurred while submitting the form.' });
      }
    }
  };
  return (
    <div>
      <Navbar />
      <div className='flex flex-col md:flex-row gap-4 mt-24 px-4 md:px-8 xl:px-20'>
        <div className=' font-Poppins w-full md:w-[75%]'>
        <div className="fixed right-8 top-[650px] md:top-[550px] flex flex-col items-center space-y-4">
                {/* WhatsApp Modal */}
                {showButton && (
                  <div
                    data-aos="fade-up"
                    className="absolute bottom-10 md:bottom-16 right-0 md:-left-[390px] 2xl:right-1 xl:-left-[370px] rounded-lg p-4 transition-transform transform duration-500 ease-in-out"
                  >
                    <div className="relative">
                      {/* Close Icon */}
                      <FaTimes
                        size={18}
                        className="absolute top-2 right-0 text-white cursor-pointer"
                        onClick={() => setShowButton(false)} // Close the modal
                      />
                      <WhatsappModal />
                    </div>
                  </div>
                )}
          
                {/* WhatsApp Icon */}
                <FaWhatsapp
                  size={48}
                  className="text-white bg-green-500 p-2 rounded-full cursor-pointer hover:scale-110 transition-transform duration-300"
                  onClick={() => setShowButton(!showButton)} // Toggle modal visibility
                />
              </div>
          <div>
            <h1 className='text-[1.2em] md:text-[1.6em] font-bold '>CBSE Mathematics Previous Year Question Papers For Class 10th and 12th </h1>
          </div>
          <div className='flex flex-col gap-4 text-gray-950 mt-4 '>
            <p>CBSE Mathematics Previous Year Question Papers for Class 10th and 12th offer students the perfect opportunity to familiarize themselves with the exam pattern, question formats, and frequently tested topics. By solving these papers, students can strengthen their understanding of key concepts and improve their problem-solving skills. These papers also help in time management and boost confidence by simulating the real exam experience. LearnOsphere provides a comprehensive collection of these papers with detailed solutions to ensure students are well-prepared and ready to excel in their board exams.</p>
          </div>
          <div>
            <h2 className='font-semibold text-[1.1em] md:text-[1.4em] mt-5'> Profits of CBSE Maths Previous Year Question Papers for Class 10th and 12th</h2>
          </div>
          <div className='mt-2'>
            <ol className='text-orange-600 flex flex-col gap-2 list-decimal px-8'>
              <li>Helps students understand the structure and types of questions that appear in the exam.</li>
              <li> Identifies frequently asked questions and key topics for efficient exam preparation.</li>
              <li>Helps students practice within time limits, improving speed and accuracy.</li>
              <li>Regular practice with past papers builds confidence and reduces exam stress.</li>
              <li>Helps students tackle complex problems by practicing diverse question types.</li>
              <li>Provides a realistic exam experience, preparing students for the actual test conditions.</li>

            </ol>
          </div>
          <div className='bg-gray-50 p-2'>
            <div className='mt-4 text-gray-900'>
              <h3 className='text-[1.1em] md:text-[1.4em] font-semibold'>CBSE Maths Previous Question Papers For Year Wise Class 10th</h3>
              <p className='mt-2'>CBSE Maths Previous Year Question Papers for Class 10th, organized year-wise, provide students with a structured approach to exam preparation. These papers allow students to track the trends in question patterns over the years, helping them focus on the most important topics and question types. By practicing these papers, students can gain a deeper understanding of the exam format, enhance their problem-solving skills, and improve time management. With detailed solutions provided by LearnOsphere, students are equipped to tackle their board exams with confidence and precision.</p>
            </div>
            <div>
              <ol className='px-1 md:px-4 mt-4 list-disc'>
                <Link href="/CBSE-Previousyear-Question-Papers-/Cbse-Class-10-Maths-Question-Paper-2024" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Class 10 Maths Question Paper 2024<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/CBSE-Previousyear-Question-Papers-/Cbse-Class-10-Maths-Question-Paper-2023" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Class 10 Maths Question Paper 2023<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/CBSE-Previousyear-Question-Papers-/Cbse-Class-10-Maths-Question-Paper-2022" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Class 10 Maths Question Paper 2022<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/CBSE-Previousyear-Question-Papers-/Cbse-Class-10-Maths-Question-Paper-2020" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Class 10 Maths Question Paper 2020<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/CBSE-Previousyear-Question-Papers-/Cbse-Class-10-Maths-Question-Paper-2019" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Class 10 Maths Question Paper 2019<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/CBSE-Previousyear-Question-Papers-/Cbse-Class-10-Maths-Question-Paper-2018" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Class 10 Maths Question Paper 2018<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/CBSE-Previousyear-Question-Papers-/Cbse-Class-10-Maths-Question-Paper-2017" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Class 10 Maths Question Paper 2017<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/CBSE-Previousyear-Question-Papers-/Cbse-Class-10-Maths-Question-Paper-2016" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Class 10 Maths Question Paper 2016<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/CBSE-Previousyear-Question-Papers-/Cbse-Class-10-Maths-Question-Paper-2015" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Class 10 Maths Question Paper 2015<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/CBSE-Previousyear-Question-Papers-/Cbse-Class-10-Maths-Question-Paper-2014" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Class 10 Maths Question Paper 2014<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/CBSE-Previousyear-Question-Papers-/Cbse-Class-10-Maths-Question-Paper-2013" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Class 10 Maths Question Paper 2013<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/CBSE-Previousyear-Question-Papers-/Cbse-Class-10-Maths-Question-Paper-2012" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Class 10 Maths Question Paper 2012<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/CBSE-Previousyear-Question-Papers-/Cbse-Class-10-Maths-Question-Paper-2011" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Class 10 Maths Question Paper 2011<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/CBSE-Previousyear-Question-Papers-/Cbse-Class-10-Maths-Question-Paper-2010" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Class 10 Maths Question Paper 2010<HiArrowRightCircle size={27} className='text-orange-600' /></Link>


              </ol>
            </div>
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
          <div className='bg-gray-50 p-2'>
            <div className='mt-4 text-gray-900'>
              <h3 className='text-[1.1em] md:text-[1.4em] font-semibold'>CBSE Maths Previous Question Papers For Year Wise Class 12th</h3>
              <p className='mt-2'>CBSE Maths Previous Year Question Papers for Class 12th, available year-wise, offer a valuable resource for students preparing for their board exams. These papers help students identify recurring question types and key topics that frequently appear in exams, providing insights into the exam pattern. By solving these papers, students can refine their problem-solving techniques, boost confidence, and improve time management skills. LearnOsphere ensures that students have access to these papers along with detailed solutions, empowering them to approach their exams with a solid understanding and effective strategy.</p>
            </div>
            <div>
              <ol className='px-1 md:px-4 mt-4 list-disc'>
                <Link href="/CBSE-Previousyear-Question-Papers-/Cbse-Class-12-Maths-Question-Paper-2023" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Class 12 Maths Question Paper 2023<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/CBSE-Previousyear-Question-Papers-/Cbse-Class-12-Maths-Question-Paper-2022" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Class 12 Maths Question Paper 2022<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/CBSE-Previousyear-Question-Papers-/Cbse-Class-12-Maths-Question-Paper-2020" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Class 12 Maths Question Paper 2020<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/CBSE-Previousyear-Question-Papers-/Cbse-Class-12-Maths-Question-Paper-2019" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Class 12 Maths Question Paper 2019<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/CBSE-Previousyear-Question-Papers-/Cbse-Class-12-Maths-Question-Paper-2018" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Class 12 Maths Question Paper 2018<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/CBSE-Previousyear-Question-Papers-/Cbse-Class-12-Maths-Question-Paper-2017" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Class 12 Maths Question Paper 2017<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/CBSE-Previousyear-Question-Papers-/Cbse-Class-12-Maths-Question-Paper-2016" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Class 12 Maths Question Paper 2016<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/CBSE-Previousyear-Question-Papers-/Cbse-Class-12-Maths-Question-Paper-2015" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Class 12 Maths Question Paper 2015<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/CBSE-Previousyear-Question-Papers-/Cbse-Class-12-Maths-Question-Paper-2014" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Class 12 Maths Question Paper 2014<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/CBSE-Previousyear-Question-Papers-/Cbse-Class-12-Maths-Question-Paper-2013" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Class 12 Maths Question Paper 2013<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/CBSE-Previousyear-Question-Papers-/Cbse-Class-12-Maths-Question-Paper-2012" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Class 12 Maths Question Paper 2012<HiArrowRightCircle size={27} className='text-orange-600' /></Link>
                <Link href="/CBSE-Previousyear-Question-Papers-/Cbse-Class-12-Maths-Question-Paper-2011" className='text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between'>CBSE Class 12 Maths Question Paper 2011<HiArrowRightCircle size={27} className='text-orange-600' /></Link>



              </ol>
            </div>
          </div>
          <div className='mt-4 flex flex-col gap-4'>
            <p>Join LearnOsphere to unlock a comprehensive learning experience designed to help you excel in your academic journey. With expertly curated resources such as math formulas, sample papers, previous year question papers, and interactive tools, we ensure that you are fully prepared for your exams. Our platform offers detailed explanations, step-by-step guidance, and real exam simulations, making learning engaging and effective. Whether you're in Class 6 or preparing for competitive exams, LearnOsphere provides the support you need to boost your confidence, improve your skills, and achieve academic success.</p>

          </div>

        </div>
        <div className='flex flex-col gap-5 w-full md:w-[25%] font-Poppins'>
        <div className='w-full bg-white p-8 '>
        <input type='text' id='search' name='search' placeholder='Type To Search' value={searchQuery} onChange={handleInputChange} onKeyDown={handleKeyDown} className='placeholder:text-gray-500 p-3 w-full  rounded-md border border-gray-400' />
    </div>
          <div className=' bg-white p-5  rounded-lg'>
            <p className='font-bold text-[1.1em]'>Join Learnosphere For Learning Program</p>
            <form onSubmit={handleSubmit} className='flex flex-col gap-1 mt-4'>

              <span >
                <label htmlFor='name' className='block text-black text-[.9em]'>Name</label>
                <input name='name' id='name' type='text' placeholder='Enter your Name' value={name}
                  onChange={(e) => setName(e.target.value)} className=' mt-1 focus:outline-none focus:border-blue-600 border  w-full p-2 text-[.9em] rounded-md border-gray-800 bg-white placeholder:text-slate-800' />
                {errors.name && (
                  <p className="text-red-500 text-sm mb-4">{errors.name}</p>
                )}
              </span>
              <span>
                <label htmlFor='email' className='block text-black text-[.9em]'>Email</label>
                <input name='email' id='email' value={email}
                  onChange={(e) => setEmail(e.target.value)} type='text' placeholder='Enter your Email' className=' mt-1 focus:outline-none focus:border-blue-600 border  w-full p-2 text-[.9em] rounded-md border-gray-800 bg-white placeholder:text-slate-800' />
                {errors.email && (
                  <p className="text-red-500 text-sm mb-4">{errors.email}</p>
                )}
              </span>
              <span>
                <label htmlFor='contact' className='block text-black text-[.9em]'>Mobile Number</label>
                <input name='contact' value={contact}
                  onChange={handleContact} id='contact' type='text' placeholder='Enter your Mobile Number' className=' mt-1 focus:outline-none focus:border-blue-600 border  w-full p-2 text-[.9em] rounded-md border-gray-800 bg-white placeholder:text-slate-800' />
                {errors.contact && (
                  <p className="text-red-500 text-sm mb-4">{errors.contact}</p>
                )}
              </span>
              <span>

                <label htmlFor='grade' className='block text-black text-[.9em]'>Grade</label>
                <select
                  name="grade"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  id="grade"
                  className="mt-1 focus:outline-none focus:border-blue-600 border w-full p-2 text-[.9em] rounded-md border-gray-800 bg-white placeholder:text-slate-800"
                >
                  <option value="" disabled>Select Grade</option>
                  <option value="Grade 1">Grade 1</option>
                  <option value="Grade 2">Grade 2</option>
                  <option value="Grade 3">Grade 3</option>
                  <option value="Grade 4">Grade 4</option>
                  <option value="Grade 5">Grade 5</option>
                  <option value="Grade 6">Grade 6</option>
                  <option value="Grade 7">Grade 7</option>
                  <option value="Grade 8">Grade 8</option>
                  <option value="Grade 9">Grade 9</option>
                  <option value="Grade 10">Grade 10</option>
                  <option value="Grade 11">Grade 11</option>
                  <option value="Grade 12">Grade 12</option>
                  {/* Add more grades as needed */}
                </select>
                {errors.grade && (
                  <p className="text-red-500 text-sm mb-4">{errors.grade}</p>
                )}
              </span>
              <div>
                <button type='submit' className='bg-orange-600 p-2 text-white font-bold mt-2 rounded-lg'>Submit</button>
              </div>

              {errors.general && (
                <p className="text-red-500 text-sm mb-4">{errors.general}</p>
              )}
              {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
            </form>

          </div>

        </div>

      </div>
      <Footer1 />
      <Footer />
    </div>
  )
}

export default CBSEPreviousYearQuestionPapers
