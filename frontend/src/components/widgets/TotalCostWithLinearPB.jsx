import { tokens } from '../../theme';
import { getFormatedCurrency } from '../common/Utils';
import LinearProgressWithLabel from '../LinearProgressWithLabel';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import Loader from '../Loader';
const TotalCostWithLinearPB = (data) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width:600px)");
    // console.log(data?.yearlyExpenseTotal);
    const totalcompletion = (
        (data?.yearlyExpenseTotal / data?.totalPlannedBudget) *
        100
      ).toFixed(2);
    if (!data?.yearlyExpenseTotal && !data?.totalPlannedBudget) return <Loader />
  return (
    <>
      <Typography
            variant="h5"
            color={colors.primary[100]}
            sx={{ mt: "5px" }}
            fontWeight="600"
          >
            Total Expenses Amount
          </Typography>
          <Box display="flex" flexDirection="row" alignItems="center" mt="0">
            <Box>
              <span>
                <svg
                  width={isNonMobile? "80" : "50" }
                  height={isNonMobile? "80" : "60" }
                  viewBox="0 0 80 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M31.8333 79.1667H4.16659C2.33325 79.1667 0.833252 77.6667 0.833252 75.8333V29.8333C0.833252 29 1.16659 28 1.83325 27.5L29.4999 1.66667C30.4999 0.833332 31.8333 0.499999 32.9999 0.999999C34.3333 1.66667 34.9999 2.83333 34.9999 4.16667V76C34.9999 77.6667 33.4999 79.1667 31.8333 79.1667ZM7.33325 72.6667H28.4999V11.6667L7.33325 31.3333V72.6667Z"
                    fill="white"
                  ></path>
                  <path
                    d="M75.8333 79.1667H31.6666C29.8333 79.1667 28.3333 77.6667 28.3333 75.8334V36.6667C28.3333 34.8334 29.8333 33.3334 31.6666 33.3334H75.8333C77.6666 33.3334 79.1666 34.8334 79.1666 36.6667V76C79.1666 77.6667 77.6666 79.1667 75.8333 79.1667ZM34.9999 72.6667H72.6666V39.8334H34.9999V72.6667Z"
                    fill="white"
                  ></path>
                  <path
                    d="M60.1665 79.1667H47.3332C45.4999 79.1667 43.9999 77.6667 43.9999 75.8334V55.5C43.9999 53.6667 45.4999 52.1667 47.3332 52.1667H60.1665C61.9999 52.1667 63.4999 53.6667 63.4999 55.5V75.8334C63.4999 77.6667 61.9999 79.1667 60.1665 79.1667ZM50.6665 72.6667H56.9999V58.8334H50.6665V72.6667Z"
                    fill="white"
                  ></path>
                </svg>
              </span>
            </Box>
            <Box width="100%" m="0 0 0 10px">
              <LinearProgressWithLabel progress={Math.round(totalcompletion)} />
              <Box>
                <Typography
                  variant="h6"
                  color={colors.primary[200]}
                  sx={{ margin: 0,
                    position: "absolute" }}
                  fontWeight="300"
                  // textAlign="right"
                >
                  {getFormatedCurrency(data?.yearlyExpenseTotal)} / {getFormatedCurrency(data?.totalPlannedBudget)}
                </Typography>
              </Box>
            </Box>
             
          </Box>   
    </>
  )
}

export default TotalCostWithLinearPB