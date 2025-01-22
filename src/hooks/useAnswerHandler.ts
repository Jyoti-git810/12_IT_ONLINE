import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { useAppDispatch } from "@/store/hook";
import { setQuestionAttemptStatus } from "@/store/slices/QuestionAttempt";

type AnswerStateType = {
  question_id: number;
  answer: any;
  category_id: number;
  user_id: number;
};

export const useAnswerHandler = (categoryId: number) => {
  const [answers, setAnswers] = useState<AnswerStateType[]>([]);
  const dispatch = useAppDispatch();

  const handleAnswerChange = (value: any, questionId: number, userId = 1) => {
    setAnswers((prev) => {
      const answerObj = {
        question_id: questionId,
        answer: value,
        category_id: categoryId,
        user_id: userId,
      };
      const index = prev.findIndex((x) => x.question_id === questionId);
      let updatedAnswers;
      if (index >= 0) {
        updatedAnswers = [...prev];
        updatedAnswers[index] = answerObj;
      } else {
        updatedAnswers = [...prev, answerObj];
      }
      return updatedAnswers.filter((x) => x.answer.trim() !== "");
    });
    dispatch(
      setQuestionAttemptStatus({
        question_id: questionId,
        value: value,
        category_id: categoryId,
      })
    );
  };
  return { answers, handleAnswerChange };
};
