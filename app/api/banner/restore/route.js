import { restoreBannner } from "@/app/controllers/bannerController";

export async function PUT(req) {
  return restoreBannner(req)
}