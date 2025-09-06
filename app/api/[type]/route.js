import Categories from "@/app/Models/Categories";
import Product from "@/app/Models/Product";
import connectDB from "@/app/utils/Database";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { type } = params;
    const { searchParams } = new URL(req.url);
    const delete_status = searchParams.get("delete_status");

    let Model;
    if (type === "products") Model = Product;
    if (type === "categories") Model = Categories;
    // if (type === "enquiries") Model = Enquiry;

    if (!Model) {
      return NextResponse.json(
        { success: false, message: "Invalid type" },
        { status: 400 }
      );
    }

    // ✅ Sirf deleted data show karein Restore page pe
    const filter = {};
    if (delete_status === "deleted") {
      filter.delete_status = "deleted";
    }
     else {
      filter.delete_status = "active"; // default (active list)
    }

    const data = await Model.find(filter).lean();

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
