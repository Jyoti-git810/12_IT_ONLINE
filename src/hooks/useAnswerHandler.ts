import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setQuestionAttemptStatus } from "@/redux/slices/QuestionAttempt";

type AnswerStateType = {
  question_id: number;
  answer: any;
  category_id: number;
  user_id: number;
};

export const useAnswerHandler = (categoryId: number) => {
  const [answers, setAnswers] = useState<AnswerStateType[]>([]);
  const dispatch = useAppDispatch();
  const exameId = JSON.parse(localStorage.getItem("exameId"));
  const { userId } = useAppSelector((state) => state.user.user);
  const chapterSelected = useAppSelector(
    (state) => state.chapter.chapterSelected
  );
  const handleAnswerChange = (value: any, questionId: number) => {
    setAnswers((prev) => {
      const answerObj = {
        question_id: questionId,
        answer: value,
        category_id: categoryId,
        user_id: userId,
        chapter_name: chapterSelected.chapterName,
        chapter_id: chapterSelected.chapterID,
        examId: exameId,
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
