import Categories from "@/app/Models/Categories";
import Product from "@/app/Models/Product";
import connectDB from "@/app/utils/Database";
import { NextResponse } from "next/server";

const models={
    product:Product,
    category:Categories,
}
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { type, id } = params;
    const Model = models[type];
    if (!Model) {
      return NextResponse.json({ success: false, message: "Invalid type" }, { status: 400 });
    }

    await Model.findByIdAndUpdate(id, { delete_status: "active" });
    return NextResponse.json({ success: true, message: `${type} restored successfully` });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}