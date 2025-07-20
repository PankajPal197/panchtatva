import { deleteHomePage, getHomePage, postHomePage, putHomePage } from "@/app/controllers/homePageController"

export async function GET(req) {
    return getHomePage(req);
}

export async function POST(req) {
    return postHomePage(req);
}
export async function PUT(req) {
    return putHomePage(req);
}
export async function DELETE(req) {
    return deleteHomePage(req);
}