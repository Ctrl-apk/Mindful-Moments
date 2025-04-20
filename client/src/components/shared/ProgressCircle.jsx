import React, { useEffect, useState } from 'react';

const ProgressCircle = ({
  progress,
  size = 256,
  strokeWidth = 16,
  circleColor = "#E0E0E0",
  progressColor = "#6B8E23"
}) => {
  const [offset, setOffset] = useState(0);
  
  // Calculate center position and radius
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  
  // Calculate the circumference of the circle
  const circumference = 2 * Math.PI * radius;
  
  useEffect(() => {
    // Calculate the offset based on the progress
    const progressOffset = ((100 - progress) / 100) * circumference;
    setOffset(progressOffset);
  }, [progress, circumference]);
  
  return (
    <svg
      className="progress-circle"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ transform: 'rotate(-90deg)' }}
    >
      {/* Background circle */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke={circleColor}
        strokeWidth={strokeWidth}
      />
      
      {/* Progress circle */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke={progressColor}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
      />
    </svg>
  );
};

export default ProgressCircle;