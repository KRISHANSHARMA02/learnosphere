"use client";
import React, { useEffect, useState } from 'react'
import { BiMath } from "react-icons/bi";
import { MdOutlineBookmark, MdOutlineScience } from "react-icons/md";
import { MdQuestionMark } from "react-icons/md";
import { Link } from 'react-scroll';
import { PiNotepad } from "react-icons/pi";
import Image from 'next/image';
import Classroom from '@/public/classroom.webp'
import { PiBookOpenText } from "react-icons/pi";
import { GiWhiteBook } from "react-icons/gi";
import Head from 'next/head';
import axios from 'axios';
import Logo from "@/public/Yellow Beige Feminine Thank You Card.png"

import { useSession } from 'next-auth/react';
import { FaArrowRightLong } from 'react-icons/fa6';
import { set } from 'date-fns';
import { CgPlayButtonO, CgPlayButtonR } from 'react-icons/cg'
import NotFound from '@/public/NotFoundLogo.png';


const Bookmark = () => {
const { data: session, status } = useSession();
  const[grade,setGrade] = useState(null)
  const[registrationNumber,setRegistrationNumber] = useState(null)
  const[loading,setLoading] = useState(false)
  const[bookMarks,setBookMarks] = useState([])
  const[videoBookmarks,setVideoBookmarks] = useState([])
  const[subjects,setSubjects] = useState([])
  const [error, setError] = useState(null);
   const [bookmarkedFiles, setBookmarkedFiles] = useState(new Set());
   const [selectedVideo, setSelectedVideo] = useState(null);
   const [activeVideoId, setActiveVideoId] = useState(null);
   const [showAll, setShowAll] = useState(false);
   const [showAllVideos, setShowAllVideos] = useState(false);

  const handleVideoClick = (videoId, videoUrl) => {
    setActiveVideoId(videoId);
    setSelectedVideo(videoUrl);
  };

 


   useEffect(() => {
    const fetchGrade = async () => {
      if (status === 'authenticated' && session?.user?.email) {
        try {
          const response = await axios.post(
            "https://learnospherebackend.learnosphere.in/api/route/getStudentByEmail",
            { gmail: session.user.email }
          );
          setGrade(response.data.grade);
          setRegistrationNumber(response.data.registrationNumber); // Save registrationNumber
        } catch (error) {
          console.error("Error Fetching Grade:", error);
        }
      }
    };
    fetchGrade();
  }, [session, status]);
  
  useEffect(() => {
    const fetchBookmarks = async () => {
        if (registrationNumber && grade) {  // Ensure both userId and grade are available
            try {
                const response = await axios.post(
                    "https://learnospherebackend.learnosphere.in/api/route/getBookmark",
                    { 
                        userId: registrationNumber, 
                        grade: grade  // Send grade as well
                    }
                );
                setBookMarks(response.data.message);
            } catch (error) {
                console.error("Error Fetching Bookmarks:", error);
                setError(
                    error.response?.data?.message ||
                    "An error occurred while fetching bookmarks"
                );
            }
        } else {
            setError("User is not authenticated or grade is missing.");
        }
    };

    fetchBookmarks();
}, [registrationNumber, grade]); // Add grade as a dependency

  
  const handleRemoveBookmark = async (fileId) => {
    if (registrationNumber) {
      try {
        await axios.post("https://learnospherebackend.learnosphere.in/api/route/removeBookmark", {
          userId: registrationNumber, // Use registrationNumber
          fileId,
        });
  
        setBookMarks((prev) => prev.filter((file) => file.fileId !== fileId));
        alert("Bookmark Removed Successfully");
      } catch (error) {
        console.error("Error Removing Bookmark", error);
        alert("An error occurred while removing the bookmark.");
      }
    } else {
      alert("User is not authenticated.");
    }
  };
  

useEffect(() => {
const fetchVideoBookmarks = async() => {
  if(registrationNumber && grade){
    try{
      const response = await axios.post('https://learnospherebackend.learnosphere.in/api/route/getVideoBookmark',{
        userId:registrationNumber,
        grade:grade
      });
      setVideoBookmarks(response.data.message);
    }
    catch(error){
      console.error("Error Fetching Bookmarks:",error)
      setError(error.response?.data?.message || "An error occured while fetching bookmarks")
    }

  }
  else{
    setError("User is not authenticatd.")
  }
}
fetchVideoBookmarks();
},[registrationNumber,grade])

const handleView = (pdfUrl) => {
  const newWindow = window.open();
  newWindow.document.write(`
    <html>
      <head><title>PDF Viewer</title></head>
      <body style="margin:0;padding:0;overflow:hidden;">
        <iframe src="${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0" width="100%" height="100%" style="border:none;"></iframe>
      </body>
    </html>
  `);
};




const handleRemoveVideoBookmark = async (videoId) => {
  if (registrationNumber) {
    try {
      // Make a request to remove the bookmark
      await axios.post("https://learnospherebackend.learnosphere.in/api/route/removevideoBookmark", {
        userId: registrationNumber,
        videoId,
      });

      // Remove the bookmark from the state after successful removal
      setBookMarks((prev) => prev.filter((video) => video.videoId !== videoId));
      alert("Bookmark Removed Successfully");
    } catch (error) {
      console.error("Error Removing Bookmark", error);
      alert("An error occurred while removing the bookmark.");
    }
  } else {
    alert("User is not authenticated.");
  }
};






 
  return (
    <div>
    <Head>
    <meta name="robots" content="noindex, nofollow" />
  </Head>

  <div>
  <div className='w-full flex items-center justify-between p-3'>
  <h1 className="text-[.9em] md:text-[1.4em] text-center font-bold mt-6 text-orange-600">Bookmarked Notes</h1>
  <button
  className="bg-orange-100 text-orange-500 hover:text-orange-600 p-1 mt-6 rounded-full w-28 text-[.7em] md:text-[.9em] font-semibold"
  onClick={() => setShowAll(!showAll)}
>
  {showAll ? "Hide All" : "View All"}
</button>
  </div>
  
  {bookMarks.length > 0 ? (
    <div className={`${showAll ? "max-h-[240px] overflow-y-auto" : "max-h-[200px] overflow-hidden"} scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-gray-200`}>
    <ul className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 md:grid-cols-3 gap-2  overflow-y-auto  mt-6 mb-6">
      {bookMarks.slice(0, showAll ? bookMarks.length: 3).map((bookmark, index) => (
        // Check if the bookmark is active (isBookmarked = 1), only then display it
        bookmark.isBookmarked === 1 && (

          <div key={index} className="bg-gray-50 border relative flex flex-col justify-between  border-gray-300 rounded-md p-3">
          <li className=" text-gray-800 font-bold text-[1em]">Subject:{bookmark.selectedSubject}</li>
            <li className='text-orange-500  mt-2 font-bold'>{bookmark.title}</li>
            <li className='w-[70%] mt-1'>{bookmark.topic}</li>
           
            <span>
              {/* View Button */}
              <button>
                <FaArrowRightLong className='bg-orange-500 p-2 rounded-full text-white mt-2 animate-bounce' size={30 } onClick={() => handleView(bookmark.pdfUrl)} />
              </button>
              {/* Remove Bookmark Button */}
              <button
                className="absolute top-2 right-2 text-green-500 hover:text-green-600"
                onClick={() => handleRemoveBookmark(bookmark.fileId)}
              >
                {/* Filled bookmark icon if the file is bookmarked */}
                <MdOutlineBookmark size={25} />
              </button>
            </span>
          </div>
        )
      ))}
    </ul>
    </div>
  ) : (
    <div className='p-4 '>
    
     <div className='p-16 border rounded-lg mt-4 bg-gray-50 border-gray-300 flex flex-col justify-center items-center'>
     < GiWhiteBook size={120} className='text-orange-500'/>
     <p className='font-bold text-[1.2em] text-center md:text-start'>No bookmarks to show yet</p>
     <p className='font-semibold text-gray-600 text-[1em] text-center md:text-start'>No bookmarked files found. Start saving your favorites!</p>
    

     </div>
   </div>
  )}
</div>


<div>
<div className="w-full flex items-center justify-between p-3">
  <h1 className="text-[.9em] md:text-[1.4em] text-center font-bold mt-6 text-orange-600">
    Bookmarked Videos
  </h1>
  <button
    className="bg-orange-100 text-orange-500 hover:text-orange-600 p-1 mt-6 rounded-full w-28 text-[.7em] md:text-[.9em] font-semibold"
    onClick={() => setShowAllVideos(!showAllVideos)}
  >
    {showAllVideos ? "Hide All" : "View All"}
  </button>
</div>

<div className={`${showAllVideos ? "max-h-[400px] overflow-y-auto" : "max-h-[350px] overflow-hidden"} scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-gray-200`}>
  {videoBookmarks.filter((videobookmark) => videobookmark.isBookmarked === 1).length > 0 ? (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4 mt-6 mb-6">
      {videoBookmarks
        .filter((videobookmark) => videobookmark.isBookmarked === 1)
        .slice(0, showAllVideos ? videoBookmarks.length : 3)
        .map((videobookmark, index) => (
          <div
            key={index}
            className="bg-gray-200 rounded-2xl w-full relative flex flex-col gap-2 p-6 cursor-pointer"
            onClick={() => handleVideoClick(videobookmark.videoId, videobookmark.video_url)}
          >
            {activeVideoId === videobookmark.videoId ? (
              <video
                src={videobookmark.video_url}
                className="w-full h-40 mt-3 object-cover"
                controls
                autoPlay
              />
            ) : (
              <video
                src={videobookmark.video_url}
                className="w-full h-40 mt-3 object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
            )}

            <li className="text-blue-500 font-bold text-[1em]">
              Subject: {videobookmark.selectedSubject}
            </li>
            <li className="text-orange-500 mt-1 font-bold">
              {videobookmark.title}
            </li>
            <div className="w-full flex justify-between items-center">
              <li className="w-[70%]">{videobookmark.topic}</li>
              <span>
                <button>
                  <CgPlayButtonO className="text-orange-600 rounded-lg" size={25} />
                </button>
              </span>
            </div>
            <button
              className="absolute top-2 right-2 text-green-500 hover:text-green-600"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveVideoBookmark(videobookmark.videoId);
              }}
            >
              <MdOutlineBookmark size={25} />
            </button>
          </div>
        ))}
    </ul>
  ) : (
    <div className='p-4 '>
    
    <div className='p-16 border rounded-lg mt-4 bg-gray-50 border-gray-300 flex flex-col justify-center items-center'>
    < GiWhiteBook size={120} className='text-orange-500'/>
    <p className='font-bold text-[1.2em] text-center md:text-start'>No bookmarks to show yet</p>
    <p className='font-semibold text-gray-600 text-[1em] text-center md:text-start'>No bookmarked videos found. Start saving your favorites!</p>
   

    </div>
  </div>
  )}
