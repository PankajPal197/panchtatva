import { register, login } from "@/app/controllers/CustomerController";
import connectDB from "@/app/utils/Database";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDB();
  try {
    const { searchParams } = new URL(req.url);
    if (searchParams.get("signup")) {
      return register(req);
    }
    if(searchParams.get('login')) return login(req)
    return NextResponse.json({ message: "Invalid api Endpoint" });
  } catch (error) {return NextResponse.json({message:error.message})
  }
}
