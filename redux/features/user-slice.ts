import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { StatsType } from "@/lib/utils/types";
import { getUserStats } from "@/lib/queries/user";

interface Board {
  tasks?: Task[];
  boardstatus: string;
  name: string;
  userid: string;
  id: string;
}

interface UserState {
  stats: StatsType | {};
  boards: Board[];
  loading: boolean;
  error: Error | null;
}

const initialState = {
  stats: {},
  boards: [],
  loading: true,
  error: null,
};

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setStats: (state, action: PayloadAction<StatsType>) => {
      state.stats = action.payload;
      state.loading = false;
      state.error = null;
    },
    setBoards: (state, action: PayloadAction<Board[]>) => {
      state.boards = action.payload;
      state.loading = false;
      state.error = null;
    },
    setUserLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUserError: (state, action: PayloadAction<Error>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setStats, setBoards, setUserLoading, setUserError } =
  user.actions;

export const selectUserStats = (state) => state.user.stats;
export const selectUserLoading = (state) => state.user.loading;

export const userReducer = user.reducer;
