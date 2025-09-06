import mongoose from "mongoose";

const EnquirySchema = new mongoose.Schema(
  {
    customer_name: {
      type: String,
      default: null,
    },
    customer_email: {
      type: String,
      require:true,
      unique:true,
    },
    customer_phone: {
      type: Number,
      default: 1,
      require:true
    },
     subject: {
      type: String,
      default: null,
    },
     message: {
      type: String,
      default: null,
    },
     enquiry_page: {
      type: String,
      default: null,
    },
    delete_status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);
export default mongoose.models.Enquiry || mongoose.model("Enquiry", EnquirySchema);
