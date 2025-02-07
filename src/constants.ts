type Category =
  | "FIB"
  | "True/False"
  | "MCQ1"
  | "MCQ2"
  | "MCQ3"
  | "MCQ4"
  | "Rearrange";
export const tableName: Record<Category, string> = {
  FIB: "FIBUserAnswer",
  "True/False": "TruFalseUserAnswer",
  MCQ1: "McqUserAnswers",
  MCQ2: "McqUserAnswers",
  MCQ3: "McqUserAnswers",
  MCQ4: "McqUserAnswers",
  Rearrange: "RearrangeUserAnswer",
};

export const showStudentName = ["/", "/test-page", "/result"];
export const showTimer = ["/test-page"];
