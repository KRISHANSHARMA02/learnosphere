const cbseNotesTitles = {
  "combustion-and-flame-class-8-important-questions": "Combustion and Flame Class 8: Important Questions | Learnosphere",
  "science-projects-for-class-9": "Class 9 Science Projects: Ideas for CBSE Students | Learnosphere",
  "coordination-compounds-class-12-notes": "Coordination Compounds: Class 12 Chemistry Notes | Learnosphere",
  "extra-question-for-class-9-science": "Class 9 Science Extra Questions for CBSE Practice | Learnosphere"
};

const cbseNotesDescriptions = {
  "cbse-books-for-class-11": "CBSE books for Class 11: find the right textbooks and reference books subject-wise and learn how to use them for effective preparation.",
  "cbse-class-9-exam-prep-tips": "CBSE Class 9 exam prep tips: build a study plan, revise smartly and manage your time to prepare for school exams with confidence.",
  "combustion-and-flame-class-8-important-questions": "Combustion and flame Class 8 important questions: practise key questions on fuels, types of combustion and flame structure to revise science.",
  "coordination-compounds-class-12-notes": "Coordination compounds Class 12 notes: learn ligands, nomenclature, bonding theories and isomerism with clear, exam-focused notes.",
  "examination-tips": "Examination tips for students: how to plan revision, manage time, reduce stress and write better answers on exam day.",
  "extra-question-for-class-9-science": "Class 9 science extra questions: practise additional CBSE questions to strengthen concepts, test understanding and revise for exams.",
  "net-exam-papers": "NET exam papers for practice and preparation: understand the exam pattern, solve past-style questions and plan your revision.",
  "parabola": "Parabola notes: learn the definition, standard equations, graph and properties with clear explanations for Class 11 and 12 maths.",
  "science-projects-for-class-9": "Science project ideas for Class 9 students: simple, creative topics to explore concepts, build skills and impress in school."
};

import ClientPage from '@/components/client/Cbse-Notes_slug';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const description = cbseNotesDescriptions[slug];
  const formattedTitle = slug
    ? `${slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} | Learnosphere`
    : "CBSE Notes | Learnosphere";
  const customTitle = cbseNotesTitles[slug];
  return {
    title: customTitle ? { absolute: customTitle } : formattedTitle,
    ...(description ? { description } : {}),
  };
}

export default function Page(props) {
  return <ClientPage {...props} />;
}
