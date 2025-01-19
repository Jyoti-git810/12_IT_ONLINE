import { createSlice } from "@reduxjs/toolkit";

const TrueOrFalseQuestionsSlice = createSlice({
  name: "TrueOrFalseQuestions",
  initialState: {
    trueOrFalseQuestions: [],
  },
  reducers: {
    setTrueFalseQuestions(state, action) {
      state.trueOrFalseQuestions = action.payload;
    },
  },
});

export default TrueOrFalseQuestionsSlice.reducer;

export const { setTrueFalseQuestions } = TrueOrFalseQuestionsSlice.actions;
