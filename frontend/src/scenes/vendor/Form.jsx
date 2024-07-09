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
import { tokens } from "../../theme";
import Loader from "../../components/Loader";
import CustomSnackbar from "../../components/CustomSnackbar";

import {
  useSetVendorMutation,
  useUpdateVendorMutation,
} from "../../slices/vendorApiSlice";

import { restructuredList } from "../../components/common/Utils";
const expensesCategorySchema = yup.object().shape({
  name: yup.string().required("required"),
  description: yup.string().required("required"),
  vendorStatus: yup.string().required("required"),
});

const initialValuesVendor = {
  name: "",
  description: "",
  ecId: "",
  vendorStatus: "Active",
};

const initialValuesCustomSnackBar = {
  title: "",
  message: "",
  openBar: false,
  severity: "",
};

const Form = ({ vendorInfo, handleClose, ecList }) => {
  // console.log(vendorInfo);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isAddNew, setIsAddNew] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSnackBarMessage, setIsSnackBarMessage] = useState(
    initialValuesCustomSnackBar
  );
  const [addVendorDetails] = useSetVendorMutation();
  const [updateVendorDetails, { isLoading: ecLoading }] =
    useUpdateVendorMutation(vendorInfo?._id);
  const [bank, setBank] = useState(initialValuesVendor);
  const resECs = restructuredList(ecList);
  useEffect(() => {
    if (vendorInfo !== null) setBank(vendorInfo);
    else {
      setIsAddNew(true);
      setBank(initialValuesVendor);
    }

    //    console.log(vendorInfo);
  }, [vendorInfo, bank]);

  const submitECForm = async (values) => {
    //  console.log(values);
    let res,
      obj1 = null;
    try {
      if (isAddNew) {
        res = await addVendorDetails(values).unwrap();
      } else {
        res = await updateVendorDetails(values).unwrap();
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
      // console.log(res);
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
                  label="description"
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

                <FormControl fullWidth sx={{ gridColumn: "span 6" }}>
                  <InputLabel variant="outlined" id="ecId" htmlFor="ecSelect">
                    Category
                  </InputLabel>
                  <Select
                    labelId="ecId"
                    name="ecId"
                    id="ecSelect"
                    value={values.ecId}
                    label="Category"
                    onChange={handleChange}
                  >
                    {resECs?.map((ec, i) => (
                      <MenuItem
                        key={`${ec._id}-${i}`}
                        value={ec._id.toString()}
                      >
                        {ec.name}
                      </MenuItem>
                    ))}
                    ;
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{ gridColumn: "span 6" }}>
                  <InputLabel
                    variant="outlined"
                    id="vendorStatus"
                    htmlFor="vendorStatusSelect"
                  >
                    Vendor Status
                  </InputLabel>
                  <Select
                    labelId="vendorStatus"
                    name="vendorStatus"
                    id="vendorStatusSelect"
                    value={values.vendorStatus || "To do"}
                    label="Vendor Status"
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
