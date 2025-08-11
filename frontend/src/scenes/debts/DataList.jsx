import {
  Box,
  Typography,
  useTheme,
  IconButton,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,ListItemText, ListItem, List, useMediaQuery
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import Chip from "@mui/material/Chip";
import ListIcon from "@mui/icons-material/List";
import LoopIcon from "@mui/icons-material/Loop";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Moment from "moment";
import CustomDailogForm from "./CustomDailogForm";
import NotInterestedOutlinedIcon from "@mui/icons-material/NotInterestedOutlined";
import CustomDeleteDailog from "../../components/CustomDeleteDailog";
import { useGetDebtsQuery, useDeleteDebtMutation } from "../../slices/debtApiSlice";
import AddIcon from "@mui/icons-material/Add";
import { useGetUsersQuery } from "../../slices/userApiSlice";
import { useGetECsQuery } from "../../slices/expCategoryApiSlice";
import {
  restructuredList,
  getFormatedCurrency,
} from "../../components/common/Utils";
import { useGetVendorsQuery } from "../../slices/vendorApiSlice";
// import { useGetBanksQuery } from "../../slices/bankApiSlice";
const DataList = ({ handleCurrencydata }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const {
    data: debtsList,
    refetch,
    isLoading,
    error,
  } = useGetDebtsQuery();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [isTotalAll, setIsTotalAll] = useState(true);
  const [debtData, setDebtData] = useState([]);
  const [name, setname] = useState("");
  const [id, setID] = useState("");
  const [deleteDebt] = useDeleteDebtMutation(id);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [ecVal, setecVal] = useState("");

  const { data: ecList } = useGetECsQuery();
  const { data: usersList } = useGetUsersQuery();
  const { data: vendorsList } = useGetVendorsQuery();
  // const { data: bankList } = useGetBanksQuery();

  const [total, setTotal] = useState(0);
  const [transListState, settransListState] = useState([]);
  const tot1 = debtsList?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.cost,
    0
  );

  // console.log(tot1);

  // console.log(debtsList);
  let resEC = restructuredList(ecList);

  useEffect(() => {
    if (isTotalAll) {
      setTotal(tot1);
      handleCurrencydata(tot1, "");
    }
    // console.log(isTotalAll);
    // console.log(tot1);
    // console.log(total);
    // if(transListState === undefined)
    // settransListState(debtsList)

    // setTotal(getFormatedCurrency(tot1));
  }, [isTotalAll, total, tot1]);

  //console.log(resEC);
  const handleClickOpen = (data) => {
    setTitle(
      data
        ? "Edit Transcation Detials"
        : "Add a New Transcation Detials"
    );
    setOpen(true);
    setDebtData(data);
  };
  const handleClose = () => {
    setOpen(false);
    // setID("");
  };

  const handleDeleteClickOpen = (row) => {
    setTitle(`Are you sure you want to delete ${row.title}?`);
    setOpenDelete(true);
    setID(row._id);
    setname(row.name);
  };

  const handleDelete = async (id) => {
    let res = null;
    try {
      res = await deleteDebt(id).unwrap();
      handleDeleteClose();
    } catch (err) {
      console.log(err);
    }
  };
  const handleFilterChange = (e) => {
    if (e.target.value === "") {
      setecVal("");
      setTotal(tot1);
      setIsTotalAll(true);
    } else {
      setecVal(e.target.value);
      setIsTotalAll(false);
      console.log(e.target.label);
      const filteredVal = debtsList.filter(
        (data) => data.ecId === e.target.value
      );
      const tot = filteredVal.reduce(
        (accumulator, currentValue) => accumulator + currentValue.cost,
        0
      );
      setTotal(tot);
      settransListState(filteredVal);
      handleCurrencydata(tot, filteredVal[0]?.ecName);
      // console.log(filteredVal);
    }
   
  };
  const handleDeleteClose = () => {
    setOpenDelete(false);
    // setID("");
  };

  const mobileColumns = [
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: ({ row: { title, ecName } }) => {
        return(
          <List dense={true} sx={{ mt: "0", p:"0", 
            "& li ": {
              padding:"0"
            }
          }}>
            <ListItem>
              <ListItemText
                primary={title}
                secondary={ecName}
              />
            </ListItem>,
        </List>
        );
      },
    },

   
    // {
    //   field: "bankName",
    //   headerName: "Payment from",
    //   flex: 1,
    //   renderCell: ({ row: { bankName, bankACType, bankACNum } }) => {
    //     return(
    //       <List dense={true} sx={{ mt: "0", p:"0", 
    //         "& li ": {
    //           padding:"0"
    //         }
    //       }}>
    //         <ListItem>
    //           <ListItemText
    //             primary={bankName}
    //             secondary={bankACType + " - " + bankACNum}
    //           />
    //         </ListItem>,
    //     </List>
    //     );
    //   },
    // },
  
    
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      cellClassName: "cost-column--cell",
      renderCell: ({ row: { cost } }) => {
        return getFormatedCurrency(cost);
      },
    },
   

    
    {
      field: "_id",
      headerName: "Actions",
      flex: 1,
      renderCell: ({ row: row }) => {
        return (
          <Box m="5px 0" display="flex" justifyContent="start">
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
      field: "title",
      headerName: "Title",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: ({ row: { title, ecName } }) => {
        return(
          <List dense={true} sx={{ mt: "0", p:"0", 
            "& li ": {
              padding:"0"
            }
          }}>
            <ListItem>
              <ListItemText
                primary={title}
                secondary={ecName}
              />
            </ListItem>,
        </List>
        );
      },
    },

    {
      field: "userName",
      headerName: "Payment by",
      flex: 1,
       renderCell: ({ row: { userName, paidDate } }) => {
        const dateFromDB = paidDate;
        const formattedDate = Moment(dateFromDB).utc().format("DD-MMM-YYYY");
        return(
          <List dense={true} sx={{ mt: "0", p:"0", 
            "& li ": {
              padding:"0"
            }
          }}>
            <ListItem>
              <ListItemText
                primary={userName}
                secondary={formattedDate}
              />
            </ListItem>,
        </List>
        );
      },
    },
    // {
    //   field: "bankName",
    //   headerName: "Payment from",
    //   flex: 1,
    //   renderCell: ({ row: { bankName, bankACType, bankACNum } }) => {
    //     return(
    //       <List dense={true} sx={{ mt: "0", p:"0", 
    //         "& li ": {
    //           padding:"0"
    //         }
    //       }}>
    //         <ListItem>
    //           <ListItemText
    //             primary={bankName}
    //             secondary={bankACType + " - " + bankACNum}
    //           />
    //         </ListItem>,
    //     </List>
    //     );
    //   },
    // },
   
    { 
      field: "vendorName",
      headerName: "Payment To",
      flex: 1,
      renderCell: ({ row: { vendorName, vendorPaymentType, vendorIndivdualName } }) => {
        return(
          <List dense={true} sx={{ mt: "0", p:"0", 
            "& li ": {
              padding:"0"
            }
          }}>
            <ListItem>
              <ListItemText
                primary={vendorName}
                secondary={vendorPaymentType === "Direct" ? vendorPaymentType : vendorPaymentType+" - "+ vendorIndivdualName}
              />
            </ListItem>,
        </List>
        );
      },
    },
    // {
    //   field: "ecName",
    //   headerName: "Category",
    //   flex: 1,
    // },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      cellClassName: "cost-column--cell",
      renderCell: ({ row: { cost } }) => {
        return getFormatedCurrency(cost);
      },
    },
    // {
    //   field: "paidDate",
    //   headerName: "Date",
    //   flex: 1,
    //   renderCell: ({ row: { paidDate } }) => {
    //     const dateFromDB = paidDate;
    //     const formattedDate = Moment(dateFromDB).utc().format("DD/MM/YY");
    //     return formattedDate;
    //   },
    // },

    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: ({ row: { status } }) => {
        return (
          <Box
            width={isNonMobile? "120px": "50px" }
            m="5px 0"
            p="5px"
            display="flex"
            justifyContent="start"
            borderRadius="4px"
          >
            <Chip
              variant={isNonMobile? "outlined" : "outlined" }
              label={isNonMobile? status : ""}
              color={
                status === "Completed"
                  ? "success"
                  : status === "Pending"
                  ? "warning"
                  : status === "Canceled"
                  ? "error"
                  : "info"
              }
              icon={
                status === "Completed" ? (
                  <TaskAltIcon />
                ) : status === "Pending" ? (
                  <LoopIcon />
                ) : status === "Canceled" ? (
                  <NotInterestedOutlinedIcon />
                ) : (
                  <ListIcon />
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
          <Box m="5px 0" display="flex" justifyContent="start">
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
  if (isLoading) return <Loader />;
  return (
    <>
      <Box display={isNonMobile? "flex" :  "block"} justifyContent="space-between" alignItems="center">
        <Typography variant="h4" color={colors.grey[100]} sx={{ mb: "20px" }}>
          Debt Transactions List
        </Typography>
        
        <Box sx={{
          display: isNonMobile ? "" : "flex",
          justifyContent: isNonMobile ? "" : "space-between"
        }}>
          <FormControl
            fullWidth
            sx={{ width: "160px", marginRight: "15px" }}
            size="small"
          >
            <InputLabel variant="outlined" id="ecId" htmlFor="ecSelect">
              Expense Category
            </InputLabel>
            <Select
              labelId="ecId"
              name="ecId"
              id="ecSelect"
              value={ecVal || ""}
              label="Expense Category"
              onChange={handleFilterChange}
            >
              <MenuItem value=""> Select </MenuItem>
              {resEC?.map((ec, i) => (
                <MenuItem key={`${ec._id}-${i}`} value={ec._id.toString()}>
                  {ec.name}
                </MenuItem>
              ))}
              
            </Select>
          </FormControl>
          <Button
            fullWidth
            type="button"
            variant="outlined"
            color="secondary"
            onClick={() => handleClickOpen(null)}
            size={isNonMobile? "medium": "small"}
            sx={{
              m: "0 0 10px",
              p:  isNonMobile? "10px" : "8px",
              
              width: isNonMobile? "150px" : "100px",
            }}
          >
            <AddIcon /> Add New
          </Button>
        </Box>
      </Box>

      <Box
        m=" 0 0 0"
        height="60vh"
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
          "& .cost-column--cell": {
            fontWeight: "500",
            color: colors.greenAccent[300],
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
        {transListState ? (
          <DataGrid
            getRowId={(row) => row._id}
            rows={ecVal ? transListState : debtsList}
            columns={isNonMobile? columns : mobileColumns}
            initialState={{
              pinnedColumns: {
                // left: [GRID_CHECKBOX_SELECTION_COL_DEF.field],
                right: ['actions'],
              },
            }}
          />
        ) : (
          <Loader />
        )}
        <CustomDailogForm
          open={open}
          debtData={debtData}
          handleClose={handleClose}
          isLoading={isLoading}
          title={title}
          usersList={usersList}
          ecList={ecList}
          vendorsList={vendorsList}
          // bankList={bankList}
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
