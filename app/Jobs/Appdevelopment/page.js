import Footer from '@/components/Footer'
import Footer1 from '@/components/Footer1'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import React from 'react'

const Appdevelopment = () => {
  return (
    <div>
      <div>
      <Navbar/>
    <div className=' px-2 md:px-20 flex justify-between  mt-28 '>
    <h2 className='text-[.9em] md:text-[1.1em] text-gray-900 w-full border-b-2 h-16 border-orange-600  '><span className=' text-[1em] md:text-[1.3em] font-bold text-black'>Job Description :</span> App Development</h2>
    </div>
    <div className='px-2 md:px-20 flex flex-col gap-4 mt-6'>
    <p>We are seeking talented and innovative app developers to join our dynamic team. This role offers an exciting opportunity to work on cutting-edge mobile applications, creating user-friendly, highly functional apps across various platforms. You will collaborate with designers, product managers, and other developers to turn ideas into reality, ensuring high-quality code, optimized performance, and seamless user experiences. If you are passionate about technology, eager to solve complex problems, and looking for a challenging yet rewarding career in app development, this position is perfect for you. Join us to be part of a fast-growing company where your contributions will make a direct impact on shaping the future of mobile technology</p>
    <p>We are on the lookout for a visionary app developer who can bring fresh ideas and innovative solutions to life. This role offers a chance to work on diverse projects, from conceptualizing app features to delivering fully functional mobile applications. You'll have the freedom to experiment with new technologies and refine your skills in an environment that fosters creativity and growth. Whether it's building from scratch or optimizing existing apps, your expertise will be key to shaping the digital experience for our users. If you're ready to push boundaries and contribute to the future of app development, we want you on our team.</p>
    
    </div>
    <div className='px-2 md:px-20 flex flex-col gap-2 mt-10'>
    <h2 className='font-bold text-[1.3em] border-b-2 border-orange-600 w-72 h-10'>Roles And Responsiblities</h2>
    <ol className='list-disc flex flex-col gap-4'>
    <li className='text-[.9em]'><span className='font-semibold text-[1.1em]'>App Design & Development:</span> Develop high-quality mobile applications for both iOS and Android platforms, ensuring functionality, performance, and user experience are top-notch.</li>
    <li className='text-[.9em]'><span className='font-semibold text-[1.1em]'>Collaborate with Cross-Functional Teams:</span> Work closely with designers, product managers, and backend developers to understand project requirements and bring ideas to life.</li>
    <li className='text-[.9em]'><span className='font-semibold text-[1.1em]'>Write Clean and Efficient Code:</span> Implement efficient and reusable code following best coding practices, ensuring the app is scalable and easy to maintain.</li>
    <li className='text-[.9em]'><span className='font-semibold text-[1.1em]'>Test and Debug:</span> Conduct thorough testing of the application to identify and fix bugs or performance issues, ensuring the app runs smoothly across different devices and operating systems.</li>
    <li className='text-[.9em]'><span className='font-semibold text-[1.1em]'>Stay Updated with Emerging Technologies:</span> Keep up with the latest trends in app development, mobile technology, and frameworks, and continuously upgrade your skills to improve the app’s features and functionality.</li>
    <li className='text-[.9em]'><span className='font-semibold text-[1.1em]'>Optimize App Performance:</span> Ensure the application is optimized for speed, responsiveness, and minimal battery consumption, delivering a smooth user experience.</li>
    </ol>
    </div>
    <div className='px-2 md:px-20 flex flex-col gap-2 mt-10'>
    <h2 className='font-bold text-[1.3em] border-b-2 border-orange-600 w-20 h-10 '>Skills</h2>
    <ol className='list-disc flex flex-col gap-4'>
    <li className='text-[.9em]'><span className='font-semibold text-[1.1em]'>Proficiency in Programming Languages:</span> Strong command of languages like Java, Kotlin (for Android), and Swift (for iOS).</li>
    <li className='text-[.9em]'><span className='font-semibold text-[1.1em]'>UI/UX Design Knowledge:</span> Ability to create user-friendly and visually appealing mobile app interfaces.</li>
    <li className='text-[.9em]'><span className='font-semibold text-[1.1em]'>API Integration:</span> Experience with integrating third-party APIs and services to enhance app functionality.</li>
    <li className='text-[.9em]'><span className='font-semibold text-[1.1em]'>Testing and Debugging:</span> Skills in identifying bugs and ensuring optimal app performance across different devices.</li>
  
    </ol>
    </div>
    <div className='px-2 md:px-20 mt-10'>
    <Link href ="/Jobform/Appform" className='bg-orange-600 text-white font-bold p-4 w-full mt-8 rounded-md  text-center'>Apply Now</Link>
    </div>
      </div>
      <Footer1/>
      <Footer/>
    </div>
  )
}

export default Appdevelopment
