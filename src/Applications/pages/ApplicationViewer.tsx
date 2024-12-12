import { Link, useNavigate, useParams } from "react-router-dom"
import { useIsAuthenticated } from "../../Auth/hooks/useIsAuthenticated"
import { Layout } from "../../Layout/Layout"
import { routes } from "../../routes"
import { useAppDispatch } from "../../store"
import { useEffect, useState } from "react"
import { ApplicationData } from "../../Api/Application"
import { getApplication } from "../slice"

export const ApplicationViewer = () => {
  const navigate = useNavigate()
  const { renderWithAuthentication } = useIsAuthenticated()

  return (
    <Layout>
      {renderWithAuthentication({
        Loading: <div>Loading...</div>,
        Fulfilled: <ApplicationViewerView />,
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

const ApplicationViewerView = () => {
  const { applicationId } = useParams()
  const dispatch = useAppDispatch()
  const [application, setApplication] = useState<ApplicationData | null>(null)

  useEffect(() => {
    async function getCurrentApplication() {
      if (!applicationId) return setApplication(null)
      const idNumber = parseInt(applicationId)
      setApplication(await dispatch(getApplication({ id: idNumber })).unwrap())
    }
    getCurrentApplication()
  })
  return application ? (
    <div className="flex flex-col items-center justify-center pt-32">
      <div>
        <h1 className="font-serif">{application.company}</h1>
        <h2 className="text-3xl text-slate-500">{application.jobTitle}</h2>
        <div className="py-4">
          <p>
            <span className="font-bold">Location:</span> {application.location}
          </p>
          <p>
            <span className="font-bold">Status:</span> {application.status}
          </p>
          {application.applicationDate && (
            <p>
              <span className="font-bold">Applied:</span>{" "}
              {new Date(application.applicationDate).toLocaleString()}
            </p>
          )}
        </div>
        <Link to={routes.APPLICATIONS}>
          <button className="w-full bg-sand text-white">Return Home</button>
        </Link>
      </div>
    </div>
  ) : (
    <p className="text-center">
      Could not find application. Return{" "}
      <Link to={routes.APPLICATIONS}>home</Link>
    </p>
  )
}
