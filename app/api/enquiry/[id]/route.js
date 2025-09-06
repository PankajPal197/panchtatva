import { NextResponse } from "next/server";
import connectDB from "@/app/utils/Database";
import Enquiries from "@/app/Models/Enquiries";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const enquiry = await Enquiries.findById(id);
    if (!enquiry) {
      return NextResponse.json(
        { success: false, message: "Enquiry not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, enquiry }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}




