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
import { useUpdateECMutation } from "../../slices/expCategoryApiSlice";
import { useDeleteECMutation } from "../../slices/expCategoryApiSlice";
import { useSetECsMutation } from "../../slices/expCategoryApiSlice";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import moment from "moment";

const expensesCategorySchema = yup.object().shape({
  name: yup.string().required("required"),
  description: yup.string().required("required"),
  expectedBudget: yup.number().required("required"),
  //   startDate: yup.string().required("required"),
  //   endDate: yup.string().required("required"),
  workStatus: yup.string().required("required"),
});

const initialValuesExpensesCategory = {
  name: "",
  description: "",
  expectedBudget: 0,
  startDate: dayjs(Date.now()),
  endDate: "",
  workStatus: "To do",
};

const initialValuesCustomSnackBar = {
  title: "",
  message: "",
  openBar: false,
  severity: "",
};

const Form = ({ ecInfo, handleClose }) => {
  // console.log(ecInfo);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAddNew, setIsAddNew] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSnackBarMessage, setIsSnackBarMessage] = useState(
    initialValuesCustomSnackBar
  );
  const [addECDetails] = useSetECsMutation();
  const [updateECDetails, { isLoading: ecLoading }] = useUpdateECMutation(
    ecInfo?._id
  );
  const [eCategory, setECategory] = useState(initialValuesExpensesCategory);

  useEffect(() => {
    if (ecInfo !== null) setECategory(ecInfo);
    else {
      setIsAddNew(true);
      setECategory(initialValuesExpensesCategory);
    }

    //    console.log(ecInfo);
  }, [ecInfo, eCategory]);

  const submitECForm = async (values) => {
    //    console.log(values);
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
          initialValues={eCategory}
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
                  label="Description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description || ""}
                  name="description"
                  error={
                    Boolean(touched.description) && Boolean(errors.description)
                  }
                  helperText={touched.description && errors.description}
                  sx={{ gridColumn: "span 6" }}
                  focused
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    sx={{ gridColumn: "span 6", mt: "-8px " }}
                    components={["DatePicker"]}
                  >
                    <DatePicker
                      label="Start Date"
                      onBlur={handleBlur}
                      //   onChange={handleChange}
                      onChange={(value) => {
                        setFieldValue("startDate", Date.parse(value));
                      }}
                      closeOnSelect={true}
                      // disableCloseOnSelect={false}
                      value={dayjs(values.startDate) || dayjs(moment())}
                      name="startDate"
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
                        Boolean(touched.startDate) && Boolean(errors.startDate)
                      }
                      helperText={touched.startDate && errors.startDate}
                      focused
                    />
                  </DemoContainer>
                </LocalizationProvider>
                {/* <TextField
                  label="startDate"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.startDate || ""}
                  name="startDate"
                  error={
                    Boolean(touched.startDate) && Boolean(errors.startDate)
                  }
                  helperText={touched.startDate && errors.startDate}
                  sx={{ gridColumn: "span 6" }}
                  focused
                /> */}
                {/* <TextField
                  label="endDate"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.endDate || ""}
                  name="endDate"
                  error={Boolean(touched.endDate) && Boolean(errors.endDate)}
                  helperText={touched.endDate && errors.endDate}
                  sx={{ gridColumn: "span 6" }}
                  focused
                /> */}
                <TextField
                  label="Planned Budget"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.expectedBudget || ""}
                  name="expectedBudget"
                  error={
                    Boolean(touched.expectedBudget) &&
                    Boolean(errors.expectedBudget)
                  }
                  helperText={touched.expectedBudget && errors.expectedBudget}
                  sx={{ gridColumn: "span 6" }}
                  focused
                />
                <FormControl fullWidth sx={{ gridColumn: "span 6" }}>
                  <InputLabel
                    variant="outlined"
                    id="workStatus"
                    htmlFor="workStatusSelect"
                  >
                    Work Status
                  </InputLabel>
                  <Select
                    labelId="workStatus"
                    name="workStatus"
                    id="workStatusSelect"
                    value={values.workStatus || "To do"}
                    label="Work Status"
                    onChange={handleChange}
                  >
                    <MenuItem value="To do">To do</MenuItem>
                    <MenuItem value="In progress">In progress</MenuItem>
                    <MenuItem value="In review">In review</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                  </Select>
                </FormControl>
                {values.workStatus === "Completed" && (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                      sx={{ gridColumn: "span 6", mt: "-8px " }}
                      components={["DatePicker"]}
                    >
                      <DatePicker
                        label="End Date"
                        onBlur={handleBlur}
                        //   onChange={handleChange}
                        onChange={(value) => {
                          setFieldValue("endDate", Date.parse(value));
                        }}
                        closeOnSelect={true}
                        // disableCloseOnSelect={false}
                        value={dayjs(values.endDate) || dayjs(moment())}
                        name="endDate"
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
                          Boolean(touched.endDate) && Boolean(errors.endDate)
                        }
                        helperText={touched.endDate && errors.endDate}
                        focused
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                )}
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
