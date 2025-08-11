import { deleteBanner, getBanner, postBanner, putBanner, softUpdateBanner} from "@/app/controllers/bannerController"

export async function GET(req) {
  return getBanner(req)
}

export async function POST(req) {
  return postBanner(req)
}
export async function PUT(req) {
  return putBanner(req)
}

export async function PATCH(req) {
  return deleteBanner(req)
}


