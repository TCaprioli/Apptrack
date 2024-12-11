import { useNavigate } from "react-router-dom"
import { useIsAuthenticated } from "../../Auth/hooks/useIsAuthenticated"
import { Layout } from "../../Layout/Layout"
import { routes } from "../../routes"
import { ApplicationTable } from "../components/ApplicationTable"
import { useEffect, useState } from "react"
import { useAppDispatch } from "../../store"
import { getApplicationList } from "../slice"
import { ApplicationForm } from "../components/ApplicationForm"

export const Application = () => {
  const navigate = useNavigate()
  const { renderWithAuthentication } = useIsAuthenticated()

  return (
    <Layout>
      {renderWithAuthentication({
        Loading: <div>Loading...</div>,
        Fulfilled: <ApplicationView />,
        Rejected: (
          <div>
            <p>You need to be logged in to view this page</p>
            <button onClick={() => navigate(routes.LOGIN)}>
              Return to login
            </button>
          </div>
        ),
      })}
    </Layout>
  )
}

const ApplicationView = () => {
  const dispatch = useAppDispatch()

  const [currentApplication, setCurrentApplication] = useState<number | null>(
    null
  )
  useEffect(() => {
    dispatch(getApplicationList())
  })

  return (
    <div className="flex flex-col items-center ">
      <ApplicationForm
        application={currentApplication}
        closeUpdate={() => setCurrentApplication(null)}
      />
      <ApplicationTable setCurrentApplication={setCurrentApplication} />
    </div>
  )
}
