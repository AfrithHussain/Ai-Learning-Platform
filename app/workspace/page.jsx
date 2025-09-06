import React from 'react'
import WelcomeBanner from './_components/WelcomeBanner'
import CourseList from './_components/CourseList'
import Badges from "./_components/Badges"
function Work() {
  return (
    <div>
      <div className="flex items-center justify-around">
        <div className="">
          <WelcomeBanner/>
      <CourseList/>

        </div>

       <Badges/>
      </div>
      
      
     
    </div>
  )
}

export default Work