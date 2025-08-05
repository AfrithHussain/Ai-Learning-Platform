"use client"
import axios from 'axios'
import React, { useEffect } from 'react'

function EnrollCourseList() {


    useEffect(()=>{
      enrollCourseListHandler()
    },[])
  
    const enrollCourseListHandler = async ()=>{
        const result = await axios.get('/api/enroll-course');
        console.log(result.data)
    }

  return (
    <div>EnrollCourseList</div>
  )
}

export default EnrollCourseList