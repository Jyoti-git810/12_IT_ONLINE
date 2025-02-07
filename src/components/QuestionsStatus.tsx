import { useAppSelector } from "@/redux/hook";
import React from "react";

const QuestionsStatus = () => {
  const categories = useAppSelector((state) => state.categories.categories);
  const questionStatus = useAppSelector((state) => state.questionAttemptStatus);
  const { fibUserResponse } = useAppSelector((state) => state.FIB);
  console.log("questionStatus", questionStatus);

  return (
    <div className="bg-35a4b9 p-2 w-1/4">
      <h1>Status</h1>
      {categories.map((x) => {
        const questionList = questionStatus?.[x.category_id];
        return (
          <div
            className="flex justify-between items-center mb-8"
            key={x.category_id}
          >
            <button className="bg-white w-16 h-8">Q{x.category_id}</button>
            <div className="w-69 flex flex-wrap border-1 px-1 justify-start">
              {questionList &&
                questionList.map((y, id) => {
                  const isSubmit = fibUserResponse.find(
                    (x) => x.QuestionID === y.question_id
                  )?.isSubmit;
                  console.log("isSubmit", isSubmit);
                  return (
                    <button
                      key={id}
                      className={`w-7 h-4 m-1 ${
                        isSubmit || y.isSubmitted
                          ? "bg-green-700"
                          : y.isAttempt
                          ? "bg-amber-500"
                          : "bg-red-600"
                      }`}
                    ></button>
                  );
                })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuestionsStatus;
