import { RouterProvider } from "react-router-dom"
import { router } from "./routes/AppRoutes"
import Loader from "./components/Loader"
import Toast from "./components/Toast"
import AxiosInterceptor from "./api/axiosInterceptor"

function App() {
  return (
    <>
      <AxiosInterceptor />
      <Loader />
      <Toast />
      <RouterProvider router={router} />
    </>
  )
}

export default App
