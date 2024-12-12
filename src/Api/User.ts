import axios from "axios"
import { routes } from "../routes"

const BaseUrl = import.meta.env.VITE_API_URL
const UserUrl = BaseUrl + routes.USERS

type UserData = { id: number; email: string; token: string }

interface UserApi {
  login: (args: { email: string; password: string }) => Promise<UserData>
  register: (args: { email: string; password: string }) => Promise<UserData>
  verify: (token: string) => Promise<UserData>
}

export const UserApi: UserApi = {
  login: async (args) => {
    console.log(BaseUrl)
    const resp = await axios.post(UserUrl + routes.LOGIN, { ...args })
    return resp.data
  },
  register: async (args) => {
    const resp = await axios.post(UserUrl + routes.REGISTER, { ...args })
    return resp.data
  },
  verify: async (token) => {
    const resp = await axios.post(UserUrl + routes.ME, { token })
    return resp.data
  },
}
