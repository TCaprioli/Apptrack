import { useState } from "react"
import { useAppDispatch } from "../../store"
import { createApplication } from "../slice"
import { stdInputClass } from "../../styles"
import Up from "../../__assets__/up.svg?react"
export const ApplicationForm = () => {
  const [jobTitle, setJobTitle] = useState<string>("")
  const [company, setCompany] = useState<string>("")
  const [location, setLocation] = useState<string | null>(null)
  const [applicationDate, setApplicationDate] = useState<string | null>(null)
  const [status, setStatus] = useState<string>("")
  const [notes, setNotes] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [display, setDisplay] = useState<boolean>(true)
  const dispatch = useAppDispatch()

  return (
    <div className="flex flex-col pb-3 items-center ">
      <div className="flex flex-row items-center pb-8">
        <h2 className="text-xl">New Application</h2>
        <button
          onClick={() => {
            setDisplay((state) => !state)
          }}
        >
          {display ? (
            <Up className="h-5 w-5" />
          ) : (
            <Up className="rotate-180 h-5 w-5" />
          )}
        </button>
      </div>
      {error && <p>{error}</p>}
      {display && (
        <form
          className="flex flex-row flex-wrap w-6/12"
          onSubmit={(e) => {
            e.preventDefault()
            try {
              dispatch(
                createApplication({
                  jobTitle,
                  company,
                  location,
                  applicationDate: applicationDate
                    ? new Date(applicationDate)
                    : null,
                  status,
                  notes,
                })
              )
              setJobTitle("")
              setCompany("")
              setLocation(null)
              setApplicationDate(null)
              setStatus("")
              setNotes(null)
            } catch (error) {
              setError(`Failed to create application: ${error}`)
            }
          }}
        >
          <label htmlFor="jobTitle" className="flex-auto mb-2">
            Job Title:
            <input
              className={stdInputClass}
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
            />
          </label>
          <label htmlFor="company" className="flex-auto mb-2">
            Company:
            <input
              className={stdInputClass}
              type="text"
              id="company"
              name="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </label>
          <label htmlFor="location" className="flex-auto mb-2">
            Location:
            <input
              className={stdInputClass}
              type="text"
              id="location"
              name="location"
              value={location ?? ""}
              onChange={(e) => {
                const { value } = e.target
                return value === "" ? setLocation(null) : setLocation(value)
              }}
            />
          </label>
          <label htmlFor="applicationDate" className="flex-auto mb-2">
            Application Date:
            <input
              className={stdInputClass}
              type="date"
              id="applicationDate"
              name="applicationDate"
              value={applicationDate ?? ""}
              onChange={(e) => {
                const { value } = e.target
                console.log(value)
                return value === ""
                  ? setApplicationDate(null)
                  : setApplicationDate(value)
              }}
            />
          </label>

          <label htmlFor="status" className="flex-auto mb-2">
            Status:
            <select
              id="status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-8 rounded-xl ml-4 text-center"
              required
            >
              <option value="applied">Applied</option>
              <option value="interviewed">Interviewed</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </label>
          {/* TODO: Add notes */}
          <button type="submit" className="basis-full bg-green-500 text-white">
            Submit
          </button>
        </form>
      )}
    </div>
  )
}
