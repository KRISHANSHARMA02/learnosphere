import { buildCanonicalUrl } from '@/src/utils/canonicalHelper';
import ClientPage from '@/components/client/Parentblog1';

export const metadata = {
  title: "How Parents Can Support Learning at Home | Learnosphere",
  description: "Parent blog from Learnosphere: ideas to help you support your child's learning at home, from study routines to choosing the right tutor.",
  alternates: {
    canonical: buildCanonicalUrl(["Blogs","ParentBlog","Parentblog1"]),
  },
};

export default function Page(props) {
  return <ClientPage {...props} />;
}