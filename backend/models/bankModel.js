import mongoose from "mongoose";

const bankSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        accountNumber:  {
            type: String,
            required: true
        },
        accountType: {
            type: String,
            enum: ["Savings", "Loan", "FD", "RD"],
            default: "Savings"
        },
        userId: {type: mongoose.Types.ObjectId, ref: "User"},
        amount: {
            type: Number,
            required: true,
            default: 0
        },
        bankStatus:{
            type: String,
            enum: ["Active", "Inactive"],
            default: "Active"
        },
    },
    { timestamps: true}
);


const Bank = mongoose.model("Bank", bankSchema);
export default Bank;