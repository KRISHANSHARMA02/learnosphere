const mathTopicTitles = {
  "basic-differentiation-formulas": "Basic Differentiation Formulas: Quick Reference | Learnosphere",
  "circle-class-9-theorems": "Circle Theorems for Class 9 Maths Explained | Learnosphere",
  "surface-area-of-a-sphere": "Surface Area of a Sphere: Formula and Method | Learnosphere",
  "parabola": "Parabola: Definition, Equation and Key Properties | Learnosphere",
  "hcf-lcm-formula": "HCF and LCM Formulas: How to Find Them | Learnosphere",
  "define-symmetrical": "What Is Symmetry? Meaning of Symmetrical in Maths | Learnosphere",
  "intersecting-lines-and-non-intersecting-lines": "Intersecting and Non-Intersecting Lines in Geometry | Learnosphere"
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
  "surface-area-of-a-sphere": "Surface area of a sphere formula: learn 4πr² with worked examples and tips to solve sphere problems in Class 9 and 10 maths."
};

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
  };
}

export default function Page(props) {
  return <ClientPage {...props} />;
}
