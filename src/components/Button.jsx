import React from 'react'

const Button = ({ children, onClick, className , type = "button" }) => {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`cursor-pointer ${className}`}
      >
        {children}
      </button>
    );
  };
  
  export default Button;
  