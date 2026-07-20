import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Button,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { useForm, required, minLength, maxLength } from '../../../utils/useForm'
import { ROUTES } from '../../../routes/routeConstants'
import { getTicketById, upsertTicket } from '../../../services/ticket.service'
import { getUsers } from '../../../services/user.service'
import { GradientButton } from '../../Auth/AuthLayout/AuthLayout.styles'
import {
  ErrorText,
  FieldLabel,
  FieldWrapper,
  FormActions,
  FormCard,
  FormGrid,
  FullWidth,
  HeaderLeft,
  PageHeader,
  PageRoot,
} from './TicketForm.styles'
import { toast } from '../../../utils/toastHelper'
import { useDropdowns } from '../../../utils/useDropdowns'
import type { UpsertTicketRequest } from '../../../models/ticket'
import type { UserResponse } from '../../../models/user'
import { authStorage } from '../../../services/storage.service'
import { Role } from '../../../models/auth'

const initialValues: UpsertTicketRequest = {
  title: '',
  description: '',
  priorityId: 0,
  categoryId: 0,
  subCategoryId: 0,
  statusId: 0,
  assignedTo: null,
}

const validationRules = {
  title: [required('Title is required'), minLength(3, 'Title must be at least 3 characters'), maxLength(100)],
  description: [required('Description is required'), minLength(10, 'Description must be at least 10 characters'), maxLength(1000)],
  priorityId: [required('Priority is required')],
  categoryId: [required('Category is required')],
  subCategoryId: [required('Sub-category is required')],
}

