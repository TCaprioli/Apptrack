export const AsyncStateEnum = {
  INIT: "init",
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
} as const

export type AsyncState = (typeof AsyncStateEnum)[keyof typeof AsyncStateEnum]
