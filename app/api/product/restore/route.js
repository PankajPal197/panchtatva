import { restoreProduct } from "@/app/controllers/ProductController";

export async function PUT(req) {
  return restoreProduct(req)
}