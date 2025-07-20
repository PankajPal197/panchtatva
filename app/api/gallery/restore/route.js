import { restoreGallery } from "@/app/controllers/galleriesController";

export async function PUT(req) {
  return restoreGallery(req)
}