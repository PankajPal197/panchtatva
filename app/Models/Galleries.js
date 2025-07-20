import mongoose from "mongoose";

const GalleriesSchema = new mongoose.Schema({
  gallery_title: {
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
export default mongoose.models.Gallery ||
  mongoose.model("Gallery", GalleriesSchema);