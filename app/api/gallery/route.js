import { getGallery,postGallery, putGallery, deleteGallery } from "@/app/controllers/galleriesController"

export async function GET(req) {
  return getGallery(req)
}
export async function POST(req) {
  return postGallery(req)
}
export async function PUT(req) {
  return putGallery(req)
}
export async function DELETE(req) {
  return deleteGallery(req)
}