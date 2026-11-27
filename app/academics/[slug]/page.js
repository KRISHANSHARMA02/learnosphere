import { buildCanonicalUrl } from '@/src/utils/canonicalHelper';
const academicsDescriptions = {
  "computer-science": "Learn computer science and IT online with Learnosphere: explore courses, study notes and book expert tutors for coding and theory support."
};

import ClientPage from '@/components/client/academics_slug';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const description = academicsDescriptions[slug];
  return {
    title: { absolute: "Computer Science & IT Courses and Study Resources | Learnosphere" },
    ...(description ? { description } : {}),
    alternates: {
      canonical: buildCanonicalUrl(["academics", slug]),
    },
  };
}

export default function Page(props) {
  return <ClientPage {...props} />;
}