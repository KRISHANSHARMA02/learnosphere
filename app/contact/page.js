"use client"
import React, { useState } from 'react'

const contact = () => {
    
        const [formData, setFormData] = useState({
          name: "",
          email: "",
          message: ""
        });
      
        const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData({
            ...formData,
            [name]: value
          });
        };
      
        const handleSubmit = (e) => {
          e.preventDefault();
          // Handle form submission here, e.g., send data to backend
          console.log(formData);
          // Reset form fields after submission
          setFormData({
            name: "",
            email: "",
            message: ""
          });
        };
  return (
    <div className=' min-h-screen my-12 md:mx-auto flex items-center justify-center'>
        <div className='flex justify-between md:flex-row flex-col gap-32 items-center'>
            <div className='flex justify-center items-center flex-col w-[42rem] '>
                <h1 className=" text-4xl md:text-6xl font-extrabold pt-[80px] md:pt-8 pl-8 md:pl-0 pr-0 md:pr-20">Get in touch with us</h1>
                <p className="text-xl pl-[184px] md:pl-0 pt-5 pr-[5rem]">Please get in touch today by filling out the online contact form or calling our friendly education experts.<br></br><br></br>

Need a tutor? Download the Learnosphere app to find face to face tutor.<br></br><br></br>

We look forward to hearing from you and welcoming you to our Learnosphere community.</p>

            </div>
            <div>
            
    <form onSubmit={handleSubmit} className="md:max-w-sm md:mx-auto ml-28">
      <div className="mb-4">
        <label htmlFor="name" className="block text-lg font-semibold text-gray-700">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border border-gray-300 rounded-md pr-32 pl-3  py-2 w-full"
          placeholder="Enter your full name"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-lg font-semibold text-gray-700">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="message" className="block text-lg font-semibold text-gray-700">Message:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 w-full h-32 resize-none"
          placeholder="Ex. I am interested or your stream?"
          required
        ></textarea>
      </div>
      <div>
        <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">Submit</button>
      </div>
    </form>
  

            </div>
        </div>
      
    </div>
  )
}

export default contact
