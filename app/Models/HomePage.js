import mongoose from "mongoose";

const homePageSchema = new mongoose.Schema(
  {
    m_id: {
      type: Number,
      default: null,
    },
    section_name: {
      type: String,
      default: null,
    },
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
    short_content_1: {
      type: String,
      default: null,
    },
    short_content_2: {
      type: String,
      default: null,
    },
    long_content_1: {
      type: String,
      default: null,
    },
    long_content_2: {
      type: String,
      default: null,
    },
    image_1: {
      type: String,
      default: null,
    },
    image_2: { type: String, default: null },
    sort_order: {
      type: Number,
      default: null,
    },
    delete_status: {
      type: String,
      enum: ["active", "deleted"],
      default: "active",
    },
    status: {
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

export default mongoose.models.homePage ||
  mongoose.model("homePage", homePageSchema);
