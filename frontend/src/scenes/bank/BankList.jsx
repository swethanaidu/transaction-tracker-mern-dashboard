import { Box, Typography, useTheme, IconButton, Button , ListItemText, ListItem, List, useMediaQuery} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useState } from "react";
import Loader from "../../components/Loader";
import Chip from '@mui/material/Chip';
import LoopIcon from '@mui/icons-material/Loop';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CustomDailogForm from "./CustomDailogForm";
import CustomDeleteDailog from "../../components/CustomDeleteDailog";
import AddIcon from '@mui/icons-material/Add';
import { useGetBanksQuery } from "../../slices/bankApiSlice";
import { useGetUsersQuery } from "../../slices/userApiSlice";
import { useDeleteBankMutation } from "../../slices/bankApiSlice";
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';

const BankList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data: bankList, refetch, isLoading, error } = useGetBanksQuery();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  // console.log(bankList);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [bankData, setbankData] = useState([])
  const [name, setname] = useState("");
  const [id, setID] = useState("");
  const [deleteEC] = useDeleteBankMutation(id);
  const { data: usersList } = useGetUsersQuery();
  const handleClickOpen = (data) => {
    setTitle(data? "Edit Bank Detials" : "Add New Bank Detials")
    setOpen(true);
    setbankData(data);
    // console.log(data);
  };
  const handleClose = () => {
    setOpen(false);
    // setID("");
  };

  const handleDeleteClickOpen = (row) => {
    setTitle(`Are you sure you want to delete ${row.name}?`)
    setOpenDelete(true);
    setID(row._id);
    setname(row.name);
  };

  const handleDelete = async (id) => {
    let res = null;
    try {
      res = await deleteEC(id).unwrap();
      handleDeleteClose();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
    // setID("");
  };

  const mobileColumns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: ({ row: { name, userName } }) => {
        return(
          <List dense={true} sx={{ mt: "0", p:"0", 
            "& li ": {
              padding:"0"
            }
          }}>
            <ListItem>
              <ListItemText
                primary={name}
                secondary={userName}
              />
            </ListItem>,
        </List>
        );
      },
    },
    {
      field: "accountNumber",
      headerName: "accountNumber",
      flex: 1,
      renderCell: ({ row: { accountType, accountNumber } }) => {
        return(
          <List dense={true} sx={{ mt: "0", p:"0", 
            "& li ": {
              padding:"0"
            }
          }}>
            <ListItem>
              <ListItemText
                primary={accountType}
                secondary={accountNumber}
              />
            </ListItem>,
        </List>
        );
      },
    },
     
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      renderCell: ({ row: { amount } }) => {
        return (new Intl.NumberFormat('en-IN', { style: "currency", currency: "INR" }).format(amount) );
      },
    },
    // {
    //   field: "bankStatus",
    //   headerName: "Status",
    //   flex: 1,
    //   renderCell: ({ row: { bankStatus } }) => {
    //     return (
    //       <Box
            
    //         m="5px 0"
    //         p="5px"
    //         display="flex"
    //         justifyContent="start"
    //         borderRadius="4px"
    //       >
    //        { bankStatus === "Inactive" ? 
    //         <LoopIcon color="error" /> : <TaskAltIcon color="success" />}

             
    //       </Box>
    //     );
    //   },
    // },
    {
      field: "_id",
      headerName: "Actions",
      flex: 1,
      renderCell: ({ row: row }) => {
        return (
          <Box   m="5px 0" display="flex" justifyContent="start">
           
            <IconButton
              type="button"
              onClick={() => handleClickOpen(row)}
              // sx={{ p: 1 }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              type="button"
              // sx={{ p: 1 }}
              onClick={() => handleDeleteClickOpen(row)}
            >
              <DeleteOutlineOutlinedIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ]; 
  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "accountNumber",
      headerName: "accountNumber",
      flex: 1,
    },
    {
      field: "accountType",
      headerName: "accountType",
      flex: 1,
    },
    {
      field: "userName",
      headerName: "User",
      flex: 1,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      renderCell: ({ row: { amount } }) => {
        return (new Intl.NumberFormat('en-IN', { style: "currency", currency: "INR" }).format(amount) );
      },
    },
    {
      field: "bankStatus",
      headerName: "Status",
      flex: 1,
      renderCell: ({ row: { bankStatus } }) => {
        return (
          <Box
            width="120px"
            m="5px 0"
            p="5px"
            display="flex"
            justifyContent="start"
            borderRadius="4px"
          >
            
            <Chip
              variant="outlined"
              label={bankStatus}
              color={
                bankStatus === "Inactive"
                  ? "error" : "success"
              }
               
              icon={
                bankStatus === "Inactive" ? 
                  <LoopIcon /> : <TaskAltIcon />
              }
            />
          </Box>
        );
      },
    },
    {
      field: "_id",
      headerName: "Actions",
      flex: 1,
      renderCell: ({ row: row }) => {
        return (
          <Box   m="5px 0" display="flex" justifyContent="start">
           
            <IconButton
              type="button"
              onClick={() => handleClickOpen(row)}
              // sx={{ p: 1 }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              type="button"
              // sx={{ p: 1 }}
              onClick={() => handleDeleteClickOpen(row)}
            >
              <DeleteOutlineOutlinedIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];
  if(isLoading) return (<Loader />)
  return (
     <>
     <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography variant={isNonMobile? "h4": "h6"} mb={isNonMobile?"20px": "10px"} sx={{ display:"flex", alignItems:"center"}}><AccountBalanceOutlinedIcon sx={{mr: "10px"}} />Bank List</Typography>
              <Button
                    fullWidth
                    type="button"
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleClickOpen(null)}
                    size={isNonMobile? "medium": "small"}
                    sx={{
                        m: "0 0 10px",
                        p:  isNonMobile? "10px" : "5px",
                        width: isNonMobile? "150px" : "100px",
                    }}
                  >
                    <AddIcon /> Add New
                  </Button>
            </Box>
    
      <Box
        m=" 0 0 0"
        height="100%"
        
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[500],
          },
          "& .MuiDataGrid-withBorderColor": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[200],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
         
        <DataGrid hideFooter={true} getRowId={(row) => row._id}  rows={bankList} columns={isNonMobile? columns: mobileColumns} />
        <CustomDailogForm
          open={open}
          bankData={bankData}
          handleClose={handleClose}
          isLoading={isLoading}
          title={title}
          usersList={usersList}
        />
        <CustomDeleteDailog
          open={openDelete}
          id={id}
          handleDeleteClose={handleDeleteClose}
          handleDelete={() => handleDelete(id)}
          message={title}
        />
  
      </Box>
      </>
  );
};

export default BankList;