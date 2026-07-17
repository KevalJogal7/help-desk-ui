import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IconButton, MenuItem, Select, Tooltip, Typography } from '@mui/material'
import { ArrowBack, EditOutlined } from '@mui/icons-material'
import { getTicketById, statusUpdate } from '../../../services/ticket.service'
import { TicketStatus, type DropdownOption, type StatusUpdateRequest, type Ticket } from '../../../models/ticket'
import { ROUTES } from '../../../routes/routeConstants'
import StatusChip from '../../../components/StatusChip/StatusChip'
import { TICKET_PRIORITY_COLORS, TICKET_STATUS_COLORS } from '../../../components/StatusChip/chipColors'
import { GradientButton } from '../../Auth/AuthLayout/AuthLayout.styles'
import {
  Divider,
  FieldLabel,
  FieldWrapper,
  FormCard,
  HeaderLeft,
  PageHeader,
  PageRoot,
  ViewField,
  ViewGrid,
  ViewLabel,
  ViewValue,
} from '../TicketForm/TicketForm.styles'
import CommentSection from '../CommentSection/CommentSection'
import { useDropdowns } from '../../../hooks/useDropdowns'

const TicketView = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [ticket, setTicket] = useState<Ticket | null>(null)
  const [status, setStatus] = useState<number>(0);
  const [statusOptions, setStatusOptions] = useState<DropdownOption[]>([])
  const { statusList } = useDropdowns()

  useEffect(() => {
    const allowed: number[] = [
            TicketStatus.IN_PROGRESS,
            TicketStatus.PENDING_CUSTOMER,
            TicketStatus.RESOLVED,
            TicketStatus.CLOSED,];

    setStatusOptions(statusList.map((s) => ({...s, isActive: allowed.includes(s.id) })));
  }, [statusList]);

  useEffect(() => {
    if (!id) return
    getTicketById(id).then((response) => {
      setTicket(response);
      setStatus(response.statusId);
    })
  }, [id])

  const handleStatusChange = async (value: number) => {
    if(ticket) {
      const request: StatusUpdateRequest = {
        statusId: value,
        ticketId: ticket.ticketId
      }
      await statusUpdate(request);
    }
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

        {ticket.isEditable && <GradientButton
          variant="contained"
          startIcon={<EditOutlined />}
          onClick={() => navigate(editPath)}
        >
          Edit Ticket
        </GradientButton>}
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
            <ViewLabel>Priority</ViewLabel>
            <ViewValue>
              <StatusChip label={ticket.priority} colorMap={TICKET_PRIORITY_COLORS} dot />
            </ViewValue>
          </ViewField>

          {!ticket.canUpdateStatus ? <ViewField>
            <ViewLabel>Status</ViewLabel>
            <ViewValue>
              <StatusChip label={ticket.status} colorMap={TICKET_STATUS_COLORS} dot />
            </ViewValue>
          </ViewField> 
          : <FieldWrapper>
            <FieldLabel htmlFor="statusId">Status</FieldLabel>
              <Select
                id="statusId"
                size="small"
                fullWidth
                displayEmpty
                value={status}
                onChange={(e) => handleStatusChange(Number(e.target.value))}
              >
                {statusOptions.map((s) => (
                  <MenuItem disabled={!s.isActive} key={s.id} value={s.id}>{s.name}</MenuItem>
                ))}
            </Select>
          </FieldWrapper>}

          <ViewField>
            <ViewLabel>Category</ViewLabel>
            <ViewValue>{ticket.category}</ViewValue>
          </ViewField>

          <ViewField>
            <ViewLabel>Sub-Category</ViewLabel>
            <ViewValue>{ticket.subCategory}</ViewValue>
          </ViewField>

          <ViewField>
            <ViewLabel>Created On</ViewLabel>
            <ViewValue>{new Date(ticket.createdOn).toLocaleString()}</ViewValue>
          </ViewField>

          <ViewField>
            <ViewLabel>Assigned To</ViewLabel>
            <ViewValue>{ticket.assignedToName ?? '—'}</ViewValue>
          </ViewField>

          <Divider />

          <ViewField sx={{ gridColumn: '1 / -1' }}>
            <ViewLabel>Description</ViewLabel>
            <ViewValue sx={{ whiteSpace: 'pre-wrap' }}>{ticket.description}</ViewValue>
          </ViewField>

        </ViewGrid>
      </FormCard>

      <CommentSection {...ticket}/>
    </PageRoot>
  )
}

export default TicketView
