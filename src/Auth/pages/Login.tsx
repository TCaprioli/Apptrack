import { Link, useNavigate } from "react-router-dom"
import { AuthForm } from "../components/AuthForm"
import { useGetUser } from "../hooks/useGetUser"
import { useIsAuthenticated } from "../hooks/useIsAuthenticated"
import { routes } from "../../routes"

export const Login = () => {
  const { renderWithAuthentication } = useIsAuthenticated()
  const { loginUser } = useGetUser()
  const navigate = useNavigate()

  return renderWithAuthentication({
    Loading: <div>Loading...</div>,
    Fulfilled: (
      <div>
        <p>You're already signed in!</p>
        <button onClick={() => navigate(-1)}>Go back</button>
      </div>
    ),
    Rejected: (
      <div>
        <AuthForm
          onSubmit={({ email, password }) => loginUser({ email, password })}
        />
        <p>
          Don't have an account? <Link to={routes.REGISTER}>Register here</Link>
        </p>
      </div>
    ),
  })
}
