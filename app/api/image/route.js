import { getImage,postImage,putImage,deleteImage } from "@/app/controllers/imageController";

export async function GET(req) {
    return getImage(req);
}

export async function POST(req) {
    return postImage(req);
}
export async function PUT(req) {
    return putImage(req);
}
export async function PATCH(req) {
    return deleteImage(req);
}