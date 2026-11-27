import { fetchTeachersForLessonPage } from "@/src/lib/actions/fetchTeacher";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LessonsContent from "@/components/LessonContent";
import Footer1 from "@/components/Footer1";
import { buildCanonicalUrl } from "@/src/utils/canonicalHelper";

export async function generateMetadata({ params }) {
  const { slug, subject } = await params;
  const formattedSubject = subject
    ? subject.charAt(0).toUpperCase() + subject.slice(1).replace(/-/g, " ")
    : "Lessons";
  const formattedCity = slug
    ? slug.replace(/^home-tuition-in-/, "").replace(/-/g, " ")
    : "India";

  return {
    title: `Home Tuition for ${formattedSubject} in ${formattedCity} | Learnosphere`,
    description: `Find top home tutors for ${formattedSubject} in ${formattedCity}. Personalized 1-on-1 private tuition with verified expert tutors.`,
    alternates: {
      canonical: buildCanonicalUrl(["home-tuition", slug, "lessons", subject]),
    },
  };
}

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
