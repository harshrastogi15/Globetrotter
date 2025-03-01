import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
// import UsernameModal from "@/components/UsernameModal";

const InvitePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const inviterUsername = searchParams.get("username");
  const [inviterScore, setInviterScore] = useState(null);
  const [username, setUsername] = useState(localStorage.getItem("username") || "");

  useEffect(() => {
    if (inviterUsername) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/user/getscore?username=${inviterUsername}`)
        .then((res) => setInviterScore(res.data.response.score))
        .catch((err) => console.error("Error fetching inviter's score:", err));
    }
  }, [inviterUsername]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {username && (
        <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold">Welcome, {username}! 🎉</h2>

          {inviterScore ? (
            <div className="mt-4 p-4 bg-yellow-100 text-yellow-800 rounded-lg">
              <h3 className="text-xl font-semibold">Invited by {inviterUsername}</h3>
              <p>🏆 Correct: {inviterScore.correct}</p>
              <p>❌ Incorrect: {inviterScore.incorrect}</p>
            </div>
          ) : (
            <p className="text-gray-600 mt-4">Loading inviter's score...</p>
          )}

          {/* Start Playing Button */}
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Start Playing! 🚀
          </button>
        </div>
      )}
    </div>
  );
};

export default InvitePage;
