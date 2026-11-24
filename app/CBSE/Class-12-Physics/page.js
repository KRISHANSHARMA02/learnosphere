import ClientPage from '@/components/client/CBSE_Class-12-Physics';

export const metadata = {
  title: {
    absolute: "CBSE Class 12 Physics Syllabus: Chapters & Marks | Learnosphere",
  },
  description: "Explore the CBSE Class 12 Physics syllabus with all 14 chapters, topics, unit-wise marks distribution, practical assessment and exam pattern."
};

export default function Page(props) {
  return <ClientPage {...props} />;
}
