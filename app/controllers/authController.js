import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Customer from "../Models/Customer";

export const register = async (req) => {
  const { name, email, password,phone } = await req.json();
  try {
    let user = await Customer.findOne({ email });

    if (user)
      return NextResponse.json({
        message: "Customer Already Exist",
        success: false,
      });
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashedPassword });
    return NextResponse.json({
      message: "User Regisiter Successfully",
      user,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// user login
export const login = async (req) => {
  const { email, password } = await req.json();
  try {
    let user = await Customer.findOne({ email });
    if (!user)
      return NextResponse.json({
        message: "Invalid Credentials",
        success: false,
      });
    const validPass = await bcrypt.compare(password, user.password);

    if (!validPass)
      return NextResponse.json({
        message: "Invalid Credentials",
        success: false,
      });
    const token = jwt.sign({ id: user._id }, "!@#", {
      expiresIn: "1d",
    });
    return NextResponse.json({
      message: `Login Sucessfull`,
      user,
      token,
    });
  } catch (error) {
    return NextResponse.json({
      message: "server error",
      error: error.message,
    });
  }
};
