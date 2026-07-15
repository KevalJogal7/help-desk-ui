import { useState } from 'react'
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'

export interface ConfirmationDialogProps {
  open: boolean
  title?: string
  message?: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: 'error' | 'warning' | 'primary'
  onConfirm: () => Promise<void> | void
  onCancel: () => void
}

const ConfirmationDialog = ({
  open,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'error',
  onConfirm,
  onCancel,
}: ConfirmationDialogProps) => {

  const handleConfirm = async () => {
    await onConfirm();
  }

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
      role="alertdialog"
      slotProps={{ paper: { sx: { borderRadius: 3, minWidth: 360, p: 1 } } }}
    >
      <DialogTitle
        id="confirm-dialog-title"
        sx={{ display: 'flex', alignItems: 'center', gap: 1.5, fontWeight: 700, pb: 1 }}
      >
        <WarningAmberRoundedIcon color={variant} fontSize="medium" />
        {title}
      </DialogTitle>

      <DialogContent sx={{ pb: 1 }}>
        <DialogContentText id="confirm-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        <Button
          variant="outlined"
          onClick={onCancel}
          sx={{ textTransform: 'none', fontWeight: 600 }}
        >
          {cancelLabel}
        </Button>
        <Button
          variant="contained"
          color={variant}
          onClick={handleConfirm}
          sx={{ textTransform: 'none', fontWeight: 600, minWidth: 100 }}
        >
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationDialog
