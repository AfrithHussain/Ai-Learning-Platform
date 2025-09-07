"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

function Badges() {
  const [badgeCount, setBadgeCount] = useState(0);
  const [badgesCollected, setBadgesCollected] = useState([]);

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

  // Each badge gets a background and text color
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
console.log(result.data);

setBadgeCount(badges.length);
setBadgesCollected(badges.map(badge => badge.badgeType));  // Display actual badge types

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
      <div className="border px-8 py-3 rounded-md dark:bg-neutral-900">
        <p className="w-44 font-semibold">Badges Collected</p>
        <h1 className="font-bold text-3xl mt-1">{badgeCount}</h1>
        <div className="flex flex-wrap gap-3 mt-3">
          {badgesCollected.map((data, i) => (
            <Badge
              key={i}
              className={`text-[11px] px-2 py-1 ${badgeStyles[i % badgeStyles.length].bg} ${badgeStyles[i % badgeStyles.length].text}`}
            >
              {data}
            </Badge>
          ))}
        </div>
      </div>

      {/* Course Completed */}
      <div className="border px-8 py-3 rounded-md dark:bg-neutral-900">
        <p className="w-44 font-semibold">Courses Completed</p>
        <h1 className="font-bold text-3xl mt-1">{badgeCount}</h1>
      </div>
    </div>
  );
}

export default Badges;
