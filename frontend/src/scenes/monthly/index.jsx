import React from 'react'
import { Box } from '@mui/material'
import Loader from "../../components/Loader";
import Header from "../../components/Header";
// import BarChart from '../../components/BarChart';
// import PieChart from '../../components/PieChart';
import LineChart from '../../components/LineChart';
const MonthlyOverview = () => {
  return (
    <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="Monthly Overview Transactions" subtitle="Monthly expenses broken down by year" />
        </Box>
        <Box height="400px" m="40px 0 0 0">
            <LineChart isDashboard={false} />
          </Box>
    </Box>
  )
}

export default MonthlyOverview
