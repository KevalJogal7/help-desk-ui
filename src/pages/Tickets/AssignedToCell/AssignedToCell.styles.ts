import { styled } from '@mui/material/styles'

export const AssignedRoot = styled('div')<{ isHovered: boolean }>(({ theme, isHovered }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
  padding: '3px 8px',
  borderRadius: 6,
  cursor: 'pointer',
  transition: 'background-color 0.15s ease, border-color 0.15s ease',
  border: `1px solid ${isHovered ? theme.palette.primary.main : 'transparent'}`,
  backgroundColor: isHovered
    ? theme.palette.mode === 'dark'
      ? 'rgba(76, 53, 181, 0.12)'
      : 'rgba(76, 53, 181, 0.06)'
    : 'transparent',
  whiteSpace: 'nowrap',
  userSelect: 'none',
}))

export const AssignedLabel = styled('span')<{ isUnassigned: boolean }>(({ theme, isUnassigned }) => ({
  fontSize: '0.875rem',
  color: isUnassigned ? theme.palette.custom.mutedText : theme.palette.custom.valueText,
  fontStyle: isUnassigned ? 'italic' : 'normal',
}))
