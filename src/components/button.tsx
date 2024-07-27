import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      className=" hover:text-white hover:bg-black bg-white animate-bounce text-black  font-bold py-2 px-4 rounded-2xl  transition duration-300"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
