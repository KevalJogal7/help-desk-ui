import { RouterProvider } from "react-router-dom"
import { router } from "./routes/AppRoutes"
import AxiosInterceptor from "./services/AxiosInterceptor"
import Loader from "./components/Loader"

function App() {
  return (
    <>
      <AxiosInterceptor />
      <Loader />
      <RouterProvider router={router} />
    </>
  )
}

export default App
