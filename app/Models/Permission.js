import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema({
  name: {String},
  description: {String},
});

export default mongoose.models.Permission ||
  mongoose.model("Permission", permissionSchema);
