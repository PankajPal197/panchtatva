import { deleteCity, getCity, postCity, putCity } from "@/app/controllers/cityController"

export async function GET(req) {
  return getCity(req)
}

export async function POST(req) {
  return postCity(req)
}
export async function PUT(req) {
  return putCity(req)
}

export async function PATCH(req) {
  return deleteCity(req)
}
