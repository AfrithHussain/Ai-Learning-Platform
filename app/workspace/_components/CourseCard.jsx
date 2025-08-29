import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, Database, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


function CourseCard({ course }) {
  const [loading, setLoading] = useState(false);
  


  const router = useRouter();

  const { name, description, level } = course.courseJson.course;

  const enrollCourseHandler = async () => {
    try {
      setLoading(true);
      const result = await axios.post("/api/enroll-course", {
        courseId: course?.cid,
      });

      setLoading(false);

      if (result.data.res) {
        toast.success("Course already enrolled");
      } else {
        router.replace("/workspace/my-learning");
        toast.success("Course enrolled");
      }
    } catch (e) {
      setLoading(false);
      
      toast.error("Server error");
      console.log(e.message);
    }
  };
   
    
  
  return (
    <div
      className="
        border rounded-lg w-80 p-4 flex flex-col h-full hover:shadow-lg transition-shadow duration-200
      "
    >
      {/* --- Image Section with fixed 16:9 ratio --- */}
      <div className="relative w-full aspect-video">
        <Image
          src={course.imagePrompt}
          alt={`${name} course cover`}
          fill
          className="rounded-md object-cover"
          sizes="(max-width: 768px) 100vw, 500px"
          priority={false}
        />
      </div>

      {/* --- Content Section --- */}
      <div className="flex flex-col flex-grow mt-4">
        <h2 className="text-lg font-bold truncate">{name}</h2>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
          {description}
        </p>
      </div>

      {/* --- Footer Section --- */}
      <div className="flex items-center justify-between mt-4">
        <Badge variant="outline" className="flex items-center gap-1">
          <Database className="h-4 w-4" />
          {level}
        </Badge>

        {course?.courseDataContent?.length ? (
          <Button
            disabled={loading}
            onClick={enrollCourseHandler}
            size="sm"
            variant="default"
          >
            <PlayCircle className="h-4 w-4 mr-2" />
            Enroll Course
          </Button>
        ) : (
          <Link href={`/workspace/edit-course/${course?.cid}`}>
            <Button size="sm" variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Generate Course
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default CourseCard;
