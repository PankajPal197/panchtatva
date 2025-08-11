import { permanentlyDeleteBlog } from "@/app/controllers/blogController";

export async function DELETE(req) {
    return permanentlyDeleteBlog(req);
}