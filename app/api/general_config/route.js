import { createGenralConfig } from "@/app/controllers/generalConfigController"

export async function GET() {
  return Response.json({ message: 'Hello World' })
}
export async function POST(request) {
return createGenralConfig(request);
}