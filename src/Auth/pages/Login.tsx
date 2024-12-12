import { Link, useNavigate } from "react-router-dom"
import { AuthForm } from "../components/AuthForm"
import { useGetUser } from "../hooks/useGetUser"
import { useIsAuthenticated } from "../hooks/useIsAuthenticated"
import { routes } from "../../routes"
import { Layout } from "../../Layout/Layout"

export const Login = () => {
  const { renderWithAuthentication } = useIsAuthenticated()
  const { loginUser } = useGetUser()
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
              <h1 className="font-serif">Log in</h1>
              <p className=" pb-5 ">
                Don't have an account?{" "}
                <Link to={routes.REGISTER}>Register here</Link>
              </p>

              <AuthForm
                allowDemo={true}
                onSubmit={({ email, password }) =>
                  loginUser({ email, password })
                }
              />
            </div>
          </div>
        ),
      })}
    </Layout>
  )
}
