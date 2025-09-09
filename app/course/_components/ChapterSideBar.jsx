import React, { useContext } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SelectedChapterContext } from '@/context/SelectedChapterContext';

function ChapterSideBar({ courseData }) {
  const courseContent = courseData?.courses?.courseDataContent;
  const completedChapters = courseData?.enrollCourse?.chaptersCompleted ?? {};

  const { setSelectedChapterIndex } = useContext(SelectedChapterContext);

  return (
    <div className="hidden lg:block fixed top-0 left-0 w-[350px] p-4 bg-neutral-200 h-screen overflow-y-auto dark:bg-black">
      <h1 className="text-xl font-bold p-4">Course Outline</h1>

      <Accordion type="single" collapsible>
        {courseContent?.map((chapter, index) => (
          <AccordionItem
            value={chapter?.courseData?.chapterName}
            key={index}
            onClick={() => setSelectedChapterIndex(index)}
          >
            <AccordionTrigger
              className={`text-md p-1 py-5 m-4 ${
                completedChapters?.[index]
                  ? 'bg-cyan-950 text-white'
                  : 'dark:bg-neutral-900'
              }`}
            >
              <div className="flex items-start gap-2 justify-start">
                <span>{index + 1}.</span> {chapter?.courseData?.chapterName}
              </div>
            </AccordionTrigger>

            <AccordionContent>
              <div className="p-3 font-medium text-neutral-700 text-sm px-1">
                {chapter?.courseData?.topics.map((topic, i) => (
                  <h2
                    className={`p-1 py-3 my-2 rounded-md ${
                      completedChapters?.[index]
                        ? 'bg-cyan-950 text-white text-sm p-2'
                        : 'dark:bg-neutral-900 text-neutral-400'
                    }`}
                    key={i}
                  >
                    {topic.topic}
                  </h2>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default ChapterSideBar;
