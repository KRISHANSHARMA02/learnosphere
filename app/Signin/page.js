"use client"
import React, { useState } from 'react';
import Footer from '@/components/Footer';

const RegistrationForm = () => {
  const [userType, setUserType] = useState('');
  const [isTeacher, setIsTeacher] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [isSchool, setIsSchool] = useState(false);
  const [isCollege, setIsCollege] = useState(false);
  const [mobile, setMobile] = useState('');
  const [isMobileVerified, setIsMobileVerified] = useState(false);
  const [isAadharVisible, setIsAadharVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form fields here
    // Handle form submission logic here
  };

  const handleMobileVerification = () => {
    // Perform mobile verification logic here
    setIsMobileVerified(true);
  };
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    // Validate password (e.g., check length)
    // For simplicity, let's assume any non-empty value is valid
    setPassword(value);
    setIsPasswordValid(value.length > 0);
  };

  const handleAadharChange = (e) => {
    const value = e.target.value;
    // Validate Aadhar number (e.g., check length, format)
    // For simplicity, let's assume any non-empty value is valid
    setAadhar(value);
    setIsAadharValid(value.length > 0);
  };
  return (
    <div className='h-screen overflow-auto '>
    <div className="max-w-md  mx-auto mt-[120px] p-6  bg-white rounded-lg shadow-lg">
        
        <h2 className='p-5 text-3xl font-bold pl-14 md:pl-16'>Learn<b className='text-orange-600'>O</b>sphere.in</h2>
      <h2 className="text-xl font-bold mb-6 pl-20 md:pl-28">Sign Up Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-4">
          <input type="text" id="firstName" name="firstName" placeholder="First Name" className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none" required />
          <input type="text" id="lastName" name="lastName" placeholder="Last Name" className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none" required />
        </div>
        <input type="email" id="email" name="email" placeholder="Email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none" required />
        <div>
          <label htmlFor="password" className="block mb-2 font-semibold">Password</label>
          <input type="password" id="password" name="password" className="w-full p-2 border border-gray-300 rounded" onChange={handlePasswordChange} required />
        </div>
        <div className="flex items-center space-x-4">
          <label className="block font-semibold mb-2">User Type</label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center cursor-pointer">
              <input type="radio" name="userType" value="teacher" onChange={() => { setUserType('teacher'); setIsAadharVisible(true); }} required /> Teacher
            </label>
            <label className="inline-flex items-center cursor-pointer">
              <input type="radio" name="userType" value="student" onChange={() => { setUserType('student'); setIsAadharVisible(false); }} required /> Student
            </label>
          </div>
        </div>
        {userType === 'teacher' && (
          <>
            <div className="relative">
              <input type="text" id="mobile" name="mobile" placeholder="Mobile Number" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
              {!isMobileVerified && (
                <button type="button" className="absolute inset-y-0 right-0 px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600" onClick={handleMobileVerification}>Verify</button>
              )}
            </div>
            <input type="text" id="year" name="year" placeholder="Year/Grade" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none" required />
            <input type="text" id="subject" name="subject" placeholder="Subject" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none" required />
            <input type="text" id="experience" name="experience" placeholder="Experience" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none" required />
            <input type="text" id="degree" name="degree" placeholder="Degree" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none" required />
          </>
        )}
        {userType === 'student' && (
          <div className="flex space-x-4">
            <label className="inline-flex items-center cursor-pointer p-1">
              <input type="radio" name="studentType" value="school" onChange={() => setIsSchool(true)} required /> School
            </label>
            <label className="inline-flex items-center cursor-pointer p-1">
              <input type="radio" name="studentType" value="college" onChange={() => setIsCollege(true)} required /> College
            </label>
          </div>
        )}
        {isSchool && (
          <input type="text" id="school" name="school" placeholder="School Name" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none" required />
        )}
        {isCollege && (
          <input type="text" id="college" name="college" placeholder="College Name" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none" required />
        )}
        {isAadharVisible && (
          <div>
          <label htmlFor="aadhar" className="block mb-2">Aadhar Number</label>
          <input type="text" id="aadhar" name="aadhar" className="w-full p-2 border border-gray-300 rounded" onChange={handleAadharChange} required />
        </div>
        )}
        <button type="submit" className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600">Sign Up Now</button>
      </form>
    </div>
    </div>
    
    
  );
};

export default RegistrationForm;
