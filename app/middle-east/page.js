import MiddleEastHomePage from "@/components/client/MiddleEastMainPage";

// 1. Define your SEO Metadata here
export const metadata = {
  title:
    "Best CBSE Tutors in Middle East | Online Tuition for UAE, Saudi & Qatar",
  description:
    "Find top-rated CBSE tutors in the Middle East. Learnosphere provides online tuition, notes, and NCERT solutions for students in UAE, Saudi Arabia, Kuwait, Oman, Qatar, and Bahrain.",
  keywords: [
    "CBSE Middle East",
    "Online Tuition Saudi Arabia",
    "CBSE Tutors UAE",
    "Indian Schools Qatar",
    "Learnosphere",
    "CBSE Online Classes",
  ],
  alternates: {
    canonical: "https://learnosphere.in/middle-east",
  },
};

// 2. Render the Client Component
export default function MiddleEastPage() {
  return <MiddleEastHomePage />;
}
