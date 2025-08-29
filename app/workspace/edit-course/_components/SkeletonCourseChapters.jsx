// app/workspace/_skeleton/SkeletonCourseChapters.jsx
import React from "react";

function SkeletonCourseChapters() {
  return (
    <div className="flex flex-col gap-4 mt-8 animate-pulse">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-12 bg-gray-300 rounded"></div>
      ))}
    </div>
  );
}

export default SkeletonCourseChapters;
