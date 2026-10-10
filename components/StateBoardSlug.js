"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Footer1 from "@/components/Footer1";
import Footer from "@/components/Footer";
import Link from "next/link";
import DownloadFormPage from "@/components/downloadForm";
import AppPromoBanner from "./BrandappNew";

const BoardPage = () => {
  const params = useParams();
  const slug = params?.slug;
  const [boardData, setboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sideLinks, setSideLinks] = useState([]);
  const [contact, setContact] = useState("");
 
  useEffect(() => {
    if (!slug) return;
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/boards/${slug}`);
        setboardData(res.data);
      } catch (err) {
        setError(err.response?.data?.error || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  useEffect(() => {
    // Step 1: Get slug from URL using window.location
    const urlParts = window.location.pathname.split("/");
    const slugFromURL = urlParts[urlParts.length - 1]; // or whatever index fits your route

    // Step 2: Define all 27 links
    const allLinks = [
      {
        label: "Uttarakhand Board of School Education (UBSE)",
        url: "/State_Board/UBSE",
      },
      {
        label: "Bihar School Examination Board (BSEB)",
        url: "/State_Board/BSEB/",
      },
      {
        label: "Uttar Pradesh Madhyamik Shiksha Parishad (UPMSP)",
        url: "/State_Board/UPMSP",
      },
      {
        label: "Directorate of School Education, Arunachal Pradesh (DSEAP) ",
        url: "/State_Board/DSEAP",
      },
      {
        label: "Madhya Pradesh Board of Secondary Education (MPBSE)",
        url: "/State_Board/MPBSE",
      },
      {
        label: "Gujarat Secondary and Higher Secondary Education Board (GSEB)",
        url: "/State_Board/GSEB",
      },
      {
        label: "Kerala Board of Public Examinations (KBPE)",
        url: "/State_Board/KBPE",
      },
      {
        label: "Tamil Nadu State Board of School Examination (TNBS)",
        url: "/State_Board/TNSB",
      },
      {
        label:
          "Maharashtra State Board of Secondary and Higher Secondary Education (MSBSHSE)",
        url: "/State_Board/MSBSHSE",
      },
      {
        label: "Board of Secondary Education Rajasthan (RBSE)",
        url: "/State_Board/RBSE",
      },
      {
        label: "Punjab School Education Board (PSEB)",
        url: "/State_Board/PSEB",
      },
      {
        label: "Board of School Education Haryana (BSEH)",
        url: "/State_Board/BSEH",
      },
      {
        label: "Karnataka School Examination and Assessment Board (KSEAB)",
        url: "/State_Board/KSEEB",
      },
      {
        label: "Board of Secondary Education, Andhra Pradesh (BSEAP)",
        url: "/State_Board/APBSE",
      },
      {
        label: "Telangana State Board of Secondary Education (BSE Telangana)",
        url: "/State_Board/BSE_Telangana",
      },
      {
        label: "West Bengal Board of Secondary Education (WBBSE)",
        url: "/State_Board/WBBSE",
      },
      {
        label: "Board of Secondary Education, Odisha (BSE Odisha)",
        url: "/State_Board/BSE_Odi",
      },
      {
        label: "Chhattisgarh Board of Secondary Education (CGBSE)",
        url: "/State_Board/CGBSE",
      },
      {
        label: "Board of Secondary Education, Assam (SEBA)",
        url: "/State_Board/SEBA",
      },
      {
        label: "Jharkhand Academic Council (JAC)",
        url: "/State_Board/JAC",
      },
      {
        label: "Goa Board of Secondary and Higher Secondary Education (GBSHSE)",
        url: "/State_Board/GBSHSE",
      },
      {
        label: "Himachal Pradesh Board of School Education (HPBOSE)",
        url: "/State_Board/HPBOSE",
      },
      {
        label: "Tripura Board of Secondary Education (TBSE)",
        url: "/State_Board/TBSE",
      },
      {
        label: "Mizoram Board of School Education (MBSE)",
        url: "/State_Board/MBSE",
      },
      {
        label: "Board of Secondary Education, Manipur (BSEM)",
        url: "/State_Board/MANIPUR",
      },
      {
        label: "Nagaland Board of School Education (NBSE)",
        url: "/State_Board/NBSE",
      },
      {
        label: "Meghalaya Board of School Education (MBOSE)",
        url: "/State_Board/MBOSE",
      },
    ];

    // Step 3: Shuffle and pick 7 random links
    const shuffled = allLinks.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);

    // Step 4: Set side links
    setSideLinks(selected);
  }, []);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await axios.get("/api/boards/related-links");
        setSideLinks(res.data.links);
      } catch (err) {
        console.error("Failed to load related links", err);
      }
    };
    fetchLinks();
  }, []);
  
  const handleContact = (e) => {
    const { value } = e.target;
    if (/^\d{0,10}$/.test(value)) {
      setContact(value);
    }
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-700">{error}</p>;

  const {
    heading,
    descra,
    webs,
    description,
    website,
    note,
    h1,
    functions,
    h2,
    exams,
    h3,
    sect,
    curriculumLanguages,
    sectio,
    subjects,
    h4,
    digitalResources,
    h5,
    updates,
    h6,
    importance,
    importance1,
    h7,
    hTable,
    tablerc,
    h7a,
    importance1a,
    h7b,
    h7c,
    importance1b,
    importance1c,
    h8,
    concluusion,
    responsiDSE,
  } = boardData;

  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto p-4 lg:space-x-6 space-y-6 lg:space-y-0 mt-20">
        <div className="flex-1">
          <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-6 space-y-6">
            <h1 className="text-3xl font-bold text-black text-center">
              {heading}
            </h1>
            <p className="text-black leading-relaxed">
              {description}{" "}
              {website && (
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-600 font-bold hover:underline"
                >
                  {webs}
                </a>
              )}
              {descra &&(
                <span className="text-black"> {descra}</span>
              )}
            </p>

            {note && (
              <div className="bg-orange-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-black">
                  📌 <strong>Note:</strong> {note}
                </p>
              </div>
            )}

            <h2 className="text-2xl font-semibold text-black">{h1}</h2>
            {responsiDSE && (
              <div className="text-black font-bold">{responsiDSE}</div>
            )}
            <Section items={functions} />
            {hTable && (
              <h2 className="text-2xl font-semibold text-black">{hTable}</h2>
            )}
            {tablerc && (
              <div>
                <table className="w-full table-auto border border-black shadow-md rounded-lg overflow-hidden mt-6 mb-6">
                  <thead>
                    <tr className="bg-orange-600 text-white">
                      <th className="text-left px-4 py-2 border">Feature</th>
                      <th className="text-left px-4 py-2 border">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tablerc.map(([key, value], i) => (
                      <tr key={i} className="border-t">
                        <td className="font-medium p-2 border-r border-black w-1/3">
                          {key}
                        </td>
                        <td className="p-2">
                          {key === "Official Website" ? (
                            <a
                              href={`https://${value.replace(/\s/g, "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-orange-600 underline"
                            >
                              {value.trim()}
                            </a>
                          ) : (
                            value
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <h2 className="text-2xl font-semibold text-black">{h2}</h2>
            {Array.isArray(exams) ? (
              <Section items={exams} />
            ) : typeof exams === "object" ? (
              <div className="space-y-3">
                {Object.entries(exams).map(([key, value]) => (
                  <div key={key} className="text-black">
                    <p className="font-semibold capitalize">
                      {key.replace(/([A-Z])/g, " $1")}
                    </p>
                    {typeof value === "string" ? (
                      <p>{value}</p>
                    ) : (
                      Object.entries(value).map(([subKey, subVal]) => (
                        <p key={subKey}>
                          <strong>{subKey}:</strong> {subVal}
                        </p>
                      ))
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500"> </p>
            )}

            <h2 className="text-2xl font-semibold text-black">{h3}</h2>
            <p className="text-black">{sect}</p>
            <Section items={curriculumLanguages} />

            {Array.isArray(subjects) ? (
              <>
                <p className="text-black mt-2">{sectio}</p>
                <ul className="list-disc pl-6 text-black space-y-1">
                  {subjects.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </>
            ) : typeof subjects === "object" ? (
              <div className="space-y-3">
                <p className="text-black mt-2">{sectio}</p>
                {Object.entries(subjects).map(([key, value]) => (
                  <div key={key}>
                    <p className="font-semibold text-black capitalize">{key}</p>
                    {Array.isArray(value) ? (
                      <ul className="list-disc pl-6 text-black space-y-1">
                        {value.map((v, i) => (
                          <li key={i}>{v}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-black">{value}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="italic text-black mt-2"> </p>
            )}

            <h2 className="text-2xl font-semibold text-black">{h4}</h2>
            {Array.isArray(digitalResources) ? (
              <ul className="list-disc pl-6 text-black space-y-1">
                {digitalResources.map((item, index) =>
                  typeof item === "object" ? (
                    <li key={index}>
                      {item.label}:{" "}
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-500 hover:underline"
                      >
                        {item.link}
                      </a>
                    </li>
                  ) : (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
            ) : (
              <p className="text-black">{digitalResources}</p>
            )}

            <h2 className="text-2xl font-semibold text-black">{h5}</h2>
            <Section items={updates} />

            <h2 className="text-2xl font-semibold text-black">{h6}</h2>
            {Array.isArray(importance) ? (
              <Section items={importance} />
            ) : (
              <p className="text-black">{importance}</p>
            )}

            {h7 && <h2 className="text-2xl font-semibold text-black">{h7}</h2>}
            {importance1 &&
              (Array.isArray(importance1) ? (
                <ul className="list-disc list-inside text-black font-medium space-y-1">
                  {importance1.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-black font-medium">{importance1}</p>
              ))}
            {h7a && (
              <h2 className="text-2xl font-semibold text-black">{h7a}</h2>
            )}
            {importance1a &&
              (Array.isArray(importance1a) ? (
                <ul className="list-disc list-inside text-black font-medium space-y-1">
                  {importance1a.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-black font-medium">{importance1a}</p>
              ))}
            {h7b && (
              <h2 className="text-2xl font-semibold text-black">{h7b}</h2>
            )}
            {importance1b &&
              (Array.isArray(importance1b) ? (
                <ul className="list-disc list-inside text-black font-medium space-y-1">
                  {importance1b.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-black font-medium">{importance1b}</p>
              ))}
            {h7c && (
              <h2 className="text-2xl font-semibold text-black">{h7c}</h2>
            )}
            {importance1c &&
              (Array.isArray(importance1c) ? (
                <ul className="list-disc list-inside text-black font-medium space-y-1">
                  {importance1c.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-black font-medium">{importance1b}</p>
              ))}
            {h8 && <h2 className="text-2xl font-semibold text-black">{h8}</h2>}
            {concluusion &&
              (Array.isArray(concluusion) ? (
                <ul className="list-disc list-inside text-black font-medium space-y-1">
                  {concluusion.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-black font-medium">{concluusion}</p>
              ))}
          </div>
            <AppPromoBanner />

            
      
        </div>

        <div className="w-full lg:w-1/4 mt-10 px-4 lg:px-0">
          <div className="bg-white p-4 lg:p-7 rounded-xl shadow-lg">
            <h3 className="text-xl lg:text-2xl font-semibold mb-3 text-black">
              Other Useful Links
            </h3>
            <ul className="space-y-2 text-sm">
              {sideLinks.map((link, index) => (
                <li
                  key={index}
                  className="hover:bg-slate-200 rounded-xl transition-colors p-2"
                >
                  <Link
                    href={link.url}
              
                    rel="noopener noreferrer"
                    className="text-orange-600 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-sm text-white mt-4 font-bold bg-orange-500 hover:underline p-2 rounded-xl text-center">
              <a href="/State_Board">More</a>
            </p>
          </div>
          <div className=" bg-white p-5  rounded-lg mt-4 shadow-lg">
            <p className="font-bold text-[1.1em]">
              Join Learnosphere For Learning Program
            </p>
            <DownloadFormPage />
      
          </div>
        </div>
      </div>
      <Footer1 />
      <Footer />
    </>
  );
};

const Section = ({ heading, items }) => {
  if (!items) return null;
  return (
    <>
      {heading && <h3 className="text-2xl font-semibold text-black">{heading}</h3>}
      {Array.isArray(items) && items.length > 0 ? (
        <ul className="list-disc pl-6 text-black space-y-1">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500"></p>
      )}
    </>
  );
};

export default BoardPage;
