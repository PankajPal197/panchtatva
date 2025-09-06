import { DeleteEnquiry, getEnquiry, postEnquiry } from "@/app/controllers/enquiryController";

export async function GET(req) {
  return getEnquiry(req);
}
export async function POST(req) {
  return postEnquiry(req);
}
export async function PATCH(req) {
  return DeleteEnquiry(req);
}