import { getSubjectContent } from "@/src/lib/actions/course_in_dashboard_api";
import CourseContentClient from "@/components/client/DashboardCourseContent"; // client component
// import { decryptData } from "@/src/utils/cryptodecrypt";

export const revalidate = 60; // ✅ re-fetch from backend every 60s

export default async function Page({ searchParams }) {
  const params = await searchParams;

  const courseId = params?.id;
  const registrationNumber = params?.client;
  const subject = params?.subject;

  if (!courseId || !subject || !registrationNumber) {
    return <div className="p-10 text-center">Missing required parameters</div>;
  }

  // const decryptedRegNo = decryptData(registrationNumber);

  // ✅ Server-side fetching (FAST + SECURE)
  const subjectContent = await getSubjectContent({
    courseId,
    subject,
    userId: registrationNumber,
  });

  // Pass data to client component
  return <CourseContentClient contentData={subjectContent} subject={subject} />;
}
