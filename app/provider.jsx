"use client"

import { UserDetailContext } from '../context/UserDetailContext'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Provider({children}) {

  const [userDetail, setUserDetail] = useState()

    const {user} = useUser()
     
    useEffect(()=>{
         user && createUser()
    },[user])

    async function createUser(){
        const result = await axios.post('/api/user', {
            name: user?.fullName,
            email: user?.primaryEmailAddress?.emailAddress,
        });

     setUserDetail(result.data)
    }

  return (

    <UserDetailContext.Provider  value={{userDetail, setUserDetail}}>

        <div> {children} </div>
    </UserDetailContext.Provider>
    
  )
}

export default Provider