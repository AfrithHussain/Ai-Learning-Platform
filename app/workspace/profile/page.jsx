
import { UserProfile } from '@clerk/nextjs'
import React from 'react'

function Profile() {
  return (
    <div>
        <h2 className='text-2xl font-bold mb-3'>Manage your Profile</h2>

        <UserProfile routing="hash"/>
     

       
    </div>
  )
}

export default Profile