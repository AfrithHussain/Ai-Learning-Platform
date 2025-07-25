"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import AddCourseDialogBox from "./AddCourseDialogBox";
import { Sparkle, Sparkles } from "lucide-react";
function CourseList() {
  let [courseList, setCourseList] = useState([]);
  return (
    <div className="mt-10">
      <h1 className="text-2xl font-semibold">CourseList</h1>

      {courseList.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-7 ">
          <Image src={"/cartoon-img.png"} width={300} height={150} alt="no-course-added" />
          <div className="flex flex-col justify-center items-center">
            <p className="text-lg  text-neutral-700">
              Looks like u have not created any course!
            </p>
            
            <AddCourseDialogBox>
            <Button className={"mt-5"}> <Sparkle/> Create your first course</Button>
             </AddCourseDialogBox>
          </div>
        </div>
      ) : (
        <div>Boom</div>
      )}
    </div>
  );
}

export default CourseList;
