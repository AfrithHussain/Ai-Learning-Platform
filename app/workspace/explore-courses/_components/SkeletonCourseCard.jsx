"use client";
import { Skeleton } from "@/components/ui/skeleton";

function SkeletonCourseCard() {
  return (
    <div
      // This now uses the same responsive classes as the actual CourseCard
      className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-lg overflow-hidden flex flex-col h-full w-full md:w-auto flex-grow md:basis-[300px] md:max-w-[340px]"
    >
      {/* Image Skeleton */}
      <Skeleton className="w-full aspect-video rounded-b-none" />

      {/* Content Skeleton */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        {/* This spacer pushes the footer to the bottom */}
        <div className="flex-grow" />

        {/* Footer Skeleton */}
        <div className="flex items-center justify-between mt-4">
          <Skeleton className="h-6 w-20 rounded-md" />
          <Skeleton className="h-9 w-28 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export default SkeletonCourseCard;
