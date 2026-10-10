"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import Footer from "@/components/Footer";
import Footer1 from "@/components/Footer1";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import skill from "@/public/PictureOfSkill.jpeg";
import { IoMdArrowDropright } from "react-icons/io";
import { IoRemoveOutline } from "react-icons/io5";
import { VscReferences, VscRemoteExplorer } from "react-icons/vsc";
import { ImBooks } from "react-icons/im";
import { FaChartSimple } from "react-icons/fa6";

import { GiAchievement } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import UpgradeSkills from "@/public/UpgradeSkills.jpg";
import { HiShieldCheck } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { trackEvent } from "@/src/lib/eventTracker";
const SkillEnhancement = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+91",
  });
  const [formErrors, setFormErrors] = useState({});
  const [timer, setTimer] = useState(60);
  const [otpSent, setOtpSent] = useState(false);
  const [otpError, setOtpError] = useState({});
  const [errors, setErrors] = useState({});
  const [quizStarted, setQuizStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitted1, setSubmitted1] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes countdown
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // State to hold OTP
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [submittedName, setSubmittedName] = useState("");
  const [submittedPhone, setSubmittedPhone] = useState("");
  const router = useRouter();
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("+91");
  const [selected, setSelected] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const faqs = [
    {
      question: "1. How does the Skill Enhancement program benefit teachers?",
      answer:
        "The Skill Enhancement program by LearnOsphere is designed to help teachers improve their teaching techniques, classroom management skills, and subject expertise. It provides access to the latest educational strategies, innovative teaching tools, and interactive methodologies to create an engaging learning environment for students.",
    },
    {
      question: "2. Is the program available online or offline?",
      answer:
        "LearnOsphere offers the program in both online and offline formats. Teachers can attend live virtual sessions, recorded webinars, and in-person workshops based on their convenience. The online modules are accessible anytime, allowing flexible learning at their own pace.",
    },
    {
      question: "3. What topics are covered in this program?",
      answer:
        "This program covers a wide range of topics, including classroom engagement strategies, modern teaching methodologies, technology integration in education, effective assessment techniques, and skill development workshops. It also focuses on helping teachers adapt to digital learning tools and student-centered approaches.",
    },
    {
      question: "4. Who can enroll in this program?",
      answer:
        "Any educator, whether a new teacher or an experienced professional, can enroll in the LearnOsphere Skill Enhancement program. The program is suitable for teachers across different educational levels and subjects who wish to upgrade their teaching skills and stay updated with modern educational trends.",
    },
    {
      question: "5. How can I register for the Skill Enhancement program?",
      answer:
        "Registration is simple. Teachers can visit the LearnOsphere website, go to the Skill Enhancement section, and fill out the enrollment form. After registration, they will receive access to the program schedule and learning materials.",
    },
  ];
  // When a country is selected
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

  // ✅ Fetch countries from backend
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get(
          "https://learnospherebackend.learnosphere.in/api/route/getAllCountries"
        );
        setCountries(res.data);
      } catch (err) {
        console.error("Error fetching countries:", err);
      }
    };
    fetchCountries();
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;

    // Allow only digits (check for numbers)
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value.slice(0, 1); // Ensure only 1 digit is entered
      setOtp(newOtp);

      // Move to next input if a value is entered
      if (value && index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      // If backspace is pressed on the last input and it's not empty, clear it first
      if (index === otp.length - 1 && otp[index] !== "") {
        const newOtp = [...otp];
        newOtp[index] = ""; // Clear the current input
        setOtp(newOtp);
      } else if (index > 0 && otp[index] === "") {
        // If backspace is pressed and current input is empty, focus the previous one
        document.getElementById(`otp-input-${index - 1}`).focus();
      } else {
        // Handle backspace for other fields
        const newOtp = [...otp];
        newOtp[index] = ""; // Clear the current input
        setOtp(newOtp);

        // Move focus to previous input if needed
        if (index > 0) {
          document.getElementById(`otp-input-${index - 1}`).focus();
        }
      }
    }
  };

  useEffect(() => {
    if (quizStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [quizStarted, timeLeft]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.phone || !/^[0-9]{10}$/.test(formData.phone)) {
      errors.phone = "Phone must be exactly 10 digits";
    }
    if (!selectedCountry) errors.selectedCountry = "Country code is required";

    if (Object.keys(errors).length) {
      setFormErrors(errors);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://learnospherebackend.learnosphere.in/api/route/TeacherModal",
        formData
      );

      trackEvent("SKILL_ENHANCEMENT_FORM_SUBMITTED", {
        name: formData.name,
        email: formData.email,
        mobile_number: selectedCountry ? `${selectedCountry}${formData.phone}` : formData.phone,
        phone: formData.phone,
        country_code: selectedCountry,
      });

      setOtpSent(true);
      setSubmitted1(true);
      setSubmittedEmail(formData.email);
      setSubmittedName(formData.name);
      setSubmittedPhone(formData.phone);
      setIsOtpModalOpen(true);
      Swal.fire({
        title: "Thank You for Reaching Out!",
        text: "OTP Sent Successfully",
        icon: "success",
      });
    } catch {
      alert("Failed to send OTP!");
    } finally {
      setIsSubmitting(false); // Button ko wapas enable karne ke liye
    }
  };

  useEffect(() => {
    let timerInterval;
    if (otpSent && timer > 0) {
      timerInterval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(timerInterval);
    }

    return () => clearInterval(timerInterval);
  }, [otpSent, timer]);

  const handleVerifyOtp = async () => {
    setOtpError({}); // Reset errors before API call

    try {
      const response = await axios.post(
        "https://learnospherebackend.learnosphere.in/api/route/verifyTeacherOtp",
        {
          email: submittedEmail,
          otp,
        }
      );

      if (response.data.success) {
        Swal.fire({
          title: "OTP Verified!",
          text: "Starting Quiz...",
          icon: "success",
        });

        setQuizStarted(true);
        setIsOtpModalOpen(false);
        fetchQuestions();
      }
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setOtpError(error.response.data.errors); // Backend se errors ko object format me set karein
      } else {
        setOtpError({ server: "Failed to verify OTP. Try again." });
      }
    }
  };

  const handleResendOtp = async () => {
    setTimer(60);
    setOtpError({});
    try {
      await axios.post(
        "https://learnospherebackend.learnosphere.in/api/route/TeacherModal",
        {
          email: submittedEmail,
          name: submittedName,
          phone: submittedPhone,
        }
      );

      Swal.fire({
        title: "OTP Resent!",
        text: "A new OTP has been sent to your email.",
        icon: "success",
      });
    } catch (error) {
      alert("Failed to resend otp . please try again");
    }
  };

  useEffect(() => {
    if (!quizStarted) return;

    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://learnospherebackend.learnosphere.in/api/route/SkillTest"
        );
        setQuestions(response.data);
      } catch (err) {
        setError("Failed to fetch questions");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [quizStarted]);

  const handleOptionChange = (questionId, option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const handleSubmit = useCallback(async () => {
    if (submitted) return;
    try {
      const payload = {
        selectedOptions: Object.values(selectedOptions),
        timeTaken: 300 - timeLeft,
        questionNo: Object.keys(selectedOptions),
        timeTakenForQuestions: {},
      };

      await axios.post(
        "https://learnospherebackend.learnosphere.in/api/route/submitTeacherbasicResult",
        payload
      );

      trackEvent("SKILL_TEST_SUBMITTED", {
        email: submittedEmail,
        name: submittedName,
        phone: submittedPhone,
        mobile_number: submittedPhone,
        time_taken: 300 - timeLeft,
        questions_count: Object.keys(selectedOptions).length,
      });

      setSubmitted(true);
      setTimeLeft(0); // 🛑 Stop the timer
      Swal.fire({
        title: "Thank You for Reaching Out!",
        text: "Quiz Submitted Successfully",
        icon: "success",
      });
    } catch (err) {
      alert("Failed to submit quiz!");
    }
  }, [submitted, selectedOptions, timeLeft]); // ✅ Dependencies

  useEffect(() => {
    if (!quizStarted || submitted) return; // 🛑 Stop updating time after submission

    if (timeLeft === 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStarted, timeLeft, submitted, handleSubmit]); // ✅ Include handleSubmit
  const [showForm, setShowForm] = useState(false);
  if (quizStarted) {
    return (
      <div className="p-8 w-full m-auto flex flex-col justify-center items-center   rounded-lg  ">
        {submitted ? (
          <div className="mt-0 sm:mt-4 p-4 flex flex-col sm:flex-row  gap-5  rounded-lg  ">
            <div className="flex flex-col gap-5">
              <h3 className="font-bold text-[1.1em] md:text-[1.4em] ">
                How to Earn Money
              </h3>
              <ol className="list-decimal mt-1 sm:mt-4  flex flex-col gap-3 px-10">
                <li className="text-gray-800 text-[.8em] md:text-[1em] ">
                  <span className="font-bold text-[1.1em] text-orange-500">
                    Explore -
                  </span>{" "}
                  Discover various opportunities that match your skills and
                  interests.
                </li>
                <li className="text-gray-800 text-[.8em] md:text-[1em] ">
                  <span className="font-bold text-[1.1em] text-orange-500">
                    Register -
                  </span>{" "}
                  Sign up, create your profile, and verify your account to get
                  started
                </li>
                <li className="text-gray-800 text-[.8em] md:text-[1em] ">
                  <span className="font-bold text-[1.1em] text-orange-500">
                    Apply -
                  </span>
                  Choose suitable opportunities and submit your application
                  easily.
                </li>
                <li className="text-gray-800 text-[.8em] md:text-[1em] ">
                  <span className="font-bold text-[1.1em] text-orange-500">
                    Learn -
                  </span>{" "}
                  Gain new skills through courses, training, and expert
                  mentorship.
                </li>
                <li className="text-gray-800 text-[.8em] md:text-[1em] ">
                  <span className="font-bold text-[1.1em] text-orange-500">
                    Earn Money -
                  </span>
                  Work on paid projects and withdraw your earnings securely.
                </li>
              </ol>
              <Link
                className="bg-green-500 w-full sm:w-60 text-white p-2 rounded-full mt-5 text-center text-[.8em] sm:text-[1em]"
                href="/Teacherdashboard"
              >
                {" "}
                For More Opportunities
              </Link>
            </div>
            <div className="mt-4 p-4 border rounded-lg shadow bg-gray-100 relative">
              {/* Close Button */}
              <Link
                href="/SkillEnhancement"
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm hover:bg-red-700 transition"
              >
                ✕
              </Link>

              <h3 className="text-lg font-bold mb-2">Quiz Summary</h3>
              <p className="mb-2">
                Questions Attempted: {Object.keys(selectedOptions).length}
              </p>

              <table className="w-full border-collapse border ">
                <thead>
                  <tr className="bg-orange-500">
                    <th className="border border-gray-300 p-2 text-white text-[.9em]">
                      Q.No.
                    </th>
                    <th className="border border-gray-300 p-2 text-left text-white text-[.9em]">
                      Question
                    </th>
                    <th className="border border-gray-300 p-2 text-left text-white text-[.9em]">
                      Selected Answer
                    </th>
                    <th className="border border-gray-300 p-2 text-left text-white text-[.9em]">
                      Correct Answer
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {questions.map((q, index) => (
                    <tr key={q.id} className="bg-white">
                      <td className="border border-gray-300 p-2 text-center text-[.9em]">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 p-2 text-[.9em]">
                        {q.question}
                      </td>
                      <td
                        className={`border border-gray-300 p-2 text-[.9em] ${
                          selectedOptions[q.id] === q.answer
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {selectedOptions[q.id] || "Not Answered"}
                      </td>
                      <td className="border border-gray-300 p-2 text-green-600 text-[.9em]">
                        {q.answer}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <>
            {loading && <p>Loading questions...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && questions.length === 0 ? (
              <p>No questions available.</p>
            ) : (
              <div className="space-y-4 mt-4 w-full sm:w-[50vw] m-auto">
                <p className="text-red-500 font-semibold">
                  Time Left: {Math.floor(timeLeft / 60)}:
                  {String(timeLeft % 60).padStart(2, "0")}
                </p>
                {questions.map((q, index) => (
                  <div key={q.id} className="p-4 border rounded-lg shadow">
                    <p className="font-bold text-[1.1em]">
                      {index + 1}. {q.question}
                    </p>
                    {q.options.length > 0 && (
                      <ul className="mt-2">
                        {q.options.map((option, i) => (
                          <li key={i} className="w-full">
                            <label
                              className={`flex items-center gap-4 p-3 rounded-lg border mt-3 w-full cursor-pointer transition-colors ${
                                selectedOptions[q.id] === option
                                  ? "bg-green-500"
                                  : "bg-white"
                              }`}
                            >
                              <input
                                type="radio"
                                name={`question-${q.id}`}
                                value={option}
                                checked={selectedOptions[q.id] === option}
                                onChange={() =>
                                  handleOptionChange(q.id, option)
                                }
                                className="w-4 h-4 p-2"
                              />
                              {option}
                            </label>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={handleSubmit}
              disabled={submitted}
              className={`mt-4 px-4 py-2 text-white rounded ${
                submitted
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600"
              }`}
            >
              {submitted ? "Submitted" : "Submit Quiz"}
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className=" flex flex-col-reverse sm:flex-row gap-20 mt-20 bg-white rounded-2xl w-[98vw] m-auto p-8">
        <div className="p-1 lg:p-5 flex flex-col gap-4">
          <h1 className="font-bold text-[1.1em] lg:text-[1.5em] mt-2 lg:mt-4 ">
            How To Upgrade Skill at Learn
            <span className=" text-orange-600">O</span>sphere
          </h1>
          <p className="font-semibold text-[.8em] lg:text-[1em] mt-1 lg:mt-2">
            Upgrading your skills at LearnOsphere is simple. Explore courses and
            apply your knowledge through projects
          </p>
          <p className="font-semibold text-[.8em] lg:text-[1em] mt-1 lg:mt-2">
            Grow with expert guidance and achieve success by earning
            certifications.
          </p>
          <div className="flex gap-2 mt-8">
            <p className="text-[.7em] sm:text-[.9em] lg:text-[1.1em] flex gap-1 font-semibold items-center">
              Explore
              <IoMdArrowDropright className="text-orange-600" size={25} />
            </p>
            <p className="text-[.7em] sm:text-[.9em] lg:text-[1.1em] flex gap-1 font-semibold items-center">
              Apply
              <IoMdArrowDropright className="text-orange-600" size={25} />
            </p>
            <p className="text-[.7em] sm:text-[.9em] lg:text-[1.1em] flex gap-1 font-semibold items-center">
              Grow
              <IoMdArrowDropright className="text-orange-600" size={25} />
            </p>
            <p className="text-[.7em] sm:text-[.9em] lg:text-[1.1em] flex gap-1 font-semibold items-center">
              Achieve
            </p>
          </div>
          <Link href="/Signin">
            <button className="bg-orange-500 text-white font-bold p-3 w-60 mt-5 rounded-full">
              Become a Tutor
            </button>
          </Link>
        </div>
        <div>
          <Image
            className=" w-full md:w-[28vw] 2xl:w-[25vw] sm:mt-16 md:mt-7 rounded-2xl object-contain"
            src={skill}
            alt=""
          />
        </div>
      </div>
      <div className="mt-8 flex flex-col w-[95vw] m-auto p-8 justify-center items-center">
        <h2 className="font-bold text-[1.2em] md:text-[1.5em] text-center ">
          Master New Skills with Learn
          <span className=" text-orange-600">O</span>sphere
        </h2>
        <IoRemoveOutline size={50} className="mt-2" />
        <p className="font-semibold text-center  text-[.9em] md:text-[1em] mt-4">
          Unlock your potential by gaining in-demand skills through expert-led
          courses and practical learning. Whether you're looking to improve
          technical expertise, develop soft skills, or explore new career
          opportunities, LearnOsphere provides the right platform. Engage with
          hands-on projects, real-world case studies, and mentorship to stay
          ahead in your field. Keep learning, keep growing, and take your skills
          to the next level!
        </p>
        <div className="grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 mt-8 gap-4 rounded-2xl   p-2 m-auto">
          <div className="bg-white flex flex-col border border-gray-200  gap-3  p-4 rounded-xl">
            <VscRemoteExplorer className=" text-purple-600 " size={30} />
            <h3 className="text-[.9em] md:text-[1.1em] lg:text-[1.3em]  font-semibold">
              {" "}
              Explore
            </h3>
            <p className="text-[.7em] md:text-[.7em] lg:text-[.9em] text-gray-600  mt-1">
              Discover innovative teaching methods, advanced digital tools, and
              subject-specific resources to enhance your skills. Stay updated
              with the latest educational trends and explore new ways to make
              learning more engaging and effective for your students.
            </p>
          </div>
          <div className="bg-white flex flex-col border border-gray-200  gap-3  p-4 rounded-xl">
            <ImBooks className=" text-red-600 " size={30} />
            <h3 className="text-[.9em] md:text-[1.1em] lg:text-[1.3em]  font-semibold">
              Learn
            </h3>
            <p className="text-[.7em] md:text-[.7em] lg:text-[.9em] text-gray-600  mt-1">
              Upgrade your teaching skills with expert-led courses, interactive
              lessons, and practical workshops. Gain in-depth knowledge of
              modern educational techniques to create a more effective and
              engaging learning environment.
            </p>
          </div>
          <div className="bg-white flex flex-col border border-gray-200  gap-3  p-4 rounded-xl">
            <FaChartSimple className=" text-blue-600 " size={30} />
            <h3 className="text-[.9em] md:text-[1.1em] lg:text-[1.3em]  font-semibold">
              Implement
            </h3>
            <p className="text-[.7em] md:text-[.7em] lg:text-[.9em] text-gray-600  mt-1">
              Apply modern teaching strategies in your classroom to enhance
              student engagement and learning outcomes. Use interactive tools,
              real-world examples, and innovative methods to make lessons more
              effective and impactful.
            </p>
          </div>
          <div className="bg-white flex flex-col border border-gray-200  gap-3  p-4 rounded-xl">
            <FaUsers className=" text-orange-600 " size={30} />

            <h3 className="text-[.9em] md:text-[1.1em] lg:text-[1.3em]  font-semibold">
              Engage
            </h3>
            <p className="text-[.7em] md:text-[.7em] lg:text-[.9em] text-gray-600  mt-1">
              Connect with fellow educators, participate in discussions, and
              share insights to enhance your teaching approach. Collaborate,
              seek feedback, and stay inspired through a community of lifelong
              learners.
            </p>
          </div>
          <div className="bg-white flex flex-col border border-gray-200  gap-3  p-4 rounded-xl">
            <GiAchievement className=" text-green-600 " size={30} />
            <h3 className="text-[.9em] md:text-[1.1em] lg:text-[1.3em]  font-semibold">
              Achieve
            </h3>
            <p className="text-[.7em] md:text-[.7em] lg:text-[.9em] text-gray-600  mt-1">
              Enhance your teaching expertise, earn certifications, and make a
              lasting impact on your students. Grow professionally, gain
              recognition, and take your career to new heights with continuous
              learning and innovation.{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8 flex flex-col  m-auto p-8 justify-center items-center">
        <h2 className="font-bold text-[1.2em] md:text-[1.5em] text-center ">
          Skill Test for Teachers
        </h2>
        <IoRemoveOutline size={50} className="mt-2" />
        <p className="font-semibold text-center  text-[.9em] md:text-[1em] mt-4">
          The Skill Test for Teachers is designed to assess educators'
          knowledge, teaching strategies, and classroom management skills. It
          evaluates their ability to engage students, deliver effective lessons,
          and adapt to diverse learning needs. This test ensures that teachers
          meet the required standards for quality education and professional
          growth
        </p>
        {!showForm ? (
          <div className="flex flex-col-reverse sm:flex-row bg-gradient-to-r from-blue-300 to-purple-300 justify-between mt-5 items-center gap-6 w-full p-8 rounded-lg">
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-[1em] md:text-[1.1em] lg:text-[1.3em] ">
                Assessing Excellence: Skill Test for Teachers
              </h3>
              <p className="text-gray-900 text-[.8em] sm:text-[.7em] md:text-[.8em] lg:text-[1em] mt-4">
                The "Assessing Excellence: Skill Test for Teachers" is a
                comprehensive evaluation that measures educators' expertise,
                teaching methodologies, and classroom management skills.{" "}
              </p>
              <p className="text-gray-900 mt-2 text-[.8em] sm:text-[.7em] md:text-[.8em] lg:text-[1em]">
                It helps identify strengths and areas for improvement, ensuring
                teachers are well-equipped to provide quality education and
                foster student growth effectively.
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-3 bg-purple-500 mt-4 w-60 text-white text-[.8em] md:text-[1em] font-bold rounded-lg shadow hover:bg-blue-600"
              >
                Take Your Skill Test
              </button>
            </div>
            <div>
              <Image
                className="w-full sm:w-[90vw] lg:w-[30vw] rounded-xl"
                src={UpgradeSkills}
                alt=""
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center   rounded-xl w-full  mt-6">
            <>
              <form
                onSubmit={handleFormSubmit}
                className="flex justify-between gap-10 rounded-lg w-full"
              >
                <div className="flex flex-col sm:flex-row w-full justify-around bg-gradient-to-r gap-4 from-orange-200 to-yellow-200 p-2 sm:p-6 2xl:p-12 rounded-xl">
                  <div className="flex flex-col gap-3">
                    <h3 className="font-bold text-[.8em] sm:text-[1em] lg:text-[1.2em] mt-4 ">
                      Important Instructions for the Skill Test Form
                    </h3>
                    <ol className="list-decimal flex flex-col px-2 sm:px-4  lg:px-8 gap-3 mt-2">
                      <li className="text-gray-800 text-[.6em] sm:text-[.8em] lg:text-[1em]">
                        <span className="font-semibold text-orange-500 ">
                          Provide Accurate Information –
                        </span>
                        Fill in all required details correctly.
                      </li>
                      <li className="text-gray-800 text-[.6em] sm:text-[.8em] lg:text-[1em]">
                        <span className="font-semibold text-orange-500 ">
                          Read Questions Carefully –
                        </span>
                        Ensure you understand each question before answering.
                      </li>
                      <li className="text-gray-800 text-[.6em] sm:text-[.8em] lg:text-[1em]">
                        <span className="font-semibold text-orange-500 ">
                          Time Management –
                        </span>
                        Complete the form within the given time limit.
                      </li>
                      <li className="text-gray-800 text-[.6em] sm:text-[.8em] lg:text-[1em]">
                        <span className="font-semibold text-orange-500 ">
                          No External Help –
                        </span>
                        Do not use external resources or assistance.
                      </li>
                      <li className="text-gray-800 text-[.6em] sm:text-[.8em] lg:text-[1em]">
                        <span className="font-semibold text-orange-500 ">
                          Review Before Submission –
                        </span>
                        Double-check your answers before submitting the form.
                      </li>
                      <li className="text-gray-800 text-[.6em] sm:text-[.8em] lg:text-[1em]">
                        <span className="font-semibold text-orange-500 ">
                          Stable Internet Connection –
                        </span>
                        Ensure a good internet connection to avoid
                        interruptions.
                      </li>
                      <li className="text-gray-800 text-[.6em] sm:text-[.8em] lg:text-[1em]">
                        <span className="font-semibold text-orange-500 ">
                          Follow Guidelines –
                        </span>
                        Adhere to the given rules to maintain fairness in the
                        test.
                      </li>
                    </ol>
                  </div>
                  <div className="w-full sm:w-[55vw] lg:w-[35vw] mt-4 sm:mt-0 bg-white rounded-xl p-4 sm:p-8">
                    <div className="mb-4">
                      <label className="block font-medium">Name:</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                      />
                      {formErrors.name && (
                        <p className="text-red-500 text-sm">
                          {formErrors.name}
                        </p>
                      )}
                    </div>
                    <div className="mb-4">
                      <label className="block font-medium">Email:</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                      />
                      {formErrors.email && (
                        <p className="text-red-500 text-sm">
                          {formErrors.email}
                        </p>
                      )}
                    </div>
                    <div className="mb-4">
                      <label className="block font-medium">Phone:</label>
                      <div className="flex border rounded-md">
                        <div className="flex flex-col">
                        <div ref={dropdownRef} className="relative bg-gray-200 rounded-md " >
                            <div
                              className=" border p-3 rounded-md cursor-pointer  whitespace-nowrap text-sm shadow-sm flex justify-between items-center"
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
                                    onClick={() =>
                                      handleSelect(`+${c.countryCode}`)
                                    }
                                  >
                                    <span className="text-base">
                                      {c.countryName}
                                    </span>
                                    <span className="text-sm">
                                      (+{c.countryCode})
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          {errors.selectedCountry && (
                            <p className="text-red-500 text-sm mb-2">
                              {errors.selectedCountry}
                            </p>
                          )}
                        </div>
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                            if (value.length <= 10) {
                              setFormData({ ...formData, phone: value });
                            }
                          }}
                          className="w-full p-2 "
                        />
                      </div>
                      {formErrors.phone && (
                        <p className="text-red-500 text-sm">
                          {formErrors.phone}
                        </p>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-6 py-3 text-white font-bold rounded-lg shadow ${
                        isSubmitting
                          ? "bg-orange-400 cursor-not-allowed"
                          : "bg-orange-500 hover:bg-orange-600"
                      }`}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </div>
              </form>
              {isOtpModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
                  <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
                    <div className="flex flex-col justify-center gap-2 items-center">
                      <HiShieldCheck size={60} className="text-blue-600" />
                      <h2 className="text-[1.2em] md:text-[1.5em] font-bold">
                        OTP Verification
                      </h2>
                      <p className="text-[.9em] md:text-[1.1em] font-semibold">
                        OTP has been sent to
                      </p>
                      <p className="mt-2 mb-2 font-semibold">
                        {submittedEmail}
                      </p>
                      {/* OTP Timer */}
                      {timer > 0 ? (
                        <p className="text-red-500 font-semibold">
                          Time Remaining: {timer}s
                        </p>
                      ) : (
                        <button
                          onClick={handleResendOtp}
                          className="px-4 py-2 mb-3  text-orange-600 font-bold rounded-lg "
                        >
                          Resend OTP
                        </button>
                      )}
                    </div>
                    {/* OTP Input Fields */}
                    <div className="mb-4 flex justify-center space-x-2">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          id={`otp-input-${index}`}
                          type="text"
                          maxLength="1"
                          value={digit}
                          onChange={(e) => handleChange(e, index)}
                          onKeyDown={(e) => handleKeyDown(e, index)}
                          className="border border-gray-200 w-8 md:w-12 h-8 md:h-12 text-center text-xl font-bold"
                          required
                        />
                      ))}
                    </div>
                    {/* OTP Errors */}
                    {otpError?.otp && (
                      <p className="text-red-500">{otpError.otp}</p>
                    )}
                    {otpError?.server && (
                      <p className="text-red-500 text-sm">{otpError.server}</p>
                    )}
                    {/* Verify OTP Button */}
                    <button
                      onClick={handleVerifyOtp}
                      className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg shadow hover:bg-blue-600"
                    >
                      Verify OTP
                    </button>
                  </div>
                </div>
              )}
            </>
          </div>
        )}
      </div>
      <div className="mt-6 flex flex-col justify-center items-center gap-4 p-4">
        <h2 className="font-bold text-[1em] md:text-[1.3em] lg:text-[1.5em] ">
          Frequently Asked Questions
        </h2>
        <IoRemoveOutline size={50} className="mt-2" />
        <div className="w-full md:w-[80%] gap-4 m-auto mt-6">
          {faqs.map((faq, index) => (
            <div
              className="flex flex-col gap-2 border-b border-gray-300 p-2 md:p-6"
              key={index}
            >
              <h3 className="font-semibold text-[1em] md:text-[1.1em] lg:text-[1.3em] mt-3">
                {faq.question}
              </h3>
              <p className="text-gray-800 text-[.8em] md:text-[1em] lg:text-[1.1em] ">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Footer1 />
      <Footer />
    </div>
  );
};

export default SkillEnhancement;
