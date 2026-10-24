"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Footer1 from "@/components/Footer1"; // Assuming this is your secondary footer
import Sociallinks2 from "@/components/Sociallinks2";
import ContactForm from "@/components/ContactFormME";
import Link from "next/link";

export default function MiddleEastCountryPage({ slug }) {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Replace with your actual API URL
    fetch(
      `${WEB_BACKEND_URL}/api/route/content/v1/get-middle-east-content/${slug}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Not Found");
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setPage(data.page);
          setError(false);
        } else {
          setError(true);
        }
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  // ================= CONTENT SPLITTING LOGIC =================
  const { part1, part2, featuredImages } = useMemo(() => {
    if (!page?.content) return { part1: "", part2: "", featuredImages: [] };

    const content = page.content;
    const images = page.images || [];

    if (images.length === 0 || content.length < 500) {
      return { part1: content, part2: "", featuredImages: images };
    }

    const middleIndex = Math.floor(content.length / 2);
    // Find closest paragraph close tag
    const splitIndex = content.indexOf("</p>", middleIndex);

    if (splitIndex !== -1) {
      const firstChunk = content.substring(0, splitIndex + 4);
      const secondChunk = content.substring(splitIndex + 4);
      return { part1: firstChunk, part2: secondChunk, featuredImages: images };
    }

    return { part1: content, part2: "", featuredImages: images };
  }, [page]);

  // ================= CUSTOM HTML STYLING (The "Pro" Look) =================
  // This replaces standard 'prose' with specific tag targeting for better design control
  const customHtmlStyles = `
    font-sans text-gray-600
    
    /* Headings */
    [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:mt-12 [&>h2]:mb-6 [&>h2]:leading-tight 
    [&>h2]:border-b [&>h2]:border-orange-100 [&>h2]:pb-3
    
    [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-gray-800 [&>h3]:mt-10 [&>h3]:mb-4
    
    [&>h4]:text-xl [&>h4]:font-semibold [&>h4]:text-orange-600 [&>h4]:mt-8 [&>h4]:mb-3
    
    /* Paragraphs */
    [&>p]:text-lg [&>p]:leading-8 [&>p]:mb-6 [&>p]:text-gray-600 [&>p]:tracking-wide
    
    /* Lists (Bulleted) */
    [&>ul]:mb-8 [&>ul]:space-y-4 [&>ul]:pl-1
    [&>ul>li]:flex [&>ul>li]:items-start [&>ul>li]:gap-3 [&>ul>li]:text-lg [&>ul>li]:text-gray-700
    [&>ul>li]:before:content-['✔'] [&>ul>li]:before:text-orange-500 [&>ul>li]:before:font-bold [&>ul>li]:before:bg-orange-50 [&>ul>li]:before:w-6 [&>ul>li]:before:h-6 [&>ul>li]:before:flex [&>ul>li]:before:items-center [&>ul>li]:before:justify-center [&>ul>li]:before:rounded-full [&>ul>li]:before:text-xs
    
    /* Bold Text */
    [&>strong]:font-bold [&>strong]:text-gray-900
    
    /* Links */
    [&>a]:text-orange-600 [&>a]:font-bold [&>a]:underline-offset-4 [&>a]:decoration-2 hover:[&>a]:underline hover:[&>a]:text-orange-700 transition
    
    /* Blockquotes (CMS specific) */
    [&>blockquote]:border-l-4 [&>blockquote]:border-orange-500 [&>blockquote]:bg-orange-50 [&>blockquote]:p-6 [&>blockquote]:rounded-r-lg [&>blockquote]:italic [&>blockquote]:text-gray-700 [&>blockquote]:my-8
  `;

  // ================= LOADING STATE =================
  if (loading) {
    return (
      <div className="bg-white min-h-screen pt-24">
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 space-y-8 animate-pulse">
          <div className="h-64 bg-gray-200 rounded-3xl w-full"></div>
          <div className="h-10 bg-gray-200 rounded w-3/4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  // ================= ERROR STATE =================
  if (error || !page) {
    return (
      <div className="bg-orange-50 min-h-screen pt-20 flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center text-center px-6">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-md">
            <svg
              className="w-10 h-10 text-orange-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Data Unavailable</h1>
          <p className="mt-3 text-gray-600">
            We are currently updating resources for this region.
          </p>
          <a
            href="/middle-east"
            className="mt-6 px-6 py-3 bg-orange-600 text-white rounded-full font-semibold hover:bg-orange-700 transition"
          >
            Return Home
          </a>
        </div>
        <Footer />
      </div>
    );
  }

  // ================= MAIN SUCCESS STATE =================
  return (
    <div className="bg-[#ffffff] min-h-screen font-sans text-gray-800">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <div className="relative pt-20">
        {page.hero_image && (
          <div className="relative w-full h-[400px] lg:h-[500px] overflow-hidden group">
            <Image
              src={page.hero_image}
              fill
              className="object-cover transition-transform duration-[2s] group-hover:scale-105"
              alt={page.country_name}
              priority
            />
            {/* Elegant Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>

            <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white z-10 max-w-7xl mx-auto">
              <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-orange-500/20 backdrop-blur-md border border-orange-500/50 text-orange-50 text-xs font-bold tracking-wider uppercase mb-4">
                <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></span>
                CBSE Region Profile
              </span>
              <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-4 drop-shadow-xl">
                {page.short_intro}
              </h1>
              <p className="text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed font-light opacity-95">
                {page.country_name}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* --- LEFT COLUMN: CONTENT (8 cols) --- */}
        <div className="lg:col-span-8">
          {/* Part 1 Content */}
          <article
            className={customHtmlStyles}
            dangerouslySetInnerHTML={{ __html: part1 }}
          />

          {/* Interleaved Image 1 (Feature Card) */}
          {featuredImages.length > 0 && (
            <div className="my-12 relative w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl shadow-orange-100 group">
              <Image
                src={featuredImages[0]}
                fill
                alt="School Infrastructure"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-8">
                <p className="text-white font-bold text-lg">
                  World-Class Educational Infrastructure
                </p>
              </div>
            </div>
          )}

          {/* Part 2 Content */}
          {part2 && (
            <article
              className={customHtmlStyles}
              dangerouslySetInnerHTML={{ __html: part2 }}
            />
          )}

          {/* Interleaved Image 2 */}
          {featuredImages.length > 1 && (
            <div className="mt-10 mb-6 relative w-full h-[250px] md:h-[300px] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={featuredImages[1]}
                fill
                alt="Student Life"
                className="object-cover"
              />
            </div>
          )}

          {/* CONTACT FORM (Placed at bottom of content) */}
        
          <div className="mb-20">
             <ContactForm countryName={page.country_name} />
          </div>

      {/* ========================================================= */}
          {/* UPDATED TUTOR SECTION (Designed for Child Page Layout)    */}
          {/* ========================================================= */}
          <section className="relative overflow-hidden rounded-[2rem] bg-slate-900 shadow-2xl border border-slate-800">
            {/* Abstract Background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl -mr-16 -mt-16 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -ml-16 -mb-16" />

            <div className="relative z-10 p-8 md:p-10">
              <div className="flex flex-col gap-8">
                
                {/* Text Header */}
                <div className="text-center md:text-left">
                  <span className="inline-block px-3 py-1 mb-4 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-300 text-xs font-bold tracking-wider uppercase">
                    Careers at Learnosphere
                  </span>
                  <h2 className="text-2xl md:text-4xl font-extrabold text-white leading-tight mb-4">
                    Teach Students in <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                      {page.country_name}
                    </span>
                  </h2>
                  <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
                    Connect with Indian families living in {page.country_name}. 
                    Set your own rates, teach online, and earn in your preferred currency.
                  </p>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: "High Demand", desc: `Active students in ${page.country_name}`, icon: "📈" },
                    { title: "Work Remotely", desc: "Teach from home", icon: "🏠" },
                    { title: "Secure Pay", desc: "Guaranteed monthly payouts", icon: "💳" },
                    { title: "Smart Tools", desc: "LMS & Whiteboard included", icon: "💻" },
                  ].map((card, i) => (
                    <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl hover:bg-white/10 transition-colors">
                      <div className="text-2xl mb-2">{card.icon}</div>
                      <h3 className="text-white font-bold text-base">{card.title}</h3>
                      <p className="text-slate-400 text-xs mt-1">{card.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <div className="pt-2 border-t border-white/10 flex justify-center md:justify-start">
                  <Link
                    href="/Signin"
                    className="w-full md:w-auto px-8 py-4 rounded-full bg-white text-slate-900 font-bold text-lg hover:bg-orange-50 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,165,0,0.4)] flex items-center justify-center gap-2 group"
                  >
                    <span>Apply as a Tutor</span>
                    <svg className="w-5 h-5 text-orange-600 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>

              </div>
            </div>
          </section>
        </div>

        {/* --- RIGHT COLUMN: SIDEBAR (4 cols) --- */}
        <div className="lg:col-span-4 space-y-10">
          <div className="sticky top-28">
            {/* Quick Stats Card */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-orange-50">
              <h4 className="font-bold text-gray-900 text-xl mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                <span className="text-orange-500 text-2xl">⚡</span>
                Quick Navigation
              </h4>
              <ul className="space-y-2">
                {[
                  { label: "Overview & Curriculum", href: "#" },
                  { label: "Top CBSE Courses", href: "/Courses" },
                  { label: "Cbse Syllabus 2026", href: "/CBSE_Syllabus" },
                  { label: "Study Material", href: "/CBSE" },
                ].map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-orange-50 group transition-all"
                    >
                      <span className="text-gray-600 font-medium group-hover:text-orange-700">
                        {link.label}
                      </span>
                      <svg
                        className="w-4 h-4 text-gray-300 group-hover:text-orange-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQs Accordion */}
            {page.faqs?.length > 0 && (
              <div className="bg-gray-50 rounded-3xl p-1 border border-gray-100">
                <div className="bg-white rounded-[1.3rem] p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    Common Questions
                  </h3>
                  <div className="space-y-3">
                    {page.faqs.map((f, i) => (
                      <details
                        key={i}
                        className="group border border-gray-100 rounded-xl overflow-hidden bg-white hover:border-orange-200 transition-colors"
                      >
                        <summary className="flex items-center justify-between cursor-pointer p-3.5 bg-gray-50/50 hover:bg-white transition-colors">
                          <span className="text-sm font-semibold text-gray-800 leading-snug pr-2">
                            {f.q}
                          </span>
                          <span className="text-orange-500 transform group-open:rotate-180 transition-transform">
                            ▼
                          </span>
                        </summary>
                        <div className="px-4 pb-4 pt-2 text-sm text-gray-600 leading-relaxed">
                          {f.a}
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              </div>
            )}


            {/* CTA Box */}
            <div className="mt-8 rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 p-8 text-center text-white relative overflow-hidden shadow-2xl">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
              <h3 className="text-2xl font-bold mb-3 relative z-10">
                Study Smarter.
              </h3>
              <p className="text-gray-300 text-sm mb-6 relative z-10 leading-relaxed">
                Get access to premium notes, mock tests, and expert tutors for{" "}
                {page.country_name} students.
              </p>
              <Link
                href="/Student"
                className="w-full px-3 py-3.5 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-bold tracking-wide transition-all shadow-lg hover:shadow-orange-500/30 relative z-10"
              >
                Start Learning Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Sociallinks2 />
      <Footer1 />
      <Footer />
    </div>
  );
}
