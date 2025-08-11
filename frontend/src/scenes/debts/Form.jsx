import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  InputLabel,
  FormControl,
  Select,
  useTheme,
  MenuItem,FormControlLabel,RadioGroup, Radio,FormLabel,
} from "@mui/material";
import moment from "moment";
import * as yup from "yup";
import { Formik } from "formik"; 
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import CustomSnackbar from "../../components/CustomSnackbar";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

import { useSetDebtMutation, useUpdateDebtMutation } from "../../slices/debtApiSlice";

import { restructuredList, getFormatedCurrency,restructuredBankACNumList, getDistinctValues, restructuredBankACList } from "../../components/common/Utils";

// import { useGetUsersQuery } from "../../slices/userApiSlice";
// import { useGetECsQuery } from "../../slices/expCategoryApiSlice";

const expensesCategorySchema = yup.object().shape({
  title: yup.string().required("required"),
  cost: yup.number().required("required"),
  paidDate: yup.string().required("required"),
  userId: yup.string().required("required"),
  ecId: yup.string().required("required"),
  status: yup.string().required("required"),
});

const initialValuesExpensesCategory = {
  title: "",
  description: "",
  cost: 0,
  paidDate: dayjs(Date.now()),
  userId: "",
  ecId: "",
  vendorId:"",
  paymentMode:"NEFT",
  status: "Completed",
  vendorPaymentType: "Direct",
  vendorIndivdualName:"",
};

const initialValuesCustomSnackBar = {
  title: "",
  message: "",
  openBar: false,
  severity: "",
};

const Form = ({ debtInfo, handleClose, loggedUSer , usersList, ecList, vendorsList}) => {
  // console.log(debtInfo);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAddNew, setIsAddNew] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSnackBarMessage, setIsSnackBarMessage] = useState(
    initialValuesCustomSnackBar
  );
  // const { data: ecList, refetch, isLoading, error } = useGetECsQuery();
  // const { data: usersList } = useGetUsersQuery();

  const [ecData, setecData] = useState();
  const [userData, setuserData] = useState();
  const [userIDVal, setUserIDVal] = useState(debtInfo?.userId || loggedUSer._id);
  const [accountType, setAccountType] = useState();
  const [accountNumber, setAccountNumber] = useState();

  
  // const [radioValue, setradioValue] = React.useState('female');
  const [addECDetails] = useSetDebtMutation();
  const [updateECDetails, { isLoading: ecLoading }] = useUpdateDebtMutation(
    debtInfo?._id
  );
  const [debt, setDebt] = useState(initialValuesExpensesCategory);


  

  useEffect(() => {
    // const resBankAccNum = getDistinctValues(restructuredBankACNumList(bankList));
    // setAccountType(resBankAccNum)
    // console.log(loggedUSer);
    initialValuesExpensesCategory.userId= loggedUSer?._id;
    setDebt(initialValuesExpensesCategory);
    if (debtInfo !== null){
      setDebt(debtInfo);
      // const bankAccountNumFilter = bankList.filter(x => x.accountNumber === debtInfo?.bankACNum);
      
      // console.log(bankList);
      // console.log(debtInfo);
      // console.log(resBankAccNum);
      
    //   setDebt(prevState => ({
    //     ...prevState,
    //     fName: 'your updated value here'
    //  }))
    }
    else {
      setIsAddNew(true);
      setDebt(initialValuesExpensesCategory);
    }
    setecData(ecList);
    setuserData(usersList)
     
      
  }, [debtInfo, debt, loggedUSer, ecList, usersList, ecData, userData]);

  // const restructuredList = (data) => {
  //   return data.map(item => {
  //     return {
  //           _id: item._id,
  //           name: item.name,
  //     };
  //   });
  // };
  const resUser = restructuredList(usersList);
  const resEC = restructuredList(ecList);
  const resVendors = restructuredList(vendorsList);
  // const resBankVal = restructuredList(bankData);
  // const resBank =  getDistinctValues(resBankVal)//Removed dulpicates
  // const resBankAcc = restructuredBankACList(bankList.filter( x => x.userId === userIDVal));
  // console.log(resBankAcc);
  
  const handleAcNumberChange = (e) => {
    
    //console.log(e.target.value);
   // setBankAcNumber(e.target.value);
    
  //   const bankAccountNumFilter = bankList.filter( x => x.userId === userIDVal && x.accountNumber === e.target.value);
     // const bankAccountFilter = bankList.filter( x => x.userId === userIDVal && x.name === val);
     //console.log(bankAccountNumFilter);
     //const resBankAcc = getDistinctValues(restructuredBankACList(bankAccountNumFilter));

   //  const resfilter = resBankAcc.filter(x => x._id === debt.bankId )
  //   console.log(resfilter);
  //   if(!resfilter){
  //          setDebt(prevState => ({
  //       ...prevState,
  //       bankId: ''
  //    }))
  // console.log(debt);
  //   }

    // setAccountNumber(resBankAcc);
    //setAccountType(resBankAcc);
     
    // console.log(debt);
     
  
     // setAccountType()
   }
  const handleBankNameChange = (val) => {
    
   //console.log(e.target.value);
 //  setBankName(val);
   
  //  const bankAccountNumFilter = bankList.filter( x => x.userId === userIDVal && x.name === val);
    // const bankAccountFilter = bankList.filter( x => x.userId === userIDVal && x.name === val);
    //console.log(bankAccountNumFilter);
 //   const resBankAcc = getDistinctValues(restructuredBankACNumList(bankAccountNumFilter));
   //console.log(resBankAcc);
  // setAccountNumber(resBankAcc);
   // setAccountType(resBankAcc);
    
    
    // setAccountType()
  }
  const handleUserChange = (val) => {
    // const bankFilter = bankList.filter( x => x.userId === val);
    // setBankData(bankFilter)
    setUserIDVal(val);
    // console.log(bankFilter);
    // setAccountType()
  }
  
