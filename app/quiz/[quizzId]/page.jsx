"use client"
import React from 'react'
import QuizzContent from '../_components/QuizzContent'
import { useParams } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';


function page() {
   const {quizzId} = useParams()
   console.log(quizzId);

   const [quizzData, setQuizzData] = useState([]);

    async function quizzDataHandler() {
         try{
             const result = await axios.get('/api/quizz-content');

          console.log(result.data);
         }

         catch(err){
             console.log(err);
             
         }
          
    }
   
    quizzDataHandler()
  return (
    <div>
        <QuizzContent/>
    </div>
  )
}

export default page