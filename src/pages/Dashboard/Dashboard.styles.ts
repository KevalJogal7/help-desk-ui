import { styled } from '@mui/material/styles'
import { Box, Paper } from '@mui/material'

export const DashboardRoot = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
})

// ── Stat cards row ────────────────────────────────────────────────────────────

export const StatsGrid = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: 16,
  '@media (max-width: 1200px)': { gridTemplateColumns: 'repeat(2, 1fr)' },
})

export const StatCard = styled(Paper)<{ accentColor: string }>(({ theme, accentColor }) => ({
  padding: '20px 24px',
  borderRadius: 12,
  boxShadow: theme.palette.custom.cardShadow,
  borderTop: `3px solid ${accentColor}`,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
}))

export const StatIcon = styled(Box)<{ accentColor: string }>(({ accentColor }) => ({
  width: 40,
  height: 40,
  borderRadius: 10,
  backgroundColor: `${accentColor}22`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: accentColor,
  marginBottom: 4,
}))

export const StatValue = styled('div')(({ theme }) => ({
  fontSize: '1.875rem',
  fontWeight: 700,
  color: theme.palette.custom.valueText,
  lineHeight: 1,
}))

export const StatLabel = styled('div')(({ theme }) => ({
  fontSize: '0.8rem',
  color: theme.palette.custom.mutedText,
  fontWeight: 500,
}))

// ── Two-column row ────────────────────────────────────────────────────────────

export const TwoColRow = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 24,
  '@media (max-width: 900px)': { gridTemplateColumns: '1fr' },
})

// ── Section card ──────────────────────────────────────────────────────────────

export const SectionCard = styled(Paper)(({ theme }) => ({
  borderRadius: 12,
  boxShadow: theme.palette.custom.cardShadow,
  overflow: 'hidden',
}))

export const SectionHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '16px 20px',
  borderBottom: `1px solid ${theme.palette.custom.border}`,
}))

export const SectionTitle = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
})

export const SectionBody = styled('div')({
  padding: '12px 0',
})

// ── Breakdown bars ────────────────────────────────────────────────────────────

export const BreakdownList = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  padding: '8px 20px 16px',
})

export const BreakdownRow = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
})

export const BreakdownMeta = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export const BreakdownLabel = styled('span')(({ theme }) => ({
  fontSize: '0.8rem',
  fontWeight: 600,
  color: theme.palette.custom.labelText,
}))

export const BreakdownCount = styled('span')(({ theme }) => ({
  fontSize: '0.8rem',
  color: theme.palette.custom.mutedText,
  fontWeight: 500,
}))

export const BreakdownTrack = styled('div')(({ theme }) => ({
  height: 7,
  borderRadius: 999,
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
  overflow: 'hidden',
}))

export const BreakdownFill = styled('div')<{ fillcolor: string; fillWidth: number }>(
  ({ fillcolor, fillWidth }) => ({
    height: '100%',
    borderRadius: 999,
    backgroundColor: fillcolor,
    width: `${fillWidth}%`,
    transition: 'width 0.6s ease',
  })
)

// ── Ticket list rows ──────────────────────────────────────────────────────────

export const TicketListRow = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '10px 20px',
  borderBottom: `1px solid ${theme.palette.custom.border}`,
  cursor: 'pointer',
  transition: 'background-color 0.15s',
  '&:last-child': { borderBottom: 'none' },
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255,255,255,0.04)'
        : 'rgba(0,0,0,0.03)',
  },
}))

export const TicketRowInfo = styled('div')({
  flex: 1,
  minWidth: 0,
})

export const TicketRowTitle = styled('div')(({ theme }) => ({
  fontSize: '0.875rem',
  fontWeight: 600,
  color: theme.palette.custom.valueText,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}))

export const TicketRowMeta = styled('div')(({ theme }) => ({
  fontSize: '0.75rem',
  color: theme.palette.custom.mutedText,
  marginTop: 2,
}))

export const TicketRowChips = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  flexShrink: 0,
})

export const EmptyState = styled('div')(({ theme }) => ({
  padding: '32px 0',
  textAlign: 'center',
  color: theme.palette.custom.mutedText,
  fontSize: '0.875rem',
}))
