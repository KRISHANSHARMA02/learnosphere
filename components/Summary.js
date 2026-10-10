import Link from "next/link";
import React from "react";
import { FaHandPointRight } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const Summary = ({ results }) => {
  const totalScore = results.reduce((sum, item) => {
    return sum + (item.selectedOption === item.correctAnswer ? 1 : 0);
  }, 0);

  return (
    <div className="w-full flex flex-col md:flex-row relative gap-5 h-screen justify-between p-2">
      <div className="flex flex-col items-center justify-center gap-2 w-full md:w-[45vw]">
        <p className="text-center p-4 text-orange-600 font-extrabold text-[1.4em] md:text-[1.6em] lh:text-[2.5em]">
          Total Score:{" "}
          <b className="bg-orange-600 text-white p-4 rounded-lg">
            {totalScore} / {results.length}
          </b>
        </p>
        <span className="ml-4 text-[2em]">{totalScore < 6 ? "😔" : "😊"}</span>
        <span className="text-center">
          {totalScore < 5
            ? "Don't give up! Reattempt this quiz and explore Learnosphere's Learning Dashboard to improve your skills."
            : totalScore >= 5 && totalScore <= 8
            ? "Good job! You're doing well, but there's room for improvement. Keep learning on the Learnosphere platform to reach new heights"
            : "Excellent performance! Keep up the great work and continue exploring Learnosphere for even more knowledge."}
        </span>
        <span className="pt-8 flex gap-4 justify-center items-center">
          <FaHandPointRight
            size={40}
            className="text-orange-600 animate-bounce"
          />

          <Link
            href="https://learning.learnosphere.in"
            target="_blank"
            className="text-white bg-orange-600 rounded-lg font-bold p-4 text-center "
          >
            Reattempt Quiz
          </Link>
        </span>
      </div>
      <div className="mb-4 w-full md:w-[50vw]   bg-gray-50 overflow-auto scrollbar-hide">
        <h3 className="font-bold text-center text-[1.2em] md:text-[1.4em] p-3">
          Summary of Your Answers:
        </h3>
        <Link href="/Online-Quiz">
          <RxCross2 size={20} className="absolute right-5 top-5" />
        </Link>
        <div className="">
          <table className="table-auto overflow-x-auto border-collapse border border-gray-300 w-full text-center">
            <thead className="bg-orange-500 text-white ">
              <tr>
                <th className="w-1/3 px-4 py-2 border border-gray-300">
                  Questions
                </th>
                <th className="w-1/3 px-4 py-2 border border-gray-300">
                  Selected Options
                </th>
                {totalScore > 5 && (
                  <th className="w-1/3 px-4 py-2 border border-gray-300">
                    Correct Answer
                  </th>
                )}
                <th className="w-1/3 px-4 py-2 border border-gray-300">
                  Score
                </th>
              </tr>
            </thead>
            <tbody>
              {results.map((item, index) => {
                const selectedOptionClass =
                  item.selectedOption === item.correctAnswer
                    ? "text-green-500" // Correct answer
                    : "text-red-500"; // Incorrect answer

                const score =
                  item.selectedOption === item.correctAnswer ? 1 : 0;

                return (
                  <tr key={index} className="border-t border-gray-300">
                    <td className="px-4 py-2 border-r border-gray-300">
                      <p>
                        <strong>{index + 1}:</strong> {item.question}
                      </p>
                    </td>
                    <td className="px-4 py-2 border-r border-gray-300">
                      <p>
                        <span className={selectedOptionClass}>
                          {item.selectedOption}
                        </span>
                      </p>
                    </td>
                    {totalScore > 5 && (
                      <td className="px-4 py-2 border-r border-gray-300">
                        <p>
                          <span className="text-blue-500">
                            {item.correctAnswer}
                          </span>
                        </p>
                      </td>
                    )}
                    <td className="px-4 py-2">
                      <p>
                        <span className="">{score}</span>
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Summary;
