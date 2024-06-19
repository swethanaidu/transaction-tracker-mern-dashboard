import { Box, Typography, useTheme, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
 
import { useGetECsQuery } from "../../slices/expCategoryApiSlice";
import Loader from "../../components/Loader";
import Chip from '@mui/material/Chip';
import ListIcon from '@mui/icons-material/List';
import LoopIcon from '@mui/icons-material/Loop';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Moment from 'moment';

const ExpensesCategoriesList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data: ecList, refetch, isLoading, error } = useGetECsQuery();
  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "expectedBudget",
      headerName: "Planned Budget",
      flex: 1,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      flex: 1,
      renderCell: ({ row: { startDate } }) => {
        return ( Moment(startDate).format('DD-MM-YYYY') );
      },
    },
    // {
    //   field: "endDate",
    //   headerName: "End Date",
    //   flex: 1,
    // },
    {
      field: "workStatus",
      headerName: "Progress Level",
      flex: 1,
      renderCell: ({ row: { workStatus } }) => {
        return (
          <Box
            width="100px"
            m="5px 0"
            p="5px"
            display="flex"
            justifyContent="start"
            borderRadius="4px"
          >
            
            <Chip
              variant="outlined"
              label={workStatus}
              color={
                workStatus === "To do"
                  ? "info"
                  : workStatus === "In progress"
                  ? "warning"
                  : "success"
              }
               
              icon={
                workStatus === "To do" ? (
                  <ListIcon />
                ) : workStatus === "In progress" ? (
                  <LoopIcon />
                ) : (
                  <TaskAltIcon />
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
      renderCell: ({ row: { _id } }) => {
        return (
          <Box   display="flex" justifyContent="start">
            <IconButton
              type="button"
              onClick={() => {}}
              sx={{ p: 1 }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              type="button"
              sx={{ p: 1 }}
              onClick={() => {}}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];
  if(isLoading) return (<Loader />)
  return (
     
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
        {/* <Typography variant="h4" color={colors.grey[100]} sx={{ mb: "20px", fontWeight: "bold" }}>
            Expenses Categories List
        </Typography> */}
        <DataGrid getRowId={(row) => row._id}  rows={ecList} columns={columns} />
      </Box>
     
  );
};

export default ExpensesCategoriesList;