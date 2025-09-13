"use client";

import React, { useEffect, useState } from 'react';
import ChapterSideBar from '../_components/ChapterSideBar';
import ChapterContent from '../_components/ChapterContent';
import AppHeader from '@/app/workspace/_components/AppHeader';
import { useParams } from 'next/navigation';
import axios from 'axios';



function CourseContent() {
  const [courseContentData, setCourseContentData] = useState([]);
  const { courseId } = useParams();

  useEffect(() => {
    enrollCourseListHandlerById();
  }, []);

  const enrollCourseListHandlerById = async () => {
    const result = await axios.get('/api/enroll-course?courseId=' + courseId);
    setCourseContentData(result.data);
  };

  const totalChapters = courseContentData?.courses?.courseDataContent?.length ?? 0;





  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900">
      <AppHeader hideSideBar={true} showBtn={true} />

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="hidden lg:block">
          <ChapterSideBar courseData={courseContentData} loading={!courseContentData?.courses} />

        </div>
 
        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 lg:ml-[350px] transition-all duration-300">
          <ChapterContent
            refreshData={enrollCourseListHandlerById}
            courseData={courseContentData}
          />

          
        </main>
      </div>
    </div>
  );
}

export default CourseContent;
