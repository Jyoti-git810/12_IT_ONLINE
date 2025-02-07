import { createSlice } from "@reduxjs/toolkit";

type ChapterArrayType = {
  chapterID: number;
  chapterName: string;
};

interface ChapterType {
  chapter: ChapterArrayType[];
  chapterSelected: {};
}

const initialState: ChapterType = {
  chapter: [],
  chapterSelected: {},
};

const chapterSlice = createSlice({
  name: "Chapter",
  initialState: initialState,
  reducers: {
    setChapter(state, action) {
      state.chapter = action.payload;
    },
    getSelectedChapter(state, action) {
      state.chapterSelected = action.payload;
    },
  },
});
export default chapterSlice.reducer;
export const { setChapter, getSelectedChapter } = chapterSlice.actions;
