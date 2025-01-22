import React, { ChangeEvent, useEffect, useState } from "react";
import SubmitBtn from "../submitBtn";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import TrueFalseQuestions from "../TrueFalseQuestions";
import { setQuestionAttemptStatus } from "@/store/slices/QuestionAttempt";
import { useAnswerHandler } from "@/hooks/useAnswerHandler";
import { categoryType } from "@/util/types";

const TrueFalse = ({ categoryId }: categoryType) => {
  const { answers, handleAnswerChange } = useAnswerHandler(categoryId);
  const trueORFalseQuestions = useAppSelector(
    (state) => state.trueORfalse.trueOrFalseQuestions
  );
  const handleAnswerSubmit = (
    event: ChangeEvent<HTMLInputElement>,
    question_id: number
  ) => {
    const value = Number(event.target.value);
    handleAnswerChange(value, question_id);
  };

  return (
    <div>
      {trueORFalseQuestions.map((questions: any, id) => (
        <TrueFalseQuestions
          question_id={questions.QuestionID}
          question_text={questions.QuestionText}
          id={id}
          handleAnswerSubmit={handleAnswerSubmit}
        />
      ))}
      <SubmitBtn answerArray={answers} />
    </div>
  );
};

export default TrueFalse;
