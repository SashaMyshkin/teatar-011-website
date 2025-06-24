'use client';
import React from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';

type AutoCloseAlertProps = {
  open: boolean;
  onClose: () => void;
  message: string;
  severity?: AlertColor;
  autoHideDuration?: number;
  position?: {
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  };
};

export function AutoCloseAlert({
  open,
  onClose,
  message,
  severity = 'info',
  autoHideDuration = 4000,
  position = { vertical: 'top', horizontal: 'center' },
}: AutoCloseAlertProps) {
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') return;
    onClose();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={position}
      sx={{zIndex:80000}}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
