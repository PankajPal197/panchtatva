import { restoreHomePage } from "@/app/controllers/homePageController";

export async function PUT(req) {
    return restoreHomePage(req);
}