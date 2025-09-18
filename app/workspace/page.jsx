// Work.jsx

import React from 'react';
import WelcomeBanner from './_components/WelcomeBanner';
import Badges from "./_components/Badges";
import EnrollCourseList from './_components/EnrollCourseList';


function Work() {
  return (
    // We use a div with a max-width and center it for better spacing on very large screens.
    <div className="mx-auto max-w-7xl p-4 md:p-6">
      
      {/* FROM: flex flex-wrap lg:flex-nowrap
        TO:   grid grid-cols-1 lg:grid-cols-3
        WHY:  CSS Grid gives us more precise control. It will be a single column on mobile
              and a 3-column grid on large screens, which is perfect for this layout.
      */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content Column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <WelcomeBanner/>
          <EnrollCourseList/>
        </div>

        {/* Badges/Sidebar Column */}
        {/*
          REMOVED: border-l px-10 w-sm
          WHY: The border and padding should not apply on mobile when it's full width.
               We will move these styles into the Badges component itself for better encapsulation.
        */}
        <div className="lg:col-span-1">
          <Badges/>
        </div>

      </div>

    </div>
  )
}

export default Work;