import React from "react";
import Certification from "@/components/OnlineQuizSlg";

export async function generateMetadata({ params }) {
    const { slug } = await params;

    const baseUrl = "https://learnosphere.in"; //https://learnosphere.in
    const canonicalUrl = `${baseUrl}/Online-Quiz/${slug}`;
    const res = await fetch(`${baseUrl}/api/onlineQuiz/${slug}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        return {
            title: "Online Quiz | Learnosphere",
            alternates: {
                canonical: canonicalUrl,
            },
        };
    }

    const data = await res.json();
    const grade = data.grade || "Certification Quiz";
    const apiDescription = data.d1 || `Test your knowledge with our Class ${grade} online certification quiz on Learnosphere.`;

    return {
        title: `Online Quiz - Certification Quiz For Class-${grade} | Learnosphere  `,
        description: apiDescription,
             // ✅ CANONICAL TAG
        alternates: {
            canonical: canonicalUrl,
        },
    };
}

export default async function OnlineQuizSlg({ params }) {
    const { slug } = await params;

    return <Certification slug={slug} />;
}
