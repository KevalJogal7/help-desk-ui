import { useState } from 'react'
import {
  Box,
  Container,
  Stack,
  TextField,
  Typography,
  Link,
} from '@mui/material'
import { ArrowBack, MarkEmailRead } from '@mui/icons-material'
import AuthLayout from '../AuthLayout/AuthLayout'
import { GradientButton } from '../AuthLayout/AuthLayout.styles'
import { ROUTES } from '../../../routes/routeConstants'
import { forgotPassword } from '../../../services/auth.service'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await forgotPassword({ email })
    setSubmitted(true)
  }

  return (
    <AuthLayout>
      <Container maxWidth="xs">

        <Typography variant="h4" sx={{ fontWeight: 700, m: 0 }} gutterBottom>
          Forgot password?
        </Typography>

        {submitted ? (
          <>
            <MarkEmailRead sx={{ fontSize: 48, color: 'success.main', mt: 1, mb: 2 }} />
            <Typography variant="body1" sx={{ mb: 3, opacity: 0.7 }}>
              If <strong>{email}</strong> is registered, you'll receive a reset link shortly.
              Check your inbox and spam folder.
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="body1" sx={{ mb: 4, opacity: 0.7 }} gutterBottom>
              Enter your email and we'll send you a reset link.
            </Typography>

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

                <GradientButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                >
                  Send reset link
                </GradientButton>
              </Stack>
            </Box>
          </>
        )}

        <Link
          href={ROUTES.LOGIN}
          variant="body2"
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 3, fontWeight: 600 }}
        >
          <ArrowBack fontSize="small" />
          Back to sign in
        </Link>

      </Container>
    </AuthLayout>
  )
}
