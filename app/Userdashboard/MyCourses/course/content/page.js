import { getSubjectContent } from "@/src/lib/actions/course_in_dashboard_api";
import CourseContentClient from "@/components/client/DashboardCourseContent";
import { webBackendFetch } from "@/src/helper/webbackend_api";
import { auth } from "@/src/auth";

export const revalidate = 60; // ✅ re-fetch from backend every 60s

export default async function Page({ searchParams }) {
  const params = await searchParams;

  const courseId = params?.id;
  let registrationNumber = params?.client;
  const subject = params?.subject;

  if (!courseId || !subject) {
    return <div className="p-10 text-center">Missing required parameters</div>;
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
      console.error("Error fetching student profile for subject content:", err);
    }
  }

  // ✅ Server-side fetching (FAST + SECURE PROXY)
  const subjectContent = await getSubjectContent({
    courseId,
    subject,
    userId: registrationNumber || "",
  });

  // Pass data to client component
  return <CourseContentClient contentData={subjectContent} subject={subject} />;
}
