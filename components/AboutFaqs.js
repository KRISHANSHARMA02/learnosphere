"use client"
import React, { useState } from "react";
import { FaQuestionCircle, FaPlus, FaMinus } from "react-icons/fa";

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What subjects does Learnosphere cover?",
      answer: "Learnosphere covers a wide range of subjects including math, science, languages, and more. We also offer specialized tutoring for competitive exams such as UPSC, SSC, NEET, IIT, and CBSE."
    },
    {
      question: "How can I find a tutor near me?",
      answer: "You can find a tutor near you by using our search feature on the Learnosphere platform. Simply enter your location and preferred subject to view a list of available tutors in your area."
    },
    {
      question: "How do I sign up as a tutor?",
      answer: "To sign up as a tutor, visit our 'Become a Tutor' page and fill out the registration form. We will review your application and get in touch with you to complete the onboarding process."
    },
    {
      question: "What are the benefits of using Learnosphere for exam preparation?",
      answer: "Learnosphere offers personalized tutoring tailored to your exam preparation needs. Our expert tutors provide targeted lessons, study materials, and strategies to help you excel in exams like UPSC, SSC, NEET, IIT, and CBSE."
    },
    {
      question: "Can I schedule a trial class with a tutor?",
      answer: "Yes, you can schedule a trial class with a tutor to ensure they are the right fit for you. During the trial, you can discuss your learning goals and evaluate the tutor's teaching style."
    },
    {
      question: "Are there any offline tuition options available?",
      answer: "Yes, Learnosphere offers offline tuition options in Jaipur and other cities. You can find tutors who provide face-to-face learning experiences in the comfort of your home."
    },
    {
      question: "How do I contact customer support?",
      answer: "You can contact our customer support team through the 'Contact Us' page on our website. We are here to help you with any questions or issues you may have."
    },
  ];

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 font-Poppins mb-8 flex items-center">
          <FaQuestionCircle className="mr-2 text-orange-500 text-xl md:text-2xl lg:text-3xl" />
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => handleToggle(index)}
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{faq.question}</h3>
                {openIndex === index ? (
                  <FaMinus className="text-orange-500 text-xl" />
                ) : (
                  <FaPlus className="text-orange-500 text-xl" />
                )}
              </div>
              {openIndex === index && (
                <p className="text-gray-700">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
/*import Footer from "@/components/Footer";

export default function Page() {
  return (
    <div>
      {/* Page Content 
      <main>
        <h1>Some content here...</h1>
      </main>
      <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What do you mean by the state Board?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A State Board is a government-run educational authority in an Indian state that designs the curriculum, conducts school exams (like SSC and HSC), and regulates school education within that state."
          }
        },
        {
          "@type": "Question",
          "name": "What are state education boards?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "State education boards are official academic bodies established by individual Indian states to manage school-level education. They set the syllabus, conduct exams like Class 10 (SSC) and Class 12 (HSC), and issue certificates to students within their respective states."
          }
        },
        {
          "@type": "Question",
          "name": "Is the state board harder than ICSE?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No, the State Board is usually easier than ICSE. ICSE has a more detailed syllabus and tougher exams, especially in English and science. State Boards have simpler and more region-focused content."
          }
        },
        {
          "@type": "Question",
          "name": "Can I crack NEET or JEE from a State Board?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, many students from State Boards clear NEET and JEE with the right preparation, especially by studying NCERT books."
          }
        },
        {
          "@type": "Question",
          "name": "Which is better: CBSE or State Board?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "CBSE is better for national-level exams like NEET or JEE, while State Boards are good for regional exams and local language learning."
          }
        },
        {
          "@type": "Question",
          "name": "Do State Boards follow NCERT books?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Some do (like UP and Rajasthan), but many use their own textbooks. It's good to check your state's official site or school."
          }
        }
      ]
    })
  }}
/><Footer />
    </div>
  );
}*/
