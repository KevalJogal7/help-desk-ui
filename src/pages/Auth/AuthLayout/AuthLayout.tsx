import { Grid, Stack, Typography } from '@mui/material'
import { LockOutlined } from '@mui/icons-material'
import type { ReactNode } from 'react'
import { FeaturesDot, LeftPanel, LogoBox, RightPanel } from './AuthLayout.styles'

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

      <LeftPanel size={{ xs: 0, md: 6 }}>
        <Typography variant="h3" component="div" sx={{ position: 'relative', textAlign: 'center', color: '#fff' }}>
          <LogoBox>
            <LockOutlined sx={{ fontSize: 36 }} />
          </LogoBox>

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
            {features.map((item) => (
              <Stack key={item} direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                <FeaturesDot />
                <Typography variant="body2" sx={{ opacity: 0.85 }}>
                  {item}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Typography>
      </LeftPanel>

      <RightPanel size={{ xs: 12, md: 6 }}>
        {children}
      </RightPanel>

    </Grid>
  )
}

export default AuthLayout
