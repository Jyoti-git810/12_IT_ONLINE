import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fibQuestions: [],
  fibUserResponse: [],
};

const FIB = createSlice({
  name: "FIB",
  initialState,
  reducers: {
    getFibQuestion(state, action) {
      state.fibQuestions = action.payload;
    },
    getFibUserResponse(state, action) {
      state.fibUserResponse = action.payload;
    },
  },
});
export default FIB.reducer;
export const { getFibQuestion, getFibUserResponse } = FIB.actions;
