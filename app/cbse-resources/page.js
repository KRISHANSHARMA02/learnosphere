import { buildCanonicalUrl } from "@/src/utils/canonicalHelper";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer1 from "@/components/Footer1";
import Footer from "@/components/Footer";

export const metadata = {
  title: "CBSE Study Resources, Notes & Solutions | Learnosphere",
  description: "Explore CBSE study resources, chapter-wise notes, NCERT solutions and practice papers for all classes on Learnosphere.",
  alternates: {
    canonical: buildCanonicalUrl("cbse-resources"),
  },
};

export default function Page() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-24 min-h-[60vh] font-Poppins">
        <h1 className="text-3xl font-bold text-center text-orange-600 mb-6">
          CBSE Study Resources & Solutions
        </h1>
        <p className="text-center text-gray-700 max-w-2xl mx-auto mb-10">
          Access comprehensive CBSE learning materials, chapter-wise NCERT solutions, worksheets, and study notes.
        </p>
        <div className="flex justify-center">
          <Link
            href="/CBSE"
            className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 font-semibold"
          >
            Explore All CBSE Classes
          </Link>
        </div>
      </div>
      <Footer1 />
      <Footer />
    </>
  );
}
