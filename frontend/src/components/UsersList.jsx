import { Box, Typography, useTheme, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { tokens } from "../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { useGetUsersQuery } from "../slices/userApiSlice";
import Loader from "../components/Loader";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CustomDailogUserForm from "./CustomDailogUserForm";
import CustomDeleteDailog from "./CustomDeleteDailog";
import { useDeleteUserMutation } from "../slices/userApiSlice";
import AvatarNames from "./AvatarNames";
import Chip from '@mui/material/Chip';

const UsersList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data: users, refetch, isLoading, error } = useGetUsersQuery({}, { refetchOnMountOrArgChange: true });
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [id, setID] = useState("");
  const [name, setname] = useState("");
  const [title, setTitle] = useState("");
  const [deleteUser, { isLoading: userLoading }] = useDeleteUserMutation(id);
  const handleClickOpen = (_id) => {
    setTitle("Edit User Detials");
    setOpen(true);
    setID(_id);
  };
  const handleClose = () => {
    setOpen(false);
    // setID("");
  };

  const handleDeleteClickOpen = (_id, name) => {
    setTitle(`Are you sure you want to delete ${name}?`);
    setOpenDelete(true);
    setID(_id);
    setname(name);
  };

  const handleDelete = async (id) => {
    let res = null;
    try {
      res = await deleteUser(id).unwrap();
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
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: ({ row: row }) => {
        return (
          <Box m="5px 0"  display="flex" justifyContent="start" alignItems="center"  >
             <AvatarNames  name={row.name} /> <Typography sx={{ marginLeft: "10px"}}> {row.name}</Typography>
          </Box>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
    },
    {
      field: "occupation",
      headerName: "Occupation",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { role } }) => {
        return (
          <Box
            
          >
            <Chip 
              sx={{
                backgroundColor: 
                  role === "admin"
                ? colors.greenAccent[800]
                : role === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[600],
                width: "90px"
            
              }}
              icon={
                role === "admin" ? (
                  <AdminPanelSettingsOutlinedIcon />
                ) : role === "manager" ? (
                  <SecurityOutlinedIcon />
                )  : (<LockOpenOutlinedIcon />
                )
              }
              
            label={role}/>

           
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
          <Box m="5px 0"  display="flex" justifyContent="start">
            <IconButton
              type="button"
              onClick={() => handleClickOpen(_id)}
              sx={{ p: 1 }}
              // color="info"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              type="button"
              sx={{ p: 1 }}
              onClick={() => handleDeleteClickOpen(_id, name)}
              // color="error"
            >
              <DeleteOutlineOutlinedIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  useEffect(() => {
    refetch();
  }, [users]);

  if (isLoading) return <Loader />;

  return (
    <Box
      m="0 0 0"
      height="100%"
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
        },
        "& .name-column--cell": {
          color: colors.grey[100],
          fontWeight: 700,
        },
        "& .MuiDataGrid-withBorderColor": {
          backgroundColor: colors.blueAccent[700],
          borderBottom: "none",
        },
        // "& .MuiDataGrid-columnHeaders": {
        //   backgroundColor: colors.blueAccent[200],
        //   borderBottom: "none",
        // },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: colors.primary[400],
        },
        // "& .MuiDataGrid-footerContainer": {
        //   borderTop: "none",
        //   backgroundColor: colors.blueAccent[700],
        // },
        "& .MuiCheckbox-root": {
          color: `${colors.greenAccent[200]} !important`,
        },
      }}
    >
      <DataGrid hideFooter={true} getRowId={(row) => row._id} rows={users} columns={columns} />

      <CustomDailogUserForm
        open={open}
        id={id}
        handleClose={handleClose}
        title={title}
      />
      <CustomDeleteDailog
        open={openDelete}
        id={id}
        handleDeleteClose={handleDeleteClose}
        handleDelete={() => handleDelete(id)}
        message={title}
      />
    </Box>
  );
};

export default UsersList;
