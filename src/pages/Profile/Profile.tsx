import { useEffect, useState } from 'react'
import { Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import type { ChangePasswordRequest, ProfileResponse, UpdateProfileRequest } from '../../models/profile'
import { useForm, required, minLength, maxLength, matchesPattern, PASSWORD_PATTERN } from '../../utils/useForm'
import {
  CardTitle,
  CardsRow,
  ProfileAvatar,
  ProfileCard,
  ProfileHeader,
  ProfileHeaderInfo,
  ProfileRoot,
} from './Profile.styles'
import { ErrorText, FieldLabel, FieldWrapper } from '../Tickets/TicketForm/TicketForm.styles'
import StatusChip from '../../components/StatusChip/StatusChip'
import { GradientButton } from '../Auth/AuthLayout/AuthLayout.styles'
import { getInitials } from '../../utils/utility'
import { changePassword, getProfile, updateProfile } from '../../services/auth.service'
import { ROLE_COLORS, STATUS_COLORS } from '../../components/StatusChip/chipColors'

const profileRules = {
  name: [
    required('Name is required'),
    minLength(2, 'Minimum 2 characters'),
    maxLength(100),
  ]
}

const passwordRules = {
  currentPassword: [required('Current password is required')],
  newPassword: [
    required('New password is required'),
    minLength(8, 'Minimum 8 characters'),
    matchesPattern(
      PASSWORD_PATTERN,
      'Must contain uppercase, lowercase, number and special character'
    ),
    (value: string, form: ChangePasswordRequest) =>
      value === form.currentPassword ? 'Add different password than current' : null,
  ],
  confirmPassword: [
    required('Please confirm your new password'),
    (value: string, form: ChangePasswordRequest) =>
      value !== form.newPassword ? 'Passwords do not match' : null,
  ],
}

const profileInitial: UpdateProfileRequest = { name: '' }
const passwordInitial: ChangePasswordRequest = { currentPassword: '', newPassword: '', confirmPassword: '' }

const Profile = () => {
  const [profile, setProfile] = useState<ProfileResponse | null>(null)
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const profileForm = useForm<UpdateProfileRequest>(profileInitial, profileRules)
  const passwordForm = useForm<ChangePasswordRequest>(passwordInitial, passwordRules)

  useEffect(() => {
    getProfile().then((p) => {
      setProfile(p)
      profileForm.setValues({ name: p.name })
    })
  }, [])

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!profileForm.validateAll()) return
    const updated = await updateProfile(profileForm.values)
    setProfile((prev) => prev ? { ...prev, ...updated } : prev)
  }

  const handlePasswordSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!passwordForm.validateAll()) return
    await changePassword(passwordForm.values)
    passwordForm.reset()
  }

  if (!profile) return null

  return (
    <ProfileRoot>

      {/* ── Header banner ── */}
      <ProfileHeader>
        <ProfileAvatar>
          {getInitials(profile.name)}
        </ProfileAvatar>
        <ProfileHeaderInfo>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {profile.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {profile.email}
          </Typography>
          <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
            <StatusChip label={profile.role} colorMap={ROLE_COLORS} />
            <StatusChip label={profile.isActive ? 'Active' : 'Inactive'} colorMap={STATUS_COLORS} dot />
          </div>
        </ProfileHeaderInfo>
      </ProfileHeader>

      <CardsRow>

        {/* ── Personal Info ── */}
        <ProfileCard>
          <form onSubmit={handleProfileSave} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <CardTitle>
              <PersonOutlineOutlinedIcon fontSize="small" color="primary" />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Personal Information</Typography>
            </CardTitle>

            <FieldWrapper>
              <FieldLabel htmlFor="name">Name *</FieldLabel>
              <TextField
                id="name"
                size="small"
                fullWidth
                value={profileForm.values.name}
                onChange={(e) => profileForm.setValue('name', e.target.value)}
                onBlur={() => profileForm.setFieldTouched('name')}
                error={Boolean(profileForm.errors.name)}
              />
              {profileForm.errors.name && <ErrorText>{profileForm.errors.name}</ErrorText>}
            </FieldWrapper>

            <FieldWrapper>
              <FieldLabel>Email</FieldLabel>
              <TextField size="small" fullWidth value={profile.email} disabled />
            </FieldWrapper>

            <FieldWrapper>
              <FieldLabel>Role</FieldLabel>
              <TextField size="small" fullWidth value={profile.role} disabled />
            </FieldWrapper>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <GradientButton type="submit" variant="contained">
                Save Changes
              </GradientButton>
            </div>
          </form>
        </ProfileCard>

        {/* ── Change Password ── */}
        <ProfileCard>
          <form onSubmit={handlePasswordSave} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <CardTitle>
              <LockOutlinedIcon fontSize="small" color="primary" />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Change Password</Typography>
            </CardTitle>

            <FieldWrapper>
              <FieldLabel htmlFor="currentPassword">Current Password *</FieldLabel>
              <TextField
                id="currentPassword"
                size="small"
                fullWidth
                type={showCurrent ? 'text' : 'password'}
                placeholder="Enter current password"
                value={passwordForm.values.currentPassword}
                onChange={(e) => passwordForm.setValue('currentPassword', e.target.value)}
                onBlur={() => passwordForm.setFieldTouched('currentPassword')}
                error={Boolean(passwordForm.errors.currentPassword)}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton size="small" onClick={() => setShowCurrent((v) => !v)} edge="end" tabIndex={-1}>
                          {showCurrent ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
              {passwordForm.errors.currentPassword && <ErrorText>{passwordForm.errors.currentPassword}</ErrorText>}
            </FieldWrapper>

            <FieldWrapper>
              <FieldLabel htmlFor="newPassword">New Password *</FieldLabel>
              <TextField
                id="newPassword"
                size="small"
                fullWidth
                type={showNew ? 'text' : 'password'}
                placeholder="Min 8 chars, upper, lower, number, symbol"
                value={passwordForm.values.newPassword}
                onChange={(e) => passwordForm.setValue('newPassword', e.target.value)}
                onBlur={() => passwordForm.setFieldTouched('newPassword')}
                error={Boolean(passwordForm.errors.newPassword)}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton size="small" onClick={() => setShowNew((v) => !v)} edge="end" tabIndex={-1}>
                          {showNew ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
              {passwordForm.errors.newPassword && <ErrorText>{passwordForm.errors.newPassword}</ErrorText>}
            </FieldWrapper>

            <FieldWrapper>
              <FieldLabel htmlFor="confirmPassword">Confirm New Password *</FieldLabel>
              <TextField
                id="confirmPassword"
                size="small"
                fullWidth
                type={showConfirm ? 'text' : 'password'}
                placeholder="Re-enter new password"
                value={passwordForm.values.confirmPassword}
                onChange={(e) => passwordForm.setValue('confirmPassword', e.target.value)}
                onBlur={() => passwordForm.setFieldTouched('confirmPassword')}
                error={Boolean(passwordForm.errors.confirmPassword)}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton size="small" onClick={() => setShowConfirm((v) => !v)} edge="end" tabIndex={-1}>
                          {showConfirm ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
              {passwordForm.errors.confirmPassword && <ErrorText>{passwordForm.errors.confirmPassword}</ErrorText>}
            </FieldWrapper>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <Button
                variant="outlined"
                onClick={() => passwordForm.reset()}
                sx={{ textTransform: 'none', fontWeight: 600, marginTop: '8px' }}
              >
                Clear
              </Button>
              <GradientButton type="submit" variant="contained">
                Update Password
              </GradientButton>
            </div>
          </form>
        </ProfileCard>

      </CardsRow>
    </ProfileRoot>
  )
}

export default Profile
