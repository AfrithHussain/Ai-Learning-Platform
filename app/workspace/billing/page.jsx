import { PricingTable } from '@clerk/nextjs'
import React from 'react'

function Billing() {
  return (
    <div>
        <h1 className='text-3xl font-bold mb-4'>Select Plan</h1>
        <PricingTable/>
    </div>
  )
}

export default Billing