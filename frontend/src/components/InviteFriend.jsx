import React from "react";

const InviteFriend = ({ username }) => {
  const inviteLink = `${window.location.origin}/game?invite=${username}`;

  const shareOnWhatsApp = () => {
    const message = `Hey! Join me in the Globetrotter Challenge. Can you beat my score? Click here: ${inviteLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <button
      className="bg-green-500 text-white p-2 rounded-lg mt-4"
      // onClick={shareOnWhatsApp}
    >
      Challenge a Friend
    </button>
  );
};

export default InviteFriend;
