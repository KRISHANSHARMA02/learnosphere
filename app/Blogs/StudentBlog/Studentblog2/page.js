import { buildCanonicalUrl } from '@/src/utils/canonicalHelper';
import ClientPage from '@/components/client/Studentblog2';

export const metadata = {
  title: "Why Book a Tutor for Home Tuition? Key Benefits | Learnosphere",
  description: "Student blog from Learnosphere: study guidance, revision strategies and tips to help students prepare for exams with confidence.",
  alternates: {
    canonical: buildCanonicalUrl(["Blogs","StudentBlog","Studentblog2"]),
  },
};

export default function Page(props) {
  return <ClientPage {...props} />;
}