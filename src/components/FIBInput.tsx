import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setQuestionAttemptStatus } from "@/redux/slices/questionsStatus";
import React, { ChangeEvent, useEffect, useState, useRef } from "react";

interface FIBInputProps {
  questionText: string;
  questionNumber?: number;
  categoryId: number;
  question_id: number;
  disable: boolean;
  handleAnswerChange: (value: string | number | [], QuestionId: number) => void;
}

const FIBInput = ({
  questionText,
  questionNumber,
  question_id,
  categoryId,
  handleAnswerChange,
}: FIBInputProps) => {
  const [value, setValue] = useState<string>("");
  const [debounceValue, setDebounceValue] = useState<string>("");
  const dispatch = useAppDispatch();
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const { userStoredAnswer } = useAppSelector((state) => state.UserResponse);
  const userAnswer = userStoredAnswer.find(
    (x: any) => x.QuestionID === question_id && x.category_id === categoryId
  )?.answer;

  // 🔹 Sync local state with Redux answer on mount
  useEffect(() => {
    setValue(userAnswer ?? "");
  }, [userAnswer]);

  // 🔹 Handle input change with debouncing
  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);

    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setDebounceValue(event.target.value);
    }, 300);
  };

  // 🔹 Update answer in Redux when debounceValue updates
  useEffect(() => {
    handleAnswerChange(debounceValue, question_id);
    dispatch(
      setQuestionAttemptStatus({
        question_id,
        value: debounceValue,
        category_id: categoryId,
      })
    );
  }, [debounceValue, question_id, categoryId, dispatch]);

  return (
    <div className="text-black flex justify-between border border-gray-400 items-center">
      <p className="p-4">Q{questionNumber}</p>
      <p className="p-6 border-x border-gray-400 w-75">{questionText}</p>
      <div className="p-4 w-55">
        <input
          type="text"
          className="border border-gray-400 w-full p-2"
          value={value}
          onChange={onInputChange}
        />
      </div>
    </div>
  );
};

export default FIBInput;
