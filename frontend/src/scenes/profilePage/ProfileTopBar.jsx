import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Badge,
  Avatar, useTheme, Box
} from "@mui/material";
import { tokens } from "../../theme";
import { styled } from "@mui/material/styles";
import ProfileImage from "../../assets/user.png";
import wallpaper from "../../assets/wallpaper.jpg";
import LocationCityIcon from '@mui/icons-material/LocationCity';
import FlagIcon from '@mui/icons-material/Flag';
import { useSelector } from "react-redux";
import ProfileTabs from "./ProfileTabs";
const ProfileTopBar = ({handleTabChange}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { userInfo } = useSelector((state) => state.auth);
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      height: "12px",
      width: "12px",
      borderRadius: "50%",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));
  return (
    <>
      <Card sx={{ mt: "10px", backgroundColor: `${colors.primary[400]}`, }}>
        <CardMedia
          sx={{ height: 180 }}
          image={wallpaper}
          title="Profile"
        />
        <CardContent
          sx={{pb: "0"}}
        >
          <StyledBadge
            sx={{
              mt: "-55px",
              // position:"absolute"
            }}
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            <Avatar
              alt="Remy Sharp"
              sx={{ width: 83, height: 83,  position:"relative",
                "& img": {
                    zIndex:"1",
                    p: "2px",
                    
                },
                "&::before": {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "87px", height: "87px",
                    borderRadius: "50%",
                    content: '""',
                    backgroundColor: `${colors.primary[400]}`,
                  },

               }}
              src={ProfileImage}
            />
          </StyledBadge>
          <Typography gutterBottom variant="h3" component="div">
            {userInfo?.name}
          </Typography>
          <Typography variant="h5" color="text.secondary">
          
          </Typography>
          <Typography variant="h5" color="text.secondary">
          <Box display="flex" alignItems="center">
              {userInfo?.occupation}
             <LocationCityIcon sx={{ m: "5px 5px 10px 15px"}} /> {userInfo?.city}  
             <FlagIcon  sx={{ m: "5px 5px 10px 15px"}} /> {userInfo?.country}  
          
          </Box>
          </Typography>
        </CardContent>
        <CardActions sx={{
          p:"0",
        }}>
          <ProfileTabs handleTabChange={handleTabChange} />
        </CardActions>
      </Card>
    </>
  );
};

export default ProfileTopBar;
