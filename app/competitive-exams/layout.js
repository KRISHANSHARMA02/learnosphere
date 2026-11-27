import { buildCanonicalUrl } from "@/src/utils/canonicalHelper";

export const metadata = {
  title: "Competitive Exam Preparation | Learnosphere",
  description: "Prepare for competitive exams including IIT JEE, NEET, and Olympiads with expert tutors and study resources.",
  alternates: {
    canonical: buildCanonicalUrl("competitive-exams"),
  },
};

export default function Layout({ children }) {
  return children;
}
