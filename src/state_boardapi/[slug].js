// File: pages/api/boards/[slug].js

export default function handler(req, res) {
  const { slug } = req.query;

  const articles = [
    {
      slug: "APBSE",
      title: "Andhra Pradesh Board of Secondary Education (APBSE)",
      description:
        "The APBSE (Board of Secondary Education Andhra Pradesh) regulates and supervises secondary education (Class 10) in Andhra Pradesh. Established in 1953, it functions under the Department of School Education as the Directorate of Government Examinations.",
    },
    {
      slug: "DSEAP",
      title: "Directorate of School Education, Arunachal Pradesh (DSEAP)",
      description:
        "DSEAP is the government body overseeing school education in Arunachal Pradesh, from primary to higher secondary levels, aiming to enhance access, quality, and equity.",
    },
    {
      slug: "SEBA",
      title: "Board of Secondary Education, Assam (SEBA)",
      description:
        "SEBA manages secondary education in Assam and conducts the High School Leaving Certificate (HSLC) exam. It was established in 1962.",
    },
    {
      slug: "BSEB",
      title: "Bihar School Examination Board (BSEB)",
      description:
        "BSEB governs secondary and senior secondary education in Bihar. It also conducts other entrance and eligibility tests in the state.",
    },
    {
      slug: "CGBSE",
      title: "Chhattisgarh Board of Secondary Education (CGBSE)",
      description:
        "CGBSE regulates secondary and higher secondary education in Chhattisgarh. It was established in 2001 and operates under the School Education Department.",
    },
  ];

  const board = articles.find((b) => b.slug === slug);

  if (board) {
    res.status(200).json(board);
  } else {
    res.status(404).json({ error: "Board not found" });
  }
}
