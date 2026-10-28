"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import DynamicFAQSection from "@/components/DynamicFAQSection";
import React, { useEffect, useState, use } from "react";
import Banner from "@/public/WhatsApp Image 2024-10-14 at 11.44.36.jpeg";
import Link from "next/link";
import axios from "axios";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Footer1 from "@/components/Footer1";
import Footer from "@/components/Footer";

import Sociallinks2 from "@/components/Sociallinks2";
import AOS from "aos";
import "aos/dist/aos.css";
import FormSection from "@/components/FormGeneral";

const getRouteForTitle = (title) => {
  if (!title || typeof title !== 'string') return "#";
  
  const map = {
    "ICSE Sample Papers": "/ICSE-Sample-Papers-Page",
    "ICSE Solved Question Papers Last Ten Years": "/ICSE-Previousyear-Questions",
    "ICSE 2017 Question Paper": "/ICSE-Previousyear-Questions",
    "ICSE 2017 Question Papers": "/ICSE-Previousyear-Questions",
    "ICSE 2016 Maths Papers Solved": "/ICSE-Previousyear-Questions",
    "ICSE 2016 Maths Paper Solved": "/ICSE-Previousyear-Questions",
    "ICSE 2014 Maths Questions Paper Solved": "/ICSE-Previousyear-Questions",
    "ICSE 10 Years Solved Papers": "/ICSE-Previousyear-Questions",
    "ICSE Sample Papers For Class 10 2017 With Answers": "/ICSE-Sample-Papers-Page",
    "ICSE Solved Questions Papers": "/ICSE-Previousyear-Questions",
    "ICSE Sample Papers For Class 10 2015 With Answers": "/ICSE-Sample-Papers-Page",
    "ISC Physics Previous Question Papers": "/ICSE-Previousyear-Questions",
  };
  
  if (map[title]) return map[title];
  
  // Generic matchers
  const lower = title.toLowerCase();
  if (lower.includes('sample paper')) return '/ICSE-Sample-Papers-Page';
  if (lower.includes('previous year') || lower.includes('solved paper') || lower.includes('question paper')) return '/ICSE-Previousyear-Questions';
  
  // Dynamically map any missing/new pages to the generic catch-all route we built
  const slugified = title.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '');
  return `/ICSE-Related/${slugified}`;
};

