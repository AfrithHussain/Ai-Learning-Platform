"use client";

import React, { useEffect, useState } from "react";
import { UserProfile } from "@clerk/nextjs";
import SkeletonProfile from "./_skeleton/SkeletonProfile";

function Profile() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate Clerk widget loading (usually a second or two)
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Manage your Profile</h2>
      {isLoading ? <SkeletonProfile /> : <UserProfile routing="hash" />}
    </div>
  );
}

export default Profile;
