import { useState } from 'react'
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  Link,
} from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import AuthLayout from '../AuthLayout/AuthLayout'
import '../AuthLayout/AuthLayout.css'
import { ROUTES } from '../../../routes/routeConstants'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    setSubmitted(true)
  }

  return (
    <AuthLayout>
      <Container maxWidth="xs">

        <Typography variant="h4" sx={{ fontWeight: 700, m: 0 }} gutterBottom>
          Forgot password?
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, opacity: 0.7 }} gutterBottom>
          {submitted
            ? "If that email exists, you'll receive a reset link shortly."
            : "Enter your email and we'll send you a reset link."}
        </Typography>

        {!submitted && (
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

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                className="auth-submit-btn"
              >
                Send reset link
              </Button>

            </Stack>
          </Box>
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
