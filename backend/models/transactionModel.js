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
        vendorId: {type: mongoose.Types.ObjectId, ref: "vendor"},
        bankId: {type: mongoose.Types.ObjectId, ref: "bank"},
        cost: {
            type: Number,
            required: true
        },
        paidDate: {
            type: Date,
            default: Date.now()
        },
        paymentMode: {
            type: String,
            enum: ["UPI", "Cash", "NEFT", "IMPS", "RTGS", "Transfer Within Bank", "Others"],
            default: "NEFT"
        },
        vendorPaymentType: {
            type: String,
            enum: ["Direct", "Individual"],
            default: "Direct"
        },
        vendorIndivdualName: {
            type: String,
        },
        status: {
            type: String,
            enum: ["Completed", "Pending", "Canceled"],
            default: "Completed"
        },
    },
    { timestamps: true}
);


const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;