import AvailableTeacherClient from "@/components/AvailableTeacherClient";
// Import the NEW bridge action, not the old file
import { getSecureTeacherList } from "@/src/lib/actions/AvailableTeacherAction"; 

export const dynamic = "force-dynamic";

export default async function AvailableTeacherPage() {
  // Fetch data securely on the server
  const initialData = await getSecureTeacherList("All");
 
  return (
    <AvailableTeacherClient initialTeachers={initialData} />
  );
}