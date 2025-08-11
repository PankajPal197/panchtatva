import { register } from "@/app/controllers/authController";

export async function POST(req) {

  return register(req);
}