import { permanentlyDeleteGallery } from "@/app/controllers/galleriesController";

export async function DELETE(req) {
  return permanentlyDeleteGallery(req)
}