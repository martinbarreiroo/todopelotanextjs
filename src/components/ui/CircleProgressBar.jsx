import React from 'react';

const CircleProgressBar = ({ ratio }) => {
  const circumference = 2 * Math.PI * 50;
  const strokeDashoffset = circumference - (circumference * ratio);
  const percentage = Math.round(ratio * 100);

  return (
    <svg viewBox="0 0 120 120">
      <circle cx="60" cy="60" r="50" stroke="#ddd" strokeWidth="20" fill="transparent" />
      <circle 
        cx="60" 
        cy="60" 
        r="50" 
        stroke="#0D8500" 
        strokeWidth="20" 
        fill="transparent" 
        strokeDasharray={circumference} 
        strokeDashoffset={strokeDashoffset} 
      />
      <text x="60" y="60" textAnchor="middle" fill="#0D8500" dy=".3em" fontSize="20">{percentage}%</text>
    </svg>
  );
};

export { CircleProgressBar };