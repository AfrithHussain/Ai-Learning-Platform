"use client";

import React, { useEffect, useState, useContext } from 'react';
import ChapterSideBar from '../_components/ChapterSideBar';
import ChapterContent from '../_components/ChapterContent';
import AppHeader from '@/app/workspace/_components/AppHeader';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { SelectedChapterContext } from '@/context/SelectedChapterContext';
import { Button } from '@/components/ui/button';

function CourseContent() {
  const [courseContentData, setCourseContentData] = useState([]);
  const { courseId } = useParams();
  const { selectedChapterIndex, setSelectedChapterIndex } = useContext(SelectedChapterContext);

  useEffect(() => {
    enrollCourseListHandlerById();
  }, []);

  const enrollCourseListHandlerById = async () => {
    const result = await axios.get('/api/enroll-course?courseId=' + courseId);
    setCourseContentData(result.data);
  };

  const totalChapters = courseContentData?.courses?.courseDataContent?.length ?? 0;

  const goToNextChapter = () => {
    if (selectedChapterIndex < totalChapters - 1) {
      setSelectedChapterIndex(selectedChapterIndex + 1);
    }
  };

  const goToPrevChapter = () => {
    if (selectedChapterIndex > 0) {
      setSelectedChapterIndex(selectedChapterIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900">
      <AppHeader hideSideBar={true} showBtn={true} />

      <div className="flex">
        {/* Sidebar */}
        <ChapterSideBar courseData={courseContentData} />

        {/* Main Content */}
        <main className="flex-1 p-6 lg:ml-[350px] transition-all duration-300">
          <ChapterContent
            refreshData={enrollCourseListHandlerById}
            courseData={courseContentData}
          />

          <div className="text-center text-neutral-600 dark:text-neutral-300 my-4 font-medium">
            Chapter {selectedChapterIndex + 1} of {totalChapters}
          </div>

          <div className="flex justify-between space-x-4 mt-6">
            <Button
              variant="outline"
              disabled={selectedChapterIndex <= 0}
              onClick={goToPrevChapter}
              className="flex items-center space-x-2"
            >
              ← Prev Chapter
            </Button>

            <Button
              variant="outline"
              disabled={selectedChapterIndex >= totalChapters - 1}
              onClick={goToNextChapter}
              className="flex items-center space-x-2"
            >
              Next Chapter →
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default CourseContent;
