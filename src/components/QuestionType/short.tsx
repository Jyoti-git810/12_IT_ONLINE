import { useAppSelector } from "@/redux/hook";
import React from "react";
import ShortAns from "../shortAns";
import { useAnswerHandler } from "@/hooks/useAnswerHandler";
import SubmitBtn from "../submitBtn";

const Short = () => {
  const { shortAnsQuestions } = useAppSelector((state) => state.shortAns);
  const { programmeAnsQuestions } = useAppSelector(
    (state) => state.programmeAns
  );
  const categoryId = useAppSelector((state) => state.categories.categoryId);
  let questionsList;
  if (categoryId === 8) {
    questionsList = shortAnsQuestions;
  } else if (categoryId === 9) {
    questionsList = programmeAnsQuestions;
  }
  const { answers, handleAnswerChange } = useAnswerHandler(categoryId);

  return (
    <div>
      {questionsList?.map((x: any, id) => (
        <ShortAns
          QuestionID={x.QuestionID}
          QuestionText={x.QuestionText}
          QuestionNumber={id}
          categoryId={x.category_id}
          handleAnswerChange={handleAnswerChange}
        />
      ))}
      <SubmitBtn answerArray={answers} />
    </div>
  );
};
export default Short;
