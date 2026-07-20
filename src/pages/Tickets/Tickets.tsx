import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link, MenuItem, Select, Typography, type SelectChangeEvent } from '@mui/material'
import { AddOutlined, SearchOutlined } from '@mui/icons-material'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import DeleteIcon from '@mui/icons-material/Delete'
import type { Ticket, TicketPageRequest } from '../../models/ticket'
import { assignTicket, deleteTicket, getTickets } from '../../services/ticket.service'
import type { ColumnDef, TableAction } from '../../models/dataTable'
import DataTable from '../../components/DataTable/DataTable'
import StatusChip from '../../components/StatusChip/StatusChip'
import { TICKET_PRIORITY_COLORS, TICKET_STATUS_COLORS } from '../../components/StatusChip/chipColors'
import { useDebounce } from '../../utils/useDebounce'
import { useUpdateEffect } from '../../utils/useUpdateEffect'
import { GradientButton } from '../Auth/AuthLayout/AuthLayout.styles'
import {
  SearchBox,
  SearchIconWrap,
  TableWrapper,
  TicketsHeader,
  TicketsPage,
  TicketsToolbar,
} from './Tickets.styles'
import { ROUTES } from '../../routes/routeConstants'
import { useDropdowns } from '../../utils/useDropdowns'
import { getUsers } from '../../services/user.service'
import type { UserListRequest, UserResponse } from '../../models/user'
import AssignedToCell from './AssignedToCell/AssignedToCell'
import ConfirmationDialog from '../../components/ConfirmationDialog'

