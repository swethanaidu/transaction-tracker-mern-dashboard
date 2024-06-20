import mongoose from "mongoose";

const OverallStatSchema = new mongoose.Schema(
    {
        totalUsers:  Number,
        totalTransactions: Number,
        totalExpectedBudget: Number,
        totalPaidExpenses: Number,
        year: Number,
        monthlyData: [
            {
                month: String,
                totalSales: Number,
                totalUnits: Number
            }
        ],
        dailyData: [
            {
                date: String,
                totalSales: Number,
                totalUnits: Number
            }
        ],
        ebc: [
            {
                name: String,
                totalSpent: Number,
                totalbudget: Number
            }
        ],
        expensesByCategory: {
            type: Map,
            of: Number
        },
        expectedBudgetByCategory: {
            type: Map,
            of: Number
        }
    },
    { timestamps: true}
)
const OverallStat = mongoose.model("OverallStat", OverallStatSchema);
export default OverallStat;
