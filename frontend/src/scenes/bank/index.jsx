import { useMediaQuery, Box ,  useTheme, Typography} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import BankList from "./BankList";

const BankPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  return (
    <Box m="0">
      <Box 
        mt="0"
        display="grid"
        gap="10px"
        gridTemplateColumns="repeat(12, minmax(0, 1fr))"
        // gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 12" },
        }}
      >
        
        <Box display="grid" backgroundColor={colors.primary[400]} borderRadius="8px" p={isNonMobile? "20px 20px": "15px 10px"}  sx={{ gridColumn: "span 12" }}>
           
          <BankList />
        </Box>
       
       </Box>
    </Box>
  );
};

export default BankPage;