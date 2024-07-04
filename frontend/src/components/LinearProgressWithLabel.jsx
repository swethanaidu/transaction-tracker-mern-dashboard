import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from "../theme";
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const LinearProgressWithLabel = ({ progress = 75, size = "40" }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const angle = progress * 360;
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: colors.grey[theme.palette.mode === 'light' ? 200 : 300]+'75',
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#fff',
    },
  }));

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <BorderLinearProgress variant="determinate" value={progress} />
      </Box>
      <Box sx={{ minWidth: 28 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          progress,
        )}%`}</Typography>
      </Box>
    </Box>
  );
};

export default LinearProgressWithLabel;