const DataTable = ({ data, slug: propSlug }) => {
  const params = useParams();
  const currentSlug = propSlug || params?.slug;
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [uploadedUrls, setUploadedUrls] = useState({});

  const normalizeTitle = (title) => {
    if (!title) return '';
    const yearMatch = title.match(/\b(20\d{2})\b/);
    const year = yearMatch ? yearMatch[1] : '';
    const classMatch = title.match(/\b(?:class\s*|-)?(10|12)\b/i);
    const classNum = classMatch ? classMatch[1] : '';
    const semMatch = title.match(/\bsem(?:ester)?\s*(\d+)\b/i);
    const semNum = semMatch ? semMatch[1] : '';
    if (year && classNum) {
      return `class_${classNum}_${year}` + (semNum ? `_sem_${semNum}` : '');
    }
    return title.replace(/\s+/g, '').toLowerCase();
  };

  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    // Trigger the redirect when the Enter key is pressed
    if (e.key === "Enter" && searchQuery) {
      // Redirect to ContentFound with the search query as a URL parameter
      window.location.href = `/SearchResult?query=${searchQuery}`;
    }
  };

  const router = useRouter();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowButton((prev) => !prev);
    }, 10000); // Toggle every 10 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out" }); // Initialize AOS with smooth settings
    
    // Fetch available PDFs from local backend
    axios.get(`${WEB_BACKEND_URL}/api/ics-papers`)
      .then(res => {
        let urlMap = {};
        if (res.data && res.data.data) {
          res.data.data.forEach(paper => {
            if (paper.title) urlMap[normalizeTitle(paper.title)] = paper.s3_url;
          });
        }
        
        // Fetch Class 8, 9, 11 ICSE papers
        axios.get(`${WEB_BACKEND_URL}/api/icse-papers`)
          .then(res2 => {
            if (res2.data && res2.data.data) {
              res2.data.data.forEach(paper => {
                if (paper.title) urlMap[normalizeTitle(paper.title)] = paper.s3_url;
              });
            }
            setUploadedUrls(urlMap);
          })
          .catch(err => {
            console.error("Error fetching ICSE Class 8, 9, 11 papers:", err);
            setUploadedUrls(urlMap);
          });
      })
      .catch(err => console.error("Error fetching ICS papers:", err));
  }, []);


  const renderLink = (dataItem) => {
    if (!dataItem) return <span>No title available</span>;
    const title = typeof dataItem === 'object' ? dataItem.title : dataItem;
    const pdfUrl = typeof dataItem === 'object' ? dataItem.pdfUrl : null;
    const finalPdfUrl = uploadedUrls[normalizeTitle(title)];
    
    if (!title) return <span>No title available</span>;
    
    return finalPdfUrl ? (
      <button 
        className="w-full block text-center cursor-pointer"
        onClick={() => {
          setSelectedPdf(finalPdfUrl);
          setTimeout(() => {
            document.getElementById('pdf-viewer')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
      >
        {title}
      </button>
    ) : (
      <button
        className="w-full block text-center cursor-pointer"
        onClick={() => alert("PDF not uploaded yet for this paper.")}
      >
        {title}
      </button>
    );
  };

  if (loading) {

    return <div className="text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
  <>
    <Navbar />
    <div className="bg-gray-100 font-Poppins">
      <div className="px-4 md:px-28 flex flex-col md:flex-row gap-6 bg-gray-100 container mx-auto pt-24">
        <div className="flex flex-col gap-5 w-full md:w-[65%]">
          <div className="fixed right-8 top-[650px] md:top-[550px] flex flex-col items-center space-y-4">

          </div>
          {data.length > 0 ? (
            data.map((item, index) => (
              <div key={item.id} className="mb-4">
                {index === 0 ? (
                  <h1 className="mb-2 p-4 text-white text-[1.4em] bg-orange-600 font-bold">
                    {item.heading1}
                  </h1>
                ) : (
                  <h2 className="mb-2 p-4 text-white text-[1.4em] bg-orange-600 font-bold">
                    {item.heading1}
                  </h2>
                )}
                <Link href="https://sarvgyat.learnosphere.in/">
                  <Image className="mt-3" src={Banner} alt="" />
                </Link>
                <p className="mb-2 mt-4 text-gray-800">{item.para1}</p>

                {/* --- DETAILED NOTES SECTION (Systematic Box) START --- */}
                {(item.heading2 || item.para2 || item.heading3 || item.para3) && (
                  <div className="mt-8 mb-8 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200">
                    
                    {item.heading2 && (
                      <h2 className="text-xl md:text-2xl font-bold text-gray-800 border-l-4 border-orange-500 pl-4 bg-orange-50/50 py-2 mb-4">
                        {item.heading2}
                      </h2>
                    )}
                    {item.para2 && (
                      <p className="text-gray-700 text-lg mb-8 leading-relaxed text-justify">
                        {item.para2}
                      </p>
                    )}

                    {item.heading3 && (
                      <h2 className="text-xl md:text-2xl font-bold text-gray-800 border-l-4 border-orange-500 pl-4 bg-orange-50/50 py-2 mb-4">
                        {item.heading3}
                      </h2>
                    )}
                    {item.para3 && (
                      <p className="text-gray-700 text-lg leading-relaxed text-justify">
                        {item.para3}
                      </p>
                    )}
                  </div>
                )}
                {/* --- DETAILED NOTES SECTION END --- */}

                {item.list1 && item.list1.length > 0 && (
                  <ol className="list-disc text-orange-600 pl-5 mb-2">
                    {item.list1.map((listItem, index) => (
                      <li key={index} className="mb-1">
                        {listItem}
                      </li>
                    ))}
                  </ol>
                )}
                <div>
                  {item.heading17 ? ( // Check if item.heading24 has a value
                    (<h2 className="text-[1.2em]">{item.heading17}</h2>)
                  ) : null}
                  <p className="mb-2 mt-4 text-gray-800">{item.para17}</p>

                  {(item.heading4 ||
                    item.para4 ||
                    (item.tableData && item.tableData.length > 0) ||
                    (item.anotherField && item.anotherField.length > 0)) && (
                      <div className="grid border border-slate-800 mt-4">
                        {item.heading4 && (
                          <h2 className="text-white bg-orange-600 p-4 font-bold text-center border border-slate-800 text-[1.2em]">
                            {item.heading4}
                          </h2>
                        )}
                        {item.para4 && <p className="">{item.para4}</p>}

                        {(item.tableData && item.tableData.length > 0) ||
                          (item.anotherField && item.anotherField.length > 0) ? (
                          <table className="min-w-full bg-white border border-gray-300">
                            <tbody>
                              <tr>
                                {item.tableData && item.tableData.length > 0 ? (
                                  <td className="border border-slate-800">
                                    {item.tableData.map((dataItem, index) => (
                                      <div
                                        key={dataItem.id} // Ensure you have a unique key
                                        className={`py-2 px-4 border-slate-800 hover:bg-gray-100 w-full ${index === item.tableData.length - 1
                                          ? ""
                                          : "border-b"
                                          }`}
                                      >
                                        {renderLink(dataItem)}
                                      </div>
                                    ))}
                                  </td>
                                ) : (
                                  <td className="border border-slate-800">
                                    <div className="py-2 px-4 text-gray-500">
                                      No data found
                                    </div>
                                  </td>
                                )}

                                {item.anotherField &&
                                  item.anotherField.length > 0 && (
                                    <td className="border border-slate-800">
                                      {item.anotherField.map(
                                        (dataItem, index) => (
                                          <div
                                            key={dataItem.id} // Ensure you have a unique key
                                            className={`py-2 px-4 border-slate-800 hover:bg-gray-100 w-full ${index ===
                                              item.anotherField.length - 1
                                              ? ""
                                              : "border-b"
                                              }`}
                                          >
                                            {renderLink(dataItem)}
                                          </div>
                                        )
                                      )}
                                    </td>
                                  )}
                              </tr>
                            </tbody>
                          </table>
                        ) : null}
                      </div>
                    )}
                    
                    {selectedPdf && (
                      <div id="pdf-viewer" className="mt-8 mb-8 text-center flex flex-col items-center">
                        <ToastContainer />
                        <h2 className="text-2xl font-semibold text-orange-700 mb-4">
                          View PDF
                        </h2>
                        <button
                          onClick={() => {
                            if (isLoggedIn) {
                              window.open(selectedPdf, "_blank");
                            } else {
                              toast.info("Please log in as a student to continue", { position: "top-center", autoClose: 2000 });
                              setTimeout(() => router.push("/Student"), 2000);
                            }
                          }}
                          className="inline-block px-6 py-3 bg-orange-600 text-white font-semibold rounded-full shadow-md hover:bg-orange-700 transition relative z-10"
                        >
                          📄 View / Download PDF
                        </button>
                        
                        <div className="relative w-full h-[600px] border rounded-xl my-4 shadow-md bg-white overflow-hidden flex flex-col mt-4">
                          {isLoggedIn ? (
                            <iframe
                              src={`${selectedPdf}#toolbar=0&navpanes=0&scrollbar=0`}
                              width="100%"
                              height="100%"
                              style={{ border: "none" }}
                              title="PDF Viewer"
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 p-6 relative">
                              <div className="w-3/4 space-y-4 blur-sm opacity-50 absolute top-10 left-10 right-10 bottom-10 pointer-events-none select-none">
                                 <div className="h-4 bg-gray-400 rounded w-full"></div>
                                 <div className="h-4 bg-gray-400 rounded w-5/6"></div>
                                 <div className="h-4 bg-gray-400 rounded w-4/6"></div>
                                 <div className="h-8 bg-gray-400 rounded w-1/3 my-8"></div>
                                 <div className="h-4 bg-gray-400 rounded w-full"></div>
                                 <div className="h-4 bg-gray-400 rounded w-11/12"></div>
                                 <div className="h-4 bg-gray-400 rounded w-full"></div>
                                 <div className="h-4 bg-gray-400 rounded w-4/5"></div>
                              </div>
                              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 backdrop-blur-md z-20">
                                <p className="text-lg font-semibold text-gray-800 mb-2">
                                  🔒 Please log in to view the full PDF
                                </p>
                                <p className="text-gray-600 mb-4 text-center max-w-md">
                                  You are seeing a limited preview. Log in to access the complete document.
                                </p>
                                <button
                                  onClick={() => router.push("/Student")}
                                  className="px-5 py-2 bg-orange-600 text-white font-semibold rounded-full shadow-md hover:bg-orange-700 transition"
                                >
                                  Log In
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                </div>
                <h2 className="mb-2 text-slate-800 mt-3 text-[1.2em]">
                  {item.heading5}
                </h2>
                <p className="mb-2 mt-4 text-gray-800">{item.para5}</p>
                {item.list2 && item.list2.length > 0 && (
                  <ol className="list-disc text-orange-600 pl-5 mb-2">
                    {item.list2.map((listItem, index) => (
                      <li key={index} className="mb-1">
                        {listItem}
                      </li>
                    ))}
                  </ol>
                )}
                <h2 className="mb-2 text-slate-800 mt-3 text-[1.2em]">
                  {item.heading6}
                </h2>
                <p className="mb-2 mt-4 text-gray-800">{item.para6}</p>
                <h2 className="mb-2 text-slate-800 mt-3 text-[1.2em]">
                  {item.heading7}
                </h2>
                <p className="mb-2 mt-4 text-gray-800">{item.para7}</p>

                {(item.heading11 ||
                  item.para11 ||
                  (item.anotherField1 && item.anotherField1.length > 0)) && (
                    <div className="border border-slate-800">
                      {item.heading11 && (
                        <h2 className="text-white bg-orange-600 p-4 font-bold text-center border border-slate-800 text-[1.2em]">
                          {item.heading11}
                        </h2>
                      )}
                      {item.para11 && <p className="">{item.para11}</p>}

                      {item.anotherField1 && item.anotherField1.length > 0 && (
                        <div className="flex flex-col items-center justify-center gap-4">
                          <table className="min-w-full bg-white border border-gray-300">
                            <tbody className="text-center">
                              <tr>
                                <td className="border border-slate-800">
                                  {item.anotherField1.map((dataItem, index) => (
                                    <div
                                      key={dataItem.id} // Ensure you have a unique key
                                      className={`py-2 px-4 border-slate-800 hover:bg-gray-100 w-full ${index === item.anotherField1.length - 1
                                        ? ""
                                        : "border-b"
                                        }`}
                                    >
                                      {renderLink(dataItem)}
                                    </div>
                                  ))}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}

                <h3 className="mb-2 text-slate-800 mt-3 text-[1.2em]">
                  {item.heading8}
                </h3>
                <p className="mb-2 mt-4 text-gray-800">{item.para8}</p>
                <h3 className="mb-2 text-slate-800 mt-3 text-[1.2em]">
                  {item.heading18}
                </h3>
                <p className="mb-2 mt-4 text-gray-800">{item.para18}</p>

                <h3 className="mb-2 text-slate-800 mt-3 text-[1.2em]">
                  {item.heading19}
                </h3>
                {(item.anotherField6 && item.anotherField6.length > 0) ||
                  (item.anotherField7 && item.anotherField7.length > 0) ||
                  (item.anotherField8 && item.anotherField8.length > 0) ? (
                  <div className="grid border border-slate-800 mt-4">
                    <table className="min-w-full bg-white border border-gray-300">
                      <tbody>
                        <tr>
                          {item.anotherField6 &&
                            item.anotherField6.length > 0 ? (
                            <td className="border border-slate-800">
                              {item.anotherField6.map((dataItem, index) => (
                                <div
                                  key={index}
                                  className={`py-2 px-4 border-slate-800 hover:bg-gray-100 ${index === item.anotherField6.length - 1
                                    ? ""
                                    : "border-b"
                                    }`}
                                >{renderLink(dataItem)}</div>
                              ))}
                            </td>
                          ) : (
                            <td className="border border-slate-800">
                              <div className="py-2 px-4 text-gray-500">
                                No data found
                              </div>
                            </td>
                          )}

                          {item.anotherField7 &&
                            item.anotherField7.length > 0 && (
                              <td className="border border-slate-800">
                                {item.anotherField7.map((dataItem, index) => (
                                  <div
                                    key={index}
                                    className={`py-2 px-4 border-slate-800 hover:bg-gray-100 ${index === item.anotherField7.length - 1
                                      ? ""
                                      : "border-b"
                                      }`}
                                  >{renderLink(dataItem)}</div>
                                ))}
                              </td>
                            )}

                          {item.anotherField8 &&
                            item.anotherField8.length > 0 && (
                              <td className="border border-slate-800">
                                {item.anotherField8.map((dataItem, index) => (
                                  <div
                                    key={index}
                                    className={`py-2 px-4 border-slate-800 hover:bg-gray-100 ${index === item.anotherField8.length - 1
                                      ? ""
                                      : "border-b"
                                      }`}
                                  >{renderLink(dataItem)}</div>
                                ))}
                              </td>
                            )}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ) : null}

                {(item.heading9 ||
                  (item.anotherField2 && item.anotherField2.length > 0)) && (
                    <div className="border border-slate-800 mt-3">
                      {item.heading9 ? (
                        <h3 className="text-white bg-orange-600 p-4 font-bold text-center border border-slate-800 text-[1.2em]">
                          {item.heading9}
                        </h3>
                      ) : null}

                      <p className="">{item.para9}</p>

                      {item.anotherField2 && item.anotherField2.length > 0 ? (
                        <div className="flex flex-col items-center justify-center gap-4">
                          <table className="min-w-full bg-white border border-gray-300">
                            <tbody className="text-center">
                              <tr>
                                <td className="border border-slate-800">
                                  {item.anotherField2.map((dataItem, index) => (
                                    <div
                                      key={dataItem.id} // Unique key
                                      className={`py-2 px-4 border-slate-800 hover:bg-gray-100 w-full ${index === item.anotherField2.length - 1
                                        ? ""
                                        : "border-b"
                                        }`}
                                    >
                                      {renderLink(dataItem)}
                                    </div>
                                  ))}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      ) : null}
                    </div>
                  )}

                {(item.heading12 ||
                  (item.anotherField3 && item.anotherField3.length > 0)) && (
                    <div className="border border-slate-800 mt-4">
                      {item.heading12 ? (
                        <h3 className="text-white bg-orange-600 p-4 font-bold text-center border border-slate-800 text-[1.2em]">
                          {item.heading12}
                        </h3>
                      ) : null}

                      <p className="m">{item.para12}</p>

                      {item.anotherField3 && item.anotherField3.length > 0 && (
                        <div className="flex flex-col items-center justify-center gap-4">
                          <table className="min-w-full bg-white border border-gray-300">
                            <tbody className="text-center">
                              <tr>
                                <td className="border border-slate-800">
                                  {item.anotherField3.map((dataItem, index) => (
                                    <div
                                      key={index}
                                      className={`py-2 px-4 border-slate-800 hover:bg-gray-100 ${index === item.anotherField3.length - 1
                                        ? ""
                                        : "border-b"
                                        }`}
                                    >{renderLink(dataItem)}</div>
                                  ))}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}

                {(item.heading13 ||
                  (item.anotherField4 && item.anotherField4.length > 0)) && (
                    <div>
                      {item.heading13 ? (
                        <h3 className="mt-3 text-[1.2em]">{item.heading13}</h3>
                      ) : null}

                      <p className="mb-2 mt-4 text-gray-800">{item.para13}</p>

                      {item.anotherField4 && item.anotherField4.length > 0 && (
                        <div className="flex flex-col items-center justify-center gap-4">
                          <table className="min-w-full bg-white border border-gray-300">
                            <tbody className="text-center">
                              <tr>
                                <td className="border border-slate-800">
                                  {item.anotherField4.map((dataItem, index) => (
                                    <div
                                      key={index}
                                      className={`py-2 px-4 border-slate-800 hover:bg-gray-100 ${index === item.anotherField4.length - 1
                                        ? ""
                                        : "border-b"
                                        }`}
                                    >{renderLink(dataItem)}</div>
                                  ))}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  )}

                {item.heading14 ? ( // Check if item.heading24 has a value
                  (<h3 className="mt-3  text-[1.2em]">{item.heading14}</h3>)
                ) : null}
                <p className="mb-2 mt-4 text-gray-800">{item.para14}</p>

                {item.anotherField5 && item.anotherField5.length > 0 && (
                  <div className="flex flex-col items-center justify-center gap-4">
                    <table className="min-w-full bg-white border border-gray-300">
                      <tbody className="text-center">
                        <tr>
                          <td className="border border-slate-800">
                            {item.anotherField5.map((dataItem, index) => (
                              <div
                                key={index}
                                className={`py-2 px-4 border-slate-800 hover:bg-gray-100 ${index === item.anotherField5.length - 1
                                  ? ""
                                  : "border-b"
                                  }`}
                              >{renderLink(dataItem)}</div>
                            ))}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}

                {item.heading15 ? ( // Check if item.heading24 has a value
                  (<h3 className="mt-3  text-[1.2em]">{item.heading15}</h3>)
                ) : null}

                {item.list4 && item.list4.length > 0 && (
                  <ol className="list-disc text-orange-600 pl-5 mb-2">
                    {item.list4.map((listItem, index) => (
                      <li key={index} className="mb-1">
                        {listItem}
                      </li>
                    ))}
                  </ol>
                )}

                <p className="mb-2 mt-4 text-gray-800">{item.para15}</p>
                <p className="mb-2 mt-4 text-gray-800">{item.para16}</p>

                <div className="flex flex-col text-[.8em] mt-5 border border-slate-800 bg-white rounded-lg p-4">
                  <h3 className="mb-2 text-slate-800 mt-3 text-[1.2em] font-bold px-4">
                    {item.heading10}
                  </h3>
                  <p className="mb-5 ">{item.para10}</p>
                  {item.list3 && item.list3.length > 0 && (
                    <ol className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-4">
                      {item.list3.map((listItem, index) => {
                          let value = typeof listItem === "object" && listItem !== null ? listItem.value : listItem;
                          let route = typeof listItem === "object" && listItem !== null ? listItem.route : getRouteForTitle(value);
                          if (!value) return null;
                          return (
                            <li key={index} className="mb-1">
                              <Link href={route} className="block w-full h-full p-4 bg-gray-100 rounded shadow text-center hover:bg-gray-200 cursor-pointer font-semibold text-orange-600 border transition-all ease-in-out duration-150">
                                {value}
                              </Link>
                            </li>
                          );
                        })}
                    </ol>
                  )}
                </div>

                {item.imageUrls && item.imageUrls.length > 0 && (
                  <div className="flex gap-4 mt-4">
                    {item.imageUrls.map((imageUrl, index) => (
                      <Image
                        key={index}
                        src={imageUrl}
                        alt={`Image ${index + 1}`}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No data found for Class</p>
          )}
        </div>
        <div className="flex flex-col gap-5 w-full md:w-[35%]">
          <div className="w-full bg-white p-8 ">
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Type To Search"
              value={searchQuery}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="placeholder:text-gray-500 p-3 w-full  rounded-md border border-gray-400"
            />
          </div>

          <div className=" bg-white p-5  rounded-lg">
            <FormSection />
          </div>
        </div>
      </div>
      <DynamicFAQSection slug={currentSlug} />
      <Sociallinks2 />
      <Footer1 />
      <Footer />
    </div>
  </>);
};

export default DataTable;