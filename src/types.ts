import { AppDispatch, RootState } from "./store"

export const AsyncStateEnum = {
  INIT: "init",
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
} as const

export type AsyncState = (typeof AsyncStateEnum)[keyof typeof AsyncStateEnum]

export type ThunkApi = { state: RootState; dispatch: AppDispatch }
