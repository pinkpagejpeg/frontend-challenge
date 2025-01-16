import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { publicRoutes } from "./routes"

export const AppRouter = () => {
  const router = createBrowserRouter(publicRoutes)

  return <RouterProvider router={router} />
}