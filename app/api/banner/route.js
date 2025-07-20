import { deleteBanner, getBanner, postBanner, putBanner } from "@/app/controllers/bannerController"

export async function GET(req) {
  return getBanner(req)
}
export async function POST(req) {
  return postBanner(req)
}
export async function PUT(req) {
  return putBanner(req)
}
export async function DELETE(req) {
  return deleteBanner(req)
}