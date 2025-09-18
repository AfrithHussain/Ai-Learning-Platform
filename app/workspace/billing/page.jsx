"use client";

import React, { useState, useEffect } from "react";
import { PricingTable } from "@clerk/nextjs";
import SkeletonBilling from "./_components/SkeletonBilling";

function Billing() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // simulate loading (Clerk widget takes time to mount)
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Select Plan</h1>
      {isLoading ? <SkeletonBilling /> : <PricingTable />}
      
    </div>
  );
}

export default Billing;
