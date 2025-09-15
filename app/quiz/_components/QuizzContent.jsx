"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { ConfettiButton } from "@/components/magicui/confetti";

function QuizzContent({ quizzId, quizData }) {
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const submitButtonRef = React.useRef(null); // Ref to submit button

  const filterQuizzData = quizData.filter((data) => data.id == quizzId);
  const quiz = filterQuizzData[0];

  if (!quiz) return <div>No quiz found.</div>;

  const handleSelect = (questionIndex, optionIndex) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };

  const handleSubmit = () => {
    let correctCount = 0;

    quiz.questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswerIndex) correctCount++;
    });

    setScore(correctCount);
    setIsSubmitted(true);
  };

  const handleRetake = () => {
    setAnswers({});
    setIsSubmitted(false);
    setScore(0);
  };

  const isAllAnswered = quiz.questions.length === Object.keys(answers).length;

  return (
    <div className="text-neutral-200 min-h-screen transition-colors">
      <div className="px-4 sm:px-10 md:px-20 lg:px-40 py-7 flex flex-col items-center gap-6">

        {/* Quiz Header */}
        <div className="flex justify-between items-center w-full">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-200">{quiz.quizTitle.toUpperCase()}</h1>
            <p className="text-neutral-400 text-lg">Test your knowledge on this course.</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-600 h-2 rounded-full my-4">
          <div
            className="bg-green-700 h-2 rounded-full transition-all"
            style={{ width: `${(Object.keys(answers).length / quiz.questions.length) * 100}%` }}
          />
        </div>

        {/* Questions */}
        <div className="flex flex-col gap-12 w-full">
          {quiz.questions.map((q, index) => (
            <div key={index} className="flex flex-col gap-6 bg-[#1a1a2efb] rounded-xl p-6">
              <h2 className="text-lg font-bold">
                {index + 1}. {q.question}
              </h2>

              <div className="flex flex-col gap-4">
                {q.options.map((option, oIndex) => {
                  const isSelected = answers[index] === oIndex;
                  const isCorrect = q.correctAnswerIndex === oIndex;

                  let borderClass = "border-[#3c3c53]";

                  if (isSubmitted) {
                    if (isCorrect) {
                      borderClass = "border-green-700 border-4";
                    } else if (isSelected && !isCorrect) {
                      borderClass = "border-red-700 border-4";
                    }
                  } else if (isSelected) {
                    borderClass = "border-[var(--primary-color)] border-2";
                  }

                  return (
                    <label
                      key={oIndex}
                      className={`flex items-center gap-4 rounded-md border p-4 cursor-pointer transition-colors ${borderClass}`}
                    >
                      <input
                        type="radio"
                        name={`quiz-q${index}`}
                        checked={isSelected}
                        onChange={() => handleSelect(index, oIndex)}
                        disabled={isSubmitted}
                        className="h-5 w-5 border-2 bg-transparent text-[var(--primary-color)] focus:outline-none focus:ring-0"
                      />
                      <span className="text-neutral-200 text-sm font-semibold">{option}</span>
                      {isSubmitted && (
                        <span className="ml-2">
                          {isCorrect ? (
                            <span className="text-green-300">✔️</span>
                          ) : isSelected && !isCorrect ? (
                            <span className="text-red-300">✖️</span>
                          ) : null}
                        </span>
                      )}
                    </label>
                  );
                })}

                {isSubmitted && q.explanation && (
                  <p className="mt-2 text-neutral-300 italic text-sm bg-[#2a2a3a] p-3 rounded">
                    💡 {q.explanation}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Score Display */}
        {isSubmitted && (
          <div className="text-xl font-bold text-green-400 mt-6">
            🎉 You answered {score} out of {quiz.questions.length} questions correctly!
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-6 w-full">
          {!isSubmitted ? (
            <ConfettiButton
              ref={submitButtonRef}
              onClick={handleSubmit}
              disabled={!isAllAnswered}
              className={`px-6 h-12 rounded-md ${isAllAnswered ? 'bg-[#1a1a2e]' : 'bg-gray-700 cursor-not-allowed'} hover:bg-[#262643] cursor-pointer text-white`}
            >
              Submit Quiz
            </ConfettiButton>
          ) : (
            <Button
              onClick={handleRetake}
              className="px-6 h-12 rounded-md bg-[#1a1a2e] cursor-pointer text-white hover:bg-[#262643]"
            >
              Retake Quiz
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuizzContent;
