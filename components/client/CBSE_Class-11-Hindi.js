"use client";
import Footer1 from "@/components/Footer1";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaBook, FaChevronDown, FaChevronUp, FaGraduationCap } from "react-icons/fa";
import { useEffect, useState } from "react";
import DownloadFormModal from "@/components/DownloadFormModal";
import { MdDownload } from "react-icons/md";
import Link from "next/link";

export default function Hindi11th() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState("");
  const [hasDownloaded, setHasDownloaded] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const hasFilledForm = sessionStorage.getItem("hasFilledForm") === "true";
    setHasDownloaded(hasFilledForm);
  }, []);

  const handleDownloadClick = async (pdfUrl) => {
    setSelectedPdf(pdfUrl);
    if (!hasDownloaded) {
      setIsModalOpen(true);
    } else {
      await downloadPdf(pdfUrl);
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
    setHasDownloaded(true);
    sessionStorage.setItem("hasFilledForm", "true");
    downloadPdf(selectedPdf);
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const arohProseChapters = [
    { num: 1, title: "नमक का दारोगा", url: "https://learnosphere.in/public_pdf/Class-11 Hindi/Part-1/नमक का दारोगा.pdf" },
    { num: 2, title: "मियाँ नसीरुद्दीन", url: "https://learnosphere.in/public_pdf/Class-11 Hindi/Part-1/मियाँ नसीरुद्दीन.pdf" },
    { num: 3, title: "अपू के साथ ढाई साल", url: "https://learnosphere.in/public_pdf/Class-11 Hindi/Part-1/अपू के साथ ढाई साल.pdf" },
    { num: 4, title: "विदाई-संभाषण", url: "https://learnosphere.in/public_pdf/Class-11 Hindi/Part-1/विदाई-संभाषण.pdf" },
    { num: 5, title: "गलता लोहा", url: "https://learnosphere.in/public_pdf/Class-11 Hindi/Part-1/गलता लोहा.pdf" },
    { num: 6, title: "रजनी", url: "https://learnosphere.in/public_pdf/Class-11 Hindi/Part-1/रजनी.pdf" },
    { num: 7, title: "जामुन का पेड़", url: "https://learnosphere.in/public_pdf/Class-11 Hindi/Part-1/जामुन का पेड़.pdf" },
    { num: 8, title: "भारत माता", url: "https://learnosphere.in/public_pdf/Class-11 Hindi/Part-1/भारत माता.pdf" }
  ];

  const arohPoetryChapters = [
    { num: 9, title: "हम तौ एक एक करि जांनां, संतों देखत जग बौराना", url: "https://learnosphere.in/public_pdf/Class-11 Hindi/Part-1/हम तौ एक एक करि जांनां, संतों देखत जग बौराना.pdf" },
    { num: 10, title: "मेरे तो गिरधर गोपाल दूसरो न कोई, पग घुँघरू बाधि मीरां नाची", url: "https://learnosphere.in/public_pdf/Class-11 Hindi/Part-1/मेरे तो गिरधर गोपाल दूसरो न कोई, पग घुँघरू बाधि मीरां नाची.pdf" },
    { num: 11, title: "घर की याद", url: "https://learnosphere.in/public_pdf/Class-11 Hindi/Part-1/घर की याद.pdf" },
    { num: 12, title: "चंपा काले-काले अच्छर नहीं चीन्हती", url: "https://learnosphere.in/public_pdf/Class-11 Hindi/Part-1/चंपा काले-काले अच्छर नहीं चीन्हती.pdf" },
    { num: 13, title: "गजल", url: "https://learnosphere.in/public_pdf/Class-11 Hindi/Part-1/गजल.pdf" },
    { num: 14, title: "हे भूख! मत मचल, हे मेरे जूही के फूल जैसे ईश्वर", url: "https://learnosphere.in/public_pdf/Class-11 Hindi/Part-1/हे भूख! मत मचल, हे मेरे जूही के फूल जैसे ईश्वर.pdf" },
    { num: 15, title: "सबसे खतरनाक", url: "https://learnosphere.in/public_pdf/Class-11 Hindi/Part-1/सबसे खतरनाक.pdf" },
    { num: 16, title: "आओ, मिलकर बचाएँ", url: "https://learnosphere.in/public_pdf/Class-11 Hindi/Part-1/आओ, मिलकर बचाएँ.pdf" }
  ];

  const vitanChapters = [
    { num: 1, title: "भारतीय गायिकाओं में बेजोड़ : लता मंगेशकर", url: "https://learnosphere.in/public_pdf/Class-11 Hindi/Part-3/भारतीय गायिकाओं में बेजोड़  लता मंगेशकर.pdf" },
    { num: 2, title: "राजस्थान की रजत बूँदें", url: "https://learnosphere.in/public_pdf/Class-11 Hindi/Part-3/राजस्थान की रजत बूँदें.pdf" },
    { num: 3, title: "आलो-आँधारि", url: "https://learnosphere.in/public_pdf/Class-11 Hindi/Part-3/आलो-आँधारि.pdf" },
    { num: 4, title: "भारतीय कलाएँ", url: "https://learnosphere.in/public_pdf/Class-11 Hindi/Part-3/भारतीय कलाएँ.pdf" },
    { num: 5, title: "लेखकों के बारे में", url: "https://learnosphere.in/public_pdf/Class-11 Hindi/Part-3/लेखकों के बारे में.pdf" }
  ];

  const faqs = [
    {
      q: "1. What is the subject code for CBSE Class 11 Hindi Core?",
      a: "The CBSE subject code for Class 11 Hindi Core is 302. Hindi Elective has a separate subject code, 002."
    },
    {
      q: "2. Which books are prescribed for Class 11 Hindi Core?",
      a: "The prescribed NCERT books are Aroh Part 1, Vitan Part 1 and Abhivyakti Aur Madhyam."
    },
    {
      q: "3. How many marks is the Class 11 Hindi Core examination?",
      a: "The annual written examination carries 80 marks. Listening and speaking carry 10 marks, and project work carries 10 marks, making the total assessment 100 marks."
    },
    {
      q: "4. How long is the Class 11 Hindi Core written examination?",
      a: "The annual written examination is three hours long."
    },
    {
      q: "5. What are the main sections of the Hindi Core question paper?",
      a: "The written examination includes unseen comprehension, Abhivyakti Aur Madhyam, and questions based on Aroh Part 1 and Vitan Part 1."
    },
    {
      q: "6. Is Hindi Core the same as Hindi Elective?",
      a: "No. Hindi Core and Hindi Elective are separate CBSE courses with different subject codes, prescribed books and syllabuses. Students should prepare according to the course selected by their school."
    },
    {
      q: "7. Does Class 11 Hindi Core include internal assessment?",
      a: "Yes. The assessment includes listening and speaking for 10 marks and project work for 10 marks, in addition to the 80-mark annual written examination."
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      
      <main className="p-4 md:p-12 font-Poppins max-w-6xl mx-auto mt-12">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="p-4 text-2xl md:text-4xl mt-10 font-bold bg-black text-orange-500 shadow-orange-900 shadow-2xl w-full md:w-[70%] rounded-lg text-center mx-auto">
            CBSE Class 11 Hindi Core Syllabus
          </h1>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-6">
            CBSE Class 11 Hindi Core Syllabus: Books, Exam Pattern and Assessment
          </h2>
        </div>

        {/* Introduction */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8 space-y-4 text-gray-700 leading-relaxed">
          <p>
            The CBSE Class 11 Hindi Core syllabus helps students develop their reading, writing, comprehension and literary understanding. It includes unseen passages, creative writing, prescribed Hindi literature and practical language skills.
          </p>
          <p>
            Hindi Core is offered under subject code 302. Students should check that they have selected Hindi Core rather than Hindi Elective, which is a separate CBSE course with a different subject code.
          </p>
        </div>

        {/* Syllabus at a Glance Table */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8">
          <h3 className="text-xl font-bold text-slate-800 mb-4 border-l-4 border-orange-500 pl-3">
            CBSE Class 11 Hindi Core: Syllabus at a Glance
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
              <thead>
                <tr className="bg-orange-600 text-white font-bold text-sm">
                  <th className="border border-orange-700 py-3 px-4 text-left w-1/3">Detail</th>
                  <th className="border border-orange-700 py-3 px-4 text-left">Information</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-800">
                <tr className="bg-white"><td className="border border-gray-300 py-2.5 px-4 font-semibold">Class</td><td className="border border-gray-300 py-2.5 px-4">11</td></tr>
                <tr className="bg-gray-50"><td className="border border-gray-300 py-2.5 px-4 font-semibold">Board</td><td className="border border-gray-300 py-2.5 px-4">Central Board of Secondary Education (CBSE)</td></tr>
                <tr className="bg-white"><td className="border border-gray-300 py-2.5 px-4 font-semibold">Subject</td><td className="border border-gray-300 py-2.5 px-4">Hindi Core (Hindi Aadhar)</td></tr>
                <tr className="bg-gray-50"><td className="border border-gray-300 py-2.5 px-4 font-semibold">Subject code</td><td className="border border-gray-300 py-2.5 px-4">302</td></tr>
                <tr className="bg-white"><td className="border border-gray-300 py-2.5 px-4 font-semibold">Annual examination</td><td className="border border-gray-300 py-2.5 px-4">80 marks</td></tr>
                <tr className="bg-gray-50"><td className="border border-gray-300 py-2.5 px-4 font-semibold">Listening and speaking assessment</td><td className="border border-gray-300 py-2.5 px-4">10 marks</td></tr>
                <tr className="bg-white"><td className="border border-gray-300 py-2.5 px-4 font-semibold">Project work</td><td className="border border-gray-300 py-2.5 px-4">10 marks</td></tr>
                <tr className="bg-gray-50"><td className="border border-gray-300 py-2.5 px-4 font-semibold">Total assessment</td><td className="border border-gray-300 py-2.5 px-4 font-bold text-orange-600">100 marks</td></tr>
                <tr className="bg-white"><td className="border border-gray-300 py-2.5 px-4 font-semibold">Annual examination duration</td><td className="border border-gray-300 py-2.5 px-4">3 hours</td></tr>
                <tr className="bg-gray-50"><td className="border border-gray-300 py-2.5 px-4 font-semibold">Prescribed books</td><td className="border border-gray-300 py-2.5 px-4">Aroh Part 1, Vitan Part 1 and Abhivyakti Aur Madhyam</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 italic mt-3 bg-gray-50 p-2.5 rounded border border-gray-200">
            The syllabus and examination structure should always be checked against the official CBSE curriculum for the relevant academic session.
          </p>
        </div>

        {/* Prescribed NCERT Books */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8">
          <h3 className="text-xl font-bold text-slate-800 mb-2 border-l-4 border-orange-500 pl-3">
            Prescribed NCERT Books for Class 11 Hindi Core
          </h3>
          <p className="text-gray-700 mb-4 text-sm">
            CBSE prescribes three NCERT books for Hindi Core.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
              <thead>
                <tr className="bg-orange-600 text-white font-bold text-sm">
                  <th className="border border-orange-700 py-3 px-4 text-left w-1/3">Book</th>
                  <th className="border border-orange-700 py-3 px-4 text-left">What students study</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-800">
                <tr className="bg-white">
                  <td className="border border-gray-300 py-2.5 px-4 font-semibold text-orange-700">Aroh Part 1</td>
                  <td className="border border-gray-300 py-2.5 px-4">Prescribed Hindi poetry and prose</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 py-2.5 px-4 font-semibold text-orange-700">Vitan Part 1</td>
                  <td className="border border-gray-300 py-2.5 px-4">Selected supplementary literary texts</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 py-2.5 px-4 font-semibold text-orange-700">Abhivyakti Aur Madhyam</td>
                  <td className="border border-gray-300 py-2.5 px-4">Writing, communication and media-related topics</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 italic mt-3 bg-amber-50 border-l-4 border-amber-400 p-2.5 rounded-r">
            Students should use the prescribed editions and follow the chapters included in the applicable CBSE syllabus. Not every chapter printed in an older textbook edition is necessarily included in the examination syllabus.
          </p>
        </div>

        {/* Chapter-wise Chapter PDF Links Section */}
        <div className="mb-10">
          <p className="font-extrabold border-2 border-orange-500 p-4 mb-8 rounded-lg text-center w-full md:w-[70%] mx-auto text-xl md:text-2xl bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            A Comprehensive Guide for Class 11th Hindi Core
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Aroh Part 1 Card */}
            <div className="bg-white p-6 border-2 border-gray-200 rounded-xl shadow-lg flex flex-col gap-4">
              <div className="flex items-center gap-2 border-b border-gray-200 pb-3">
                <FaBook className="text-orange-500" size={22} />
                <h4 className="font-bold text-slate-800 text-lg">Aroh Part 1</h4>
              </div>

              {/* Prose Section */}
              <div className="mb-2">
                <p className="font-bold text-orange-600 text-sm mb-2 bg-orange-50 px-3 py-1.5 rounded inline-block">
                  [गद्य – खंड]
                </p>
                <div className="space-y-1.5">
                  {arohProseChapters.map((ch) => (
                    <a
                      key={ch.num}
                      onClick={() => handleDownloadClick(ch.url)}
                      className="text-sm flex items-center justify-between p-2 rounded hover:bg-orange-50 hover:text-orange-600 cursor-pointer transition border-b border-gray-100 last:border-0"
                    >
                      <span>
                        <span className="font-bold text-slate-700">Chapter - {ch.num} : </span>
                        {ch.title}
                      </span>
                      <MdDownload className="text-orange-600 hover:scale-110 transition shrink-0 ml-2" size={20} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Poetry Section */}
              <div>
                <p className="font-bold text-orange-600 text-sm mb-2 bg-orange-50 px-3 py-1.5 rounded inline-block">
                  [काव्य – खंड]
                </p>
                <div className="space-y-1.5">
                  {arohPoetryChapters.map((ch) => (
                    <a
                      key={ch.num}
                      onClick={() => handleDownloadClick(ch.url)}
                      className="text-sm flex items-center justify-between p-2 rounded hover:bg-orange-50 hover:text-orange-600 cursor-pointer transition border-b border-gray-100 last:border-0"
                    >
                      <span className="pr-2">
                        <span className="font-bold text-slate-700">Chapter - {ch.num} : </span>
                        {ch.title}
                      </span>
                      <MdDownload className="text-orange-600 hover:scale-110 transition shrink-0 ml-2" size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Vitan Part 1 & Grammar Card */}
            <div className="bg-white p-6 border-2 border-gray-200 rounded-xl shadow-lg flex flex-col gap-4">
              <div className="flex items-center gap-2 border-b border-gray-200 pb-3">
                <FaBook className="text-orange-500" size={22} />
                <h4 className="font-bold text-slate-800 text-lg">Vitan Part 1 (पूरक पाठ्यपुस्तक)</h4>
              </div>

              <div className="space-y-1.5">
                {vitanChapters.map((ch) => (
                  <a
                    key={ch.num}
                    onClick={() => handleDownloadClick(ch.url)}
                    className="text-sm flex items-center justify-between p-2 rounded hover:bg-orange-50 hover:text-orange-600 cursor-pointer transition border-b border-gray-100 last:border-0"
                  >
                    <span>
                      <span className="font-bold text-slate-700">Chapter - {ch.num} : </span>
                      {ch.title}
                    </span>
                    <MdDownload className="text-orange-600 hover:scale-110 transition shrink-0 ml-2" size={20} />
                  </a>
                ))}
              </div>

              {/* Additional Study Notes */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h5 className="font-bold text-slate-800 text-base mb-2 flex items-center gap-2">
                  <FaGraduationCap className="text-orange-500" />
                  <span>अभिव्यक्ति और माध्यम (Key Highlights)</span>
                </h5>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  Under the prescribed syllabus, chapters 1, 2, 9, 10, 14, 15 and 16 cover creative writing, formal correspondence, mass media, and journalism fundamentals.
                </p>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-xs text-orange-900">
                  <span className="font-bold block mb-1">Examination Tip:</span>
                  Practice writing within specified word limits and focus on formal structures for letters and creative composition.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sections of Class 11 Hindi Core Syllabus */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8">
          <h3 className="text-xl font-bold text-slate-800 mb-2 border-l-4 border-orange-500 pl-3">
            Sections of the Class 11 Hindi Core Syllabus
          </h3>
          <p className="text-gray-700 mb-6 text-sm">
            The annual question paper is divided into three sections.
          </p>

          <div className="space-y-6">
            {/* Section 1 */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <h4 className="text-base font-bold text-slate-800 mb-2 flex items-center justify-between">
                <span>1. Unseen Comprehension (अपठित बोध)</span>
                <span className="bg-orange-600 text-white text-xs px-2.5 py-1 rounded-full font-semibold">18 Marks</span>
              </h4>
              <p className="text-sm text-gray-700 mb-3">
                This section tests the ability to understand and interpret unseen Hindi passages.
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-700">
                <li>Unseen prose passage of approximately 250 words.</li>
                <li>Unseen poetry passage of approximately 100 words.</li>
                <li>Multiple-choice questions.</li>
                <li>Very short-answer questions.</li>
                <li>Short-answer questions based on comprehension, interpretation and analysis.</li>
              </ul>
            </div>

            {/* Section 2 */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <h4 className="text-base font-bold text-slate-800 mb-2 flex items-center justify-between">
                <span>2. Abhivyakti Aur Madhyam (अभिव्यक्ति और माध्यम)</span>
                <span className="bg-orange-600 text-white text-xs px-2.5 py-1 rounded-full font-semibold">22 Marks</span>
              </h4>
              <p className="text-sm text-gray-700 mb-3">
                This section assesses students' understanding of communication, writing and media-related topics from the prescribed textbook.
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-700 mb-3">
                <li>Creative writing based on a given topic.</li>
                <li>Formal letter writing.</li>
                <li>Questions based on the prescribed chapters of Abhivyakti Aur Madhyam.</li>
              </ul>
              <p className="text-xs text-gray-600 italic bg-amber-50 border-l-4 border-amber-400 p-2.5 rounded-r">
                For the applicable CBSE syllabus, the prescribed chapter numbers are 1, 2, 9, 10, 14, 15 and 16. Students should check the official document for the exact prescribed content.
              </p>
            </div>

            {/* Section 3 */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
              <h4 className="text-base font-bold text-slate-800 mb-2 flex items-center justify-between">
                <span>3. Prescribed Literature (पाठ्यपुस्तकें: आरोह व वितान)</span>
                <span className="bg-orange-600 text-white text-xs px-2.5 py-1 rounded-full font-semibold">40 Marks</span>
              </h4>
              <p className="text-sm text-gray-700 mb-3">
                This section is based on Aroh Part 1 and Vitan Part 1. It assesses students' understanding of poetry, prose and supplementary literature through:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-700 mb-3">
                <li>Questions based on unseen extracts from prescribed textbook passages.</li>
                <li>Multiple-choice questions.</li>
                <li>Short-answer questions.</li>
                <li>Questions requiring interpretation and explanation.</li>
                <li>Questions based on Vitan Part 1.</li>
              </ul>
              <p className="text-xs text-gray-600 italic bg-amber-50 border-l-4 border-amber-400 p-2.5 rounded-r">
                Students should prepare the prescribed texts, their central ideas, literary features and important themes rather than relying only on memorised answers.
              </p>
            </div>
          </div>
        </div>

        {/* Assessment Pattern */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8">
          <h3 className="text-xl font-bold text-slate-800 mb-2 border-l-4 border-orange-500 pl-3">
            Class 11 Hindi Core Assessment Pattern
          </h3>
          <p className="text-gray-700 mb-4 text-sm">
            The complete assessment carries 100 marks.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
              <thead>
                <tr className="bg-orange-600 text-white font-bold text-sm">
                  <th className="border border-orange-700 py-3 px-4 text-left">Assessment component</th>
                  <th className="border border-orange-700 py-3 px-4 text-center w-1/4">Marks</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-800">
                <tr className="bg-white"><td className="border border-gray-300 py-2.5 px-4 font-medium">Unseen comprehension</td><td className="border border-gray-300 py-2.5 px-4 text-center font-bold">18</td></tr>
                <tr className="bg-gray-50"><td className="border border-gray-300 py-2.5 px-4 font-medium">Abhivyakti Aur Madhyam</td><td className="border border-gray-300 py-2.5 px-4 text-center font-bold">22</td></tr>
                <tr className="bg-white"><td className="border border-gray-300 py-2.5 px-4 font-medium">Aroh Part 1 and Vitan Part 1</td><td className="border border-gray-300 py-2.5 px-4 text-center font-bold">40</td></tr>
                <tr className="bg-gray-50"><td className="border border-gray-300 py-2.5 px-4 font-medium">Listening and speaking</td><td className="border border-gray-300 py-2.5 px-4 text-center font-bold">10</td></tr>
                <tr className="bg-white"><td className="border border-gray-300 py-2.5 px-4 font-medium">Project work</td><td className="border border-gray-300 py-2.5 px-4 text-center font-bold">10</td></tr>
                <tr className="bg-orange-50"><td className="border border-gray-300 py-3 px-4 font-bold text-slate-900">Total</td><td className="border border-gray-300 py-3 px-4 text-center font-extrabold text-orange-600 text-base">100</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            The annual written examination carries 80 marks and lasts three hours. Listening and speaking carry 10 marks, while project work carries another 10 marks.
          </p>
        </div>

        {/* Listening and Speaking & Project Work Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h4 className="text-lg font-bold text-slate-800 mb-2 border-l-4 border-orange-500 pl-3">
              Listening and Speaking Assessment (श्रवण व वाचन)
            </h4>
            <p className="text-sm text-gray-700 mb-3">
              Students are assessed on their ability to listen, understand and communicate in Hindi. Activities may include:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
              <li>Listening to a passage or audio recording and answering questions.</li>
              <li>Speaking on a given topic.</li>
              <li>Narrating a story or describing an event.</li>
              <li>Giving an introduction.</li>
              <li>Reciting poetry or participating in a conversation.</li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h4 className="text-lg font-bold text-slate-800 mb-2 border-l-4 border-orange-500 pl-3">
              Project Work (परियोजना कार्य)
            </h4>
            <p className="text-sm text-gray-700 mb-3">
              Project work carries 10 marks. It evaluates the student's subject understanding, language and presentation, research and originality.
            </p>
            <p className="text-sm text-gray-700">
              Students may work on topics connected with Hindi language, literature, writers, contemporary writing, communication or the social relevance of literature.
            </p>
          </div>
        </div>

        {/* Hindi Core vs Hindi Elective Comparison Table */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8">
          <h3 className="text-xl font-bold text-slate-800 mb-2 border-l-4 border-orange-500 pl-3">
            Hindi Core vs Hindi Elective in Class 11
          </h3>
          <p className="text-gray-700 mb-4 text-sm">
            CBSE offers two different Hindi courses at the senior secondary level.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
              <thead>
                <tr className="bg-orange-600 text-white font-bold text-sm">
                  <th className="border border-orange-700 py-3 px-4 text-left w-1/4">Feature</th>
                  <th className="border border-orange-700 py-3 px-4 text-left">Hindi Core</th>
                  <th className="border border-orange-700 py-3 px-4 text-left">Hindi Elective</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-800">
                <tr className="bg-white">
                  <td className="border border-gray-300 py-2.5 px-4 font-semibold">Subject code</td>
                  <td className="border border-gray-300 py-2.5 px-4 font-bold text-orange-600">302</td>
                  <td className="border border-gray-300 py-2.5 px-4 font-bold text-slate-700">002</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 py-2.5 px-4 font-semibold">Course focus</td>
                  <td className="border border-gray-300 py-2.5 px-4">Language proficiency and literature</td>
                  <td className="border border-gray-300 py-2.5 px-4">More specialised literary study</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 py-2.5 px-4 font-semibold">Prescribed books</td>
                  <td className="border border-gray-300 py-2.5 px-4">Aroh Part 1, Vitan Part 1 and Abhivyakti Aur Madhyam</td>
                  <td className="border border-gray-300 py-2.5 px-4">Antra Part 1 and Antral Part 1</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 py-2.5 px-4 font-semibold">Curriculum</td>
                  <td className="border border-gray-300 py-2.5 px-4">Separate CBSE syllabus</td>
                  <td className="border border-gray-300 py-2.5 px-4">Separate CBSE syllabus</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 italic mt-3 bg-gray-50 p-2.5 rounded border border-gray-200">
            Students should confirm their subject code with their school before preparing. The two courses should not be treated as interchangeable.
          </p>
        </div>

        {/* How to Prepare */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8">
          <h3 className="text-xl font-bold text-slate-800 mb-2 border-l-4 border-orange-500 pl-3">
            How to Prepare for the Class 11 Hindi Core Examination
          </h3>
          <p className="text-gray-700 mb-4 text-sm">
            A structured preparation plan can help students cover the syllabus without leaving important sections until the end.
          </p>
          <div className="space-y-3">
            {[
              { num: 1, title: "Understand the syllabus", desc: "Check the prescribed chapters and examination sections before starting revision." },
              { num: 2, title: "Read the textbooks", desc: "Study Aroh Part 1 and Vitan Part 1 carefully. Focus on the meaning, themes and important details of each prescribed text." },
              { num: 3, title: "Practise comprehension", desc: "Solve unseen prose and poetry passages to improve reading and interpretation." },
              { num: 4, title: "Improve writing skills", desc: "Practise creative writing and formal letter writing according to the prescribed format." },
              { num: 5, title: "Revise communication topics", desc: "Study the specified chapters of Abhivyakti Aur Madhyam." },
              { num: 6, title: "Prepare for internal assessment", desc: "Complete the project work and practise listening and speaking activities." },
              { num: 7, title: "Solve practice questions", desc: "Use sample papers and timed exercises to understand the question format and manage examination time." }
            ].map((tip) => (
              <div key={tip.num} className="flex items-start gap-3 bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm">
                <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-700 font-bold flex items-center justify-center shrink-0 text-xs">
                  {tip.num}
                </span>
                <span className="text-gray-800">
                  <strong className="text-slate-900">{tip.title}: </strong>
                  {tip.desc}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Cross-Subject Promotional Callout */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl p-6 shadow-md mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-lg font-bold mb-1">Preparing for other subjects too?</h4>
            <p className="text-sm text-orange-100">
              Explore the complete Class 11 CBSE syllabus for chapter-wise breakdowns across Science, Commerce, and Humanities.
            </p>
          </div>
          <Link
            href="/CBSE-11thsyllabus"
            className="px-5 py-2.5 bg-white text-orange-600 hover:bg-orange-50 font-bold text-sm rounded-lg shadow transition whitespace-nowrap"
          >
            Explore All Subjects
          </Link>
        </div>

        {/* Frequently Asked Questions */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-12">
          <h3 className="text-xl font-bold text-slate-800 mb-4 pb-2 border-b border-gray-200">
            Frequently Asked Questions
          </h3>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden transition">
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center p-4 text-left font-semibold text-slate-800 bg-gray-50 hover:bg-orange-50 hover:text-orange-600 transition"
                >
                  <span className="text-sm sm:text-base">{faq.q}</span>
                  <span className="text-orange-600 font-bold text-lg ml-2">
                    {openFaq === index ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
                  </span>
                </button>
                {openFaq === index && (
                  <div className="p-4 bg-white text-gray-700 text-sm border-t border-gray-200 leading-relaxed">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

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
