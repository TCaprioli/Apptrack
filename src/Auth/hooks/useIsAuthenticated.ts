import React from "react"
import { useAppSelector } from "../../store"
import { UserState } from "../slice"

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
      renderWithAuthentication({ user, Loading, Fulfilled, Rejected }),
  }
}

function renderWithAuthentication(args: {
  user: UserState
  Loading: React.JSX.Element
  Fulfilled: React.JSX.Element
  Rejected: React.JSX.Element
}) {
  if (args.user.loadState.init || args.user.loadState.pending)
    return args.Loading
  if (args.user.loadState.fulfilled && args.user.data !== null)
    return args.Fulfilled
  if (args.user.loadState.rejected) return args.Rejected
  return null
}
