import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Footer1 from "@/components/Footer1";

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />
      <div className="bg-white min-h-screen py-12 px-6 md:px-20 mt-6">
        <div className="max-w-4xl mx-auto bg-white p-8">
          <h1 className="text-3xl font-bold text-orange-500 text-center mb-6">
            Privacy Policy
          </h1>
          <p className="text-gray-600 text-sm text-center mb-12">
            Effective Date: [August-2024] | Last Updated: [December-2024]
          </p>

          <div className="space-y-8">
            {/* Section 1 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800">
                Welcome to LearnOsphere
              </h2>
              <p className="text-gray-600 mt-2">
                LearnOsphere (“we,” “our,” or “us”) is committed to protecting
                your privacy. This Privacy Policy outlines how we collect, use,
                disclose, and safeguard your information when you visit our
                website (
                <a
                  href="https://learnosphere.in"
                  className="text-orange-500 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  learnosphere.in
                </a>
                ) or use our services. Please read this Privacy Policy carefully
                to understand our practices regarding your personal information.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800">
                1. Information We Collect
              </h2>
              <p className="text-gray-600 mt-2">
                We may collect and process the following types of information:
              </p>
              <ul className="list-disc list-inside mt-4 text-gray-600 space-y-2">
                <li>
                  <strong>Personal Information:</strong>Name, email address,
                  phone number, billing address, and other details you provide
                  during registration or when using our services.
                </li>
                <li>
                  <strong>Usage Information:</strong> Information about your
                  interaction with our platform, such as pages visited, time
                  spent, and features used.
                </li>
                <li>
                  <strong>Payment Information:</strong> Payment details,
                  including billing address and transaction history, collected
                  through secure payment gateways.
                </li>
                <li>
                  <strong>Technical Information:</strong> Device type, IP
                  address, browser type, operating system, and other technical
                  details related to your use of our website or app.
                </li>
                <li>
                  <strong>Government Identification:</strong> For teacher
                  verification and safety purposes, we collect valid
                  government-issued ID (such as Aadhaar, PAN, or Voter ID). This
                  is mandatory for teachers who opt to visit students at home to
                  ensure student security.
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800">
                2. How We Use Your Information
              </h2>
              <ul className="list-disc list-inside mt-2 text-gray-600 space-y-2">
                <li>Providing and improving our services.</li>
                <li>Personalizing your experience on the platform.</li>
                <li>Processing transactions and sending receipts.</li>
                <li>
                  Communicating updates, offers, or promotional materials.
                </li>
                <li>Ensuring security and preventing fraud.</li>
                <li>Complying with legal obligations.</li>
                <li>
                  Charging a minimal fee for dashboard usage to maintain
                  platform quality and accessibility.
                </li>
                <li>
                  Providing educational content to students and allowing
                  teachers to upload content on our platform.
                </li>
                <li>
                  Ensuring that all uploaded content is reviewed and approved by
                  LearnOsphere admins, teachers, or content experts before being
                  made available.
                </li>
                <li>
                  Rewarding teachers for approved content by crediting payments
                  to their wallets.
                </li>
                <li>
                  Implementing a refer-and-earn system for teachers and
                  students, where a teacher inviting another teacher earns a
                  reward after both upload content that gets successfully
                  verified by the admin, teacher, or content expert.
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800">
                3. Sharing Your Information
              </h2>
              <p className="text-gray-600 mt-2">
                We do not sell or rent your personal information. However, we
                may share information with:
              </p>
              <ul className="list-disc list-inside mt-2 text-gray-600 space-y-2">
                <li>
                  <strong>Service Providers:</strong> Third-party vendors
                  assisting us in delivering services (e.g., payment processing,
                  analytics).
                </li>
                <li>
                  <strong>Legal Authorities:</strong> If required by law or to
                  protect our rights, property, or safety.
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800">
                4. Data Security
              </h2>
              <p className="text-gray-600 mt-2">
                We implement robust security measures to protect your
                information. However, no method of transmission over the
                internet or electronic storage is 100% secure, and we cannot
                guarantee absolute security.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800">
                5. Your Rights
              </h2>
              <ul className="list-disc list-inside mt-2 text-gray-600 space-y-2">
                <li>Access, update, or delete your personal information.</li>
                <li>Withdraw consent to processing your data.</li>
                <li>Opt-out of receiving promotional communications.</li>
              </ul>
              <p className="text-gray-600 mt-2">
                Contact us at{" "}
                <a
                  href="mailto:info@learnosphere.in"
                  className="text-orange-500 underline"
                >
                  info@learnosphere.in
                </a>{" "}
                to exercise your rights.
              </p>
            </section>

            {/* Section 7-12 */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800">
                6. Cookies and Tracking Technologies
              </h2>
              <p className="text-gray-600 mt-2">
                We use cookies to enhance your experience. Manage preferences
                via browser settings.
              </p>
              <ul className="list-disc list-inside mt-2 text-gray-600 space-y-2">
                <li>
                  <strong>Essential Cookies:</strong> Necessary for the
                  operation of our website.
                </li>
                <li>
                  <strong>Performance and Analytics Cookies:</strong> Help us
                  understand user behavior and improve functionality.
                </li>
                <li>
                  <strong>Advertising Cookies:</strong> Deliver relevant
                  advertisements to you based on your preferences.
                </li>
              </ul>
              <p className="text-gray-600 mt-2">
                You can manage your cookie preferences through your browser
                settings.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-gray-800">
                7. Third-Party Links
              </h2>
              <p className="text-gray-600 mt-2">
                Our website may contain links to third-party websites. We are
                not responsible for the privacy practices or content of these
                websites. We encourage you to review the privacy policies of
                third-party websites you visit.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-gray-800">
                8. Children’s Privacy
              </h2>
              <p className="text-gray-600 mt-2">
                LearnOsphere is designed to support students from Kindergarten
                to 12th grade, and therefore, we welcome users of all ages,
                including children under the age of 13. We are committed to
                safeguarding the privacy and safety of young learners.
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                <li>
                  <strong>Parental Consent:</strong> For children under 13, we
                  strongly recommend that parents or legal guardians supervise
                  account creation and usage. In some cases, we may require
                  verifiable parental consent in accordance with applicable
                  laws.
                </li>
                <li>
                  <strong>Limited Data Collection:</strong> We collect only the
                  necessary information required to provide educational services
                  and maintain a safe learning environment.
                </li>
                <li>
                  <strong>Content Moderation:</strong> All educational content
                  is reviewed to ensure it is age-appropriate and suitable for
                  young audiences.
                </li>
                <li>
                  <strong>No Commercial Tracking:</strong> We do not track users
                  for advertising purposes or collect unnecessary personal data.
                </li>
                <li>
                  <strong>Parental Rights:</strong> Parents or guardians may
                  request to review, update, or delete their child’s information
                  at any time by contacting us at
                  <a
                    href="mailto:info@learnosphere.in"
                    className="text-orange-600 underline ml-1"
                  >
                    info@learnosphere.in
                  </a>
                  .
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800">
                9. Data Retention
              </h2>
              <p className="text-gray-600 mt-2">
                We retain your personal information only for as long as
                necessary to fulfill the purposes outlined in this Privacy
                Policy or as required by law. When data is no longer needed, we
                securely delete or anonymize it.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-gray-800">
                10. International Users
              </h2>
              <p className="text-gray-600 mt-2">
                If you are accessing our platform from outside India, please
                note that your data may be transferred to, stored, and processed
                in India. By using our services, you consent to the transfer of
                your information to India, subject to this Privacy Policy.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-gray-800">
                11. Family Policy
              </h2>
              <p className="text-gray-600 mt-2">
                We value a safe and inclusive environment for all users,
                including families. Our platform is designed to support
                family-friendly educational content while ensuring safety for
                students and teachers.
              </p>

              <ul className="list-disc list-inside mt-4 text-gray-600 space-y-2">
                <li>
                  <strong>Parental Control:</strong>Parents or guardians can
                  supervise their child's learning experience and monitor
                  content accessed on the platform.
                </li>
                <li>
                  <strong>Content Moderation:</strong>All educational material
                  uploaded by teachers undergoes a strict review process by
                  LearnOsphere admins, teachers, or content experts to ensure it
                  is appropriate and meets educational standards.
                </li>
                <li>
                  <strong>Safe Learning Environment:</strong>We do not tolerate
                  inappropriate, harmful, or offensive content. Any violation of
                  this policy may result in the removal of content or suspension
                  of the account.
                </li>
                <li>
                  <strong>Privacy Protection:</strong> We do not collect
                  unnecessary personal information from children and ensure
                  compliance with data protection regulations for young
                  learners.
                </li>
                <li>
                  <strong>Child Privacy:</strong> We minimize data collection
                  from young users
                </li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-gray-800">
                12. Tutor Content Usage and Internal Sharing Policy
              </h2>
              <p className="text-gray-600 mt-2">
                This policy outlines the terms and conditions for tutors who
                upload educational content and participate in the referral
                system on LearnOsphere:
              </p>
              <ul className="list-disc list-inside mt-4 text-gray-600 space-y-2">
                <li>
                  <strong>Platform Usage:</strong> By uploading educational
                  materials (e.g., videos, PDFs, notes, or presentations),
                  tutors grant LearnOsphere the right to use this content on our
                  internal platforms, including the mobile apps, official
                  website, and verified social media channels (YouTube,
                  Instagram, Facebook) for educational, promotional, and
                  functional purposes.
                </li>
                <li>
                  <strong>No Third-Party Distribution:</strong> Content remains
                  within the LearnOsphere ecosystem and is never sold, licensed,
                  or shared with third parties or advertisers without the
                  tutor’s explicit consent.
                </li>
                <li>
                  <strong>Non-Tracking Policy:</strong> We do not use
                  advertising identifiers (such as IDFA or GAID) to track users
                  or personalize ads, nor do we monitor behavior across other
                  apps or websites.
                </li>
                <li>
                  <strong>Expert Review & Payment:</strong> Content uploaded by
                  tutors will be reviewed by subject-matter experts. Only after
                  the content is approved, the associated payment will be
                  generated. Tutors will receive notifications via email or
                  message about the approval and payment status.
                </li>
                <li>
                  <strong>Refer & Earn Program:</strong> Tutors can refer any
                  user using their unique referral code. When a new user
                  registers using the code, both the tutor and the referred user
                  receive rewards.
                </li>
                <li>
                  <strong>Withdrawal Conditions:</strong> Users cannot withdraw
                  any referral or content-based earnings until they upload
                  original educational material (such as PDFs or videos) that
                  meets our quality and content standards.
                </li>
                <li>
                  <strong>Purpose:</strong> These policies are designed to
                  encourage genuine contributions, reward valuable educational
                  content, and maintain privacy, transparency, and quality on
                  the platform.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800">
                13. Refund Policy & Demo Charges
              </h2>
              <p className="text-gray-600 mt-2">
                To maintain platform quality and fairness, the following refund
                policy applies:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                <li>
                  We offer a <strong>7-day demo period</strong> during which
                  certain charges may apply for accessing premium features or
                  dashboards.
                </li>
                <li>
                  Users who are not satisfied with the platform may cancel their
                  subscription within <strong>7 working days</strong> from the
                  activation date by contacting support at{" "}
                  <a
                    href="mailto:info@learnosphere.in"
                    className="text-orange-600 underline"
                  >
                    info@learnosphere.in
                  </a>
                  .
                </li>
                <li>
                  Upon successful cancellation within this period, any paid
                  amount will be refunded after deducting applicable demo
                  charges.
                </li>
                <li>No refunds will be issued after the 7-day period.</li>
                <li>
                  Refunds, once approved, will be processed within{" "}
                  <strong>7–10 working days</strong> to the original payment
                  method.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800">
                14. Changes to This Privacy Policy
              </h2>
              <p className="text-gray-600 mt-2">
                We may update this Privacy Policy from time to time. Any changes
                will be posted on this page with the updated effective date. We
                encourage you to review this page periodically to stay informed
                about how we protect your information.
              </p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-gray-800">
                15. Contact Us
              </h2>
              <p className="text-gray-600 mt-2">
                If you have any questions or concerns about this Privacy Policy,
                please contact us at:
              </p>
              <p className="text-gray-600 mt-2">
                Email:
                <a
                  href="mailto:info@learnosphere.in"
                  className="text-orange-500 underline px-2"
                >
                  info@learnosphere.in
                </a>
              </p>
              <p className="text-gray-600 mt-2">
                Website:
                <a
                  href="https://learnosphere.in"
                  target="_blank"
                  className="text-orange-500 underline px-2"
                >
                  learnosphere.in
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
