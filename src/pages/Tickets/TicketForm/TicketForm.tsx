import { useEffect } from 'react'
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
import { createTicket, getTicketById, updateTicket } from '../../../services/ticket.service'
import type { TicketFormData } from '../../../models/ticket'
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
import { useDropdowns } from '../../../hooks/useDropdowns'

const initialValues: TicketFormData = {
  title: '',
  description: '',
  priority: 0,
  categoryId: 0,
  subCategoryId: 0,
}

const validationRules = {
  title: [required('Title is required'), minLength(3, 'Title must be at least 3 characters'), maxLength(100)],
  description: [required('Description is required'), minLength(10, 'Description must be at least 10 characters'), maxLength(1000)],
  priority: [required('Priority is required')],
  categoryId: [required('Category is required')],
  subCategoryId: [required('Sub-category is required')],
}

const TicketForm = () => {
  const { id } = useParams<{ id: string }>()
  const isEdit = Boolean(id)
  const navigate = useNavigate()

  const { categories, subCategories, priorities } = useDropdowns()

  const { values, errors, setValue, setFieldTouched, validateAll, setValues } = useForm<TicketFormData>(
    initialValues,
    validationRules
  )

  // Filter sub-categories by selected category
  const filteredSubCategories = subCategories.filter(
    (s) => s.categoryId === values.categoryId
  )

  useEffect(() => {
    if (!isEdit || !id) return
    const load = async () => {
      const ticket = await getTicketById(id)
      setValues({
        title: ticket.title,
        description: ticket.description,
        priority: ticket.priorityId,
        categoryId: ticket.categoryId,
        subCategoryId: ticket.subCategoryId,
      })
    }
    load()
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateAll()) return

    if (isEdit && id) {
      await updateTicket({ ...values, ticketId: id })
      toast.success('Ticket updated successfully')
    } else {
      await createTicket(values)
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

      <FormCard onSubmit={handleSubmit}>
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
                setValue('subCategoryId', 0) // reset sub on category change
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
            <FieldLabel htmlFor="priority">Priority *</FieldLabel>
            <Select
              id="priority"
              size="small"
              fullWidth
              displayEmpty
              value={values.priority}
              onChange={(e) => setValue('priority', e.target.value)}
              onBlur={() => setFieldTouched('priority')}
              error={Boolean(errors.priority)}
            >
              <MenuItem value=""><em>Select priority</em></MenuItem>
              {priorities.map((p) => (
                <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
              ))}
            </Select>
            {errors.priority && <ErrorText>{errors.priority}</ErrorText>}
          </FieldWrapper>

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
            sx={{ textTransform: 'none', fontWeight: 600 }}
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
