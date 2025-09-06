import { Button } from "@/components/ui/button";
import { PlayCircle, Sparkle } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

function EnrolledCourseCard({ courseData, cid }) {
  const [badgeSent, setBadgeSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const course = courseData.courses?.courseJson?.course;

  const courseName = courseData?.courses?.name;
  const quizzChapters = courseData.courses?.courseJson?.course?.chapters;
  const quizzChapterName = [];

  quizzChapters.forEach((data) => {
    quizzChapterName.push(data.chapterName);
  });

  // for quizz generation

  async function quizzHandler() {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/quizz-content", {
        courseId: cid,
        courseName,
        quizzChapterName,
      });
      console.log("Quiz Generated:", response.data);
      router.push("/quiz/" + cid);
    } catch (error) {
      console.error("Failed:", error);
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
    if (progress === 100 && !badgeSent) {
      axios
        .post("/api/course-completed", { courseId: cid })
        .then(() => setBadgeSent(true))
        .catch(console.error);
    }
  }, [badgeSent, cid]);

  return (
    <div
      key={cid}
      className="border rounded-lg w-80 p-4 flex flex-col h-full hover:shadow-lg transition-shadow duration-200"
    >
      {/* --- Image with 16:9 ratio --- */}
      <div className="relative w-full aspect-video">
        <Image
          src={courseData.courses.imagePrompt}
          alt={`${course.name} course cover`}
          fill
          className="rounded-md object-cover"
          sizes="(max-width: 768px) 100vw, 500px"
        />
      </div>

      {/* --- Content --- */}
      <div className="flex flex-col flex-grow mt-4">
        <h2 className="text-lg font-bold truncate">{course.name}</h2>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
          {course.description}
        </p>
      </div>

      {/* --- Progress --- */}
      <div className="mb-3">
        <h2 className="flex items-center justify-between text-primary mt-2 mb-1">
          progress <span>{calculateChapterCompleted()}%</span>
        </h2>
        <Progress value={calculateChapterCompleted()} />
      </div>
      {/* take quizz */}
      {badgeSent && (
        <Button
          onClick={quizzHandler}
          disabled={isLoading}
          className="w-full my-2"
        >
          <Sparkle className="mr-2 h-4 w-4" />{" "}
          {isLoading ? "Generating Quiz..." : "Take Quiz"}
        </Button>
      )}
      {/* --- Footer Button --- */}
      <Link href={`/workspace/view-course/${courseData.courses.cid}`}>
        <Button className="w-full">
          <PlayCircle className="mr-2 h-4 w-4" /> Continue Learning
        </Button>
      </Link>
    </div>
  );
}

export default EnrolledCourseCard;
