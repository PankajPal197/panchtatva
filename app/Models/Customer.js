import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
  {
    reference_id: {
      type: String,
      default: null,
    },
    customer_name: {
      type: String,
      required: true,
      trim: true,
    },
    customer_email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    customer_phone: {
      type: String,
      default: null,
    },
    customer_password: {
      type: String,
      required: true,
    },

    // ✅ Address
    address_line_1: { type: String, default: null },
    address_line_2: { type: String, default: null },
    customer_city: { type: String, default: null },
    customer_state: { type: String, default: null },
    customer_country: { type: String, default: null },
    customer_pincode: { type: String, default: null },

    customer_company_name: { type: String, default: null },
    customer_gst_no: { type: String, default: null },

    authToken: { type: String, default: null }, // JWT or session token
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },

    account_status: {
      type: String,
      enum: ["active", "inactive", "suspended", "deleted"],
      default: "active",
    },

    ip_address: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.models.Customer ||
  mongoose.model("Customer", CustomerSchema);
