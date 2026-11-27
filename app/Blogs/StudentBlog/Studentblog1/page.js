import { buildCanonicalUrl } from '@/src/utils/canonicalHelper';
import ClientPage from '@/components/client/Studentblog1';

export const metadata = {
  title: "Effective Study Techniques for Students | Learnosphere",
  description: "Student blog from Learnosphere: learning insights, study ideas and exam preparation advice to help students improve and stay motivated.",
  alternates: {
    canonical: buildCanonicalUrl(["Blogs","StudentBlog","Studentblog1"]),
  },
};

export default function Page(props) {
  return <ClientPage {...props} />;
}