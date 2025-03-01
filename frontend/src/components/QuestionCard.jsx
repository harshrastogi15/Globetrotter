import React from "react";

const QuestionCard = ({ question, selectedAnswer, submitAnswer, correctAnswer }) => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Guess the Destination</h3>

      {/* Clues */}
      <ul className="list-none text-left list-inside text-gray-700 mb-4">
        {question.clues.map((clue, index) => (
          <li key={index} className="mb-1">🔍 {clue}</li>
        ))}
      </ul>

      <div className="grid grid-cols-2 gap-4 mt-4">
        {question.options.map((option, index) => {
          const isCorrect = selectedAnswer && option.city === correctAnswer.city; // Correct answer
          const isWrong = selectedAnswer && selectedAnswer.city === option.city // Wrong answer

          return (
            <p
              key={index}
              className={`p-3 rounded-lg cursor-pointer text-white border border-gray-300 transition ${
                selectedAnswer
                  ? isCorrect
                    ? "bg-green-500 text-white"
                    : isWrong
                    ? "bg-red-500 text-white"
                    : "bg-gray-500"
                  : "bg-gray-800 hover:bg-blue-500 hover:text-white"
              }`}
              onClick={() => !selectedAnswer && submitAnswer(option)}
            >
              {option.city}, {option.country}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
