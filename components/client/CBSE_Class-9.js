"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Footer1 from "@/components/Footer1";
import { ImBook } from "react-icons/im";
import { FaBook } from "react-icons/fa";
import DownloadFormModal from "@/components/DownloadFormModal";
import { MdDownload } from "react-icons/md";

export default function Ninethclass() {
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
    <div className="font-Poppins">
      <Navbar />
      <div className="p-0 md:p-12  flex flex-col font-Poppins justify-center mt-12">
        <div className="">
          <h1 className=" p-4  text-2xl md:text-4xl mt-10 font-extrabold bg-black text-orange-500 shadow-orange-900 shadow-2xl  w-full md:w-[55%] rounded-lg text-center m-auto">
            Class 9th{" "}
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full  flex flex-col gap-6 mt-8   text-center  pt-6">
            <p className=" font-Poppins">
              The CBSE Class 9 curriculum offers a foundational understanding of
              core subjects, including Mathematics, Science, Social Science,
              English, and Hindi. It emphasizes critical thinking and analytical
              skills through algebra, geometry, physics, chemistry, biology,
              history, and literature. Practical learning, projects, and
              interactive activities are integral, promoting hands-on
              understanding. The syllabus also includes co-curricular
              activities, enhancing students' overall development. This
              comprehensive approach prepares students for higher academic
              challenges and fosters a well-rounded personality.
            </p>
            <p>
              {" "}
              The CBSE Class 9 curriculum encompasses a broad spectrum of
              subjects, aiming to nurture students' intellectual and creative
              faculties. In Mathematics, students delve into complex topics such
              as polynomials, coordinate geometry, and trigonometry, fostering
              problem-solving skills. Science is divided into Physics,
              Chemistry, and Biology, where students explore concepts like laws
              of motion, atomic structure, and the fundamentals of life
              processes. Social Science covers History, Geography, Political
              Science, and Economics, providing insights into historical events,
              physical geography, governance, and economic principles. The
              curriculum also includes two languages, English and Hindi,
              enhancing communication skills through grammar, literature, and
              composition. Additionally, the curriculum encourages co-curricular
              activities and life skills, promoting overall personality
              development. Practical experiments, projects, and assessments are
              integral parts of the learning process, ensuring a hands-on
              understanding of theoretical concepts. This holistic approach
              prepares students for future academic pursuits and cultivates a
              well-rounded personality.
            </p>
            <p>
              The CBSE ninth-grade curriculum is designed to support students'
              holistic development, balancing rigorous academic learning with
              the enhancement of social, emotional, and physical skills. It lays
              a solid foundation in core subjects such as Mathematics, Science,
              and Social Science, while also nurturing creativity, critical
              thinking, and practical skills. The curriculum aims to instill
              confidence and competence, preparing students for the demands of
              the 10th-grade board exams and future academic endeavors. Through
              a comprehensive approach, it equips students with the necessary
              tools to navigate the challenges of academic and personal life
              effectively.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <p className="font-extrabold border-2 border-orange-500 p-4 mt-14 rounded-lg  text-center  w-full md:w-[40%] m-auto  text-2xl   bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent  from-orange-500 to-red-600  ">
            A Comprehensive Guide for Class 9{" "}
          </p>
          <p className="font-bold text-md  shadow-2xl text-white bg-gradient-to-r from-orange-600 to-orange-500    w-[55%] md:w-[13%] p-4 rounded-tl-lg rounded-tr-lg   mt-8 border-b-2 border-orange-800">
            Class 9 English
          </p>
          <p className="text-center">
            The English curriculum emphasizes language proficiency, literature
            appreciation, and communication skills. Students study a variety of
            literary genres, including prose, poetry, and drama, from both
            Indian and international authors. The literature component enhances
            critical thinking and interpretive skills, fostering an appreciation
            for diverse literary traditions. The grammar section covers parts of
            speech, tenses, active and passive voice, direct and indirect
            speech, and more, focusing on correct language usage. Writing skills
            include narrative, descriptive, expository, and persuasive writing,
            as well as formal letter writing, reports, and articles. The
            curriculum aims to develop comprehensive reading, writing,
            listening, and speaking abilities.
          </p>
          <div className="flex flex-wrap gap-8 px-7 md:px-20">
            <div className="list-disc text-[.9em] flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-[1.1em] flex items-center gap-2  ml-6 text-slate-800 text-center  ">
                <ImBook className="text-orange-600" />
                Beehive Book
              </p>

              <p className="font-bold  ml-6">[Prose]</p>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 English/Part-1/The Fun They Had And The Road Not Taken.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>The
                Fun They Had
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 English/Part-1/The Sound of Music And Wind.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>The
                Sound of Music
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 English/Part-1/The Little Girl And Rain On The Roof.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span> The
                Little Girl
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 English/Part-1/A Truly Beautiful Mind And The Lake Isle Of Innisfree.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span> A
                Truly Beautiful Mind
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 English/Part-1/The Snake and The Mirror And A Legend Of The Northland.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span> The
                Snake and The Mirror
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 English/Part-1/My Childhood And No Men Are Foreign.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span> My
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
                    "https://learnosphere.in/public_pdf/Class-9 English/Part-1/Reach for the Top And On Killing A Tree.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span>{" "}
                Reach for the Top
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 English/Part-1/Kathmandu AndA Slumber Did My Spirit Seal.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 8 :</span>
                Kathmandu
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 English/Part-1/If I Were You.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 9 :</span>If I
                Were You
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
                    "https://learnosphere.in/public_pdf/Class-9 English/Part-1/The Fun They Had And The Road Not Taken.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>The
                Road Not Taken
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 English/Part-1/The Sound of Music And Wind.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>Wind
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 English/Part-1/The Little Girl And Rain On The Roof.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>Rain
                On The Roof
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 English/Part-1/A Truly Beautiful Mind And The Lake Isle Of Innisfree.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>The
                Lake Isle Of Innisfree{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 English/Part-1/The Snake and The Mirror And A Legend Of The Northland.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>A
                Legend Of The Northland{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 English/Part-1/My Childhood And No Men Are Foreign.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span>No
                Men Are Foreign
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 English/Part-1/Reach for the Top And On Killing A Tree.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span>On
                Killing A Tree
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 English/Part-1/Kathmandu AndA Slumber Did My Spirit Seal.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 8 :</span>A
                Slumber Did My Spirit Seal
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <p className="font-bold text-[1.1em] flex items-center gap-2  ml-6 text-slate-800 text-center  ">
                <ImBook className="text-orange-600" />
                Moments Book
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 English/Part-2/The Lost Child.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>The
                Lost Child
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 English/Part-2/The Adventure Of Toto.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span> The
                Adventure Of Toto
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 English/Part-2/Iswaran The Storyteller.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>
                Iswaran The Storyteller
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 English/Part-2/In The Kingdom Of Fools.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span> In
                The Kingdom Of Fools
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 English/Part-2/The Happy Prince.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>The
                Happy Prince
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 English/Part-2/Weathering The Storm In Ersama.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span>
                Weathering The Storm In Ersama
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 English/Part-2/The Last Leaf.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span>The
                Last Leaf
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 English/Part-2/A House Is Not A Home.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 8 :</span> A
                House Is Not A Home
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-9 English/Part-2/The Beggar.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 9 :</span> The
                Beggar
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>

              <p className="font-bold  ml-6 text-orange-500  ">
                English grammer
              </p>

              <p className="font-bold text-[1.1em] flex items-center gap-2  ml-6  text-center  ">
                Tenses
              </p>
              <li className="ml-14">
                Simple, continuous, perfect, and perfect continuous tenses
                (present, past, and future)
              </li>
            </div>

            <ol className="list-disc text-[0.9em] flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-[1.1em] flex items-center gap-2  ml-6  text-center  ">
                Modals
              </p>
              <li className="ml-14">
                Usage of modals such as can, could, may, might, shall, should,
                will, would, must, ought to, need, dare
              </li>

              <p className="font-bold text-[1.1em] flex items-center gap-2  ml-6  text-center  ">
                Subject-Verb Agreement
              </p>
              <li className="ml-14">
                Rules and applications of subject-verb agreement
              </li>

              <p className="font-bold text-[1.1em] flex items-center gap-2  ml-6  text-center  ">
                Determiners
              </p>
              <li className="ml-14">
                Articles (a, an, the), quantifiers (some, any, few, little,
                many, much), demonstratives (this, that, these, those),
                possessives (my, your, his, her, its, our, their), and
                distributives (each, every, either, neither)
              </li>

              <p className="font-bold text-[1.1em] flex items-center gap-2  ml-6  text-center  ">
                Active and Passive Voice
              </p>
              <li className="ml-14">
                Conversion of sentences from active to passive voice and vice
                versa
              </li>

              <p className="font-bold text-[1.1em] flex items-center gap-2  ml-6  text-center  ">
                Reported Speech
              </p>
              <li className="ml-14">
                Direct and indirect speech, changes in tense, pronouns, time
                expressions, and reporting verbs
              </li>

              <p className="font-bold text-[1.1em] flex items-center gap-2  ml-6  text-center  ">
                Clauses
              </p>
              <li className="ml-14">
                Types of clauses: noun, adjective, and adverbial clauses
              </li>
              <li className="ml-14">Relative clauses and relative pronouns</li>
              <p className="font-bold text-[1.1em] flex items-center gap-2  ml-6  text-center  ">
                Prepositions
              </p>
              <li className="ml-14">
                Usage of prepositions in different contexts (time, place,
                movement, etc.)
              </li>

              <p className="font-bold text-[1.1em] flex items-center gap-2  ml-6  text-center  ">
                Conjunctions
              </p>
              <li className="ml-14">
                Coordinating, subordinating, and correlative conjunctions
              </li>

              <p className="font-bold text-[1.1em] flex items-center gap-2  ml-6  text-center  ">
                Punctuation
              </p>
              <li className="ml-14">
                Correct usage of punctuation marks: full stops, commas, question
                marks, exclamation marks, apostrophes, quotation marks, colons,
                semicolons, and parentheses
              </li>

              <p className="font-bold text-[1.1em] flex items-center gap-2  ml-6  text-center  ">
                Sentences and Transformation of Sentences
              </p>
              <li className="ml-14">
                Types of sentences: declarative, interrogative, imperative,
                exclamatory
              </li>
              <li className="ml-14">
                Transformation of sentences: simple, compound, and complex
                sentences; affirmative to negative; exclamatory to assertive;
                interrogative to assertive
              </li>
            </ol>
          </div>

          <p className="font-bold text-md  shadow-2xl text-white bg-gradient-to-r from-orange-600 to-orange-500    w-[55%] md:w-[13%] p-4 rounded-tl-lg rounded-tr-lg   mt-8 border-b-2 border-orange-800">
            Class 9 Hindi
          </p>
          <p className="text-center">
            The Hindi curriculum encompasses literature, grammar, and writing
            skills, promoting linguistic and cultural understanding. The
            literature section includes classic and contemporary works, poetry,
            and drama, offering insights into Indian literary heritage. The
            grammar component covers complex topics like sentence structure,
            punctuation, syntax, and vocabulary, enhancing language accuracy.
            Writing tasks include essays, letters, reports, and creative
            compositions, developing effective written communication skills. The
            curriculum fosters a deep appreciation of Hindi literature and
            enhances language proficiency.
          </p>
          <div className="flex flex-wrap gap-8 px-7 md:px-20">
            <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} />
                Kshitij
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 Hindi/Part-1/दो बैलों की कथा.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>दो
                बैलों की कथा
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-9 Hindi/Part-1/ल्हासा की ओर.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>
                ल्हासा की ओर
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 Hindi/Part-1/उपभोक्तावाद की संस्कृति.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>
                उपभोक्तावाद की संस्कृति
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 Hindi/Part-1/साँवले सपनों की याद.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>{" "}
                साँवले सपनों की याद
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 Hindi/Part-1/प्रेमचंद के फटे जूते.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>
                प्रेमचंद के फटे जूते
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 Hindi/Part-1/मेरे बचपन के दिन.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span>मेरे
                बचपन के दिन
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 Hindi/Part-1/साखियाँ एवं सबद.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span>
                साखियाँ एवं सबद
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-9 Hindi/Part-1/वाख.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 8 :</span>वाख
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-9 Hindi/Part-1/सवैये.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 9 :</span>सवैये
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 Hindi/Part-1/कैदी और कोकिला.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 10 :</span>{" "}
                कैदी और कोकिला
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-9 Hindi/Part-1/ग्राम श्री.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 11 :</span>
                ग्राम श्री
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-9 Hindi/Part-1/मेघ आए.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 12 :</span>मेघ
                आए
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 Hindi/Part-1/बच्चे काम पर जा रहे हैं.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 13 :</span>
                बच्चे काम पर जा रहे हैं
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>

              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} />
                Sparsh
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 Hindi/Part-2/दुःख का अधिकार.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>दुःख
                का अधिकार
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 Hindi/Part-2/एवरेस्ट मेरी शिखर यात्रा.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>
                एवरेस्ट : मेरी शिखर यात्रा
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 Hindi/Part-2/तुम कब जाओगे, अतिथि.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>तुम
                कब जाओगे, अतिथि
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 Hindi/Part-2/वैज्ञानिक चेतना के वाहक चन्द्र शेखर वेंकट रामन.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>
                वैज्ञानिक चेतना के वाहक : चन्द्र शेखर वेंकट रामन
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 Hindi/Part-2/शक्र तारे के समान.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>शक्र
                तारे के समान
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 Hindi/Part-2/अब कैसे छूटे राम नाम ऐसी लाल तुझ बिनु.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span>अब
                कैसे छूटे राम नाम … ऐसी लाल तुझ बिनु …
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-9 Hindi/Part-2/दोहे.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span>दोहे
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-9 Hindi/Part-2/गीत – अगीत.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 8 :</span> गीत
                – अगीत
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-9 Hindi/Part-2/अग्नि पथ.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 9 :</span>अग्नि
                पथ
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 Hindi/Part-2/नए इलाके में खुशबू रचते हैं हाथ.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 10 :</span> नए
                इलाके में … खुशबू रचते हैं हाथ
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>

              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} />
                Kritika{" "}
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 Hindi/Part-3/इस जल प्रलय में.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span> इस
                जल प्रलय में
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 Hindi/Part-3/मेरे संग की औरतें.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>मेरे
                संग की औरतें
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-9 Hindi/Part-3/रीढ़ की हड्डी.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span> रीढ़
                की हड्डी
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} />
                Sanchayan
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-9 Hindi/Part-4/गिल्लू.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>{" "}
                गिल्लू
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-9 Hindi/Part-4/स्मृति.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>{" "}
                स्मृति
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 Hindi/Part-4/कल्लू कुम्हार की उनाकोटी.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>{" "}
                कल्लू कुम्हार की उनाकोटी
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 Hindi/Part-4/मेरा छोटा-सा निजी पुस्तकालय.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>मेरा
                छोटा-सा निजी पुस्तकालय
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <p className="ml-6 font-bold ">संज्ञा (Noun)</p>
              <li className="ml-14 ">
                प्रकार: Proper, Common, Abstract, Collective
              </li>
              <li className="ml-14 ">
                गुण: Number (Singular/Plural), Gender (Masculine/Feminine), Case
                (Subject/Object)
              </li>
              <li className="ml-14 ">
                संज्ञा की विशेषताएँ: Usage in sentences
              </li>
            </div>
            <ol className="list-disc text-[0.9em] flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="ml-6 font-bold ">सर्वनाम (Pronoun)</p>
              <li className="ml-14 ">
                प्रकार: Personal, Demonstrative, Interrogative, Relative
              </li>
              <li className="ml-14 ">
                उपयोग: Replacement of nouns, grammatical agreement
              </li>
              <p className="ml-6 font-bold "> क्रिया (Verb)</p>
              <li className="ml-14 ">प्रकार: Transitive, Intransitive</li>
              <li className="ml-14 ">काल: Present, Past, Future</li>
              <li className="ml-14 ">रूप: Conjugation in different tenses</li>
              <li className="ml-14 ">विधि: Usage in sentences</li>
              <p className="ml-6 font-bold "> विशेषण (Adjective)</p>
              <li className="ml-14 ">
                प्रकार: Descriptive, Quantitative, Demonstrative
              </li>
              <li className="ml-14 ">
                विवरण: Agreement with nouns, comparative and superlative forms
              </li>
              <p className="ml-6 font-bold "> विभक्ति (Case Endings)</p>
              <li className="ml-14 ">
                प्रकार: Subject, Object, Possessive, etc.
              </li>
              <li className="ml-14 ">उपयोग: Usage in different cases</li>
              <p className="ml-6 font-bold "> संधि (Sandhi)</p>
              <li className="ml-14 ">
                प्रकार: स्वर संधि (Vowel Sandhi), व्यंजन संधि (Consonant
                Sandhi), विसर्ग संधि (Visarga Sandhi)
              </li>
              <li className="ml-14 ">
                उदाहरण और नियम: Rules for combining sounds
              </li>
              <p className="ml-6 font-bold ">समास (Compound Words)</p>
              <li className="ml-14 ">
                द्वंद्व समास (Dvandva Samas): Examples and usage
              </li>
              <li className="ml-14 ">
                कर्मधारय समास (Karmadharay Samas): Examples and usage
              </li>
              <li className="ml-14 ">
                बहुव्रीहि समास (Bahuvrihi Samas): Examples and usage
              </li>
              <li className="ml-14 ">
                तत्पुरुष समास (Tatpurush Samas): Examples and usage
              </li>
              <p className="ml-6 font-bold "> वाक्य (Sentence)</p>
              <li className="ml-14 ">
                प्रकार: Declarative, Interrogative, Imperative, Exclamatory
              </li>
              <li className="ml-14 ">संरचना: Formation and structure</li>
              <li className="ml-14 ">
                वाक्य परिवर्तन: Transforming sentences (e.g., direct to indirect
                speech)
              </li>
              <p className="ml-6 font-bold ">
                उपसर्ग और प्रत्यय (Prefixes and Suffixes)
              </p>
              <li className="ml-14 ">
                उपसर्ग: Common prefixes and their meanings
              </li>
              <li className="ml-14 ">
                प्रत्यय: Common suffixes and their meanings
              </li>
              <li className="ml-14 ">
                विभिन्न शब्दों में प्रयोग: Formation of new words
              </li>
              <p className="ml-6 font-bold ">
                पठान सामग्री (Reading Comprehension)
              </p>
              <li className="ml-14 ">
                Strategies for understanding and interpreting texts
              </li>

              <p className="ml-6 font-bold "> लेखन कौशल (Writing Skills)</p>
              <li className="ml-14 ">
                अधिकारिक लेखन: Essay writing, letter writing, and report writing
              </li>
            </ol>
          </div>
          <p className="font-bold text-md  shadow-2xl text-white bg-gradient-to-r from-orange-600 to-orange-500   w-[60%] md:w-[17%] p-4 rounded-tl-lg rounded-tr-lg   mt-8 border-b-2 border-orange-800">
            Class 9 Mathematics
          </p>
          <p className="text-center">
            The Mathematics curriculum for CBSE Class 9 is comprehensive and
            builds a solid foundation for higher studies. It includes topics
            such as Number Systems, where students explore real numbers,
            irrational numbers, and their decimal expansions. Algebra introduces
            polynomials, factorization, and linear equations in two variables,
            developing algebraic manipulation skills. Geometry covers Euclidean
            geometry, congruence of triangles, and coordinate geometry,
            providing a basis for logical reasoning and spatial understanding.
            Students also study Trigonometry, focusing on trigonometric ratios
            and their applications, as well as Mensuration, dealing with the
            surface areas and volumes of solids. Statistics and Probability
            introduce data collection, organization, interpretation, and basic
            probability concepts.
          </p>
          <div className="flex flex-wrap gap-8 px-7 md:px-20">
            <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} />
                Mathematics
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-9 Mathematics/Number systems.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>
                Number systems{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-9 Mathematics/Polynomials.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>
                Polynomials{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 Mathematics/Coordinate Geometry.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>
                Coordinate Geometry{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 Mathematics/Linear Equations in Two Variables.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>
                Linear Equations in Two Variables{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 Mathematics/Introduction to Euclid Geometry.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>{" "}
                Introduction to Euclid Geometry{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
            </div>
            <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 Mathematics/Lines and Angles.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span>{" "}
                Lines and Angles{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-9 Mathematics/Triangles.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span>
                Triangles{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-9 Mathematics/Quadrilaterals.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 8 :</span>
                Quadrilaterals{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-9 Mathematics/Circles.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 9 :</span>
                Circles{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-9 Mathematics/Herons Formula.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 10 :</span>{" "}
                Heron’s Formula{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 Mathematics/Surface Areas and Volumes.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 11 :</span>
                Surface Areas and Volumes{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-9 Mathematics/Statistics.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 12 :</span>{" "}
                Statistics{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
            </div>
          </div>
          <p className="font-bold text-md  shadow-2xl text-white bg-gradient-to-r from-orange-600 to-orange-500    w-[80%] md:w-[13%] p-4 rounded-tl-lg rounded-tr-lg   mt-8 border-b-2 border-orange-800">
            Class 8 Science
          </p>
          <p className="text-center">
            The Science curriculum is divided into three main branches: Physics,
            Chemistry, and Biology, with a focus on conceptual understanding and
            practical applications. In Physics, students learn about motion,
            forces, laws of motion, gravitation, work, energy, and sound,
            exploring fundamental physical principles. Chemistry covers the
            structure of atoms, the periodic table, chemical bonding, and the
            classification of elements, helping students understand matter and
            its interactions. Biology focuses on the cellular basis of life,
            tissues, diversity in living organisms, and natural resources,
            providing insights into the biological world and environmental
            conservation. Practical experiments and projects are integral,
            fostering scientific inquiry and critical thinking.
          </p>
          <div className="flex flex-wrap gap-8 px-7 md:px-20">
            <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} />
                Science
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 Science/Matter in Our Surroundings.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>
                Matter in Our Surroundings{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 Science/Is Matter Around Us Pure.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span> Is
                Matter Around Us Pure
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 Science/Atoms and Molecules.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>Atoms
                and Molecules{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 Science/Structure of the Atom.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>
                Structure of the Atom{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 Science/The Fundamental Unit of Life.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>The
                Fundamental Unit of Life{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
            </div>
            <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-9 Science/Tissues.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span>
                Tissues{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-9 Science/Motion.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span>{" "}
                Motion{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 Science/Force and Laws of Motion.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 8 :</span>{" "}
                Force and Laws of Motion{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-9 Science/Gravitation.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 9 :</span>{" "}
                Gravitation{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 Science/Work, Power And Energy.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 10 :</span>
                Work, Power And Energy{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-9 Science/Sound.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 11 :</span>{" "}
                Sound{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 Science/Improvement in Food Resources.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 12 :</span>{" "}
                Improvement in Food Resources{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
            </div>
          </div>
          <p className="font-bold text-md  shadow-2xl text-white bg-gradient-to-r from-orange-600 to-orange-500   w-[80%] md:w-[17%] p-4 rounded-tl-lg rounded-tr-lg   mt-8 border-b-2 border-orange-800">
            Class 8 Social Science{" "}
          </p>
          <p className="text-center">
            Social Science comprises History, Geography, Political Science, and
            Economics, offering a broad perspective on society and the world. In
            History, students explore the French Revolution, the rise of
            nationalism, and world wars, understanding historical events and
            their impacts. Geography covers physical geography, including
            India's physical features, climate, vegetation, and natural
            resources, as well as population studies. Political Science
            introduces democratic principles, the electoral process, and the
            functioning of institutions, emphasizing the importance of
            citizenship and governance. Economics provides an introduction to
            basic economic concepts such as poverty, food security, and
            sustainable development, helping students understand economic issues
            and policies.
          </p>
          <div className="flex flex-wrap gap-8 px-7 mb-10  md:px-20">
            <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} />
                Geography – Contemporary India I
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 Sst/Part-1/India Size and Location.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>{" "}
                India Size and Location
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 Sst/Part-1/Physical Features of India.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>
                Physical Features of India
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-9 Sst/Part-1/Drainage.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>{" "}
                Drainage
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-9 Sst/Part-1/Climate.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>
                Climate
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 Sst/Part-1/Natural Vegetation and Wild Life.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>
                Natural Vegetation and Wild Life
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-9 Sst/Part-1/Population.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span>
                Population
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>

              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} />
                Economics
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 Sst/Part-2/The Story of Village Palampur.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>The
                Story of Village Palampur
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 Sst/Part-2/People as Resource.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>{" "}
                People as Resource
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 Sst/Part-2/Poverty as a Challenge.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>{" "}
                Poverty as a Challenge
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 Sst/Part-2/Food Security in India.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>Food
                Security in India
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
            </div>
            <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} />
                India and the Contemporary World - I
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 Sst/Part-3/The French Revolution.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>The
                French Revolution
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 Sst/Part-3/Socialism in Europe and the Russian Revolution.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>
                Socialism in Europe and the Russian Revolution
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 Sst/Part-3/Nazism and the Rise of Hitler.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>{" "}
                Nazism and the Rise of Hitler
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 Sst/Part-3/Forest Society and Colonialism.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>
                Forest Society and Colonialism
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 Sst/Part-3/Pastoralists in the Modern World.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>
                Pastoralists in the Modern World
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} /> Civics –
                Democratic Politics I
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 Sst/Part-4/What is Democracy Why Democracy.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span> What
                is Democracy? Why Democracy?
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 Sst/Part-4/Constitutional Design.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>
                Constitutional Design
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 Sst/Part-4/Electoral Politics.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>
                Electoral Politics
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 Sst/Part-4/Working of Institutions.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>
                Working of Institutions
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-9 Sst/Part-4/Democratic Rights.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>
                Democratic Rights
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
            </div>
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
