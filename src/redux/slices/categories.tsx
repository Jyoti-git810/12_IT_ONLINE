import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Category {
  category_id: number;
  category_full_name: string;
  category_name: string;
  number_of_questions: number;
}

interface QuestionTypeState {
  categoryFullName: string;
  categoryName: string;
  categoryId: number;
  categories: Category[];
}

// Initial state with proper type definition
const initialState: QuestionTypeState = {
  categoryName: "FIB",
  categoryFullName: "Fill in the blanks",
  categoryId: 1,
  categories: [],
};

// Create the slice
const CategoriesSlice = createSlice({
  name: "Categories",
  initialState,
  reducers: {
    // Update the categoryFullName and categoryName in the state
    setCategoryType(
      state,
      action: PayloadAction<{
        categoryFullName: string;
        categoryName: string;
        categoryId: number;
      }>
    ) {
      state.categoryFullName = action.payload.categoryFullName;
      state.categoryName = action.payload.categoryName;
      state.categoryId = action.payload.categoryId;
    },
    // Update the categories in the state
    getAllCategory(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload;
    },
  },
});

// Export the reducer
export default CategoriesSlice.reducer;

// Export the actions
export const { setCategoryType, getAllCategory } = CategoriesSlice.actions;
