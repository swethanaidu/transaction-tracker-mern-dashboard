import { styled } from "@mui/material/styles";
import { tokens } from "../theme";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Typography, useTheme, IconButton, Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Form from "./Form";
import { useGetUserDetailsQuery } from "../slices/userApiSlice";
import Loader from "./Loader";

const CustomDailogUserForm = ({ open, handleClose, id, title }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {
    data: ecInfo,
    refetch,
    isLoading,
    error,
  } = useGetUserDetailsQuery(id);
  // console.log(ecInfo);
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
  if (isLoading) return <Loader />;
  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle sx={{ m: 0, p: 2, }} variant="h3" id="customized-dialog-title">
          <Typography fontSize="20px" color={colors.grey[300]}>
            {title}
          </Typography>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: colors.grey[100],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {isLoading ? <Loader /> : 

          (ecInfo &&   <Form ecInfo={ecInfo} handleClose={handleClose}/>   )
          }
        </DialogContent>
        {/* <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions> */}
      </BootstrapDialog>
    </>
  );
};

export default CustomDailogUserForm;
