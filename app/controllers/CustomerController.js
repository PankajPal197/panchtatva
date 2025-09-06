import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Customer from "../Models/Customer";

export const register = async (req) => {
  const { customer_name, customer_email, customer_password } = await req.json();
  try {
    let user = await Customer.findOne({ customer_email });

    if (user)
      return NextResponse.json({
        message: "User Already Exist",
        success: false,
      });
    const hashedPassword = await bcrypt.hash(customer_password, 10);
    user = await Customer.create({ customer_name, customer_email, customer_password: hashedPassword });
    return NextResponse.json({
      message: "Customer Regisiter Successfully",
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
  const { customer_email, customer_password } = await req.json();
  try {
    let user = await Customer.findOne({ customer_email });
    if (!user)
      return NextResponse.json({
        message: "Invalid Credentials",
        success: false,
      });
    const validPass = await bcrypt.compare(customer_password, user.customer_password);

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
