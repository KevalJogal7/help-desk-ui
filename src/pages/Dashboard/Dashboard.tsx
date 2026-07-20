import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Chip, Skeleton, Typography } from '@mui/material'
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded'
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import { getDashboard } from '../../services/dashboard.service'
import type { DashboardResponse } from '../../models/dashboard'
import type { Ticket } from '../../models/ticket'
import StatusChip from '../../components/StatusChip/StatusChip'
import { TICKET_PRIORITY_COLORS, TICKET_STATUS_COLORS } from '../../components/StatusChip/chipColors'
import { ROUTES } from '../../routes/routeConstants'
import { authStorage } from '../../services/storage.service'
import { colors } from '../../config/theme'
import {
  BreakdownCount,
  BreakdownFill,
  BreakdownLabel,
  BreakdownList,
  BreakdownMeta,
  BreakdownRow,
  BreakdownTrack,
  DashboardRoot,
  EmptyState,
  SectionBody,
  SectionCard,
  SectionHeader,
  SectionTitle,
  StatCard,
  StatIcon,
  StatLabel,
  StatValue,
  StatsGrid,
  TicketListRow,
  TicketRowChips,
  TicketRowInfo,
  TicketRowMeta,
  TicketRowTitle,
  TwoColRow,
} from './Dashboard.styles'
import { formatTime } from '../../utils/utility'

// ── Stat card config ──────────────────────────────────────────────────────────

const STAT_ACCENT = {
  total:      '#4c35b5',
  open:       '#1565c0',
  resolved:   '#2e7d32',
  overdue:    '#c62828',
  avgTime:    '#e65100',
}

// ── Breakdown color maps ──────────────────────────────────────────────────────

const STATUS_BAR_COLORS: Record<string, string> = {
  'New':              colors.teal.text,
  'Assigned':         colors.brand.text,
  'In Progress':      colors.info.text,
  'Pending Customer': colors.orange.text,
  'Resolved':         colors.successLight.text,
  'Closed':           colors.neutral.text,
}

const PRIORITY_BAR_COLORS: Record<string, string> = {
  'Low':      colors.info.text,
  'Medium':   colors.warning.text,
  'High':     colors.error.text,
}


// ── Skeleton loaders ──────────────────────────────────────────────────────────

const StatsSkeleton = () => (
  <StatsGrid>
    {Array.from({ length: 4 }).map((_, i) => (
      <Skeleton key={i} variant="rounded" height={110} sx={{ borderRadius: 3 }} />
    ))}
  </StatsGrid>
)

const SectionSkeleton = () => (
  <SectionCard>
    <SectionHeader>
      <Skeleton variant="text" width={160} height={28} />
    </SectionHeader>
    <SectionBody>
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} variant="text" sx={{ mx: 2.5, my: 1 }} height={48} />
      ))}
    </SectionBody>
  </SectionCard>
)

// ── Ticket row ────────────────────────────────────────────────────────────────

const TicketRow = ({ ticket, onClick }: { ticket: Ticket; onClick: () => void }) => (
  <TicketListRow onClick={onClick}>
    <TicketRowInfo>
      <TicketRowTitle>{ticket.title}</TicketRowTitle>
      <TicketRowMeta>
        #{ticket.ticketNumber} · {ticket.category} · {formatTime(ticket.createdOn)}
      </TicketRowMeta>
    </TicketRowInfo>
    <TicketRowChips>
      <StatusChip label={ticket.priority} colorMap={TICKET_PRIORITY_COLORS} size="sm" dot />
      <StatusChip label={ticket.status} colorMap={TICKET_STATUS_COLORS} size="sm" />
    </TicketRowChips>
  </TicketListRow>
)

// ── Main component ────────────────────────────────────────────────────────────

