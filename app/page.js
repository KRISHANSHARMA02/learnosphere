import HomePageClient from "@/components/HomePageClient";

export const metadata = {
    title: "Book an Educator | Learnosphere | Home Tuition",
  description:
    "Learnosphere - Searching for personalized home tuition ? Our expert educators offer tailored solutions for students of all ages. Enroll today!",
  keywords:
    "Home Tuition in Jaipur,Tuition,Home Tuition,Home tuition for exams, Home tuition services, teacher, student, tuition teacher, online education, tutor,Affordable home tuition, learning,Maths and english tutor near me ,maths tution near me, syllabus,english private tutor near me,IIT ,JEE MAIN ,JEE, science tution near me,online tutor,tuition in jaipur,home tutor near me,maths tutor near me ",

  alternates: {
    canonical: "https://learnosphere.in/",
  },

  openGraph: {
    type: "website",
    url: "https://learnosphere.in/",
    title: "Book an Educator | Learnosphere | Home Tuition",
    description:
      "Learnosphere - Searching for personalized home tuition ? Our expert educators offer tailored solutions for students of all ages. Enroll today!",
    images: [
      {
        url: "https://learnosphere.s3.ap-south-1.amazonaws.com/public_images/slide1.jpg",
        width: 800,
        height: 600,
        alt: "leanosphere hiring teacher Image Alt",
      },
    ],
    additionalMetaTags: [
      {
        name: "keywords",
        content:
          "learnosphere,Home Tuition in Jaipur,Tuition,Home Tuition,Home tuition for exams, Home tuition services, teacher, student, tuition teacher, online education, tutor,Affordable home tuition, learning,Maths and english tutor near me ,maths tution near me, syllabus,english private tutor near me,IIT ,JEE MAIN ,JEE, science tution near me,online tutor,tuition in jaipur,home tutor near me,maths tutor near me, tuition near me, maths tuition, science tuition, English tuition, Hindi tuition, social science tuition, CBSE syllabus, class 10 syllabus, 2023-24 syllabus, CBSE Class 10 syllabus 2023-24, Class 10 board exam preparation, best tuition in Jaipur, maths tuition for Class 10, science tuition for Class 10, English tuition for Class 10, Hindi tuition for Class 10, social science tuition for Class 10, online tuition for Class 10, top tuition centers in Jaipur, CBSE exam tips, Class 10 study materials, CBSE sample papers, home tuition for Class 10 in Jaipur, Class 10 coaching near me, best tutors for Class 10, CBSE Class 10 updates, Class 10 tuition fees, tuition classes for Class 10, affordable tuition in Jaipur",
      },
    ],
  },
};

async function getSlides() {
  try {
    const response = await fetch("https://learnospherebackend.learnosphere.in/api/route/public", { next: { revalidate: 60 } });
    if (!response.ok) return null;
    const data = await response.json();
    if (data.success && data.slides) {
      return data.slides
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((slide) => ({
          id: slide.id,
          image: slide.imageUrl,
          alt: slide.title,
          link: slide.redirectUrl,
        }));
    }
  } catch (error) {
    console.error("Failed to fetch initial slides:", error);
  }
  return null;
}

export default async function Page() {
    const initialSlides = await getSlides();
  return <HomePageClient initialSlides={initialSlides} />;
}
