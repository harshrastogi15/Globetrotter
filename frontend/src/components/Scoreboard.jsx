import React from "react";

const Scoreboard = ({ score }) => {
  return (
    <div className="text-center mt-4">
      <p className="text-lg text-black font-bold">Score</p>
      <p className="text-green-600">✅ Correct: {score.correct}</p>
      <p className="text-red-600">❌ Incorrect: {score.incorrect}</p>
    </div>
  );
};

export default Scoreboard;
