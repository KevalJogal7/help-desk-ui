import { useMemo } from 'react'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { router } from './routes/AppRoutes'
import Loader from './components/Loader'
import Toast from './components/Toast'
import { useAppSelector } from './store/hooks'
import { buildTheme } from './config/theme'

function App() {
  const mode = useAppSelector((state) => state.theme.mode)
  const theme = useMemo(() => buildTheme(mode), [mode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Loader />
      <Toast />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
