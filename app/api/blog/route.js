import { deleteBlog, getBlog, postBlog, putBlog } from "@/app/controllers/blogController";

export async function GET(req) {
    return getBlog(req);
}

export async function POST(req) {
    return postBlog(req);
}
export async function PUT(req) {
    return putBlog(req);
}
export async function PATCH(req) {
    return deleteBlog(req);
}