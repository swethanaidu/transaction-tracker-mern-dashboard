import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  InputLabel,
  FormControl,
  NativeSelect,
  useTheme,
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

const expensesCategorySchema = yup.object().shape({
  name: yup.string().required("required"),
  description: yup.string().required("required"),
  expectedBudget: yup.string().required("required"),
  startDate: yup.string().required("required"),
  endDate: yup.string().required("required"),
  workStatus: yup.string().required("required"),
});

const initialValuesExpensesCategory = {
  name: "",
  description: "",
  expectedBudget: 0,
  startDate: "",
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
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSnackBarMessage, setIsSnackBarMessage] = useState(
    initialValuesCustomSnackBar
  );

  const [updateECDetails, { isLoading: userLoading }] = useUpdateECMutation(
    ecInfo?._id
  );
  const [eCategory, setECategory] = useState(initialValuesExpensesCategory);

  useEffect(() => {
    setECategory(ecInfo);
    //    console.log(ecInfo);
  }, [ecInfo, eCategory]);

  const submitProfileForm = async (values) => {
    //    console.log(values);
    let res,
      obj1 = null;
    try {
      res = await updateECDetails(values).unwrap();
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
      // console.log(res);
      // console.log(obj1);
      // console.log(isSnackBarMessage);
      // console.log(test);
    }
  };
  if (isLoading) return <Loader />;
  return (
    <>
      <Box
        backgroundColor={colors.primary[400]}
        borderRadius="8px"
        p="30px 20px 20px"
        mt="40px"
      >
        <Formik
          onSubmit={submitProfileForm}
          initialValues={user}
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
                gap="10px"
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
                  sx={{ gridColumn: "span 4" }}
                  focused
                />
                <TextField
                  label="startDate"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.startDate || ""}
                  name="startDate"
                  error={
                    Boolean(touched.startDate) && Boolean(errors.startDate)
                  }
                  helperText={touched.startDate && errors.startDate}
                  sx={{ gridColumn: "span 4" }}
                  focused
                />
                <TextField
                  label="endDate"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.endDate || ""}
                  name="endDate"
                  error={Boolean(touched.endDate) && Boolean(errors.endDate)}
                  helperText={touched.endDate && errors.endDate}
                  sx={{ gridColumn: "span 4" }}
                  focused
                />
                <FormControl fullWidth sx={{ gridColumn: "span 4" }}>
                  <InputLabel variant="standard" htmlFor="workStatus">
                    Work Status
                  </InputLabel>
                  <NativeSelect
                    onBlur={handleBlur}
                    onChange={handleChange}
                    defaultValue="To do"
                    inputProps={{
                      name: "workStatus",
                      id: "workStatus",
                    }}
                  >
                    <option value="To do">To do</option>
                    <option value="In progress">In progress</option>
                    <option value="In review">In review</option>
                    <option value="Completed">Completed</option>
                  </NativeSelect>
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
                    sx={{
                      m: "10px 0 0",
                      p: "1rem",
                      backgroundColor: colors.greenAccent[700],
                      color: colors.grey[100],
                      "&:hover": { color: colors.primary.main },
                      width: "150px",
                    }}
                  >
                    Update
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
