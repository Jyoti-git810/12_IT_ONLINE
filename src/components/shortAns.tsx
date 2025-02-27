import { useAppSelector } from "@/redux/hook";
import { getUserAnswer } from "@/util/helper";
import React, { ChangeEvent, useEffect, useState } from "react";

interface ShortAnsPropsType {
  QuestionText: string;
  QuestionID: number;
  QuestionNumber: number;
  categoryId: number;
  handleAnswerChange: (value: string, QuestionId: number) => void;
}

const ShortAns = ({
  QuestionText,
  QuestionID,
  QuestionNumber,
  handleAnswerChange,
  categoryId,
}: ShortAnsPropsType) => {
  const [shortAnswer, setShortAnswer] = useState("");
  const { userStoredAnswer } = useAppSelector((state) => state.UserResponse);
  const onAnswerChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setShortAnswer(value);
    handleAnswerChange(value, QuestionID);
  };

  useEffect(() => {
    if (userStoredAnswer) {
      const userAns =
        getUserAnswer(userStoredAnswer, QuestionID, categoryId) || "";
      setShortAnswer(userAns);
    }
  }, [userStoredAnswer]);

  return (
    <div className="text-black border border-gray-400 mt-2">
      <div className="flex items-start">
        <p className="p-4">Q{QuestionNumber + 1}</p>
        <div className="border-l border-gray-400 px-4 w-full">
          <p className="p-2">{QuestionText}</p>
          <label htmlFor={`short-answer-${QuestionID}`} className="sr-only">
            Answer for question {QuestionNumber + 1}
          </label>
          <input
            id={`short-answer-${QuestionID}`}
            className="border border-gray-400 mb-4 h-12 w-full pl-2"
            type="text"
            value={shortAnswer}
            onChange={onAnswerChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ShortAns;
