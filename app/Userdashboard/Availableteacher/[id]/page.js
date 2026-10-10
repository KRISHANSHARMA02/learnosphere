import TeacherProfilePage from "./TeacherProfilePage";
import {
  fetchTeacherProfileData,
  fetchSimilarTeachers,
} from "@/src/lib/actions/fetchTeaherProfile";


import { auth } from "@/src/auth"; 

export default async function Page({ params }) {
  const { id, subject } = await params;

 
  const session = await auth();
  let studentIso = "IN"; // Default fallback

  // 2. If logged in, fetch the ISO directly on the server
  if (session?.user?.email) {
    try {
      // Server components need absolute URLs for fetch
      const baseUrl = process.env.BASE_URL || "https://learnosphere.in/";
      
      const userRes = await fetch(`${baseUrl}/api/getUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session.user.email, gmail: session.user.email }),
        cache: "no-store" // Ensures we get fresh data
      });
      
      if (userRes.ok) {
        const userData = await userRes.json();
        studentIso = userData?.user?.countryIso || "IN";
      }
    } catch (error) {
      console.error("Failed to fetch user ISO on server:", error);
    }
  }

  const teacher = await fetchTeacherProfileData(id, studentIso);
  
  const similarTeachers = await fetchSimilarTeachers(teacher, id);

  if (!teacher) {
    return (
      <>
        <div className="text-center mt-20 text-orange-500 font-bold">
          No teacher found for this lesson
        </div>
      </>
    );
  }

  return (
    <>
      {/* 👇 Passing the fetched studentIso down as a prop! */}
      <TeacherProfilePage 
        teacher={teacher} 
        similarTeachers={similarTeachers} 
        subject={subject} 
        studentIso={studentIso} 
      />

    </>
  );
}