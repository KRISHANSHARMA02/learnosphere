"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import Pdfdata from "./pdfdata/page";
import Head from "next/head";
import { trackEvent } from "@/src/lib/eventTracker";

const Pdf = () => {
  const[showField,setShowField] = useState(null)
  const [fileName, setFileName] = useState("");
  const [errors, setErrors] = useState({});
  const [selectedClass, setSelectedClass] = useState("All");
  const [subjects, setSubjects] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [title, setTitle] = useState("");
  const [term, setTerm] = useState("");
  const [samplepapers, setSamplePapers] = useState("");
  const [year, setYear] = useState("");
  const [chapter, setChapter] = useState("");
  const [level, setLevel] = useState("");
  const [topic, setTopic] = useState("");
  const [success, setSuccess] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);


  const [category, setCategory] = useState("");
  const { data: session, status } = useSession();
  const [profileData, setProfileData] = useState({});
  const handleButtonClick = (field) => {
    setShowField(field)
  }

  useEffect(() => {
    const fetchProfileData = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const response = await axios.post(
            "https://learnospherebackend.learnosphere.in/api/route/getTeacherByEmail",
            { gmail: session.user.email }
          );
          setProfileData(response.data);
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      }
    };

    fetchProfileData();
  }, [session, status]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");
    setLoading(true);

    const formData = new FormData();
   
    formData.append("topic", topic);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("samplepapers", samplepapers);
    formData.append("term", term);
    formData.append("year", year);
    formData.append("chapter", chapter);
    formData.append("level", level);
    formData.append("selectedClass", selectedClass);
    formData.append("selectedSubject", selectedSubject);
    formData.append("pdf", fileInputRef.current.files[0]);
    formData.append("gmail", profileData?.gmail || session.user.email);


    try {
      const response = await axios.post(
        "https://learnospherebackend.learnosphere.in/api/route/teacheruploadcontroller",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        trackEvent("TEACHER_PDF_UPLOAD_SUBMITTED", {
          topic,
          title,
          description,
          category,
          samplepapers,
          term,
          year,
          chapter,
          class: Class,
          level,
          pdf_file_name: fileName || fileInputRef.current?.files[0]?.name || "",
        });

        setSuccess("File Submitted Successfully");
        setTitle("");
        setTerm("");
        setTopic("");
        setDescription("");
        setCategory("");
        setSamplePapers("");
        setTerm("");
        setYear("");
        setChapter("");
        setLevel("");
        setSelectedClass("");
        setSelectedSubject("");
        fileInputRef.current.value = "";
        setFileName("");
      } else {
        setErrors({ general: "Failed to Submit Form. Please Try Again" });
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: "An error occurred while submitting the form" });
      }
    } finally {
      setLoading(false); // Stop loader
    }
  };

  const fileInputRef = useRef(null);

  const handleClassChange = (e) => {
    const classValue = e.target.value;
    setSelectedClass(classValue);
    setSelectedSubject("");
    setSelectedFilter(classValue);

    const subjects = {
      "Class-1": ["Math", "EVS", "English"],
      "Class-2": ["Math", "EVS", "English"],
      "Class-3": ["Math", "EVS", "English"],
      "Class-4": ["Math", "EVS", "English"],
      "Class-5": ["Math", "EVS", "English"],
      "Class-6": ["Math", "Science", "English", "Social Science", "Hindi"],
      "Class-7": ["Math", "Science", "English", "Social Science", "Hindi"],
      "Class-8": ["Math", "Science", "English", "Social Science", "Hindi"],
      "Class-9": ["Math", "Science", "English", "Social Science", "Hindi"],
      "Class-10": ["Math", "Science", "English", "Social Science", "Hindi"],
      "Class-11": [
        "Math",
        "Physics",
        "Chemistry",
        "Biology",
        "English",
        "Hindi",
        "Accountancy",
        "Bussiness Studies",
        "Economics",
        "Political Science",
      ],
      "Class-12": [
        "Math",
        "Physics",
        "Chemistry",
        "Biology",
        "English",
        "Hindi",
        "Accountancy",
        "Bussiness Studies",
        "Economics",
        "Political Science",
      ],
    };
    setSubjects(subjects[classValue] || []);
  };
  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 25 * 1024 * 1024) { // 25MB limit
        setErrors({ file: "File Size Exceeds 25 MB" });
        setFileName("");
        return;
      }
      setFileName(file.name);
      setErrors({});
    }
  };

  return (
    <div className="w-[90vw] md:w-[80vw] min-h-screen">
    <Head>
    <meta name="robots" content="noindex, nofollow" />
  </Head>
    <div className="flex gap-5    mb-4">
    <button className="bg-orange-600 text-white font-bold p-2 text-[.5em] md:text-[.8em] rounded-full" onClick = {() => handleButtonClick("topic")}>Upload Files Topic Wise </button>
    <button className="bg-orange-600 text-white font-bold p-2 text-[.5em] md:text-[.8em] rounded-full"  onClick = {() => handleButtonClick("samplepapersAndtermAndyear")}>Upload Sample Question Paper</button>
    <button className="bg-orange-600 text-white font-bold p-2 text-[.5em] md:text-[.8em] rounded-full"  onClick = {() => handleButtonClick("topicAndchapterAndlevel")}>Upload Important Questions Chapter Wise</button>
    </div>
      <form
        onSubmit={handleSubmit}
        className="border border-gray-300 p-2 md:p-8 rounded-md shadow-lg"
      >
        <h1 className=" text-center font-bold text-[1.1em]">
          Concept File Management
        </h1>
        <div className="flex flex-col gap-3 p-2 md:p-6">
          <div className="flex flex-col md:flex-row justify-around gap-0 md:gap-10">
       
          {showField === "topic" && (
 
            <div className="w-full md:w-[50%]">
            <label
              htmlFor="topic"
              className="block text-gray-900 text-[.9em]"
            >
            topic
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              id="topic"
              name="topic"
              placeholder="Enter File topic"
              className=" p-2 border border-gray-300 text-[.9em] rounded-md w-full placeholder:text-[.9em] focus:outline-none focus:border-blue-500"
            />
           
          </div>
          )}
            <div className="w-full md:w-[50%]">
              <label
                htmlFor="title"
                className="block text-gray-900 text-[.9em]"
              >
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                id="title"
                name="title"
                placeholder="Enter File Title"
                className=" p-2 border border-gray-300 text-[.9em] rounded-md w-full placeholder:text-[.9em] focus:outline-none focus:border-blue-500"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mb-4">{errors.title}</p>
              )}
            </div>
            <div className="w-full md:w-[50%]">
              <label
                htmlFor="description"
                className="block text-gray-900 text-[.9em]"
              >
                Description
              </label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name="description"
                placeholder="Enter File Description"
                className=" p-2 border border-gray-300 text-[.9em] rounded-md w-full placeholder:text-[.9em] focus:outline-none focus:border-blue-500"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mb-4">
                  {errors.description}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-around gap-0 md:gap-10">
            <div className="w-full md:w-[50%]">
              <label
                htmlFor="category"
                className="block text-gray-700 text-[.9em]"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border border-gray-300 p-2 placeholder:text-[.9em] w-full rounded-md focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Category</option>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
              </select>

              {errors.category && (
                <p className="text-red-500 text-sm mb-4">{errors.category}</p>
              )}
            </div>
          
            <div className="w-full md:w-[50%]">
              <label htmlFor="pdf" className="block text-gray-700 text-[.9em]">
                Upload File
              </label>
              <input
                type="text"
                onClick={handleClick}
                readOnly
                value={fileName}
                placeholder="Upload Your File"
                onChange={(e) => setFileName(e.target.value)}
                className="border border-gray-300 p-2 rounded-md w-full cursor-pointer placeholder:text-[.9em] focus:outline-none focus:border-blue-500 "
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
                accept=".pdf,.doc,.docx"
              />
              {errors.file && (
                <p className="text-red-500 text-sm mb-4">{errors.file}</p>
              )}
              {errors.pdf && (
                <p className="text-red-500 text-sm mb-4">{errors.pdf}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-around gap-0 md:gap-10">
            <div className="w-full md:w-[50%]">
              <label
                htmlFor="classes"
                className="block text-gray-700 text-[.9em]"
              >
                Class
              </label>
              <select
                id="classes"
                name="classes"
                value={selectedClass}
                onChange={handleClassChange}
                className="border border-gray-300 p-2 placeholder:text-[.9em] w-full rounded-md focus:outline-none  focus:border-blue-500"
              >
                <option value="">Select Your Class</option>
                <option value="Class-1">Class-1</option>
                <option value="Class-2">Class-2</option>
                <option value="Class-3">Class-3</option>
                <option value="Class-4">Class-4</option>
                <option value="Class-5">Class-5</option>
                <option value="Class-6">Class-6</option>
                <option value="Class-7">Class-7</option>
                <option value="Class-8">Class-8</option>
                <option value="Class-9">Class-9</option>
                <option value="Class-10">Class-10</option>
                <option value="Class-11">Class-11</option>
                <option value="Class-12">Class-12</option>
              </select>
              {errors.selectedClass && (
                <p className="text-red-500 text-sm mb-4">
                  {errors.selectedClass}
                </p>
              )}
            </div>
            <div className="w-full md:w-[50%]">
              {selectedClass && subjects.length > 0 && (
                <div className="">
                  <label
                    htmlFor="selectedSubject"
                    className="block text-gray-700 text-[.9em]"
                  >
                    Subjects
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={selectedSubject}
                    onChange={handleSubjectChange}
                    className="border p-2 border-gray-300  placeholder:text-[.9em] w-full rounded-md focus:outline-none  focus:border-blue-500"
                  >
                    <option value="">Selected Subject</option>
                    {subjects.map((subject, index) => (
                      <option key={index} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                  {errors.selectedSubject && (
                    <p className="text-red-500 text-sm mb-4">
                      {errors.selectedSubject}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
          {showField === "samplepapersAndtermAndyear" && (
 
            <div className='flex flex-col md:flex-row justify-around gap-0 md:gap-10'>
                  <div className='w-full md:w-[50%]'>
                  <label htmlFor='samplepapers' className='block text-gray-700 text-[.9em]'>Practice Question </label>
                  <select id="samplepapers" name="samplepapers" value={samplepapers} onChange={(e) => setSamplePapers(e.target.value)} className='border border-gray-300 p-2 placeholder:text-[.9em] w-full rounded-md focus:outline-none focus:border-blue-500'>
                      <option value="">None</option>
                      <option value="Sample Question Papers">Sample Question Papers</option>
                      
                  </select>
                 
                
              </div>
                  <div className='w-full md:w-[50%]'>
                  <label htmlFor='term' className='block text-gray-700 text-[.9em]'>Term Wise </label>
                  <select id="term" name="term" value={term} onChange={(e) => setTerm(e.target.value)} className='border border-gray-300 p-2 placeholder:text-[.9em] w-full rounded-md focus:outline-none focus:border-blue-500'>
                      <option value="">None</option>
                      <option value="Term-1">Term-1</option>
                      <option value="Term-2">Term-2</option>
                      <option value="Term-3">Term-3</option>
                      <option value="Term-4">Term-4</option>
                      <option value="Term-5">Term-5</option>
                      <option value="Term-6">Term-6</option>
                      <option value="Term-7">Term-7</option>
                      <option value="Term-8">Term-8</option>
                      <option value="Term-9">Term-9</option>
                      <option value="Term-10">Term-10</option>
                      
                  </select>
                 
                
              </div>
              <div className='w-full md:w-[50%]'>
                  <label htmlFor="year" className="block text-gray-700 text-[.9em]">Select Year</label>
                  <select
                      id="year"
                      name="year"
                      value={year}
                      onChange={(e) => {
                          const selectedYear = e.target.value;
                          setYear(selectedYear);
                          // Update the URL with the selected year
                          const url = new URL(window.location);
                          url.searchParams.set('year', selectedYear);  // Set the new 'year' query param
                          window.history.pushState({}, '', url); // Update the URL without reloading the page
                      }}
                      className="border border-gray-300 p-2 placeholder:text-[.9em] w-full rounded-md focus:outline-none focus:border-blue-500"
                  >
                      <option value="">None</option>
                      <option value="2024-2025">2024-2025</option>
                      <option value="2023-2024"> 2023-2024</option>
                      <option value="2022-2023"> 2022-2023</option>
                      <option value="2021-2022"> 2021-2022</option>
                      <option value="2020-2021"> 2020-2021</option>
                      <option value="2019-2020"> 2019-2020</option>
                      <option value="2018-2019"> 2018-2019</option>
                      <option value="2017-2018"> 2017-2018</option>
                      <option value="2016-2017"> 2016-2017</option>
                      <option value="2015-2016"> 2015-2016</option>
                      <option value="2014-2015"> 2014-2015</option>
                      
                      {/* More options... */}
                  </select>
                 
                
              </div>
              </div>
              
          )}
          {showField === "topicAndchapterAndlevel" && (

            <div className='flex flex-col md:flex-row justify-around gap-0 md:gap-10'>
            <div className="w-full md:w-[50%]">
            <label
              htmlFor="topic"
              className="block text-gray-900 text-[.9em]"
            >
            topic
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              id="topic"
              name="topic"
              placeholder="Enter File topic"
              className=" p-2 border border-gray-300 text-[.9em] rounded-md w-full placeholder:text-[.9em] focus:outline-none focus:border-blue-500"
            />
           
          </div>
               
          <div className='w-full md:w-[50%]'>
          <label htmlFor='chapter' className='block text-gray-700 text-[.9em]'>Chapter Wise </label>
          <select id="chapter" name="chapter" value={chapter} onChange={(e) => setChapter(e.target.value)} className='border border-gray-300 p-2 placeholder:text-[.9em] w-full rounded-md focus:outline-none focus:border-blue-500'>
              <option value="">None</option>
              <option value="1">Chapter-1</option>
              <option value="2">Chapter-2</option>
              <option value="3">Chapter-3</option>
              <option value="4">Chapter-4</option>
              <option value="">Chapter-5</option>
              <option value="">Chapter-6</option>
              <option value="7">Chapter-7</option>
              <option value="8">Chapter-8</option>
              <option value="9">Chapter-9</option>
              <option value="10">Chapter-10</option>
              <option value="11">Chapter-11</option>
              <option value="12">Chapter-12</option>
              <option value="13">Chapter-13</option>
              <option value="14">Chapter-14</option>
              <option value="15">Chapter-15</option>
              <option value="16">Chapter-16</option>
              <option value="17">Chapter-17</option>
              <option value="18">Chapter-18</option>
              <option value="19">Chapter-19</option>
              <option value="20">Chapter-20</option>
             
              
          </select>
         
        
      </div>
      <div className='w-full md:w-[50%]'>
      <label htmlFor='level' className='block text-gray-700 text-[.9em]'>Difficulty Level </label>
      <select id="level" name="level" value={level} onChange={(e) => setLevel(e.target.value)} className='border border-gray-300 p-2 placeholder:text-[.9em] w-full rounded-md focus:outline-none focus:border-blue-500'>
          <option value="">None</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
         </select>
     
    
  </div>
              </div>
              
          )}
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="bg-orange-600 p-2 font-bold rounded-md mt-8 mb-4 md:mb-0 text-white"
            >
              {loading ? "Uploading..." : "Upload File"}
            </button>
          </div>
        </div>
        {success && <p className="text-green-500 text-sm mt-4">{success}</p>}
        {errors.general && (
          <p className="text-red-500 text-sm mt-4">{errors.general}</p>
        )}
      </form>
      {loading && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="loader"></div>{" "}
          {/* Customize loader style as needed */}
        </div>
      )}
      <Pdfdata />
    </div>
  );
};
export default Pdf
