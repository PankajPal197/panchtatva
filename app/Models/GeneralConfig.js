import mongoose from "mongoose";

const General_config_Schema = new mongoose.Schema(
  {
    website_name: {
      type: String,
      default: null,
    },

    phone_no: {
      type: String,
      default: null,
    },
    email_ids: {
      type: String,
      default: null,
    },
    whats_phone_no: {
      type: String,
      default: null,
    },
    google_map_url: {
      type: String,
      default: null,
    },
    facebok_url: {
      type: String,
      default: null,
    },
    insta_url: {
      type: String,
      default: null,
    },
    twitter_url: {
      type: String,
      default: null,
    },
    linkedin_url: {
      type: String,
      default: null,
    },
    youtube_url: {
      type: String,
      default: null,
    },
    address_1: {
      type: String,
      default: null,
    },
    address_2: {
      type: String,
      default: null,
    },
    home_title: {
      type: String,
      default: null,
    },
    home_desc: {
      type: String,
      default: null,
    },
    home_keyword: {
      type: String,
      default: null,
    },
    header_logo: {
      data: Buffer,
      contentType: String,
      // default: null,
    },
    footer_logo: {
      type: Buffer,
      contentType: String,
      // default: null,
    },
    fav_icon_logo: {
      type: Buffer,
      contentType: String,
      // default: null,
    },
    apple_icon_logo: {
      type: Buffer,
      contentType: String,
      // default: null,
    },
    state_name: {
      type: String,
      default: null,
    },
    city_name: {
      type: String,
      default: null,
    },
    region_name: {
      type: String,
      default: null,
    },
    icbm: {
      type: String,
      default: null,
    },
    copyright_line: {
      type: String,
      default: null,
    },
    gm_short_link: {
      type: String,
      default: null,
    },
    price_range: {
      type: String,
      default: null,
    },
    geo_position: {
      type: String,
      default: null,
    },
    geo_lattitude: {
      type: String,
      default: null,
    },
    geo_longitude: {
      type: String,
      default: null,
    },

    rating_value: {
      type: String,
    },
    best_rating: {
      type: String,
    },
    rating_count: {
      type: String,
    },
    pincode: {
      type: String,
    },
    open_hours: {
      type: String,
    },
    header_script: {
      type: Buffer,
    },
    body_script: {
      type: Buffer,
    },
    xml_cate: {
      type: String,
      enum: ["checked", "unchecked", "uncheked"],
    },
    xml_city: {
      type: String,
      enum: ["checked", "unchecked", "uncheked"],
    },
    robots: {
      type: String,
      enum: ["checked", "unchecked", "uncheked"],
    },
    notification_id: {
      type: String,
    },
    admin_panel_status: {
      type: String,
      enum: ["active", "inactive","active"],
    },
    chat_bot_status: {
      type: String,
      enum: ["active", "inactive","active"],
      default: "active",
    },
    app_access_status: {
      type: String,
      enum: ["active", "inactive","active"],
    },
    app_access_mode: {
      type: String,
      enum: ["test", "live","test"],
    },
    app_notification_status: {
      type: String,
      enum: ["active", "inactive","active"],
    },
  },
  { timestamps: true }
);
export default mongoose.models.GeneralConfig ||
  mongoose.model("GeneralConfig", General_config_Schema);
