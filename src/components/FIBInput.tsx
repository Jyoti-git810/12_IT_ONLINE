import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setQuestionAttemptStatus } from "@/store/slices/QuestionAttempt";
import React, { ChangeEvent, useEffect, useState } from "react";

interface FIBInputProps {
  questionText: string;
  questionNumber?: number;
  category_id?: number;
  question_id?: number;
  handleSetAnswer: (answer: {
    question_id: number;
    answer: string | number;
  }) => void;
}

const FIBInput = ({
  questionText,
  questionNumber,
  question_id,
  category_id,
  handleSetAnswer,
}: FIBInputProps) => {
  const [value, setValue] = useState("");
  const [debounceValue, setDebounceValue] = useState("");
  const dispatch = useAppDispatch();
  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, 300);
    return () => clearTimeout(timer);
  }, [value]);
  useEffect(() => {
    if (debounceValue) {
      handleSetAnswer({
        question_id,
        answer: debounceValue,
        user_id: 1,
        category_id: category_id,
      });
    }
  }, [debounceValue, question_id]);

  useEffect(() => {
    const obj = {
      question_id,
      value,
      category_id: 1,
    };
    if (value.length === 1) {
      dispatch(setQuestionAttemptStatus(obj));
    } else if (value.length === 0) {
      dispatch(setQuestionAttemptStatus(obj));
    }
  }, [value]);

  return (
    <div className="text-black flex justify-between border-1 border-gray-400 items-center">
      <p className="p-4">Q{questionNumber}</p>
      <p className="p-6 border-x border-gray-400 w-75">{questionText}</p>
      <div className="p-4 w-55">
        <input
          type="text"
          className="border-1 border-gray-400 w-full"
          value={value}
          onChange={onInputChange}
        />
      </div>
    </div>
  );
};

export default FIBInput;
