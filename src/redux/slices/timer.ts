import { createSlice } from "@reduxjs/toolkit";

const now = new Date().getTime();
const one = now + 60 * 60 * 1000;
const diff = one - now;
const hour = (diff / (60 * 60 * 1000)) % 24;
const min = (diff / (60 * 1000)) % 60;
const sec = (diff / 1000) % 60;

const initialState = {
  hour: hour,
  min: min,
  sec: sec,
};

const timerSlice = createSlice({
  name: "timer",
  initialState: initialState,
  reducers: {
    setTimer(state, action) {
      const { hour, min, sec } = action.payload;
      state.hour = hour;
      state.min = min;
      state.sec = sec;
    },
  },
});

export default timerSlice.reducer;

export const { setTimer } = timerSlice.actions;
