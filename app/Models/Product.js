import mongoose from "mongoose";
import generateColorData from "../helper/colorHelper";
const colorSchema = new mongoose.Schema(
  {
    name: { type: String },
    hex: { type: String },
    rgb: { type: String },
    color_price: { type: Number, default: 0 },
    image: { type: String, default: null },
  },
  { _id: false }
);
const ProductSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      default: null,
    },
    category_id: {
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
    color: [colorSchema],
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 1,
    },
    extra_heading_2: {
      type: String,
      default: null,
    },
    extra_heading_3: {
      type: String,
      default: null,
    },
    extra_heading_4: {
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
colorSchema.pre("validate", function (next) {
  const generated = generateColorData(this);
  if (generated.name) this.name = generated.name;
  if (generated.hex) this.hex = generated.hex;
  if (generated.rgb) this.rgb = generated.rgb;
  next();
});
export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
