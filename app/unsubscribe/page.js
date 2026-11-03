"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function UnsubscribeContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [verification, setVerification] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [unsubscribed, setUnsubscribed] = useState(false);
  const [selectedReason, setSelectedReason] = useState("Too frequent");
  const [customReason, setCustomReason] = useState("");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      setErrorMsg("No unsubscribe token was provided. Please use the link provided in your email.");
      return;
    }

    const verifyToken = async () => {
      try {
        const res = await fetch("/api/unsubscribe/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();
        if (res.ok && data.valid) {
          setVerification(data);
          if (data.alreadyUnsubscribed) {
            setUnsubscribed(true);
          }
        } else {
          setErrorMsg(data.message || "This unsubscribe link is invalid or has expired.");
        }
      } catch (err) {
        setErrorMsg("Failed to verify unsubscribe request. Please check your network and try again.");
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  const handleConfirmUnsubscribe = async (e) => {
    e.preventDefault();
    if (!token || submitting) return;

    setSubmitting(true);
    setErrorMsg("");

    const finalReason =
      selectedReason === "Other" && customReason.trim()
        ? `Other: ${customReason.trim()}`
        : selectedReason;

    try {
      const res = await fetch("/api/unsubscribe/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, reason: finalReason }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setUnsubscribed(true);
      } else {
        setErrorMsg(data.message || "Could not process your unsubscription request.");
      }
    } catch (err) {
      setErrorMsg("A network error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header Accent Bar */}
          <div className="h-2 bg-gradient-to-r from-orange-500 to-amber-500" />

          <div className="p-8 sm:p-10">
            {/* Learnosphere Badge */}
            <div className="flex items-center justify-center space-x-2 mb-6">
              <span className="text-2xl font-black tracking-tight text-gray-900">
                Learn<span className="text-orange-500">O</span>sphere
              </span>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-orange-500 border-t-transparent mb-4" />
                <p className="text-gray-600 text-sm">Verifying your unsubscribe link...</p>
              </div>
            ) : errorMsg && !verification ? (
              <div className="text-center py-6">
                <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-red-100 text-red-600 mb-4 text-2xl font-bold">
                  ✕
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Invalid or Expired Link</h2>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">{errorMsg}</p>
                <Link
                  href="/"
                  className="inline-block px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-medium text-sm rounded-lg transition-colors shadow-sm"
                >
                  Return to Learnosphere
                </Link>
              </div>
            ) : unsubscribed ? (
              <div className="text-center py-6">
                <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-green-100 text-green-600 mb-4 text-2xl font-bold">
                  ✓
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Unsubscribed Successfully</h2>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {verification?.maskedEmail ? (
                    <>
                      <strong>{verification.maskedEmail}</strong> will no longer receive marketing,
                      task broadcasts, or promotional emails from Learnosphere.
                    </>
                  ) : (
                    "You will no longer receive marketing emails from Learnosphere."
                  )}
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800 mb-6 text-left">
                  <strong>Please note:</strong> You will still receive essential transactional emails
                  such as login OTPs, password reset requests, and purchase receipts.
                </div>
                <Link
                  href="/"
                  className="inline-block px-6 py-2.5 bg-gray-900 hover:bg-black text-white font-medium text-sm rounded-lg transition-colors"
                >
                  Back to Homepage
                </Link>
              </div>
            ) : (
              <div>
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    Unsubscribe Confirmation
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Manage your email notification preferences
                  </p>
                </div>

                <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 mb-6">
                  <p className="text-sm text-gray-700">
                    Are you sure you want to stop receiving marketing and broadcast communications for:
                  </p>
                  <p className="text-base font-semibold text-orange-600 mt-1">
                    {verification?.maskedEmail || "your email address"}
                  </p>
                </div>

                <form onSubmit={handleConfirmUnsubscribe} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                      Reason for unsubscribing (optional)
                    </label>
                    <select
                      value={selectedReason}
                      onChange={(e) => setSelectedReason(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-700"
                    >
                      <option value="Too frequent">Emails are too frequent</option>
                      <option value="No longer relevant">Content is no longer relevant</option>
                      <option value="Never signed up">I did not sign up for these emails</option>
                      <option value="Temporary pause">I want a temporary break</option>
                      <option value="Other">Other reason</option>
                    </select>
                  </div>

                  {selectedReason === "Other" && (
                    <div>
                      <input
                        type="text"
                        placeholder="Please tell us why (optional)..."
                        value={customReason}
                        onChange={(e) => setCustomReason(e.target.value)}
                        maxLength={200}
                        className="w-full px-3.5 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-700"
                      />
                    </div>
                  )}

                  {errorMsg && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
                      {errorMsg}
                    </div>
                  )}

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 py-3 px-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm rounded-lg shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {submitting ? (
                        <>
                          <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                          Unsubscribing...
                        </>
                      ) : (
                        "Confirm Unsubscribe"
                      )}
                    </button>

                    <Link
                      href="/"
                      className="py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm rounded-lg text-center transition-colors"
                    >
                      Keep Subscribed
                    </Link>
                  </div>
                </form>

                <p className="text-center text-xs text-gray-400 mt-6">
                  Learnosphere respects your privacy and email preferences.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function UnsubscribePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-orange-500 border-t-transparent" />
        </div>
      }
    >
      <UnsubscribeContent />
    </Suspense>
  );
}
