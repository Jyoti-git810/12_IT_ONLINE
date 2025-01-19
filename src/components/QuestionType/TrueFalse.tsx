import React, { ChangeEvent, useEffect, useState } from "react";
import SubmitBtn from "../submitBtn";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import TrueFalseQuestions from "../TrueFalseQuestions";
import { setQuestionAttemptStatus } from "@/store/slices/QuestionAttempt";

const TrueFalse = () => {
  const [trueFalseAnswer, setTrueFalseAnswer] = useState([]);
  const trueORFalseQuestions = useAppSelector(
    (state) => state.trueORfalse.trueOrFalseQuestions
  );
  const dispatch = useAppDispatch();
  const handleAnswerSubmit = (
    event: ChangeEvent<HTMLElement>,
    question_id: number
  ) => {
    const value: string = event.target.value;
    setTrueFalseAnswer((prev: any) => {
      const answerObj = {
        question_id: question_id,
        answer: value,
        category_id: 2,
        user_id: 102,
      };
      const index = prev.findIndex((x: any) => x.question_id === question_id);
      if (index !== -1) {
        return prev.map((x: any, i: number) => (i === index ? answerObj : x));
      }
      dispatch(
        setQuestionAttemptStatus({ question_id, value, category_id: 2 })
      );
      return [...prev, answerObj];
    });
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
      <SubmitBtn answerArray={trueFalseAnswer} />
    </div>
  );
};

export default TrueFalse;
