"use client";
import React, { useEffect, useState } from "react";
import SubmitBtn from "../submitBtn";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import McqQuestions from "../McqQuestions";
import { setQuestionAttemptStatus } from "@/redux/slices/questionsStatus";
import { mcqType } from "@/util/types";
import isEqual from "lodash/isEqual";

interface AnswerType {
  QuestionID: number;
  answer: (string | number)[];
  checked: Record<string | number, boolean>;
  category_id: string;
  user_id: string;
  chapter_name: string;
  chapter_id: string;
  examId: string | null;
}

const MCQ = () => {
  const [mcqAnswer, setMcqAnswer] = useState<AnswerType[]>([]);

  const dispatch = useAppDispatch();
  const mcqQuestions = useAppSelector(
    (state) => state.mcqQuestions.mcqQuestions
  );
  const categoryName = useAppSelector((state) => state.categories.categoryName);
  const categoryId = useAppSelector((state) => state.categories.categoryId);
  const chapterSelected = useAppSelector(
    (state) => state.chapter.chapterSelected
  );
  const { userStoredAnswer } = useAppSelector((state) => state.UserResponse);
  const { userId } = useAppSelector((state) => state.user.user);

  const mcqQuestionsByCategory = mcqQuestions.filter(
    (x) => x.categoryName === categoryName
  );

  const examId =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("examId"))
      : null;

  useEffect(() => {
    if (
      userStoredAnswer &&
      Array.isArray(userStoredAnswer) &&
      !isEqual(mcqAnswer, userStoredAnswer)
    ) {
      setMcqAnswer(userStoredAnswer);
    }
  }, [userStoredAnswer]);

  const handleMcqAnswer = (
    value: string | number,
    isChecked: boolean,
    QuestionId: number
  ) => {
    setMcqAnswer((prev) => {
      let updatedAnswers = [...prev];
      const questionIndex = updatedAnswers.findIndex(
        (x) => x.QuestionID === QuestionId
      );

      if (questionIndex >= 0) {
        updatedAnswers = updatedAnswers.map((item) => {
          const currentAns = Array.isArray(item.answer)
            ? item.answer
            : JSON.parse(item.answer);
          console.log("currentAns", currentAns);
          if (item.QuestionID === QuestionId) {
            const updatedChecked = { ...item.checked, [value]: isChecked };
            const updatedAnswer = isChecked
              ? [...currentAns, value]
              : currentAns.filter((ans) => ans !== value);

            return { ...item, answer: updatedAnswer, checked: updatedChecked };
          }
          return item;
        });
      } else if (isChecked) {
        updatedAnswers.push({
          QuestionID: QuestionId,
          answer: [value],
          checked: { [value]: isChecked },
          category_id: categoryId,
          userID: userId,
          chapter_name: chapterSelected.chapterName,
          chapter_id: chapterSelected.chapterID,
          examId,
        });
      }

      const currentAnswer = updatedAnswers.find(
        (x) => x.QuestionID === QuestionId
      );
      dispatch(
        setQuestionAttemptStatus({
          question_id: QuestionId,
          value: currentAnswer,
          category_id: categoryId,
        })
      );

      return updatedAnswers;
    });
  };

  return (
    <div>
      {mcqQuestionsByCategory.map((mcq, id) => (
        <McqQuestions
          key={mcq.QuestionID}
          QuestionText={mcq.QuestionText}
          options={mcq.options}
          QuestionId={mcq.QuestionID}
          category_id={mcq.categoryID}
          id={id}
          mcqAnswer={mcqAnswer}
          handleMcqAnswer={handleMcqAnswer}
        />
      ))}
      <SubmitBtn answerArray={mcqAnswer} />
    </div>
  );
};

export default MCQ;
