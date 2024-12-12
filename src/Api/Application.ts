import axios from "axios"
import { getToken } from "../utils"

const BaseUrl = import.meta.env.VITE_API_URL
// TODO: Replace with routes enum when you start the dashboard
const ApplicationUrl = BaseUrl + "/applications"

export type ApplicationData = {
  id: number
  jobTitle: string
  company: string
  location: string | null
  applicationDate: string | null
  userID: number
  status: string
  notes: string | null
  createdAt: Date
  updatedAt: Date
}

export type CreateApplicationParams = {
  jobTitle: string
  company: string
  location: string | null
  applicationDate: Date | null
  status: string
  notes: string | null
}

export type UpdateApplicationParams = {
  id: number
  jobTitle: string
  company: string
  location: string | null
  applicationDate: Date | null
  status: string
  notes: string | null
}
interface ApplicationApi {
  getApplication: (id: number) => Promise<ApplicationData>
  getAllApplications: () => Promise<ApplicationData[]>
  createApplication: (args: CreateApplicationParams) => Promise<ApplicationData>
  updateApplication: (args: UpdateApplicationParams) => Promise<ApplicationData>
  deleteApplication: (id: number) => Promise<void>
}

export const ApplicationApi: ApplicationApi = {
  createApplication: async (args) => {
    const resp = await axios.post(
      ApplicationUrl,
      { ...args },
      { headers: { Authorization: `Bearer ${getToken()}` } }
    )
    return await resp.data
  },
  getAllApplications: async () => {
    const resp = await axios.get(ApplicationUrl, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
    return await resp.data
  },
  getApplication: async (id) => {
    const resp = await axios.get(`${ApplicationUrl}/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
    return await resp.data
  },
  updateApplication: async (args) => {
    const resp = await axios.put(
      `${ApplicationUrl}/${args.id}`,
      { ...args },
      { headers: { Authorization: `Bearer ${getToken()}` } }
    )
    return await resp.data
  },
  deleteApplication: async (id) => {
    await axios.delete(`${ApplicationUrl}/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
  },
}
