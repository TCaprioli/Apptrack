import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { User } from "./types"
import { UserApi } from "../Api/User"
import { AsyncState, AsyncStateEnum } from "../types"
import { HttpStatusCode, isAxiosError } from "axios"

export type UserState = {
  data: User | null
  error: string | null
  loadState: AsyncState
}
const initialState: UserState = {
  data: null,
  error: null,
  loadState: AsyncStateEnum.INIT,
}

export const login = createAsyncThunk<
  User | null,
  { email: string; password: string }
>("users/login", async (userArgs, { rejectWithValue }) => {
  try {
    const user = await UserApi.login({
      email: userArgs.email,
      password: userArgs?.password,
    })
    localStorage.setItem("authToken", user.token)
    return { id: user.id, email: user.email }
  } catch (error) {
    let formattedError = error
    if (isAxiosError(error)) {
      formattedError =
        error.status === HttpStatusCode.Unauthorized
          ? "Invalid credentials. Please try again..."
          : error.message
    }
    return rejectWithValue(formattedError)
  }
})

export const register = createAsyncThunk<
  User | null,
  { email: string; password: string }
>("users/register", async (userArgs, { rejectWithValue }) => {
  try {
    const user = await UserApi.register({
      email: userArgs.email,
      password: userArgs?.password,
    })
    localStorage.setItem("authToken", user.token)
    return { id: user.id, email: user.email }
  } catch (error) {
    return rejectWithValue(
      isAxiosError(error) ? error.message : "unknown error occurred"
    )
  }
})

export const verifyUser = createAsyncThunk<User | null>(
  "users/verify",
  async () => {
    const token = localStorage.getItem("authToken")
    if (token === null) {
      throw new Error("Could not find token")
    }
    const user = await UserApi.verify(token)
    return { id: user.id, email: user.email }
  }
)

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null
      state.loadState = AsyncStateEnum.REJECTED
      localStorage.removeItem("authToken")
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.data = null
      state.loadState = AsyncStateEnum.PENDING
    })

    builder.addCase(login.fulfilled, (state, action) => {
      state.data = action.payload
      state.loadState = AsyncStateEnum.FULFILLED
    })
    builder.addCase(login.rejected, (state, action) => {
      state.data = null
      state.error = `Failed to login user: ${action.payload}`
      state.loadState = AsyncStateEnum.REJECTED
    })
    builder.addCase(register.pending, (state) => {
      state.data = null
      state.loadState = AsyncStateEnum.PENDING
    })
    builder.addCase(register.fulfilled, (state, action) => {
      state.data = action.payload
      state.loadState = AsyncStateEnum.FULFILLED
    })
    builder.addCase(register.rejected, (state, action) => {
      state.data = null
      state.error = `Failed to register user: ${action.payload}`
      state.loadState = AsyncStateEnum.REJECTED
    })
    builder.addCase(verifyUser.pending, (state) => {
      state.data = null
      state.loadState = AsyncStateEnum.PENDING
    })
    builder.addCase(verifyUser.fulfilled, (state, action) => {
      state.data = action.payload
      state.loadState = AsyncStateEnum.FULFILLED
    })
    builder.addCase(verifyUser.rejected, (state) => {
      state.data = null
      state.loadState = AsyncStateEnum.REJECTED
    })
  },
})

export const { logout } = userSlice.actions

export default userSlice.reducer
