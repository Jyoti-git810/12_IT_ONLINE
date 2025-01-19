"use client";

import { mcqQuestions } from "@/constant/questions";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useState,
} from "react";
import SubmitBtn from "../submitBtn";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import McqQuestions from "../McqQuestions";
import { setQuestionAttemptStatus } from "@/store/slices/QuestionAttempt";

interface mcqType {
  QuestionID: number;
  QuestionText: string;
  options: [];
  categoryName: string;
}

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

            const gg = { ...item.checked, [value]: isChecked };
            return {
              ...item,
              checked: gg,
              answer: updatedAnswers,
            };
          }
          return item;
        });
        mcqCategoryObj = mcqCategoryObj.filter((x) => x.answer.length > 0);
        console.log("mcqCategoryObj", mcqCategoryObj);
      } else if (isChecked) {
        mcqCategoryObj = [
          ...mcqCategoryObj,
          {
            question_id: QuestionId,
            answer: [value],
            checked: { [value]: isChecked },
            category_id: categoryId,
          },
        ];
      }
      const answerArray = mcqCategoryObj.find(
        (x) => x.question_id === QuestionId
      );
      console.log("answerArray", answerArray);

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
  console.log("mcqAnswer", mcqAnswer);
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
