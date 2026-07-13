import { styled } from '@mui/material/styles'

interface ChipRootProps {
    chipsize?: 'sm' | 'md' | 'lg'
}

export const ChipRoot = styled('span')<ChipRootProps>(({ chipsize = 'md' }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    borderRadius: 999,
    fontWeight: 600,
    whiteSpace: 'nowrap',
    lineHeight: 1.5,
    ...(chipsize === 'sm' && { padding: '2px 8px', fontSize: '0.7rem' }),
    ...(chipsize === 'md' && { padding: '3px 10px', fontSize: '0.75rem' }),
    ...(chipsize === 'lg' && { padding: '5px 14px', fontSize: '0.825rem' }),
}))

export const ChipDot = styled('span')({
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: 'currentColor',
    opacity: 0.8,
    flexShrink: 0,
})
