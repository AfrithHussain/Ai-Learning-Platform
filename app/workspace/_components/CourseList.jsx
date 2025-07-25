"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
function CourseList() {
  let [courseList, setCourseList] = useState([]);
  return (
    <div className="mt-10">
      <h1 className="text-2xl font-semibold">CourseList</h1>

      {courseList.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-7 ">
          <Image src={"/cartoon-img.png"} width={300} height={150} />
          <div className="flex flex-col justify-center items-center">
            <p className="text-lg  text-neutral-700">
              Looks like u have not created any course!
            </p>
            <Button className={"mt-5"}>Create your first course</Button>
          </div>
        </div>
      ) : (
        <div>Boom</div>
      )}
    </div>
  );
}

export default CourseList;
