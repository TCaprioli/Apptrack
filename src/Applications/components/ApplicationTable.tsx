import { useAppSelector } from "../../store"
import { ApplicationItem } from "./ApplicationItem"

export const ApplicationTable = () => {
  const applications = useAppSelector((state) => state.application.collection)

  return (
    <table className="table-auto border-collapse w-full md:w-9/12 text-center">
      <thead>
        <tr>
          <th className="border border-slate-300 bg-slate-200">Company</th>
          <th className="hidden md:table-cell border border-slate-300 bg-slate-200">
            Title
          </th>
          <th className="hidden md:table-cell border border-slate-300 bg-slate-200">
            Location
          </th>
          <th className="border border-slate-300 bg-slate-200">Status</th>
          <th className="border border-slate-300 bg-slate-200 w-16"></th>
        </tr>
      </thead>
      <tbody className="border border-slate-300">
        {applications.map((app) => (
          <ApplicationItem app={app.data} />
        ))}
      </tbody>
    </table>
  )
}
