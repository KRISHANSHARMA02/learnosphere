
"use client";

import React, { Suspense, useState, useEffect } from 'react';
import { ArrowLeft, Tag, Receipt, Lock, Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import toast, { Toaster } from 'react-hot-toast'; 

// 👇 IMPORT YOUR UTILITY FUNCTION HERE
// Make sure this path points to where your razorpayUtils file is located!
import { processWalletTopUp } from '@/src/utils/WalletPayment'; 

const PaymentConfirmationContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();

  const rawAmount = searchParams.get('amount');
  const topUpAmount = rawAmount ? parseInt(rawAmount) : 0;

  const [currencySymbol, setCurrencySymbol] = useState("₹");
  const [currencyCode, setCurrencyCode] = useState("INR");
  const [gstPercent, setGstPercent] = useState(18); 
  const [offer, setOffer] = useState({ bonus: 0, message: "" });
  const [offerId, setOfferId] = useState(null); 
  const [userId, setUserId] = useState(null); 
  
  const [isProcessing, setIsProcessing] = useState(false);

  const gstAmount = Math.round(topUpAmount * (gstPercent / 100));
  const totalPayable = topUpAmount + gstAmount;

  useEffect(() => {
    const checkActiveOffer = async () => {
        if (status !== "authenticated" || !session?.user?.email || topUpAmount <= 0) return;

        try {
            const userRes = await fetch("/api/getUser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: session.user.email, gmail: session.user.email })
            });
            const userData = await userRes.json();
            
            const fetchedUserId = userData?.user?.registrationNumber || "";
            const studentIso = userData?.user?.countryIso || "IN";

            if (fetchedUserId) {
                setUserId(fetchedUserId); 

                const offersRes = await fetch(`https://mobileapp.backend.learnosphere.in/api/route/get_student_wallet_summary/${fetchedUserId}?isoCode=${studentIso}`);
                const summary = await offersRes.json();
                
                if (summary.currencySymbol) setCurrencySymbol(summary.currencySymbol);
                if (summary.currencyCode) setCurrencyCode(summary.currencyCode); 
                if (summary.gstPercent !== undefined) setGstPercent(summary.gstPercent);
                
                if (summary.topupOffers) {
                    const activeOffer = summary.topupOffers.find(o => o.amount === topUpAmount);
                    
                    if (activeOffer) {
                        setOffer({
                            bonus: activeOffer.bonus,
                            message: activeOffer.title || "Special Offer Applied!"
                        });
                        setOfferId(activeOffer.id); 
                    }
                }
            }
        } catch (error) {
            console.error("Error checking offers:", error);
        }
    };

    checkActiveOffer();
  }, [topUpAmount, session, status]);

  // --- CLEANED UP PAYMENT HANDLER ---
  const handlePayment = async () => {
      if (!userId) {
          toast.error("User details not fully loaded. Please wait.");
          return;
      }

      setIsProcessing(true); // Start the loading spinner

      // 👇 Call the function from your second file and pass EVERYTHING as parameters
      await processWalletTopUp({
          totalPayable: totalPayable,
          currencyCode: currencyCode,
          topUpAmount: topUpAmount,
          currencySymbol: currencySymbol,
          gstAmount: gstAmount,
          userId: userId,
          offerId: offerId,
          userEmail: session?.user?.email,
          
          // What to do if the backend says SUCCESS
          onSuccess: (message) => {
              toast.success(message || "Wallet recharged successfully!");
              setTimeout(() => router.push("/Userdashboard/Wallet"), 1500); 
          },
          
          // What to do if the backend/Razorpay says FAILURE
          onFailure: (errorMessage) => {
              toast.error(errorMessage || "Payment failed.");
              setIsProcessing(false); // Stop the spinner so they can try again
          }
      });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 flex flex-col relative">
      <Toaster position="top-center" />
      
      {/* Header */}
      <div className="bg-white px-6 py-4 sticky top-0 z-10 w-full shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()} 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Wallet Top-up</h1>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-md mx-auto w-full p-6 space-y-6">
        
        {/* Amount Card */}
        <div className="bg-orange-500 rounded-3xl p-8 text-center text-white shadow-orange-200 shadow-xl">
           <p className="text-orange-100 font-medium text-sm uppercase tracking-wide mb-2">Wallet Top-up</p>
           <h1 className="text-5xl font-extrabold">{currencySymbol}{topUpAmount}</h1>
        </div>

        {/* Dynamic Bonus Banner */}
        {offer.bonus > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-500">
             <Tag className="w-5 h-5 text-green-600 fill-green-600" />
             <div>
                <p className="text-green-700 font-bold text-sm">Offer Applied!</p>
                <p className="text-green-600 text-xs">{offer.message}</p>
             </div>
          </div>
        )}

        {/* Receipt Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
           <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg text-gray-900">Payment Receipt</h3>
              <Receipt className="w-5 h-5 text-orange-500" />
           </div>

           <div className="space-y-4">
              <div className="flex justify-between text-sm">
                 <span className="text-gray-500 font-medium">Top-up Amount</span>
                 <span className="font-bold text-gray-900">{currencySymbol}{topUpAmount}</span>
              </div>
              
              <div className="h-px bg-gray-100 my-2"></div>

              <div className="flex justify-between text-sm">
                 <span className="text-gray-500 font-medium">Subtotal</span>
                 <span className="font-bold text-gray-900">{currencySymbol}{topUpAmount}</span>
              </div>
              <div className="flex justify-between text-sm">
                 <span className="text-gray-500 font-medium">GST ({gstPercent}%)</span>
                 <span className="font-bold text-gray-900">{currencySymbol}{gstAmount}</span>
              </div>

              <div className="h-px bg-gray-100 my-2"></div>

              <div className="flex justify-between text-base">
                 <span className="font-bold text-gray-900">Total Payable</span>
                 <span className="font-extrabold text-orange-600 text-xl">{currencySymbol}{totalPayable}</span>
              </div>
           </div>

           {/* Bonus Note in Receipt */}
           {offer.bonus > 0 && (
             <div className="mt-6 bg-green-50/50 rounded-xl p-3 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-xs text-green-700 font-medium">
                   You will receive <strong>{offer.bonus} bonus credits</strong>
                </p>
             </div>
           )}
        </div>

        {/* Secure Note */}
        <div className="flex justify-center items-center gap-2 text-xs text-gray-400 font-medium">
           <Lock className="w-3 h-3" />
           <span>100% secure payments via Razorpay</span>
        </div>

        {/* Pay Button */}
        <div className="pt-2 pb-6">
            <button 
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-200 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
            >
               {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
               ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    Pay {currencySymbol}{totalPayable}
                  </>
               )}
            </button>
        </div>

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
      <PaymentConfirmationContent />
    </Suspense>
  );
}