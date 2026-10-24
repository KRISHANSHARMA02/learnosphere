import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import { verifyTeacherImage, verifyTeachersImages } from "@/src/utils/tutorImageHelper";
export async function fetchTeacherProfileData(teacherId, studentIso) {
  try {
    const res = await fetch(
      `${WEB_BACKEND_URL}/api/route/get_tutor_public_profile?tutorId=${teacherId}&studentIso=${studentIso}`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      console.error("Failed to fetch teacher data");
      return null;
    }

    const result = await res.json();

    if (result.data) {
      const teacherObj = {
        ...result.data,
        isApproved: result.data.isApproved ?? false,
      };
      return await verifyTeacherImage(teacherObj);
    }
    return result.data || null;
  } catch (err) {
    console.error("❌ Teacher profile fetch error:", err);
    return null;
  }
}

export async function fetchSimilarTeachers(teacher, teacherId) {
  try {
    let finalTeachers = [];
    const limit = 12;

    if (!teacher) {
      console.log("❌ Teacher data not found, skipping similar teachers");
      return [];
    }

    const normalizeId = (id) => String(id || "").trim();
    const currentTeacherId = normalizeId(teacherId);
    const currentTeacherObjId = normalizeId(teacher?.id);

    // --- PRIORITY 1: Fetch by CITY ---
    if (teacher?.city) {
      const cityRes = await fetch(
        `${WEB_BACKEND_URL}/api/route/get_tutor_list_for_find_tutor?city=${teacher.city}`,
        {
          cache: "no-store",
        },
      );

      if (cityRes.ok) {
        const cityResult = await cityRes.json();
        if (cityResult.success && cityResult.data) {
          const cityTeachers = cityResult.data
            .map((t) => ({
              ...t,
              isApproved: t.isApproved ?? false,
            }))
            .filter((t) => {
              const tId = normalizeId(t.id);
              const tName = String(t.name || "")
                .trim()
                .toLowerCase();
              const currentName = String(teacher?.name || "")
                .trim()
                .toLowerCase();

              return (
                tId !== currentTeacherId &&
                tId !== currentTeacherObjId &&
                tName !== currentName
              );
            });
          finalTeachers = cityTeachers;
        }
      }
    }

    // --- PRIORITY 2: Fetch RANDOM ---
    if (finalTeachers.length < limit) {
      const randomRes = await fetch(
        `${WEB_BACKEND_URL}/api/route/get_tutor_list_for_find_tutor`,
        {
          cache: "no-store",
        },
      );

      if (randomRes.ok) {
        const randomResult = await randomRes.json();

        if (randomResult.success && randomResult.data) {
          const existingIds = new Set(
            finalTeachers.map((t) => normalizeId(t.id)),
          );

          existingIds.add(currentTeacherId);
          existingIds.add(currentTeacherObjId);

          const uniqueRandomTeachers = randomResult.data.filter((t) => {
            return !existingIds.has(normalizeId(t.id));
          });

          const mappedRandom = uniqueRandomTeachers.map((t) => ({
            ...t,
            isApproved: t.isApproved ?? false,
          }));
          const extraNeeded = limit - finalTeachers.length;

          finalTeachers = [
            ...finalTeachers,
            ...mappedRandom.slice(0, extraNeeded),
          ];
        }
      }
    }

    return await verifyTeachersImages(finalTeachers.slice(0, limit));
  } catch (err) {
    console.error("❌ Similar teachers fetch error:", err);
    return [];
  }
}
