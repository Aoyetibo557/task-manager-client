import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/lib/utils/types";

interface AuthState {
  user: User | {};
  loading: boolean;
  token: string | null;
  error: Error | null;
  isLoggedIn: boolean;
}

const initialState = {
  user: {},
  loading: true,
  token: null,
  error: null,
  isLoggedIn: false,
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState>) => {
      state.user = action.payload;
      state.loading = false;
      state.isLoggedIn = true;
      state.error = null;
      localStorage.setItem(
        "task-user",
        JSON.stringify({ ...state.user, isLoggedIn: true })
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<Error>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    signOut: (state) => {
      state.user = {};
      state.loading = false;
      state.error = null;
      state.isLoggedIn = false;
      localStorage.removeItem("task-user");
    },
    checkUserLoggedIn: (state) => {
      if (localStorage.getItem("task-user")) {
        state.isLoggedIn = true;
        state.user = JSON.parse(localStorage.getItem("task-user") || "{}");
        state.loading = false;
      } else {
        state.isLoggedIn = false;
        state.user = {};
        state.loading = false;
      }
    },
  },
});

export const {
  setUser,
  setLoading,
  setToken,
  setError,
  signOut,
  checkUserLoggedIn,
} = auth.actions;
export const selectUser = (state: RootState) => state.auth.user;
export const selectUserLoading = (state: RootState) => state.auth.loading;
export const selectUserError = (state: RootState) => state.auth.error;
export const selectUserToken = (state: RootState) => state.auth.token;
export const selectUserIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export const authReducer = auth.reducer;
