"use client";

import SkeletonCourseCard from "../explore-courses/_components/SkeletonCourseCard";


export default function Loading() {
  return (
    <div className="flex flex-wrap gap-6 mt-8">
      {[...Array(1)].map((_, idx) => (
        <SkeletonCourseCard key={idx} />
      ))}
    </div>
  );
}
