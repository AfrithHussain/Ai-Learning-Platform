"use client";

import SkeletonCourseCard from "./_components/SkeletonCourseCard";


export default function Loading() {
  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, idx) => (
        <SkeletonCourseCard key={idx} />
      ))}
    </div>
  );
}
