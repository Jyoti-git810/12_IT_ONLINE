import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserResponseType {
  user_id: number;
  answer: any;
  question_id: number;
  category_type: string;
}
interface AnswerState {
  userResponse: UserResponseType[];
  userStoredAnswer: any[];
}
const initialState: AnswerState = {
  userResponse: [],
  userStoredAnswer: [],
};

const UserResponseSlice = createSlice({
  name: "UserResponse",
  initialState,
  reducers: {
    setUserResponse(state, action: PayloadAction<UserResponseType[]>) {
      action.payload.forEach((item) => {
        const index = state.userResponse.findIndex(
          (x) =>
            x.question_id === item.question_id &&
            x.category_type === item.category_type
        );
        if (index !== -1) {
          state.userResponse[index] = item;
        } else {
          state.userResponse.push(item);
        }
      });
    },
    getUserStoredAnswer(state, action) {
      state.userStoredAnswer = action.payload;
    },
  },
});
export default UserResponseSlice.reducer;

export const { setUserResponse, getUserStoredAnswer } =
  UserResponseSlice.actions;
