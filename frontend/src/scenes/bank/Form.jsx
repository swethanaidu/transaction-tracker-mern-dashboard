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
  MenuItem,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import CustomSnackbar from "../../components/CustomSnackbar"; 
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useSetBankMutation} from "../../slices/bankApiSlice";
import { useUpdateBankMutation } from "../../slices/bankApiSlice";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import moment from "moment";
import { restructuredList } from "../../components/common/Utils";
const expensesCategorySchema = yup.object().shape({
  name: yup.string().required("required"),
  accountNumber: yup.string().required("required"),
  amount: yup.number().required("required"),
  //   startDate: yup.string().required("required"),
  //   endDate: yup.string().required("required"),
  bankStatus: yup.string().required("required"),
});

const initialValuesBank = {
  name: "",
  accountNumber: "",
  accountType: "Savings",
  amount: 0,
  userId: "",
  bankStatus: "Active",
};

const initialValuesCustomSnackBar = {
  title: "",
  message: "",
  openBar: false,
  severity: "",
};

const Form = ({ bankInfo, handleClose, usersList }) => {
  // console.log(bankInfo);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
 
  const [isAddNew, setIsAddNew] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSnackBarMessage, setIsSnackBarMessage] = useState(
    initialValuesCustomSnackBar
  );
  const [addBankDetails] = useSetBankMutation();
  const [updateBankDetails, { isLoading: ecLoading }] = useUpdateBankMutation(
    bankInfo?._id
  );
  const [bank, setBank] = useState(initialValuesBank);
  const resUser = restructuredList(usersList);
  useEffect(() => {
    if (bankInfo !== null) setBank(bankInfo);
    else {
      setIsAddNew(true);
      setBank(initialValuesBank);
    }

    //    console.log(bankInfo);
  }, [bankInfo, bank]);

  const submitECForm = async (values) => {
      //  console.log(values);
    let res,
      obj1 = null;
    try {
      if (isAddNew) {
        res = await addBankDetails(values).unwrap();
      } else {
        res = await updateBankDetails(values).unwrap();
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
      // setIsSnackBarMessage(obj1);
      // setTest("Test")
      console.log(res);
      // console.log(obj1);
      // console.log(isSnackBarMessage);
      // console.log(test);
    }
  };
  if (ecLoading) return <Loader />;
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
          initialValues={bank}
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
                <TextField
                  label="Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name || ""}
                  name="name"
                  error={Boolean(touched.name) && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  sx={{ gridColumn: "span 6" }}
                  focused
                />
                <TextField
                  label="accountNumber"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.accountNumber || ""}
                  name="accountNumber"
                  error={
                    Boolean(touched.accountNumber) && Boolean(errors.accountNumber)
                  }
                  helperText={touched.accountNumber && errors.accountNumber}
                  sx={{ gridColumn: "span 6" }}
                  focused
                />
                 
                
                  <FormControl fullWidth sx={{ gridColumn: "span 6" }}>
                  <InputLabel
                    variant="outlined"
                    id="accountType"
                    htmlFor="accountTypeSelect"
                  >
                    Account Type
                  </InputLabel>
                  <Select
                    labelId="accountType"
                    name="accountType"
                    id="accountTypeSelect"
                    value={values.accountType}
                    label="Account Type"
                    onChange={handleChange}
                  >
                    <MenuItem value="Savings">Savings</MenuItem>
                    <MenuItem value="Loan">Loan</MenuItem>
                    <MenuItem value="Credit Card">Credit Card</MenuItem>
                    <MenuItem value="FD">FD</MenuItem>
                    <MenuItem value="RD">RD</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Amount"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.amount || ""}
                  name="amount"
                  error={
                    Boolean(touched.amount) &&
                    Boolean(errors.amount)
                  }
                  helperText={touched.amount && errors.amount}
                  sx={{ gridColumn: "span 6" }}
                  focused
                />
               
                   <FormControl fullWidth sx={{ gridColumn: "span 6" }}>
                  <InputLabel
                    variant="outlined"
                    id="userId"
                    htmlFor="userSelect"
                  >
                   User
                  </InputLabel>
                  <Select
                    labelId="userId"
                    name="userId"
                    id="userSelect"
                    value={values.userId }
                    label="Payment By"
                    onChange={handleChange}
                    
                  >
                    {resUser?.map((ec, i) => (
                    <MenuItem  key={`${ec._id}-${i}`} value={(ec._id).toString()}>{ec.name}</MenuItem>
                    ))};
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{ gridColumn: "span 6" }}>
                  <InputLabel
                    variant="outlined"
                    id="bankStatus"
                    htmlFor="bankStatusSelect"
                  >
                    Work Status
                  </InputLabel>
                  <Select
                    labelId="bankStatus"
                    name="bankStatus"
                    id="bankStatusSelect"
                    value={values.bankStatus || "To do"}
                    label="Bank Status"
                    onChange={handleChange}
                  >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>
                
                {/* BUTTONS */}
                {isSnackBarMessage && (
                  <CustomSnackbar
                    title={isSnackBarMessage.title}
                    message={isSnackBarMessage.message}
                    openBar={isSnackBarMessage.openBar}
                    severity={isSnackBarMessage.severity}
                  />
                )}

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
