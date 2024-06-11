import {tokens } from "../theme";
import { useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Typography, Box, useTheme } from "@mui/material";

const CustomSnackbar = ({ title, message, openBar, severity }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
    // console.log(theme);
    // console.log(colors);
    const [open, setOpen] = useState(openBar);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
  return (
    <Box>
       <Snackbar 
            open={open} 
            autoHideDuration={5000} 
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            onClose={handleClose}>
            <Alert
                onClose={handleClose}
                severity={severity}
                variant="outlined"
                sx={{ width: '100%', bgcolor: colors.blueAccent[900] }}
                >
            <AlertTitle> { title }</AlertTitle>
            <Typography variant="h5" color={colors.grey[300]}>
                {message}
            </Typography>
            </Alert>
        </Snackbar> 
    </Box>
  );
};

export default CustomSnackbar;
