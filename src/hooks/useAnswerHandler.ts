import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setQuestionAttemptStatus } from "@/redux/slices/questionsStatus";

type AnswerStateType = {
  QuestionID: number;
  answer: any;
  category_id: number;
  user_id: number;
};

export const useAnswerHandler = (categoryId: number) => {
  const [answers, setAnswers] = useState<AnswerStateType[]>([]);
  const dispatch = useAppDispatch();
  const examId = JSON.parse(localStorage.getItem("examId"));
  const { userId } = useAppSelector((state) => state.user.user);
  const chapterSelected = useAppSelector(
    (state) => state.chapter.chapterSelected
  );
  const handleAnswerChange = (value: any, questionId: number) => {
    setAnswers((prev) => {
      const answerObj = {
        QuestionID: questionId,
        answer: value,
        category_id: categoryId,
        userID: userId,
        chapter_name: chapterSelected.chapterName,
        chapter_id: chapterSelected.chapterID,
        examId: examId,
      };

      const index = prev.findIndex((x) => x.QuestionID === questionId);
      let updatedAnswers;
      if (index >= 0) {
        updatedAnswers = [...prev];
        updatedAnswers[index] = answerObj;
      } else {
        updatedAnswers = [...prev, answerObj];
      }
      return updatedAnswers;
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
