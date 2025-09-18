"use client";

import { UserDetailContext } from '../context/UserDetailContext';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { SelectedChapterContext } from './../context/SelectedChapterContext';
import { CourseDataContext } from '@/context/CourseDataContext';
import { TrackProgressContext } from '@/context/TrackProgressContext';

function Provider({ children }) {
    const [userDetail, setUserDetail] = useState();
    const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
   
    const [courseDataList, setCourseDataList] = useState([]);
    const [trackProgress, setTrackProgress] = useState([]);

    const { user } = useUser();

    useEffect(() => {
        
        user && createUserInDb()
    }, [ user]);

  async function createUserInDb() {
        try {
            const response = await axios.post('/api/user', {
                name: user?.fullName,
                email: user?.primaryEmailAddress?.emailAddress,
                // It's a good practice to also send the clerkId for mapping
                clerkId: user?.id 
            });

            // Set the user detail from our database into the context
            setUserDetail(response.data);
           

        } catch (error) {
            // This will catch errors, including the 404 if the API route doesn't exist
            console.error("Error syncing user to database:", error);
        }
    }



    return (
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
            <CourseDataContext.Provider value={{ courseDataList, setCourseDataList }}>
                <SelectedChapterContext.Provider value={{ selectedChapterIndex, setSelectedChapterIndex }}>
                    <TrackProgressContext.Provider value={{ trackProgress, setTrackProgress }}>
                        {children}
                    </TrackProgressContext.Provider>
                </SelectedChapterContext.Provider>
            </CourseDataContext.Provider>
        </UserDetailContext.Provider>
    );
}

export default Provider;
