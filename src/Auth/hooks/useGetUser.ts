import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../store"
import { login } from "../slice"
import { UserRequest } from "../types"
import { routes } from "../../routes"

export const useGetUser = (): {
  loginUser: (args: UserRequest) => Promise<string | void>
} => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  async function loginUser(args: UserRequest) {
    try {
      await dispatch(
        login({ email: args.email, password: args.password })
      ).unwrap()
      navigate(routes.APPLICATIONS)
    } catch {
      console.error("login failed")
    }
  }
  return {
    loginUser,
  }
}
