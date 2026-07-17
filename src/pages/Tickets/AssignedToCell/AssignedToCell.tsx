import { useRef, useState } from 'react'
import { MenuItem, Select, type SelectChangeEvent } from '@mui/material'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import type { UserResponse } from '../../../models/user'
import { AssignedLabel, AssignedRoot } from './AssignedToCell.styles'
import { authStorage } from '../../../services/storage.service'
import { Role } from '../../../models/auth'
import { TicketStatus, type Ticket } from '../../../models/ticket'

interface AssignedToCellProps {
  ticket: Ticket
  users: UserResponse[]
  onAssign: (ticketId: string, userId: string | null) => Promise<void>
}

const AssignedToCell = ({ ticket, users, onAssign }: AssignedToCellProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [currentValue, setCurrentValue] = useState<string>(ticket.assignedTo ?? '')
  const selectRef = useRef<HTMLDivElement>(null)

  const displayName =
    currentValue
      ? (users.find((u) => u.userId === currentValue)?.name ?? ticket.assignedTo ?? 'Unassigned')
      : 'Unassigned'

  const handleChange = async (e: SelectChangeEvent<string>) => {
    const val = e.target.value
    setCurrentValue(val)
    setIsEditing(false)
    await onAssign(ticket.ticketId, val).catch(() => {
      setCurrentValue(ticket.assignedTo ?? '');
    })
  }

  const handleHover =  (value: boolean) => {
    if (ticket.isEditable) {
      setIsHovered(value);
    }
  }

  if (isEditing && !ticket.isDeleted && ticket.statusId !== TicketStatus.CLOSED && authStorage.getRole() === Role.ADMIN) {
    return (
      <Select
        ref={selectRef}
        value={currentValue}
        onChange={handleChange}
        onClose={() => setIsEditing(false)}
        open
        autoFocus
        size="small"
        displayEmpty
        sx={{ minWidth: 160, fontSize: '0.875rem' }}
      >
        {users.map((u) => (
          <MenuItem disabled={!u.isActive} key={u.userId} value={u.userId}>{u.name}</MenuItem>
        ))}
      </Select>
    )
  }

  return (
    <AssignedRoot
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      onClick={() => setIsEditing(true)}
      isHovered={isHovered}
      title={ticket.isEditable ? "Click to assign" : ""}
    >
      <PersonOutlineOutlinedIcon sx={{ fontSize: 14, flexShrink: 0, opacity: 0.6 }} />
      <AssignedLabel isUnassigned={!currentValue}>{displayName}</AssignedLabel>
    </AssignedRoot>
  )
}

export default AssignedToCell
