import { restoreBlog } from "@/app/controllers/blogController";

export async function PUT(req) {
    return restoreBlog(req);
}