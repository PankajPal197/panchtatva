import mongoose from "mongoose";

const CitySchema = new mongoose.Schema(
  {
    city_name: {
      type: String,
      default: null,
    },
    page_url: {
      type: String,
      default: null,
    },
    sort_order: {
      type: Number,
      default: 1,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    delete_status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    delete_by: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
export default mongoose.models.Cities || mongoose.model("Cities", CitySchema);
