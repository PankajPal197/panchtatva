import { permanentlyDeleteProduct } from "@/app/controllers/ProductController";

export async function DELETE(req) {
  return permanentlyDeleteProduct(req)
}