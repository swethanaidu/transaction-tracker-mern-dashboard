import { Box, Tab, Tabs, Typography, useTheme , useMediaQuery} from "@mui/material";
import { useState } from "react";
import ProfileFormPage from "./Form";
import { tokens } from "../../theme";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import BankPage from "../bank";
import VendorPage from "../vendor";
import Team from "../team";
import ExpenseCategoryPage from "../expenseCategory";
const ProfileTabContent = (currentTabIndex) => {
  // console.log(currentTabIndex);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const TabVal = currentTabIndex.currentTabIndex;
  const isNonMobile = useMediaQuery("(min-width:600px)");
  // console.log(TabVal);

  return (
    <>
      <Box backgroundColor={colors.primary[400]} borderRadius="2px" p="0"  mt="30px" sx={{ width: "100%"}}>

        {/* TAB 1 Contents */}
        {TabVal === 0 && (
          <Box sx={{ p: 3 }}>
            <Typography variant={isNonMobile? "h4": "h6"} mb="20px" sx={{ display:"flex", alignItems:"center"}}><PermIdentityIcon sx={{mr: "10px"}} /> Profile Update</Typography>
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

         {/* TAB 4 Contents */}
         {TabVal === 3 && (
          <Box sx={{ p: 0 }}>
             <Team />
          </Box>
        )}
         {/* TAB 5 Contents */}
         {TabVal === 4 && (
          <Box sx={{ p: 0 }}>
             <ExpenseCategoryPage />
          </Box>
        )}

        
      </Box>
    </>
  );
};

export default ProfileTabContent;
