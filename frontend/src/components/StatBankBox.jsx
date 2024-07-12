import { Box, Typography, useTheme, ListItemIcon, List, ListItem ,ListItemText} from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";
import { getFormatedCurrency } from "./common/Utils";
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';

const StatBankBox = ({ data, icon, progress, colorVal }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
console.log(data);

const getIconComponent = (data, colorVal=colors.grey[100]) => {
  switch (data) {
    case "Savings":
      return <AccountBalanceWalletOutlinedIcon sx={{ color: colorVal}} />;
    case "FD":
      return <AccountBalanceOutlinedIcon sx={{ color: colorVal}} />;
    case "RD":
      return <AccountBalanceOutlinedIcon sx={{ color: colorVal}} />;
    case "Loan":
      return <SavingsOutlinedIcon sx={{ color: colorVal}} />;
    case "Credit Card":
        return <CreditCardOutlinedIcon sx={{ color: colorVal}} />;
    default:
      return (
        <MiscellaneousServicesIcon
          sx={{ color: colorVal, fontSize: "26px" }}
        />
      );
  }
};
  return (
    <Box width="100%" m="0 30px"  >
      <Box display="flex" justifyContent="space-between">
        <Box>
          {/* {icon} */}
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {data?._id}
          </Typography>
        </Box>
       
      </Box>
      {data?.Bank &&
        data?.Bank.map((bank, i) => (
          <Box
            key={`${bank.name}-${i}`}
             
          >
           <Typography
            variant="h6"
            // fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {bank.name}
          </Typography>
          {bank.Accounts &&
            bank.Accounts.map((ac, i) => (
              <Box
                key={`${ac.AccountNum}-${i}`}
                
              >
              {/* <Typography
                variant="h6"
                // fontWeight="bold"
                sx={{ color: colors.grey[100] }}
              >
                {ac.AccountNum}
              </Typography> */}
              <List dense={false} sx={{p:0,
                "& li": {
                  p: 0,
                }

              }}>
              
                <ListItem>
                  <ListItemIcon>
                    {getIconComponent(ac.AccountType)}
                  </ListItemIcon>
                  <ListItemText
                    primary= {ac.AccountType + " - " + getFormatedCurrency(ac.totalAmountSpent) }
                    secondary= {ac.AccountNum}
                  />
                </ListItem>
              
            </List>
              </Box>
            ))}
          </Box>
        ))}
      {/* <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5" sx={{ color: colorVal }}>
          {bank}
        </Typography>
        
      </Box> */}
    </Box>
  );
};

export default StatBankBox;