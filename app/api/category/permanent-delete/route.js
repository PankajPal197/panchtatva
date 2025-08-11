import { permanentlyDeleteCategory } from "@/app/controllers/categoryController";

export async function DELETE(req) {
  return permanentlyDeleteCategory(req)
}