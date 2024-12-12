import { ApplicationData } from "../../Api/Application"
import { useAppDispatch } from "../../store"
import { deleteApplication } from "../slice"
import Menu from "../../__assets__/menu.svg?react"
import { useState } from "react"
import { useFocusListener } from "../../hooks/useFocusListener"
import { useNavigate } from "react-router-dom"
import { routes } from "../../routes"

type ApplicationItemProps = {
  app: ApplicationData
  setCurrentApplication: () => void
}
export const ApplicationItem = (props: ApplicationItemProps) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [displayMenu, setDisplayMenu] = useState<boolean>(false)
  const { ref } = useFocusListener<HTMLTableCellElement>({
    handleOutOfFocus: () => setDisplayMenu(false),
  })
  const onDelete = async (id: number) => {
    try {
      await dispatch(deleteApplication({ id })).unwrap()
    } catch (error) {
      alert(error)
    }
  }

  return (
    <tr className="hover:bg-slate-200">
      <td className="border border-slate-300 ">{props.app.company}</td>
      <td className="hidden md:table-cell border border-slate-300 ">
        {props.app.jobTitle}
      </td>
      <td className="hidden md:table-cell border border-slate-300 ">
        {props.app.location}
      </td>
      <td className="border border-slate-300 ">{props.app.status}</td>
      <td className="border border-slate-300 text-center relative" ref={ref}>
        {/* TODO: Add favorites */}
        <button className=" w-14" onClick={() => setDisplayMenu(true)}>
          <Menu className="h-4 w-4" aria-label="menu button" />
        </button>
        {displayMenu && (
          <div className="absolute border bg-slate-200 w-full rounded-md z-10">
            <ul className="text-center">
              <li
                className="py-1 cursor-pointer hover:bg-white hover:rounded-md"
                tabIndex={0}
                onClick={() => {
                  //TODO: Update when route when you add dashboard
                  navigate(`${routes.APPLICATIONS}${props.app.id}`)
                }}
              >
                View
              </li>
              <li
                className="py-1 cursor-pointer hover:bg-white hover:rounded-md"
                onClick={() => {
                  props.setCurrentApplication()
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    props.setCurrentApplication()
                  }
                }}
                tabIndex={0}
              >
                Edit
              </li>
              <li
                className="py-1 cursor-pointer hover:bg-white hover:rounded-md text-red-600"
                onClick={() => onDelete(props.app.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onDelete(props.app.id)
                  }
                }}
                tabIndex={0}
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
