"use client";
import { APP_BACKEND_URL } from "@/src/helper/appbackend_api";

import React, { useState, Suspense, useEffect, useRef } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Gift, AlertCircle } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

const AddMoneyContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();

  // 1. Get initial amount from URL
  const initialAmount = searchParams.get('amount') || "";
  
  const [amount, setAmount] = useState(initialAmount);
  const [minAmount, setMinAmount] = useState(1);
  const [offers, setOffers] = useState([]); 
  const [currencySymbol, setCurrencySymbol] = useState("₹");

  const sliderRef = useRef(null);
  
  // States for UI and Modals
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [showUpsellModal, setShowUpsellModal] = useState(false); // Controls the popup

  // --- Fetch Configuration from Backend ---
  useEffect(() => {
    const fetchConfig = async () => {
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
            const summaryRes = await fetch(`${APP_BACKEND_URL}/api/route/get_student_wallet_summary/${userId}?isoCode=${studentIso}`);
            const summary = await summaryRes.json();

            if (summary.minTopupAmount) setMinAmount(summary.minTopupAmount);
            if (summary.currencySymbol) setCurrencySymbol(summary.currencySymbol);
            if (summary.topupOffers && summary.topupOffers.length > 0) {
                // Ensure offers are sorted from lowest to highest
                setOffers(summary.topupOffers.sort((a, b) => a.amount - b.amount));
            }
        }
      } catch (error) {
        console.error("Error fetching wallet config:", error);
      }
    };

    if (status === "authenticated") {
        fetchConfig();
    }
  }, [session, status]);


  // Slider Scroll Check
  const checkScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [offers]);

  const handleBack = () => router.back(); 

  const handleAmountChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setAmount(val);
  };

  const handleQuickAdd = (val) => {
    setAmount(val.toString());
    setShowUpsellModal(false); // Hide modal if they click an offer card
  };

  // --- SMART LOGIC CALCULATIONS ---
  const numericAmount = parseInt(amount) || 0;
  
  // Only trigger logic if they actually typed a number greater than 0
  const hasEnteredAmount = amount !== "" && numericAmount > 0;

  const isBelowMin = hasEnteredAmount && numericAmount < minAmount;
  const isProceedDisabled = !hasEnteredAmount || numericAmount < minAmount;
  
  // Find if they hit an exact offer, or find the next available offer
  const currentOffer = offers.find(o => o.amount === numericAmount);
  const nextOffer = offers.find(o => o.amount > numericAmount);
  const difference = nextOffer ? nextOffer.amount - numericAmount : 0;
  
  // ONLY show upsell if they typed something, it's >= minimum, and they haven't hit an offer yet!
  const shouldUpsell = hasEnteredAmount && !isBelowMin && !currentOffer && nextOffer;

  // --- Proceed Logic ---
  const handleProceedClick = () => {
    if (isProceedDisabled) return;

    // If there is a better offer they are missing, show the popup!
    if (shouldUpsell) {
      setShowUpsellModal(true);
    } else {
      // Otherwise, go straight to payment
      proceedToPayment(numericAmount);
    }
  };

  const proceedToPayment = (finalAmount) => {
    setShowUpsellModal(false);
    router.push(`/Userdashboard/Wallet/Payment?amount=${finalAmount}`);
  };

  const scroll = (direction) => {
    if (sliderRef.current) {
      const { current } = sliderRef;
      const scrollAmount = current.offsetWidth / 2;
      current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 flex flex-col items-center relative">
      <style>{`
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* --- Upsell Modal Popup --- */}
      {showUpsellModal && nextOffer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setShowUpsellModal(false)}
          ></div>
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full relative z-10 text-center animate-in zoom-in-95 duration-200 shadow-2xl">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
              <Gift className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-extrabold text-gray-900 mb-2">Wait! Don't miss out.</h3>
            <p className="text-gray-600 mb-6 text-sm font-medium">
              You are only <strong className="text-orange-600 text-base">{currencySymbol}{difference}</strong> away from unlocking a <strong className="text-green-600 text-base">+{nextOffer.bonus} bonus</strong>! Are you sure you want to proceed without it?
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => proceedToPayment(nextOffer.amount)}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-md shadow-green-200 active:scale-[0.98]"
              >
                Add {currencySymbol}{nextOffer.amount} & Get Bonus
              </button>
              <button 
                onClick={() => proceedToPayment(numericAmount)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-3.5 rounded-xl transition-all active:scale-[0.98]"
              >
                Proceed without bonus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- Navbar --- */}
      <div className="w-full bg-white px-6 py-4 sticky top-0 z-10 ">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <button 
            onClick={handleBack} 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 group"
          >
            <ArrowLeft className="w-6 h-6 group-hover:text-orange-500 transition-colors" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Add Money</h1>
        </div>
      </div>

      {/* --- Main Content --- */}
      <main className="w-full max-w-2xl px-4 py-12 flex flex-col items-center flex-1 justify-center mt-[-50px]"> 
        
        <p className="text-gray-500 font-medium mb-8">Enter Amount to Add</p>

        {/* Amount Input Display */}
        <div className="relative mb-2 w-full flex justify-center items-center">
          <span className={`text-5xl font-bold mr-2 transition-colors ${amount ? 'text-orange-600' : 'text-gray-300'}`}>
            {currencySymbol}
          </span>
          <input 
            type="text" 
            value={amount}
            onChange={handleAmountChange}
            placeholder="0"
            autoFocus
            className="w-auto max-w-[250px] bg-transparent text-center text-6xl font-bold text-orange-600 placeholder-gray-300 focus:outline-none caret-orange-500"
          />
        </div>

        {/* --- REAL-TIME VALIDATION & UPSELL TEXT (UPDATED) --- */}
        <div className="h-8 mb-8 text-center flex items-center justify-center">
            {/* Only show messages if user has actually entered a number > 0 */}
            {hasEnteredAmount && (
                <>
                    {isBelowMin ? (
                        // Priority 1: Red warning if below minimum
                        <p className="text-sm text-red-500 font-bold flex items-center gap-1 animate-pulse">
                        <AlertCircle className="w-4 h-4" /> Amount must be at least {currencySymbol}{minAmount}
                        </p>
                    ) : shouldUpsell ? (
                        // Priority 2: Green upsell if they can get a bigger bonus
                        <p className="text-sm text-green-600 font-bold animate-in fade-in slide-in-from-bottom-2">
                        Add {currencySymbol}{difference} more to unlock a +{nextOffer.bonus} bonus! 🎁
                        </p>
                    ) : null /* Show nothing if it's an exact offer */}
                </>
            )}
            {/* If hasEnteredAmount is false (empty/0), nothing shows here. */}
        </div>

        {/* Dynamic Quick Amount Cards with Arrows */}
        {offers.length > 0 && (
          <div className="relative w-full flex items-center mb-12 group">
            
            {canScrollLeft && (
              <button 
                onClick={() => scroll('left')}
                className="absolute -left-4 z-10 bg-white border border-gray-100 shadow-md rounded-full p-2 text-gray-400 hover:text-orange-500 hover:scale-110 transition-all hidden md:flex items-center justify-center"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            <div 
              ref={sliderRef}
              onScroll={checkScroll}
              className="flex overflow-x-auto gap-3 w-full hide-scroll snap-x snap-mandatory px-2 py-4 scroll-smooth"
            >
              {offers.map((opt, idx) => {
                const isSelected = numericAmount === opt.amount;
                return (
                  <button
                    key={opt.id || idx}
                    onClick={() => handleQuickAdd(opt.amount)}
                    className={`flex-none snap-start w-[30%] md:w-[22%] lg:w-[18%] border-2 rounded-2xl p-3 flex flex-col items-center justify-center transition-all shadow-sm active:scale-95 ${
                      isSelected 
                        ? "border-orange-500 bg-orange-50 scale-105 shadow-md shadow-orange-100" 
                        : "bg-white border-orange-100 hover:border-orange-400 hover:bg-orange-50/50"
                    }`}
                  >
                    <span className={`text-lg font-bold transition-colors ${isSelected ? "text-orange-600" : "text-gray-800"}`}>
                      {currencySymbol}{opt.amount}
                    </span>
                    {opt.bonus > 0 && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 whitespace-nowrap transition-colors ${
                        isSelected ? "bg-orange-200 text-orange-700" : "text-green-600 bg-green-50"
                      }`}>
                        +{opt.bonus} bonus
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            {canScrollRight && (
              <button 
                onClick={() => scroll('right')}
                className="absolute -right-4 z-10 bg-white border border-gray-100 shadow-md rounded-full p-2 text-gray-400 hover:text-orange-500 hover:scale-110 transition-all hidden md:flex items-center justify-center"
              >
                <ChevronRight size={24} />
              </button>
            )}
            
          </div>
        )}

        {/* Proceed Button */}
        <button 
          onClick={handleProceedClick}
          disabled={isProceedDisabled}
          className={`w-full max-w-md py-4 rounded-2xl font-bold text-lg shadow-lg transition-all transform active:scale-[0.98] ${
            isProceedDisabled
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600 text-white shadow-orange-200" 
          }`}
        >
          {isProceedDisabled ? "Enter valid amount" : `Proceed to Pay ${currencySymbol}${amount}`}
        </button>

      </main>
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
      <AddMoneyContent />
    </Suspense>
  );
}