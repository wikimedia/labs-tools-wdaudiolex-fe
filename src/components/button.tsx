import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {  
  return (  
    <button  
      className="px-3 py-2 bg-wikimedia-wikiblue text-white rounded-md hover:bg-wikimedia-lightblue focus:outline-none focus:ring-2 focus:ring-blue-500"  
      onClick={onClick}  
    >  
      {label}  
    </button>  
  );  
};  

export default Button;
