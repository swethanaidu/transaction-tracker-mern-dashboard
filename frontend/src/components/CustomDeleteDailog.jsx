import { styled } from "@mui/material/styles";
import { tokens } from "../theme";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Typography, useTheme, IconButton, Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import EditForm from "../scenes/team/EditForm";
import { useGetUserDetailsQuery } from "../slices/userApiSlice";
import Loader from "./Loader";

const CustomDeleteDailog = ({ open, handleDeleteClose, id, message, handleDelete }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
    const BootstrapDialog = styled(Dialog)(() => ({
      "& .MuiPaper-root": {
        background: colors.primary[400],
      },
      "& .MuiDialogContent-root": {
        background: colors.primary[400],
        padding: 0,
      },
      "& .MuiDialogContent-root .MuiBox-root" : {
        margin:0,
      },
      "& .MuiDialogActions-root": {
        padding: "10px",
        background: colors.primary[400],
      },
      }));
      
  return (
    <>
        <BootstrapDialog
        onClose={handleDeleteClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
        maxWidth="xs"
      >
        
        <IconButton
          aria-label="close"
          onClick={handleDeleteClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
        <Box backgroundColor={colors.primary[400]} borderRadius="8px" p="30px 20px 20px"  mt="40px" >
        <Typography variant="h4" color={colors.grey[300]}>
                {message}
            </Typography>
           
          </Box>
           
        </DialogContent>
        <DialogActions>
          <Button autoFocus variant="outlined" color="error" onClick={handleDelete}>
            Delete
          </Button>
          <Button autoFocus variant="outlined" color="secondary" onClick={handleDeleteClose}>
           cancel
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  )
}

export default CustomDeleteDailog