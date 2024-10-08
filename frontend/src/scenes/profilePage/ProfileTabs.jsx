import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import CategoryIcon from '@mui/icons-material/Category';

const ProfileTabs = ({handleTabChange}) => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const handleTabChange1 = (e, tabIndex) => {
    // console.log(tabIndex);
    setCurrentTabIndex(tabIndex);
    handleTabChange(tabIndex)
  };
 
  return (
    <>
      <Box sx={{ width: "100%"}}>
        <Tabs value={currentTabIndex} onChange={handleTabChange1}
            textColor="secondary"
            indicatorColor="secondary"
            variant="scrollable"
            scrollButtons="auto"
        >
          <Tab icon={<PermIdentityIcon />} label="Profile Update" />
          <Tab icon={<AccountBalanceOutlinedIcon />} label="Bank  Details" />
          <Tab icon={<PeopleAltOutlinedIcon />} label="Vendors Details" />
          <Tab icon={<ContactsOutlinedIcon />} label="Users Details" />
          <Tab icon={<CategoryIcon />} label="Expense Category" />
        </Tabs>

         
      </Box>
    </>
  );
};

export default ProfileTabs;
