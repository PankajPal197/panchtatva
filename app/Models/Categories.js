import mongoose from "mongoose";
const CategoriesSchema = new mongoose.Schema(
  {
    category_name: {
      type: String,
      default: null,
    },
    parent_category_id: {
      type: mongoose.Schema.Types.Mixed,
      default: 0,
      validate: {
        validator: function (v) {
          return v === 0 || mongoose.Types.ObjectId.isValid(v);
        },
        message: (props) => `${props.value} is not a valid ObjectId or 0`,
      },
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
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
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
      default: "inactive",
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
