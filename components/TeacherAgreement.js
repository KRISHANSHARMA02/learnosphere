"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

function Card({ children, className }) {
  return (
    <div className={`bg-white shadow-lg rounded-xl p-6 ${className}`}>
      {children}
    </div>
  );
}

function CardContent({ children, className }) {
  return <div className={`mt-4 text-center ${className}`}>{children}</div>;
}

function Button({ children, className, disabled, onClick }) {
  return (
    <button
      className={`mt-4 w-full px-4 py-2 rounded text-white ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default function TeacherAgreement({ setShowAgreement }) {
  const { data: session } = useSession();
  const [isAgreed, setIsAgreed] = useState(false);
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    if (session?.user?.email) {
      fetchAgreementStatus(session.user.email);
    }
  }, [session]);

  const fetchAgreementStatus = async (email) => {
    try {
      const response = await fetch(`${WEB_BACKEND_URL}/api/route/getAgreementStatus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ teacherEmail: email }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsAgreed(data.hasAgreedToTerms); // Set the agreement status based on the response
      } else {
        alert(data.errors || "An error occurred while fetching agreement status.");
      }
    } catch (error) {
      console.error("Error while fetching agreement status:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleAgree = async () => {
    if (!session || !session.user || !session.user.email) {
      alert("User session not found. Please log in.");
      return;
    }

    try {
      const response = await fetch(
        `${WEB_BACKEND_URL}/api/route/updateTeacherAgreementStatus`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ teacherEmail: session.user.email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setAgreed(true);
        setShowAgreement(false);
        alert("You have agreed to the terms and conditions.");
      } else {
        alert(
          data.errors ||
            "An error occurred while updating the agreement status."
        );
      }
    } catch (error) {
      console.error("Error while updating agreement status:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleClose = () => {
    setShowAgreement(false); // Close the agreement modal
  };

  return (
    <div className="h-auto flex items-center justify-cente p-6">
      <Card className="w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Learnosphere Teacher Agreement
        </h2>
        <div className="h-[50vh] overflow-y-auto border p-4 bg-gray-50 rounded-lg text-gray-700">
          <h3 className="text-lg font-semibold">
            1. Content Ownership & Usage
          </h3>
          <p>
            Learnosphere has rights to use, modify, distribute, and promote your
            content across various platforms, including marketing campaigns and
            partner sites. Any revenue generated from the distribution of your
            content will be governed by Learnosphere’s revenue-sharing model.
          </p>
          <p>
            By submitting content, you grant Learnosphere a non-exclusive,
            worldwide, royalty-free license to use, store, distribute, and adapt
            your content as needed.
          </p>

          <h3 className="text-lg font-semibold mt-4">
            2. Copyright & Intellectual Property
          </h3>
          <p>
            You must only upload original content that you have created and own
            the rights to. Content must not include any copyrighted material
            such as images, music, books, or videos unless you have explicit
            permission.
          </p>
          <p>
            If any copyright infringement is detected, Learnosphere reserves the
            right to remove the content, suspend your account, and take legal
            action if necessary.
          </p>

          <h3 className="text-lg font-semibold mt-4">
            3. Interaction with Students
          </h3>
          <p>
            Teachers are strictly prohibited from engaging with students outside
            of the Learnosphere platform. All interactions, including messaging,
            live sessions, and discussions, must be conducted within the
            official Learnosphere system.
          </p>
          <p>
            Sharing personal contact details such as phone numbers, email
            addresses, or social media profiles with students is not allowed.
            Any violation may lead to account suspension or termination.
          </p>

          <h3 className="text-lg font-semibold mt-4">
            4. Content Quality & Standards
          </h3>
          <p>
            All educational content must be well-structured, high-quality, and
            professionally presented. Content should align with the subject
            matter and follow Learnosphere’s academic guidelines.
          </p>
          <p>
            Content containing inappropriate language, offensive material,
            misleading information, or plagiarism will be removed. Teachers who
            repeatedly violate quality standards may face penalties, including
            suspension.
          </p>

          <h3 className="text-lg font-semibold mt-4">
            5. Payment & Revenue Sharing
          </h3>
          <p>
            Teachers will receive payments based on the agreed revenue-sharing
            model. Payments will be processed on a [monthly/weekly] basis,
            depending on enrollments and student engagement.
          </p>
          <p>
            Learnosphere reserves the right to withhold payments in case of
            policy violations, refunds, fraudulent activity, or failure to meet
            platform standards.
          </p>

          <h3 className="text-lg font-semibold mt-4">
            6. Confidentiality & Data Protection
          </h3>
          <p>
            You agree to maintain the confidentiality of any proprietary
            information shared by Learnosphere, including platform strategies,
            course structures, and student data.
          </p>
          <p>
            Teachers must not share, sell, or distribute any data related to
            students, such as personal details, academic progress, or private
            messages, to third parties.
          </p>

          <h3 className="text-lg font-semibold mt-4">
            7. Termination & Policy Violation
          </h3>
          <p>
            Learnosphere reserves the right to suspend or terminate a teacher's
            account if any policies are violated. In cases of repeated
            misconduct, legal action may be taken.
          </p>
          <p>
            Any breach of contract, including copyright violations, fraudulent
            activity, or unethical behavior, will result in immediate account
            termination.
          </p>
        </div>

        <CardContent>
          {isAgreed ? (
            // If already agreed, show Close button
            <Button className="bg-gray-500" onClick={handleClose}>
              Close
            </Button>
          ) : (
            <>
              {/* If not agreed, show checkbox and Agree button */}
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-orange-500"
                  checked={agreed}
                  onChange={() => setAgreed(!agreed)}
                />
                <span className="ml-2 text-gray-700">
                  I Agree to the Terms & Conditions
                </span>
              </label>
              <Button
                className="bg-orange-500"
                disabled={!agreed}
                onClick={handleAgree}
              >
                Agree & Proceed
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
