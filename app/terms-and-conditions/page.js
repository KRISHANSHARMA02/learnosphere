import React from "react";

const TermsOfUse = () => {
  return (
<section className="max-w-5xl mx-auto px-4 py-10 text-slate-800 font-Poppins">
      <h1 className="text-3xl sm:text-4xl font-bold text-orange-600 mb-2">
        Terms of Use
      </h1>
      <p className="text-sm text-gray-500 mb-6">Effective Date: 11-07-2025</p>

      <p className="mb-6">
        Welcome to <a href="https://learnosphere.in" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">LearnOsphere.in</a> (“LearnOsphere”, “we”, “us”, “our”), an educational platform designed to connect learners with educators across India and beyond. By accessing or using any of our platforms—including our website, mobile application, YouTube channel, or other associated products and services—you agree to comply with and be bound by these Terms of Use and our Privacy Policy.
      </p>

      <p className="mb-6 font-semibold">Please read these Terms carefully before using the services.</p>

      {terms.map((term, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-orange-500">
            {index + 1}. {term.title}
          </h2>
          {term.content.map((paragraph, pIndex) => (
            <p
              key={pIndex}
              className="text-base leading-7 mb-3 text-gray-700"
              dangerouslySetInnerHTML={{ __html: paragraph }}
            />
          ))}
        </div>
      ))}
    </section>
  );
};

export default TermsOfUse;

// Terms content as JS object
const terms = [
  {
    title: "Acceptance of Terms",
    content: [
      'By registering on <a href="https://learnosphere.in" target="_blank" rel="noopener noreferrer" class="text-orange-600 hover:underline">LearnOsphere.in</a>, downloading our application, or using our services, you confirm that you have read, understood, and agree to be bound by these Terms, including any additional guidelines and future modifications. If you do not agree, you must not use our platform.',
      "If you are under 18, parental or guardian consent is assumed upon registration."
    ]
  },
  {
    title: "User Information & Privacy",
    content: [
      "Your use of our platform requires you to provide personal details such as name, contact information, educational background, and preferences. By sharing this information, you consent to its collection, storage, processing, and use in accordance with our Privacy Policy.",
      "We ensure the highest standards of data protection under applicable Indian laws and use secure infrastructure and technology to safeguard your personal data."
    ]
  },
  {
    title: "Platform Usage & Restrictions",
    content: [
      "You agree to use LearnOsphere services solely for lawful educational purposes and not to:",
      "• Misuse or interfere with the security of our systems.",
      "• Post, share, or upload content that is abusive, illegal, misleading, or violates another’s rights.",
      "• Copy, reproduce, distribute, or exploit platform content without written consent from LearnOsphere.",
      "• Use another user’s account without permission.",
      "LearnOsphere reserves the right to suspend or terminate your access at any time if found in violation of these terms."
    ]
  },
  {
    title: "Intellectual Property",
    content: [
      "All content on LearnOsphere—including courses, text, graphics, videos, logos, designs, and software—is owned by LearnOsphere or its content partners and is protected under copyright and trademark laws.",
      "You may not copy, modify, reproduce, or redistribute any content for commercial purposes without explicit permission."
    ]
  },
  {
    title: "User-Generated Content",
    content: [
      "When you upload, post, or submit any material—such as answers, comments, video lessons, or course content—you grant LearnOsphere a worldwide, royalty-free, non-exclusive license to use, display, adapt, and distribute that content across its platforms and promotional material.",
      "You are solely responsible for the accuracy and legality of any content you post."
    ]
  },
  {
    title: "Paid Services and Refunds",
    content: [
      "LearnOsphere offers both free and paid services. When opting for paid content or subscriptions (upto ₹999/year for dashboard access), you agree to the stated pricing and payment terms.",
      "Refund Policy: Unless otherwise specified, payments made are non-refundable. In exceptional cases (technical issues, duplicate charges, etc.), refund requests may be reviewed on a case-by-case basis."
    ]
  },
  {
    title: "Third-Party Services",
    content: [
      "LearnOsphere may contain links to third-party websites or tools. These are provided for convenience, and LearnOsphere does not endorse or take responsibility for their content, services, or privacy practices.",
      "You are advised to review the terms and policies of any third-party platform you interact with via LearnOsphere."
    ]
  },
  {
    title: "Communications",
    content: [
      "By registering with us, you consent to receive communications from LearnOsphere via SMS, WhatsApp, email, or push notifications regarding updates, promotions, or account-related information.",
      'To opt out of promotional messages, email us at: <a href="mailto:support@learnosphere.in" class="text-orange-600 hover:underline">support@learnosphere.in</a>'
    ]
  },
  {
    title: "Public Forums and Discussions",
    content: [
      "Our discussion sections, forums, or comment areas are public spaces. Any information you post is accessible to all users and may be indexed by search engines. Please share responsibly and avoid disclosing sensitive personal data in public forums."
    ]
  },
  {
    title: "Cookies and Tracking",
    content: [
      "We use cookies and tracking technologies to enhance user experience, track user preferences, and serve customized content. You may disable cookies in your browser settings, though some features of the platform may not function properly."
    ]
  },
  {
    title: "Termination of Access",
    content: [
      "LearnOsphere reserves the right to:",
      "• Suspend or permanently disable access to your account,",
      "• Remove or modify any content that violates our terms or community guidelines,",
      "• Investigate any complaint or violation and take appropriate legal action if needed."
    ]
  },
  {
    title: "Liability Disclaimer",
    content: [
      "LearnOsphere strives to provide high-quality, accurate educational content, but we do not guarantee uninterrupted access, error-free functionality, or success in examinations. We are not liable for any direct or indirect damages resulting from your use of the platform."
    ]
  },
  {
    title: "Governing Law",
    content: [
      "These Terms shall be governed by and interpreted under the laws of India, with exclusive jurisdiction in the courts of Jaipur, Rajasthan."
    ]
  },
  {
    title: "Changes to the Terms",
    content: [
      "We may revise these Terms of Use periodically. Updated versions will be posted on our website and notified to users where appropriate. Continued use of the services constitutes acceptance of the new Terms."
    ]
  },
  {
    title: "Contact Us",
    content: [
      "For any queries or concerns, please contact us at:",
      '📧 Email: <a href="mailto:support@learnosphere.in" class="text-orange-600 hover:underline">support@learnosphere.in</a>',
      '🌐 Website: <a href="https://learnosphere.in" target="_blank" rel="noopener noreferrer" class="text-orange-600 hover:underline">www.learnosphere.in</a>'
    ]
  }
];


export const metadata = {
  title: "Terms and Conditions | Learnosphere",
};