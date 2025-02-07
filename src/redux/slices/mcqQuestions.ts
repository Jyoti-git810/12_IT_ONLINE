import { createSlice } from "@reduxjs/toolkit";

const McqQuestionsSlice = createSlice({
  name: "McqQuestions",
  initialState: {
    mcqQuestions: [],
  },
  reducers: {
    getMcqQuestions(state, action) {
      state.mcqQuestions = action.payload.map((x: any) => ({
        QuestionID: x.QuestionID,
        QuestionText: x.QuestionText,
        categoryName: x.category_name,
        categoryID: x.category_id,
        options: [
          ...JSON.parse(x.WrongOptions),
          ...JSON.parse(x.CorrectOptions),
        ],
      }));
    },
  },
});
export default McqQuestionsSlice.reducer;
export const { getMcqQuestions } = McqQuestionsSlice.actions;
