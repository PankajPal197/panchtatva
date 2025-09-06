import Categories from "@/app/Models/Categories";
import Product from "@/app/Models/Product";
import connectDB from "@/app/utils/Database";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "";

  if (!query) {
    return NextResponse.json({ success: false, message: "Query is required" });
  }

  try {
    // ✅ Find categories matching the query
    const categories = await Categories.find({
      category_name: { $regex: query, $options: "i" },
      delete_status: "active",
      status: "active",
    }).select("_id category_name");

    // ✅ Collect category IDs
    const categoryIds = categories.map((cat) => cat._id);

    // ✅ Find products matching by name OR by category ID
    const products = await Product.find({
      $or: [
        { product_name: { $regex: query, $options: "i" } },
        { category_id: { $in: categoryIds } },
      ],
      delete_status: "active",
      status: "active",
    }).select("product_name category_id");

    return NextResponse.json({
      success: true,
      data: {
        categories,
        products,
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
