import { buildCanonicalUrl } from '@/src/utils/canonicalHelper';
import ClientPage from '@/components/client/Tutorblog1';

export const metadata = {
  title: "Adapting Teaching Methods to Different Learning Styles | Learnosphere",
  description: "Tutor blog from Learnosphere: career guidance for educators on building a teaching profile, finding students and growing as a tutor.",
  alternates: {
    canonical: buildCanonicalUrl(["Blogs","TutorBlog","Tutorblog1"]),
  },
};

export default function Page(props) {
  return <ClientPage {...props} />;
}