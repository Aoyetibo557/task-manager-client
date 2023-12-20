import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "@/lib/utils/types";

interface TaskState {
  task: Task;
  loading: boolean;
  error: Error | null;
}

const initialState = {
  task: {},
  loading: true,
  error: null,
};

export const task = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTask: (state, action: PayloadAction<Task>) => {
      state.task = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<Error>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setTask, setLoading, setError } = task.actions;
export const selectTask = (state: { task: { task: Task } }) => state.task.task;
export const selectTaskLoading = (state: { task: { loading: boolean } }) =>
  state.task.loading;
export const selectTaskError = (state: { task: { error: Error } }) =>
  state.task.error;

export const taskReducer = task.reducer;
