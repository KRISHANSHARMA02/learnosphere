"use client";
import { APP_BACKEND_URL } from "@/src/helper/appbackend_api";

import React, { useState, useEffect, Suspense } from "react";
import {
  ArrowLeft,
  Wallet,
  Plus,
  History,
  Coins,
  CreditCard,
  ChevronRight,
  Sparkles,
  Smartphone,
  ShieldCheck,
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { SiGoogleplay, SiApple } from "react-icons/si";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.karotaraj.learnosphere_main";
const APP_STORE_URL =
  "https://apps.apple.com/in/app/learnosphere-learning-app/id6748979882";

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
        const userRes = await fetch("/api/getUser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: session.user.email, gmail: session.user.email }),
        });

        const userData = await userRes.json();

        // Navigate through the nested "user" object
        const userId = userData?.user?.registrationNumber || "";
        const studentIso = userData?.user?.countryIso || "IN";

        if (userId) {
          // 3. Get Wallet Summary dynamically using the studentIso
          const summaryRes = await fetch(
            `${APP_BACKEND_URL}/api/route/get_student_wallet_summary/${userId}?isoCode=${studentIso}`
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
            `${APP_BACKEND_URL}/api/route/get_wallet_history/${userId}`
          );
          const historyData = await historyRes.json();

          // Map Backend History to Frontend UI
          const formattedHistory = (historyData.history || []).map((item, index) => {
            const isMoney = item.type === "TOPUP" || item.type === "DEBIT";
            const isDebit = item.type === "DEBIT";

            return {
              id: index,
              title: item.reason || (isDebit ? "Session Booking / Deduction" : "Wallet Top-up"),
              date: new Date(item.created_at).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              }),
              time: new Date(item.created_at).toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
              }),
              amount: `${isDebit ? "-" : "+"}${isMoney ? summary.currencySymbol || "₹" : ""}${item.amount}${!isMoney ? " credits" : ""}`,
              type: item.type,
              isDebit,
              icon: isMoney ? "wallet" : "coin",
            };
          });
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
    <div className="min-h-screen bg-gradient-to-b from-orange-50/30 via-white to-gray-50/40 font-sans text-gray-800 pb-16">
      {/* --- Header / Top Bar --- */}
      <div className="bg-white/80 backdrop-blur-md px-6 py-4 sticky top-0 z-20 border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/Userdashboard/Home")}
              className="p-2 hover:bg-orange-50 rounded-xl transition-colors text-gray-600 group"
              title="Back to Dashboard"
            >
              <ArrowLeft className="w-5 h-5 group-hover:text-orange-500 transition-colors" />
            </button>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">Student Wallet</h1>
              <p className="text-[11px] text-gray-500">Manage balances, rewards, and booking credits</p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-3 py-1 rounded-full text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            100% Secure Payments
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* --- LEFT COLUMN: Wallet Card & Top-Up Actions --- */}
        <div className="lg:col-span-5 space-y-6">
          {/* Premium Gradient Wallet Card */}
          <div className="w-full relative overflow-hidden rounded-3xl shadow-xl shadow-orange-500/10 border border-orange-400/30 group">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-amber-600 to-rose-500" />
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full blur-xl pointer-events-none" />

            <div className="relative p-6 sm:p-7 text-white">
              {/* Card Header */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-xl border border-white/20">
                  <Wallet size={15} className="text-white" />
                  <span className="text-xs font-bold tracking-wide">
                    Available Balance
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-white/90 bg-black/20 backdrop-blur-md px-2.5 py-1 rounded-lg">
                  <Smartphone className="w-3 h-3 text-orange-200" />
                  App Synced
                </div>
              </div>

              {/* Total Balance Amount */}
              <div className="mb-6">
                <p className="text-xs font-medium text-orange-100 uppercase tracking-wider mb-1">
                  Total Spending Power
                </p>
                <div className="text-4xl sm:text-5xl font-black tracking-tight text-white flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-orange-200">{walletData.currency}</span>
                  <span>{walletData.totalBalance.toLocaleString()}</span>
                </div>
              </div>

              {/* Split Balances: Top-Up & Credits */}
              <div className="grid grid-cols-2 gap-3 border-t border-white/20 pt-4">
                <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-sm border border-white/10">
                  <p className="text-orange-100 text-[11px] font-medium mb-0.5">
                    Cash Wallet
                  </p>
                  <p className="text-lg font-black tracking-tight">
                    {walletData.currency}{walletData.topUp}
                  </p>
                </div>
                <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-sm border border-white/10">
                  <p className="text-orange-100 text-[11px] font-medium mb-0.5 flex items-center gap-1">
                    Reward Credits <Coins size={12} className="text-amber-200" />
                  </p>
                  <p className="text-lg font-black tracking-tight text-amber-200">
                    {walletData.credits}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Add Money Primary Button */}
          <button
            onClick={() => router.push("/Userdashboard/Wallet/AddMoney")}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-orange-300/40 transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-base"
          >
            <CreditCard className="w-5 h-5" />
            <span>Add Money to Wallet</span>
          </button>

          {/* Quick Top-Up Offers */}
          <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                Quick Top-Up Packs
              </h3>
              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                Instant Credit
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {walletData.offers.length > 0 ? (
                walletData.offers.map((opt, idx) => (
                  <button
                    key={opt.id || idx}
                    onClick={() =>
                      router.push(`/Userdashboard/Wallet/AddMoney?amount=${opt.amount}`)
                    }
                    className="relative bg-gradient-to-b from-gray-50 to-white border border-gray-200 hover:border-orange-500 hover:bg-orange-50/50 rounded-2xl p-3 flex flex-col items-center justify-center transition-all group shadow-sm active:scale-95"
                  >
                    <span className="text-base font-extrabold text-gray-900 group-hover:text-orange-600">
                      {walletData.currency}{opt.amount}
                    </span>
                    {opt.bonus > 0 ? (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-md mt-1">
                        +{opt.bonus} bonus
                      </span>
                    ) : (
                      <span className="text-[10px] text-gray-400 mt-1 font-medium">Standard</span>
                    )}
                  </button>
                ))
              ) : (
                <div className="col-span-3 text-center text-gray-400 text-xs py-3">
                  No active top-up packs right now
                </div>
              )}
            </div>
          </div>

          {/* App Exclusive Recharge Banner */}
          <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-orange-950 p-5 text-white border border-orange-500/20 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                App Bonus
              </span>
            </div>
            <h4 className="text-sm font-bold text-white">
              Get Up to 25% Extra Cashback on App
            </h4>
            <p className="text-xs text-gray-300 mt-1 mb-4 leading-relaxed">
              Top-up via UPI, cards or net banking on the Learnosphere Mobile App to unlock exclusive educator trial coins!
            </p>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-3 rounded-xl text-[11px] transition-all"
              >
                <SiGoogleplay className="w-3.5 h-3.5" />
                <span>Play Store</span>
              </a>
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 text-white font-bold py-2 px-3 rounded-xl text-[11px] transition-all border border-white/10"
              >
                <SiApple className="w-3.5 h-3.5" />
                <span>App Store</span>
              </a>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: Transaction History --- */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-7 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-gray-100 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                    <History className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Transaction History</h2>
                    <p className="text-xs text-gray-500">Track all your wallet recharges, class bookings, and rewards</p>
                  </div>
                </div>

                <span className="text-xs font-bold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  {transactions.length} Records
                </span>
              </div>

              {/* Transactions List */}
              <div className="space-y-3">
                {transactions.length > 0 ? (
                  transactions.map((txn) => (
                    <div
                      key={txn.id}
                      className="flex items-center gap-4 p-3.5 rounded-2xl hover:bg-orange-50/40 transition-colors border border-gray-100 hover:border-orange-200 group"
                    >
                      {/* Dynamic Icon */}
                      <div
                        className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                          txn.isDebit
                            ? "bg-rose-50 text-rose-500"
                            : txn.icon === "coin"
                            ? "bg-amber-50 text-amber-500"
                            : "bg-emerald-50 text-emerald-500"
                        }`}
                      >
                        {txn.isDebit ? (
                          <ArrowDownLeft className="w-5 h-5" />
                        ) : txn.icon === "coin" ? (
                          <Coins className="w-5 h-5" />
                        ) : (
                          <ArrowUpRight className="w-5 h-5" />
                        )}
                      </div>

                      {/* Transaction Title & Date */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-gray-900 truncate">
                          {txn.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                          <span>{txn.date}</span>
                          {txn.time && (
                            <>
                              <span>•</span>
                              <span>{txn.time}</span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Amount with Color & Status Pill */}
                      <div className="text-right shrink-0">
                        <div
                          className={`text-sm font-black whitespace-nowrap ${
                            txn.isDebit ? "text-rose-600" : "text-emerald-600"
                          }`}
                        >
                          {txn.amount}
                        </div>
                        <span className="inline-block text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                          {txn.type || "Completed"}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-14 px-4 rounded-2xl border-2 border-dashed border-gray-100 bg-gray-50/50">
                    <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center">
                      <Wallet className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm font-bold text-gray-800">No Transactions Yet</h3>
                    <p className="text-xs text-gray-400 max-w-sm mx-auto mt-1 mb-4">
                      When you add funds, redeem reward coins, or book teacher sessions, all activity will appear right here.
                    </p>
                    <button
                      onClick={() => router.push("/Userdashboard/Wallet/AddMoney")}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 px-4 py-2 rounded-xl transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Money First
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Security Note */}
            <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                RBI & Bank compliant gateway
              </span>
              <span>Need help? Contact support</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default function Page() {
  const CustomLoader = (
    <div className="w-full h-screen flex items-center justify-center bg-gray-50/50">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm font-bold text-gray-600">
          Loading <span className="text-orange-600">Wallet</span>...
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