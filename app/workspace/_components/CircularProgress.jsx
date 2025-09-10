"use client";
import * as React from "react";

function CircularProgress({
  value = 0,
  size = 100,
  strokeWidth = 10,
  className = "",
  completedCourses = 0,
  totalCourses = 0
}) {
  const radius = (size - strokeWidth) / 2.6;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(Math.max(value, 0), 100);

  // Main blue color and lighter variant for empty progress
  const mainColor = "#114f65";
  const liteColor = "#cce6f0"; // lighter blue for zero progress

  return (
    <svg
      className={className}
      width={size}
      height={size}
    >
      {/* Background Circle */}
      <circle
        stroke="#e5e7eb"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />

      {/* Progress Indicator */}
      <circle
        stroke={progress === 0 ? liteColor : mainColor} // <-- lighter if no progress
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        r={radius}
        cx={size / 2}
        cy={size / 2}
        strokeDasharray={circumference}
        strokeDashoffset={circumference - (progress / 100) * circumference}
        style={{ transition: "stroke-dashoffset 0.3s ease, stroke 0.3s ease" }}
      />

      {/* Big Completed / Total Text */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill={mainColor}
      >
        <tspan fontSize="1.8rem" fontWeight="bold">{completedCourses}</tspan>
        <tspan fontSize="1rem"> / {totalCourses}</tspan>
      </text>
    </svg>
  );
}

export { CircularProgress };
