import mongoose from "mongoose";
const ImageSchema = new mongoose.Schema(
  {
    image_title: {
      type: String,
      default: null,
    },
    product_id: {
      type: mongoose.Schema.Types.Mixed,
      default: 0,
      validate: {
        validator: function (v) {
          return v === 0 || mongoose.Types.ObjectId.isValid(v);
        },
        message: (props) => `${props.value} is not a valid ObjectId or 0`,
      },
    },
    image_name_1: {
      type: String,
      default:null
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    sort_order: {
      type: Number,
      default: null,
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
  { timestamps: true }
);
export default mongoose.models.Image || mongoose.model("Image", ImageSchema);
