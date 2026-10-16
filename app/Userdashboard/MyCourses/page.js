import EnrollmentCheckPage from "@/components/client/DashboardCourseMain";
import { fetchStudentDashboardData } from "@/src/lib/actions/course_in_dashboard_main";
import { auth } from "@/src/auth";

export const revalidate = 60; // ✅ re-fetch from backend every 60s

export default async function Page(props) {
  const searchParams = await props.searchParams;

  let registrationNumber = searchParams?.token;
  let grade = searchParams?.grade;
  let stream = searchParams?.stream;

  if (!registrationNumber || !grade) {
    try {
      const session = await auth();
      if (session?.user?.email) {
        const userRes = await fetch(
          "https://learnospherebackend.learnosphere.in/api/route/getStudentByEmail",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ gmail: session.user.email }),
            cache: "no-store",
          }
        );
        if (userRes.ok) {
          const userData = await userRes.json();
          registrationNumber = registrationNumber || userData?.registrationNumber;
          grade = grade || userData?.grade;
          stream = stream || userData?.stream;
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
