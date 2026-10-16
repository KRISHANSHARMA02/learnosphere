// Helper function (internal to server)
const formatDate = (dateString) => {
  if (!dateString) return "Recently";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

// Normalize grade: e.g. "12", "12th", "12TH" -> "Class 12"
const normalizeClassName = (rawClass) => {
  if (!rawClass) return "General";
  const str = String(rawClass).trim();
  if (str.toLowerCase().startsWith("class")) {
    return str;
  }
  const digits = str.replace(/\D/g, "");
  if (digits) {
    return `Class ${digits}`;
  }
  return str;
};

export async function fetchStudentDashboardData(studentId, studentClass, studentStream) {
  try {
    // 1️⃣ Check enrollment from backend (Server-to-Server call)
    if (studentId) {
      try {
        const enrolledRes = await fetch(
          `https://mobileapp.backend.learnosphere.in/api/route/getEnrolledCourses`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: studentId }),
            cache: "no-store", // Ensure fresh data
          }
        );

        if (enrolledRes.ok) {
          const enrolledCourses = await enrolledRes.json();
          if (Array.isArray(enrolledCourses) && enrolledCourses.length > 0) {
            return {
              studentName: "Student",
              hasEnrollment: true,
              myCourses: enrolledCourses.map((item) => {
                let progressValue = 0;
                if (typeof item.progress === "number") {
                  progressValue = item.progress;
                } else if (item.isCompleted) {
                  progressValue = 100;
                }

                return {
                  id: item.course._id,
                  title: item.course.title,
                  progress: progressValue,
                  thumbnail: item.course.thumbnail,
                  lastAccessed: formatDate(item.course.updatedAt),
                };
              }),
              recommendedCourses: [],
            };
          }
        }
      } catch (err) {
        console.error("Error fetching enrolled courses:", err);
      }
    }

    // 2️⃣ Fetch recommended if NO enrollments (Server-to-Server call)
    const normalizedClass = normalizeClassName(studentClass);
    const recommendedRes = await fetch(
      `https://mobileapp.backend.learnosphere.in/api/route/getRecommendedCourses`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: studentId || "",
          class: normalizedClass,
          stream: studentStream || "",
        }),
        cache: "no-store",
      }
    );

    const recommendedData = await recommendedRes.json();
    let coursesList = [];

    if (Array.isArray(recommendedData)) {
      coursesList = recommendedData;
    } else if (recommendedData && Array.isArray(recommendedData.recommendedCourses)) {
      coursesList = recommendedData.recommendedCourses;
    }

    // 3️⃣ Prioritize courses matching the student's stream (e.g., Commerce, PCM, PCB)
    if (studentStream && coursesList.length > 0) {
      const streamLower = String(studentStream).toLowerCase();
      coursesList.sort((a, b) => {
        const aMatches =
          (a.subject && a.subject.toLowerCase().includes(streamLower)) ||
          (a.title && a.title.toLowerCase().includes(streamLower));
        const bMatches =
          (b.subject && b.subject.toLowerCase().includes(streamLower)) ||
          (b.title && b.title.toLowerCase().includes(streamLower));

        if (aMatches && !bMatches) return -1;
        if (!aMatches && bMatches) return 1;
        return 0;
      });
    }

    return {
      studentName: "Student",
      hasEnrollment: false,
      myCourses: [],
      recommendedCourses: coursesList.map((course) => ({
        id: course._id,
        title: course.title,
        rating: course.rating || 4.8,
        students: course.reviewCount || 120,
        price: course.discountPrice || course.price,
        currency: "₹",
        category: course.subject || course.class || "General",
        thumbnail: course.thumbnail,
      })),
    };
  } catch (error) {
    console.error("Server Action Error:", error);
    return {
      studentName: "Student",
      hasEnrollment: false,
      myCourses: [],
      recommendedCourses: [],
    };
  }
}