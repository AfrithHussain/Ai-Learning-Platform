"use client";

import React, { useEffect, useState } from "react";
import QuizzContent from "../_components/QuizzContent";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function Page() {
  const { quizzId } = useParams();
  const [quizzData, setQuizzData] = useState([]);
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchQuiz() {
      if (!quizzId) {
        setIsLoading(false); // Stop loading if no quizzId
        return;
      }

      try {
        const res = await axios.get(`/api/quizz-content?courseId=${quizzId}`);
        const quizzes = res.data.quizzes;
        setQuizzData(quizzes)
        

     
      } catch (err) {
        console.error("Error fetching quiz:", err);
      } finally {
        setIsLoading(false); // ✅ Stop loading after fetch attempt
      }
    }

    fetchQuiz();
     
  }, [quizzId]);
  
 

  if (isLoading) {
    return <div>Loading quiz...</div>;
  }

  if (quizzData.length === 0) {
    return <div>Quiz not found.</div>;
  }

  return (
    <div>
     <div className="border-b">
       <Link className="flex justify-end mx-10 m-3  " href={'/workspace'}><Button  variant={'outline'}>Back</Button></Link>
     </div>
      <QuizzContent quizzId={quizzId} quizData={quizzData} />
    </div>
  );
}

export default Page;
