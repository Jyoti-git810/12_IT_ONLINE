import React, { ChangeEvent } from "react";

interface TrueFalseQuestionsProps {
  question_id: number;
  question_text: string;
  id: number;
  handleAnswerSubmit: (
    event: ChangeEvent<HTMLInputElement>,
    question_id: number
  ) => void;
}

const TrueFalseQuestions = ({
  question_id,
  question_text,
  id,
  handleAnswerSubmit,
}: TrueFalseQuestionsProps) => {
  return (
    <div className="text-black flex border-1 border-gray-400 items-center">
      <p className="p-4">Q{id + 1}</p>
      <p className="p-4 border-x border-gray-400 h-28 w-60">{question_text}</p>
      <div className="">
        <div className="ml-8">
          <div className="flex">
            <input
              type="radio"
              name={`true_false_${question_id}`}
              value={1}
              onChange={(event) => handleAnswerSubmit(event, question_id)}
            />
              <label htmlFor="html">True</label>
          </div>
          <div className="flex mt-3">
            <input
              type="radio"
              name={`true_false_${question_id}`}
              value={0}
              onChange={(event) => handleAnswerSubmit(event, question_id)}
            />
              <label htmlFor="css">False</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrueFalseQuestions;
