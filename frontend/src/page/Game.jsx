import React, { useState, useEffect } from "react";
import axios from "axios";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import QuestionCard from "../components/QuestionCard";
import Scoreboard from "../components/Scoreboard";
import ConfettiEffect from "../components/ConfettiEffect";
import InviteFriend from "../components/InviteFriend";
import UsernameModal from "../components/UserNameModel";

const API_URL = import.meta.env.VITE_API_URL;

const Game = () => {
  const { width, height } = useWindowSize();
  const [question, setQuestion] = useState(null);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [feedback, setFeedback] = useState(null);
  const [funFact, setFunFact] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [username, setStatusUserName] = useState(false);

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    const response = await axios.get(`${API_URL}/question`);
    setQuestion(response.data.question);
    setFeedback(null);
    setFunFact(null);
    setSelectedAnswer(null);
    setCorrectAnswer(null);
  };

  const handleAnswer = async (answer) => {
    const response = await axios.post(`${API_URL}/answer`, {
      questionId: question.questionId,
      answer,
    });
    setSelectedAnswer(answer);
    setCorrectAnswer(response.data.response.answer);
    setFeedback(response.data.response.result);
    setFunFact(response.data.response.fact);
    setScore((prev) => ({
      correct: prev.correct + (response.data.response.result ? 1 : 0),
      incorrect: prev.incorrect + (!response.data.response.result ? 1 : 0),
    }));

    if (response.data.isCorrect) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4 m-2">
      <ConfettiEffect show={feedback} />
      {username && <UsernameModal score={score} setStatusUserName = {setStatusUserName}/>}
      <div className="flex justify-between w-full p-2">
        <Scoreboard score={score} />
        <button
          className="bg-green-500 text-white p-2 rounded-lg mt-4 h-12"
        onClick={ ()=> setStatusUserName(true)}
        >
          Challenge a Friend
        </button>
      </div>
      {question && <QuestionCard key={selectedAnswer} question={question} submitAnswer={handleAnswer} selectedAnswer={selectedAnswer} correctAnswer={correctAnswer} />}
      {feedback !== null && (
        <p className={`text-lg font-bold ${feedback ? "text-green-500" : "text-red-500"}`}>
          {feedback ? "🎉 Correct!" : "😢 Incorrect!"}
        </p>
      )}

      {funFact &&
        <div>
          <p className="text-gray-600 mt-2">Fun Fact: {funFact[0]}</p>
          <p className="text-gray-600 mt-2">Fun Fact: {funFact[1]}</p>
        </div>
      }
      <button className="bg-blue-500 text-white p-2 rounded-lg mt-4" onClick={fetchQuestion}>
        Play Again
      </button>
    </div>
  );
};

export default Game;
