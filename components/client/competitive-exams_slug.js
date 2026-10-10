"use client";
import React, { useState, useEffect } from "react";
// 1. Added useRouter here
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Footer1 from "@/components/Footer1";
import { 
  FaBookOpen, FaGraduationCap, FaChalkboardTeacher, 
  FaClipboardList, FaLaptopCode, FaClock, FaStar, 
  FaQuoteLeft, FaQuestionCircle, FaChevronDown,
  FaExclamationCircle // Added for No Courses Found UI
} from "react-icons/fa";
import Link from "next/link";
import axios from "axios";
import { Player } from "@lottiefiles/react-lottie-player";

export default function CompetitiveExamPage() {
  const params = useParams();
  // 2. Initialize router
  const router = useRouter();
  const slug = params?.slug; 

  const examName = 
    slug === "neet" ? "NEET" : 
    slug === "iitjee" ? "IIT JEE" : 
    slug === "olympiad" ? "Olympiad" : "Competitive Exams";

  // 🚀 LOTTIE CONFIGURATION: Using your local files from /public folder
  const lottieAnimations = {
    iitjee: "/iit-animation.json",
    neet: "/neet-animation.json",
    olympiad: "/olympiad-animation.json",
    default: "/default-animation.json" 
  };

  const currentAnimation = lottieAnimations[slug] || lottieAnimations.default;

  const examSubjects = 
    slug === "neet" ? "Physics, Chemistry, Biology" : 
    slug === "iitjee" ? "Physics, Chemistry, Mathematics" : 
    slug === "olympiad" ? "Math, Science, English, Cyber" :
    "General Science & Aptitude";

  const examDetails = {
    iitjee: {
      intro: "The Joint Entrance Examination (JEE) is a highly competitive exam conducted in India for admission to various engineering colleges, including the prestigious IITs. The exam is conducted in two stages: JEE Main and JEE Advanced.",
      pattern: [
        "JEE Main: Two papers. Paper 1 is for B.E./B.Tech (PCM).",
        "JEE Advanced: Consists of two papers, covering advanced Physics, Chemistry, and Mathematics."
      ],
      books: ["Concepts of Physics (HC Verma)", "IIT Mathematics (ML Khanna)", "Organic Chemistry (Morrison Boyd)", "Physical Chemistry (OP Tandon)"]
    },
    neet: {
      intro: "The National Eligibility cum Entrance Test (NEET) is the sole qualifying test for MBBS and BDS programs in Indian medical and dental colleges. It tests students extensively on medical sciences.",
      pattern: [
        "Single paper consisting of 200 objective-type questions.",
        "Subjects covered: Physics, Chemistry, and Biology (Botany & Zoology)."
      ],
      books: ["NCERT Biology Class 11 & 12", "Concepts of Physics (HC Verma)", "Physical Chemistry (OP Tandon)", "Objective Biology (Dinesh)"]
    },
    olympiad: {
      intro: "Olympiad exams are prestigious competitions that test students' knowledge and logical reasoning skills on a national and international level. These include IMO (Math), NSO (Science), IEO (English), and more.",
      pattern: [
        "Varies by subject (e.g., Math, Science, Cyber).",
        "Typically involves multiple-choice questions focusing on logical reasoning, analytical skills, and core concepts."
      ],
      books: ["Previous Years' Olympiad Papers", "MTG Workbooks", "NCERT Exemplar", "Logical Reasoning Books"]
    }
  };

  const currentDetails = examDetails[slug] || examDetails.iitjee;

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(0);

  // 🗑️ REMOVED fallbackCourses entirely

  const studentReviews = [
    {
      id: 1,
      name: "Aarav Sharma",
      exam: `${examName} Aspirant`,
      achievement: "Top 1%",
      rating: 5,
      text: `The mock tests and detailed analytics for ${examName} were a game-changer. It perfectly highlighted my weak topics, allowing me to focus my revision effectively.`
    },
    {
      id: 2,
      name: "Priya Patel",
      exam: `${examName} Batch`,
      achievement: "Excellent Score",
      rating: 5,
      text: "LearnOsphere gave me the exact structure I needed. The faculty's tips on time management during the exam saved me at least 15 minutes."
    },
    {
      id: 3,
      name: "Rohan Gupta",
      exam: `${examName} Pro`,
      achievement: "Rank Holder",
      rating: 4,
      text: "The conceptual clarity I got here is unmatched. The problems discussed in class were actually a step tougher than the real exam, making the real test feel easy!"
    }
  ];

  const faqs = [
    {
      q: `Are the ${examName} courses live or recorded?`,
      a: "We offer both live and recorded classes. Students can attend interactive live sessions and also access recorded lectures for revision anytime."
    },
    {
      q: `What subjects are covered in the ${examName} batches?`,
      a: `Our batches comprehensively cover ${examSubjects}. We provide deep dives into theory, practical problem solving, and extensive mock tests.`
    },
    {
      q: `How can I enrol in a ${examName} batch?`,
      a: "You can enrol directly through this website. Simply choose your preferred batch, click on 'Enroll Now', and follow the payment instructions to start your learning journey."
    },
    {
      q: "Are there any mock tests included?",
      a: "Yes! All our premium batches include weekly minor tests and full-syllabus major mock tests designed strictly according to the latest exam pattern."
    }
  ];

  // 🚀 FIXED: API Request Logic updated to only use backend data
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const apiSlug = slug || "default"; 
        const response = await axios.get(`https://learnospherebackend.learnosphere.in/api/courses/${apiSlug}`);
        if (response.data && response.data.length > 0) {
          setCourses(response.data);
        } else {
          setCourses([]); // API returned empty
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]); // API failed
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [slug]);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // 🚀 FIXED: Added handleBookCounseling function
  const handleBookCounseling = () => {
    // Ye line tum apne auth state ke hisab se change kar sakte ho
    const isUserRegistered = localStorage.getItem("token"); 

    if (!isUserRegistered) {
      // Agar login nahi hai toh /Student par bhej do
      router.push("/Student");
    } else {
      // Agar login hai toh modal kholo ya next process karo
      console.log("User is registered. Proceeding to booking.");
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
                <Link href="/competitive-exams" className="hover:text-orange-600 transition-colors">Competitive Exams</Link>
                {slug && <span className="mx-3">/</span>}
              </li>
              {slug && (
                <li className="flex items-center text-gray-900 font-bold tracking-wide uppercase">
                  {examName}
                </li>
              )}
            </ol>
          </nav>

          <div className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">
            
            <div className="flex-1 space-y-5 text-center md:text-left">
              <span className="inline-block bg-orange-100 text-orange-600 py-1.5 px-4 rounded-full text-sm font-bold tracking-wider uppercase shadow-sm border border-orange-200">
                YOUR GATEWAY TO SUCCESS
              </span>
              
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-snug tracking-tight pb-2">
                Master the <br className="hidden md:block" />
                <span className="text-orange-600">{examName}</span> {slug ? "Exam" : ""}
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed mx-auto md:mx-0">
                Comprehensive preparation, expert guidance, and top-tier study materials to help you conquer your {examName} target.
              </p>
            </div>

            <div className="flex-1 w-full flex justify-center items-center">
              <div className="w-[300px] h-[300px] md:w-[400px] md:h-[350px] relative">
                <Player
                  autoplay
                  loop
                  src={currentAnimation} 
                  style={{ height: '100%', width: '100%' }}
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl p-6 md:p-12 mt-4 relative z-10">
        <div className="mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center gap-3">
            <FaLaptopCode className="text-orange-500" />
            Available {examName} Courses
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
                We currently don't have any active batches for {examName}. Please check back later or contact our counselors.
              </p>
            </div>
          )}
        </div>

        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center gap-3">
          <span className="w-2 h-8 bg-orange-500 rounded-full inline-block"></span>
          Exam Information
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-50 transition-all group">
            <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FaGraduationCap className="text-3xl text-orange-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Introduction to {examName}</h2>
            <p className="text-gray-600 leading-relaxed font-medium">{currentDetails.intro}</p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-50 transition-all group">
            <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FaClipboardList className="text-3xl text-orange-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Exam Pattern</h2>
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
            <h2 className="text-xl font-bold text-gray-900 mb-3">Recommended Materials</h2>
            <p className="text-gray-600 mb-5 font-medium">Essential books for strong conceptual foundation:</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Preparation Strategy</h2>
            <ul className="space-y-3 text-gray-600 font-medium">
              <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-orange-500"></div> Understand the syllabus thoroughly.</li>
              <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-orange-500"></div> Create a strict study schedule.</li>
              <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-orange-500"></div> Practice previous years' papers.</li>
              <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-orange-500"></div> Focus on time management & accuracy.</li>
              <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-orange-500"></div> Strengthen core conceptual understanding.</li>
            </ul>
          </div>
        </div>

      </div>

      <div className="bg-white py-20 border-t border-gray-100 relative z-10">
        <div className="container mx-auto max-w-6xl px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Success Stories</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto font-medium">Hear directly from our top performers who conquered the {examName} exam.</p>
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
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">Confused about your preparation strategy?</h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto font-medium">
            Talk to our academic counselors today. We'll help you analyze your strengths and map out the perfect roadmap for IIT JEE, NEET, or Olympiads.
          </p>
          
          <button 
            onClick={handleBookCounseling}
            className="bg-orange-500 text-white font-bold text-lg px-10 py-4 rounded-full shadow-lg shadow-orange-500/30 hover:bg-orange-600 hover:scale-105 transition-all duration-300"
          >
            Book Free Counseling Session
          </button>
        </div>
      </div>

      <div className="bg-white py-20 border-b border-gray-100 relative z-10">
        <div className="container mx-auto max-w-4xl px-6 md:px-12">
          
          <div className="flex flex-col items-center justify-center gap-3 mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              {examName} FAQs
            </h2>
            <p className="text-gray-500 mt-2 font-medium">Got questions about our {examName} courses? We've got answers.</p>
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