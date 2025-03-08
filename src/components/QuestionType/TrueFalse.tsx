import React, { ChangeEvent, useEffect, useState } from "react";
import SubmitBtn from "../submitBtn";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import TrueFalseQuestions from "../TrueFalseQuestions";
import { setQuestionAttemptStatus } from "@/redux/slices/questionsStatus";
import { useAnswerHandler } from "@/hooks/useAnswerHandler";
import { categoryType } from "@/util/types";

const TrueFalse = ({ categoryId }: categoryType) => {
  const { answers, handleAnswerChange } = useAnswerHandler(categoryId);
  const trueORFalseQuestions = useAppSelector(
    (state) => state.trueORfalse.trueOrFalseQuestions
  );

  return (
    <div>
      {trueORFalseQuestions.map((questions: any, id) => (
        <TrueFalseQuestions
          question_id={questions.QuestionID}
          question_text={questions.QuestionText}
          id={id}
          categoryId={questions.category_id}
          handleAnswerChange={handleAnswerChange}
        />
      ))}
      <SubmitBtn answerArray={answers} />
    </div>
  );
};

export default TrueFalse;
