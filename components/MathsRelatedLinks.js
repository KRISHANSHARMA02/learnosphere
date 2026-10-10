"use client";
import Link from "next/link";
import React from "react";

export default function MathsRelatedLinks() {
  const links = [
    "Flow Rate Formula",
    "Impulse Formula",
    "Rectangular Parallelepiped Formula",
    "Avogadros Law",
    "Area Of Isosceles Trapezium",
    "Shear Modulus Formula",
    "Kinetic Energy Examples Problems",
    "Integration Formulas For Class 12",
    "Linear Equation Formula",
    "Formula To Find Power",
    "Learn Mathematics",
    "Surface Area Of Sphere",
    "Basic Differentiation Formulas",
    "Statistics Basics",
    "Circle Problems",
    "Number System",
    "Cofactor Matrix",
    "Laplace Theorem",
    "Faces Edges And Vertices",
    "Prime Number",
    "Complement Of A Set",
    "Co Prime Number List",
    "Statistics Symbols",
    "Factor Theorem",
    "Factors Of 215",
    "Angle Of Elevation",
    "Divisibility Rules For 13",
    "How To Complete The Square",
    "Application Of Matrices",
    "Important Questions Class 11 Maths Chapter 14 Mathematical Reasoning",
    "Cube Cuboid",
    "Conversion Of Units",
    "HCF Of Two Numbers",
    "Trigonometry Rules",
    "Profit And Loss Explanation",
    "Metric System Chart",
    "Pythagorean Theorem Questions",
    "Types Of Symmetry",
    "Different Mathematical Symbols",
    "Circumference",
    "Straight Lines Formulas",
    "Transversal",
    "Class 10 Maths",
    "Law Of Sines",
    "Addition And Subtraction",
    "Factors Of 91",
    "Dodecagon",
    "Complex Number System",
    "Solve The Linear Equation In Two Or Three Variables",
    "Mutually Exclusive Events"
  ];

  return (
    <div className="w-full bg-gray-50 border border-gray-200 rounded-xl p-6 my-8">
      <h2 className="font-bold text-[1.4rem] text-black mb-6">Maths Related Links</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {links.map((title, index) => {
          const slug = encodeURIComponent(title.toLowerCase().replace(/\s+/g, '-'));
          return (
            <Link 
              key={index} 
              href={`/Mathematicstopic/${slug}`}
              className="bg-gray-200 p-4 rounded-lg text-orange-600 font-semibold hover:bg-orange-600 hover:text-white transition-colors duration-200"
            >
              {title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
