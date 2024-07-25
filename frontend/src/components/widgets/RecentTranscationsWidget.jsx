import { tokens } from "../../theme";
import { getFormatedCurrency, getDataTruncate } from "../common/Utils";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Loader from "../Loader";
import Moment from "moment";

const RecentTranscationsWidget = (data) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width:600px)");
    // console.log(data);
  if (!data?.data) return <Loader />;
  return (
    <>
      {data?.data.map((transaction, i) => (
            <Box
              key={`${transaction._id}-${i}`}
              display="grid"
              gridTemplateColumns="repeat(12, 1fr)"
              gap={isNonMobile? "20px": "5px"}
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
              mb="0 !important"
              
              sx={ { 
                "& .MuiBox-root": {
                  marginBottom:!isNonMobile && 0,
                 }
                  
              }}
            >
              <Box gridColumn={isNonMobile? "span 6" : "span 5" }>
                <Typography
                  color={colors.greenAccent[500]}
                  variant={isNonMobile? "h5": "h6"}
                  fontWeight="600"
                >
                  {getDataTruncate(transaction.title)}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.ecName}
                </Typography>
              </Box>
              <Box gridColumn={isNonMobile? "span 2" : "span 3" } color={colors.grey[100]}>
                {Moment(transaction.paidDate).utc().format("DD/MM/YY")}
              </Box>
              <Box gridColumn="span 4">
                <Box
                  backgroundColor={colors.greenAccent[600]}
                  p="5px 10px"
                  borderRadius="4px"
                  sx={{
                    float: "right",
                  }}
                >
                  {getFormatedCurrency(transaction.cost)}
                </Box>
              </Box>
            </Box>
          ))}  
    </>
  )
}

export default RecentTranscationsWidget