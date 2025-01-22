import React, { useState } from "react";
import FIB from "./QuestionType/FIB";
import TrueFalse from "./QuestionType/TrueFalse";
import MCQ from "./QuestionType/MCQ";
import Rearrange from "./QuestionType/Rearrange";
import { useAppSelector } from "@/store/hook";
import { mcqType } from "@/constant/questionType";

const QuestionList = () => {
  const categoryFullName = useAppSelector(
    (state) => state.categories.categoryFullName
  );
  const categoryName = useAppSelector((state) => state.categories.categoryName);
  const categoryId = useAppSelector((state) => state.categories.categoryId);

  return (
    <div className="w-95  mx-4 border-1 border-gray-400 p-8">
      <h1 className="text-red-600 text-lg uppercase text-center">
        {categoryFullName}
      </h1>
      {categoryName === "FIB" ? (
        <FIB categoryId={categoryId} />
      ) : mcqType.includes(categoryName) ? (
        <MCQ key={categoryId} />
      ) : categoryName === "True/False" ? (
        <TrueFalse categoryId={categoryId} />
      ) : categoryName === "Rearrange" ? (
        <Rearrange categoryId={categoryId} />
      ) : (
        ""
      )}
    </div>
  );
};

export default QuestionList;
