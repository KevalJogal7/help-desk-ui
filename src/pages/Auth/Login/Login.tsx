import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { Visibility, VisibilityOff, Microsoft } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useMsal } from '@azure/msal-react'
import { InteractionStatus } from '@azure/msal-browser'
import { loginRequest } from '../../../config/msalConfig'
import type { SSOLoginRequest } from '../../../models/auth'
import { login, ssoLogin } from '../../../services/auth.service'
import { ROUTES } from '../../../routes/routeConstants'
import AuthLayout from '../AuthLayout/AuthLayout'
import { GradientButton } from '../AuthLayout/AuthLayout.styles'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const navigate = useNavigate()
  const { instance, accounts, inProgress } = useMsal()

  useEffect(() => {
    const loginWithBackend = async () => {
      if (accounts.length === 0) return
      try {
        const response = await instance.acquireTokenSilent({
          ...loginRequest,
          account: accounts[0],
        })
        const request: SSOLoginRequest = { token: response.idToken }
        await ssoLogin(request)
        navigate(ROUTES.DASHBOARD)
      } catch {
        // error toast is handled globally in http.ts
      }
    }
    loginWithBackend()
  }, [accounts, instance])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await login({ email, password })
    navigate(ROUTES.DASHBOARD)
  }

  const handleLoginWithSSO = () => {
    if (inProgress !== InteractionStatus.None) return
    instance.loginRedirect(loginRequest)
  }

  return (
    <AuthLayout>
      <Container maxWidth="xs">

        <Typography variant="h4" sx={{ fontWeight: 700, m: 0 }} gutterBottom>
          Help Desk Portal
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }} gutterBottom>
          Welcome back! Please sign in to continue.
        </Typography>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<Microsoft />}
          color="inherit"
          sx={{ textTransform: 'none', mb: 3 }}
          onClick={handleLoginWithSSO}
        >
          Login with Microsoft
        </Button>

        <Divider sx={{ mb: 3 }}>
          <Typography variant="caption" color="text.disabled" sx={{ px: 1 }}>
            or sign in with email
          </Typography>
        </Divider>

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2.5}>

            <TextField
              label="Email address"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              slotProps={{ inputLabel: { shrink: true } }}
            />

            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              slotProps={{
                inputLabel: { shrink: true },
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((v) => !v)}
                        edge="end"
                        size="small"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword
                          ? <VisibilityOff fontSize="small" />
                          : <Visibility fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Stack
              direction="row"
              sx={{ alignItems: 'center', justifyContent: 'space-between' }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                }
                label={<Typography variant="body2">Remember me</Typography>}
              />
              <Link
                href={ROUTES.FORGOT_PASSWORD}
                variant="body2"
                underline="hover"
                sx={{ fontWeight: 600 }}
              >
                Forgot password?
              </Link>
            </Stack>

            <GradientButton
              type="submit"
              fullWidth
              variant="contained"
              size="large"
            >
              Sign in
            </GradientButton>

          </Stack>
        </Box>

      </Container>
    </AuthLayout>
  )
}
