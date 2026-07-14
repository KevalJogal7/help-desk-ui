import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CircularProgress, IconButton, Tooltip, Typography } from '@mui/material'
import { ArrowBack, EditOutlined } from '@mui/icons-material'
import { getTicketById } from '../../../services/ticket.service'
import type { Ticket } from '../../../models/ticket'
import { ROUTES } from '../../../routes/routeConstants'
import StatusChip from '../../../components/StatusChip/StatusChip'
import { TICKET_PRIORITY_COLORS, TICKET_STATUS_COLORS } from '../../../components/StatusChip/chipColors'
import { GradientButton } from '../../Auth/AuthLayout/AuthLayout.styles'
import {
  Divider,
  FormCard,
  HeaderLeft,
  PageHeader,
  PageRoot,
  ViewField,
  ViewGrid,
  ViewLabel,
  ViewValue,
} from '../TicketForm/TicketForm.styles'

const TicketView = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [ticket, setTicket] = useState<Ticket | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    getTicketById(id).then((t) => {
      setTicket(t)
      setLoading(false)
    })
  }, [id])

  if (loading) {
    return (
      <PageRoot>
        <CircularProgress sx={{ m: 'auto' }} />
      </PageRoot>
    )
  }

  if (!ticket) return null

  const editPath = ROUTES.TICKET_EDIT.replace(':id', ticket.ticketId)

  return (
    <PageRoot>
      <PageHeader>
        <HeaderLeft>
          <Tooltip title="Back to tickets">
            <IconButton size="small" onClick={() => navigate(ROUTES.TICKETS)}>
              <ArrowBack fontSize="small" />
            </IconButton>
          </Tooltip>
          <div>
            <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              {ticket.title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {ticket.ticketNumber}
            </Typography>
          </div>
        </HeaderLeft>

        <GradientButton
          variant="contained"
          startIcon={<EditOutlined />}
          onClick={() => navigate(editPath)}
        >
          Edit Ticket
        </GradientButton>
      </PageHeader>

      <FormCard>
        <ViewGrid>

          <ViewField>
            <ViewLabel>Ticket Number</ViewLabel>
            <ViewValue>{ticket.ticketNumber}</ViewValue>
          </ViewField>

          <ViewField>
            <ViewLabel>Created By</ViewLabel>
            <ViewValue>{ticket.createdBy}</ViewValue>
          </ViewField>

          <ViewField>
            <ViewLabel>Created On</ViewLabel>
            <ViewValue>{new Date(ticket.createdOn).toLocaleString()}</ViewValue>
          </ViewField>

          <ViewField>
            <ViewLabel>Priority</ViewLabel>
            <ViewValue>
              <StatusChip label={ticket.priority} colorMap={TICKET_PRIORITY_COLORS} dot />
            </ViewValue>
          </ViewField>

          <ViewField>
            <ViewLabel>Status</ViewLabel>
            <ViewValue>
              <StatusChip label={ticket.status} colorMap={TICKET_STATUS_COLORS} dot />
            </ViewValue>
          </ViewField>

          <ViewField>
            <ViewLabel>Category</ViewLabel>
            <ViewValue>{ticket.category}</ViewValue>
          </ViewField>

          <ViewField>
            <ViewLabel>Sub-Category</ViewLabel>
            <ViewValue>{ticket.subCategory}</ViewValue>
          </ViewField>

          <Divider />

          <ViewField sx={{ gridColumn: '1 / -1' }}>
            <ViewLabel>Description</ViewLabel>
            <ViewValue sx={{ whiteSpace: 'pre-wrap' }}>{ticket.description}</ViewValue>
          </ViewField>

        </ViewGrid>
      </FormCard>
    </PageRoot>
  )
}

export default TicketView
