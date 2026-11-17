import ClientPage from '@/components/client/CBSE_Class-11-Math';

export const metadata = {
  title: {
    absolute: "CBSE Class 11 Maths Syllabus: Chapters & Topics | Learnosphere"
  },
  description: "Explore the CBSE Class 11 Maths syllabus with all 14 chapters, unit-wise topics, exam structure and official CBSE curriculum resources."
};

export default function Page(props) {
  return <ClientPage {...props} />;
}