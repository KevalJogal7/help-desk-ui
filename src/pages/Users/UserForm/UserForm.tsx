import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Button,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import { ArrowBack, Visibility, VisibilityOff } from '@mui/icons-material'
import {
  useForm,
  required,
  minLength,
  maxLength,
  isEmail,
  matchesPattern,
} from '../../../utils/useForm'
import { ROUTES } from '../../../routes/routeConstants'
import { getUserById, toggleStatus, upsertUser } from '../../../services/user.service'
import type { UpsertUserRequest } from '../../../models/user'
import { GradientButton } from '../../Auth/AuthLayout/AuthLayout.styles'
import {
  ErrorText,
  FieldLabel,
  FieldWrapper,
  FormActions,
  FormCard,
  FormGrid,
  HeaderLeft,
  PageHeader,
  PageRoot,
} from '../../Tickets/TicketForm/TicketForm.styles'
import { toast } from '../../../utils/toastHelper'

const PASSWORD_PATTERN =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/

const initialValues: UpsertUserRequest = {
  name: '',
  email: '',
  password: '',
  roleId: 0,
  isActive: true,
}

const UserForm = () => {
  const { id } = useParams<{ id: string }>()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const validationRules = {
    name: [
      required('Name is required'),
      minLength(2, 'Name must be at least 2 characters'),
      maxLength(100),
    ],
    email: [
      required('Email is required'),
      isEmail(),
      maxLength(255, 'Email must be at most 255 characters'),
    ],
    // password required only on create; on edit only validate if provided
    password: isEdit
      ? [
          matchesPattern(
            PASSWORD_PATTERN,
            'Password must be 8+ chars with uppercase, lowercase, number and special character'
          ),
        ]
      : [
          required('Password is required'),
          minLength(8, 'Password must be at least 8 characters'),
          matchesPattern(
            PASSWORD_PATTERN,
            'Password must contain uppercase, lowercase, number and special character'
          ),
        ],
    roleId: [required('Role is required')],
  }

  const { values, errors, setValue, setFieldTouched, validateAll, setValues } =
    useForm<UpsertUserRequest>(initialValues, validationRules)

  useEffect(() => {
    if (!isEdit || !id) return
    getUserById(id).then((user) => {
      setValues({
        name: user.name,
        email: user.email,
        password: '',
        roleId: user.roleId,
        isActive: user.isActive,
      })
    })
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateAll()) return

    const payload: UpsertUserRequest = {
      ...values,
      userId: isEdit ? id : null,
      // omit password on edit if left blank
      password: isEdit && !values.password ? null : values.password,
    }

    await upsertUser(payload)
    toast.success(isEdit ? 'User updated successfully' : 'User created successfully')
    navigate(ROUTES.USERS)
  }

  return (
    <PageRoot>
      <PageHeader>
        <HeaderLeft>
          <Tooltip title="Back to users">
            <IconButton size="small" onClick={() => navigate(ROUTES.USERS)}>
              <ArrowBack fontSize="small" />
            </IconButton>
          </Tooltip>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {isEdit ? 'Edit User' : 'New User'}
          </Typography>
        </HeaderLeft>
      </PageHeader>

      <form onSubmit={handleSubmit}>
      <FormCard>
        <FormGrid>

          {/* Name */}
          <FieldWrapper>
            <FieldLabel htmlFor="name">Name *</FieldLabel>
            <TextField
              id="name"
              size="small"
              fullWidth
              placeholder="John"
              value={values.name}
              onChange={(e) => setValue('name', e.target.value)}
              onBlur={() => setFieldTouched('name')}
              error={Boolean(errors.name)}
            />
            {errors.name && <ErrorText>{errors.name}</ErrorText>}
          </FieldWrapper>

          {/* Email */}
          <FieldWrapper>
            <FieldLabel htmlFor="email">Email *</FieldLabel>
            <TextField
              id="email"
              size="small"
              fullWidth
              type="email"
              placeholder="john.doe@example.com"
              value={values.email}
              onChange={(e) => setValue('email', e.target.value)}
              onBlur={() => setFieldTouched('email')}
              error={Boolean(errors.email)}
              disabled={isEdit}
            />
            {errors.email && <ErrorText>{errors.email}</ErrorText>}
          </FieldWrapper>

          {/* Role */}
          <FieldWrapper>
            <FieldLabel htmlFor="roleId">Role *</FieldLabel>
            <Select
              id="roleId"
              size="small"
              fullWidth
              displayEmpty
              value={values.roleId}
              onChange={(e) => setValue('roleId', Number(e.target.value))}
              onBlur={() => setFieldTouched('roleId')}
              error={Boolean(errors.roleId)}
            >
              <MenuItem value={0}><em>Select role</em></MenuItem>
              <MenuItem value={1}>Admin</MenuItem>
              <MenuItem value={2}>Support Agent</MenuItem>
              <MenuItem value={3}>User</MenuItem>
            </Select>
            {errors.roleId && <ErrorText>{errors.roleId}</ErrorText>}
          </FieldWrapper>

          {/* Password */}
          <FieldWrapper>
            <FieldLabel htmlFor="password">
              Password {isEdit ? '(leave blank to keep current)' : '*'}
            </FieldLabel>
            <TextField
              id="password"
              size="small"
              fullWidth
              type={showPassword ? 'text' : 'password'}
              placeholder={isEdit ? '••••••••' : 'Min 8 chars, upper, lower, number, symbol'}
              value={values.password ?? ''}
              onChange={(e) => setValue('password', e.target.value)}
              onBlur={() => setFieldTouched('password')}
              error={Boolean(errors.password)}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() => setShowPassword((v) => !v)}
                        edge="end"
                        tabIndex={-1}
                      >
                        {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            {errors.password && <ErrorText>{errors.password}</ErrorText>}
          </FieldWrapper>

          {/* Status toggle — edit only */}
          {isEdit && (
            <FieldWrapper>
              <FieldLabel>Status</FieldLabel>
              <FormControlLabel
                control={
                  <Switch
                    checked={values.isActive}
                    onChange={() => setValue('isActive', !values.isActive)}
                    color="primary"
                  />
                }
                label={values.isActive ? 'Active' : 'Inactive'}
              />
            </FieldWrapper>
          )}

        </FormGrid>

        <FormActions>
          <Button
            variant="outlined"
            sx={{ textTransform: 'none', fontWeight: 600, marginTop: '8px' }}
            onClick={() => navigate(ROUTES.USERS)}
          >
            Cancel
          </Button>
          <GradientButton type="submit" variant="contained">
            {isEdit ? 'Save Changes' : 'Create User'}
          </GradientButton>
        </FormActions>
      </FormCard>
      </form>
    </PageRoot>
  )
}

export default UserForm
