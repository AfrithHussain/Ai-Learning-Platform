"use client"
import React, { useEffect, useState } from 'react'
import ChapterSideBar from '../_components/ChapterSideBar'
import ChapterContent from '../_components/ChapterContent'
import AppHeader from '@/app/workspace/_components/AppHeader'
import { useParams } from 'next/navigation';
import axios from 'axios'


function courseContent() {
    const [courseContentData, setCourseContentData] = useState([]);
    
    const {courseId} = useParams()

    useEffect(()=>{
      enrollCourseListHandlerById()
    },[])
  
    const enrollCourseListHandlerById = async ()=>{
        const result = await axios.get('/api/enroll-course?courseId='+ courseId);
        setCourseContentData(result.data)
        console.log(result.data)

    }
  return (
    <div className="">
        <AppHeader hideSideBar = {true}/>
        <div className='flex gap-5 '>
        <ChapterSideBar courseData={courseContentData}/>
        <ChapterContent refreshData={()=>enrollCourseListHandlerById()} courseData={courseContentData}/>
    </div>
    </div>
  )
}

export default courseContent