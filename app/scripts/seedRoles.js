import dotenv from "dotenv";// ✅ Make sure this path is correct and file ends with .js
import Permission from "../Models/Permission.js";
import Roles from "../Models/Roles.js";
import connectDB from "../utils/Database.js";

dotenv.config();

const seedRoles = async () => {
  await connectDB();

  const permission = await Permission.create([
    { name: "create-user" },
    { name: "edit-user" },
    { name: "delete-user" },
  ]);

  const role = await Roles.create({
    name: "admin",
    permissions: permission.map((p) => p._id),
  });

  console.log("Seeded roles and permissions",role);
  process.exit(0);
};
seedRoles();
