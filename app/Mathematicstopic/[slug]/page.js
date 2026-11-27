const mathTopicTitles = {
  "basic-differentiation-formulas": "Basic Differentiation Formulas: Quick Reference | Learnosphere",
  "circle-class-9-theorems": "Circle Theorems for Class 9 Maths Explained | Learnosphere",
  "surface-area-of-a-sphere": "Surface Area of a Sphere: Formula and Method | Learnosphere",
  "parabola": "Parabola: Definition, Equation and Key Properties | Learnosphere",
  "hcf-lcm-formula": "HCF and LCM Formulas: How to Find Them | Learnosphere",
  "define-symmetrical": "What Is Symmetry? Meaning of Symmetrical in Maths | Learnosphere",
  "intersecting-lines-and-non-intersecting-lines": "Intersecting and Non-Intersecting Lines in Geometry | Learnosphere",
  "square-root-of-7": "Square Root of 7: Value, Decimal & Method | Learnosphere",
  "hcf-of-two-numbers": "HCF of Two Numbers: Formula, Methods & Examples | Learnosphere",
  "prime-factorization": "Prime Factorization: Methods & Solved Examples | Learnosphere",
  "prime-factorization-": "Prime Factorization: Methods & Solved Examples | Learnosphere",
  "Prime-Factorization": "Prime Factorization: Methods & Solved Examples | Learnosphere",
  "fundamental-principle-of-counting": "Fundamental Principle of Counting: Definition, Rules, Examples and Applications | Learnosphere",
  "class-8-maths-syllabus": "Class 8 Maths Syllabus: Chapters, Topics and Study Material | Learnosphere",
  "class-10-maths-syllabus": "CBSE Class 10 Maths Syllabus 2026–27 – Chapter-Wise Topics and Marks Distribution | Learnosphere",
  "beta-distribution": "Beta Distribution: Definition, Formula, Properties and Applications | Learnosphere",
  "factoring-polynomials": "Factoring Polynomials – Meaning, Methods and Examples | Learnosphere",
  "three-dimensional-geometry-class-12": "Three Dimensional Geometry Class 12 – Notes & Formulas | Learnosphere",
  "types-of-symmetry": "Different Forms of Symmetry in Geometry | Learnosphere",
  "construction-of-quadrilaterals": "Construction of Quadrilaterals – Methods & Examples | Learnosphere",
  "complex-numbers": "Complex Numbers: Definition, Formulas & Examples | Learnosphere",
  "singular-matrix-example": "Singular Matrix Example – Definition, Properties & Solved Examples | Learnosphere",
  "hexagon-lines-of-symmetry": "Hexagon Lines of Symmetry – Diagram, Properties & Examples | Learnosphere"
};

const mathTopicsDescriptions = {
  "1000-in-roman-numerals": "1000 in Roman numerals is written as M. Learn the rule, see how M is formed and practise Roman numerals with simple examples.",
  "basic-differentiation-formulas": "Basic differentiation formulas with examples: learn the power, product, quotient and chain rules and solve calculus problems with confidence.",
  "circle-class-9-theorems": "Circle theorems for Class 9 with proofs: learn the key theorems on chords, angles and arcs, and solve exam questions step by step.",
  "continuous-integration": "Continuous integration in maths explained: understand the key ideas, see simple examples and practise to build a clear understanding.",
  "define-symmetrical": "What is symmetry? Learn the definition, types such as line and rotational symmetry, and simple examples for school maths.",
  "hcf-lcm-formula": "HCF and LCM formula explained: learn methods like prime factorisation and division, with solved examples to find HCF and LCM quickly.",
  "intersecting-lines-and-non-intersecting-lines": "Intersecting vs non-intersecting lines: learn the difference between crossing and parallel lines, with simple examples for school maths.",
  "parabola": "Parabola in maths: learn the definition, standard equations, focus, directrix and graph, with clear explanations for Class 11 and 12 students.",
  "square-root-of-7": "The square root of 7 is approximately 2.645751. Learn its exact form, why √7 is irrational, its decimal value and how to calculate it using long division.",
  "surface-area-of-a-sphere": "Surface area of a sphere formula: learn 4πr² with worked examples and tips to solve sphere problems in Class 9 and 10 maths.",
  "hcf-of-two-numbers": "Learn how to find the HCF of two numbers using prime factorisation and the division method. Understand the HCF formula with step-by-step examples.",
  "prime-factorization": "Learn prime factorization using the division and factor tree methods. Understand the steps with solved examples, prime factors and practice questions.",
  "prime-factorization-": "Learn prime factorization using the division and factor tree methods. Understand the steps with solved examples, prime factors and practice questions.",
  "Prime-Factorization": "Learn prime factorization using the division and factor tree methods. Understand the steps with solved examples, prime factors and practice questions.",
  "fundamental-principle-of-counting": "The Fundamental Principle of Counting is an important concept in Mathematics that helps students calculate the total number of possible outcomes in different situations.",
  "class-8-maths-syllabus": "Class 8 Maths Syllabus: Explore chapter-wise topics, NCERT curriculum, study material, and preparation tips for Class 8 Mathematics students.",
  "class-10-maths-syllabus": "CBSE Class 10 Maths Syllabus 2026–27: Chapter-wise topics, exam pattern, course structure, and unit-wise marks distribution for board exam preparation.",
  "beta-distribution": "The Beta Distribution is a continuous probability distribution used in statistics to represent random variables that take values between 0 and 1. Learn formulas, properties and applications.",
  "factoring-polynomials": "Learn factoring polynomials with definition, methods (GCF, grouping, splitting middle term, identities), formulas and solved examples.",
  "three-dimensional-geometry-class-12": "Learn Three Dimensional Geometry Class 12 with important formulas, equations of lines and planes, concepts and practice questions.",
  "types-of-symmetry": "Learn types of symmetry in geometry: reflective, rotational, translational and glide reflection symmetry with diagrams and simple examples.",
  "construction-of-quadrilaterals": "Learn construction of quadrilaterals using given sides, angles and diagonals. Explore geometry methods, examples and important concepts.",
  "complex-numbers": "Learn complex numbers, their types, properties, formulas and arithmetic operations with simple explanations and examples.",
  "singular-matrix-example": "Learn singular matrix definition, properties, determinant formula and solved examples. Understand how to identify singular matrices in linear algebra.",
  "hexagon-lines-of-symmetry": "Learn the 6 lines of symmetry of a regular hexagon, with geometric properties, interior angle formulas, examples and easy explanations."
};

import { buildCanonicalUrl } from "@/src/utils/canonicalHelper";
import ClientPage from '@/components/client/Mathematicstopic_slug';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const description = mathTopicsDescriptions[slug];
  const formattedTitle = slug
    ? `${slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} | Learnosphere`
    : "Mathematics Topics | Learnosphere";
  const customTitle = mathTopicTitles[slug];
  return {
    title: customTitle ? { absolute: customTitle } : formattedTitle,
    ...(description ? { description } : {}),
    alternates: {
      canonical: buildCanonicalUrl(["Mathematicstopic", slug]),
    },
  };
}

export default async function Page({ params, searchParams }) {
  const { slug } = await params;
  let initialData = [];
  try {
    const res = await fetch(`http://localhost:4000/api/route/mathematicsTopic/${slug}`, { cache: 'no-store' });
    const json = await res.json();
    if (json?.data && Array.isArray(json.data)) {
      initialData = json.data;
    }
  } catch (err) {
    // fallback to client-side fetch
  }
  return <ClientPage params={{ slug }} initialData={initialData} />;
}
