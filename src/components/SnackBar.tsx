import React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackBar = ({openSnackbar, setOpenSnackbar, message}: {openSnackbar: boolean, setOpenSnackbar: Function, message: string}) => {
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Stack spacing={2} sx={{width: '100%'}}>
      <Snackbar open={openSnackbar}
        autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default SnackBar;
