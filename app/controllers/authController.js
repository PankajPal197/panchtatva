import User from "../Models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "../utils/Database";
import Roles from "../Models/Roles";

const JWT_SECRET = process.env.JWT_SECRET || "!@$#%^";
const TOKEN_EXPIRES_IN = "1d";



export const register = async (req) => {
  try {
    await connectDB();

    const { name, email, password } = await req.json();

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return new Response(
        JSON.stringify({ success: false, message: "User already exists" }),
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Try to get default role (optional)
    const defaultRole = await Roles.findOne({ name: "User" });

    // Create user with or without role
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: defaultRole ? defaultRole._id : null,
    });

    return new Response(
      JSON.stringify({ success: true, user: newUser }),
      { status: 201 }
    );

  } catch (error) {
    console.error("Register Error:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Server error" }),
      { status: 500 }
    );
  }
};

export const login = async (req) => {
  await connectDB();
  const { email, password } = await req.json();

  const user = await User.findOne({ email }).populate({
    path: "role",
    populate: {
      path: "permissions",
    },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return new Response(
      JSON.stringify({ success: false, message: "Invalid credentials" }),
      { status: 400 }
    );
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
    expiresIn: TOKEN_EXPIRES_IN,
  });

  return new Response(JSON.stringify({ success: true, token, user }), {
    status: 200,
  });
};
