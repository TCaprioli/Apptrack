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
          <div className="flex flex-col items-center justify-center">
            <p className="text-xl font-serif">
              You need to be logged in to view this page
            </p>
            <button
              className="bg-sage m-4 text-white"
              onClick={() => navigate(routes.LOGIN)}
            >
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
