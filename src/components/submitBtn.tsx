import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setUserResponse } from "@/redux/slices/userResponse";
import { setSubmittedStatus } from "@/redux/slices/questionsStatus";
import React from "react";
import axios from "axios";
import { getTableName } from "@/util/helper";

const SubmitBtn = ({ answerArray }) => {
  const dispatch = useAppDispatch();
  const categoryName = useAppSelector((state) => state.categories.categoryName);
  const { userId } = useAppSelector((state) => state.user.user);
  const examId = JSON.parse(localStorage.getItem("examId"));

  let newAnswerArray;
  if (categoryName.includes("MCQ")) {
    newAnswerArray = answerArray.map((x) => ({
      ...x,
      answer: Array.isArray(x.answer) ? JSON.stringify(x.answer) : x.answer,
    }));
  } else {
    newAnswerArray = answerArray;
  }

  const onSubmit = async () => {
    await axios
      .post("api/answer/add", {
        data: newAnswerArray,
        tableName: getTableName(categoryName),
        userId: userId,
        exmeId: examId,
      })
      .then((data) => console.log("data", data.data))
      .catch((e) => console.log(e));
    dispatch(setUserResponse(answerArray));

    const answerSubmit = answerArray.map((item) => ({
      question_id: item.QuestionID,
      isSubmitted: true,
      category_id: item.category_id,
    }));
    dispatch(setSubmittedStatus(answerSubmit));
  };
  return (
    <button className="bg-35a4b9 px-14 py-2 mt-4" onClick={onSubmit}>
      Submit
    </button>
  );
};

export default SubmitBtn;
