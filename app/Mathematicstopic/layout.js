import { buildCanonicalUrl } from "@/src/utils/canonicalHelper";

export const metadata = {
  title: "Mathematics Topics | Learnosphere",
  description: "Explore all mathematics topics, formulas, theorems, and definitions on Learnosphere.",
  alternates: {
    canonical: buildCanonicalUrl("Mathematicstopic"),
  },
};

export default function Layout({ children }) {
  return children;
}
