"use client"
import { useUser } from '@clerk/nextjs'
import React from 'react'

function WelcomeBanner() {
   
    const {user} = useUser()


  return (
    <div className='p-5 py-8 bg-blue-500 text-white w-3xl rounded-md'>
        <h1  className='text-2xl'>Welcome, { user?.firstName }!</h1>
        <p className='py-3 '>Learn anytime, anywhere, Boost Your Skills with flexible Online Courses</p>
    </div>
  )
}

export default WelcomeBanner