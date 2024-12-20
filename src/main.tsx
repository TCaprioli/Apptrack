import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Application } from "./Applications/pages/Application.tsx"
import { Login } from "./Auth/pages/Login.tsx"
import { Provider } from "react-redux"
import { store } from "./store.ts"
import { Register } from "./Auth/pages/Register.tsx"
import { App } from "./App.tsx"
import "./main.css"
import { ApplicationViewer } from "./Applications/pages/ApplicationViewer.tsx"
import { routes } from "./routes.ts"

const router = createBrowserRouter([
  {
    path: `${routes.LOGIN}`,
    element: <Login />,
  },
  {
    path: `${routes.REGISTER}`,
    element: <Register />,
  },
  {
    path: `${routes.APPLICATIONS}`,
    element: <Application />,
  },
  {
    path: `${routes.APPLICATIONS}:applicationId`,
    element: <ApplicationViewer />,
  },
])
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App>
        <RouterProvider router={router} />
      </App>
    </Provider>
  </StrictMode>
)
