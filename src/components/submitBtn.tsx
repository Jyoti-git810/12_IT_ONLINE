import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setUserResponse } from "@/store/slices/userResponse";
import { setIsSubmittedStatus } from "@/store/slices/QuestionAttempt";
import React from "react";
import { tableName } from "@/constants";
import { useAnswerHandler } from "@/hooks/useAnswerHandler";

const SubmitBtn = ({ answerArray }) => {
  const dispatch = useAppDispatch();
  const categoryName = useAppSelector((state) => state.categories.categoryName);
  const CategorytableName = tableName[categoryName];
  let newAnswerArray;
  if (categoryName.includes("MCQ")) {
    newAnswerArray = answerArray.map((x) => ({
      ...x,
      answer: JSON.stringify(x.answer),
    }));
  } else {
    newAnswerArray = answerArray;
  }
  const onSubmit = async () => {
    await fetch("api/answer/insert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: newAnswerArray,
        tableName: CategorytableName,
      }),
    })
      .then((data) => console.log("submitted"))
      .catch((e) => console.log(e));
    dispatch(setUserResponse(answerArray));
    const answerSubmit = answerArray.map((item) => ({
      question_id: item.question_id,
      isSubmitted: true,
      category_id: item.category_id,
    }));
    dispatch(setIsSubmittedStatus(answerSubmit));
  };
  return (
    <button className="bg-35a4b9 px-14 py-2 mt-4" onClick={onSubmit}>
      Submit
    </button>
  );
};

export default SubmitBtn;
