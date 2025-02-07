import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setUserResponse } from "@/redux/slices/userResponse";
import { setIsSubmittedStatus } from "@/redux/slices/QuestionAttempt";
import React from "react";
import { tableName } from "@/constants";
import { getFibUserResponse } from "@/redux/slices/Fib";
import axios from "axios";

const SubmitBtn = ({ answerArray }) => {
  const dispatch = useAppDispatch();
  const categoryName = useAppSelector((state) => state.categories.categoryName);
  const { userId } = useAppSelector((state) => state.user.user);
  const examId = JSON.parse(localStorage.getItem("exameId"));
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
    console.log("newAnswerArray", newAnswerArray);
    await axios
      .post("api/answer/insert", {
        data: newAnswerArray,
        tableName: CategorytableName,
        userId: userId,
        exmeId: examId,
      })
      .then((data) => console.log("success"))
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
