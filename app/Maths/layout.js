import { buildCanonicalUrl } from "@/src/utils/canonicalHelper";

export const metadata = {
  title: "Complete Mathematics Guide for CBSE & ICSE – Formulas, Concepts & Easy Explanations",
  description: "Get answers to common questions about Learnosphere's tutoring, home tuition, and more.",
  alternates: {
    canonical: buildCanonicalUrl("Maths"),
  },
};

export default function Layout({ children }) {
  return children;
}
