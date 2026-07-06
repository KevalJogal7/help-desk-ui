import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import {
  Visibility,
  VisibilityOff,
  LockOutlined,
  Microsoft
} from '@mui/icons-material'
import { login, ssoLogin } from '../../services/auth.service'
import { useNavigate } from 'react-router-dom'
import { useMsal } from '@azure/msal-react'
import { loginRequest } from '../../config/msalConfig'
import { ROUTES } from '../../routes/routeConstants'
import type { SSOLoginRequest } from '../../models/auth'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const navigate = useNavigate();
  const { instance, accounts } = useMsal();

  useEffect(() => {
    const loginWithBackend = async () => {
      if (accounts.length === 0) return;

      try {
        // Get Microsoft ID token
        const response = await instance.acquireTokenSilent({
          ...loginRequest,
          account: accounts[0],
        });

        const request: SSOLoginRequest = { token: response.idToken};

        // Send token to your backend
        await ssoLogin(request);

        // Navigate to dashboard
        navigate(ROUTES.DASHBOARD);
      } catch (err) {
        console.error(err);
      }
    };

    loginWithBackend();
  }, [accounts, instance]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
     try {
        await login({email, password});
        navigate(ROUTES.DASHBOARD);
      } catch (error) {
        console.error("Login Failed:", error);
      }
  }

  return (
    <Grid container sx={{ minHeight: '100svh' }}>

      <Grid
        size={{ xs: 0, md: 6 }}
        sx={{
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          p: 6,
          position: 'relative',
          overflow: 'hidden',
        }}
      >

        {/* Content */}
        <Box sx={{ position: 'relative', textAlign: 'center', color: '#fff' }}>
          {/* Logo mark */}
          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: 3,
              bgcolor: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 4,
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.3)',
            }}
          >
            <LockOutlined sx={{ fontSize: 36 }} />
          </Box>

          <Typography variant="h3" sx={{ fontWeight: 700 }} gutterBottom>
            Welcome back
          </Typography>

          <Typography
            variant="body1"
            sx={{ opacity: 0.8, maxWidth: 320, mx: 'auto', lineHeight: 1.7 }}
          >
            Sign in to your account and pick up right where you left off.
            Everything you need, all in one place.
          </Typography>

          <Stack
            spacing={2}
            sx={{ mt: 5, alignItems: 'flex-start', mx: 'auto', maxWidth: 300 }}
          >
            {[
              'Secure & encrypted access',
              'Real-time collaboration',
              'Works on every device',
            ].map((item) => (
              <Stack key={item} direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: 'rgba(255,255,255,0.9)',
                    flexShrink: 0,
                  }}
                />
                <Typography variant="body2" sx={{ opacity: 0.85 }}>
                  {item}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Box>
      </Grid>

      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.paper',
          p: { xs: 3, sm: 6 },
        }}
      >
        <Container maxWidth="xs">

          {/* Header */}
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }} gutterBottom>
            Sign in
          </Typography>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Microsoft />}
            color="inherit"
            sx={{ textTransform: 'none', mb: 3 }}
            onClick={() => instance.loginRedirect(loginRequest)}
          >
            Login with Microsoft
          </Button>

          <Divider sx={{ mb: 3 }}>
            <Typography variant="caption" color="text.disabled" sx={{ px: 1 }}>
              or sign in with email
            </Typography>
          </Divider>

          {/* Form */}
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
                <Link href="#" variant="body2" underline="hover" sx={{ fontWeight: 600 }}>
                  Forgot password?
                </Link>
              </Stack>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  mt: 1,
                  textTransform: 'none',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5a6fd6 0%, #6a3f94 100%)',
                  },
                }}
              >
                Sign in
              </Button>

            </Stack>
          </Box>
        </Container>
      </Grid>
    </Grid>
  )
}
