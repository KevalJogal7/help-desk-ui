import { styled } from '@mui/material/styles'

export const TicketsPage = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  minHeight: 0,
})

export const TicketsHeader = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 12,
  flexShrink: 0,
})

export const TicketsToolbar = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  marginBottom: 16,
  flexShrink: 0,
  flexWrap: 'wrap',
})

export const SearchBox = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  backgroundColor: theme.palette.custom.searchBg,
  border: `1px solid ${theme.palette.custom.borderInput}`,
  borderRadius: 8,
  padding: '6px 12px',
  flex: 1,
  minWidth: 200,
  maxWidth: 320,
  '& input': {
    border: 'none',
    outline: 'none',
    background: 'transparent',
    fontSize: '0.875rem',
    width: '100%',
    color: 'inherit',
  },
}))

export const SearchIconWrap = styled('span')(({ theme }) => ({
  flexShrink: 0,
  display: 'flex',
  color: theme.palette.custom.searchIcon,
}))

export const ToolbarRight = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  marginLeft: 'auto',
})

export const TableWrapper = styled('div')(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.custom.cardBg,
  borderRadius: 12,
  boxShadow: theme.palette.custom.cardShadow,
  overflow: 'hidden',
  minHeight: 0,
}))
