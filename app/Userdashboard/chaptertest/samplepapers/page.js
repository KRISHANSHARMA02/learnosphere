"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AOS from "aos";
import Image from "next/image";
import picture from "@/public/WhatsApp Image 2024-10-24 at 17.14.53.jpeg";
import Link from "next/link";
import { IoArrowBackCircleOutline } from "react-icons/io5";


import Picture from '@/public/rewind-svgrepo-com (1).svg'
import Head from "next/head";

import pdf from '@/public/pdf-svgrepo-com.svg'

import DashboardFooterStudent from '@/components/DashboardFooterStudent'
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";


const Pdfdata2 = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const [grade, setGrade] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSamplePapers, setIsSamplePapers] = useState(false);
  const [year, setYear] = useState(false);
  const [userId, setUserId] = useState(null);
  const [bookmarkedFiles, setBookmarkedFiles] = useState({});

  useEffect(() => {
    // Initialize AOS
    AOS.init({ duration: 600 });
  }, []);

  useEffect(() => {
    const fetchGrade = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const response = await axios.post(
            "https://learnospherebackend.learnosphere.in/api/route/getStudentByEmail",
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
  
  const handleGoBack = () => {
    window.history.back();
  };

  useEffect(() => {
    const fetchFiles = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const samplepapers = queryParams.get("samplepapers");
      const year = queryParams.get("year");

      // If samplepapers query parameter is present, fetch sample papers data
      if (samplepapers && year) {
        setIsSamplePapers(true);
        setYear(true);
        setLoading(true);
        try {
          const response = await axios.get(
            `https://learnospherebackend.learnosphere.in/api/route/getsamplepapers?grade=${grade}&samplepapers=${samplepapers}&year=${year}`
          );
          setFiles(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        // Handle normal file fetching logic (topic/title-based)
        if (grade) {
          const selectedSubject = queryParams.get("selectedSubject");
          if (selectedSubject) {
            setLoading(true);
            try {
              const response = await axios.get(
                `https://learnospherebackend.learnosphere.in/api/route/getstudentdata?grade=${grade}&selectedSubject=${selectedSubject}`
              );
              setFiles(response.data);
            } catch (error) {
              console.error("Error fetching data:", error);
            } finally {
              setLoading(false);
            }
          }
        }
      }
    };

    if (status === "authenticated" && grade) {
      fetchFiles();
    }
  }, [grade, status]);

   useEffect(() => {
        const fetchBookmarkedFiles = async () => {
          try {
            const response = await axios.post("https://learnospherebackend.learnosphere.in/api/route/getBookmark", {
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
              "https://learnospherebackend.learnosphere.in/api/route/removeBookmark",
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
              alert("Bookmark removed successfully!");
            }
          } else {
            // If not bookmarked, send a request to add it
            const response = await axios.post(
              "https://learnospherebackend.learnosphere.in/api/route/bookmark",
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
              alert("Bookmark added successfully! 🎉");
            }
          }
        } catch (error) {
          console.error("Error handling bookmark:", error);
        }
      };

  const handleView = (pdfUrl) => {
    const newWindow = window.open();
    newWindow.document.write(`
      <html>
      <head><title>PDF Viewer</title></head>
      <body style = "margin:0,padding:0,overflow:hidden;">
      <iframe src = "${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0" width = "100%" height = "100%" style="border:none;"></iframe>
      </body>
      </html>
      `)
  };
  const searchedFiles = files.filter((file) =>
    file.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  {
    /* Display only sample papers if in sample papers section */
  }
  {
    isSamplePapers && searchedFiles.length > 0 && (
      <div className="w-full mt-4">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-orange-600 font-bold text-white">
            <tr>
              <th className="border px-4 py-2 text-left">Subject</th>
              {searchedFiles.some((file) => file.term) && (
                <th className="border px-4 py-2 text-left">Term</th>
              )}
              <th className="border px-4 py-2 text-left">
                Sample Queston Paper
              </th>
              <th className="border px-4 py-2 text-left">Title</th>
            </tr>
          </thead>
          <tbody>
            {searchedFiles.map((file) => (
              <tr key={file.id}>
                <td className="border text-black  px-4 py-2">
                  {file.selectedSubject}
                </td>
                {file.term && (
                  <td className="border text-black  px-4 py-2">{file.term}</td>
                )}
                <td
                  onClick={() => handleView(file.pdfUrl)}
                  className="border text-orange-500 cursor-pointer px-4 py-2"
                >
                  {file.samplepapers}
                </td>
                <td className="border text-black px-4 py-2">{file.title}</td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPdfUrl(null);
  };

  // Filter files based on search term

  return (
    <div>

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
    <div className="flex gap-4  justify-center items-center flex-wrap mt-20 cursor-pointer">

    <Head>
    <meta name="robots" content="noindex, nofollow" />
  </Head>
  
  
     

      {loading && <p>Loading...</p>}

      {/* Display only sample papers if in sample papers section */}
      {isSamplePapers && searchedFiles.length > 0 && (
        <div className="w-full mt-4">
          <table className="w-full table-auto  text-center border-collapse">
            <thead className="bg-orange-600 font-bold  text-white">
              <tr>
                <th className="border px-4 py-2 ">Subject</th>
                {searchedFiles.some((file) => file.term) && (
                  <th className="border px-4 py-2 text-left">Term</th>
                )}
                <th className="border px-4 py-2 ">
                  Sample Queston Paper
                </th>
                <th className="border px-4 py-2 ">
                  Actions
                </th>
                <th className="border px-4 py-2 ">
                  Bookmark
                </th>
             
              </tr>
            </thead>
            <tbody className="">
              {searchedFiles.map((file) => (
                <tr key={file.id}>
                  <td className="border text-black px-4 py-2">
                    {file.title}
                  </td>
                  {file.term && (
                    <td className="border text-black px-4 py-2">{file.term}</td>
                  )}
                  <td
                  
                    className="border  cursor-pointer px-4 py-2"
                  >
                    {file.samplepapers}
                  </td>
                  <td
                    onClick={() => handleView(file.pdfUrl)}
                    className="border  text-black cursor-pointer px-4 py-2"
                    
                  >
                 <Image className="h-8   w-8 animate-bounce" src={pdf} alt=""/>
                  </td>
                  <td className="border text-black px-4 py-2"><button onClick={() => handleBookmark(file)}>
                  {bookmarkedFiles[file.id] ? (
                    <BsBookmarkFill size={22} className="text-blue-500" />
                  ) : (
                    <BsBookmark size={22} className="text-gray-500" />
                  )}
                </button></td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      

      {/* Modal for PDF Viewing */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-4 w-[85%] h-screen overflow-auto">
            <button onClick={closeModal} className="text-red-500">
              Close
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

export default Pdfdata2;
