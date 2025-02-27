import { tableName } from "@/constants";
import { CategoryNameType } from "./types";
import { useAppDispatch } from "@/redux/hook";
import { setTimer } from "@/redux/slices/timer";
import { useRouter } from "next/navigation";

export const getTableName = (categoryName: string) => {
  if (categoryName in tableName) {
    return tableName[categoryName as CategoryNameType]; // Type assertion after check
  }
  return undefined; // Handle invalid category names gracefully
};

export const getUserAnswer = (
  userStoredAnswerList,
  question_id,
  categoryId
) => {
  const answer = userStoredAnswerList.find(
    (x: any) => x.QuestionID === question_id && x.category_id === categoryId
  )?.answer;
  return answer;
};
