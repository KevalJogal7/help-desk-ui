import { RouterProvider } from "react-router-dom"
import { router } from "./routes/AppRoutes"
import Loader from "./components/Loader"
import Toast from "./components/Toast"

function App() {
  return (
    <>
      <Loader />
      <Toast />
      <RouterProvider router={router} />
    </>
  )
}

export default App
