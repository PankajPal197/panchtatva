import { permanentlyDeleteBanner } from "@/app/controllers/bannerController";

export async function DELETE(req) {
  return permanentlyDeleteBanner(req)
}