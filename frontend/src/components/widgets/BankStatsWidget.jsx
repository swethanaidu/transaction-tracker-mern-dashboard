import { tokens } from "../../theme";
import { Box, Typography, useTheme } from "@mui/material";
import StatBankBox from "../StatBankBox";

const BankStatsWidget = (data) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // console.log(data);
  const dashboardColors = [
    "#F3797E",
    "#CE4DDB",
    "#0D6EFD",
    "#FFC107",
    "#0DCAF0",
    "#AB2E3C",
    "#A59ADB",
    "#AF1763",
    "#198754",
  ];

  
  return (
    <>
      {data?.data &&
        data?.data.map((category, i) => (
          <Box
            key={`${category._id}-${i}`}
            backgroundColor={colors.primary[400]}
            gridColumn="span 12"
            alignItems="center"
            justifyContent="center"
            gap="0"
            p="20px 15px 15px"
            m="0"
            border={"1px solid " + dashboardColors[i]}
          >
            <StatBankBox
              data={category}
              colorVal={dashboardColors[i]}
            />
          </Box>
        ))}
    </>
  );
};

export default BankStatsWidget;
