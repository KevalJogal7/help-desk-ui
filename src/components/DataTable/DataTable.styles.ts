import { styled } from '@mui/material/styles'
import { TableCell, TableContainer, TableRow } from '@mui/material'

export const ScrollableTableContainer = styled(TableContainer)({
  flex: 1,
  overflowY: 'auto',
  overflowX: 'auto',
  minHeight: 0,
  borderRadius: '12px 12px 0 0',
})

export const PaginationBar = styled('div')(({ theme }) => ({
  flexShrink: 0,
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  padding: '4px 8px',
  borderTop: `1px solid ${theme.palette.custom.border}`,
  backgroundColor: theme.palette.custom.paginationBg,
  position: 'sticky',
  bottom: 0,
  zIndex: 2,
  borderRadius: '0 0 12px 12px',
}))

export const StickyCell = styled(TableCell)(({ theme }) => ({
  position: 'sticky !important' as any,
  right: 0,
  zIndex: 1,
  backgroundColor: theme.palette.custom.stickyBg,
  boxShadow: '-2px 0 6px rgba(0,0,0,0.06)',
  'thead &': {
    zIndex: 3,
  },
}))

export const DisabledTableRow = styled(TableRow)(({ theme }) => ({
  opacity: 0.45,
  pointerEvents: 'none',
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255,255,255,0.03)'
      : 'rgba(0,0,0,0.03)',
  '& td': {
    color: theme.palette.custom.mutedText,
  },
}))
