import { useEffect, useState } from 'react'
import { Button, MenuItem, Select, Typography, type SelectChangeEvent } from '@mui/material'
import { AddOutlined, SearchOutlined } from '@mui/icons-material'
import type { Category, SubCategory, Ticket, TicketPageRequest } from '../../models/ticket'
import { getCategories, getSubCategories, getTickets } from '../../services/ticket.service'
import './Tickets.css'
import '../Auth/AuthLayout/AuthLayout.css'
import type { ColumnDef } from '../../models/dataTable'
import DataTable from '../../components/DataTable/DataTable'
import StatusChip from '../../components/StatusChip/StatusChip'
import { TICKET_PRIORITY_COLORS, TICKET_STATUS_COLORS } from '../../components/StatusChip/chipColors'
import { useDebounce } from '../../utils/useDebounce'
import { useUpdateEffect } from '../../utils/useUpdateEffect'

const Tickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [totalCount, setTotalCount] = useState(0)

  // Filters
  const [search, setSearch] = useState('')
  const debounceSearch = useDebounce(search);
  const [categories, setCategories] = useState<Category[]>([])
  const [subCategories, setSubCategories] = useState<SubCategory[]>([])
  const defaultValues: TicketPageRequest = {
    page: 0,
    pageSize: 10,
    search: "",
    category: 0,
    subCategory: 0,
    sortBy: "",
    sortDirection: "",
}
  const [ticketRequest, setTicketRequest] = useState<TicketPageRequest>(defaultValues)


  useEffect(() => {
    const loadData = async () => {
      const categoryRecords = await getCategories();
      setCategories(categoryRecords);
      const subCategories = await getSubCategories();
      setSubCategories(subCategories);
    }
    loadData();
  }, [])

  const loadTickets = async (page: number) => {
    const result = await getTickets({ ...ticketRequest, search: debounceSearch, page })
    setTickets(result.items)
    setTotalCount(result.totalCount)
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
  }, [debounceSearch, ticketRequest.category, ticketRequest.pageSize, ticketRequest.subCategory])

  const handleCategoryChange = (e: SelectChangeEvent<number>) => {
    setTicketRequest({...ticketRequest, category: e.target.value})
  }

  const handleSubCategoryChange = (e: SelectChangeEvent<number>) => {
    setTicketRequest({...ticketRequest, subCategory: e.target.value})
  }

  const columns: ColumnDef<Ticket>[] = [
    {
      key: 'ticketNumber',
      label: 'Ticket No.',
      cellClassName: 'nowrap',
    },
    {
      key: 'title',
      label: 'Title',
      width: 200,
      tooltip: true,
      cellClassName: 'truncate',
    },
    {
      key: 'description',
      label: 'Description',
      width: 260,
      tooltip: true,
      cellClassName: 'truncate',
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

  return (
    <div className="fill-height">
      <div className="tickets-page">

        <div className="tickets-header">
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Tickets
          </Typography>
        </div>

        <div className="tickets-toolbar">

          <div className="tickets-search">
            <span className="tickets-search-icon">
              <SearchOutlined fontSize="small" />
            </span>
            <input
              type="text"
              placeholder="Search tickets..."
              value={search}
              onChange={(e: any) => setSearch(e.target.value)}
            />
          </div>

          <Select
            value={ticketRequest.category}
            onChange={handleCategoryChange}
            displayEmpty
            size="small"
            sx={{ minWidth: 160, fontSize: '0.875rem', backgroundColor: 'white' }}
          >
            <MenuItem value={0}><em>All Categories</em></MenuItem>
            {categories.map((c) => (
              <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
            ))}
          </Select>

            <Select
              value={ticketRequest.subCategory}
              onChange={handleSubCategoryChange}
              displayEmpty
              size="small"
              sx={{ minWidth: 180, fontSize: '0.875rem', backgroundColor: 'white' }}
            >
              <MenuItem value={0}><em>All Sub-Categories</em></MenuItem>
              {subCategories.map((s) => (
                <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
              ))}
            </Select>

          <div className="tickets-toolbar-right">
            <Button variant="contained" startIcon={<AddOutlined />} className="auth-submit-btn">
              New Ticket
            </Button>
          </div>

        </div>

        <div className="tickets-table-wrapper">
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
          />
        </div>

      </div>
    </div>
  )
}

export default Tickets
