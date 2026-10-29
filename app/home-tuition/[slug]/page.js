import { notFound } from "next/navigation";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import HomeTuitionContent from "@/components/Hometuitioncontent";
import Navbar from "@/components/Navbar";
import Footer1 from "@/components/Footer1";
import Footer from "@/components/Footer";
import { fetchTeachersForHomeTuition } from "@/src/lib/actions/fetchTeacher";

const EXCLUDED_CITIES = new Set([
  "home-tuition-in-janjgir - champa",
  "home-tuition-in-janjgir-champa",
  "home-tuition-in-canning - ii",
  "home-tuition-in-canning-ii",
  "janjgir - champa",
  "janjgir-champa",
  "janjgir champa",
  "canning - ii",
  "canning-ii",
  "canning ii",
]);

async function getCityData(cityName) {
  try {
    const res = await fetch(
      `${WEB_BACKEND_URL}/api/route/getLocationsFromStateCity`,
      {
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) {
      console.error("Failed to fetch city data");
      return null;
    }

    const json = await res.json();
    const city = json.data?.find(
      (item) => item.city && item.city.toLowerCase().trim() === cityName.toLowerCase().trim(),
    );

    return city || null;
  } catch (error) {
    console.error("Error fetching city data:", error);
    return null;
  }
}

function generateHeadline(city) {
  const statements = [
    `Best Private Home Tuition in ${city} with Experienced Tutors`,
    `Personalized Home Tuition in ${city} to Improve Exam Results`,
    `Expert Home Tuition in ${city}`,
    `One-to-One Home Tuition in ${city}`,
    `Private Home Tuition in ${city} at Your Doorstep`,
    `Best Platform for Home Tuition in ${city}`,
    `Upgrade Your Skills with Home Tuition in ${city} Experts`,
    `Achieve High Marks with Expert Home Tuition in ${city}`,
  ];

  const randomIndex = Math.floor(Math.random() * statements.length);
  return statements[randomIndex];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  if (!slug) return { title: "Page Not Found | Learnosphere" };

  const decodedSlug = decodeURIComponent(slug).trim().toLowerCase();
  if (EXCLUDED_CITIES.has(decodedSlug)) {
    return {
      title: "Page Not Found | Learnosphere",
      robots: { index: false, follow: false },
    };
  }

  const cityName = decodedSlug
    .replace(/^home-tuition-in-/, "")
    .replace(/-/g, " ")
    .trim();

  if (EXCLUDED_CITIES.has(cityName)) {
    return {
      title: "Page Not Found | Learnosphere",
      robots: { index: false, follow: false },
    };
  }

  const cityData = await getCityData(cityName);
  if (!cityData) {
    return {
      title: "Page Not Found | Learnosphere",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `Home Tuition in ${cityData.city} | Learnosphere`,
    description: `Find top home tutors in ${cityData.city} with Learnosphere.`,
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  if (!slug) {
    notFound();
  }

  const decodedSlug = decodeURIComponent(slug).trim().toLowerCase();
  if (EXCLUDED_CITIES.has(decodedSlug)) {
    notFound();
  }

  const cityName = decodedSlug
    .replace(/^home-tuition-in-/, "")
    .replace(/-/g, " ")
    .trim();

  if (EXCLUDED_CITIES.has(cityName)) {
    notFound();
  }

  const cityData = await getCityData(cityName);

  if (!cityData) {
    notFound();
  }

  const headline = generateHeadline(cityData.city);

  const teachers = await fetchTeachersForHomeTuition({
    city: cityData.city,
    subject: null,
    limit: 6,
  });

  return (
    <>
      <Navbar />
      <div className="h-20"></div>

      <HomeTuitionContent
        cityData={cityData}
        headline={headline}
        teachers={teachers}
        slug={slug}
      />

      <Footer1 />
      <Footer />
    </>
  );
}
