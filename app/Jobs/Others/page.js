import Footer from '@/components/Footer'
import Footer1 from '@/components/Footer1'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import React from 'react'

const Others = () => {
  return (
    <div>
      <div>
      <Navbar/>
    <div className=' px-2 md:px-20 flex justify-between  mt-28  '>
    <h2 className='text-[.9em] md:text-[1.1em] text-gray-900 w-full border-b-2 h-16 border-orange-600  '><span className=' text-[1em] md:text-[1.3em] font-bold text-black'>Job Description :</span>Your Specific Field</h2>
    </div>
    <div className='px-2 md:px-20 flex flex-col  gap-4 mt-6'>
    <p>At Lernosphere, we are excited to offer diverse opportunities across several key areas. Our Tech Team is dedicated to pushing technological boundaries and working on groundbreaking projects. In this role, you'll engage with the latest technologies and contribute to developing innovative solutions. Marketing and Digital Marketing professionals will be pivotal in creating and executing impactful campaigns, leveraging data to drive brand growth and enhance our online presence. Meanwhile, our Graphic Designers will translate concepts into captivating visuals, playing a crucial role in shaping our brand’s identity and communications.</p>
    <p>Additionally, our Sales Executives are essential in fostering client relationships and driving business growth through strategic sales initiatives. At Lernosphere, every role is integral to our mission of innovation and excellence. Join us to be part of a dynamic team where your skills will not only contribute to our success but also provide you with opportunities for professional development and career advancement in a collaborative and forward-thinking environment.

    </p>
    </div>
      </div>
      <div className='px-2 md:px-20 mt-10 flex flex-col gap-2 list-disc'>
      <h2 className='font-bold text-[1.4em] h-12 w-60 border-b-2 border-orange-600'>Roles and Experience</h2>
      <ol className='flex flex-col gap-4'>
          <li className='text-[.9em]'><span className='font-semibold text-[1.1em]'>Tech Team:</span>Develop cutting-edge applications and maintain seamless system operations.</li>
          <li className='text-[.9em]'><span className='font-semibold text-[1.1em]'>marketing:</span> Craft impactful campaigns to drive brand awareness and engagement.</li>
          <li className='text-[.9em]'><span className='font-semibold text-[1.1em]'>Digital Marketing:</span>Optimize digital strategies using data-driven insights for maximum reach.</li>
          <li className='text-[.9em]'><span className='font-semibold text-[1.1em]'>Graphic Design:</span> Create visually compelling content that elevates the brand identity.</li>
          <li className='text-[.9em]'><span className='font-semibold text-[1.1em]'>sales:</span>Build strong client relationships and drive revenue through strategic initiatives.</li>
      </ol>
      </div>
      <div className='px-2 md:px-20 mt-10 flex flex-col gap-2 list-disc'>
      <h2 className='font-bold text-[1.4em] h-12 w-20 border-b-2 border-orange-600'>Skills</h2>
      <ol className='flex flex-col gap-4'>
          <li className='text-[.9em]'><span className='font-semibold text-[1.1em]'>Technical Expertise:</span>Proficiency in coding, software development, and troubleshooting for tech roles.</li>
          <li className='text-[.9em]'><span className='font-semibold text-[1.1em]'>Creative Thinking:</span>Ability to craft innovative marketing campaigns and design visually appealing content.</li>
          <li className='text-[.9em]'><span className='font-semibold text-[1.1em]'>Data Analysis: </span>Skill in interpreting data to optimize marketing strategies and digital performance.</li>
          <li className='text-[.9em]'><span className='font-semibold text-[1.1em]'>communication:</span> Strong interpersonal skills to build client relationships and collaborate within teams.</li>
          <li className='text-[.9em]'><span className='font-semibold text-[1.1em]'>problem-solving:</span>Efficiently addressing challenges and developing effective solutions across all roles.</li>
         
      </ol>
      </div>
      <div className='mt-10 mb-6 px-2 md:px-20'>
      <Link href='/Jobform/Othersform' className='bg-orange-600 p-4 text-center font-bold text-white rounded-md'>Apply Now</Link>
      </div>
      <Footer1/>
      <Footer/>
    </div>
  )
}

export default Others
