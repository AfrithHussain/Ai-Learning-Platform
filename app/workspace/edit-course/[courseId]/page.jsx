"use client";

import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import CourseInfo from '../_components/CourseInfo';
import CourseChapters from '../_components/CourseChapters';

function EditCourse({viewCourse=false}) {
     
    const [isLoading, setIsLoading] = useState(false);
    const [courseData, setCourseData] = useState()



    const params = useParams();
    const courseId = params.courseId;

    useEffect(() => {
        courseDataHandler();
    }, []);

    const courseDataHandler = async () => {
        try {
            setIsLoading(true)
            const result = await axios.get('/api/get-course?courseId='+courseId);
            console.log(result.data);
            setCourseData(result.data)
        } catch (error) {
            console.error("Error fetching course data:", error);
        }
        setIsLoading(false)
    };

    return (
        <div>
            <CourseInfo viewCourse={viewCourse} courseData={courseData}/>
            <CourseChapters courseData={courseData}/>

        </div>
    );
}

export default EditCourse;