const TicketForm = () => {
  const { id } = useParams<{ id: string }>()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const isAdmin = authStorage.getRole() === Role.ADMIN

  const { categories, subCategories, priorities, statusList } = useDropdowns()
  const [agents, setAgents] = useState<UserResponse[]>([])
  const [canUpdateStatus, setCanUpdateStatus] = useState<boolean>(false)

  const { values, errors, setValue, setFieldTouched, validateAll, setValues } = useForm<UpsertTicketRequest>(
    initialValues,
    validationRules
  )

  const filteredSubCategories = subCategories.filter(
    (s) => s.categoryId === values.categoryId
  )

  useEffect(() => {
    if (isAdmin) {
      getUsers({ page: 0, pageSize: 0, role: 2 }).then((res) => setAgents(res.items))
    }
  }, [isAdmin])

  useEffect(() => {
    if (!isEdit || !id) return
    const load = async () => {
      const ticket = await getTicketById(id)
      setCanUpdateStatus(ticket.canUpdateStatus)
      setValues({
        title: ticket.title,
        description: ticket.description,
        priorityId: ticket.priorityId,
        categoryId: ticket.categoryId,
        subCategoryId: ticket.subCategoryId,
        statusId: ticket.statusId,
        assignedTo: ticket.assignedTo,
      })
    }
    load()
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateAll()) return

    if (isEdit && id) {
      await upsertTicket({ ...values, ticketId: id })
      toast.success('Ticket updated successfully')
    } else {
      await upsertTicket(values)
      toast.success('Ticket created successfully')
    }
    navigate(ROUTES.TICKETS)
  }

  return (
    <PageRoot>
      <PageHeader>
        <HeaderLeft>
          <Tooltip title="Back to tickets">
            <IconButton size="small" onClick={() => navigate(ROUTES.TICKETS)}>
              <ArrowBack fontSize="small" />
            </IconButton>
          </Tooltip>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {isEdit ? 'Edit Ticket' : 'New Ticket'}
          </Typography>
        </HeaderLeft>
      </PageHeader>

      <FormCard as="form" onSubmit={handleSubmit}>
        <FormGrid>

          {/* Title */}
          <FullWidth>
            <FieldWrapper>
              <FieldLabel htmlFor="title">Title *</FieldLabel>
              <TextField
                id="title"
                size="small"
                fullWidth
                placeholder="Brief summary of the issue"
                value={values.title}
                onChange={(e) => setValue('title', e.target.value)}
                onBlur={() => setFieldTouched('title')}
                error={Boolean(errors.title)}
              />
              {errors.title && <ErrorText>{errors.title}</ErrorText>}
            </FieldWrapper>
          </FullWidth>

          {/* Category */}
          <FieldWrapper>
            <FieldLabel htmlFor="categoryId">Category *</FieldLabel>
            <Select
              id="categoryId"
              size="small"
              fullWidth
              displayEmpty
              value={values.categoryId}
              onChange={(e) => {
                setValue('categoryId', Number(e.target.value))
                setValue('subCategoryId', 0)
              }}
              onBlur={() => setFieldTouched('categoryId')}
              error={Boolean(errors.categoryId)}
            >
              <MenuItem value={0}><em>Select category</em></MenuItem>
              {categories.map((c) => (
                <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
              ))}
            </Select>
            {errors.categoryId && <ErrorText>{errors.categoryId}</ErrorText>}
          </FieldWrapper>

          {/* Sub-category */}
          <FieldWrapper>
            <FieldLabel htmlFor="subCategoryId">Sub-Category *</FieldLabel>
            <Select
              id="subCategoryId"
              size="small"
              fullWidth
              displayEmpty
              value={values.subCategoryId}
              onChange={(e) => setValue('subCategoryId', Number(e.target.value))}
              onBlur={() => setFieldTouched('subCategoryId')}
              error={Boolean(errors.subCategoryId)}
              disabled={!values.categoryId}
            >
              <MenuItem value={0}><em>Select sub-category</em></MenuItem>
              {filteredSubCategories.map((s) => (
                <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
              ))}
            </Select>
            {errors.subCategoryId && <ErrorText>{errors.subCategoryId}</ErrorText>}
          </FieldWrapper>

          {/* Priority */}
          <FieldWrapper>
            <FieldLabel htmlFor="priorityId">Priority *</FieldLabel>
            <Select
              id="priorityId"
              size="small"
              fullWidth
              displayEmpty
              value={values.priorityId}
              onChange={(e) => setValue('priorityId', e.target.value)}
              onBlur={() => setFieldTouched('priorityId')}
              error={Boolean(errors.priorityId)}
            >
              <MenuItem value={0}><em>Select priority</em></MenuItem>
              {priorities.map((p) => (
                <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
              ))}
            </Select>
            {errors.priorityId && <ErrorText>{errors.priorityId}</ErrorText>}
          </FieldWrapper>

          {/* Admin-only fields — only shown in edit mode */}
          {isAdmin && isEdit && canUpdateStatus && (
            <>
              {/* Status */}
              <FieldWrapper>
                <FieldLabel htmlFor="statusId">Status</FieldLabel>
                <Select
                  id="statusId"
                  size="small"
                  fullWidth
                  displayEmpty
                  value={values.statusId ?? 0}
                  onChange={(e) => setValue('statusId', Number(e.target.value))}
                >
                  {statusList.map((s) => (
                    <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
                  ))}
                </Select>
              </FieldWrapper>

              {/* Assigned To */}
              <FieldWrapper>
                <FieldLabel htmlFor="assignedTo">Assigned To</FieldLabel>
                <Select
                  id="assignedTo"
                  size="small"
                  fullWidth
                  displayEmpty
                  value={values.assignedTo ?? ''}
                  onChange={(e) => setValue('assignedTo', e.target.value || null)}
                >
                  <MenuItem value="" disabled><em>Unassigned</em></MenuItem>
                  {agents.map((u) => (
                    <MenuItem key={u.userId} value={u.userId}>{u.name}</MenuItem>
                  ))}
                </Select>
              </FieldWrapper>
            </>
          )}

          {/* Description */}
          <FullWidth>
            <FieldWrapper>
              <FieldLabel htmlFor="description">Description *</FieldLabel>
              <TextField
                id="description"
                size="small"
                fullWidth
                multiline
                rows={5}
                placeholder="Describe the issue in detail..."
                value={values.description}
                onChange={(e) => setValue('description', e.target.value)}
                onBlur={() => setFieldTouched('description')}
                error={Boolean(errors.description)}
              />
              {errors.description && <ErrorText>{errors.description}</ErrorText>}
            </FieldWrapper>
          </FullWidth>

        </FormGrid>

        <FormActions>
          <Button
            variant="outlined"
            sx={{ textTransform: 'none', fontWeight: 600, marginTop: '8px' }}
            onClick={() => navigate(ROUTES.TICKETS)}
          >
            Cancel
          </Button>
          <GradientButton type="submit" variant="contained">
            {isEdit ? 'Save Changes' : 'Create Ticket'}
          </GradientButton>
        </FormActions>
      </FormCard>
    </PageRoot>
  )
}

export default TicketForm
