import React, { useState, useEffect } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
const UsernameModal = ({ score, setStatusUserName }) => {
    const [username, setUsername] = useState("");
    const [isOpen, setIsOpen] = useState(true);
    const [message, setMessage] = useState(null);
    const [inviteLink, setInviteLink] = useState(null);

    const handleSubmit = async () => {
        if (username.trim()) {
            try {
                const response = await axios.post(`${API_URL}/user/register`, {
                    username, score
                });
                if (response.status == 200 && response.data.message === "user created successfully") {
                    setInviteLink(`${window.location.origin}/invite?username=${username}`)
                    setMessage({ status: 1, message: "We are generating link for you" });
                }
            } catch (error) {
                setMessage({ status: 0, message: error.response.data.message });
            }
        }
    };

    const copyToClipboard = async () => {
        try {
          await navigator.clipboard.writeText(inviteLink);
          alert("Invite link copied to clipboard! 📋");
        } catch (err) {
          console.error("Failed to copy: ", err);
        }
      };

    return isOpen ? (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex flex-col items-center justify-center">
            <h2 className="text-xl text-white font-bold mb-4 text-black">Want to refer your friend?</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
                <h2 className="text-xl font-bold mb-4 text-black">Enter Your Username</h2>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full text-black p-2 border rounded-lg"
                    placeholder="Enter username"
                />
                {message && <p className={`${message.status ? "text-green-400" : "text-red-400"}`}>{message.message}</p>}
                <button
                    onClick={handleSubmit}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    Refer friend
                </button>
            </div>

            {message && message.status &&<div className="mt-4 p-3 bg-gray-200 rounded-lg flex items-center justify-between">
                <input
                    type="text"
                    value={inviteLink}
                    readOnly
                    className="w-full bg-transparent text-gray-800 outline-none"
                />
                <button
                    onClick={copyToClipboard}
                    className="ml-2 bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition"
                >
                    Copy 📋
                </button>
            </div>}


            <button className="mt-4 bg-white-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition" onClick={() => { setStatusUserName(false) }}>
                Back to game
            </button>
        </div>
    ) : null;
};

export default UsernameModal;
