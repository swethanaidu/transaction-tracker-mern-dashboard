import {
  Box,
  IconButton,
  useTheme,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import { useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Logout, Settings } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import { useLogoutMutation } from "../../slices/userApiSlice";
import { logout } from "../../slices/authSlice";
import { useNavigate, Link } from "react-router-dom";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const colorMode = useContext(ColorModeContext);
  // const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const isOpenAnchorEl = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    // console.log(userInfo);
    // alert("hi")
    try {
      //console.log(userInfo);
      await logoutApiCall().unwrap();
      //console.log(userInfo);
      dispatch(logout());
      handleClose();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  const renderProfileMenu = (
    <Menu
      anchorEl={anchorEl}
      open={open}
     
      onClose={handleClose}
      // onClick={handleClose}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      MenuListProps={{
        "aria-labelledby": "btn-profile"
      }}
    >
      <MenuItem  
          onClick={() => {
            navigate("/profile");
            handleClose();
          }}
      >
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        Profile Settings
      </MenuItem>
      <MenuItem onClick={logoutHandler}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo) return <></>;

  // console.log(anchorEl);
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase id="searchBar" sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <Tooltip
          title={
            theme.palette.mode === "light"
              ? "Light Mode Settings"
              : "Dark Mode Settings"
          }
          arrow
        >
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "light" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>
        </Tooltip>
        <Tooltip title="Notifications" arrow>
          <IconButton>
            <NotificationsOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Settings" arrow>
          <IconButton 
          onClick={() => {
            navigate("/profile");
          }}
          >
            <SettingsOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Profile" arrow>
          <IconButton id="btn-profile" onClick={handleClick}>
            <PersonOutlinedIcon />
          </IconButton>
        </Tooltip>

       
      </Box>
      {anchorEl && renderProfileMenu}
      
    </Box>
  );
};

export default Topbar;
