import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Task } from "@/lib/utils/types";
import { getBoardTasks } from "@/lib/queries/task";

interface Board {
  tasks?: Task[];
  boardstatus: string;
  name: string;
  userid: string;
  id: string;
}

interface BoardState {
  board: Board;
  userBoards: Board[];
  loading: boolean;
  error: Error | null;
}

const initialState = {
  board: {
    tasks: [],
    boardstatus: "",
    name: "",
    userid: "",
    id: "",
  },
  userBoards: [
    {
      tasks: [],
      boardstatus: "",
      name: "",
      userid: "",
      id: "",
    },
  ],
  loading: false,
  error: null,
};

// define the async thunk to fetch all tasks for all boards in userBoards
export const fetchTasksForAllBoards = createAsyncThunk(
  "board/fetchTasksForAllBoards",
  async (_, { getState }) => {
    try {
      const { userBoards } = getState().board;
      const taskPromises = userBoards.map((board) => getBoardTasks(board.id));

      const tasksForAllBoards = await Promise.all(taskPromises);
      // console.log("tasksForAllBoards:", tasksForAllBoards);
      return tasksForAllBoards;
    } catch (error) {
      // console.error("Error fetching board tasks:", error);
      throw error;
    }
  }
);

export const board = createSlice({
  name: "board",
  initialState,
  reducers: {
    setUserBoards: (state, action: PayloadAction<Board[]>) => {
      state.userBoards = action.payload;
      state.loading = false;
      state.error = null;
    },
    setBoard: (state, action: PayloadAction<Board>) => {
      state.board = action.payload;
    },
    setBoardLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setBoardError: (state, action: PayloadAction<Error>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setBoardTasks: (state, action: PayloadAction<Task[]>) => {
      state.board.tasks = action.payload;
      state.loading = false;
    },
    updateTaskOnBoard: (
      state,
      action: PayloadAction<{
        boardId: string;
        taskId: string;
        updates: Partial<Task>;
      }>
    ) => {
      const { boardId, taskId, updates } = action.payload;
      const boardIndex = state.userBoards.findIndex(
        (board) => board.id === boardId
      );

      if (boardIndex !== -1) {
        const taskIndex = state.userBoards[boardIndex].tasks.findIndex(
          (task) => task.taskId === taskId
        );

        if (taskIndex !== -1) {
          state.userBoards[boardIndex].tasks[taskIndex] = {
            ...state.userBoards[boardIndex].tasks[taskIndex],
            ...updates,
          };
        }
      }
    },
    extraReducers: (builder) => {
      builder.addCase(fetchTasksForAllBoards.pending, (state) => {
        state.loading = true;
        console.log("fetchTasksForAllBoards.pending:", state.loading);
      });
      builder.addCase(fetchTasksForAllBoards.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        //update the tasks for each board in userBoards
        state.userBoards.forEach((board, index) => {
          state.userBoards[index].tasks = action.payload[index];
        });
      });
      builder.addCase(fetchTasksForAllBoards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
    },
  },
});

export const {
  setBoard,
  setUserBoards,
  setBoardLoading,
  setBoardError,
  setBoardTasks,
  updateTaskOnBoard,
} = board.actions;
export const selectUserBoards = (state: { board: { userBoards: Board[] } }) =>
  state.board.userBoards;
export const selectBoardLoading = (state: { board: { loading: boolean } }) =>
  state.board.loading;
export const selectBoardError = (state: { board: { error: Error } }) =>
  state.board.error;
export const selectedBoardTasks = (state: { board: { tasks: Task[] } }) =>
  state.board.tasks;
export const selectedBoard = (state: { board: { board: Board } }) =>
  state.board.board;

export const boardReducer = board.reducer;

/**
 * 
 * export const fetchBoardTasks = createAsyncThunk(
  "board/fetchTasks",
  async (boardId: string, { dispatch }) => {
    dispatch(setBoardLoading(true));

    try {
      const response = await getBoardTasks(boardId);
      const { tasks } = response;
      dispatch(setBoardTasks(tasks)); // Dispatch your action to update the state
      return tasks;
    } catch (error) {
      console.error("Error fetching board tasks:", error);
      throw error;
    } finally {
      dispatch(setBoardLoading(false));
    }
  }
);
 * 
 *  extraReducers: (builder) => {
      builder.addCase(fetchBoardTasks.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(fetchBoardTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      });
      builder.addCase(fetchBoardTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
    },
 */
