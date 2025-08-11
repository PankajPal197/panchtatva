import { createRole } from "@/app/controllers/roleController";

export async function POST(req) {
  return createRole(req);
}