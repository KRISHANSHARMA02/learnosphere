import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Footer1 from "@/components/Footer1";

const basicSymbols = [
  ["I", "1"],
  ["V", "5"],
  ["X", "10"],
  ["L", "50"],
  ["C", "100"],
  ["D", "500"],
  ["M", "1,000"],
];

const classNumerals = [
  ["Class 1", "I"],
  ["Class 2", "II"],
  ["Class 3", "III"],
  ["Class 4", "IV"],
  ["Class 5", "V"],
  ["Class 6", "VI"],
  ["Class 7", "VII"],
  ["Class 8", "VIII"],
  ["Class 9", "IX"],
  ["Class 10", "X"],
  ["Class 11", "XI"],
  ["Class 12", "XII"],
];

const romanNumerals = [
  "",
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
  "VIII",
  "IX",
  "X",
  "XI",
  "XII",
  "XIII",
  "XIV",
  "XV",
  "XVI",
  "XVII",
  "XVIII",
  "XIX",
  "XX",
  "XXI",
  "XXII",
  "XXIII",
  "XXIV",
  "XXV",
  "XXVI",
  "XXVII",
  "XXVIII",
  "XXIX",
  "XXX",
  "XXXI",
  "XXXII",
  "XXXIII",
  "XXXIV",
  "XXXV",
  "XXXVI",
  "XXXVII",
  "XXXVIII",
  "XXXIX",
  "XL",
  "XLI",
  "XLII",
  "XLIII",
  "XLIV",
  "XLV",
  "XLVI",
  "XLVII",
  "XLVIII",
  "XLIX",
  "L",
  "LI",
  "LII",
  "LIII",
  "LIV",
  "LV",
  "LVI",
  "LVII",
  "LVIII",
  "LIX",
  "LX",
  "LXI",
  "LXII",
  "LXIII",
  "LXIV",
  "LXV",
  "LXVI",
  "LXVII",
  "LXVIII",
  "LXIX",
  "LXX",
  "LXXI",
  "LXXII",
  "LXXIII",
  "LXXIV",
  "LXXV",
  "LXXVI",
  "LXXVII",
  "LXXVIII",
  "LXXIX",
  "LXXX",
  "LXXXI",
  "LXXXII",
  "LXXXIII",
  "LXXXIV",
  "LXXXV",
  "LXXXVI",
  "LXXXVII",
  "LXXXVIII",
  "LXXXIX",
  "XC",
  "XCI",
  "XCII",
  "XCIII",
  "XCIV",
  "XCV",
  "XCVI",
  "XCVII",
  "XCVIII",
  "XCIX",
  "C",
];

const hundreds = [
  [100, "C"],
  [200, "CC"],
  [300, "CCC"],
  [400, "CD"],
  [500, "D"],
  [600, "DC"],
  [700, "DCC"],
  [800, "DCCC"],
  [900, "CM"],
  [1000, "M"],
];

const subtractivePairs = [
  ["IV", "5 - 1", "4"],
  ["IX", "10 - 1", "9"],
  ["XL", "50 - 10", "40"],
  ["XC", "100 - 10", "90"],
  ["CD", "500 - 100", "400"],
  ["CM", "1,000 - 100", "900"],
];

const toc = [
  ["symbols", "Seven basic symbols and values"],
  ["classes", "Roman numerals for Classes 1 to 12"],
  ["chart", "Roman numerals chart from 1 to 100"],
  ["hundreds", "Roman numerals from 100 to 1,000"],
  ["letter-l", "What does L mean?"],
  ["rules", "Rules of Roman numerals"],
  ["numbers-to-roman", "Convert numbers into Roman numerals"],
  ["roman-to-numbers", "Convert Roman numerals into numbers"],
  ["mistakes", "Common Roman numeral mistakes"],
  ["practice", "Practice questions and answers"],
  ["faqs", "Frequently asked questions"],
];

function SectionCard({ children, className = "" }) {
  return (
    <section
      className={`rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-7 lg:p-8 ${className}`}
    >
      {children}
    </section>
  );
}

function SectionHeading({ children, id, eyebrow }) {
  return (
    <div className="mb-5 border-b border-slate-100 pb-4">
      {eyebrow && (
        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-orange-600">
          {eyebrow}
        </span>
      )}
      <h2
        id={id}
        className="scroll-mt-24 text-xl font-bold tracking-tight text-slate-900 sm:scroll-mt-28 sm:text-2xl lg:text-3xl"
      >
        {children}
      </h2>
    </div>
  );
}

