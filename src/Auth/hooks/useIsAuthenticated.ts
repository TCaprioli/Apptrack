import React from "react"
import { useAppSelector } from "../../store"
import { UserState } from "../slice"
import { AsyncStateEnum } from "../../types"

export const useIsAuthenticated = (): {
  renderWithAuthentication: (args: {
    Loading: React.JSX.Element
    Fulfilled: React.JSX.Element
    Rejected: React.JSX.Element
  }) => React.JSX.Element | null
} => {
  const user = useAppSelector((state) => state.user)
  return {
    renderWithAuthentication: ({ Loading, Fulfilled, Rejected }) =>
      render({ user, Loading, Fulfilled, Rejected }),
  }
}

function render(args: {
  user: UserState
  Loading: React.JSX.Element
  Fulfilled: React.JSX.Element
  Rejected: React.JSX.Element
}) {
  if (
    args.user.loadState === AsyncStateEnum.INIT ||
    args.user.loadState === AsyncStateEnum.PENDING
  )
    return args.Loading
  if (
    args.user.loadState === AsyncStateEnum.FULFILLED &&
    args.user.data !== null
  )
    return args.Fulfilled
  if (args.user.loadState === AsyncStateEnum.REJECTED) return args.Rejected
  return null
}
