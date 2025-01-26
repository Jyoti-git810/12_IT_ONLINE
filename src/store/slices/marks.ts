import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryViseMarks: {
    FIB: 0,
    mcqMarks: 0,
    trueFalseMarks: 0,
    rearrangeMarks: 0,
  },
  totalMarks: 0,
  previewData: [],
};

const marksSlice = createSlice({
  name: "MarksSlice",
  initialState: initialState,
  reducers: {
    setMarks(state, action) {
      console.log("action", action.payload);
      const {
        trueFalseTotalMarks,
        fibTotalMarks,
        mcqTotalMarks,
        rearrangeTotalMarks,
        previewQuestionsArray,
      } = action.payload;
      const totalMarks =
        trueFalseTotalMarks +
        fibTotalMarks +
        mcqTotalMarks +
        rearrangeTotalMarks;
      state.categoryViseMarks.fibMarks = fibTotalMarks;
      state.categoryViseMarks.mcqMarks = mcqTotalMarks;
      state.categoryViseMarks.trueFalseMarks = trueFalseTotalMarks;
      state.categoryViseMarks.rearrangeMarks = rearrangeTotalMarks;
      state.totalMarks = totalMarks;
      state.previewData = previewQuestionsArray;
    },
  },
});
export default marksSlice.reducer;
export const { setMarks } = marksSlice.actions;
