import React from 'react';  

interface ButtonProps {  
  label: string;  
  onClick: () => void;  
}  

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {  
  return (  
    <button  
      className=" bg-white text-black  font-bold py-2 px-4 transition duration-200"  
      onClick={onClick}  
    >  
      {label}  
    </button>  
  );  
};  

export default Button;

