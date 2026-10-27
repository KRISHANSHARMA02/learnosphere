"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";

import Navbar from "@/components/Navbar";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Banner2 from "@/public/Banner2.jpeg";
import Link from "next/link";
import Footer1 from "@/components/Footer1";
import Footer from "@/components/Footer";
import { FaTimes, FaWhatsapp, FaLock } from "react-icons/fa";
import WhatsappModal from "@/components/whatsappModal";
import AOS from "aos";
import "aos/dist/aos.css";
import FormSection from "@/components/FormGeneral";
import { useSession } from "next-auth/react";
import { getResourceContent } from "./resourceData";
import { useRouter } from "next/navigation";
import DynamicFAQSection from "@/components/DynamicFAQSection";

export default function ResourcePage({ slug, initialContent = null }) {
  const { data: session } = useSession();
  const router = useRouter();
  
  const [content, setContent] = useState(initialContent || null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activePdfId, setActivePdfId] = useState(null);
  const [pdfUrls, setPdfUrls] = useState({});
  const [showWhatsappModal, setShowWhatsappModal] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    if (!content) setContent(getResourceContent(slug));
  }, [slug]);

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(`/SearchResult?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handlePypClick = async (pypSlug, index) => {
    if (activePdfId === index) {
      setActivePdfId(null);
      return;
    }
    setActivePdfId(index);
    if (!pdfUrls[index]) {
      try {
        const res = await fetch(`${WEB_BACKEND_URL}/api/route/cbsepreviouspaperspdf/${pypSlug}`);
        const json = await res.json();
        if (json?.data?.[0]?.pdfUrl) {
          setPdfUrls(prev => ({ ...prev, [index]: json.data[0].pdfUrl }));
        }
      } catch (err) {
        console.error("Failed to fetch PDF:", err);
      }
    }
  };

  if (!content) return null;

  return (
    <div className="bg-gray-100 font-Poppins">
      <Navbar />
      
      <main className="px-4 md:px-28 flex flex-col lg:flex-row gap-6 bg-gray-100 container mx-auto pt-24">
        <div className="w-full lg:w-[65%]">
          
          <h1 className="mb-2 p-4 text-white text-[1.4em] bg-orange-600 font-bold rounded-lg shadow-md">
            {content.title}
          </h1>
          
          <div className="w-full mb-4 rounded-lg overflow-hidden shadow">
            <Image src={Banner2} alt="Learnosphere Banner" className="w-full h-auto object-cover" priority />
          </div>
          
          <div className="my-6">
            {content.description.map((para, i) => (
              <p key={i} className="mb-2 mt-4 text-gray-800 leading-relaxed text-justify">
                {para}
              </p>
            ))}
          </div>

          <div className="my-8">
            <h2 className="mb-2 p-4 text-white text-[1.4em] bg-orange-600 font-bold rounded-lg shadow-md">
              Syllabus Links
            </h2>
            <ul className="list-disc pl-8 mt-4 space-y-2">
              {content.syllabusLinks.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-black font-semibold hover:underline">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="my-8">
            <h2 className="mb-2 p-4 text-white text-[1.4em] bg-orange-600 font-bold rounded-lg shadow-md">
              Previous Year Papers
            </h2>
            <div className="flex flex-col gap-4 mt-4">
              {content.pypLinks.map((pyp, i) => (
                <div key={i} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm transition-shadow hover:shadow-md">
                  <button 
                    onClick={() => handlePypClick(pyp.slug, i)}
                    className="text-left w-full text-black font-bold hover:text-gray-700 transition-colors"
                  >
                    {pyp.title}
                  </button>
                  
                  {activePdfId === i && pdfUrls[i] && (
                    <div className="mt-4 relative rounded border border-gray-300 overflow-hidden bg-gray-100 h-[500px]">
                      {!session ? (
                        <>
                          <iframe 
                            src={pdfUrls[i]} 
                            className="w-full h-full"
                            style={{ filter: 'blur(5px)', opacity: 0.7 }}
                            title="PDF Viewer"
                          />
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 text-white z-10 p-6 text-center">
                            <FaLock className="text-4xl mb-4 text-orange-500" />
                            <h3 className="mb-4 text-xl font-bold">Please log in to view the full PDF</h3>
                            <Link 
                              href="/Signin"
                              className="px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-bold transition-colors shadow-lg"
                            >
                              Log In
                            </Link>
                          </div>
                        </>
                      ) : (
                        <iframe 
                          src={pdfUrls[i]} 
                          className="w-full h-full"
                          title="PDF Viewer"
                        />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="my-8">
            <h2 className="mb-2 text-black text-[1.4em] font-bold">
              Frequently Asked Questions
            </h2>
            <div className="mt-4 space-y-4">
              {content.faqs.map((faq, i) => (
                <div key={i} className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="mb-2 text-black mt-3 text-[1.2em] font-semibold">
                    Q: {faq.question}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    <strong>A:</strong> {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col text-[.8em] mt-5 border border-slate-800 rounded-lg p-1 mb-8">
            <h1 className="font-semibold text-slate-800 px-3 mt-2 text-[1.2em]">Similar Links</h1>
            <ol className="flex flex-wrap gap-2 w-full p-4 text-orange-600 mb-2">
              {content.relatedLinks.map((link, i) => (
                <li key={i} className="mb-1 w-full sm:w-[48%] bg-gray-200 rounded-lg font-semibold hover:bg-orange-600 hover:text-white hover:font-bold transition-all ease-in-out duration-150 overflow-hidden">
                  <Link href={link.href} className="block w-full h-full p-4">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ol>
          </div>

        </div>

        {/* Right Column (35%) */}
        <div className="flex flex-col gap-5 w-full lg:w-[35%]">
          <div className="w-full bg-white p-8">
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Type To Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              className="placeholder:text-gray-500 p-3 w-full rounded-md border border-gray-400"
            />
          </div>
          
          <div>
            <FormSection />
          </div>
        </div>

      </main>

      <DynamicFAQSection slug={slug} />

      {/* WhatsApp Modal & Icon */}
      <div className="fixed right-8 top-[650px] md:top-[550px] flex flex-col items-center space-y-4 z-50">
          {showWhatsappModal && (
              <div
                  data-aos="fade-up"
                  className="absolute bottom-10 md:bottom-16 right-0 md:-left-[390px] 2xl:right-1 xl:-left-[370px] rounded-lg p-4 transition-transform transform duration-500 ease-in-out"
              >
                  <div className="relative">
                      <FaTimes
                          size={18}
                          className="absolute top-2 right-0 text-white cursor-pointer z-10"
                          onClick={() => setShowWhatsappModal(false)}
                      />
                      <WhatsappModal />
                  </div>
              </div>
          )}

          <FaWhatsapp
              size={48}
              className="text-white bg-green-500 p-2 rounded-full cursor-pointer hover:scale-110 transition-transform duration-300 shadow-lg"
              onClick={() => setShowWhatsappModal(!showWhatsappModal)}
          />
      </div>
      
      <Footer1 />
      <Footer />
    </div>
  );
}
