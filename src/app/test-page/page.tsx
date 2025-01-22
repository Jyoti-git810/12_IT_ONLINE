"use client";

import QuestionsStatus from "@/components/QuestionsStatus";
import QuestionList from "@/components/QuestionList";
import CategoryTypes from "@/components/CategoryTypes";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setIntialQuestionAttemptStatus } from "@/store/slices/QuestionAttempt";
import { getAllCategory } from "@/store/slices/categories";
import { getFibQuestion } from "@/store/slices/Fib";
import { setRearrangeQuestions } from "@/store/slices/rearrange";
import { getMcqQuestions } from "@/store/slices/mcqQuestions";
import { setTrueFalseQuestions } from "@/store/slices/trueORFalseQuestions";
import { getQuestionsStatusObj } from "@/util/questionStatus";
import { transformMatch } from "@/util/transformeRearrange";
import React, { useEffect } from "react";

const page = () => {
  const categories = useAppSelector((state) => state.categories.categories);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const callApis = async () => {
      try {
        const [
          categoryResult,
          fibResponseJson,
          mcqResponseJson,
          trueOrfalse,
          rearrangeJson,
        ] = await Promise.all([
          fetch("api/category").then((res) => res.json()),
          fetch("api/questions/fib").then((res) => res.json()),
          fetch("api/questions/mcq").then((res) => res.json()),
          fetch("api/questions/trueOrfalse").then((res) => res.json()),
          fetch("api/questions/rearrange").then((res) => res.json()),
        ]);
        const rearrange = transformMatch(rearrangeJson);
        const RearrangeData = rearrange.map((x) => x.data);
        const flatRearrangeData = RearrangeData.flat();
        const allQuestions = [
          ...fibResponseJson,
          ...mcqResponseJson,
          ...trueOrfalse,
          ...flatRearrangeData,
        ];

        const questionsStatusData = getQuestionsStatusObj(allQuestions);
        dispatch(setIntialQuestionAttemptStatus(questionsStatusData));
        dispatch(getAllCategory(categoryResult));
        dispatch(getFibQuestion(fibResponseJson));
        dispatch(getMcqQuestions(mcqResponseJson));
        dispatch(setTrueFalseQuestions(trueOrfalse));
        dispatch(setRearrangeQuestions(rearrange));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    callApis();
  }, []);

  return (
    <>
      <div className="text-black flex justify-between items-start mt-2">
        <div className="w-17%">
          <p className="border-b-2 border-black p-2">Paper Id:</p>
          <p className="border-b-2 border-black p-2">N02S</p>
          <p className="p-2">You are Viewing</p>
          <p>True/False</p>
        </div>
        <div className="flex justify-between">
          {categories?.map((x) => (
            <CategoryTypes
              key={x.category_id}
              categoryId={x.category_id}
              categoryFullName={x.category_full_name}
              categoryName={x.category_name}
            />
          ))}
        </div>
      </div>
      <div className="flex">
        <QuestionsStatus />
        <QuestionList />
      </div>
    </>
  );
};

export default React.memo(page);
