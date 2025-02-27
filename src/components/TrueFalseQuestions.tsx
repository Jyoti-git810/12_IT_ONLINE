import { useAppSelector } from "@/redux/hook";
import { getUserAnswer } from "@/util/helper";
import React, { ChangeEvent, useEffect, useState } from "react";

interface TrueFalseQuestionsProps {
  question_id: number;
  question_text: string;
  id: number;
  categoryId: number;
  handleAnswerChange: (
    event: ChangeEvent<HTMLInputElement>,
    question_id: number
  ) => void;
}

const TrueFalseQuestions = ({
  question_id,
  question_text,
  id,
  categoryId,
  handleAnswerChange,
}: TrueFalseQuestionsProps) => {
  const { userStoredAnswer } = useAppSelector((state) => state.UserResponse);
  const userAnswer = getUserAnswer(userStoredAnswer, question_id, categoryId);
  const [radioValue, setRadioValue] = useState<number | null>(userAnswer);

  useEffect(() => {
    setRadioValue(userAnswer);
  }, [userAnswer]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    console.log("value", value);
    setRadioValue(value);
    handleAnswerChange(value, question_id);
  };

  return (
    <div
      className="text-black flex border-1 border-gray-400 items-center"
      key={question_id}
    >
      <p className="p-4">Q{id + 1}</p>
      <p className="p-4 border-x border-gray-400 h-28 w-60">{question_text}</p>
      <div className="">
        <div className="ml-8">
          <div className="flex">
            <input
              type="radio"
              name={`true_false_${question_id}`}
              value={1}
              checked={radioValue === 1}
              onChange={onChange}
            />
              <label htmlFor={`true_false_${question_id}`}>True</label>
          </div>
          <div className="flex mt-3">
            <input
              type="radio"
              name={`true_false_${question_id}`}
              value={0}
              checked={radioValue === 0}
              onChange={onChange}
            />
              <label htmlFor={`true_false_${question_id}`}>False</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrueFalseQuestions;
