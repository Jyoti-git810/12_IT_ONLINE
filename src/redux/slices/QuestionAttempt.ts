import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AttemptArray = {
  question_id: number;
  isAttempt: boolean;
  isSubmitted: boolean;
};
interface AttemptType {
  [key: number]: AttemptArray[];
}
const initialState: AttemptType = {};

const QuestionAttemptSlice = createSlice({
  name: "QuestionAttempt",
  initialState,
  reducers: {
    setIntialQuestionAttemptStatus(
      state,
      action: PayloadAction<{ [key: number]: AttemptArray[] }>
    ) {
      Object.assign(state, action.payload);
    },
    setQuestionAttemptStatus(state, action) {
      const { category_id, value, question_id } = action.payload;
      state[category_id] = state[category_id]?.map((x) =>
        x.question_id === question_id && value ? { ...x, isAttempt: true } : x
      );
    },
    setIsSubmittedStatus(state, action) {
      action.payload.forEach((item: any) => {
        state[item.category_id].forEach((data) => {
          if (data.question_id === item.question_id && item.isSubmitted) {
            data.isSubmitted = true;
            data.isAttempt = false;
          }
        });
      });
    },
  },
});

export default QuestionAttemptSlice.reducer;
export const {
  setIntialQuestionAttemptStatus,
  setQuestionAttemptStatus,
  setIsSubmittedStatus,
} = QuestionAttemptSlice.actions;
