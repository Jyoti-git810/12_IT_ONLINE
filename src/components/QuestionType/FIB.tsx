"use client";

import React, { useState } from "react";
import SubmitBtn from "../submitBtn";
import FIBInput from "../FIBInput";
import { useAppSelector } from "@/store/hook";

interface Answer {
  question_id: number;
  answer: string | number;
  category_type: string;
  user_id: number;
}

interface FIBType {
  QuestionID: number;
  QuestionText: string;
  category_id: number;
}

const FIB = () => {
  const [answer, setAnswer] = useState<
    {
      question_id: number;
      answerText: string | number;
    }[]
  >([]);
  const fibQuestions = useAppSelector(
    (state) => state.fibQuestions.fibQuestions
  );
  const handleSetAnswer = (answerObj: Answer) => {
    setAnswer((prev) => {
      const index = prev.findIndex(
        (x) => x.question_id === answerObj.question_id
      );
      if (index !== -1) {
        return prev.map((x, i) => (i === index ? answerObj : x));
      }
      return [...prev, answerObj];
    });
  };
  return (
    <div>
      {fibQuestions.map((x: FIBType, id) => (
        <FIBInput
          key={x.QuestionID}
          questionText={x.QuestionText}
          questionNumber={id + 1}
          question_id={x.QuestionID}
          handleSetAnswer={handleSetAnswer}
          category_id={x.category_id}
        />
      ))}

      <SubmitBtn answerArray={answer} />
    </div>
  );
};

export default FIB;
