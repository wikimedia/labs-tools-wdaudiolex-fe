import React from "react";
import MuiButton from "@mui/material/Button";

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <MuiButton
      variant="contained"
      color="primary"
      onClick={onClick}
      sx={{
        px: 3,
        py: 2,
        backgroundColor: "#36c",
        "&:hover": { backgroundColor: "#4d9" },
        "&:focus": {
          outline: "none",
          ring: 2,
          ringColor: "#0056b3",
        },
      }}
    >
      {label}
    </MuiButton>
  );
};

export default Button;
button {
  background-color: var(--primary-color);
  color: var(--background-color);
}
