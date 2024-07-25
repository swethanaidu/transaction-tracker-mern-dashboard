import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";
import { getFormatedCurrency } from "./common/Utils";

const StatBox = ({ title, subtitle, icon, progress, colorVal, budget }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          {icon}
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {getFormatedCurrency(title)}
          </Typography>
          <Typography
            variant="p"
            fontWeight="300"
            color={colors.primary[200]}
            fontSize="11px"
          >
           Budget: {getFormatedCurrency(budget)}
          </Typography>
        </Box>
        <Box sx={{position:"relative", top:"12px"}}>
          <ProgressCircle progress={progress} colorVal={colorVal} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h6" sx={{ color: colorVal }}>
          {subtitle}
        </Typography>
        {/* <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: colors.greenAccent[600] }}
        >
          {increase}
        </Typography> */}
      </Box>
    </Box>
  );
};

export default StatBox;