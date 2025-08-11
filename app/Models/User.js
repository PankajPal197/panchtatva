import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      default: null,
    },
    permissions: [String],
  },
  { timestamps: true }
);
// export default mongoose.models.User || mongoose.model("User", userSchema);
const User = mongoose.models?.User || mongoose.model("User", userSchema);
export default User;
