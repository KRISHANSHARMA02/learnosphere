"use client";
import { useRouter } from "next/navigation";

export default function OneToOneHomeSection() {
    const router = useRouter();

    const features = [
        {
            emoji: "🎯",
            title: "Personalised Focus",
            desc: "Every class is tailored to your learning speed & needs.",
            buttonText: "1-on-1 Classes →"
        },
        {
            emoji: "🧠",
            title: "Concept Clarity",
            desc: "Understand topics deeply with 1-on-1 expert guidance.",
            buttonText: "Clear My Doubts →"
        },
        {
            emoji: "⚡",
            title: "Fast Progress",
            desc: "Track improvement and get instant feedback.",
            buttonText: "Prep for Exams →"
        },
        {
            emoji: "📚",
            title: "Exam Ready",
            desc: "Stay ahead with board-specific and competitive prep.",
            buttonText: "Boost My Skills →"
        },
    ];

    return (
        <section className="w-full py-16 bg-gradient-to-br from-orange-50 via-orange-100 to-red-50 rounded-3xl my-20 shadow-xl">
            <div className="max-w-6xl mx-auto px-6">

                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-4">
                    One-on-One Live Learning —{" "}
                    <span className="text-orange-600">Made for Every Student</span>
                </h2>

                <p className="text-gray-700 text-center max-w-2xl mx-auto mb-12 text-lg">
                    Boost understanding, confidence, and performance with personalised 1-on-1 sessions.
                </p>

                {/* 4 Glass Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                    {features.map((item, index) => (
                        <div
                            key={index}
                            className="backdrop-blur-xl bg-white/30 border border-white/40 rounded-2xl shadow-xl
                               p-6 text-center hover:-translate-y-2 transition-all duration-300"
                        >
                            <div className="text-5xl mb-4">{item.emoji}</div>

                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {item.title}
                            </h3>

                            <p className="text-gray-700 text-sm">{item.desc}</p>
                            <div className="text-center text-md mt-12">
                                <button
                                    onClick={() => router.push("/live-one-to-one")}
                                    className="px-6 py-2 rounded-xl bg-orange-50 backdrop-blur-lg border border-orange-700
                                     text-orange-700 hover:text-white shadow-lg hover:bg-orange-700 hover:shadow-xl transition-all duration-300"
                                >
                                    {item.buttonText}
                                </button>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
}