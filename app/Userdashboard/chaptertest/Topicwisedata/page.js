"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Import useRouter
import AOS from "aos";
import Image from "next/image";
import picture from "@/public/WhatsApp Image 2024-10-24 at 17.14.53.jpeg";
import Head from "next/head";



const Pdfdata4 = () => {
  const { data: session, status } = useSession();
  const router = useRouter(); // Initialize useRouter
  const [files, setFiles] = useState([]);
  const [grade, setGrade] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState(null); // State for selected PDF URL
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

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
      if (grade) {
        // Ensure grade is available
        const queryParams = new URLSearchParams(window.location.search);
        const topic = queryParams.get("topic"); // Get the subject parameter
        const selectedSubject = queryParams.get("selectedSubject"); // Get the subject parameter
        // Get the subject parameter

        if (topic) {
          // Ensure subject is available
          setLoading(true);
          try {
            const response = await axios.get(
              `${WEB_BACKEND_URL}/api/route/getstudentdataTopicwise?grade=${grade}&topic=${topic}&selectedSubject=${selectedSubject}`
            );
            setFiles(response.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          } finally {
            setLoading(false);
          }
        }
      }
    };

    if (status === "authenticated" && grade) {
      fetchFiles();
    }
  }, [grade, status]);

  const handleView = (pdfUrl) => {
    setSelectedPdfUrl(pdfUrl); // Set the URL for the selected PDF
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedPdfUrl(null); // Reset the selected PDF URL
  };

  return (
    <div className="flex gap-4 p-8 pt-4 flex-wrap">
    <Head>
    <meta name="robots" content="noindex, nofollow" />
  </Head>
      {loading && <p>Loading...</p>}

      {files.length > 0 ? (
        files.map((file) => (
          <div
            key={file.id}
            className="bg-gray-200 rounded-lg p-3 w-full md:w-[20vw] flex flex-wrap"
          >
            <div className="w-full">
              <Image className="h-40 w-full rounded-md" src={picture} alt="" />
            </div>
            <div className="flex flex-col w-full bg-white rounded-lg p-4 mt-2 gap-2">
              <p className="font-bold rounded-lg">Title: {file.title}</p>
              <p className="font-bold rounded-lg">
                Description: {file.description}
              </p>
              <p className="font-bold rounded-lg">Medium: {file.category}</p>
              <button
                className="bg-orange-500 rounded-md p-3 text-white font-bold"
                onClick={() => handleView(file.pdfUrl)}
              >
                View File
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No files available.</p>
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
                height="600px"
                title="PDF Viewer"
                className="border-none"
              />
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default Pdfdata4;
