import { restoreCategory } from "@/app/controllers/categoryController";

export async function PUT(req) {
  return restoreCategory(req)
}