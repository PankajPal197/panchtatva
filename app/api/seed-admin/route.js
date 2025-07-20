
import connectDB from '@/app/utils/Database';
import User from "@/app/Models/User";
import bcrypt from 'bcryptjs';

export async function GET() {
  await connectDB();
  const exists = await User.findOne({ email: "palshab197@gmail.com" });
  if (exists) return Response.json({ message: "Admin exists" });

  const hashed = await bcrypt.hash("palshab197", 10);
  await User.create({
    name: "Palshab197",
    email: "palshab197@gmail.com",
    password: hashed,
    role: "admin"
  });

  return Response.json({ message: "Admin created" });
}
