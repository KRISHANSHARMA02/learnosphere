"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Footer1 from "@/components/Footer1";
import { FaBook, FaChevronDown, FaChevronUp, FaGraduationCap, FaCheckCircle, FaLightbulb } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import DownloadFormModal from "@/components/DownloadFormModal";

export default function FourthClass() {
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
      link.download = url.split("/").pop().split("?")[0];
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

  // English Chapters (Marigold)
  const englishChapters = [
    { unit: "Unit-1", chNum: 1, title: "Wake Up", url: "https://learnosphere.in/public_pdf/Class-4 English/Wake Up And Neha Alarm Clock.pdf" },
    { unit: "Unit-1", chNum: 2, title: "Neha's Alarm Clock", url: "https://learnosphere.in/public_pdf/Class-4 English/Wake Up And Neha Alarm Clock.pdf" },
    { unit: "Unit-2", chNum: 3, title: "Noses", url: "https://learnosphere.in/public_pdf/Class-4 English/Noses And The Little Fir Tree.pdf" },
    { unit: "Unit-2", chNum: 4, title: "The Little Fir Tree", url: "https://learnosphere.in/public_pdf/Class-4 English/Noses And The Little Fir Tree.pdf" },
    { unit: "Unit-3", chNum: 5, title: "Run", url: "https://learnosphere.in/public_pdf/Class-4 English/Run And Nasruddin’s Aim.pdf" },
    { unit: "Unit-3", chNum: 6, title: "Nasruddin’s Aim", url: "https://learnosphere.in/public_pdf/Class-4 English/Run And Nasruddin’s Aim.pdf" },
    { unit: "Unit-4", chNum: 7, title: "Why", url: "https://learnosphere.in/public_pdf/Class-4 English/Why And Alice In Wonderland.pdf" },
    { unit: "Unit-4", chNum: 8, title: "Alice in Wonderland", url: "https://learnosphere.in/public_pdf/Class-4 English/Why And Alice In Wonderland.pdf" },
    { unit: "Unit-5", chNum: 9, title: "Don’t Be Afraid of the Dark", url: "https://learnosphere.in/public_pdf/Class-4 English/Don’t Be Afraid Of The Dark And Helen Keller.pdf" },
    { unit: "Unit-5", chNum: 10, title: "Helen Keller", url: "https://learnosphere.in/public_pdf/Class-4 English/Don’t Be Afraid Of The Dark And Helen Keller.pdf" },
    { unit: "Unit-6", chNum: 11, title: "Hiawatha", url: "https://learnosphere.in/public_pdf/Class-4 English/Hiawatha and Chapter And The Scholars Mother Tongue.pdf" },
    { unit: "Unit-6", chNum: 12, title: "The Scholar's Mother Tongue", url: "https://learnosphere.in/public_pdf/Class-4 English/Hiawatha and Chapter And The Scholars Mother Tongue.pdf" },
    { unit: "Unit-7", chNum: 13, title: "A Watering Rhyme", url: "https://learnosphere.in/public_pdf/Class-4 English/A Watering Rhyme The Giving Tree.pdf" },
    { unit: "Unit-7", chNum: 14, title: "The Giving Tree", url: "https://learnosphere.in/public_pdf/Class-4 English/A Watering Rhyme The Giving Tree.pdf" },
    { unit: "Unit-8", chNum: 15, title: "Books", url: "https://learnosphere.in/public_pdf/Class-4 English/Books And Going To Buy A Book.pdf" },
    { unit: "Unit-8", chNum: 16, title: "Going to Buy a Book", url: "https://learnosphere.in/public_pdf/Class-4 English/Books And Going To Buy A Book.pdf" },
    { unit: "Unit-9", chNum: 17, title: "The Naughty Boy", url: "https://learnosphere.in/public_pdf/Class-4 English/The Naughty Boy And Pinocchio.pdf" },
    { unit: "Unit-9", chNum: 18, title: "Pinocchio", url: "https://learnosphere.in/public_pdf/Class-4 English/The Naughty Boy And Pinocchio.pdf" },
  ];

  // Hindi Chapters (Rimjhim)
  const hindiChapters = [
    { num: 1, title: "मन के भोले -भाले बादल", url: "https://learnosphere.in/public_pdf/Class-4 Hindi/मन के भोले -भाले बादल.pdf" },
    { num: 2, title: "जैसा सवाल वैसा जवाब", url: "https://learnosphere.in/public_pdf/Class-4 Hindi/जैसा सवाल वैसा जवाब.pdf" },
    { num: 3, title: "किरमिच की गेंद", url: "https://learnosphere.in/public_pdf/Class-4 Hindi/किरमिच की गेंद.pdf" },
    { num: 4, title: "पापा जब बच्चे थे", url: "https://learnosphere.in/public_pdf/Class-4 Hindi/पापा जब बच्चे थे.pdf" },
    { num: 5, title: "दोस्त की पोशाक", url: "https://learnosphere.in/public_pdf/Class-4 Hindi/दोस्त की पोशाक.pdf" },
    { num: 6, title: "नाव बनाओ नाव बनाओ", url: "https://learnosphere.in/public_pdf/Class-4 Hindi/नाव बनाओ नाव बनाओ.pdf" },
    { num: 7, title: "दान का हिसाब", url: "https://learnosphere.in/public_pdf/Class-4 Hindi/दान का हिसाब.pdf" },
    { num: 8, title: "कौन", url: "https://learnosphere.in/public_pdf/Class-4 Hindi/कौन.pdf" },
    { num: 9, title: "स्वतंत्रता की ओर", url: "https://learnosphere.in/public_pdf/Class-4 Hindi/स्वतंत्रता की ओर.pdf" },
    { num: 10, title: "थप्प रोटी थप्प दाल", url: "https://learnosphere.in/public_pdf/Class-4 Hindi/थप्प रोटी थप्प दाल.pdf" },
    { num: 11, title: "पढ़क्कू की सूझ", url: "https://learnosphere.in/public_pdf/Class-4 Hindi/पढ़क्कू की सूझ.pdf" },
    { num: 12, title: "सुनीता की पहिया कुर्सी", url: "https://learnosphere.in/public_pdf/Class-4 Hindi/सुनीता की पहिया कुर्सी.pdf" },
    { num: 13, title: "हुदहुद", url: "https://learnosphere.in/public_pdf/Class-4 Hindi/हुदहुद.pdf" },
    { num: 14, title: "मुफ्त ही मुफ्त", url: "https://learnosphere.in/public_pdf/Class-4 Hindi/मुफ्त ही मुफ्त.pdf" },
  ];

  // Mathematics Chapters (Math-Magic)
  const mathChapters = [
    { num: 1, title: "Building With Bricks", url: "https://learnosphere.in/public_pdf/Class-4 Mathematics/Building With Bricks.pdf" },
    { num: 2, title: "Long And Short", url: "https://learnosphere.in/public_pdf/Class-4 Mathematics/Long And Short.pdf" },
    { num: 3, title: "A Trip To Bhopal", url: "https://learnosphere.in/public_pdf/Class-4 Mathematics/A Trip To Bhopal.pdf" },
    { num: 4, title: "Tick-Tick-Tick", url: "https://learnosphere.in/public_pdf/Class-4 Mathematics/Tick-Tick-Tick.pdf" },
    { num: 5, title: "The Way The World Looks", url: "https://learnosphere.in/public_pdf/Class-4 Mathematics/The Way The World Looks.pdf" },
    { num: 6, title: "The Junk Seller", url: "https://learnosphere.in/public_pdf/Class-4 Mathematics/The Junk Seller.pdf" },
    { num: 7, title: "Jugs And Mugs", url: "https://learnosphere.in/public_pdf/Class-4 Mathematics/Jugs And Mugs.pdf" },
    { num: 8, title: "Carts And Wheels", url: "https://learnosphere.in/public_pdf/Class-4 Mathematics/Carts And Wheels.pdf" },
    { num: 9, title: "Halves And Quarters", url: "https://learnosphere.in/public_pdf/Class-4 Mathematics/Halves And Quarters.pdf" },
    { num: 10, title: "Play With Patterns", url: "https://learnosphere.in/public_pdf/Class-4 Mathematics/Play With Patterns.pdf" },
    { num: 11, title: "Tables And Shares", url: "https://learnosphere.in/public_pdf/Class-4 Mathematics/Tables And Shares.pdf" },
    { num: 12, title: "How Heavy? How Light?", url: "https://learnosphere.in/public_pdf/Class-4 Mathematics/How Heavy How Light.pdf" },
    { num: 13, title: "Fields And Fences", url: "https://learnosphere.in/public_pdf/Class-4 Mathematics/Fields And Fences.pdf" },
    { num: 14, title: "Smart Charts", url: "https://learnosphere.in/public_pdf/Class-4 Mathematics/Smart Charts.pdf" },
  ];

  // EVS Chapters (Looking Around)
  const evsChapters = [
    { num: 1, title: "Going To School", url: "https://learnosphere.in/public_pdf/Class-4 Evs/Going To School.pdf" },
    { num: 2, title: "Ear To Ear", url: "https://learnosphere.in/public_pdf/Class-4 Evs/Ear To Ear.pdf" },
    { num: 3, title: "A Day With Nandu", url: "https://learnosphere.in/public_pdf/Class-4 Evs/A Day With Nandu.pdf" },
    { num: 4, title: "The Story Of Amrita", url: "https://learnosphere.in/public_pdf/Class-4 Evs/The Story Of Amrita.pdf" },
    { num: 5, title: "Anita And The Honeybees", url: "https://learnosphere.in/public_pdf/Class-4 Evs/Anita And The Honeybees.pdf" },
    { num: 6, title: "Omana’s Journey", url: "https://learnosphere.in/public_pdf/Class-4 Evs/Omana’s Journey.pdf" },
    { num: 7, title: "From The Window", url: "https://learnosphere.in/public_pdf/Class-4 Evs/From The Window.pdf" },
    { num: 8, title: "Reaching Grandmother’s House", url: "https://learnosphere.in/public_pdf/Class-4 Evs/Reaching Grandmother’s House.pdf" },
    { num: 9, title: "Changing Families", url: "https://learnosphere.in/public_pdf/Class-4 Evs/Changing Families.pdf" },
    { num: 10, title: "Hu Tu Tu, Hu Tu Tu", url: "https://learnosphere.in/public_pdf/Class-4 Evs/Hu Tu Tu, Hu Tu Tu.pdf" },
    { num: 11, title: "The Valley Of Flowers", url: "https://learnosphere.in/public_pdf/Class-4 Evs/The Valley Of Flowers.pdf" },
    { num: 12, title: "Changing Times", url: "https://learnosphere.in/public_pdf/Class-4 Evs/Changing Times.pdf" },
    { num: 13, title: "A River’s Tale", url: "https://learnosphere.in/public_pdf/Class-4 Evs/A River’s Tale.pdf" },
    { num: 14, title: "Basva’s Farm", url: "https://learnosphere.in/public_pdf/Class-4 Evs/Basva’s Farm.pdf" },
    { num: 15, title: "From Market To Home", url: "https://learnosphere.in/public_pdf/Class-4 Evs/From Market To Home.pdf" },
    { num: 16, title: "A Busy Month", url: "https://learnosphere.in/public_pdf/Class-4 Evs/A Busy Month.pdf" },
    { num: 17, title: "Nandita In Mumbai", url: "https://learnosphere.in/public_pdf/Class-4 Evs/Nandita In Mumbai.pdf" },
    { num: 18, title: "Too Much Water, Too Little Water", url: "https://learnosphere.in/public_pdf/Class-4 Evs/Too Much Water, Too Little Water.pdf" },
    { num: 19, title: "Abdul In The Garden", url: "https://learnosphere.in/public_pdf/Class-4 Evs/Abdul In The Garden.pdf" },
    { num: 20, title: "Eating Together", url: "https://learnosphere.in/public_pdf/Class-4 Evs/Eating Together.pdf" },
    { num: 21, title: "Food And Fun", url: "https://learnosphere.in/public_pdf/Class-4 Evs/Food And Fun.pdf" },
    { num: 22, title: "The World In My Home", url: "https://learnosphere.in/public_pdf/Class-4 Evs/The World In My Home.pdf" },
    { num: 23, title: "Pochampalli", url: "https://learnosphere.in/public_pdf/Class-4 Evs/Pochampalli.pdf" },
    { num: 24, title: "Home And Abroad", url: "https://learnosphere.in/public_pdf/Class-4 Evs/Home And Abroad.pdf" },
    { num: 25, title: "Spicy Riddles", url: "https://learnosphere.in/public_pdf/Class-4 Evs/Spicy Riddles.pdf" },
    { num: 26, title: "Defence Officer: Wahida", url: "https://learnosphere.in/public_pdf/Class-4 Evs/Defence Officer Wahida.pdf" },
    { num: 27, title: "Chuskit Goes To School", url: "https://learnosphere.in/public_pdf/Class-4 Evs/Chuskit Goes To School.pdf" },
  ];

  const subjects = [
    { subject: "English", focus: "Reading, comprehension, vocabulary, grammar and writing" },
    { subject: "Hindi", focus: "Reading, vocabulary, language understanding and written expression" },
    { subject: "Mathematics", focus: "Numbers, calculations, patterns, shapes, measurement and problem-solving" },
    { subject: "Environmental Studies", focus: "People, places, nature, the environment and everyday life" },
    { subject: "Arts Education", focus: "Creative expression through drawing, music and other art activities" },
    { subject: "Physical Education", focus: "Movement, games, fitness and healthy habits" },
  ];

  const ncertBooks = [
    { subject: "English", book: "Santoor" },
    { subject: "Hindi", book: "Veena" },
    { subject: "Mathematics", book: "Maths Mela" },
    { subject: "Environmental Studies", book: "Our Wondrous World" },
  ];

  const faqs = [
    {
      q: "1. What is the CBSE Class 4 syllabus?",
      a: "The CBSE Class 4 syllabus covers languages, Mathematics, Environmental Studies and other learning areas followed by the school. It develops reading, writing, calculation, reasoning and practical learning skills."
    },
    {
      q: "2. What are the main subjects in Class 4?",
      a: "The main learning areas generally include English, Hindi, Mathematics and Environmental Studies. Schools may also teach Arts, Physical Education, Computer Education and other subjects."
    },
    {
      q: "3. Which NCERT books are used in Class 4?",
      a: "The main NCERT textbooks include Santoor for English, Veena for Hindi, Maths Mela for Mathematics and Our Wondrous World for Environmental Studies."
    },
    {
      q: "4. Has the Class 4 NCERT syllabus changed?",
      a: "NCERT introduced updated competency-based textbooks for Grade 4. The new books replaced older textbooks such as Marigold, Rimjhim, Math-Magic and Looking Around."
    },
    {
      q: "5. Is the Class 4 syllabus the same in every CBSE school?",
      a: "Not necessarily. Schools may have different additional subjects, books, activities and assessment plans. Parents should check the latest syllabus issued by their child's school."
    },
    {
      q: "6. How can students practise for Class 4 subjects?",
      a: "Students can practise by revising textbook lessons, solving Mathematics problems, reading passages, completing written exercises and attempting subject-based quizzes."
    },
    {
      q: "7. Where can students take an online quiz for Class 4?",
      a: "Students can attempt the Learnosphere online quiz for Class 4 to practise and check their understanding through quiz questions."
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen font-Poppins">
      <Navbar />

      <main className="p-4 md:p-12 max-w-6xl mx-auto mt-12">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="p-4 text-2xl md:text-4xl mt-10 font-bold bg-black text-orange-500 shadow-orange-900 shadow-2xl w-full md:w-[70%] rounded-lg text-center mx-auto leading-tight">
            CBSE Class 4 Syllabus: Subjects and NCERT Books
          </h1>
        </div>

        {/* Introduction */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8 space-y-4 text-gray-700 leading-relaxed">
          <p>
            The CBSE Class 4 syllabus helps students strengthen their understanding of languages, mathematics and the world around them. At this stage, students develop reading comprehension, writing, numerical skills, logical thinking and practical understanding through classroom activities and subject-based learning.
          </p>
          <p>
            NCERT has introduced updated competency-based textbooks for Grade 4. The main NCERT textbooks include <strong className="text-slate-800">Santoor</strong> for English, <strong className="text-slate-800">Veena</strong> for Hindi, <strong className="text-slate-800">Maths Mela</strong> for Mathematics and <strong className="text-slate-800">Our Wondrous World</strong> for Environmental Studies. These replaced the older books previously listed on many Class 4 syllabus pages.
          </p>
          <p>
            The subjects and additional learning areas followed by a student may vary between schools. Parents should also check the latest book list and syllabus shared by their child's school.
          </p>
        </div>

        {/* CBSE Class 4 Subjects Table */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-2 border-l-4 border-orange-500 pl-3">
            CBSE Class 4 Subjects
          </h2>
          <p className="text-gray-700 text-sm mb-4 leading-relaxed">
            Class 4 students generally study languages, mathematics and environmental studies. Schools may also include additional learning areas such as arts, physical education, computer education and general knowledge.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
              <thead>
                <tr className="bg-orange-600 text-white font-bold text-sm">
                  <th className="border border-orange-700 py-3 px-4 text-left w-1/3">Subject</th>
                  <th className="border border-orange-700 py-3 px-4 text-left">Main learning focus</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-800">
                {subjects.map((s, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="border border-gray-300 py-2.5 px-4 font-semibold text-orange-700">{s.subject}</td>
                    <td className="border border-gray-300 py-2.5 px-4 text-gray-700">{s.focus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 italic mt-3">
            The exact subject combination, additional books and assessment pattern can differ between schools.
          </p>
        </div>

        {/* Class 4 NCERT Books Table */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-2 border-l-4 border-orange-500 pl-3">
            Class 4 NCERT Books
          </h2>
          <p className="text-gray-700 text-sm mb-4 leading-relaxed">
            NCERT has introduced new textbooks for Grade 4 as part of the curriculum changes aligned with the National Curriculum Framework for School Education.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
              <thead>
                <tr className="bg-orange-600 text-white font-bold text-sm">
                  <th className="border border-orange-700 py-3 px-4 text-left w-1/2">Subject</th>
                  <th className="border border-orange-700 py-3 px-4 text-left">NCERT textbook</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-800">
                {ncertBooks.map((b, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="border border-gray-300 py-2.5 px-4 font-semibold text-orange-700">{b.subject}</td>
                    <td className="border border-gray-300 py-2.5 px-4 font-bold text-slate-800">{b.book}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-700 mt-4 leading-relaxed">
            NCERT also provides learning resources for areas such as Arts Education and Physical Education and Well-being. Schools may use these alongside the main subject textbooks.
          </p>
          
          {/* Important Alert Callout */}
          <div className="mt-4 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg">
            <p className="text-sm text-amber-900 leading-relaxed font-medium">
              <strong>Important:</strong> Older Class 4 syllabus pages may still show Marigold, Rimjhim, Math-Magic and Looking Around. These are the previous textbook names. Students should follow the books prescribed by their school rather than relying on an outdated online chapter list.
            </p>
          </div>
        </div>

        {/* Chapter-wise Guide Section */}
        <div className="mb-10">
          <p className="font-extrabold border-2 border-orange-500 p-4 mb-8 rounded-lg text-center w-full md:w-[60%] mx-auto text-xl md:text-2xl bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            A Comprehensive Guide for Class 4
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Class 4 English Card */}
            <div className="bg-white p-6 border-2 border-gray-200 rounded-xl shadow-lg flex flex-col gap-4">
              <div className="border-b border-gray-200 pb-3">
                <div className="flex items-center gap-2">
                  <FaBook className="text-orange-500" size={22} />
                  <h3 className="font-bold text-slate-800 text-lg">Class 4 English (Santoor / Marigold)</h3>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  English learning focuses on developing reading, comprehension, vocabulary, grammar and writing with confidence.
                </p>
              </div>

              <div className="space-y-1.5 max-h-96 overflow-y-auto pr-2">
                {englishChapters.map((ch, idx) => (
                  <a
                    key={idx}
                    onClick={() => handleDownloadClick(ch.url)}
                    className="text-sm flex items-center justify-between p-2 rounded hover:bg-orange-50 hover:text-orange-600 cursor-pointer transition border-b border-gray-100 last:border-0"
                  >
                    <span>
                      <span className="font-semibold text-orange-600 text-xs mr-2">[{ch.unit}]</span>
                      <span className="font-bold text-slate-700">Ch {ch.chNum}:</span> {ch.title}
                    </span>
                    <MdDownload className="text-orange-600 hover:scale-110 transition shrink-0 ml-2" size={18} />
                  </a>
                ))}
              </div>

              <div className="mt-auto pt-3 border-t border-gray-200 text-xs text-gray-600">
                Prescribed textbook: <strong>Santoor</strong>. Refer to school lesson plans for exact editions.
              </div>
            </div>

            {/* Class 4 Hindi Card */}
            <div className="bg-white p-6 border-2 border-gray-200 rounded-xl shadow-lg flex flex-col gap-4">
              <div className="border-b border-gray-200 pb-3">
                <div className="flex items-center gap-2">
                  <FaBook className="text-orange-500" size={22} />
                  <h3 className="font-bold text-slate-800 text-lg">Class 4 Hindi (Veena / Rimjhim)</h3>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  Hindi learning develops reading, writing, vocabulary, grammar and language comprehension.
                </p>
              </div>

              <div className="space-y-1.5 max-h-96 overflow-y-auto pr-2">
                {hindiChapters.map((ch, idx) => (
                  <a
                    key={idx}
                    onClick={() => handleDownloadClick(ch.url)}
                    className="text-sm flex items-center justify-between p-2 rounded hover:bg-orange-50 hover:text-orange-600 cursor-pointer transition border-b border-gray-100 last:border-0"
                  >
                    <span>
                      <span className="font-bold text-slate-700">Chapter - {ch.num} : </span>
                      {ch.title}
                    </span>
                    <MdDownload className="text-orange-600 hover:scale-110 transition shrink-0 ml-2" size={18} />
                  </a>
                ))}
              </div>

              <div className="mt-auto pt-3 border-t border-gray-200 text-xs text-gray-600">
                Prescribed textbook: <strong>Veena</strong>. Practice reading and writing daily.
              </div>
            </div>

            {/* Class 4 Mathematics Card */}
            <div className="bg-white p-6 border-2 border-gray-200 rounded-xl shadow-lg flex flex-col gap-4">
              <div className="border-b border-gray-200 pb-3">
                <div className="flex items-center gap-2">
                  <FaBook className="text-orange-500" size={22} />
                  <h3 className="font-bold text-slate-800 text-lg">Class 4 Mathematics (Maths Mela / Math-Magic)</h3>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  Mathematics develops number sense, arithmetic calculations, geometric patterns and problem-solving.
                </p>
              </div>

              <div className="space-y-1.5 max-h-96 overflow-y-auto pr-2">
                {mathChapters.map((ch, idx) => (
                  <a
                    key={idx}
                    onClick={() => handleDownloadClick(ch.url)}
                    className="text-sm flex items-center justify-between p-2 rounded hover:bg-orange-50 hover:text-orange-600 cursor-pointer transition border-b border-gray-100 last:border-0"
                  >
                    <span>
                      <span className="font-bold text-slate-700">Chapter - {ch.num} : </span>
                      {ch.title}
                    </span>
                    <MdDownload className="text-orange-600 hover:scale-110 transition shrink-0 ml-2" size={18} />
                  </a>
                ))}
              </div>

              <div className="mt-auto pt-3 border-t border-gray-200 text-xs text-gray-600">
                Prescribed textbook: <strong>Maths Mela</strong>. Practice calculations and word problems regularly.
              </div>
            </div>

            {/* Class 4 Environmental Studies Card */}
            <div className="bg-white p-6 border-2 border-gray-200 rounded-xl shadow-lg flex flex-col gap-4">
              <div className="border-b border-gray-200 pb-3">
                <div className="flex items-center gap-2">
                  <FaBook className="text-orange-500" size={22} />
                  <h3 className="font-bold text-slate-800 text-lg">Class 4 EVS (Our Wondrous World / Looking Around)</h3>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  EVS explores nature, community life, resources, health and environmental awareness.
                </p>
              </div>

              <div className="space-y-1.5 max-h-96 overflow-y-auto pr-2">
                {evsChapters.map((ch, idx) => (
                  <a
                    key={idx}
                    onClick={() => handleDownloadClick(ch.url)}
                    className="text-sm flex items-center justify-between p-2 rounded hover:bg-orange-50 hover:text-orange-600 cursor-pointer transition border-b border-gray-100 last:border-0"
                  >
                    <span>
                      <span className="font-bold text-slate-700">Chapter - {ch.num} : </span>
                      {ch.title}
                    </span>
                    <MdDownload className="text-orange-600 hover:scale-110 transition shrink-0 ml-2" size={18} />
                  </a>
                ))}
              </div>

              <div className="mt-auto pt-3 border-t border-gray-200 text-xs text-gray-600">
                Prescribed textbook: <strong>Our Wondrous World</strong>. Connect topics with everyday surroundings.
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Subject-wise Learning Areas Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8 space-y-6">
          <h2 className="text-xl font-bold text-slate-800 border-l-4 border-orange-500 pl-3">
            Subject-Wise Detailed Syllabus & Learning Areas
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            {/* English Syllabus */}
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-slate-800 text-base mb-2 text-orange-600">Class 4 English Syllabus</h3>
              <p className="text-gray-700 mb-3">
                English learning in Class 4 focuses on developing the ability to read, understand, speak and write with greater confidence.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-600 text-xs">
                <li>Reading stories, poems and short passages</li>
                <li>Understanding the meaning of a passage</li>
                <li>Learning new words and using them in sentences</li>
                <li>Basic grammar and sentence formation</li>
                <li>Correct spelling and punctuation</li>
                <li>Writing short paragraphs and simple descriptions</li>
                <li>Listening and speaking activities</li>
              </ul>
              <p className="text-xs text-gray-500 italic mt-3">
                Prescribed NCERT textbook: <strong>Santoor</strong>.
              </p>
            </div>

            {/* Hindi Syllabus */}
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-slate-800 text-base mb-2 text-orange-600">Class 4 Hindi Syllabus</h3>
              <p className="text-gray-700 mb-3">
                Hindi learning develops reading, writing, vocabulary and language comprehension.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-600 text-xs">
                <li>Reading stories, poems and other passages</li>
                <li>Understanding the meaning of words and sentences</li>
                <li>Vocabulary development</li>
                <li>Basic Hindi grammar</li>
                <li>Sentence formation</li>
                <li>Paragraph writing and short written responses</li>
                <li>Reading and writing practice</li>
              </ul>
              <p className="text-xs text-gray-500 italic mt-3">
                Prescribed NCERT textbook: <strong>Veena</strong>.
              </p>
            </div>

            {/* Mathematics Syllabus */}
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-slate-800 text-base mb-2 text-orange-600">Class 4 Mathematics Syllabus</h3>
              <p className="text-gray-700 mb-3">
                Mathematics helps students develop number sense, calculation skills, logical reasoning and problem-solving abilities.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-600 text-xs">
                <li>Understanding numbers and number patterns</li>
                <li>Addition, subtraction, multiplication and division</li>
                <li>Solving mathematical problems</li>
                <li>Recognising shapes and geometric patterns</li>
                <li>Measurement and comparison</li>
                <li>Understanding time and everyday measurements</li>
                <li>Reading and interpreting simple data</li>
              </ul>
              <p className="text-xs text-gray-500 italic mt-3">
                Prescribed NCERT textbook: <strong>Maths Mela</strong>. Practice through examples and word problems.
              </p>
            </div>

            {/* Environmental Studies Syllabus */}
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-slate-800 text-base mb-2 text-orange-600">Class 4 Environmental Studies Syllabus</h3>
              <p className="text-gray-700 mb-3">
                Environmental Studies helps students understand their surroundings and the relationship between people, nature and everyday life.
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-600 text-xs">
                <li>Plants, animals and their surroundings</li>
                <li>Family and community life</li>
                <li>Food, water and daily needs</li>
                <li>Homes, travel and different places</li>
                <li>Natural resources and environmental awareness</li>
                <li>Health, hygiene and responsible habits</li>
                <li>Observing and understanding the world around us</li>
              </ul>
              <p className="text-xs text-gray-500 italic mt-3">
                Prescribed NCERT textbook: <strong>Our Wondrous World</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* How to Prepare */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-2 border-l-4 border-orange-500 pl-3">
            How to Prepare for Class 4
          </h2>
          <p className="text-gray-700 text-sm mb-4">
            Students can improve their understanding of Class 4 subjects through regular practice and revision:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-gray-50 border border-gray-200">
              <FaCheckCircle className="text-orange-600 mt-1 shrink-0" />
              <span><strong className="text-slate-800">1. Follow the school syllabus:</strong> Use the latest syllabus and book list provided by the school.</span>
            </div>
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-gray-50 border border-gray-200">
              <FaCheckCircle className="text-orange-600 mt-1 shrink-0" />
              <span><strong className="text-slate-800">2. Read every day:</strong> Practise reading English and Hindi passages to improve comprehension and vocabulary.</span>
            </div>
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-gray-50 border border-gray-200">
              <FaCheckCircle className="text-orange-600 mt-1 shrink-0" />
              <span><strong className="text-slate-800">3. Practise Mathematics:</strong> Solve a few calculations and word problems regularly.</span>
            </div>
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-gray-50 border border-gray-200">
              <FaCheckCircle className="text-orange-600 mt-1 shrink-0" />
              <span><strong className="text-slate-800">4. Revise lessons:</strong> Review important concepts after completing each chapter.</span>
            </div>
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-gray-50 border border-gray-200">
              <FaCheckCircle className="text-orange-600 mt-1 shrink-0" />
              <span><strong className="text-slate-800">5. Use practice questions:</strong> Attempt topic-based questions to identify areas that need more attention.</span>
            </div>
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-gray-50 border border-gray-200">
              <FaCheckCircle className="text-orange-600 mt-1 shrink-0" />
              <span><strong className="text-slate-800">6. Take quizzes:</strong> Short quizzes can help students check what they have understood and practise recalling concepts.</span>
            </div>
          </div>

          {/* Interactive Quiz Callout Banner */}
          <div className="mt-6 p-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl text-white text-center shadow-md">
            <p className="text-sm md:text-base font-semibold flex items-center justify-center gap-2">
              <FaLightbulb size={18} />
              Students can also use Learnosphere's interactive quizzes for Class 4 to practise and check their understanding across subjects.
            </p>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-6 border-l-4 border-orange-500 pl-3">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center p-4 text-left font-semibold text-slate-800 hover:bg-orange-50 transition"
                >
                  <span className="pr-4 text-sm md:text-base">{faq.q}</span>
                  {openFaq === index ? (
                    <FaChevronUp className="text-orange-600 shrink-0" size={16} />
                  ) : (
                    <FaChevronDown className="text-gray-400 shrink-0" size={16} />
                  )}
                </button>
                {openFaq === index && (
                  <div className="p-4 bg-orange-50/50 border-t border-gray-100 text-sm text-gray-700 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Conclusion */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-3 border-l-4 border-orange-500 pl-3">
            Conclusion
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            The Class 4 syllabus builds important academic and practical skills that students use in higher classes. Parents should refer to the latest NCERT textbooks and their school's syllabus to keep learning materials up to date. Regular reading, Mathematics practice, revision and quizzes can help students develop a stronger understanding of each subject.
          </p>
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
