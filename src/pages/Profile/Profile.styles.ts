import { styled } from '@mui/material/styles'
import { Avatar, Paper } from '@mui/material'

export const ProfileRoot = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
})

export const ProfileHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 20,
  padding: 28,
  borderRadius: 12,
  backgroundColor: theme.palette.custom.cardBg,
  boxShadow: theme.palette.custom.cardShadow,
}))

export const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 72,
  height: 72,
  fontSize: '1.75rem',
  fontWeight: 700,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  flexShrink: 0,
}))

export const ProfileHeaderInfo = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
})

export const CardsRow = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: 24,
  '@media (max-width: 900px)': {
    gridTemplateColumns: '1fr',
  },
})

export const ProfileCard = styled(Paper)(({ theme }) => ({
  padding: 28,
  borderRadius: 12,
  boxShadow: theme.palette.custom.cardShadow,
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
}))

export const CardTitle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  paddingBottom: 16,
  borderBottom: `1px solid ${theme.palette.custom.border}`,
}))
