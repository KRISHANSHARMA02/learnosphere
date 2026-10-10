import React from "react";
import { getSecureTeacherList } from "@/src/lib/actions/AvailableTeacherAction"; 
import { FiMapPin, FiStar, FiClock, FiBook, FiGlobe, FiDollarSign } from "react-icons/fi";
import Link from "next/link";

export default async function TeacherProfilePage({ params }) {
  // 1. Fetch Teacher Data Securely on Server
  const teacher = await getSecureTeacherList(params.id);

  // 2. Handle Not Found
  if (!teacher) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-800">Teacher Not Found</h2>
        <Link href="/UserDashboard/Availableteacher" className="mt-4 text-orange-600 hover:underline">
          Go Back to List
        </Link>
      </div>
    );
  }

  // 3. Render Profile (Orange & White Theme)
  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden">
        
        {/* Header Section */}
        <div className="relative h-48 bg-gradient-to-r from-orange-400 to-orange-600">
           <div className="absolute -bottom-16 left-8 md:left-12">
              <img 
                src={teacher.image} 
                alt={teacher.name} 
                className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white object-cover shadow-lg bg-white"
              />
           </div>
        </div>

        <div className="pt-20 pb-8 px-8 md:px-12">
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                 <h1 className="text-3xl font-bold text-gray-900">{teacher.name}</h1>
                 <p className="text-orange-600 font-medium text-lg">{teacher.subject} Tutor</p>
                 <div className="flex items-center gap-4 mt-2 text-gray-500 text-sm">
                    <span className="flex items-center gap-1"><FiMapPin /> {teacher.city}</span>
                    <span className="flex items-center gap-1"><FiGlobe /> {teacher.language}</span>
                    <span className="flex items-center gap-1 text-orange-500 font-bold"><FiStar /> {teacher.rating} ({teacher.reviews} Reviews)</span>
                 </div>
              </div>
              <div className="flex flex-col items-end">
                 <span className="text-2xl font-bold text-gray-900">{teacher.baseRate} {teacher.currencySymbol}<span className="text-sm text-gray-500 font-normal">/hr</span></span>
                 <button className="mt-3 px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-full shadow-lg shadow-orange-200 transition-all">
                    Book Class
                 </button>
              </div>
           </div>

           {/* Divider */}
           <div className="h-px bg-gray-100 my-8"></div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left Column: Bio & Details */}
              <div className="md:col-span-2 space-y-6">
                 <section>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">About Me</h3>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                       {teacher.bio}
                    </p>
                 </section>

                 <section>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Subjects</h3>
                    <div className="flex flex-wrap gap-2">
                       {teacher.allSubjects.map((sub, index) => (
                          <span key={index} className="px-4 py-1.5 bg-orange-50 text-orange-700 rounded-full text-sm font-medium border border-orange-100">
                             {sub}
                          </span>
                       ))}
                    </div>
                 </section>
              </div>

              {/* Right Column: Stats */}
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 h-fit">
                 <h3 className="text-lg font-bold text-gray-900 mb-4">Tutor Stats</h3>
                 <div className="space-y-4">
                    <div className="flex items-center gap-3">
                       <div className="p-2 bg-white rounded-lg text-orange-500 shadow-sm"><FiClock /></div>
                       <div>
                          <p className="text-xs text-gray-500 uppercase font-bold">Experience</p>
                          <p className="text-gray-900 font-medium">{teacher.rawExperience} Years</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-3">
                       <div className="p-2 bg-white rounded-lg text-orange-500 shadow-sm"><FiDollarSign /></div>
                       <div>
                          <p className="text-xs text-gray-500 uppercase font-bold">Price</p>
                          <p className="text-gray-900 font-medium">{teacher.baseRate} {teacher.currencySymbol} / Hour</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}