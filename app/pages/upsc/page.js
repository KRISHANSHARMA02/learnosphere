import React from "react";
import Navbar from "@/components/Navbar";
import Footer1 from "@/components/Footer1";
import Footer from "@/components/Footer";
import Link from "next/link";
import { 
  FaBookOpen, FaGraduationCap, FaChalkboardTeacher, 
  FaClipboardList, FaFileAlt, FaCheckCircle, FaGlobe,
  FaLandmark, FaBalanceScale, FaLeaf, FaNewspaper, FaFlask, FaQuestionCircle
} from "react-icons/fa";

export const metadata = {
  title: "UPSC Exam Preparation | Study Materials, Notes & Resources | Learnosphere",
  description: "Explore UPSC exam preparation resources, study materials, syllabus, practice questions and preparation tips to support your Civil Services exam journey.",
};

const subjects = [
  { name: "History", desc: "Ancient, Medieval and Modern Indian History.", icon: <FaLandmark className="text-orange-500" /> },
  { name: "Geography", desc: "Indian Geography, World Geography and Physical Geography.", icon: <FaGlobe className="text-orange-500" /> },
  { name: "Indian Polity", desc: "Constitution, Parliament, governance and political institutions.", icon: <FaBalanceScale className="text-orange-500" /> },
  { name: "Economics", desc: "Indian Economy, economic development and important financial concepts.", icon: <FaFileAlt className="text-orange-500" /> },
  { name: "Environment", desc: "Ecology, biodiversity, climate change and environmental issues.", icon: <FaLeaf className="text-orange-500" /> },
  { name: "Current Affairs", desc: "National and international developments and important events.", icon: <FaNewspaper className="text-orange-500" /> },
  { name: "General Science", desc: "Basic scientific concepts and developments.", icon: <FaFlask className="text-orange-500" /> },
];

const studyMaterials = [
  "NCERT textbooks for foundational knowledge.",
  "Indian Polity study materials.",
  "Modern Indian History notes.",
  "Geography study resources.",
  "Indian Economy learning materials.",
  "Environment and Ecology notes.",
  "Current Affairs resources.",
  "Previous year question papers and practice exercises."
];

const prepTips = [
  { title: "Understand the Syllabus", desc: "Read the complete UPSC syllabus to identify important subjects and topics." },
  { title: "Follow a Study Schedule", desc: "Organise study time according to different subjects." },
  { title: "Build Conceptual Understanding", desc: "Focus on understanding fundamental concepts instead of memorising information." },
  { title: "Read Current Affairs", desc: "Stay informed about important national and international developments." },
  { title: "Practise Questions", desc: "Solve relevant practice questions to strengthen subject knowledge." },
  { title: "Revise Regularly", desc: "Review previously studied topics to improve retention." },
  { title: "Analyse Previous Year Papers", desc: "Understand question patterns and important subject areas." }
];

const faqs = [
  {
    q: "What is the UPSC examination?",
    a: "UPSC stands for Union Public Service Commission. It conducts various examinations, including the Civil Services Examination, for recruitment to different government services such as IAS, IPS, and IFS."
  },
  {
    q: "What are the three stages of the UPSC Civil Services Examination?",
    a: "The three stages are Preliminary Examination, Main Examination and Personality Test (Interview)."
  },
  {
    q: "Which subjects are important for UPSC preparation?",
    a: "Important subjects include History, Geography, Indian Polity, Economics, Environment, General Science and Current Affairs."
  },
  {
    q: "What study materials are useful for UPSC preparation?",
    a: "NCERT textbooks, subject-wise notes, standard reference books, current affairs resources and previous year question papers are useful learning resources."
  },
  {
    q: "Is current affairs important for UPSC preparation?",
    a: "Yes, current affairs are important for developing awareness of national and international events and are relevant to different stages of the examination."
  },
  {
    q: "Why should students understand the UPSC syllabus?",
    a: "Understanding the syllabus helps students identify important topics, organise their study schedules and focus on relevant subjects."
  },
  {
    q: "How can practice questions help in UPSC preparation?",
    a: "Practice questions help students assess their understanding, improve analytical skills and become familiar with different question formats."
  },
  {
    q: "Does Learnosphere provide UPSC study materials?",
    a: "Students can explore available UPSC-related educational resources, study materials and preparation content on Learnosphere. Resource availability may vary."
  }
];

