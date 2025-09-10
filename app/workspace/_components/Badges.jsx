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
    <div className="flex flex-col gap-4">

      {/* Badges Collected */}
      <div className="border px-8 py-3 rounded-md dark:bg-neutral-900 w-xs">
        <p className="w-44 font-semibold">Badges Collected</p>
        <h1 className="font-bold text-3xl mt-1">{completedCourses}</h1>
        <div className="flex flex-wrap gap-3 mt-3">
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

      {/* Courses Completed */}
     <div className="border px-3 py-2 rounded-md dark:bg-neutral-900 flex items-center gap-3">
  <CircularProgress
    value={totalCourses ? (completedCourses / totalCourses) * 100 : 0}
    size={120}
    completedCourses={completedCourses}
    totalCourses={totalCourses}
    strokeWidth={7}
  />
  <p className="">Courses <br /> Completed</p>
</div>

{/* Remaining Progress */}
<div className="border px-3 py-2 rounded-md dark:bg-neutral-900  flex items-center gap-3">
  <CircularProgress
    value={totalCourses ? (inProgressCourses / totalCourses) * 100 : 0}
    size={120}
    completedCourses={inProgressCourses}
    totalCourses={totalCourses}
    strokeWidth={7}
  />
  <p className=" ">Remaining <br />progress</p>
</div>
    </div>
  );
}

export default Badges;
