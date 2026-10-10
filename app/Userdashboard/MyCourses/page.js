import EnrollmentCheckPage from "@/components/client/DashboardCourseMain";
import { fetchStudentDashboardData } from "@/src/lib/actions/course_in_dashboard_main";
// import { decryptData } from "@/src/utils/cryptodecrypt";

export const revalidate = 60; // ✅ re-fetch from backend every 60s

export default async function Page(props) {
  const searchParams = await props.searchParams;

  const registrationNumber = searchParams?.token;
  const grade = searchParams?.grade;




  if (!registrationNumber || !grade) {
    console.error("❌ ERROR: Missing required params");
  }

  // const decryptedRegNo = decryptData(registrationNumber);

  const dashboardData = await fetchStudentDashboardData(
    registrationNumber,
    grade
  );


  return <EnrollmentCheckPage serverData={dashboardData} />;
}
