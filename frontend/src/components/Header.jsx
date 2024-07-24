import { Typography, Box, useTheme, useMediaQuery } from "@mui/material";
import {tokens } from "../theme";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
    // console.log(theme);
    // console.log(colors);
  return (
    <Box>
      <Typography
        variant={isNonMobile ? "h2" : "h4" }
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={colors.grey[300]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
