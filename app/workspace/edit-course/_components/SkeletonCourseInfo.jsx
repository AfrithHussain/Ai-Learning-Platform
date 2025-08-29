// app/workspace/_skeleton/SkeletonCourseInfo.jsx
import React from "react";

function SkeletonCourseInfo() {
  return (
    <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:shadow lg:p-8 animate-pulse">
      <div className="flex flex-col gap-6 w-full">
        <div className="h-6 w-40 bg-gray-300 rounded"></div>
        <div className="h-4 w-3/4 bg-gray-300 rounded"></div>

        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 text-sm">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center gap-3 border shadow p-4 rounded-md w-full sm:w-[48%] lg:w-auto"
            >
              <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
              <div className="flex flex-col gap-2">
                <div className="h-3 w-20 bg-gray-300 rounded"></div>
                <div className="h-3 w-16 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-10 w-40 bg-gray-300 rounded"></div>
      </div>

      <div className="w-full lg:w-1/2">
        <div className="w-full h-60 sm:h-72 bg-gray-300 rounded-md"></div>
      </div>
    </div>
  );
}

export default SkeletonCourseInfo;
