import { styled } from '@mui/material/styles'
import { Box, Button, Grid } from '@mui/material'

export const LeftPanel = styled(Grid)({
    display: 'none',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: 48,
    position: 'relative',
    overflow: 'hidden',
    '@media (min-width: 900px)': {
        display: 'flex',
    },
})

export const LogoBox = styled(Box)({
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 32px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.3)',
})

export const FeaturesDot = styled(Box)({
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.9)',
    flexShrink: 0,
})

export const RightPanel = styled(Grid)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    '@media (min-width: 600px)': {
        padding: 48,
    },
})

export const GradientButton = styled(Button)({
    marginTop: '8px !important',
    textTransform: 'none',
    fontWeight: 600,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    '&:hover': {
        background: 'linear-gradient(135deg, #5a6fd6 0%, #6a3f94 100%)',
    },
})
