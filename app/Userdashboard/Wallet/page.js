"use client";

import React, { useState, useEffect, Suspense } from "react";
import {
  ArrowLeft,
  Wallet,
  Plus,
  History,
  Coins,
  CreditCard,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const WalletPageContent = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  // --- Dynamic Data State ---
  const [walletData, setWalletData] = useState({
    totalBalance: 0,
    topUp: 0,
    credits: 0,
    currency: "₹",
    offers: [], // For quick add buttons
  });

  const [transactions, setTransactions] = useState([]);

  // --- Fetch Data Logic ---
  useEffect(() => {
    const fetchData = async () => {
      // 1. Check Auth
      if (status !== "authenticated" || !session?.user?.email) return;

      try {
        // 👇 FIXED: Added method: "POST" to resolve the 405 error 👇
        const userRes = await fetch("/api/getUser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: session.user.email, gmail: session.user.email }) 
        });
        
        const userData = await userRes.json();

        // Navigate through the nested "user" object from your new response
        const userId = userData?.user?.registrationNumber || "";
        const studentIso = userData?.user?.countryIso || "IN"; // Fallback to IN if not found

        if (userId) {
          // 3. Get Wallet Summary dynamically using the studentIso
          const summaryRes = await fetch(
            `https://mobileapp.backend.learnosphere.in/api/route/get_student_wallet_summary/${userId}?isoCode=${studentIso}`,
          );
          const summary = await summaryRes.json();

          setWalletData({
            totalBalance: summary.totalBalance || summary.topupBalance || 0,
            topUp: summary.topupBalance || 0,
            credits: summary.rewardCredits || 0,
            currency: summary.currencySymbol || "₹",
            offers: summary.topupOffers || [],
          });

          // 4. Get Transaction History
          const historyRes = await fetch(
            `https://mobileapp.backend.learnosphere.in/api/route/get_wallet_history/${userId}`,
          );
          const historyData = await historyRes.json();

          // Map Backend History to Frontend UI
          const formattedHistory = (historyData.history || []).map(
            (item, index) => {
              const isMoney = item.type === "TOPUP" || item.type === "DEBIT";
              const isDebit = item.type === "DEBIT";

              return {
                id: index, 
                title: item.reason,
                date: new Date(item.created_at).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }),
                amount: `${isDebit ? "-" : "+"}${isMoney ? summary.currencySymbol : ""}${item.amount}${!isMoney ? " credits" : ""}`,
                type: item.type,
                icon: isMoney ? "wallet" : "coin",
              };
            },
          );
          setTransactions(formattedHistory);
        }
      } catch (error) {
        console.error("Error fetching wallet data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchData();
    }
  }, [session, status]);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 pb-12">
      {/* --- Navbar --- */}
      <div className="bg-white px-6 py-4 sticky top-0 z-10 ">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <button
            onClick={() => router.push("/Userdashboard/Home")}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 group"
          >
            <ArrowLeft className="w-6 h-6 group-hover:text-orange-500 transition-colors" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">My Wallet</h1>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* --- LEFT COLUMN: Wallet Card & Actions --- */}
        <div className="lg:col-span-5 space-y-8">
          {/* 1. Orange Gradient Wallet Card */}
          <div className="w-full relative overflow-hidden rounded-3xl shadow-xl transform transition-transform hover:scale-[1.01] duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-400 to-rose-400"></div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-600 opacity-20 rounded-full blur-xl"></div>

            <div className="relative p-8 text-white">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg">
                  <Wallet size={16} className="text-white" />
                  <span className="text-xs font-semibold tracking-wide">
                    Total Balance
                  </span>
                </div>
              </div>

              <div className="text-5xl font-extrabold mb-8 tracking-tight">
                {walletData.currency}
                {walletData.totalBalance}
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-4">
                <div>
                  <p className="text-orange-100 text-xs font-medium mb-1">
                    Top-up
                  </p>
                  <p className="text-lg font-bold">
                    {walletData.currency}
                    {walletData.topUp}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-orange-100 text-xs font-medium mb-1 flex items-center gap-1">
                    Credits <Coins size={12} />
                  </p>
                  <p className="text-lg font-bold">{walletData.credits}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Add Money Button */}
          <button
            onClick={() => router.push("/Userdashboard/Wallet/AddMoney")}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-orange-200 transition-all active:scale-95 flex items-center justify-center gap-2 text-lg"
          >
            <CreditCard className="w-5 h-5" />
            Add Money
          </button>

          {/* 3. Quick Add Options (Mapped from Backend Offers) */}
          <div className="grid grid-cols-3 gap-4">
            {walletData.offers.length > 0 ? (
              walletData.offers.map((opt, idx) => (
                <button
                  key={opt.id || idx}
                  onClick={() =>
                    router.push(
                      `/Userdashboard/Wallet/AddMoney?amount=${opt.amount}`,
                    )
                  }
                  className="bg-white border-2 border-orange-100 hover:border-orange-500 hover:bg-orange-50 rounded-2xl p-4 flex flex-col items-center justify-center transition-all group shadow-sm"
                >
                  <span className="text-xl font-bold text-gray-800 group-hover:text-orange-600">
                    {walletData.currency}
                    {opt.amount}
                  </span>
                  {opt.bonus > 0 && (
                    <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full mt-1">
                      +{opt.bonus} bonus
                    </span>
                  )}
                </button>
              ))
            ) : (
              <div className="col-span-3 text-center text-gray-400 text-sm py-4">
                No offers available
              </div>
            )}
          </div>
        </div>

        {/* --- RIGHT COLUMN: Transaction History --- */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 h-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <History className="w-5 h-5 text-orange-500" />
                Transaction History
              </h2>
              <button className="text-xs font-bold text-orange-500 hover:text-orange-600 hover:underline">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {transactions.length > 0 ? (
                transactions.map((txn) => (
                  <div
                    key={txn.id}
                    className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 group"
                  >
                    {/* Dynamic Icon based on type */}
                    <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-100 transition-colors">
                      {txn.icon === "coin" ? (
                        <Coins className="w-6 h-6 text-orange-500" />
                      ) : (
                        <Wallet className="w-6 h-6 text-orange-500" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-gray-900 truncate pr-4">
                        {txn.title}
                      </h3>
                      <p className="text-xs text-gray-400 font-medium mt-0.5">
                        {txn.date}
                      </p>
                    </div>

                    {/* Amount with Color Logic */}
                    <div
                      className={`text-sm font-bold whitespace-nowrap ${txn.amount.includes("+") ? "text-green-600" : "text-red-500"}`}
                    >
                      {txn.amount}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-gray-400">
                  No transactions found
                </div>
              )}
            </div>
          </div>
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
      <WalletPageContent />
    </Suspense>
  );
}