import mongoose from "mongoose";

const transactionSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String            
        },
        userId: {type: mongoose.Types.ObjectId, ref: "User"},
        ecId: {type: mongoose.Types.ObjectId, ref: "ExpensesCategory"},
        cost: {
            type: Number,
            required: true
        },
        paidDate: {
            type: Date,
            default: Date.now()
        },
        status: {
            type: String,
            enum: ["Paid", "Pending"],
            default: "Paid"
        },
    },
    { timestamps: true}
);


const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;