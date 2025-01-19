"use client";

import React, { ChangeEvent } from "react";

interface McqQuestionsProps {
  QuestionText: string;
  options: [];
  QuestionId: number;
  category_id: number;
  id: number;
  mcqAnswer: [
    {
      question_id: number;
      answer: [];
      checked: boolean;
    }
  ];
  handleMcqAnswer: (
    event: ChangeEvent<HTMLInputElement>,
    QuestionId: number
  ) => void;
}

const McqQuestions = ({
  QuestionText,
  options,
  QuestionId,
  handleMcqAnswer,
  category_id,
  id,
  mcqAnswer,
}: McqQuestionsProps) => {
  const mcqAnswerObj: { [key: string]: boolean } =
    mcqAnswer && mcqAnswer.find((x) => x.question_id === QuestionId)?.checked;

  return (
    <div
      className="text-black flex justify-start border-1 border-gray-400 items-center"
      key={id}
    >
      <p className="p-4">Q{id + 1}</p>
      <div className="flex flex-col border-l border-gray-400">
        <p className="p-4">{QuestionText}</p>
        <div className="p-4">
          {options?.map((data: string | number, id) => {
            const isOptionsChecked =
              mcqAnswerObj && mcqAnswerObj[data] ? true : false;
            return (
              <div className="mt-2">
                <input
                  key={category_id}
                  type="checkbox"
                  value={data}
                  checked={isOptionsChecked}
                  className="text-black mr-2"
                  onChange={(event) => handleMcqAnswer(event, QuestionId)}
                />
                <label>{data}</label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default McqQuestions;
