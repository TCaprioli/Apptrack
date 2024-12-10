import { useAppSelector } from "../../store"

export const ApplicationTable = () => {
  const applications = useAppSelector((state) => state.application.collection)
  return (
    <table>
      <thead>
        <tr>
          <th>Company</th>
          <th>Title</th>
          <th>Status</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {applications.map((app) => (
          <tr key={app.data.id}>
            <td>{app.data.company}</td>
            <td>{app.data.jobTitle}</td>
            <td>{app.data.status}</td>
            <td>{app.data.location}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
