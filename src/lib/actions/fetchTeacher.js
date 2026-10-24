import { verifyTeachersImages } from "@/src/utils/tutorImageHelper";
import { webBackendFetch } from "@/src/helper/webbackend_api";

const mapTeacherFromApi = (tutor) => ({
  id: tutor.id,
  name: tutor.name,
  gender: tutor.gender || null,
  image: tutor.image,
  allSubjects: tutor.subjects || [tutor.subject],
  subject: tutor.subject,
  rating: tutor.rating,
  reviews: tutor.reviewsCount,
  city: tutor.city,
  BaseRate: tutor.price,
  currencySymbol: tutor.currency?.symbol || "₹",
  badge: tutor.position === "New" ? "New" : null,
  isApproved: tutor.is_approved || tutor.isApproved || false,
  
});

// Helper: Strict Subject Matcher
const isSubjectMatch = (teacher, reqSub) => {
  if (!reqSub) return false;
  const r = reqSub.toLowerCase().trim();

  const subjectsToCheck = teacher.allSubjects || [];

  return subjectsToCheck.some((sub) => {
    if (!sub) return false;
    const t = sub.toLowerCase().trim();

    // Rule A: Exact Match
    if (t === r) return true;

    // Rule B: Strict Block for "Computer Science"
    if (r.includes("computer") && t === "science") return false;

    // Rule C: Strict Block for "Environmental Science"
    if (r.includes("environmental") && t === "science") return false;

    // Rule D: Partial Match
    return t.includes(r) || r.includes(t);
  });
};

// Main fetch function for Lesson Pages
export async function fetchTeachersForLessonPage({ subject, city, limit = 15 , studentIso }) {
  try {
    let finalTeachers = [];
    const formattedCity = city
      ? city
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      : "";
       const isoQuery = studentIso || "IN";

    // STEP 1: Strict Subject Teachers (Global)
    if (subject) {
     const subjectData = await webBackendFetch(
        `/api/route/get_tutor_list_for_find_tutor?subject=${encodeURIComponent(subject)}&studentIso=${isoQuery}`
      );

      if (subjectData.success) {
        const rawTeachers = subjectData.data.map(mapTeacherFromApi);
        finalTeachers = rawTeachers.filter((t) => isSubjectMatch(t, subject));
      }
    }

    // STEP 2: Backup - Teachers by City
    if (finalTeachers.length < limit && formattedCity) {
     const cityData = await webBackendFetch(
        `/api/route/get_tutor_list_for_find_tutor?city=${encodeURIComponent(formattedCity)}&studentIso=${isoQuery}`
      );

      if (cityData.success) {
        const cityTeachers = cityData.data.map(mapTeacherFromApi);
        const existingIds = new Set(finalTeachers.map((t) => t.id));
        const uniqueCity = cityTeachers.filter((t) => !existingIds.has(t.id));
        const needed = limit - finalTeachers.length;
        finalTeachers = [...finalTeachers, ...uniqueCity.slice(0, needed)];
      }
    }

    // STEP 3: Backup - Random / All Teachers
    if (finalTeachers.length < limit) {
     const randomData = await webBackendFetch(
        `/api/route/get_tutor_list_for_find_tutor?studentIso=${isoQuery}`
      );

      if (randomData.success) {
        const randomTeachers = randomData.data.map(mapTeacherFromApi);
        const existingIds = new Set(finalTeachers.map((t) => t.id));
        const uniqueRandom = randomTeachers.filter((t) => !existingIds.has(t.id));
        finalTeachers = [
          ...finalTeachers,
          ...uniqueRandom.slice(0, limit - finalTeachers.length),
        ];
      }
    }

    return await verifyTeachersImages(finalTeachers.slice(0, limit));
  } catch (err) {
    console.error("❌ Failed to fetch teachers for lesson page:", err);
    return [];
  }
}
export async function fetchTeachersForHomeTuition({ city, subject, limit = 6, studentIso }) {
  try {
    let finalTeachers = [];

    const formattedCity = city
      ? city
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      : "";

    // 👇 Safe fallback for ISO
    const isoQuery = studentIso || "IN";


    if (subject) {
      // 1️⃣ Local Strict Subject
      const params = new URLSearchParams();
      if (formattedCity) params.append("city", formattedCity);
      params.append("subject", subject);
      params.append("studentIso", isoQuery); // 👇 Fixed to studentIso

      const localData = await webBackendFetch(`/api/route/get_tutor_list_for_find_tutor?${params.toString()}`);

      if (localData.success) {
        const rawTeachers = localData.data.map(mapTeacherFromApi);
        finalTeachers = rawTeachers.filter((t) => isSubjectMatch(t, subject));
      }

      // 2️⃣ Global Strict Subject (Backup)
      if (finalTeachers.length < limit) {
       
        // 👇 Fixed to studentIso=
        const globalData = await webBackendFetch(
          `/api/route/get_tutor_list_for_find_tutor?subject=${encodeURIComponent(subject)}&studentIso=${isoQuery}`
        );

        if (globalData.success) {
          const globalTeachers = globalData.data.map(mapTeacherFromApi);
          const validGlobal = globalTeachers.filter((t) =>
            isSubjectMatch(t, subject)
          );
          const existingIds = new Set(finalTeachers.map((t) => t.id));
          const uniqueGlobal = validGlobal.filter((t) => !existingIds.has(t.id));
          finalTeachers = [
            ...finalTeachers,
            ...uniqueGlobal.slice(0, limit - finalTeachers.length),
          ];
        }
      }
    } else {
      // 3️⃣ No Subject Selected (City Only)
      // 👇 Fixed to studentIso=
      const cityEndpoint = formattedCity
        ? `/api/route/get_tutor_list_for_find_tutor?city=${encodeURIComponent(formattedCity)}&studentIso=${isoQuery}`
        : `/api/route/get_tutor_list_for_find_tutor?studentIso=${isoQuery}`;

      const cityData = await webBackendFetch(cityEndpoint);
      if (cityData.success) {
        finalTeachers = cityData.data.map(mapTeacherFromApi);
      }

      // Backup Random
      if (finalTeachers.length < limit) {
        // 👇 Fixed to studentIso=
        const randomData = await webBackendFetch(`/api/route/get_tutor_list_for_find_tutor?studentIso=${isoQuery}`);
        if (randomData.success) {
          const randomTeachers = randomData.data.map(mapTeacherFromApi);
          const existingIds = new Set(finalTeachers.map((t) => t.id));
          const uniqueRandom = randomTeachers.filter((t) => !existingIds.has(t.id));
          finalTeachers = [
            ...finalTeachers,
            ...uniqueRandom.slice(0, limit - finalTeachers.length),
          ];
        }
      }
    }

    return await verifyTeachersImages(finalTeachers.slice(0, limit));
  } catch (err) {
    console.error("❌ Failed to fetch teachers for home tuition:", err);
    return [];
  }
}
