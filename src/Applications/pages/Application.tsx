import { useNavigate } from "react-router-dom"
import { useIsAuthenticated } from "../../Auth/hooks/useIsAuthenticated"
import { Layout } from "../../Layout/Layout"
import { routes } from "../../routes"
import { ApplicationTable } from "../components/ApplicationTable"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../store"
import { getApplicationList } from "../slice"
import { ApplicationForm } from "../components/ApplicationForm"
import { PageCount } from "../components/PageCount"
import { stdInputClass } from "../../styles"

const APPLICATIONS_PER_PAGE = 10

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
  const applications = useAppSelector((state) => state.application.collection)
  const dispatch = useAppDispatch()
  const [page, setPage] = useState(1)
  const [searchInput, setSearchInput] = useState<string>("")
  const visibleApplications = applications
    .map((applications) => applications.data)
    .slice(
      APPLICATIONS_PER_PAGE * page - APPLICATIONS_PER_PAGE,
      APPLICATIONS_PER_PAGE * page
    )
    .filter((app) =>
      app.company.toLowerCase().includes(searchInput.toLowerCase())
    )
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
      <div className="w-full max-w-4xl">
        <input
          className={`${stdInputClass} mb-4`}
          value={searchInput}
          placeholder="Search Companies..."
          onChange={(event) => setSearchInput(event.target.value)}
        />
        <ApplicationTable
          applications={visibleApplications}
          setCurrentApplication={setCurrentApplication}
        />
      </div>
      <PageCount
        page={page}
        totalItems={applications.length}
        increment={() => setPage((prevState) => (prevState += 1))}
        decrement={() => setPage((prevState) => (prevState -= 1))}
      />
    </div>
  )
}
