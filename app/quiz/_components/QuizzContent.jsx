"use client";

import React, { useState } from "react";

function QuizzContent({ quizzId, quizData }) {
  const [answers, setAnswers] = useState({}); // store selected answers

  // Filter quizData for this quizzId
  const filterQuizzData = quizData.filter((data) => data.id == quizzId);
  const quiz = filterQuizzData[0]; // get the first (and only) quiz object
  console.log(quiz);

  if (!quiz) return <div>No quiz found.</div>;

  const handleSelect = (questionIndex, optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };

  const handleSubmit = () => {
    console.log("Selected answers:", answers);
    alert("Quiz submitted! Check console for selected answers.");
  };

  return (
    <div className="px-4 sm:px-10 md:px-20 lg:px-40 py-10 flex justify-center">
      <div className="w-full max-w-4xl flex flex-col gap-8">
        {/* Quiz Title */}
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold tracking-tight">{quiz.quizTitle}</h1>
          <p className="text-neutral-400 text-lg">Test your knowledge on this course.</p>
        </div>

        {/* Questions */}
        <div className="flex flex-col gap-12">
          {quiz.questions.map((q, index) => (
            <div key={index} className="flex flex-col gap-6 bg-[#1a1a2e] rounded-xl p-6">
              <h2 className="text-lg font-bold">
                {index + 1}. {q.question}
              </h2>
              <div className="flex flex-col gap-4">
                {q.options.map((option, oIndex) => (
                  <label
                    key={oIndex}
                    className={`flex items-center gap-4 rounded-md border p-4 cursor-pointer hover:bg-[#292938] transition-colors ${
                      answers[index] === oIndex
                        ? "bg-[#1a1a2e] border-[var(--primary-color)] ring-2 ring-[var(--primary-color)]"
                        : "border-[#3c3c53]"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`quiz-q${index}`}
                      checked={answers[index] === oIndex}
                      onChange={() => handleSelect(index, oIndex)}
                      className="h-5 w-5 border-2 border-[#3c3c53] bg-transparent text-[var(--primary-color)] focus:outline-none focus:ring-0"
                    />
                    <span className="text-neutral-200 text-sm">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              onClick={handleSubmit}
              className="px-6 h-12 rounded-md bg-[var(--primary-color)] text-white font-bold hover:bg-indigo-500 transition-colors"
            >
              Submit Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizzContent;
