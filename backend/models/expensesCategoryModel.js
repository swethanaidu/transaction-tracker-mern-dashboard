import mongoose from "mongoose";

const expensesCategorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true,
        },
        expectedBudget: {
            type: Number,
            required: true
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
        },
        workStatus: {
            type: String,
            enum: ["To do", "In progress", "In review", "Completed"],
            default: "To do"
        },
    },
    { timestamps: true}
);


const ExpensesCategory = mongoose.model("ExpensesCategory", expensesCategorySchema);
export default ExpensesCategory;