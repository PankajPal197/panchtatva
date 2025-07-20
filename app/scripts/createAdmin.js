import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../Models/User'; // adjust path if needed

dotenv.config();

async function createAdmin() {
  await mongoose.connect(process.env.MONGODB_URI);

  const existing = await User.findOne({ email: "admin@example.com" });
  if (existing) {
    console.log("Admin already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash("palshab197", 10);
  await User.create({
    name: "Palshab197",
    email: "palshab197@gmail.com",
    password: hashedPassword,
    role: "admin"
  });

  console.log("Admin user created");
  mongoose.disconnect();
}

createAdmin();
