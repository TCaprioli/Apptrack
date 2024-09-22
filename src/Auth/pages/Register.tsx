import { useNavigate } from "react-router-dom"
import { AuthForm } from "../components/AuthForm"
import { useIsAuthenticated } from "../hooks/useIsAuthenticated"
import { useSaveNewUser } from "../hooks/useSaveNewUser"

export const Register = () => {
  const { renderWithAuthentication } = useIsAuthenticated()
  const { registerUser } = useSaveNewUser()
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
          onSubmit={({ email, password }) => registerUser({ email, password })}
        />
      </div>
    ),
  })
}
