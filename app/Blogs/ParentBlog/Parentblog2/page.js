import { buildCanonicalUrl } from '@/src/utils/canonicalHelper';
import ClientPage from '@/components/client/Parentblog2';

export const metadata = {
  title: "Healthy Screen Time Habits for Kids: Parent Guide | Learnosphere",
  description: "Parent blog from Learnosphere: practical guidance on supporting your child's studies, building confidence and staying involved in progress.",
  alternates: {
    canonical: buildCanonicalUrl(["Blogs","ParentBlog","Parentblog2"]),
  },
};

export default function Page(props) {
  return <ClientPage {...props} />;
}