import mongoose from "mongoose";

const vendorSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String            
        },
        ecId: {type: mongoose.Types.ObjectId, ref: "ExpensesCategory"},
        vendorStatus:{
            type: String,
            enum: ["Active", "Inactive"],
            default: "Active"
        },
    },
    { timestamps: true}
);


const Vendor = mongoose.model("Vendor", vendorSchema);
export default Vendor;