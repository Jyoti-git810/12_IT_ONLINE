"use client";

import { useAppSelector } from "@/redux/hook";
import { McqQuestionsProps } from "@/util/types";
import React, { useEffect, useMemo, useState } from "react";

const McqQuestions = ({
  QuestionText,
  options,
  QuestionId,
  handleMcqAnswer,
  id,
}: McqQuestionsProps) => {
  const { userStoredAnswer } = useAppSelector((state) => state.UserResponse);
  const ans = userStoredAnswer.find((x) => x.QuestionID === QuestionId);

  const initialAnswers = useMemo(
    () => (ans?.answer ? JSON.parse(ans.answer) : []),
    [ans?.answer]
  );
  const [selectedOptions, setSelectedOptions] = useState(initialAnswers);

  useEffect(() => {
    setSelectedOptions(initialAnswers);
  }, [initialAnswers]);

  const onCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setSelectedOptions((prevSelections) =>
      checked
        ? [...prevSelections, value]
        : prevSelections.filter((item) => item !== value)
    );

    handleMcqAnswer(value, checked, QuestionId);
  };

  return (
    <div className="text-black flex justify-start border border-gray-400 items-center">
      <p className="p-4">Q{id + 1}</p>
      <div className="flex flex-col border-l border-gray-400">
        <p className="p-4">{QuestionText}</p>
        <div className="p-4">
          {options?.map((data: string | number, index) => (
            <div key={index} className="mt-2">
              <input
                type="checkbox"
                value={data}
                checked={selectedOptions.includes(data)}
                className="text-black mr-2"
                onChange={onCheckboxChange}
              />
              <label>{data}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default McqQuestions;
