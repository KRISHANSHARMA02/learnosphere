  "use client";
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
import { FaTimes, FaWhatsapp } from "react-icons/fa";
import WhatsappModal from "@/components/whatsappModal";
import AOS from "aos";
import "aos/dist/aos.css";
import FormSection from "@/components/FormGeneral";
import MathFallback from "@/components/MathFallback";
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
          `https://learnospherebackend.learnosphere.in/api/route/subjectcontent/${slug}`
        );
      
        if (response.data && response.data.data) {
          setData(response.data.data);
        } else {
          setData([]); // No data found
        }
      } catch (err) {
        console.error("Error fetching data:", err);
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
                  <p className="mb-2 mt-4 text-gray-800">{item.para1}</p>

                  {item.list1 && item.list1.length > 0 && (
                    <ol className="list-disc text-orange-600 pl-5 mb-2">
                      {item.list1.map((listItem, index) => (
                        <li key={index} className="mb-1">
                          {listItem}
                        </li>
                      ))}
                    </ol>
                  )}

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
              <MathFallback slug={slug} />
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
