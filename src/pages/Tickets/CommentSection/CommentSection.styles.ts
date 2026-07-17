import { styled } from '@mui/material/styles'
import { Avatar, Box, IconButton, Paper, Typography } from '@mui/material'

export const CommentSectionRoot = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 32,
  borderRadius: 12,
  backgroundColor: theme.palette.custom.cardBg,
  boxShadow: theme.palette.custom.cardShadow,
  height: 480,
  minHeight: 0,
}))

export const CommentSectionTitle = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  flexShrink: 0,
  marginBottom: 16,
})

export const SectionTitle = styled(Typography)({
  fontWeight: 700,
}) as typeof Typography

export const CommentCount = styled(Typography)(({ theme }) => ({
  marginLeft: 6,
  color: theme.palette.text.secondary,
  fontWeight: 400,
})) as typeof Typography

export const CommentList = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  flex: 1,
  overflowY: 'auto',
  minHeight: 0,
  paddingRight: 4,
})

export const CommentRow = styled('div')<{ isOwner: 'true' | 'false' }>(({ isOwner }) => ({
  display: 'flex',
  flexDirection: isOwner === 'true' ? 'row-reverse' : 'row',
  alignItems: 'flex-start',
  gap: 8,
}))

export const CommentBubble = styled(Paper)<{ isOwner: 'true' | 'false' }>(
  ({ theme, isOwner }) => ({
    padding: '12px 16px',
    borderRadius: 12,
    backgroundColor:
      isOwner === 'true'
        ? theme.palette.mode === 'dark'
          ? 'rgba(76, 53, 181, 0.18)'
          : 'rgba(76, 53, 181, 0.07)'
        : theme.palette.mode === 'dark'
        ? theme.palette.background.default
        : '#f4f5f7',
    boxShadow: 'none',
    border: `1px solid ${
      isOwner === 'true'
        ? theme.palette.mode === 'dark'
          ? 'rgba(76, 53, 181, 0.35)'
          : 'rgba(76, 53, 181, 0.18)'
        : theme.palette.custom.border
    }`,
    alignSelf: isOwner === 'true' ? 'flex-end' : 'flex-start',
    maxWidth: '50%',
    wordBreak: 'break-word',
  })
)

export const CommentMeta = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 4,
  gap: 8,
})

export const CommentMetaRight = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 2,
})

export const CommentAuthor = styled('span')(({ theme }) => ({
  fontSize: '0.8rem',
  fontWeight: 700,
  color: theme.palette.primary.main,
}))

export const CommentTime = styled('span')(({ theme }) => ({
  fontSize: '0.72rem',
  color: theme.palette.custom.mutedText,
  whiteSpace: 'nowrap',
}))

export const CommentText = styled('span')<{ isDeleted: 'true' | 'false' }>(({ theme, isDeleted }) => ({
  fontSize: '0.875rem',
  color: isDeleted === 'true' ? theme.palette.custom.mutedText : theme.palette.custom.valueText,
  fontStyle: isDeleted === 'true' ? 'italic' : 'normal',
  lineHeight: 1.6,
  whiteSpace: 'pre-wrap',
}))

export const CommentAvatar = styled(Avatar)<{ isOwner: 'true' | 'false' }>(({ theme, isOwner }) => ({
  width: 32,
  height: 32,
  fontSize: '0.7rem',
  fontWeight: 700,
  flexShrink: 0,
  backgroundColor: isOwner === 'true' ? theme.palette.primary.main : theme.palette.action.selected,
  color: isOwner === 'true' ? theme.palette.primary.contrastText : theme.palette.text.primary,
}))

export const SenderAvatar = styled(Avatar)(({ theme }) => ({
  width: 32,
  height: 32,
  fontSize: '0.7rem',
  fontWeight: 700,
  flexShrink: 0,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}))

export const DeleteButton = styled(IconButton)(({ theme }) => ({
  marginLeft: 2,
  padding: 2,
  color: theme.palette.text.disabled,
  '&:hover': {
    color: theme.palette.error.main,
  },
}))

export const SendButton = styled(IconButton)(({ theme }) => ({
  width: 36,
  height: 36,
  flexShrink: 0,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  '&.Mui-disabled': {
    backgroundColor: theme.palette.action.disabledBackground,
  },
}))

export const CommentInputRow = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: 10,
  alignItems: 'flex-end',
  borderTop: `1px solid ${theme.palette.custom.border}`,
  paddingTop: 16,
  marginTop: 'auto',
  flexShrink: 0,
}))

export const EmptyComments = styled('div')(({ theme }) => ({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.custom.mutedText,
  fontSize: '0.875rem',
}))
