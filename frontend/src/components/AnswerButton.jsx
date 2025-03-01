import React from "react";

const AnswerButton = ({ option, onClick }) => {
  return (
    <button
      className="p-3 bg-gray-200 hover:bg-blue-500 hover:text-white rounded-lg transition duration-300"
      onClick={onClick}
    >
      {option.city} {option.country}
    </button>
  );
};

export default AnswerButton;
