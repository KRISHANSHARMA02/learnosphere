import { webBackendFetch } from "@/src/helper/webbackend_api";
import EnrollmentCheckPage from "@/components/client/DashboardCourseMain";
import { fetchStudentDashboardData } from "@/src/lib/actions/course_in_dashboard_main";
import { auth } from "@/src/auth";

export const revalidate = 60; // ✅ re-fetch from backend every 60s

export default async function Page(props) {
  const searchParams = await props.searchParams;

  let registrationNumber = searchParams?.token;
  let grade = searchParams?.grade;
  let stream = searchParams?.stream;

  if (!registrationNumber || !grade || stream === undefined) {
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
          registrationNumber = registrationNumber || userData?.registrationNumber;
          grade = grade || userData?.grade;
          stream = stream ?? userData?.stream;
        }
      }
    } catch (err) {
      console.error("Error fetching student profile for courses:", err);
    }
  }

  const dashboardData = await fetchStudentDashboardData(
    registrationNumber,
    grade,
    stream
  );

  return <EnrollmentCheckPage serverData={dashboardData} />;
}
