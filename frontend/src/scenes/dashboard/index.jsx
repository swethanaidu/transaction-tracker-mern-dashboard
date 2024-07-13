import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Moment from "moment";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
 
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
// import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import { useGetOverallStatsQuery } from "../../slices/overallStatsApiSlice";
import Loader from "../../components/Loader";
import FoundationIcon from '@mui/icons-material/Foundation';
import EngineeringIcon from '@mui/icons-material/Engineering';
import WaterIcon from '@mui/icons-material/Water';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import ConstructionIcon from '@mui/icons-material/Construction';
import {
  getFormatedCurrency,
  getDataTruncate,
} from "../../components/common/Utils";
import LinearProgressWithLabel from "../../components/LinearProgressWithLabel";
import StatBankBox from "../../components/StatBankBox";
import TotalCostWithLinearPB from "../../components/widgets/TotalCostWithLinearPB";
import BankStatsWidget from "../../components/widgets/BankStatsWidget";
import CategoryStatsWidget from "../../components/widgets/CategoryStatsWidget";
import RecentTranscationsWidget from "../../components/widgets/RecentTranscationsWidget";
import { useGetUserBankExpensesDataQuery } from "../../slices/statsSlice";
import PieChart from "../../components/PieChart";
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data, isLoading } = useGetOverallStatsQuery();
  const { data:bankStats } = useGetUserBankExpensesDataQuery();
  
  // const totalcompletion = Math.round((data?.yearlyExpenseTotal / data?.totalPlannedBudget) * 100).toFixed(2);
  const totalcompletion = (
    (data?.yearlyExpenseTotal / data?.totalPlannedBudget) *
    100
  ).toFixed(2);
  //const sorttedTransactions = data?.transactions?.sort((a, b) => b.paidDate.localeCompare(a.paidDate))
  // sort((a, b) => new Date(a.paidDate) - new Date(b.paidDate))

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
    switch(data) {
      case "Borewell":  return <WaterIcon sx={{ color: colorVal, fontSize: "26px" }} />;
      case "Construction":  return <FoundationIcon sx={{ color: colorVal, fontSize: "26px" }} />;
      case "Additional civil work":  return <EngineeringIcon sx={{ color: colorVal, fontSize: "26px" }} />;
      case "Misc":  return <ConstructionIcon sx={{ color: colorVal, fontSize: "26px" }} />;
      default :  return <MiscellaneousServicesIcon sx={{ color: colorVal, fontSize: "26px" }} />;
  
    }
  }
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="" />
        {/* <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box> */}
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 5"
          gridRow="span 1"
          backgroundColor= {colors.blueAccent[700]}
          p="10px 30px"
        >
          <TotalCostWithLinearPB  yearlyExpenseTotal={data?.yearlyExpenseTotal} totalPlannedBudget={data?.totalPlannedBudget} />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Overview
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box> 
       
        <Box
          gridColumn="span 3"
          // gridRow="span 2"  
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          // gridAutoRows="140px"
          gap="20px"
          m="0"
          sx={{
            "& .MuiBox-root" : {
              margin: 0
            }
          }}
        >
          <BankStatsWidget data={bankStats} />
           
        </Box>
        {/* ROW 2 */}
        <Box
          gridColumn="span 5"
          gridRow="span 2"  
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          // gridAutoRows="140px"
          gap="20px"
          m="0"
          sx={{
            "& .MuiBox-root" : {
              margin: 0
            }
          }}
        >
          <CategoryStatsWidget data={data?.categoryData} />
           
        </Box>
        
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Monthly Transactions for the year 2024
              </Typography>
              {/* <Typography
                variant="h5"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                {getFormatedCurrency(data?.yearlyExpenseTotal)}
              </Typography> */}
            </Box>
            
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
       
      
      
        {/* ROW 3 */}

       
        <Box
          gridColumn="span 5"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          <RecentTranscationsWidget  data={data?.transactionsData} />
         
        </Box>
        <Box
          gridColumn="span 3"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Expense Breakdown by Category
          </Typography>
          <Box  mt="-20px">
            <PieChart isDashboard={true} />
          </Box>
        </Box> 

      </Box>
    </Box>
  );
};

export default Dashboard;
