"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";

import React, { useState, useEffect, Suspense } from "react";
import {
  Star,
  ArrowLeft,
  Zap,
  ChevronRight,
  Pencil,
  Check,
} from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import VerifiedBadge from "@/components/VerifiedBadge";
import { getTutorImageSrc, handleTutorImageError } from "@/src/utils/tutorImageHelper";

// 👇 1. Import the new Package Popup
import PackageSelectPopup from "./PackageSelectPopup";

const BookingFormContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session, status } = useSession();

  // --- 1. Teacher Data Setup ---
  const dataString = searchParams.get("data");
  const rawTeacher = dataString
    ? JSON.parse(decodeURIComponent(dataString))
    : null;

  const teacher = {
    name: rawTeacher?.name || "Teacher",
    price: rawTeacher?.baseRate || "2500", // Make sure this is a number in your logic
    currency: rawTeacher?.currency?.symbol || "₹",
    imageUrl: getTutorImageSrc(rawTeacher),
    gender: rawTeacher?.gender,
    rating: rawTeacher?.rating || 5,
    reviewCount: rawTeacher?.reviewCount || 0,
    responseTime: rawTeacher?.responseTime || "2 hours",
    isSuperHost: true,
    isApproved: rawTeacher?.isApproved ?? false,
  };

  const [formData, setFormData] = useState({
    message: "",
    address: "",
    phone: "",
  });

  const [isEditingMessage, setIsEditingMessage] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [loading, setLoading] = useState(true);

  // 👇 2. State to control the Package Popup
  const [showPackagePopup, setShowPackagePopup] = useState(false);

  const subject = searchParams.get("subject") || "tuition";

  // ✅ STEP 1: Message Template
  useEffect(() => {
    if (teacher.name) {
      setFormData((prev) => {
        if (prev.message && !prev.message.includes("My name is Student"))
          return prev;

        return {
          ...prev,
          message: `Hello ${teacher.name},\nMy name is Student and I am looking for a ${subject} teacher.\nI would like to take classes online.\nIdeally, I'd like to start classes as soon as possible.\nWould that work for you? Can you get in touch with me to discuss it further?`,
        };
      });
    }
  }, [teacher.name, subject]);

  // ✅ STEP 2: API Call using SESSION EMAIL
  useEffect(() => {
    const fetchStudentByEmail = async () => {
      if (status === "loading") return;

      if (!session?.user?.email) {
        console.log("⚠️ No session email found. User might be logged out.");
        setLoading(false);
        return;
      }

      const userEmail = session.user.email;

      try {
        const response = await fetch(
          `${WEB_BACKEND_URL}/api/route/getStudentByEmail`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ gmail: userEmail }),
          },
        );

        if (response.ok) {
          const userData = await response.json();

          const fetchedPhone = userData.mobileNumber || userData.phone || "";
          const fetchedName =
            userData.studentName || userData.name || "Student";
          const rawAddr = userData.address || "";
          const rawCity = userData.city || "";
          const fetchedAddress = rawCity ? `${rawAddr}, ${rawCity}` : rawAddr;

          setFormData((prev) => ({
            ...prev,
            address: fetchedAddress,
            phone: fetchedPhone,
            message: teacher.name
              ? `Hello ${teacher.name},\nMy name is ${fetchedName} and I am looking for a ${subject} teacher.\nI would like to take classes online.\nIdeally, I'd like to start classes as soon as possible.\nWould that work for you? Can you get in touch with me to discuss it further?`
              : prev.message,
          }));
        }
      } catch (error) {
        console.error("❌ NETWORK ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentByEmail();
  }, [session, status, teacher.name, subject]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 👇 3. Opens the popup instead of navigating instantly
  const handleNextClick = () => {
    if (!rawTeacher) return;
    setShowPackagePopup(true);
  };

  // 👇 4. Handles the actual navigation once a package is selected
  const handlePackageSelection = (selectedPkg) => {
    setShowPackagePopup(false);

    // Add the chosen package data into the teacher object so the Subscription page knows what they bought
    const updatedTeacherData = {
      ...rawTeacher,
      selectedPackage: selectedPkg,
    };

    const teacherDataString = encodeURIComponent(
      JSON.stringify(updatedTeacherData),
    );
    const encodedSubject = encodeURIComponent(subject);

    router.push(
      `/Userdashboard/Subscription?data=${teacherDataString}&subject=${encodedSubject}`,
    );
  };

  if (!rawTeacher) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
        <p className="text-gray-500 mb-4">No teacher data found.</p>
        <button
          onClick={() => router.back()}
          className="text-orange-500 font-bold hover:underline"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 pt-0 pb-12">
      {/* Navigation Header */}
      <nav className="px-4 py-3  bg-white mb-6 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center gap-2 group"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-orange-500 transition-colors" />
            <span className="font-semibold text-gray-600 text-sm group-hover:text-orange-500 transition-colors">
              Back to Profile
            </span>
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* --- LEFT COLUMN: Teacher Profile --- */}
        <div className="md:col-span-4 flex flex-col items-center">
          <div className="bg-white rounded-3xl shadow-lg p-6 w-full max-w-sm flex flex-col items-center relative border border-gray-100">
            <div className="relative mb-4">
              <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-sm bg-gray-200">
                <img
                  src={teacher.imageUrl}
                  alt={teacher.name}
                  className="w-full h-full object-cover"
                  onError={(e) => handleTutorImageError(e, teacher)}
                />
              </div>
              <div className="absolute -bottom-2 -right-4 bg-orange-500 text-white font-bold py-1 px-3 rounded-full shadow-md text-sm flex items-center">
                <span>
                  {teacher.currency}
                  {teacher.price}
                </span>
                <span className="text-xs font-normal ml-1">/hr</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-1 mt-2">
              <h2 className="text-xl font-bold text-gray-900 capitalize">
                {teacher.name}
              </h2>
              <VerifiedBadge isApproved={teacher.isApproved} />
            </div>
            <div className="flex items-center gap-1 mt-1 text-sm">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < teacher.rating ? "currentColor" : "none"}
                    className={
                      i < teacher.rating ? "text-amber-400" : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="text-gray-400 text-xs font-medium">
                ({teacher.reviewCount} reviews)
              </span>
            </div>

            {teacher.isSuperHost && (
              <p className="text-orange-500 font-medium text-sm mt-2">
                1st class free!
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 mt-4 text-xs font-medium text-gray-500">
            <Zap size={14} className="text-yellow-500 fill-yellow-500" />
            <span>Available & responds in {teacher.responseTime}</span>
          </div>
        </div>

        {/* --- RIGHT COLUMN: Form Section --- */}
        <div className="md:col-span-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Schedule</h1>
            <p className="text-gray-500 font-medium">
              Your first class with{" "}
              <span className="text-orange-500 font-bold capitalize">
                {teacher.name}
              </span>
            </p>
          </div>

          {/* Message Section */}
          <div className="mb-8">
            <div className="flex justify-between items-end mb-3">
              <h3 className="font-bold text-gray-900">Your message</h3>

              <button
                onClick={() => setIsEditingMessage(!isEditingMessage)}
                className={`text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 transition-all shadow-sm ${
                  isEditingMessage
                    ? "bg-orange-100 text-orange-700 hover:bg-orange-200 border border-orange-200"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {isEditingMessage ? (
                  <>
                    <Check size={14} /> Save
                  </>
                ) : (
                  <>
                    <Pencil size={12} /> Edit
                  </>
                )}
              </button>
            </div>

            <div className="relative">
              <textarea
                name="message"
                disabled={!isEditingMessage}
                value={formData.message}
                onChange={handleInputChange}
                className={`w-full rounded-xl p-4 text-sm leading-relaxed resize-none h-40 transition-all bg-orange-50 ${
                  isEditingMessage
                    ? "border border-orange-300 focus:outline-none focus:ring-4 focus:ring-orange-200 shadow-sm text-gray-900"
                    : "border border-transparent text-gray-500 cursor-not-allowed"
                }`}
              />
            </div>
          </div>

          {/* Contact Details */}
          <div className="mb-8">
            <div className="flex justify-between items-end mb-4">
              <div>
                <h3 className="font-bold text-gray-900">Contact details</h3>
                <p className="text-xs text-gray-400 mt-1">
                  This information will only be communicated to the teacher.
                </p>
              </div>

              <button
                onClick={() => setIsEditingContact(!isEditingContact)}
                className={`text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 transition-all shadow-sm ${
                  isEditingContact
                    ? "bg-orange-100 text-orange-700 hover:bg-orange-200 border border-orange-200"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {isEditingContact ? (
                  <>
                    <Check size={14} /> Save
                  </>
                ) : (
                  <>
                    <Pencil size={12} /> Edit
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className={`transition-all duration-300 rounded-xl px-4 py-2 border bg-orange-50 ${
                  isEditingContact
                    ? "border-orange-300 shadow-sm ring-2 ring-orange-200"
                    : "border-transparent"
                }`}
              >
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Address
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    name="address"
                    disabled={!isEditingContact}
                    value={
                      loading && !formData.address
                        ? "Loading..."
                        : formData.address
                    }
                    onChange={handleInputChange}
                    className="bg-transparent border-none w-full text-sm font-semibold text-gray-600 focus:outline-none disabled:text-gray-500 disabled:cursor-not-allowed placeholder-gray-400"
                    placeholder="Enter your address"
                    style={{ WebkitBoxShadow: "0 0 0 1000px #fff7ed inset" }}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div
                className={`transition-all duration-300 rounded-xl px-4 py-2 border bg-orange-50 ${
                  isEditingContact
                    ? "border-orange-300 shadow-sm ring-2 ring-orange-200"
                    : "border-transparent"
                }`}
              >
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Phone number
                </label>
                <div className="flex items-center">
                  <span
                    className={`mr-2 text-lg transition-opacity ${!isEditingContact ? "opacity-50" : "opacity-100"}`}
                  >
                    🇮🇳
                  </span>
                  <input
                    type="text"
                    name="phone"
                    disabled={!isEditingContact}
                    value={
                      loading && !formData.phone ? "Loading..." : formData.phone
                    }
                    onChange={handleInputChange}
                    className="bg-transparent border-none w-full text-sm font-semibold text-gray-600 focus:outline-none disabled:text-gray-500 disabled:cursor-not-allowed placeholder-gray-400"
                    placeholder="Phone Number"
                    style={{ WebkitBoxShadow: "0 0 0 1000px #fff7ed inset" }}
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            {/* 👇 5. Changed to handleNextClick to open popup */}
            <button
              onClick={handleNextClick}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-12 rounded-xl shadow-lg shadow-orange-200 transition-all flex items-center gap-2 transform active:scale-95"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </main>

      {/* 👇 6. Renders the Popup conditionally */}
      {/* 👇 Renders the Popup conditionally */}
      {showPackagePopup && (
        <PackageSelectPopup
          currency={teacher.currency}
          basePrice={parseInt(teacher.price.toString().replace(/,/g, "")) || 0}
          packages={rawTeacher.packages} // 👈 Added this line! Passes your API packages to the popup
          onClose={() => setShowPackagePopup(false)}
          onSelect={handlePackageSelection}
        />
      )}
    </div>
  );
};

export default function Page() {
  const CustomLoader = (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="flex items-center justify-center border-4 border-slate-500 rounded-xl animate-pulse">
        <span className="text-xl font-bold text-gray-600 p-3">
          Learn<span className="text-orange-600">O</span>sphere..
        </span>
      </div>
    </div>
  );

  return (
    <Suspense fallback={CustomLoader}>
      <BookingFormContent />
    </Suspense>
  );
}
