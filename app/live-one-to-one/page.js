"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import HomeLearnO from "@/public/HomeLearnO.png";
import Footer from "@/components/Footer";
import Footer1 from "@/components/Footer1";
import onelearning from "@/public/oneLearning.png";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";
import { trackEvent } from "@/src/lib/eventTracker";
import Brandapp from "@/components/Brandapp";
import { FiPlus, FiMinus } from "react-icons/fi";
import Sociallinks2 from "@/components/Sociallinks2";
import { FaStar, FaUsers, FaCheckCircle, FaClock, FaLanguage, } from "react-icons/fa";



const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": " What is one-on-one learning and how does it help students?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "One-on-one learning is a personalized teaching method where a student learns directly with a dedicated teacher in a private session. Unlike traditional tuition or group classes, one-to-one tutoring offers 100% personal attention, real-time doubt-solving, and customized learning plans. This helps students—especially CBSE and ICSE learners—improve concept clarity, focus, and exam performance. Platforms like Learnosphere make online learning even more effective with expert faculty and interactive sessions"
      }
    },
    {
      "@type": "Question",
      "name": "How is Learnosphere’s one-on-one tuition different from regular home tuition?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Learnosphere provides digital one-to-one tuition that offers the same personalized experience as home tuition but with added benefits like expert teachers, progress reports, interactive tools, and flexible scheduling. Unlike traditional home tuition, Learnosphere’s online learning system includes performance tracking, live feedback, and structured CBSE-oriented study modules designed for better academic outcomes."
      }
    },
    {
      "@type": "Question",
      "name": "Is one-on-one online tuition effective for CBSE and ICSE students?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": " Yes, one-on-one online tuition is highly effective for CBSE and ICSE students because the teacher customizes the lesson according to the student’s syllabus, pace, and strengths. With Learnosphere’s personalized online learning model, students get dedicated attention, exam-focused preparation, and concept-based teaching that aligns perfectly with board exam requirements."
      }
    },
    {
      "@type": "Question",
      "name": "Can online one-to-one classes replace home tuition completely?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": " Absolutely. Online one-to-one classes offer the same personalized experience as home tuition but with better flexibility, safer learning, and access to top-class teachers. With platforms like Learnosphere, students can attend high-quality online tuition from home without compromising on interaction, clarity, or performance."
      }
    },
    {
      "@type": "Question",
      "name": "Are one-on-one classes suitable for students who struggle with focus?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. One-on-one learning is especially helpful for students who struggle with focus, shyness, or slow-paced learning. In a dedicated one-to-one session, the teacher adapts the teaching style and pacing to keep the student engaged. Learnosphere’s online learning methods use interactive tools to make tuition engaging, simple, and distraction-free."
      }
    },
    {
      "@type": "Question",
      "name": " How do Learnosphere teachers customize lessons for each student?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Learnosphere uses initial assessments, performance tracking, and student feedback to create personalized learning plans. Teachers focus on weak areas, adapt lesson speed, and use CBSE/ICSE-aligned worksheets to support the student’s school syllabus. This ensures every session is meaningful and results-driven—much more effective than traditional tuition."
      }
    },
    {
      "@type": "Question",
      "name": "What subjects are offered in Learnosphere’s one-to-one online tutoring?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Learnosphere offers personalized one-to-one tutoring for all major subjects, including Maths, Science, English, Social Science, and more, for CBSE, ICSE, and State Boards. The classes are designed to support school homework, chapter-wise learning, exam preparation, and concept building."
      }
    },
    {
      "@type": "Question",
      "name": "Are one-to-one classes helpful for board exam preparation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, one-to-one classes are extremely beneficial for CBSE board exam preparation. Students receive focused attention, chapter-specific guidance, practice tests, and personalized strategies to improve their scores. Learnosphere’s expert tutors ensure the student understands every concept deeply and practices regularly for better exam performance."
      }
    },
    {
      "@type": "Question",
      "name": " Do parents receive progress reports for one-on-one online tuition?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Learnosphere provides detailed progress tracking, performance reports, and feedback after sessions. Parents can easily monitor improvement, attendance, strengths, and areas that need more focus. This level of transparency is not usually available in normal tuition or home tuition."
      }
    },
    {
      "@type": "Question",
      "name": " How can I enroll my child in Learnosphere’s one-on-one online learning program?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Enrolling is simple—visit Learnosphere’s homepage, select the one-on-one tuition program, and complete the quick registration process. You can also schedule a demo session. Learnosphere ensures a smooth onboarding experience so students can start personalized online learning without any delay."
      }
    }
  ]
};
export const FaqCard = ({ question, answer, iconIndex }) => {

  const icons = [
    "❓", "💡", "📘", "🧠", "⚡", "🌟", "🎯", "📚", "⏳", "🔍"
  ];

  return (
    <div className="bg-white shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl p-6 border border-gray-200">

      {/* Icon + Question */}
      <div className="flex items-start gap-4 mb-3">
        <div className="text-3xl rounded-full p-1">
          {icons[iconIndex % icons.length]}
        </div>

        <h3 className="text-lg font-semibold font-Poppins text-gray-800 leading-snug">
          {question}
        </h3>
      </div>

      {/* Answer */}
      <p className="text-gray-700 font-Poppins text-sm leading-relaxed">
        {answer}
      </p>
    </div>
  );
};


