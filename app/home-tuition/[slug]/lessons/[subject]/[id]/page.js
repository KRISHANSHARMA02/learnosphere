import TeacherProfilePage from "@/components/TeacherProfilePage";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Footer1 from "@/components/Footer1";
import { headers } from "next/headers"; // 🚀 Import headers to pass session cookies
import {
  fetchTeacherProfileData,
  fetchSimilarTeachers,
} from "@/src/lib/actions/fetchTeaherProfile";
import { buildCanonicalUrl } from "@/src/utils/canonicalHelper";

export async function generateMetadata({ params }) {
  const { slug, subject, id } = await params;
  const teacher = await fetchTeacherProfileData(id, "IN");

  if (!teacher) {
    return {
      title: "Teacher Profile Not Found | Learnosphere",
      robots: { index: false, follow: false },
      alternates: {
        canonical: buildCanonicalUrl(["home-tuition", slug, "lessons", subject, id]),
      },
    };
  }

  const teacherName = teacher.name || "Home Tutor";
  const formattedSubject = subject
    ? subject.charAt(0).toUpperCase() + subject.slice(1).replace(/-/g, " ")
    : "All Subjects";
  const formattedCity = slug
    ? slug.replace(/^home-tuition-in-/, "").replace(/-/g, " ")
    : "India";

  return {
    title: `${teacherName} - ${formattedSubject} Home Tutor in ${formattedCity} | Learnosphere`,
    description: `Book classes with ${teacherName}, verified home tutor for ${formattedSubject} in ${formattedCity}. Verified reviews, qualifications, and affordable fees.`,
    alternates: {
      canonical: buildCanonicalUrl(["home-tuition", slug, "lessons", subject, id]),
    },
  };
}

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