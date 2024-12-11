import { Link, useNavigate } from "react-router-dom"
import { AuthForm } from "../components/AuthForm"
import { useIsAuthenticated } from "../hooks/useIsAuthenticated"
import { useSaveNewUser } from "../hooks/useSaveNewUser"
import { routes } from "../../routes"
import { Layout } from "../../Layout/Layout"

export const Register = () => {
  const { renderWithAuthentication } = useIsAuthenticated()
  const { registerUser } = useSaveNewUser()
  const navigate = useNavigate()
  return (
    <Layout>
      {renderWithAuthentication({
        Loading: <div>Loading...</div>,
        Fulfilled: (
          <div>
            <p>You're already signed in!</p>
            <button onClick={() => navigate(routes.APPLICATIONS)}>
              Go back
            </button>
          </div>
        ),
        Rejected: (
          <div className="flex items-center justify-center flex-col">
            <div className="border-2 border-slate-400 p-8 rounded-md min-h-72 bg-white">
              <h1 className="font-serif">Register</h1>
              <p className=" pb-5 ">
                Already Registered? <Link to={routes.LOGIN}>Login here</Link>
              </p>

              <AuthForm
                onSubmit={({ email, password }) =>
                  registerUser({ email, password })
                }
              />
            </div>
          </div>
        ),
      })}
    </Layout>
  )
}
