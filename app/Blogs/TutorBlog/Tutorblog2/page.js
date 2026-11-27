import { buildCanonicalUrl } from '@/src/utils/canonicalHelper';
import ClientPage from '@/components/client/Tutorblog2';

export const metadata = {
  title: "How to Engage Students in Home Tuition Sessions | Learnosphere",
  description: "Tutor blog from Learnosphere: practical teaching tips to help tutors plan lessons, engage students and deliver better learning results.",
  alternates: {
    canonical: buildCanonicalUrl(["Blogs","TutorBlog","Tutorblog2"]),
  },
};

export default function Page(props) {
  return <ClientPage {...props} />;
}