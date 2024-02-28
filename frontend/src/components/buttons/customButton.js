// src/components/buttons/customButton.js
import React from 'react';

const AddButton = ({ onClick, children, className, color = 'indigo' }) => {

  const colorClasses = {
    indigo: 'bg-indigo-500 hover:bg-indigo-600',
    red: 'bg-red-500 hover:bg-red-600',
    // Add more colors as needed
  };

  const bgColorClass = colorClasses[color] || colorClasses.indigo;

  return (
    <button
      className={`${bgColorClass} text-white font-bold py-2 px-4 rounded ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default AddButton;
