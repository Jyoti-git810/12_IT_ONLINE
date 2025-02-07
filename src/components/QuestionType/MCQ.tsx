"use client";
import React, { ChangeEvent, useState } from "react";
import SubmitBtn from "../submitBtn";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import McqQuestions from "../McqQuestions";
import { setQuestionAttemptStatus } from "@/redux/slices/QuestionAttempt";
import { mcqType } from "@/util/types";

const MCQ = () => {
  const [mcqAnswer, setMcqAnswer] = useState([]);
  const mcqQuestions: mcqType[] = useAppSelector(
    (state) => state.mcqQuestions.mcqQuestions
  );
  const categoryName = useAppSelector((state) => state.categories.categoryName);
  const categoryId = useAppSelector((state) => state.categories.categoryId);
  const mcqQuestionsByCategory = mcqQuestions.filter(
    (x) => x.categoryName === categoryName
  );
  const chapterSelected = useAppSelector(
    (state) => state.chapter.chapterSelected
  );
  const exameId = JSON.parse(localStorage.getItem("exameId"));
  const { userId } = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const handleMcqAnswer = (
    event: ChangeEvent<HTMLInputElement>,
    QuestionId: number
  ) => {
    const value = event.target.value;
    const isChecked = event.target.checked;
    setMcqAnswer((prev: any) => {
      let mcqCategoryObj: any = [...prev];
      const questionIndex = mcqCategoryObj?.findIndex(
        (x: any) => x.question_id === QuestionId
      );

      if (questionIndex >= 0) {
        mcqCategoryObj = mcqCategoryObj.map((item: any) => {
          if (item.question_id === QuestionId) {
            const updatedAnswers = isChecked
              ? [...item.answer, value]
              : item.answer.filter((ans: any) => ans !== value);

            const isCheckedObj = { ...item.checked, [value]: isChecked };
            return {
              ...item,
              checked: isCheckedObj,
              answer: updatedAnswers,
            };
          }
          return item;
        });
        mcqCategoryObj = mcqCategoryObj.filter((x: any) => x.answer.length > 0);
      } else if (isChecked) {
        mcqCategoryObj = [
          ...mcqCategoryObj,
          {
            question_id: QuestionId,
            answer: [value],
            checked: { [value]: isChecked },
            category_id: categoryId,
            user_id: userId,
            chapter_name: chapterSelected.chapterName,
            chapter_id: chapterSelected.chapterID,
            examId: exameId,
          },
        ];
      }
      const answerArray = mcqCategoryObj.find(
        (x: any) => x.question_id === QuestionId
      );

      dispatch(
        setQuestionAttemptStatus({
          question_id: QuestionId,
          value: answerArray,
          category_id: categoryId,
        })
      );
      return mcqCategoryObj;
    });
  };
  return (
    <div>
      {mcqQuestionsByCategory.map((mcq: any, id: number) => (
        <McqQuestions
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
