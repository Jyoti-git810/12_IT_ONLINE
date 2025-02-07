"use client";

import React, { useState } from "react";
import SubmitBtn from "../submitBtn";
import FIBInput from "../FIBInput";
import { useAppSelector } from "@/redux/hook";
import { useAnswerHandler } from "@/hooks/useAnswerHandler";
import { categoryType, FIBType } from "@/util/types";

const FIB = ({ categoryId }: categoryType) => {
  const { answers, handleAnswerChange } = useAnswerHandler(categoryId);
  const { fibQuestions } = useAppSelector((state) => state.FIB);
  return (
    <div>
      {fibQuestions.map((x: FIBType, id) => {
        return (
          <FIBInput
            key={x.QuestionID}
            questionText={x.QuestionText}
            questionNumber={id + 1}
            question_id={x.QuestionID}
            category_id={x.category_id}
            handleAnswerChange={handleAnswerChange}
          />
        );
      })}

      <SubmitBtn answerArray={answers} />
    </div>
  );
};

export default FIB;
