import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from "../theme";
const ProgressCircle = ({ progress = "0.75", size = "85", colorVal }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const angle = progress * 360;
  return (
    <Box position="relative">
      <Box
        sx={{
          background: `radial-gradient(${colors.primary[400]} 62%, transparent 63%),
            conic-gradient(transparent 0deg ${angle}deg,  #727681 ${angle}deg 360deg),
            ${colorVal}`,
          borderRadius: "50%",
          width: `${size}px`,
          height: `${size}px`,
        }}
      />
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        width="55px"
        height="55px"
        borderRadius="50%"
        backgroundColor={colorVal}
        textAlign="center"
        pointerEvents="none"
        margin="auto !important"
        sx={{
          opacity: "0.15",
        }}
      ></Box>
      <Box
        position="absolute"
        top="60%"
        left="50%"
        color={colors.greenAccent[500]}
        textAlign="center"
        pointerEvents="none"
        sx={{
          transform: "translate(-50%, -100%)",
          mt: "15px",
        }}
      >
        <Typography variant="h6"
          fontStyle="italic"
          sx={{ color: colorVal }}>{(progress * 100).toFixed(2)}%</Typography>
      </Box>
    </Box>
  );
};

export default ProgressCircle;
