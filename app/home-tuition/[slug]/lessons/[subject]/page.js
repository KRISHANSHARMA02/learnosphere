import { fetchTeachersForLessonPage } from "@/src/lib/actions/fetchTeacher";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LessonsContent from "@/components/LessonContent";
import Footer1 from "@/components/Footer1";
export default async function Page({ params }) {
  const { slug, subject } = await params;

  const teachers = await fetchTeachersForLessonPage({
    subject: subject,
    city: slug,
    limit: 15,
  });

  return (
    <>
      <Navbar />

      <LessonsContent
        subject={subject}
        teacherCity={slug}
        teachers={teachers}
      />
      <Footer1 />
      <Footer />
    </>
  );
}
