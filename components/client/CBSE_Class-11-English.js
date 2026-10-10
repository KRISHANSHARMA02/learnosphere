"use client";
import React, { useEffect, useState } from "react";
import Footer1 from "@/components/Footer1";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ImBook } from "react-icons/im";
import { FaBook } from "react-icons/fa";
import DownloadFormModal from "@/components/DownloadFormModal";
import { MdDownload } from "react-icons/md";
export default function English11th() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState("");
  const [hasDownloaded, setHasDownloaded] = useState(false); // Track if a PDF has been downloaded

  useEffect(() => {
    // Check session storage to see if the form has been filled
    const hasFilledForm = sessionStorage.getItem("hasFilledForm") === "true";
    setHasDownloaded(hasFilledForm);
  }, []);

  const handleDownloadClick = async (pdfUrl) => {
    setSelectedPdf(pdfUrl);
    if (!hasDownloaded) {
      setIsModalOpen(true);
    } else {
      await downloadPdf(pdfUrl); // Download directly
    }
  };

  const downloadPdf = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = url.split("/").pop();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const handleFormSubmit = (formData) => {
    setIsModalOpen(false);
    setHasDownloaded(true); // Update state

    // Set session storage to indicate form has been filled
    sessionStorage.setItem("hasFilledForm", "true");

    // Trigger PDF download
    downloadPdf(selectedPdf);
  };

  return (
    <div>
      <Navbar />
      <div className="p-0 md:p-12  flex flex-col font-Poppins justify-center mt-12">
        <div className="">
          <h1 className="p-4  text-2xl md:text-4xl mt-10 font-bold bg-black text-orange-500 shadow-orange-900 shadow-2xl  w-full md:w-[55%] rounded-lg text-center m-auto">
            CBSE Class 11 English Syllabus{" "}
          </h1>
        </div>
        <div className="flex flex-col md:flex-row pt-2">
          <div className=" w-full  text-center pt-6">
            <p className="p-4">
              The CBSE Class 11 English syllabus focuses on developing students'
              language skills and literary appreciation. It includes studying
              prose, poetry, and drama from Indian and international authors,
              enhancing comprehension and critical thinking. The curriculum also
              emphasizes advanced grammar, vocabulary, and writing skills, with
              practice in various forms of composition. Speaking and listening
              exercises are integrated to improve communication abilities.
              Overall, the syllabus aims to provide a solid foundation in
              English, fostering both academic and practical language
              proficiency.
            </p>
            <p className=" p-2">
              The CBSE Class 11 English curriculum is designed to foster
              advanced language skills, critical thinking, and a deep
              appreciation for literature. It comprises two main components:
              English Core and English Elective. The English Core syllabus
              emphasizes the development of comprehensive language abilities,
              including reading, writing, speaking, and listening. Students
              engage with a diverse range of literary texts, including prose,
              poetry, and drama, from Indian and global authors, fostering an
              understanding of different cultures, perspectives, and literary
              styles. The curriculum includes detailed studies of specific
              texts, encouraging close reading and critical analysis. In
              addition to literature, students focus on advanced grammar and
              vocabulary to enhance their linguistic proficiency. Writing skills
              are honed through various forms of composition, such as essays,
              reports, articles, and creative writing, enabling students to
              express their ideas coherently and effectively. The syllabus also
              emphasizes the development of listening and speaking skills,
              preparing students for oral communication in various contexts. The
              English Elective syllabus offers an expanded exploration of
              literary works, with a focus on diverse genres and periods,
              fostering a deeper literary appreciation and critical
              interpretation skills. Overall, the Class 11 English curriculum
              aims to cultivate a strong command of the English language, along
              with a nuanced understanding of literary expressions, preparing
              students for academic and real-world communication challenges.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <p className="font-extrabold border-2 border-orange-500 p-4 mt-14 rounded-lg text-center   w-full md:w-[60%] m-auto  text-2xl   bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent  from-orange-500 to-red-600  ">
            A Comprehensive Guide for Class 11th English{" "}
          </p>
          <div className="flex flex-wrap gap-8 mb-10 md:mb-0 px-7 md:px-20">
            <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} />
                Woven Words
              </p>
              <p className="font-bold  ml-6">[Short Stories]</p>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 English/Part-1/The Lament.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span> The
                Lament
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 English/Part-1/A Pair of Mustachios.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>A
                Pair of Mustachios
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 English/Part-1/The Rocking-horse Winner.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>The
                Rocking-horse Winner
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 English/Part-1/The Adventure of the Three Garridebs.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>The
                Adventure of the Three Garridebs
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 English/Part-1/Pappachi’s Moth.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>{" "}
                Pappachi’s Moth
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 English/Part-1/The Third and Final Continent.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span> The
                Third and Final Continent
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 English/Part-1/Glory at Twilight.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span>Glory
                at Twilight
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 English/Part-1/The Luncheon.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 8 :</span>The
                Luncheon
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>

              <p className="font-bold  ml-6">[Poetry]</p>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 English/Part-1/The Peacock.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>The
                Peacock
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 English/Part-1/Let Me Not to the Marriage of True Minds.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>Let
                Me Not to the Marriage of True Minds
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 English/Part-1/Coming.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>
                Coming
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 English/Part-1/Telephone Conversation.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4:</span>
                Telephone Conversation
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 English/Part-1/The World is too Much With Us.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>The
                World is too Much With Us
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 English/Part-1/Mother Tounge.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span>
                Mother Tounge
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 English/Part-1/Hawk Roosting.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span>Hawk
                Roosting
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 English/Part-1/For Elkana.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 8 :</span>For
                Elkana
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 English/Part-1/Refugee Blues.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 9 :</span>
                Refugee Blues
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 English/Part-1/Felling of the Banyan Tree.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 10 :</span>
                Felling of the Banyan Tree
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 English/Part-1/Ode to a Nightingale.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 11 :</span>Ode
                to a Nightingale
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 English/Part-1/Ajamil and the Tigers.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 12 :</span>{" "}
                Ajamil and the Tigers
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>

              <p className="font-bold  ml-6">[Essay]</p>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 English/Part-1/My Watch.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span> My
                Watch
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 English/Part-1/My Three Passions.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span> My
                Three Passions
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 English/Part-1/Patterns of Creativity.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>
                Patterns of Creativity
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 English/Part-1/Tribal Verse.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>
                Tribal Verse
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 English/Part-1/What is a Good Book.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5:</span>What
                is a Good Book?
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 English/Part-1/The Story.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span>The
                Story
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 English/Part-1/Bridges.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span>{" "}
                Bridges
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
            </div>

            <ol className="list-disc flex flex-col gap-4 text-[.9em] w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} />
                Hornbill
              </p>
              <p className="font-bold  ml-6">[Prose]</p>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 English/Part-2/The Portrait of a Lady And A Photograph.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span> The
                Portrait of a Lady
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 English/Part-2/We’re Not Afraid to Die…if We Can All Be Together.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>We’re
                Not Afraid to Die…if We Can All Be Together
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 English/Part-2/Discovering Tut the Saga Continue And Lubrnum Top And The Voice of the Rain.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>{" "}
                Discovering Tut: the Saga Continues
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 English/Part-2/The Ailing Planet the Green Movement’s Role And Childhood.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>The
                Ailing Planet: the Green Movement’s Role
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 English/Part-2/The Adventure.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span> The
                Adventure
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 English/Part-2/Silk Road And Father to Son.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span>Silk
                Road
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>

              <p className="font-bold  ml-6">[Poem]</p>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 English/Part-2/The Portrait of a Lady And A Photograph.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>A
                Photograph
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 English/Part-2/Discovering Tut the Saga Continue And Lubrnum Top And The Voice of the Rain.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>
                Lubrnum Top
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 English/Part-2/Discovering Tut the Saga Continue And Lubrnum Top And The Voice of the Rain.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>The
                Voice of the Rain
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 English/Part-2/The Ailing Planet the Green Movement’s Role And Childhood.pdf.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>
                Childhood
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 English/Part-2/Silk Road And Father to Son.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span>{" "}
                Father to Son
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>

              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} />
                Snapshots
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 English/Part-3/The Summer of the Beautiful White Horse.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span> The
                Summer of the Beautiful White Horse
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 English/Part-3/The Address.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>The
                Address
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 English/Part-3/Mother’s Day.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>
                Mother’s Day
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 English/Part-3/Birth.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>Birth
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 English/Part-3/The Tale of Melon City.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>The
                Tale of Melon City
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>

              <p className="ml-6 font-bold">Modals</p>
              <li className="ml-14 ">
                Auxiliary verbs such as can, could, may, might, shall, should,
                will, would, must, ought to, used to, need, dare.
              </li>
              <p className="ml-6 font-bold">Active and Passive Voice</p>
              <li className="ml-14 ">
                Transformation of sentences from active to passive voice and
                vice versa.
              </li>
              <p className="ml-6 font-bold">Direct and Indirect Speech</p>
              <li className="ml-14 ">
                Converting sentences from direct to indirect speech and vice
                versa, focusing on reporting verbs, pronouns, and tense changes.
              </li>
              <p className="ml-6 font-bold">Reordering of Sentences</p>
              <li className="ml-14 ">
                Rearranging jumbled sentences into a coherent, meaningful
                sequence.
              </li>
              <p className="ml-6 font-bold">Transformation of Sentences</p>
              <li className="ml-14 ">
                Conversion of sentences using different grammatical forms, such
                as converting affirmative sentences to negative, exclamatory to
                assertive, and vice versa.
              </li>
            </ol>
          </div>
        </div>
      </div>
      <Footer1 />
      <Footer />
      <DownloadFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
