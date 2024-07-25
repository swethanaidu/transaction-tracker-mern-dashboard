import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const Loader = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems:'center' , minHeight: "100px" }}>
      <CircularProgress 
        variant="indeterminate"
        disableShrink
        sx={{
          color:  '#308fe8',
          animationDuration: '650ms',
          position: 'absolute',
           
        }}
        size={40}
        thickness={4}
      />
    </Box>
  )
}

export default Loader