import {
  Box,
  Typography,
  useTheme,
  ListItemIcon,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Collapse,
  ListItemButton,
} from "@mui/material";
import { tokens } from "../theme";
import { useState } from "react";
import { getFormatedCurrency } from "./common/Utils";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const StatBankBox = ({ data, icon, progress, colorVal }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // console.log(data);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState("");
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();

  const handleClick = (index) => (event) => {
    // console.log(index);
    if (selectedIndex === index) {
      setSelectedIndex("");
    } else {
      setSelectedIndex(index);
    }
  };

  // const open = Boolean(anchorEl);
  // const id = open ? 'simple-popper' : undefined;

  const getIconComponent = (data) => {
    switch (data) {
      case "Savings":
        return (
          <AccountBalanceWalletOutlinedIcon
          // sx={{ color: colorVal}}
          />
        );
      case "FD":
        return (
          <AccountBalanceOutlinedIcon
          // sx={{ color: colorVal}}
          />
        );
      case "RD":
        return (
          <AccountBalanceOutlinedIcon
          // sx={{ color: colorVal}}
          />
        );
      case "Loan":
        return (
          <SavingsOutlinedIcon
          // sx={{ color: colorVal}}
          />
        );
      case "Credit Card":
        return (
          <CreditCardOutlinedIcon
          // sx={{ color: colorVal}}
          />
        );
      default:
        return (
          <MiscellaneousServicesIcon
            sx={{ color: colorVal, fontSize: "26px" }}
          />
        );
    }
  };
  return (
    <Box width="100%" m="0 30px">
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
          <Box key={`${bank.name}-${i}`}>
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
                  // sx={{ cursor: "pointer" }}
                >
                  {/* <Typography
                variant="h6"
                // fontWeight="bold"
                sx={{ color: colors.grey[100] }}
              >
                {ac.AccountNum}
              </Typography> */}
                  <List
                    dense={false}
                    sx={{
                      p: 0,
                      "& .MuiListItemButton-root": {
                        p: 0,
                      },
                    }}
                  >
                    <ListItemButton
                      onClick={handleClick(`${ac.AccountNum}-${i}`)}
                    >
                      <ListItemIcon>
                        <Avatar sx={{ bgcolor: colorVal }}>
                          {getIconComponent(ac.AccountType)}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          ac.AccountType +
                          " - " +
                          getFormatedCurrency(ac.totalAmountSpent)
                        }
                        secondary={ac.AccountNum}
                      />
                      {`${ac.AccountNum}-${i}` === selectedIndex ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )}
                    </ListItemButton>
                    <Collapse
                      in={`${ac.AccountNum}-${i}` === selectedIndex}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List
                        component="div"
                        dense="true"
                        disablePadding
                        sx={{
                          "& li": {
                            p: "0 0 0 56px",
                          },
                        }}
                      >
                        {/* <Divider /> */}
                        <ListItem>
                          <ListItemText
                            primary={
                              "Total amount Spent - " +
                              getFormatedCurrency(ac.totalAmountSpent)
                            }
                          />
                        </ListItem>
                        <ListItem>
                          <ListItemText
                            primary={
                              "Total no. of trans. - " + ac.totalTransactions
                            }
                          />
                        </ListItem>
                        <ListItem>
                          {ac.AccountType === "Loan" ? (
                            <ListItemText
                              primary={
                                "Loan Balance - " +
                                getFormatedCurrency(ac.currentBalance-ac.totalAmountSpent)
                              }
                            />
                          ) : (
                            <ListItemText
                              primary={
                                "Inital Amount - " +
                                getFormatedCurrency(ac.currentBalance)
                              }
                            />
                          )}
                        </ListItem>
                      </List>
                    </Collapse>
                  </List>
                </Box>
              ))}
          </Box>
        ))}
    </Box>
  );
};

export default StatBankBox;
