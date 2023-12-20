import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./features/auth-slice";
import { taskReducer } from "./features/task-slice";
import { boardReducer } from "./features/board-slice";
import { userReducer } from "./features/user-slice";
const rootReducer = combineReducers({
  auth: authReducer,
  task: taskReducer,
  board: boardReducer,
  user: userReducer,
});

export default rootReducer;
