import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  programmeAnsQuestions: [],
};

const programmeAnsSlice = createSlice({
  name: "programmeAnsSlice",
  initialState,
  reducers: {
    getProgrammeSliceQuestions(state, action) {
      state.programmeAnsQuestions = action.payload;
    },
  },
});
export default programmeAnsSlice.reducer;
export const { getProgrammeSliceQuestions } = programmeAnsSlice.actions;
