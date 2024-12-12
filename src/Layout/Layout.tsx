import { Link, useNavigate } from "react-router-dom"
import { routes } from "../routes"
import { useIsAuthenticated } from "../Auth/hooks/useIsAuthenticated"
import Logo from "../__assets__/logo.svg?react"
import { logout } from "../Auth/slice"
import { useAppDispatch } from "../store"
export const Layout = (props: React.PropsWithChildren) => {
  const { renderWithAuthentication } = useIsAuthenticated()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  return (
    <div>
      <header className="flex flex-row items-center">
        <Link to={routes.APPLICATIONS} aria-label="home">
          <Logo className="h-32 w-32" aria-label="logo" />
        </Link>

        {renderWithAuthentication({
          Loading: <>Loading...</>,
          Fulfilled: (
            <button
              className="ml-auto bg-sand text-white"
              onClick={() => {
                dispatch(logout())
                navigate(routes.LOGIN)
              }}
            >
              Sign out
            </button>
          ),
          Rejected: (
            <button
              className="ml-auto bg-sage text-white"
              onClick={() => navigate(routes.LOGIN)}
            >
              Login
            </button>
          ),
        })}
      </header>
      <main>{props.children}</main>
    </div>
  )
}