const Dashboard = () => {
  const navigate = useNavigate()
  const [data, setData] = useState<DashboardResponse | null>(null)
  const userName = authStorage.getUserName()

  useEffect(() => {
    getDashboard().then(setData)
  }, [])

  const toTicket = (t: Ticket) =>
    navigate(ROUTES.TICKET_VIEW.replace(':id', t.ticketId))

  // max count for bar widths
  const maxStatus   = data ? Math.max(...data.statusBreakdown.map((s) => s.count), 1) : 1
  const maxPriority = data ? Math.max(...data.priorityBreakdown.map((p) => p.count), 1) : 1

  return (
    <DashboardRoot>

      {/* Greeting */}
      <div>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Welcome back{userName ? `, ${userName}` : ''} 👋
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Here's what's happening with your tickets today.
        </Typography>
      </div>

      {/* ── Stat cards ── */}
      {!data ? <StatsSkeleton /> : (
        <StatsGrid>
          <StatCard accentColor={STAT_ACCENT.total}>
            <StatIcon accentColor={STAT_ACCENT.total}>
              <ConfirmationNumberOutlinedIcon fontSize="small" />
            </StatIcon>
            <StatValue>{data.stats.totalTickets}</StatValue>
            <StatLabel>Total Tickets</StatLabel>
          </StatCard>

          <StatCard accentColor={STAT_ACCENT.open}>
            <StatIcon accentColor={STAT_ACCENT.open}>
              <HourglassEmptyOutlinedIcon fontSize="small" />
            </StatIcon>
            <StatValue>{data.stats.openTickets}</StatValue>
            <StatLabel>Open Tickets</StatLabel>
          </StatCard>

          <StatCard accentColor={STAT_ACCENT.resolved}>
            <StatIcon accentColor={STAT_ACCENT.resolved}>
              <CheckCircleOutlineOutlinedIcon fontSize="small" />
            </StatIcon>
            <StatValue>{data.stats.resolvedToday}</StatValue>
            <StatLabel>Resolved Today</StatLabel>
          </StatCard>

          <StatCard accentColor={STAT_ACCENT.overdue}>
            <StatIcon accentColor={STAT_ACCENT.overdue}>
              <WarningAmberRoundedIcon fontSize="small" />
            </StatIcon>
            <StatValue>{data.stats.overdueTickets}</StatValue>
            <StatLabel>Overdue</StatLabel>
          </StatCard>
        </StatsGrid>
      )}

      {/* ── Breakdowns row ── */}
      {!data ? (
        <TwoColRow>
          <SectionSkeleton />
          <SectionSkeleton />
        </TwoColRow>
      ) : (
        <TwoColRow>
          {/* Status breakdown */}
          <SectionCard>
            <SectionHeader>
              <SectionTitle>
                <TrendingUpIcon fontSize="small" color="primary" />
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>By Status</Typography>
              </SectionTitle>
              <Chip label={`${data.statusBreakdown.reduce((s, i) => s + i.count, 0)} total`} size="small" />
            </SectionHeader>
            <BreakdownList>
              {data.statusBreakdown.map((item) => (
                <BreakdownRow key={item.status}>
                  <BreakdownMeta>
                    <BreakdownLabel>{item.status}</BreakdownLabel>
                    <BreakdownCount>{item.count}</BreakdownCount>
                  </BreakdownMeta>
                  <BreakdownTrack>
                    <BreakdownFill
                      fillcolor={STATUS_BAR_COLORS[item.status] ?? colors.neutral.text}
                      fillWidth={Math.round((item.count / maxStatus) * 100)}
                    />
                  </BreakdownTrack>
                </BreakdownRow>
              ))}
            </BreakdownList>
          </SectionCard>

          {/* Priority breakdown */}
          <SectionCard>
            <SectionHeader>
              <SectionTitle>
                <TrendingUpIcon fontSize="small" color="primary" />
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>By Priority</Typography>
              </SectionTitle>
              <Chip label={`${data.priorityBreakdown.reduce((s, i) => s + i.count, 0)} total`} size="small" />
            </SectionHeader>
            <BreakdownList>
              {data.priorityBreakdown.map((item) => (
                <BreakdownRow key={item.priority}>
                  <BreakdownMeta>
                    <BreakdownLabel>{item.priority}</BreakdownLabel>
                    <BreakdownCount>{item.count}</BreakdownCount>
                  </BreakdownMeta>
                  <BreakdownTrack>
                    <BreakdownFill
                      fillcolor={PRIORITY_BAR_COLORS[item.priority] ?? colors.neutral.text}
                      fillWidth={Math.round((item.count / maxPriority) * 100)}
                    />
                  </BreakdownTrack>
                </BreakdownRow>
              ))}
            </BreakdownList>
          </SectionCard>
        </TwoColRow>
      )}

      {/* ── Ticket lists row ── */}
      {!data ? (
        <TwoColRow>
          <SectionSkeleton />
          <SectionSkeleton />
        </TwoColRow>
      ) : (
        <TwoColRow>
          {/* High priority tickets */}
          <SectionCard>
            <SectionHeader>
              <SectionTitle>
                <PriorityHighRoundedIcon fontSize="small" sx={{ color: colors.error.text }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>High Priority</Typography>
              </SectionTitle>
              <Chip
                label="View all"
                size="small"
                clickable
                onClick={() => navigate(ROUTES.TICKETS)}
              />
            </SectionHeader>
            <SectionBody>
              {data.highPriorityTickets.length === 0 ? (
                <EmptyState>No high priority tickets 🎉</EmptyState>
              ) : (
                data.highPriorityTickets.slice(0, 5).map((t) => (
                  <TicketRow key={t.ticketId} ticket={t} onClick={() => toTicket(t)} />
                ))
              )}
            </SectionBody>
          </SectionCard>

          {/* Recent tickets */}
          <SectionCard>
            <SectionHeader>
              <SectionTitle>
                <HistoryOutlinedIcon fontSize="small" color="primary" />
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Recent Tickets</Typography>
              </SectionTitle>
              <Chip
                label="View all"
                size="small"
                clickable
                onClick={() => navigate(ROUTES.TICKETS)}
              />
            </SectionHeader>
            <SectionBody>
              {data.recentTickets.length === 0 ? (
                <EmptyState>No recent tickets</EmptyState>
              ) : (
                data.recentTickets.slice(0, 5).map((t) => (
                  <TicketRow key={t.ticketId} ticket={t} onClick={() => toTicket(t)} />
                ))
              )}
            </SectionBody>
          </SectionCard>
        </TwoColRow>
      )}

    </DashboardRoot>
  )
}

export default Dashboard
