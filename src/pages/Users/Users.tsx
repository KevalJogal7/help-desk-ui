import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MenuItem, Select, Switch, Typography, type SelectChangeEvent } from '@mui/material'
import { AddOutlined, SearchOutlined } from '@mui/icons-material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import type { UserListRequest, UserResponse } from '../../models/user'
import { deleteUser, getUsers, toggleStatus } from '../../services/user.service'
import type { ColumnDef, TableAction } from '../../models/dataTable'
import DataTable from '../../components/DataTable/DataTable'
import StatusChip from '../../components/StatusChip/StatusChip'
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
} from '../Tickets/Tickets.styles'
import ConfirmationDialog from '../../components/ConfirmationDialog'
import { ROUTES } from '../../routes/routeConstants'
import { colors } from '../../config/colors'
import type { ChipColorConfig } from '../../components/StatusChip/StatusChip'

const ROLE_COLORS: Record<string, ChipColorConfig> = {
  'Admin':         { background: colors.purple.bg,  color: colors.purple.text },
  'Support Agent': { background: colors.info.bg,    color: colors.info.text },
  'User':          { background: colors.neutral.bg, color: colors.neutral.text },
}

const defaultRequest: UserListRequest = {
  page: 0,
  pageSize: 10,
  search: '',
  role: 0,
  sortBy: 'name',
  sortDirection: 'asc',
}

const Users = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState<UserResponse[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [request, setRequest] = useState<UserListRequest>(defaultRequest)
  const [search, setSearch] = useState('')
  const debounceSearch = useDebounce(search)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const loadUsers = async (page: number) => {
    const result = await getUsers({ ...request, search: debounceSearch, page })
    setUsers(result.items)
    setTotalCount(result.totalCount)
  }

  useEffect(() => {
    loadUsers(request.page)
  }, [request.page])

  useUpdateEffect(() => {
    if (request.page !== 0) {
      setRequest((prev) => ({ ...prev, page: 0 }))
    } else {
      loadUsers(0)
    }
  }, [debounceSearch, request.role, request.pageSize, request.sortBy, request.sortDirection])

  const handleRoleChange = (e: SelectChangeEvent<number>) => {
    setRequest((prev) => ({ ...prev, role: Number(e.target.value), page: 0 }))
  }

  const handleSort = (field: string) => {
    setRequest((prev) => ({
      ...prev,
      sortDirection: prev.sortBy === field ? (prev.sortDirection === 'asc' ? 'desc' : 'asc') : 'asc',
      sortBy: field,
    }))
  }

  const handleDelete = async () => {
    if (!deleteId) return
    await deleteUser(deleteId)
    setDeleteId(null)
    await loadUsers(request.page)
  }

  const handleToggleStatus = async (userId: string) => {
    await toggleStatus(userId)
    // optimistically flip isActive in local state — no full reload needed
    setUsers((prev) =>
      prev.map((u) => (u.userId === userId ? { ...u, isActive: !u.isActive } : u))
    )
  }

  const columns: ColumnDef<UserResponse>[] = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      cellClassName: 'nowrap',
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
    },
    {
      key: 'role',
      label: 'Role',
      align: 'center',
      render: (user) => (
        <StatusChip label={user.role} colorMap={ROLE_COLORS} />
      ),
    },
    {
      key: 'isActive',
      label: 'Status',
      align: 'center',
      render: (user) => (
        <Switch
          checked={user.isActive}
          onChange={() => handleToggleStatus(user.userId)}
          color="primary"
          size="small"
        />
      ),
    },
  ]

  const actions: TableAction<UserResponse>[] = [
    {
      label: 'Edit',
      icon: <EditIcon fontSize="small" />,
      onClick: (row) => navigate(ROUTES.USER_EDIT.replace(':id', row.userId)),
    },
    {
      label: 'Delete',
      icon: <DeleteIcon fontSize="small" />,
      onClick: (row) => setDeleteId(row.userId),
    },
  ]

  return (
    <div className="fill-height">
      <TicketsPage>
        <TicketsHeader>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Users
          </Typography>
          <GradientButton
            variant="contained"
            startIcon={<AddOutlined />}
            onClick={() => navigate(ROUTES.USER_NEW)}
          >
            New User
          </GradientButton>
        </TicketsHeader>

        <TicketsToolbar>
          <SearchBox>
            <SearchIconWrap>
              <SearchOutlined fontSize="small" />
            </SearchIconWrap>
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </SearchBox>

          <Select
            value={request.role}
            onChange={handleRoleChange}
            displayEmpty
            size="small"
            sx={{ minWidth: 160, fontSize: '0.875rem' }}
          >
            <MenuItem value={0}><em>All Roles</em></MenuItem>
            <MenuItem value={1}>Admin</MenuItem>
            <MenuItem value={2}>Support Agent</MenuItem>
            <MenuItem value={3}>User</MenuItem>
          </Select>
        </TicketsToolbar>

        <TableWrapper>
          <DataTable
            columns={columns}
            data={users}
            rowKey={(user) => user.userId}
            showAction
            page={request.page}
            pageSize={request.pageSize}
            totalCount={totalCount}
            onPageChange={(p) => setRequest((prev) => ({ ...prev, page: p }))}
            onPageSizeChange={(ps) => setRequest((prev) => ({ ...prev, pageSize: ps, page: 0 }))}
            emptyMessage="No users found"
            actions={actions}
            sortBy={request.sortBy}
            sortDescending={request.sortDirection === 'desc'}
            onSort={handleSort}
          />
        </TableWrapper>
      </TicketsPage>

      <ConfirmationDialog
        open={Boolean(deleteId)}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        confirmLabel="Delete"
        variant="error"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  )
}

export default Users
