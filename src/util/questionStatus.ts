interface AllQuestionsType {
  QuestionID: number;
  QuestionText: string;
  category_id: number;
}
type AccArray = {
  question_id: number;
  isAttempt: boolean;
  isSubmitted: boolean;
};
interface AccType {
  [key: number]: AccArray[];
}

export const getQuestionsStatusObj = (allQuestions: AllQuestionsType[]) => {
  const isAttemptObj = allQuestions.reduce((acc: AccType, x) => {
    const category = x.category_id;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push({
      question_id: x.QuestionID,
      isAttempt: false,
      isSubmitted: false,
    });

    return acc;
  }, {});
  return isAttemptObj;
};
