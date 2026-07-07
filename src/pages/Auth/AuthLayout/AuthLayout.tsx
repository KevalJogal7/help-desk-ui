import { Box, Grid, Stack, Typography } from '@mui/material'
import { LockOutlined } from '@mui/icons-material'
import type { ReactNode } from 'react'
import './AuthLayout.css'

interface AuthLayoutProps {
  children: ReactNode
}

const features = [
  'Secure & encrypted access',
  'Real-time collaboration',
  'Works on every device',
]

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <Grid container sx={{ minHeight: '100svh' }}>

      <Grid size={{ xs: 0, md: 6 }} className="auth-panel-left">
        <Box sx={{ position: 'relative', textAlign: 'center', color: '#fff' }}>

          <Box className="auth-logo-box">
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

          <Stack spacing={2} className="auth-features-stack">
            {features.map((item) => (
              <Stack key={item} direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                <Box className="auth-feature-dot" />
                <Typography variant="body2" sx={{ opacity: 0.85 }}>
                  {item}
                </Typography>
              </Stack>
            ))}
          </Stack>

        </Box>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }} className="auth-panel-right">
        {children}
      </Grid>

    </Grid>
  )
}

export default AuthLayout
