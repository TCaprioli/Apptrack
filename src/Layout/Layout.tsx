import { Link } from "react-router-dom"
import { routes } from "../routes"
import { useIsAuthenticated } from "../Auth/hooks/useIsAuthenticated"
import Logo from "../__assets__/logo.svg?react"
export const Layout = (props: React.PropsWithChildren) => {
  const { renderWithAuthentication } = useIsAuthenticated()
  return (
    <div>
      <header className="flex flex-row items-center">
        <Link to={routes.APPLICATIONS}>
          <Logo className="h-32 w-32" />
        </Link>

        {renderWithAuthentication({
          Loading: <>Loading...</>,
          Fulfilled: (
            <button className="ml-auto bg-red-500 text-white">Sign out</button>
          ),
          Rejected: <button className="ml-auto">Login</button>,
        })}
      </header>
      <main>{props.children}</main>
    </div>
  )
}
