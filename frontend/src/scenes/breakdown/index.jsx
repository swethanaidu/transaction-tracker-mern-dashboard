import React from 'react'
import { Box } from '@mui/material'
import PieChart from '../../components/PieChart'
import Header from "../../components/Header";

const Breakdown = () => {
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="BREAKDOWN" subtitle="Breakdown of expense by Category" />
      <Box mt="40px" height="75vh">
        <PieChart />
      </Box>
    </Box>
  )
}

export default Breakdown