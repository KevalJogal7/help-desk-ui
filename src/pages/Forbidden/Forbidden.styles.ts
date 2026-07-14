import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'

export const ForbiddenRoot = styled('div')(({ theme }) => ({
  minHeight: '100svh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: theme.palette.custom.forbiddenBg,
  padding: 24,
}))

export const ForbiddenCard = styled('div')(({ theme }) => ({
  textAlign: 'center',
  maxWidth: 460,
  width: '100%',
  padding: '56px 40px',
  borderRadius: 20,
  backgroundColor: theme.palette.custom.forbiddenCardBg,
  boxShadow: theme.palette.custom.cardShadow,
}))

export const IconWrapper = styled(Box)({
  width: 96,
  height: 96,
  borderRadius: '50%',
  background: 'linear-gradient(135deg, #ff6b6b22 0%, #ee000022 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 32px',
})

export const ActionsRow = styled('div')({
  display: 'flex',
  gap: 12,
  justifyContent: 'center',
  flexWrap: 'wrap',
  marginTop: 40,
})
