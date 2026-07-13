import { useState } from 'react'
import {
  Box,
  Container,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { ArrowBack, CheckCircle, Visibility, VisibilityOff } from '@mui/icons-material'
import { useNavigate, useSearchParams } from 'react-router-dom'
import AuthLayout from '../AuthLayout/AuthLayout'
import { GradientButton } from '../AuthLayout/AuthLayout.styles'
import { ROUTES } from '../../../routes/routeConstants'
import { resetPassword } from '../../../services/auth.service'

const ResetPassword = () => {
    const [searchParams] = useSearchParams()
    const token = searchParams.get('token') ?? ''

    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showNew, setShowNew] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [done, setDone] = useState(false)
    const navigate = useNavigate()

    const mismatch = confirmPassword.length > 0 && newPassword !== confirmPassword

    // Invalid/missing token — show a clear message
    if (!token) {
        return (
        <AuthLayout>
            <Container maxWidth="xs">
            <Typography variant="h4" sx={{ fontWeight: 700, m: 0 }} gutterBottom>
                Invalid link
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, opacity: 0.7 }}>
                This password reset link is invalid or has expired.
                Request a new one from the forgot password page.
            </Typography>
            <Link
                href={ROUTES.FORGOT_PASSWORD}
                variant="body2"
                underline="hover"
                sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontWeight: 600 }}
            >
                <ArrowBack fontSize="small" />
                Request a new link
            </Link>
            </Container>
        </AuthLayout>
        )
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (mismatch) return
        await resetPassword({ token, newPassword })
        setDone(true)
    }

    return (
        <AuthLayout>
        <Container maxWidth="xs">

            <Typography variant="h4" sx={{ fontWeight: 700, m: 0 }} gutterBottom>
            Reset password
            </Typography>

            {done ? (
            <>
                <CheckCircle sx={{ fontSize: 48, color: 'success.main', mt: 1, mb: 2 }} />
                <Typography variant="body1" sx={{ mb: 3, opacity: 0.7 }}>
                Your password has been updated. You can now sign in with your new password.
                </Typography>
                <GradientButton
                fullWidth
                variant="contained"
                size="large"
                onClick={() => navigate(ROUTES.LOGIN)}
                >
                Back to sign in
                </GradientButton>
            </>
            ) : (
            <>
                <Typography variant="body1" sx={{ mb: 4, opacity: 0.7 }} gutterBottom>
                Choose a strong new password for your account.
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={2.5}>

                    <TextField
                    label="New password"
                    type={showNew ? 'text' : 'password'}
                    fullWidth
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    slotProps={{
                        inputLabel: { shrink: true },
                        input: {
                        endAdornment: (
                            <InputAdornment position="end">
                            <IconButton
                                onClick={() => setShowNew((v) => !v)}
                                edge="end"
                                size="small"
                                aria-label={showNew ? 'Hide password' : 'Show password'}
                            >
                                {showNew ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                            </IconButton>
                            </InputAdornment>
                        ),
                        },
                    }}
                    />

                    <TextField
                    label="Confirm new password"
                    type={showConfirm ? 'text' : 'password'}
                    fullWidth
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={mismatch}
                    helperText={mismatch ? 'Passwords do not match' : ''}
                    slotProps={{
                        inputLabel: { shrink: true },
                        input: {
                        endAdornment: (
                            <InputAdornment position="end">
                            <IconButton
                                onClick={() => setShowConfirm((v) => !v)}
                                edge="end"
                                size="small"
                                aria-label={showConfirm ? 'Hide password' : 'Show password'}
                            >
                                {showConfirm ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                            </IconButton>
                            </InputAdornment>
                        ),
                        },
                    }}
                    />

                <GradientButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={mismatch}
                >
                  Set new password
                </GradientButton>

                </Stack>
                </Box>
            </>
            )}

            {!done && (
            <Link
                href={ROUTES.LOGIN}
                variant="body2"
                underline="hover"
                sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 3, fontWeight: 600 }}
            >
                <ArrowBack fontSize="small" />
                Back to sign in
            </Link>
            )}

        </Container>
        </AuthLayout>
    )
}

export default ResetPassword
