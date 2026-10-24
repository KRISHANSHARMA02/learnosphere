"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AOS from "aos";
import Image from "next/image";
import picture from "@/public/WhatsApp Image 2024-10-24 at 17.14.53.jpeg";
import Link from "next/link";
import Head from "next/head";




const Pdfdata3 = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const [grade, setGrade] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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
        const queryParams = new URLSearchParams(window.location.search);
        const selectedSubject = queryParams.get("selectedSubject");

        if (selectedSubject) {
          setLoading(true);
          try {
            const response = await axios.get(
              `${WEB_BACKEND_URL}/api/route/getstudentdata?grade=${grade}&selectedSubject=${selectedSubject}`
            );
            // Exclude files with sample papers (assuming there's a field like 'isSamplePaper')
            const filteredFiles = response.data.filter(
              (file) => !file.isSamplePaper
            );
            setFiles(filteredFiles);
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
    setSelectedPdfUrl(pdfUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPdfUrl(null);
  };

  // Separate files based on whether they have a topic
  const filesWithTopic = files.filter((file) => file.topic);
  const filesWithoutTopic = files.filter((file) => !file.topic);

  // Filter files based on search term
  const searchedFilesWithTopic = filesWithTopic.filter((file) =>
    file.topic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const searchedFilesWithoutTopic = filesWithoutTopic.filter((file) =>
    file.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
    <div className="flex gap-4 p-8 pt-4 h-screen flex-wrap">
    <Head>
    <meta name="robots" content="noindex, nofollow" />
  </Head>
      <div className="w-full flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search By Topic or Title"
          className="border rounded-lg p-2 w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {loading && <p>Loading...</p>}

      {searchedFilesWithTopic.length > 0 && (
        <div className="w-full flex flex-wrap gap-4 mt-8">
          {/* Create a set to track displayed topics */}
          {Array.from(
            new Set(searchedFilesWithTopic.map((file) => file.topic))
          ).map((topic) => {
            // Filter files for the current unique topic
            const filesForTopic = searchedFilesWithTopic.filter(
              (file) => file.topic === topic
            );
            const firstFile = filesForTopic[0]; // Get the first file for the topic to display details

            return (
              <div
                key={topic}
                className="bg-gray-200 rounded-lg p-3 w-full md:w-[20vw] flex flex-wrap"
              >
                <div className="w-full">
                  <Image
                    className="h-40 w-full rounded-md"
                    src={picture}
                    alt=""
                  />
                </div>
                <div className="flex flex-col w-full bg-white rounded-lg p-1 md:p-4 mt-2 gap-2">
                  <p className="font-bold text-[.8em] md:text-[1em] rounded-lg">
                    Topic: {firstFile.topic}
                  </p>
                  <Link
                    className="transition-all ease-in-out duration-150 hover:scale-110"
                    href={`./Topicwisedata?topic=${firstFile.topic}&selectedSubject=${firstFile.selectedSubject}`}
                  >
                    <button className="bg-orange-500 w-full rounded-md p-3 text-white font-bold">
                      View File
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {searchedFilesWithoutTopic.length > 0 && (
        <div className="w-full flex flex-wrap gap-4 mt-8">
          {searchedFilesWithoutTopic.map((file) => (
            <div
              key={file.id}
              className="bg-gray-200 rounded-lg p-1 md:p-3 w-full md:w-[20vw] flex flex-wrap"
            >
              <div className="w-full">
                <Image
                  className="h-40 w-full rounded-md"
                  src={picture}
                  alt=""
                />
              </div>
              <div className="flex flex-col w-full bg-white rounded-lg p-4 mt-2 gap-2">
                <p className="font-bold text-[.8em] md:text-[1em] rounded-lg">
                  Title: {file.title}
                </p>
                <button
                  onClick={() => handleView(file.pdfUrl)}
                  className="bg-orange-500 rounded-md p-3 text-white font-bold"
                >
                  View File
                </button>
              </div>
            </div>
          ))}
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

    </div>
  );
};

export default Pdfdata3;
