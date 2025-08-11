import mongoose from "mongoose";
const BlogSchema = new mongoose.Schema(
  {
    blog_name: {
      type: String,
      default: null,
    },
    page_url: {
      type: String,
      default: null,
    },
    blog_date: {
      type: Date,
      default: null,
    },
    blog_author: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
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
    short_description: {
      type: String,
      default: null,
    },
    long_description: {
      type: String,
      default: null,
    },
    blog_image_1: {
      type: String,
      default: null,
    },
    blog_image_2: {
      type: String,
      default: null,
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
export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

// export default mongoose.model.Categories ||
//   mongoose.model("Categories", CategoriesSchema);
