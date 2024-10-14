import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {
  ApplicationApi,
  ApplicationData,
  CreateApplicationParams,
  UpdateApplicationParams,
} from "../Api/Application"
import { AsyncState, AsyncStateEnum, ThunkApi } from "../types"

type Application = { data: ApplicationData; state: AsyncState }
export type ApplicationState = {
  collection: Application[]
  error: string | null
  loadState: AsyncState
}
const initialState: ApplicationState = {
  collection: [],
  error: null,
  loadState: AsyncStateEnum.INIT,
}

export const getApplicationList = createAsyncThunk<
  ApplicationData[],
  undefined,
  ThunkApi
>(
  "applications/listApplications",
  async () => {
    return await ApplicationApi.getAllApplications()
  },
  {
    condition: (_, { getState }) => {
      const { application } = getState()
      if (
        application.loadState === AsyncStateEnum.FULFILLED ||
        application.loadState === AsyncStateEnum.PENDING
      )
        return false
    },
  }
)

export const getApplication = createAsyncThunk<
  ApplicationData,
  { id: number },
  { state: ApplicationState }
>("applications/getApplication", async ({ id }, thunkApi) => {
  return await ApplicationApi.getApplication(id)
})

export const createApplication = createAsyncThunk<
  ApplicationData,
  CreateApplicationParams
>("applications/createApplication", async (newApplication) => {
  return await ApplicationApi.createApplication(newApplication)
})

export const updateApplication = createAsyncThunk<
  ApplicationData,
  UpdateApplicationParams
>("applications/updateApplication", async (application) => {
  return await ApplicationApi.updateApplication(application)
})

export const deleteApplication = createAsyncThunk<number, { id: number }>(
  "applications/deleteApplication",
  async ({ id }) => {
    await ApplicationApi.deleteApplication(id)
    return id
  }
)

export const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getApplicationList.pending, (state) => {
      state.loadState = AsyncStateEnum.PENDING
    })

    builder.addCase(getApplicationList.fulfilled, (state, action) => {
      state.collection = action.payload.map((data) => ({
        data,
        state: AsyncStateEnum.FULFILLED,
      }))
      state.loadState = AsyncStateEnum.FULFILLED
    })
    builder.addCase(getApplicationList.rejected, (state, action) => {
      state.error = `Failed to get application list: ${action.error.message}`
      state.loadState = AsyncStateEnum.REJECTED
    })
    builder.addCase(getApplication.pending, (state, action) => {
      const targetIndex = state.collection.findIndex(
        (application) => application.data.id === action.meta.arg.id
      )
      if (targetIndex === -1) return
      state.collection[targetIndex].state = AsyncStateEnum.PENDING
    })
    builder.addCase(getApplication.fulfilled, (state, action) => {
      const targetIndex = state.collection.findIndex(
        (application) => application.data.id === action.payload.id
      )
      if (targetIndex === -1) {
        state.collection = [
          ...state.collection,
          {
            data: action.payload,
            state: AsyncStateEnum.FULFILLED,
          },
        ]
      } else {
        state.collection[targetIndex] = {
          data: action.payload,
          state: AsyncStateEnum.FULFILLED,
        }
      }
    })
    builder.addCase(getApplication.rejected, (state, action) => {
      const targetIndex = state.collection.findIndex(
        (application) => application.data.id === action.meta.arg.id
      )
      if (targetIndex !== -1) {
        state.collection[targetIndex].state = AsyncStateEnum.REJECTED
      }
      state.error = `Failed to get application: ${action.error.message}`
    })
    builder.addCase(createApplication.fulfilled, (state, action) => {
      state.collection = [
        ...state.collection,
        { data: action.payload, state: AsyncStateEnum.FULFILLED },
      ]
      state.loadState = AsyncStateEnum.FULFILLED
    })
    builder.addCase(createApplication.rejected, (state, action) => {
      state.error = `Failed to create application: ${action.error}`
    })
    builder.addCase(updateApplication.pending, (state, action) => {
      const targetIndex = state.collection.findIndex(
        (application) => application.data.id === action.meta.arg.id
      )
      if (targetIndex === -1) return
      state.collection[targetIndex].state = AsyncStateEnum.PENDING
    })
    builder.addCase(updateApplication.fulfilled, (state, action) => {
      const targetIndex = state.collection?.findIndex(
        (application) => application.data.id === action.payload.id
      )
      if (targetIndex === -1) return
      state.collection[targetIndex] = {
        data: action.payload,
        state: AsyncStateEnum.FULFILLED,
      }
    })
    builder.addCase(updateApplication.rejected, (state, action) => {
      const targetIndex = state.collection.findIndex(
        (application) => application.data.id === action.meta.arg.id
      )
      if (targetIndex === -1) return
      state.collection[targetIndex].state = AsyncStateEnum.REJECTED

      state.error = `Failed to update application: ${action.error}`
    })
    builder.addCase(deleteApplication.pending, (state, action) => {
      const targetIndex = state.collection.findIndex(
        (application) => application.data.id === action.meta.arg.id
      )
      if (targetIndex === -1) return
      state.collection[targetIndex].state = AsyncStateEnum.PENDING
    })
    builder.addCase(deleteApplication.fulfilled, (state, action) => {
      state.collection = state.collection.filter(
        (application) => application.data.id !== action.payload
      )
    })
    builder.addCase(deleteApplication.rejected, (state, action) => {
      const targetIndex = state.collection.findIndex(
        (application) => application.data.id === action.meta.arg.id
      )
      if (targetIndex === -1) return
      state.collection[targetIndex].state = AsyncStateEnum.REJECTED

      state.error = `Failed to delete application`
    })
  },
})

export default applicationSlice.reducer
