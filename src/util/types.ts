import { tableName } from "@/constants";
import { ChangeEvent } from "react";

export interface categoryType {
  categoryId: number;
}

export type CategoryNameType = keyof typeof tableName;
export interface FIBType {
  QuestionID: number;
  QuestionText: string;
  category_id: number;
}

export interface mcqType {
  QuestionID: number;
  QuestionText: string;
  options: [];
  categoryName: string;
}
export interface MCQAnswerType {
  question_id: number;
  answer: [];
  checked: boolean;
}

export interface McqQuestionsProps {
  QuestionText: string;
  options: [];
  QuestionId: number;
  category_id: number;
  id: number;
  mcqAnswer: MCQAnswerType[];
  handleMcqAnswer: (
    event: ChangeEvent<HTMLInputElement>,
    QuestionId: number
  ) => void;
}
