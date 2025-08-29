"use client";
import { Skeleton } from "@/components/ui/skeleton";

function SkeletonCourseCard() {
  return (
    <div className="border rounded-lg w-80 p-4 flex flex-col h-full ">
      {/* --- Image Skeleton --- */}
      <Skeleton className="w-full aspect-video rounded-md " />

      {/* --- Title Skeleton --- */}
      <div className="flex flex-col flex-grow mt-4 space-y-2">
        <Skeleton className=" h-5 w-3/4" />
        <Skeleton className=" h-4 w-full" />
        <Skeleton className=" h-4 w-5/6" />
      </div>

      {/* --- Footer Skeleton --- */}
      <div className="flex items-center justify-between mt-4">
        <Skeleton className="h-6 w-20 rounded-md " />
        <Skeleton className="h-8 w-28 rounded-md " />
      </div>
    </div>
  );
}

export default SkeletonCourseCard;