function DataTable({ headers, rows, className = "", compact = false }) {
  return (
    <div
      className={`w-full overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-xs ${className}`}
    >
      <table className="w-full min-w-[320px] border-collapse text-left text-sm tabular-nums sm:text-base">
        <thead className="bg-gradient-to-r from-orange-600 to-orange-500 text-white">
          <tr>
            {headers.map((header, idx) => (
              <th
                key={`${header}-${idx}`}
                scope="col"
                className={`whitespace-nowrap font-semibold tracking-wide ${
                  compact ? "px-3 py-2.5 sm:px-4 sm:py-3" : "px-4 py-3 sm:px-5"
                }`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200/80">
          {rows.map((row, index) => (
            <tr
              key={index}
              className={`transition-colors hover:bg-orange-50/80 ${
                index % 2 === 0 ? "bg-white" : "bg-slate-50/70"
              }`}
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`text-slate-700 ${
                    compact ? "px-3 py-2.5 sm:px-4 sm:py-3" : "px-4 py-3 sm:px-5"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ExampleCard({ step, title, children }) {
  return (
    <div className="rounded-xl border border-orange-200/70 bg-gradient-to-br from-orange-50/80 to-white p-4 shadow-xs sm:p-5">
      <div className="mb-2.5 flex items-center gap-2.5">
        {step && (
          <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-600 text-xs font-bold text-white">
            {step}
          </span>
        )}
        <h3 className="text-base font-bold text-slate-900 sm:text-lg">
          {title}
        </h3>
      </div>
      <div className="text-sm leading-7 text-slate-700 sm:text-base">
        {children}
      </div>
    </div>
  );
}

const Class10 = () => {
  const chartRows = Array.from({ length: 50 }, (_, index) => {
    const first = index + 1;
    const second = index + 51;
    return [
      <span key={`n1-${first}`} className="font-medium text-slate-600">
        {first}
      </span>,
      <span key={`r1-${first}`} className="font-semibold text-slate-900">
        {romanNumerals[first]}
      </span>,
      <span
        key={`n2-${second}`}
        className="block border-l border-slate-200 pl-3 font-medium text-slate-600 sm:pl-4"
      >
        {second}
      </span>,
      <span key={`r2-${second}`} className="font-semibold text-slate-900">
        {romanNumerals[second]}
      </span>,
    ];
  });

  return (
    <div className="min-h-screen overflow-x-clip bg-slate-50 text-slate-900">
      <Navbar />

      <main className="font-Poppins">
        {/* Hero Header */}
        <div className="relative border-b border-slate-200/80 bg-gradient-to-b from-orange-50/70 via-white to-slate-50">
          <div className="mx-auto w-full max-w-7xl px-4 pb-10 pt-24 sm:px-6 sm:pb-14 sm:pt-28 lg:px-8">
            <header className="mx-auto max-w-4xl text-center">
              {/* Category */}
              <div className="mb-5 flex justify-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-4 py-1.5 text-xs font-semibold tracking-wide text-orange-700 shadow-xs sm:text-sm">
                  <span className="h-2 w-2 rounded-full bg-orange-500" />
                  MATHEMATICS <span className="text-orange-300">/</span> NUMBER
                  SYSTEM
                </span>
              </div>

              {/* Main heading */}
              <h1 className="text-balance text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Roman Numerals: Symbols, Rules, Chart 1 to 100 and Examples
              </h1>

              {/* Introduction */}
              <p className="mx-auto mt-5 max-w-3xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg sm:leading-8">
                Roman numerals are a number system that uses seven letters to
                represent numerical values. These symbols are combined using
                addition and subtraction rules to represent different numbers.
              </p>

              {/* Key symbols */}
              <div className="mx-auto mt-8 rounded-2xl border border-orange-200/70 bg-white p-4 text-left shadow-sm sm:p-6">
                <h2 className="mb-4 text-center text-xs font-bold uppercase tracking-wider text-slate-700 sm:text-sm">
                  The Seven Basic Roman Numeral Symbols
                </h2>

                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-7 lg:gap-3">
                  {basicSymbols.map(([symbol, value]) => (
                    <div
                      key={symbol}
                      className="flex flex-row items-center justify-center gap-2 rounded-xl border border-orange-100 bg-orange-50/50 px-3 py-3 transition hover:border-orange-300 hover:bg-orange-50 lg:flex-col lg:gap-1 lg:py-3.5"
                    >
                      <span className="text-2xl font-extrabold text-orange-600 lg:text-3xl">
                        {symbol}
                      </span>
                      <span className="text-sm font-semibold tabular-nums text-slate-700">
                        = {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Examples */}
              <div className="mx-auto mt-5 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm sm:p-6">
                <h2 className="mb-3.5 text-center text-xs font-bold uppercase tracking-wider text-slate-700 sm:text-left sm:text-sm">
                  Quick Examples
                </h2>

                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
                  {[
                    ["VIII", "8"],
                    ["XLVII", "47"],
                    ["L", "50"],
                    ["XC", "90"],
                  ].map(([roman, number]) => (
                    <div
                      key={roman}
                      className="rounded-xl border border-slate-100 bg-slate-50/80 px-3 py-3 text-center transition hover:border-slate-200 hover:bg-slate-100/70"
                    >
                      <p className="text-lg font-bold tracking-wide text-slate-900 sm:text-xl">
                        {roman}
                      </p>
                      <p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">
                        Number: {number}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* What the guide covers */}
              <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
             This guide explains Roman numeral symbols, the complete chart from 1 to 100, Roman numerals for school classes, the rules for writing them, and step-by-step methods for converting Roman numerals into numbers and numbers into Roman numerals.
              </p>
            </header>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[270px_minmax(0,1fr)] lg:gap-10">
            {/* Table of Contents */}
            <aside className="h-fit rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm sm:p-5 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
              <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-2.5">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                  On this page
                </h2>
                <span className="rounded-md bg-orange-50 px-2 py-0.5 text-xs font-semibold text-orange-700">
                  {toc.length} sections
                </span>
              </div>
              <nav aria-label="Page contents">
                <ul className="grid grid-cols-1 gap-1 text-sm text-slate-600 sm:grid-cols-2 lg:grid-cols-1">
                  {toc.map(([id, label], index) => (
                    <li key={id}>
                      <a
                        className="group flex items-start gap-2.5 rounded-lg px-2.5 py-2 transition hover:bg-orange-50 hover:text-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        href={`#${id}`}
                      >
                        <span className="mt-0.5 shrink-0 font-mono text-xs font-semibold text-slate-400 group-hover:text-orange-600">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="leading-snug">{label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            {/* Article Sections */}
            <article className="min-w-0 space-y-6 sm:space-y-8">
              {/* Section 1: Basic Symbols */}
              <SectionCard>
                <SectionHeading id="symbols" eyebrow="Fundamentals">
                  Roman Numerals: Seven Basic Symbols and Their Values
                </SectionHeading>
                <p className="mb-5 leading-7 text-slate-600">
                  The Roman numeral system uses seven basic letters. Each letter
                  represents a fixed value.
                </p>
                <DataTable
                  headers={["Roman symbol", "Number value"]}
                  rows={basicSymbols}
                />
                <p className="mb-3 mt-6 leading-7 text-slate-600">
                  These symbols are combined to write other numbers. For
                  example:
                </p>
                <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {[
                    "II = 1 + 1 = 2",
                    "VI = 5 + 1 = 6",
                    "XII = 10 + 1 + 1 = 12",
                    "LX = 50 + 10 = 60",
                    "CXX = 100 + 10 + 10 = 120",
                  ].map((item) => (
                    <li
                      key={item}
                      className="rounded-xl border border-slate-200/80 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 sm:text-base"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 leading-7 text-slate-600">
                  The value of a Roman numeral depends on the order and
                  combination of its symbols.
                </p>
              </SectionCard>

              {/* Section 2: School Classes */}
              <SectionCard>
                <SectionHeading id="classes" eyebrow="School Reference">
                  Roman Numerals for Classes 1 to 12
                </SectionHeading>
                <p className="mb-4 leading-7 text-slate-600">
                  School class numbers are sometimes written using Roman
                  numerals. For example, Class 8 can be written as{" "}
                  <strong className="text-slate-900">Class VIII</strong>, and
                  Class 11 can be written as{" "}
                  <strong className="text-slate-900">Class XI</strong>.
                </p>
                <p className="mb-5 leading-7 text-slate-600">
                  Use this table to find the Roman numeral for each school class
                  from 1 to 12.
                </p>
                <DataTable
                  headers={["Class number", "Roman numeral"]}
                  rows={classNumerals}
                />
                <div className="mt-6 rounded-xl border border-orange-200/80 bg-orange-50/70 p-4 sm:p-5">
                  <h3 className="mb-2.5 text-base font-bold text-slate-900">
                    Quick answers
                  </h3>
                  <ul className="grid grid-cols-1 gap-x-6 gap-y-1.5 list-disc pl-5 text-sm leading-7 text-slate-700 sm:grid-cols-2 sm:text-base">
                    <li>
                      Class 7 in Roman numerals is{" "}
                      <strong className="text-slate-900">VII</strong>.
                    </li>
                    <li>
                      Class 8 in Roman numerals is{" "}
                      <strong className="text-slate-900">VIII</strong>.
                    </li>
                    <li>
                      Class 9 in Roman numerals is{" "}
                      <strong className="text-slate-900">IX</strong>.
                    </li>
                    <li>
                      Class 10 in Roman numerals is{" "}
                      <strong className="text-slate-900">X</strong>.
                    </li>
                    <li>
                      Class 11 in Roman numerals is{" "}
                      <strong className="text-slate-900">XI</strong>.
                    </li>
                    <li>
                      Class 12 in Roman numerals is{" "}
                      <strong className="text-slate-900">XII</strong>.
                    </li>
                  </ul>
                  <p className="mt-3 border-t border-orange-200/60 pt-3 text-sm leading-6 text-slate-600">
                    For example, when a textbook says Class VIII, it means Class
                    8.
                  </p>
                </div>
              </SectionCard>

              {/* Section 3: 1 to 100 Chart */}
              <SectionCard>
                <SectionHeading id="chart" eyebrow="Complete Reference">
                  Roman Numerals Chart from 1 to 100
                </SectionHeading>
                <p className="mb-5 leading-7 text-slate-600">
                  The following Roman numerals chart shows every number from 1
                  to 100 and its corresponding Roman numeral. It can be used as
                  a reference when learning, reading or writing Roman numbers.
                </p>
                <DataTable
                  compact
                  headers={[
                    "Number",
                    "Roman numeral",
                    "Number",
                    "Roman numeral",
                  ]}
                  rows={chartRows}
                />
              </SectionCard>

              {/* Section 4: 100 to 1,000 */}
              <SectionCard>
                <SectionHeading id="hundreds" eyebrow="Larger Values">
                  Roman Numerals from 100 to 1,000
                </SectionHeading>
                <p className="mb-5 leading-7 text-slate-600">
                  Roman numerals from 100 to 1,000 are formed by combining C, D
                  and M with other symbols.
                </p>
                <DataTable
                  headers={["Number", "Roman numeral"]}
                  rows={hundreds}
                />
                <div className="mt-5 rounded-xl border border-slate-200/80 bg-slate-50 p-4 sm:p-5">
                  <h3 className="mb-2.5 text-base font-bold text-slate-900">
                    Examples
                  </h3>
                  <ul className="grid grid-cols-1 gap-x-6 gap-y-1.5 list-disc pl-5 leading-7 text-slate-700 sm:grid-cols-2 lg:grid-cols-3">
                    <li>150 = CL</li>
                    <li>250 = CCL</li>
                    <li>450 = CDL</li>
                    <li>750 = DCCL</li>
                    <li>950 = CML</li>
                  </ul>
                </div>
              </SectionCard>

              {/* Section 5: What does L mean */}
              <SectionCard>
                <SectionHeading id="letter-l" eyebrow="Symbol Spotlight">
                  What Does L Mean in Roman Numerals?
                </SectionHeading>
                <p className="mb-5 leading-7 text-slate-600">
                  <strong className="text-slate-900">
                    L represents 50 in Roman numerals.
                  </strong>{" "}
                  It is one of the seven basic Roman numeral symbols. The letter
                  L can be combined with other symbols to represent different
                  numbers.
                </p>
                <DataTable
                  headers={["Roman numeral", "Calculation", "Number"]}
                  rows={[
                    ["L", "50", "50"],
                    ["LI", "50 + 1", "51"],
                    ["LV", "50 + 5", "55"],
                    ["LX", "50 + 10", "60"],
                    ["LXV", "50 + 10 + 5", "65"],
                    ["LXX", "50 + 10 + 10", "70"],
                    ["LXXX", "50 + 10 + 10 + 10", "80"],
                    ["XC", "100 - 10", "90"],
                    ["XL", "50 - 10", "40"],
                    ["XLVII", "50 - 10 + 5 + 1 + 1", "47"],
                  ]}
                />
                <p className="mt-5 rounded-xl border-l-4 border-orange-500 bg-orange-50 px-4 py-3.5 text-sm leading-7 text-slate-700 sm:text-base">
                  <strong className="text-slate-900">Remember:</strong> L always
                  represents 50 as a single Roman numeral symbol. In XL, X comes
                  before L, so 10 is subtracted from 50, giving 40.
                </p>
              </SectionCard>

              {/* Section 6: Rules */}
              <SectionCard>
                <SectionHeading id="rules" eyebrow="Core Principles">
                  Rules of Roman Numerals
                </SectionHeading>
                <p className="mb-6 leading-7 text-slate-600">
                  Roman numerals follow a set of addition, subtraction and
                  repetition rules. Understanding these rules helps you read and
                  write them correctly.
                </p>
                <div className="space-y-6">
                  {/* Rule 1 */}
                  <div className="rounded-xl border border-slate-200/90 bg-slate-50/50 p-4 sm:p-6">
                    <h3 className="mb-2 text-lg font-bold text-slate-900">
                      1. Addition rule
                    </h3>
                    <p className="mb-3 leading-7 text-slate-600">
                      When a symbol with a smaller or equal value comes after a
                      symbol with a larger value, its value is added.
                    </p>
                    <p className="mb-2.5 text-sm font-semibold text-slate-800">
                      Examples:
                    </p>
                    <ul className="list-disc space-y-1.5 rounded-xl border border-slate-200/80 bg-white p-4 pl-8 leading-7 text-slate-700 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:space-y-0">
                      <li>VI = 5 + 1 = 6</li>
                      <li>VII = 5 + 1 + 1 = 7</li>
                      <li>XII = 10 + 1 + 1 = 12</li>
                      <li>LX = 50 + 10 = 60</li>
                      <li>XV = 10 + 5 = 15</li>
                    </ul>
                  </div>

                  {/* Rule 2 */}
                  <div className="rounded-xl border border-slate-200/90 bg-slate-50/50 p-4 sm:p-6">
                    <h3 className="mb-2 text-lg font-bold text-slate-900">
                      2. Subtraction rule
                    </h3>
                    <p className="mb-4 leading-7 text-slate-600">
                      When a smaller symbol is placed before a larger symbol in
                      one of the permitted pairs, the smaller value is
                      subtracted from the larger value.
                    </p>
                    <p className="mb-3 text-sm font-semibold text-slate-800">
                      There are six standard subtractive pairs:
                    </p>
                    <DataTable
                      headers={["Pair", "Calculation", "Number"]}
                      rows={subtractivePairs}
                    />
                    <div className="mt-4 rounded-xl border border-slate-200/80 bg-white p-4">
                      <h4 className="mb-2 font-semibold text-slate-900">
                        For Example:
                      </h4>
                      <ul className="grid grid-cols-2 gap-x-6 gap-y-1 list-disc pl-5 leading-7 text-slate-700 sm:grid-cols-3">
                        <li>IV = 4</li>
                        <li>IX = 9</li>
                        <li>XL = 40</li>
                        <li>XC = 90</li>
                        <li>CD = 400</li>
                        <li>CM = 900</li>
                      </ul>
                    </div>
                    <p className="mt-4 leading-7 text-slate-600">
                      A smaller numeral cannot be placed before just any larger
                      numeral. Only the six pairs shown above are used in
                      standard modern Roman numeral notation.
                    </p>
                    <p className="mt-3 leading-7 text-slate-600">
                      For example, 49 is written as{" "}
                      <strong className="text-slate-900">XLIX</strong>, not IL,
                      and 99 is written as{" "}
                      <strong className="text-slate-900">XCIX</strong>, not IC.
                    </p>
                  </div>

                  {/* Rule 3 */}
                  <div className="rounded-xl border border-slate-200/90 bg-slate-50/50 p-4 sm:p-6">
                    <h3 className="mb-2 text-lg font-bold text-slate-900">
                      3. Repetition rule
                    </h3>
                    <p className="mb-3 leading-7 text-slate-600">
                      In standard modern notation, I, X, C and M can be repeated
                      up to three times consecutively. The symbols V, L and D
                      are not repeated.
                    </p>
                    <div className="rounded-xl border border-slate-200/80 bg-white p-4">
                      <h4 className="mb-2 font-semibold text-slate-900">
                        Examples
                      </h4>
                      <ul className="grid grid-cols-2 gap-x-6 gap-y-1 list-disc pl-5 leading-7 text-slate-700 sm:grid-cols-3">
                        <li>II = 2</li>
                        <li>III = 3</li>
                        <li>XX = 20</li>
                        <li>XXX = 30</li>
                        <li>CCC = 300</li>
                        <li>MMM = 3,000</li>
                      </ul>
                    </div>
                    <p className="mt-3 leading-7 text-slate-600">
                      For the number 4, use IV rather than IIII in standard
                      notation. Some traditional clock faces use IIII as a
                      design convention, but IV is the usual written form.
                    </p>
                  </div>

                  {/* Rule 4 */}
                  <div className="rounded-xl border border-slate-200/90 bg-slate-50/50 p-4 sm:p-6">
                    <h3 className="mb-2 text-lg font-bold text-slate-900">
                      4. Descending order rule
                    </h3>
                    <p className="mb-3 leading-7 text-slate-600">
                      Roman numeral symbols are generally arranged from larger
                      values to smaller values. The permitted subtractive pairs
                      are the standard exceptions.
                    </p>
                    <div className="rounded-xl border border-slate-200/80 bg-white p-4">
                      <h4 className="mb-2 font-semibold text-slate-900">
                        Examples
                      </h4>
                      <ul className="grid grid-cols-1 gap-x-6 gap-y-1 list-disc pl-5 leading-7 text-slate-700 sm:grid-cols-2">
                        <li>VIII = 5 + 1 + 1 + 1 = 8</li>
                        <li>XVI = 10 + 5 + 1 = 16</li>
                        <li>XXIV = 10 + 10 + 4 = 24</li>
                        <li>LXXV = 50 + 10 + 10 + 5 = 75</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </SectionCard>

              {/* Section 7: Numbers to Roman */}
              <SectionCard>
                <SectionHeading id="numbers-to-roman" eyebrow="Step-by-Step Guide">
                  How to Convert Numbers into Roman Numerals
                </SectionHeading>
                <p className="mb-4 leading-7 text-slate-600">
                  To convert an ordinary number into a Roman numeral, separate
                  it into thousands, hundreds, tens and ones. Convert each part
                  and combine the Roman symbols.
                </p>
                <div className="mb-6 rounded-xl border border-slate-200/80 bg-slate-50 p-4 sm:p-5">
                  <p className="mb-3 font-bold text-slate-800">
                    Steps for conversion
                  </p>
                  <ol className="list-decimal space-y-2 pl-5 leading-7 text-slate-600">
                    <li>Separate the number into its place-value parts.</li>
                    <li>
                      Convert the thousands, hundreds, tens and ones using Roman
                      numeral combinations.
                    </li>
                    <li>
                      Write the resulting symbols from largest value to smallest
                      value.
                    </li>
                  </ol>
                </div>
                <div className="grid gap-4">
                  <ExampleCard
                    step="1"
                    title="Example 1: Convert 47 into a Roman numeral"
                  >
                    <p className="mb-2">Break 47 into 40 + 7.</p>
                    <ul className="list-disc space-y-1 pl-5">
                      <li>40 = XL</li>
                      <li>7 = VII</li>
                    </ul>
                    <p className="mt-2.5">
                      Therefore,{" "}
                      <strong className="text-slate-900">
                        47 = XL + VII = XLVII
                      </strong>
                      .
                    </p>
                  </ExampleCard>

                  <ExampleCard
                    step="2"
                    title="Example 2: Convert 94 into a Roman numeral"
                  >
                    <p className="mb-2">Break 94 into 90 + 4.</p>
                    <ul className="list-disc space-y-1 pl-5">
                      <li>90 = XC</li>
                      <li>4 = IV</li>
                    </ul>
                    <p className="mt-2.5">
                      Therefore,{" "}
                      <strong className="text-slate-900">
                        94 = XC + IV = XCIV
                      </strong>
                      .
                    </p>
                  </ExampleCard>

                  <ExampleCard
                    step="3"
                    title="Example 3: Convert 1987 into a Roman numeral"
                  >
                    <p className="mb-2">
                      Break 1987 into 1,000 + 900 + 80 + 7.
                    </p>
                    <ul className="list-disc space-y-1 pl-5">
                      <li>1,000 = M</li>
                      <li>900 = CM</li>
                      <li>80 = LXXX</li>
                      <li>7 = VII</li>
                    </ul>
                    <p className="mt-2.5">
                      Therefore,{" "}
                      <strong className="text-slate-900">
                        1987 = M + CM + LXXX + VII = MCMLXXXVII
                      </strong>
                      .
                    </p>
                  </ExampleCard>
                </div>
              </SectionCard>

              {/* Section 8: Roman to Numbers */}
              <SectionCard>
                <SectionHeading id="roman-to-numbers" eyebrow="Step-by-Step Guide">
                  How to Convert Roman Numerals into Numbers
                </SectionHeading>
                <p className="mb-4 leading-7 text-slate-600">
                  To convert a Roman numeral into an ordinary number, identify
                  each symbol&apos;s value and apply the subtraction rule where
                  a smaller symbol comes before a larger one. Add the resulting
                  values.
                </p>
                <div className="mb-6 rounded-xl border border-slate-200/80 bg-slate-50 p-4 sm:p-5">
                  <p className="mb-3 font-bold text-slate-800">
                    Steps for conversion
                  </p>
                  <ol className="list-decimal space-y-2 pl-5 leading-7 text-slate-600">
                    <li>Read the Roman numeral from left to right.</li>
                    <li>
                      Compare each symbol with the symbol immediately after it.
                    </li>
                    <li>
                      If the current symbol is smaller than the next symbol,
                      subtract its value.
                    </li>
                    <li>Otherwise, add its value.</li>
                    <li>Continue until all symbols have been evaluated.</li>
                  </ol>
                </div>
                <div className="grid gap-4">
                  <ExampleCard
                    step="1"
                    title="Example 1: Convert XLVII into a number"
                  >
                    <p className="mb-2">Break XLVII into XL + V + I + I.</p>
                    <ul className="list-disc space-y-1 pl-5">
                      <li>XL = 50 - 10 = 40</li>
                      <li>V = 5</li>
                      <li>I = 1</li>
                      <li>I = 1</li>
                    </ul>
                    <p className="mt-2.5">
                      Add the values: 40 + 5 + 1 + 1 = 47.
                    </p>
                    <p className="mt-2">
                      Therefore,{" "}
                      <strong className="text-slate-900">XLVII = 47</strong>.
                    </p>
                  </ExampleCard>

                  <ExampleCard
                    step="2"
                    title="Example 2: Convert MCMXCIV into a number"
                  >
                    <p className="mb-2">Break MCMXCIV into M + CM + XC + IV.</p>
                    <ul className="list-disc space-y-1 pl-5">
                      <li>M = 1,000</li>
                      <li>CM = 900</li>
                      <li>XC = 90</li>
                      <li>IV = 4</li>
                    </ul>
                    <p className="mt-2.5">
                      Add the values: 1,000 + 900 + 90 + 4 = 1,994.
                    </p>
                    <p className="mt-2">
                      Therefore,{" "}
                      <strong className="text-slate-900">
                        MCMXCIV = 1,994
                      </strong>
                      .
                    </p>
                  </ExampleCard>

                  <ExampleCard
                    step="3"
                    title="Example 3: Convert MMXXVI into a number"
                  >
                    <p className="mb-2">Break MMXXVI into MM + XX + VI.</p>
                    <ul className="list-disc space-y-1 pl-5">
                      <li>MM = 2,000</li>
                      <li>XX = 20</li>
                      <li>VI = 6</li>
                    </ul>
                    <p className="mt-2.5">
                      Add the values: 2,000 + 20 + 6 = 2,026.
                    </p>
                    <p className="mt-2">
                      Therefore,{" "}
                      <strong className="text-slate-900">MMXXVI = 2,026</strong>
                      .
                    </p>
                  </ExampleCard>
                </div>
              </SectionCard>

              {/* Section 9: Common Mistakes */}
              <SectionCard>
                <SectionHeading id="mistakes" eyebrow="Avoid Errors">
                  Common Roman Numeral Mistakes
                </SectionHeading>
                <p className="mb-5 leading-7 text-slate-600">
                  Some Roman numerals are often written incorrectly because the
                  subtraction rules are applied too broadly.
                </p>
                <DataTable
                  headers={["Incorrect form", "Correct form", "Number"]}
                  rows={[
                    ["IIII", "IV", "4"],
                    ["IL", "XLIX", "49"],
                    ["IC", "XCIX", "99"],
                    ["VV", "X", "10"],
                    ["LL", "C", "100"],
                    ["DD", "M", "1,000"],
                  ]}
                />
                <p className="mt-5 leading-7 text-slate-600">
                  The important point is that Roman numeral subtraction follows
                  specific permitted pairs. It is not correct to place any
                  smaller symbol before any larger symbol.
                </p>
              </SectionCard>

              {/* Section 10: Practice Questions */}
              <SectionCard>
                <SectionHeading id="practice" eyebrow="Self-Check">
                  Roman Numeral Practice Questions
                </SectionHeading>
                <p className="mb-5 leading-7 text-slate-600">
                  Test your understanding of Roman numeral symbols, rules and
                  conversions.
                </p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-5">
                    <h3 className="mb-3 font-semibold text-slate-900">
                      Convert these Roman numerals into numbers
                    </h3>
                    <ol className="list-decimal space-y-2 pl-5 text-slate-700">
                      <li>XXXVIII</li>
                      <li>XLVIII</li>
                      <li>LXIV</li>
                      <li>XCIV</li>
                      <li>MMX</li>
                    </ol>
                  </div>
                  <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-5">
                    <h3 className="mb-3 font-semibold text-slate-900">
                      Write these numbers in Roman numerals
                    </h3>
                    <ol className="list-decimal space-y-2 pl-5 text-slate-700">
                      <li>14</li>
                      <li>29</li>
                      <li>39</li>
                      <li>64</li>
                      <li>94</li>
                    </ol>
                  </div>
                  <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-5 md:col-span-2">
                    <h3 className="mb-3 font-semibold text-slate-900">
                      Quick knowledge questions
                    </h3>
                    <ol className="grid list-decimal gap-2 pl-5 text-slate-700 sm:grid-cols-2">
                      <li>What is the value of L in Roman numerals?</li>
                      <li>Which Roman numeral represents Class 8?</li>
                      <li>What number does VII represent?</li>
                      <li>What is the value of XLVII?</li>
                      <li>Which symbol represents 1,000?</li>
                    </ol>
                  </div>
                </div>

                <details className="group mt-5 rounded-xl border border-orange-200 bg-orange-50/40 p-4 transition sm:p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-orange-700">
                    <span>Show practice answers</span>
                    <span
                      aria-hidden="true"
                      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-100 text-lg font-bold text-orange-700 transition group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <div className="mt-5 space-y-5 border-t border-orange-200/70 pt-5">
                    <div>
                      <h3 className="mb-2.5 font-semibold text-slate-900">
                        Roman numerals to numbers
                      </h3>
                      <DataTable
                        headers={["Roman numeral", "Number"]}
                        rows={[
                          ["XXXVIII", "38"],
                          ["XLVIII", "48"],
                          ["LXIV", "64"],
                          ["XCIV", "94"],
                          ["MMX", "2,010"],
                        ]}
                      />
                    </div>
                    <div>
                      <h3 className="mb-2.5 font-semibold text-slate-900">
                        Numbers to Roman numerals
                      </h3>
                      <DataTable
                        headers={["Number", "Roman numeral"]}
                        rows={[
                          ["14", "XIV"],
                          ["29", "XXIX"],
                          ["39", "XXXIX"],
                          ["64", "LXIV"],
                          ["94", "XCIV"],
                        ]}
                      />
                    </div>
                    <div className="rounded-xl border border-slate-200/80 bg-white p-4">
                      <h3 className="mb-2 font-semibold text-slate-900">
                        Quick knowledge answers
                      </h3>
                      <ol className="list-decimal space-y-1 pl-5 leading-7 text-slate-700">
                        <li>L = 50.</li>
                        <li>Class 8 = VIII.</li>
                        <li>VII = 7.</li>
                        <li>XLVII = 47.</li>
                        <li>M = 1,000.</li>
                      </ol>
                    </div>
                  </div>
                </details>
              </SectionCard>

              {/* CTA Banner */}
              <section className="rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 via-white to-orange-50/70 p-5 shadow-sm sm:p-7">
                <h2 className="mb-3 text-xl font-bold text-slate-900 sm:text-2xl">
                  Explore More Maths Topics
                </h2>
                <p className="leading-7 text-slate-700">
                  Roman numerals are one part of number systems and school
                  mathematics. Learning number values, arithmetic operations and
                  other mathematical concepts can help students build a stronger
                  foundation.
                </p>
                <p className="mt-3 leading-7 text-slate-700">
                  Explore more{" "}
                  <Link
                    href="/Mathematicstopic"
                    className="font-semibold text-orange-700 underline decoration-orange-300 underline-offset-4 transition hover:text-orange-800 hover:decoration-orange-600"
                  >
                    maths topics
                  </Link>{" "}
                  on Learnosphere to study additional mathematical concepts and
                  improve your understanding step by step.
                </p>
              </section>

              {/* Section 11: FAQs */}
              <SectionCard>
                <SectionHeading id="faqs" eyebrow="Common Questions">
                  Frequently Asked Questions about Roman Numerals
                </SectionHeading>
                <div className="space-y-3">
                  {[
                    [
                      "1. What are Roman numerals?",
                      "Roman numerals are a number system that represents values using seven basic letters: I, V, X, L, C, D and M. These symbols are combined using addition and specific subtraction rules.",
                    ],
                    [
                      "2. What is L in Roman numerals?",
                      "L represents 50 in Roman numerals. For example, LI represents 51, LX represents 60 and LXX represents 70.",
                    ],
                    [
                      "3. What is VIII in numbers?",
                      "VIII represents 8. It is calculated as V + I + I + I, which equals 5 + 1 + 1 + 1 = 8.",
                    ],
                    [
                      "4. What does VII mean, and which class is VII?",
                      "VII represents 7. Therefore, Class VII means Class 7.",
                    ],
                    [
                      "5. What is the Roman numeral for Class 11?",
                      "The Roman numeral for Class 11 is XI.",
                    ],
                    [
                      "6. What is the Roman numeral for Class 12?",
                      "The Roman numeral for Class 12 is XII.",
                    ],
                    [
                      "7. What is XLVII in numbers?",
                      "XLVII represents 47. XL equals 40, and VII equals 7. Adding them gives 47.",
                    ],
                  ].map(([question, answer]) => (
                    <details
                      key={question}
                      className="group rounded-xl border border-slate-200 bg-slate-50/50 p-4 transition hover:border-orange-200 open:border-orange-200 open:bg-white open:shadow-xs"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900">
                        <span>{question}</span>
                        <span
                          aria-hidden="true"
                          className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-100/80 text-lg font-medium text-orange-600 transition group-open:rotate-45 group-open:bg-orange-600 group-open:text-white"
                        >
                          +
                        </span>
                      </summary>
                      <p className="mt-3 border-t border-slate-100 pt-3 pr-2 leading-7 text-slate-600">
                        {answer}
                      </p>
                    </details>
                  ))}
                </div>
              </SectionCard>
            </article>
          </div>
        </div>
      </main>

      <Footer1 />
      <Footer />
    </div>
  );
};

export default Class10;

export const generateMetadata = () => ({
  title: "Roman Numerals 1 to 100: Chart, Rules & Examples | Learnosphere",
  description:
    "Learn Roman numerals with a 1–100 chart, 7 symbols, class 1–12 conversions, rules, L = 50, examples & practice questions with answers.",
  keywords:
    "Roman Numerals, Roman Numbers, Roman Letters, Roman Numerals to Numbers, Subtractive Rule for Roman Numerals, Solved Examples, Practice Questions, FAQs",
});