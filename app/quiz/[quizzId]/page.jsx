"use client";

import React, { useEffect, useState } from "react";
import QuizzContent from "../_components/QuizzContent";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";

function Page() {
  const { quizzId } = useParams();
  const [quizzData, setQuizzData] = useState(null);
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
        console.log(res.data);
        

        if (quizzes.length > 0) {
          setQuizzData(quizzes[0]); // Only one quiz per user-course
        }
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

  if (!quizzData) {
    return <div>Quiz not found.</div>;
  }

  return (
    <div>
      <Link href={'/workspace/my-learning'}>Back</Link>
      <QuizzContent quizData={quizzData} />
    </div>
  );
}

export default Page;
