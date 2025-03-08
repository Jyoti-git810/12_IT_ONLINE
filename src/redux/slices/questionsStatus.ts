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

const questionsStatusSlice = createSlice({
  name: "questionsStatusSlice",
  initialState,
  reducers: {
    setIntialQuestionsStatus(
      state,
      action: PayloadAction<{ [key: number]: AttemptArray[] }>
    ) {
      Object.assign(state, action.payload);
    },
    setQuestionAttemptStatus(
      state,
      action: PayloadAction<{
        category_id: number;
        value: boolean;
        question_id: number;
      }>
    ) {
      const { category_id, value, question_id } = action.payload;
      if (!state[category_id]) return; // Prevent errors if category doesn't exist

      state[category_id] = state[category_id].map((x) =>
        x.question_id === question_id && value ? { ...x, isAttempt: true } : x
      );
    },
    setSubmittedStatus(
      state,
      action: PayloadAction<
        { category_id: number; question_id: number; isSubmitted: boolean }[]
      >
    ) {
      action.payload.forEach((item) => {
        if (!state[item.category_id]) return; // Prevent errors
        state[item.category_id] = state[item.category_id].map((data) =>
          data.question_id === item.question_id && item.isSubmitted
            ? { ...data, isSubmitted: true, isAttempt: false }
            : data
        );
        console.log("state", item);
      });
    },
  },
});

export default questionsStatusSlice.reducer;
export const {
  setIntialQuestionsStatus,
  setQuestionAttemptStatus,
  setSubmittedStatus,
} = questionsStatusSlice.actions;
