import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { transformMcqAns } from "@/util/transform_ans";
import React from "react";

interface PreviewProps {
  categoryID: number;
}

const Preview = ({ categoryID }: PreviewProps) => {
  const previewQuestions = useAppSelector((state) => state.marks.previewData);
  console.log("previewQuestions", previewQuestions);
  const filtercategoryQuestions = previewQuestions.filter(
    (x: any) => x.category_id === categoryID
  );
  return (
    <div className="border-1">
      {filtercategoryQuestions.map((data, id) => {
        const { userAnswer, QuestionText, CorrectAnswer, CorrectOptions } =
          data;

        const { userRes, correctAns } = transformMcqAns(
          userAnswer,
          CorrectAnswer,
          categoryID,
          CorrectOptions
        );
        return (
          <div className="shadow m-8 px-6 py-4">
            <div className="">
              <span>Q{id + 1} </span>
              <span className="text-lg ml-4">{QuestionText}</span>
            </div>
            <div className="mt-2 mb-2">
              <span className="mx-8">Correct Answer</span>
              <span className="text-green-600 font-bold">
                {correctAns ? correctAns : "Not Answered"}
              </span>
            </div>
            <div>
              <span className="mx-8">Your Answer</span>
              <span>{userRes ? userRes : "Not Answered"}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Preview;
