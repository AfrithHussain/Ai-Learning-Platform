import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // Using a Badge for the level
import { PlayCircle, Database, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link"; // For making the card clickable
import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function CourseCard({ course }) {
 

   const [loading, setLoading] = useState(false)
   

   const router = useRouter()

    // Renamed prop to 'course' for clarity
  // Destructuring for easier access to nested data
  const { name, description, level } = course.courseJson.course;
   

   const enrollCourseHandler = async ()=> {
       
      try{
          setLoading(true)
        const result = await axios.post('/api/enroll-course', {
        courseId: course?.cid });
      
         setLoading(false)
         

         console.log(result.data)
         if(result.data.res)  toast.success("course already enrolled")
          else{
        router.replace('/workspace/my-learning')
          toast.success("course enrolled")
}
        

      }
      catch (e) {
        setLoading(false)
          toast.error("server error")
        console.log(e.message)
      }
      
   }

  return (
    // Link makes the entire card clickable, navigating to the course page
    <div>
      <div
        className="
        border rounded-lg p-4 flex flex-col h-full 
        hover:shadow-lg transition-shadow duration-200 
      "
      >
        {/* --- Image Section --- */}
        <Image
          src={course.imagePrompt}
          alt={`${name} course cover`}
          width={500}
          height={300}
          className="rounded-md w-full h-40 object-cover" // Ensures all images are the same size
        />

        {/* --- Content Section --- */}
        <div className="flex flex-col flex-grow mt-4">
          {" "}
          {/* flex-grow pushes the footer down */}
          <h2 className="text-lg font-bold truncate">{name}</h2>
          <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
            {/* line-clamp ensures description doesn't overflow */}
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
            
              <Button disabled={loading} onClick={enrollCourseHandler}  size="sm" variant="default">
                <PlayCircle className="h-4 w-4 mr-2 " />
               Enroll Course
              </Button>
            
          ) : (
            <Link href={'/workspace/edit-course/' + course?.cid}>
              <Button size="sm" variant="outline">
                <Settings className="h-4 w-4 mr-2 " />
                Generate Course
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
