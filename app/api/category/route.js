import { deleteCategory, getCategory, postCategory, updateCategory } from "@/app/controllers/categoryController";


export async function GET(req) {
    return getCategory(req)
}
export async function POST(req) {
    return postCategory(req)
}
export async function PUT(req) {
    return updateCategory(req)
}
export async function PATCH(req) {
    return deleteCategory(req)
}
