"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import AOS from "aos";
import Image from "next/image";
import picture from "@/public/WhatsApp Image 2024-10-24 at 17.14.53.jpeg";
import Link from "next/link";
import { RxCross2 } from "react-icons/rx";


import Picture from '@/public/rewind-svgrepo-com (1).svg'
import Head from "next/head";

import DashboardFooterStudent from '@/components/DashboardFooterStudent'
import { set } from "date-fns";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";


const Pdfdata = () => {
  const [expandedRows, setExpandedRows] = useState({});
  const { data: session, status } = useSession();
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const [grade, setGrade] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isChapter, setIsChapter] = useState(false);
  const [badgeColor, setBadgeColor] = useState("");
  const [level, setLevel] = useState("");
 
  const [userId, setUserId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
   const [bookmarkedFiles, setBookmarkedFiles] = useState({});

   const searchParams = useSearchParams();
  const books = searchParams.get("books");
  const [showBooks, setShowBooks] = useState(false);

  useEffect(() => {
    if (books) {
      setShowBooks(true);
    }
  }, [books]);



  // Ensure files are available before grouping them
  const groupedFiles = (files || []).reduce((acc, file) => {
    const key = `${file.chapter}-${file.topic}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(file);
    return acc;
  }, {});

  const handleToggleExpand = (key) => {
    setExpandedRows((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  useEffect(() => {
    // Initialize AOS
    AOS.init({ duration: 600 });
  }, []);

  useEffect(() => {
    const fetchGrade = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const response = await axios.post(
            `${WEB_BACKEND_URL}/api/route/getStudentByEmail`,
            { gmail: session.user.email }
          );
          const { grade } = response.data;
          setUserId(response.data.registrationNumber);
          if (grade) {
            setGrade(grade);
          } else {
            console.error("Grade not found in profile data.");
          }
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      }
    };

    fetchGrade();
  }, [session, status]);

  useEffect(() => {
    const fetchFiles = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const selectedSubject = queryParams.get("selectedSubject");
      const level = queryParams.get("level");
      const books = queryParams.get("books");

      setLoading(true); // Start loading when initiating the request

      if (selectedSubject && level && grade) {
        // If chapter and selectedSubject are available in the query
        setIsChapter(true);
        setLevel(level);
        switch (level) {
          case "hard":
            setBadgeColor("bg-yellow-500");
            break;
          case "medium":
            setBadgeColor("bg-blue-500");
            break;
          case "easy":
            setBadgeColor("bg-green-500");
            break;
          default:
            setBadgeColor("");
        }

        try {
          const response = await axios.get(
            `${WEB_BACKEND_URL}/api/route/getchapterwise?grade=${grade}&selectedSubject=${selectedSubject}&level=${level}&books=${books}`
          );
          setFiles(response.data);
        } catch (error) {
          console.error("Error fetching chapter data:", error);
        }
      } else {
        console.log("Missing chapter or selectedSubject.");
      }

      setLoading(false); // Stop loading after the request is completed
    };

    if (status === "authenticated" && grade) {
      fetchFiles();
    }
  }, [grade, status]); // Dependencies: grade and status

  const handleView = async (pdfUrl, resourceId) => {
    
    setSelectedFile(resourceId);

    const newWindow = window.open();
    newWindow.document.write(`
      <html>
      <head><title>PDF Viewer</title></head>
      <body style = "margin:0,padding:0,overflow:hidden;">
      <iframe src = "${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0" width = "100%" height = "100%" style="border:none;"></iframe>
      </body>
      </html>
      `)
 

    try {
      const response = await axios.post(
        `${WEB_BACKEND_URL}/api/route/start-learning-activity`,
        {
          userId: userId,
          grade: grade,
          resourceId,
          activityType: "pdf",
        }
      );

      if (response.status === 201) {
        
      }
    } catch (error) {
      
    }
  };



   useEffect(() => {
      const fetchBookmarkedFiles = async () => {
        try {
          const response = await axios.post(`${WEB_BACKEND_URL}/api/route/getBookmark`, {
            userId,
            grade:grade
          });
    
          if (response.status === 200) {
            const bookmarks = response.data.message; // Array of bookmarked files
    
            const bookmarkedMap = {};
            bookmarks.forEach((file) => {
              bookmarkedMap[file.fileId] = true;
            });
    
            setBookmarkedFiles(bookmarkedMap); // Set bookmarks in state
          }
        } catch (error) {
          console.error("Error fetching bookmarked files:", error);
        }
      };
    
      fetchBookmarkedFiles();
    }, [userId,grade]);
  
  
    const handleBookmark = async (file) => {
      const isBookmarked = bookmarkedFiles[file.id];
    
      try {
        if (isBookmarked) {
          // If already bookmarked, send a request to remove it
          const response = await axios.post(
            `${WEB_BACKEND_URL}/api/route/removeBookmark`,
            {
              userId,
              fileId: file.id,
            }
          );
    
          if (response.status === 200) {
            setBookmarkedFiles((prev) => ({
              ...prev,
              [file.id]: false, // Mark as unbookmarked
            }));
            alert("Bookmark removed successfully! 🎉");
          }
        } else {
          // If not bookmarked, send a request to add it
          const response = await axios.post(
            `${WEB_BACKEND_URL}/api/route/bookmark`,
            {
              grade,
              fileId: file.id,
              userId,
              title: file.title,
              topic: file.topic,
              selectedSubject: file.selectedSubject,
              pdf: file.pdf,
              pdfUrl: file.pdfUrl,
            }
          );
    
          if (response.status === 200) {
            setBookmarkedFiles((prev) => ({
              ...prev,
              [file.id]: true, // Mark as bookmarked
            }));
            alert("Bookmark added successfully!");
          }
        }
      } catch (error) {
        console.error("Error handling bookmark:", error);
      }
    };
    
    

  const closeModal = () => {
    // Prepare data to send to the backend
    const dataToSend = {
      userId: userId, // Replace with actual user ID
      resourceId: selectedFile,
      grade: grade,
      pausedAt: new Date(), // Capture the pause time if the activity was paused
    };

    // Send data to update the learning activity
    axios
      .post(`${WEB_BACKEND_URL}/api/route/update-learning-activity`, dataToSend)
      .then((response) => {
        setIsModalOpen(false);
        setSelectedPdfUrl(null);
        setSelectedFile(null);
      })
      .catch((error) => {
        setIsModalOpen(false);
        setSelectedPdfUrl(null);
        setSelectedFile(null);
      });
};


  // Filter files based on search term
  const searchedFiles = files.filter((file) =>
    file.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="">
    

<Head>
    <meta name="robots" content="noindex, nofollow" />
  </Head>
  <div
  onClick={handleGoBack}
  className="absolute top-28 cursor-pointer"
>
  <Image
    height={80}
    width={80}
    src={Picture}
    alt="Back Picture"
    className="relative h-10 w-10"
  />
</div>
  
  
    <div className="flex gap-4 p-2 md:p-4 pt-4 justify-center items-center flex-wrap mt-2">

      {loading && <p>Loading...</p>}
      <div className="text-center">
      {badgeColor && (
        <div className={`p-2 rounded-full text-white font-bold ${badgeColor}`}>
        {level.charAt(0).toUpperCase() + level.slice(1)} Level
        </div>
        )}
        
        <div className="p-4">
      {showBooks && (
        <div className="p-2 bg-orange-100 text-orange-600 rounded-lg  ">
          <p className="text-lg font-semibold"> {books}</p>
        </div>
      )}
    </div>
        </div>

      
  
      

      {/* Display only sample papers if in sample papers section */}
      {isChapter && searchedFiles.length > 0 && (
        <div className="w-full mt-4 ">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-orange-600 font-bold text-white">
              <tr>
                <th className="border px-4 py-2 text-left"> Chapter No.</th>
                <th className="border px-4 py-2 text-left"> Chapter Name</th>
                <th className="border px-4 py-2 text-left">Action</th>
               
              </tr>
            </thead>
            <tbody>
              {Object.entries(groupedFiles).map(([key, files]) => {
                const [chapter, topic] = key.split("-");
                const isExpanded = expandedRows[key];

                return (
                  <tr key={key}>
                    <td className="border text-black px-4 py-2">
                      Chapter-{chapter}
                    </td>
                    <td className="border text-black px-4 py-2">{topic}</td>
                    <td className="border text-black px-4 py-2">
                      {!isExpanded && (
                        <button
                          onClick={() => handleToggleExpand(key)}
                          className="text-gray-500 underline"
                        >
                          View More
                        </button>
                      )}

                      {isExpanded && (
                        <ul>
                          {files.map((file, index) => (  // ✅ Ensure file is available here
                            <li key={index} className="mb-1 flex justify-between items-center">
                              <button
                                onClick={() => handleView(file.pdfUrl, file.id)}
                                className="text-orange-600 underline"
                              >
                                PDF {index + 1}
                              </button>
                      
                              {/* ✅ Bookmark button */}
                              <button onClick={() => handleBookmark(file)}>
                                {bookmarkedFiles[file.id] ? (
                                  <BsBookmarkFill size={22} className="text-blue-500" />
                                ) : (
                                  <BsBookmark size={22} className="text-gray-500" />
                                )}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                      </td>
                      
                  
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    

      {/* Modal for PDF Viewing */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-4 w-full h-screen overflow-auto">
            <button onClick={closeModal} className="text-red-500">
              <RxCross2 size={20} />
            </button>
            {selectedPdfUrl && (
              <iframe
                src={selectedPdfUrl}
                width="100%"
                height="100%"
                title="PDF Viewer"
                className="border-none"
              />
            )}
          </div>
        </div>
      )}
    </div>
    <div className="fixed w-screen bottom-0 right-0">
    <DashboardFooterStudent />
    </div>
    </div>
  );
};

export default Pdfdata;