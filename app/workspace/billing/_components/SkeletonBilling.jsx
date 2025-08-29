// app/workspace/_skeleton/SkeletonBilling.jsx
import React from "react";

function SkeletonBilling() {
  return (
    <div className="animate-pulse space-y-4">
      {/* Fake rows for pricing cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-between p-6 border rounded-xl shadow-md"
          >
            {/* Title */}
            <div className="h-6 w-24 bg-gray-300 rounded mb-4"></div>
            {/* Price */}
            <div className="h-8 w-32 bg-gray-300 rounded mb-6"></div>
            {/* Features */}
            <div className="space-y-2 w-full">
              {[1, 2, 3, 4].map((f) => (
                <div
                  key={f}
                  className="h-3 w-full bg-gray-300 rounded"
                ></div>
              ))}
            </div>
            {/* Button */}
            <div className="h-10 w-28 bg-gray-300 rounded mt-6"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkeletonBilling;
