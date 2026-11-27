import { buildCanonicalUrl } from "@/src/utils/canonicalHelper";

export const metadata = {
  title: "ICSE Related Resources & Syllabus | Learnosphere",
  description: "Explore ICSE curriculum, subjects, solutions, and study resources for Classes 6 to 10.",
  alternates: {
    canonical: buildCanonicalUrl("ICSE-Related"),
  },
};

export default function Layout({ children }) {
  return children;
}
