import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge'; // Note: ShadCN Badge is typically imported like this
import { Database, PlayCircle } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';

// FIXED: Removed 'key' from props, as it's a special prop handled by React.
function EnrolledCourseCard({ courseData , key}) {

    // Destructuring for easier access and cleaner code
    const course = courseData.courses?.courseJson?.course;

    // A fallback in case the nested data doesn't exist
    if (!course) {
        return (
            <div className="border rounded-lg p-4 text-destructive-foreground bg-destructive">
                Error: Course data is invalid.
            </div>
        );
    }

    const calculateChapterComplted = ()=>{
      return (courseData?.enrollCourse?.length ?? 0 / courseData.courses?.courseDataContent?.length) * 100
    }

    return (
        <div key={key}
            className="
                border rounded-lg p-4 flex flex-col h-full
                hover:shadow-lg transition-shadow duration-200
            "
        >
            <Image
                src={courseData.courses.imagePrompt}
                alt={`${course.name} course cover`}
                width={500}
                height={300}
                className="rounded-md w-full h-40 object-cover"
            />

            <div className="flex flex-col flex-grow mt-4">
                <h2 className="text-lg font-bold truncate">{course.name}</h2>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                    {/* FIXED: Accessed description from the course object, not the name string. */}
                    {course.description}
                </p>
            </div>

            <div className="mb-3">
              <h2 className='flex items-center justify-between text-primary mt-2 mb-1'>progress <span>{calculateChapterComplted()}%</span></h2>

              <Progress value={40}/>
            </div>

              <Link href={'/workspace/course/' + courseData.courses.cid}>
              <Button className={'w-full'}><PlayCircle/> Continue Learning</Button>
           </Link>
        </div>
    )
}

export default EnrolledCourseCard;