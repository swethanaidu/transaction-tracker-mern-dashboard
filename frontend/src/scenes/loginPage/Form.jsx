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
import { useLoginMutation, useRegisterMutation } from "../../slices/userApiSlice";
import { setCredentials } from '../../slices/authSlice';
import Loader from "../../components/Loader";
import  CustomSnackbar  from '../../components/CustomSnackbar'

 

const registerSchema = yup.object().shape({
  name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  city: yup.string().required("required"),
  state: yup.string().required("required"),
  country: yup.string().required("required"),
  occupation: yup.string().required("required"),
  phoneNumber: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  name: "",
  email: "",
  password: "",
  city: "",
  state: "",
  country: "",
  occupation: "",
  phoneNumber: 0,
  transactions: [],
  role: "user"
};

const initialValuesLogin = {
  email: "",
  password: "",
};
const initialValuesCustomSnackBar = {
  title:"",
  message:"",
  openBar: false,
  severity:""
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  // console.log(pageType);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const [isErrorSnackBarMessage, setIsErrorSnackBarMessage] = useState(initialValuesCustomSnackBar);
  // console.log(isErrorSnackBarMessage);
  const [login, { isLoading }] = useLoginMutation();
  const [register, {isLoadingData} ] = useRegisterMutation();
  const { userInfo} = useSelector((state) => state.auth)
  // console.log(initialValuesRegister);
  useEffect(() => {
    if(userInfo) {
      navigate('/admin');
    }
  }, [navigate, userInfo])
 

  const submitForm =  async ( values, onSubmitProps) => {
    
    let res = null;
    try {
      if (isLogin) {
         res = await login(values).unwrap();
      }
      if (isRegister) {
         res = await register(values).unwrap();
      }
      dispatch(setCredentials({...res}));
      navigate("/admin");
      
    } catch (err) {
      console.log(err?.data?.message || err.error);  
      let obj1 =  {
        title:"Error",
        message:err?.data?.message || err.error,
        openBar:true,
        severity:"error"
      }
      setIsErrorSnackBarMessage(obj1)
    }
    onSubmitProps.resetForm();
  };

  return (
    <Formik
      onSubmit={submitForm}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
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
              "& > div": { gridColumn: isNonMobile ? undefined : "span 12" },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="Full Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name || ""}
                  name="name"
                  error={
                    Boolean(touched.name) && Boolean(errors.name)
                  }
                  helperText={touched.name && errors.name}
                  sx={{ gridColumn: "span 12" }}
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
                />
                <TextField
                  label="phoneNumber"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phoneNumber || ""}
                  name="phoneNumber"
                  error={
                    Boolean(touched.phoneNumber) && Boolean(errors.phoneNumber)
                  }
                  helperText={touched.phoneNumber && errors.phoneNumber}
                  sx={{ gridColumn: "span 6" }}
                />
                 
              </>
            )}
            {isErrorSnackBarMessage.message && (
              <CustomSnackbar 
                  title= {isErrorSnackBarMessage.title}
                  message={isErrorSnackBarMessage.message}
                  openBar={isErrorSnackBarMessage.openBar}
                  severity={isErrorSnackBarMessage.severity}
              />
            )}
            
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 12" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 12" }}
            />
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: colors.blueAccent[900],
                color: colors.grey[100],
                "&:hover": { color: colors.primary.main },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            {isLoading && <Loader /> }
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: colors.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: colors.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;