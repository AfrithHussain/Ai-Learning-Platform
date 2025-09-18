"use client";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import EnrolledCourseCard from "./EnrolledCourseCard";
import { CourseDataContext } from "../../../context/CourseDataContext";
import AddCourseDialogBox from "./AddCourseDialogBox";
import { Button } from "@/components/ui/button";
import { Sparkle } from "lucide-react";
import Image from "next/image";
import EnrolledCardLoader from "../_skeleton/EnrolledCardLoader";

function EnrollCourseList() {
  const [loading, setLoading] = useState(true);

  // using context
  const { courseDataList, setCourseDataList } = useContext(CourseDataContext);

  useEffect(() => {
    enrollCourseListHandler();
  }, []);

  const enrollCourseListHandler = async () => {
    try {
      const result = await axios.get("/api/enroll-course");
      setCourseDataList(result.data);
    } catch (err) {
      console.error(err);
      setCourseDataList([]); // fallback
    } finally {
      setLoading(false);
    }
  };

  // ✅ Loading Indicator
  if (loading) {
    return (
      <div className="text-center py-12 text-lg font-medium text-muted-foreground">
        <EnrolledCardLoader />
      </div>
    );
  }

  return (
    <div>
      {courseDataList.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-7 mt-8">
          <Image
            src={"/cartoon-img.png"}
            width={300}
            height={150}
            alt="no-course-added"
          />
          <div className="flex flex-col justify-center items-center text-center">
            <p className="text-lg text-neutral-700 dark:text-neutral-300">
              Looks like you have not created any course!
            </p>
            <AddCourseDialogBox>
              <Button className={"mt-5 cursor-pointer"}>
                <Sparkle className="mr-2 h-4 w-4" /> Create your first course
              </Button>
            </AddCourseDialogBox>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mt-4 dark:text-white">
            Continue your learning progress
          </h2>

          {/* This is the Flexbox container for your cards */}
          <div className="flex flex-wrap gap-6 mt-4">
            {courseDataList.map((data) => (
              <EnrolledCourseCard
                key={data.enrollCourse.cid}
                cid={data.enrollCourse.cid}
                courseData={data}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default React.memo(EnrollCourseList);