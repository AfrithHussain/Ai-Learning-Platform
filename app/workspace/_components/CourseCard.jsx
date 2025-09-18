"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, Database, Settings, ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function CourseCard({ course }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { name, description, level } = course.courseJson.course;

  const enrollCourseHandler = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/enroll-course", {
        courseId: course?.cid,
      });
      if(result.data.resp === "Course Limit Reached"){
        toast.info("Course Limit Reached");

        router.replace("/workspace/billing")
      }
     else if (result.data.res) {
        toast.info("Course already enrolled. Redirecting...");
         router.replace("/workspace");
      } else {
        toast.success("Course enrolled successfully!");
         router.replace("/workspace");
      }
     

    } catch (e) {
      toast.error("An error occurred. Please try again.");
      console.log(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      // This card uses the same responsive classes as the EnrolledCourseCard for consistency.
      className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-lg overflow-hidden flex flex-col h-full group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full md:w-auto flex-grow md:basis-[300px] md:max-w-[340px]"
    >
      {/* --- Image Section --- */}
      <div className="relative w-full aspect-video bg-gray-50 dark:bg-neutral-800 flex items-center justify-center">
        {course.imagePrompt ? (
          <Image
            src={course.imagePrompt}
            alt={`${name} course cover`}
            fill
            className="rounded-t-md object-cover"
            sizes="(max-width: 768px) 100vw, 340px"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-400 dark:text-neutral-500">
            <ImageIcon className="h-10 w-10" />
            <p className="text-sm font-medium">No Image Available</p>
          </div>
        )}
      </div>

      {/* --- Content Section --- */}
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg font-bold truncate">{name}</h2>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {description}
        </p>

        {/* This spacer pushes the footer to the bottom */}
        <div className="flex-grow" />

        {/* --- Footer Section --- */}
        <div className="flex items-center justify-between mt-4">
          <Badge variant="outline" className="flex items-center gap-1">
            <Database className="h-3.5 w-3.5" />
            {level}
          </Badge>

          {course?.courseDataContent?.length ? (
            <Button
              disabled={loading}
              onClick={enrollCourseHandler}
              size="sm"
              className={'cursor-pointer'}
            >
              <PlayCircle className="h-4 w-4 mr-2" />
              Enroll Course
            </Button>
          ) : (
            <Link href={`/workspace/edit-course/${course?.cid}`}>
              <Button size="sm" variant="outline" className={'cursor-pointer'}>
                <Settings className="h-4 w-4 mr-2" />
                Generate Course
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(CourseCard);
