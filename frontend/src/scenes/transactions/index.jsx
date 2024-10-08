import { useMediaQuery, Box ,  useTheme, Typography} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import DataList from "./DataList";
import { getFormatedCurrency } from "../../components/common/Utils";
import { useState } from "react";

const TransactionsPage = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [total, setTotal] = useState(0);
  const [category, setCategory] = useState("");

  const handleCurrencydata = (data, ec) => {
    // console.log(ec);
    setTotal(data);
    setCategory(ec)
  }

  return (
    <Box m="20px">
      <Box  display={isNonMobile? "flex" :  "flex"} justifyContent="space-between" alignItems="center">
        <Header title="TRANSCATIONS" subtitle="Managing the Transactions data" />
        <Box m="0" textAlign="right">
        <Typography variant={isNonMobile? "h2" : "h5"} color={colors.grey[100]} sx={{ mb: "0px", fontWeight: "bold" }}>
          Total  
        </Typography>
        <Typography variant={isNonMobile? "h3" : "h5"} color={colors.grey[100]} sx={{ mb: isNonMobile ? "20px" : "0" }}>
        {category && category + " - "} { total ? getFormatedCurrency(total) : getFormatedCurrency(0)}  
        </Typography>
        </Box>
      </Box>
      <Box 
        mt="40px"
        display={isNonMobile? "grid" :  "block"} 
        gap="10px"
        gridTemplateColumns="repeat(12, minmax(0, 1fr))"
        // gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 12" },
        }}
      >
        
        <Box display={isNonMobile? "grid" :  "block"}  backgroundColor={colors.primary[400]}  p={isNonMobile? "20px 20px": "15px 10px"}  sx={{ gridColumn: "span 12" }}>
           
          <DataList handleCurrencydata={handleCurrencydata} />
        </Box>
       
       </Box>
    </Box>
  );
};

export default TransactionsPage;