import { permanentlyDeleteCity } from "@/app/controllers/cityController";

export async function DELETE(req) {
  return permanentlyDeleteCity(req)
}