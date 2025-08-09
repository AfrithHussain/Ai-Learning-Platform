import React, { useContext } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { SelectedChapterContext } from '@/context/SelectedChapterContext';

function ChapterSideBar({ courseData }) {
  const course = courseData?.courses;
  const enrolledCourse = courseData?.enrolledCourse;
  const courseContent = courseData?.courses?.courseDataContent;
  const completedChapters = courseData?.enrollCourse?.chaptersCompleted ?? {}

     const { setSelectedChapterIndex} = useContext(SelectedChapterContext)
  

  return (
    <div className='w-[700px] p-2  bg-neutral-200 h-screen overflow-y-auto'>
      {/* <h1 className='text-2xl font-bold text-center mt-3'>Chapters ({courseContent?.length})</h1> */}
      <Accordion  type="single" collapsible>
        {courseContent?.map((chapter, index) => (
          <AccordionItem value={chapter?.courseData?.chapterName} key={index} onClick={()=> setSelectedChapterIndex(index)} >
            <AccordionTrigger className={`text-md p-2 py-5 m-4 ${completedChapters?.[index] === true ? 'bg-blue-100 text-blue-500': 'bg-white '}`}>
                <div className={`flex items-start gap-2 justify-start `} >
                    <span>{index + 1}.</span>  {chapter?.courseData?.chapterName}
                </div>
            </AccordionTrigger>
            <AccordionContent>
                <div className="p-3 font-medium text-neutral-700 text-sm px-1 ">
                    {
                        chapter?.courseData?.topics.map((topic,i)=> (
                            <h2 className={` p-1 py-3 my-2 rounded-md ${completedChapters?.[index] === true ? 'bg-blue-100 text-blue-500': 'bg-white'} `} key={i}>{topic.topic}</h2>
                        ))
                    }
                </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default ChapterSideBar
