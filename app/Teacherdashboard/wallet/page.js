"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { TbWallet, TbClockHour4 } from "react-icons/tb";
import { MdCurrencyRupee, MdTrendingUp, MdOutlinePeopleAlt, MdOutlineCalendarToday } from "react-icons/md";
import { GoHistory } from "react-icons/go";
import { IoCloseOutline } from "react-icons/io5";
import { FaShieldAlt } from "react-icons/fa";
import Head from "next/head";
import TeacherAppBanner from "@/components/TeacherAppBanner";

const Wallet = () => {
  const { data: session, status } = useSession();
  const [walletData, setWalletData] = useState(null);
  const [isEarnPopUpVisible, setIsEarnPopupVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const EarnClick = () => {
    setIsEarnPopupVisible(true);
  };

  const EarnClosePopup = () => {
    setIsEarnPopupVisible(false);
  };

  useEffect(() => {
    const fetchWalletData = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const response = await axios.post(
            "https://learnospherebackend.learnosphere.in/api/route/getWalletData",
            { gmail: session.user.email }
          );
          setWalletData(response.data?.walletData || null);
        } catch (error) {
          console.error("Error fetching teacher wallet data:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchWalletData();
  }, [session, status]);

  const metrics = [
    {
      title: "Current Balance",
      value: `₹${walletData?.current_balance || "0"}`,
      subtitle: "Ready for withdrawal",
      icon: TbWallet,
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      border: "border-emerald-200",
    },
    {
      title: "Scheduled Classes",
      value: walletData?.scheduled_class || "0",
      subtitle: "Upcoming sessions booked",
      icon: MdOutlineCalendarToday,
      bg: "bg-blue-50",
      text: "text-blue-600",
      border: "border-blue-200",
    },
    {
      title: "This Month's Earning",
      value: `₹${walletData?.this_months_earning || "0.0"}`,
      subtitle: "Billed this calendar month",
      icon: MdTrendingUp,
      bg: "bg-orange-50",
      text: "text-orange-600",
      border: "border-orange-200",
    },
    {
      title: "Pending To Confirm",
      value: walletData?.pending_to_confirm || "0",
      subtitle: "Awaiting student completion sign-off",
      icon: TbClockHour4,
      bg: "bg-purple-50",
      text: "text-purple-600",
      border: "border-purple-200",
    },
    {
      title: "Weekly Earning",
      value: `₹${walletData?.weekly_earning || "0.0"}`,
      subtitle: "Last 7 days earnings",
      icon: MdCurrencyRupee,
      bg: "bg-cyan-50",
      text: "text-cyan-600",
      border: "border-cyan-200",
    },
    {
      title: "Total Learners",
      value: walletData?.no_of_learners || "0",
      subtitle: "Distinct students mentored",
      icon: MdOutlinePeopleAlt,
      bg: "bg-indigo-50",
      text: "text-indigo-600",
      border: "border-indigo-200",
    },
  ];

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-8 font-sans antialiased min-h-screen">
        {/* 💳 Hero Wallet Banner */}
        <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 rounded-3xl p-6 md:p-10 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-3 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-black/20 text-white">
              <FaShieldAlt /> Verified Tutor Payouts
            </span>
            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-inner">
                <TbWallet size={36} className="text-white" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-orange-100 font-semibold block">
                  Today's Earning
                </span>
                <div className="text-3xl md:text-4xl font-black text-white flex items-center justify-center md:justify-start">
                  <MdCurrencyRupee size={32} />
                  {walletData?.todays_earning || "0.0"}
                </div>
              </div>
            </div>
            <p className="text-white/80 text-xs max-w-md">
              Payouts are automatically processed weekly via UPI & direct bank transfer.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={EarnClick}
              className="px-5 py-3 rounded-2xl bg-white text-orange-600 hover:bg-orange-50 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <GoHistory size={18} /> Earning History
            </button>
            <a
              href="https://play.google.com/store/apps/details?id=com.karotaraj.learnosphere_app"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-2xl bg-black/30 hover:bg-black/40 border border-white/20 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              Instant Withdrawal on App →
            </a>
          </div>
        </div>

        {/* 📊 Metrics Grid */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-800">
            Earnings & Account Breakdown
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {metrics.map((item, idx) => (
              <div
                key={idx}
                className={`bg-white border ${item.border} rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex items-start justify-between group`}
              >
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                    {item.title}
                  </span>
                  <div className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight my-1">
                    {loading ? "..." : item.value}
                  </div>
                  <span className="text-xs text-slate-500 font-medium block">
                    {item.subtitle}
                  </span>
                </div>
                <div
                  className={`p-3.5 rounded-2xl ${item.bg} ${item.text} shadow-sm group-hover:scale-110 transition-transform`}
                >
                  <item.icon size={26} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 📱 App Redirection for Payouts */}
        <TeacherAppBanner
          title="Instant UPI Withdrawals & 0% Fee Payouts on Tutor Mobile App!"
          subtitle="Request one-click instant withdrawals directly to Google Pay, PhonePe, Paytm, or your bank account. Track every student transaction and class fee with real-time push notifications."
          badge="⚡ INSTANT WALLET WITHDRAWALS"
        />

        {/* 📜 Earning History Modal */}
        {isEarnPopUpVisible && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-2xl relative w-full max-w-md border border-slate-100">
              <button
                onClick={EarnClosePopup}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 absolute top-4 right-4 transition-colors"
              >
                <IoCloseOutline size={24} />
              </button>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2.5 rounded-xl bg-orange-100 text-orange-600">
                  <GoHistory size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">
                    Earning History
                  </h3>
                  <p className="text-xs text-slate-500">Transaction log & payout statements</p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-200/80 my-4 space-y-2">
                <span className="text-3xl">🧾</span>
                <p className="font-bold text-slate-700 text-sm">No Pending Transactions</p>
                <p className="text-xs text-slate-500">
                  Your payouts are synced with your registered bank account. Complete your upcoming sessions to generate new statements.
                </p>
              </div>

              <button
                onClick={EarnClosePopup}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Wallet;
