"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import Footer from "@/components/Footer";
import Footer1 from "@/components/Footer1";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { trackEvent } from "@/src/lib/eventTracker";
import Resource from "@/public/Resource-removebg-preview.png";
import { GiTeacher, GiArchiveRegister } from "react-icons/gi";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
  MdPayments,
} from "react-icons/md";
import { FiPlus, FiMinus } from "react-icons/fi";
import { FaGraduationCap, FaChalkboardTeacher, FaBook, FaQuestionCircle, FaUserGraduate } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import Education from "@/public/education.jpg";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What services does Learnosphere provide to students?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Learnosphere provides access to one-to-one tutoring, home tuition options, online courses, syllabus resources, study materials and practice quizzes."
      }
    },
    {
      "@type": "Question",
      "name": "Can students find online and home tutors through Learnosphere?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Students and parents can explore one-to-one online learning and home tuition options through the platform."
      }
    },
    {
      "@type": "Question",
      "name": "Does Learnosphere provide study materials for school students?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Learnosphere provides educational resources such as syllabus information, maths formulas, sample papers, previous-year questions and other subject-based study materials."
      }
    },
    {
      "@type": "Question",
      "name": "Are practice quizzes available for different school classes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Learnosphere provides practice quizzes for students across Classes 1 to 12. Students can explore the available quizzes through the Online Quiz section."
      }
    },
    {
      "@type": "Question",
      "name": "How can a teacher join Learnosphere?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Teachers can visit the Join as a Teacher page, review the registration process and submit the requested details to explore educator opportunities."
      }
    },
    {
      "@type": "Question",
      "name": "Where can students and teachers get assistance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Students, parents and teachers can use the Learnosphere contact page to submit questions about the platform, its services or account-related matters."
      }
    }
  ]
};

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <button
        className="flex items-center justify-between w-full px-5 py-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-base md:text-lg font-semibold font-Poppins text-gray-900 pr-4">
          {question}
        </span>
        <span className="shrink-0">
          {isOpen ? (
            <FiMinus className="text-orange-600 text-2xl" />
          ) : (
            <FiPlus className="text-gray-500 text-2xl" />
          )}
        </span>
      </button>
      {isOpen && (
        <div className="mt-2 px-5 py-4 text-gray-700 bg-orange-50/40 rounded-xl font-Poppins border border-orange-100 text-left leading-relaxed text-sm md:text-base">
          {answer}
        </div>
      )}
    </div>
  );
};

