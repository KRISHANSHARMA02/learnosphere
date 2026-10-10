"use client";

import React from "react";
import { Star } from "lucide-react";
import Link from "next/link";
import VerifiedBadge from "./VerifiedBadge";

export default function TeacherSection({
  limit = 6,
  isLessonPage = false,
  redirectToSubject = false,
  city,
  subject,
  teachers = [],
  loading = false,
}) {
  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Dynamic Heading */}
        <div className="mb-10">
          <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2 text-gray-800">
            {isLessonPage && subject
              ? `Expert ${subject} Tutors Nearby`
              : city
                ? `Expert Home Tutors in ${city.replace(/-/g, " ")} & Nearby`
                : "Expert Home Tutors Nearby"}
            <span className="flex text-orange-500 text-[10px] ml-1">★★★★★</span>
          </h2>
        </div>

        {/* Loading State or Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
            <span className="ml-3 text-gray-500 font-medium">
              Loading best tutors...
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {teachers.slice(0, limit).map((teacher) => {
              // 1. Create safe slugs
              const citySlug = `home-tuition-in-${(teacher.city || "").toLowerCase().replace(/\s+/g, "-")}`;
              const subjectSlug = (teacher.subject || "")
                .toLowerCase()
                .replace(/\s+/g, "-");

              // 2. Logic: Agar redirectToSubject true hai toh ID URL param mein lagao
              let destination;

              if (redirectToSubject) {
                // 🚀 ADDED: ?tutorId=${teacher.id}
                destination = `/home-tuition/${citySlug}/lessons/${subjectSlug}?tutorId=${teacher.id || teacher._id}`;
              } else {
                // Case 2: Lesson Page se click kiya -> Teacher Profile par jao
                destination = `/home-tuition/${citySlug}/lessons/${subjectSlug}/${teacher.id || teacher._id}`;
              }

              return (
                <Link
                  key={teacher.id || teacher._id}
                  href={destination}
                  className="group cursor-pointer block no-underline"
                >
                  {/* Image Card */}
                  <div className="relative h-[355px] w-full overflow-hidden rounded-[2rem] shadow-sm">
                    <img
                      src={
                        teacher.image && teacher.image.trim() !== ""
                          ? teacher.image
                          : "/DefaultAvtar.jpg"
                      }
                      alt={teacher.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/DefaultAvtar.jpg";
                      }}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Gradient & Overlay Info */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold tracking-tight">
                          {teacher.name}
                        </h3>
                        <VerifiedBadge isApproved={teacher.isApproved} />
                      </div>
                      <p className="text-xs font-light opacity-90">
                        {teacher.city}
                      </p>
                    </div>
                  </div>

                  {/* Teacher Details */}
                  <div className="mt-4 space-y-1 px-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-bold text-gray-900">
                          {teacher.rating || "5.0"}
                        </span>
                        <span className="text-[10px] text-gray-500">
                          ({teacher.reviews || 0} reviews)
                        </span>
                      </div>
                      {teacher.badge && (
                        <span className="bg-indigo-50 text-indigo-600 text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md font-bold">
                          ✦ {teacher.badge}
                        </span>
                      )}
                    </div>

                    <p className="text-sm leading-snug text-gray-700 line-clamp-2">
                      <span className="font-bold text-gray-900">
                        {teacher.subject}
                      </span>{" "}
                      — Professional tutor specializing in personalized
                      sessions.
                    </p>

                    <div className="flex items-center gap-2 pt-1">
                      <span className="font-extrabold text-gray-900 text-sm">
                        ₹{teacher.BaseRate || teacher.hourlyRate || 360}/hr
                      </span>
                      <span className="text-orange-500 text-[11px] font-medium">
                        • 1st free class
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Final Safety Net: If API returns absolutely nothing */}
        {!loading && teachers.length === 0 && (
          <div className="text-center py-20 text-gray-400 border-2 border-dashed border-gray-100 rounded-3xl mt-10">
            No tutors found at the moment.
          </div>
        )}
      </div>
    </section>
  );
}