const Tickets = () => {
  const navigate = useNavigate()
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [users, setUsers] = useState<UserResponse[]>([])
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const { categories, subCategories, priorities, statusList } = useDropdowns()

  // Filters
  const [search, setSearch] = useState('')
  const debounceSearch = useDebounce(search);
  const defaultValues: TicketPageRequest = {
    page: 0,
    pageSize: 10,
    search: "",
    category: 0,
    subCategory: 0,
    status: 0,
    priority: 0,
    sortBy: "createdOn",
    sortDirection: "desc",
}
  const [ticketRequest, setTicketRequest] = useState<TicketPageRequest>(defaultValues)

  const loadTickets = async (page: number) => {
    const result = await getTickets({ ...ticketRequest, search: debounceSearch, page })
    setTickets(result.items)
    setTotalCount(result.totalCount)
  }

  const loadUsers = async () => {
    const request: UserListRequest = {
      page: 0,
      pageSize: 0,
      role: 2
    } 
    const result = await getUsers(request);
    setUsers(result.items)
  }

  useEffect(() => {
    loadUsers();
  },[]);

  const handleDelete = async () => {
    if (!deleteId) return
    await deleteTicket(deleteId)
    setDeleteId(null)
    await loadTickets(ticketRequest.page)
  }

  useEffect(() => {
    loadTickets(ticketRequest.page);
  }, [ticketRequest.page])

  useUpdateEffect(() => {
    if (ticketRequest.page !== 0) {
      setTicketRequest({ ...ticketRequest, page: 0 });
    } else {
      loadTickets(0);
    }
  }, [debounceSearch,
      ticketRequest.category,
      ticketRequest.pageSize, 
      ticketRequest.subCategory,
      ticketRequest.status,
      ticketRequest.priority,
      ticketRequest.sortBy,
      ticketRequest.sortDirection])

  const handleSelectChange =
    (field: keyof TicketPageRequest) =>
    (e: SelectChangeEvent<number>) => {
      setTicketRequest((prev) => ({
        ...prev,
        [field]: Number(e.target.value),
      }));
  };

  const handleSort = (field: string) => {
    const { sortBy, sortDirection } = ticketRequest;
    setTicketRequest({
      ...ticketRequest,
      sortDirection: sortBy === field ? sortDirection === "asc" ? "desc" : "asc" : "asc",
      sortBy: field 
    })
  };

  const handleAssign = async (ticketId: string, userId: string | null) => {
    await assignTicket({ ticketId, assignedTo: userId ?? '' })
  }

  const columns: ColumnDef<Ticket>[] = [
    {
      key: 'ticketNumber',
      label: 'Ticket No.',
      cellClassName: 'nowrap',
      sortable: true,
      render: (ticket) => (
        <Link href={ROUTES.TICKET_VIEW.replace(':id', ticket.ticketId)}>{ticket.ticketNumber}</Link>
      ),
    },
    {
      key: 'title',
      label: 'Title',
      width: 300,
      tooltip: true,
      cellClassName: 'truncate',
      sortable: true
    },
    {
      key: 'description',
      label: 'Description',
      width: 400,
      tooltip: true,
      cellClassName: 'truncate',
      sortable: true
    },
    {
      key: 'category',
      label: 'Category',
      cellClassName: 'nowrap',
    },
    {
      key: 'subCategory',
      label: 'Sub-Category',
      cellClassName: 'nowrap',
    },
    {
      key: 'createdBy',
      label: 'Created By',
      cellClassName: 'nowrap',
    },
    {
      key: 'assignedTo',
      label: 'Assigned To',
      cellClassName: 'nowrap',
      render: (ticket) => (
        <AssignedToCell
          ticket={ticket}
          users={users}
          onAssign={handleAssign}
        />
      ),
    },
    {
      key: 'priority',
      label: 'Priority',
      align: 'center',
      render: (ticket) => (
        <StatusChip label={ticket.priority} colorMap={TICKET_PRIORITY_COLORS} dot />
      ),
    },
    {
      key: 'status',
      label: 'Status',
      align: 'center',
      render: (ticket) => (
        <StatusChip label={ticket.status} colorMap={TICKET_STATUS_COLORS} dot />
      ),
    },
  ]

  const actions: TableAction<Ticket>[] = [
    {
      label: 'View',
      icon: <VisibilityIcon fontSize="small" />,
      onClick: (row) => navigate(ROUTES.TICKET_VIEW.replace(':id', row.ticketId)),
    },
    {
      label: 'Edit',
      icon: <EditIcon fontSize="small" />,
      hidden: (row) => !row.isEditable,
      onClick: (row) => {
        if (!row.isEditable) return;
        navigate(ROUTES.TICKET_EDIT.replace(':id', row.ticketId))
      },
    },
    {
      label: 'Delete',
      icon: <DeleteIcon fontSize="small" />,
      hidden: (row) => !row.isEditable,
      onClick: (row) => {
        if (!row.isEditable) return;
        setDeleteId(row.ticketId)
      },
    },
  ]

  return (
    <div className="fill-height">
      <TicketsPage>
        <TicketsHeader>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Tickets
          </Typography>
          <GradientButton
            variant="contained"
            startIcon={<AddOutlined />}
            onClick={() => navigate(ROUTES.TICKET_NEW)}
          >
            New Ticket
          </GradientButton>
        </TicketsHeader>

        <TicketsToolbar>
          <SearchBox>
            <SearchIconWrap>
              <SearchOutlined fontSize="small" />
            </SearchIconWrap>
            <input
              type="text"
              placeholder="Search tickets..."
              value={search}
              onChange={(e: any) => setSearch(e.target.value)}
            />
          </SearchBox>

          <Select
            value={ticketRequest.category}
            onChange={handleSelectChange("category")}
            displayEmpty
            size="small"
            sx={{ minWidth: 160 }}
          >
            <MenuItem value={0}><em>All Categories</em></MenuItem>
            {categories.map((c) => (
              <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
            ))}
          </Select>

          <Select
            value={ticketRequest.subCategory}
            onChange={handleSelectChange("subCategory")}
            displayEmpty
            size="small"
            sx={{ minWidth: 180 }}
          >
            <MenuItem value={0}><em>All Sub-Categories</em></MenuItem>
            {subCategories.map((s) => (
              <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
            ))}
          </Select>

          <Select
            value={ticketRequest.priority}
            onChange={handleSelectChange("priority")}
            displayEmpty
            size="small"
            sx={{ minWidth: 180 }}
          >
            <MenuItem value={0}><em>All Priorities</em></MenuItem>
            {priorities.map((s) => (
              <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
            ))}
          </Select>

          <Select
            value={ticketRequest.status}
            onChange={handleSelectChange("status")}
            displayEmpty
            size="small"
            sx={{ minWidth: 160 }}
          >
            <MenuItem value={0}><em>All Status</em></MenuItem>
            {statusList.map((c) => (
              <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
            ))}
          </Select>

        </TicketsToolbar>

        <TableWrapper>
          <DataTable
            columns={columns}
            data={tickets}
            rowKey={(ticket) => ticket.ticketId}
            showAction
            page={ticketRequest.page}
            pageSize={ticketRequest.pageSize}
            totalCount={totalCount}
            onPageChange={(p) => setTicketRequest({ ...ticketRequest, page: p })}
            onPageSizeChange={(ps) => setTicketRequest({ ...ticketRequest, pageSize: ps, page: 0 })}
            emptyMessage="No tickets found"
            actions={actions}
            sortBy={ticketRequest.sortBy}
            sortDescending={ticketRequest.sortDirection === "desc"}
            onSort={handleSort}
            isRowDisabled={(ticket) => ticket.isDeleted}
          />
        </TableWrapper>
      </TicketsPage>

      <ConfirmationDialog
        open={Boolean(deleteId)}
        title="Delete Ticket"
        message="Are you sure you want to delete this ticket? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="error"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  )
}

export default Tickets
