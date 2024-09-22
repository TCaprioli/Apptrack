import axios from "axios";

const BaseUrl = import.meta.env.VITE_API_URL;
const UserUrl = BaseUrl + "/users";

type UserData = { id: number; email: string; token: string };

interface UserApi {
  login: (args: { email: string; password: string }) => Promise<UserData>;
  register: (args: { email: string; password: string }) => Promise<UserData>;
  verify: (token: string) => Promise<UserData>;
}

const login: UserApi["login"] = async (args) => {
  const resp = await axios.post(UserUrl + "/login", { ...args });
  return resp.data;
};

const register: UserApi["register"] = async (args) => {
  const resp = await axios.post(UserUrl + "/register", { ...args });
  return resp.data;
};

const verify: UserApi["verify"] = async (token) => {
  const resp = await axios.post(UserUrl + "/me", { token });
  return resp.data;
};

export const UserApi: UserApi = {
  login,
  register,
  verify,
};
