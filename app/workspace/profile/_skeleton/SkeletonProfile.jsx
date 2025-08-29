// app/workspace/_skeleton/SkeletonProfile.jsx
import React from "react";

function SkeletonProfile() {
  return (
    <div className="animate-pulse space-y-4 p-6 border rounded-xl shadow-md">
      {/* Avatar */}
      <div className="h-20 w-20 bg-gray-300 rounded-full mb-4"></div>

      {/* Name & Email */}
      <div className="h-5 w-40 bg-gray-300 rounded"></div>
      <div className="h-4 w-64 bg-gray-300 rounded"></div>

      {/* Divider */}
      <div className="h-px w-full bg-gray-200 my-4"></div>

      {/* Form Fields */}
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-10 w-full bg-gray-300 rounded"></div>
        ))}
      </div>

      {/* Save button */}
      <div className="h-10 w-28 bg-gray-300 rounded mt-6"></div>
    </div>
  );
}

export default SkeletonProfile;
