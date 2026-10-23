"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { FiCalendar, FiClock } from "react-icons/fi";
import { MdLibraryBooks, MdCurrencyRupee, MdHistory } from "react-icons/md";
import TeacherAppBanner from "@/components/TeacherAppBanner";

const StudentPanel = () => {
  const { data: session, status } = useSession();
  const [recentClasses, setRecentClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch recent classes for the teacher
  useEffect(() => {
    const fetchClasses = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          let endpoint =
            `${WEB_BACKEND_URL}/api/route/getbookingsforteacher`;
          const params = new URLSearchParams();
          const teacherEmail = session.user.email;
          const classStatus = "recent";

          params.append("status", classStatus);
          params.append("teacherEmail", teacherEmail);

          if (params.toString()) {
            endpoint += `?${params.toString()}`;
          }

          const response = await fetch(endpoint, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          if (Array.isArray(data)) {
            setRecentClasses(data);
          } else {
            setRecentClasses([]);
          }
        } catch (error) {
          console.error("Fetch error:", error);
          setRecentClasses([]);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchClasses();
  }, [session, status]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-slate-400">
        Loading booking history...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-8 font-sans antialiased">
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="flex justify-between items-center bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl">
            <MdHistory size={26} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Booking History & Past Sessions
            </h1>
            <p className="text-xs text-slate-500">
              Complete history of concluded student lessons and mentoring sessions
            </p>
          </div>
        </div>
        <span className="px-3.5 py-1 bg-slate-100 text-slate-700 font-bold text-xs rounded-full">
          {recentClasses.length} Completed
        </span>
      </div>

      {recentClasses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentClasses.map((classItem) => (
            <div
              key={classItem.id}
              className="bg-white rounded-3xl p-6 border-2 border-slate-100 hover:border-orange-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start gap-2 mb-3">
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">
                      {classItem.name || "Student"}
                    </h3>
                    <span className="text-xs text-slate-400 font-medium">
                      Grade: {classItem.grade || "N/A"}
                    </span>
                  </div>
                  <span className="px-2.5 py-1 bg-green-50 text-green-700 text-[10px] font-bold uppercase rounded-lg border border-green-200">
                    Completed
                  </span>
                </div>

                <div className="space-y-2 py-3 border-y border-slate-100 text-xs text-slate-600 my-3">
                  <p className="flex items-center gap-2">
                    <MdLibraryBooks className="text-orange-500" size={16} />
                    <span className="font-semibold text-slate-800">{classItem.subject}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FiCalendar className="text-blue-500" size={15} />
                    <span>{classItem.date}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FiClock className="text-purple-500" size={15} />
                    <span>{classItem.time} {classItem.timePeriod || ""}</span>
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-xs text-slate-400 uppercase font-semibold">
                  Earning
                </span>
                <span className="text-lg font-black text-slate-900 flex items-center">
                  <MdCurrencyRupee size={16} className="text-orange-500" />
                  {classItem.fees}
                  <span className="text-xs text-slate-400 font-normal ml-0.5">/hr</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <TeacherAppBanner
          title="Start Teaching Live & Building Your History on the Tutor App!"
          subtitle="Your booking history will appear here after completing your scheduled 1-on-1 sessions. Download the mobile app to accept bookings on the go and connect instantly with learners across India."
          badge="🎓 NO SESSIONS YET"
        />
      )}
    </div>
  );
};

export default StudentPanel;
