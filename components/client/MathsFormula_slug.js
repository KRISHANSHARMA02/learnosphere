  "use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import Navbar from "@/components/Navbar";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, use } from "react";
import Banner from "@/public/Banner.jpeg";
import Logo from "@/public/Logo.png";

import Link from "next/link";
import Footer1 from "@/components/Footer1";
import Footer from "@/components/Footer";
import { FaTimes, FaWhatsapp, FaChevronDown, FaChevronUp } from "react-icons/fa";
import WhatsappModal from "@/components/whatsappModal";
import AOS from "aos";
import "aos/dist/aos.css";
import FormSection from "@/components/FormGeneral";
import PageNotFound from "@/app/not-found";
// 

const DataTable = props => {
  const params = use(props.params);
  const [Class, setClass] = useState(null);
  const { slug } = params;
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
  useEffect(() => {
    // Check if we are in the browser before accessing window
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      setClass(searchParams.get("Class"));
    }
  }, []);

  const [data, setData] = useState([]);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showButton, setShowButton] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowButton((prev) => !prev);
    }, 100000000); // Toggle every 10 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out" }); // Initialize AOS with smooth settings
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `${WEB_BACKEND_URL}/api/route/subjectcontent/${slug}`
        );
        if (response.data && response.data.data && response.data.data.length > 0) {
          setData(response.data.data);
        } else {
          setData([]);
          setError("Subject content not found");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching data.");
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchData();
  }, [slug]);

  if (loading) {
    return <div className="text-gray-600">Loading...</div>;
  }

  if (!loading && (!data || data.length === 0 || error)) {
    return <PageNotFound />;
  }

  

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 font-Poppins">
        <div className=" px-4 md:px-28 flex flex-col md:flex-row gap-6 bg-gray-100 container mx-auto pt-24">
          <div className="flex flex-col gap-5 w-full md:w-[65%]">
            <div className="fixed right-8 top-[650px] md:top-[550px] flex flex-col items-center space-y-4">
              {/* WhatsApp Modal */}
              {showButton && (
                <div
                  data-aos="fade-up"
                  className="absolute bottom-10 md:bottom-16 right-0 md:-left-[390px] 2xl:right-1 xl:-left-[370px] rounded-lg p-4 transition-transform transform duration-500 ease-in-out"
                >
                  <div className="relative">
                    {/* Close Icon */}
                    <FaTimes
                      size={18}
                      className="absolute top-2 right-0 text-white cursor-pointer"
                      onClick={() => setShowButton(false)} // Close the modal
                    />
                    <WhatsappModal />
                  </div>
                </div>
              )}

              {/* WhatsApp Icon */}
              <FaWhatsapp
                size={48}
                className="text-white bg-green-500 p-2 rounded-full cursor-pointer hover:scale-110 transition-transform duration-300"
                onClick={() => setShowButton(!showButton)} // Toggle modal visibility
              />
            </div>
            {data.length > 0 ? (
              data.map((item) => (
                <div key={item.id} className="mb-4">
                  <div className="flex items-center gap-4 bg-orange-600 p-4 rounded-lg shadow-md mb-4">
                    <h1 className="text-white text-[1.4em] font-bold flex-1">
                      {item.heading1}
                    </h1>
                    <Image src={Logo} alt="Learnosphere Logo" width={80} height={80} className="bg-white rounded-lg p-1 shadow-sm" />
                  </div>
                  {/* Global PDF viewer if page itself has a pdfUrl */}
                  {item.pdfUrl && (
                    <div className="mb-6">
                      <a href={item.pdfUrl} target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
                        View / Download Sample Paper PDF
                      </a>
                    </div>
                  )}
                  <p className="mb-2 mt-4 text-gray-800 whitespace-pre-line">{item.para1}</p>

                  {item.list1 && item.list1.length > 0 && (
                    <ol className="list-disc text-orange-600 pl-5 mb-2">
                      {item.list1.map((listItem, index) => (
                        <li key={index} className="mb-1">
                          {item.anotherField && item.anotherField[0]?.chapterNumber ? (
                            <a href={`#chapter-${index + 1}`} className="hover:underline">{listItem}</a>
                          ) : (
                            listItem
                          )}
                        </li>
                      ))}
                    </ol>
                  )}

                  {item.anotherField && item.anotherField.length > 0 && typeof item.anotherField[0] === 'object' && item.anotherField[0]?.chapterNumber ? (
                    <>
                      {/* Quick Reference Section */}
                      {item.heading2 && (
                        <h2 className="mb-2 mt-6 text-slate-800 text-[1.25em] font-bold">
                          {item.heading2}
                        </h2>
                      )}
                      {item.para12 && <p className="mb-4 text-gray-700">{item.para12}</p>}

                      {/* Quick Reference Table */}
                      {item.anotherField2 && item.anotherField2.length > 0 && (
                        <div className="overflow-x-auto my-4">
                          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
                            <tbody>
                              {item.anotherField2.map((concept, index) => {
                                const formula = item.anotherField3 && item.anotherField3[index];
                                if (index === 0) {
                                  return (
                                    <tr key={index} className="bg-orange-600 text-white font-bold">
                                      <td className="border border-orange-700 py-2.5 px-4">{concept}</td>
                                      <td className="border border-orange-700 py-2.5 px-4">{formula}</td>
                                    </tr>
                                  );
                                }
                                return (
                                  <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                    <td className="border border-gray-300 py-2 px-4 font-medium text-slate-800">{concept}</td>
                                    <td className="border border-gray-300 py-2 px-4 font-mono font-semibold text-orange-600">{formula}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {item.para13 && (
                        <p className="mb-6 text-sm text-gray-600 italic bg-gray-50 border-l-4 border-orange-400 p-3 rounded-r">
                          {item.para13}
                        </p>
                      )}

                      {/* Chapter-wise Class 6 Maths Formulas and Rules */}
                      {item.heading8 && (
                        <h2 className="mb-2 mt-8 text-slate-800 text-[1.3em] font-bold border-b-2 border-orange-500 pb-2">
                          {item.heading8}
                        </h2>
                      )}
                      {item.para26 && <p className="mb-6 text-gray-700">{item.para26}</p>}

                      {/* Detailed Chapters 1 to 10 */}
                      <div className="space-y-8">
                        {item.anotherField.map((ch) => (
                          <div key={ch.chapterNumber} id={`chapter-${ch.chapterNumber}`} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                            <h3 className="text-xl font-bold text-orange-600 mb-2">
                              {ch.title}
                            </h3>
                            {ch.description && <p className="text-gray-700 mb-4">{ch.description}</p>}
                            {ch.introNote && <p className="text-sm italic text-gray-600 bg-amber-50 border-l-4 border-amber-400 p-2.5 rounded-r mb-4">{ch.introNote}</p>}

                            {ch.sectionHeading && (
                              <h4 className="text-lg font-semibold text-slate-800 mb-3 border-l-4 border-orange-500 pl-2">
                                {ch.sectionHeading}
                              </h4>
                            )}

                            {ch.items && (
                              <div className="space-y-4">
                                {ch.items.map((itemObj, i) => (
                                  <div key={i} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                    <h5 className="font-bold text-slate-800 text-base mb-1">{itemObj.title}</h5>
                                    {itemObj.desc && <p className="text-gray-700 text-sm mb-2">{itemObj.desc}</p>}
                                    {itemObj.rule && (
                                      <div className="text-sm bg-orange-50 text-orange-800 px-3 py-1.5 rounded border border-orange-200 inline-block mb-2 font-mono">
                                        Rule: {itemObj.rule}
                                      </div>
                                    )}
                                    {itemObj.formula && (
                                      <div className="text-sm bg-amber-50 text-amber-900 px-3 py-1.5 rounded border border-amber-300 inline-block mb-2 font-mono font-semibold">
                                        Formula: {itemObj.formula}
                                      </div>
                                    )}
                                    {itemObj.example && (
                                      <div className="text-sm text-gray-700 bg-white border border-gray-200 p-2 rounded whitespace-pre-line mb-1">
                                        <span className="font-semibold text-slate-700">Example: </span>{itemObj.example}
                                      </div>
                                    )}
                                    {itemObj.examples && Array.isArray(itemObj.examples) ? (
                                      <div className="text-sm text-gray-700 bg-white border border-gray-200 p-2 rounded mb-1">
                                        <span className="font-semibold text-slate-700">Examples: </span>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 mt-1 font-mono text-xs text-orange-700">
                                          {itemObj.examples.map((ex, eIdx) => <div key={eIdx} className="bg-gray-50 px-2 py-1 rounded">{ex}</div>)}
                                        </div>
                                      </div>
                                    ) : itemObj.examples && (
                                      <div className="text-sm text-gray-700 bg-white border border-gray-200 p-2 rounded mb-1">
                                        <span className="font-semibold text-slate-700">Examples: </span>{itemObj.examples}
                                      </div>
                                    )}
                                    {itemObj.bullets && (
                                      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 my-2">
                                        {itemObj.bullets.map((b, bIdx) => <li key={bIdx}>{b}</li>)}
                                      </ul>
                                    )}
                                    {itemObj.note && <p className="text-xs text-gray-500 italic mt-2">{itemObj.note}</p>}
                                  </div>
                                ))}
                              </div>
                            )}

                            {ch.factsHeading && (
                              <h4 className="text-lg font-semibold text-slate-800 mt-6 mb-3 border-l-4 border-orange-500 pl-2">
                                {ch.factsHeading}
                              </h4>
                            )}
                            {ch.facts && (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                                {ch.facts.map((fact, fIdx) => (
                                  <div key={fIdx} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                                    <span className="font-bold text-slate-800 text-sm block mb-1">{fact.title}</span>
                                    <span className="text-gray-700 text-sm">{fact.desc}</span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {ch.solvedExample && (
                              <div className="bg-blue-50/70 border border-blue-200 rounded-lg p-4 my-4">
                                <h5 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                                  <span>Solved Example</span>
                                </h5>
                                <p className="font-semibold text-slate-800 text-sm mb-2">{ch.solvedExample.question}</p>
                                <div className="bg-white border border-blue-100 rounded p-3 text-sm text-gray-700 space-y-1 font-mono">
                                  {ch.solvedExample.solution.map((step, sIdx) => (
                                    <div key={sIdx} className={step.startsWith("Answer") ? "font-bold text-orange-600 pt-1" : ""}>
                                      {step}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {ch.table && (
                              <div className="my-4">
                                <h5 className="font-bold text-slate-800 text-sm mb-2">{ch.table.title}</h5>
                                <div className="overflow-x-auto">
                                  <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
                                    <thead>
                                      <tr className="bg-orange-600 text-white font-bold text-sm">
                                        {ch.table.headers.map((h, hIdx) => (
                                          <th key={hIdx} className="border border-orange-700 py-2 px-4 text-left">{h}</th>
                                        ))}
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {ch.table.rows.map((row, rIdx) => (
                                        <tr key={rIdx} className={rIdx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                          {row.map((cell, cIdx) => (
                                            <td key={cIdx} className="border border-gray-300 py-2 px-4 text-sm text-gray-800">
                                              {cell}
                                            </td>
                                          ))}
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                                {ch.table.example && (
                                  <div className="text-sm text-gray-700 bg-gray-50 border border-gray-200 p-3 rounded mt-2 whitespace-pre-line font-mono">
                                    {ch.table.example}
                                  </div>
                                )}
                                {ch.table.remember && (
                                  <div className="bg-amber-50 border-l-4 border-amber-400 p-3 rounded-r mt-3">
                                    <span className="font-bold text-xs uppercase tracking-wider text-amber-800 block mb-1">Remember:</span>
                                    <ul className="list-disc pl-5 text-sm text-amber-900 space-y-1">
                                      {ch.table.remember.map((rem, rIdx) => <li key={rIdx}>{rem}</li>)}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            )}

                            {ch.commonFactorsHeading && (
                              <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
                                <h5 className="font-bold text-slate-800 text-base mb-2">{ch.commonFactorsHeading}</h5>
                                {ch.commonFactorsBullets && (
                                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 mb-2">
                                    {ch.commonFactorsBullets.map((b, bIdx) => <li key={bIdx}>{b}</li>)}
                                  </ul>
                                )}
                                {ch.commonFactorsExample && (
                                  <div className="text-sm bg-white border border-gray-200 p-2.5 rounded font-mono text-gray-700 whitespace-pre-line">
                                    {ch.commonFactorsExample}
                                  </div>
                                )}
                              </div>
                            )}

                            {ch.perimeterHeading && (
                              <div className="mt-4">
                                <h4 className="text-base font-bold text-slate-800 mb-2 border-l-4 border-orange-500 pl-2">{ch.perimeterHeading}</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  {ch.perimeterItems.map((pi, pIdx) => (
                                    <div key={pIdx} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                                      <span className="font-bold text-slate-800 text-sm block mb-1">{pi.title}</span>
                                      <span className="text-xs bg-amber-50 text-amber-900 border border-amber-200 font-mono px-2 py-0.5 rounded inline-block mb-1">{pi.formula}</span>
                                      {pi.example && <p className="text-xs text-gray-600 mt-1">{pi.example}</p>}
                                      {pi.note && <p className="text-xs text-gray-500 italic mt-1">{pi.note}</p>}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            {ch.areaHeading && (
                              <div className="mt-4">
                                <h4 className="text-base font-bold text-slate-800 mb-2 border-l-4 border-orange-500 pl-2">{ch.areaHeading}</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  {ch.areaItems.map((ai, aIdx) => (
                                    <div key={aIdx} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                                      <span className="font-bold text-slate-800 text-sm block mb-1">{ai.title}</span>
                                      <span className="text-xs bg-amber-50 text-amber-900 border border-amber-200 font-mono px-2 py-0.5 rounded inline-block mb-1">{ai.formula}</span>
                                      {ai.example && <p className="text-xs text-gray-600 mt-1">{ai.example}</p>}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {ch.remindersHeading && (
                              <div className="mt-4 bg-orange-50/60 border border-orange-200 rounded-lg p-4">
                                <h5 className="font-bold text-orange-900 mb-2">{ch.remindersHeading}</h5>
                                {ch.reminders && (
                                  <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700">
                                    {ch.reminders.map((rem, rIdx) => <li key={rIdx}>{rem}</li>)}
                                  </ul>
                                )}
                              </div>
                            )}

                            {ch.pointsHeading && (
                              <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
                                <h5 className="font-bold text-slate-800 mb-2">{ch.pointsHeading}</h5>
                                {ch.points && (
                                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 mb-2">
                                    {ch.points.map((pt, pIdx) => <li key={pIdx}>{pt}</li>)}
                                  </ul>
                                )}
                                {ch.example && (
                                  <p className="text-sm text-slate-700 italic border-t border-gray-200 pt-2 mt-2">
                                    <span className="font-semibold not-italic">Example: </span>{ch.example}
                                  </p>
                                )}
                              </div>
                            )}

                            {ch.note && <p className="text-xs text-gray-500 italic mt-3">{ch.note}</p>}
                            {ch.summary && <p className="text-xs text-gray-600 italic bg-gray-50 border-l-2 border-gray-400 p-2 rounded mt-3">{ch.summary}</p>}
                          </div>
                        ))}
                      </div>

                      {/* Common Mistakes Section */}
                      {item.heading7 && (
                        <div className="mt-8 bg-red-50/50 border border-red-200 rounded-xl p-6 shadow-sm">
                          <h2 className="text-xl font-bold text-red-900 mb-2">
                            {item.heading7}
                          </h2>
                          {item.para21 && <p className="text-gray-700 mb-4">{item.para21}</p>}
                          {item.anotherField7 && item.anotherField7.length > 0 && (
                            <ol className="space-y-2">
                              {item.anotherField7.map((mistake, mIdx) => (
                                <li key={mIdx} className="flex items-start gap-3 bg-white border border-red-100 rounded-lg p-3 text-sm text-slate-800">
                                  <span className="w-6 h-6 rounded-full bg-red-100 text-red-700 font-bold flex items-center justify-center shrink-0 text-xs">
                                    {mIdx + 1}
                                  </span>
                                  <span>{typeof mistake === 'string' ? mistake.replace(/^\d+\.\s*/, '') : JSON.stringify(mistake)}</span>
                                </li>
                              ))}
                            </ol>
                          )}
                        </div>
                      )}

                      {/* How to Learn and Revise Section */}
                      {item.heading15 && (
                        <div className="mt-8 bg-emerald-50/50 border border-emerald-200 rounded-xl p-6 shadow-sm">
                          <h2 className="text-xl font-bold text-emerald-900 mb-2">
                            {item.heading15}
                          </h2>
                          {item.para28 && <p className="text-gray-700 mb-4">{item.para28}</p>}
                          {item.anotherField8 && item.anotherField8.length > 0 && (
                            <ol className="space-y-2">
                              {item.anotherField8.map((tip, tIdx) => (
                                <li key={tIdx} className="flex items-start gap-3 bg-white border border-emerald-100 rounded-lg p-3 text-sm text-slate-800">
                                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0 text-xs">
                                    {tIdx + 1}
                                  </span>
                                  <span>{typeof tip === 'string' ? tip.replace(/^\d+\.\s*/, '') : JSON.stringify(tip)}</span>
                                </li>
                              ))}
                            </ol>
                          )}
                        </div>
                      )}

                      {/* Frequently Asked Questions Section */}
                      {item.heading16 && (
                        <div className="mt-8 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                          <h2 className="text-xl font-bold text-slate-800 mb-4 pb-2 border-b border-gray-200">
                            {item.heading16}
                          </h2>
                          {item.anotherField9 && item.anotherField9.length > 0 && (
                            <div className="space-y-3">
                              {item.anotherField9.map((faq, fIdx) => (
                                <div key={fIdx} className="border border-gray-200 rounded-lg overflow-hidden transition">
                                  <button
                                    type="button"
                                    onClick={() => setOpenFaq(openFaq === fIdx ? null : fIdx)}
                                    className="w-full flex justify-between items-center p-4 text-left font-semibold text-slate-800 bg-gray-50 hover:bg-orange-50 hover:text-orange-600 transition"
                                  >
                                    <span className="text-sm sm:text-base">{faq.question}</span>
                                    <span className="text-orange-600 font-bold text-lg ml-2">
                                      {openFaq === fIdx ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
                                    </span>
                                  </button>
                                  {openFaq === fIdx && (
                                    <div className="p-4 bg-white text-gray-700 text-sm border-t border-gray-200 leading-relaxed">
                                      <p>{faq.answer}</p>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                  <h1 className="mb-2 text-slate-800 text-[1.2em]">
                    {item.heading2}
                  </h1>
                  <p className="mb-2 mt-4 text-gray-800">{item.para12}</p>
                  <h1 className="mb-2 text-slate-800 text-[1.2em]">
                    {item.heading8}
                  </h1>
                  <p className="mb-2 mt-4 text-gray-800">{item.para13}</p>
                  <p className="mb-2 mt-4 text-gray-800">{item.para26}</p>
                  {item.list2 && item.list2.length > 0 && (
                    <ol className="list-disc text-orange-600 pl-5 mb-2">
                      {item.list2.map((listItem, index) => (
                        <li key={index} className="mb-1">
                          {listItem}
                        </li>
                      ))}
                    </ol>
                  )}

                  <div className="grid gap-4">
                  <h1 className="text-slate-800 text-[1.2em]">{item.heading5}</h1>
                  <p className="">{item.para27}</p>
                
                  {/* Table 1 */}
                  {(item.tableData && item.tableData.length > 0) && (
                    <table className="min-w-full bg-white border border-gray-300 table-fixed">
                      <tbody>
                        {item.tableData.map((theorem, index) => (
                          <tr key={index}>
                            <td className="border border-slate-800 py-2 px-4 align-top">
                              {typeof theorem === 'string' ? theorem : (theorem.title ? <a href={theorem.pdfUrl || '#'} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-orange-600">{theorem.title}</a> : JSON.stringify(theorem))}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                
                  {/* Table 2 */}
                  {(item.anotherField && item.anotherField.length > 0) && (
                    <table className="min-w-full bg-white border border-gray-300 table-fixed">
                      <tbody>
                        {item.anotherField.map((data, index) => (
                          <tr key={index}>
                            <td className="border border-slate-800 py-2 px-4 align-top">
                              {typeof data === 'string' ? data : (data.title ? <a href={data.pdfUrl || '#'} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-orange-600">{data.title}</a> : JSON.stringify(data))}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
                

                  <h1 className="mb-2 text-slate-800 mt-3 text-[1.2em]">
                    {item.heading6}
                  </h1>
                  {item.anotherField1 && item.anotherField1.length > 0 && (
                    <div className="grid gap-4 mt-6">
                      <table className="min-w-full bg-white border border-gray-300">
                        <tbody>
                          <tr>
                            <td className="border border-slate-800">
                              {item.anotherField1.map((dataItem, index) => (
                                <div
                                  key={index}
                                  className={`py-2 px-4 ${
                                    index === item.anotherField1.length - 1
                                      ? ""
                                      : "border-b border-slate-800"
                                  } hover:bg-gray-100`}
                                >
                                  {dataItem}
                                </div>
                              ))}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}

                  <h1 className=" mt-3 mb-2 text-slate-800 text-[1.2em]">
                    {item.heading3}
                  </h1>

                  <div className="grid gap-4">
                  {/* Check if there's any data in the fields */}
                  {item.anotherField2.some((value) => value) ||
                    item.anotherField3.some((value) => value) ||
                    item.anotherField4.some((value) => value) ||
                    item.anotherField20.some((value) => value) ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white border border-gray-300 table-fixed">
                        <tbody>
                          {item.anotherField2.map((_, index) => {
                            // Check if the current row has data in at least one field
                            const hasData =
                              (item.anotherField2 && item.anotherField2[index]) ||
                              (item.anotherField3 && item.anotherField3[index]) ||
                              (item.anotherField4 && item.anotherField4[index]) ||
                              (item.anotherField20 && item.anotherField20[index]);

                            // Render rows only with data
                            if (hasData) {
                              return (
                                <tr key={index} className="align-top">
                                  {/* Render first column only if data exists */}
                                  {item.anotherField2 && item.anotherField2[index] ? (
                                    <td className="border border-slate-800 py-2 px-4 align-top">
                                      {item.anotherField2[index]}
                                    </td>
                                  ) : null}

                                  {/* Render second column only if data exists */}
                                  {item.anotherField3 && item.anotherField3[index] ? (
                                    <td className="border border-slate-800 py-2 px-4 align-top">
                                      {item.anotherField3[index]}
                                    </td>
                                  ) : null}

                                  {/* Render third column only if data exists */}
                                  {item.anotherField4 && item.anotherField4[index] ? (
                                    <td className="border border-slate-800 py-2 px-4 align-top">
                                      {item.anotherField4[index]}
                                    </td>
                                  ) : null}
                                  {item.anotherField20 && item.anotherField20[index] ? (
                                    <td className="border border-slate-800 py-2 px-4 align-top">
                                      {item.anotherField20[index]}
                                    </td>
                                  ) : null}
                                </tr>
                              );
                            }
                            return null; // Skip rows without data
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : null}
                </div>

                  <div className="grid mt-4">
                    {item.anotherField7 && item.anotherField7.length > 0 ? (
                      <>
                        <h1 className="mb-2 text-slate-800 text-[1.2em]">
                          {item.heading7}
                        </h1>
                        <table className="min-w-full text-black bg-white border border-gray-300">
                          <tbody>
                            <tr>
                              <td className="border border-slate-800">
                                {item.anotherField7.map((dataItem, index) => (
                                  <div
                                    key={index}
                                    className={`py-2 px-4 ${
                                      index === item.anotherField7.length - 1
                                        ? ""
                                        : "border-b border-slate-800"
                                    } hover:bg-gray-100`}
                                  >
                                    {dataItem}
                                  </div>
                                ))}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </>
                    ) : null}
                  </div>

                  <h1 className="mb-2 text-slate-800 text-[1.2em] mt-4">
                    {item.heading4}
                  </h1>
                  {Array.from({ length: 10 }).map((_, idx) => (
                    <p key={idx} className="mb-2 mt-4 text-gray-800">
                      {item[`para${idx + 2}`]}
                    </p>
                  ))}

                  <div className="grid">
                    <h1 className="mb-2 text-slate-800 text-[1.2em] mt-4">
                      {item.heading9}
                    </h1>
                    <p className="text-[1.2em] font-bold">{item.para11}</p>
                    <div className="grid gap-4">
                    {/* Check if there's any data in the fields */}
                    {item.anotherField5.some((value) => value) ||
                      item.anotherField6.some((value) => value) ? (
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300 table-fixed">
                          <tbody>
                            {item.anotherField5.map((_, index) => {
                              // Check if the current row has data in at least one field
                              const hasData =
                                (item.anotherField5 && item.anotherField5[index]) ||
                                (item.anotherField6 && item.anotherField6[index]);

                              // Render rows only with data
                              if (hasData) {
                                return (
                                  <tr key={index} className="align-top">
                                    {/* Render first column only if data exists */}
                                    {item.anotherField5 && item.anotherField5[index] ? (
                                      <td className="border border-slate-800 py-2 px-4 align-top">
                                        {item.anotherField5[index]}
                                      </td>
                                    ) : null}

                                    {/* Render second column only if data exists */}
                                    {item.anotherField6 && item.anotherField6[index] ? (
                                      <td className="border border-slate-800 py-2 px-4 align-top">
                                        {item.anotherField6[index]}
                                      </td>
                                    ) : null}

                                    {/* Render third column only if data exists */}
                                  
                                  </tr>
                                );
                              }
                              return null; // Skip rows without data
                            })}
                          </tbody>
                        </table>
                      </div>
                    ) : null}
                  </div>
                    {/* Render nothing if there's no data */}
                  </div>
                  <h1 className="mb-2 text-slate-800 text-[1.2em] mt-4">
                    {item.heading10}
                  </h1>
                  {item.list4 && item.list4.length > 0 && (
                    <ol className="  list-disc  px-12 mt-2  w-full  mb-2">
                      {item.list4.map((listItem, index) => (
                        <li key={index} className="mb-1  rounded-lg">
                          {listItem}
                        </li>
                      ))}
                    </ol>
                  )}
                  <h1 className="mb-2 text-slate-800 text-[1.2em] mt-4">
                    {item.heading11}
                  </h1>
                  {item.list5 && item.list5.length > 0 && (
                    <ol className="  list-disc  px-12 mt-2  w-full  mb-2">
                      {item.list5.map((listItem, index) => (
                        <li key={index} className="mb-1  rounded-lg">
                          {listItem}
                        </li>
                      ))}
                    </ol>
                  )}
                  <h1 className="mb-2 text-slate-800 text-[1.2em] mt-4">
                    {item.heading12}
                  </h1>
                  <p className="mb-2 mt-4 text-gray-800">{item.para14}</p>
                  {item.para15 ? (
                    <p className="font-bold text-center mt-3 bg-gray-200 rounded-lg border  border-black p-3">
                      {item.para15}
                    </p>
                  ) : null}

                  <p className="mt-3">{item.para16}</p>
                  {item.para17 ? (
                    <p className="font-bold text-center mt-3 bg-gray-200 rounded-lg border border-black p-3">
                      {item.para17}
                    </p>
                  ) : null}

                  <h1 className="mb-2 text-slate-800 text-[1.2em] mt-4">
                    {item.heading13}
                  </h1>
                  <p className="mb-2 mt-4 text-gray-800">{item.para18}</p>
                  <p className="mb-2 mt-4 text-gray-800">{item.para19}</p>

                  {item.list6 && item.list6.length > 0 && (
                    <ol className="  list-disc  px-12 mt-2  w-full  mb-2">
                      {item.list6.map((listItem, index) => (
                        <li key={index} className="mb-1  rounded-lg">
                          {listItem}
                        </li>
                      ))}
                    </ol>
                  )}
                  <p className="mb-2 mt-4 text-gray-800">{item.para20}</p>
                  <h1 className="mb-2 text-slate-800 text-[1.2em] mt-4">
                    {item.heading14}
                  </h1>
                  <div className="grid gap-4">
                  {/* Check if there's any data in the fields */}
                  {item.anotherField8.some((value) => value) ||
                    item.anotherField9.some((value) => value) ||
                    item.anotherField10.some((value) => value) ||
                    item.anotherField11.some((value) => value) ||
                    item.anotherField12.some((value) => value) ||
                    item.anotherField13.some((value) => value) ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white border border-gray-300 table-fixed">
                        <tbody>
                          {item.anotherField8.map((_, index) => {
                            // Check if the current row has data in at least one field
                            const hasData =
                              (item.anotherField8 && item.anotherField8[index]) ||
                              (item.anotherField9 && item.anotherField9[index]) ||
                              (item.anotherField10 && item.anotherField10[index]) ||
                              (item.anotherField11 && item.anotherField11[index]) ||
                              (item.anotherField12 && item.anotherField12[index]) ||
                              (item.anotherField13 && item.anotherField13[index]);

                            // Render rows only with data
                            if (hasData) {
                              return (
                                <tr key={index} className="align-top">
                                  {/* Render first column only if data exists */}
                                  {item.anotherField8 && item.anotherField8[index] ? (
                                    <td className="border border-slate-800 py-2 px-4 align-top">
                                      {item.anotherField8[index]}
                                    </td>
                                  ) : null}
                                  {item.anotherField9 && item.anotherField9[index] ? (
                                    <td className="border border-slate-800 py-2 px-4 align-top">
                                      {item.anotherField9[index]}
                                    </td>
                                  ) : null}
                                  {item.anotherField10 && item.anotherField10[index] ? (
                                    <td className="border border-slate-800 py-2 px-4 align-top">
                                      {item.anotherField10[index]}
                                    </td>
                                  ) : null}
                                  {item.anotherField11 && item.anotherField11[index] ? (
                                    <td className="border border-slate-800 py-2 px-4 align-top">
                                      {item.anotherField11[index]}
                                    </td>
                                  ) : null}

                                  {/* Render second column only if data exists */}
                                  {item.anotherField12 && item.anotherField12[index] ? (
                                    <td className="border border-slate-800 py-2 px-4 align-top">
                                      {item.anotherField12[index]}
                                    </td>
                                  ) : null}

                                  {/* Render third column only if data exists */}
                                  {item.anotherField13 && item.anotherField13[index] ? (
                                    <td className="border border-slate-800 py-2 px-4 align-top">
                                      {item.anotherField13[index]}
                                    </td>
                                  ) : null}
                                </tr>
                              );
                            }
                            return null; // Skip rows without data
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : null}
                </div>

                  <h1 className="mb-2 text-slate-800 text-[1.2em] mt-4">
                    {item.heading15}
                  </h1>
                  <p className="mb-2 mt-4 text-gray-800">{item.para28}</p>

                  {item.list9 && item.list9.length > 0 && (
                    <ol className="  list-disc  px-12 mt-2  w-full  mb-2">
                      {item.list9.map((listItem, index) => (
                        <li key={index} className="mb-1  rounded-lg">
                          {listItem}
                        </li>
                      ))}
                    </ol>
                  )}
                  {item.list7 && item.list7.length > 0 && (
                    <ol className="  list-disc  px-12 mt-2  w-full  mb-2">
                      {item.list7.map((listItem, index) => (
                        <li key={index} className="mb-1  rounded-lg">
                          {listItem}
                        </li>
                      ))}
                    </ol>
                  )}
                  <h1 className="mb-2 text-slate-800 text-[1.2em] mt-4">
                    {item.heading16}
                  </h1>
                  {item.list8 && item.list8.length > 0 && (
                    <ol className="  list-disc  px-12 mt-2  w-full  mb-2">
                      {item.list8.map((listItem, index) => (
                        <li key={index} className="mb-1  rounded-lg">
                          {listItem}
                        </li>
                      ))}
                    </ol>
                  )}

                  <h1 className="mb-2 text-slate-800 text-[1.2em] mt-4">
                    {item.heading17}
                  </h1>
                  <p className="mb-2 mt-4 text-gray-800">{item.para21}</p>

                  <p className=" text-orange-600 mt-4 mb-2">{item.para22}</p>
                  <div className="grid gap-4">
                  {/* Check if there's any data in the fields */}
                  {item.anotherField14.some((value) => value) ||
                    item.anotherField15.some((value) => value) ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white border border-gray-300 table-fixed">
                        <tbody>
                          {item.anotherField14.map((_, index) => {
                            // Check if the current row has data in at least one field
                            const hasData =
                              (item.anotherField14 && item.anotherField14[index]) ||
                              (item.anotherField15 && item.anotherField15[index]);

                            // Render rows only with data
                            if (hasData) {
                              return (
                                <tr key={index} className="align-top">
                                  {/* Render first column only if data exists */}
                                  {item.anotherField14 && item.anotherField14[index] ? (
                                    <td className="border border-slate-800 py-2 px-4 align-top">
                                      {item.anotherField14[index]}
                                    </td>
                                  ) : null}

                                  {/* Render second column only if data exists */}
                                  {item.anotherField15 && item.anotherField15[index] ? (
                                    <td className="border border-slate-800 py-2 px-4 align-top">
                                      {item.anotherField15[index]}
                                    </td>
                                  ) : null}

                                
                                </tr>
                              );
                            }
                            return null; // Skip rows without data
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : null}
                </div>

                  <p className=" text-orange-600 mb-2 mt-4">{item.para23}</p>

                  <div className="grid gap-4">
                  {/* Check if there's any data in the fields */}
                  {item.anotherField16.some((value) => value) ||
                    item.anotherField17.some((value) => value) ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white border border-gray-300 table-fixed">
                        <tbody>
                          {item.anotherField16.map((_, index) => {
                            // Check if the current row has data in at least one field
                            const hasData =
                              (item.anotherField16 && item.anotherField16[index]) ||
                              (item.anotherField17 && item.anotherField17[index]);

                            // Render rows only with data
                            if (hasData) {
                              return (
                                <tr key={index} className="align-top">
                                  {/* Render first column only if data exists */}
                                  {item.anotherField16 && item.anotherField16[index] ? (
                                    <td className="border border-slate-800 py-2 px-4 align-top">
                                      {item.anotherField16[index]}
                                    </td>
                                  ) : null}

                                  {/* Render second column only if data exists */}
                                  {item.anotherField17 && item.anotherField17[index] ? (
                                    <td className="border border-slate-800 py-2 px-4 align-top">
                                      {item.anotherField17[index]}
                                    </td>
                                  ) : null}

                                </tr>
                              );
                            }
                            return null; // Skip rows without data
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : null}
                </div>

                  <p className=" text-orange-600 mt-4 mb-2">{item.para24}</p>
                  <div className="grid gap-4">
                  {/* Check if there's any data in the fields */}
                  {item.anotherField18.some((value) => value) ||
                    item.anotherField19.some((value) => value) ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white border border-gray-300 table-fixed">
                        <tbody>
                          {item.anotherField18.map((_, index) => {
                            // Check if the current row has data in at least one field
                            const hasData =
                              (item.anotherField18 && item.anotherField18[index]) ||
                              (item.anotherField19 && item.anotherField19[index]);

                            // Render rows only with data
                            if (hasData) {
                              return (
                                <tr key={index} className="align-top">
                                  {/* Render first column only if data exists */}
                                  {item.anotherField18 && item.anotherField18[index] ? (
                                    <td className="border border-slate-800 py-2 px-4 align-top">
                                      {item.anotherField18[index]}
                                    </td>
                                  ) : null}

                                  {/* Render second column only if data exists */}
                                  {item.anotherField19 && item.anotherField19[index] ? (
                                    <td className="border border-slate-800 py-2 px-4 align-top">
                                      {item.anotherField19[index]}
                                    </td>
                                  ) : null}

                                 
                                </tr>
                              );
                            }
                            return null; // Skip rows without data
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : null}
                </div>
                    </>
                  )}

                  <div key={item.id} className="mb-4">
                    {item.heading21 && (
                      <h1 className="mb-2 p-4 text-black text-[.92m] font-bold">
                        {item.heading21}
                      </h1>
                    )}
                    {item.list3 && item.list3.length > 0 && (
                      <ol className="flex flex-wrap gap-2 w-full p-4 border border-slate-800 rounded-xl text-orange-600 mb-2">
                        {item.list3.map((listItem, index) => (
                          <li
                            key={listItem.id}
                            className="mb-1 w-[48%] p-4 rounded-lg font-semibold hover:bg-orange-600 hover:font-bold hover:text-white transition-all ease-in-out duration-150"
                          >
                            <div
                              className={`py-2 px-4 w-full ${
                                index === item.list3.length - 1 ? "" : " text-[.8em]"
                              }`}
                            >
                              <Link
                                className="w-full block text-center"
                                href={`/Mathematicstopic/${listItem.slug || encodeURIComponent(listItem.value.toLowerCase().replace(/\s+/g, '-'))}`}
                              >
                                {listItem.value} {/* Access the value of each item */}
                              </Link>
                            </div>
                          </li>
                        ))}
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
                          width={1000}
                          height={1000}
                          className="w-full  h-32  rounded-lg"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <PageNotFound />
            )}
            
            
            </div>
            <div className="flex flex-col gap-5 w-full md:w-[35%] font-Poppins">
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
            <div className="bg-white p-6 flex flex-col gap-3">
              <h2 className="font-semibold text-[1.1em]">CBSE Sample Papers</h2>
              <ul className="list-disc flex flex-col gap-2 text-[.9em] text-orange-500 px-4">
                <Link href="/CBSE-Sample-Papers/CBSE-Sample-Papers-for-Class-8-Maths">
                  <li>CBSE Sample Papers Class 8 Maths</li>
                </Link>
                <Link href="/CBSE-Sample-Papers/CBSE-Sample-Papers-for-Class-9-Maths">
                  <li>CBSE Sample Papers Class 9 Maths</li>
                </Link>
                <Link href="/CBSE-Sample-Papers/CBSE-Class-10-Maths-Sample-Paper-Basic-and-Standard">
                  <li>CBSE Sample Papers Class 10 Maths</li>
                </Link>
                <Link href="/CBSE-Sample-Papers/CBSE-Sample-Papers-for-Class-11-Maths">
                  <li>CBSE Sample Papers Class 11 Maths</li>
                </Link>
                <Link href="/CBSE-Sample-Papers/CBSE-Class-12-Maths-Sample-Papers">
                  <li>CBSE Sample Papers Class 12 Maths</li>
                </Link>
              </ul>
            </div>
            <div className="bg-white p-6 flex flex-col gap-3">
              <h2 className="font-semibold text-[1.1em]">
                CBSE Previous Year Question Papers
              </h2>
              <ul className="list-disc flex flex-col text-[.9em] gap-2 text-orange-500 px-4">
                <Link href="/Cbse-Previosyear-Questions/CBSE-Previous-Year-Question-Paper-for-Class-12-Maths">
                  <li>CBSE Previous Year Question Papers Class 12 Maths</li>
                </Link>
                <Link href="/Cbse-Previosyear-Questions/CBSE-Class-10-Maths-Previous-Year-Papers">
                  <li>CBSE Previous Year Question Papers Class 10 Maths</li>
                </Link>
              </ul>
            </div>

            <div className="bg-white p-6 flex flex-col gap-3">
              <h2 className="font-semibold text-[1.1em]">ICSE Sample Papers</h2>
              <ul className="list-disc flex flex-col text-[.9em] gap-2 text-orange-500 px-4">
                <Link href="/icse-sample-papers/ICSE-Sample-Papers-for-Class-8-Maths">
                  <li>ICSE Sample Papers Class 8 Maths</li>
                </Link>
                <Link href="/icse-sample-papers/ICSE-Sample-Papers-for-Class-9-Maths">
                  <li>ICSE Sample Papers Class 9 Maths</li>
                </Link>
                <Link href="/icse-sample-papers/ICSE-Sample-Papers-for-Class-10-Maths">
                  <li>ICSE Sample Papers Class 10 Maths</li>
                </Link>

                <Link href="/icse-sample-papers/ISC-Sample-Papers-for-Class-11-Maths">
                  <li>ISC Sample Papers Class 11 Maths</li>
                </Link>

                <Link href="/icse-sample-papers/ISC-Sample-Papers-for-Class-12-Maths">
                  <li>ISC Sample Papers Class 12 Maths</li>
                </Link>
              </ul>
            </div>
            <div className="bg-white p-6 flex flex-col gap-3">
              <h2 className="font-semibold text-[1.1em]">
                ICSE Previous Year Question Papers
              </h2>
              <ul className="list-disc flex flex-col text-[.9em] gap-2 text-orange-500 px-4">
                <Link href="/ICSE-Previousyear-Questions/ICSE-Class-10-Maths-Previous-Year-Paper">
                  <li>ICSE Previous Year Question Papers Class 10</li>
                </Link>
                <Link href="/ICSE-Previousyear-Questions/ISC-Class-12-Maths-Previous-Year-Question-Papers">
                  <li>ISC Previous Year Question Papers Class 12</li>
                </Link>
              </ul>
            </div>

            <div className="bg-white p-6 flex flex-col gap-3">
              <h2 className="font-semibold text-[1.1em]">
                Learn<b className="text-orange-600">O</b>sphere Syllabus
                for Class 1 to 12
              </h2>
              <ul className="list-disc flex flex-col text-[.9em] gap-2 text-orange-500 px-4">
                <Link href="/CBSE-12thsyllabus">
                  <li>Class 12 Syllabus</li>
                </Link>
                <Link href="/CBSE-11thsyllabus">
                  <li>Class 11 Syllabus</li>
                </Link>
                <Link href="/CBSE-10thsyllabus">
                  <li>Class 10 Syllabus</li>
                </Link>
                <Link href="/CBSE/Class-9">
                  <li>Class 9 Syllabus</li>
                </Link>
                <Link href="/CBSE/Class-8">
                  <li>Class 8 Syllabus</li>
                </Link>
                <Link href="/CBSE/Class-7">
                  <li>Class 7 Syllabus</li>
                </Link>
                <Link href="/CBSE/Class-6">
                  <li>Class 6 Syllabus</li>
                </Link>
                <Link href="/CBSE/Class-5">
                  <li>Class 5 Syllabus</li>
                </Link>
                <Link href="/CBSE/Class-4">
                  <li>Class 4 Syllabus</li>
                </Link>
                <Link href="/CBSE/Class-3">
                  <li>Class 3 Syllabus</li>
                </Link>
                <Link href="/CBSE/Class-2">
                  <li>Class 2 Syllabus</li>
                </Link>
                <Link href="/CBSE/Class-1">
                  <li>Class 1 Syllabus</li>
                </Link>
              </ul>
            </div>
            <div className=" bg-white p-5  rounded-lg">
               <FormSection />
              <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-lg font-bold text-orange-600 mb-4 border-b pb-2">Maths Syllabus Links</h2>
                <ul className="flex flex-col gap-3">
                  <li><Link href="/Mathematicstopic/class-12-maths-syllabus" className="text-slate-700 hover:text-orange-600 font-medium">Class 12 Maths Syllabus</Link></li>
                  <li><Link href="/Mathematicstopic/class-11-maths-syllabus" className="text-slate-700 hover:text-orange-600 font-medium">Class 11 Maths Syllabus</Link></li>
                  <li><Link href="/Mathematicstopic/class-10-maths-syllabus" className="text-slate-700 hover:text-orange-600 font-medium">Class 10 Maths Syllabus</Link></li>
                  <li><Link href="/Mathematicstopic/class-9-maths-syllabus" className="text-slate-700 hover:text-orange-600 font-medium">Class 9 Maths Syllabus</Link></li>
                  <li><Link href="/Mathematicstopic/class-8-maths-syllabus" className="text-slate-700 hover:text-orange-600 font-medium">Class 8 Maths Syllabus</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Footer1 />
        <Footer />
      </div>
    </>
  );
};

export default DataTable;
