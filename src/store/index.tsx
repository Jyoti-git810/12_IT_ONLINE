import { configureStore } from "@reduxjs/toolkit";
import CategoriesReducer from "./slices/categories";
import UserResponseReducer from "./slices/userResponse";
import fibQuestionsReducer from "./slices/Fib";
import mcqQuestionsReducer from "./slices/mcqQuestions";
import trueORfalseReducer from "./slices/trueORFalseQuestions";
import questionAttemptStatus from "./slices/QuestionAttempt";
import rearrangeReducer from "./slices/rearrange";
import marksReducer from "./slices/marks";

export const store = configureStore({
  reducer: {
    categories: CategoriesReducer,
    UserResponse: UserResponseReducer,
    fibQuestions: fibQuestionsReducer,
    mcqQuestions: mcqQuestionsReducer,
    trueORfalse: trueORfalseReducer,
    questionAttemptStatus: questionAttemptStatus,
    rearrangeReducer: rearrangeReducer,
    marks: marksReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
