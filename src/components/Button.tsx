import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
const Button: React.FC<ButtonProps> = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`bg-cerulean text-white font-medium py-2 px-4 rounded hover:bg-cerulean-dark disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;