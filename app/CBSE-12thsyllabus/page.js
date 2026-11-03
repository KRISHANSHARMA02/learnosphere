import ClientPage from '@/components/client/CBSE-12thsyllabus';

export const metadata = {
  title: "CBSE Class 12 Syllabus - Learnosphere",
  description: "Get the latest CBSE Class 12 syllabus for Maths, Physics, Chemistry, Biology, and more for the 2024-25 academic year. Prepare effectively for your board exams with our detailed syllabus and study resources."
};

export default function Page(props) {
  return <ClientPage {...props} />;
}
