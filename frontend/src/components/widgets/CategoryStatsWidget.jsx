import { tokens } from "../../theme";
import { getFormatedCurrency } from "../common/Utils";
import { Box, Typography, useTheme } from "@mui/material";
import Loader from "../Loader";
import FoundationIcon from "@mui/icons-material/Foundation";
import EngineeringIcon from "@mui/icons-material/Engineering";
import WaterIcon from "@mui/icons-material/Water";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import ConstructionIcon from "@mui/icons-material/Construction";
import StatBox from "../StatBox";

const CategoryStatsWidget = (data) => {
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
  const getIconComponent = (data, colorVal) => {
    switch (data) {
      case "Borewell":
        return <WaterIcon sx={{ color: colorVal, fontSize: "26px" }} />;
      case "Construction":
        return <FoundationIcon sx={{ color: colorVal, fontSize: "26px" }} />;
      case "Additional civil work":
        return <EngineeringIcon sx={{ color: colorVal, fontSize: "26px" }} />;
      case "Misc":
        return <ConstructionIcon sx={{ color: colorVal, fontSize: "26px" }} />;
      default:
        return (
          <MiscellaneousServicesIcon
            sx={{ color: colorVal, fontSize: "26px" }}
          />
        );
    }
  };
  if (!data?.data) return <Loader />;
  return (
    <>
      {data?.data &&
        data?.data.map((category, i) => (
          <Box
          key={`${category._id}-${i}`}
          backgroundColor={colors.primary[400]}
          gridColumn="span 6"
          alignItems="center"
          justifyContent="center"
          gap="0"
          p="20px 15px 15px"
          m="0"
        >
          <StatBox
            title={category?.totalExpenseAmount}
            subtitle={category?._id}
            progress={
              (category?.totalExpenseAmount / category?.plannedBudget) 
            }
            colorVal={dashboardColors[i]}
            increase={
              (
                (category?.totalExpenseAmount / category?.plannedBudget) *
                100
              ).toFixed(2) + "%"
            }
            icon={ getIconComponent(category?._id, dashboardColors[i]) }
          />
        </Box>
        ))}
    </>
  );
};

export default CategoryStatsWidget;
