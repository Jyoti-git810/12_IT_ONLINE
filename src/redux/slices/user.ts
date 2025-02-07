import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    name: "",
    userId: undefined,
  },
};

const userSlice = createSlice({
  name: "userSlice",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      const { userName, userId } = action.payload;
      console.log("userId====>", userId);
      state.user.name = userName;
      state.user.userId = userId;
    },
  },
});

export default userSlice.reducer;

export const { setUser } = userSlice.actions;
