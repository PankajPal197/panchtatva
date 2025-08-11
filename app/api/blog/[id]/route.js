import { NextResponse } from "next/server";
import connectDB from "@/app/utils/Database";
import Blog from "@/app/Models/Blog";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, blog }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params }) {
  await connectDB();
  const id = params.id;
  const body = await req.json();

  try {
    const updated = await Blog.findByIdAndUpdate(
      id,
      { sort_order: parseInt(body.sort_order, 10) },
      { new: true }
    );

    return Response.json({ success: true, data: updated });
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Update failed",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  await connectDB();
  const { id } = params;

  try {
    const body = await req.json();
    const { status } = body;

    const updated = await Blog.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return new Response(
        JSON.stringify({ success: false, message: "Blog not found" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify({ success: true, data: updated }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Update failed",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
