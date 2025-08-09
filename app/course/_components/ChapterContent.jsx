"use client"
import { Button } from '@/components/ui/button'
import { SelectedChapterContext } from '@/context/SelectedChapterContext'
import axios from 'axios'
import { Loader2Icon, Verified, X } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useContext, useState } from 'react'
import YouTube from 'react-youtube'
import { toast } from 'sonner'

function ChapterContent({ courseData, refreshData }) {

  const [loading, setLoading] = useState(false)

  const { courseId } = useParams()
  const { selectedChapterIndex } = useContext(SelectedChapterContext)

  const videoData =
    courseData?.courses?.courseDataContent?.[selectedChapterIndex]?.youtubeVideo || []
  const courseTopics =
    courseData?.courses?.courseDataContent?.[selectedChapterIndex]?.courseData?.topics || []

  const completedChapters = courseData?.enrollCourse?.chaptersCompleted ?? {}
  const isCompleted = !!completedChapters[selectedChapterIndex]

  const markAsCompleteHandler = async () => {
    setLoading(true)

    let updatedChapters = { ...completedChapters }

    if (isCompleted) {
      delete updatedChapters[selectedChapterIndex]
      toast.info('Chapter marked as not complete')
    } else {
      updatedChapters[selectedChapterIndex] = true
      toast.success('Chapter marked as complete')
    }
    
    try {
      await axios.put('/api/enroll-course', {
        chaptersCompleted: updatedChapters,
        courseId
      })
      refreshData()
    } catch (error) {
      toast.error('Failed to update chapter status')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="flex items-center mt-2 justify-between mx-4">
        <h2 className="text-2xl font-bold my-2">
          {courseData?.courses?.courseDataContent?.[selectedChapterIndex]?.courseData
            ?.chapterName}
        </h2>
        
        {isCompleted ? (
          <Button variant="outline" disabled={loading} onClick={markAsCompleteHandler}>
            {loading ? <Loader2Icon className="animate-spin" /> : <X />}
            Mark as Incomplete
          </Button>
        ) : (
          <Button disabled={loading} onClick={markAsCompleteHandler}>
            {loading ? <Loader2Icon className="animate-spin" /> : <Verified />}
            Mark as Completed
          </Button>
        )}     
      </div>

      <div>
        <h2 className="font-semibold text-xl my-3">Related Videos</h2>
        <div className="flex">
          {videoData.slice(0, 2).map((video) => (
            <YouTube
              key={video?.videoId}
              videoId={video?.videoId}
              className="p-2 rounded-3xl"
              opts={{ height: '250', width: '400' }}
            />
          ))}
        </div>

        <div>
          <h2 className="font-semibold text-xl my-3">Content</h2>
          {courseTopics.map((topic, i) => (
            <div key={i} className="p-5 bg-secondary mt-10">
              <h1 className="font-bold text-xl text-primary">
                {i + 1}. {topic?.topic}
              </h1>
              <div
                style={{ lineHeight: '2.9' }}
                dangerouslySetInnerHTML={{ __html: topic?.content }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ChapterContent
