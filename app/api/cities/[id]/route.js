import { NextResponse } from "next/server";
import connectDB from "@/app/utils/Database";
import Cities from "@/app/Models/Cities";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const city = await Cities.findById(id);
    if (!city) {
      return NextResponse.json(
        { success: false, message: "City not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, city }, { status: 200 });
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
    const updated = await Cities.findByIdAndUpdate(
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

    const updated = await Cities.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return new Response(
        JSON.stringify({ success: false, message: "City not found" }),
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
