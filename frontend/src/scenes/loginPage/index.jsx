import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { tokens } from "../../theme";
import Form from "./Form";

const LoginPage = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={colors.greenAccent[700]}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          ADMINIS
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={colors.greenAccent[700]}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to ADMINIS, tack your expense in a easy way!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;