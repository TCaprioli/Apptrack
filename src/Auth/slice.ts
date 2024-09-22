import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "./types";
import { UserApi } from "../Api/User";

export type UserState = {
  data: User | null;
  error: string | null;
  loadState: {
    init: boolean;
    pending: boolean;
    fulfilled: boolean;
    rejected: boolean;
  };
};
const initialState: UserState = {
  data: null,
  error: null,
  loadState: { init: true, pending: false, fulfilled: false, rejected: false },
};

export const login = createAsyncThunk<
  User | null,
  { email: string; password: string }
>("users/login", async (userArgs) => {
  const user = await UserApi.login({
    email: userArgs.email,
    password: userArgs?.password,
  });
  localStorage.setItem("authToken", user.token);
  return { id: user.id, email: user.email };
});

export const register = createAsyncThunk<
  User | null,
  { email: string; password: string }
>("users/register", async (userArgs) => {
  const user = await UserApi.register({
    email: userArgs.email,
    password: userArgs?.password,
  });
  localStorage.setItem("authToken", user.token);
  return { id: user.id, email: user.email };
});

export const verifyUser = createAsyncThunk<User | null>(
  "users/verify",
  async () => {
    const token = localStorage.getItem("authToken");
    if (token === null) {
      throw new Error("Could not find token");
    }
    const user = await UserApi.verify(token);
    return { id: user.id, email: user.email };
  }
);

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      localStorage.removeItem("authToken");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.data = null;
      state.loadState = {
        init: false,
        pending: true,
        fulfilled: false,
        rejected: false,
      };
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loadState = {
        init: false,
        pending: false,
        fulfilled: true,
        rejected: false,
      };
    });
    builder.addCase(login.rejected, (state, action) => {
      state.data = null;
      state.error = `Failed to login user: ${action.error.message}`;
      state.loadState = {
        init: false,
        pending: false,
        fulfilled: false,
        rejected: true,
      };
    });
    builder.addCase(register.pending, (state) => {
      state.data = null;
      state.loadState = {
        init: false,
        pending: true,
        fulfilled: false,
        rejected: false,
      };
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loadState = {
        init: false,
        pending: false,
        fulfilled: true,
        rejected: false,
      };
    });
    builder.addCase(register.rejected, (state, action) => {
      state.data = null;
      state.error = `Failed to register user: ${action.error.message}`;
      state.loadState = {
        init: false,
        pending: false,
        fulfilled: false,
        rejected: true,
      };
    });
    builder.addCase(verifyUser.pending, (state) => {
      state.data = null;
      state.loadState = {
        init: false,
        pending: true,
        fulfilled: false,
        rejected: false,
      };
    });
    builder.addCase(verifyUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loadState = {
        init: false,
        pending: false,
        fulfilled: true,
        rejected: false,
      };
    });
    builder.addCase(verifyUser.rejected, (state) => {
      state.data = null;
      state.error = `Failed to verify user`;
      state.loadState = {
        init: false,
        pending: false,
        fulfilled: false,
        rejected: true,
      };
    });
  },
});

export const { logout } = counterSlice.actions;

export default counterSlice.reducer;