</div>

</div>


      <div className='flex flex-col md:flex-row mt-4  '>
        <div className='w-full md:w-[55%] h-auto md:h-[80vh] flex flex-col  gap-6'>
      <div className='p-8 md:p-10 mx-2 xl:mx-2 2xl:mx-8 border border-gray-300  h-auto xl:h-[45vh] 2xl:h-[35vh] rounded-lg'>
        <p className='text-[.9em] md:text-[1.4em] font-bold'>Subjects Bookmarks</p>
        <p className='font-semibold text-orange-400 mt-2'>Total Bookmarks:</p>
        <div className='flex flex-wrap gap-4 mt-8'>
          <span  className='p-5 bg-green-200 w-48 flex flex-col justify-between h-40 rounded-md'>
            <p className="flex items-center font-bold text-[1em] text-gray-700 gap-2"><BiMath className='text-green-40000' size={30} />Mathematics</p>
            <p className='text-orange-600 text-[.6em] md:text-[.8em] bg-white text-center p-1 rounded-full hover:bg-green-200 '>No Bookmarks Yet</p>
          </span>
          <span  className=' bg-cyan-200 w-48 p-5 flex flex-col justify-between h-40 rounded-md'>
            <p className='flex items-center font-bold text-[1em] text-gray-700 gap-2' ><MdOutlineScience className='text-cyan-400' size={30} />Science</p>
            <p className='text-orange-600 text-[.6em] md:text-[.8em] bg-white text-center p-1 rounded-full hover:bg-cyan-200 '>No Bookmarks Yet</p>
          </span>
        </div>
      </div>
      <div className='p-4 xl:p-2 2xl:p-10 mx-2 xl:mx-3 2xl:mx-8 border border-gray-300 h-auto xl:h-[55vh] 2xl:h-[35vh] rounded-lg'>
        <p className='text-[0.9em] md:text-[1.4em] font-bold'>Bookmarked Categories</p>
   
        <div className=' flex flex-wrap  gap-2 mt-8'>
          <span  className='p-5 bg-green-100 w-32 xl:w-40 2xl:w-48 flex flex-col justify-between h-40 rounded-md'>
            <p className="flex items-center font-bold text-[.9em] text-gray-700 gap-2"><MdQuestionMark className='text-green-400' size={30} />Questions</p>
            <p className='text-green-400 text-[.6em] md:text-[.8em] bg-white text-center p-1 rounded-full hover:bg-green-100 '>No Bookmarks Yet</p>
          </span>
          <span  className=' bg-cyan-100  w-32 xl:w-40 2xl:w-56 p-5 flex flex-col justify-between h-40 rounded-md'>
            <p className='flex items-center font-bold text-[.9em] text-gray-700 gap-2' ><PiBookOpenText  className='text-cyan-400' size={30} /> Summaries</p>
            <p className='text-cyan-400 text-[.6em] md:text-[.8em] bg-white text-center p-1 rounded-full hover:bg-cyan-100 '>No Bookmarks Yet</p>
          </span>
          <span  className=' bg-orange-100 w-32 xl:w-40 2xl:w-48 p-5 flex flex-col justify-between h-40 rounded-md'>
            <p className='flex items-center font-bold text-[.9em] text-gray-700 gap-2' ><PiNotepad  className='text-orange-400' size={30} />Exam Papers</p>
            <p className='text-orange-400 text-[.6em] md:text-[.8em] bg-white text-center p-1 rounded-full hover:bg-orange-100 '>No Bookmarks Yet</p>
          </span>
        </div>
      </div>
      </div>
      <div className='w-full md:w-[45%] border border-gray-300 rounded-lg p-4 flex flex-col gap-2'>
        <div className='flex justify-between  mt-5 rounded-lg gap-8 p-4 bg-orange-50 '>
          <div className='flex gap-8 ' >

         <span className=' p-3 h-12 w-12 bg-orange-300 rounded-full'>
          <MdQuestionMark className='bg-orange-400 h-6 w-6 rounded-full ' size={20}/>
          </span>
          <span>
             <p className='font-bold text-[0.6em] md:text-[1.2em] text-black'>Have a Doubt?</p>
        <p className='font-semibold text-[0.6em] md:text-[.9em] mt-1 md:mt-2 text-orange-500'>Clarify Your Doubt</p>
          </span>
          </div>
          <div>
            <Link href='/Userdashboard/Askquestion'>
            <button className='p-2 bg-orange-400 rounded-full text-[0.6em] md:text-[1em]  text-semibold text-white'>Click here</button></Link>
          </div>
         
        </div>
        <div className='flex justify-between  mt-2 rounded-lg gap-8 p-4 bg-sky-50 '>
          <div className='flex gap-8 ' >

         <span className=' p-3 h-12 w-12 bg-sky-300 rounded-full'>
          <PiNotepad className='h-6 w-6' size={20}/>
          </span>
          <span>
             <p className='font-bold text-[0.6em] md:text-[1.2em] text-black'>Take a Test?</p>
        <p className='font-semibold text-[0.6em] md:text-[.9em] mt-1 md:mt-2 text-sky-500 w-20 md:w-auto'>Take Chapter-Wise Test</p>
          </span>
          </div>
          <div>
            <Link href='/Userdashboard/Practicequestion'>
            <button className='p-2 bg-sky-400 text-[0.6em] md:text-[1em] rounded-full text-semibold text-white'>Click here</button></Link>
          </div>
         
        </div>
        <div className='flex flex-col gap-2  mt-2 rounded-lg  p-4 bg-sky-50 '>
         
         
          <Image className='h-80 rounded-lg' src ={Classroom} alt=''/>
             <p className='font-bold text-[0.6em] md:text-[1.2em] text-black'>Concept Video</p>
        <p className='font-semibold text-[0.6em] md:text-[.9em] mt-1 md:mt-2  text-sky-500'>Browse Video Lessons</p>
         
            <Link href='/Userdashboard/Conceptvideo'>
            <button className='p-2 bg-sky-400 rounded-lg text-semibold text-[0.7em] md:text-[.9em]  text-white'>view Concept Videos</button></Link>
          </div>
        
         
         
      
        
      </div>
      </div>
     
     
    </div>
  )
}

export default Bookmark
