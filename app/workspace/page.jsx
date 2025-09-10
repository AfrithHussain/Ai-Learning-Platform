import React from 'react';
import WelcomeBanner from './_components/WelcomeBanner';
import Badges from "./_components/Badges";
import EnrollCourseList from './_components/EnrollCourseList';

function Work() {
  return (
    <div>
      
        <div className="flex flex-wrap lg:flex-nowrap gap-5 justify-around">
          <div className="">
            <WelcomeBanner/>
            <EnrollCourseList/>
          </div>
          <div className="border-l px-10 w-sm">
            <Badges/>
          </div>
        </div>
     
    </div>
  )
}

export default Work;
