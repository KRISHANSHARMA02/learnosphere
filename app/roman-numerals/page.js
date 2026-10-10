import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Footer1 from "@/components/Footer1";

const class10 = () => {
  return (
    <div>
      <Navbar />
      <div className="font-Poppins min-h-screen bg-gray-50">
        <div className="container mx-auto p-6">
          <h1 className="text-4xl font-bold text-center text-orange-600 mt-20 mb-6">
            Roman Numerals
          </h1>
          <p className="text-lg font-semibold text-gray-700 mb-6">
            Roman Numerals is a special kind of numerical notation that was
            earlier used by the Romans. The Roman numeral system is both
            additive and subtractive, in which letters are used to represent
            specific base numbers. For example, the Roman numeral XLVII is
            equivalent to 47 in numeric form.
          </p>

          {/* Table of Contents */}
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Table of Contents:
          </h3>
          <ul className="list-disc pl-6 text-lg text-gray-700 mb-6">
            <li>Definition</li>
            <li>Roman Numbers Chart</li>
            <li>Roman Numbers 1 to 100</li>
            <li>Roman Numbers 100 to 1000</li>
            <li>Roman Letters</li>
            <li>Rules to Write Roman Numerals</li>
            <li>Conversion – Roman Numerals to Numbers</li>
            <li>Solved Examples</li>
            <li>Practice Questions</li>
            <li>FAQs</li>
          </ul>

          {/* What are Roman Numerals? */}
          <section className="mt-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              What are Roman Numerals?
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Roman numerals are an ancient numbering system used by the Romans.
              They are based on certain symbols from the Latin alphabet. The
              system is both additive and subtractive, meaning a number can be
              formed by combining letters in a certain order. For instance, “V”
              represents 5, “X” represents 10, and so on. The rules of Roman
              numerals can be learned to represent both large and small numbers.
            </p>
          </section>

          {/* Roman Numerals Chart */}
          <section className="mt-10 overflow-scroll md:overflow-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Roman Numerals Chart
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Below is the Roman Numeral chart for reference. This chart
              contains the main Roman Numerals and their equivalent values:
            </p>
            <table className="min-w-full bg-white shadow-md rounded-lg border-separate border-spacing-0 border border-gray-300 mt-6">
              <thead>
                <tr className="bg-orange-600 text-white">
                  <th className="py-3 px-6 border border-gray-300">I</th>
                  <th className="py-3 px-6 border border-gray-300">V</th>
                  <th className="py-3 px-6 border border-gray-300">X</th>
                  <th className="py-3 px-6 border border-gray-300">L</th>
                  <th className="py-3 px-6 border border-gray-300">C</th>
                  <th className="py-3 px-6 border border-gray-300">D</th>
                  <th className="py-3 px-6 border border-gray-300">M</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-50">
                  <td className="py-3 px-6 border border-gray-300">1</td>
                  <td className="py-3 px-6 border border-gray-300">5</td>
                  <td className="py-3 px-6 border border-gray-300">10</td>
                  <td className="py-3 px-6 border border-gray-300">50</td>
                  <td className="py-3 px-6 border border-gray-300">100</td>
                  <td className="py-3 px-6 border border-gray-300">500</td>
                  <td className="py-3 px-6 border border-gray-300">1000</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Roman Numerals 1 to 100 */}
          <section className="mt-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Roman Numbers 1 to 100
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Below is the chart of Roman Numerals from 1 to 100:
            </p>
            <table className="min-w-full bg-white shadow-md rounded-lg border-separate border-spacing-0 border border-gray-300 mt-6">
              <thead>
                <tr className="bg-orange-600 text-white">
                  <th className="py-3 px-6 border border-gray-300">Number</th>
                  <th className="py-3 px-6 border border-gray-300">
                    Roman Numeral
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { num: 1, roman: "I" },
                  { num: 2, roman: "II" },
                  { num: 3, roman: "III" },
                  { num: 4, roman: "IV" },
                  { num: 5, roman: "V" },
                  { num: 6, roman: "VI" },
                  { num: 7, roman: "VII" },
                  { num: 8, roman: "VIII" },
                  { num: 9, roman: "IX" },
                  { num: 10, roman: "X" },
                  { num: 20, roman: "XX" },
                  { num: 30, roman: "XXX" },
                  { num: 40, roman: "XL" },
                  { num: 50, roman: "L" },
                  { num: 60, roman: "LX" },
                  { num: 70, roman: "LXX" },
                  { num: 80, roman: "LXXX" },
                  { num: 90, roman: "XC" },
                  { num: 100, roman: "C" },
                ].map((row) => (
                  <tr key={row.num} className="bg-gray-50">
                    <td className="py-3 px-6 border border-gray-300">
                      {row.num}
                    </td>
                    <td className="py-3 px-6 border border-gray-300">
                      {row.roman}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Roman Numerals 100 to 1000 */}
          <section className="mt-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Roman Numbers 100 to 1000
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Roman Numerals from 100 to 1000 are:
            </p>
            <table className="min-w-full bg-white shadow-md rounded-lg border-separate border-spacing-0 border border-gray-300 mt-6">
              <thead>
                <tr className="bg-orange-600 text-white">
                  <th className="py-3 px-6 border border-gray-300">Number</th>
                  <th className="py-3 px-6 border border-gray-300">
                    Roman Numeral
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { num: 100, roman: "C" },
                  { num: 200, roman: "CC" },
                  { num: 300, roman: "CCC" },
                  { num: 400, roman: "CD" },
                  { num: 500, roman: "D" },
                  { num: 600, roman: "DC" },
                  { num: 700, roman: "DCC" },
                  { num: 800, roman: "DCCC" },
                  { num: 900, roman: "CM" },
                  { num: 1000, roman: "M" },
                ].map((row) => (
                  <tr key={row.num} className="bg-gray-50">
                    <td className="py-3 px-6 border border-gray-300">
                      {row.num}
                    </td>
                    <td className="py-3 px-6 border border-gray-300">
                      {row.roman}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Roman Letters */}
          <section className="mt-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Roman Letters
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              The Roman numeral system uses the following letters to represent
              specific values:
            </p>
            <ul className="list-inside list-disc">
              <li>I represents 1</li>
              <li>V represents 5</li>
              <li>X represents 10</li>
              <li>L represents 50</li>
              <li>C represents 100</li>
              <li>D represents 500</li>
              <li>M represents 1000</li>
            </ul>
          </section>

          {/* Rules to Write Roman Numerals */}
          <section className="mt-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Rules to Write Roman Numerals
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              The rules to write Roman Numerals are:
              </p>
              <ul className="list-inside list-disc">
                <li>Only seven symbols are used (I, V, X, L, C, D, M).</li>
                <li>
                  A smaller numeral before a larger numeral means subtraction
                  (e.g., IV = 4).
                </li>
                <li>
                  A smaller numeral after a larger numeral means addition (e.g.,
                  VI = 6).
                </li>
                <li>
                  Repetition of numerals means multiplication (e.g., III = 3).
                </li>
              </ul>
        
          </section>

          {/* Conversion – Roman Numerals to Numbers */}
          <section className="mt-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Conversion – Roman Numerals to Numbers
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              To convert Roman Numerals into numbers, follow these steps:
              </p>
              <ul className="list-inside list-disc">
                <li>Identify the Roman letters.</li>
                <li>
                  Add the values of the symbols unless a smaller symbol comes
                  before a larger one.
                </li>
                <li>
                  If a smaller symbol comes before a larger one, subtract its
                  value from the larger one.
                </li>
              </ul>
          
          </section>

          {/* Solved Examples */}
          <section className="mt-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Solved Examples
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800">
                  Example 1:
                </h3>
                <p className="text-lg text-gray-700">
                  Convert XII to number. Answer: 12
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-800">
                  Example 2:
                </h3>
                <p className="text-lg text-gray-700">
                  Convert MCMXC to number. Answer: 1990
                </p>
              </div>
            </div>
          </section>

          {/* Practice Questions */}
          <section className="mt-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Practice Questions
            </h2>
            <div className="space-y-4">
              <p className="text-lg text-gray-700">
                1. Convert XLVIII to number.
              </p>
              <p className="text-lg text-gray-700">2. Convert MMX to number.</p>
            </div>
          </section>

          {/* FAQs */}
          <section className="mt-10 mb-20">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">FAQs</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800">
                  What is the highest Roman numeral?
                </h3>
                <p className="text-lg text-gray-700">
                  The highest Roman numeral is M, which represents 1000.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-800">
                  Can Roman numerals represent zero?
                </h3>
                <p className="text-lg text-gray-700">
                  No, the Roman numeral system does not have a symbol for zero.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer1 />
      <Footer />
    </div>
  );
};

export default class10;

export const generateMetadata = () => {
  return {
    title: "Roman Numerals",
    description:
      "Roman Numerals is a special kind of numerical notation that was earlier used by the Romans. The Roman numeral is an additive and subtractive system in which letters are used to denote certain base numbers and arbitrary numbers in the number system.",
    keywords:
      "Roman Numerals, Roman Numbers, Roman Letters, Roman Numerals to Numbers, Subtractive Rule for Roman Numerals, Solved Examples, Practice Questions, FAQs",
  };
};
