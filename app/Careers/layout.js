import { buildCanonicalUrl } from "@/src/utils/canonicalHelper";

export const metadata = {
  title: "Career Opportunities | Learnosphere",
  description: "Join the Learnosphere team. Explore teaching and non-teaching career opportunities with us.",
  alternates: {
    canonical: buildCanonicalUrl("Careers"),
  },
};

export default function Layout({ children }) {
  return children;
}
