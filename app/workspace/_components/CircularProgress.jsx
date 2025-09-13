// Your CircularProgress.jsx file

"use client";
import * as React from "react";
import { useTheme } from "next-themes";
import { useMediaQuery } from "@/hooks/use-media-query"; // Adjust the import path

export function CircularProgress({
  value = 0,
  size = 100,
  strokeWidth = 10,
  className = "",
  completedCourses = 0,
  totalCourses = 0,
}) {
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // --- CHANGE 1: Use the media query hook ---
  // Tailwind's default 'xl' breakpoint is 1280px.
  const isXlScreen = useMediaQuery('(min-width: 1280px)');

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // --- CHANGE 2: Apply the conditional logic for the radius ---
  const radius = isXlScreen
    ? (size - strokeWidth) / 2       // Formula for XL screens
    : (size - strokeWidth) / 2.6;    // Original formula for screens smaller than XL

  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(Math.max(value, 0), 100);

  // ... the rest of your component remains the same
  if (!mounted) {
    return null;
  }

  const isDark = theme === "dark";
  const mainColor = isDark ? "#ffffff" : "#114f65";
  const liteColor = isDark ? "#2c2f33" : "#cce6f0";
  const backgroundStroke = isDark ? "#555" : "#e5e7eb";

  return (
    <svg className={className} width={size} height={size}>
      {/* Background Circle */}
      <circle
        stroke={backgroundStroke}
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius} // The radius will now be dynamic
        cx={size / 2}
        cy={size / 2}
      />

      {/* Progress Indicator */}
      <circle
        stroke={progress === 0 ? liteColor : mainColor}
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        r={radius} // The radius will now be dynamic
        cx={size / 2}
        cy={size / 2}
        strokeDasharray={circumference}
        strokeDashoffset={circumference - (progress / 100) * circumference}
        style={{ transition: "stroke-dashoffset 0.3s ease, stroke 0.3s ease, r 0.3s ease" }}
      />

      {/* Completed / Total Text */}
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