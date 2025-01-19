import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fibQuestions: [],
};

const FibSlice = createSlice({
  name: "FIB",
  initialState,
  reducers: {
    getFibQuestion(state, action) {
      state.fibQuestions = action.payload;
    },
  },
});
export default FibSlice.reducer;
export const { getFibQuestion } = FibSlice.actions;
