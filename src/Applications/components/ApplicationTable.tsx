import { ApplicationData } from "../../Api/Application"
import { ApplicationItem } from "./ApplicationItem"
type ApplicationTableProps = {
  applications: ApplicationData[]
  setCurrentApplication: (application: number) => void
}
export const ApplicationTable = (props: ApplicationTableProps) => {
  return (
    <table className="table-auto border-collapse w-full text-center">
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
        {props.applications.map((app) => (
          <ApplicationItem
            key={app.id}
            app={app}
            setCurrentApplication={() => props.setCurrentApplication(app.id)}
          />
        ))}
      </tbody>
    </table>
  )
}
