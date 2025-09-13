"use client";

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { CircularProgress } from "./CircularProgress";
import { TrackProgressContext } from "@/context/TrackProgressContext";

function Badges() {
  const [badgeCount, setBadgeCount] = useState(0);

  const { trackProgress } = useContext(TrackProgressContext);

  const totalCourses = trackProgress.length;
  const completedCourses = trackProgress.filter(p => p.progress === 100).length;
  const inProgressCourses = totalCourses - completedCourses;

  const badgeNames = [
    "Beginner Learner",
    "Knowledge Seeker",
    "Curious Mind",
    "Skill Builder",
    "Course Conqueror",
    "Knowledge Ninja",
    "Learning Champion",
    "Master Scholar",
  ];

  const badgeStyles = [
    { bg: "bg-blue-950", text: "text-blue-100" },
    { bg: "bg-green-950", text: "text-green-100" },
    { bg: "bg-purple-950", text: "text-purple-100" },
    { bg: "bg-pink-950", text: "text-pink-100" },
    { bg: "bg-yellow-950", text: "text-yellow-100" },
    { bg: "bg-orange-950", text: "text-orange-100" },
    { bg: "bg-indigo-950", text: "text-indigo-100" },
    { bg: "bg-red-950", text: "text-red-100" },
  ];

  async function badgeHandler() {
    try {
      const result = await axios.get("/api/course-completed");
      const badges = result.data.badges;

      setBadgeCount(badges.length);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    badgeHandler();
  }, []);

return (
    /* IMPROVEMENT: Added a title to the section and a containing div for better structure.
      The lg:pl-8 and lg:border-l classes add the sidebar separator only on large screens.
    */
    <div className="lg:pl-8 lg:border-l lg:border-gray-200 dark:lg:border-neutral-800 h-full">
      <h3 className="text-lg font-semibold mb-4 dark:text-white">Your Progress</h3>
      <div className="flex flex-col gap-5">

        {/* Card 1: Badges Collected */}
        {/*
          FROM: border px-8 py-3 rounded-md w-xs
          TO:   Responsive card styling
          WHY:  Removed fixed 'w-xs'. The new card style is cleaner and will always be full-width
                of its parent, which is exactly what we want for responsiveness.
        */}
        <div className="bg-slate-50 dark:bg-neutral-900 p-4 rounded-lg border border-gray-200 dark:border-neutral-800">
          <p className="font-semibold text-gray-600 dark:text-gray-300">Badges Collected</p>
          <h1 className="font-bold text-4xl mt-1 text-cyan-900 dark:text-white">{completedCourses}</h1>
          <div className="flex flex-wrap gap-2 mt-3">
            {badgeNames.slice(0, completedCourses).map((badge, i) => (
              <Badge
                key={i}
                className={`text-[11px] px-2 py-1 ${badgeStyles[i % badgeStyles.length].bg} ${badgeStyles[i % badgeStyles.length].text}`}
              >
                {badge}
              </Badge>
            ))}
          </div>
        </div>

        {/* Card 2: Courses Completed */}
        <div className="bg-slate-50 dark:bg-neutral-900 p-4 lg:p-1   xl:p-4 rounded-lg border border-gray-200 dark:border-neutral-800 flex items-center justify-between gap-3">
          <div className="font-semibold text-gray-600 dark:text-gray-300 lg:text-sm xl:text-lg">Courses <br /> Completed</div>
          <CircularProgress
            value={totalCourses ? (completedCourses / totalCourses) * 100 : 0}
            size={90} // Reduced size slightly for a cleaner look
            completedCourses={completedCourses}
            totalCourses={totalCourses}
            strokeWidth={8}
          />
        </div>

        {/* Card 3: Remaining Progress */}
        <div className="bg-slate-50 dark:bg-neutral-900 p-4 lg:p-2 xl:p-4  lg:text-sm xl:text-lg     rounded-lg border border-gray-200 dark:border-neutral-800 flex items-center justify-between gap-3">
          <div className="font-semibold text-gray-600 dark:text-gray-300">In <br />Progress</div>
          <CircularProgress
            value={totalCourses ? (inProgressCourses / totalCourses) * 100 : 0}
            size={90}
            completedCourses={inProgressCourses}
            totalCourses={totalCourses}
            strokeWidth={8}
          />
        </div>

      </div>
    </div>
  );
}

export default Badges;
