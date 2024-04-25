import React from 'react';



const Home = () => {
  return (
    <div name="home" className="bg-transparent z-0 bg-gradient-to-r from-orange-100 to-blue-100 relative h-screen flex items-center justify-center bg-cover">
      <div className="absolute inset-0"></div>
      <div className="relative z-10 text-center">
        <h1 className=" text-[1.5rem] md:text-4xl p-[6px] font-extrabold mb-4">Unlocking Learning Potential:<br></br> Versatile Solutions for <b className='text-orange-600'>Educators</b> and <b className='text-orange-600'>Learners</b></h1>
        <p className="text[1rem] px-4 md:text-lg mb-6">Engage with the Most Experienced and Qualified Home Tutors for Superior Learning</p>
        {/* <div className=" max-w-[20rem] md:max-w-md mx-auto flex">
          <input type="text" placeholder="Enter your location" className="w-full py-3 text-black px-4 rounded-l-lg focus:outline-none focus:ring focus:border-blue-300" />
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 rounded-r-lg">Search</button>
        </div> */}
      </div>
    </div>
  )
}

export default Home
