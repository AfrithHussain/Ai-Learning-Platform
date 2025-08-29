import { Sparkle } from 'lucide-react';
import React from 'react';

function CourseChapters({ courseData }) {
  const courseList = courseData?.courseJson?.course;

  return (
    <div className=" sm:px-6 md:px-10 lg:px-20 py-6 mt-10 min-h-screen">
  <h2 className="text-xl sm:text-3xl font-bold text-center text-neutral-800 mb-8 dark:text-white">
     Course Roadmap
  </h2>
  
<div
  className="relative border-l-2 pl-3 sm:pl-6 space-y-8 sm:space-y-10"
  style={{ borderColor: "var(--primary)" }}
>
    {courseList?.chapters?.map((chapter, index) => (
      <div key={index} className="relative">
        {/* Timeline dot */}
        <div style={{ backgroundColor: "var(--primary)" }}  className="absolute -left-2 sm:-left-3 top-2 w-3 h-3 sm:w-4 sm:h-4  rounded-full border-2 sm:border-4 border-white shadow" />

        {/* Chapter box */}
        <div className="bg-white shadow-sm border border-blue-100 rounded-md px-3 py-4 sm:px-5 sm:py-6 dark:bg-neutral-900">
          <h1 style={{ color: "var(--primary)" }} className='text-base sm:text-xl md:text-2xl font-bold  mb-1'>Chapter {index + 1}</h1>
          <h3 style={{ color: "var(--primary)" }} className="text-base sm:text-xl font-semibold  mb-1">
           {chapter.chapterName}
          </h3>
          <p className=" text-xs sm:text-sm dark:text-white">
            ⏱ Duration: <span className="font-medium text-neutral-600">{chapter.duration}</span> | 📌 Topics:{" "}
            <span className="font-medium text-neutral-600">{chapter.topics.length}</span>
          </p>

          {/* Topics */}
          <div className="grid grid-cols-1 gap-2 mt-3">
            {chapter.topics.map((topic, tIndex) => (
              <div
                key={tIndex}
                className="bg-neutral-50 dark:bg-neutral-800    text-blue-800 text-xs sm:text-sm font-medium px-3 py-2 rounded flex items-center gap-2"
              >
                <span  className=" text-white bg-cyan-900 dark:bg-neutral-700 w-5 p-3 h-3 rounded-full flex items-center justify-center text-xs font-bold">
                  {tIndex + 1}
                </span>
                <span style={{ color: "var(--primary)" }} className="truncate">{topic}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ))}
      

    {/* Finish */}
    <div className="relative">
      <div  className="dark:bg-neutral-800 bg-cyan-900 absolute -left-2 sm:-left-3 top-2 w-3 h-3 sm:w-4 sm:h-4  rounded-full border-2 sm:border-4 border-white shadow" />
      <div  className="dark:bg-neutral-800 bg-cyan-900 flex  items-center justify-center gap-3   text-white px-4 py-2 lg:py-3 mt-3 rounded-lg shadow text-center text-sm sm:text-lg font-semibold">
        <Sparkle/> Finish
      </div>
    </div>
  </div>
  
</div>

  );
}

export default CourseChapters;
