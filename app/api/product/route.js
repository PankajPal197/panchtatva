import { deleteProduct, getProduct,postProduct, updateProduct } from "@/app/controllers/ProductController"

export async function GET(req) {
    return getProduct(req);
} 
export async function POST(req) {
    return postProduct(req);
}
export async function PUT(req) {
    return updateProduct(req)
}
export async function PATCH(req) {
    return deleteProduct(req)
}