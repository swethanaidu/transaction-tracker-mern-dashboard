import { useMediaQuery, Box ,  useTheme, Typography} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import UsersList from "../../components/UsersList";
import ExpensesCategoriesList from "../expenseCategory/ExpensesCatagoriesList";
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  return (
    <Box m="0">
      {/* <Header title="TEAM" subtitle="Managing the Team Members" /> */}
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
        <Box display="grid" backgroundColor={colors.primary[400]} borderRadius="8px" p="20px 20px"  sx={{ gridColumn: "span 12" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography variant="h4" mb="20px" sx={{ display:"flex", alignItems:"center"}}><ContactsOutlinedIcon sx={{mr: "10px"}} />Users List</Typography>
               
            </Box>
          <UsersList />
        </Box>
        {/* <Box display="grid" backgroundColor={colors.primary[400]} borderRadius="8px" p="20px 20px"  sx={{ gridColumn: "span 6" }}>
           <Typography variant="h4" color={colors.grey[100]} sx={{ mb: "20px" }}>
            Expenses Categories List
          </Typography>
          <ExpensesCategoriesList />
        </Box> */}
       
       </Box>
    </Box>
  );
};

export default Team;