"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { FaRegFilePdf } from "react-icons/fa";
import Image from "next/image";
import Picture from "@/public/rewind-svgrepo-com (1).svg";

const NotesContent = () => {
  const searchParams = useSearchParams();
  const selectedSubject = searchParams.get("selectedSubject") || "Physics";

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${WEB_BACKEND_URL}/api/notes`);
        
        let notesData = [];
        if (response.data) {
          if (Array.isArray(response.data)) {
            notesData = response.data;
          } else if (Array.isArray(response.data.data)) {
            notesData = response.data.data;
          } else if (Array.isArray(response.data.notes)) {
            notesData = response.data.notes;
          }
        }
        setNotes(notesData);
      } catch (err) {
        console.error("Error fetching notes:", err);
        setError("Failed to load notes. Please try again later.");
        setNotes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const handleView = async (item) => {
    let pdfUrl = item.url;
    
    // Fetch latest watermarked PDF from MySQL via API if not hardcoded
    if (!pdfUrl) {
      try {
        const chapterId = item.chapter_id || item.title || 'default';
        const res = await axios.get(`${WEB_BACKEND_URL}/api/pdfs/${selectedSubject}/${chapterId}`);
        if (res.data.success) {
          pdfUrl = res.data.data.s3_url;
        }
      } catch (err) {
        console.error("Error fetching PDF URL:", err);
        alert("Failed to fetch the PDF for this chapter.");
        return;
      }
    }

    if (!pdfUrl) return;
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

  const handleGoBack = () => {
    window.history.back();
  };

  const filteredNotes = notes.filter((note) => {
    if (!selectedSubject) return true;
    const subject = selectedSubject.toLowerCase();
    
    // Exact subject match if defined in DB
    if (note.subject) {
      return note.subject.toLowerCase() === subject;
    }
    
    // Fallback: If no subject in DB, and selected subject is Physics, show it
    if (subject === "physics") {
      return true;
    }
    
    // Fallback text match
    const titleMatch = note.title?.toLowerCase().includes(subject);
    const urlMatch = note.url?.toLowerCase().includes(subject);
    return titleMatch || urlMatch;
  });

  return (
    <div className="p-6 font-poppins relative min-h-screen">
      <div onClick={handleGoBack} className="absolute top-28 cursor-pointer z-10">
        <Image
          height={80}
          width={80}
          src={Picture}
          alt="Back Picture"
          className="relative h-10 w-10"
        />
      </div>
      <h1 className="text-2xl font-bold text-center mb-8 mt-4">
        Notes for {selectedSubject}
      </h1>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-center text-gray-600">Loading notes...</p>
          <div className="mt-4 w-12 h-12 border-4 border-gray-300 rounded-full animate-spin border-t-orange-600"></div>
        </div>
      ) : error ? (
        <p className="text-center text-red-500 font-semibold">{error}</p>
      ) : filteredNotes.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 px-4 gap-6 sm:px-10 mt-8">
          {filteredNotes.map((item, index) => (
            <li
              onClick={() => handleView(item)}
              key={item.id || index}
              className="rounded-lg text-gray-900 justify-between border border-gray-300 p-4 font-semibold flex items-center gap-2 cursor-pointer hover:border-orange-500 hover:shadow-md transition-all duration-200"
            >
              <span className="truncate">{item.title || "No Title Available"}</span>
              <div className="flex items-center">
                <button className="text-orange-600 hover:text-orange-700">
                  <FaRegFilePdf size={24} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 font-semibold mt-12">No notes available for this subject.</p>
      )}
    </div>
  );
};

const Page = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <NotesContent />
  </Suspense>
);

export default Page;
