import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'

export const ForbiddenRoot = styled('div')({
    minHeight: '100svh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%)',
    padding: 24,
})

export const ForbiddenCard = styled('div')({
    textAlign: 'center',
    maxWidth: 460,
    width: '100%',
    padding: '56px 40px',
    borderRadius: 20,
    backgroundColor: '#fff',
    boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
})

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
