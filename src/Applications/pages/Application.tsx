import { useNavigate } from "react-router-dom"
import { useIsAuthenticated } from "../../Auth/hooks/useIsAuthenticated"

export const Application = () => {
  const navigate = useNavigate()
  const { renderWithAuthentication } = useIsAuthenticated()

  return renderWithAuthentication({
    Loading: <div>Loading...</div>,
    Fulfilled: <div>Applications</div>,
    Rejected: (
      <div>
        <p>You need to be logged in to view this page</p>
        <button onClick={() => navigate("/login")}>Return to login</button>
      </div>
    ),
  })
}
