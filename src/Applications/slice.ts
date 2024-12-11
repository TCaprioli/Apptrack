import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {
  ApplicationApi,
  ApplicationData,
  CreateApplicationParams,
  UpdateApplicationParams,
} from "../Api/Application"
import { AsyncState, AsyncStateEnum, ThunkApi } from "../types"
import { isAxiosError } from "axios"
import { AppDispatch } from "../store"
import { isEqual } from "lodash"

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
>("applications/getApplication", async ({ id }, { rejectWithValue }) => {
  try {
    return await ApplicationApi.getApplication(id)
  } catch (error) {
    return rejectWithValue(
      isAxiosError(error) ? error.message : "unknown error occurred"
    )
  }
})

export const createApplication = createAsyncThunk<
  ApplicationData,
  CreateApplicationParams
>(
  "applications/createApplication",
  async (newApplication, { rejectWithValue }) => {
    try {
      return await ApplicationApi.createApplication(newApplication)
    } catch (error) {
      return rejectWithValue(
        isAxiosError(error) ? error.message : "unknown error occurred"
      )
    }
  }
)

export const updateApplication = createAsyncThunk<
  ApplicationData,
  UpdateApplicationParams,
  {
    rejectValue: string | unknown
    state: { application: ApplicationState }
    dispatch: AppDispatch
    extra: unknown
  }
>(
  "applications/updateApplication",
  async (application, { rejectWithValue, getState }) => {
    const targetApplication = getState().application.collection.find(
      (app) => app.data.id === application.id
    )?.data

    const formattedDate = targetApplication?.applicationDate
      ? new Date(targetApplication.applicationDate)
      : null
    if (
      isEqual(application.applicationDate, formattedDate) &&
      isEqual(application.company, targetApplication?.company) &&
      isEqual(application.jobTitle, targetApplication?.jobTitle) &&
      isEqual(application.location, targetApplication?.location) &&
      isEqual(application.notes, targetApplication?.notes) &&
      isEqual(application.status, targetApplication?.status)
    ) {
      throw new Error("Must update application before submitting")
    }
    try {
      return await ApplicationApi.getApplication(application.id)
    } catch (error) {
      return rejectWithValue(isAxiosError(error) ? error.message : error)
    }
  }
)

export const deleteApplication = createAsyncThunk<void, { id: number }>(
  "applications/deleteApplication",
  async ({ id }, { rejectWithValue }) => {
    try {
      return await ApplicationApi.deleteApplication(id)
    } catch (error) {
      return rejectWithValue(
        isAxiosError(error) ? error.message : "unknown error occurred"
      )
    }
  }
)

export const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
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
      // add the data to state if it doesn't exist otherwise update it with current server data
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
      state.error = `Failed to create application: ${action.error.message}`
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

      state.error = `Failed to update application: ${action.error.message}`
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
        (application) => application.data.id !== action.meta.arg.id
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

export const { clearError } = applicationSlice.actions

export default applicationSlice.reducer
