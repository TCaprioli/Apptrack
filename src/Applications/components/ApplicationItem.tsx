import { ApplicationData } from "../../Api/Application"
import { useAppDispatch } from "../../store"
import { deleteApplication } from "../slice"
import Menu from "../../__assets__/menu.svg?react"
import { useState } from "react"
export const ApplicationItem = (props: { app: ApplicationData }) => {
  const dispatch = useAppDispatch()
  const [displayMenu, setDisplayMenu] = useState<boolean>(false)
  const onDelete = async (id: number) => {
    try {
      await dispatch(deleteApplication({ id })).unwrap()
    } catch (error) {
      alert(error)
    }
  }

  return (
    <tr key={props.app.id}>
      <td className="border border-slate-300 ">{props.app.company}</td>
      <td className="hidden md:table-cell border border-slate-300 ">
        {props.app.jobTitle}
      </td>
      <td className="hidden md:table-cell border border-slate-300 ">
        {props.app.location}
      </td>
      <td className="border border-slate-300 ">{props.app.status}</td>
      <td className="border border-slate-300 text-center relative">
        {/* TODO: Add favorites */}
        <button
          className=" w-14"
          onClick={() => setDisplayMenu((state) => !state)}
        >
          <Menu className="h-4 w-4" />
        </button>
        {displayMenu && (
          <div className="absolute border bg-slate-200 w-full rounded-md z-10">
            <ul className="text-center">
              <li className="py-1 cursor-pointer hover:bg-white hover:rounded-md">
                View
              </li>
              <li className="py-1 cursor-pointer hover:bg-white hover:rounded-md">
                Edit
              </li>
              <li
                className="py-1 cursor-pointer hover:bg-white hover:rounded-md text-red-600"
                onClick={() => onDelete(props.app.id)}
              >
                Delete
              </li>
            </ul>
          </div>
        )}
      </td>
    </tr>
  )
}
