import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../store"
import { login } from "../slice"
import { UserRequest } from "../types"

export const useGetUser = (): {
  loginUser: (args: UserRequest) => Promise<string | void>
} => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  async function loginUser(
    dispatch: ReturnType<typeof useAppDispatch>,
    args: UserRequest
  ) {
    dispatch(login({ email: args.email, password: args.password }))
    navigate("/applications")
  }
  return {
    loginUser: ({ email, password }) =>
      loginUser(dispatch, { email, password }),
  }
}
