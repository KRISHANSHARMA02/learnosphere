"use client"
import React, { useState } from 'react'
import Parentsblog1 from '@/public/parentblog1.png';
import Image from 'next/image'
import Navbar from '@/components/Navbar';
import { LiaPagerSolid } from 'react-icons/lia';
import { IoRemoveOutline } from 'react-icons/io5';
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import Footer1 from '@/components/Footer1';
import Footer from '@/components/Footer';

const ParentItem = ({question,answer}) =>{
    const[isOpen,setIsOpen] = useState(false)
    return(
        <div className="mb-6">
        <button
          className="flex items-center justify-between w-full px-4 py-3 bg-white rounded-lg shadow-md hover:shadow-lg focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-[.7em] md:text-[1.2em] font-semibold font-Poppins">{question}</span>
          {isOpen ? <FiMinus className=" text-[1em] md:text-[1.5em] text-gray-600" /> : <FiPlus  className=" text-[1em] md:text-[1.5em] text-gray-600" />}
        </button>
        {isOpen && <p className="mt-2 px-4 py-3 text-[.6em] md:text-[1em]  text-gray-900 bg-gray-100 rounded-lg font-Poppins shadow-md">{answer}</p>}
      </div>
    )
}
    
    
const TutorBlog1 = () => {
  return (
    <>
      <Navbar />
      <div className='mt-28 flex gap-2 justify-center items-center text-[1.2em] md:text-[1.5em] font-extrabold'>
        <LiaPagerSolid size={40} className='text-orange-600' />
        <p>Learn<span className='text-orange-600'>O</span>sphere Parent Blogs</p>
      </div>
      <div className='flex justify-center items-center'>
        <IoRemoveOutline className='' size={60} />
      </div>
      <div className='p-2 md:p-6'>
        <div className='flex flex-col md:flex-row justify-center rounded-xl  items-center gap-6 md:gap-16 p-4 md:p-12 bg-orange-50'>
          <div className='w-full md:w-[28vw]'>
            <Image className='rounded-lg' src={Parentsblog1} alt='' />
          </div>
          <div className='flex flex-col mt-0 xl:mt-2 2xl:mt-7 gap-4'>
            <p className='font-bold text-[1.2em] md:text-[1.6em]'>Supporting Your Child's Education at Home</p>
            <p className='w-full xl:w-[50vw] 2xl:w-[28vw] font-semibold'>Practical tips for parents to support their child's education and foster a positive learning environment at home.</p>
            <p className='w-full xl:w-[50vw] 2xl:w-[28vw]'>Supporting your child's education at home involves creating a positive and structured learning environment. Set up a quiet, organized study space and establish a regular study routine. Engage with their schoolwork by discussing assignments and helping with challenging topics.

            Provide access to educational resources like books and online tools, and connect lessons to real-life experiences. Stay in touch with their teachers to monitor progress and address any issues. Ensure your child maintains a balanced lifestyle with proper rest, nutrition, and recreational time to support their overall well-being and academic success.</p>
          </div>
        </div>
      </div>
      <div>
        <div className='p-2 md:p-8'>
          <div className='p-2 md:p-8 flex flex-col gap-4 rounded-xl'>
            <p className='font-extrabold text-[1.2em] md:text-[1.4em] text-orange-600'>How can parents effectively support their child's education at home to enhance their learning experience and overall academic success?</p>
            <p className='text-[1em]  text-gray-800'>Parents can effectively support their child's education at home by creating a structured and positive learning environment. Start by setting up a quiet, organized study area and establishing a consistent routine that includes regular study times and breaks. Actively engage with your child's schoolwork by discussing assignments, helping with challenging subjects, and celebrating their achievements. This involvement not only reinforces their learning but also demonstrates your support and interest in their academic progress.</p>
            <p className='text-[1em]  text-gray-800'>Additionally, provide access to educational resources like books, online tools, and educational apps to enrich their learning experience. Encourage curiosity and relate lessons to real-life situations to make learning more engaging. Maintain open communication with teachers to stay informed about your child's progress and address any areas that need attention. Lastly, promote a balanced lifestyle by ensuring adequate rest, proper nutrition, and time for recreational activities, which supports their overall well-being and academic performance.</p>
          </div>
        </div>
        <div>
          <div className='flex items-center justify-center font-bold text-[1.3em]'>
            <p className='font-extrabold border-2 border-orange-500 p-4 mt-4 md:mt-14 rounded-lg text-center w-full  xl:w-[45%] 2xl:w-[40%] m-auto text-sm md:text-2xl bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent from-orange-500 to-red-600'>Key Points Of Supporting Your Child's Education at Home</p>
          </div>
          <div className='flex flex-wrap gap-4 md:gap-8 p-2 md:p-10 mt-6 md:mt-0 justify-center items-center'>
            <div className='flex flex-col gap-3 border border-gray-300 rounded-lg p-4 w-full xl:w-[29vw] 2xl:w-[26vw] bg-white'>
           <p><span className='text-[1em]  font-bold'>Create a Structured Learning Environment:</span> Set up a quiet, well-organized study area with all necessary supplies. Establish a consistent routine for study times and breaks to build good study habits and minimize distractions.</p>
            </div>
            <div className='flex flex-col gap-3 border border-gray-300 rounded-lg p-4 w-full xl:w-[29vw] 2xl:w-[26vw] bg-white'>
           <p><span className='text-[1em]  font-bold'>Provide Educational Resources:</span>Equip your child with access to various educational resources, including books, online tools, and educational apps. These resources can supplement their learning and provide additional support outside the classroom.</p>
            </div>
            <div className='flex flex-col gap-3 border border-gray-300 rounded-lg p-4 w-full xl:w-[29vw] 2xl:w-[26vw] bg-white'>
           <p><span className='text-[1em]  font-bold'>Engage with Schoolwork: </span>Actively participate in your child's learning by discussing their assignments and projects. Offer help with difficult subjects and celebrate their successes to motivate and reinforce their efforts.</p>
            </div>
            <div className='flex flex-col gap-3 border border-gray-300 rounded-lg p-4 w-full xl:w-[29vw] 2xl:w-[26vw] bg-white'>
           <p><span className='text-[1em]  font-bold'>Encourage Curiosity:</span>Foster a love for learning by connecting lessons to real-life experiences and exploring topics that interest your child. This approach makes learning more relevant and engaging, encouraging them to pursue knowledge beyond the curriculum.</p>
            </div>
            <div className='flex flex-col gap-3 border border-gray-300 rounded-lg p-4 w-full xl:w-[29vw] 2xl:w-[26vw] bg-white'>
           <p><span className='text-[1em]  font-bold'>Maintain Communication with Teachers: </span>Regularly communicate with your child’s teachers to stay updated on their progress and any areas where they might need extra help. This collaboration ensures that you are informed about their academic performance and can address issues promptly.</p>
            </div>
            <div className='flex flex-col gap-3 border border-gray-300 rounded-lg p-4 w-full xl:w-[29vw] 2xl:w-[26vw] bg-white'>
           <p><span className='text-[1em]  font-bold'>Promote a Balanced Lifestyle:</span>Ensure that your child maintains a healthy balance between study, rest, and recreational activities. Adequate sleep, proper nutrition, and time for hobbies are essential for their overall well-being and academic success.</p>
            </div>
           
        </div>
        </div>
        <div className="max-w-5xl mx-auto mt-14 px-4 md:px-0">
          <h2 className="mb-8 text-xl md:text-3xl font-semibold font-Poppins text-center text-gray-800">Frequently Asked Questions</h2>
          <ParentItem
            question="How can I create an effective study environment at home?"
            answer=" Set up a quiet, organized space dedicated to studying. Ensure the area is well-lit and free from distractions. Provide necessary supplies such as books, stationery, and a computer. Establish a consistent study routine with regular times for studying and breaks to help build good habits."
          />
          <ParentItem
            question="What should I do if my child struggles with their schoolwork?"
            answer=" Offer support by discussing their challenges and providing assistance with difficult subjects. Encourage them to ask questions and seek help from their teacher if needed. Use educational resources like books and online tools to provide additional practice and explanations."
          />
          <ParentItem
            question="How can I stay involved in my child's education?"
            answer=" Engage with your child's schoolwork by reviewing their assignments, helping with projects, and discussing what they are learning. Attend parent-teacher meetings and communicate regularly with their teachers to stay informed about their progress and any areas needing attention."
          />
          <ParentItem
            question="What resources can I provide to support my child's learning?"
            answer=" Provide access to a variety of educational resources such as textbooks, online educational platforms, and apps designed for learning. Encourage the use of libraries and educational websites to supplement their studies and explore new topics."
          />
          <ParentItem
            question="How can I encourage my child’s interest in learning?"
            answer="Relate lessons to real-life situations and explore topics that spark their curiosity. Engage in educational activities together, such as visiting museums or watching educational videos. Showing enthusiasm for learning and connecting it to their interests can make it more engaging."
          />
          <ParentItem
            question="How do I balance my child’s study time with other activities?"
            answer="Establish a balanced schedule that includes time for studying, rest, and recreational activities. Ensure your child has adequate sleep, nutritious meals, and time for hobbies or social activities. A balanced lifestyle supports overall well-being and academic success."
          />
          <ParentItem
            question="What should I do if my child is not motivated to study?"
            answer="Identify the reasons behind their lack of motivation and address them. Set clear, achievable goals and provide positive reinforcement for their efforts. Create a supportive and encouraging environment, and involve your child in setting their own learning objectives to increase their sense of ownership."
          /> 
        </div>
      <Footer1/>
      <Footer/>
      </div>
    </>
  );
};

  

export default TutorBlog1
