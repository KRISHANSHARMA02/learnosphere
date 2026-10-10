"use client"
import React, { useState } from 'react'
import parentsblog2 from '@/public/parentblog2.jpg';
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
        <p>Learn<span className='text-orange-600'>O</span>sphere Tutor Blogs</p>
      </div>
      <div className='flex justify-center items-center'>
        <IoRemoveOutline className='' size={60} />
      </div>
      <div className='p-2 md:p-6'>
        <div className='flex flex-col md:flex-row justify-center rounded-xl  items-center gap-6 md:gap-16 p-4 md:p-12 bg-orange-50'>
          <div className='w-full md:w-[28vw]'>
            <Image className='rounded-lg' src={parentsblog2} alt='' />
          </div>
          <div className='flex flex-col mt-0 xl:mt-2 2xl:mt-7 gap-4'>
            <p className='font-bold text-[1.2em] md:text-[1.6em]'>Encouraging Healthy Screen Time Habits for Children</p>
            <p className='w-full xl:w-[50vw] 2xl:w-[28vw] font-semibold'>Tips for parents on how to manage and encourage healthy screen time habits for their children.</p>
            <p className='w-full xl:w-[50vw] 2xl:w-[28vw]'>
            Encouraging healthy screen time habits involves setting clear daily limits and ensuring screens don’t disrupt sleep or physical activity. Promote regular breaks and alternative activities, such as outdoor play or reading, to balance screen use. Be a role model by practicing balanced screen habits yourself and engage with your child to guide their content choices and establish positive routines.</p>
          </div>
        </div>
      </div>
      <div>
        <div className='p-2 md:p-8'>
          <div className='p-2 md:p-8 flex flex-col gap-4 rounded-xl'>
            <p className='font-extrabold text-[1.2em] md:text-[1.4em] text-orange-600'>How can parents effectively encourage healthy screen time habits for their children?</p>
            <p className='text-[1em]  text-gray-800'>Parents can effectively encourage healthy screen time habits for their children by setting clear, consistent boundaries and modeling balanced use of technology themselves. Establish daily limits on screen time and ensure that it does not interfere with essential activities like sleep, physical exercise, and family interactions. Promote a balanced lifestyle by encouraging alternative activities, such as outdoor play, hobbies, and reading. Make screen time purposeful by selecting educational and age-appropriate content, and encourage breaks to prevent prolonged exposure.</p>
            <p className='text-[1em]  text-gray-800'>Additionally, engage in open discussions with your child about the impact of screen time on their health and well-being. Explain the benefits of varied activities and the importance of maintaining a balance. Create a structured routine that integrates screen time with other activities and be actively involved in their digital experiences. By setting a positive example and guiding their choices, parents can help their children develop responsible and healthy screen habits.</p>
          </div>
        </div>
        <div>
          <div className='flex items-center justify-center font-bold text-[1.3em]'>
            <p className='font-extrabold border-2 border-orange-500 p-4 mt-4 md:mt-14 rounded-lg text-center w-full  xl:w-[45%] 2xl:w-[40%] m-auto text-sm md:text-2xl bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent from-orange-500 to-red-600'>Key Points Of Encouraging Healthy Screen Time Habits for Children</p>
          </div>
          <div className='flex flex-wrap gap-4 md:gap-8 p-2 md:p-10 mt-6 md:mt-0 justify-center items-center'>
            <div className='flex flex-col gap-3 border border-gray-300 rounded-lg p-4 w-full xl:w-[29vw] 2xl:w-[26vw] bg-white'>
           <p><span className='text-[1em]  font-bold'>Set Clear Limits: </span> Define specific daily limits for screen use and ensure that these limits are adhered to consistently. Make sure that screen time does not interfere with important activities like sleep, physical exercise, or family time.</p>
            </div>
           
            <div className='flex flex-col gap-3 border border-gray-300 rounded-lg p-4 w-full xl:w-[29vw] 2xl:w-[26vw] bg-white'>
            <p><span className='text-[1em]  font-bold'>Encourage Regular Breaks: </span>Implement regular breaks during screen time to prevent prolonged exposure and encourage physical movement. Breaks are essential to reduce eye strain and maintain overall health.</p>
             </div>
            <div className='flex flex-col gap-3 border border-gray-300 rounded-lg p-4 w-full xl:w-[29vw] 2xl:w-[26vw] bg-white'>
            <p><span className='text-[1em]  font-bold'>Model Balanced Use:</span>Demonstrate healthy screen habits by managing your own screen time effectively. By setting a positive example, you reinforce the importance of balanced use and help your child develop similar habits.</p>
            </div>
            <div className='flex flex-col gap-3 border border-gray-300 rounded-lg p-4 w-full xl:w-[29vw] 2xl:w-[26vw] bg-white'>
           <p><span className='text-[1em]  font-bold'>Promote Alternative Activities:</span>Encourage your child to engage in activities that do not involve screens, such as outdoor play, reading, or creative hobbies. This helps to ensure a well-rounded lifestyle and prevents over-reliance on digital devices for entertainment.</p>
            </div>
           
            <div className='flex flex-col gap-3 border border-gray-300 rounded-lg p-4 w-full xl:w-[29vw] 2xl:w-[26vw] bg-white'>
           <p><span className='text-[1em]  font-bold'>Select Purposeful Content:</span>Guide your child in choosing educational and age-appropriate content. Help them understand the value of engaging with meaningful and enriching material rather than passive or excessive screen consumption.</p>
            </div>
           
           
           
            <div className='flex flex-col gap-3 border border-gray-300 rounded-lg p-4 w-full xl:w-[29vw] 2xl:w-[26vw] bg-white'>
           <p><span className='text-[1em]  font-bold'>Discuss Screen Time Impact:</span> Have open conversations with your child about the effects of excessive screen time on their physical and mental health. Discuss the benefits of a balanced approach to screen use and its impact on their daily life.</p>
            </div>
            <div className='flex flex-col gap-3 border border-gray-300 rounded-lg p-4 w-full xl:w-[29vw] 2xl:w-[26vw] bg-white'>
           <p><span className='text-[1em]  font-bold'>Create a Structured Routine:</span>Incorporate screen time into a well-rounded daily schedule that includes various activities such as study, exercise, and family time. A structured routine helps your child manage their time effectively and balance their screen use with other important activities.</p>
            </div>
           
        </div>
        </div>
        <div className="max-w-5xl mx-auto mt-14 px-4 md:px-0">
          <h2 className="mb-8 text-xl md:text-3xl font-semibold font-Poppins text-center text-gray-800">Frequently Asked Questions</h2>
          <ParentItem
            question="How can I set effective screen time limits for my child?"
            answer=" Establish specific daily screen time limits based on your child's age and needs. Ensure that screen time does not interfere with essential activities like sleep, physical exercise, or family interactions. Consistency in enforcing these limits helps create a balanced routine."
          />
          <ParentItem
            question="What alternative activities can I encourage to reduce screen time?"
            answer="Encourage activities such as outdoor play, sports, reading, and creative projects like drawing or crafting. These alternatives not only reduce screen time but also support your child's physical and mental development."
          />
          <ParentItem
            question="How can I model healthy screen time habits for my child?"
            answer="Practice balanced screen use yourself by setting limits on your own screen time and engaging in non-digital activities. By modeling good habits, you demonstrate the importance of a balanced approach and set a positive example for your child."
          />
          <ParentItem
            question="What types of content should my child be allowed to access?"
            answer="Guide your child in choosing educational, age-appropriate, and meaningful content. Encourage them to engage with materials that support their learning and interests, rather than allowing passive consumption of entertainment."
          />
          <ParentItem
            question="How often should my child take breaks from screens?"
            answer=" Implement regular breaks during screen time, ideally every 30 to 60 minutes. Encourage your child to step away from screens, stretch, and engage in physical activities to prevent eye strain and promote overall well-being."
          />
          <ParentItem
            question="What should I discuss with my child regarding screen time?"
            answer="Have open discussions about the impact of excessive screen time on health, including potential effects on sleep, physical fitness, and social interactions. Emphasize the benefits of a balanced approach and the importance of maintaining a variety of activities."
          />
          <ParentItem
            question="How can I create a balanced daily routine that includes screen time?"
            answer="Develop a structured schedule that includes designated times for screen use along with other activities such as study, exercise, and family time. A well-rounded routine helps your child manage their time effectively and integrate screen time with other important activities."
          />
          
        </div>
      <Footer1/>
      <Footer/>
      </div>
    </>
  );
};

  

export default TutorBlog1
