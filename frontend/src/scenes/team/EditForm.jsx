import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserMutation } from "../../slices/userApiSlice";
import Loader from "../../components/Loader";
import CustomSnackbar from "../../components/CustomSnackbar";
import { useUpdateUserByIDMutation } from "../../slices/userApiSlice";
import { setCredentials } from '../../slices/authSlice';

const userProfileSchema = yup.object().shape({
    name: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    city: yup.string().required("required"),
    state: yup.string().required("required"),
    country: yup.string().required("required"),
    occupation: yup.string().required("required"),
    phoneNumber: yup.string().required("required"),
  });
  
  const initialValuesUserProfile = {
    name: "",
    email: "",
    password: "",
    city: "",
    state: "",
    country: "",
    occupation: "",
    phoneNumber: 0,
    transactions: [],
    role: "user",
  };
  
  const initialValuesCustomSnackBar = {
    title: "",
    message: "",
    openBar: false,
    severity: "",
  };
  

const EditForm = ({ isProfilePage = false, userInfo, handleClose }) => {
    // console.log(userInfo);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [isSnackBarMessage, setIsSnackBarMessage] = useState(
      initialValuesCustomSnackBar
    );
    
    // const [ test, setTest] = useState("")
    // console.log(isSnackBarMessage);
    //const { userInfo } = useSelector((state) => state.auth);
    const [updateProfile, { isLoading }] = useUpdateUserMutation();
    const [updateUserDetails, { isLoading : userLoading }] = useUpdateUserByIDMutation(userInfo?._id);
    const [user, setUser] = useState(initialValuesUserProfile);
  
    useEffect(() => {
       setUser(userInfo);   
    //    console.log(userInfo); 
    }, [userInfo, user]);
    
    
    const submitProfileForm = async (values) => {
    //    console.log(values);
      let res, obj1 = null;
      try {
        if(isProfilePage) {
          res = await updateProfile(values).unwrap();
          dispatch(setCredentials({...res}));
        }
        else {
          res = await updateUserDetails(values).unwrap();
          handleClose();
        }
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
     
      if(res != null) {
          obj1 = {
              title: "Success",
              message: `${res.name}, profile has been successfully updated`,
              openBar: true,
              severity: "success",
          };
          setIsSnackBarMessage(prevState => ({
            ...prevState,
            ...obj1
          }));
          // setIsSnackBarMessage(obj1);
          // setTest("Test")
          // console.log(res);
          // console.log(obj1);
          // console.log(isSnackBarMessage);
          // console.log(test);
      }
    };
    if(isLoading) return (<Loader />)
  return (
    <>
        <Box backgroundColor={colors.primary[400]} borderRadius="8px" p="30px 20px 20px"  mt="40px" >
        <Formik
          onSubmit={submitProfileForm}
          initialValues={user}
          enableReinitialize
          validationSchema={userProfileSchema}
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
                  label="Full Name"
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
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email || ""}
                  name="email"
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 6" }}
                  focused
                />
                <TextField
                  label="Country"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.country || ""}
                  name="country"
                  error={Boolean(touched.country) && Boolean(errors.country)}
                  helperText={touched.country && errors.country}
                  sx={{ gridColumn: "span 4" }}
                  focused
                />
                <TextField
                  label="State"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.state || ""}
                  name="state"
                  error={Boolean(touched.state) && Boolean(errors.state)}
                  helperText={touched.state && errors.state}
                  sx={{ gridColumn: "span 4" }}
                  focused
                />
                <TextField
                  label="City"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.city || ""}
                  name="city"
                  error={Boolean(touched.city) && Boolean(errors.city)}
                  helperText={touched.city && errors.city}
                  sx={{ gridColumn: "span 4" }}
                  focused
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation || ""}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 6" }}
                  focused
                />
                <TextField
                  label="Phone Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phoneNumber || ""}
                  name="phoneNumber"
                  error={
                    Boolean(touched.phoneNumber) && Boolean(errors.phoneNumber)
                  }
                  helperText={touched.phoneNumber && errors.phoneNumber}
                  sx={{ gridColumn: "span 6" }}
                  focused
                />

               

                
                {/* <TextField
                  label="Password"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 12" }}
                /> */}
              

              {/* BUTTONS */}
              { isSnackBarMessage && (
                  <CustomSnackbar
                    title={isSnackBarMessage.title}
                    message={isSnackBarMessage.message}
                    openBar={isSnackBarMessage.openBar}
                    severity={isSnackBarMessage.severity}
                  />
                )}

              <Box  sx={{ gridColumn: "span 12", display: "flex", justifyContent: "flex-end" }}>
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
  )
}

export default EditForm