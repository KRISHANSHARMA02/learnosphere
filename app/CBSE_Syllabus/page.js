import ClientPage from '@/components/client/CBSE_Syllabus';

export const metadata = {
  title: "CBSE Syllabus for Classes 1–12 | Learnosphere",
  description: "Explore the CBSE syllabus for all classes with subject-wise topics, chapters and curriculum details for exam preparation."
};

export default function Page(props) {
  return <ClientPage {...props} />;
}