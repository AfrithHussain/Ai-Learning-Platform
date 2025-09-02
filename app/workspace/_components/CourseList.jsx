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
      { !courseList || courseList.length === 0  ? (
        <div className="flex flex-col items-center justify-center gap-7 mt-8">
          <Image
            src={"/cartoon-img.png"}
            width={300}
            height={150}
            alt="no-course-added"
          />
          <div className="flex flex-col justify-center items-center">
            <p className="text-lg text-neutral-700">
              Looks like you have not created any course!
            </p>
            <AddCourseDialogBox>
              <Button className={"mt-5"}>
                <Sparkle className="mr-2 h-4 w-4" /> Create your first course
              </Button>
            </AddCourseDialogBox>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseList.map((course) => (
            <CourseCard key={course.cid} course={course}  />
          ))}
        </div>
      )}
    </div>
  );
}

export default CourseList;
