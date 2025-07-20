import User from "@/app/Models/User";
import connectDB from "@/app/utils/Database";
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server";

export async function POST(req){
await connectDB();
try{
const {name,email,password}=await req.json();

const exist=await User.findOne({email});
if (exist)return NextResponse.json({error:"User Already Exist"})

const hashedPassword=await bcrypt.hash(password,10);
const user=await User.create({name,email,password:hashedPassword});

return NextResponse.json({
    message:"User Register Successful",
    user
})

}
catch(error){
    error.message
}
}