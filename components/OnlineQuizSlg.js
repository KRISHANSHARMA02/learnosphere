"use client";
import PageNotFound from "@/app/not-found";
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import picture1 from '@/public/quiz-2004350_1280.png'
import picture2 from '@/public/Quizphoto2.jpg'
import picture3 from '@/public/result-6015355_1280.png'
import creativeQuiz from '@/public/creativeQuiz.png'
import axios from "axios";
import AppPopup from '@/components/AppPopup';
import { motion } from "framer-motion";
import DynamicFAQSection from "@/components/DynamicFAQSection";


const Certification = ({ slug }) => {
    const [onlineQuizData, setonlineQuizData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    // Animation variants for sliding
    const slideFromLeft = {
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
    };

    const slideFromRight = {
        hidden: { opacity: 0, x: 100 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    };
    useEffect(() => {
        if (!slug) return;
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/onlineQuiz/${slug}`);
                setonlineQuizData(res.data);
            } catch (err) {
                setError(err.response?.data?.error || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [slug]);
    const openPopup = () => setShowPopup(true);
    const closePopup = () => setShowPopup(false);

    if (loading) return <p>Loading...</p>;
    if (error || !onlineQuizData) return <PageNotFound />;

    const { grade, d1, p1, p2,
        p3,
        grs,
        p4,
        p5,
        h6,
        p6,
        p7,
        p8,
        sub1,
        subj1a,
        sub2,
        subj2a,
        subj2b,
        sub3,
        subj3,
        sub4,
        subj4,
        sub5,
        subj5,

    } = onlineQuizData;
    return (
        <>
            <nav>
                <div className='flex justify-between w-full px-2 md:px-16 p-5 z-30 shadow-xl'>
                    <Link
                        className="text-black text-[1.07rem] lg:text-2xl font-Poppins font-bold"
                        href="/"
                    >
                        Learn<b className="text-orange-600 font-Poppins text-2xl">O</b>
                        sphere.in
                    </Link>
                    <Link href={`/basictest?classLevel=${grade}`}>
                        <button className="bg-orange-600 hover:bg-orange-700 transition-all  px-8 py-3 rounded-xl text-white font-bold shadow-xl hover:scale-105">
                            Start Quiz
                        </button>
                    </Link>
                </div>
            </nav>
            <div className="w-full bg-white">

                {/* HEADING */}
                <motion.section
                    className=" px-4 md:px-8 py-4 "
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                >
                    <div className='flex max-w-6xl mx-auto'>
                        <h1 className="font-extrabold text-[1.8em] md:text-[3em] text-orange-600 leading-tight drop-shadow-md">
                            Let’s Take the Advantage of Online Quiz <br className="hidden md:block" />
                            <span className="text-gray-900">Class {grade} </span>
                        </h1>
                        <Image src={creativeQuiz} className="rounded-xl h-auto  " alt="Online Quiz" />
                    </div>

                    <p className="font-medium max-w-7xl mx-auto text-gray-700 mt-2 leading-relaxed text-lg">
                        {p1} <br /> <br />
                        {p2} <br /> <br />
                        {p3}
                    </p>
                </motion.section>
                <div className='max-w-6xl mx-auto p-2'>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mt-4">

                        {/* CARD 1 */}
                        <div className=" flex gap-4 p-10 rounded-xl shadow-md border border-orange-100 bg-orange-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="text-4xl text-orange-500">🎯</div>

                            <p className=" text-gray-700">
                                Online quizzes provide immediate feedback, allowing students to understand their mistakes and correct them quickly.
                            </p>
                        </div>

                        {/* CARD 2 */}
                        <div className="bg-red-50 flex gap-4  p-10 rounded-xl shadow-md border border-red-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="text-4xl text-orange-500">📘</div>

                            <p className="text-gray-700">
                               Regular quiz practice reinforces learning and helps retain information for longer periods.
                            </p>
                        </div>

                        {/* CARD 3 */}
                        <div className="bg-blue-100 flex gap-4 p-10 rounded-xl shadow-md border border-blue-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="text-4xl text-orange-500">💬</div>

                            <p className="text-gray-700">
                               Solving quizzes helps students practice managing time efficiently, especially in exam scenarios.
                            </p>
                        </div>

                        {/* CARD 4 */}
                        <div className="bg-yellow-100 flex gap-4 p-10 rounded-xl shadow-md border border-yellow-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="text-4xl text-orange-500">🌍</div>

                            <p className=" text-gray-700">
                               Online quizzes offer engaging and interactive ways to test knowledge, making learning enjoyable.
                            </p>
                        </div>

                        {/* CARD 5 */}
                        <div className="bg-green-100 flex gap-4 p-10 rounded-xl shadow-md border border-green-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ">
                            <div className="text-4xl text-orange-500">📚</div>

                            <p className=" text-gray-700">
                               Quizzes allow students to track their progress over time, helping them identify areas for improvement.
                            </p>
                        </div>
                    </div>
                </div>
                {/* IMAGE + BENEFITS */}
                <section className="max-w-7xl mx-auto bg-white flex flex-col md:flex-row gap-12 rounded-xl items-center">
                    <motion.div
                        className="w-full md:w-[40%]  transform transition duration-500"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={slideFromLeft}
                    >
                        <Image src={picture1} className="rounded-xl h-auto md:h-96 " alt="Online Quiz" />
                    </motion.div>

                    <motion.div
                        className="w-full md:w-[50%] bg-white px-4 md:px-8 py-10 rounded-xl  "
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={slideFromRight}
                    >
                        <h3 className="text-orange-600 font-bold text-2xl mb-10 flex items-center gap-2">
                            Benefits of Solving Online Quiz:
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                            {/* CARD 1 */}
                            <div className="bg-white rounded-3xl  ">
                                <div className="w-20 h-20 mx-auto bg-pink-100 flex items-center justify-center rounded-full">
                                    <span className="text-4xl">🔍</span>
                                </div>
                                <p className="mt-5 text-base text-center text-gray-900 ">Boosts Curiosity</p>

                            </div>

                            {/* CARD 2 */}
                            <div className="bg-white  rounded-3xl  ">
                                <div className="w-20 h-20 mx-auto bg-green-100 flex items-center justify-center rounded-full">
                                    <span className="text-4xl">🧠</span>
                                </div>
                                <p className="mt-5 text-base text-center text-gray-900">Enhances Problem-Solving</p>
                            </div>

                            {/* CARD 3 */}
                            <div className="bg-white rounded-3xl  ">
                                <div className="w-20 h-20 mx-auto bg-yellow-100 flex items-center justify-center rounded-full">
                                    <span className="text-4xl">🎉</span>
                                </div>
                                <p className="mt-5 text-base text-center text-gray-900">Makes Learning Fun</p>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* CERTIFICATE SECTION */}
                <motion.section
                    className="bg-gradient-to-r from-orange-50 to-orange-100 py-12 mt-10 rounded-xl shadow-inner"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                >
                    <div className="max-w-6xl mx-auto px-4 md:px-8">
                        <h2 className="font-extrabold text-[1.5em] md:text-[1.8em] text-orange-600  text-center border-b-4 border-orange-500 inline-block pb-2 animate-pulse">
                            Free Online Quiz for {grs} — Join the Fun & Earn Certificates!
                        </h2>

                        <p className="text-center font-medium text-gray-700 mt-6 leading-relaxed text-lg">
                            {p4} <br /> {p5}
                        </p>

                        <div className="flex flex-col md:flex-row gap-12 justify-between items-center mt-12">

                            <motion.div
                                className="w-full md:w-[50%] font-medium text-gray-800  p-6 rounded-xl  "
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={slideFromLeft}
                            >
                                <h3 className="text-orange-600 font-bold text-2xl mb-4 flex items-center gap-2">
                                    How to Unlock Your Quiz Certificate:
                                </h3>

                                <ul className="list-decimal pl-6 space-y-3">
                                    <li>You can unlock them under the skill section on your profile.</li>
                                    <li>You must answer 10 multiple- choice questions banks .</li>
                                    <li>Be aware – the skill assessment has a time limit, making it hard to look for correct answers.</li>
                                    <li>If you don’t pass the quiz, you can learn and analyze the quiz for {grs} with answer, And retake it in 5 minutes.</li>
                                    <li>Quizzes make learning enjoyable by turning it into a fun and interactive activity.</li>
                                </ul>

                                <Link href={`/basictest?classLevel=${grade}`}>
                                    <button className="bg-orange-600 hover:bg-orange-700 transition-all mt-6 px-8 py-3 rounded-xl text-white font-bold shadow-xl hover:scale-105">
                                        Start Your Test
                                    </button>
                                </Link>
                            </motion.div>
                            <motion.div
                                className="w-72 h-72 border rounded-xl shadow-2xl hover:rotate-3 transition-transform duration-500"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={slideFromRight}
                            >
                                <Image src={picture3} alt="Certificate" className="w-full h-full rounded-xl" />
                            </motion.div>
                        </div>
                    </div>
                </motion.section>

                {/* QUIZ PERFECT SECTION */}
                <section className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center bg-white rounded-xl shadow-lg mt-10">
                    <motion.div
                        className="w-96 h-72 border rounded-xl shadow-2xl hover:scale-105 transform transition duration-500 m-3"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={slideFromLeft}
                    >
                        <Image src={picture2} alt="Test Skills" className="w-full h-full rounded-xl" />
                    </motion.div>

                    <motion.div
                        className='max-w-xl lg:max-w-3xl xl:max-w-4xl p-2 '
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={slideFromRight}
                    >
                        <h2 className="text-orange-600 font-extrabold text-2xl mb-4 flex items-center gap-2">
                            {h6}
                        </h2>

                        <p className="font-medium text-gray-700 mb-3 text-lg">
                            {p6}
                        </p>

                        <p className="font-medium text-gray-700 mb-3 text-lg">
                            {p7}
                        </p>

                        <p className="font-medium text-gray-700 text-lg">
                            {p8}
                        </p>
                    </motion.div>
                </section>

                {/* SUBJECT CARDS */}
                <section className="bg-gray-50 py-12">
                    <h2 className="font-bold text-2xl text-orange-600 text-center mb-10">
                        Explore, Discover, and Excel: The Ultimate Quiz Experience
                    </h2>

                    <div className="mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        <motion.div
                            className="p-8 bg-white shadow-lg rounded-xl hover:shadow-2xl transition transform hover:-translate-y-2 border-t-4 border-blue-500"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={slideFromLeft}
                        >
                            <div onClick={openPopup} className="cursor-pointer">
                                <h3 className="text-center bg-blue-500 text-white p-6 rounded-lg font-bold text-[1.3em]">
                                    {sub1}
                                </h3>
                            </div>
                            <p className="mt-4 text-gray-700 text-lg">
                                {subj1a}
                            </p>
                        </motion.div>

                        <motion.div
                            className="p-8 bg-white shadow-lg rounded-xl hover:shadow-2xl transition transform hover:-translate-y-2 border-t-4 border-yellow-500"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                        >
                            <div onClick={openPopup} className="cursor-pointer">
                                <h3 className="text-center bg-yellow-500 text-white p-6 rounded-lg font-bold text-[1.3em]">
                                    {sub2}
                                </h3>
                            </div>
                            <p className="mt-4 text-gray-700 text-lg">
                                {subj2a} <br /> <br />
                                {subj2b}
                            </p>
                        </motion.div>

                        <motion.div
                            className="p-8 bg-white shadow-lg rounded-xl hover:shadow-2xl transition transform hover:-translate-y-2 border-t-4 border-red-500"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={slideFromRight}
                        >
                            <div onClick={openPopup} className="cursor-pointer">
                                <h3 className="text-center bg-red-500 text-white p-6 rounded-lg font-bold text-[1.3em]">
                                    {sub3}
                                </h3>
                            </div>
                            <p className="mt-4 text-gray-700 text-lg">
                                {subj3}
                            </p>
                        </motion.div>

                        {sub4 && subj4 && (
                            <motion.div
                                className="p-8 bg-white shadow-lg rounded-xl hover:shadow-2xl transition transform hover:-translate-y-2 border-t-4 border-orange-500"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={slideFromRight}
                            >
                                <div onClick={openPopup} className="cursor-pointer">
                                    <h3 className="text-center bg-orange-500 text-white p-6 rounded-lg font-bold text-[1.3em]">
                                        {sub4}
                                    </h3>
                                </div>

                                <p className="mt-4 text-gray-700 text-lg">
                                    {subj4}
                                </p>
                            </motion.div>

                        )}
                        {sub5 && subj5 && (
                            <motion.div
                                className="p-8 bg-white shadow-lg rounded-xl hover:shadow-2xl transition transform hover:-translate-y-2 border-t-4 border-green-500"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={slideFromRight}
                            >
                                <div onClick={openPopup} className="cursor-pointer">
                                    <h3 className="text-center bg-green-500 text-white p-6 rounded-lg font-bold text-[1.3em]">
                                        {sub5}
                                    </h3>
                                </div>

                                <p className="mt-4 text-gray-700 text-lg">
                                    {subj5}
                                </p>
                            </motion.div>

                        )}
                        {showPopup && <AppPopup onClose={closePopup} />}
                    </div>

                    <p className="font-semibold italic text-gray-600 text-center mt-10 px-8">
                        Certificates of achievement are a great way to celebrate and honor your child’s achievement, inspiring them with self-confidence and promoting lifelong learning. They serve as a proud reminder of their hard work and accomplishments
                    </p>
                </section>
                <DynamicFAQSection slug={slug} />
            </div>
        </>
    )
}

export default Certification
