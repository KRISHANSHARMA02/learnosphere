"use client";

import React, { useEffect, useState } from "react";
import FAQAccordion from "@/components/FAQAccordion";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";

/**
 * DynamicFAQSection
 * Fetches FAQs from the backend MySQL API for a given page slug and renders FAQAccordion.
 * Handles loading (skeleton), empty, and API-error states gracefully.
 *
 * @param {string} slug - The page slug or identifier
 */
export default function DynamicFAQSection({ slug }) {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);
    setError(false);

    const base = (WEB_BACKEND_URL || "https://learnospherebackend.learnosphere.in").replace(/\/+$/, "");
    const primaryUrl = `${base}/api/route/faqs?slug=${encodeURIComponent(slug)}`;
    const fallbackUrl = `${base}/faqs?slug=${encodeURIComponent(slug)}`;


    fetch(primaryUrl)
      .then((res) => {
        if (!res.ok) {
          return fetch(fallbackUrl).then((fbRes) => {
            if (!fbRes.ok) throw new Error(`HTTP ${fbRes.status}`);
            return fbRes.json();
          });
        }
        return res.json();
      })
      .then((json) => {
        if (isMounted) {
          if (json.success && Array.isArray(json.data)) {
            setFaqs(json.data);
          } else {
            setFaqs([]);
          }
        }
      })
      .catch((err) => {
        console.error("Failed to load FAQs:", err.message);
        if (isMounted) {
          setError(true);
          setFaqs([]);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <section className="w-full max-w-5xl mx-auto my-12 px-4 md:px-0 animate-pulse" aria-label="Loading FAQs">
        <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-8"></div>
        <div className="space-y-4">
          <div className="h-12 bg-gray-100 rounded-lg"></div>
          <div className="h-12 bg-gray-100 rounded-lg"></div>
          <div className="h-12 bg-gray-100 rounded-lg"></div>
        </div>
      </section>
    );
  }

  if (error || !faqs || faqs.length === 0) {
    return null;
  }

  return <FAQAccordion faqs={faqs} />;
}
