const academicsSubDescriptions = {
  "study-notes": "Computer science study notes for students: clear explanations of key topics to help you learn, revise and prepare for exams."
};

import ClientPage from '@/components/client/academics_slug_subslug';

export async function generateMetadata({ params }) {
  const { subslug } = await params;
  const description = academicsSubDescriptions[subslug];
  return {
    title: { absolute: "Computer Science Study Notes and Topic Guides | Learnosphere" },
    ...(description ? { description } : {}),
  };
}

export default function Page(props) {
  return <ClientPage {...props} />;
}