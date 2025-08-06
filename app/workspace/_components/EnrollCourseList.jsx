"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import EnrolledCourseCard from './EnrolledCourseCard';


function EnrollCourseList() {
   const [enrolledCourse, setEnrolledCourse] = useState([]);


    useEffect(()=>{
      enrollCourseListHandler()
    },[])
  
    const enrollCourseListHandler = async ()=>{
        const result = await axios.get('/api/enroll-course');
        setEnrolledCourse(result.data)
        console.log(result.data)

    }

  return enrolledCourse?.length > 0 && (
    <div>
      <h2 className='text-xl font-semibold mt-4'>Continue your learning progress </h2>
      {
        enrolledCourse.map((data,index)=>{
        return  ( 
            <div className='mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' key={data.enrollCourse.cid}>
              <EnrolledCourseCard courseData={data}/>
            </div>
        )
        })
      }
    </div>
  )
}

export default EnrollCourseList