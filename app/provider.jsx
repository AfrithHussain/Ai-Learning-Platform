"use client";

import { UserDetailContext } from '../context/UserDetailContext';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { SelectedChapterContext } from './../context/SelectedChapterContext';
import { CourseDataContext } from '@/context/CourseDataContext';
import { TrackProgressContext } from '@/context/TrackProgressContext';

function Provider({ children }) {
    // State for your context
    const [userDetail, setUserDetail] = useState({
        cid:"",
        progress: 0
    });

    // Selected Chapter Content 

    const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);

    // State to track if the DB create call has been attempted
    const [isSyncAttempted, setIsSyncAttempted] = useState(false);

    // All Course List Details will be stored here 

    const [courseDataList, setCourseDataList] = useState([])

    // Track the Course Progress
    const [trackProgress, setTrackProgress] = useState([])

    

    // Get user and loading state from Clerk
    const { user, isLoaded } = useUser();

    useEffect(() => {
        // This effect should only run when the user is fully loaded and the sync hasn't been tried yet.
        if (isLoaded && user && !isSyncAttempted) {
            console.log("User is loaded, attempting to sync to DB...");
            createUserInDb();
            setIsSyncAttempted(true); // Mark that we've attempted the sync
        }
    }, [isLoaded, user, isSyncAttempted]); // Depend on all three

    /**
     * This function sends the user's data to our backend API
     * to create or retrieve the user from our own database.
     */
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
            console.log("User synced successfully:", response.data);

        } catch (error) {
            // This will catch errors, including the 404 if the API route doesn't exist
            console.error("Error syncing user to database:", error);
        }
    }

    return (
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
            <CourseDataContext.Provider value={{courseDataList,setCourseDataList}}>
                <SelectedChapterContext.Provider value={{selectedChapterIndex, setSelectedChapterIndex}}>
                    <TrackProgressContext.Provider value={{trackProgress, setTrackProgress}}>

                  {children}
                  </TrackProgressContext.Provider>
            </SelectedChapterContext.Provider>
            </CourseDataContext.Provider>
            
           
        </UserDetailContext.Provider>
    );
}

export default Provider;
