// import { PencilIcon } from "lucide-react";
import { PencilIcon } from "@heroicons/react/24/outline";

import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
  border?: boolean
}

const Button: React.FC<ButtonProps> = ({ label, border, onClick }) => {  
  const bgColor = border ? "white" : "wikimedia-wikiblue";
  const textColor = border ? "wikimedia-wikiblue" : "white";

  return (
    <button
      className={`px-4 py-2 flex items-center gap-2 border  border-wikimedia-wikiblue bg-${bgColor} text-${textColor} rounded-sm`}
      onClick={onClick}
    >
      {label}
      {border && <PencilIcon className="w-3.5 h-3.5" />}
    </button>
  );  
};  

export default Button;
