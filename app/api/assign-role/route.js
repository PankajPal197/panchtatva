import { assignRole } from "@/app/controllers/authController";

export async function PUT(req) {
    return assignRole(req)
}