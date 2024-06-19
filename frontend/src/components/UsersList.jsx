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
import DeleteIcon from "@mui/icons-material/Delete";
import CustomDailogUserForm from "./CustomDailogUserForm";
import CustomDeleteDailog from "./CustomDeleteDailog";
import { useDeleteUserMutation } from "../slices/userApiSlice";

const UsersList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data: users, refetch, isLoading, error } = useGetUsersQuery({}, { refetchOnMountOrArgChange: true });
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [id, setID] = useState("");
  const [name, setname] = useState("");
  const [deleteUser, { isLoading: userLoading }] = useDeleteUserMutation(id);
  const handleClickOpen = (_id) => {
    setOpen(true);
    setID(_id);
  };
  const handleClose = () => {
    setOpen(false);
    // setID("");
  };

  const handleDeleteClickOpen = (_id, name) => {
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
            width="100px"
            m="10px 0"
            p="5px"
            display="flex"
            justifyContent="start"
            backgroundColor={
              role === "admin"
                ? colors.greenAccent[600]
                : role === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {role === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {role === "manager" && <SecurityOutlinedIcon />}
            {role === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {role}
            </Typography>
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
          <Box m="5px 0" p="5px" display="flex" justifyContent="start">
            <IconButton
              type="button"
              onClick={() => handleClickOpen(_id)}
              sx={{ p: 1 }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              type="button"
              sx={{ p: 1 }}
              onClick={() => handleDeleteClickOpen(_id, name)}
            >
              <DeleteIcon />
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
          color: colors.greenAccent[500],
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
      <DataGrid getRowId={(row) => row._id} rows={users} columns={columns} />

      <CustomDailogUserForm
        open={open}
        id={id}
        handleClose={handleClose}
        title="Edit User Detials"
      />
      <CustomDeleteDailog
        open={openDelete}
        id={id}
        handleDeleteClose={handleDeleteClose}
        handleDelete={() => handleDelete(id)}
        message={`Are you sure you want to delete?`}
      />
    </Box>
  );
};

export default UsersList;
