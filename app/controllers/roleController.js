import Roles from "../Models/Roles";
import User from "../Models/User";
import connectDB from "../utils/Database";

export const createRole = async (req) => {
  await connectDB();
  const { name, permissions } = await req.json();
  const role = await Roles.create({ name, permissions });
  return Response.json({ success: true, role });
};

export const assignRole = async (req) => {
  await connectDB();
  const { userId, roleName } = await req.json();
  const role = await Roles.findOne({ name: roleName });
  if (!role) return Response.json({ success: false, msg: "Role not found" });

  const user = await User.findByIdAndUpdate(userId, {
    role: roleName,
    permissions: role.permissions,
  });
  return Response.json({ success: true, user });
};