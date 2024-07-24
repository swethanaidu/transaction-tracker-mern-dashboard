import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const Loader = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems:'center' }}>
      <CircularProgress 
        variant="indeterminate"
        disableShrink
        sx={{
          color:  '#308fe8',
          animationDuration: '550ms',
          position: 'absolute',
           
        }}
        size={40}
        thickness={4}
      />
    </Box>
  )
}

export default Loader