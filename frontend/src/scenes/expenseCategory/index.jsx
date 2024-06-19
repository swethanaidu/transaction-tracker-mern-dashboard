import { useMediaQuery, Box ,  useTheme, Typography} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import ExpensesCategoriesList from "./ExpensesCatagoriesList";

const ExpenseCategoryPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  return (
    <Box m="20px">
      <Header title="EXPENSE CATEGORY" subtitle="Managing the Expense Category data" />
      <Box 
        mt="40px"
        display="grid"
        gap="10px"
        gridTemplateColumns="repeat(12, minmax(0, 1fr))"
        // gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 12" },
        }}
      >
        
        <Box display="grid" backgroundColor={colors.primary[400]} borderRadius="8px" p="20px 20px"  sx={{ gridColumn: "span 12" }}>
           <Typography variant="h4" color={colors.grey[100]} sx={{ mb: "20px" }}>
            Expenses Categories List
          </Typography>
          <ExpensesCategoriesList />
        </Box>
       
       </Box>
    </Box>
  );
};

export default ExpenseCategoryPage;