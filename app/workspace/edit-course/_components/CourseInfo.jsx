"use client"
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Book, Clock, IndentIncrease, Settings } from 'lucide-react';
import Image from 'next/image';
import React, {  useState } from 'react';

function CourseInfo({ courseData }) {
    const [isLoading, setIsLoading] = useState(false)




  const courseList = courseData?.courseJson?.course;

  if (!courseList) {
    return <div>Course information not available</div>;
  }
  
 

 async function generateCourseContentHandler(){

    try{
        setIsLoading(true)
         const result =await axios.post('/api/create-course-content', {
        courseTitle: courseList?.name,
         courseId: courseData?.cid, 
        courseJson: courseList,
        })

        console.log(result.data)
        setIsLoading(false)
    }
    catch(e){
        setIsLoading(false)
        console.log(e)
        
    }
     
  }
  return (
    <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:shadow lg:p-8">
      {/* Left content (text info) */}
      <div className="flex flex-col gap-6 w-full  ">
        <h1 className="text-2xl sm:text-3xl font-bold">{courseList?.name || 'Course Name'}</h1>
        <p className="text-neutral-800   text-sm  sm:text-base  ">
          {courseList?.description || 'No description available.'}
        </p>

        {/* Info cards */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 text-sm">
          {/* Duration */}
          <div className="flex items-center gap-3 border shadow p-4 rounded-md w-full sm:w-[48%] lg:w-auto">
            <Clock />
            <div>
              <p className='font-semibold'>Duration</p>
              <p className="text-neutral-700">
                {courseList?.chapters[0]?.duration ? `${courseList?.chapters[0].duration}s` : 'Not available'}
              </p>
            </div>
          </div>

          {/* Chapters */}
          <div className="flex items-center gap-3 border shadow p-4 rounded-md w-full sm:w-[48%] lg:w-auto">
            <Book />
            <div>
              <p className='font-semibold'>Chapters</p>
              <p className="text-neutral-700">{courseData?.noOfChapters || 'Not available'}</p>
            </div>
          </div>

          {/* Difficulty */}
          <div className="flex items-center gap-3 border shadow p-4 rounded-md w-full sm:w-[48%] lg:w-auto">
            <IndentIncrease />
            <div>
              <p className='font-semibold'>Difficulty Level</p>
              <p className="text-neutral-700">{courseList?.level || 'Not available'}</p>
            </div>
          </div>
        </div>
        <Button disabled={isLoading} onClick = {generateCourseContentHandler} className={'items-center flex w-fit p-6  mx-auto md:mx-0 md:w-xs   md:p-0 '}>{isLoading ? <Settings className="animate-spin"/> : <Settings/> } Generate Course</Button>
      </div>

      {/* Right content (image) */}
      <div className="w-full lg:w-1/2">
        <Image
          src={courseData?.imagePrompt || '/default-image.jpg'}
          alt="course-img"
          width={800}
          height={400}
          className="w-full h-60 sm:h-72  object-cover object-top rounded-md"
        />
      </div>
    </div>
  );
}

export default CourseInfo;
