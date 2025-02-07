import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rearrangeQuestions: [],
};

const RearrangeQuestionsSlice = createSlice({
  name: "RearrangeQuestions",
  initialState,
  reducers: {
    setRearrangeQuestions(state, action) {
      state.rearrangeQuestions = action.payload;
    },
  },
});

export default RearrangeQuestionsSlice.reducer;

export const { setRearrangeQuestions } = RearrangeQuestionsSlice.actions;
