import CourseDetail from "./courseDetails";
import { getCourseById } from "@/src/lib/actions/courses";
import { notFound } from "next/navigation";
import Script from "next/script";

const BASE_URL = "https://learnosphere.in";

export async function generateMetadata(props) {
  const params = await props.params;
  const slug = params.slug;

  // Extract course ID from slug
  const courseId = slug.split("-").pop();

  if (!courseId) {
    return {
      title: "Learnosphere Courses",
      description: "Explore premium CBSE & competitive exam courses.",
      alternates: {
        canonical: `${BASE_URL}/Courses/${slug}`,
      },
    };
  }

  const course = await getCourseById(courseId);

  if (!course) {
    return {
      title: "Course Not Found | Learnosphere",
      description: "This course does not exist or has been removed.",
      alternates: {
        canonical: `${BASE_URL}/Courses/${slug}`,
      },
    };
  }

  // Prepare dynamic SEO text
  const seoTitle =
    course.seo_title ||
    `${course.title} | Online Course by Learnosphere`;

  const seoDescription =
    course.seo_description ||
    course.short_description ||
    `Learn ${course.title} with expert tutors, video lessons, notes, and mock tests.`;

  const canonicalUrl = `${BASE_URL}/Courses/${slug}`;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: course.seo_keywords || `${course.title}, CBSE Courses, Learnosphere`,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: canonicalUrl,
      images: course.courseImage ? [course.courseImage] : [],
      type: "article",
    },
  };
}

export default async function CoursePage(props) {
  const params = await props.params;
  const slug = params.slug;

  const courseId = slug.split("-").pop();

   if (!courseId) return notFound();

  const course = await getCourseById(courseId);

   if (!course) return notFound();

     // 🔹 Course Schema (dynamic)
  // const courseSchema = {
  //   "@context": "https://schema.org",
  //   "@type": "Course",
  //   name: course.title,
  //   description:
  //     course.seo_description ||
  //     course.short_description ||
  //     course.description,
  //   provider: {
  //     "@type": "Organization",
  //     name: "Learnosphere",
  //     url: BASE_URL,
  //   },
  //   educationalCredentialAwarded: course.grade || "CBSE",
  //   courseMode: "Online",
  //   url: `${BASE_URL}/Courses/${slug}`,
  //   image: course.courseImage,
  // };

  return (  <>
      {/* ✅ JSON-LD Schema */}
      {/* <Script
        id={`course-schema-${courseId}`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseSchema),
        }}
      /> */}

      {/* UI */}
      <CourseDetail course={course} />
    </>
  );
}