const ResourceandSupport = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [isFocused, setIsFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isContactFocused, setIsContactFocused] = useState(false);
  const [isMessageFocused, setIsMessageFocused] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("+91");
  const [countries, setCountries] = useState([]);
  const [selected, setSelected] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (code) => {
    setSelected(code);
    setSelectedCountry(code);
    setShowDropdown(false);
  };

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

  const handleContact = (e) => {
    const { value } = e.target;
    if (/^\d{0,10}$/.test(value)) {
      setContact(value);
    }
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get(
          `${WEB_BACKEND_URL}/api/route/getAllCountries`
        );
        setCountries(res.data);
      } catch (err) {
        console.error("Error fetching countries:", err);
      }
    };
    fetchCountries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const formData = {
      name,
      email,
      contact,
      message,
      countryCode: selectedCountry,
    };

    try {
      const response = await axios.post(
        `${WEB_BACKEND_URL}/api/route/teachercontact`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        trackEvent("TUTOR_SUPPORT_INQUIRY_FORM_SUBMITTED", {
          name,
          email,
          mobile_number: selectedCountry
            ? `${selectedCountry}${contact}`
            : contact,
          contact,
          message,
          country_code: selectedCountry,
        });

        setName("");
        setEmail("");
        setContact("");
        setMessage("");

        Swal.fire({
          title: "Thank You for Reaching Out!",
          text: "Your query has been received, and our team will contact you shortly.",
          icon: "success",
        });
      } else {
        setErrors({ general: "Failed to submit the form. Please try again." });
      }
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: "An error occurred while submitting the form." });
      }
    }
  };

  const faqs = [
    {
      question: "What services does Learnosphere provide to students?",
      answer: "Learnosphere provides access to one-to-one tutoring, home tuition options, online courses, syllabus resources, study materials and practice quizzes."
    },
    {
      question: "Can students find online and home tutors through Learnosphere?",
      answer: "Yes. Students and parents can explore one-to-one online learning and home tuition options through the platform."
    },
    {
      question: "Does Learnosphere provide study materials for school students?",
      answer: "Learnosphere provides educational resources such as syllabus information, maths formulas, sample papers, previous-year questions and other subject-based study materials."
    },
    {
      question: "Are practice quizzes available for different school classes?",
      answer: "Learnosphere provides practice quizzes for students across Classes 1 to 12. Students can explore the available quizzes through the Online Quiz section."
    },
    {
      question: "How can a teacher join Learnosphere?",
      answer: "Teachers can visit the Join as a Teacher page, review the registration process and submit the requested details to explore educator opportunities."
    },
    {
      question: "Where can students and teachers get assistance?",
      answer: "Students, parents and teachers can use the Learnosphere contact page to submit questions about the platform, its services or account-related matters."
    }
  ];

  return (
    <div className="bg-white min-h-screen font-Poppins">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />

      {/* Hero Banner Section */}
      <div className="flex flex-col-reverse sm:flex-row gap-8 lg:gap-16 mt-20 bg-gradient-to-r from-green-100 via-teal-50 to-cyan-100 rounded-3xl w-[95vw] max-w-6xl m-auto p-6 sm:p-10 lg:p-12 shadow-sm border border-teal-100">
        <div className="flex flex-col justify-center flex-1">
          <span className="inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-wider bg-orange-100 text-orange-700 rounded-full mb-4 w-fit">
            Support & Resources
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
            Learning Resources and Support for Students and Teachers
          </h1>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
            Learnosphere provides learning services and educational resources for students, along with teaching opportunities for educators. Students can explore one-to-one tutoring, home tuition, online courses, study materials and practice quizzes. Teachers can find information about joining the platform and exploring available tutoring and content-related opportunities.
          </p>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
            This page brings these services together so students, parents and teachers can find the information they need. Visit the{" "}
            <Link href="/" className="text-orange-600 font-semibold underline hover:text-orange-700">
              Learnosphere homepage
            </Link>{" "}
            to explore the platform and its available learning and teaching services.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/Student">
              <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-3 rounded-full transition shadow-md shadow-orange-600/20">
                Student Access
              </button>
            </Link>
            <Link href="/join-as-teacher">
              <button className="bg-cyan-700 hover:bg-cyan-800 text-white font-bold px-6 py-3 rounded-full transition shadow-md shadow-cyan-700/20">
                Join as Teacher
              </button>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center sm:w-[40%]">
          <Image
            className="w-full max-w-sm rounded-2xl object-contain drop-shadow-md"
            src={Resource}
            alt="Learning Resources and Support"
            priority
          />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Section 1: Learning Services and Resources for Students */}
        <div className="mb-14">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 border-l-4 border-orange-500 pl-3">
            Learning Services and Resources for Students
          </h2>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-8">
            Learnosphere provides different ways for students to learn, practise and prepare for their academic goals. Students can choose the service or resource that matches their class, subject and learning requirements.
          </p>

          <div className="space-y-6">
            {/* 1. One-to-One Online Tutoring */}
            <div className="bg-gray-50/70 p-6 md:p-8 rounded-2xl border border-gray-200">
              <h3 className="text-xl md:text-2xl font-bold text-orange-600 mb-3 flex items-center gap-2">
                <FaChalkboardTeacher className="text-2xl text-orange-600 shrink-0" />
                1. One-to-One Online Tutoring
              </h3>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-3">
                Students who need individual academic guidance can explore one-to-one online classes with an educator. These sessions provide direct interaction with a teacher, subject-focused explanations and opportunities to ask questions during lessons.
              </p>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                Students can explore{" "}
                <Link href="/live-one-to-one" className="text-orange-600 font-semibold underline hover:text-orange-700">
                  one-to-one live classes
                </Link>{" "}
                to understand the available learning options and request a demo.
              </p>
            </div>

            {/* 2. Home Tuition and Tutor Discovery */}
            <div className="bg-gray-50/70 p-6 md:p-8 rounded-2xl border border-gray-200">
              <h3 className="text-xl md:text-2xl font-bold text-orange-600 mb-3 flex items-center gap-2">
                <FaGraduationCap className="text-2xl text-orange-600 shrink-0" />
                2. Home Tuition and Tutor Discovery
              </h3>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-3">
                Students and parents who prefer face-to-face teaching can explore home tuition options and find educators based on their location, class and subject requirements.
              </p>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-3">
                Learnosphere provides a way to explore available tutors for different academic levels and learning needs.
              </p>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                Explore{" "}
                <Link href="/home-tuition" className="text-orange-600 font-semibold underline hover:text-orange-700">
                  home tuition options
                </Link>{" "}
                to search for educators.
              </p>
            </div>

            {/* 3. Online Courses */}
            <div className="bg-gray-50/70 p-6 md:p-8 rounded-2xl border border-gray-200">
              <h3 className="text-xl md:text-2xl font-bold text-orange-600 mb-3 flex items-center gap-2">
                <FaBook className="text-2xl text-orange-600 shrink-0" />
                3. Online Courses
              </h3>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-3">
                Students can access structured online courses for school subjects and selected examination preparation programmes. Course availability and features vary by programme.
              </p>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-3">
                Available learning programmes include courses for streams such as PCM, PCB and Commerce, along with courses for other school classes.
              </p>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                Visit the{" "}
                <Link href="/Courses" className="text-orange-600 font-semibold underline hover:text-orange-700">
                  Learnosphere online courses section
                </Link>{" "}
                to explore available programmes and course details.
              </p>
            </div>

            {/* 4. Study Materials and Syllabus Resources */}
            <div className="bg-gray-50/70 p-6 md:p-8 rounded-2xl border border-gray-200">
              <h3 className="text-xl md:text-2xl font-bold text-orange-600 mb-3 flex items-center gap-2">
                <GiArchiveRegister className="text-2xl text-orange-600 shrink-0" />
                4. Study Materials and Syllabus Resources
              </h3>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
                Students can use educational resources to review topics, understand syllabus requirements and prepare for examinations. These resources include syllabus information, subject-based study materials, sample papers, previous-year questions and revision references.
              </p>
              <div className="mb-4">
                <p className="font-semibold text-gray-900 text-sm md:text-base mb-2">Explore the available resources:</p>
                <ul className="list-disc list-inside space-y-1.5 text-sm md:text-base text-gray-700 pl-2">
                  <li>
                    <Link href="/CBSE" className="text-orange-600 font-semibold underline hover:text-orange-700">
                      CBSE syllabus and study resources
                    </Link>
                  </li>
                  <li>
                    <Link href="/MathsFormula" className="text-orange-600 font-semibold underline hover:text-orange-700">
                      Maths formulas and revision references
                    </Link>
                  </li>
                </ul>
              </div>
              <p className="text-gray-600 text-xs md:text-sm italic">
                Students should check the relevant board and class before using any syllabus or examination resource.
              </p>
            </div>

            {/* 5. Online Practice Quizzes */}
            <div className="bg-gray-50/70 p-6 md:p-8 rounded-2xl border border-gray-200">
              <h3 className="text-xl md:text-2xl font-bold text-orange-600 mb-3 flex items-center gap-2">
                <FaQuestionCircle className="text-2xl text-orange-600 shrink-0" />
                5. Online Practice Quizzes
              </h3>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-3">
                Practice quizzes help students check their understanding and revise topics through subject-based questions. Learnosphere provides practice quizzes for students across Classes 1 to 12.
              </p>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-3">
                Students can use these quizzes to practise concepts, answer questions and identify topics that need further revision.
              </p>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                Visit{" "}
                <Link href="/Online-Quiz" className="text-orange-600 font-semibold underline hover:text-orange-700">
                  Learnosphere Online Quizzes
                </Link>{" "}
                to explore the available practice options.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Teaching Opportunities and Resources for Teachers */}
        <div className="mb-14">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 border-l-4 border-orange-500 pl-3">
            Teaching Opportunities and Resources for Teachers
          </h2>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-8">
            Learnosphere also provides opportunities for educators who want to connect with students and offer their teaching services. Teachers can explore the educator registration process and learn about the available teaching options.
          </p>

          <div className="space-y-6">
            {/* 1. Join Learnosphere as a Teacher */}
            <div className="bg-gray-50/70 p-6 md:p-8 rounded-2xl border border-gray-200">
              <h3 className="text-xl md:text-2xl font-bold text-orange-600 mb-3 flex items-center gap-2">
                <GiTeacher className="text-2xl text-orange-600 shrink-0" />
                1. Join Learnosphere as a Teacher
              </h3>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-3">
                Educators can register with Learnosphere and provide information about their teaching experience, subjects and qualifications as required during the registration process.
              </p>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                Teachers interested in joining the platform can visit the{" "}
                <Link href="/join-as-teacher" className="text-orange-600 font-semibold underline hover:text-orange-700">
                  Join as a Teacher page
                </Link>{" "}
                to review the registration process.
              </p>
            </div>

            {/* 2. Explore Online and Home Tutoring Opportunities */}
            <div className="bg-gray-50/70 p-6 md:p-8 rounded-2xl border border-gray-200">
              <h3 className="text-xl md:text-2xl font-bold text-orange-600 mb-3 flex items-center gap-2">
                <FaChalkboardTeacher className="text-2xl text-orange-600 shrink-0" />
                2. Explore Online and Home Tutoring Opportunities
              </h3>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-3">
                Educators can explore teaching opportunities involving online tutoring and home tuition. These options allow teachers to offer their subject knowledge through different teaching modes, depending on student requirements and available opportunities.
              </p>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                Visit{" "}
                <Link href="/become-a-tutor" className="text-orange-600 font-semibold underline hover:text-orange-700">
                  Become a Tutor at Learnosphere
                </Link>{" "}
                to explore the available teaching opportunities.
              </p>
            </div>

            {/* 3. Share Educational Videos and Content */}
            <div className="bg-gray-50/70 p-6 md:p-8 rounded-2xl border border-gray-200">
              <h3 className="text-xl md:text-2xl font-bold text-orange-600 mb-3 flex items-center gap-2">
                <FaBook className="text-2xl text-orange-600 shrink-0" />
                3. Share Educational Videos and Content
              </h3>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-3">
                Learnosphere's educator information also describes opportunities for teachers to share educational videos and content. Educators interested in contributing learning material can review the relevant requirements and options through the teacher section.
              </p>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                Visit the{" "}
                <Link href="/join-as-teacher" className="text-orange-600 font-semibold underline hover:text-orange-700">
                  teacher registration page
                </Link>{" "}
                for more information about joining and educator-related opportunities.
              </p>
            </div>

            {/* 4. Teacher Registration and Account Assistance */}
            <div className="bg-gray-50/70 p-6 md:p-8 rounded-2xl border border-gray-200">
              <h3 className="text-xl md:text-2xl font-bold text-orange-600 mb-3 flex items-center gap-2">
                <MdPayments className="text-2xl text-orange-600 shrink-0" />
                4. Teacher Registration and Account Assistance
              </h3>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-3">
                Teachers who have questions about registration, their educator profile, teaching opportunities or payment-related matters can contact the Learnosphere team.
              </p>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                For assistance, use the{" "}
                <Link href="/contact" className="text-orange-600 font-semibold underline hover:text-orange-700">
                  Learnosphere contact page
                </Link>{" "}
                and explain the issue clearly so the team can direct the enquiry appropriately.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: How to Get Started on Learnosphere */}
        <div className="mb-14">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 border-l-4 border-orange-500 pl-3">
            How to Get Started on Learnosphere
          </h2>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-8">
            The steps depend on whether you are joining as a student or an educator.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* For Students and Parents */}
            <div className="bg-gradient-to-br from-orange-50/80 to-amber-50/50 p-6 md:p-8 rounded-2xl border border-orange-200 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FaUserGraduate className="text-orange-600" />
                  For Students and Parents
                </h3>
                <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-gray-700 pl-2 mb-6">
                  <li>Explore the available tutoring, courses and study resources.</li>
                  <li>Choose the service that matches your learning requirements.</li>
                  <li>Register or log in through the student section when required.</li>
                  <li>Review the available options and follow the instructions for the selected service.</li>
                </ul>
              </div>
              <p className="text-sm md:text-base text-gray-800 font-medium pt-4 border-t border-orange-200">
                Students can begin through the{" "}
                <Link href="/Student" className="text-orange-600 font-bold underline hover:text-orange-700">
                  student registration and account section
                </Link>.
              </p>
            </div>

            {/* For Teachers and Educators */}
            <div className="bg-gradient-to-br from-teal-50/80 to-cyan-50/50 p-6 md:p-8 rounded-2xl border border-teal-200 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <GiTeacher className="text-teal-700 text-2xl" />
                  For Teachers and Educators
                </h3>
                <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-gray-700 pl-2 mb-6">
                  <li>Review the available educator and tutoring opportunities.</li>
                  <li>Visit the teacher registration page.</li>
                  <li>Submit the information requested during registration.</li>
                  <li>Follow the applicable onboarding process and review the available teaching options.</li>
                </ul>
              </div>
              <p className="text-sm md:text-base text-gray-800 font-medium pt-4 border-t border-teal-200">
                Start through{" "}
                <Link href="/join-as-teacher" className="text-teal-700 font-bold underline hover:text-teal-800">
                  Join Learnosphere as a Teacher
                </Link>.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Need Help or Have a Question? */}
        <div className="mb-14">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 border-l-4 border-orange-500 pl-3">
            Need Help or Have a Question?
          </h2>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
            Whether you are a student, parent or teacher, you can contact Learnosphere for assistance with general platform enquiries.
          </p>
          <div className="bg-gray-50 p-6 md:p-8 rounded-2xl border border-gray-200 mb-8">
            <p className="font-semibold text-gray-900 text-base md:text-lg mb-3">
              You can use the contact page for questions related to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-gray-700 pl-2 mb-6">
              <li>Student registration and account access</li>
              <li>Finding tutors and exploring tuition options</li>
              <li>Online courses and learning resources</li>
              <li>Teacher registration and tutoring opportunities</li>
              <li>Payment-related enquiries</li>
            </ul>
            <p className="text-gray-800 text-sm md:text-base font-medium">
              Visit the{" "}
              <Link href="/contact" className="text-orange-600 font-bold underline hover:text-orange-700">
                Learnosphere Contact Page
              </Link>{" "}
              and submit your enquiry with the relevant details.
            </p>
          </div>

          {/* Interactive Query Form */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 sm:p-8 border border-purple-100 flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                Send Us an Enquiry Directly
              </h3>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
                Have a query regarding courses, tutoring, teacher onboarding, or general support? Fill in the details below and our team will get in touch with you promptly.
              </p>
              <div className="relative rounded-xl overflow-hidden h-48 w-full hidden md:block">
                <Image
                  src={Education}
                  alt="Support Enquiry"
                  fill
                  className="object-cover opacity-75"
                />
              </div>
            </div>

            <div className="w-full md:w-[480px] bg-white p-6 sm:p-8 rounded-xl shadow-md border border-gray-200">
              <h4 className="font-bold text-lg text-orange-600 text-center mb-4">
                Platform Query Form
              </h4>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <span className="relative">
                  <label
                    htmlFor="name"
                    className={`absolute left-2 transition-all ${
                      isFocused || name
                        ? "top-0 text-xs text-orange-600 font-medium"
                        : "top-1/2 transform -translate-y-1/2 text-gray-500"
                    }`}
                  >
                    Name
                  </label>
                  <input
                    name="name"
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(name !== "")}
                    className="w-full border-b border-gray-300 p-2 pt-5 bg-transparent focus:outline-none focus:border-orange-600 text-sm"
                    required
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </span>

                <span className="relative">
                  <label
                    htmlFor="email"
                    className={`absolute left-2 transition-all ${
                      isEmailFocused || email
                        ? "top-0 text-xs text-orange-600 font-medium"
                        : "top-1/2 transform -translate-y-1/2 text-gray-500"
                    }`}
                  >
                    Email
                  </label>
                  <input
                    name="email"
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setIsEmailFocused(true)}
                    onBlur={() => setIsEmailFocused(email !== "")}
                    className="w-full border-b border-gray-300 p-2 pt-5 bg-transparent focus:outline-none focus:border-orange-600 text-sm"
                    required
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </span>

                <span className="relative">
                  <label
                    htmlFor="contact"
                    className={`absolute left-2 transition-all ${
                      isContactFocused || contact
                        ? "top-0 text-xs text-orange-600 font-medium"
                        : "top-1/4 transform -translate-y-1/2 text-gray-500"
                    }`}
                  >
                    Mobile Number
                  </label>
                  <div className="flex mt-1 w-full text-sm">
                    <div className="flex flex-col mt-3 mr-2">
                      <div ref={dropdownRef} className="relative bg-gray-100 rounded-md">
                        <div
                          className="border border-gray-300 p-2 rounded-md cursor-pointer whitespace-nowrap text-xs shadow-sm flex justify-between items-center"
                          onClick={() => setShowDropdown(!showDropdown)}
                        >
                          <span>{selected || "+91"}</span>
                          <span className="ml-1 text-[10px]">▼</span>
                        </div>
                        {showDropdown && (
                          <div className="absolute top-full mt-1 w-[240px] max-h-60 overflow-y-auto bg-white shadow-lg rounded-md z-50 text-xs border border-gray-200">
                            {countries.map((c) => (
                              <div
                                key={c._id}
                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center border-b border-gray-100"
                                onClick={() => handleSelect(`+${c.countryCode}`)}
                              >
                                <span>{c.countryName}</span>
                                <span className="text-gray-500">(+{c.countryCode})</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <input
                      name="contact"
                      id="contact"
                      type="text"
                      value={contact}
                      onChange={handleContact}
                      onFocus={() => setIsContactFocused(true)}
                      onBlur={() => setIsContactFocused(contact !== "")}
                      className="w-full border-b border-gray-300 p-2 pt-5 bg-transparent focus:outline-none focus:border-orange-600 text-sm"
                      required
                    />
                  </div>
                  {errors.contact && (
                    <p className="text-red-500 text-xs mt-1">{errors.contact}</p>
                  )}
                </span>

                <span className="relative">
                  <label
                    htmlFor="message"
                    className={`absolute left-2 transition-all ${
                      isMessageFocused || message
                        ? "top-0 text-xs text-orange-600 font-medium"
                        : "top-1/3 transform -translate-y-1/2 text-gray-500"
                    }`}
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onFocus={() => setIsMessageFocused(true)}
                    onBlur={() => setIsMessageFocused(message !== "")}
                    className="w-full border-b border-gray-300 p-2 pt-5 bg-transparent focus:outline-none focus:border-orange-600 text-sm h-20 resize-none"
                    required
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                  )}
                </span>

                {errors.general && (
                  <p className="text-red-500 text-xs text-center">{errors.general}</p>
                )}

                <button
                  type="submit"
                  className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2.5 px-4 rounded-lg transition shadow-sm mt-2 text-sm"
                >
                  Submit Query
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Section 5: Frequently Asked Questions */}
        <div className="mb-14">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FaqItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>

        {/* Closing Note */}
        <div className="text-center bg-gray-50 p-6 rounded-2xl border border-gray-200">
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            Explore the{" "}
            <Link href="/" className="text-orange-600 font-semibold underline hover:text-orange-700">
              Learnosphere homepage
            </Link>{" "}
            to access the platform's learning services, educational resources and opportunities for teachers.
          </p>
        </div>

      </div>

      <Footer1 />
      <Footer />
    </div>
  );
};

export default ResourceandSupport;
