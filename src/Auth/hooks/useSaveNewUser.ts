import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../store"
import { register } from "../slice"
import { UserRequest } from "../types"

export const useSaveNewUser = (): {
  registerUser: (args: UserRequest) => Promise<string | void>
} => {
  const dispatch = useAppDispatch()
  const userState = useAppSelector((state) => state.user)
  const navigate = useNavigate()
  async function registerUser(
    dispatch: ReturnType<typeof useAppDispatch>,
    args: UserRequest
  ) {
    dispatch(register({ email: args.email, password: args.password }))
    if (userState.error == null) {
      navigate("/applications")
    }
  }
  return {
    registerUser: ({ email, password }) =>
      registerUser(dispatch, { email, password }),
  }
}
