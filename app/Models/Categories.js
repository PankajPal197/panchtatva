import mongoose from "mongoose";
const CategoriesSchema = new mongoose.Schema(
  {
    category_name: {
      type: String,
      default: null,
    },
    parent_category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    page_url: {
      type: String,
      default: null,
    },
    extra_heading_1: {
      type: String,
      default: null,
    },
    extra_heading_2: {
      type: String,
      default: null,
    },
    extra_heading_3: {
      type: String,
      default: null,
    },
    seo_title: {
      type: String,
      default: null,
    },
    seo_description: {
      type: String,
      default: null,
    },
    seo_keywords: {
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
    image_name_1: {
      type: String,
      default: null,
    },
    image_name_2: {
      type: String,
      default: null,
    },
    image_name_3: {
      type: String,
      default: null,
    },
    image_name_4: {
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
    sort_order: {
      type: Number,
      default: null,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    home_status: {
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
  { timestamps: true }
);
export default mongoose.models.Categories ||
  mongoose.model("Categories", CategoriesSchema);

// export default mongoose.model.Categories ||
//   mongoose.model("Categories", CategoriesSchema);
