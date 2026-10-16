"use client";
import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { BsPlayCircleFill, BsTrash, BsCameraVideoFill } from "react-icons/bs";

const Videodata = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [videos, setVideos] = useState([]);
  const [hoveredVideoId, setHoveredVideoId] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null); // Active video for player modal
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchVideos = async () => {
      if (!session?.user?.email) {
        setLoading(false);
        return;
      }

      setLoading(true);
      const queryString = `?selectedClass=${encodeURIComponent(
        selectedFilter
      )}&teacherEmail=${encodeURIComponent(session.user.email)}`;

      try {
        const response = await fetch(
          `https://learnospherebackend.learnosphere.in/api/route/getTeacherVideosForDashboard${queryString}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        setVideos(Array.isArray(data.videos) ? data.videos : []);
      } catch (error) {
        console.error("Error fetching videos:", error);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [selectedFilter, session]);

  const handleDelete = async (videoId, classNumber) => {
    const isConfirmed = await Swal.fire({
      title: "Delete this video?",
      text: "Do you want to permanently delete this concept video lecture?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ea580c",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!isConfirmed.isConfirmed) return;

    try {
      const response = await fetch(
        `https://learnospherebackend.learnosphere.in/api/route/deleteTeacherVideo/${videoId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ classNumber }),
        }
      );

      if (response.ok) {
        setVideos((prevVideos) =>
          prevVideos.filter((video) => video.id !== videoId)
        );

        Swal.fire({
          title: "Deleted!",
          text: "The video has been successfully deleted.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Failed to delete the video.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Failed to delete video:", error);
      Swal.fire({
        title: "Error",
        text: "An error occurred while deleting the video.",
        icon: "error",
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

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-sm">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-800">
            Published Concept Videos
          </h2>
          <p className="text-xs text-slate-500">
            Review uploaded video lessons, preview playback, and manage your library
          </p>
        </div>
        <span className="px-3.5 py-1 bg-orange-50 text-orange-700 font-bold text-xs rounded-full border border-orange-200 shrink-0">
          {videos.length} Videos Live
        </span>
      </div>

      {/* Class Filter Bar */}
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

      {/* Video Cards Grid */}
      {loading ? (
        <div className="py-12 text-center text-slate-400 text-sm">
          Loading your published video lessons...
        </div>
      ) : videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Video Thumbnail / Preview Area */}
                <div
                  onMouseEnter={() => setHoveredVideoId(video.id)}
                  onMouseLeave={() => setHoveredVideoId(null)}
                  onClick={() => setActiveVideo(video)}
                  className="relative aspect-video w-full bg-slate-900 cursor-pointer overflow-hidden flex items-center justify-center"
                >
                  {hoveredVideoId === video.id ? (
                    <video
                      src={video.video_url}
                      autoPlay
                      muted
                      loop
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-zinc-900 p-4">
                      <div className="w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg backdrop-blur-sm">
                        <BsPlayCircleFill size={26} className="text-orange-500" />
                      </div>
                      <span className="text-[10px] text-white/60 font-semibold mt-2 uppercase tracking-wider">
                        Click to Preview
                      </span>
                    </div>
                  )}

                  {/* Class Badge Overlay */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-black/60 text-white text-[10px] font-bold rounded-lg backdrop-blur-sm border border-white/10 uppercase">
                    {video.class || "All Classes"}
                  </span>
                </div>

                {/* Video Info */}
                <div className="p-4 sm:p-5 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-orange-50 text-orange-700 text-[10px] font-bold rounded-md uppercase">
                      {video.subject || "General"}
                    </span>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-medium rounded-md">
                      {video.category || "English"}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm sm:text-base line-clamp-1 group-hover:text-orange-600 transition-colors">
                    {video.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {video.description || "Educational concept lecture for students."}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-2 flex items-center justify-between border-t border-slate-100 gap-2">
                <button
                  onClick={() => setActiveVideo(video)}
                  className="flex-1 sm:flex-initial px-3.5 sm:px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5"
                >
                  <BsPlayCircleFill size={14} /> Watch Lesson
                </button>

                <button
                  onClick={() => handleDelete(video.id, video.class)}
                  className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors shrink-0"
                  title="Delete Video"
                >
                  <BsTrash size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center border border-slate-200/80">
          <div className="w-14 h-14 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center mx-auto mb-3">
            <BsCameraVideoFill size={28} />
          </div>
          <h3 className="text-sm sm:text-base font-bold text-slate-800">
            No Concept Videos for {selectedFilter}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
            You haven't uploaded video lectures for this class yet. Use the upload studio above to publish your first video!
          </p>
        </div>
      )}

      {/* Video Player Modal */}
      {activeVideo && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50 p-3 sm:p-4">
          <div className="relative w-full max-w-3xl bg-slate-950 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10 max-h-[90vh] flex flex-col">
            <div className="p-3 sm:p-4 flex justify-between items-center text-white border-b border-white/10 shrink-0">
              <div className="min-w-0 pr-4">
                <h4 className="font-bold text-xs sm:text-sm truncate">{activeVideo.title}</h4>
                <p className="text-[10px] sm:text-[11px] text-slate-400">
                  {activeVideo.class} • {activeVideo.subject}
                </p>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors shrink-0"
              >
                <RxCross2 size={20} />
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              <video
                src={activeVideo.video_url}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Videodata;