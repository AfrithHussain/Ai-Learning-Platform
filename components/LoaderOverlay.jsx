// components/ui/LoaderOverlay.jsx
"use client";
import React, { useEffect } from "react";
import { useTheme } from "next-themes"; // 1. Import useTheme

const LoaderOverlay = ({ isLoading }) => {
  const { theme } = useTheme(); // 2. Get the current theme

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLoading]);

  if (!isLoading) {
    return null;
  }

  return (
    // 3. Conditionally set the background based on the theme
    <div
      className={`fixed inset-0 flex justify-center items-center z-[99999] gap-4 ${
        theme === "dark"
          ? "bg-[rgba(0,0,0,0.79)]"
          // In light mode, use a semi-transparent white background
          : "bg-[rgba(255,255,255,0.66)]"
      }`}
    >
      {/* 4. Conditionally set the text color for contrast */}
      <p
        className={`font-semibold text-lg ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
      >
        Please wait
      </p>

      <div
        className="leap-frog"
        // 5. Conditionally set the loader dot color via CSS variable
        style={{
          '--uib-color': theme === 'dark' ? 'rgb(246, 246, 255)' : 'rgb(28, 28, 28)'
        }}
      >
        <div className="leap-frog__dot"></div>
        <div className="leap-frog__dot"></div>
        <div className="leap-frog__dot"></div>
      </div>
    </div>
  );
};

export default LoaderOverlay;