export default function UpscPage() {
  return (
    <div className="bg-white min-h-screen font-Poppins">
      <Navbar />

      {/* Hero Section */}
      <div className="pt-28 pb-16 px-6 bg-gradient-to-b from-orange-50/80 via-white to-white border-b border-orange-100">
        <div className="container mx-auto max-w-6xl">
          <nav className="text-sm mb-6 font-medium text-gray-500" aria-label="Breadcrumb">
            <ol className="list-none p-0 inline-flex items-center">
              <li><Link href="/" className="hover:text-orange-600 transition-colors">Home</Link><span className="mx-3">/</span></li>
              <li><Link href="/pages" className="hover:text-orange-600 transition-colors">Pages</Link><span className="mx-3">/</span></li>
              <li className="text-gray-900 font-bold">UPSC</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block bg-orange-100 text-orange-600 py-1.5 px-4 rounded-full text-xs font-bold tracking-wider uppercase mb-4">
              CIVIL SERVICES PREPARATION
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
              UPSC Exam Preparation
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Explore UPSC exam preparation resources, study notes, syllabus, practice questions and useful learning materials in one place. Build a strong understanding of important subjects and improve your knowledge with structured study resources and regular practice.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-6 py-12">
        {/* Intro */}
        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-4">
            About the UPSC Examination
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The UPSC (Union Public Service Commission) examination is one of India&apos;s major competitive examinations. It is conducted to recruit candidates for prestigious civil services such as IAS, IPS and IFS. Preparing for the UPSC Civil Services Examination requires a clear understanding of the syllabus, regular study, conceptual knowledge and consistent practice.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Students can explore different UPSC study materials, preparation notes, subject-wise resources and practice questions to develop their understanding of important topics. A structured learning approach helps candidates organise their preparation and work towards their academic goals.
          </p>
        </section>

        {/* 3 Stages */}
        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-6">
            Understanding the UPSC Exam Pattern
          </h2>
          <p className="text-gray-700 mb-6">
            The UPSC Civil Services Examination is conducted in three main stages. Understanding these stages helps candidates become familiar with the examination structure.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-orange-50/40 rounded-2xl border border-orange-100">
              <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">Stage 1</span>
              <h3 className="text-xl font-bold text-slate-900 mt-2 mb-3">1. Preliminary Examination</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                The Preliminary Examination consists of two objective-type papers:
              </p>
              <ul className="text-sm text-gray-700 space-y-1 font-medium">
                <li>• General Studies Paper I</li>
                <li>• General Studies Paper II (CSAT)</li>
              </ul>
              <p className="text-gray-500 text-xs mt-3">
                These papers assess general awareness, knowledge of important subjects, comprehension and analytical abilities.
              </p>
            </div>

            <div className="p-6 bg-orange-50/40 rounded-2xl border border-orange-100">
              <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">Stage 2</span>
              <h3 className="text-xl font-bold text-slate-900 mt-2 mb-3">2. Main Examination</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Candidates who qualify for the Preliminary Examination can appear for the Main Examination. It includes descriptive papers covering General Studies, Essay, optional subjects and qualifying language papers.
              </p>
            </div>

            <div className="p-6 bg-orange-50/40 rounded-2xl border border-orange-100">
              <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">Stage 3</span>
              <h3 className="text-xl font-bold text-slate-900 mt-2 mb-3">3. Personality Test (Interview)</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Candidates who qualify for the Main Examination are invited for the Personality Test. This stage evaluates their personality, communication skills, decision-making ability and overall awareness.
              </p>
            </div>
          </div>
        </section>

        {/* Important Subjects */}
        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-6">
            Important Subjects for UPSC Preparation
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {subjects.map((sub, idx) => (
              <div key={idx} className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm flex items-start gap-4 hover:border-orange-300 transition-colors">
                <div className="p-3 bg-orange-50 rounded-lg shrink-0 text-xl">{sub.icon}</div>
                <div>
                  <h4 className="font-bold text-slate-900">{sub.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{sub.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Study Materials & Prep Tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          <section className="p-7 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 mb-4 flex items-center gap-3">
              <FaBookOpen className="text-orange-500" />
              Important Study Materials
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Choosing relevant study resources is an important part of preparing for competitive examinations. Students can organise their learning with:
            </p>
            <ul className="space-y-2.5">
              {studyMaterials.map((mat, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <FaCheckCircle className="text-orange-500 mt-1 shrink-0 text-xs" />
                  <span>{mat}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="p-7 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 mb-4 flex items-center gap-3">
              <FaGraduationCap className="text-orange-500" />
              Effective Tips for UPSC Preparation
            </h2>
            <ul className="space-y-3">
              {prepTips.map((tip, i) => (
                <li key={i} className="text-sm">
                  <strong className="text-slate-900">{tip.title}:</strong>{" "}
                  <span className="text-gray-600">{tip.desc}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Resources Cards */}
        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-6">
            Explore UPSC Study Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-orange-50/50 rounded-2xl border border-orange-200">
              <h3 className="font-bold text-slate-900 text-lg mb-2">UPSC Study Materials</h3>
              <p className="text-sm text-gray-600 mb-4">Explore educational resources and notes covering important UPSC subjects.</p>
              <Link href="/pages/upsc" className="text-sm font-bold text-orange-600 hover:text-orange-700 inline-flex items-center gap-1">
                Explore UPSC Study Resources →
              </Link>
            </div>
            <div className="p-6 bg-orange-50/50 rounded-2xl border border-orange-200">
              <h3 className="font-bold text-slate-900 text-lg mb-2">UPSC Preparation Notes</h3>
              <p className="text-sm text-gray-600 mb-4">Build subject knowledge with organised notes covering History, Geography, Polity, Economics and more.</p>
              <Link href="/pages/upsc" className="text-sm font-bold text-orange-600 hover:text-orange-700 inline-flex items-center gap-1">
                Explore Study Notes →
              </Link>
            </div>
            <div className="p-6 bg-orange-50/50 rounded-2xl border border-orange-200">
              <h3 className="font-bold text-slate-900 text-lg mb-2">UPSC Practice Questions</h3>
              <p className="text-sm text-gray-600 mb-4">Improve your understanding by practising questions related to important examination subjects.</p>
              <Link href="/pages/upsc" className="text-sm font-bold text-orange-600 hover:text-orange-700 inline-flex items-center gap-1">
                Explore Practice Resources →
              </Link>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-6">
            Frequently Asked Questions (FAQs)
          </h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <div key={i} className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-2">{i + 1}. {f.q}</h4>
                <p className="text-gray-700 text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer1 />
      <Footer />
    </div>
  );
}
