import { Box, Typography, useTheme, IconButton, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useState } from "react";
import Loader from "../../components/Loader";
import Chip from '@mui/material/Chip';
import ListIcon from '@mui/icons-material/List';
import LoopIcon from '@mui/icons-material/Loop';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Moment from 'moment';
import CustomDailogForm from "./CustomDailogForm";
import GradingIcon from '@mui/icons-material/Grading';
import Grading from "@mui/icons-material/Grading";
import NotInterestedOutlinedIcon from '@mui/icons-material/NotInterestedOutlined';
import CustomDeleteDailog from "../../components/CustomDeleteDailog";
import { useGetTransactionsQuery } from "../../slices/transactionApiSlice";
import { useDeleteTransactionMutation } from "../../slices/transactionApiSlice";
import AddIcon from '@mui/icons-material/Add';
import { useGetUsersQuery } from "../../slices/userApiSlice";
import { useGetECsQuery } from "../../slices/expCategoryApiSlice";

const DataList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data: transactionsList, refetch, isLoading, error } = useGetTransactionsQuery();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [transactionData, setTransactionData] = useState([])
  const [name, setname] = useState("");
  const [id, setID] = useState("");
  const [deleteTransaction] = useDeleteTransactionMutation(id);


  const { data: ecList } = useGetECsQuery();
  const { data: usersList } = useGetUsersQuery();

  const handleClickOpen = (data) => {
    setTitle(data? "Edit Expenses Category Detials" : "Add New Expenses Category Detials")
    setOpen(true);
    setTransactionData(data);
  };
  const handleClose = () => {
    setOpen(false);
    // setID("");
  };

  const handleDeleteClickOpen = (row) => {
    setTitle(`Are you sure you want to delete ${row.title}?`)
    setOpenDelete(true);
    setID(row._id);
    setname(row.name);
  };

  const handleDelete = async (id) => {
    let res = null;
    try {
      res = await deleteTransaction(id).unwrap();
      handleDeleteClose();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
    // setID("");
  };

  
  const columns = [
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    // {
    //   field: "description",
    //   headerName: "Description",
    //   flex: 1,
    // },
    {
      field: "userName",
      headerName: "Payment by",
      flex: 1,
    },
    {
      field: "ecName",
      headerName: "Category",
      flex: 1,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
    },
    {
      field: "paidDate",
      headerName: "Date",
      flex: 1,
      renderCell: ({ row: { startDate } }) => {
        return ( Moment(startDate).format('DD-MM-YYYY') );
      },
    },
    
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: ({ row: { status } }) => {
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
              label={status}
              color={
                status === "Completed"
                  ? "success"
                  : status === "Pending"
                  ? "warning"
                  : status === "Canceled"
                  ?  "error" : "info"
              }
               
              icon={
                status === "Completed" ? (
                  <TaskAltIcon  />
                ) : status === "Pending" ? (
                  <LoopIcon />
                ) : status === "Canceled" ? (
                  <NotInterestedOutlinedIcon /> ) : (<ListIcon />
                )
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
          <Box    m="5px 0" display="flex" justifyContent="start">
           
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
              <Typography variant="h4" color={colors.grey[100]} sx={{ mb: "20px" }}>
                Transactions List
              </Typography>
              <Button
                    fullWidth
                    type="button"
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleClickOpen(null)}
                    sx={{
                        m: "0 0 10px",
                      p: "10px",
                      //   backgroundColor: colors.greenAccent[700],
                      //   color: colors.grey[100],
                      //   "&:hover": { color: colors.primary.main },
                      width: "150px",
                    }}
                  >
                    <AddIcon /> Add New
                  </Button>
            </Box>
    
      <Box
        m=" 0 0 0"
        height="100%"
        minHeight="200px"
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
         
        {/* <Typography variant="h4" color={colors.grey[100]} sx={{ mb: "20px", fontWeight: "bold" }}>
            Expenses Categories List
        </Typography> */}
        <DataGrid  hideFooter={true} getRowId={(row) => row._id}  rows={transactionsList} columns={columns} />
        <CustomDailogForm
          open={open}
          transactionData={transactionData}
          handleClose={handleClose}
          isLoading={isLoading}
          title={title}
          usersList={usersList}
          ecList={ecList}
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

export default DataList;