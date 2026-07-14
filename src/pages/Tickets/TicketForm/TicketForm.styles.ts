import { styled } from '@mui/material/styles'
import { Box, Paper } from '@mui/material'

export const PageRoot = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
})

export const PageHeader = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
})

export const HeaderLeft = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
})

export const FormCard = styled(Paper)(({ theme }) => ({
  padding: 32,
  borderRadius: 12,
  boxShadow: theme.palette.custom.cardShadow,
}))

export const FormGrid = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: 24,
  '@media (max-width: 600px)': {
    gridTemplateColumns: '1fr',
  },
})

export const FullWidth = styled('div')({
  gridColumn: '1 / -1',
})

export const FormActions = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 12,
  marginTop: 32,
  paddingTop: 24,
  borderTop: `1px solid ${theme.palette.custom.border}`,
}))

export const FieldWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
})

export const FieldLabel = styled('label')(({ theme }) => ({
  fontSize: '0.8125rem',
  fontWeight: 600,
  color: theme.palette.custom.labelText,
}))

export const ErrorText = styled('span')(({ theme }) => ({
  fontSize: '0.75rem',
  color: theme.palette.custom.errorText,
  marginTop: 2,
}))

// ── View screen ───────────────────────────────────────────────────────────────

export const ViewGrid = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: 24,
  '@media (max-width: 600px)': {
    gridTemplateColumns: '1fr',
  },
})

export const ViewField = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
})

export const ViewLabel = styled('span')(({ theme }) => ({
  fontSize: '0.75rem',
  fontWeight: 600,
  color: theme.palette.custom.mutedText,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
}))

export const ViewValue = styled('span')(({ theme }) => ({
  fontSize: '0.9375rem',
  color: theme.palette.custom.valueText,
  lineHeight: 1.6,
}))

export const Divider = styled('div')(({ theme }) => ({
  gridColumn: '1 / -1',
  height: 1,
  backgroundColor: theme.palette.custom.border,
  margin: '8px 0',
}))
