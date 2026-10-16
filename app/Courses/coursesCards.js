"use client";
import React, { useEffect, useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer1 from "@/components/Footer1";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import axios from "axios";
import { FaWhatsapp, FaTag } from "react-icons/fa";
import CBSE3a from "@/public/CBSE3a.jpg";
import { useRouter } from "next/navigation";
import LoginPopup from "@/components/GeneralPopup";


const CBSEOnlineCourse = ({courses , error}) => {
//  const [courses, setCourses] = useState([]);
  //const [error, setError] = useState(null);
  const thirdRef = useRef(null);
  const [scrollDirectionUp, setScrollDirectionUp] = useState(true);

  const secondRef = useRef(null);
  const isSecondInView = useInView(secondRef, { once: true });
  const lastScrollY = useRef(0);

  // Helper: extract number from any string
  function extractNumber(str) {
    const match = str.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  }

  // Check if course belongs to children category (Class 1–8)
  function isChildrenCourse(courseClass) {
    const num = extractNumber(courseClass);
    return num >= 1 && num <= 8;
  }

  // Build the course slug
  function getCourseLink(course) {
    // If subject is array, join with comma
    const subjects = Array.isArray(course.subject)
      ? course.subject.map((s) => s.toLowerCase().replace(/\s+/g, "-")).join(",")
      : course.subject.toLowerCase().replace(/\s+/g, "-");

    const slug = `${course.class.toLowerCase().replace(/\s+/g, "-")}-${subjects}`;

    if (isChildrenCourse(course.class)) {
      return `/Courses/children/${slug}-${course._id}`;
    }

    return `/Courses/${slug}-${course._id}`;
  }


// ✅ New navigation helper
function useCourseNavigation() {
  const router = useRouter();

  const navigateToCourse = (course) => {
    const link = getCourseLink(course);
    router.push(link);
  };

  return navigateToCourse;
}

const navigateToCourse = useCourseNavigation();


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY.current) {
        setScrollDirectionUp(true); // Scrolling up
      } else {
        setScrollDirectionUp(false); // Scrolling down
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  
  // Sort courses so Class 12 → Class 1
  const sortedCourses = [...courses].sort((a, b) => {
    const classA = extractNumber(a.class);
    const classB = extractNumber(b.class);
    return classB - classA; // DESC
  });


  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     try {
  //       const response = await axios.post(
  //         "/api/courses" //https://mobileapp.backend.learnosphere.in/api/route/getAllcourses
  //       );
  //       setCourses(response.data);
  //     } catch (err) {
  //       console.error(
  //         "Axios fetch failure",
  //         err.response?.status,
  //         err.response?.data
  //       );
  //       setError("Failed to load courses.");
  //     }
  //   };

  //   fetchCourses();
  // }, []);
  return (
    <>
      <Navbar />
          <LoginPopup />
      <div className="mt-20  font-Poppins overflow-x-hidden ">
        {/* Concentric Circle Background Layer */}
        <div className="absolute  z-0">
          <div className="absolute z-0 top-0 left-0 w-full h-full bg-gradient-to-r from-orange-100 to-white opacity-50" />
          <div className="absolute z-0 top-10 left-10 w-64 h-64 rounded-full border-2 border-orange-200 animate-pulse opacity-30" />
          <div className="absolute z-0 top-20 right-10 w-80 h-80 rounded-full border-2 border-orange-300 animate-pulse opacity-20" />
          <div className="absolute z-0 top-10 left-20 w-48 h-48 rounded-full border-2 border-orange-300 animate-pulse opacity-30" />
          <div className="absolute z-0 bottom-20 right-20 w-40 h-40 rounded-full border-2 border-orange-400 opacity-20" />
          <div className="absolute z-0 bottom-20 right-20 w-60 h-60 rounded-full border-2 border-orange-300 opacity-10" />
          <div className="absolute z-0 top-1/2 left-1/4 w-32 h-32 rounded-full border-2 border-orange-200 opacity-15" />
          <div className="absolute z-0 top-[60%] left-[30%] w-20 h-20 rounded-full border-2 border-orange-400 opacity-10" />
        </div>
        <div className="flex flex-col md:flex-row  2xl:ml-[120px] z-10">
          <div className="w-full 2xl:w-[60%] xl:w-1/2 m-5 p-5 xl:m-10 xl:p-10 2xl:m-20">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 ">
              CBSE Online Courses for Class 1 to 12{" "}
            </h1>
            <h2 className="text-lg md:text-xl font-bold  mb-4 ">
              Learn with Top Educators at Learn
              <b className="text-orange-600">O</b>sphere
            </h2>
            <p className="text-gray-700">
              Looking for trusted CBSE online courses for Class 1 to 12? Whether
              you’re a student, parent, or educator, Learnosphere offers
              comprehensive CBSE-aligned learning programs that help students
              succeed academically through personalized, expert-led online
              classes.
            </p>
          </div>
          <div className="w-full 2xl:w-[40%] xl:w-1/2 2xl:mr-[50px] ">
            <Image
              src={CBSE3a}
              alt="CBSE Course"
              className=" object-cover object-bottom w-full h-full rounded-xl"
            />
          </div>
        </div>
        {/* second */}
        <div className=" w-full inset-0 z-50  ">
          <div className="relative z-10 flex flex-col md:flex-row 2xl:ml-[200px]  ">
            <div className="w-full 2xl:w-[60%] xl:w-1/2 m-5 xl:mx-10   items-center justify-center">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                Our Popular Courses
              </h2>
              <p className="text-gray-700 text-lg ">Explore our courses</p>
            </div>
          </div>
          <motion.div
            ref={secondRef}
            initial={{ opacity: 0, x: 100, y: 100 }}
            animate={isSecondInView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full inset-0 z-50"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 xl:mx-10 xl:px-10 2xl:mx-[200px] z-10 m-5 items-center justify-center">
              {sortedCourses.length > 0 ? (
                sortedCourses.map((course) => {
                  const hasDiscount =
                    course.discountPrice &&
                    course.discountPrice !== 0 &&
                    course.discountPrice < course.price;

                  return (
                    <div
                      key={course._id}
                      className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden transition-all hover:shadow-2xl"
                    >
                      {/* Title Row with WhatsApp */}
                      <div className="flex items-center justify-between px-4 py-3">
                        <h2 className="text-md font-semibold text-gray-800 truncate">
                          {course.title}
                        </h2>
                        <a
                          href={`https://wa.me/?text=Check out this course: ${course.title}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:opacity-80"
                        >
                          <FaWhatsapp size={20} />
                        </a>
                      </div>
              
                      {/* Image */}
                      <Link
                        href={getCourseLink(course)}
                      // href={{
                      //   pathname: `/Courses/${(
                      //     course.class +
                      //     "-" +
                      //     course.subject
                      //   )
                      //     .replace(/\s+/g, "-")
                      //     .toLowerCase()}`,
                      //   query: { id: course._id },
                      // }}
                      >
                        <div className="px-4">
                          <div className="rounded-xl border border-gray-300 overflow-hidden">
                            <Image
                              src={course.thumbnail}
                              alt={course.title}
                              width={600}
                              height={200}
                              className="w-full h-[150px] object-cover"
                            />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-4 space-y-3">
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {course.description}
                          </p>
                          <p className="text-xs text-gray-500">
                            Duration: {course.duration || "N/A"}
                          </p>

                          <hr className="my-2" />

                          {/* Price */}
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="text-lg font-bold text-orange-600">
                              ₹{course.discountPrice || course.price}
                            </span>

                            {hasDiscount && (
                              <>
                                <span className="text-sm line-through text-gray-400">
                                  ₹{course.price}
                                </span>
                                <span className="flex items-center gap-1 bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full">
                                  <FaTag className="text-green-600" size={12} />
                                  {Math.round(
                                    ((course.price - course.discountPrice) /
                                      course.price) *
                                      100
                                  )}
                                  % OFF
                                </span>
                              </>
                            )}
                          </div>

                          {/* CTA */}
                          <div className="grid grid-cols-1 gap-3 mt-4">
                        <button
                              onClick={() => navigateToCourse(course)}
                              className="border border-orange-600 text-orange-600 text-center py-2 rounded-lg text-sm font-medium hover:bg-orange-50"
                            >
                              Explore Details
                            </button>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })
              ) : (
                <p className="text-center col-span-full text-gray-500">
                  Learn<b className="text-orange-600">O</b>sphere Loading
                  courses...
                </p>
              )}
            </div>
          </motion.div>
        </div>
        {/* third */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }} // <-- prevents rerun on scroll up
        >
          {/* Why Choose Section */}
          <section className="px-6 py-12 max-w-5xl mx-auto space-y-6 ">
            <h2 className="text-2xl font-bold text-center">
              Why Choose CBSE Online Courses?
            </h2>
            <p className="text-gray-700 text-lg text-center">
              Online learning isn’t just a trend anymore—it’s the future of
              education. With the right course, students get the flexibility to
              learn from home, the ability to revise at their own pace, and the
              opportunity to get mentored by qualified subject experts.
            </p>
            <ul className="list-none space-y-2 text-gray-800 text-lg">
              <li>📘 NCERT & CBSE curriculum aligned</li>
              <li>🎯 Designed for exam success & conceptual clarity</li>
              <li>🧑 Taught by experienced subject matter experts</li>
              <li>💻 Delivered through an easy-to-use learning platform</li>
            </ul>
          </section>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }} // <-- prevents rerun on scroll up
        >
          {/* What You'll Get Section */}
          <section className="px-6 py-12 bg-orange-50">
            <div className="max-w-5xl mx-auto space-y-6">
              <h2 className="text-2xl font-bold text-center">
                What You’ll Get in Our CBSE Online Courses
              </h2>
              <ul className="list-none space-y-2 text-gray-800 text-lg">
                <li>✅ Live & recorded video lectures</li>
                <li>✅ Chapter-wise notes & assignments</li>
                <li>✅ Interactive quizzes & mock tests</li>
                <li>✅ One-on-one doubt-clearing sessions</li>
                <li>✅ Progress tracking & parent reports</li>
              </ul>
            </div>
          </section>
        </motion.div>
        {/* Classes We Cover */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }} // <-- prevents rerun on scroll up
        >
          <section className="px-6 py-12 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6">
              CBSE Classes We Cover
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-lg text-gray-800">
              <div>
                📚 <b>Primary Level – Class 1 to 5:</b> Engaging activities and
                interactive learning to build strong basics.
              </div>
              <div>
                📘 <b>Middle Level – Class 6 to 8:</b> Conceptual understanding,
                homework support, and foundation for higher classes.
              </div>
              <div>
                🧪 <b>Secondary Level – Class 9 & 10:</b> Board exam-focused
                training in Maths, Science, English, Social Studies, etc.
              </div>
              <div>
                📖 <b>Senior Secondary – Class 11 & 12:</b> Stream-specific
                coaching for Science, Commerce, and Humanities with revision and
                exam strategy support.
              </div>
            </div>
          </section>
        </motion.div>
        {/* Why Learnosphere */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }} // <-- prevents rerun on scroll up
        >
          <section className="px-6 py-12 bg-orange-100">
            <div className="max-w-5xl mx-auto space-y-6">
              <h2 className="text-2xl font-bold text-center">
                🎯 Why Learnosphere?
              </h2>
              <p className="text-lg text-gray-800 text-center">
                Learnosphere is one of India’s trusted platforms for
                personalized home tuitions and online courses. We are committed
                to helping every CBSE student not just pass—but excel.
              </p>
              <ul className="list-none space-y-2 text-gray-800 text-lg">
                <li>⭐ 7+ years of experience in personalized education</li>
                <li>📍 Based in Jaipur, serving pan-India students</li>
                <li>🔒 Safe & secure learning environment</li>
                <li>🧠 Expert instructors from top academic backgrounds</li>
                <li>💬 24x7 student support & mentorship</li>
              </ul>
            </div>
          </section>
        </motion.div>
        {/* How to Enroll */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }} // <-- prevents rerun on scroll up
        >
          <section className="px-6 py-12 max-w-5xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-center">
              How to Enroll in CBSE Online Courses?
            </h2>
            <p className=" text-lg">It’s simple! Follow these 3 steps:</p>
            <ol className="list-decimal list-inside text-lg text-gray-800 space-y-2">
              <li>
                Visit:{" "}
                <a href="/Courses" className="text-orange-500 ">
                  CBSE Online Courses
                </a>
              </li>
              <li>Choose your class or subject</li>
              <li>
                Click “Enroll Now” or “Buy Course” – and start learning
                instantly
              </li>
            </ol>
            <p className=" text-lg">
              Need help choosing the right plan? Contact Us and our team will
              guide you.
            </p>
          </section>
        </motion.div>
        {/* Who Should Join */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }} // <-- prevents rerun on scroll up
        >
          <section className="px-6 py-12 bg-orange-50">
            <div className="max-w-5xl mx-auto space-y-6">
              <h2 className="text-2xl font-bold text-center">
                💡 Who Should Join?
              </h2>
              <ul className="list-none text-lg text-gray-800 space-y-2">
                <li> Students struggling with school syllabus</li>
                <li> High achievers aiming to score 90%+</li>
                <li> Parents looking for reliable tuition alternatives</li>
                <li> CBSE board aspirants in need of expert support</li>
              </ul>
              <p className="text-gray-800">
                At Learnosphere, we’re not just another tuition website. We’re
                educational professionals with years of experience, working with
                certified CBSE educators, and consistently delivering measurable
                student success.
              </p>
              <ul className="list-none text-lg text-gray-800 space-y-2">
                <li> Created by real teachers with domain expertise</li>
                <li> Reviewed for accuracy & curriculum relevance</li>
                <li> Updated as per the latest CBSE syllabus (2024–25)</li>
              </ul>
            </div>
          </section>
        </motion.div>{" "}
        {/* CTA */}
        <section className="text-center py-12 px-6">
          <h2 className="text-xl md:text-3xl font-bold mb-4">
            📞 Start Your Learning Journey Today!
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Don’t wait until exam time—start building strong concepts now.
          </p>
          <Link
            href="/Courses"
            className="text-white bg-orange-500 px-5 py-3 rounded-lg hover:bg-orange-600"
          >
            👉 Explore Courses & Enroll Now »
          </Link>
          <p className="mt-4 text-gray-700">
            Have questions? Call us at +91- 8769600449
          </p>
        </section>
      </div>
      <Footer1 />
      <Footer />
    </>
  );
};



export default CBSEOnlineCourse;


