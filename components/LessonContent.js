"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // 🚀 ADDED THIS
import SearchBar from "@/components/SearchBar";
import TeacherSection from "@/components/TeacherSection";
import {
  Star,
  Tag,
  Clock,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";

const subjectData = {
  default: {
    stats: {
      rating: {
        value: "5/5",
        color: "yellow",
        bgColor: "bg-[#FFFCEB]",
        borderColor: "border-yellow-100",
        textColor: "text-yellow-700",
        iconColor: "text-yellow-400",
        description:
          "instructors with an average rating of 5 stars and more than 2,538 reviews.",
      },
      price: {
        value: "₹1,868",
        unit: "/hr",
        color: "red",
        bgColor: "bg-[#FFF2F2]",
        borderColor: "border-red-100",
        textColor: "text-red-500",
        iconColor: "text-red-400",
        description:
          "classes near me. The average fee for {subject} classes is ₹1,868/hr.",
      },
      response: {
        value: "5",
        unit: "h",
        color: "blue",
        bgColor: "bg-[#F2F7FF]",
        borderColor: "border-blue-100",
        textColor: "text-blue-500",
        iconColor: "text-blue-400",
        description: "teachers usually respond in under 5h.",
      },
    },

    faqs: [
      {
        id: 1,
        question: "What is the average price of {subject} classes?",
        answer:
          "The average price of {subject} classes is ₹1,868. The price can vary based on the teacher's experience and the duration of the class.",
      },
      {
        id: 2,
        question: "How to find private {subject} classes in your city?",
        answer:
          "You can use our search bar to filter teachers by your city and find the one that best fits your schedule and budget.",
      },
      {
        id: 3,
        question: "Can you learn {subject} online on Learnsphere?",
        answer:
          "Yes! Most of our instructors offer online sessions via webcam, allowing you to learn from the comfort of your home.",
      },
      {
        id: 4,
        question: "How to find a {subject} instructor near you?",
        answer:
          "Simply enter your neighborhood or city in the search bar, and we will show you the highest-rated instructors in your immediate area.",
      },
    ],
    essentialInfo: [
      {
        id: 1,
        label: "Average price:",
        value: "₹1,868/hr",
      },
      {
        id: 2,
        label: "Average response time:",
        value: "5h",
      },
      {
        id: 3,
        label: "Teachers available:",
        value: "12,742",
      },
      {
        id: 4,
        label: "Class format:",
        value: "Face-to-face or online",
      },
    ],
  },
};

const replaceSubjectPlaceholder = (text, subject) => {
  if (!text) return "";
  return text.replace(/{subject}/g, subject);
};

export default function LessonsContent({
  subject,
  teacherCity,
  teachers = [],
}) {
  // 🚀 URL se clicked tutor ki ID nikalna
  const searchParams = useSearchParams();
  const clickedTutorId = searchParams.get("tutorId");

  const decodedSubject = subject ? decodeURIComponent(subject) : "";
  const formattedSubject = decodedSubject
    ? decodedSubject.charAt(0).toUpperCase() + decodedSubject.slice(1)
    : "Subject";

  const currentData =
    subjectData[subject?.toLowerCase()] || subjectData.default;
  const { stats, faqs, essentialInfo } = currentData;

  const [displayLimit, setDisplayLimit] = useState(15);
  const [reviewsList, setReviewsList] = useState([]);

  const getBackendUrl = () => {
    return WEB_BACKEND_URL ;
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${getBackendUrl()}/api/route/getstudentfeedbackformdata`);
        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
          const filtered = result.data.filter(review => {
            if (!review.subject) return false;
            const rSub = review.subject.toLowerCase().replace(/-/g, " ").trim();
            const curSub = subject ? subject.toLowerCase().replace(/-/g, " ").trim() : "";
            return rSub === curSub;
          });
          setReviewsList(filtered);
        }
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      }
    };
    fetchReviews();
  }, [subject]);

  const loadMoreTeachers = () => {
    setDisplayLimit((prevLimit) => prevLimit + 15);
  };

  // 🚀 FILTERING/SORTING LOGIC: Filter by subject, then sort (clicked first, verified next, then others)
  const sortedTeachers = useMemo(() => {
    const isSubjectMatchLocal = (teacher, reqSub) => {
      if (!reqSub) return true;
      const r = reqSub.toLowerCase().trim();
      const subjectsToCheck = teacher.allSubjects || (teacher.subject ? [teacher.subject] : []);
      return subjectsToCheck.some((sub) => {
        if (!sub) return false;
        const t = sub.toLowerCase().trim();
        return t.includes(r) || r.includes(t);
      });
    };

    // 1. Filter teachers to only keep those related to the selected subject
    const related = teachers.filter((t) => isSubjectMatchLocal(t, subject));

    // 2. Sort teachers: clicked teacher first, verified (isApproved === true) second, then others
    return [...related].sort((a, b) => {
      const isAClicked = clickedTutorId && (String(a.id) === clickedTutorId || String(a._id) === clickedTutorId);
      const isBClicked = clickedTutorId && (String(b.id) === clickedTutorId || String(b._id) === clickedTutorId);
      if (isAClicked && !isBClicked) return -1;
      if (!isAClicked && isBClicked) return 1;

      const isAVerified = a.isApproved || a.is_approved || false;
      const isBVerified = b.isApproved || b.is_approved || false;
      if (isAVerified && !isBVerified) return -1;
      if (!isAVerified && isBVerified) return 1;

      return 0;
    });
  }, [teachers, subject, clickedTutorId]);

  return (
    <>
      <div className="bg-orange-50 mt-10 pt-10">
        <section className="max-w-3xl mx-auto px-4 pt-10 pb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            {formattedSubject} Classes Near Me
          </h1>

          <p className="mt-2 text-2xl text-gray-700 font-semibold">
            Learn from the best tutors
          </p>

          <ul className="mt-6 space-y-3 text-gray-700 font-medium text-left max-w-md mx-auto">
            <li>⭐ Book {formattedSubject} classes near you</li>
            <li>⭐ Flexible timings &amp; online options</li>
            <li>⭐ Starting from ₹299/hr</li>
          </ul>

          <div className="mt-8 max-w-xl mx-auto">
            <SearchBar variant="subject" defaultQuery={formattedSubject} />
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 -mt-4 mb-8 flex justify-center pb-16">
          <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-lg text-sm md:text-base border border-gray-50">
            <span className="font-semibold text-gray-900">Excellent</span>
            <span className="text-orange-500">★★★★★</span>
            <span className="text-gray-500">1 million+ student reviews</span>
          </div>
        </div>
      </div>

      <section className="max-w-6xl mx-auto px-4 pb-12">
        {/* 🚀 Pass sortedTeachers instead of raw teachers */}
        <TeacherSection
          limit={displayLimit} 
          subject={formattedSubject}
          city={teacherCity}
          slug={teacherCity}
          teachers={sortedTeachers} 
          loading={false}
        />

        {sortedTeachers && sortedTeachers.length > displayLimit && (
          <div className="flex justify-center mt-12">
            <button 
              onClick={loadMoreTeachers} 
              className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-full font-bold shadow-md transition-all flex items-center gap-2"
            >
              See more teachers <ArrowRight size={18} />
            </button>
          </div>
        )}
      </section>

      {sortedTeachers && sortedTeachers.length > 0 && (
        <>
          <section className="max-w-5xl mx-auto px-4 mb-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Rating Card */}
            <div
              className={`${stats.rating.bgColor} p-6 rounded-3xl border ${stats.rating.borderColor} flex flex-col justify-between min-h-[140px]`}
            >
              <div className="flex justify-between items-start">
                <span
                  className={`text-2xl font-bold ${stats.rating.textColor} opacity-80`}
                >
                  {stats.rating.value}
                </span>
                <Star
                  className={stats.rating.iconColor}
                  size={20}
                  fill="currentColor"
                />
              </div>
              <p className="text-[12px] leading-relaxed text-gray-600 italic">
                {formattedSubject} {stats.rating.description}
              </p>
            </div>

            {/* Price Card */}
            <div
              className={`${stats.price.bgColor} p-6 rounded-3xl border ${stats.price.borderColor} flex flex-col justify-between min-h-[140px]`}
            >
              <div className="flex justify-between items-start">
                <span
                  className={`text-2xl font-bold ${stats.price.textColor} opacity-80`}
                >
                  {stats.price.value}{" "}
                  <span className="text-sm">{stats.price.unit}</span>
                </span>
                <Tag className={stats.price.iconColor} size={20} />
              </div>
              <p className="text-[12px] leading-relaxed text-gray-600 italic">
                Offers{" "}
                {replaceSubjectPlaceholder(
                  stats.price.description,
                  formattedSubject,
                )}
              </p>
            </div>

            {/* Response Card */}
            <div
              className={`${stats.response.bgColor} p-6 rounded-3xl border ${stats.response.borderColor} flex flex-col justify-between min-h-[140px]`}
            >
              <div className="flex justify-between items-start">
                <span
                  className={`text-2xl font-bold ${stats.response.textColor} opacity-80`}
                >
                  {stats.response.value}{" "}
                  <span className="text-sm font-bold">{stats.response.unit}</span>
                </span>
                <Clock className={stats.response.iconColor} size={20} />
              </div>
              <p className="text-[12px] leading-relaxed text-gray-600 italic">
                Our {formattedSubject} {stats.response.description}
              </p>
            </div>
          </section>

          {reviewsList && reviewsList.length > 0 && (
            <section className="max-w-6xl mx-auto px-4 py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-10">
                Our students review their {formattedSubject} instructor
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {reviewsList.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">
                        {review.initial}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{review.name}</h4>
                        <div className="flex text-orange-500 text-xs">
                          {"★".repeat(review.rating || 5)}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed italic">
                      {replaceSubjectPlaceholder(review.message || review.text, formattedSubject)}
                    </p>
                    <p className="mt-4 text-[10px] text-gray-400 uppercase font-semibold">
                      {review.timeAgo}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}

      <section className="max-w-6xl mx-auto px-4 py-24">
        <h2 className="text-4xl font-black text-gray-900 mb-10 tracking-tight">
          FAQ
        </h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.id}
              className="group bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden transition-all"
            >
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                <span className="font-semibold text-gray-800">
                  {replaceSubjectPlaceholder(faq.question, formattedSubject)}
                </span>
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-open:bg-orange-50 transition-colors">
                  <ChevronDown
                    className="text-gray-500 group-open:rotate-180 transition-transform"
                    size={20}
                  />
                </div>
              </summary>
              <div className="p-6 pt-0 text-gray-600 text-sm border-t border-gray-50 bg-gray-50/30">
                {replaceSubjectPlaceholder(faq.answer, formattedSubject)}
              </div>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}