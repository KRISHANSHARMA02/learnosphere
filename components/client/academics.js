"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Footer1 from "@/components/Footer1";
import { 
  FaBookOpen, FaGraduationCap, FaChalkboardTeacher, 
  FaClipboardList, FaLaptopCode, FaClock, FaStar, 
  FaQuoteLeft, FaQuestionCircle, FaChevronDown,
  FaRegNewspaper, FaFilePdf, FaClipboardCheck, FaListAlt, FaChevronRight
} from "react-icons/fa";
import { FaExclamationCircle } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";
import dynamic from 'next/dynamic';
const Player = dynamic(() => import('@lottiefiles/react-lottie-player').then((mod) => mod.Player), { ssr: false });
import { useRouter } from "next/navigation";

export default function AcademicsSubjectPage() {

  const [slug, setSlug] = useState("");

  // 👇 ACADEMICS KE HISAB SE LOGIC
  const subjectName = 
    slug === "computer-science" ? "Computer Science" : 
    slug === "bcom" ? "B.Com" : 
    slug === "bsc" ? "B.Sc Science" : "Academics";

  const subjectTopics = 
    slug === "computer-science" ? "DSA, Web Dev, DBMS, OS, Networks" : 
    "General University Subjects";

  const subjectDetails = {
    "computer-science": {
      intro: "Dive deep into the world of Computer Science. Whether you are pursuing B.Tech, BCA, or MCA, mastering these core concepts is crucial for top-tier placements and software engineering roles.",
      pattern: [
        "Core Subjects: Data Structures & Algorithms, Operating Systems, DBMS.",
        "Development: Full Stack Web Development, API Integration, System Design."
      ],
      books: ["Let Us C", "Data Structures by Seymour Lipschutz", "Modern Operating Systems", "Cracking the Coding Interview"]
    }
  };

  const currentDetails = subjectDetails[slug] || subjectDetails["computer-science"];

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(0);
  const router = useRouter();


  const quickLinks = [
    {
      title: "Tech Blog",
      subtitle: "Read Latest Tech Articles",
      icon: <FaRegNewspaper className="text-2xl text-orange-500" />,
      link: "/Blogs"
    },
    {
      title: "PDF Notes",
      subtitle: "Access Semester Notes",
      icon: <FaFilePdf className="text-2xl text-orange-500" />,
      link: `/academics/computer-science/study-notes` // 👈 Yeh direct PDF page pe bhej dega
    },
    {
      title: "Coding Quiz",
      subtitle: "Test Your Logic",
      icon: <FaClipboardCheck className="text-2xl text-orange-500" />,
      link:"/Online-Quiz"
    },
    {
      title: "Syllabus",
      subtitle: "University Syllabus",
      icon: <FaListAlt className="text-2xl text-orange-500" />,
      link: "/CBSE_Syllabus"
    }
  ];


  const studentReviews = [
    {
      id: 1,
      name: "Aryan Gupta",
      exam: "B.Tech Student",
      achievement: "Placed at TCS",
      rating: 5,
      text: `The structured notes and placement-oriented teaching for ${subjectName} helped me crack my technical interview easily. Highly recommended!`
    },
    {
      id: 2,
      name: "Sneha Reddy",
      exam: "MCA Student",
      achievement: "Top Scorer",
      rating: 5,
      text: "LearnOsphere's resources saved me during my semester exams. The complex topics were explained in a very simple and relatable way."
    },
    {
      id: 3,
      name: "Vikram Singh",
      exam: "Software Engineer",
      achievement: "SDE-1",
      rating: 4,
      text: "The core CS fundamentals I learned here laid the perfect foundation for my career in software development."
    }
  ];

  const faqs = [
    {
      q: `Are the ${subjectName} notes mapped to university syllabus?`,
      a: "Yes, our study materials and notes are curated keeping in mind the standard syllabus of major Indian universities (AKTU, RTU, DU, etc.)."
    },
    {
      q: `Do you provide practical coding examples?`,
      a: `Absolutely! Along with theory for ${subjectTopics}, we provide practical code snippets and project ideas to build your portfolio.`
    },
    {
      q: `Are these courses helpful for campus placements?`,
      a: "Yes, our content is designed not just to help you pass semester exams, but also to build strong logic required for technical interviews and aptitude rounds."
    },
    {
      q: "Can I access the PDF notes offline?",
      a: "Once you purchase and download our premium PDF notes, you can access them offline anytime on your laptop or mobile."
    }
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const apiSlug = slug || "default"; 
        const response = await axios.get(`${WEB_BACKEND_URL}/api/courses/${apiSlug}`);
        if (response.data && response.data.length > 0) {
          setCourses(response.data);
        } else {
         setCourses([]); // ✅ no fallback
        }
      } catch (error) {
        setCourses([]); // ✅ no fallback
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [slug]);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // 3. Added handleBookCounseling function
  const handleBookCounseling = () => {
    // Check if user is logged in (Adjust this line to match your actual auth logic, e.g., using Context or Redux)
    const isUserRegistered = localStorage.getItem("token"); // Example: checking for a token in localStorage

    if (!isUserRegistered) {
      // Redirect to Student page if not registered
      router.push("/Student");
    } else {
      // Logic for when they ARE registered
      // e.g., open a modal, redirect to a booking form, or call an API
      console.log("User is registered. Open booking modal or route.");
    }
  };

  return (
    <div className="bg-white min-h-screen font-Poppins">
      <Navbar />

      <div 
        className="pt-10 md:pt-16 pb-20 px-6 mt-16 md:mt-20 relative overflow-hidden bg-orange-50/80"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ea580c' fill-opacity='0.06' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1.5'/%3E%3Ccircle cx='13' cy='13' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-transparent"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <nav className="text-sm mb-6 font-medium" aria-label="Breadcrumb">
            <ol className="list-none p-0 inline-flex items-center text-gray-500">
              <li className="flex items-center">
                <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
                <span className="mx-3">/</span>
              </li>
              <li className="flex items-center">
                <Link href="/academics" className="hover:text-orange-600 transition-colors">Academics</Link>
                {slug && <span className="mx-3">/</span>}
              </li>
              {slug && (
                <li className="flex items-center text-gray-900 font-bold tracking-wide uppercase">
                  {subjectName}
                </li>
              )}
            </ol>
          </nav>

          <div className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">
            
            <div className="flex-1 space-y-5 text-center md:text-left">
              <span className="inline-block bg-orange-100 text-orange-600 py-1.5 px-4 rounded-full text-sm font-bold tracking-wider uppercase shadow-sm border border-orange-200">
                ELEVATE YOUR ACADEMICS
              </span>
              
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-snug tracking-tight pb-2">
                Master <br className="hidden md:block" />
                <span className="text-orange-600">{subjectName}</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed mx-auto md:mx-0">
                Premium lecture notes, semester guides, and expert tutorials to help you ace your university exams and placements.
              </p>
            </div>

            <div className="flex-1 w-full flex justify-center items-center">
              <div className="w-full max-w-[400px] md:max-w-[500px] min-h-[350px] flex items-center justify-center">
    <Player
      autoplay
      loop
    src="https://assets2.lottiefiles.com/packages/lf20_tfb3estd.json"
      // 👇 Fixed Height: 100% ke chakkar mein mat pado
      style={{ height: '350px', width: '350px' }}
      className="lottie-player"
    />
  </div>
            </div>

          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="container mx-auto max-w-6xl px-6 md:px-12 -mt-10 relative z-10 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {quickLinks.map((link, idx) => (
            <Link 
              key={idx} 
              href={link.link}
              className="bg-white rounded-2xl p-6 flex items-center justify-between border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 hover:border-orange-200 transition-all duration-300 group cursor-pointer"
            >
              <div>
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {link.icon}
                </div>
                <h3 className="text-gray-900 font-bold text-lg mb-1">{link.title}</h3>
                <p className="text-gray-500 text-sm font-medium">{link.subtitle}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-orange-100 transition-colors duration-300">
                <FaChevronRight className="text-orange-500 text-sm opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Available Courses */}
      <div className="container mx-auto max-w-6xl p-6 md:p-12 mt-4 relative z-10">
        <div className="mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center gap-3">
            <FaLaptopCode className="text-orange-500" />
            Top {subjectName} Resources
          </h2>

                {/* 🚀 FIXED: Added Logic for "No Courses Found" UI */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
              <span className="ml-3 text-gray-600 font-medium">Loading courses...</span>
            </div>
          ) : courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <div key={course.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl hover:border-orange-100 transition-all duration-300 transform hover:-translate-y-1 group">
                  <div className="h-40 bg-gradient-to-br from-orange-50 to-white border-b border-orange-50 relative p-5 flex items-end">
                    {course.badge && (
                      <div className="absolute top-4 right-4 bg-orange-500 text-white text-[10px] font-semibold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                        {course.badge}
                      </div>
                    )}
                    <h3 className="text-gray-900 text-xl font-bold leading-snug group-hover:text-orange-600 transition-colors">
                      {course.title}
                    </h3>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-center text-sm text-gray-600 mb-4 border-b border-gray-100 pb-4">
                      <span className="flex items-center gap-2 font-medium"><FaBookOpen className="text-orange-500"/> {course.subject}</span>
                      <span className="flex items-center gap-2 font-medium"><FaClock className="text-orange-500"/> {course.duration}</span>
                    </div>
                    
                    <ul className="space-y-2 mb-6">
                      {course.features?.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-600 text-sm font-medium">
                          <svg className="w-4 h-4 text-orange-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-2xl font-bold text-gray-900">{course.price}</span>
                      <button className="bg-orange-50 text-orange-600 font-semibold px-5 py-2 rounded-lg hover:bg-orange-500 hover:text-white transition-colors text-sm uppercase tracking-wide">
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl py-16 px-6 text-center">
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <FaExclamationCircle className="text-4xl text-slate-300" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">No Courses Found</h3>
              <p className="text-slate-500 max-w-md mx-auto">
                We currently don't have any active batches for {subjectName}. Please check back later or contact our counselors.
              </p>
            </div>
          )}
        </div>

        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center gap-3">
          <span className="w-2 h-8 bg-orange-500 rounded-full inline-block"></span>
          Subject Overview
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-50 transition-all group">
            <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FaGraduationCap className="text-3xl text-orange-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Introduction to {subjectName}</h2>
            <p className="text-gray-600 leading-relaxed font-medium">{currentDetails.intro}</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-50 transition-all group">
            <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FaClipboardList className="text-3xl text-orange-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Key Focus Areas</h2>
            <ul className="space-y-3 text-gray-600 font-medium">
              {currentDetails.pattern.map((point, i) => (
                <li key={i} className="flex gap-3">
                  <span className="font-bold text-orange-500 mt-0.5">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-50 transition-all group">
            <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FaBookOpen className="text-3xl text-orange-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Recommended Books</h2>
            <p className="text-gray-600 mb-5 font-medium">Standard university text books:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700 font-semibold">
              {currentDetails.books.map((book, i) => (
                <div key={i} className="bg-orange-50/50 p-3 rounded-lg border border-orange-100 text-center hover:bg-orange-50 transition-colors shadow-sm">{book}</div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-50 transition-all group">
            <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FaChalkboardTeacher className="text-3xl text-orange-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Study Strategy</h2>
            <ul className="space-y-3 text-gray-600 font-medium">
              <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-orange-500"></div> Focus on core fundamentals first.</li>
              <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-orange-500"></div> Practice coding daily (LeetCode/GFG).</li>
              <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-orange-500"></div> Build practical mini-projects.</li>
              <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-orange-500"></div> Prepare from previous semester papers.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white py-20 border-t border-gray-100 relative z-10">
        <div className="container mx-auto max-w-6xl px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Student Reviews</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto font-medium">Hear directly from students who excelled using our {subjectName} materials.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {studentReviews.map((review) => (
              <div key={review.id} className="bg-orange-50/30 p-8 rounded-2xl border border-orange-100 relative hover:shadow-md transition-shadow duration-300">
                <FaQuoteLeft className="text-4xl text-orange-200 absolute top-6 right-6" />
                
                <div className="flex gap-1 mb-6 text-orange-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                
                <p className="text-gray-700 italic mb-8 relative z-10 leading-relaxed min-h-[100px] font-medium">
                  "{review.text}"
                </p>
                
                <div className="flex items-center gap-4 border-t border-orange-100 pt-6">
                  <div className="w-12 h-12 bg-orange-500 text-white font-semibold rounded-full flex items-center justify-center text-xl shrink-0">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{review.name}</h4>
                    <p className="text-xs text-orange-600 font-semibold mt-1 uppercase tracking-wide">
                      {review.exam} • <span className="text-gray-500">{review.achievement}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div 
        className="py-20 relative overflow-hidden z-10 bg-orange-50/80 border-y border-orange-100"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ea580c' fill-opacity='0.06' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1.5'/%3E%3Ccircle cx='13' cy='13' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-transparent"></div>
        
        <div className="container mx-auto max-w-4xl px-6 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">Need Career Guidance?</h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto font-medium">
            Talk to our academic counselors today. We'll help you pick the right tech stack, plan your projects, and prepare for campus placements.
          </p>
          <button onClick={handleBookCounseling} className="bg-orange-500 text-white font-bold text-lg px-10 py-4 rounded-full shadow-lg shadow-orange-500/30 hover:bg-orange-600 hover:scale-105 transition-all duration-300">
            Book Free Mentorship Session
          </button>
        </div>
      </div>

      <div className="bg-white py-20 border-b border-gray-100 relative z-10">
        <div className="container mx-auto max-w-4xl px-6 md:px-12">
          
          <div className="flex flex-col items-center justify-center gap-3 mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              {subjectName} FAQs
            </h2>
            <p className="text-gray-500 mt-2 font-medium">Common questions about our university courses and materials.</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="rounded-xl overflow-hidden bg-slate-50 border border-slate-200 transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex justify-between items-center p-5 text-left hover:bg-slate-100 transition-colors focus:outline-none"
                  >
                    <span className="font-semibold text-slate-800 text-lg pr-4">{faq.q}</span>
                    <FaChevronDown 
                      className={`text-slate-500 transition-transform duration-300 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`} 
                    />
                  </button>
                  
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="p-5 pt-0 text-slate-600 font-medium leading-relaxed">
                      {faq.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      <Footer1 />
      <Footer />
    </div>
  );
}