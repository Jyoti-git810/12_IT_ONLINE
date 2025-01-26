export const getFieldsTypeCast = (obj: any) => {
  const dbcorrectAnswer =
    typeof obj.CorrectAnswer === "string"
      ? obj.CorrectAnswer.toUpperCase()
      : obj.CorrectAnswer;

  const userResAnswer =
    typeof obj.userAnswer === "string"
      ? obj.userAnswer.toUpperCase()
      : obj.userAnswer;
  return { dbcorrectAnswer, userResAnswer };
};
