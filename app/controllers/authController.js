import { NextResponse } from "next/server";
import User from "../Models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "../utils/Database";
import { cookies } from "next/headers";

export const register = async (req) => {
  try {
    const { name, email, password } = await req.json();
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        {
          message: "User already exists",
          success: false,
        },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser._id }, "!@$#", {
      expiresIn: "1d",
    });

    return NextResponse.json(
      {
        message: "User registered successfully",
        success: true,
        newUser,
        token,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Server Error",
        error: error.message,
      },
      { status: 500 }
    );
  }
};

// user login

export const login = async (req) => {
  try {
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid credentials",
          success: false,
        },
        { status: 401 }
      );
    }

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return NextResponse.json(
        {
          message: "Invalid credentials",
          success: false,
        },
        { status: 401 }
      );
    }

    // ✅ FIXED: use user._id, not user_id
    const token = jwt.sign({ id: user._id, role: user.role }, "!@$#%^", {
      expiresIn: "1d",
    });
    cookies().set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return NextResponse.json(
      {
        message: "Login successful",
        success: true,
        user,
        token,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Server Error",
        error: error.message,
      },
      { status: 500 }
    );
  }
};

// assign role
export const assignRole = async (req) => {
  try {
    await connectDB();
    const token = req.header.get("authorization")?.split(" ")[1];
    if (!token) return NextResponse.json({ error: "No Token" });

    const decoded = jwt.verify(token, "!@$#%^");
    if (decoded.role !== "admin")
      return NextResponse.json({ error: "unauthorized" });
    const { email, role } = await req.json();
    const { updated } = await User.findOneAndUpdate(
      { email },
      { role },
      { new: true }
    );
    return NextResponse.json({ message: "Role Assigned", user: updated });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
};
