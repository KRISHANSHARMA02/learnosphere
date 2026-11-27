import { buildCanonicalUrl } from "@/src/utils/canonicalHelper";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return {
    alternates: {
      canonical: buildCanonicalUrl(["Maths", slug]),
    },
  };
}

export default function Layout({ children }) {
  return children;
}
