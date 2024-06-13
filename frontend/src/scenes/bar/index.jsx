import React from 'react'
import { Box } from '@mui/material'
import Loader from "../../components/Loader";
import Header from "../../components/Header";
import BarChart from '../../components/BarChart';
// import PieChart from '../../components/PieChart';
const Bar = () => {
  return (
    <Box m="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="Pie Chart" subtitle="simple Pie chart" />
        </Box>
        <Box>
          <BarChart />
        </Box>
    </Box>
  )
}

export default Bar