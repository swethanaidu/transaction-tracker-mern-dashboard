import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";
import { getFormatedCurrency } from "./common/Utils";

const StatBankBox = ({ title, subtitle, icon, progress, colorVal }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px"  >
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {getFormatedCurrency(title)}
          </Typography>
        </Box>
       
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5" sx={{ color: colorVal }}>
          {subtitle}
        </Typography>
        
      </Box>
    </Box>
  );
};

export default StatBankBox;