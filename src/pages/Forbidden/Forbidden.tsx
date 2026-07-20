import { Button, Typography } from '@mui/material'
import { LockPerson, ArrowBack } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../routes/routeConstants'
import { ActionsRow, ForbiddenCard, ForbiddenRoot, IconWrapper } from './Forbidden.styles'

const Forbidden = () => {
  const navigate = useNavigate()

  const handleGoBack = () => {
    if (window.history.length > 1) navigate(-1)
    else navigate(ROUTES.TICKETS)
  }

  return (
    <ForbiddenRoot>
      <ForbiddenCard>
        <IconWrapper>
          <LockPerson sx={{ fontSize: 48, color: 'error.main' }} />
        </IconWrapper>

        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Access Denied
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
          You don't have permission to view this page.
          Contact your administrator if you think this is a mistake.
        </Typography>

        <ActionsRow>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={handleGoBack}
            sx={{ textTransform: 'none', fontWeight: 600 }}
          >
            Go back
          </Button>
        </ActionsRow>
      </ForbiddenCard>
    </ForbiddenRoot>
  )
}

export default Forbidden
