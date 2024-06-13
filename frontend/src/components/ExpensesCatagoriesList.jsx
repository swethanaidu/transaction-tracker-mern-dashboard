import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { useGetECsQuery } from "../slices/expCategoryApiSlice";
import Loader from "../components/Loader";

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
      headerName: "Expected Budget",
      flex: 1,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      flex: 1,
    },
    {
      field: "endDate",
      headerName: "End Date",
      flex: 1,
    },
    {
      field: "workStatus",
      headerName: "Progress Level",
      flex: 1,
      renderCell: ({ row: { workStatus } }) => {
        return (
          <Box
            width="100px"
            m="10px 0"
            p="5px"
            display="flex"
            justifyContent="start"
            backgroundColor={
                workStatus === "To Do"
                ? colors.greenAccent[600]
                : workStatus === "In progress"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {workStatus === "To Do" && <AdminPanelSettingsOutlinedIcon />}
            {workStatus === "In progress" && <SecurityOutlinedIcon />}
            {workStatus === "Completed" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {workStatus}
            </Typography>
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