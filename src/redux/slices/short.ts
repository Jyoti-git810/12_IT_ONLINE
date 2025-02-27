import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shortAnsQuestions: [],
};

const shortAnsSlice = createSlice({
  name: "shortAns",
  initialState,
  reducers: {
    getShortAnsSliceQuestions(state, action) {
      state.shortAnsQuestions = action.payload;
    },
  },
});
export default shortAnsSlice.reducer;
export const { getShortAnsSliceQuestions } = shortAnsSlice.actions;
