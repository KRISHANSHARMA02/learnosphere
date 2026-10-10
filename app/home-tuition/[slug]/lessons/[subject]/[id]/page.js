import TeacherProfilePage from "@/components/TeacherProfilePage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Footer1 from "@/components/Footer1";
import { headers } from "next/headers"; // 🚀 Import headers to pass session cookies
import {
  fetchTeacherProfileData,
  fetchSimilarTeachers,
} from "@/src/lib/actions/fetchTeaherProfile";

export default async function Page({ params }) {
  const { id } = await params;

  let userCountryIso = "IN"; // 🚀 Default fallback agar user login nahi hai

  try {
    // 🚀 Server side par request headers (cookies waghera) fetch karna
    const headersList = await headers();
    
    // 🚀 API call to get logged-in user data
    // Dhyan rakhein: Next.js server components mein absolute URL chahiye hota hai
    const apiUrl = process.env.BASE_URL;
  
    const userResponse = await fetch(`${apiUrl}/api/getUser`, {
      method: "GET",
      headers: headersList, // Session cookies yahan pass hongi taaki API ko pata chale kaunsa user hai
      cache: "no-store",    // Hamesha fresh data laaye
    });

    if (userResponse.ok) {
      const userData = await userResponse.json();
      // 🚀 Agar API ne user data aur countryIso diya hai, toh usko update kar do
      if (userData?.user?.countryIso) {
        userCountryIso = userData.user.countryIso;
      }
    }
  } catch (error) {
    console.error("Error fetching user profile for Country ISO:", error);
    // Agar error aata hai toh by default "IN" pass ho jayega
  }

  // 🚀 Ab hardcoded "IN" ki jagah dynamic `userCountryIso` pass ho raha hai
  const teacher = await fetchTeacherProfileData(id, userCountryIso);
  const similarTeachers = await fetchSimilarTeachers(teacher, id);

  if (!teacher) {
    return (
      <>
        <Navbar />
        <div className="text-center mt-20 text-orange-500 font-bold">
          No teacher found for this lesson
        </div>
        <Footer1 />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <TeacherProfilePage teacher={teacher} similarTeachers={similarTeachers} />

      <Footer1 />
      <Footer />
    </>
  );
}