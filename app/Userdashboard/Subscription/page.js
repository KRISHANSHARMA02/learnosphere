"use client";

import React, { Suspense, useState, useEffect } from "react";
import {
  Star,
  Check,
  Heart,
  ArrowLeft,
  ShieldCheck,
  Pencil,
  Clock,
  Loader2
} from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast"; 
import VerifiedBadge from "@/components/VerifiedBadge";
import { getTutorImageSrc, handleTutorImageError } from "@/src/utils/tutorImageHelper";
import SlotBookPopup from "@/components/SlotBookPopup";

const StudentPassContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session, status } = useSession();

  // --- Data Extraction from URL ---
  const dataString = searchParams.get("data");
  
  let rawTeacher = null;
  if (dataString) {
    try {
      rawTeacher = JSON.parse(dataString);
    } catch (error) {
      try {
        rawTeacher = JSON.parse(decodeURIComponent(dataString));
      } catch (fallbackError) {
        console.error("Error parsing teacher data:", fallbackError);
      }
    }
  }

  // 👇 1. BULLETPROOF PRICE PARSING (Fixes the comma and baseRate issues)
  const safeParsePrice = (val) => Number(val?.toString().replace(/,/g, '') || 0);

  const subject = searchParams.get("subject") || "Subject";
  const packagePrice = rawTeacher?.selectedPackage?.price;
  const fallbackBasePrice = rawTeacher?.baseRate || rawTeacher?.price || 500;
  
  // If a package is selected, use that price. Otherwise, use the base rate.
  const finalPrice = packagePrice ? safeParsePrice(packagePrice) : safeParsePrice(fallbackBasePrice);

  const teacher = {
  id: rawTeacher?.tutorid || rawTeacher?.tutorId || rawTeacher?.RegistrationNumber || rawTeacher?.id || "UNKNOWN_TUTOR",
    name: rawTeacher?.name || "Teacher",
    price: finalPrice, // ✅ This seamlessly replaces the "Session Fee" across the whole page!
    originalPrice: safeParsePrice(rawTeacher?.originalPrice || 599),
    currency: rawTeacher?.currency?.symbol || "₹",
    imageUrl: getTutorImageSrc(rawTeacher),
    gender: rawTeacher?.gender,
    rating: rawTeacher?.rating || 5,
    reviewCount: rawTeacher?.reviewCount || 0,
    isApproved: rawTeacher?.isApproved ?? false,
    subject: subject,
    defaultSlot: rawTeacher?.slot || "Select a Slot",
    mode: rawTeacher?.mode || "Online",
    selectedPackage: rawTeacher?.selectedPackage || null, 
  };

  // --- Dynamic State ---
  const [showModal, setShowModal] = useState(false);
  const [currentSlot, setCurrentSlot] = useState(teacher.defaultSlot);
  
  const [studentId, setStudentId] = useState("");
  const [isBooking, setIsBooking] = useState(false);

  const [isLoadingWallet, setIsLoadingWallet] = useState(true);
  const [walletData, setWalletData] = useState({
    totalBalance: 0, 
    topupBalance: 0,
    rewardCredits: 0,
    platformChargePercent: 0,
    isPlatformChargeDiscount: false, 
    currencySymbol: "₹"
  });

  // --- API Fetching Logic ---
  useEffect(() => {
    const fetchWalletDetails = async () => {
      if (status !== "authenticated" || !session?.user?.email) return;

      try {
        const userRes = await fetch("/api/getUser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: session.user.email, gmail: session.user.email })
        });
        
        const userData = await userRes.json();
        
        const userId = userData?.user?.registrationNumber || "";
        const studentIso = userData?.user?.countryIso || "IN";

        if (userId) {
          setStudentId(userId); 
          
          const summaryRes = await fetch(`https://mobileapp.backend.learnosphere.in/api/route/get_student_wallet_summary/${userId}?isoCode=${studentIso}`);
          const summary = await summaryRes.json();
          
          setWalletData({
            totalBalance: summary.totalBalance || 0, 
            topupBalance: summary.topupBalance || 0,
            rewardCredits: summary.rewardCredits || 0,
            platformChargePercent: summary.platformChargePercent || 0, 
            isPlatformChargeDiscount: summary.isPlatformChargeDiscount || false, 
            currencySymbol: summary.currencySymbol || "₹"
          });
        }
      } catch (error) {
        console.error("Error in API Fetching:", error);
      } finally {
        setIsLoadingWallet(false);
      }
    };

    if (status === "authenticated") {
      fetchWalletDetails();
    } else if (status === "unauthenticated") {
      setIsLoadingWallet(false);
    }
  }, [session, status]);

  // --- Exact Math Calculations ---
  const rawPlatformCharges = (teacher.price * walletData.platformChargePercent) / 100;
  const platformCharges = walletData.isPlatformChargeDiscount ? 0 : rawPlatformCharges;
    
  const totalPayable = teacher.price + platformCharges; 
  const amountNeeded = Math.max(0, totalPayable - walletData.totalBalance); 
  const isBalanceSufficient = walletData.totalBalance >= totalPayable;
  const displayCurrency = walletData.currencySymbol || teacher.currency; 

  // --- Handlers ---
  const handleSlotSelection = (newSlot) => {
    setCurrentSlot(newSlot);
    setShowModal(false);
  };

  const handleBookingAction = async () => {
    if (!currentSlot || currentSlot === "Select a Slot") {
      toast.error("Please choose a time slot first!", {
        style: { borderRadius: "12px", background: "#333", color: "#fff" },
        iconTheme: { primary: "#f97316", secondary: "#fff" },
      });
      setShowModal(true); 
      return; 
    }

    if (!isBalanceSufficient) {
      router.push(`/Userdashboard/Wallet/AddMoney?required=${amountNeeded}`);
      return;
    }

    if (!studentId) {
      toast.error("User details not found. Please log in again.");
      return;
    }

    const cleanDateString = currentSlot.replace(" • ", " ") + ` ${new Date().getFullYear()}`;
    const scheduledTimeISO = new Date(cleanDateString).toISOString();

    // 👇 2. PAYLOAD PACKAGE DATA (Safely grabs sessions/hours so backend generates the right amount of sessions)
    const packageSessions = teacher.selectedPackage?.totalSessions || teacher.selectedPackage?.hours || 1;

    const payload = {
      student_id: studentId,
      tutor_id: teacher.id,
      amount: totalPayable, // ✅ This will deduct the exact package price + platform fee!
      currencyCode: "INR", 
      currencySymbol: displayCurrency,
      subject: teacher.subject,
      mode: teacher.mode,
      scheduled_time: scheduledTimeISO,
      duration_minutes: 60, 
      packageData: teacher.selectedPackage ? {
        name: teacher.selectedPackage.name,
        paidSessions: parseInt(packageSessions),
        freeSessions: 0,
        totalSessions: parseInt(packageSessions)
      } : {
        name: "Single Session",
        paidSessions: 1,
        freeSessions: 0,
        totalSessions: 1
      }
    };

    setIsBooking(true);
    const toastId = toast.loading("Processing Booking & Creating session Link...");

    try {
      const response = await fetch("https://mobileapp.backend.learnosphere.in/api/route/bookSessionWithWallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Booking Confirmed! 🎉", { id: toastId });
        
        setTimeout(() => {
          router.push("/Userdashboard/classess");
        }, 1500);

      } else {
        toast.error(data.message || "Failed to book session", { id: toastId });
      }
    } catch (error) {
      console.error("Booking Error:", error);
      toast.error("Server error. Please try again later.", { id: toastId });
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans relative">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Navbar */}
      <div className="bg-white px-6 py-4 sticky top-0 z-10 border-b border-gray-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors inline-flex items-center gap-2 text-gray-600 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:text-orange-500" />
            <span className="font-semibold text-sm">Back</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex items-start justify-center p-6 md:p-12">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col items-center text-center lg:sticky lg:top-24">
              <div className="w-40 h-40 rounded-3xl overflow-hidden shadow-md mb-4 bg-gray-200">
                <img
                  src={teacher.imageUrl}
                  alt={teacher.name}
                  className="w-full h-full object-cover"
                  onError={(e) => handleTutorImageError(e, teacher)}
                />
              </div>
              <div className="flex items-center justify-center gap-1 mt-2">
                <h2 className="text-2xl font-bold text-gray-900 capitalize mb-2">
                  {teacher.name}
                </h2>
                <VerifiedBadge isApproved={teacher.isApproved} />
              </div>
              <div className="flex items-center gap-2 mb-6">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill={i < teacher.rating ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <span className="text-gray-400 text-sm">
                  ({teacher.reviewCount} reviews)
                </span>
              </div>
              <div className="flex items-start gap-3 mt-4 pt-6 border-t border-gray-100 w-full text-left">
                <Heart className="w-6 h-6 text-orange-500 fill-orange-500 flex-shrink-0 mt-1" />
                <p className="text-sm text-gray-600 leading-relaxed">
                  <span className="font-bold text-gray-900 capitalize">
                    {teacher.name}
                  </span>{" "}
                  offers their first lesson for free in order to get to know
                  you.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-10">
              
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-extrabold text-gray-900">
                  Booking Summary
                </h1>
                <div className="bg-orange-50 text-orange-600 font-bold px-4 py-2 rounded-xl text-lg border border-orange-100 flex items-center gap-2">
                  {teacher.originalPrice > teacher.price && !teacher.selectedPackage && (
                    <span className="text-gray-400 line-through text-sm font-normal">
                      {displayCurrency}{teacher.originalPrice}
                    </span>
                  )}
                  <span>
                    {displayCurrency}{teacher.price}
                  </span>
                </div>
              </div>

              {/* Display Selected Package */}
              {teacher.selectedPackage && (
                <div className="bg-orange-50/80 border border-orange-200 rounded-2xl p-4 mb-6 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-orange-600 font-bold uppercase tracking-wider mb-1">Selected Package</p>
                    <p className="text-gray-900 font-bold text-lg">{teacher.selectedPackage.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-500 text-sm font-medium">
                      {teacher.selectedPackage.totalSessions || teacher.selectedPackage.hours} Sessions
                    </p>
                  </div>
                </div>
              )}

              {/* Benefits */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-black mt-0.5" strokeWidth={3} />
                    <p className="text-gray-700 text-sm font-medium">
                      Charged only when <span className="font-bold capitalize">{teacher.name}</span> accepts. <span className="text-orange-600 font-bold">1st course is free!</span>
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-black mt-0.5" strokeWidth={3} />
                    <p className="text-gray-700 text-sm font-medium">
                      Unlimited access to all teachers in all subjects.
                    </p>
                  </li>
                </ul>
              </div>

              {/* Grid Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                <div className="p-4 rounded-2xl bg-white border border-gray-100">
                  <p className="text-xs text-gray-400 font-bold uppercase mb-1">Mode</p>
                  <p className="text-orange-600 font-bold">{teacher.mode}</p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-gray-100">
                  <p className="text-xs text-gray-400 font-bold uppercase mb-1">Subject</p>
                  <p className="text-orange-600 font-bold">{teacher.subject}</p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-gray-100">
                  <p className="text-xs text-gray-400 font-bold uppercase mb-1">Slot</p>
                  <p className={`font-bold truncate ${currentSlot === "Select a Slot" ? "text-gray-400" : "text-orange-600"}`}>
                    {currentSlot.split("•")[0]}
                  </p>
                </div>
              </div>

              {/* Price Details */}
              <div className="mb-10">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  Price Details
                </h3>
                <div className="space-y-3 bg-gray-50/50 p-6 rounded-2xl border border-gray-50">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 font-medium">
                      {teacher.selectedPackage ? "Package Fee" : "Session Fee"}
                    </span>
                    <span className="font-bold text-gray-900">
                      {displayCurrency}{teacher.price}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm items-center">
                    <span className="text-gray-500 font-medium">Platform Charges</span>
                    <span className="font-bold text-gray-900 flex items-center gap-2">
                      {walletData.isPlatformChargeDiscount && rawPlatformCharges > 0 && (
                        <span className="text-gray-400 line-through font-normal">
                          {displayCurrency}{rawPlatformCharges}
                        </span>
                      )}
                      <span>{displayCurrency}{platformCharges}</span>
                    </span>
                  </div>

                  <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
                    <span className="font-bold text-gray-900 text-base">Total Payable</span>
                    <span className="font-extrabold text-orange-600 text-xl">
                      {displayCurrency}{totalPayable}
                    </span>
                  </div>
                </div>
              </div>

              {/* Wallet Details */}
              <div className="mb-10 p-6 rounded-2xl border border-gray-100 bg-white shadow-sm relative">
                {isLoadingWallet && (
                  <div className="absolute inset-0 bg-white/80 rounded-2xl z-10 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
                  </div>
                )}
                
                <h3 className="text-lg font-bold text-gray-900 mb-4">Wallet Details</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">Available Balance</span>
                    </div>
                    <span className="text-sm font-bold text-green-600">
                      {displayCurrency}{walletData.totalBalance}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Required Amount</span>
                    <span className="text-sm font-bold text-orange-600">
                      {displayCurrency}{totalPayable}
                    </span>
                  </div>
                  {!isLoadingWallet && !isBalanceSufficient && (
                    <div className="mt-2 p-3 bg-red-50 rounded-xl border border-red-100">
                      <p className="text-red-500 text-xs font-bold">
                        Insufficient Balance: Add {displayCurrency}{amountNeeded} more to continue
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="space-y-4 border-t border-gray-100 pt-8">
                <div
                  onClick={() => setShowModal(true)}
                  className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-colors group ${
                    currentSlot === "Select a Slot" 
                      ? "bg-red-50/50 border-red-200 hover:bg-red-50" 
                      : "bg-orange-50/50 border-orange-100 hover:bg-orange-100/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-white p-2 rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
                      <Clock className={`w-5 h-5 ${currentSlot === "Select a Slot" ? "text-red-500" : "text-orange-600"}`} />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase leading-none mb-1">
                        Scheduled Slot
                      </p>
                      <span className={`font-bold text-sm md:text-base ${currentSlot === "Select a Slot" ? "text-red-500" : "text-gray-900"}`}>
                        {currentSlot}
                      </span>
                    </div>
                  </div>
                  <button className="p-2 bg-white hover:bg-orange-200 rounded-lg transition-colors shadow-sm">
                    <Pencil className="w-4 h-4 text-gray-900" />
                  </button>
                </div>

                <button
                  onClick={handleBookingAction}
                  disabled={isLoadingWallet || isBooking}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-5 px-6 rounded-2xl shadow-xl shadow-orange-100 transition-all transform active:scale-[0.99] text-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoadingWallet ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Fetching Wallet...
                    </>
                  ) : isBooking ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                    </>
                  ) : isBalanceSufficient ? (
                    "Confirm Booking"
                  ) : (
                    `Add Money & Book`
                  )}
                </button>

                <div className="flex justify-center items-center gap-2 text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Secure SSL Encryption</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <SlotBookPopup
        tutorId={teacher.id}
          onClose={() => setShowModal(false)}
          onSelect={handleSlotSelection}
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
      <StudentPassContent />
    </Suspense>
  );
}