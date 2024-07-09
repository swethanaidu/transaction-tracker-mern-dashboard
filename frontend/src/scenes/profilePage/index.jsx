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
import ProfileFormPage from "./Form";
import ProfileTopBar from "./ProfileTopBar";
import ProfileTabContent from "./ProfileTabContent";

const ProfilePage = () => {
  // console.log(pageType);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const handleTabChange = (tabIndex) => {
    // console.log(tabIndex);
    setCurrentTabIndex(tabIndex);
  };
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="PROFILE SETTINGS" subtitle="You can update your profile" />
      </Box>
      <ProfileTopBar handleTabChange = {handleTabChange} />
      <ProfileTabContent currentTabIndex={currentTabIndex} />
      {/* <ProfileFormPage /> */}
    </Box>
  );
};

export default ProfilePage;
