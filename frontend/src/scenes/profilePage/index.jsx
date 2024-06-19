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
import Header from "../../components/Header";
import { setCredentials } from '../../slices/authSlice';

import EditForm from "../team/EditForm";
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

const ProfilePage = () => {
  // console.log(pageType);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSnackBarMessage, setIsSnackBarMessage] = useState(
    initialValuesCustomSnackBar
  );
  
  // console.log(isSnackBarMessage);
  const { userInfo } = useSelector((state) => state.auth);
  // console.log(userInfo);
  const [updateProfile, { isLoading }] = useUpdateUserMutation();
  const [user, setUser] = useState(initialValuesUserProfile);

  useEffect(() => {
     setUser(userInfo);    
  }, [userInfo, user]);

  const submitProfileForm = async (values) => {
    // console.log(values);
    let res, obj1 = null;
    try {
     res = await updateProfile(values).unwrap();
     dispatch(setCredentials({...res}));
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
            message: `${res.name}, Your profile has been successfully updated`,
            openBar: true,
            severity: "success",
        };
        setIsSnackBarMessage(obj1);
    }
  };
  if(isLoading) return (<Loader />)
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="PROFILE SETTINGS" subtitle="You can update your profile" />
      </Box>
      
      <EditForm userInfo={userInfo}  isProfilePage={true} />
    </Box>
  );
};

export default ProfilePage;
