"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Head from "next/head";

const StudentPanel = () => {
  const { data: session, status } = useSession(); // Retrieve session data
  const [recentClasses, setRecentClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch recent classes for the teacher
  useEffect(() => {
    const fetchClasses = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          let endpoint = "https://learnospherebackend.learnosphere.in/api/route/getbookingsforteacher";
          const params = new URLSearchParams();
          const teacherEmail = session.user.email; // Extract teacher email from session
          const status = "recent"; // Pass 'recent' as the status

          params.append("status", status);
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
          setRecentClasses(data);
          setLoading(false);
        } catch (error) {
          console.error("Fetch error:", error);
          setLoading(false);
        }
      }
    };

    fetchClasses();
  }, [session, status]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4 min-h-screen">
    <Head>
    <meta name="robots" content="noindex, nofollow" />
  </Head>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Bookings</h2>

      {recentClasses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentClasses.map((classItem) => (
            <div
              key={classItem.id}
              className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              <p className="text-gray-700 mb-1">
                <strong>Student:</strong> {classItem.name}
              </p>
              <p className="text-gray-700 mb-1">
               <strong>Subject:</strong> {classItem.subject} - {classItem.grade}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Date:</strong> {classItem.date}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Time:</strong> {classItem.time} {classItem.timePeriod}
              </p>
            <p className="text-gray-700 mb-1">  
              <strong>Fee:</strong> {classItem.fees} ₹/hr
            </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No recent classes found.</p>
      )}
    </div>
  );
};

export default StudentPanel;

