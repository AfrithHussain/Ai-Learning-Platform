"use client";
import { Button } from "@/components/ui/button";
import { ImageIcon, PlayCircle, Sparkle } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { TrackProgressContext } from "@/context/TrackProgressContext";

function EnrolledCourseCard({ courseData, cid }) {
  const [isLoading, setIsLoading] = useState(false);
  const [existingQuizId, setExistingQuizId] = useState(null);

  // track progress by context
  const { trackProgress, setTrackProgress } = useContext(TrackProgressContext);

  const { user } = useUser();
  const router = useRouter();

  const course = courseData.courses?.courseJson?.course;
  const courseName = courseData?.courses?.name;
  const quizzChapters = courseData.courses?.courseJson?.course?.chapters || [];
  const quizzChapterName = quizzChapters.map((data) => data.chapterName);

  // ✅ Initialize existingQuizId when component mounts
  useEffect(() => {
    if (!user) return;

    axios
      .get("/api/quizz-content", { params: { userId: user.id, courseId: cid } })
      .then((res) => {
        const quizzes = res.data.quizzes;
        const existingQuiz = quizzes.find(
          (q) => q.courseId === cid && q.userId === user.id
        );

        if (existingQuiz) {
          setExistingQuizId(existingQuiz.id);
        }
      })
      .catch(console.error);
  }, [user, cid]);

  async function quizzHandler() {
    if (!user) return;

    setIsLoading(true);

    try {
      const res = await axios.get("/api/quizz-content", {
        params: { userId: user.id, courseId: cid },
      });

      const quizzes = res.data.quizzes;
      const existingQuiz = quizzes.find(
        (q) => q.courseId === cid && q.userId === user.id
      );

      if (existingQuiz) {
        setExistingQuizId(existingQuiz.id);
        router.push(`/quiz/${existingQuiz.id}`);
      } else {
        const response = await axios.post("/api/quizz-content", {
          courseId: cid,
          courseName,
          quizzChapterName,
          userId: user.id,
        });

        const generatedQuizId = response.data.quizId;
        setExistingQuizId(generatedQuizId);
        router.push(`/quiz/${generatedQuizId}`);
      }
    } catch (error) {
      console.error("Failed to handle quiz:", error);
    } finally {
      setIsLoading(false);
    }
  }

  if (!course) {
    return (
      <div className="border rounded-lg p-4 text-destructive-foreground bg-destructive">
        Error: Course data is invalid.
      </div>
    );
  }

  const calculateChapterCompleted = () => {
    const completedChapters = Object.values(
      courseData?.enrollCourse?.chaptersCompleted || {}
    ).filter(Boolean).length;

    const totalChapters = courseData?.courses?.courseDataContent?.length || 0;
    if (totalChapters === 0) return 0;

    return Math.round((completedChapters / totalChapters) * 100);
  };

  const progress = calculateChapterCompleted();

  useEffect(() => {
    if (!cid) return;

    setTrackProgress((prev) => {
      const existingIndex = prev.findIndex((item) => item.cid === cid);

      if (existingIndex !== -1) {
        // Update existing entry
        const updated = [...prev];
        updated[existingIndex] = { cid, progress };
        return updated;
      } else {
        // Add new entry
        return [...prev, { cid, progress }];
      }
    });
  }, [cid, progress, setTrackProgress]);

  useEffect(() => {
    if (progress === 100) {
      axios
        .post("/api/course-completed", { courseId: cid })
        .catch(console.error);
    }
  }, [progress, cid]);

  return (
    <div
      key={cid}
      className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-lg overflow-hidden flex flex-col h-full group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full md:w-auto flex-grow md:basis-[300px] md:max-w-[340px]"
    >
      {/* Image Section */}
      <div className="relative w-full aspect-video bg-gray-50 dark:bg-neutral-800 flex items-center justify-center">
        {courseData.courses.imagePrompt ? (
          <Image
            src={courseData.courses.imagePrompt}
            alt={`${course.name} course cover`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-400 dark:text-neutral-500">
            <ImageIcon className="h-10 w-10" />
            <p className="text-sm font-medium">No Image Available</p>
          </div>
        )}
      </div>

      {/* Content section */}
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg font-bold truncate dark:text-white">
          {course.name}
        </h2>
        <p className="text-sm text-gray-500 dark:text-neutral-400 mt-1 line-clamp-2">
          {course.description}
        </p>

        {/* This spacer pushes the progress and buttons to the bottom */}
        <div className="flex-grow" />

        {/* Progress Bar Section */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-neutral-300 mb-1">
            <p>Progress</p>
            <span className="font-semibold text-primary">{progress}%</span>
          </div>
          <Progress value={progress} />
        </div>

        {/* Buttons Section */}
        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          {progress === 100 && (
            <Button
              onClick={quizzHandler}
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              <Sparkle className="mr-2 h-4 w-4" />
              {existingQuizId
                ? "Go to Quiz"
                : isLoading
                ? "Generating..."
                : "Take Quiz"}
            </Button>
          )}

          <Link
            href={`/workspace/view-course/${courseData.courses.cid}`}
            className="w-full sm:w-auto flex-grow"
          >
            <Button variant="outline" className="w-full">
              <PlayCircle className="mr-2 h-4 w-4" />
              {progress === 100 ? "Review Course" : "Continue"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EnrolledCourseCard;