// console.log(vendorsList);
  const submitECForm = async (values) => {
       console.log(values);
    let res,
      obj1 = null;
    try {
      if (isAddNew) {
        res = await addECDetails(values).unwrap();
      } else {
        res = await updateECDetails(values).unwrap();
      }
      handleClose();
    } catch (err) {
      console.log(err);
      obj1 = {
        title: "Error",
        message: err?.data?.message || err.error,
        openBar: true,
        severity: "error",
      };
      setIsSnackBarMessage(obj1);
    }

    if (res != null) {
      obj1 = {
        title: "Success",
        message: `${res.name}, profile has been successfully updated`,
        openBar: true,
        severity: "success",
      };
      setIsSnackBarMessage((prevState) => ({
        ...prevState,
        ...obj1,
      }));
       
    }
  };

  
  if (!(loggedUSer  )) return <Loader />;
  return (
    <>
      <Box
        backgroundColor={colors.primary[400]}
        borderRadius="8px"
        p="30px 20px 20px"
        mt="40px"
      >
        <Formik
          onSubmit={submitECForm}
          initialValues={debt}
          enableReinitialize
          validationSchema={expensesCategorySchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="20px 10px"
                gridTemplateColumns="repeat(12, minmax(0, 1fr))"
                // gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 12",
                  },
                }}
              >
                <FormControl fullWidth sx={{ gridColumn: "span 4" }}>
                  <InputLabel
                    variant="outlined"
                    id="ecId"
                    htmlFor="ecSelect"
                  >
                    Expense Category
                  </InputLabel>
                  <Select
                    labelId="ecId"
                    name="ecId"
                    id="ecSelect"
                    value={values.ecId || ""}
                    label="Expense Category"
                    onChange={handleChange}
                    
                  >
                    {resEC?.map((ec, i) => (
                    <MenuItem  key={`${ec._id}-${i}`} value={(ec._id).toString()}>{ec.name}</MenuItem>
                    ))};
                  </Select>
                </FormControl>

                <TextField
                  label="Title"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.title || ""}
                  name="title"
                  error={Boolean(touched.title) && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                  sx={{ gridColumn: "span 4" }}
                  focused
                />
                <TextField
                  label="Description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description || ""}
                  name="description"
                  error={
                    Boolean(touched.description) && Boolean(errors.description)
                  }
                  helperText={touched.description && errors.description}
                  sx={{ gridColumn: "span 4" }}
                  focused
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    sx={{ gridColumn: "span 4", mt: "-8px " }}
                    components={["DatePicker"]}
                  >
                    <DatePicker
                      label="Paid On"
                      onBlur={handleBlur}
                      //   onChange={handleChange}
                      onChange={(value) => {
                        setFieldValue("paidDate", Date.parse(value));
                      }}
                      closeOnSelect={true}
                      // disableCloseOnSelect={false}
                      value={dayjs(values.paidDate) || dayjs(moment())}
                      name="paidDate"
                      sx={{ width: "100% " }}
                      slotProps={{
                        textField: { fullWidth: true },
                        day: {
                          sx: {
                            "&.MuiPickersDay-root.Mui-selected": {
                              backgroundColor: colors.greenAccent[700],
                            },
                          },
                        },
                        desktopPaper: {
                          sx: {
                            ".MuiPickersYear-yearButton.Mui-selected": {
                              backgroundColor: colors.greenAccent[700],
                            },
                          },
                        },
                      }}
                      error={
                        Boolean(touched.paidDate) && Boolean(errors.paidDate)
                      }
                      helperText={touched.paidDate && errors.paidDate}
                      focused
                    />
                  </DemoContainer>
                </LocalizationProvider>
                
                <TextField
                  label="Cost"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.cost || ""}
                  name="cost"
                  error={
                    Boolean(touched.cost) &&
                    Boolean(errors.cost)
                  }
                  helperText={touched.cost && errors.cost}
                  sx={{ gridColumn: "span 4" }}
                  focused
                />
               <FormControl fullWidth sx={{ gridColumn: "span 4" }}>
                  <InputLabel
                    variant="outlined"
                    id="paymentMode"
                    htmlFor="paymentModeSelect"
                  >
                    Mode of Payment
                  </InputLabel>
                  <Select
                    labelId="paymentMode"
                    name="paymentMode"
                    id="paymentModeSelect"
                    value={values.paymentMode || "NEFT"}
                    label="Payment paymentMode"
                    onChange={handleChange}
                  >
                    <MenuItem value="UPI">UPI</MenuItem>
                    <MenuItem value="Cash">Cash</MenuItem>
                    <MenuItem value="NEFT">NEFT</MenuItem>
                    <MenuItem value="IMPS">IMPS</MenuItem>
                    <MenuItem value="RTGS">RTGS</MenuItem>
                    <MenuItem value="Transfer Within Bank">Transfer Within Bank</MenuItem>
                    <MenuItem value="Credit Card">Credit Card</MenuItem>
                    <MenuItem value="Others">Others</MenuItem>
                  </Select>
                </FormControl>
               
               
                 <FormControl fullWidth sx={{ gridColumn: "span 3" }}>
                  <InputLabel
                    variant="outlined"
                    id="userId"
                    htmlFor="userSelect"
                  >
                    Payment By
                  </InputLabel>
                  <Select
                    labelId="userId"
                    name="userId"
                    id="userSelect"
                    value={values.userId || loggedUSer?._id}
                    label="Payment By"
                    onChange={(e) => {
                      handleUserChange(e.target.value);
                      handleChange(e)
                    }
                      }
                    
                  >
                    {resUser?.map((ec, i) => (
                    <MenuItem  key={`${ec._id}-${i}`} value={(ec._id).toString()}>{ec.name}</MenuItem>
                    ))};
                  </Select>
                </FormControl>
{/*                 
                <FormControl fullWidth sx={{ gridColumn: "span 3" }}>
                  <InputLabel
                    variant="outlined"
                    id="bankNameId"
                    htmlFor="bankSelect"
                  >
                    Bank
                  </InputLabel>
                  <Select
                    labelId="bankNameId"
                    name="bankNameId"
                    id="bankSelect"
                    value={bankName || ""}
                    label="Bank"
                    onChange={(e) => handleBankNameChange(e.target.value)}
                    
                  >
                    {resBank?.map((ec, i) => (
                    <MenuItem  key={`${ec._id}-${i}`} value={(ec.name).toString()}>{ec.name}</MenuItem>
                    ))};
                  </Select>
                </FormControl>
                {accountNumber  && 
                <FormControl fullWidth sx={{ gridColumn: "span 3" }}>
                  <InputLabel
                    variant="outlined"
                    id="bankNumId"
                    htmlFor="bankNumIdSelect"
                  >
                    Account Number
                  </InputLabel>
                  <Select
                    labelId="bankNumId"
                    name="bankNumId"
                    id="bankNumIdSelect"
                    value={bankAcNumber || ""}
                    label="Type"
                    onChange={handleAcNumberChange}
                    
                  >
                    {accountNumber?.map((ec, i) => (
                    <MenuItem  key={`${ec._id}-${i}`} value={(ec.name).toString()}>{ec.name}</MenuItem>
                    ))};
                  </Select>
                </FormControl>
                } */}
                 
                
                
                <FormControl fullWidth sx={{ gridColumn: "span 3" }}>
                  <InputLabel
                    variant="outlined"
                    id="status"
                    htmlFor="statusSelect"
                  >
                    Payment Status
                  </InputLabel>
                  <Select
                    labelId="status"
                    name="status"
                    id="statusSelect"
                    value={values.status || "Completed"}
                    label="Payment Status"
                    onChange={handleChange}
                  >
                    <MenuItem value="Completed">Completed</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Canceled">Canceled</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{ gridColumn: "span 4" }}>
                  <InputLabel
                    variant="outlined"
                    id="vendorId"
                    htmlFor="vendorSelect"
                  >
                    Payment To
                  </InputLabel>
                  <Select
                    labelId="vendorId"
                    name="vendorId"
                    id="vendorSelect"
                    value={values.vendorId || ""}
                    label="Payment By"
                    onChange={handleChange}
                    
                  >
                    {resVendors?.map((ec, i) => (
                    <MenuItem  key={`${ec._id}-${i}`} value={(ec._id).toString()}>{ec.name}</MenuItem>
                    ))};
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{ gridColumn: "span 3" }}>
                <FormLabel id="demo-vendorPaymentType" color="secondary" >Vendor Payment Type</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-vendorPaymentType"
                  name="vendorPaymentType"
                  value={values.vendorPaymentType || "Direct"}
                  onChange={handleChange}
                  row
                >
                  <FormControlLabel value="Direct" control={<Radio color="secondary"  />} label="Direct" />
                  <FormControlLabel value="Individual" control={<Radio color="secondary"  />} label="Individual" />
                </RadioGroup>
              </FormControl>
              {values.vendorPaymentType === "Individual" && (
                 <TextField
                  label="vendorIndivdualName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.vendorIndivdualName || ""}
                  name="vendorIndivdualName"
                  error={Boolean(touched.vendorIndivdualName) && Boolean(errors.vendorIndivdualName)}
                  helperText={touched.vendorIndivdualName && errors.vendorIndivdualName}
                  sx={{ gridColumn: "span 4" }}
                  focused
                />
              )}

                {/* BUTTONS */}
                {/* {isSnackBarMessage && (
                  <CustomSnackbar
                    title={isSnackBarMessage.title}
                    message={isSnackBarMessage.message}
                    openBar={isSnackBarMessage.openBar}
                    severity={isSnackBarMessage.severity}
                  />
                )} */}

                <Box
                  sx={{
                    gridColumn: "span 12",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    fullWidth
                    type="submit"
                    variant="outlined"
                    color="secondary"
                    sx={{
                      //   m: "10px 0 0",
                      p: "10px",
                      //   backgroundColor: colors.greenAccent[700],
                      //   color: colors.grey[100],
                      //   "&:hover": { color: colors.primary.main },
                      width: "150px",
                    }}
                  >
                    {isAddNew ? "Add New" : "Update"}
                  </Button>
                </Box>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default Form;
