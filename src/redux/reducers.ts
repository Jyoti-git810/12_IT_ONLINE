import CategoriesReducer from "./slices/categories";
import UserResponseReducer from "./slices/userResponse";
import FIBReducer from "./slices/Fib";
import mcqQuestionsReducer from "./slices/mcqQuestions";
import trueORfalseReducer from "./slices/trueORFalseQuestions";
import questionStatusReducer from "./slices/questionsStatus";
import rearrangeReducer from "./slices/rearrange";
import marksReducer from "./slices/marks";
import setTimerReducer from "./slices/timer";
import userReducer from "./slices/user";
import chapterReducer from "./slices/chapter";
import shortAnsReducer from "./slices/short";
import programmeReducer from "./slices/programme";
import { combineReducers } from "@reduxjs/toolkit";

export const rootreducers = combineReducers({
  categories: CategoriesReducer,
  UserResponse: UserResponseReducer,
  FIB: FIBReducer,
  mcqQuestions: mcqQuestionsReducer,
  trueORfalse: trueORfalseReducer,
  questionsStatus: questionStatusReducer,
  rearrangeReducer: rearrangeReducer,
  marks: marksReducer,
  timerReducer: setTimerReducer,
  user: userReducer,
  chapter: chapterReducer,
  shortAns: shortAnsReducer,
  programmeAns: programmeReducer,
});
