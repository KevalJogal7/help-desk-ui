import { styled } from '@mui/material/styles'
import { TableCell, TableContainer } from '@mui/material'

export const ScrollableTableContainer = styled(TableContainer)({
    flex: 1,
    overflowY: 'auto',
    overflowX: 'auto',
    minHeight: 0,
    borderRadius: '12px 12px 0 0',
})

export const PaginationBar = styled('div')({
    flexShrink: 0,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '4px 8px',
    borderTop: '1px solid #f0f0f0',
    backgroundColor: '#fff',
    position: 'sticky',
    bottom: 0,
    zIndex: 2,
    borderRadius: '0 0 12px 12px',
})

export const StickyCell = styled(TableCell)({
    position: 'sticky !important' as any,
    right: 0,
    zIndex: 1,
    backgroundColor: '#fff',
    boxShadow: '-2px 0 6px rgba(0,0,0,0.06)',
    'thead &': {
        zIndex: 3,
    },
})
