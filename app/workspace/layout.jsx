import React from 'react'
import WorkspaceProvider from './provider'


function WorkspaceLayout({children}) {
  return (
    <div className=''>
     
         <WorkspaceProvider>
        {children}
      </WorkspaceProvider>
      
     

    </div>
  )
}

export default WorkspaceLayout