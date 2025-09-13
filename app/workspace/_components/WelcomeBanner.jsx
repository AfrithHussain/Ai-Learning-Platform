// WelcomeBanner.jsx
"use client"
import { useUser } from '@clerk/nextjs'
import React from 'react'

function WelcomeBanner() {
    const {user} = useUser()

  return (
    /* FROM: w-3xl
      TO:   w-full (implicitly, by removing the fixed width)
      WHY:  This is the most critical fix. The banner must be able to shrink
            to fit the screen. Fixed widths break responsiveness.

      IMPROVEMENT: Adjusted padding and font sizes for different screen sizes.
    */
    <div className='p-5 md:p-7 text-white rounded-lg bg-cyan-900 dark:bg-neutral-900 shadow-md'>
        <h1 className='text-xl md:text-3xl font-bold'>Welcome, { user?.firstName }!</h1>
        <p className='mt-2 text-sm md:text-base'>Boost Your Skills with flexible Online Courses. Learn anytime, anywhere.</p>
    </div>
  )
}

export default WelcomeBanner;