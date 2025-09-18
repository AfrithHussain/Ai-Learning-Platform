"use client";
import { Button } from '@/components/ui/button';
import { SelectedChapterContext } from '@/context/SelectedChapterContext';
import axios from 'axios';
import { Loader2Icon, Verified, X } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useContext, useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import { toast } from 'sonner';

// No changes needed in this component
function DynamicContentWithCopy({ htmlContent }) {
  useEffect(() => {
    const codeBlocks = document.querySelectorAll('.topic-content pre');

    codeBlocks.forEach((block) => {
      if (block.querySelector('.copy-btn')) return;

      const button = document.createElement('button');
      button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16h8M8 12h8m-8-4h8"/></svg>`;
      button.className =
        'copy-btn absolute top-2 right-2 bg-neutral-700 p-2 rounded hover:bg-neutral-600 text-white';
      button.style.cursor = 'pointer';

      let timeoutId;

      button.addEventListener('click', () => {
        navigator.clipboard.writeText(block.innerText.trim());
        button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>`;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16h8M8 12h8m-8-4h8"/></svg>`;
        }, 2000);
      });

      block.style.position = 'relative';
      block.appendChild(button);
    });
  }, [htmlContent]);

  return (
    <div
      className="prose dark:prose-invert max-w-full"
      style={{ lineHeight: '1.8' }}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}

function ChapterContent({ courseData, refreshData }) {
  const [loading, setLoading] = useState(true);
  const [chapLoading, setChapLoading] = useState(false);

  const { courseId } = useParams();
  const { selectedChapterIndex, setSelectedChapterIndex } = useContext(SelectedChapterContext);

  const totalChapters = courseData?.courses?.courseDataContent?.length ?? 0;

  const videoData =
    courseData?.courses?.courseDataContent?.[selectedChapterIndex]?.youtubeVideo || [];
  const courseTopics =
    courseData?.courses?.courseDataContent?.[selectedChapterIndex]?.courseData?.topics || [];
  const completedChapters = courseData?.enrollCourse?.chaptersCompleted ?? {};
  const isCompleted = !!completedChapters[selectedChapterIndex];

  const markAsCompleteHandler = async () => {
    setChapLoading(true);
    let updatedChapters = { ...completedChapters };

    if (isCompleted) {
      delete updatedChapters[selectedChapterIndex];
      toast.info('Chapter marked as not complete');
    } else {
      updatedChapters[selectedChapterIndex] = true;
      toast.success('Chapter marked as complete');
    }

    try {
      await axios.put('/api/enroll-course', {
        chaptersCompleted: updatedChapters,
        courseId
      });
      refreshData();
    } catch (error) {
      toast.error('Failed to update chapter status');
      console.error(error);
    } finally {
      setChapLoading(false);
    }
  };
  
  // ✅ --- MODIFIED CODE --- ✅
  useEffect(() => {
    // We check for the existence of the specific chapter's data, not just the whole courseData object.
    const currentChapterData = courseData?.courses?.courseDataContent?.[selectedChapterIndex];

    if (currentChapterData) {
      // If data for the currently selected chapter exists, we can stop loading.
      setLoading(false);
    } else {
      // Otherwise, keep showing the loader. This handles the initial load AND
      // cases where courseData might exist but not the specific chapter.
      setLoading(true);
    }
    // This effect should run whenever the main data or the selected chapter changes.
  }, [courseData, selectedChapterIndex]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedChapterIndex]);

  if (loading) {
    return (
      <div className="w-full space-y-6 animate-pulse">
        {/* Skeleton placeholders */}
        <div className="h-10 w-1/2 bg-gray-300 dark:bg-neutral-700 rounded"></div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-[400px] h-40 bg-gray-300 dark:bg-neutral-700 rounded"></div>
          <div className="w-full sm:w-[400px] h-40 bg-gray-300 dark:bg-neutral-700 rounded"></div>
        </div>
        <div className="h-8 w-1/4 bg-gray-300 dark:bg-neutral-700 rounded mt-4"></div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-48 w-full bg-gray-300 dark:bg-neutral-700 rounded-md"></div>
          ))}
        </div>
        <div className="flex gap-4 mt-4">
          <div className="h-10 w-32 bg-gray-300 dark:bg-neutral-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Chapter header and mark complete */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4">
        <h2 className="text-3xl font-bold my-2">
        {courseData?.courses?.courseDataContent?.[selectedChapterIndex]?.courseData?.chapterName}
        </h2>

        <Button
          variant={isCompleted ? 'outline' : 'default'}
          disabled={chapLoading}
          onClick={markAsCompleteHandler}
          className="flex items-center space-x-2 mt-2 sm:mt-0 cursor-pointer"
        >
          {chapLoading ? <Loader2Icon className="animate-spin" /> : isCompleted ? <X /> : <Verified />}
          {isCompleted ? 'Mark as Incomplete' : 'Mark as Completed'}
        </Button>
      </div>

      {/* Related Videos */}
      <div className="mt-6">
        <h2 className="font-semibold text-xl my-3">Related Videos</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          {videoData.slice(0, 2).map((video) => (
            <YouTube
              key={video?.videoId}
              videoId={video?.videoId}
              className="rounded-3xl w-full sm:w-[400px]"
              opts={{ height: '250', width: '100%' }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mt-6">
        <h2 className="font-semibold text-xl my-3">Content</h2>
        <div className="flex flex-col space-y-8">
          {courseTopics.map((topic, i) => (
            <div
              key={i}
              className="p-5 rounded-md border-2 topic-content bg-white dark:bg-neutral-800"
            >
              <h1 className="font-bold text-xl text-primary mb-3">
                {i + 1}. {topic?.topic}
              </h1>

              <DynamicContentWithCopy htmlContent={topic?.content} />
            </div>
          ))}

          {/* NEXT / PREV buttons and Chapter count */}
          <div className="text-center text-neutral-600 dark:text-neutral-300 my-4 font-medium">
            Chapter {selectedChapterIndex + 1} of {totalChapters}
          </div>

          <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
            <Button
              variant="outline"
              disabled={selectedChapterIndex <= 0}
              onClick={() => setSelectedChapterIndex(selectedChapterIndex - 1)}
              className="flex items-center justify-center space-x-2 cursor-pointer"
            >
              ← Prev Chapter
            </Button>

            <Button
              variant="outline"
              disabled={selectedChapterIndex >= totalChapters - 1}
              onClick={() => setSelectedChapterIndex(selectedChapterIndex + 1)}
              className="flex items-center justify-center space-x-2 cursor-pointer"
            >
              Next Chapter →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChapterContent;