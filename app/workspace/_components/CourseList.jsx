"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import AddCourseDialogBox from "./AddCourseDialogBox";
import { Sparkle } from "lucide-react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import CourseCard from "./CourseCard";

function CourseList() {
  const [courseList, setCourseList] = useState([]);
  const { user, isLoaded } = useUser();

  useEffect(() => {
    // Fetch courses only when the user's status is known and they exist.
    if (isLoaded && user) {
      getCourseContent();
    }
  }, [isLoaded, user]);

  const getCourseContent = async () => {
    try {
      const result = await axios.get("/api/get-course");
      setCourseList(result.data);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  };

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">All Courses</h1>
        {/* You can add a creation button here if needed */}
      </div>

      {courseList.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg font-medium">No courses available yet</p>
          <p className="text-sm">Check back soon for new content!</p>
        </div>
      ) : (
        // This container now uses flex-wrap for a responsive grid.
        <div className="flex flex-wrap gap-6 mt-8">
          {courseList.map((course) => (
            <CourseCard key={course.cid} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CourseList;
