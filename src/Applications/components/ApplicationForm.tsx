import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../store"
import { createApplication, updateApplication } from "../slice"
import { stdInputClass } from "../../styles"
import Up from "../../__assets__/up.svg?react"
import { ApplicationData } from "../../Api/Application"

const defaultValues = {
  jobTitle: "",
  company: "",
  location: null,
  applicationDate: null,
  status: "applied",
  notes: null,
}

type ApplicationFormProps = {
  application: number | null
  closeUpdate: () => void
}
type ApplicationInput = {
  jobTitle: string
  company: string
  location: string | null
  applicationDate: string | null
  status: string
  notes: string | null
}

export const ApplicationForm = (props: ApplicationFormProps) => {
  const existingApplication = useAppSelector((state) =>
    state.application.collection.find(
      (app) => app.data.id === props.application
    )
  )?.data
  const [applicationInput, setApplicationInput] =
    useState<ApplicationInput>(defaultValues)
  const [error, setError] = useState<string | null>(null)
  const [display, setDisplay] = useState<boolean>(true)
  const dispatch = useAppDispatch()
  useSyncExistingApplication({ existingApplication, setApplicationInput })
  const onSubmit = async () => {
    const applicationDate = applicationInput.applicationDate
      ? new Date(applicationInput.applicationDate)
      : null

    if (existingApplication) {
      await dispatch(
        updateApplication({
          ...applicationInput,
          id: existingApplication.id,
          applicationDate,
        })
      ).unwrap()
    } else {
      await dispatch(
        createApplication({ ...applicationInput, applicationDate })
      ).unwrap()
      resetState()
    }
  }
  const resetState = () => setApplicationInput(defaultValues)
  return (
    <div className="flex flex-col pb-3 items-center ">
      <div className="flex flex-row items-center pb-8">
        <h2 className="text-xl">
          {props.application ? "Update" : "Add New"} Application
        </h2>
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
          onSubmit={async (e) => {
            e.preventDefault()
            try {
              await onSubmit()
            } catch (error) {
              setError(`Failed to submit application: ${error}`)
            }
          }}
        >
          <label htmlFor="jobTitle" className="flex-auto mb-2">
            Job Title:
            <input
              className={`${stdInputClass} md:ml-4`}
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={applicationInput.jobTitle}
              onChange={(e) =>
                setApplicationInput((prevState) => ({
                  ...prevState,
                  jobTitle: e.target.value,
                }))
              }
              required
            />
          </label>
          <label htmlFor="company" className="flex-auto mb-2">
            Company:
            <input
              className={`${stdInputClass} md:ml-4`}
              type="text"
              id="company"
              name="company"
              value={applicationInput.company}
              onChange={(e) =>
                setApplicationInput((prevState) => ({
                  ...prevState,
                  company: e.target.value,
                }))
              }
              required
            />
          </label>
          <label htmlFor="location" className="flex-auto mb-2">
            Location:
            <input
              className={`${stdInputClass} md:ml-4`}
              type="text"
              id="location"
              name="location"
              value={applicationInput.location ?? ""}
              onChange={(e) =>
                setApplicationInput((prevState) => ({
                  ...prevState,
                  location: e.target.value !== "" ? e.target.value : null,
                }))
              }
            />
          </label>
          <label htmlFor="applicationDate" className="flex-auto mb-2">
            Application Date:
            <input
              className={`${stdInputClass} md:ml-4`}
              type="date"
              id="applicationDate"
              name="applicationDate"
              value={applicationInput.applicationDate ?? ""}
              onChange={(e) =>
                setApplicationInput((prevState) => ({
                  ...prevState,
                  applicationDate:
                    e.target.value !== "" ? e.target.value : null,
                }))
              }
            />
          </label>

          <label htmlFor="status" className="flex-auto mb-2">
            Status:
            <select
              id="status"
              name="status"
              value={applicationInput.status}
              onChange={(e) =>
                setApplicationInput((prevState) => ({
                  ...prevState,
                  status: e.target.value,
                }))
              }
              className="h-8 rounded-xl ml-4 text-center w-32"
              required
            >
              <option value="applied">Applied</option>
              <option value="interviewed">Interviewed</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </label>
          {/* TODO: Add notes */}
          <div className="flex w-full">
            <button
              type="submit"
              className="basis-full bg-sage text-white flex-1"
            >
              Submit
            </button>
            {props.application && (
              <button
                className="basis-full bg-red-500 text-white flex-1"
                onClick={() => {
                  resetState()
                  props.closeUpdate()
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  )
}

function useSyncExistingApplication(args: {
  existingApplication: ApplicationData | undefined
  setApplicationInput: React.Dispatch<React.SetStateAction<ApplicationInput>>
}) {
  const { existingApplication, setApplicationInput } = args
  useEffect(() => {
    if (existingApplication) {
      setApplicationInput({
        jobTitle: existingApplication.jobTitle,
        company: existingApplication.company,
        location: existingApplication.location,
        applicationDate: formatDate(existingApplication.applicationDate),
        status: existingApplication.status,
        notes: existingApplication.notes,
      })
    }
  }, [existingApplication, setApplicationInput])
}

function formatDate(dateString: string | null): string | null {
  if (!dateString) return null
  return new Date(dateString).toISOString().split("T")[0]
}
