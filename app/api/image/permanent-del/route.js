import { permanentlyDeleteHomePage } from "@/app/controllers/homePageController";

export async function DELETE(req) {
    return permanentlyDeleteHomePage(req);
}