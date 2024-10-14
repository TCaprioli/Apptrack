import { useState } from "react"
import { useAppDispatch } from "../../store"
import { createApplication } from "../slice"

export const ApplicationForm = () => {
  const [jobTitle, setJobTitle] = useState<string>("")
  const [company, setCompany] = useState<string>("")
  const [location, setLocation] = useState<string | null>(null)
  const [applicationDate, setApplicationDate] = useState<string | null>(null)
  const [status, setStatus] = useState<string>("")
  const [notes, setNotes] = useState<string | null>(null)
  const dispatch = useAppDispatch()

  return (
    <div>
      <h2>New Application</h2>
      <form
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
          } catch {
            console.error("failed to create application")
          }
        }}
      >
        <label htmlFor="jobTitle">Job Title:</label>
        <input
          type="text"
          id="jobTitle"
          name="jobTitle"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          required
        />

        <label htmlFor="company">Company:</label>
        <input
          type="text"
          id="company"
          name="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />

        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={location ?? ""}
          onChange={(e) => {
            const { value } = e.target
            return value === "" ? setLocation(null) : setLocation(value)
          }}
        />

        <label htmlFor="applicationDate">Application Date:</label>
        <input
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

        <label htmlFor="status">Status:</label>
        <select
          id="status"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="applied">Applied</option>
          <option value="interviewed">Interviewed</option>
          <option value="passed">Passed</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>

        <label htmlFor="notes">Notes:</label>
        <textarea
          id="notes"
          name="notes"
          value={notes ?? ""}
          onChange={(e) => {
            const { value } = e.target
            return value === "" ? setNotes(null) : setNotes(value)
          }}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