export default function OnboardingForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedBoard, setSelectedBoard] = useState("");
  const [contact, setContact] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("+91");
  const [selected, setSelected] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [success, setSuccess] = useState("");
  const [isShrunk, setIsShrunk] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsShrunk(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Simple inline SVG icon component
  const Icon = ({ path, className }) => (
    <svg className={`absolute left-3 top-3 w-5 h-5 ${className}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
  // When a country is selected
  const handleSelect = (code) => {
    setSelected(code);
    setSelectedCountry(code);
    setShowDropdown(false);
  };
  //Click outside event
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ✅ Fetch countries from backend
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get("https://learnospherebackend.learnosphere.in/api/route/getAllCountries");
        setCountries(res.data);
      } catch (err) {
        console.error("Error fetching countries:", err);
      }
    };
    fetchCountries();
  }, []);

  // ✅ Restrict contact input to digits only
  const handleContact = (e) => {
    const { value } = e.target;
    if (/^\d{0,10}$/.test(value)) {
      setContact(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Basic validation
    if (!fullName || !email || !contact || !selectedGrade || !selectedBoard) {
      Swal.fire("Error", "Please fill all the required fields", "error");
      setLoading(false);
      return;
    }

    const payload = {
      fullName,
      email,
      contact,
      countryCode: selectedCountry,
      grade: selectedGrade,
      board: selectedBoard,
    };


    try {
      const res = await axios.post("https://learnospherebackend.learnosphere.in/api/route/liveForm", payload);

      if (res.status === 200) {
        trackEvent("LIVE_ONE_TO_ONE_FORM_SUBMITTED", {
          name: fullName,
          email,
          mobile_number: selectedCountry ? `${selectedCountry}${contact}` : contact,
          contact,
          country_code: selectedCountry,
          grade: selectedGrade,
          board: selectedBoard,
        });

        setSuccess("Form Submitted Successfully");
        setFullName("");
        setEmail("");
        setContact("");
        setSelectedGrade("");
        setSelectedCountry("+91");
        setSelectedBoard("");

        Swal.fire(
          {
            title: "Thank You for Reaching Out!",
            text: "Our team will contact you shortly. Meanwhile, explore Learnosphere to find top educators and resources tailored just for you!",
            icon: "success",
          }
        );
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong!", "error");
    }

    setLoading(false); // STOP LOADING
  };
  return (
    <>
       <Sociallinks2 />
      <nav className={`fixed top-0 left-0 right-0 item-center w-full z-50 bg-white/60 transition-all duration-1000 backdrop-blur-xl mx-auto rounded-xl shadow-sm  ${isShrunk ? "py-3" : "py-6"} ${isShrunk ? "max-w-6xl" : "w-full"}`}>
        <div className={`max-w-7xl transition-all duration-1000 mx-auto px-6 flex items-center justify-between ${isShrunk ? "scale-95" : "scale-100"}`}>
          <div className="flex">
            <Link
              className="text-black text-[1rem] lg:text-2xl font-Poppins font-bold"
              href="/"
            >
              Learn<b className="text-orange-600 font-Poppins text-[1rem] lg:text-2xl">O</b>
              sphere.in
            </Link>
          </div>
          <ul className=" md:flex items-center gap-10 text-gray-700 font-medium">
            <button
              onClick={() => {
                document.getElementById("demo-form")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-orange-600 text-white px-2 sm:px-6 py-2 rounded-full shadow-md hover:bg-orange-700 transition">
              Book Free Demo
            </button>
          </ul>
        </div>
      </nav>
      <div className="relative min-h-screen mt-20 bg-gray-100 w-full">
        <div className="max-w-7xl mx-auto ">
          <div className=" text-center ">
            <h1 className="text-4xl md:text-5xl text-gray-900 md: font-bold pt-2 md:pt-5 mb-4 px-2">One-on-One Learning:
              <b className=" block text-2xl md:text-3xl text-gray-700 font-bold my-4 px-2">Personalised Classes for Faster, Better Results | LearnOsphere</b></h1>
            <div className="block lg:hidden w-full mt-6 ">
              <div className="flex justify-center gap-6 space-x-10">

                {/* Icon 1 */}
                <div className="flex flex-col items-center text-center group">
                  <FaStar className="text-yellow-500 bg-white/70 shadow-md rounded-full text-4xl p-2 mb-2" />
                  <span className="text-black font-semibold text-sm leading-tight">
                    10K+  <br /> Top <br /> Tutors
                  </span>
                </div>

                {/* Icon 2 */}
                <div className="flex flex-col items-center text-center group">
                  <FaUsers className="text-orange-500 bg-white/70 shadow-md rounded-full text-4xl p-2 mb-2" />
                  <span className="text-black font-semibold text-sm leading-tight">
                    15K+<br /> Happy <br /> Students
                  </span>
                </div>

                {/* Icon 3 */}
                <div className="flex flex-col items-center text-center group">
                  <FaLanguage className="text-blue-500 bg-white/70 shadow-md rounded-full text-4xl p-2 mb-2" />
                  <span className="text-black font-semibold text-sm leading-tight">
                    4+ <br />Multi-Language <br /> Support
                  </span>
                </div>

              </div>
            </div>
          </div>
          <div id="demo-form" className=" max-w-7xl mx-auto relative py-12 ">

            <div className="absolute inset-0 pointer-events-none hidden lg:block">
              {/* Feature Icons Section */}
              <div className=" absolute space-y-8 left-1/2 -translate-x-1/2  top-1/2 -translate-y-1/2  z-20 px-8 py-10 rounded-3xl  pointer-events-auto"
              >
                <div className="flex flex-col items-center text-center group shadow-[0px_0px_40px_rgba(255,255,255,0.3)] py-2 rounded-xl">
                  <FaStar className="text-yellow-500 bg-white/70 shadow-md rounded-full text-5xl p-2 mb-2 
                         transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-black font-semibold text-base leading-tight">
                    10K+  <br /> Top Tutors
                  </span>
                </div>

                <div className="flex flex-col items-center text-center group shadow-[0px_0px_40px_rgba(255,255,255,0.3)] py-2 rounded-xl">
                  <FaUsers className="text-orange-500 bg-white/70 shadow-md rounded-full text-5xl p-3 mb-2
                          transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-black font-semibold text-base leading-tight">
                    15K+<br /> Happy <br /> Students
                  </span>
                </div>

                <div className="flex flex-col items-center text-center group shadow-[0px_0px_40px_rgba(255,255,255,0.3)] py-2 rounded-xl">
                  <FaLanguage className="text-blue-500 bg-white/70 shadow-md rounded-full text-5xl p-3 mb-2
                             transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-black font-semibold text-base leading-tight">
                    4+ <br />Multi-Language <br /> Support
                  </span>
                </div>

              </div>
            </div>
            {/* Background Image */}
            <Image
              src={HomeLearnO}
              alt="one to one live"
              className="object-cover rounded-3xl h-[570px] brightness-90 "
            />

            {/* Frosted Glass Overlay */}
            <div className="absolute inset-0 flex justify-end items-center lg:pr-5 ">
              <div className="w-full max-w-sm bg-gray-200 backdrop-blur-xl 
                        rounded-3xl shadow-2xl border border-white/30 p-8">
                {/* Title */}
                <h2 className="text-3xl font-semibold text-orange-800 text-center mb-6">
                  Book Demo For Free
                </h2>
                <p className=" text-orange-800 text-center mb-6">Personalised one-on-one learning </p>

                {/* Step Indicator
                <div className="flex justify-center mb-8">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-white/30 border border-white/40 flex items-center justify-center">
                      <Icon path="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0zM4.5 20.25a8.25 8.25 0 1 1 16.5 0" />
                    </div>
                    <p className="text-white text-sm mt-1">Personal Details</p>
                  </div>
                </div> */}

                {/* Form */}
                <form className="space-y-5" onSubmit={handleSubmit}>

                  {/* Full Name */}
                  <div className="relative">
                    <Icon className="text-orange-700" path="M4 20v-1a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v1M12 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 rounded-lg bg-white/60 
                           border border-white/40 text-black placeholder-gray-700
                           focus:outline-orange-700  focus:border-white/70"
                    />
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <Icon className="text-orange-700" path="M3 8l9 6 9-6M4 6h16v12H4z" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email Address"
                      className="w-full pl-10 pr-3 py-3 rounded-lg bg-white/70 
                           focus:outline-orange-700 focus:outline-1 border border-white/40 text-black placeholder-gray-700"
                    />
                  </div>

                  {/* Phone */}
                  <div className="relative flex">
                    <div ref={dropdownRef} className="relative bg-white/50 rounded-md " >
                      <div
                        className="py-3  p-2 mt-1 rounded-md cursor-pointer  whitespace-nowrap text-sm flex justify-between items-center"
                        onClick={() => setShowDropdown(!showDropdown)}
                      >
                        <span>{selected || "+91"}</span>
                        <span>▼</span>
                      </div>

                      {/* Dropdown list */}
                      {showDropdown && (
                        <div className="absolute top-full mt-1 w-[260px] max-h-80 overflow-y-auto bg-white shadow-lg rounded-md z-50 text-sm">
                          {countries.map((c) => (
                            <div
                              key={c._id}
                              className="px-3 py-2 hover:bg-gray-100 cursor-pointer border-gray-800 flex justify-between"
                              onClick={() => handleSelect(`+${c.countryCode}`)}
                            >
                              <span className="text-base">{c.countryName}</span>
                              <span className="text-sm">(+{c.countryCode})</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <input
                      type="text"
                      value={contact}
                      required
                      placeholder="Phone Number"
                      id="contact"
                      onChange={handleContact}
                      className="w-full  px-2 py-3 rounded-lg bg-white/60 
                           focus:outline-orange-700 focus:outline-1 border border-white/40 text-black placeholder-gray-700"
                    />
                  </div>
                  <div className="relative">
                    <Icon className="text-orange-700" path="M3 5.5C3 4.67 3.67 4 4.5 4h2A2.5 2.5 0 0 1 9 6.5v1A2.5 2.5 0 0 1 6.5 10h-2A2.5 2.5 0 0 1 2 7.5v-2zM15 4h4v4h-4zM7 14h10v6H7z" />
                    <select
                      value={selectedGrade}
                      onChange={(e) => setSelectedGrade(e.target.value)}
                      className="border border-white/40 pl-10 py-3 pr-3 bg-white/60 focus:outline-orange-700 text-black focus:outline-1 rounded-md px-4 w-full"
                      required
                    >
                      <option className="" value="" disabled selected hidden> Your Grade</option>
                      <option value="1">Class 1</option>
                      <option value="2">Class 2</option>
                      <option value="3">Class 3</option>
                      <option value="4">Class 4</option>
                      <option value="5">Class 5</option>
                      <option value="6">Class 6</option>
                      <option value="7">Class 7</option>
                      <option value="8">Class 8</option>
                      <option value="9">Class 9</option>
                      <option value="10">Class 10</option>
                      <option value="11">Class 11</option>
                      <option value="12">Class 12</option>
                    </select>
                  </div>
                  <div className="relative">
                    <Icon className="text-orange-700" path="M3 5.5C3 4.67 3.67 4 4.5 4h2A2.5 2.5 0 0 1 9 6.5v1A2.5 2.5 0 0 1 6.5 10h-2A2.5 2.5 0 0 1 2 7.5v-2zM15 4h4v4h-4zM7 14h10v6H7z" />
                    <select
                      value={selectedBoard}
                      onChange={(e) => setSelectedBoard(e.target.value)}
                      className="border border-white/40  pl-10 py-3 pr-3 bg-white/60 text-black focus:outline-orange-700 focus:outline-1 rounded-md px-4 w-full"
                      required
                    >
                      <option className="" value="" disabled selected hidden> Your Board</option>
                      <option value="cbse">CBSE Board</option>
                      <option value="icse">ICSE Board</option>
                      <option value="state">State Board</option>
                    </select>
                  </div>

                  {/* Buttons */}
                  <div className=" mt-6">
                    <button
                      type="submit"
                      disabled={loading}
                      className={`px-6 py-3 font-bold rounded-full w-full
                          ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-orange-600/20 border border-white/40 text-orange-600"}
                           hover:bg-orange-700 hover:text-white transition`}>
                      {loading ? "Submitting..." : "Book Free Demo Now"}
                    </button>
                    {/* <button
                      type="submit"
                      className="px-8 py-3 rounded-full bg-gradient-to-r from-orange-300 to-orange-500
                           text-white font-semibold shadow-xl hover:opacity-90 transition">
                      Continue
                    </button> */}
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="max-w-4xl mx-auto text-center"> <p className="md:text-lg my-6 m-2">In today’s fast-moving academic world, students need more than just regular classes—they need personalised one-on-one learning that adapts to their pace, strengths, and learning style. LearnOsphere brings you a revolutionary one-to-one live learning experience designed to improve understanding, boost confidence, and help students score higher in school exams and competitive exams.</p></div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 max-w-5xl mx-auto my-10 rounded-2xl shadow-lg p-10 text-center">

            <h2 className="text-3xl font-extrabold text-gray-800 mb-8">
              Get Started With LearnOsphere’s One-on-One Learning
            </h2>

            <div className="w-full">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-10 ">

                {/* Card 1 */}
                <div className="flex flex-col items-center text-center w-40 group bg-white/20 backdrop-blur-sm shadow-md px-4 py-4 rounded-xl">
                  <FaStar className="text-yellow-500 bg-white shadow-md rounded-full text-5xl p-3 mb-2 
              transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-black font-semibold text-base leading-tight">
                    10K+ <br /> Top Rated Tutors
                  </span>
                </div>

                {/* Card 2 */}
                <div className="flex flex-col items-center text-center w-40 group bg-white/20 backdrop-blur-sm shadow-md px-4 py-4 rounded-xl">
                  <FaUsers className="text-orange-500 bg-white shadow-md rounded-full text-5xl p-3 mb-2
        transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-black font-semibold text-base leading-tight">
                    15K+ <br /> Happy Students
                  </span>
                </div>

                {/* Card 3 */}
                <div className="flex flex-col items-center text-center w-40 group bg-white/20 backdrop-blur-sm shadow-md px-4 py-4 rounded-xl">
                  <FaLanguage className="text-blue-500 bg-white shadow-md rounded-full text-5xl p-3 mb-2
        transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-black font-semibold text-base leading-tight">
                    4+ <br /> Multi-Language <br /> Support
                  </span>
                </div>

              </div>
            </div>
            <button
              onClick={() => {
                document.getElementById("demo-form")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="mt-10 bg-orange-600 text-white px-10 py-4 rounded-full text-lg shadow-md hover:bg-orange-700 hover:shadow-lg transition-all duration-300"
            >
              Book Free Demo
            </button>
          </div>

          <div className="w-full py-16">
            <div className="max-w-6xl mx-auto px-6">

              {/* Heading */}
              <div className="text-center mb-14">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Learnosphere’s One-on-One Live Classes
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Designed for Maximum Success with personalized learning paths, expert tutors,
                  and real-time progress tracking.
                </p>
              </div>

              {/* Cards Grid */}
              <div className="grid md:grid-cols-3 gap-8">

                {/* Card 1 */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border hover:shadow-xl transition-all">
                  <div className="text-5xl mb-5 text-center">🎓</div>
                  <h3 className="text-xl font-semibold text-gray-900 text-center mb-3">
                    Top Faculty for CBSE, ICSE & State Boards
                  </h3>
                  <p className="text-gray-600 text-center">
                    Experienced teachers who simplify concepts and boost student performance.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border hover:shadow-xl transition-all">
                  <div className="text-5xl mb-5 text-center">🧠</div>
                  <h3 className="text-xl font-semibold text-gray-900 text-center mb-3">
                    Customized Learning Path
                  </h3>
                  <p className="text-gray-600 text-center">
                    A personalized study plan tailored to each student's strengths and goals.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border hover:shadow-xl transition-all">
                  <div className="text-5xl mb-5 text-center">💻</div>
                  <h3 className="text-xl font-semibold text-gray-900 text-center mb-3">
                    Interactive Live Classes
                  </h3>
                  <p className="text-gray-600 text-center">
                    Engaging 1-on-1 sessions that make every topic easy to understand.
                  </p>
                </div>

                {/* Card 4 */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border hover:shadow-xl transition-all">
                  <div className="text-5xl mb-5 text-center">📊</div>
                  <h3 className="text-xl font-semibold text-gray-900 text-center mb-3">
                    Performance Tracking & Reports
                  </h3>
                  <p className="text-gray-600 text-center">
                    Parents receive real-time progress reports, strengths & improvement areas.
                  </p>
                </div>

                {/* Card 5 */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border hover:shadow-xl transition-all">
                  <div className="text-5xl mb-5 text-center">📘</div>
                  <h3 className="text-xl font-semibold text-gray-900 text-center mb-3">
                    Exam-Focused Preparation
                  </h3>
                  <p className="text-gray-600 text-center">
                    Special modules for CBSE boards, NTSE, Olympiads, and JEE foundation.
                  </p>
                </div>

                {/* Card 6 */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border hover:shadow-xl transition-all">
                  <div className="text-5xl mb-5 text-center">⏰</div>
                  <h3 className="text-xl font-semibold text-gray-900 text-center mb-3">
                    Flexible Timings
                  </h3>
                  <p className="text-gray-600 text-center">
                    Choose your preferred learning schedule — mornings, evenings, or weekends.
                  </p>
                </div>

              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br mt-4 from-orange-50 to-orange-100 max-w-7xl mx-auto rounded-2xl shadow-lg p-10 text-center">
            <h2 className="text-xl font-extrabold text-gray-800 ">Learn better, score higher, and grow smarter step by step.</h2>
            <button
              onClick={() => {
                document.getElementById("demo-form")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="mt-10 bg-orange-600 text-white px-10 py-4 rounded-full text-lg shadow-md hover:bg-orange-700 hover:shadow-lg transition-all duration-300"
            >
              Book Free Demo
            </button>
          </div>
          <div className="text-center mt-4 rounded-2xl bg-white">
            <h2 className="text-2xl md:text-4xl text-gray-700 font-bold mb-4 pt-10 px-2"> Why One-on-One Learning Is the Future of Education </h2>
            <p className=" text-gray-700 font-semibold mb-4  px-2" >Dedicated teacher in a live interactive session</p>
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-20 md:ml-20 px-6 md:px-16 bg-white">
              {/* Left Content */}
              <ul className="space-y-8 text-lg text-gray-700 md:w-[550px] ">
                <li className="flex items-center gap-6">
                  <span className="text-orange-600 text-xl">✔</span>
                  Personalized learning plan
                </li>

                <li className="flex items-center gap-6">
                  <span className="text-orange-600 text-xl">✔</span>
                  100% teacher attention
                </li>

                <li className="flex items-center gap-6">
                  <span className="text-orange-600 text-xl">✔</span>
                  Real-time doubt solving
                </li>

                <li className="flex items-center gap-6">
                  <span className="text-orange-600 text-xl">✔</span>
                  Improved focus and retention
                </li>
                <li className="flex items-center gap-6">
                  <span className="text-orange-600 text-xl">✔</span>
                  Custom-paced sessions
                </li>
                <li className="flex items-center gap-6">
                  <span className="text-orange-600 text-xl">✔</span>
                  Better exam performance
                </li>
              </ul>
              {/* Right Image */}
              <div className="flex justify-center md:justify-end w-full">
                <Image
                  src={onelearning}
                  alt="One on one learning"
                  className="object-contain  h-[350px] md:h-[420px] w-[350px]"
                />
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto mt-24 px-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 text-center mb-14">
              Why Students & Parents Choose Learn<b className="text-orange-600 font-Poppins text-4xl">O</b>sphere
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

              {/* Card 1 */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-orange-600 to-orange-800 
                        rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-all duration-500">
                </div>

                <div className="relative backdrop-blur-xl bg-white/30 border border-white/40 
                    p-8 rounded-3xl shadow-xl h-full hover:-translate-y-3 transition-all duration-500">

                  <div className="w-14 h-14 rounded-xl bg-orange-600/80 flex items-center justify-center text-white text-3xl mb-5 shadow-lg">
                    🎯
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-4">Who Is One-on-One Learning Perfect For?</h3>

                  <ul className="space-y-3 text-gray-800 font-medium">
                    <li>• Students who need concept clarity</li>
                    <li>• Students preparing for exams</li>
                    <li>• Learners who prefer personal attention</li>
                    <li>• Kids who feel shy in group classes</li>
                    <li>• Students who want fast score improvement</li>
                  </ul>
                  <button
                    onClick={() => {
                      document.getElementById("demo-form")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="mt-10 bg-orange-600 text-white px-10 py-4 rounded-full text-lg shadow-md hover:bg-orange-700 hover:shadow-lg transition-all duration-300"
                  >
                    Be the perfect Learner
                  </button>
                </div>
              </div>

              {/* Card 2 */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-orange-600 to-orange-800 
                      rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-all duration-500">
                </div>

                <div className="relative backdrop-blur-xl bg-white/30 border border-white/40 
                    p-8 rounded-3xl shadow-xl h-full hover:-translate-y-3 transition-all duration-500">

                  <div className="w-14 h-14 rounded-xl bg-orange-600/80 flex items-center justify-center text-white text-3xl mb-5 shadow-lg">
                    👨‍👩‍👧
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-4">Why Parents Prefer LearnOsphere</h3>

                  <ul className="space-y-7 text-gray-800 font-medium">
                    <li>• Better concept clarity</li>
                    <li>• Stronger attention span</li>
                    <li>• Improved learning habits</li>
                    <li>• Higher exam performance</li>
                    <li>• Strong teacher–student bonding</li>
                  </ul>
                  <button
                    onClick={() => {
                      document.getElementById("demo-form")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="mt-10 bg-orange-600 text-white px-10 py-4 rounded-full text-lg shadow-md hover:bg-orange-700 hover:shadow-lg transition-all duration-300"
                  >
                    Choose suitable Class
                  </button>
                </div>
              </div>

              {/* Card 3 */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br  from-orange-400 via-orange-600 to-orange-800 
                     rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-all duration-500">
                </div>

                <div className="relative backdrop-blur-xl bg-white/30 border border-white/40 
                    p-8 rounded-3xl shadow-xl h-full hover:-translate-y-3 transition-all duration-500">

                  <div className="w-14 h-14 rounded-xl bg-orange-600/80 flex items-center justify-center text-white text-3xl mb-5 shadow-lg">
                    🚀
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-4">LearnOsphere’s Classes</h3>

                  <ul className="space-y-5 text-gray-800 font-medium">
                    <li>•Top Faculty for CBSE, ICSE, and State Boards</li>
                    <li>• Customized Learning Path</li>
                    <li>• Interactive Live Classes</li>
                    <li>• Performance Tracking & Reports</li>
                    <li>• Exam-Focused Preparation</li>
                  </ul>
                  <button
                    onClick={() => {
                      document.getElementById("demo-form")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="mt-10 bg-orange-600 text-white px-10 py-4 rounded-full text-lg shadow-md hover:bg-orange-700 hover:shadow-lg transition-all duration-300"
                  >
                    Book Free Demo
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 rounded-3xl bg-white pt-4">
            <Brandapp />
          </div>
          <div className="max-w-6xl mx-auto mt-14 pb-10 px-4">
            <h2 className="mb-8 text-[1.2em] md:text-3xl font-semibold font-Poppins text-center text-gray-800">
              Frequently Asked Questions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqSchema.mainEntity.map((item, index) => (
                <FaqCard
                  key={index}
                  question={item.name}
                  answer={item.acceptedAnswer.text}
                  iconIndex={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer1 />
      <Footer />
    </>
  );
}