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

export const SearchBox = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#fff',
    border: '1px solid #c1c7d0',
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
})

export const SearchIconWrap = styled('span')({
    flexShrink: 0,
    display: 'flex',
    color: '#8993a4',
})

export const ToolbarRight = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginLeft: 'auto',
})

export const TableWrapper = styled('div')({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: 12,
    boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
    overflow: 'hidden',
    minHeight: 0,
})
