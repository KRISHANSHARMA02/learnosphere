import { getCourseDetails, getSubjects } from "@/src/lib/actions/course_in_dashboard_api";
import CoursePageClient from "@/components/client/DashboardCourseDetails";
import { webBackendFetch } from "@/src/helper/webbackend_api";
import { auth } from "@/src/auth";

export const revalidate = 60; // ✅ re-fetch from backend every 60s

export default async function Page({ searchParams }) {
  const params = await searchParams;

  const courseId = params?.id;
  let registrationNumber = params?.token;

  if (!courseId) {
    return <div className="p-10 text-center">Missing course ID</div>;
  }

  if (!registrationNumber) {
    try {
      const session = await auth();
      if (session?.user?.email) {
        const userData = await webBackendFetch(
          "/api/route/getStudentByEmail",
          {
            method: "POST",
            body: JSON.stringify({ gmail: session.user.email }),
            cache: "no-store",
          }
        );
        if (userData && !userData.message) {
          registrationNumber = userData?.registrationNumber;
        }
      }
    } catch (err) {
      console.error("Error fetching student profile for course details:", err);
    }
  }

  // ✅ Server-side fetching (FAST + SECURE PROXY)
  const course = await getCourseDetails(courseId, registrationNumber || "");
  const subjects = await getSubjects(courseId);

  // Pass data to client component
  return (
    <CoursePageClient
      initialCourse={course}
      initialSubjects={subjects}
    />
  );
}
