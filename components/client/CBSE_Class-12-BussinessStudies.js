"use client";
import React, { useEffect, useState } from "react";
import Footer1 from "@/components/Footer1";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaBook, FaCheckCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";
import DownloadFormModal from "@/components/DownloadFormModal";
import { MdDownload } from "react-icons/md";
import Script from "next/script";

export default function BusinessStudies12() {
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

  const handleFormSubmit = () => {
    setIsModalOpen(false);
    setHasDownloaded(true);
    sessionStorage.setItem("hasFilledForm", "true");
    downloadPdf(selectedPdf);
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "What are the main parts of CBSE Class 12 Business Studies?",
      answer: "The syllabus is divided into two parts: Principles and Functions of Management, and Business Finance and Marketing."
    },
    {
      question: "How many units are included in the Class 12 Business Studies syllabus 2026–27?",
      answer: "The syllabus includes 12 units, covering management, financial management, financial markets, marketing and consumer protection."
    },
    {
      question: "How many marks is the Class 12 Business Studies examination?",
      answer: "The subject carries 100 marks: 80 marks for the theory examination and 20 marks for project work."
    },
    {
      question: "What is the duration of the Business Studies theory examination?",
      answer: "The theory examination is conducted for three hours."
    },
    {
      question: "Which chapters are included in Part A of Business Studies?",
      answer: "Part A includes Nature and Significance of Management, Principles of Management, Business Environment, Planning, Organising, Staffing, Directing and Controlling."
    },
    {
      question: "Which topics are covered in Part B of Business Studies?",
      answer: "Part B covers Financial Management, Financial Markets, Marketing Management and Consumer Protection."
    },
    {
      question: "Are case-based questions included in the Business Studies board examination?",
      answer: "Yes. Students should practise applying business concepts to practical situations and case-based questions."
    },
    {
      question: "How can I prepare short notes for Business Studies?",
      answer: "Prepare chapter-wise notes containing definitions, features, importance, processes, comparisons and examples. Revise them regularly."
    },
    {
      question: "Is project work compulsory in Class 12 Business Studies?",
      answer: "Project work is part of the subject assessment and carries 20 marks. Students should follow the current CBSE and school guidelines."
    },
    {
      question: "Where can I find Class 12 Business Studies study material?",
      answer: "Students can explore chapter-wise notes, NCERT solutions, sample papers and practice resources on Learnosphere to support their preparation."
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="p-4 md:p-12 max-w-6xl mx-auto flex flex-col font-Poppins justify-center mt-12">
        {/* Title Header */}
        <div className="text-center my-8">
          <h1 className="p-4 text-2xl md:text-4xl font-extrabold bg-black text-orange-500 shadow-orange-900/30 shadow-2xl rounded-2xl inline-block max-w-3xl">
            CBSE Class 12 Business Studies
          </h1>
          <p className="mt-3 text-lg font-semibold text-gray-700">
            Syllabus, Chapters, Notes and Exam Preparation (2026–27)
          </p>
        </div>

        {/* Overview Section */}
        <div className="bg-orange-50/50 p-6 md:p-8 rounded-2xl border border-orange-100 mb-8 space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Business Studies is an important subject for Commerce students in Class 12. It introduces students to the principles of management, business operations, financial decisions and marketing activities. The subject also helps learners understand how organisations function and make decisions in a competitive business environment.
          </p>
          <p className="text-gray-700 leading-relaxed">
            The CBSE Class 12 Business Studies curriculum combines theoretical concepts with practical applications. Students learn about management techniques, business finance, marketing strategies and consumer rights through different chapters and case-based questions.
          </p>
        </div>

        {/* Syllabus 2026-27 Intro */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            CBSE Class 12 Business Studies Syllabus 2026–27
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The CBSE Business Studies syllabus for the 2026–27 academic session is divided into two main parts:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-xl border-l-4 border-orange-500 shadow-sm border-gray-100">
              <h3 className="font-bold text-lg text-gray-900 mb-1">Part A</h3>
              <p className="text-gray-600">Principles and Functions of Management (50 Marks)</p>
            </div>
            <div className="bg-white p-5 rounded-xl border-l-4 border-green-500 shadow-sm border-gray-100">
              <h3 className="font-bold text-lg text-gray-900 mb-1">Part B</h3>
              <p className="text-gray-600">Business Finance and Marketing (30 Marks)</p>
            </div>
          </div>
          <p className="text-gray-600 text-sm mt-3">
            The subject also includes project work (20 Marks), which allows students to apply business concepts to practical situations.
          </p>
        </div>

        {/* Chapter PDF Download Cards */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Class 12 Business Studies Chapter Notes & Study Material
          </h2>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Part A Card */}
            <div className="flex-1 flex flex-col gap-4 p-6 border-2 border-gray-200 rounded-2xl shadow-xl shadow-orange-100 bg-white">
              <p className="font-bold text-black flex items-center gap-2 text-lg border-b pb-3 border-orange-100">
                <FaBook className="text-orange-500" size={20} /> Part A: Principles and Functions of Management
              </p>
              
              <a
                className="text-[.95em] flex justify-between items-center p-2 rounded-lg hover:bg-orange-50 cursor-pointer transition text-gray-800"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-12 Bussiness/Part-1/Nature and Significance of Management.pdf"
                  )
                }
              >
                <span><strong className="text-orange-600">Chapter 1:</strong> Nature and Significance of Management</span>
                <MdDownload className="text-orange-600 hover:scale-110 duration-200 shrink-0" size={22} />
              </a>

              <a
                className="text-[.95em] flex justify-between items-center p-2 rounded-lg hover:bg-orange-50 cursor-pointer transition text-gray-800"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-12 Bussiness/Part-1/Principles of Management.pdf"
                  )
                }
              >
                <span><strong className="text-orange-600">Chapter 2:</strong> Principles of Management</span>
                <MdDownload className="text-orange-600 hover:scale-110 duration-200 shrink-0" size={22} />
              </a>

              <a
                className="text-[.95em] flex justify-between items-center p-2 rounded-lg hover:bg-orange-50 cursor-pointer transition text-gray-800"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-12 Bussiness/Part-1/Business Environment.pdf"
                  )
                }
              >
                <span><strong className="text-orange-600">Chapter 3:</strong> Business Environment</span>
                <MdDownload className="text-orange-600 hover:scale-110 duration-200 shrink-0" size={22} />
              </a>

              <a
                className="text-[.95em] flex justify-between items-center p-2 rounded-lg hover:bg-orange-50 cursor-pointer transition text-gray-800"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-12 Bussiness/Part-1/Planning.pdf")
                }
              >
                <span><strong className="text-orange-600">Chapter 4:</strong> Planning</span>
                <MdDownload className="text-orange-600 hover:scale-110 duration-200 shrink-0" size={22} />
              </a>

              <a
                className="text-[.95em] flex justify-between items-center p-2 rounded-lg hover:bg-orange-50 cursor-pointer transition text-gray-800"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-12 Bussiness/Part-1/Organising.pdf")
                }
              >
                <span><strong className="text-orange-600">Chapter 5:</strong> Organising</span>
                <MdDownload className="text-orange-600 hover:scale-110 duration-200 shrink-0" size={22} />
              </a>

              <a
                className="text-[.95em] flex justify-between items-center p-2 rounded-lg hover:bg-orange-50 cursor-pointer transition text-gray-800"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-12 Bussiness/Part-1/Staffing.pdf")
                }
              >
                <span><strong className="text-orange-600">Chapter 6:</strong> Staffing</span>
                <MdDownload className="text-orange-600 hover:scale-110 duration-200 shrink-0" size={22} />
              </a>

              <a
                className="text-[.95em] flex justify-between items-center p-2 rounded-lg hover:bg-orange-50 cursor-pointer transition text-gray-800"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-12 Bussiness/Part-1/Directing.pdf")
                }
              >
                <span><strong className="text-orange-600">Chapter 7:</strong> Directing</span>
                <MdDownload className="text-orange-600 hover:scale-110 duration-200 shrink-0" size={22} />
              </a>

              <a
                className="text-[.95em] flex justify-between items-center p-2 rounded-lg hover:bg-orange-50 cursor-pointer transition text-gray-800"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-12 Bussiness/Part-1/Controlling.pdf"
                  )
                }
              >
                <span><strong className="text-orange-600">Chapter 8:</strong> Controlling</span>
                <MdDownload className="text-orange-600 hover:scale-110 duration-200 shrink-0" size={22} />
              </a>
            </div>

            {/* Part B Card */}
            <div className="flex-1 flex flex-col gap-4 p-6 border-2 border-gray-200 rounded-2xl shadow-xl shadow-orange-100 bg-white">
              <p className="font-bold text-black flex items-center gap-2 text-lg border-b pb-3 border-orange-100">
                <FaBook className="text-orange-500" size={20} /> Part B: Business Finance and Marketing
              </p>

              <a
                className="text-[.95em] flex justify-between items-center p-2 rounded-lg hover:bg-orange-50 cursor-pointer transition text-gray-800"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-12 Bussiness/Part-2/Financial Management.pdf"
                  )
                }
              >
                <span><strong className="text-orange-600">Chapter 9:</strong> Financial Management</span>
                <MdDownload className="text-orange-600 hover:scale-110 duration-200 shrink-0" size={22} />
              </a>

              <div className="text-[.95em] flex justify-between items-center p-2 rounded-lg bg-gray-50 text-gray-800">
                <span><strong className="text-orange-600">Chapter 10:</strong> Financial Markets</span>
                <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">Syllabus Unit</span>
              </div>

              <a
                className="text-[.95em] flex justify-between items-center p-2 rounded-lg hover:bg-orange-50 cursor-pointer transition text-gray-800"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-12 Bussiness/Part-2/Marketing.pdf")
                }
              >
                <span><strong className="text-orange-600">Chapter 11:</strong> Marketing Management</span>
                <MdDownload className="text-orange-600 hover:scale-110 duration-200 shrink-0" size={22} />
              </a>

              <a
                className="text-[.95em] flex justify-between items-center p-2 rounded-lg hover:bg-orange-50 cursor-pointer transition text-gray-800"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-12 Bussiness/Part-2/Consumer Protection.pdf"
                  )
                }
              >
                <span><strong className="text-orange-600">Chapter 12:</strong> Consumer Protection</span>
                <MdDownload className="text-orange-600 hover:scale-110 duration-200 shrink-0" size={22} />
              </a>
            </div>
          </div>
        </div>

        {/* Detailed Chapter Breakdown */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Class 12 Business Studies Chapter Breakdown
          </h2>
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <h3 className="text-xl font-bold text-orange-600 mb-4">Part A: Principles and Functions of Management</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-gray-100">
                  <h4 className="font-bold text-gray-900">1. Nature and Significance of Management</h4>
                  <p className="text-sm text-gray-600 mt-1">Learn meaning, objectives, importance, management as science/art/profession, levels of management and coordination.</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100">
                  <h4 className="font-bold text-gray-900">2. Principles of Management</h4>
                  <p className="text-sm text-gray-600 mt-1">Understand importance of management principles, Henri Fayol's 14 principles and F.W. Taylor's scientific management techniques.</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100">
                  <h4 className="font-bold text-gray-900">3. Business Environment</h4>
                  <p className="text-sm text-gray-600 mt-1">Study meaning, importance and economic, social, technological, political and legal dimensions of business environment.</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100">
                  <h4 className="font-bold text-gray-900">4. Planning</h4>
                  <p className="text-sm text-gray-600 mt-1">Explore meaning, importance, limitations, planning process and various types of operational and strategic plans.</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100">
                  <h4 className="font-bold text-gray-900">5. Organising</h4>
                  <p className="text-sm text-gray-600 mt-1">Learn about organising process, organisational structures (functional & divisional), delegation and decentralisation.</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100">
                  <h4 className="font-bold text-gray-900">6. Staffing</h4>
                  <p className="text-sm text-gray-600 mt-1">Understand staffing concept, recruitment, selection process, training and development for effective human resources.</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100">
                  <h4 className="font-bold text-gray-900">7. Directing</h4>
                  <p className="text-sm text-gray-600 mt-1">Study motivation theories (Maslow), leadership styles, formal/informal communication and barriers to effective communication.</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100">
                  <h4 className="font-bold text-gray-900">8. Controlling</h4>
                  <p className="text-sm text-gray-600 mt-1">Learn meaning and importance of controlling, relationship with planning and steps in the controlling process.</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <h3 className="text-xl font-bold text-green-700 mb-4">Part B: Business Finance and Marketing</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-gray-100">
                  <h4 className="font-bold text-gray-900">9. Financial Management</h4>
                  <p className="text-sm text-gray-600 mt-1">Understand financial management objectives, financing/investment/dividend decisions, financial planning, capital structure and working capital.</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100">
                  <h4 className="font-bold text-gray-900">10. Financial Markets</h4>
                  <p className="text-sm text-gray-600 mt-1">Explore money markets, capital markets (primary & secondary), stock exchange trading procedures and functions of SEBI.</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100">
                  <h4 className="font-bold text-gray-900">11. Marketing Management</h4>
                  <p className="text-sm text-gray-600 mt-1">Study marketing concepts, philosophies, functions and 4 Ps of marketing mix: Product, Price, Place and Promotion.</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100">
                  <h4 className="font-bold text-gray-900">12. Consumer Protection</h4>
                  <p className="text-sm text-gray-600 mt-1">Learn consumer rights and responsibilities, Consumer Protection Act provisions, redressal agencies and role of NGOs.</p>
                </div>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3 italic">
            *Note: Refer to the official CBSE syllabus for the complete topic-wise details and any applicable updates.
          </p>
        </div>

        {/* Exam Pattern Table */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            CBSE Class 12 Business Studies Exam Pattern
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-xl overflow-hidden shadow-sm border border-gray-200">
              <thead>
                <tr className="bg-orange-500 text-white text-left text-sm md:text-base">
                  <th className="p-4">Assessment / Section</th>
                  <th className="p-4">Topics Covered</th>
                  <th className="p-4 text-center">Marks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm md:text-base text-gray-700 bg-white">
                <tr>
                  <td className="p-4 font-semibold">Part A</td>
                  <td className="p-4">Principles and Functions of Management</td>
                  <td className="p-4 text-center font-bold text-orange-600">50</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">Part B</td>
                  <td className="p-4">Business Finance and Marketing</td>
                  <td className="p-4 text-center font-bold text-orange-600">30</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-4 font-bold text-gray-900">Total Theory</td>
                  <td className="p-4 font-medium text-gray-600">Written Examination (Duration: 3 Hours)</td>
                  <td className="p-4 text-center font-bold text-gray-900">80</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">Project Work</td>
                  <td className="p-4">Project File (10 Marks) + Viva Voce (10 Marks)</td>
                  <td className="p-4 text-center font-bold text-green-600">20</td>
                </tr>
                <tr className="bg-orange-50 font-bold">
                  <td className="p-4 text-gray-900">Grand Total</td>
                  <td className="p-4 text-gray-900">Comprehensive Class 12 Assessment</td>
                  <td className="p-4 text-center text-orange-600 text-lg">100</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Importance of Notes & Important Topics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Importance of Class 12 Business Studies Notes
            </h3>
            <p className="text-gray-700 leading-relaxed text-sm mb-4">
              Well-organised Class 12 Business Studies Notes help students understand important definitions, principles and business concepts without getting confused by lengthy explanations.
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2"><FaCheckCircle className="text-orange-500 shrink-0" /> Revise important definitions and terminology.</li>
              <li className="flex items-center gap-2"><FaCheckCircle className="text-orange-500 shrink-0" /> Understand management principles with examples.</li>
              <li className="flex items-center gap-2"><FaCheckCircle className="text-orange-500 shrink-0" /> Compare different business concepts.</li>
              <li className="flex items-center gap-2"><FaCheckCircle className="text-orange-500 shrink-0" /> Prepare short and long-answer questions.</li>
              <li className="flex items-center gap-2"><FaCheckCircle className="text-orange-500 shrink-0" /> Practise case-based questions.</li>
              <li className="flex items-center gap-2"><FaCheckCircle className="text-orange-500 shrink-0" /> Review important topics before examinations.</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Important Topics to Prepare
            </h3>
            <p className="text-gray-700 leading-relaxed text-sm mb-4">
              Some concepts require careful understanding because they form the foundation of the subject:
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
              <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">• Principles of management</div>
              <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">• Fayol & Taylor methods</div>
              <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">• Planning & Organising</div>
              <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">• Delegation & Decentralisation</div>
              <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">• Recruitment & Selection</div>
              <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">• Motivation & Leadership</div>
              <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">• Financial Decisions</div>
              <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">• 4 Ps Marketing Mix</div>
              <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">• Consumer Rights & Acts</div>
              <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-100">• Case-based application</div>
            </div>
          </div>
        </div>

        {/* Preparation Strategy & Project Work */}
        <div className="space-y-8 mb-12">
          <div className="bg-orange-50/50 p-6 md:p-8 rounded-2xl border border-orange-100">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              How to Prepare for the Class 12 Business Studies Board Exam
            </h3>
            <p className="text-gray-700 mb-4">
              A consistent preparation strategy can make the subject easier to understand and revise:
            </p>
            <ol className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3"><span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">1</span> <span><strong>Follow the Latest Syllabus:</strong> Start by checking the official CBSE syllabus and identifying all prescribed units.</span></li>
              <li className="flex items-start gap-3"><span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">2</span> <span><strong>Study NCERT Chapters:</strong> Read each chapter carefully and understand the definitions, features, importance and processes.</span></li>
              <li className="flex items-start gap-3"><span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">3</span> <span><strong>Prepare Chapter-Wise Notes:</strong> Make short notes for important concepts, comparisons and management principles.</span></li>
              <li className="flex items-start gap-3"><span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">4</span> <span><strong>Practise Case-Based Questions:</strong> Apply theoretical concepts to practical business situations to improve your understanding.</span></li>
              <li className="flex items-start gap-3"><span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">5</span> <span><strong>Solve Previous Year Questions:</strong> Practise different question formats to become familiar with board examination requirements.</span></li>
              <li className="flex items-start gap-3"><span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">6</span> <span><strong>Revise Regularly:</strong> Set aside time to revise key terms, management principles and important concepts.</span></li>
              <li className="flex items-start gap-3"><span className="w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">7</span> <span><strong>Complete Project Work:</strong> Follow your school's project guidelines and organise your project file and viva preparation properly.</span></li>
            </ol>
          </div>

          <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              Business Studies Project Work for Class 12
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Project work is an important part of the Class 12 Business Studies assessment. It helps students connect textbook concepts with real business situations. A well-organised project generally includes:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-gray-700">
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">✓ Project title and introduction</div>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">✓ Objectives of the study</div>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">✓ Information and research</div>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">✓ Analysis and observations</div>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">✓ Conclusion & Findings</div>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">✓ References or bibliography</div>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              *Assessment allocation: <strong>Project File: 10 Marks</strong> | <strong>Viva Voce: 10 Marks</strong> (Total: 20 Marks).
            </p>
          </div>
        </div>

        {/* Study Resources */}
        <div className="bg-gray-50 p-6 md:p-8 rounded-2xl border border-gray-200 mb-12">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
            Study Resources for CBSE Class 12 Business Studies
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Having the right learning resources makes revision and concept-building more organised. Students can explore chapter-wise Business Studies notes, NCERT solutions, important questions and answers, previous-year question papers, sample papers, and case-study practice questions on Learnosphere to support their preparation.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white"
              >
                <button
                  className="w-full text-left p-4 md:p-5 flex justify-between items-center bg-gray-50 hover:bg-orange-50/50 transition"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openFaq === index}
                >
                  <span className="font-semibold text-gray-900 text-sm md:text-base">
                    {faq.question}
                  </span>
                  {openFaq === index ? (
                    <FaChevronUp className="text-orange-500 shrink-0 ml-4" />
                  ) : (
                    <FaChevronDown className="text-gray-400 shrink-0 ml-4" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="p-4 md:p-5 bg-white text-gray-700 text-sm md:text-base leading-relaxed border-t border-gray-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Schema */}
        <Script
          id="faq-schema"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            }),
          }}
        />
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
