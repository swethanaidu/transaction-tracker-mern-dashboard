import { useState } from "react";
import { tokens } from "../../theme"
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Typography, useTheme, IconButton, Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Form from "./Form";
import Loader from "../../components/Loader";
import {  useSelector } from "react-redux";

const CustomDailogForm = ({ open, handleClose, debtData, title , isLoading, usersList, ecList, vendorsList, bankList}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { userInfo } = useSelector((state) => state.auth);
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

          ( <Form debtInfo={debtData} handleClose={handleClose} loggedUSer={userInfo} usersList={usersList}
            ecList={ecList} vendorsList={vendorsList}  />   )
          }
        </DialogContent>
      </BootstrapDialog>
    </>
  );
};

export default CustomDailogForm;
