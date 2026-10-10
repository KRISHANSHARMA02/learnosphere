
// Helper function (internal to server)
const formatDate = (dateString) => {
  if (!dateString) return "Recently";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export async function fetchStudentDashboardData(studentId, studentClass) {
  try {
    // 1️⃣ Check enrollment from backend (Server-to-Server call)
    const enrolledRes = await fetch(
      `https://mobileapp.backend.learnosphere.in/api/route/getEnrolledCourses`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: studentId }),
        cache: "no-store", // Ensure fresh data
      }
    );

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

    // 2️⃣ Fetch recommended if NO enrollments (Server-to-Server call)
    const recommendedRes = await fetch(
      `https://mobileapp.backend.learnosphere.in/api/route/getRecommendedCourses`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: studentId,
          class: studentClass || "General",
        }),
        cache: "no-store",
      }
    );

    const recommended = await recommendedRes.json();

    return {
      studentName: "Student",
      hasEnrollment: false,
      myCourses: [],
      recommendedCourses: Array.isArray(recommended)
        ? recommended.map((course) => ({
            id: course._id,
            title: course.title,
            rating: course.rating || 4.5,
            students: course.reviewCount || 0,
            price: course.discountPrice || course.price,
            currency: "₹",
            category: course.subject || "General",
            thumbnail: course.thumbnail,
          }))
        : [],
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