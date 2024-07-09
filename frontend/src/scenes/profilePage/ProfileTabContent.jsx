import { Box, Tab, Tabs, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import ProfileFormPage from "./Form";
import { tokens } from "../../theme";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import BankPage from "../bank";
import VendorPage from "../vendor";
const ProfileTabContent = (currentTabIndex) => {
  // console.log(currentTabIndex);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const TabVal = currentTabIndex.currentTabIndex;
  // console.log(TabVal);

  return (
    <>
      <Box backgroundColor={colors.primary[400]} borderRadius="2px" p="0"  mt="30px" sx={{ width: "100%"}}>

        {/* TAB 1 Contents */}
        {TabVal === 0 && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h4" mb="20px" sx={{ display:"flex", alignItems:"center"}}><PermIdentityIcon sx={{mr: "10px"}} /> Profile Update</Typography>
            <ProfileFormPage />
          </Box>
        )}

        {/* TAB 2 Contents */}
        {TabVal === 1 && (
          <Box sx={{ p: 0 }}>
             <BankPage />
          </Box>
        )}

        {/* TAB 3 Contents */}
        {TabVal === 2 && (
          <Box sx={{ p: 0 }}>
             <VendorPage />
          </Box>
        )}

        
      </Box>
    </>
  );
};

export default ProfileTabContent;
