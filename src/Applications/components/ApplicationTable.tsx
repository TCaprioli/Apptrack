import { useAppDispatch, useAppSelector } from "../../store"
import { deleteApplication } from "../slice"

export const ApplicationTable = () => {
  const applications = useAppSelector((state) => state.application.collection)
  const dispatch = useAppDispatch()
  const onDelete = async (id: number) =>
    await dispatch(deleteApplication({ id })).unwrap()

  return (
    <table className="table-auto border-collapse w-full md:w-9/12">
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
          <th className="border border-slate-300 bg-slate-200">Action</th>
        </tr>
      </thead>
      <tbody className="border border-slate-300">
        {applications.map((app) => (
          <tr key={app.data.id}>
            <td className="border border-slate-300 pl-2">{app.data.company}</td>
            <td className="hidden md:table-cell border border-slate-300 pl-2">
              {app.data.jobTitle}
            </td>
            <td className="hidden md:table-cell border border-slate-300 pl-2">
              {app.data.location}
            </td>
            <td className="border border-slate-300 pl-2">{app.data.status}</td>
            {/* TODO: Turn this into a menu */}
            <td className="border border-slate-300 text-center">
              {/* TODO: Add favorites */}
              {/* TODO: Add view */}
              <button className="bg-green-500 text-white mx-1">Update</button>
              <button
                className="bg-red-500 text-white mx-1"
                onClick={() => onDelete(app.data.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
