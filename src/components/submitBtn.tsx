import { useAppDispatch } from "@/store/hook";
import { setUserResponse } from "@/store/slices/userResponse";
import { setIsSubmittedStatus } from "@/store/slices/QuestionAttempt";
import React from "react";

const SubmitBtn = ({ answerArray }) => {
  const dispatch = useAppDispatch();
  const onSubmit = async () => {
    const cc = await fetch("api/questions/fib/insert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answerArray),
    });
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
