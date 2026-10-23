"use server";

import { webBackendFetch } from "@/src/helper/webbackend_api";
import { fetchTeachersForLessonPage } from "@/src/lib/actions/fetchTeacher"; 
import { auth } from "@/src/auth";
const cleanExperience = (exp) => {
  if (!exp) return 0;
  if (typeof exp === 'number') return exp;
  const strVal = String(exp);
  const match = strVal.match(/(\d+)/);
  return match ? parseInt(match[0], 10) : 0;
};

export async function getSecureTeacherList(subject = "All") {
  try {
    let studentIso = "IN"; // Default fallback

        // 1. Call getUser API to get the countryIso
    try {
      // 👇 Grab the session to get the user's email
      const session = await auth(); 
      const userEmail = session?.user?.email;

      // Only fetch if we have an email
      if (userEmail) {
        try {
          const userData = await webBackendFetch("/api/route/checkUserFromSession", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: userEmail, gmail: userEmail }),
          });
          studentIso = userData?.user?.countryIso || "IN";
        } catch (fetchErr) {
          studentIso = "IN";
        }
      }
    } catch (apiError) {
      console.error("Failed to fetch user ISO in getSecureTeacherList:", apiError);
    }

    const reqSubject = subject === "All" ? "" : subject;
     
    // 2. Pass the fetched studentIso into your existing function call
    const rawList = await fetchTeachersForLessonPage({ 
        subject: reqSubject, 
        city: "", 
        limit: 50, 
        studentIso: studentIso 
    });

    if (!rawList || !Array.isArray(rawList)) return [];
    
    // 👇 Now this will correctly log "US" for your account!
    
    return rawList.map(tutor => ({
        id: tutor.id,
        name: tutor.name,
        image: tutor.image,
        subject: tutor.subject,
        allSubjects: tutor.allSubjects || [tutor.subject],
        rating: tutor.rating || 4.5,
        reviews: tutor.reviews || 0,
        city: tutor.city,
        baseRate: tutor.BaseRate || tutor.baseRate || tutor.price || 0, 
        currencySymbol: tutor.currencySymbol || "₹",
        rawExperience: cleanExperience(tutor.experience || tutor.yearsOfExperience),
        gender: tutor.gender || "Not Specified",
        email: tutor.email,
        RegistrationNumber: tutor.id,
        bio: tutor.bio || "",
        language: tutor.language || "English",
        isApproved: !!tutor.isApproved
    }));

  } catch (error) {
    console.error("Bridge Action Error:", error);
    return [];
  }
}


// ✅ ADDED: GET SINGLE TEACHER PROFILE
export async function getTeacherProfile(id) {
  try {
    const all = await getSecureTeacherList("All");
    // ID match check (String convert karke handle karein)
    const teacher = all.find(t => String(t.id) === String(id) || String(t.RegistrationNumber) === String(id));
    return teacher || null;
  } catch (error) {
    console.error("Profile Fetch Error:", error);
    return null;
  }
}

// --- NEW EXPORT: GET SIMILAR TEACHERS ---
export async function fetchSimilarTeachers(currentTeacher, id) {
  try {
    const all = await getSecureTeacherList("All");
    
    const similar = all.filter(t => 
      String(t.id) !== String(id) && 
      String(t.RegistrationNumber) !== String(id)
    );

    return similar.slice(0, 4);
  } catch (error) {
    console.error("Similar Fetch Error:", error);
    return [];
  }
}