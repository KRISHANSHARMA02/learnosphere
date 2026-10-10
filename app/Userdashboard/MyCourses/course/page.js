import { getCourseDetails, getSubjects } from "@/src/lib/actions/course_in_dashboard_api";

import CoursePageClient from "@/components/client/DashboardCourseDetails"; // client component
// import { decryptData } from "@/src/utils/cryptodecrypt";

export const revalidate = 60; // ✅ re-fetch from backend every 60s

export default async function Page({ searchParams }) {
  const params = await searchParams;

  const courseId = params?.id;
  const registrationNumber = params?.token;
 

  if (!courseId || !registrationNumber) {
    return <div className="p-10 text-center">Missing required parameters</div>;
  }

  // const decryptedRegNo = decryptData(registrationNumber);

  // ✅ Server-side fetching (FAST + SECURE)
  const course = await getCourseDetails(courseId, registrationNumber);
  const subjects = await getSubjects(courseId);

  // Pass data to client component
  return (
    <CoursePageClient
      initialCourse={course}
      initialSubjects={subjects}
    />
  );
}
