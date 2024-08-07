import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"; 
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"; 
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import { useSelector, useDispatch } from "react-redux";
import profileImage from '../../assets/user.png'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

// import "react-pro-sidebar/dist/css/styles.css";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      component={<Link to={to} />}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const SidebarMenu = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const { userInfo } = useSelector((state) => state.auth)
  const isNonMobile = useMediaQuery("(min-width:600px)");
  // console.log(userInfo);
  // console.log("toggled " + toggled);
  // console.log("isCollapsed " + isCollapsed);
  const handleCollapse = () => { 
   
    setIsCollapsed(!isCollapsed);
    // setToggled("false")
    
  }
  if (!userInfo) return(<></>);
  return (
    <Box
      sx={{
        "& .ps-sidebar-root": {
          background: `${colors.primary[400]} !important`,
          borderColor: `${colors.primary[400]} !important`,
          height: "100%",
        },
        "& .ps-sidebar-container": {
          backgroundColor: "transparent !important",
          
        },
        "& .ps-menu-root .ps-menu-button": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .MuiBox-root": {
          padding: 0,
        },
        "& .ps-menu-root .ps-menu-button:hover": {
          backgroundColor: "#2e7c67 !important",
        },
        "& .ps-menu-button.ps-active": {
          backgroundColor: "#2e7c67 !important",
        },
      }}
    >
      {!isNonMobile && 
      <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      ml="15px"
      mt="20px"
      position="absolute"
    >
      <IconButton onClick={() => {setToggled(!toggled);  }}>
                  <MenuOutlinedIcon />
                </IconButton>
      <Typography variant="h3" color={colors.grey[100]}>
      T&E Tracker
      </Typography>
       
    </Box>
      
}
      <Sidebar collapsed={isCollapsed}
      // sx={{ height: "100vh" }}
      breakPoint="md"
      toggled={toggled}
      // transitionDuration={800}
         onBackdropClick={() =>{  !isNonMobile && setToggled(!toggled)}}  
        // breakPoint={isNonMobile && "always"}
      >
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => isNonMobile ? setIsCollapsed(!isCollapsed) : setToggled(!toggled)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 10px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                T&E Tracker
                </Typography>
                {isNonMobile && 
                <IconButton onClick={() => handleCollapse()}>
                  <MenuOutlinedIcon  />
                </IconButton>
                }
                {!isNonMobile && 
                  <IconButton onClick={() =>{ setToggled(!toggled)}}>
                  <CloseOutlinedIcon />
                </IconButton>
                }
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px"
            sx= { {
              display: !isNonMobile ? "flex" : "block",
              marginLeft: !isNonMobile ? "30px" : "0",
              alignItems: "center"
            }}  
            >
              
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width={isNonMobile ? "100px": "40px" }
                  height={isNonMobile ? "100px": "40px" }
                  src={profileImage}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
             
              <Box textAlign={isNonMobile ? "center" : "left"} ml={!isNonMobile && "20px"}>
                <Typography
                  variant={isNonMobile ? "h2" : "h5"}
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: isNonMobile ? "10px 0 0 0" : "0", textTransform: "capitalize" }}
                >
                  {userInfo ?  userInfo.name : "Aryan"}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}
                  sx={{textTransform: "capitalize"}}
                >
                  {userInfo ?  userInfo.role : "User"}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/admin"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography> */}
            <Item
              title="Manage Transactions"
              to="/transactions"
              icon={<PointOfSaleIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Item
              title="Expense Category"
              to="/expenseCategory"
              icon={<CategoryIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            {/* <Item
              title="Manage Team"
              to="/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>
            <Item
              title="Expense Breakdown"
              to="/breakdown"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Overview Difference"
              to="/overview"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Monthly Overview"
              to="/monthly"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Item
              title="Geography Chart"
              to="/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
          </Box>

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography>
            <Item
              title="Profile Form"
              to="/profile"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

           
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SidebarMenu;