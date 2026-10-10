"use client";
import React, { useState, useEffect } from "react";
import { IoShareSocialOutline, IoCloseOutline, IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { useSession } from "next-auth/react";


import VideoModal from "@/components/VideoModel";

import Head from "next/head";

import DashboardFooter from "@/components/DashboardFooter";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";


const Conceptvideo = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [grade, setGrade] = useState(null); // Default to null, meaning no grade selected
  const [videos, setVideos] = useState([]); // Store fetched videos
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const { data: session, status } = useSession(); // Fetch session data
  const [selectedVideoUrl, setSelectedVideoUrl] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [bookmarkedVideos, setBookmarkedVideos] = useState(new Set());
    const [userId, setUserId] = useState(null);
  // Handle Previous Button click

  useEffect(() => {
    AOS.init({ duration: 600 });

    if (status === "loading") {
      return; // Exit early if session is still loading
    }

    // Fetch grade directly from profile data
    const fetchGrade = async () => {

      if (status === 'authenticated' && session?.user?.email) {

        try {
          const response = await axios.post(
            "https://learnospherebackend.learnosphere.in/api/route/getStudentByEmail",
            { gmail: session.user.email }
          );
          const { grade } = response.data; // Extract grade directly from response
          setGrade(grade); // Set the grade state
          setUserId(response.data.registrationNumber);

        } catch (error) {
          console.error("Error fetching grade:", error);
        }
      }
    };

    fetchGrade();
  }, [session, status]); // Dependencies: session and status

  useEffect(() => {
    // Function to fetch videos based on the grade
    const fetchVideos = async (gradeToFetch) => {
      setLoading(true);

      try {
        const response = await axios.get(
          `https://learnospherebackend.learnosphere.in/api/route/getVideosForStudent`,
          { params: { grade: gradeToFetch } }
        );
        setVideos(response.data.videos); // Assuming backend returns { videos: [...] }
      } catch (error) {
        console.error("Error fetching videos:", error);
      }

      setLoading(false);
    };

    // Fetch videos if grade is available
    if (grade) {
      fetchVideos(grade);
    }
  }, [grade]); // Fetch videos only when grade is available

  useEffect(() => {
    const fetchBookmarkedVideos = async () => {
      try {
        const response = await axios.post("https://learnospherebackend.learnosphere.in/api/route/getVideoBookmark", {
          userId,
          grade:grade
        });
  
        if (response.status === 200) {
          const bookmarks = response.data.message; // Array of bookmarked files
  
          const bookmarkedMap = {};
          bookmarks.forEach((video) => {
            bookmarkedMap[video.videoId] = true;
          });
  
          setBookmarkedVideos(bookmarkedMap); // Set bookmarks in state
        }
      } catch (error) {
        console.error("Error fetching bookmarked files:", error);
      }
    };
  
    fetchBookmarkedVideos();
  }, [userId,grade]);


  const handleShareClick = (videoUrl) => {
    setSelectedVideoUrl(videoUrl); // Set the selected video URL
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  if (loading) {
    return <div>Loading...</div>; // Display a loading state
  }

  // Show "No Videos" if no grade is found in session or no videos are available for the grade
  if (!grade || videos.length === 0) {
    return <div>No Videos available for this class.</div>;
  }

  const handlePlayClick = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };


 
  


  

   
  
    const handleBookmark = async (video) => {
      const isBookmarked = bookmarkedVideos[video.id];
    
      try {
        if (isBookmarked) {
          // If already bookmarked, send a request to remove it
          const response = await axios.post(
            "https://learnospherebackend.learnosphere.in/api/route/removevideoBookmark",
            {
              userId,
              videoId: video.id,
            }
          );
    
          if (response.status === 200) {
            setBookmarkedVideos((prev) => ({
              ...prev,
              [video.id]: false, // Mark as unbookmarked
            }));
            alert("Bookmark removed successfully!");
          }
        } else {
          // If not bookmarked, send a request to add it
          const response = await axios.post(
            "https://learnospherebackend.learnosphere.in/api/route/videobookMark",
            {
              grade,
              videoId: video.id,
              userId,
              title: video.title,
              topic: video.topic,
              selectedSubject: video.subject,
              video_url: video.video_url
            }
          );
    
          if (response.status === 200) {
            setBookmarkedVideos((prev) => ({
              ...prev,
              [video.id]: true, // Mark as bookmarked
            }));
            alert("Bookmark added successfully! 🎉");
          }
        }
      } catch (error) {
        console.error("Error handling bookmark:", error);
      }
    };





  return (

    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="h-screen">
        <div className="flex flex-col-reverse md:flex-row gap-4">
        <div className="w-full md:w-[80%]">
        {videos.map((video) => (
          <div
            key={video.id}
            className="p-6 rounded-lg mx-1 md:mx-8 bg-gray-50 flex flex-col md:flex-row mt-8"
          >
            <div className="relative mt-3 md:mt-0">
              <div
                className="w-full md:w-60 h-full md:h-40 bg-gray-200 rounded-md flex items-center justify-center"
                onClick={() => handlePlayClick(video.video_url)}
              >
                <p className="text-gray-900 font-semibold">
                  Learn<span className="font-bold text-orange-600">O</span>sphere.in
                </p>
              </div>
            </div>
            <div className="mt-3 mx-4">
              <p className="text-gray-600 font-semibold">{video.subject}</p>
              <span className="flex gap-4 mt-2 mx-0 md:mx-3">
                <p className="font-bold">{video.title}</p>
              </span>
              <p className="mx-1 md:mx-5 mt-4 font-semibold text-gray-800">{video.category}</p>
              <p className="mx-1 md:mx-5 mt-1 text-gray-700">{video.description}</p>
              <span className="mx-1 md:mx-5 mt-4 flex gap-4">
                <button
                  onClick={() => handlePlayClick(video.video_url)}
                  className="p-2 w-20 bg-blue-300 font-semibold rounded-lg"
                >
                  Play
                </button>
                <button
                  onClick={() => handleShareClick(video.video_url)}
                  className="flex items-center gap-1 p-2 w-20 bg-gray-100 font-semibold rounded-lg"
                >
                  <IoShareSocialOutline size={20} /> Share
                </button>
                {/* Bookmark Button */}
                <button onClick={() => handleBookmark(video)}>
                                         {bookmarkedVideos[video.id] ? (
                                           <BsBookmarkFill size={22} className="text-blue-500" />
                                         ) : (
                                           <BsBookmark size={22} className="text-gray-500" />
                                         )}
                                       </button>
              
              </span>
            </div>
          </div>
        ))}
      </div>

          {selectedVideo && (
            <VideoModal videoUrl={selectedVideo} onClose={handleCloseModal} />
          )}
        </div>

        {/* Share Popup */}
        {isPopupVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div
              data-aos="slide-down"
              className="relative bg-white p-6 rounded-lg w-64"
            >
              <button
                onClick={handleClosePopup}
                className="absolute top-2 right-2"
              >
                <IoCloseOutline size={24} />
              </button>
              <h2 className="text-lg font-bold mb-4">Share</h2>
              <div className="mb-4">
                <p>Share this video:</p>
                <a
                  href={selectedVideoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {selectedVideoUrl}
                </a>
              </div>
              <div className="flex justify-around">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    selectedVideoUrl
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook size={30} className="text-blue-600" />
                </a>
                <a
                  href={`https://www.instagram.com/?url=${encodeURIComponent(
                    selectedVideoUrl
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram size={30} className="text-pink-500" />
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    selectedVideoUrl
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp size={30} className="text-green-500" />
                </a>
              </div>
            </div>

          </div>
        )}
      </div>
      <DashboardFooter />
    </>
  );
};

export default Conceptvideo;
