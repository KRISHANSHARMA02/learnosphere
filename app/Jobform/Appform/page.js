"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import React, { useRef, useState, useEffect } from 'react';

import axios from 'axios';
import { trackEvent } from '@/src/lib/eventTracker';
import Footer1 from '@/components/Footer1';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import Linkedimg from '@/public/linkedin.svg'


const Appform = () => {
  const [fileName, setFileName] = useState('');
  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("+91");

  const [formSuccess, setFormSuccess] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [dob, setDob] = useState('');
  const [qualification, setQualification] = useState('');
  const [year, setYear] = useState('');
  const [role, setRole] = useState('');
  const [gender, setGender] = useState('');

  const [selected, setSelected] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  // When a country is selected
  const handleSelect = (code) => {
    setSelected(code);
    setSelectedCountry(code);
    setShowDropdown(false);
  };
  const fileInputRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDropdown(false);
        }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
}, []);

  // ✅ Fetch countries from backend
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get(`${WEB_BACKEND_URL}/api/route/getAllCountries`);
        setCountries(res.data);
      } catch (err) {
        console.error("Error fetching countries:", err);
      }
    };
    fetchCountries();
  }, []);

  const handleContact = (e) => {
    const { name, value } = e.target;
    // Allow only digits and restrict the length to 10
    if (name === 'contact') {
      if (value === '' || (/^\d{0,10}$/.test(value))) {
        setContact(value);
      }
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Reset error messages
    setFormSuccess(''); // Reset success messages

    // Create a FormData object to send both file and form data
    const formData = new FormData();
    formData.append('name', name);
    formData.append('contact', contact);
    formData.append('email', email);
    formData.append('city', city);
    formData.append('dob', dob);
    formData.append('qualification', qualification);
    formData.append('year', year);
    formData.append('role', role);
    formData.append('gender', gender);
    formData.append('resume', fileInputRef.current.files[0]); // Attach the uploaded file
    formData.append('countryCode', selectedCountry);

    try {
      const response = await axios.post(`${WEB_BACKEND_URL}/api/route/appform`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        trackEvent("JOB_APPLICATION_FORM_SUBMITTED", {
          name,
          email,
          mobile_number: selectedCountry ? `${selectedCountry}${contact}` : contact,
          contact,
          city,
          dob,
          qualification,
          year,
          role,
          gender,
          country_code: selectedCountry,
        });

        setFormSuccess('Form submitted successfully!');

        // Reset form fields after successful submission
        setName('');
        setContact('');
        setEmail('');
        setCity('');
        setDob('');
        setQualification('');
        setYear('');
        setRole('');
        setGender('');
        setFileName('');
        setSelectedCountry('+91');
        fileInputRef.current.value = ''; // Reset the file input field
      } else {
        setErrors('Failed to submit the form. Please try again.');
      }
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors)
      } else {

        setErrors('An error occurred while submitting the form.');
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current.click(); // Trigger the hidden file input click
  };
  const handleDateChange = (e) => {
    const value = e.target.value;
    setDob(value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 500 * 1024) {
        setErrors('File size exceeds 500 KB');
        setFileName('');
        return;
      }
      setFileName(file.name);
      setErrors({});
    }
  };
  const yearOptions = Array.from({ length: 50 }, (_, i) => {
    const year = 1980 + i;
    return <option key={year} value={year}>{year}</option>
  })
  return (
     <div className=''>
      <div className='px-2 md:px-20 '>
        <h1 className='font-bold text-center mt-10 text-[1.2em] md:text-[1.6em]'>Learn<span className='text-orange-600'>O</span>sphere.in</h1>
        <p className='text-[1em] border-b-2 border-orange-600 h-12 mt-8'><span className=' text-[1.1em]  font-bold'>Job Description: </span>App Development</p>
      </div>
      <div className='font-semibold px-20 text-center mt-4 text-[.9em] md:text-[1.1em]'>
        <p>Please Fill the Details</p>
      </div>
      <div>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
          <div className='px-4 md:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3  gap-4 '>
            <span className='w-full md:w-full'>
              <label htmlFor="name" className="block mb-2 text-gray-700 text-[.9em]" >Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 p-2 rounded-md w-full placeholder:text-[.9em] focus:outline-none focus:border-blue-500"
              />
              {errors.name && <p className="text-red-500 text-sm mb-4">{errors.name}</p>}
            </span>
            <span className='w-full md:w-full'>
              <label htmlFor="mobile" className="block mb-2 text-gray-700 text-[.9em] ">Mobile:</label>
              <div className="flex ">
                <div ref={dropdownRef} className="relative bg-gray-200 rounded-md " >
                  <div
                    className=" border p-2 rounded-md cursor-pointer  whitespace-nowrap text-sm shadow-sm flex justify-between items-center"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    <span>{selected || "+91"}</span>
                    <span>▼</span>
                  </div>
                  {/* Dropdown list */}
                  {showDropdown && (
                    <div className="absolute top-full mt-1 w-[260px] max-h-80 overflow-y-auto bg-white shadow-lg rounded-md z-50 text-sm">
                      {countries.map((c) => (
                        <div
                          key={c._id}
                          className="px-3 py-2 hover:bg-gray-100 cursor-pointer border-gray-800 flex justify-between"
                          onClick={() => handleSelect(`+${c.countryCode}`)}
                        >
                          <span className="text-base">{c.countryName}</span>
                          <span className="text-sm">(+{c.countryCode})</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {errors.selectedCountry && (
                  <p className="text-red-500 text-sm mb-2">{errors.selectedCountry}</p>
                )}
                <input
                  type="number"
                  id="contact"
                  name="contact"
                  value={contact}
                  placeholder="Mobile"
                  onChange={handleContact}
                  className="border border-gray-300 p-2 rounded-md w-full placeholder:text-[.9em] focus:outline-none focus:border-blue-500"
                />
              </div>
              {errors.contact && <p className="text-red-500 text-sm mb-4">{errors.contact}</p>}
            </span>
            <span className='w-full md:w-full'>
              <label htmlFor="email" className="block mb-2 text-gray-700 text-[.9em] ">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 p-2 rounded-md w-full placeholder:text-[.9em] focus:outline-none focus:border-blue-500"
              />
              {errors.email && <p className="text-red-500 text-sm mb-4">{errors.email}</p>}
            </span>
            <span className='w-full md:w-full'>
              <label htmlFor="city" className="block mb-2 text-gray-700 text-[.9em]">City:</label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="Office City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="border border-gray-300 p-2 rounded-md w-full placeholder:text-[.9em] focus:outline-none focus:border-blue-500"
              />
              {errors.city && <p className="text-red-500 text-sm mb-4">{errors.city}</p>}

            </span>
            <span className='w-full md:w-full'>
              <label htmlFor="dob" className="block mb-2 text-gray-700 text-[.9em]">DOB:</label>
              <input
                type="date"
                id="dob"
                name="dob"
                min="1900-01-01"
                value={dob}
                onChange={handleDateChange}
                className="border border-gray-300 p-2 rounded-md w-full placeholder:text-[.9em] focus:outline-none focus:border-blue-500"
              />
              {errors.dob && <p className="text-red-500 text-sm mb-4">{errors.dob}</p>}

            </span>
            <span className='w-full md:w-full'>
              <label htmlFor="qualification" className="block mb-2 text-gray-700 text-[.9em]">Select Highest Qualification:</label>
              <select
                id="qualification"

                name="qualification"
                value={qualification}
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:border-blue-500"
                onChange={(e) => setQualification(e.target.value)}
              >
                <option value="">Select Qualification</option>
                <option value="B.Tech">B.Tech</option>
                <option value="M.Tech">M.Tech</option>
                <option value="MCA">MCA</option>
                <option value="BCA">BCA</option>
                <option value="M.sc-IT">M.sc-IT</option>
                <option value="Others">Others</option>
              </select>
              {errors.qualification && <p className="text-red-500 text-sm mb-4">{errors.qualification}</p>}
            </span>
            <span className='w-full md:w-full'>
              <label htmlFor="year" className="block mb-2 text-gray-700 text-[.9em]">Completion Year:</label>
              <select
                id="year"
                name="year"
                value={year}
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:border-blue-500"
                onChange={(e) => setYear(e.target.value)}
              >
                <option value="">Select Your Completion Year</option>
                {yearOptions}
              </select>
              {errors.year && <p className="text-red-500 text-sm mb-4">{errors.year}</p>}
            </span>
            <span className='w-full md:w-full'>
              <label htmlFor="resume" className="block mb-2 text-gray-700 text-[.9em]">Upload Your Resume:</label>
              <input
                type="text"

                onClick={handleClick}
                readOnly
                value={fileName} // Display the file name in the input field
                placeholder="Upload Your Resume"
                onChange={(e) => setFileName(e.target.value)}
                className="border border-gray-300 p-2 rounded-md w-full cursor-pointer placeholder:text-[.9em] focus:outline-none focus:border-blue-500 "
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept=".pdf,.doc,.docx"
              />
              {errors.resume && <p className="text-red-500 text-sm mb-4">{errors.resume}</p>}
            </span>
            <span className='w-full md:w-full'>
              <label htmlFor="year" className="block mb-2 text-gray-700 text-[.9em]">Job Role:</label>
              <select
                id="role"

                name="role"
                value={role}
                className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:border-blue-500"
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select Your Job Role</option>
                <option value="App Developer">App Developer</option>
              </select>
              {errors.role && <p className="text-red-500 text-sm mb-4">{errors.role}</p>}
            </span>
          </div>
          <div className="flex justify-center gap-2 items-center">
            <label htmlFor="gender" className="block mb-2 mt-2  text-gray-700 text-[.9em]">Gender</label>
            <label className="mr-4 border border-gray-300 p-3 w-28 text-center rounded-full">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={gender === 'Male'}
                onChange={() => setGender('Male')}
                className="mr-1"
              />
              Male
            </label>
            <label className="mr-4 border border-gray-300 p-3 w-28 text-center rounded-full">

              <input
                type="radio"
                name="gender"
                value="Female"
                checked={gender === 'Female'}
                onChange={() => setGender('Female')}
                className="mr-1"
              />
              Female
            </label>
            {errors.gender && <p className="text-red-500 text-sm mb-4">{errors.gender}</p>}

          </div>

          {formSuccess && <p className="text-green-500 text-sm mb-4">{formSuccess}</p>}
          <div className='flex flex-col justify-center items-center '>
            <button type='submit' className='bg-orange-600 w-32 mt-6 text-white font-bold p-2 rounded-sm'>Submit</button>
            <p>Or</p>
            <Link target='_blank' href='https://www.linkedin.com/company/learnosphere-in?trk=public_profile_topcard-current-company&originalSubdomain=in'>
              <div className='flex gap-1 items-center '>
                <Image className='h-10 w-10 ' src={Linkedimg} alt="LinkenIn" />
                <p className='border-b border-orange-600'>Directly Apply On LinkedIn</p>
              </div>
            </Link>
          </div>
        </form>
      </div>
      <div className=' w-full md:w-[88%] m-auto mt-10'>
        <p className='p-4 '>At <b className='font-bold text-[1.1em]'>Lern<span className='text-orange-600'>O</span>sphere</b>, we are on the lookout for a visionary App Developer to join our dynamic team and drive innovation in the ever-evolving landscape of mobile technology. As an integral part of our team, you will spearhead the development of cutting-edge applications that redefine user experiences and set new industry standards. You’ll collaborate with talented professionals, harnessing your expertise to craft intuitive, high-performance apps that captivate and engage our diverse user base. If you have a passion for turning complex challenges into seamless, user-centric solutions and a desire to work in a collaborative, forward-thinking environment, Lernosphere offers the perfect platform to unleash your creativity and make a significant impact. Join us and be a part of shaping the future of app development!</p>
        <p className='p-4 '>Joining <b className='font-bold text-[1.1em]'>Lern<span className='text-orange-600'>O</span>sphere</b> offers a unique chance to be at the forefront of technological innovation and creativity. At Lernosphere, the focus on cutting-edge technology and a collaborative work environment creates a stimulating atmosphere where web developers can thrive and grow. The company's commitment to professional development means you’ll have access to continuous learning opportunities, enabling you to stay updated with the latest industry trends and tools. Lernosphere’s diverse and inclusive team fosters a culture of innovation and teamwork, where your ideas are valued and your contributions make a tangible impact. The emphasis on challenging projects and a supportive environment ensures that you’ll be able to push the boundaries of your skills while making significant strides in your career. Joining Lernosphere is not just about a job—it’s about becoming part of a forward-thinking community dedicated to shaping the future of web development.</p>
      </div>
      <Footer1 />
      <Footer />
    </div>
  );
};

export default Appform;
