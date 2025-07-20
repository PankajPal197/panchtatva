import mongoose from "mongoose";

const BannerSchema = new mongoose.Schema({
  heading_1: {
    type: String,
    default: null,
  },
  heading_2: {
    type: String,
    default: null,
  },
  heading_3: {
    type: String,
    default: null,
  },
  image_name: {
    type: String,
    default: null,
  },
  sort_order: {
    type: Number,
    default: null,
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
    default: null,
  },
},
{timestamps:true}
);
export default mongoose.models.Banner ||
  mongoose.model("Banner", BannerSchema);