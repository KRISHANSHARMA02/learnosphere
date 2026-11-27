import { buildCanonicalUrl } from "@/src/utils/canonicalHelper";

export async function generateMetadata({ params }) {
  const { slug, subjectSlug } = await params;
  return {
    alternates: {
      canonical: buildCanonicalUrl(["CBSE_Syllabus", slug, subjectSlug]),
    },
  };
}

export default function Layout({ children }) {
  return children;
}
