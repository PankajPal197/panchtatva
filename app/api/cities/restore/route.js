import { restoreCity } from "@/app/controllers/cityController";

export async function PUT(req) {
  return restoreCity(req)
}