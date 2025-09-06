import { NextResponse } from "next/server";
import Enquiries from "../Models/Enquiries";
import connectDB from "../utils/Database";

export const getEnquiry = async () => {
  try {
    await connectDB();
    const data = await Enquiries.find({ delete_status: "active" });
    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
};

export const postEnquiry = async (req) => {
  try {
    await connectDB();
    const formData = await req.formData();
    const getText = (key) => {
      const value = formData.get(key);
      return value === "" || value === null ? undefined : value;
    };
    const parseNumber = (value, fallback = 0) => {
      const num = Number(value);
      return isNaN(num) ? fallback : num;
    };
    const enquiryData = await Enquiries.create({
      customer_name: getText("customer_name"),
      customer_email: getText("customer_email"),
      customer_phone: parseNumber(getText("customer_phone")),
      subject: getText("subject"),
      message: getText("message"),
      enquiry_page: getText("enquiry_page"),
      delete_status: getText("delete_status"),
    });

    return NextResponse.json(
      {
        message: "Enquiry created and saved successfully",
        success: true,
        enquiryData,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("SERVER ERROR:", err);
    return NextResponse.json(
      {
        message: err.message || "Server Error",
        success: false,
      },
      { status: 500 }
    );
  }
};
export const DeleteEnquiry = async (req) => {
  try {
    await connectDB();
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }
    await Enquiries.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Permanently deleted" });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
};