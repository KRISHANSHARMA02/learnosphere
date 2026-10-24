"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import React, { useState, useEffect } from "react";
import { MdCurrencyRupee, MdTrendingUp, MdOutlinePeopleAlt, MdOutlineCalendarToday } from "react-icons/md";
import { TbWallet, TbClockHour4 } from "react-icons/tb";
import { FaGraduationCap, FaArrowUp, FaChartLine } from "react-icons/fa";
import { useSession } from "next-auth/react";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import TeacherAppBanner from "@/components/TeacherAppBanner";

const Progress = () => {
  const { data: session, status } = useSession();
  const [walletData, setWalletData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWalletData = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const response = await axios.post(
            `${WEB_BACKEND_URL}/api/route/getWalletData`,
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
      value: `₹${walletData ? walletData.current_balance : "0"}`,
      subtitle: "Available for withdrawal",
      icon: TbWallet,
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      border: "border-emerald-200",
      glow: "from-emerald-500/10 to-teal-500/5",
    },
    {
      title: "Scheduled Classes",
      value: walletData ? walletData.scheduled_class : "0",
      subtitle: "Upcoming live sessions",
      icon: MdOutlineCalendarToday,
      bg: "bg-blue-50",
      text: "text-blue-600",
      border: "border-blue-200",
      glow: "from-blue-500/10 to-indigo-500/5",
    },
    {
      title: "This Month's Earning",
      value: `₹${walletData ? walletData.this_months_earning : "0.0"}`,
      subtitle: "Total billed this month",
      icon: MdTrendingUp,
      bg: "bg-orange-50",
      text: "text-orange-600",
      border: "border-orange-200",
      glow: "from-orange-500/10 to-amber-500/5",
    },
    {
      title: "Pending To Confirm",
      value: walletData ? walletData.pending_to_confirm : "0",
      subtitle: "Sessions awaiting completion",
      icon: TbClockHour4,
      bg: "bg-purple-50",
      text: "text-purple-600",
      border: "border-purple-200",
      glow: "from-purple-500/10 to-fuchsia-500/5",
    },
    {
      title: "Weekly Earning",
      value: `₹${walletData ? walletData.weekly_earning : "0.0"}`,
      subtitle: "Past 7 days earnings",
      icon: MdCurrencyRupee,
      bg: "bg-cyan-50",
      text: "text-cyan-600",
      border: "border-cyan-200",
      glow: "from-cyan-500/10 to-sky-500/5",
    },
    {
      title: "Active Learners",
      value: walletData ? walletData.no_of_learners : "0",
      subtitle: "Students taught to date",
      icon: MdOutlinePeopleAlt,
      bg: "bg-indigo-50",
      text: "text-indigo-600",
      border: "border-indigo-200",
      glow: "from-indigo-500/10 to-violet-500/5",
    },
  ];

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-8 font-sans antialiased">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100 text-orange-700 mb-2">
              <FaChartLine /> Performance & Earnings Analytics
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              Tutor Revenue & Growth
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Real-time summary of your classes, student reach, and wallet balance.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/Teacherdashboard/wallet"
              className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
            >
              <TbWallet size={16} /> Open Wallet
            </Link>
          </div>
        </div>

        {/* 6 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((item, idx) => (
            <div
              key={idx}
              className={`relative overflow-hidden bg-white border ${item.border} rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.glow} opacity-60 pointer-events-none`}
              />
              <div className="relative z-10 flex items-start justify-between">
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
                <div className={`p-3.5 rounded-2xl ${item.bg} ${item.text} shadow-sm group-hover:scale-110 transition-transform`}>
                  <item.icon size={26} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 📊 Profile Visibility & App Reach Showcase */}
        <section className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-slate-900">
                Profile Views & Student Inquiries
              </h2>
              <p className="text-xs text-slate-500">
                Track how often students view your teacher profile across search results
              </p>
            </div>
            <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full">
              Live Metric
            </span>
          </div>

          {/* App Redirection for Views & Growth */}
          <TeacherAppBanner
            title="Get 300% More Profile Views on the Learnosphere Tutor App!"
            subtitle="Web search only captures a fraction of student traffic. Over 85% of parents & students discover and book home tutors directly through our mobile app! Switch now to boost your visibility."
            badge="🚀 MULTIPLY YOUR STUDENT REACH"
          />
        </section>
      </div>
    </>
  );
};

export default Progress;
