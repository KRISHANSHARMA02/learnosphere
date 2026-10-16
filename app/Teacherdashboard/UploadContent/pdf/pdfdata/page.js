"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import { AiOutlineFilePdf, AiOutlineEye, AiOutlineDelete } from "react-icons/ai";
import { FaGraduationCap } from "react-icons/fa";
import Swal from "sweetalert2";

const Pdfdata = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let url =
          "https://learnospherebackend.learnosphere.in/api/route/getteacherdatacontroller";
        url += `?class=${selectedFilter}`;

        if (session?.user?.email) {
          url += `&gmail=${session.user.email}`;
        }

        const response = await axios.get(url);
        if (Array.isArray(response.data)) {
          setFiles(response.data);
        } else {
          setFiles([]);
        }
      } catch (error) {
        console.error("Error fetching pdf files:", error);
        setFiles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedFilter, session]);

  const handleDelete = async (id, selectedClass) => {
    const result = await Swal.fire({
      title: "Delete this note?",
      text: "This document will be permanently removed from students' study library.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ea580c",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete it",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `https://learnospherebackend.learnosphere.in/api/route/deleteTeacherData/${id}/${selectedClass}`
        );
        setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "The document was successfully removed.",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Error Deleting File:", error);
        Swal.fire({
          icon: "error",
          title: "Delete Failed",
          text: "Could not delete this file. Please try again.",
        });
      }
    }
  };

  const handleView = (teacherpdfUrl) => {
    if (teacherpdfUrl) {
      window.open(teacherpdfUrl, "_blank");
    } else {
      Swal.fire({
        icon: "info",
        title: "File Preview",
        text: "The PDF URL is processing or unavailable.",
      });
    }
  };

  const classesList = [
    "All",
    "Class-1",
    "Class-2",
    "Class-3",
    "Class-4",
    "Class-5",
    "Class-6",
    "Class-7",
    "Class-8",
    "Class-9",
    "Class-10",
    "Class-11",
    "Class-12",
  ];

  return (
    <div className="space-y-6 pt-4">
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-sm">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-800">
            Your Uploaded Documents & Notes
          </h2>
          <p className="text-xs text-slate-500">
            Filter by class to review and manage published study materials
          </p>
        </div>
        <span className="px-3.5 py-1 bg-orange-50 text-orange-700 font-bold text-xs rounded-full border border-orange-200 shrink-0">
          {files.length} Notes Published
        </span>
      </div>

      {/* Class Filter Pills */}
      <div className="flex gap-1.5 pb-2 overflow-x-auto scrollbar-hide py-1 w-full">
        {classesList.map((cls) => (
          <button
            key={cls}
            onClick={() => setSelectedFilter(cls)}
            className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
              selectedFilter === cls
                ? "bg-orange-600 text-white shadow-md shadow-orange-600/20"
                : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
            }`}
          >
            {cls}
          </button>
        ))}
      </div>

      {/* Table & Mobile Cards Container */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-12 text-center text-slate-400 text-sm">
            Loading your published notes...
          </div>
        ) : files.length > 0 ? (
          <>
            {/* 📱 Mobile Card List (Visible on < md screens) */}
            <div className="block md:hidden divide-y divide-slate-100">
              {files.map((file, index) => (
                <div key={index} className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5">
                      <div className="p-2 rounded-xl bg-orange-50 text-orange-600 shrink-0 mt-0.5">
                        <AiOutlineFilePdf size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm leading-snug">
                          {file.title || "Untitled Note"}
                        </h4>
                        {file.topic && (
                          <p className="text-xs text-slate-500 mt-0.5">
                            Topic: <span className="font-medium text-slate-700">{file.topic}</span>
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(file.id, file.selectedClass || file.class)}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors shrink-0"
                      title="Delete Document"
                    >
                      <AiOutlineDelete size={18} />
                    </button>
                  </div>

                  {file.description && (
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {file.description}
                    </p>
                  )}

                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="px-2.5 py-0.5 bg-orange-50 border border-orange-200 text-orange-700 font-bold rounded-lg text-[11px]">
                      {file.selectedClass || file.class || "General"}
                    </span>
                    <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 font-semibold rounded-lg text-[11px]">
                      {file.selectedSubject || file.subject || "All Subjects"}
                    </span>
                    {file.category && (
                      <span className="px-2 py-0.5 bg-slate-50 border border-slate-200 text-slate-600 rounded-lg text-[10px]">
                        {file.category}
                      </span>
                    )}
                    {file.samplepapers && (
                      <span className="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg text-[10px]">
                        {file.samplepapers}
                      </span>
                    )}
                    {file.term && (
                      <span className="px-2 py-0.5 bg-purple-50 border border-purple-200 text-purple-700 rounded-lg text-[10px]">
                        {file.term}
                      </span>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="pt-2">
                    <button
                      onClick={() => handleView(file.teacherpdfUrl)}
                      className="w-full py-2.5 px-4 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-600 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <AiOutlineEye size={16} /> View & Read PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* 🖥️ Desktop Table (Visible on >= md screens) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-100">
                <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-left">
                  <tr>
                    <th className="px-6 py-4">Title & Topic</th>
                    <th className="px-6 py-4">Class & Subject</th>
                    <th className="px-6 py-4">Category & Details</th>
                    <th className="px-6 py-4 text-center">Document</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {files.map((file, index) => (
                    <tr key={index} className="hover:bg-slate-50/60 transition-colors">
                      {/* Title & Topic */}
                      <td className="px-6 py-4 max-w-xs">
                        <div className="flex items-start gap-2.5">
                          <div className="p-2 rounded-xl bg-orange-50 text-orange-600 shrink-0 mt-0.5">
                            <AiOutlineFilePdf size={18} />
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 leading-tight">
                              {file.title || "Untitled Note"}
                            </p>
                            {file.topic && (
                              <p className="text-xs text-slate-500 mt-0.5">
                                Topic: {file.topic}
                              </p>
                            )}
                            {file.description && (
                              <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                                {file.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Class & Subject */}
                      <td className="px-6 py-4">
                        <span className="font-semibold text-slate-800 block">
                          {file.selectedClass || file.class || "General"}
                        </span>
                        <span className="text-xs text-orange-600 font-medium">
                          {file.selectedSubject || file.subject || "All Subjects"}
                        </span>
                      </td>

                      {/* Category & Details */}
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1 text-[11px]">
                          {file.category && (
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md font-medium">
                              {file.category}
                            </span>
                          )}
                          {file.samplepapers && (
                            <span className="px-2 py-0.5 bg-orange-50 text-orange-700 rounded-md font-medium">
                              {file.samplepapers}
                            </span>
                          )}
                          {file.term && (
                            <span className="px-2 py-0.5 bg-purple-50 text-purple-700 rounded-md font-medium">
                              {file.term}
                            </span>
                          )}
                          {file.level && (
                            <span className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded-md font-medium uppercase text-[10px]">
                              {file.level}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Document */}
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleView(file.teacherpdfUrl)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-600 text-xs font-bold transition-colors"
                        >
                          <AiOutlineEye size={15} /> View PDF
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDelete(file.id, file.selectedClass || file.class)}
                          className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete Document"
                        >
                          <AiOutlineDelete size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="py-12 px-4 text-center">
            <div className="w-14 h-14 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center mx-auto mb-3">
              <AiOutlineFilePdf size={28} />
            </div>
            <h3 className="text-base font-bold text-slate-800">
              No Notes Found for {selectedFilter}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              You haven't uploaded study materials for this class yet. Use the form above to publish your first revision document!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pdfdata;
