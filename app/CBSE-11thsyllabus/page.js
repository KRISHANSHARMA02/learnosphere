import ClientPage from '@/components/client/CBSE-11thsyllabus';

export const metadata = {
  title: "Class 11 Syllabus - Learnosphere",
  description: "Get the latest CBSE Class 11 Syllabus for English, Mathematics, Physics, Chemistry, Biology, Accountancy, Business Studies, Economics, and Political Science for the 2024-25 academic year. Prepare effectively for your exams with our detailed syllabus and study resources."
};

export default function Page(props) {
  return <ClientPage {...props} />;
}
