"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import AddCourseDialogBox from "./AddCourseDialogBox";
import { Sparkle } from "lucide-react"; // Removed unused 'Sparkles'
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import CourseCard from "./CourseCard";


function CourseList() {
  const [courseList, setCourseList] = useState([]);
  

  // ✅ FIX 1: Destructure 'user' and 'isLoaded' from the hook
  const { user, isLoaded } = useUser();

  useEffect(() => {
    // ✅ FIX 3: Check if the user is fully loaded AND exists before fetching
    if (isLoaded && user) {
      getCourseContent();
    }
    // ✅ FIX 2: Change the dependency from [user] to the stable [isLoaded]
  }, [isLoaded, user]); // Depend on both to refetch if the user logs out/in

  const getCourseContent = async () => {
    try {
      const result = await axios.get("/api/get-course");
      setCourseList(result.data);
      console.log(result.data);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
      
    }
  };

  

  return (
    <div className="mt-10">
      <h1 className="text-2xl font-semibold">CourseList</h1>

      {/* This logic remains the same */}
      {  courseList.length === 0  ? (
       <div className="text-center py-12 text-muted-foreground">
        <p className="text-lg font-medium">No courses available</p>
        <p className="text-sm">Once you enroll in a course, it will appear here.</p>
      </div>
      ) : (
        <div className="mt-8 flex justify-start gap-10 items-center">
          {courseList.map((course) => (
            <CourseCard key={course.cid} course={course}  />
          ))}
        </div>
      )}
    </div>
  );
}

export default CourseList;
