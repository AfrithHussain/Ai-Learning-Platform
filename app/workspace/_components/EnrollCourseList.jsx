"use client";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import EnrolledCourseCard from "./EnrolledCourseCard";
import {CourseDataContext} from "../../../context/CourseDataContext"

function EnrollCourseList() {
  // const [enrolledCourse, setEnrolledCourse] = useState([]);
  const [loading, setLoading] = useState(true);

  // using context
  const { courseDataList,setCourseDataList } = useContext(CourseDataContext);
  
  
    
    
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



  if (loading) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="text-lg font-medium">No courses available</p>
        <p className="text-sm">Once you enroll in a course, it will appear here.</p>
      </div>
    );
  }

  return (
    <div>
      
      <h2 className="text-xl font-semibold mt-4">
        Continue your learning progress
      </h2>
      <div className="flex flex-wrap gap-5 mt-2 
      
      
      
      ">
        {courseDataList.map((data) => (
          <EnrolledCourseCard
            key={data.enrollCourse.cid}
            cid={data.enrollCourse.cid}
            courseData={data}
          />
        ))}
      </div>
    </div>
  );
}

export default EnrollCourseList;
