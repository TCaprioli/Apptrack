import { Link } from "react-router-dom"
import { routes } from "../routes"
import { useIsAuthenticated } from "../Auth/hooks/useIsAuthenticated"

export const Layout = (props: React.PropsWithChildren) => {
  const { renderWithAuthentication } = useIsAuthenticated()
  return (
    <div>
      <header>
        <Link to={routes.APPLICATIONS}>Logo</Link>

        {renderWithAuthentication({
          Loading: <>Loading...</>,
          Fulfilled: <button>Sign out</button>,
          Rejected: <button>Login</button>,
        })}
      </header>
      <main>{props.children}</main>
    </div>
  )
}
